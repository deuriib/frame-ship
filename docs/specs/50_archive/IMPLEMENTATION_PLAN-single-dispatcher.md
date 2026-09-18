# Implementation Plan: SPEC-single-dispatcher-engineering

**Agent:** engineering implementer (executed single-track per execute-spec SKILL §3.3 — the dispatched ONE; no sub-dispatch)
**Date:** 2026-09-16
**Approved By:** vasquez (CTO) — arch APPROVED with conditions C-1..C-5 (`docs/specs/40_workspace/vasquez/ARCHITECTURE_REVIEW-single-dispatcher.md:5,45-67`); barrera APPROVE wording-only attestation C-1..C-5 (`docs/specs/40_workspace/barrera/SECURITY_REVIEW-single-dispatcher.md:14,62-68`); ADR-003 accepted (`docs/specs/10_design/ADR-003-ceo-only-dispatch.md:4-5`)
**Domains-Touched:** [engineering]
**HARD:** multi-subagents (THIS unit executes directly — single-dispatcher change is docs/config-only); uniform wording (santana contract verbatim); no renames; plugin zero-dep single-file; version bump v0.3.1 in all 4 locations
**GATE:** none-yet (conditions C-1..C-5 from ARCHITECTURE_REVIEW + SECURITY_REVIEW — evidenced at quality-gate)

