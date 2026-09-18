# Proposed Changes: vasquez (engineering owner) — Grilling C1+C2 Engineering Lane

**Spec Reference:** docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..002 + docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006 (woven by reference) + docs/specs/15_requirements/REQ-grilling-integration-engineering.md#REQ-001..002 + brief docs/briefs/BRIEF-grilling-integration.md (read-only, approved 2026-09-18)
**Agent:** vasquez (Senior CTO / engineering owner) — engineering lane C1+C2
**Date:** 2026-09-18
**Execution_Mode:** multi-subagents (max 2 lanes, inherited from brief; frozen unless orchestrator waiver)
**Domains-Touched:** [engineering, people, security] — owns: engineering (C1+C2 wiring)

> **Singleton note:** canonical `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` slot per propose-changes discipline (create-if-missing else update-in-place, never suffix). Prior content (Antigravity discovery-path fix, 2026-09-18) is superseded by this unit and recoverable from git history (`git log -- docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`); no archive-move in proposal phase. Repo untouched except this file.

## Summary

Wire the opt-in grilling-style challenge plug-in inside two existing stages only: C1 classification-scaled challenger in `skills/frame-intent/SKILL.md` (spike 1 / bounded cap 3 / architectural cap 5 + one-way ratchet, proposed as default pending people co-sign at gate) and C2 pre-approval grill trigger + one-pass budget in `skills/propose-changes/SKILL.md` (+ proposal/risk refs). People guardrail inserts (opt-in + exit hatch, one-at-a-time, anti-sycophancy, warmth, masking, ratchet) are woven by reference from the people spec — no verbatim external grilling text reused. No new skill dir, stage, reviewer, or dependency.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/frame-intent/SKILL.md` | file-modify | C1: add opt-in classification-scaled challenger section — spike 1 question hard cap / bounded 2–3 (hard cap 3) / architectural full grill hard cap 5 (4 core + 1 frontier-empty); falsifiable-bet prompt over 2–3 framings recorded in `Framings-Considered`; one question at a time; opt-in + exit hatch; one-way ratchet (spike→bounded→architectural only, never downgrade). Budget proposed as default; joint engineering + people sign-off at gate (REQ-P-004). |
| `skills/propose-changes/SKILL.md` | file-modify | C2: add pre-approval grill trigger — fires on auth/data/API/PII, multi-domain scope, blast radius mentioning customers/regulators/revenue, or approver request — followed by one-pass budgeted round, then terminal approve/reject; repo files stay untouched during the grill; pause/exit offered after round (REQ-002 + REQ-P-005). |
| `skills/propose-changes/references/proposal-template.md` | file-modify | C2: add trigger checklist hook + one-pass budget line + masking-reminder pointer (by reference to people SPEC §4 inserts); no new required section, additive wording only. |
| `skills/propose-changes/references/risk-assessment.md` | file-modify | C2: add one-pass budget note + blast-radius trigger pointer (customers/regulators/revenue mention fires grill); rollback/approve-reject terminal preserved. |
| `skills/frame-intent/` framing refs (sample) | workflow-update | Verification only: 1 sample BRIEF `Framings-Considered` demonstrating C1 challenger + falsifiable-bet recording; 1 sample proposal demonstrating C2 trigger + one-pass round. Samples carry 0 PII/secrets; evidence links, not ticks. |

Change types per `references/proposal-template.md`. Explicitly untouched: `skills/quality-gate/*` (C3 — sibling lane), `skills/verify-handoff/*` (C4 — sibling lane), `review-security` STRIDE core, `review-architecture` ADR core, `ship-release`, `debugging`, `git-worktree`, `pull-request`, plugin runtime, `package.json` deps.

### People guardrail inserts — woven by reference (not pasted)

Canonical wording lives in `docs/specs/10_design/SPEC-grilling-integration-people.md` §4 (inserts 1–6); this proposal wires pointers to them, verbatim application at execute-spec after gate:

1. Opt-in + exit hatch (`REQ-P-001`) → C1 + C2 openers; exit = immediate stop, no re-ask in same stage, recorded `grill: declined/exited`.
2. One-at-a-time (`REQ-P-002`) → C1 + C2 turn-taking rule.
3. Anti-sycophancy invite (`REQ-P-002`) → every C1/C2 recommended answer carries the disagreement-invite clause (see people SPEC §4.3 for fixed clause).
4. Warmth, relentless banned (`REQ-P-003`) → all touched touchpoints; banned lexicon: relentless, interrogate/interrogation, drill, corner, trap, relentless-mode; substitutes: challenge, explore, test, falsify.
5. Masking reminder (`REQ-P-006`, co-signed people + security) → C2 grill prompt + every export; Ley 172-13; allowlisted evidence only.
6. Ratchet (`REQ-P-004`) → depth only rises mid-initiative, never falls.

Zero verbatim external grilling text reused (LICENSE: MIT w/ attribution if ever quoted — prefer original wording; owner: orchestrator per brief Open Questions).

## Rationale

REQ-001 (C1) falsifies framings before the BRIEF locks `execution_mode` + `Domains-touched`, addressing the frame-intent nod-along gap; REQ-002 (C2) interrogates blast radius/rollback before code is allowed, addressing self-graded proposals. Classification scaling + one-pass budget + ratchet contain the F2 review-load risk accepted in the brief. People inserts keep pressure humane (consent, attention, dignity, safety); chain invariants (proposal-before-code, STRIDE, ADR, N=2 → escalate, reference-only packets) hold throughout.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| New `skills/grilling/` dir or new stage/gate | YAGNI — duplicates quality-gate refuter + ADR adversarial core; brief Out-of-Scope bans it; adds verdict-less bypass risk (Framing 3 rejected in brief). |
| Mandatory (non-opt-in) grill | Violates people opt-in + exit-hatch constraint; risks fatigue/candor loss; brief mandates opt-in. |
| Unbounded / re-grillable C2 round | Violates attention budget (REQ-P-005); one-pass + approver-request-only re-grill is the contained default. |
| Downgradable C1 depth mid-initiative | Breaks ratchet (REQ-P-004); depth only rises. |
| Pasting external grilling text verbatim now | LICENSE + attribution unverified (orchestrator-owned open question); original wording preferred. |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering owner) — proposer cannot self-approve; **BLOCKED until approval recorded at gate**
- [ ] people owner (santana): tone/budget wording co-sign — C1 budget default (1 / cap 3 / cap 5) + ratchet + inserts 1–6 intent-match (REQ-P-004 co-owned)
- [ ] security owner: masking co-sign (REQ-P-006) — informational at proposal; formal bar owned in security lane

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc is produced and committed. Impl/skill files stay untouched. **BLOCKED — never self-approve; return proposal, await gate.**

## Risk Assessment

**Proposer:** vasquez (engineering owner) | **Date:** 2026-09-18 | **Domains-Touched:** [engineering, people, security]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Challenge fatigue — reviewers disengage under added C1/C2 rounds | Med | Med | Opt-in + exit hatch mandatory; one-at-a-time; one-pass C2 cap; pause/exit offered after each round (REQ-P-001/005) |
| R-002 | Nod-along bypass — challenger rubber-stamped, thin proposals still travel | Med | Med | Falsifiable-bet prompt + `Framings-Considered` recording (C1); trigger list is explicit and grep-able (C2); sample demonstrations required at execute |
| R-003 | Tone harm — grill reads as relentless interrogation | Low | High | Warmth clause on every touchpoint; banned-lexicon grep = 0; people-owner gate co-sign blocks tone drift (REQ-P-003) |
| R-004 | PII/secret leak in grill answers or exports | Low | High | Warm masking reminder in prompts; masking/tokenization + allowlisted evidence on every export; guardrails 1–8 hold; security co-sign (REQ-P-006, REQ-NF-001) |
| R-005 | Scope creep — new skill dir / stage / reviewer smuggled in at execute | Low | High | Plug-in invariants (REQ-005) + brief Out-of-Scope restated verbatim-intent; gate greps no-new-dir/stage/reviewer + deps unchanged |
| R-006 | Budget dispute — C1 caps (1/cap 3/cap 5) rejected or downgraded mid-initiative | Low | Med | Proposed as default with joint engineering + people sign-off at gate; one-way ratchet in text; escalation to orchestrator on dispute, never sideways |

### Blast Radius

- Systems: `skills/frame-intent/SKILL.md` (+ framing refs), `skills/propose-changes/SKILL.md` (+ proposal/risk refs) — skill-text only, docs-only SPEC cycle; no endpoints/adapters/boundaries added; no `API_CONTRACTS.md` change; `mise run typecheck` unaffected.
- Teams: engineering (wiring owner), people (tone/budget co-sign), security (masking co-sign + C3 sibling lane). No other domain touched.
- Customers: none directly (no behavior/runtime change); indirect benefit is fewer thin proposals reaching delivery. Failure mode (tone/fatigue) is internal attention cost, contained by opt-in + budgets.
- Regulators: Ley 172-13 — no PII/secrets in grill rounds or samples; masking rides exports; 0 findings expected (REQ-NF-001).
- Revenue: none (no pricing/pipeline/quota surface); failure mode is review-load cost, contained by classification scaling + one-pass budget.

### Rollback Plan

Revert skill-text edits via `git checkout -- skills/frame-intent/SKILL.md skills/propose-changes/SKILL.md <refs>`; delete sample artifacts if created; ETA < 15 min; owner vasquez with people co-sign on wording revert. Proposal-phase rollback is delete-only (this file only). No data migration, no prod surface.

### Security Considerations

No new trust boundary (no endpoints/adapters/boundaries/payloads added); no secret/token/credential/session in skill text, prompts, or samples (guardrails 1–4); least-privilege unchanged; masking/tokenization + allowlists on every grill export (guardrails 5–8); residual: none beyond accepted F2 review-load, carried explicitly.

### Domain Considerations

- People (touched): workload/culture/change plan — opt-in + exit hatch, one-at-a-time, warmth, anti-fatigue budgets; people-owner gate co-sign required (REQ-P-001..007 by reference).
- Security (touched): waiver/residual bar untouched in this lane (C3 sibling owns it); masking co-sign REQ-P-006; no sideways override.
- Non-touched domains (finance, legal, marketing/brand, revenue, automation/ops): no considerations; any need arising at review → formal Cross-domain request to orchestrator (montilla), never sideways.

## Assumptions

1. C1 budget default (spike 1 / bounded cap 3 / architectural cap 5 + ratchet) is accepted as default at gate with people co-sign; exact caps remain a joint engineering + people decision (brief Open Questions).
2. External grilling LICENSE + attribution resolved by orchestrator before any verbatim reuse; this proposal uses original wording only.
3. C3/C4 sibling lanes proceed in parallel without blocking this lane; CLOSED-authority and re-litigation bans are owned there.
4. `SPEC/HARD/GATE/DOMAINS` reference-only packets preserved end-to-end; full spec text never pasted between stages.

## Trace

BRIEF-grilling-integration (Framing 2, KR-1.1/KR-1.2) → SPEC-grilling-integration-engineering#REQ-001..002 + SPEC-grilling-integration-people#REQ-P-001..006 → REQ-grilling-integration-engineering#REQ-001..002 → this proposal → `review-security`/`review-architecture` as required → execute-spec (skill-text only) → quality-gate (people + engineering sign-off) → verify-handoff → ship-release.

## Scoped Evidence (proposal phase)

- `docs/specs/10_design/SPEC-grilling-integration-engineering.md` (65 lines): REQ-001 C1 challenger + REQ-002 C2 trigger + invariants REQ-005/006; output targets §4.
- `docs/specs/10_design/SPEC-grilling-integration-people.md` (112 lines): REQ-P-001..006 guardrails + §4 canonical inserts 1–6 (by reference); budget table + ratchet REQ-P-004.
- `docs/specs/15_requirements/REQ-grilling-integration-engineering.md` (30 lines): REQ-001/002 P0 + REQ-NF-001/002 + people/security domain controls.
- `docs/briefs/BRIEF-grilling-integration.md` (71 lines, approved 2026-09-18): Framing 2 full C1–C4, scope C1/C2, constraints (zero deps, opt-in, ratchet, warmth), open questions (LICENSE → orchestrator; C1 budget → engineering + people).
- Skill loaded: `frame-ship:propose-changes` via skill tool — base `skills/propose-changes/SKILL.md` + `references/proposal-template.md` + `references/risk-assessment.md` (local mirror `D:\GitHub\frame-ship\skills\propose-changes\`).
- Singleton honored: update-in-place of `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`, no suffixed copy; impl/skill files untouched (`git status` shows this file only).
