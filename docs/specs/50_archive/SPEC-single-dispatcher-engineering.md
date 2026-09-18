# Spec: Single Dispatcher — CEO-only Delegation Contract (Engineering Layer)

**ID:** SPEC-single-dispatcher-engineering
**Owner:** vasquez (CTO) — domain chain owner, engineering
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-single-dispatcher
**Status:** draft
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from BRIEF-single-dispatcher, frozen at frame-intent; not overridden)

## 1. Context

BRIEF-single-dispatcher (approved 2026-09-15) pins the delegation contract to one fact: **only montilla (CEO) dispatches — to the entire team (C-levels AND specialists); everyone else does the work end to end or returns a formal Cross-domain request brief to the CEO.** The people spec (santana, parallel) owns the exact template wording contract for `agents/` (68 templates). This spec owns the **engineering layer**: plugin strings, skills process text, the three AGENTS.md contract files, the ADR filing, and the implementer prompts' mechanism lines.

The work is required because the contract is currently scattered and half-written in the engineering layer:

1. **Plugin** (`frame-ship.ts`) describes multi-mode dispatch as "task(general) per domain max2… returns deliverable+risks+assumptions+evidence" (`frame-ship.ts:19`) and Montilla as "owner of… dispatch" (`frame-ship.ts:34`) — neither states **"CEO dispatches entire team"** nor the **brief-back mechanism** (KR-1.2, KR-2.1).
2. **Skills process text** still carries old-model residue: "C-level returns its spec, never dispatches" (`skills/translate-to-spec/SKILL.md:29,32`), "C-level returns its proposal, never dispatches" (`skills/propose-changes/SKILL.md:25,30`), "C-levels return deliverables and never dispatch" (`skills/using-frame-ship/SKILL.md:64`), "NEVER fans out / never fan out" (`skills/using-frame-ship/references/tool-mapping.md:8,17,35`), "the CEO fans out… no C-level fan-out" (`skills/execute-spec/SKILL.md:33`), "Owns the fan-out" (`skills/quality-gate/AGENTS.md:4`). KR-2.3 target: **"CEO dispatches entire team; c-levels/specialists do the work or brief back"** in 9/9 stage skills + using-frame-ship.
3. **tool-mapping.md:8** documents flag-don't-grab as the cross-domain mechanism; KR-2.2 requires it to document the **brief-back flow** (CEO receives brief → delegates to the right agent or resolves).
4. **AGENTS.md contract layer**: root `AGENTS.md` has no dispatch statement at all (plugin `POINTERS` at `frame-ship.ts:30` cites AGENTS.md as the dispatch source of truth — the file must carry it); `skills/AGENTS.md` and `.opencode/plugins/AGENTS.md` likewise lack the single-dispatcher sentence. KR-1.2: contract reads identically in all 4 layers.
5. **ADR gap**: ADR-003 (CEO-only dispatch) is cited by `docs/specs/40_workspace/vasquez/TEST_MATRIX-ceo-only-dispatch.md:10,16,28,41,42`, `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-ceo-only-dispatch.md:5,30`, and `skills/AGENTS.md:24`, **but the file is missing** from `docs/specs/10_design/` (only `ADR-001-agent-templates.md`, `ADR-002-agent-templates-portable.md`, `ADR-002-agents-to-root.md` exist). KR-1.3: ADR filed with decision + rationale + rollback.
6. **Implementer-prompts drift**: the 4 prompts (`skills/templates/implementers/{engineering-implementer,engineering-reviewer,engineering-qa-verifier,generic-implementer}.md`) are referenced by `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:14` and evidenced as existing by `TEST_MATRIX-ceo-only-dispatch.md:17` (E-008), **but the directory does not exist at spec time** (glob `skills/templates/**` = 0). KR-2.1: every implementer prompt defines the Cross-domain request section.

Outcome: one dispatcher, one contract, zero residue in the engineering layer — grep-verified (KR-1.1/1.2/2.1/2.2/2.3 targets) and ADR-filed (KR-1.3).

