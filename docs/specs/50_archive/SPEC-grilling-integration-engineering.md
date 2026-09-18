# Spec: Grilling-Style Challenge Plug-in (C1–C4) — Engineering Domain

**ID:** SPEC-grilling-integration-engineering
**Owner:** engineering owner
**Domains-Touched:** [engineering, people, security]
**Brief Reference:** docs/briefs/BRIEF-grilling-integration.md (read-only) + docs/briefs/OKR-grilling-integration.md
**Status:** draft
**Priority:** P1
**Execution_Mode:** multi-subagents (inherited from brief; max 2 parallel lanes; per-SPEC override only with orchestrator waiver)

## 1. Context

Frame-ship gates have rigor (STRIDE verdicts, ADR invariants, gate refuter, debugging Iron Law) but soft challenge early and late: `frame-intent` section-wise "looks right?" invites nod-along; `propose-changes` blast radius/rollback is self-graded; `quality-gate` CONDITIONALs/waivers can pass on thin justification; `verify-handoff` DoD accepts attestation-grade evidence links. This spec wires an opt-in grilling-style challenge plug-in *inside* four existing stages — never a new stage, never a mandatory gate, never a new skill dir or reviewer — reusing existing reviewers/templates: C1 classification-scaled challenger in `frame-intent`, C2 pre-approval grill trigger + one-pass budget in `propose-changes`, C3 refuter-amplification + waiver-interrogation lane (full re-review banned) in `quality-gate`, C4 REQ→evidence-link presence check (re-litigation banned) in `verify-handoff`. Tone stays warm, one question at a time, opt-in + exit hatch; retry N=2 → escalate and gate authority (CLOSED stays CLOSED) hold throughout.

## 2. Requirements

- REQ-001 (C1 — classification-scaled challenger): `skills/frame-intent/SKILL.md` gains an opt-in challenger scaled to classification — spike 1 question / bounded 2–3 / architectural full grill — with a falsifiable-bet prompt over the 2–3 framings; challenger output is recorded in `Framings-Considered`; one question at a time; opt-in + exit hatch honored; one-way ratchet (never downgrade mid-initiative).
- REQ-002 (C2 — pre-approval grill trigger + one-pass budget): `skills/propose-changes/SKILL.md` (+ proposal/risk refs) gains a pre-approval grill trigger — fires on auth/data/API/PII, multi-domain scope, blast radius mentioning customers/regulators/revenue, or approver request — followed by a one-pass budgeted round, then approve/reject; repo files stay untouched during the grill.
- REQ-003 (C3 — refuter amplification + waiver-interrogation lane; full re-review ban): `skills/quality-gate/SKILL.md` (+ gate-report/waiver refs) gains a surgical lane only — amplify the existing refuter output and interrogate CONDITIONAL/waiver justification (accepted-risk + compensating-controls + expiry) — with an explicit ban on re-running the full routing table; CLOSED stays CLOSED without domain-owners + orchestrator sign-off; retry N=2 → escalate.
- REQ-004 (C4 — evidence-link check; re-litigation ban): `skills/verify-handoff/SKILL.md` (+ dod-checklist refs) gains a REQ→evidence-link presence check — every REQ links evidence, not a tick; missing link = FAIL, no handoff — with an explicit ban on re-litigating settled gate verdicts (findings return to `execute-spec` instead); N=2 + `SPEC/HARD/GATE/DOMAINS` reference-only packets preserved.
- REQ-005 (Plug-in invariants): No new skill directory, no new stage, no new reviewer role; existing reviewers/templates reused; zero new dependencies; warmth preserved ("relentless" interrogation explicitly excluded); opt-in + exit hatch mandatory across C1–C4; classification depth never downgrades mid-initiative.
- REQ-006 (Chain invariants preserved): Proposal-before-code, STRIDE on auth/data/API, ADR on contract change, no handoff on CLOSED without waiver, retry N=2 → escalate, `SPEC/HARD/GATE/DOMAINS` reference-only packets end-to-end.

## 3. Acceptance Criteria

