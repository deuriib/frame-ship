---
name: building-automation
description: Use when a spec is approved and you are writing the automation - TDD with uv, typed Python, Excel fixtures, Docker and CI from the start.
---

# Building Automation

Build the approved spec with production quality from the first commit: red-green, typed, Excel-fixtured.

> Invoke `using-automation` first. Announce "Using building-automation to [purpose]".

## Setup (once per project, ~10 min)

```bash
uv init --name automation && uv add pandas openpyxl pydantic htpy
uv add --dev pytest ruff ty
# + openai langchain as needed; + fastapi "uvicorn[standard]" httpx  OR  flet
uv run pytest --collect-only  # harness must exist before logic
uv run ruff check . && uv run ruff format --check . && uv run ty check
```

`Dockerfile` + `.github/workflows/ci.yml` (uv + pytest + `ruff check` + `ruff format --check` + `ty check`) land in the first PR, not the last.

## TDD Loop (per pipeline stage)

1. **Red.** One failing test on a fixture: `tests/fixtures/input.xlsx` → expected `output.xlsx` (or validation error). Use `pandas` + `openpyxl`; assert on DataFrames/sheets, not vibes.
2. **Green.** Minimal typed code to pass. Signature pattern:
   ```python
   def run_stage(df: pd.DataFrame) -> pd.DataFrame: ...
   ```
   Every I/O boundary validates with `pydantic` and raises a named error (`MissingColumnError`, `BadTypeError`, `AIEnrichmentError`).
3. **Refactor.** Dedupe, narrow types, keep functions pure where Excel allows it.
4. **AI seam.** Isolate every model call behind one function with retry + fallback (leave row flagged, never silently drop). Test the fallback with a stubbed failure.

## Gates (blocking)

1. **Excel gate:** demo runs on a real `.xlsx`, in and out. No JSON-only demos.
2. **Quality gate:** `uv run pytest` green, `uv run ty check` clean, `uv run ruff check .` + `ruff format --check .` clean, errors handled with messages naming sheet + column + row.
3. **Pragmatism gate:** if a stage turned out to be one formula or a low-code step, say so and cut it.

<HARD-GATE>
Claiming "done" with tests red, `ruff`/`ty` dirty, no Dockerfile/CI, untyped code, or no Excel round-trip = rejected. Fix forward, then hand to `shipping-automation`.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "Tests after it works" | The fixture IS how you know it works. Red first. |
| "pip is fine" | `uv` or explain why not. Default is `uv`. |
| "Broad try/except is enough" | Named errors with sheet/column/row or it didn't happen. |
