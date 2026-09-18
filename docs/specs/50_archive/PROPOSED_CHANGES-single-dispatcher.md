# Proposed Changes: vasquez (CTO) — Single Dispatcher, Engineering Layer

**Spec Reference:** SPEC-single-dispatcher-engineering
**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents (inherited from SPEC-single-dispatcher-engineering:9, frozen at frame-intent; not overridden)
**Domains-Touched:** [engineering] — people spec (santana, parallel) is the wording source, not a second domain here; packet DOMAINS:[engineering] carried forward
**Packets:** SPEC:docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md#REQ-001..007,REQ-NF-001..003 / HARD:multi-subagents; uniform wording across all layers; no file renames; ADR in docs/specs/10_design/; plugin stays single-file zero-dep / GATE:none-yet / DOMAINS:[engineering]
**Cross-Spec Contract:** SPEC-single-dispatcher-people (santana) 4 Contracts W2/W8 — canonical Cross-domain request wording; engineering consumes verbatim, no paraphrase (SPEC-single-dispatcher-engineering:59)

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## Summary

This proposal converts the engineering layer of the single-dispatcher contract from scattered, half-written state to one dispatcher, one contract, zero residue. It proposes: (1) plugin `frame-ship.ts` strings state "CEO dispatches entire team" + the formal Cross-domain request brief-back mechanism with montilla (CEO) as sole `task` caller; (2) the version trio (plus the `.opencode/plugins/AGENTS.md` reference, currently drifted at v0.2.0) bump together; (3) old-model delegation phrasing in skills process text is replaced by santana's uniform sentence; (4) tool-mapping documents the brief-back flow; (5) the three AGENTS.md files carry the identical contract sentence; (6) ADR-003 is completed as `ADR-003-ceo-only-dispatch.md` (CEO decision #1 — restores the dangling citation chain); (7) the 4 implementer prompts are restored under `skills/templates/implementers/` (CEO decision #2 — previously deleted, required by KR-2.1). No implementation file is touched at this stage.

## Changes

