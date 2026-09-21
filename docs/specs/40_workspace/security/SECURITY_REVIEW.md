# Security Review: SPEC-agents-roster-engineering & SPEC-agents-roster-people

**Reviewer:** barrera (security owner) via security-reviewer
**Date:** 2026-09-21
**Verdict:** Approved

## Threat Model (STRIDE)

| Threat Category | Potential Vector | Mitigation in Proposed Architecture | Residual Risk |
|---|---|---|---|
| **Spoofing** | Subagent impersonating Orchestrator or another domain owner | Strict name/mode declarations in YAML frontmatter; harness validates role binding per task | Low |
| **Tampering** | Reviewer or Domain Owner modifying production code | Mathematical least privilege: Reviewers and Domain Owners have ZERO write/command tools in frontmatter (`tools: [...]`) | Negligible |
| **Repudiation** | Actions executed without trace | Every stage requires atomic commit referencing ticket/REQ-ID; audit trail preserved | Negligible |
| **Information Disclosure** | Leakage of API tokens, database credentials, or PII in agent prompts | Universal Ley 172-13 screen: zero secrets/PII allowed in prompts; strictly abstract role definitions | Negligible |
| **Denial of Service** | Unbounded subagent execution loops or excessive parallel tasks | Invariants INV-006 (max 2 parallel lanes) and INV-004; single-dispatcher discipline | Low |
| **Elevation of Privilege** | Leaf specialist acquiring unauthorized cross-domain authority or self-dispatching | Single dispatcher rule (INV-012); specialists only execute assigned tasks and report back | Negligible |

## Findings

| ID | Severity | Finding | Remediation | Status |
|---|---|---|---|---|
| S-001 | Hygiene (Low) | Risk of tool name drift across different agent harnesses | Standardize on canonical native tool names (`view_file`, `write_to_file`, `replace_file_content`, `run_command`, `invoke_subagent`, `manage_subagents`, `send_message`, `ask_question`) | Resolved in spec |
| S-002 | Medium | Broad tool access in non-engineering specialists | Ensure only `engineering-specialist` and `automation-specialist` have `run_command` and file modification tools; other specialists receive read/analytical tools | Enforced in proposal |

## Conditions for Approval

1. Enforce mathematical tool isolation: zero `run_command` or file write tools in any reviewer or domain owner prompt.
2. Invalidate any agent prompt that contains hardcoded credentials or mock PII (Ley 172-13).
3. Reviewer prompts must explicitly enforce evidence-based gate verdicts (claims without diff/scan/log = REFUTED).

## Sign-off

- [x] barrera (security owner) — 2026-09-21
- [x] vasquez (engineering owner) — 2026-09-21
