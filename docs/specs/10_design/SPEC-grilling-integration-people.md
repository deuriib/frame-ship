# Spec: Grilling-Style Challenge Plug-in (C1–C4) — People Domain

**ID:** SPEC-grilling-integration-people
**Owner:** santana (CHRO/CPO, people owner)
**Domains-Touched:** [engineering, people, security] — owns: people
**Brief Reference:** docs/briefs/BRIEF-grilling-integration.md (read-only, approved 2026-09-18) + docs/briefs/OKR-grilling-integration.md
**Status:** draft
**Priority:** P1
**Execution_Mode:** multi-subagents (inherited from brief; max 2 parallel lanes; per-SPEC override only with orchestrator waiver)

## 1. Context

C1–C4 adds adversarial pressure inside four existing stages. Without people guardrails,
challenge degrades into fatigue, nod-along, or "relentless" interrogation — killing
candor and attention. This spec owns the human contract across all four touchpoints:
consent (opt-in + exit hatch), attention (one-at-a-time + budgeted depth),
dignity (warmth preserved, relentless banned, disagreement invited), and
safety (no PII/secrets in grill rounds, masking rides every export).
Engineering owns the wiring; security owns the waiver/residual bar; people owns
whether the wording is humane enough to use.

## 2. Requirements

- REQ-P-001 (Opt-in + exit hatch, mandatory C1–C4): Every grill round opens with
  explicit opt-in prompt and names the exit word. Exit = immediate stop, no
  re-ask in same stage, no penalty, recorded as `grill: declined/exited`.
  Test: wording present verbatim in all four touched skills + refs; review grep = 4/4.
- REQ-P-002 (One question at a time + anti-sycophancy): Challenger asks exactly
  one question, waits for answer, then proceeds. Every recommended-answer MUST
  invite disagreement with the fixed clause "¿dónde puede estar mal? / where could
  this be wrong?". Test: wording present in C1 + C2 refs; sample round shows 1:1 turn-taking.
- REQ-P-003 (Warmth preserved; relentless banned): All four touchpoints carry
  warmth-preserved clause. Banned lexicon: relentless, interrogate/interrogation,
  drill, corner, trap, relentless-mode. Approved substitutes: challenge, explore,
  test, falsify. Test: banned-term grep = 0 in touched skills; warmth clause grep = 4/4.
- REQ-P-004 (C1 classification-scaled depth, co-owned + one-way ratchet):
  spike = 1 question hard cap; bounded = 2–3 (hard cap 3); architectural = full
  grill hard cap 5 (4 core + 1 frontier-empty). Depth NEVER downgrades mid-initiative
  (one-way ratchet: spike→bounded→architectural only). Budget co-owned
  engineering + people. Test: budget table present in frame-intent ref + sample BRIEF.
- REQ-P-005 (Anti-fatigue / attention budget): C2 = one-pass only (no re-grill
  without approver request); C3 = surgical lane only (refuter-amplify + waiver-interrogate,
  full re-review banned); C4 = presence-check only (REQ→evidence-link, no re-litigation).
  After each round the agent MUST offer pause/exit. Test: budget wording in all four
  touchpoints; no unbounded-loop language.
- REQ-P-006 (Masking-prompt co-sign, warm + opt-in): Grill prompts MUST include
  warm masking reminder: no PII/secrets/tokens in answers; masking/tokenization
  rides every export; allowlisted evidence only. Co-signed people + security.
  Test: masking clause present in C2/C4 refs; guardrails 1–8 hold on sample.
- REQ-P-007 (No rule edits without gate): This spec proposes wording only.
  Application to `skills/*` requires approved PROPOSED_CHANGES.md + people-reviewer
  gate (APPROVE). Test: gate record present before any skill diff.

## 3. Acceptance Criteria

- [ ] AC-P-001 (Consent): opt-in + exit-hatch wording identical in intent across
  C1/C2/C3/C4 touchpoints; exit honored in 1 sample round each (or attested decline path).
- [ ] AC-P-002 (Attention): one-question-at-a-time + disagreement-invite clause
  present in C1/C2; C1 budget table (1 / 2–3 cap 3 / full cap 5) present; ratchet rule in text.
