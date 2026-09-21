# Release Notes: Estandarización de Nomenclatura — "subagents"

**Date:** 2026-09-20
**Release Manager:** orchestrator / vasquez (engineering owner) & santana (people owner)
**Specs Included:** SPEC-subagents-naming-engineering, SPEC-subagents-naming-people
**Domains-Touched:** [engineering, people, security]
**Ship Type:** policy-enable (operational nomenclature standardization, contract normalization, zero deploy)

## Highlights

- **Canonical "subagents" Terminology:** Standardized the execution mode nomenclature across the Frame→Ship framework from `multi-subagents` to `subagents`. Eliminates lexical redundancy and aligns with standard AI multi-agent orchestration conventions.
- **Canonical Contract `W-SUBAGENTS`:**
  > *"Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."*
- **Packet Discipline:** Estandarizada la firma en sobres inter-etapas a `HARD:subagents+<constraints>`.
- **ADR-009 Registered:** Formalized architectural decision in `docs/specs/12_adr/ADR-009-subagents-naming.md`.
- **Historical Immutability (Option A):** All 103 historical mentions across completed gate evaluations, past briefs, and archived ADRs remain preserved as immutable audit records.

## Changes

### Skills & Templates

- `skills/using-frame-ship/SKILL.md` & `references/bootstrap-checklist.md`: Onboarding and load order standardized with `W-SUBAGENTS` and `W-SEQ`.
- `skills/frame-intent/SKILL.md` & `references/product-brief.md`: Initiation pre-flight and mode freeze standardized to `subagents`.
- `skills/translate-to-spec/SKILL.md` & `references/spec-template.md`: Updated to `subagents`.
- `skills/execute-spec/SKILL.md`: Updated supporting references and pre-flight to `subagents`.
- `skills/quality-gate/SKILL.md` & `references/gate-report.md`: Quality gate load-evidence checklist and routing table updated to `subagents`.
- `skills/propose-changes/references/proposal-template.md`: `Execution_Mode: subagents`.
- `skills/verify-handoff/references/dod-checklist.md`: Common DoD load-evidence updated to `subagents`.
- `skills/git-worktree/SKILL.md`: Parallel lane discipline aligned with `subagents`.
- `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, `AGENTS.md`: Catalogs aligned with `subagents` and indexed `ADR-009`.

### Domain Verifications

- **Engineering:** 12 files updated + `ADR-009` registered + `ARCHITECTURE.md` contract established. `mise run typecheck` clean (0 compiler errors).
- **People:** Rules and onboarding aligned; `diff = 0` between `W-SUBAGENTS` instances.
- **Security:** STRIDE audit and Ley 172-13 privacy minimization verified clean (zero PII, zero tokens/secrets).

## Known Issues

- None. 0 residual occurrences of `multi-subagents` across all active skills and templates.

## Rollback / Undo

- **Code revert:** `git revert` of discrete commits in this chain.
- **Owner:** vasquez (engineering owner) / santana (people owner).
