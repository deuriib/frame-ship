# Proposed Changes: vasquez (engineering owner)

**Spec Reference:** docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md (REQ-001..004, REQ-NF-001..004)
**Architecture Contract:** docs/specs/10_design/ARCHITECTURE.md v1 (canonical, unchanged)
**API Contract:** docs/specs/10_design/API_CONTRACTS.md v1 (canonical, unchanged)
**Brief Reference:** docs/briefs/BRIEF-agents-into-plugin.md (read-only) + docs/briefs/OKR-agents-into-plugin.md
**Agent:** vasquez (engineering owner, domain chain owner)
**Date:** 2026-09-17
**Execution_Mode:** multi-subagents (inherited from brief/spec, frozen at frame-intent)
**Domains-Touched:** [engineering]

## Summary

Port the proven `frame-ship-agents` roster mechanism (static MANIFEST + file loader + `config.agents`/`config.agent` mirror + `default_agent` + `subagent_depth`) into the single-file `.opencode/plugins/frame-ship.ts` runtime, unchanged in behavior, so installing frame-ship alone brings the full 74-key agent roster. Additive only: skills registration, injection cards, dedupe guards, and resolver precedent are untouched. Proposal only — implementation files stay unmodified until approval.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `.opencode/plugins/frame-ship.ts` | file-modify | REQ-001: add `AGENTS_MANIFEST` const — 74 entries `{ key, file, mode }` (`montilla` primary; 8 C-levels `all`; 65 specialists `subagent`; `engineering/espinoza.md` aliased to key `espinoza-specialist`); excluded: `AGENTS.md`, `README.md`, `delegation-contract.md` |
| `.opencode/plugins/frame-ship.ts` | file-modify | REQ-002: add `resolveAgentsDir(fallbackBase)` (mirrors `resolveSkillsDir` from own `import.meta.url`, fallback `directory \|\| worktree`) + `readTextFile(path)` (Bun.file first, dynamic `node:fs/promises` fallback, silent `""` on miss) + `parseAgentFile(raw)` (`description` verbatim from own frontmatter, `prompt` = body with `---` fences stripped) |
| `.opencode/plugins/frame-ship.ts` | file-modify | REQ-003: extend existing `config` hook — after skills.paths block, fill `config.agents[key] ??=` + `config.agent[key] ??=` mirror per MANIFEST entry, `default_agent ??= "montilla"`, `subagent_depth ??= 2`; never overwrite existing user keys; skip-entry on loader miss, never throw init |
| `.opencode/plugins/frame-ship.ts` | file-modify | REQ-004 + REQ-NF-001/002: version triple bump together (header comment + `VERSION` + `MARKER`, v0.5.0 → v0.6.0); no new imports, no static `node:` import, `mise run typecheck` stays green |
| `.opencode/plugins/AGENTS.md` | file-modify | Version ref follows the triple in the same commit (API_CONTRACTS §5); no behavior-text change |
| `agents/**/*.md` | — (read-only source) | NO CHANGE, stays untracked/uncommitted per CEO ruling (1); bodies + own frontmatter descriptions are the source of truth, read by path at init |
| `docs/specs/10_design/ARCHITECTURE.md` + `API_CONTRACTS.md` | — (canonical v1) | NO CHANGE per CEO ruling (2); naming + workspace-promotion questions ride to gate |

Change types per `propose-changes` template (`file-*` for engineering). No other repository file is in scope.

## Rationale