- [ ] AC-P-003 (Warmth): banned-lexicon grep = 0; warmth-preserved clause = 4/4 touchpoints.
- [ ] AC-P-004 (Safety): masking reminder present in grill prompts; 0 PII/secrets in samples.
- [ ] AC-P-005 (Trace): every REQ-P maps to brief OKR/constraint (§7); out-of-scope §5
  restates brief verbatim in intent; open questions escalated, not silently resolved.

## 4. Contracts & Interfaces

- Wording targets (skill-text only, applied only via propose-changes + gate):
  `skills/frame-intent/SKILL.md` (+ framing refs); `skills/propose-changes/SKILL.md`
  (+ proposal/risk refs); `skills/quality-gate/SKILL.md` (+ gate-report/waiver refs);
  `skills/verify-handoff/SKILL.md` (+ dod-checklist/handoff refs). No API shape forced.
- Canonical guardrail inserts (verbatim proposals for propose-changes stage):
  1. Opt-in: "¿Quieres una ronda de desafío opt-in (máx N preguntas, una a la vez)? Di sí para empezar o `salir` en cualquier momento para parar sin penalidad."
  2. One-at-a-time: "Hago una sola pregunta, espero tu respuesta, luego sigo."
  3. Anti-sycophancy: "Mi respuesta recomendada es X — ¿dónde puede estar mal?"
  4. Warmth: "Reto cálido y directo: sin modo relentless. Si el tono aprieta, dilo y pausamos."
  5. Masking: "Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)."
  6. Ratchet: "Profundidad solo sube (spike→bounded→architectural), nunca baja mid-initiative."
- Sign-off: people owner (this spec, tone/attention/opt-in); engineering owner (budget co-sign REQ-P-004);
  security owner (masking co-sign REQ-P-006). Handoff packet to propose-changes:
  `SPEC:docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..007 / HARD:multi-subagents+opt-in+exit-hatch+one-at-a-time+warmth-no-relentless+ratchet / GATE:none-yet / DOMAINS:[engineering,people,security]`.

## 5. Out of Scope

Restated from BRIEF-grilling-integration (read-only, no reinterpretation):

- New skill directory, new stage, or new reviewer role — reuse existing reviewers/templates only.
- Changes to `review-security` STRIDE core or `review-architecture` ADR core beyond the C3 scrutiny lane.
- Mid-`execute-spec` interruption, worktree isolation changes, or per-REQ commit rhythm changes.
- `ship-release` rollback re-litigation or archive mechanics changes.
- Verbatim copy of external `grilling` text without LICENSE verification + attribution.
- `debugging` Iron Law, `git-worktree` mechanics, or `pull-request` budget changes.

## 6. Dependencies

- BRIEF-grilling-integration + OKR-grilling-integration (KR-1.1–KR-2.2); sibling
  SPEC-grilling-integration-engineering#REQ-001..006; security slice REQ-SEC-001..007
  (waiver three-block bar, PII/masking constraints) by reference.
- Escalations (not resolved here): orchestrator (external grilling LICENSE + attribution);
  engineering + people (exact C1 budget — default proposed here: 1 / cap 3 / cap 5, needs joint sign-off);
  security (C3 waiver justification quality-bar wording).

## 7. Traceability

| Requirement | AC | Brief source | OKR |
|-------------|----|--------------|-----|
| REQ-P-001 | AC-P-001, AC-P-005 | Brief Scope[people] + Constraints | KR-1.1, KR-1.2, KR-2.1, KR-2.2 (guardrail presence) |
| REQ-P-002 | AC-P-002 | Brief Desired Outcome | KR-1.1, KR-1.2 |
| REQ-P-003 | AC-P-003 | Brief Constraints Brand | Brief Constraints |
| REQ-P-004 | AC-P-002 | Brief Constraints + Open Q | KR-1.1 |
| REQ-P-005 | AC-P-002 | Brief F2 risk containment | KR-1.2, KR-2.1, KR-2.2 |
| REQ-P-006 | AC-P-004 | Brief Constraints Regulatory | Brief Constraints + guardrails 1–8 |
| REQ-P-007 | AC-P-005 | Brief Chain invariants + HARD no-rule-edits-without-gate | Brief Constraints |
