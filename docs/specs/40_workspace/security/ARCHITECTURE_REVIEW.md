# Architecture Review: Security Lane Singleton Consolidation

**Reviewer:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Spec Reference:** `docs/specs/50_archive/SPEC-singleton-consolidation-security.md#REQ-003` (archived at ship per lifecycle)
**Execution_Mode:** single
**Skill:** `skills/execute-spec/SKILL.md` (consolidation index; verdict authority stays in archived originals)

## §Security Review Index (6 reviews → archive)

| Review (archived original) | Date | Verdict | Scope (by reference) |
|----------------------------|------|---------|----------------------|
| `50_archive/SECURITY_REVIEW.md` | 2026-09-16 | Conditional (APPROVE with conditions) | INTENT concise-plugin-prompts, frame-ship.ts H1-H6 literals |
| `50_archive/SECURITY_REVIEW-agents-into-plugin.md` | 2026-09-17 | Approved | SPEC-agents-into-plugin-engineering, light config-surface screen |
| `50_archive/SECURITY_REVIEW-agy-plugin.md` | 2026-09-17 | Conditional | agy-plugin TS+Bun hooks proposal |
| `50_archive/SECURITY_REVIEW-debugging.md` | 2026-09-16 | Conditional | SPEC-debugging-engineering |
| `50_archive/SECURITY_REVIEW-git-worktree.md` | 2026-09-16 | Conditional | git-worktree isolation, 4-lane proposals |
| `50_archive/SECURITY_REVIEW-single-dispatcher.md` | 2026-09-16 | APPROVE with conditions (wording-only attestation) | SPEC-single-dispatcher engineering + people |

Verdict tally preserved verbatim: 1 Approved, 5 Conditional (of which 2 APPROVE-with-conditions). No Critical open findings declared by any review beyond their recorded conditions. Full STRIDE tables + conditions live in the archived originals — referenced, not pasted.

## §Threat-Model Index (4 models → archive)

| Model (archived original) | Date | Methodology | Scope (by reference) |
|---------------------------|------|-------------|----------------------|
| `50_archive/THREAT_MODEL-agents-into-plugin.md` | 2026-09-17 | STRIDE-lite | agents-into-plugin config-surface |
| `50_archive/THREAT_MODEL-agy-plugin.md` | 2026-09-17 | STRIDE | agy-plugin hook stdin/stdout boundary |
| `50_archive/THREAT_MODEL-git-worktree.md` | 2026-09-16 | STRIDE | git-worktree isolation, 4 proposals |
| `50_archive/THREAT-MODEL-debugging.md` | 2026-09-16 | STRIDE | debugging skill examples + log guidance |

## Consolidation Record

| Source → Archive path |
|-----------------------|
| `SECURITY_REVIEW.md` → `docs/specs/50_archive/SECURITY_REVIEW.md` |
| `SECURITY_REVIEW-agents-into-plugin.md` → `docs/specs/50_archive/SECURITY_REVIEW-agents-into-plugin.md` |
| `SECURITY_REVIEW-agy-plugin.md` → `docs/specs/50_archive/SECURITY_REVIEW-agy-plugin.md` |
| `SECURITY_REVIEW-debugging.md` → `docs/specs/50_archive/SECURITY_REVIEW-debugging.md` |
| `SECURITY_REVIEW-git-worktree.md` → `docs/specs/50_archive/SECURITY_REVIEW-git-worktree.md` |
| `SECURITY_REVIEW-single-dispatcher.md` → `docs/specs/50_archive/SECURITY_REVIEW-single-dispatcher.md` |
| `THREAT_MODEL-agents-into-plugin.md` → `docs/specs/50_archive/THREAT_MODEL-agents-into-plugin.md` |
| `THREAT_MODEL-agy-plugin.md` → `docs/specs/50_archive/THREAT_MODEL-agy-plugin.md` |
| `THREAT_MODEL-git-worktree.md` → `docs/specs/50_archive/THREAT_MODEL-git-worktree.md` |
| `THREAT-MODEL-debugging.md` → `docs/specs/50_archive/THREAT-MODEL-debugging.md` |