- REQ-001 → MANIFEST row: roster-exact 74 keys (INV-004) makes CEO/C-level dispatch routable; single documented alias, no other renames.
- REQ-002 → loader row: Bun-first + dynamic-fallback precedent already proven by `loadBootstrapBody`; per-path cache allowed; failures skip, never wedge init (ARCHITECTURE availability note).
- REQ-003 → config-hook row: `??=` on every insert (INV-002) guarantees idempotent double-init (AC-004) and preserves user overrides.
- REQ-004/NF-001..004 → triple + guards: single-file zero-dep (AC-003), no secrets/PII (AC-005 scan), `git revert` of one file restores v0.5.0 (REQ-NF-004, ETA < 15 min).
- CEO rulings honored: (1) `agents/` never staged/committed — treated as read-only source; (2) v1 canonicals kept as-is, open naming/promotion items deferred to gate, not re-litigated here.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| B — two plugins side-by-side (`frame-ship` + `frame-ship-agents`) | Duplicate resolvers + dual versioning + dual install; brief framing cut it |
| C — dynamic glob discovery instead of static MANIFEST | Non-deterministic modes + more init I/O; manifest drift is cheaper to police via AC-001 count check |
| D — subset roster (only C-levels or only engineering) | Breaks KR-1.1 (74 keys) and leaves dispatch gaps; full roster assumed per brief open question |
| Patch version (v0.5.1) instead of v0.6.0 | New subsystem lane is additive behavior, not a fix; minor bump is the default — gate may rule otherwise |

## Approval Required From

- [x] Owning domain owner: vasquez (engineering owner) — proposal signed below; mandatory and satisfied at proposal level (gate + orchestrator still verify independently)
- [ ] engineering owner arch impact — same person as owner (no separate ADR expected; contract shape does not diverge — SPEC §6)
- [ ] security owner — LIGHT config-surface screen recommended, not a STRIDE deep audit (see Security Considerations for why/why not; orchestrator decides dispatch)
- N/A: finance / legal / marketing / people / revenue / automation owners (single-domain spec, no cross-cutting impact)

> **Rule:** No repository file modifications during proposal phase. Only this `PROPOSED_CHANGES.md` is produced and committed; `.opencode/plugins/frame-ship.ts` and all other impl files remain untouched until `execute-spec` approval.

---

# Risk Assessment: SPEC-agents-into-plugin-engineering

**Proposer:** vasquez (engineering owner)
**Date:** 2026-09-17
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Manifest drift — roster file renamed/added, MANIFEST key missing or stale | Med | Med | Generate MANIFEST from a fresh `agents/**/*.md` scan at execute time; AC-001 key-count (74) check blocks completion; INV-004 roster-exact |
| R-002 | Double-init duplication or user-override clobber in `config.agents`/`config.agent` | Low | High | `??=` per key + `includes()` for paths (INV-002); AC-004 double-init replay log (`JSON.stringify` before == after second run) |
| R-003 | Frontmatter leak into prompts, or secrets/PII echoed in code/logs/errors | Low | High | `parseAgentFile` strips `---` fences; `description` verbatim from frontmatter, never rewritten; AC-005 pattern scan = 0 findings; loader never echoes contents (INV-008, REQ-NF-003) |
| R-004 | Init I/O failure (agents dir unresolvable) wedges sessions | Low | Med | Silent `""` skip-entry, never throw; skills lane works independently (ARCHITECTURE availability); guard-clause returns before polluting config |
| R-005 | Version triple drift (header / `VERSION` / `MARKER` out of sync) | Low | Low | Single-commit triple edit + `API_CONTRACTS.md` ref follow; AC-003 version-grep evidence (header+VERSION+MARKER) |

## Blast Radius

- **Engineering (systems/data):** plugin init surface only — one committed file (`.opencode/plugins/frame-ship.ts`) + one doc ref. No services, no schemas/lineage/stores (data lens N/A), no network egress. Failure mode is additive-lane absence (roster missing, skills lane intact), never a runtime outage.
- **Teams:** unblocks CEO/C-level dispatch for all domains (positive); no workflow, RBAC, or on-call change. Execute-spec author must re-scan roster so MANIFEST matches disk.
- **Customers / regulators / revenue:** none — internal dev tooling; no PII, no secrets, no prod touch, no budget movement.
- **Worst case:** malformed loader edit breaks `tsc` or init → caught by AC-003/AC-004 before gate; reverted in one commit (see Rollback Plan).

