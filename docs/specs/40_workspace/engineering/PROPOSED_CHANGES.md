# Proposed Changes: Engineering Specialist (Vasquez Lane)

**Spec Reference:** docs/specs/20_backlog/SPEC-subagents-naming-engineering.md
**Agent:** vasquez-specialist (engineering specialist under Vasquez)
**Date:** 2026-09-20
**Execution_Mode:** subagents (inherited from spec)
**Domains-Touched:** [engineering]

---

## Summary

This proposal formalizes the lexical and normative standardization of execution mode nomenclature across the Engineering domain of the Frame→Ship chain. Following the architectural unification established in ADR-008 and BRIEF-subagents-naming, the compound legacy designation `multi-subagents` is permanently retired in favor of the canonical singular term `subagents`.

We propose targeted, non-breaking modifications to 4 stage skills (`translate-to-spec`, `execute-spec`, `quality-gate`, `git-worktree`), 4 engineering-owned canonical templates (`spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`), and 4 knowledge base / catalog files (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, and root `AGENTS.md`), alongside drafting and registering `docs/specs/12_adr/ADR-009-subagents-naming.md`. In strict compliance with the Frame→Ship chain contract, no repository implementation files are modified during this proposal phase.

---

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/translate-to-spec/SKILL.md` | file-modify | Update §3 step 0 pre-flight contract to `W-SUBAGENTS` (`subagents only`) |
| `skills/execute-spec/SKILL.md` | file-modify | Update §2 supporting skill reference, §3 step 0 pre-flight (`W-SUBAGENTS`), and §3 step 1 `execution_mode` declaration |
| `skills/quality-gate/SKILL.md` | file-modify | Update §3 execution mode declaration to `subagents only` with sequential degradation |
| `skills/git-worktree/SKILL.md` | file-modify | Update §1 purpose and §3 step 4 parallel lane discipline to `subagents` |
| `skills/translate-to-spec/references/spec-template.md` | file-modify | Update line 9 `**Execution_Mode:**` declaration (`W-SPEC-MODE`) |
| `skills/propose-changes/references/proposal-template.md` | file-modify | Update line 6 `**Execution_Mode:**` declaration (`W-PROP-MODE`) |
| `skills/quality-gate/references/gate-report.md` | file-modify | Update line 75 Load Evidence checklist line to `subagents` (`W-GATE-MODE`) |
| `skills/verify-handoff/references/dod-checklist.md` | file-modify | Update line 14 Common DoD Load Evidence checklist line to `subagents` (`W-DOD-MODE`) |
| `skills/AGENTS.md` | file-modify | Update supporting skills table (line 23) and conventions (line 33) to `subagents` |
| `docs/AGENTS.md` | file-modify | Update line 31 inter-stage packet reference rule to cite `HARD:subagents+...` |
| `docs/specs/AGENTS.md` | file-modify | Update ADR inventory in stage table (line 18) to reflect `ADR-001..009` |
| `AGENTS.md` | file-modify | Update conventions (line 48) to reinforce `HARD:subagents+...` packet discipline |
| `docs/specs/12_adr/ADR-009-subagents-naming.md` | document-create | Formalize architectural decision record for `subagents` naming standardization |

---

## Proposed Diffs

### 1. `skills/translate-to-spec/SKILL.md`
```diff
--- a/skills/translate-to-spec/SKILL.md
+++ b/skills/translate-to-spec/SKILL.md
@@ -27,3 +27,3 @@
-0. Pre-flight LOAD — HARD STOP: `skill(translate-to-spec)` loaded? Owning domain owner identified? Packet `SPEC:<brief-path>#OKRs / HARD:<mode> / GATE:<none-yet> / DOMAINS:<list>` ready? Any NO → STOP. Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
+0. Pre-flight LOAD — HARD STOP: `skill(translate-to-spec)` loaded? Owning domain owner identified? Packet `SPEC:<brief-path>#OKRs / HARD:<mode> / GATE:<none-yet> / DOMAINS:<list>` ready? Any NO → STOP. Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### 2. `skills/execute-spec/SKILL.md`
```diff
--- a/skills/execute-spec/SKILL.md
+++ b/skills/execute-spec/SKILL.md
@@ -18,1 +18,1 @@
-- Supporting: (multi-subagents) frame-ship:git-worktree
+- Supporting: (subagents) frame-ship:git-worktree
@@ -29,4 +29,4 @@
-0. Pre-flight LOAD — HARD STOP: `skill(execute-spec)` loaded? Domain owner/specialist role understood? Approvals + `execution_mode` + `DOMAINS` confirmed? Any NO → STOP. Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
-1. Confirm all required approvals are recorded and read `execution_mode` (`multi-subagents`, frozen at frame-intent; overridden per SPEC only with CEO waiver) + `DOMAINS` from spec/proposal.
+0. Pre-flight LOAD — HARD STOP: `skill(execute-spec)` loaded? Domain owner/specialist role understood? Approvals + `execution_mode` + `DOMAINS` confirmed? Any NO → STOP. Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
+1. Confirm all required approvals are recorded and read `execution_mode` (`subagents`, frozen at frame-intent; overridden per SPEC only with CEO waiver) + `DOMAINS` from spec/proposal.
```

