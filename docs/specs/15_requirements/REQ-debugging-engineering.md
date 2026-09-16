# Requirements Index: debugging

**Owner:** engineering owner
**Brief Reference:** BRIEF-debugging
**Domains-Touched:** [engineering, automation/ops]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Skill named `debugging` with correct frontmatter/trigger | P0 | BRIEF-debugging | SPEC-debugging-engineering | engineering | review |
| REQ-002 | Frame-ship body shape + chain binding | P0 | BRIEF-debugging | SPEC-debugging-engineering | engineering | review |
| REQ-003 | Iron Law + 4 phases with evidence gates | P0 | BRIEF-debugging | SPEC-debugging-engineering | engineering | review |
| REQ-004 | Red flags + 3-failure→architecture escalation | P1 | BRIEF-debugging | SPEC-debugging-engineering | engineering | review |
| REQ-005 | Packets + trace; refs kept or dropped with reason | P1 | BRIEF-debugging | SPEC-debugging-engineering | engineering | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/PII in examples or logs | Security | guardrails 1-8 pass |
| REQ-NF-002 | Single-session docs-only delivery | Reliability | no runtime change |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| automation/ops | Evidence-gathering guidance uses bounded logging, no arbitrary timeouts | automation owner + engineering owner |