| REQ-ID | Target | Change Type | Description |
|--------|--------|-------------|-------------|
| REQ-001 | `.opencode/plugins/frame-ship.ts` — WORKFLOW_CARD `:17-21` (modes line `:19`), MONTILLA_OWNERSHIP `:34` | file-modify | State "CEO dispatches entire team" + brief-back mechanism: cross-domain need → formal **Cross-domain request** brief to the CEO, who delegates via `task(general)` max 2 parallel or resolves. Any `task(` mention in injected strings names montilla (CEO) as sole caller. `hasMarker()` (`:36-39`) and single-file zero-dep invariant preserved. |
| REQ-002 | `.opencode/plugins/frame-ship.ts` — header `:2`, VERSION `:10`, MARKER `:11`; `.opencode/plugins/AGENTS.md:4` | file-modify | Version bump convention: any edit to WORKFLOW_CARD/MONTILLA_OWNERSHIP bumps the version together. Default: bump to **v0.3.1** (wording-only string change, zero behavior change) — all four locations read identical after bump; fixes v0.2.0-vs-v0.3.0 drift in `plugins/AGENTS.md:4`. Condition that breaks the default: if WORKFLOW_CARD semantics change beyond wording → minor bump instead, recorded in the proposal amendment. |
| REQ-003 | `skills/using-frame-ship/SKILL.md:64`; `skills/using-frame-ship/references/tool-mapping.md:8,17,35`; `skills/using-frame-ship/references/bootstrap-checklist.md:11`; `skills/translate-to-spec/SKILL.md:29,32`; `skills/propose-changes/SKILL.md:25,30`; `skills/execute-spec/SKILL.md:23,33`; `skills/quality-gate/AGENTS.md:4` | file-modify | Old-model delegation phrasing → santana's uniform sentence, verbatim: **"CEO dispatches entire team; c-levels/specialists do the work or brief back."** `quality-gate/AGENTS.md:4` "Owns the fan-out" → "only stage whose reviewers the CEO dispatches in parallel". 13 mechanism-description lines are verify-only (already CEO-named — diff evidence, no reword): `frame-intent/SKILL.md:34`, `review-security/SKILL.md:28`, `review-architecture/SKILL.md:28`, `quality-gate/SKILL.md:28,30,56,58`, `verify-handoff/SKILL.md:27`, `ship-release/SKILL.md:30`. KR-2.3 target: 9/9 stage skills + using-frame-ship. |
| REQ-004 | `skills/using-frame-ship/references/tool-mapping.md` §"CEO-only dispatch rule" `:6-8` (residue at `:8,17,35`) | file-modify | Document the formal brief-back flow: c-level/specialist with a cross-domain need returns a **Cross-domain request** brief to the CEO; CEO delegates to the right agent (`task(general)` max 2 parallel) **or resolves**. Flag-don't-grab shape is not the mechanism of record. Prompt-read order and reference-only packets stay as-is. |
| REQ-005 | Root `AGENTS.md` (add `Dispatch` clause to CONVENTIONS — currently no dispatch statement, plugin POINTERS `frame-ship.ts:30` cites it as truth); `skills/AGENTS.md` (extend Role owners line); `.opencode/plugins/AGENTS.md` (add dispatch contract note, plus version ref per REQ-002) | file-modify | All three carry the identical uniform sentence + brief-back mechanism line — grep 3/3 (KR-1.2, 4-layer consistency: agents/ + skills/ + plugin + AGENTS.md). |
| REQ-006 | `docs/specs/10_design/ADR-003-ceo-only-dispatch.md` | document-create | **Complete ADR-003** (CEO decision #1 — NOT a new ADR-004). Restores citations at `TEST_MATRIX-ceo-only-dispatch.md:10,16,28,41,42`, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:5,30`, `skills/AGENTS.md:24`. Mandatory content: (1) single dispatcher = montilla only; (2) montilla dispatches to the entire team (C-levels AND specialists) via `task(general)` max 2 parallel; (3) c-levels/specialists never delegate — do the work end to end or return a formal Cross-domain request brief to the CEO; (4) scope (layers touched); (5) rollback (per-layer git revert; docs-only, reversible). Shape per `references/adr-template.md` (`review-architecture/SKILL.md:31`). Evidence: file exists + decision/rationale/rollback cites. |
| REQ-007 | `skills/templates/implementers/engineering-implementer.md`, `engineering-reviewer.md`, `engineering-qa-verifier.md`, `generic-implementer.md` | file-create | **Restore the 4 prompts** (CEO decision #2 — required by KR-2.1, deleted in prior cycle per `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:14,38`; spec contingency escalation is superseded by the CEO decision to create). Prompt shape preserved per `TEST_MATRIX-ceo-only-dispatch.md:17` + `skills/AGENTS.md:24`: brief path + 1-line fit + interfaces/rulings + report path + <15-line return. Mechanism line per santana Contract W8, verbatim: "You do not dispatch subagents — do the work end to end; if the work needs another domain/specialist, return a formal Cross-domain request to montilla (CEO): Need + Reason + Suggested owner + Urgency." |
| REQ-NF-001 | (evidence-only — applies to all changed files above) | — | Pattern scan over changed files = prohibition clauses only; no secrets/tokens/credentials/PII (Ley 172-13 minimization). |
| REQ-NF-002 | (evidence-only — applies to all changed files above) | — | Grep old-model verbs ("flag it in your return", "suggested owner", "fan out", "route onward", "never dispatches", "never fan out") = 0 in `skills/`, `.opencode/plugins/frame-ship.ts`, and the 3 AGENTS.md files, outside allowed mechanism descriptions and santana-owned `agents/`. Counts logged per layer. |
| REQ-NF-003 | `IMPLEMENTATION_PLAN-single-dispatcher.md` (created at execute-spec) | document-create (execute-spec stage) | Rollback table: one revert point per layer + ETA < 15 min; HANDOFF carries the rollback note. Shape mirrors `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:34-43`. |
| REQ-NF-004 | (evidence-only — from requirements index `REQ-single-dispatcher-engineering.md:29`) | — | `tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts` exit 0 (run from `.opencode/`) after any string edit; single-file zero-dep invariant holds. |

Change types per `references/proposal-template.md:23`.

## Rationale

- The delegation contract must read identically in all 4 layers — `agents/` (santana), `skills/` (process), plugin `frame-ship.ts` (injected strings), AGENTS.md files — or the CEO-only rule drifts the way it already did once (v0.2.0 doc vs v0.3.0 plugin; ADR-003 cited-but-missing; prompts evidenced-but-deleted). Each REQ above closes exactly one inventoried gap from SPEC §1 (`SPEC-single-dispatcher-engineering.md:14-24`), each with a greppable acceptance criterion.
- The uniform sentence comes **verbatim** from santana's people spec (SPEC-single-dispatcher-people §4 W2/W8) — engineering reuses, never paraphrases, so the gate can diff word-for-word (people REQ-NF-001).
- Completing ADR-003 (not ADR-004) restores the citation chain from the prior cycle's TEST_MATRIX and IMPLEMENTATION_PLAN rather than leaving dangling references plus a cross-ref note — the decision was already made and recorded; the file filing is the repair.
- Restoring the 4 prompts is not scope expansion: KR-2.1 counts them (68 templates + 4 prompts), `skills/AGENTS.md:24` still claims the location, and the CEO decision pre-authorizes creation within REQ-007.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| New ADR-004 with cross-ref note ("ADR-003 never filed") | CEO decision #1: completing ADR-003 restores the existing citation chain (TEST_MATRIX:10,16,28,41,42; IMPLEMENTATION_PLAN:5,30; skills/AGENTS.md:24); ADR-004 would leave those references dangling and add a second record for one decision. |
| Engineering invents its own compact sentence for plugin/skills | HARD "uniform wording across all layers"; santana owns the canonical wording (BRIEF-single-dispatcher.md:62 open question #2, resolved in people spec §4). Divergent paraphrase would break the verbatim gate check (people REQ-NF-001). |
| Escalate prompts gap to CEO at execute-spec instead of proposing restoration | CEO decision #2 resolves the contingency in advance: the 4 prompts are required by KR-2.1 and were deleted in a prior cycle — restoration is in-scope REQ-007 work, not an escalation. |
| Minimal plugin-only patch (skip skills/AGENTS/prompts) | KR-1.2 requires the contract identical in all 4 layers; a plugin-only fix leaves residue in skills and AGENTS.md — the exact drift mode that created the current scattered state. |
| Version stays v0.3.0, doc fixed to match | REQ-002 explicitly binds version bump to any WORKFLOW_CARD/MONTILLA_OWNERSHIP edit; a wording-only string change without a bump breaks the stated convention. Default v0.3.1 (patch) per zero behavior change. |

## Approval Required From

- [ ] **vasquez (CTO)** — owning C-level, engineering domain (mandatory; ADR + architecture/API/model impact via plugin contract strings).
- [ ] **barrera (CISO)** — plugin diff + wording review, security attestation (no auth/data/API surface — wording-only per BRIEF-single-dispatcher.md:49; REQ-NF-001 scan evidence).
- [ ] **santana (CHRO/CPO)** — wording contract sign-off: engineering's uniform sentence and prompt mechanism lines match SPEC-single-dispatcher-people §4 W2/W8 verbatim.
- [ ] (Gate, not blockers here) dauhajre, subero, vera, montero, espinoza sign their template sets at the quality gate per SPEC-single-dispatcher-people REQ-NF-005 (`:44`, `:60`).

> **Rule:** No repository file modifications during proposal phase. Implementation files (plugin, skills, AGENTS.md, ADR, prompts) stay untouched until this proposal is approved and execute-spec runs.

---

# Risk Assessment: SPEC-single-dispatcher-engineering

**Proposer:** vasquez (CTO)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Plugin string edit breaks typecheck or idempotency (`hasMarker`/MARKER mismatch) → injected card duplication or tsc failure | Low | High | REQ-002 binds VERSION/MARKER/header bump together (MARKER is derived from VERSION, `frame-ship.ts:11`); REQ-NF-004 runs `tsc --noEmit` after any edit; `hasMarker()` guard (`:36-39`) verified unchanged. |
| R-002 | Skill text edit violates loader contract (frontmatter keys, body shape) → skill load failures for all stages | Low | High | Frontmatter untouched (`name`/`description` only, `skills/AGENTS.md` CONVENTIONS); body shape fixed (Purpose/Chain/2b/Process/Won't-do/References); only delegation-language lines reworded (SPEC §4 skill text contract). |
| R-003 | Wording divergence from santana's canonical sentence → gate verbatim check fails, rework | Med | Med | Engineering consumes the sentence verbatim from SPEC-single-dispatcher-people §4 (W2 block, W8 prompt line); santana sign-off on this proposal before execute-spec; gate diff = 0 bytes target (people REQ-NF-001). |
| R-004 | ADR-003 completion conflicts with another branch/artifact (prior references assume content that differs) | Low | Med | Citations inventoried: TEST_MATRIX:10,16,28,41,42 (Decision.1/5/6 cites), IMPLEMENTATION_PLAN:5,30 (Decision.1), skills/AGENTS.md:24 (Decision.4); ADR content follows adr-template and covers the 5 mandatory decision points from REQ-006 verbatim. |
| R-005 | Prompt restoration recreates prior-cycle content that contradicts current contract (shape drift) | Med | Med | Prompt shape canonicalized by TEST_MATRIX:17 (E-008: brief path + 1-line fit + interfaces/rulings + report path + <15-line return) + mechanism line W8 verbatim; existing names fixed per IMPLEMENTATION_PLAN:14 — no new/deleted names (HARD no renames). |
| R-006 | Residual old-model wording missed in one of the 13 verify-only mechanism lines | Low | Low | Verify-only lines get diff evidence at execute-spec (unchanged-or-CEO-named per AC-003); REQ-NF-002 repo-wide grep with counts per layer catches drift. |

## Blast Radius

- **Systems:** plugin injected strings bootstrap every opencode session (WORKFLOW_CARD/GUARDRAILS/POINTERS/MONTILLA_OWNERSHIP); skills process text governs all 9 stages + using-frame-ship; 3 AGENTS.md files are the working-dir contract; ADR is the recorded decision; prompts are the dispatch read-orders. Failure modes: wrong/missing sentence → dispatch contract mis-governed; tsc/idempotency break → session noise or skill mis-registration; loader-contract break → skill load failure. All docs/config — no code behavior beyond strings.
- **Teams:** every role (7 C-levels + 60+ specialists) consumes the injected strings and skills text each session; wording change alters how cross-domain needs are routed. People-domain coupling: wording must match santana's contract or the 68-template + 4-prompt sets disagree at gate.
- **Customers:** none — internal tooling, no customer-facing surface, no external APIs, no data movement.
- **Regulators:** Ley 172-13 — docs-only text change; no PII/secrets introduced (REQ-NF-001 scan is the evidence); prohibition clauses already present in guardrail strings stay intact.
- **Revenue:** none direct; indirect only via team consistency/efficiency (docs-only, reversible).

## Rollback Plan

Docs-only change; no data migration, no external undo. One revert point per layer (owner: vasquez; ETA < 15 min total; mirrors IMPLEMENTATION_PLAN-ceo-only-dispatch.md:34-43):

| Layer | Revert |
|-------|--------|
| Plugin | `git revert` of the `frame-ship.ts` diff — version bump (VERSION/MARKER/header) reverts with it; re-run `tsc --noEmit`. |
| Skills process text | Per-file `git revert` of the 7 reworded lines (using-frame-ship SKILL + tool-mapping + bootstrap-checklist, translate-to-spec, propose-changes, execute-spec, quality-gate/AGENTS.md); verify-only lines have no revert (diff evidence only). |
| tool-mapping rewrite | `git revert` restores §"CEO-only dispatch rule" prior block. |
| AGENTS.md (3 files) | `git revert` each (root AGENTS.md Dispatch clause, skills/AGENTS.md Role owners line, `.opencode/plugins/AGENTS.md` dispatch note + version ref). |
| ADR | Delete `docs/specs/10_design/ADR-003-ceo-only-dispatch.md` (file-create commit revert). |
| Prompts | `git rm -r skills/templates/implementers/` (or revert the create commit). |

## Security Considerations

- Wording-only change: no auth, no data exposure, no input-validation surface; no new endpoints/adapters/boundaries/payloads (barrera waiver-with-reason pattern from prior cycle, TEST_MATRIX:20).
- REQ-NF-001: pattern scan over all changed files (plugin strings, skill lines, AGENTS.md clauses, ADR, prompt mechanism lines) — only prohibition clauses may match; finding without proof = REFUTED, scan output is the evidence (SPEC AC-008).
- barrera reviews the plugin diff + wording at gate per BRIEF-single-dispatcher.md:49 (security attestation, **not** a STRIDE review — no code/data surface).

## Domain Considerations

- **Engineering (vasquez):** uniform wording sentence reused verbatim from santana's contract — no divergent paraphrase; ADR-003 completed (not ADR-004); VERSION/MARKER/header/plugin-doc bumped together; plugin stays single-file zero-dep; `tsc --noEmit` green; prompt mechanism lines consistent with brief-back contract (SPEC §2 REQ-007, AC-007).
- **People (santana):** canonical wording ownership — this proposal only consumes; santana sign-off requires verbatim equality of the sentence in plugin/skills/AGENTS (grep 3/3) and of the prompt mechanism line (W8, grep 4/4). Cross-spec dependency per SPEC-single-dispatcher-engineering §6 (people spec in flight; final verbatim match confirmed at gate).
- Other domains (security/finance/legal/marketing/revenue/automation): not touched by this proposal — their template sets are santana's scope; their C-levels sign template sets at the people gate (REQ-NF-005), listed as gate dependency, not this proposal's approvers.
- Data lens: N/A — no schema, lineage, or PII-store impact (SPEC-single-dispatcher-engineering:64).
