# DOCS — artifact store

## OVERVIEW
Chain outputs only: `briefs/` (intent) → `specs/` (numbered lifecycle). No process here — process lives in `skills/`.

## WHERE TO LOOK
| Artifact | Location | Notes |
|----------|----------|-------|
| Product intent + OKRs | `briefs/BRIEF-<slug>.md`, `briefs/OKR-*.md` | entry for `frame-intent` |
| Design contracts | `specs/10_design/ARCHITECTURE.md` | entry for architecture contracts |
| Decisions (ADR) | `specs/12_adr/ADR-*.md` | entry for `review-architecture` |
| Testable requirements | `specs/15_requirements/REQ-*.md` | `REQ-F/NF-001` shape |
| Backlog | `specs/20_backlog/SPEC-*.md` | approved specs queue and execute here |
| Shipped notes | `specs/30_delivery/RELEASE_NOTES.md` | `ship-release` output |
| Work in flight | `specs/40_workspace/<domain>/` | [engineering, automation/ops, security, people]; see `specs/AGENTS.md` |
| Gate verdicts | `specs/40_workspace/quality-gate/<spec-id>/` | per-reviewer verdicts + `GATE_REPORT.md`; `CLOSED` blocks handoff without waiver |
| Closed history | `specs/50_archive/SPEC-*.md` | terminal, moved from `20_backlog/` on release; read-only, never edit in place |

## CONVENTIONS
- Lifecycle order: `10_design → 12_adr → 15_requirements → 20_backlog → 30_delivery`, with `40_workspace/` as scratch and `50_archive/` as terminal. Numbers sort; never rename a number.
- SCREAMING files only at store boundary: `BRIEF-*.md` in `briefs/`; `SPEC-*.md` in `20_backlog/` (moved to `50_archive/` on release); `ADR-*.md` in `12_adr/`; `REQ-*.md` in `15_requirements/`; `PROPOSED_CHANGES.md`, `HANDOFF.md`, `GATE_REPORT.md` in `40_workspace/`; `RELEASE_NOTES.md` in `30_delivery/`.
- `40_workspace/<domain>/` holds per-domain drafts (`PROPOSED_CHANGES-*`, `IMPLEMENTATION_PLAN-*`, `TEST_MATRIX-*`, `HANDOFF-*`); promotion copies canonical files up the lifecycle, never moves scratch. `40_workspace/` scratch and gate records must be cleaned up on archive.
- Trace rides filenames: `<spec-id>` suffix links proposal → plan → matrix → handoff → gate (e.g. `*-single-dispatcher.md`).
- `OKR-*.md` pairs its `BRIEF-*.md` by slug suffix — never orphan an OKR.

## ANTI-PATTERNS
- Editing `50_archive/` in place — supersede with a new numbered spec instead.
- Landing finished work directly in `40_workspace/` without promoting to its lifecycle number.
- Mixing `BRIEF-` (intent) into `specs/` or `SPEC-/REQ-` (contract) into `briefs/`.
- Committing secrets/PII in any artifact — mask before writing (privacy rules ride every export).
- Quoting full specs across stages — link by `SPEC/HARD/GATE/DOMAINS` reference, never paste.
