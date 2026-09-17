# Quality Gate Report: SPEC-agents-into-plugin-engineering

**Date:** 2026-09-17
**Gate Status:** OPEN
**Domains Touched:** engineering (single-domain; data lens N/A — no schema/lineage/PII-store impact)
**Gate Keeper:** vasquez (CTO, engineering owner acting as gate keeper per `skills/quality-gate/SKILL.md` §2b)
**Skill:** `skill(quality-gate)` via skill tool — trigger match: implementation ready for review → consolidate verdicts.
**SPEC:** `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` (REQ-001..004 + NF-001..004)
**HARD:** `multi-subagents` + single-file-zero-deps-idempotent-tsc-clean
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`
**Prior gates:** security Approved (0 findings) + architecture Approved (no-ADR, additive within v1 contracts)
**Impl range:** `9f8328b`, `69de0f4`, `6eae5a8`, `a91a486` + remediation `253c94e`, `92a4941`, `ab64ca1`, `14eaa4e`, `2966f15`, `220e2b4`
**Under review:** `.opencode/plugins/frame-ship.ts` v0.6.0 (403 lines @ HEAD) + `.opencode/plugins/AGENTS.md` ref cells + `package.json` manifest 0.6.0

## Reviewer Verdicts

| Domain | Reviewer (actual agent) | Verdict | Findings | Artifact |
|--------|-------------------------|---------|----------|----------|
| engineering | review-readability | ✅ PASS (delta cleared) | 0 open (1 Medium RD-001 → COND-001, CLEARED by `2966f15`; 5 Low advisory RD-002..RD-006 stand as next-touch notes) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/review-readability.md` |
| engineering | review-reliability | ✅ PASS (delta cleared) | 0 open (2 Medium RL-001/RL-002 → COND-001/COND-002, CLEARED by `253c94e`+`92a4941`; Low RL-003 CLOSED by `14eaa4e`; RL-004/RL-005 info only) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/review-reliability.md` |
| engineering | review-refuter | ✅ pass (could not falsify) | 0 blocking (4 advisory Low/Info CE-001..CE-004 — all closed by remediation range: mirror `14eaa4e`, BOM `92a4941`, manifest `2966f15`, logs→matrix `220e2b4`) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/review-refuter.md` |
| engineering | review-resilience | ✅ PASS (delta cleared) | 0 open (2 Medium RS-001/RS-002 → COND-RS-01/COND-RS-02, CLEARED by `ab64ca1`+`253c94e`; RS-003 Low advisory stands; RS-004 info) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/review-resilience.md` |
| engineering | review-risk | ✅ PASS (delta cleared) | 0 open (3 Medium RK-001..RK-003 → COND-RK-01..03, CLEARED by `253c94e`+`92a4941`+`ab64ca1`; RK-004/RK-005 closed by `14eaa4e`/`2966f15`; trust boundaries TB-1..TB-5 all hold) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/review-risk.md` |
| engineering | qa | ✅ PASS | 0 findings, 0 conditions (8/8 live checks green on both bun + node lanes; 1 provenance observation → verify-handoff) | `docs/specs/40_workspace/quality-gate/agents-into-plugin/qa.md` |

No ❌ anywhere in the wave. No reviewer outside the engineering catalogue (single-domain spec; no cross-domain verdicts owed).

## Conditions for Opening

All conditions raised during the wave are CLEARED with code-diff proof + evidence-matrix replay (`docs/specs/40_workspace/engineering/TEST_MATRIX-agents-into-plugin.md` C-001..C-005, commit `220e2b4`):

- [x] COND readability-001 (RD-001 stale `AGENTS.md` line refs) → CLEARED by `2966f15` (cell-by-cell read-back; version quadruple header+VERSION+MARKER+manifest aligned at 403 lines).
- [x] COND reliability-001 / resilience COND-RS-02 / risk COND-RK-01 (RL-001 dangling defaults) → CLEARED by `253c94e` (defaults inside populated-roster guard; skipped/total-miss lanes leave config untouched; matrix C-002).
- [x] COND reliability-002 / risk COND-RK-02 (RL-002 malformed/BOM fence leak) → CLEARED by `92a4941` (BOM/leading-WS strip + unclosed-fence fallback filters frontmatter lines; INV-003 holds; matrix C-003).
- [x] COND resilience-001 / risk COND-RK-03 (RS-001 no-timeout stall) → CLEARED by `ab64ca1` (`READ_TIMEOUT_MS=2000` + `withTimeout` race-as-miss; timers cleared; race rejection-free; matrix C-004).
- [x] Advisory RL-003 / CE-001 / RK-004 (shared mirror record) → CLOSED by `14eaa4e` (independent literals per mirror; matrix C-005).
- [x] Advisory CE-003 / RK-005 (root manifest 0.5.0 vs plugin 0.6.0) → CLOSED by `2966f15` (`package.json` → 0.6.0).
- [x] Advisory CE-004 (TEMP verify logs not in repo) → CLOSED by `220e2b4` (remediation matrix C-001..C-005 committed as auditable evidence).

