# Requirements Index: pull-request

**Owner:** engineering owner
**Brief Reference:** BRIEF-pull-request
**Domains-Touched:** [engineering, automation/ops]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-F-001 | Skill file with exact frontmatter + body shape | P0 | BRIEF-pull-request | SPEC-pull-request | engineering | review |
| REQ-F-002 | Branch naming + PR body + budget + commits documented | P0 | BRIEF-pull-request | SPEC-pull-request | engineering | review |
| REQ-F-003 | Local checks mapped to `mise run typecheck` | P0 | BRIEF-pull-request | SPEC-pull-request | automation/ops | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/PII in skill or examples | Security | clean grep |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| automation/ops | Toolchain check is `mise run typecheck` | automation owner + engineering owner |
