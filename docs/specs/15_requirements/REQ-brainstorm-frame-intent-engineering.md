# Requirements Index: brainstorm → frame-intent

**Owner:** engineering owner
**Brief Reference:** BRIEF-brainstorm-frame-intent
**Domains-Touched:** [engineering, people]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Classify-first (spike / bounded / architectural-initiative) with announce + override + one-way ratchet | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-002 | HARD-GATE + one-question-at-a-time elicitation before handoff | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-003 | 2–3 framings with trade-offs + recommendation + YAGNI | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-004 | Decomposition rule for multi-subsystem initiatives | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-005 | Sectioned BRIEF approval + self-review + user review gate | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-006 | Reference-only packets + execution_mode + no sideways refs | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |
| REQ-007 | Frame-ship body shape + frontmatter convention | P0 | BRIEF-brainstorm-frame-intent | SPEC-brainstorm-frame-intent-engineering | engineering | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/PII in elicitation examples or logs | Security | guardrails 1-8 pass |
| REQ-NF-002 | Single-session docs-only delivery | Reliability | no runtime change |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | Elicitation wording stays collaborative; Red Flags correct without blame | people owner |
