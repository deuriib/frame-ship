# Spec: AGENTS_MANIFEST hidden flag — C-level mode:all hidden except montilla

**ID:** SPEC-hidden-flag-engineering
**Owner:** vasquez (CTO) — domain chain owner, engineering
**Domains-Touched:** [engineering]
**Brief Reference:** bounded chat-brief approved by user (AGENTS_MANIFEST new optional hidden; set hidden:true for c-level mode:all except montilla; subagents untouched as hidden by default) — read-only
**Status:** draft
**Priority:** P0
**Execution_Mode:** single (frozen at frame-intent per HARD; direct, no task dispatch)

## 1. Context

`AGENTS_MANIFEST` in `.opencode/plugins/frame-ship.ts:255-330` is the 74-entry static roster (`{ key, file, mode }`, modes `primary | all | subagent`). Current state: `montilla` primary, 8 C-levels `all` (barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera), 65 specialists `subagent`. No `hidden` field exists. The `config` hook (`:340-381`) mirrors each entry into `config.agents` + `config.agent` as `{ description, prompt, mode }` with no hidden propagation.

Approved brief: add new **optional** `hidden` to the manifest shape, set `hidden:true` on C-level `mode:all` agents **except montilla**, leave all subagents untouched (they are hidden by default in the host). Backward-compatible, optional-only, exact shape `hidden:true`.

Outcome: C-level chat roster decluttered (montilla only visible); subagent dispatch unaffected; typecheck green; single-file zero-dep holds.

## 2. Requirements

- **REQ-001 (F, P0):** `AgentManifestEntry` gains optional `hidden?: boolean` — interface at `frame-ship.ts:242-246` extended with `hidden?: boolean`; `AgentMode` unchanged. Evidence: diff + `mise run typecheck` exit 0.
- **REQ-002 (F, P0):** 8 C-level `mode:all` entries carry exact `hidden:true` — barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera each `{ ..., mode: "all", hidden: true }`. `montilla` (primary) gets NO hidden field. Exact shape `hidden:true` (boolean literal, no strings). Evidence: grep `hidden: true` count = 8 + diff.
- **REQ-003 (F, P0):** Subagents untouched — all 65 `mode:subagent` entries keep current `{ key, file, mode }` shape with NO hidden field added. Evidence: grep confirms 0 `hidden` in subagent lines.
- **REQ-004 (F, P0):** Config mirror propagates hidden when present — `config.agents[key]` and `config.agent[key]` type gains optional `hidden`, and the `??=` inserts include `...(entry.hidden !== undefined ? { hidden: entry.hidden } : {})` or equivalent conditional spread; entries without hidden produce byte-identical objects to before (backward-compatible). Evidence: diff + typecheck + runtime spot-check (config object shape).
- **REQ-NF-001 (NF, P0):** Backward-compatible + single-file zero-dep — no new imports/deps, no change to skills lane, resolver precedent, `hasMarker()` idempotency, or `default_agent`/`subagent_depth` defaults; `mise run typecheck` green. Evidence: typecheck output + diff shows only manifest + mirror lines touched.
- **REQ-NF-002 (NF, P0):** No secrets/PII — diff contains no secrets/tokens/credentials; loader never echoes contents. Evidence: pattern scan = 0 findings.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): `interface AgentManifestEntry` contains `hidden?: boolean`; typecheck green.
- [ ] AC-002 (REQ-002): grep `hidden: true` = 8, all on C-level `mode: "all"` lines; `montilla` line has no hidden.
- [ ] AC-003 (REQ-003): grep `hidden` in `mode: "subagent"` lines = 0.
- [ ] AC-004 (REQ-004): mirror insert lines propagate hidden conditionally; object without hidden is `{ description, prompt, mode }` unchanged.
- [ ] AC-005 (REQ-NF-001): `mise run typecheck` exit 0; diff touches only manifest interface + 8 entries + mirror types/inserts.
- [ ] AC-006 (REQ-NF-002): secret/PII pattern scan over diff = 0 findings.

## 4. Contracts & Interfaces

- Manifest shape: `{ key: string; file: string; mode: AgentMode; hidden?: boolean }` — optional-only; absent = host default (visible for primary/all, hidden for subagent).
- Mirror shape: `{ description: string; prompt: string; mode: AgentMode; hidden?: boolean }` — same optional rule.
- Packet: `SPEC:docs/specs/40_workspace/engineering/SPEC-hidden-flag-engineering.md#REQ-001..004+NF / HARD:single+optional-only+backward-compatible+exact-shape-hidden:true / GATE:none-yet / DOMAINS:[engineering]` — reference-only.
- Data lens: N/A — no PII stores, no schema migration.

## 5. Out of Scope

- Changing modes, keys, files, aliases, or roster count (74 stays).
- Hiding montilla or any subagent; unhiding any C-level.
- Version bump (docs-only string change not required; triple stays v0.6.1 unless release policy demands — ship-release decides).
- Agent markdown bodies/frontmatter — untouched.
- Key rotation, prod patch, perm widening (Guardrail 4).

## 6. Dependencies

| Dependency                                | Status  | Effect                                                                        |
| ----------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `frame-ship.ts:240-330` manifest + mirror | present | edit target                                                                   |
| `mise run typecheck` toolchain            | present | verifier                                                                      |
| ARCHITECTURE.md contract                  | present | REQ-001..004 extend INV-004 roster-exact (hidden overlay, no key/mode change) |

## 7. Traceability

| Requirement | AC     | Proposed Change                 | Evidence               |
| ----------- | ------ | ------------------------------- | ---------------------- |
| REQ-001     | AC-001 | PROPOSED_CHANGES-hidden-flag.md | diff + typecheck       |
| REQ-002     | AC-002 | same                            | grep 8 + diff          |
| REQ-003     | AC-003 | same                            | grep 0 subagent hidden |
| REQ-004     | AC-004 | same                            | diff + shape check     |
| REQ-NF-001  | AC-005 | same                            | typecheck + diff scope |
| REQ-NF-002  | AC-006 | same                            | scan output            |