## 2. Requirements

- **REQ-001 (F, P0):** Plugin `frame-ship.ts` dispatch contract — `WORKFLOW_CARD` (`frame-ship.ts:17-21`, esp. the modes line at `:19`) and `MONTILLA_OWNERSHIP` (`:34`) must state **"CEO dispatches entire team"** and the **brief-back mechanism**: cross-domain needs return as a **formal Cross-domain request brief to the CEO**, who delegates to the right agent or resolves. Any `task(general)`/dispatch mention in injected strings names montilla (CEO) as the sole caller. Plugin stays single-file zero-dep (HARD), `hasMarker()` idempotency preserved (`frame-ship.ts:36-39`). Evidence: grep + file diff + `tsc --noEmit` exit 0.
- **REQ-002 (F, P0):** Version/marker bump convention — any edit to WORKFLOW_CARD/MONTILLA_OWNERSHIP bumps together: `VERSION` const (`frame-ship.ts:10`), `MARKER` (`:11`, derived), header comment version (`:2`), and the version reference in `.opencode/plugins/AGENTS.md` (`:4` — currently drifted: doc says v0.2.0, plugin is v0.3.0). All four read identical after bump. Evidence: grep of the 4 locations + `tsc --noEmit` exit 0.
- **REQ-003 (F, P0):** Skills process text — replace old-model delegation phrasing with the uniform sentence **"CEO dispatches entire team; c-levels/specialists do the work or brief back"** (exact wording contract per santana; engineering reuses it verbatim) in: `skills/using-frame-ship/SKILL.md:64`, `references/tool-mapping.md:8,17,35`, `references/bootstrap-checklist.md:11`; `skills/translate-to-spec/SKILL.md:29,32`; `skills/propose-changes/SKILL.md:25,30`; `skills/execute-spec/SKILL.md:23,33`; plus consistency verification (mechanism lines already name the CEO — no reword required, evidence only) in `frame-intent/SKILL.md:34` (montilla-owned stage), `review-security/SKILL.md:28`, `review-architecture/SKILL.md:28`, `quality-gate/SKILL.md:28,30,56,58`, `verify-handoff/SKILL.md:27`, `ship-release/SKILL.md:30`, and `skills/quality-gate/AGENTS.md:4` ("Owns the fan-out" → "only stage whose reviewers the CEO dispatches in parallel"). Old verbs ("never dispatches", "never fan out", "NEVER fans out", "no C-level fan-out") = 0 in `skills/` after change (KR-2.3). Evidence: grep counts + file diffs.
- **REQ-004 (F, P0):** tool-mapping brief-back flow — `skills/using-frame-ship/references/tool-mapping.md` §"CEO-only dispatch rule" (`:6-8`) documents the formal flow: c-level/specialist with a cross-domain need returns a **Cross-domain request brief** to the CEO; CEO delegates to the right agent (via `task(general)` max 2 parallel) **or resolves**. Flag-don't-grab residue ("need + reason + suggested owner" shape, if present after santana's template rewrite) is not the mechanism of record; prompt-read order and reference-only packets stay as-is (KR-2.2). Evidence: read-through + grep of terms.
- **REQ-005 (F, P0):** AGENTS.md contract layer — root `AGENTS.md` (currently no dispatch statement; add a `Dispatch` clause to CONVENTIONS §, closing the gap the plugin `POINTERS` at `frame-ship.ts:30` cites), `skills/AGENTS.md` (extend Role owners line), `.opencode/plugins/AGENTS.md` (add dispatch contract note) each carry the identical uniform sentence (KR-1.2) plus the brief-back mechanism line. Evidence: file diffs + grep 3/3.
- **REQ-006 (F, P1):** ADR filing — the single-dispatcher decision is recorded in `docs/specs/10_design/` per HARD. **Recommended: complete ADR-003 as `ADR-003-ceo-only-dispatch.md`** (restores the citation chain at `TEST_MATRIX-ceo-only-dispatch.md:10,16,28,41,42`, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:5,30`, `skills/AGENTS.md:24`, which all cite `ADR-003 §Decision.N`); alternative: new ADR-004 with a cross-reference note that ADR-003 was never filed. Decision content (mandatory): (1) single dispatcher = montilla only; (2) montilla dispatches to the entire team (C-levels AND specialists) via `task(general)` max 2 parallel; (3) c-levels/specialists never delegate — they do the work end to end or return a formal Cross-domain request brief to the CEO; (4) scope (layers touched); (5) rollback (per-layer git revert; docs-only, reversible). Evidence: file exists in `10_design/` + cites decision/rationale/rollback (KR-1.3).
- **REQ-007 (F, P1):** Implementer prompts mechanism consistency — the 4 prompts under `skills/templates/implementers/*.md` (`engineering-implementer.md`, `engineering-reviewer.md`, `engineering-qa-verifier.md`, `generic-implementer.md` per `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:14`) carry mechanism lines consistent with the brief-back contract: "do the work end to end; cross-domain need → formal Cross-domain request brief to CEO; never dispatch", matching santana's exact wording contract. Prompt shape (brief path + 1-line fit + interfaces/rulings + report path + <15-line return) preserved per `TEST_MATRIX-ceo-only-dispatch.md:17` + `skills/AGENTS.md:24`. **Contingency:** the directory is missing at spec time — execute-spec must first verify existence; if still absent, record the gap and escalate to montilla (CEO) before creating (creation = scope expansion beyond the brief's "Update 4… prompts"). Evidence: grep "Cross-domain request" 4/4 + file diffs (KR-2.1).
- **REQ-NF-001 (NF, P0):** No secrets/PII — updated plugin strings, skill lines, AGENTS.md clauses, ADR, and prompt mechanism lines contain no secrets, tokens, credentials, or personal data (Ley 172-13 minimization; BRIEF constraints). Evidence: pattern scan over the changed files = prohibition clauses only.
- **REQ-NF-002 (NF, P0):** Zero old-model residue in the engineering layer — after change, grep for old dispatch verbs ("flag it in your return", "suggested owner", "fan out", "route onward", "never dispatches", "never fan out") = 0 in `skills/`, `.opencode/plugins/frame-ship.ts`, and the 3 AGENTS.md files, outside allowed mechanism descriptions and santana-owned `agents/` templates (KR-1.1/1.2, greppable per OKR). Evidence: repo-wide grep counts per layer.
- **REQ-NF-003 (NF, P1):** Rollback — per-layer revert points documented in the implementation plan: plugin (revert `frame-ship.ts` diff; version bump reverts with it), skills (per-file `git revert`), AGENTS.md (3 files), ADR (delete file), prompts (delete dir). Docs-only change; no data migration, no external undo; ETA < 15 min (mirrors `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:34-43` rollback shape). Evidence: rollback table in plan + HANDOFF note.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Grep of `WORKFLOW_CARD` + `MONTILLA_OWNERSHIP` contains "entire team" and the brief-back wording; any `task(` mention in injected strings scopes the caller to CEO; `tsc --noEmit` exit 0 (run from `.opencode/`); plugin remains single committed file.
- [ ] AC-002 (REQ-002): `VERSION` (`frame-ship.ts:10`) == header comment version (`:2`) == `.opencode/plugins/AGENTS.md:4` version reference; `MARKER` derived correctly; `tsc --noEmit` exit 0.
- [ ] AC-003 (REQ-003): Grep of `skills/` for old verbs ("never dispatches", "never fan out", "NEVER fans out", "no C-level fan-out") = 0; uniform sentence present in the 7 named SKILL/docs locations (KR-2.3 consistency verified by grep); the 7 mechanism-description lines verified unchanged-or-CEO-named with diff evidence.
- [ ] AC-004 (REQ-004): Read-through of `tool-mapping.md` §"CEO-only dispatch rule" shows the formal Cross-domain request brief flow (deliver → CEO delegates or resolves); grep of "Cross-domain request" present in tool-mapping; no flag-don't-grab residue.
- [ ] AC-005 (REQ-005): The uniform sentence (verbatim match to santana's contract) present in root `AGENTS.md`, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` — grep 3/3; root AGENTS.md has a `Dispatch` clause.
- [ ] AC-006 (REQ-006): `docs/specs/10_design/ADR-003-ceo-only-dispatch.md` (or ADR-004 + cross-ref) exists; content covers decision, scope, rationale for the 4 mandatory decision points, and rollback; prior citations resolve.
- [ ] AC-007 (REQ-007): 4 prompt files exist under `skills/templates/implementers/` and each contains the Cross-domain request mechanism line — grep "Cross-domain request" 4/4 (KR-2.1); if absent at execute-spec, gap recorded + escalated to CEO (dependency below).
- [ ] AC-008 (REQ-NF-001): Pattern scan of changed files shows only prohibition clauses; no PII/secrets — finding without proof = REFUTED, so the scan output is the evidence.
- [ ] AC-009 (REQ-NF-002): Repo-wide grep for the 6 old phrases = 0 in engineering layer (skills/, plugin, 3 AGENTS.md) with counts logged per layer.
- [ ] AC-010 (REQ-NF-003): Rollback table in the implementation plan lists one revert point per layer + ETA; HANDOFF carries the rollback note.

## 4. Contracts & Interfaces

**Uniform wording contract (verbatim, cross-layer):**
> "CEO dispatches entire team; c-levels/specialists do the work or brief back."
> Mechanism: formal **Cross-domain request** brief to the CEO (montilla) — CEO delegates to the right agent via `task(general)` max 2 parallel, or resolves.

- Owner of the exact wording: **santana** (people spec, parallel — 68 agent templates); engineering reuses the same sentence verbatim in plugin/skills/AGENTS.md to satisfy "uniform wording across all layers" (HARD). No divergent paraphrase in the engineering layer.
- Plugin string contract (`frame-ship.ts`): `VERSION`/`MARKER`/header/`plugins/AGENTS.md` version bump together (single source: `frame-ship.ts:10-11`); injected strings prefixed with `${MARKER}`, greppable; no new deps; `hasMarker()` unchanged.
- Skill text contract: frontmatter untouched (`name`/`description` only — loader contract per `skills/AGENTS.md`); body shape unchanged (Purpose/Chain/2b Role/Process/Won't-do/References); only delegation-language lines reworded.
- ADR interface: `docs/specs/10_design/ADR-XXX-<slug>.md` per `references/adr-template.md` (`skills/review-architecture/SKILL.md:31`); filename chosen to satisfy existing citations (`ADR-003-ceo-only-dispatch.md` recommended).
- Packet contract: `SPEC:<spec-path>#REQ-IDs / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:[engineering]` carried to propose-changes; reference-only, never full-context pastes.
- Data lens: N/A — no schema, lineage, or PII-store impact (docs/config-only change; Ley 172-13 check confined to REQ-NF-001 scan).

## 5. Out of Scope

- `agents/` 68 templates — owned by santana (people spec, parallel). Engineering does not touch template wording.
- Verify-handoff/ship-release evidence beyond the engineering layer's own REQ traces (barrera reviews the plugin diff + wording at gate; security review is wording-only — no auth/data/API surface).
- Changing the 8-domain catalogue, stage order, or skill frontmatter loader contract (`name`/`description` only).
- Renaming any agent, template, reference, or artifact file (HARD).
- Rotating keys, prod deploys, permission widening (Guardrail 4).
- Adding npm deps to the plugin — stays single-file zero-dep (HARD).
- Restarting opencode/session behavior changes beyond the plugin strings (config not hot-reloaded — a NOTES item for the implementer, not a spec deliverable).

## 6. Dependencies

| Dependency | Status at spec time | Effect |
|------------|---------------------|--------|
| BRIEF-single-dispatcher (approved) | present | Source of scope + constraints |
| OKR-single-dispatcher | present | Measurable KR targets cited in ACs |
| santana people spec (parallel) | in flight | Exact uniform wording contract — engineering REQs freeze the sentence shape; final verbatim match confirmed at gate |
| `docs/specs/40_workspace/vasquez/TEST_MATRIX-ceo-only-dispatch.md` + `IMPLEMENTATION_PLAN-ceo-only-dispatch.md` | present | Prior-cycle evidence; cite ADR-003 that must be filed (REQ-006) |
| ADR-003 in `10_design/` | **MISSING** | REQ-006 files it; until filed, citations dangle |
| `skills/templates/implementers/` (4 prompts) | **MISSING** | REQ-007 + contingency: verify at execute-spec; if absent, gap → CEO (no silent creation) |
| `docs/specs/15_requirements/` | **MISSING** | Created by this spec's requirements index (req index deliverable) |
| `.opencode/plugins/AGENTS.md` version ref | **drifted** (says v0.2.0; plugin v0.3.0) | REQ-002 syncs all four version locations |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | grep of plugin strings + `tsc --noEmit` output |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | grep 4 version locations + `tsc --noEmit` output |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | grep counts per skill file + SKILL diffs |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | tool-mapping.md read-through + file diff |
| REQ-005 | AC-005 | PROPOSED_CHANGES.md | grep 3/3 + AGENTS.md diffs |
| REQ-006 | AC-006 | PROPOSED_CHANGES.md | file exists in `10_design/` + ADR content review |
| REQ-007 | AC-007 | PROPOSED_CHANGES.md | grep "Cross-domain request" 4/4 + prompt diffs |
| REQ-NF-001 | AC-008 | PROPOSED_CHANGES.md | pattern scan output (prohibition-only) |
| REQ-NF-002 | AC-009 | PROPOSED_CHANGES.md | repo-wide grep counts per layer |
| REQ-NF-003 | AC-010 | PROPOSED_CHANGES.md | rollback table in implementation plan + HANDOFF note |

**Scoped evidence (file:line) — old-model residue inventoried at spec time:**

- Plugin: `frame-ship.ts:19` (modes line, no "entire team"/brief-back), `frame-ship.ts:34` (MONTILLA_OWNERSHIP, no brief-back), `frame-ship.ts:10-11` + `:2` (version trio), `.opencode/plugins/AGENTS.md:4` (v0.2.0 drift, no dispatch clause).
- Skills: `skills/using-frame-ship/SKILL.md:64`; `skills/using-frame-ship/references/tool-mapping.md:8,17,35`; `skills/using-frame-ship/references/bootstrap-checklist.md:11`; `skills/translate-to-spec/SKILL.md:29,32`; `skills/propose-changes/SKILL.md:25,30`; `skills/execute-spec/SKILL.md:23,33`; `skills/quality-gate/AGENTS.md:4`; mechanism-description (verify-only) lines `frame-intent/SKILL.md:34`, `review-security/SKILL.md:28`, `review-architecture/SKILL.md:28`, `quality-gate/SKILL.md:28,30,56,58`, `verify-handoff/SKILL.md:27`, `ship-release/SKILL.md:30`.
- AGENTS.md layer: root `AGENTS.md` (no Dispatch clause; `:30` POINTERS cites it as source of truth), `skills/AGENTS.md` (Role owners line), `.opencode/plugins/AGENTS.md` (no dispatch clause).
- ADR gap: `docs/specs/10_design/` glob = `ADR-001-agent-templates.md`, `ADR-002-agent-templates-portable.md`, `ADR-002-agents-to-root.md` (no ADR-003); missing file cited at `TEST_MATRIX-ceo-only-dispatch.md:10,16,28,41,42`, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:5,30`, `skills/AGENTS.md:24`.
- Prompts: `skills/templates/implementers/` glob = 0; names per `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:14`; claimed existence per `TEST_MATRIX-ceo-only-dispatch.md:17` (E-008).
