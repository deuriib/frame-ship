# Handoff: skill-refs-normalization (engineering, single)

**Spec Reference:** docs/briefs/BRIEF-skill-refs-normalization.md#OKRs (REQ-001..REQ-003 derived from KR-1.1/KR-1.2/KR-2.1)
**Agent:** vasquez
**Date:** 2026-09-16
**Status:** complete
**Domains-Touched:** [engineering]
**Load Evidence:** skill(skills/translate-to-spec/SKILL.md) + skill(skills/propose-changes/SKILL.md) + skill(skills/review-architecture/SKILL.md) + skill(skills/review-security/SKILL.md) + skill(skills/execute-spec/SKILL.md) + skill(skills/quality-gate/SKILL.md) + skill(skills/verify-handoff/SKILL.md) + read(agents/c-level/vasquez.md) + mode(single — direct, no task fan-out, frozen at frame-intent) — packet SPEC/HARD/GATE/DOMAINS intact by reference
**Gate Reference:** this file §Gate Verdict (OPEN, min wave direct 2026-09-16; no waiver needed)

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| Normalized refs (REQ-001/REQ-002) | 10× `skills/*/SKILL.md` — `git diff --stat`: 10 files, 52 insertions / 52 deletions, 1:1 line swaps | done |
| Traceability (REQ-003) | this HANDOFF + gate verdict below + `git diff --name-only` (exactly the 10 in-scope files) | done |
| Proposal | chain proposal recorded in this HANDOFF §Proposal (docs-only, owner-approved, no repo mod at propose stage) | done, approved |
| Arch review | waived with reason — see §Architecture | waived |
| Security fast review | N/A verdict with evidence — see §Security | done |

## Proposal (propose-changes record)

- **Rule:** every inter-skill navigation cite uses canonical `` `frame-ship:{skill-name}` `` (plain form in ASCII diagrams, matching prior diagram style); harness invocations `` `skill(<stage>)` ``, filesystem paths (`../using-frame-ship/...`), and frontmatter `name:`/`description:` intentionally untouched (tool API / file resolution / loader contract — see Assumptions).
- **Per-file plan:** §2 Chain Contract Previous/Next → `frame-ship:` prefix; §3 handoff/return lines → prefix; §4 `Won't do` escalations → prefix; ASCII chains (`using-frame-ship`, `frame-intent`, `quality-gate`) → full `frame-ship:` chain, `review-*` wildcard expanded to `frame-ship:review-security / frame-ship:review-architecture`; §5 `commit-convention.md` lines (9 files) → appended `see frame-ship:using-frame-ship`.
- **Risk:** blast radius docs-only (readers/navigators); no runtime, no contracts, no teams/customers/regulators/revenue impact; rollback single `git revert`, <15 min. **Approver:** vasquez (owner, docs-engineering); gate verifies independently.

## Architecture (review-architecture record)

- **ADR: waived with explicit reason.** Docs-only prose normalization; no public API, data model, cross-cutting behavior, or invariant change; no `docs/specs/10_design/` contract touched; fully reversible. No ADR = correct here, not improvisation (nothing designed).
- Skill: `skills/review-architecture/SKILL.md`. Template craft: `agents/c-level/vasquez.md`.

## Security (review-security fast record)

- **Verdict: N/A (no security relevance).** Evidence: docs-only prose swaps; no auth/data/external-API/endpoints/adapters/boundaries/payloads touched (`git diff --name-only` = 10× SKILL.md only); secret scan clean (only `risk-assessment.md` filename hit, no credential material); no PII in evidence (file:line only, Ley 172-13 minimization respected); no key rotation/prod/perm changes. No STRIDE (no trust boundary changed), no Critical/High, nothing to surface to `barrera`/`montilla`.
- Skill: `skills/review-security/SKILL.md`. Template craft: `agents/c-level/vasquez.md` (single-mode direct fast eval per packet; full `barrera` STRIDE not triggered).

## Definition of Done Checklist

Common (all domains):

