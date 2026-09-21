# ADR-009: Standardize Execution Nomenclature to "subagents"

**Date:** 2026-09-20  
**Deciders:** Vasquez (Engineering Owner), Santana (People Owner), Montilla (Orchestrator)  
**Status:** accepted  

## Context

Following the structural unification of the Frame→Ship chain into the natural distributed dispatch process in ADR-008 (which eliminated the legacy `single` branch), the compound term `multi-subagents` persisted across framework stage skills, reference templates, catalog documentation, and persistent rules.

In operational practice, `multi-subagents` introduces lexical redundancy (the plural "subagents" inherently denotes multiplicity), diverges from industry-standard nomenclature across leading agentic harnesses (OpenCode, Antigravity, and distributed LLM agent runners), and introduces unnecessary cognitive friction into normative contracts (`W-MULTI`), execution mode declarations (`Execution_Mode:`), and inter-stage packet signatures (`HARD:multi-subagents+...`).

`BRIEF-subagents-naming` approved Option A (in-place active update, preserving historical auditability) to establish `subagents` as the universal, singular methodological execution mode across all active framework surfaces.

## Decision

Adopt `subagents` as the universal, singular methodological execution mode across all active Frame→Ship surfaces, formally retiring `multi-subagents` without altering the underlying execution mechanics or chain lifecycle:

1. **Canonical Execution Contract (`W-SUBAGENTS`):**  
   Incorporated verbatim across core stage skills, templates, and persistent rules:
   > "Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."

2. **Sequential Degradation Contract (`W-SEQ`):**  
   Incorporated verbatim for execution environments lacking concurrent background task dispatch:
   > "Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade."

3. **Packet Envelope Discipline:**  
   The `HARD` token within all inter-stage packet envelopes is standardized to enforce the `HARD:subagents` prefix discipline:
   ```text
   SPEC:<path>#<anchors> / HARD:subagents+<constraints> / GATE:<verdict> / DOMAINS:<list>
   ```
   Any departure requires explicit CEO waiver documentation recorded in the gate report.

4. **Target Surface Scope (20 Active Surfaces):**  
   The standardization applies to exactly 20 active surfaces partitioned across two collaborative domain lanes:
   - **Engineering Domain Lane (13 surfaces):**
     1. `skills/translate-to-spec/SKILL.md` (§3 step 0 pre-flight contract updated to `W-SUBAGENTS`)
     2. `skills/execute-spec/SKILL.md` (§2 supporting skill, §3 step 0 pre-flight, and §3 step 1 mode declaration)
     3. `skills/quality-gate/SKILL.md` (§3 execution mode declaration to `subagents only` with sequential degradation)
     4. `skills/git-worktree/SKILL.md` (§1 purpose and §3 step 4 parallel lane discipline)
     5. `skills/translate-to-spec/references/spec-template.md` (line 9 `Execution_Mode:` declaration)
     6. `skills/propose-changes/references/proposal-template.md` (line 6 `Execution_Mode:` declaration)
     7. `skills/quality-gate/references/gate-report.md` (Load Evidence checklist item)
     8. `skills/verify-handoff/references/dod-checklist.md` (Common DoD Load Evidence checklist item)
     9. `skills/AGENTS.md` (supporting skills table and frozen execution mode convention)
     10. `docs/AGENTS.md` (inter-stage packet reference rule citing `HARD:subagents+...`)
     11. `docs/specs/AGENTS.md` (ADR inventory updated to reflect `ADR-001..009`)
     12. `AGENTS.md` (root conventions line reinforcing `HARD:subagents+...` packet discipline)
     13. `docs/specs/12_adr/ADR-009-subagents-naming.md` (this decision record)
   - **People Domain Lane (7 surfaces):**
     14. `skills/using-frame-ship/SKILL.md` (§3.0 load order, §3.0.3 role understanding, §3.2 lane mapping, §3.3 hard rules)
     15. `skills/using-frame-ship/references/bootstrap-checklist.md` (role understanding and execution declaration)
     16. `skills/frame-intent/SKILL.md` (§3.0 pre-flight and §3.3 freeze execution directive)
     17. `skills/frame-intent/references/product-brief.md` (`Execution_Mode:` declaration)
     18. `rules/frame-ship.md` (`## Execution mode` section with `W-SUBAGENTS`)
     19. `.agents/rules/frame-ship.md` (Always-On discovery mirror lockstep with `rules/frame-ship.md`)
     20. `skills/quality-gate/references/domains/people-review.md` (reviewer checklist and verification criteria)

5. **Historical Immutability (Option A):**  
   In accordance with Option A approved in `BRIEF-subagents-naming` and invariant INV-007 of `docs/specs/10_design/ARCHITECTURE.md`, historical records are strictly immutable. No retroactive alterations shall be made to `docs/specs/50_archive/`, prior briefs, past ADRs (`ADR-001` through `ADR-008`), past release notes, or completed gate evaluation artifacts in `docs/specs/40_workspace/`. The standardization applies exclusively to active operational files.

## Consequences

### Positive

- **Lexical Economy & Cognitive Precision:** Removes redundant terminology; "subagents" inherently conveys distributed team execution without needing the compound "multi-" prefix.
- **Industry Alignment:** Aligns nomenclature directly with leading agentic platforms (OpenCode, Antigravity, modern multi-agent systems).
- **Packet Envelope Uniformity:** Guarantees deterministic parsing and validation across stages via `HARD:subagents+<constraints>`.
- **Zero Runtime Disruption:** Leaves the TypeScript plugin runtime untouched; preserves existing execution semantics and same-thread sequential fallback.
- **Audit Integrity:** Preserves the historical record 100% intact through disciplined Option A execution.

### Negative

- **Dual-Terminology Across Historical Timeline:** Global text searches across the repository will encounter `multi-subagents` within archived historical documents (`docs/specs/50_archive/`, past ADRs, and historical briefs) and `subagents` in active files. Developers, reviewers, and agents must recognize that historical artifacts reflect the nomenclature valid at the time of their creation.

## Supersedes / Superseded By

- **Supersedes:** ADR-008 (`ADR-008-multi-default.md`) specifically in the naming facet. This ADR preserves ADR-008's core architectural accomplishments: the unification into a single natural process, the permanent elimination of the legacy `single` track, full-wave quality gates with adversarial refutation, and the containment of trivial reversible work (<15 lines) strictly to the CEO fast-path outside methodology.

## Links

- `docs/specs/10_design/ARCHITECTURE.md` (Canonical Architecture Contract: Execution Modes and Packet Structure; invariants INV-001..008)
- `docs/briefs/BRIEF-subagents-naming.md`
- `docs/specs/20_backlog/SPEC-subagents-naming-engineering.md`
- `docs/specs/20_backlog/SPEC-subagents-naming-people.md`
- `docs/specs/12_adr/ADR-008-multi-default.md`
