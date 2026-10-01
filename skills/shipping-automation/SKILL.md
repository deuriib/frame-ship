---
name: shipping-automation
description: Use when the automation works and you must deliver it - Excel round-trip demo, Docker run, green CI, ROI handoff the client can re-run.
---

# Shipping Automation

"Works on my machine" is not shipped. Shipped = client re-runs Excel in→out, Docker runs it, CI is green, ROI is stated.

> Invoke `using-automation` first. Announce "Using shipping-automation to [purpose]".

## Checklist (all green or not shipped)

1. **Excel round-trip.** Demo on a fresh copy of the client's file: in → out, show the changed sheets/rows. Client keeps spreadsheets — no retraining pitch.
2. **One-command run.** `docker build -t automation . && docker run --rm -v "$PWD/data:/data" automation` processes `data/input.xlsx` → `data/output.xlsx`. Paste the exact commands + output.
3. **CI green.** `uv run pytest` + `uv run ruff check .` + `uv run ruff format --check .` + `uv run ty check` pass, Actions workflow passes on the branch. Link or paste the run.
4. **Handoff.** README: install (`uv sync`), run (script + Docker), Excel contract (sheets/columns), error guide (sheet/column/row messages), how to re-run monthly.
5. **ROI close.** Restate bottleneck removed, hours freed/month, errors killed, price anchored to value. Feed repeatable niches to `pricing-micro-saas`.
6. **Guardrails green.** `references/guardrails.md`: dated output (never overwrite input), run-log emitted, `--dry-run` available, `uv.lock` pinned, freeze window respected, evidence bundled. Red anywhere = not shipped.

## Output — Ship Note (in chat)

```markdown
## Shipped: [name]
- Excel: `data/input.xlsx` → `data/output.xlsx` ([rows] in, [rows] out, [errors flagged])
- Docker: [exact run command + result]
- Tests/CI: [pytest count] green, `ruff` + `ty` clean, Actions [link/run id]
- Handoff: README updated ([run], [contract], [errors])
- ROI: [hours freed/mo] → [value]; priced at [amount + basis]
- Guardrails: [run-log ref], [output dated, input intact], [dry-run ok], [freeze window clear], [evidence bundled]
```

<HARD-GATE>
Missing Excel demo, red tests, dirty `ruff`/`ty`, no Dockerfile/CI, README without re-run steps, or any guardrail red = not shipped. Say what's missing and fix forward.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "Docker later" | Docker is the delivery. Now. |
| "Client will figure out the rerun" | If README can't re-run it, it isn't shipped. |
| "ROI is obvious" | Write the number. Value not stated = value not sold. |