- [x] All acceptance criteria met — KR-1.1 10/10 files carry `frame-ship:` (14/6/5/4/4/4/5/3/2/5 per-file counts, 52 total); KR-1.2 zero bare backticked navigation refs + zero `review-*` wildcards; KR-2.1 this trace + OPEN gate
- [x] All REQ-IDs have linked evidence — REQ-001→`rtk rg -c "frame-ship:"` 10/10 + per-file counts; REQ-002→zero bare/wildcard greps + `git diff --name-only` scope-exact; REQ-003→diff stat 52/52 + this HANDOFF + gate verdict
- [x] Edge cases handled — `skill()` calls / file paths / frontmatter deliberately preserved (see Assumptions); `review-*` wildcard eliminated (was the only non-greppable old form besides bare names)
- [x] Gate OPEN — min wave 4/4 direct pass (readability/risk/refuter/qa) + this verify audit; no COND items, no waiver
- [x] Load evidence — 7 stage skills + `agents/c-level/vasquez.md` cited with paths, execution_mode single declared, packet reference-only throughout
- [x] Docs updated — the 10 SKILL.md ARE the docs; no changelog/release (explicit out-of-scope, no releases reales)

Engineering appendix (vasquez — engineering-touched):

- [x] Lint/types/tests — n/a (no harness; repo `tests/` empty per AGENTS.md); project suite = grep + `git diff` verifications, all green (see QA)
- [x] No TODO/FIXME introduced — diff is pure 1:1 ref swaps, no new prose beyond `frame-ship:` prefixes + 9× `see` annotations
- [x] Reversible — 10 tracked-file mods only, no new/deleted files, `git revert` clean

## Traceability

- REQ-001 (refs normalizadas 10/10) → `using-frame-ship/SKILL.md:20,23-25,47-55,62` + `frame-intent:18,21-22,38,43` + `translate-to-spec:17-18,35,41` + `propose-changes:16-17,35` + `review-security:18-19` + `review-architecture:17-18,33` + `execute-spec:17-18,38` + `quality-gate:18-19,22,62` + `verify-handoff:17-18,31-32` + `ship-release:17` → qa grep 52 hits 10/10 → gate OPEN → this handoff
- REQ-002 (cero rotas/viejas + §5) → 9× §5 `see frame-ship:using-frame-ship` annotations + zero bare-backtick + zero wildcard greps + paths unchanged/resolvable → refuter holds → this handoff
- REQ-003 (REQ→evidencia→gate) → diff stat 10 files 52+/52- + secret/frontmatter scans clean + OPEN verdict + this HANDOFF → route to `montilla` synthesis

## Gate Verdict (quality-gate min wave, single direct)

| Reviewer | Verdict | Findings | Artifact |
|----------|---------|----------|----------|
| review-readability | ✅ PASS | Uniform `frame-ship:{kebab}` form; §5 annotations identical shape; diagrams match prior ASCII style | 10× SKILL.md diff |
| review-risk | ✅ PASS (N/A security) | Docs-only, no trust boundaries, scan clean, no PII/secrets; no Critical/High | fast record above |
| review-refuter | ✅ PASS | 4 claims attacked (10/10, zero-rotas, reversible, no-frontmatter/runtime) — all hold against diff+greps | greps + diff stat |
| qa | ✅ GREEN | 10/10 `frame-ship:` files; 0 bare; 0 wildcard; stat 10f 52+/52-; scope-exact; frontmatter/runtime untouched | grep + git outputs |
| verify (this audit) | ✅ PASS | DoD all checked; proposal+waiver+N/A recorded; HARD respected (10-file max, no runtime/frontmatter/releases) | this HANDOFF |

**Gate: OPEN** — no conditions, no waiver. Residual risk: **Low** (hygiene) — future edits may reintroduce bare cites; mitigation owner **vasquez**: KR grep (`frame-ship:` vs bare) stays the measurable guard.

## Blockers / Open Questions

None. Out-of-scope carries (not opened): runtime `frame-ship.ts`, frontmatter keys, new/removed skills, real releases — all untouched per HARD.

## Lessons

- `skill()` calls vs `frame-ship:` cites are different namespaces (tool API vs navigation) — keeping both is correct; the measurable old-form is bare backticked names + `review-*` wildcards, both now at zero.
- 1:1 line-swap diffs (52+/52-) make docs-only gates trivially auditable — preserve this shape for future ref normalizations.

## Next Agent

`montilla` synthesis: consume this PASS packet (diff list + gate OPEN + this HANDOFF ref). No `ship-release` (no releases reales per HARD/SCOPE).