No CONDITIONAL items remain. No waivers needed — nothing waived, everything fixed and re-verified.

## Residual Risks (explicit per guardrail 11 — advisories, not blocks; owner: engineering owner vasquez)

1. **Pre-seed edge:** user pre-seeded keys with no `montilla`, no explicit default, lane fully missed → `default_agent: "montilla"` may still be set. User-owned config, `??=` preserves explicit user defaults, narrow triple-condition. (Matrix assumption 2.)
2. **Bare-fence debris:** bare `"---"` without trailing newline falls through to plain-trim prompt (fence debris, not metadata leak); empty-`description` files still register (metadata quality, harness-accepted).
3. **All-hung bound:** ~74×2s ≈ 148s bounded stall worst case (not infinite); self-DoS only, local trusted FS.
4. **Silent-fallback advisory:** zero-observability silent fallback stands — partial roster loss invisible at runtime; contents-free numeric skip-count is a safe future hardening (RS-003, endorsed by risk).
5. **Bootstrap reject-only precedent:** `loadBootstrapBody` single-read keeps its reject-only shape (no timeout race) — explicitly out of COND scope; lower exposure than the 74-chain. (Matrix assumption 3.)
6. **Out-of-scope live 0.5.0 refs:** any remaining live-doc references to v0.5.0 outside this spec's touched files are out of scope for this gate (this gate's triple/quadruple is aligned at v0.6.0).
7. **`agents/` untracked ruling:** `agents/` is untracked in git (`?? agents/`) while the plugin is tracked. Runtime behaves per SPEC with the roster present (proven by qa replays + refuter disk scan 74/74). Whether `agents/` should be tracked before ship is routed to verify-handoff/orchestrator — flagged, not held.

## Rollback

- **Mechanism:** `git revert` of the impl + remediation range (`9f8328b..220e2b4`, touching only `.opencode/plugins/frame-ship.ts` + `.opencode/plugins/AGENTS.md` refs + `package.json` manifest + matrix file) restores the v0.5.0 runtime — roster lane removed, skills lane intact. No data migration, no external undo, no key rotation (guardrail 4: owner remediates).
- **Verify rollback:** `config.agents` roster keys absent; `skills.paths` registration + 3-card injection + compaction unchanged; `mise run typecheck` green.
- **ETA:** < 15 min (REQ-NF-004 holds).
- **Owner:** vasquez (engineering owner).

## Load Evidence (HARD STOP — missing = CLOSED)

- [x] Stage skill loaded: `skill(quality-gate)` cited (name + trigger match — impl-ready → gate).
- [x] Domain owner/specialist role understood: vasquez, CTO + engineering owner, acting as gate keeper for this single-domain gate per `skills/quality-gate/SKILL.md` §2b (consolidate §§4.4-4.8; no verdict overridden, no sideways dispatch).
- [x] Execution mode declared: `multi-subagents` (reviewers orchestrator-dispatched; this report consolidates their verdict files by reference).
- [x] Packet intact: `SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:security-Approved-0-findings+architecture-Approved-no-ADR+impl-9f8328b-69de0f4-6eae5a8-a91a486+remediation-253c94e-92a4941-ab64ca1-14eaa4e-2966f15-220e2b4 / DOMAINS:engineering` — reference-only, no full-context paste.
- All checked → gate may proceed to verdict.

## Escalations

None. No conflicting verdicts; no Critical/High findings (nothing to surface same-session per guardrail 10); no `ESCALATE_TO_SECURITY` (risk explicitly rules out `barrera` need); no design gaps back to architect; no disputes to arbitrate.

## Sign-off

- [x] All reviewers pass and all conditions cleared with proof — no ❌, no open ⚠️.
- [x] Gate Keeper: vasquez (engineering owner) — **gate OPEN**.
- [ ] Final authority (if waived): N/A — no waivers.

**Declaration: GATE OPEN for SPEC-agents-into-plugin-engineering.** Handoff packet toward `frame-ship:verify-handoff` with `SPEC/HARD/GATE/DOMAINS` intact (see below). `agents/` stays untracked; root `AGENTS.md`/`README.md` pre-existing modifications are NOT ours and are NOT staged.
