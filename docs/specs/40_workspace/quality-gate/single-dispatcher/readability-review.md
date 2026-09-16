# Readability Review: SPEC-single-dispatcher-engineering

**Reviewer:** review-readability
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** `skills/quality-gate/SKILL.md` (process) — loaded and cited
**Template:** `agents/engineering/review-readability.md` (craft) — read fully
**Checklist ref:** `skills/quality-gate/references/engineering/readability-review.md`
**Domains-touched:** [engineering]
**Packet:** SPEC: `docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md`#REQ-001..006,NF-001..004 / HARD: multi-subagents; uniform wording; no renames; plugin zero-dep single-file; v0.3.1 in 4 locations; REQ-007 CANCELLED / GATE: none-yet → this review feeds GATE_REPORT / DOMAINS: [engineering]

## Checklist

- [x] Naming is intention-revealing (no `data`, `tmp`, `x`)
- [x] Functions have single responsibility
- [x] Nesting depth <= 3
- [x] Comments explain WHY, not WHAT
- [x] Public APIs documented
- [x] No dead code or commented-out blocks
- [x] Consistent style with surrounding code
- [x] Uniform contract sentence identical across all engineering-layer locations (grep 14+ occurrences)
- [x] Version v0.3.1 identical in all 4 required locations
- [x] Old-model delegation verbs = 0 in engineering layer (single exempt mechanism description)
- [x] No stale implementer-prompt references in changed files (REQ-007 CANCELLED honored)
- [x] ADR-003 decision §1-§6 coherent, rollback clean

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RD-001 | Medium | `CHANGELOG.md:13,29` + `.opencode/plugins/frame-ship.ts:2` | **Version label collision + regression.** The bump lands the plugin on `v0.3.1`, but `CHANGELOG.md:29` already uses `[v0.3.1] — 2026-09-16` for the agents-to-root unit (`docs/specs/50_archive/SPEC-003-agents-to-root.md:3` "released as v0.3.1-agents-to-root") and `CHANGELOG.md:13` already documents `[v0.3.2] — 2026-09-16` as the concise-plugin-prompts release (plugin 223→156 lines — the current plugin's own shape). Plugin at HEAD was v0.3.0 (`git show HEAD:.opencode/plugins/frame-ship.ts`). Result: the plugin label equals an already-released label for a different unit and sits *below* the v0.3.2 the changelog attributes to the plugin's current form. The exact drift mode this initiative exists to kill (version ambiguity across layers) is partially reproduced at repo level. The proposal recorded this as the REQ-002 default (PROPOSED_CHANGES-single-dispatcher.md:22), but the changelog evidence post-dates/contradicts that assumption. |
| RD-002 | Medium | `SPEC-single-dispatcher-people.md:75-76` vs `SPEC-single-dispatcher-engineering.md:30,55-58` | **Cited wording source doesn't verify.** Engineering claims the uniform sentence is "verbatim from SPEC-single-dispatcher-people §4 W2/W8" (SPEC:30; PROPOSED_CHANGES-single-dispatcher.md:23,38; TEST_MATRIX-single-dispatcher.md:29 C-1; ADR-003-ceo-only-dispatch.md:26-28). The actual W2 block (people spec `:75-76`) reads "Do your own work end to end; never delegate. Only montilla (CEO) dispatches." — the sentence "CEO dispatches entire team; c-levels/specialists do the work or brief back" appears **nowhere** in the people spec. Its true source is the OKR (`docs/briefs/OKR-single-dispatcher.md:11,20`, KR-1.2/KR-2.3 targets). Meaning is shared, words are not: santana's 68 templates carry W2 wording while plugin/skills/AGENTS.md carry the OKR sentence. KR-1.2 "contract reads identically in all 4 layers" holds at meaning level, not verbatim — the verbatim-match gate diff (target 0 bytes) cannot succeed as written. |
| RD-003 | Low | `ADR-003-ceo-only-dispatch.md:26` | Typo in the decision record: "not specialits" → "not specialists". The ADR is the long-lived citation target (TEST_MATRIX-ceo-only-dispatch.md:10,16,28,41,42); a typo in it propagates by reference. |
| RD-004 | Low | `ADR-003-ceo-only-dispatch.md:46-47` | "no `skills/templates/implementers/` location" slightly over-claims: TEST_MATRIX-single-dispatcher.md:17 records 4 untracked leftover files on disk (and santana's TEST_MATRIX-single-dispatcher.md:26 records the directory *absent* at its execution time — the two tracks conflict on existence). The operative sentence ("Implementer prompts are out of scope (CEO decision #3 — cancelled)") is correct; the "no location" flourish reads as a factual mismatch. |
| RD-005 | Low | `docs/specs/15_requirements/REQ-single-dispatcher-engineering.md:20,47` | Requirements index still lists REQ-007 as active with its original contingency; the CANCELLED status lives only in TEST_MATRIX:6,35-39 and IMPLEMENTATION_PLAN:22. A reader of the index would not learn CEO decision #3. |

## Positive Observations

- **Uniform sentence, zero paraphrase.** "CEO dispatches entire team; c-levels/specialists do the work or brief back" is word-for-word identical across all engineering-layer locations: `frame-ship.ts:19,:34`; `tool-mapping.md:8,:17,:35`; `bootstrap-checklist.md:11`; `using-frame-ship/SKILL.md:64`; `translate-to-spec/SKILL.md:29,:32`; `propose-changes/SKILL.md:25,:30`; `execute-spec/SKILL.md:23,:33`; root `AGENTS.md:37`; `skills/AGENTS.md:26`; `.opencode/plugins/AGENTS.md:19`; `ADR-003:27-28`. No divergent paraphrase anywhere (grep "dispatches entire team|do the work or brief back" = 35 hits, all consistent).
- **Brief-back mechanism complete everywhere.** Formal Cross-domain request (Need + Reason + Suggested owner + Urgency) inside the agent's return; CEO delegates via `task(general)` max 2 parallel or resolves — present in plugin:19,:34, tool-mapping:8, bootstrap-checklist:11, execute-spec:23,:33, root AGENTS.md:37, skills/AGENTS.md:26, plugins/AGENTS.md:19, ADR-003:29-39. REQ-004 AC-004 satisfied: tool-mapping §"CEO-only dispatch rule" (`:6-8`) documents the flow; no flag-don't-grab residue.
- **Version 4-location sync correct (REQ-002/AC-002).** Header `frame-ship.ts:2`, `VERSION :10`, derived `MARKER :11`, `.opencode/plugins/AGENTS.md:4` all read v0.3.1; the v0.2.0 doc drift is fixed. Independent re-run of `tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts` from `.opencode/` → exit 0 (matches E-012). `import type` only, single committed file.
- **hasMarker() idempotency preserved (REQ-001/AC-001).** `frame-ship.ts:36-39` unchanged; still guards both hooks (`:141`, `:148`); MARKER still derived from VERSION (`:11`).
- **Zero old-model residue (REQ-NF-002/AC-003).** `never dispatches|never fan out|NEVER fans out|no C-level fan-out|fan out|fans out` = 0 in plugin, 3 AGENTS.md, and the 7 reworded skill files; single exempt hit `tool-mapping.md:8` is the new CEO-only mechanism description (exempt per ADR-003 §Decision.6 and REQ-NF-002) — matches E-010's claim of 1 hit total in the engineering layer.
- **No stale implementer-prompt references in changed files.** grep "implementer" = 0 in `tool-mapping.md`, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md`, and all 7 reworded skill files. TEST_MATRIX-single-dispatcher.md:39's stale-reference warning (tool-mapping:13, skills/AGENTS.md:24, plugins/AGENTS.md WHERE-TO-LOOK) does not hold for the final working tree — those mentions are gone. REQ-007 CANCELLED properly honored: nothing created/edited under `skills/templates/implementers/`.
- **quality-gate/AGENTS.md:4 reword correct:** "Only stage whose reviewers the CEO dispatches in parallel; merges verdicts." — fan-out language gone.
- **ADR-003 overall quality.** Context → Decision §1-§6 → Consequences (positive/negative) → Rollback is coherent; the 5 mandatory decision points (single dispatcher, entire team, no delegation/brief-back, scope, rollback) all present per REQ-006; per-layer rollback (plugin/skills/AGENTS/ADR) mirrors the proposal's and stays docs-only, reversible, ETA < 15 min.
- **13 verify-only mechanism lines** confirmed still CEO-named (frame-intent:34, review-security:28, review-architecture:28, quality-gate/SKILL:28,:30,:56,:58, verify-handoff:27, ship-release:30, gate-report.md:36) — no reword needed, no contradiction introduced.

## Verdict Rationale

The engineering layer is internally consistent: one sentence, one mechanism, zero residue, typecheck green, idempotency intact, cancellation honored. Nothing in the reviewed files contradicts the contract. However, two Medium findings warrant conditions rather than a clean pass: (1) the v0.3.1 label collides with an already-released changelog label and sits below the changelog's own v0.3.2 plugin attribution — a reproducibility of the exact version-drift the initiative exists to fix; (2) the "verbatim from people spec §4 W2" citation does not verify against the filed people spec — a cross-spec wording reconciliation is needed before the consolidated gate can claim 4-layer verbatim identity (KR-1.2).

## Conditions

- [ ] **RD-COND-001 (owner: vasquez; verify at gate):** Version label reconciled — either bump to the next free label (next after `CHANGELOG.md:13`'s v0.3.2) or record an explicit mapping of plugin v0.3.1 vs changelog v0.3.1-agents-to-root / v0.3.2 before ship-release. Update the 4 locations together per REQ-002 if changed. Addresses RD-001.
- [ ] RD-COND-002 (owner: montilla + santana at people gate): Canonical-sentence source reconciled — either the people spec §4 adopts the OKR sentence (OKR-single-dispatcher.md:11,20) verbatim, or engineering's "verbatim from §4 W2" citations are corrected and KR-1.2 is scoped to meaning-level equivalence. Addresses RD-002 (cross-spec; decided at the consolidated gate, not on this engineering verdict alone).

Low findings RD-003/RD-004/RD-005 ride this gate and should be fixed in the same work unit (ADR typo, ADR "no location" flourish, REQ index cancellation marker).

## Cross-domain request (to montilla, CEO)

- **Need:** Decide the canonical uniform sentence for the 4-layer contract (OKR sentence vs people-spec W2 sentence) and instruct santana + vasquez accordingly before the consolidated gate.
- **Reason:** Engineering ships the OKR sentence; santana's 68 templates ship W2 wording. The 0-byte verbatim-match requirement (people REQ-NF-001 / engineering AC-005) cannot pass while the layers carry different words for the same meaning.
- **Suggested owner:** santana (CHRO/CPO — wording owner) + vasquez (engineering, applies the correction).
- **Urgency:** P1 (blocks the verbatim-match acceptance criterion at the consolidated gate; does not block the engineering layer's internal consistency).

## Load Evidence (per gate-report.md:32-38)

- [x] Stage skill loaded: `skills/quality-gate/SKILL.md` (cited above; trigger "gate SPEC-XXX" match)
- [x] Agent template read: `agents/engineering/review-readability.md` (cited above)
- [x] Execution mode declared: multi-subagents; this reviewer ran inside the CEO-dispatched gate wave, no sub-dispatch
- [x] Packet intact: SPEC/HARD/GATE/DOMAINS cited above by reference — no full-context paste