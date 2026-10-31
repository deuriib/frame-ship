# Implementation Plan — SPEC-002 docs layout normalization

**Spec:** https://github.com/deuriib/frame-ship/issues/2
**Lane:** engineering
**Execution_Mode:** subagents
**Domains-touched:** engineering (docs/structure only; no security, data, or API surface)

## Scope

Two coupled changes, one commit each:

1. **Flatten artifact paths.** `docs/frame-ship/specs/<NN_name>/` → `docs/frame-ship/<name>/`.
2. **Merge OKRs into the brief.** `BRIEF-<slug>.md` gains an `## OKRs` section; no separate OKR file is produced.

## Path mapping (authoritative)

| Old | New |
|---|---|
| `docs/frame-ship/specs/10_design/` | `docs/frame-ship/design/` |
| `docs/frame-ship/specs/12_adr/` | `docs/frame-ship/adr/` |
| `docs/frame-ship/specs/15_requirements/` | `docs/frame-ship/requirements/` |
| `docs/frame-ship/specs/20_backlog/` | `docs/frame-ship/backlog/` |
| `docs/frame-ship/specs/30_delivery/` | `docs/frame-ship/delivery/` |
| `docs/frame-ship/specs/40_workspace/` | `docs/frame-ship/workspace/` |
| `docs/frame-ship/specs/50_archive/` | `docs/frame-ship/archive/` |
| `docs/frame-ship/briefs/` | unchanged |

## Steps

| # | Step | Files | Rollback point |
|---|---|---|---|
| 1 | Replace all `docs/frame-ship/specs/<NN_name>/` references with flat paths | 16 files (skills, agents, README) | `git checkout -- <files>` |
| 2 | Rewrite `frame-intent` OKR step to write inline `## OKRs` in the brief | `skills/frame-intent/SKILL.md` | same |
| 3 | Add `## OKRs` section to the brief template | `skills/frame-intent/references/product-brief.md` | same |
| 4 | Retitle OKR template as the section template | `skills/frame-intent/references/okr-template.md` | same |
| 5 | Remove "paired `OKR-*.md`" claims from agent persona + test template | `agents/montilla.md`, `skills/execute-spec/references/testing-template.md` | same |
| 6 | Document the flat layout (folder table) | `AGENTS.md`, `README.md` | same |
| 7 | Verify with grep gates (TEST_MATRIX) | — | — |

## Constraints

- No skill logic, gate rule, or chain order changes.
- No file naming convention changes (`SPEC-###-<slug>.md`, `ADR-###-<slug>.md`, `HANDOFF.md`, `GATE_REPORT.md`).
- No runtime artifacts created inside the repo beyond this lane's `workspace/engineering/` evidence.

## Assumptions

- `okr-template.md` is kept (not deleted) and retitled as the shape of the inline `## OKRs` section — deleting a shipped reference is out of the approved change list.
- `AGENTS.md` has no folder table today; step 6 adds one, because acceptance requires it.