## Rollback Plan

- Code revert: `git revert` of the single execute-spec plugin commit restores the v0.5.0 runtime (roster lane removed, skills lane intact); ETA < 15 min (REQ-NF-004). Doc-ref revert rides the same revert.
- Verify rollback: `config.agents` roster keys absent; `skills.paths` registration + chat injection unchanged; `mise run typecheck` green.
- No data migration, no external undo (no comms/filings/entries/workflows touched), no key rotation. Owner: vasquez.

## Security Considerations

- **Why no STRIDE deep audit:** no authN/Z change, no datastores or PII flows, no external APIs, no network boundary, no secrets/credentials/tokens in code/config/logs/examples (guardrails 1–4; REQ-NF-003; AC-005 scan gates it). Trust boundary is local-trusted-file → config surface only.
- **Why a light screen is still recommended:** new `config.agents`/`config.agent` surface + file-read loader deserve a `review-security` config-surface pass (least-privilege `??=` check, no content echo in errors) per SPEC §6 downstream note. Orchestrator decides: screen-and-pass is sufficient; `barrera` deep audit not warranted.
- Freelance fixes forbidden: no key rotation, prod patch, or perm widening under this proposal (guardrail 4).

## Domain Considerations

- Engineering only. Finance (budget/controls): none — config-only, zero spend. Legal (IP/regulatory/liability): none — no contract or license-surface change. Marketing (brand/GTM): none. People (workload/culture): none — additive roster, no RBAC change. Revenue (pipeline/quota): none. Automation/ops (runbook/capacity): none beyond the generic init-I/O note in R-004 (skills-lane precedent covers it).

---

## Traceability (proposal stage)

| Requirement | Acceptance Criterion | Proposed Change | Planned Evidence (execute-spec) |
|-------------|---------------------|-----------------|---------------------------------|
| REQ-001 | AC-001 | MANIFEST row | config dump key count (74) |
| REQ-002 | AC-002 | loader row | 5-agent spot-check excerpts (montilla, vasquez, backend, qa, scout) |
| REQ-003 | AC-001, AC-004 | config-hook row | config dump + double-init replay log |
| REQ-004 | AC-003 | triple-bump row | version grep (header+VERSION+MARKER) |
| REQ-NF-001 | AC-003 | triple-bump row | `mise run typecheck` log + diff stat |
| REQ-NF-002 | AC-004 | config-hook row | double-init replay log |
| REQ-NF-003 | AC-005 | all rows (INV-008) | pattern scan log (0 findings) |
| REQ-NF-004 | — (process) | rollback plan above | revert note + ETA |

## Assumptions

1. Next version is **v0.6.0** (minor: additive lane, not a fix) — gate/orchestrator may rule otherwise; triple moves together regardless.
2. Disk scan shows 77 `agents/**/*.md` files minus 3 excluded (`AGENTS.md`, `README.md`, `delegation-contract.md`) = **74 roster keys**; execute-spec re-verifies at implementation time (AC-001 counts keys, not files).
3. This file **supersedes the stale `PROPOSED_CHANGES.md` content** from the already-shipped SPEC-supporting-skills-integration (shipped c971728) — workspace scratch reuse, not history rewrite. Per CEO ruling (2), any naming (`PROPOSED_CHANGES.md` vs `PROPOSED_CHANGES-<spec-id>.md`) or workspace-promotion question rides to gate.
4. No cross-domain need at proposal stage — single-domain spec; any cross-domain need arising later goes as a formal Cross-domain request brief to the orchestrator, never sideways.

## Packet

`SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:none-yet / DOMAINS:engineering`. Next: `review-security` (light config-surface screen) / `review-architecture` (ADR only if contract shape diverges — not expected), then `execute-spec` on approval.
