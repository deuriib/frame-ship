# SKILLS — Frame→Ship chain

## OVERVIEW
12 dirs (bootstrap `using-frame-ship` + 9 stages + 2 supporting skills): process source of truth. Plugin only injects pointers; this dir defines behavior.

## WHERE TO LOOK — Core 9-Stage Chain
| Trigger | Skill | Out |
|---------|-------|-----|
| new initiative / OKRs | `frame-intent/` | `BRIEF-<slug>.md` |
| brief approved | `translate-to-spec/` | REQ-IDs + `SPEC-*.md` in `20_backlog/` + `ARCHITECTURE.md` |
| ready to implement | `propose-changes/` | `PROPOSED_CHANGES.md`, impl files untouched |
| auth/data/API | `review-security/` | STRIDE verdict |
| public API/model | `review-architecture/` | `ARCHITECTURE_REVIEW.md` + `ADR-*.md` in `12_adr/` (ADR only if invariant/component/cross-domain contract changes) |
| approved spec | `execute-spec/` | impl + `test-matrix.md` |
| impl done | `quality-gate/` | `GATE_REPORT.md` |
| complete | `verify-handoff/` | `HANDOFF.md` |
| verified | `ship-release/` | notes + changelog + `50_archive/<spec-id>/` (spec + GATE_REPORT + HANDOFF + ARCHIVE-RECORD) |

## SUPPORTING SKILLS (transversal / opt-in)
| Trigger | Skill | Out | Coupling / Stage Handoff |
|---------|-------|-----|--------------------------|
| bug report / failed test / unexpected behavior | `debugging/` | RCA Fases 1-4 + failing reproduction | feeds into `propose-changes` |
| branch / pull request / ready-for-review | `pull-request/` | PR with ≤400 lines & checks | input to `quality-gate` |

- Parallel execute-spec lanes (subagents, max 2): NOT a skill anymore — `execute-spec/references/worktree-annex.md` (former `git-worktree/`, merged 2026-09-22).

## CONVENTIONS
- Body shape fixed: Purpose / Chain Contract (Prev/Next) / 2b Role Binding / Process / Won't do / References.
- Skill loading order (chain + external): stage skill ONCE first (no skill = STOP), then at most 1-2 external skills on trigger match; chain wins on conflict; cite external guidance by path + anchor (reference-only). Source: `rules/skills.md`.
- Chain ascii only in `frame-intent` + `quality-gate`; others declare Prev/Next in text.
- References use bracket placeholders: `[description]`, `XXX`, `YYYY-MM-DD`.
- Shared challenge mechanics (C1–C4 glossary/opener/human contract) live ONLY in `using-frame-ship/references/challenge-round.md`; the four stage SKILLs cite it and keep only trigger + budget.
- `execute-spec` holds `references/worktree-annex.md` (former `git-worktree` skill, merged 2026-09-22); there is no `git-worktree/` skill dir anymore.
- Stage file counts: `quality-gate` 18 files (SKILL + AGENTS + 2 refs + 5 engineering + 9 domains); `ship-release` 7 (SKILL + 6 refs incl. `archive-record` + conditional readme/install/migration); `execute-spec` 5 (SKILL + 4 refs incl. `worktree-annex`); `translate-to-spec` 3 (SKILL + 2 refs — `architecture-template` moved to `review-architecture`); `review-architecture` 4 (SKILL + 3 refs incl. `architecture-template`); `debugging` 4 (SKILL + 3 refs); `using-frame-ship` 3 (SKILL + 2 refs incl. `challenge-round`); `pull-request` 3 (SKILL + 2 refs); all others 3 (SKILL + 2 refs).
- Commit closings: every stage ends with a commit step + example; `execute-spec` commits one per approved task/REQ-ID.
- Role owners: `orchestrator` briefs/releases + is the sole dispatcher to the entire team; `engineering owner` arch; `security owner` security; leaf specialists impl.
- Execution mode frozen at `frame-intent` (`subagents` only) rides `SPEC/HARD/GATE/DOMAINS` packets, never skill frontmatter.
- Reviewer independence: Reviewers are strictly independent from each other. Exactly one dedicated subagent per reviewer (`1 subagent per reviewer`). No single agent combines or performs multiple reviewer assessments.

## DOMAIN CATALOGUE (canonical — 8 business domains, full chain for all)

| # | Domain | Owner (domain owner) | Gate reviewer | Gate template |
|---|--------|-----------------|---------------|---------------|
| 1 | engineering | engineering owner | readability, reliability, refuter, resilience, risk, quality-assurance (+data) | `quality-gate/references/engineering/` |
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
- Re-defining challenge glossary/opener/human contract inside a stage SKILL — cite `using-frame-ship/references/challenge-round.md`.
- Reintroducing a `git-worktree/` skill dir — lanes live in `execute-spec/references/worktree-annex.md`.
- Adding `version/author` keys to frontmatter — loader expects `name/description` only.
- Templates carrying creed line — creed lives in SKILL.md only.
- Documenting every skill subdir — parent covers all except `quality-gate`.
- Renaming a reference file without grepping SKILL `§5` + plugin pointers.
