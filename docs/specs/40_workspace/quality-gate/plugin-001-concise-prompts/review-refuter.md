# Refuter Review: plugin-001-concise-prompts

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Spec Reference:** INTENT-2026-09-16-concise-plugin-prompts (`docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md`)
**Target:** `.opencode/plugins/frame-ship.ts` @ `1a805bc`
**Execution_Mode:** single (direct execution — no `task()` tool in this harness; skill + template read first per adapter)
**Verdict:** pass ("could not falsify")

## Mission

Attempt to **falsify** the implementation's claims. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | "≥30% reduction" fails on re-measure | Re-measured: (3,163 static + 4,457 bootstrap) = 7,620 vs 11,098 baseline = −31.35% | Confirmed — claim holds exactly |
| RF-002 | "223→156 lines" is wrong | Read file: 156 lines, 9,685 chars | Confirmed |
| RF-003 | Diff secretly touches hook/loader logic | Filtered diff for `function\|hasMarker\|fileUrlToPath\|resolveSkillsDir\|loadBootstrapBody\|FrameShipPlugin\|out.system\|out.context\|c.skills\|import.meta\|readFile`: only hit is a header *comment* line | Confirmed — logic verbatim |
| RF-004 | Compact card drops a hard rule or trigger | Grepped all 9 stage names + 7 hard-rule anchors (`waiver`, `HANDOFF`, `reference-only`, `no code w/o proposal`, `security review`, `ADR`, `REQ→test`): all present (`frame-ship.ts:17-22`) | Confirmed — nothing dropped |
| RF-005 | Guardrail short-form changes meaning (rules 4, 11 — the load-bearing ones) | Compared: rule 4 "never rotate keys/patch prod/widen perms; report severity+location, owner remediates" vs full "never rotate keys, patch prod, or widen permissions yourself. Report severity + fix location; owner remediates" — same meaning. Rule 11 "no silent PASS" present verbatim-in-meaning (`:28`) | Confirmed — no semantic shift |
| RF-006 | `CHAIN` extraction leaves a stale inline copy | Counted full order literal: 1 occurrence (the const); 3 `${CHAIN}` interpolations (`:17`, `:31`, `:33`); `frame-intent` appears 4x total, all via const | Confirmed — single source, no drift |
| RF-007 | Load-order HARD STOP lost its teeth in compression | Card still states: numbered 1-4 order, `no skill=STOP`, pre-flight checks, `NO→STOP, retry N=2, escalate montilla. No 3rd loop, no sideways` (`:18`) | Confirmed — enforcement posture intact |

## Counterexamples Found

None. Seven falsification attempts, zero counterexamples.

## Verdict Rationale

- pass = attempted falsification, no counterexamples found. The highest-risk claim (guardrail semantic preservation, S-001/R-001) survived direct clause-by-clause comparison on its two load-bearing rules plus greppability of all 14 numbers. The most likely silent failure (logic touched during string edit, R-004) is refuted by the filtered diff.

## Craft + Process

- Skill: `skills/quality-gate/SKILL.md`
- Template: `agents/engineering/review-refuter.md` (RECEIVE_CLAIMS → VERIFY_AGAINST_CODE → REFUTE → REPORT)
- Checklist shape: `skills/quality-gate/references/engineering/refuter-review.md`
