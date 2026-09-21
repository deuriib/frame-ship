# Requirements Index: Canonical Agents Roster in /agents (Engineering)

**Owner:** vasquez (engineering owner)
**Brief Reference:** docs/briefs/BRIEF-agents-roster.md#OKRs + docs/briefs/OKR-agents-roster.md
**Domains-Touched:** [engineering, security, automation]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-ENG-001 | Create repository-local `agents/` directory structure | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (`ls -la agents/`) |
| REQ-ENG-002 | Define `agents/orchestrator.md` with coordination-only tools | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (frontmatter audit) |
| REQ-ENG-003 | Define 8 Domain Owners with `mode: all` and no-code guardrail | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (frontmatter audit) |
| REQ-ENG-004 | Define 8 Fused Domain Specialists with scoped craft tools | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (frontmatter audit) |
| REQ-ENG-005 | Define Quality Gate Reviewers with strictly read-only tools | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (frontmatter audit) |
| REQ-ENG-006 | Declare explicit `tools: [...]` matrix in all agent frontmatter | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | attestation / review |
| REQ-ENG-007 | Inject software engineering guardrails (TDD, Type Safety, SOLID) | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | review (prompt grep) |
| REQ-ENG-008 | Update `docs/specs/10_design/ARCHITECTURE.md` with agent subsystem | P0 | BRIEF-agents-roster | SPEC-agents-roster-engineering | engineering | diff inspection |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-ENG-001 | Least privilege tool access isolation | Security | 0 write/bash tools in leadership/reviewers |
| REQ-NF-ENG-002 | Zero hardcoded secrets or PII (Ley 172-13) | Security | 0 leaks in agent files |
| REQ-NF-ENG-003 | Valid YAML frontmatter parsing | Integrity | 100% parse rate across all files in `agents/` |
| REQ-NF-ENG-004 | Atomic git commit reversibility | Reliability | ≤ 15 minutes rollback time via git |

## Domain Controls

| Domain | Control | Owner |
|---|---|---|
| security | Least privilege tool enforcement and OWASP screen | barrera |
| automation/ops | Alignment with local scripts and execution harnesses | espinoza |
