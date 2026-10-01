# Automation Guardrails

Adapted operations guardrails for Excel-first business automation. Your "prod" is the client's spreadsheet, not a cluster. Every rule below is blocking unless it says otherwise.

## 1. Data Integrity

- The Excel contract is versioned in `tests/fixtures/`. The spec's input/output sheets, columns, and types are the source of truth.
- Never hand-edit the client's production file outside the pipeline. All transforms run through code, reproducibly.
- Never overwrite `input.xlsx`. Every run emits `output_<date>.xlsx`. Input stays pristine so any run can be re-done.
- Secrets (OpenAI keys, credentials) live in `.env` / vault only. Never in cells, never in `print()` output, never in logs. Pre-push secret scan.

## 2. Build & Test Gates

Every ship must pass, locally and in CI — red blocks the ship:

```bash
uv run pytest
uv run ruff check . && uv run ruff format --check .
uv run ty check
```

- Plus an Excel round-trip on a real fixture: `tests/fixtures/input.xlsx` → expected `output.xlsx`.
- No verbal overrides. A gate bypass needs written approval + a deadline, recorded in the ship note.

## 3. Safe Delivery

- One-command Docker run processes `data/input.xlsx` → `data/output_<date>.xlsx`. If Docker can't run it, it isn't shipped.
- Schema changes are backward-compatible: columns are added, never renamed or deleted without the client's written sign-off (expand/contract, same as DB migrations).
- No destructive change (column drop, sheet restructure, bulk overwrite) without a backup copy + a rehearsed restore.
- Respect freeze windows: month-end close, payroll, tax deadlines. No delivery on those days without explicit permission.

## 4. Observability & Response

- Every run emits a run-log: input/output filenames, row counts, flagged rows with sheet + column + row, model calls made, timestamp.
- A bad row comes back flagged, never silently dropped. No silent `except: pass` anywhere in the pipeline.
- `--dry-run` is the kill switch: preview what would change before writing anything.
- Every error message names an action (fix the cell, re-run the stage, check the key). An alert without an action is a bug — fix the message.

## 5. Supply Chain (Lightweight)

- All deps pinned in `uv.lock`. Never `latest`, never a bare `pip install`, never an unpinned Docker base.
- Verified publishers only. No unmaintained dependency without a recorded reason + replacement plan.
- Never commit client spreadsheets, client data, or non-anonymized rows to any repo — especially public ones. Fixtures are synthetic or anonymized.
- Never paste real client data into prompts/demos without anonymizing first.

## 6. Toil Reduction

- A manual step repeated ≥3× gets automated or ticketed — no silent repetition.
- Everything automated is idempotent: re-running on the same input produces the same output (up to the date suffix).
- Every automation has a documented rollback: restore input copy + re-emit output. Rollback is tested, not theoretical.
- No scheduled run (cron / Actions schedule) without an owner, monitoring, and failure alerts.

## 7. Evidence & Escalation

A ship bundles: run-log + gate results (`pytest`, `ruff`, `ty`, round-trip) + `uv.lock` + exact Docker command + client approval.

Halt the ship and notify the owner when any of these fire — no silent retries:

| Trigger | Action |
|---|---|
| Gate bypass requested | Written approval + deadline, or stop |
| Secret in repo, Excel, or log | Rotate immediately, scrub history, notify owner |
| Destructive overwrite (input lost, columns dropped) | Restore backup, re-run, post-mortem before re-ship |
| Failed re-run / rollback | Stop, keep the broken output as fixture, fix forward via `debugging-automation` |
