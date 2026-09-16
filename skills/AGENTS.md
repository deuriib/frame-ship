# SKILLS — Frame→Ship chain

## OVERVIEW
9 stage skills: process source of truth. Plugin only injects pointers; this dir defines behavior.
Vendored craft: `agents/<domain>/<agent>.md` (68 templates, reference-only, skills cite by path).

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
- Stage file counts: `quality-gate` 15+ files; `translate-to-spec` + `using-frame-ship` 4 (SKILL + 3 refs); all others 3 (SKILL + 2 refs). Templates live in `agents/` outside stage counts (`skills/templates/` removed).
- Commit closings: every stage ends with a work-unit commit step + example per `using-frame-ship/references/commit-convention.md` (guidance only, never gate enforcement); `execute-spec` commits one per approved task/REQ-ID.
- Role owners: `montilla` briefs/releases + is the sole dispatcher to the entire team (ADR-003: CEO dispatches entire team; c-levels/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to the CEO); `vasquez` arch; `barrera` security; leaf specialists impl.
- Execution mode frozen at `frame-intent` (`single` | `multi-subagents`) rides `SPEC/HARD/GATE/DOMAINS` packets; templates add `Template-For` + `Execution` meta, never skill frontmatter.

## DOMAIN CATALOGUE (canonical — 8 business domains, full chain for all)

| # | Domain | Owner (C-level) | Gate reviewer | Gate template |
|---|--------|-----------------|---------------|---------------|
| 1 | engineering | vasquez (CTO) | readability, reliability, refuter, resilience, risk, qa (+data) | `quality-gate/references/engineering/` |
| 2 | security | barrera (CISO) | security-reviewer | `quality-gate/references/domains/security-review.md` |
| 3 | finance | dauhajre (CFO) | finance-reviewer | `quality-gate/references/domains/finance-review.md` |
| 4 | legal | subero (CLO) | legal-reviewer | `quality-gate/references/domains/legal-review.md` |
| 5 | marketing/brand | vera (CMO) | brand-reviewer | `quality-gate/references/domains/marketing-review.md` |
| 6 | people | santana (CHRO-CPO) | people-reviewer | `quality-gate/references/domains/people-review.md` |
| 7 | revenue | montero (CRO) | revenue-reviewer | `quality-gate/references/domains/revenue-review.md` |
| 8 | automation/ops | espinoza (Automation) + vasquez (ops mechanics) | automation-reviewer (+ ops lens) | `quality-gate/references/domains/automation-review.md` + `ops-review.md` |

- Data (`review-data`, `domains/data-review.md`) is a cross-cutting lens owned by `vasquez`, not a 9th business domain — attach to engineering specs or any spec with schema/lineage impact.
- Every spec declares `Domains-touched: [...]` from this catalogue; packet carries `SPEC/HARD/GATE/DOMAINS` end-to-end.

## ANTI-PATTERNS
- Editing `references/` without updating parent SKILL `§5`.
- Adding `version/author` keys to frontmatter — loader expects `name/description` only.
- Templates carrying creed line — creed lives in SKILL.md only.
- Documenting every skill subdir — parent covers all except `quality-gate`.
- Renaming a reference file without grepping SKILL `§5` + plugin pointers.