- [ ] AC-001 (C1/C2 present): `skills/frame-intent/SKILL.md` shows classification-scaled challenger + falsifiable-bet recording rule; `skills/propose-changes/SKILL.md` shows trigger list + one-pass budget + approve/reject terminal; 1 sample BRIEF and 1 sample proposal demonstrate each.
- [ ] AC-002 (C3 surgical): `skills/quality-gate/SKILL.md` + gate-report/waiver refs show refuter-amplification + waiver-interrogation lane, full re-review ban in text, and CLOSED-authority rule (domain-owners + orchestrator sign-off) intact.
- [ ] AC-003 (C4 strict): `skills/verify-handoff/SKILL.md` + dod-checklist refs show REQ→evidence-link check, missing = FAIL rule, and re-litigation ban with return-to-`execute-spec` routing.
- [ ] AC-004 (Invariants): No new `skills/*/` dir, no new stage, no new reviewer; `package.json`/plugin deps unchanged; opt-in + exit-hatch + one-question-at-a-time + warmth wording present in all four touchpoints; guardrails 1–15 hold (no secrets/PII in grill rounds, masking on exports).
- [ ] AC-005 (Trace): Every REQ maps to a brief OKR (see §7); out-of-scope §5 restates the brief verbatim in intent; open questions remain escalations, not silent resolutions.

## 4. Contracts & Interfaces

- Output targets (skill-text only, no runtime change): `skills/frame-intent/SKILL.md`; `skills/propose-changes/SKILL.md` + `references/proposal-template.md` / `risk-assessment.md`; `skills/quality-gate/SKILL.md` + `references/gate-report.md` / `waiver-template.md`; `skills/verify-handoff/SKILL.md` + `references/dod-checklist.md` / `handoff-template.md`. No `API_CONTRACTS.md` change (no endpoints/adapters/boundaries added).
- Sign-off contracts: engineering owner (process fidelity + chain binding, this spec); people owner (tone/attention/opt-in guardrail — own spec); security owner (waiver scrutiny + residual-risk bar — own spec). Architecture consolidation: `docs/specs/10_design/ARCHITECTURE.md` untouched by this SPEC cycle unless `propose-changes` alters a contract shape (then ADR via `review-architecture`).
- Handoff packet to `propose-changes`: `SPEC:docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..006 / HARD:multi-subagents+zero-new-deps+no-new-skill-dir / GATE:none-yet / DOMAINS:[engineering,people,security]`.

## 5. Out of Scope

Restated from BRIEF-grilling-integration (read-only, no reinterpretation):

- New skill directory, new stage, or new reviewer role — reuse existing reviewers/templates only.
- Changes to `review-security` STRIDE core or `review-architecture` ADR core beyond the C3 scrutiny lane.
- Mid-`execute-spec` interruption, worktree isolation changes, or per-REQ commit rhythm changes.
- `ship-release` rollback re-litigation or archive mechanics changes.
- Verbatim copy of external `grilling` text without LICENSE verification + attribution.
- `debugging` Iron Law, `git-worktree` mechanics, or `pull-request` budget changes.

## 6. Dependencies

- BRIEF-grilling-integration (approved 2026-09-18) + OKR-grilling-integration (KR-1.1–KR-2.2); skills/AGENTS.md conventions (body shape, frontmatter `name/description` only).
- Cross-domain inputs (by reference, owners brief back): people-owner spec (tone/attention/opt-in wording), security-owner spec (waiver quality bar + residual-risk bar).
- Open-question owners (escalations, not resolved here): orchestrator (external grilling LICENSE + attribution before any verbatim reuse); engineering + people owners (exact C1 per-classification question budget); security owner (C3 waiver justification quality-bar wording).
- No runtime/plugin dependency; `mise run typecheck` unaffected (docs-only SPEC cycle).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence | Brief OKR |
|-------------|---------------------|-----------------|----------|-----------|
| REQ-001 | AC-001, AC-004, AC-005 | PROPOSED_CHANGES.md | challenger + falsifiable-bet text in `skills/frame-intent/SKILL.md` + sample BRIEF `Framings-Considered` | KR-1.1 |
| REQ-002 | AC-001, AC-004, AC-005 | PROPOSED_CHANGES.md | trigger list + one-pass budget text in `skills/propose-changes/SKILL.md` + sample proposal | KR-1.2 |
| REQ-003 | AC-002, AC-004, AC-005 | PROPOSED_CHANGES.md | interrogation lane + re-review ban + CLOSED-authority text in `skills/quality-gate/SKILL.md` + refs | KR-2.1 |
| REQ-004 | AC-003, AC-004, AC-005 | PROPOSED_CHANGES.md | evidence-link check + FAIL rule + re-litigation ban in `skills/verify-handoff/SKILL.md` + refs | KR-2.2 |
| REQ-005 | AC-004 | PROPOSED_CHANGES.md | no-new-dir/stage/reviewer diff + warmth/opt-in wording | Brief Constraints |
| REQ-006 | AC-004, AC-005 | PROPOSED_CHANGES.md | chain-invariant statements intact across touched skills | Brief Constraints |
