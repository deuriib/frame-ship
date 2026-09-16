# SKILLS — Frame→Ship chain

## OVERVIEW
10 dirs (bootstrap `using-frame-ship` + 9 stages): process source of truth. Plugin only injects pointers; this dir defines behavior.

## WHERE TO LOOK
| Trigger | Skill | Out |
|---------|-------|-----|
| new initiative / OKRs | `frame-intent/` | `BRIEF-<slug>.md` |
| brief approved | `translate-to-spec/` | REQ-IDs + `ARCHITECTURE.md` |
| ready to implement | `propose-changes/` | `PROPOSED_CHANGES.md`, impl files untouched |
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
- Stage file counts: `quality-gate` 18 files (SKILL + AGENTS + 2 refs + 5 engineering + 9 domains); `translate-to-spec` 4 (SKILL + 3 refs); `using-frame-ship` 3 (SKILL + 2 refs); all others 3 (SKILL + 2 refs).
- Commit closings: every stage ends with a commit step + example; `execute-spec` commits one per approved task/REQ-ID.
- Role owners: `orchestrator` briefs/releases + is the sole dispatcher to the entire team; `engineering owner` arch; `security owner` security; leaf specialists impl.
- Execution mode frozen at `frame-intent` (`single` | `multi-subagents`) rides `SPEC/HARD/GATE/DOMAINS` packets, never skill frontmatter.

## DOMAIN CATALOGUE (canonical — 8 business domains, full chain for all)

| # | Domain | Owner (domain owner) | Gate reviewer | Gate template |
|---|--------|-----------------|---------------|---------------|
| 1 | engineering | engineering owner | readability, reliability, refuter, resilience, risk, qa (+data) | `quality-gate/references/engineering/` |
| 2 | security | security owner | security-reviewer | `quality-gate/references/domains/security-review.md` |
| 3 | finance | finance owner | finance-reviewer | `quality-gate/references/domains/finance-review.md` |
| 4 | legal | legal owner | legal-reviewer | `quality-gate/references/domains/legal-review.md` |
| 5 | marketing/brand | marketing owner | brand-reviewer | `quality-gate/references/domains/marketing-review.md` |
| 6 | people | people owner | people-reviewer | `quality-gate/references/domains/people-review.md` |
| 7 | revenue | revenue owner | revenue-reviewer | `quality-gate/references/domains/revenue-review.md` |
| 8 | automation/ops | automation owner + engineering owner (ops mechanics) | automation-reviewer (+ ops lens) | `quality-gate/references/domains/automation-review.md` + `ops-review.md` |

- Data (`review-data`, `domains/data-review.md`) is a cross-cutting lens owned by `engineering owner`, not a 9th business domain — attach to engineering specs or any spec with schema/lineage impact.
- Every spec declares `Domains-touched: [...]` from this catalogue; packet carries `SPEC/HARD/GATE/DOMAINS` end-to-end.

## ANTI-PATTERNS
- Editing `references/` without updating parent SKILL `§5`.
- Adding `version/author` keys to frontmatter — loader expects `name/description` only.
- Templates carrying creed line — creed lives in SKILL.md only.
- Documenting every skill subdir — parent covers all except `quality-gate`.
- Renaming a reference file without grepping SKILL `§5` + plugin pointers.
