# Spec: Estandarización de Nomenclatura — "subagents" (Engineering Lane)

**ID:** SPEC-subagents-naming-engineering
**Owner:** vasquez (engineering owner)
**Domains-Touched:** [engineering] (people lane parallel, owned by santana)
**Brief Reference:** docs/briefs/BRIEF-subagents-naming.md#OKRs + docs/briefs/OKR-subagents-naming.md
**Status:** review
**Priority:** P0 (blocks normative nomenclature alignment across engineering skills, templates, and catalog)
**Execution_Mode:** subagents (inherited from BRIEF-subagents-naming §Execution_Mode, frozen at frame-intent; overridden per SPEC only with CEO waiver)

---

## 1. Context

Following the structural unification of the Frame→Ship chain into the natural distributed dispatch process (ADR-008), the compound term `multi-subagents` remained as conceptual residue from the former `single | multi-subagents` bifurcation. In operational practice, `multi-subagents` exhibits lexical redundancy (the plural "subagents" inherently denotes multiplicity), diverges from industry-standard nomenclature across leading agentic harnesses (OpenCode, Antigravity, LLM multi-agent runners), and injects unnecessary friction into normative contracts, execution mode declarations, and inter-stage packet signatures (`HARD:multi-subagents+...`).

`BRIEF-subagents-naming.md` approved the canonical standardization (Option A: in-place active update, preserving historical auditability) to establish `subagents` as the singular methodological execution mode across all active framework surfaces.

This specification governs the **Engineering domain lane**, covering:
1. Stage skills mechanics (`skills/translate-to-spec/`, `skills/execute-spec/`, `skills/quality-gate/`, and supporting `skills/git-worktree/`).
2. Engineering-owned canonical templates (`spec-template.md`, `proposal-template.md`, `gate-report.md`, and `dod-checklist.md`).
3. Supporting documentation and catalogues (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, and root `AGENTS.md`).
4. Formal architectural decision record (`docs/specs/12_adr/ADR-009-subagents-naming.md`).
5. Canonical architecture contract for execution modes and packet structure (`docs/specs/10_design/ARCHITECTURE.md`).

Santana (people owner) concurrently owns the people-lane wording surfaces (`using-frame-ship`, `frame-intent`, `bootstrap-checklist`, `product-brief`, `people-review.md`). Implementation of code and template modifications will take place during `execute-spec` upon proposal approval.

---

## 2. Requirements

### Functional Requirements

- **REQ-ENG-001:** Update `skills/translate-to-spec/SKILL.md` §3 step 0 pre-flight contract to replace `multi-subagents` with canonical `subagents` (`W-SUBAGENTS`). [engineering]
- **REQ-ENG-002:** Update `skills/execute-spec/SKILL.md` §2 chain contract (`Supporting: (subagents)`), §3 step 0 pre-flight contract (`W-SUBAGENTS`), and §3 step 1 `execution_mode` declaration (`subagents`). [engineering]
- **REQ-ENG-003:** Update `skills/quality-gate/SKILL.md` §3 execution mode declaration to `subagents only` with sequential degradation and full-wave routing. [engineering]
- **REQ-ENG-004:** Update `skills/git-worktree/SKILL.md` §1 purpose and §3 step 4 process to reference `subagents` as the singular execution mode and norm for parallel lanes (max 2). [engineering]
- **REQ-ENG-005:** Update engineering-owned canonical templates:
  - `skills/translate-to-spec/references/spec-template.md`: line 9 `**Execution_Mode:** subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)`.
  - `skills/propose-changes/references/proposal-template.md`: line 6 `**Execution_Mode:** subagents (inherited from spec)`.
  - `skills/quality-gate/references/gate-report.md`: line 75 `- [ ] Execution mode declared: subagents (max 2, read orders in prompt)`.
  - `skills/verify-handoff/references/dod-checklist.md`: line 14 `- [ ] Load evidence: stage skill + dispatched agent template cited (paths), execution_mode declared: subagents, packet intact — missing = FAIL, no handoff`. [engineering]
- **REQ-ENG-006:** Update supporting and catalog documentation:
  - `skills/AGENTS.md`: supporting skills table (line 23: `parallel execute-spec lanes (subagents)`) and conventions (line 33: `Execution mode frozen at frame-intent (subagents only) rides SPEC/HARD/GATE/DOMAINS packets, never skill frontmatter.`).
  - `docs/AGENTS.md`: ensure artifact lifecycle rules reflect `subagents` packet references.
  - `docs/specs/AGENTS.md`: update ADR inventory to reflect `ADR-001..009` under `12_adr/`.
  - root `AGENTS.md`: align overview and conventions with `subagents` standard. [engineering]
- **REQ-ENG-007:** Draft and register `docs/specs/12_adr/ADR-009-subagents-naming.md` in `12_adr/` formalizing the lexical refactoring from `multi-subagents` to `subagents`, canonical `W-SUBAGENTS` contract, backward compatibility / historical immutability guarantee, and rollback strategy. [engineering]
- **REQ-ENG-008:** Formulate and record canonical `docs/specs/10_design/ARCHITECTURE.md` establishing the architectural contract for execution modes, packet envelope structure (`HARD:subagents+...`), invariants (INV-001..008), and component interactions. [engineering]

