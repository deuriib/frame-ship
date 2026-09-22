# SPECS — numbered lifecycle 10→50

## OVERVIEW
Seven numbered stages: design → adr → requirements → backlog → delivery, plus workspace scratch and read-only archive. Parent `docs/AGENTS.md` owns intent-vs-contract split; this file owns number meanings.

## STRUCTURE
```
specs/
├── 10_design/ 12_adr/ 15_requirements/ 20_backlog/ 30_delivery/  # canonical, numbered
├── 40_workspace/<domain>/  # scratch: [engineering, automation/ops, security, people]
└── 50_archive/  # terminal, read-only
```

## WHERE TO LOOK
| Stage | Dir | Holds |
|-------|-----|-------|
| Design | `10_design/` | `ARCHITECTURE.md`, design contracts |
| ADR | `12_adr/` | `ADR-001..012`; architectural decision records (one number = one file) |
| Requirements | `15_requirements/` | `REQ-single-dispatcher-{engineering,people}.md`; `REQ-F/NF-001` IDs |
| Backlog | `20_backlog/` | `SPEC-###-*.md`; approved specs saved here before and during implementation |
| Delivery | `30_delivery/` | `RELEASE_NOTES.md`; `ship-release` canonical output |
| Workspace | `40_workspace/` | per-domain [engineering, automation/ops, security, people], only exception `single-demo/` (full-chain demo), `quality-gate/` (per-spec verdicts) |
| Archive | `50_archive/<spec-id>/` | terminal, moved from `20_backlog/` on release: `SPEC-*.md` + promoted `GATE_REPORT.md` + `HANDOFF.md` + `ARCHIVE-RECORD.md` (index of promoted/purged); legacy flat `SPEC-*.md` at root are pre-existing, leave as-is |

## CONVENTIONS
- `40_workspace/quality-gate/<spec-id>/` holds per-reviewer verdicts + `GATE_REPORT.md`; `single-demo/` mirrors the same shape as a runnable demo (`GATE_REPORT.md`, `HANDOFF.md`, `ARCHIVE-RECORD.md`).
- Scope by domains split: [engineering, automation/ops, security, people] — never mix domains in one dir.
- Gate states `OPEN/CONDITIONAL/CLOSED` and `COND-00x` checklists live only under `40_workspace/quality-gate/` and only exception `single-demo/quality-gate/`.
- Promotion direction only: workspace → numbered stage → archive. Archive never feeds back.
- Spec lifecycle: `SPEC-###-*.md` files must be saved into `20_backlog/`. In the release process (`ship-release`), the completed spec must be moved (`git mv`) from `20_backlog/` to `50_archive/`.
- ADRs: all `ADR-###-*.md` files must be saved into `12_adr/`. One number = one file, never renumber or reuse (mint the next free number). ADR only when a change breaks/creates an invariant, adds a component, or changes a cross-domain contract (rule in `skills/review-architecture/`); within existing contracts → architecture review only, no ADR. `Status: proposed` with the code already merged = gate FAIL.
- Promote-then-purge on archive: when `ship-release` archives a spec, `GATE_REPORT.md` + `HANDOFF.md` are COPIED to `50_archive/<spec-id>/` and indexed by `ARCHIVE-RECORD.md` FIRST; then the allowlist is purged from `40_workspace/`: the 4 lane singletons (`PROPOSED_CHANGES.md`, `IMPLEMENTATION_PLAN.md`, `TEST_MATRIX.md`, `HANDOFF.md`) of THAT spec + `quality-gate/<spec-id>/`. Nothing outside the allowlist is touched — other SPEC lanes stay.

## ANTI-PATTERNS
- Treating `40_workspace/` as canonical — it is scratch; the numbered dir is truth.
- Saving specs outside `20_backlog/` or leaving completed specs in `20_backlog/` after release (must move to `50_archive/`).
- Saving ADRs outside `12_adr/`.
- Leaving allowlisted scratch in `40_workspace/` after a spec is archived — or purging anything OUTSIDE the allowlist (cross-lane damage).
- Purging `GATE_REPORT.md`/`HANDOFF.md` without promoting them to `50_archive/<spec-id>/` first — evidence must survive.
- Cross-owner files (e.g. people spec inside `engineering/`) — keep dispatcher split.
- New gate verdicts outside `quality-gate/<spec-id>/` — routing depends on that path.
- Reusing an archived `SPEC-00x` number for new work — mint a new ID, link back.
- Backfilling `20_backlog/` after delivery — backlog is forward queue only.
