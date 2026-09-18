# Proposed Changes: vasquez (engineering owner)

**Spec Reference:** SPEC-hidden-flag-engineering (`docs/specs/50_archive/SPEC-hidden-flag-engineering.md`)
**Agent:** vasquez (CTO) — engineering owner
**Date:** 2026-09-17
**Execution_Mode:** single (inherited from spec; frozen at frame-intent — direct, no task dispatch)
**Domains-Touched:** [engineering]

## Summary

Prior lane emission is correct (8× `hidden: true` in `.opencode/plugins/frame-ship.ts:260-267`); the live host drops `hidden` at the config-parse boundary (installed SDK `AgentConfig` has no `hidden` member). This proposal covers one root-cause fix only: prove the drop with a live-host read-back assertion first, then apply the minimal passthrough preservation that makes that assertion pass — no stacked workarounds.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (this file) | document-create | This proposal only — impl files untouched in proposal phase |
| `<repro: live-host read-back>` (ephemeral, uncommitted) | file-create | Failing-reproduction-first gate: boot plugin `config` hook against installed host (`@opencode-ai/plugin@1.18.29` per `.opencode/package.json`), read back `config.agent["barrera"].hidden === true` (or `config.agents[…]` equivalent). Must FAIL before fix, PASS after fix. No roster change in repro |
| `.opencode/plugins/frame-ship.ts` (config-mirror boundary only, one hunk) | file-modify | Single passthrough preservation for `hidden` through host parse: keep exact shape `hidden: true` on the 8 C-level `mode:"all"` entries (lines 260-267 untouched in meaning), keep absent-`hidden` byte-identical via existing conditional spread, and add the minimal host-compatible declaration so the installed SDK no longer strips `hidden` (exact edit determined by SDK schema inspection — e.g. type augmentation / passthrough preservation; no mode/key/count change, no new deps, single-file holds) |

Change types per `references/proposal-template.md`. No other files touched. No SDK bump, no alternative hide mechanism, no roster mode/key/count change — any of those is a second fix and is out of scope.

## Rationale

REQ-002 + REQ-004 are satisfied statically (grep 8, typecheck green, GATE OPEN 4/4) but not live: the host never honors `hidden`, so the roster is not decluttered. The defect is at one boundary — plugin emits `hidden`, host `AgentConfig` parse drops it. A live read-back is the only honest gate (static grep cannot catch a parse-strip). One preservation hunk at that boundary restores the contracted behavior while keeping backward-compat (absent-`hidden` → object shape unchanged, host default applies).

## Failing-reproduction-first gate (HARD)

1. Run repro BEFORE any edit: assert `config.agent["barrera"].hidden === true` (and spot-check one more C-level, plus `montilla` has no `hidden` key). Expected: FAIL (field `undefined` / stripped) — this FAIL is the entry ticket.
2. Apply the single boundary hunk, re-run repro. Expected: PASS.
3. If repro still FAILs after the single hunk → STOP. No second mechanism, no SDK bump, no mode remapping. Escalate to CEO (montilla) with repro log. Never a third loop.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Bump / swap installed SDK to a version whose `AgentConfig` natively supports `hidden` | Second fix (toolchain change, new blast radius, version-triple implications) — stacked, rejected for this lane |
| Remap C-levels to `mode:"subagent"` or another host-honored mode to hide them | Changes dispatch semantics + roster contract (74-entry INV-004) — breaks brief, rejected |
| Hide at injection / UI layer instead of config surface | New mechanism on a different boundary — stacked fix, rejected; config surface is the contracted boundary |
| Document "host ignores hidden" as permanent residual and ship as-is | Contradicts the brief outcome (roster decluttered); residual was acceptable pre-debug, not post-debug — rejected |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering owner) — mandatory
- [ ] Security screen: trust-boundary change (config surface `config.agents` / `config.agent`) — required per dispatch (STRIDE screen, no secrets/PII)
- [ ] engineering owner for architecture impact: vasquez self-covers (single-file boundary, INV-004 roster-exact preserved) — intermediated via `review-architecture` only if the SDK inspection demands a contract change; otherwise waived with rationale at gate

