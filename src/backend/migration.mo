import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  // Old types
  type OldActor = {
    userValentineData : Map.Map<Principal, DayEntry>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  type DayEntry = {
    day : Text;
    claimed : Bool;
    timestamp : Time.Time;
  };

  type UserProfile = {
    name : Text;
  };

  // New types (same, no structural changes)
  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};
