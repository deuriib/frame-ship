# review-readability — hidden flag

**SPEC:** SPEC-hidden-flag-engineering | **Verdict:** PASS | **Findings:** 0

- Interface addition `hidden?: boolean` is intention-revealing; comment overlay states who is hidden and why (montilla visible, subagents default-hidden).
- 8 entry lines follow existing `{ key, file, mode }` voice + exact `, hidden: true` suffix — no rename, no reorder.
- Mirror inserts keep `??=` + separate-objects comment; conditional spread is the minimal backward-compat idiom, readable inline.
- No stale pointers; ARCHITECTURE.md INV-004 overlay sentence matches code.
