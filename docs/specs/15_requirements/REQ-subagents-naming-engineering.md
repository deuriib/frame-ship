# Requirements Index: Estandarización de Nomenclatura — "subagents" (Engineering Lane)

**Owner:** vasquez (engineering owner)
**Brief Reference:** docs/briefs/BRIEF-subagents-naming.md
**Domains-Touched:** [engineering] (people lane parallel, owned by santana)
**Spec:** docs/specs/20_backlog/SPEC-subagents-naming-engineering.md
**Execution_Mode:** subagents
**Note on IDs:** REQ-IDs match the spec exactly (`REQ-ENG-001..008` + `REQ-NF-001..005`) for unambiguous cross-lane traceability and clear mapping within the `SPEC/HARD/GATE/DOMAINS` packet envelope.

---

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-ENG-001 | Update `skills/translate-to-spec/SKILL.md` §3 step 0 to replace `multi-subagents` with canonical `subagents` in pre-flight load contract (`W-SUBAGENTS`). | P0 | BRIEF Scope, OKR KR-1.1 | SPEC-subagents-naming-engineering | engineering | grep + review |
| REQ-ENG-002 | Update `skills/execute-spec/SKILL.md` §2 chain contract (`Supporting: (subagents)`), §3 step 0 pre-flight (`W-SUBAGENTS`), and §3 step 1 `execution_mode` declaration to `subagents`. | P0 | BRIEF Scope, OKR KR-1.1 | SPEC-subagents-naming-engineering | engineering | grep + review |
| REQ-ENG-003 | Update `skills/quality-gate/SKILL.md` §3 to declare `Execution mode: subagents only` with sequential degradation and full-wave routing. | P0 | BRIEF Scope, OKR KR-1.1 | SPEC-subagents-naming-engineering | engineering | grep + review |
| REQ-ENG-004 | Update `skills/git-worktree/SKILL.md` §1 purpose and §3 step 4 process to reference `subagents` as the singular execution mode and norm for parallel lanes (max 2). | P0 | BRIEF Scope, OKR KR-1.1 | SPEC-subagents-naming-engineering | engineering | grep + review |
| REQ-ENG-005 | Update engineering-owned canonical templates: `spec-template.md` (`Execution_Mode: subagents`), `proposal-template.md` (`Execution_Mode: subagents`), `gate-report.md` (Load Evidence `execution_mode: subagents`), and `dod-checklist.md` (Common DoD `execution_mode declared: subagents`). | P0 | BRIEF Scope, OKR KR-1.2 | SPEC-subagents-naming-engineering | engineering | diff + review |
| REQ-ENG-006 | Update supporting and catalog documentation: `skills/AGENTS.md` (supporting skills table and execution mode rule to `subagents`), `docs/AGENTS.md` (conventions alignment), `docs/specs/AGENTS.md` (ADR inventory `ADR-001..009`), and root `AGENTS.md` (alignment with `subagents`). | P1 | BRIEF Scope, OKR KR-1.3 | SPEC-subagents-naming-engineering | engineering | grep + review |
| REQ-ENG-007 | Draft and register `docs/specs/12_adr/ADR-009-subagents-naming.md` in `12_adr/` formalizing the lexical refactoring, canonical `W-SUBAGENTS` contract, backward compatibility / historical immutability guarantee, and rollback strategy. | P0 | BRIEF Scope, OKR KR-2.1 | SPEC-subagents-naming-engineering | engineering | filing-proof + review |
| REQ-ENG-008 | Formulate and record canonical `docs/specs/10_design/ARCHITECTURE.md` establishing the architectural contract for execution modes, packet envelope structure (`HARD:subagents+...`), invariants (INV-001..008), and component interactions. | P0 | BRIEF Scope, Architecture Contract | SPEC-subagents-naming-engineering | engineering | filing-proof + review |

---

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | **Historical Immutability:** Zero modifications to `50_archive/`, past briefs (`BRIEF-*.md` prior to BRIEF-subagents-naming), archived ADRs (`ADR-001..008`), or historical workspace gate records. | Auditability / Immutability | `git diff` shows 0 changes in historical directories and archived files. |
| REQ-NF-002 | **Zero Live Residue:** 0 occurrences of `multi-subagents` in engineering-owned active skills, templates, and catalog files. | Consistency / Precision | `grep -rn "multi-subagents"` returns 0 matches across targeted engineering surfaces. |
| REQ-NF-003 | **Toolchain & Syntax Integrity:** TypeScript typechecks and toolchain commands pass without errors; markdown formatting and links valid. | Quality / Toolchain | `mise run typecheck` exits with 0 errors; clean markdown link check. |
| REQ-NF-004 | **Masking & Privacy (Ley 172-13):** Zero secrets, tokens, API keys, PII, or credentials in specs, proposals, or contracts. | Security / Privacy | Static scan returns 0 secrets or sensitive data findings. |
| REQ-NF-005 | **Atomic Reversibility:** Documentation-only changes, committed discretely per REQ, revertible via `git revert` in ≤15 minutes. | Operability / Reversibility | Clean git history with atomic per-REQ commits and zero dependency blockers. |

---

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| **engineering** | Mechanics of skill rewrites, template adjustments, ADR-009 filing, and ARCHITECTURE.md contract consolidation owned by vasquez; zero runtime code changes. | vasquez (engineering owner) |
| **people** | Canonical wording source (`W-SUBAGENTS`, `W-SEQ`) for people-owned surfaces (`using-frame-ship`, `frame-intent`, `bootstrap-checklist`, `product-brief`, `people-review`) owned by santana in parallel; engineering consumes verbatim. | santana (people owner) |
| **security** | Gate review and wording attestation verifying zero PII, auth, or crypto bypasses; confirms fail-closed gate integrity. | barrera (security owner) |

---

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| **Core Stage SKILLs** | `skills/translate-to-spec/SKILL.md`, `skills/execute-spec/SKILL.md`, `skills/quality-gate/SKILL.md` | REQ-ENG-001, REQ-ENG-002, REQ-ENG-003, REQ-NF-002 |
| **Supporting Skill** | `skills/git-worktree/SKILL.md` | REQ-ENG-004, REQ-NF-002 |
| **Canonical Templates** | `skills/translate-to-spec/references/spec-template.md`, `skills/propose-changes/references/proposal-template.md`, `skills/quality-gate/references/gate-report.md`, `skills/verify-handoff/references/dod-checklist.md` | REQ-ENG-005, REQ-NF-002 |
| **Supporting & Catalog** | `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md` | REQ-ENG-006, REQ-NF-002 |
| **Architecture Decision Record** | `docs/specs/12_adr/ADR-009-subagents-naming.md` | REQ-ENG-007, REQ-NF-001, REQ-NF-005 |
| **Architecture Contract** | `docs/specs/10_design/ARCHITECTURE.md` | REQ-ENG-008, REQ-NF-001, REQ-NF-005 |