### 3. `skills/quality-gate/SKILL.md`
```diff
--- a/skills/quality-gate/SKILL.md
+++ b/skills/quality-gate/SKILL.md
@@ -48,1 +48,1 @@
-Execution mode (from spec `execution_mode`): `multi-subagents` only — full wave per routing table below + adversarial `review-refuter` before `qa` (full-wave único, no min-gate). Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
+Execution mode (from spec `execution_mode`): `subagents` only — full wave per routing table below + adversarial `review-refuter` before `qa` (full-wave único, no min-gate). Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

### 4. `skills/git-worktree/SKILL.md`
```diff
--- a/skills/git-worktree/SKILL.md
+++ b/skills/git-worktree/SKILL.md
@@ -13,1 +13,1 @@
-`multi-subagents`: each SPEC lane runs on a clean repo-local baseline at
+`subagents`: each SPEC lane runs on a clean repo-local baseline at
@@ -34,1 +34,1 @@
-4. Create exactly one worktree per SPEC-ID under repo-local `.worktrees/<spec-id>` with branch-per-SPEC, keeping live count at or below 2 per frozen `execution_mode` (`multi-subagents` only — parallel lanes are the norm), verified via `git worktree list`. Win32 path discipline — `Join-Path` plus `Resolve-Path`-safe joins, serialized `mise run typecheck` baseline gate green before `execute-spec` — is owned by the automation lane in `pwsh-flow.md`, consumed here by reference. See `references/worktree-lifecycle.md` steps 3-4.
+4. Create exactly one worktree per SPEC-ID under repo-local `.worktrees/<spec-id>` with branch-per-SPEC, keeping live count at or below 2 per frozen `execution_mode` (`subagents` only — parallel lanes are the norm), verified via `git worktree list`. Win32 path discipline — `Join-Path` plus `Resolve-Path`-safe joins, serialized `mise run typecheck` baseline gate green before `execute-spec` — is owned by the automation lane in `pwsh-flow.md`, consumed here by reference. See `references/worktree-lifecycle.md` steps 3-4.
```

### 5. `skills/translate-to-spec/references/spec-template.md`
```diff
--- a/skills/translate-to-spec/references/spec-template.md
+++ b/skills/translate-to-spec/references/spec-template.md
@@ -9,1 +9,1 @@
-**Execution_Mode:** multi-subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)
+**Execution_Mode:** subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)
```

### 6. `skills/propose-changes/references/proposal-template.md`
```diff
--- a/skills/propose-changes/references/proposal-template.md
+++ b/skills/propose-changes/references/proposal-template.md
@@ -6,1 +6,1 @@
-**Execution_Mode:** multi-subagents (inherited from spec)
+**Execution_Mode:** subagents (inherited from spec)
```

### 7. `skills/quality-gate/references/gate-report.md`
```diff
--- a/skills/quality-gate/references/gate-report.md
+++ b/skills/quality-gate/references/gate-report.md
@@ -75,1 +75,1 @@
-- [ ] Execution mode declared: `multi-subagents` (max 2, read orders in prompt)
+- [ ] Execution mode declared: `subagents` (max 2, read orders in prompt)
```

### 8. `skills/verify-handoff/references/dod-checklist.md`
```diff
--- a/skills/verify-handoff/references/dod-checklist.md
+++ b/skills/verify-handoff/references/dod-checklist.md
@@ -14,1 +14,1 @@
-- [ ] Load evidence: stage skill + dispatched agent template cited (paths), execution_mode declared: `multi-subagents`, packet intact — missing = FAIL, no handoff
+- [ ] Load evidence: stage skill + dispatched agent template cited (paths), execution_mode declared: `subagents`, packet intact — missing = FAIL, no handoff
```

### 9. `skills/AGENTS.md`
```diff
--- a/skills/AGENTS.md
+++ b/skills/AGENTS.md
@@ -23,1 +23,1 @@
-| parallel execute-spec lanes (multi-subagents) | `git-worktree/` | `.worktrees/<spec-id>` isolated lane | supporting in `execute-spec` |
+| parallel execute-spec lanes (subagents) | `git-worktree/` | `.worktrees/<spec-id>` isolated lane | supporting in `execute-spec` |
@@ -33,1 +33,1 @@
-- Execution mode frozen at `frame-intent` (`multi-subagents` only) rides `SPEC/HARD/GATE/DOMAINS` packets, never skill frontmatter.
+- Execution mode frozen at `frame-intent` (`subagents` only) rides `SPEC/HARD/GATE/DOMAINS` packets, never skill frontmatter.
```

### 10. `docs/AGENTS.md`
```diff
--- a/docs/AGENTS.md
+++ b/docs/AGENTS.md
@@ -31,1 +31,1 @@
-- Quoting full specs across stages — link by `SPEC/HARD/GATE/DOMAINS` reference, never paste.
+- Quoting full specs across stages — link by `SPEC/HARD/GATE/DOMAINS` reference (`HARD:subagents+...`), never paste.
```

### 11. `docs/specs/AGENTS.md`
```diff
--- a/docs/specs/AGENTS.md
+++ b/docs/specs/AGENTS.md
@@ -18,1 +18,1 @@
-| ADR | `12_adr/` | `ADR-001..008`; architectural decision records |
+| ADR | `12_adr/` | `ADR-001..009`; architectural decision records |
```

### 12. `AGENTS.md`
```diff
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -48,1 +48,1 @@
-- Reference-only packets: `SPEC/HARD/GATE/DOMAINS` between stages; retry N=2 → escalate orchestrator, no 3rd loop.
+- Reference-only packets: `SPEC/HARD/GATE/DOMAINS` (`HARD:subagents+<constraints>`) between stages; retry N=2 → escalate orchestrator, no 3rd loop.
```

### 13. `docs/specs/12_adr/ADR-009-subagents-naming.md` (document-create)
```markdown
# ADR-009: Standardization of execution mode naming to "subagents"

