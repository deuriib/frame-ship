---
name: designing-automation
description: Use when an opportunity brief is approved and you need a buildable spec - Excel contract, pipeline, architecture, tests - before writing code.
---

# Designing Automation

Turn an approved brief into a spec an enthusiastic junior can build: Excel contract first, pipeline second, stack last.

> Invoke `using-automation` first. Announce "Using designing-automation to [purpose]".

## Steps

1. **Excel contract.** Define every input sheet (columns, types, required vs optional) and every output sheet. Include one tiny example row. Ambiguity here = bugs later.
2. **Pipeline.** Map stages: read → validate → transform/enrich (AI call if any) → write → report. Mark which stage owns each error class.
3. **Architecture call.** Simplest that holds: plain `uv` script → `FastAPI + htpy + HTMX` (HTML built type-safe in Python, no template sprawl) → `Flet`. Justify anything above a script. Note low-code carve-outs.
4. **Test list.** Happy path on a sample file, malformed Excel, missing columns, empty rows, AI failure. Each maps to a unit test.
5. **ROI restated.** Minutes saved, errors killed, price anchored to value.

## Output — Automation Spec (in chat, chunks short enough to read)

```markdown
## Spec: [name]
### Excel contract
- IN `[file]`: sheet `[s]` — cols: `a (str, req)`, `b (float, opt)` — ex: `...`
- OUT `[file]`: sheet `[s]` — cols: `...` — ex: `...`
### Pipeline
1. read → 2. validate → 3. transform (+AI `[model/task]`) → 4. write → 5. report
### Architecture
[script | FastAPI+htpy+HTMX | Flet] because [reason]. Low-code: [carve-out or none].
### Tests
- [ ] happy path on `samples/input.xlsx`
- [ ] missing col / bad type / empty rows / AI down
### SDLC
`uv` env, `ruff` + `ty` clean, `Dockerfile`, Actions workflow, `pytest`
### ROI
[hours freed/month] → [price anchored to value]
```

Get explicit partner approval on the spec before `building-automation`.

<HARD-GATE>
No code before spec approval. Spec without Excel contract = rejected under Gate 1. Spec without tests + `ruff`/`ty` + Docker + Actions = rejected under Gate 3.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "The Excel is obvious" | Write it down. Columns, types, one example row. |
| "I'll add tests after" | Test list is part of the spec, not an appendix. |
| "Needs a full web app" | Client wants Excel. Prove the UI earns its keep. |
