# Requirements Index: Grilling-Style Challenge Plug-in (C1–C4) — People Domain

**Owner:** santana (CHRO/CPO, people owner)
**Brief Reference:** BRIEF-grilling-integration (approved 2026-09-18) + OKR-grilling-integration
**Domains-Touched:** [engineering, people, security] — owns: people
**Spec:** docs/specs/10_design/SPEC-grilling-integration-people.md

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-P-001 | Opt-in + exit hatch mandatory C1–C4: explicit opt-in prompt + named exit word; exit = immediate stop, no re-ask, no penalty, recorded as `grill: declined/exited` | P0 | BRIEF-grilling-integration §Scope[people]+Constraints | SPEC-grilling-integration-people | people | review (grep 4/4) |
| REQ-P-002 | One question at a time + anti-sycophancy: 1:1 turn-taking; recommended-answer invites disagreement ("¿dónde puede estar mal? / where could this be wrong?") | P0 | BRIEF-grilling-integration Desired Outcome | SPEC-grilling-integration-people | people | review + sample round |
| REQ-P-003 | Warmth preserved, relentless banned: warmth clause 4/4 touchpoints; banned lexicon excluded from touched skills; approved substitutes challenge/explore/test/falsify | P0 | BRIEF-grilling-integration Constraints Brand | SPEC-grilling-integration-people | people | review (grep) |
| REQ-P-004 | C1 budget 1 / 2–3 cap 3 / full cap 5 + one-way ratchet, co-owned engineering + people; never downgrade mid-initiative | P0 | BRIEF-grilling-integration Constraints + Open Q | SPEC-grilling-integration-people | people | review |
| REQ-P-005 | Anti-fatigue: one-pass C2, surgical-only C3, presence-check-only C4 + pause/exit offer after each round; no unbounded loops | P0 | BRIEF-grilling-integration F2 risk containment | SPEC-grilling-integration-people | people | review |
| REQ-P-006 | Masking-prompt warm co-sign (people + security): no PII/secrets/tokens in grill rounds; masking/tokenization rides every export; allowlisted evidence only (Ley 172-13) | P0 | BRIEF-grilling-integration Constraints Regulatory | SPEC-grilling-integration-people | people + security | review |
| REQ-P-007 | No rule application without people-reviewer APPROVE + approved PROPOSED_CHANGES.md | P0 | HARD no-rule-edits-without-gate + Chain invariants | SPEC-grilling-integration-people | people | gate record |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-P-NF-001 | Attention budget honored end-to-end: C1 caps + C2 one-pass + C3 surgical + C4 presence-only; no unbounded interrogation | Usability | wording present 4/4 touchpoints |
| REQ-P-NF-002 | No PII/secrets in grill rounds or samples; masking on every export | Privacy/Security | guardrails 1–8 pass; 0 findings |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | Tone/attention/opt-in guardrail wording + budget co-ownership; gate via people-reviewer | santana |
| engineering | C1 budget co-sign + skill wiring fidelity (process binding) | engineering owner |
| security | Masking co-sign (REQ-P-006) + waiver/residual-risk bar (sibling REQ-SEC slice) | security owner |