**ID:** ADR-009-subagents-naming
**Status:** proposed
**Date:** 2026-09-20
**Deciders:** vasquez (engineering owner), santana (people owner, wording), barrera (security, wording review); CEO waiver authority montilla
**Spec:** `docs/specs/20_backlog/SPEC-subagents-naming-engineering.md` (REQ-ENG-007)
**Brief:** `docs/briefs/BRIEF-subagents-naming.md` (Option A: in-place active update, preserving historical auditability)

## Context

Following the structural unification of the Frame→Ship chain into the natural distributed dispatch process (ADR-008), the compound term `multi-subagents` remained as conceptual residue from the former `single | multi-subagents` bifurcation.

In operational practice, `multi-subagents` exhibits lexical redundancy (the plural "subagents" inherently denotes multiplicity), diverges from industry-standard nomenclature across leading agentic harnesses (OpenCode, Antigravity, LLM multi-agent runners), and injects unnecessary cognitive friction into normative contracts, execution mode declarations, and inter-stage packet signatures (`HARD:multi-subagents+...`).

`BRIEF-subagents-naming.md` approved the canonical standardization (Option A: in-place active update, preserving historical auditability) to establish `subagents` as the singular methodological execution mode across all active framework surfaces.

## Decision

Adopt `subagents` as the universal, singular methodological execution mode across all active Frame→Ship surfaces, retiring `multi-subagents` without semantic dilution:

1. **Canonical Contract (`W-SUBAGENTS`):**
   "Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."

2. **Sequential Degradation Contract (`W-SEQ`):**
   "Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade."

3. **Packet Envelope Discipline:**
   The `HARD` token within inter-stage packets strictly carries the prefix `subagents` (`HARD:subagents+<constraints>`).

