# Specification

## Summary
**Goal:** Remove Internet Identity login and replace it with a code-phrase access gate, while adding day-specific floating items and a special Feb 14 Valentine prompt/celebration.

**Planned changes:**
- Replace the Internet Identity entry flow with an access screen that requires the exact phrase “I love uhh deha” (trimmed) before any Valentine Week content is accessible, with local persistence and an error state on mismatch.
- Update frontend data-flow to stop relying on Principal identity and instead generate/persist a stable clientId for all profile/progress reads and writes.
- Update backend to store and retrieve profile/progress by clientId, and to reject any profile/progress read/write/claim requests unless the provided code phrase exactly matches “I love uhh deha” (trimmed).
- Make floating/clickable items day-specific (roses on Rose Day; teddy, chocolate, and distinct themed items for Propose/Promise/Hug/Kiss), while keeping the existing pickup-line interaction on click/tap.
- Add a Feb 14 Valentine’s Day Daily Experience that shows “Will you be my valentine?” with exactly two options (“Yes”, “Ofcourse”), and after selection displays a full-screen celebration with “I love uhh deha” and hearts.

**User-visible outcome:** Users enter the access code once to unlock the app, can progress through the Valentine Week experience without Internet Identity, see themed floating items that match each day, and get a dedicated Feb 14 Valentine prompt that leads to a heart-filled full-screen celebration.
