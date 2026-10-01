---
name: debugging-automation
description: Use when an automation produces wrong output, crashes on a file, or an Excel edge case breaks the pipeline - reproduce on the spreadsheet before touching code.
---

# Debugging Automation

Wrong output? The Excel file is the crime scene. Reproduce there first, fix second.

> Invoke `using-automation` first. Announce "Using debugging-automation to [purpose]".

## Steps

1. **Reproduce on Excel.** Copy the failing file to `tests/fixtures/repro-<date>.xlsx`, shrink to the smallest sheet/rows that still break. Note sheet + column + row.
2. **One failing test.** Encode the repro as a test asserting correct output. Confirm it fails for the right reason (not a stale fixture).
3. **Trace the stage.** read → validate → transform (+AI) → write → report. Which stage owns this error class? Check: encoding/`NaN`/merged cells/dates-as-strings, missing columns, AI fallback path.
4. **Fix at the owning stage.** Named error or corrected transform — never a broad `except` in an unrelated layer. Keep the repro fixture as a regression test.
5. **Excel round-trip.** Re-run in→out on the real file. Show before/after on the offending rows.

## Common Excel Traps

- Dates read as strings, numbers with commas/currency symbols, leading-zero IDs coerced to int.
- Merged header cells, trailing empty rows, hidden sheets, `NaN` vs `""`.
- AI enrichment failing silently — rows must come back flagged, never dropped.

<HARD-GATE>
No fix without a repro fixture + failing test first. No "fixed" without green suite + Excel round-trip on the real file.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "I see the bug, just fix it" | Prove it with a fixture. Two minutes, permanent regression cover. |
| "Edge case, won't happen again" | Client Excel always happens again. Keep the fixture. |
| "Rewrite the stage" | Fix at the owning stage. Minimal diff, maximal proof. |