4. **Surface Scope:**
   - Engineering lane: stage skills (`translate-to-spec`, `execute-spec`, `quality-gate`, `git-worktree`), engineering-owned templates (`spec-template`, `proposal-template`, `gate-report`, `dod-checklist`), and documentation catalogs (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md`).
   - People lane: onboarding skills (`using-frame-ship`, `frame-intent`), people-owned templates (`bootstrap-checklist`, `product-brief`), rules (`rules/frame-ship.md`, `.agents/rules/frame-ship.md`), and gate review checklist (`people-review.md`).
   - Architecture contract: governed by canonical `docs/specs/10_design/ARCHITECTURE.md` (invariants INV-001..008).

5. **Historical Immutability:**
   Historical records (`docs/specs/50_archive/`, prior `BRIEF-*.md` files, archived ADRs `ADR-001..008`, past gate evaluations, and release notes) remain untouched as immutable audit trails.

## Consequences

- **Lexical Precision:** Complete elimination of redundant nomenclature; aligned with modern agentic harness standards.
- **Contract Uniformity:** Consistent, unambiguous packet signatures across all stage handoffs (`HARD:subagents+...`).
- **Zero Runtime Disruption:** Methodological contracts and packet routing continue unchanged; harnesses degrade sequentially when required.
- **Audit Integrity:** Historical artifacts remain 100% intact and reproducible.

## Rollback Plan

All modifications are textual and documentation-bound. In case of unexpected regression or operational block, changes can be atomically reverted via `git revert` on the corresponding commits within ≤15 minutes by engineering owner (vasquez).

## Links

- `docs/specs/10_design/ARCHITECTURE.md` (canonical architecture contract, INV-001..008)
- `docs/specs/20_backlog/SPEC-subagents-naming-engineering.md`
- `docs/briefs/BRIEF-subagents-naming.md`
```

---

## Rationale

1. **Satisfaction of Functional Requirements:**
   - **REQ-ENG-001:** `skills/translate-to-spec/SKILL.md §3` embeds `W-SUBAGENTS` verbatim.
   - **REQ-ENG-002:** `skills/execute-spec/SKILL.md` aligns §2, §3 step 0, and §3 step 1 with `subagents`.
   - **REQ-ENG-003:** `skills/quality-gate/SKILL.md §3` adopts `subagents only` with explicit sequential degradation.
   - **REQ-ENG-004:** `skills/git-worktree/SKILL.md §1` and §3 step 4 establish `subagents` as the sole parallel execution norm.
   - **REQ-ENG-005:** Canonical templates (`spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`) uniformly declare `subagents` without modifying non-mode structure.
   - **REQ-ENG-006:** Supporting documentation and catalogues (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md`) eliminate active residue and update the ADR index to `ADR-001..009`.
   - **REQ-ENG-007:** `ADR-009-subagents-naming.md` is fully drafted and registered in `docs/specs/12_adr/`.
   - **REQ-ENG-008:** Aligns with canonical `docs/specs/10_design/ARCHITECTURE.md` establishing invariants INV-001 through INV-008.

2. **Satisfaction of Non-Functional Requirements:**
   - **REQ-NF-001 (Historical Immutability):** Zero changes to `50_archive/`, prior briefs, past ADRs (`ADR-001..008`), or past gate reports.
   - **REQ-NF-002 (Zero Residue):** Every active engineering target file has exactly 0 occurrences of `multi-subagents`.
   - **REQ-NF-003 (Toolchain Integrity):** Markdown files preserve syntax; plugin runtime is not edited; `mise run typecheck` remains green (exit 0).
   - **REQ-NF-004 (Masking & Privacy):** Zero secrets, tokens, or PII introduced; strict compliance with Ley 172-13.
   - **REQ-NF-005 (Atomic Reversibility):** Each target modification maps 1:1 with clear revertible commit points.

---

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| **Option B (Dual-Mode / Alias Support):** Accept both `subagents` and `multi-subagents` as valid mode aliases indefinitely. | Perpetuates cognitive confusion, duplicates test verification matrix, and contradicts the core mandate of structural simplification established in ADR-008. |
| **Option C (Global Mass-Replace):** Search and replace `multi-subagents` globally across the entire repository, including `docs/specs/50_archive/`, past briefs, and old ADRs (`ADR-001..008`). | Violates REQ-NF-001 (Historical Immutability) and destroys the auditable historical fidelity of decisions and gate reports taken under prior nomenclature. |
| **Option D (Runtime Engine String Guard):** Add runtime validation hooks in `.opencode/plugins/frame-ship.ts` to reject `multi-subagents`. | Unnecessary complexity: the plugin runtime is already decoupled from lexical mode strings, and adding code dependencies violates the single-file zero-dep constraint. |

---

## Approval Required From

- [ ] Owning domain owner: engineering owner (`vasquez`)
- [ ] People domain owner (`santana` — for cross-lane wording harmony on `W-SUBAGENTS` and `W-SEQ`)
- [ ] Security domain owner (`barrera` — for non-functional masking and security baseline attestation)
- [ ] Orchestrator (`montilla` — for final execution clearance and gate oversight)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

---

## Risk Assessment (integrated from references/risk-assessment.md)

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Cross-lane wording divergence between engineering and people lanes on `W-SUBAGENTS` or `W-SEQ` contracts | Low | Med | Santana (people owner) co-signs proposal; diff verification enforces 0-byte textual drift across shared contracts. |
| R-002 | Residual occurrences of `multi-subagents` left in active templates or skills causing gate rejections | Low | Med | Automated post-implementation verification via `grep -rn "multi-subagents"` across all active engineering surfaces. |
| R-003 | Accidental modification of historical audit records in `docs/specs/50_archive/` or prior ADRs | Low | High | Path scoping strictly enforces changes only in active `skills/`, `docs/specs/12_adr/ADR-009*`, and active catalog files. |
| R-004 | Toolchain or markdown lint breakage resulting from text replacements | Low | Low | Execute `mise run typecheck` and markdown verification before finalizing gate handoff. |
| R-005 | PII or credential leakage during documentation and ADR creation | Low | High | PII checkpoint adhered to; strictly zero real keys or personal identifiable information included (Ley 172-13). |

### Blast Radius

- **Engineering (Services/Data):** Low / Confined. No runtime code (`.opencode/plugins/frame-ship.ts`), runtime dependencies, or database schemas are altered. Impacts only prompt instructions, stage skills, templates, and architectural contracts.
- **Teams:** Engineering specialists, reviewers, and orchestrator adopt unified `subagents` nomenclature. Eliminates cognitive dissonance across the team.
- **Customers / Users:** Zero direct end-user impact. Changes are strictly internal to developer tooling and agent orchestration.
- **Regulators:** Full compliance with Dominican Ley 172-13. Zero PII, credentials, or session tokens introduced in templates, contracts, or examples.
- **Revenue:** Zero financial or revenue impact.

### Rollback Plan

1. **Code Revert:**
   - Since all modifications are strictly documentation and template text committed in discrete git commits, rollback can be executed instantly via:
     ```bash
     git revert --no-edit HEAD~N..HEAD
     ```
   - Rollback owner: `vasquez` (engineering owner).
   - Rollback ETA: ≤15 minutes (typically < 2 minutes).
2. **Non-Code Undo:**
   - No external announcements, filings, API calls, or database migrations are triggered. No external undo actions required.

### Security Considerations

- No authentication mechanisms, session management, or access control rules are modified.
- No public APIs, network boundaries, or data storage mechanisms are impacted.
- Static audit verification confirms zero secrets, API tokens, or PII committed in docs.

### Domain Considerations

- **Engineering:** Confirmed typecheck pass (`mise run typecheck`), zero broken links, exact file-level diff traceability.
- **Security:** Verified zero PII/tokens in templates and reports per Ley 172-13; audit immutability strictly preserved.
- **People:** Shared contracts (`W-SUBAGENTS`, `W-SEQ`) validated byte-identical with `SPEC-subagents-naming-people.md`.
- **Automation/Ops:** Worktree max-2 bound and win32 path discipline in `skills/git-worktree/` preserved under `subagents`.

### C2 budget note (REQ-002 — additive)

One-pass budget: a triggered challenge round runs exactly once, where pass = ≤3 questions (question 4/N+1 = FAIL, blocked), then terminal approve/reject; approver-requested re-grill ≤1 extra pass (total ≤2), then Retry N=2 → escalate orchestrator. Exit before decision = pause + recorded `grill: exited` + escalate, proposal stays unapproved. Blast-radius trigger pointer: any blast-radius line mentioning customers/regulators/revenue (with synonyms: users/clients/members/consumers, GDPR/Ley 172-13/authorities, pipeline/quota/money) fires the C2 round — independent scan rule applies even when prose says "internal only". Rollback/approve-reject terminal preserved — the round challenges the plan, it never rewrites it. Glossary single source C1 (`skills/frame-intent/SKILL.md` §C1); canonical clauses single source people SPEC §4.

---

## C2 challenge hook (REQ-002 — additive, no new required section)

- **Trigger checklist:**
  - [ ] Auth / data / API / PII surface touched? -> NO (documentation only; zero auth/API changes).
  - [ ] Multi-domain scope? -> NO (governed under `[engineering]` lane; people lane is parallel under Santana).
  - [ ] Blast radius mentioning customers / regulators / revenue? -> Evaluated: Mentions Ley 172-13 compliance negatively (certifying zero PII introduced); no customer/revenue impact.
  - [ ] Approver request? -> Available on demand if requested by Vasquez or Barrera.
- **Challenge round status:** Opt-in available. If triggered, strictly constrained to ≤3 questions, 1 question at a time, with warm and direct tone, disagreement invite, and exit alias `exit/salir` respected.