### Non-Functional Requirements

- **REQ-NF-001 (Historical Immutability):** Zero modifications to `50_archive/`, historical `BRIEF-*.md` files (prior to BRIEF-subagents-naming), archived ADRs (`ADR-001..008`), past release notes, or past gate evaluation records in `40_workspace/`. [engineering]
- **REQ-NF-002 (Zero Residue):** 0 occurrences of `multi-subagents` across all active engineering-owned skills, templates, and catalog files (`grep -rn "multi-subagents"` = 0 in targeted files). [engineering]
- **REQ-NF-003 (Toolchain Integrity):** Zero errors in `mise run typecheck`; zero broken markdown syntax or links. [engineering]
- **REQ-NF-004 (Masking & Privacy):** Zero secrets, tokens, credentials, or PII introduced in specs, proposals, or contracts (Ley 172-13 compliance). [engineering]
- **REQ-NF-005 (Atomic Reversibility):** All documentation changes are discrete, mapped 1:1 with REQ commits, and cleanly revertible via `git revert` in ≤15 minutes. [engineering]

---

## 3. Acceptance Criteria

- [ ] **AC-REQ-ENG-001:** `skills/translate-to-spec/SKILL.md` §3 step 0 contains `W-SUBAGENTS` verbatim; `grep -n "multi-subagents" skills/translate-to-spec/SKILL.md` returns 0 hits.
- [ ] **AC-REQ-ENG-002:** `skills/execute-spec/SKILL.md` §2, §3 step 0, and §3 step 1 contain `subagents` and `W-SUBAGENTS`; `grep -n "multi-subagents" skills/execute-spec/SKILL.md` returns 0 hits.
- [ ] **AC-REQ-ENG-003:** `skills/quality-gate/SKILL.md` §3 declares `Execution mode (from spec execution_mode): subagents only` with sequential degradation; `grep -n "multi-subagents" skills/quality-gate/SKILL.md` returns 0 hits.
- [ ] **AC-REQ-ENG-004:** `skills/git-worktree/SKILL.md` §1 and §3 step 4 reference `subagents`; `grep -n "multi-subagents" skills/git-worktree/SKILL.md` returns 0 hits.
- [ ] **AC-REQ-ENG-005:** The 4 engineering-owned templates (`spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`) declare `subagents`; non-mode content is byte-identical; `grep -n "multi-subagents"` returns 0 hits across all 4 templates.
- [ ] **AC-REQ-ENG-006:** `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md` (ADR-001..009), and root `AGENTS.md` contain 0 live occurrences of `multi-subagents`.
- [ ] **AC-REQ-ENG-007:** `docs/specs/12_adr/ADR-009-subagents-naming.md` is registered in `12_adr/` detailing context, decision, consequences, `W-SUBAGENTS`, historical immutability, and rollback.
- [ ] **AC-REQ-ENG-008:** `docs/specs/10_design/ARCHITECTURE.md` is recorded in `10_design/` defining execution modes, packet envelope structure (`HARD:subagents+...`), invariants INV-001..008, and component responsibilities.
- [ ] **AC-REQ-NF-001:** `git diff --name-only` confirms 0 modifications in `docs/specs/50_archive/`, past briefs, past ADRs (`ADR-001..008`), or past gate reports.
- [ ] **AC-REQ-NF-002:** Logged grep output confirms 0 occurrences of `multi-subagents` across all targeted active engineering files.
- [ ] **AC-REQ-NF-003:** `mise run typecheck` exits with status 0.
- [ ] **AC-REQ-NF-004:** Static security scan confirms 0 sensitive data / secret findings.
- [ ] **AC-REQ-NF-005:** Git log verifies discrete commits per REQ group with clear revert points.

---

## 4. Contracts & Interfaces

### Canonical Wording Contracts

#### W-SUBAGENTS — Contrato uniforme de ejecución (Core Skills pre-flight)
```text
Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

#### W-SEQ — Degradación secuencial mismo hilo (Quality Gate / Skills)
```text
Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

#### W-SPEC-MODE — Declaración de modo en spec-template.md
```text
**Execution_Mode:** subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)
```

#### W-PROP-MODE — Declaración de modo en proposal-template.md
```text
**Execution_Mode:** subagents (inherited from spec)
```

#### W-GATE-MODE — Verificación de modo en gate-report.md (Load Evidence)
```text
- [ ] Execution mode declared: subagents (max 2, read orders in prompt)
```

#### W-DOD-MODE — Verificación de modo en dod-checklist.md (Common DoD)
```text
- [ ] Load evidence: stage skill + dispatched agent template cited (paths), execution_mode declared: subagents, packet intact — missing = FAIL, no handoff
```

