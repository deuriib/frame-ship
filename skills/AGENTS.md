# SKILLS — Frame→Ship chain

## OVERVIEW
9 stage skills: process source of truth. Plugin only injects pointers; this dir defines behavior.

## WHERE TO LOOK
| Trigger | Skill | Out |
|---------|-------|-----|
| new initiative / OKRs | `frame-intent/` | `BRIEF-<slug>.md` |
| brief approved | `translate-to-spec/` | REQ-IDs + `ARCHITECTURE.md` |
| ready to implement | `propose-changes/` | `PROPOSED_CHANGES.md`, repo untouched |
| auth/data/API | `review-security/` | STRIDE verdict |
| public API/model | `review-architecture/` | ADR |
| approved spec | `execute-spec/` | impl + `test-matrix.md` |
| impl done | `quality-gate/` | `GATE_REPORT.md` |
| complete | `verify-handoff/` | `HANDOFF.md` |
| verified | `ship-release/` | notes + changelog + rollback |

## CONVENTIONS
- Body shape fixed: Purpose / Chain Contract (Prev/Next) / 2b Role Binding / Process / Won't do / References.
- Chain ascii only in `frame-intent` + `quality-gate`; others declare Prev/Next in text.
- References use bracket placeholders: `[description]`, `XXX`, `YYYY-MM-DD`.
- Stage file counts: `quality-gate` 15 files; `translate-to-spec` 4; all others 3 (SKILL + 2 refs).
- Role owners: `montilla` briefs/releases; `vasquez` arch; `barrera` security; leaf specialists impl.

## ANTI-PATTERNS
- Editing `references/` without updating parent SKILL `§5`.
- Adding `version/author` keys to frontmatter — loader expects `name/description` only.
- Templates carrying creed line — creed lives in SKILL.md only.
- Documenting every skill subdir — parent covers all except `quality-gate`.
- Renaming a reference file without grepping SKILL `§5` + plugin pointers.
