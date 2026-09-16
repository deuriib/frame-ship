# SPECS — numbered lifecycle 10→50

## OVERVIEW
Six numbered stages: design → requirements → backlog → delivery, plus workspace scratch and read-only archive. Parent `docs/AGENTS.md` owns intent-vs-contract split; this file owns number meanings.

## STRUCTURE
```
specs/
├── 10_design/ 15_requirements/ 20_backlog/ 30_delivery/  # canonical, numbered
├── 40_workspace/<owner>/  # scratch: barrera/ santana/ vasquez/ single-demo/ quality-gate/
└── 50_archive/  # terminal, read-only
```

## WHERE TO LOOK
| Stage | Dir | Holds |
|-------|-----|-------|
| Design | `10_design/` | `ADR-001..003` + `SPEC-commit-convention-v2.md`; decisions before contracts |
| Requirements | `15_requirements/` | `REQ-single-dispatcher-{engineering,people}.md`; `REQ-F/NF-001` IDs |
| Backlog | `20_backlog/` | empty; approved-but-unscheduled specs queue here |
| Delivery | `30_delivery/` | `RELEASE_NOTES.md`; `ship-release` canonical output |
| Workspace | `40_workspace/` | per-owner scratch: `barrera/`, `santana/`, `vasquez/` (people/eng dispatch), `single-demo/` (full-chain demo), `quality-gate/` (per-spec verdicts) |
| Archive | `50_archive/` | `SPEC-001/002/003`, `plugin-001`, `SPEC-commit-convention-v2`; terminal |

## CONVENTIONS
- `40_workspace/quality-gate/<spec-id>/` holds per-reviewer verdicts + `GATE_REPORT.md`; `single-demo/` mirrors the same shape as a runnable demo (`GATE_REPORT.md`, `HANDOFF.md`, `ARCHIVE-RECORD.md`).
- Owner dirs (`barrera/`, `santana/`, `vasquez/`) scope by dispatcher split: people specs under `santana/`, engineering under `vasquez/`, security under `barrera/` — never mix owners in one dir.
- Gate states `OPEN/CONDITIONAL/CLOSED` and `COND-00x` checklists live only under `40_workspace/quality-gate/` and `single-demo/quality-gate/`.
- Promotion direction only: workspace → numbered stage → archive. Archive never feeds back.

## ANTI-PATTERNS
- Treating `40_workspace/` as canonical — it is scratch; the numbered dir is truth.
- Cross-owner files (e.g. people spec inside `vasquez/`) — keep dispatcher split.
- New gate verdicts outside `quality-gate/<spec-id>/` — routing depends on that path.
- Reusing an archived `SPEC-00x` number for new work — mint a new ID, link back.
- Backfilling `20_backlog/` after delivery — backlog is forward queue only.
