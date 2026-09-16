# Requirements Index: Single Dispatcher — CEO-only Delegation Contract (Engineering)

**Owner:** vasquez (CTO) — domain chain owner, engineering
**Brief Reference:** BRIEF-single-dispatcher
**Domains-Touched:** [engineering] (people spec parallel, owned by santana)
**Spec:** docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..007 + REQ-NF-001..003) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Plugin dispatch contract: `WORKFLOW_CARD` + `MONTILLA_OWNERSHIP` state "CEO dispatches entire team" + formal Cross-domain request brief-back mechanism; CEO sole `task` caller; single-file zero-dep preserved | P0 | BRIEF-single-dispatcher (Scope.3), OKR KR-1.2/2.1 | SPEC-single-dispatcher-engineering | engineering | review + grep + `tsc --noEmit` |
| REQ-002 | Version/marker bump convention: `VERSION`/`MARKER` (`frame-ship.ts:10-11`) + header comment (`:2`) + `.opencode/plugins/AGENTS.md:4` version ref bump together (fixes v0.2.0-vs-v0.3.0 drift) | P0 | `.opencode/plugins/AGENTS.md` (Version convention) | SPEC-single-dispatcher-engineering | engineering | review + grep 4 locations |
| REQ-003 | Skills process text: old-model delegation phrasing → uniform sentence "CEO dispatches entire team; c-levels/specialists do the work or brief back" in using-frame-ship (SKILL:64, tool-mapping:8/17/35, bootstrap-checklist:11), translate-to-spec:29/32, propose-changes:25/30, execute-spec:23/33, quality-gate/AGENTS.md:4; mechanism lines verify-only (frame-intent:34, review-security:28, review-architecture:28, quality-gate:28/30/56/58, verify-handoff:27, ship-release:30) | P0 | OKR KR-2.3, BRIEF Scope.2 | SPEC-single-dispatcher-engineering | engineering | review + grep counts |
| REQ-004 | tool-mapping documents the formal brief-back flow: Cross-domain request brief → CEO delegates or resolves (replaces flag-don't-grab as mechanism of record) | P0 | OKR KR-2.2 | SPEC-single-dispatcher-engineering | engineering | review (read-through) |
| REQ-005 | AGENTS.md contract layer: root `AGENTS.md` (new Dispatch clause), `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` carry the identical uniform sentence + brief-back line (KR-1.2, 4-layer consistency) | P0 | OKR KR-1.2, BRIEF Scope.3 | SPEC-single-dispatcher-engineering | engineering | review + grep 3/3 |
| REQ-006 | ADR filed in `docs/specs/10_design/`: complete ADR-003 as `ADR-003-ceo-only-dispatch.md` (recommended, restores citations) or ADR-004 + cross-ref; decision covers single dispatcher = montilla, dispatch to entire team via `task(general)` max 2, c-levels/specialists never delegate, cross-domain → formal brief to CEO, rollback | P1 | BRIEF Scope.3, OKR KR-1.3 | SPEC-single-dispatcher-engineering | engineering | filing-proof + review |
| REQ-007 | ~~4 implementer prompts under `skills/templates/implementers/` carry brief-back mechanism lines~~ **CANCELLED (CEO decision #3): implementer prompts out of scope — nothing created/edited under `skills/templates/implementers/`** | ~~P1~~ | BRIEF Scope.4 (removed), OKR KR-2.1 (adjusted to 68 templates) | SPEC-single-dispatcher-engineering | engineering | ~~review + grep 4/4~~ N/A — cancelled |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/tokens/credentials/PII in updated plugin strings, skill lines, AGENTS.md clauses, ADR, prompt mechanism lines (Ley 172-13 minimization) | Security / Privacy | Pattern scan over changed files = prohibition clauses only; 0 findings |
| REQ-NF-002 | Zero old-model residue in engineering layer: "flag it in your return", "suggested owner", "fan out", "route onward", "never dispatches", "never fan out" = 0 in skills/, plugin, 3 AGENTS.md (outside allowed mechanism descriptions and santana-owned agents/) | Consistency | grep counts logged per layer = 0 |
| REQ-NF-003 | Rollback: per-layer revert points (plugin diff, skills per-file, 3 AGENTS.md, ADR delete, prompts dir delete); docs-only, ETA < 15 min | Operability | Rollback table in implementation plan + HANDOFF note |
| REQ-NF-004 | Plugin typecheck and single-file zero-dep invariant hold after any string edit | Engineering | `tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts` exit 0 (run from `.opencode/`) |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Uniform wording sentence reused verbatim from santana's contract (no divergent paraphrase); ADR-003 completed; VERSION/MARKER/header/plugin-doc bumped together; plugin stays single-file zero-dep; `tsc --noEmit` green | vasquez |
| people | Exact uniform wording contract for Cross-domain request section (68 templates) — owned by santana's parallel spec; engineering consumes verbatim | santana |
| security | Wording-only review of plugin diff + template wording at gate (no auth/data/API surface) | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Plugin | `.opencode/plugins/frame-ship.ts`, `.opencode/plugins/AGENTS.md` | REQ-001, REQ-002, REQ-NF-001..004 |
| Skills process text | `skills/using-frame-ship/SKILL.md` + `references/tool-mapping.md` + `references/bootstrap-checklist.md`, 9 stage SKILL.md files, `skills/quality-gate/AGENTS.md` | REQ-003, REQ-004, REQ-NF-002 |
| AGENTS.md contract layer | root `AGENTS.md`, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` | REQ-005, REQ-NF-002 |
| ADR | `docs/specs/10_design/ADR-003-ceo-only-dispatch.md` (or ADR-004) | REQ-006 |
| ~~Implementer prompts~~ | ~~`skills/templates/implementers/*.md` (4)~~ **CANCELLED (CEO decision #3)** | ~~REQ-007~~ |