> **Rule:** No repository file modifications during proposal phase. Impl files stay untouched; only this proposal doc is produced.

## Risk Assessment (per `references/risk-assessment.md`)

**Proposer:** vasquez (engineering owner) | **Date:** 2026-09-17 | **Domains-Touched:** [engineering]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Host Zod schema strips unknown `hidden` even after augmentation → live repro stays FAIL | Med | Low (roster stays cluttered, no wedge — inserts remain `??=`, never clobber) | Failing-gate-first: prove FAIL before edit; if single hunk does not flip to PASS, STOP + escalate, no second fix |
| R-002 | Preservation hunk widens config type beyond host contract → typecheck or host rejects config | Low | Med (plugin fails closed, skills lane unaffected — loader silent-miss precedent) | Keep hunk to boundary declaration only; `mise run typecheck` green required; absent-`hidden` byte-identical |
| R-003 | Scope creep into SDK bump / mode remap / UI-layer hide (stacked fixes) | Med | Med (breaks single-fix contract, new blast radius) | HARD scope: one hunk only; any second mechanism needs a new SPEC + new proposal |

### Blast Radius

Engineering (config surface only: `hidden` passthrough on 8 C-level keys in `config.agents` / `config.agent`): skills lane, injection cards, resolvers, `hasMarker()` idempotency, `default_agent` / `subagent_depth` defaults unchanged. Teams: engineering owner only. Customers / regulators / revenue: none (local display flag, no PII, no auth, no external API).

### Rollback Plan

`git revert` of the single boundary hunk restores prior (emission-correct, host-ignores) state; ETA < 5 min; owner vasquez. Repro script is ephemeral and uncommitted — nothing to retract. No comms / filings / closes / workflows to undo.

### Security Considerations

Config surface is a trust boundary (local trusted agent files → host config). `hidden` is display-only: no perm change, no authN/Z, no secret/token/credential/session in code/config/logs (Guardrails 1-4). Loader keeps silent-miss, never echoes contents. Security owner confirms via screen at review; Critical/High → brief to montilla for `barrera` deep audit (none anticipated).

### Domain Considerations

Engineering only. Finance / legal / marketing / people / revenue / automation-ops: no impact — delete per template (non-touched domains carry no considerations).

## Assumptions

1. Installed host is `@opencode-ai/plugin@1.18.29` (per `.opencode/package.json`); its `AgentConfig` parse is the stripping boundary — to be confirmed by SDK schema inspection during execute-spec.
2. Prior lane artifacts are read-only evidence: `docs/specs/50_archive/SPEC-hidden-flag-engineering.md`, `docs/specs/40_workspace/engineering/HANDOFF-hidden-flag.md`, `docs/specs/40_workspace/quality-gate/hidden-flag/GATE_REPORT.md` (GATE OPEN 4/4, residual "host ignores hidden" now promoted to defect).
3. Exact shape `hidden: true` (boolean literal) and absent-means-default (subagents untouched) are frozen — the fix preserves both.

## Trace

SPEC-hidden-flag-engineering REQ-002 (8× `hidden:true`, grep) + REQ-004 (mirror conditional spread) → live read-back `config.agent[k].hidden === true` → single boundary hunk → `mise run typecheck` + repro PASS → `review-security` screen → `quality-gate` → `verify-handoff`.

## Scoped Evidence (proposal phase — no impl touched)

- Emission correct: `.opencode/plugins/frame-ship.ts:260-267` — 8× `, hidden: true` on C-level `mode:"all"`; `montilla:259` has no `hidden`; subagent lines carry no `hidden`.
- Mirror correct statically: `:344-347` Record types gain `hidden?: boolean`; `:375-376` conditional spread on both `??=` inserts.
- Drop boundary (from debug PASS packet): installed SDK `AgentConfig` has no `hidden` member → parse strips the field; live read-back is the missing assertion this proposal gates on.