> Skill: `skills/execute-spec/SKILL.md` (§3 process, loaded via skill tool). Craft: `agents/c-level/vasquez.md` + `agents/engineering/backend.md` (read fully, cited).

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create implementation plan (approval trail before any edit) | `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-single-dispatcher.md` (this file) | file exists | 0.5h |
| 2 | Plugin version bump → v0.3.1: header comment `:2`, `VERSION` `:10` (MARKER `:11` derives automatically) + `.opencode/plugins/AGENTS.md:4` version ref (fixes v0.2.0 drift) | `.opencode/plugins/frame-ship.ts`, `.opencode/plugins/AGENTS.md` | `tsc --noEmit` exit 0 + grep 4 locations identical (REQ-002, C-3) | 0.5h |
| 3 | Plugin dispatch contract: WORKFLOW_CARD modes line `:19` → "CEO dispatches entire team" + brief-back mechanism, montilla (CEO) sole `task` caller; MONTILLA_OWNERSHIP `:34` → "sole dispatcher to the entire team" + brief-back. `hasMarker()` `:36-39` + single-file zero-dep preserved | `.opencode/plugins/frame-ship.ts` | file diff + grep "entire team"/"Cross-domain request" (REQ-001, AC-001) | 0.5h |
| 4 | Skills process text — uniform sentence verbatim ("CEO dispatches entire team; c-levels/specialists do the work or brief back") in 7 locations: `using-frame-ship/SKILL.md:64`; `tool-mapping.md:8,17,35` (+ brief-back flow in §CEO-only dispatch rule, REQ-004); `bootstrap-checklist.md:11`; `translate-to-spec/SKILL.md:29,32`; `propose-changes/SKILL.md:25,30`; `execute-spec/SKILL.md:23,33`; `quality-gate/AGENTS.md:4` ("Owns the fan-out" → "only stage whose reviewers the CEO dispatches in parallel") | 7 files under `skills/` | file diffs + grep old verbs = 0 (REQ-003, AC-003) + tool-mapping read-through (REQ-004, AC-004) | 1.5h |
| 5 | AGENTS.md ×3 dispatch clause (REQ-005): root `AGENTS.md` CONVENTIONS + `Dispatch` clause (sole dispatcher montilla, entire team, brief-back); `skills/AGENTS.md` Role owners line extended; `.opencode/plugins/AGENTS.md` dispatch note (version ref already in step 2) | `AGENTS.md`, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` | file diffs + grep uniform sentence 3/3 (AC-005) | 1h |
| 6 | Verify-only (no reword, diff evidence): 13 mechanism-description lines already name the CEO as caller — `frame-intent/SKILL.md:34`, `review-security/SKILL.md:28`, `review-architecture/SKILL.md:28`, `quality-gate/SKILL.md:28,30,56,58`, `verify-handoff/SKILL.md:27`, `ship-release/SKILL.md:30` | read-only | `git diff` = unchanged + CEO-named (AC-003) | 0.2h |
| 7 | ~~Create 4 implementer prompts~~ **CANCELLED (CEO decision #3 — supersedes CEO decision #2): do NOT create or edit anything under `skills/templates/implementers/`.** Existence check recorded as evidence: 4 files present on disk (`generic-implementer.md`, `engineering-reviewer.md`, `engineering-qa-verifier.md`, `engineering-implementer.md`) — untracked leftovers from a prior run (committed-deleted at `fdfca0a..7fe71c8`); left untouched | `skills/templates/implementers/` (read-only check only) | existence check + status = untracked, untouched (AC-007 N/A — cancelled; AC-REQ-F-008 voided for the engineering track) | 0.2h |
| 8 | Verify ADR-003 content (C-4): Decision §4 (scope incl. implementer-prompts location), §5 (harness adapters, Codex provisional), §6 (AC-001 grep scope + exemptions) present | `docs/specs/10_design/ADR-003-ceo-only-dispatch.md` (read-only) | content check (REQ-006, AC-006 — file already exists, no rewrite) | 0.2h |
| 9 | Typecheck + domain checks: `tsc --noEmit` exit 0 from `.opencode/`; residue grep old verbs = 0 in engineering layer; PII/secrets scan = prohibition clauses only | read-only | `TEST_MATRIX-single-dispatcher.md` (§REQ-NF-001/002/004) | 0.5h |
| 10 | Write test/evidence matrix | `docs/specs/40_workspace/vasquez/TEST_MATRIX-single-dispatcher.md` | file exists | 0.5h |

Each step maps to one work-unit commit unless grouped; commits are executed by montilla (CEO) — this unit leaves changes in the working tree.

## Order of Operations

1. **Plan first** — approval trail intact before any edit.
2. **Plugin before skills** — plugin strings are the injected session contract (WORKFLOW_CARD/MONTILLA_OWNERSHIP); skills and AGENTS.md mirror the same sentence, so the canonical wording lands in the plugin first as the reference layer.
3. **Skills 7 locations after plugin** — same uniform sentence + brief-back mechanism, copied verbatim from santana's contract (SPEC-single-dispatcher-people §4 W2/W8), no paraphrase.
4. **AGENTS.md ×3 after skills** — files carry the identical sentence (grep 3/3, KR-1.2 four-layer consistency).
5. **Prompts CANCELLED — existence check only** —CEO decision #3 cancels REQ-007; no creation/editing under `skills/templates/implementers/`. The 4 untracked leftovers (pre-existing from a prior run) are left untouched; keeping vs removing them is a CEO commit decision (flag in return).
6. **ADR-003 verify + gates last** — read-only checks (content, tsc, residue grep, PII scan) run over the final tree state; then the matrix records evidence.

## Rollback Points

Docs-only change; no data migration, no external undo. One revert point per layer (owner: vasquez; ETA < 15 min total; mirrors IMPLEMENTATION_PLAN-ceo-only-dispatch.md:34-43 + PROPOSED_CHANGES-single-dispatcher.md:88-99 + ADR-003 §Rollback):

| Layer | Revert |
|-------|--------|
| Plugin | `git revert` of the `frame-ship.ts` diff — version bump (header/VERSION/MARKER-derived) reverts with it; re-run `tsc --noEmit` (REQ-NF-004). |
| Skills process text | Per-file `git revert` of the 7 reworded lines (using-frame-ship SKILL, tool-mapping §CEO-only dispatch rule + :17/:35, bootstrap-checklist, translate-to-spec ×2, propose-changes ×2, execute-spec ×2, quality-gate/AGENTS.md); 13 verify-only lines have no revert (diff evidence only). |
| AGENTS.md (3 files) | `git revert` each (root `Dispatch` clause, skills/AGENTS.md Role owners line, `.opencode/plugins/AGENTS.md` version ref + dispatch note). |
| ADR | ADR-003 already filed by propose-changes stage — no delete; content verified only (C-4). |
| Prompts | REQ-007 CANCELLED — nothing created by this run; 4 untracked leftover files under `skills/templates/implementers/` untouched (committed-deleted at `fdfca0a..7fe71c8`; keep-or-remove is the CEO's commit decision — no revert action needed for this unit). |
| Evidence docs | Delete `IMPLEMENTATION_PLAN-single-dispatcher.md` + `TEST_MATRIX-single-dispatcher.md`. |

## Quality Gates

Engineering domain checks (all non-code/documentation tasks):

- [ ] REQ-ID → test → artifact trace — `TEST_MATRIX-single-dispatcher.md` (non-code = reviews/attestations/greps/tsc)
- [ ] `tsc --noEmit` exit 0 from `.opencode/` (REQ-NF-004, AC-002)
- [ ] Zero old-model residue grep = 0 in `skills/` + plugin + 3 AGENTS.md (REQ-NF-002, AC-009)
- [ ] Uniform sentence grep 3/3 AGENTS.md + plugin "entire team"/brief-back (AC-001/AC-005)
- [ ] PII/secrets scan over changed files = prohibition clauses only (REQ-NF-001, AC-008, barrera C-2)
- [ ] ADR-003 content verified (C-4, AC-006)
- [ ] Prompts: REQ-007 CANCELLED (CEO decision #3) — existence check recorded (4 untracked files, untouched); no create/edit under `skills/templates/implementers/` (AC-007 N/A; AC-REQ-F-008 voided for engineering track)
- [ ] No commits run by implementer — working tree left for CEO commit