### Packet Envelope Format
```text
SPEC:<path>#<anchors> / HARD:subagents+<constraints> / GATE:<verdicts> / DOMAINS:<list>
```

### Architectural Contract & ADR Reference
- Canonical architecture contract: `docs/specs/10_design/ARCHITECTURE.md` (invariants INV-001..008).
- Architecture Decision Record: `docs/specs/12_adr/ADR-009-subagents-naming.md`.

---

## 5. Out of Scope

- **People-lane surfaces:** `skills/using-frame-ship/SKILL.md`, `references/bootstrap-checklist.md`, `skills/frame-intent/SKILL.md`, `references/product-brief.md`, and `skills/quality-gate/references/domains/people-review.md` (owned concurrently by santana in `SPEC-subagents-naming-people.md`).
- **Historical records:** `docs/specs/50_archive/`, prior `BRIEF-*.md` files, prior ADRs `ADR-001..008`, and completed gate evaluation records in `40_workspace/` (preserved for audit immutability).
- **Runtime engine:** `.opencode/plugins/frame-ship.ts` and plugin dependencies (already decoupled from lexical chain mode strings).
- **Catalogue & Core Stages:** The 8 business domain catalogue and 9-stage Frame→Ship chain sequence remain untouched.
- **CEO Fast-Path Mechanics:** Out-of-methodology execution (<15 lines) is an unbranched prerogative and is not designed or governed here.
- **Premature File Modifications:** No repository files outside `docs/specs/` are modified in this stage; implementation occurs in `execute-spec`.

---

## 6. Dependencies

- **DEP-1 (People Lane Alignment):** Santana's parallel people lane spec (`SPEC-subagents-naming-people.md`) establishes people wording; shared wording contracts (`W-SUBAGENTS`, `W-SEQ`) must read byte-identical across both lanes (diff = 0).
- **DEP-2 (Security Review):** Barrera (security owner) reviews wording at quality gate to certify zero alteration to security baselines, authentication, or PII handling.
- **DEP-3 (Orchestrator Authority):** Final approval of SPEC, gate waiver (if any), and release coordination by Montilla / Orchestrator.

---

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-ENG-001 | AC-REQ-ENG-001 | `skills/translate-to-spec/SKILL.md` §3 pre-flight update to `W-SUBAGENTS` | `grep -n "multi-subagents" skills/translate-to-spec/SKILL.md` = 0 |
| REQ-ENG-002 | AC-REQ-ENG-002 | `skills/execute-spec/SKILL.md` §2, §3 step 0, §3 step 1 update to `subagents` | `grep -n "multi-subagents" skills/execute-spec/SKILL.md` = 0 |
| REQ-ENG-003 | AC-REQ-ENG-003 | `skills/quality-gate/SKILL.md` §3 execution mode line update to `subagents` | `grep -n "multi-subagents" skills/quality-gate/SKILL.md` = 0 |
| REQ-ENG-004 | AC-REQ-ENG-004 | `skills/git-worktree/SKILL.md` §1 & §3 step 4 update to `subagents` | `grep -n "multi-subagents" skills/git-worktree/SKILL.md` = 0 |
| REQ-ENG-005 | AC-REQ-ENG-005 | Update 4 canonical templates (`spec`, `proposal`, `gate`, `dod`) to `subagents` | diff against template baselines + grep verification |
| REQ-ENG-006 | AC-REQ-ENG-006 | Update `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md` | grep verification across catalogue and docs |
| REQ-ENG-007 | AC-REQ-ENG-007 | File `docs/specs/12_adr/ADR-009-subagents-naming.md` in `12_adr/` | Existence of ADR-009 with required sections |
| REQ-ENG-008 | AC-REQ-ENG-008 | File `docs/specs/10_design/ARCHITECTURE.md` in `10_design/` | Existence of ARCHITECTURE.md with INV-001..008 |
| REQ-NF-001 | AC-REQ-NF-001 | Historical directories and files untouched | `git diff --name-only` shows no 50_archive/ or old ADRs |
| REQ-NF-002 | AC-REQ-NF-002 | Zero occurrences of `multi-subagents` in active engineering files | Logged grep scan across engineering surfaces = 0 |
| REQ-NF-003 | AC-REQ-NF-003 | Toolchain verification | `mise run typecheck` exits 0 |
| REQ-NF-004 | AC-REQ-NF-004 | Security and privacy compliance | Static scan reports 0 credentials or PII |
| REQ-NF-005 | AC-REQ-NF-005 | Discrete commits per REQ group | Git commit log analysis with verification of revert path |

Singleton: per lane, create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per type (only `PROPOSED_CHANGES.md`, never `PROPOSED_CHANGES-*.md`).

Packet: `SPEC:docs/specs/20_backlog/SPEC-subagents-naming-engineering.md#REQ-ENG-001..008+REQ-NF-001..005 / HARD:subagents+docs-only,reversible,Ley172-13-masked,history-intact,max-2-lanes / GATE:none-yet / DOMAINS:[engineering]`
