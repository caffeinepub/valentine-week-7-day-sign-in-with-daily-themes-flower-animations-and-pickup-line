import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type DayEntry = {
    day : Text;
    claimed : Bool;
    timestamp : Time.Time;
  };

  public type ValentineDay = {
    name : Text;
    description : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let defaultDays = [
    { name = "Rose Day"; description = "Express your love with roses." },
    { name = "Propose Day"; description = "Take the next step in your relationship." },
    { name = "Chocolate Day"; description = "Share sweet treats with your loved one." },
    { name = "Teddy Day"; description = "Gift a cute teddy bear to someone special." },
    { name = "Promise Day"; description = "Make meaningful promises to each other." },
    { name = "Hug Day"; description = "Share warm hugs with those you care about." },
    { name = "Kiss Day"; description = "Seal your love with a kiss." },
  ];

  let userValentineData = Map.empty<Principal, DayEntry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Valentine's Day claiming functionality
  public type ClaimResponse = {
    id : Text;
    entries : [DayEntry];
  };

  public shared ({ caller }) func claimDay(day : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can claim days");
    };

    let validDay = defaultDays.find(func(d) { d.name == day });
    if (validDay == null) {
      Runtime.trap("Invalid day selected. Must be one of the official Valentine Week days.");
    };

    let userEntries = userValentineData.get(caller);
    if (userEntries == null) {
      createNewUserData(caller, day);
      return true;
    };

    let flattenedEntries = flattenUserEntries(userEntries);
    checkExistingClaim(flattenedEntries, day);

    addNewClaim(flattenedEntries, day, caller);
    true;
  };

  public query ({ caller }) func getUserValentineData() : async ClaimResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view valentine data");
    };

    let entries = userValentineData.get(caller);
    let claimEntries = switch (entries) {
      case (null) { Array.empty<DayEntry>() };
      case (?entry) { flattenUserEntries(?entry) };
    };

    { id = caller.toText(); entries = claimEntries };
  };

  func createNewUserData(caller : Principal, day : Text) {
    let newDay : DayEntry = {
      day;
      claimed = true;
      timestamp = Time.now();
    };
    userValentineData.add(caller, newDay);
  };

  func checkExistingClaim(flattenedEntries : [DayEntry], day : Text) {
    for (entry in flattenedEntries.values()) {
      if (entry.day == day) {
        if (entry.claimed) {
          Runtime.trap("Day already claimed. You can only claim 1 day per calendar date.");
        };
      };
    };
  };

  func addNewClaim(flattenedEntries : [DayEntry], newDay : Text, caller : Principal) {
    let newDayEntry : DayEntry = {
      day = newDay;
      claimed = true;
      timestamp = Time.now();
    };
    updateUserEntries(flattenedEntries, newDay, newDayEntry, caller);
  };

  func flattenUserEntries(entries : ?DayEntry) : [DayEntry] {
    switch (entries) {
      case (null) { Array.empty<DayEntry>() };
      case (?singleDay) { [singleDay] };
    };
  };

  func updateUserEntries(
    flattenedEntries : [DayEntry],
    _ : Text,
    newDayEntry : DayEntry,
    caller : Principal,
  ) {
    let _ = flattenedEntries.map(
      func(entry) {
        { entry with claimed = true; timestamp = Time.now() };
      }
    );
    userValentineData.add(caller, newDayEntry);
  };
};
