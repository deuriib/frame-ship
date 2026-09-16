# Risk Review: plugin-001-concise-prompts

**Reviewer:** review-risk (fast gate verification)
**Date:** 2026-09-16
**Spec Reference:** INTENT-2026-09-16-concise-plugin-prompts (`docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md`)
**Security Review:** `docs/specs/40_workspace/barrera/SECURITY_REVIEW.md` (Conditional, C-1..C-6 binding)
**Target:** `.opencode/plugins/frame-ship.ts` @ `1a805bc`
**Execution_Mode:** single (direct execution — no `task()` tool in this harness; skill + template read first per adapter)
**Verdict:** APPROVE (all C-1..C-6 verified against the implemented diff; residuals RR-1/RR-2 ride as owned watch-items)

## Condition Verification (binding C-1..C-6 vs. implemented code)

| Cond | Status | Evidence |
|------|--------|----------|
| C-1 Guardrail semantics 1:1 | ✅ verified | All 14 numbers greppable in `frame-ship.ts:25-29` (measured `[1..14]` present). Spot-checks: rule 1 deny-by-default + `finding w/o proof(diff/scan/log)=REFUTED` (`:26`); rule 3 minimum scope (`:26`); rule 4 never rotate/patch/widen (`:26`); rules 5-8 minimization/boundary/retention/scoped-export (`:27-28`); rules 9-11 severity scale + same-session surfacing + no silent PASS (`:28`); rules 12-14 conduct (`:29`); FAIL → retry N=2 → escalate (`:29`). |
| C-2 Chain integrity | ✅ verified | Single `CHAIN` const `frame-ship.ts:13-14` with exact order string; interpolated at `:17` (card), `:31` (pointers), `:33` (compaction). 1 literal + 3 interpolations, no drift vector. |
| C-3 Verbatim logic + hygiene | ✅ verified (smoke deferred, see Assumptions) | `git diff 1a805bc^ 1a805bc`: 20 insertions / 87 deletions, string literals + header comment only; zero logic-line touches (`hasMarker`, `fileUrlToPath`, `resolveSkillsDir`, `loadBootstrapBody`, hooks, exports untouched). `tsc --noEmit` clean (exit 0, run 2026-09-16 from `.opencode/`). Single `import type` only — zero-deps holds. |
| C-4 Token gate | ✅ verified | `WORKFLOW_CARD` 1,480 + `GUARDRAILS_FULL` 1,433 + `POINTERS` 250 = 3,163; + bootstrap body 4,457 = **7,620** vs 11,098 baseline = **−31.3%** (≥30% PASS). Semantic checklist 1:1 — load order 1-4, 2 exec modes, 9/9 triggers present, 7 hard rules, role bindings, chain order. |
| C-5 No new secrets/PII | ✅ verified | Literal scan clean (no `sk-`/`ghp_`/`AKIA`/private-key/password patterns). No PII examples added; Ley 172-13 clauses intact (`:27-28`). |
| C-6 Full wave at quality-gate | ✅ this gate | This report + 4 single-mode reviews (readability, risk, refuter, qa) re-verified semantics against the implemented diff. |

## New Attack Surface

None. No endpoints, adapters, service boundaries, payloads, or dependencies introduced — prompt-text-only change, single-file, zero-deps preserved. OWASP screen: nothing to map beyond the already-covered S-001..S-003 (all mitigated by the conditions verified above).

## Risks (residual, owned)

- **RR-1** (owner: vasquez, watcher: barrera): subtle tone-weakening may pass the checklist yet soften enforcement in long sessions. Likelihood Low under C-1. Watch at verify-handoff orientation check.
- **RR-2** (owner: vasquez): sessions habituated to duplicated wording may under-orient on compact form. Likelihood Low, impact Med. Live bootstrap body remains full source of truth.

## Assumptions

- A-1: init/compact smoke (restart opencode, confirm single injection, no duplication on retry) cannot run in this harness — deferred as verify-handoff follow-up. Justification: hook/loader logic byte-untouched, so smoke risk is minimal; rollback is single-file `git revert` (<15 min).

## Craft + Process

- Skill: `skills/quality-gate/SKILL.md`
- Template: `agents/engineering/review-risk.md` (REVIEW → CLASSIFY → ASSESS → REPORT; calibrated severity)
