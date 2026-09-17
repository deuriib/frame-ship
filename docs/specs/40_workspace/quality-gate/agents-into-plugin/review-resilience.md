# Resilience Review: SPEC-agents-into-plugin-engineering

**Reviewer:** review-resilience (engineering wave; independent — did not author or implement)
**Date:** 2026-09-17
**Verdict:** ✅ PASS (delta 2026-09-17 — COND-RS-01 + COND-RS-02 both CLEARED, see DELTA; originally ⚠️ CONDITIONAL)

**Packet:** `SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:security-Approved-0-findings+architecture-Approved-no-ADR+impl-9f8328b-69de0f4-6eae5a8-a91a486 / DOMAINS:engineering`
**Under review:** `.opencode/plugins/frame-ship.ts` (v0.6.0, 350 lines) init-time loader (74 file reads at plugin init, Bun.file-first + node fallback, per-path cache) · Proposal: `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`

## Checklist

- [x] Graceful degradation under partial failure — ✅ per-entry skip, never throws (see RS scenarios below); one exception: total-lane loss leaves dangling default (RS-002)
- [x] Circuit breakers / retries with backoff — ✅ N/A by design (local trusted-file init, no network/distributed call); implicit retry via uncached misses on double-init; silent-skip fallback matches bootstrap precedent — one gap: no timeout, hang ≠ skip (RS-001)
- [x] Resource limits (memory, CPU, connections) — ✅ bounded O(74) small strings, sequential concurrency-1, no FD storm, no unbounded growth
- [x] Recovery from crash / restart — ✅ stateless init, in-memory caches only, single-file `git revert` restores v0.5.0 (REQ-NF-004)
- [x] No single point of failure introduced — ✅ skills lane and agents lane independently guarded; either lane survives the other's total failure (minus RS-002 defaults note)
- [x] Observability (logs, metrics, traces) — ⚠️ silent fallback is SPEC-mandated but zero-signal: partial roster loss is invisible (RS-003, Low)
- [x] Chaos scenarios tested — ⚠️ no repo harness; evidence is construction + impl-time replay logs (AC-004); scenarios below are code-walked, not executed

## Stress Scenarios

| ID | Scenario | Expected | Observed | Pass? |
|----|----------|----------|----------|-------|
| RS-S01 | Partially missing roster (k of 74 files unreadable) | Skip k entries, register 74−k, never throw | ✅ `readTextFile` catch → `""` → `if (!raw) continue` (frame-ship.ts:318-319); per-entry isolation, loop continues | yes |
| RS-S02 | Empty agent file (0 bytes) | Entry skipped, no empty prompt registered | ✅ `raw → ""` cached → `parseAgentFile("")` → `prompt:""` → `if (!parsed.prompt) continue` (frame-ship.ts:321) | yes |
| RS-S03 | Double-init (config hook runs twice) | No duplicate paths/keys, no re-read storm | ✅ `includes()` + `hasAgents && hasAgent → continue`; `agentFileCache` hits serve from memory; misses uncached so transient miss self-heals on retry | yes |
| RS-S04 | Skills-lane failure (skills dir unresolvable / bootstrap body unreadable) | Agents lane still populates; session still oriented | ✅ skills block (303-305) and agents block (311-326) independently guarded; `loadBootstrapBody` catch → `""`, 3 cards still pushed (335-336) | yes |
| RS-S05 | Agents-lane failure (agents dir unresolvable / all 74 reads miss) | Skills lane intact; no wedge; no poisoned pointers | ⚠️ NO — lane skips ✅ but `default_agent`/`subagent_depth` set unconditionally outside guard (RS-002) | no → COND |
| RS-S06 | Slow/blocked FS (one read never settles — hung handle, wedged mount) | Timeout → treat as miss → skip entry, init completes | ⚠️ NO — no timeout/race/abort anywhere on the 74-await chain (RS-001); reject is handled, never-settle is not | no → COND |
| RS-S07 | Cache stampede / concurrent init | Single-flight or bounded replay, no thundering herd | ✅ N/A benign — sequential `for` (concurrency 1), module-level Map, double-init replays from memory | yes |

## Findings

| ID | Severity | Location | Finding + Evidence |
|----|----------|----------|--------------------|
| RS-001 | Med | frame-ship.ts:117-140 (`readTextFile`) × 314-325 (74-await `for` loop) | Missing timeout on external I/O: the loop awaits up to 74 file reads with no `Promise.race`/timeout/`AbortSignal`. `try/catch → ""` covers *reject* (missing file, EACCES, failed dynamic import) but not *never-settle* (hung handle, wedged mount, `Bun.file(path).text()` that neither resolves nor rejects). One hung await stalls the entire `config` hook → init never completes → session never starts. That is a hang, not graceful degradation, and contradicts proposal R-004 "never wedge init" / SPEC REQ-003 "never throw init" spirit (a hang is worse than a throw). Precedent note: `loadBootstrapBody` (163-191) shares the no-timeout shape — precedent holds for reject-paths, not for hangs. Local-FS likelihood is Low, impact is init-hang (Medium per review scale: missing timeout). → COND-RS-01 |
| RS-002 | Med | frame-ship.ts:327-328 (defaults) vs guard 311 (`agentsDir !== "/agents"`) | Total-lane loss degrades ungracefully: `c.default_agent ??= "montilla"` + `c.subagent_depth ??= 2` run UNCONDITIONALLY, outside the agents-lane guard. Full-miss repro: `directory=""` → `resolveAgentsDir("")` returns `"/agents"` → lane skipped, yet defaults set — `default_agent` points at a `montilla` key never registered. Same when guard passes but all 74 reads miss (plus empty `c.agents={}`/`c.agent={}` from 312-313). Skills lane survives ✅, but the degraded state carries a poisoned pointer — one lane's failure leaks into session routing. Shares root cause with reliability RL-001 (cited, not duplicated: resilience angle is failure-isolation completeness). → COND-RS-02 (clears with COND-001) |
| RS-003 | Low | frame-ship.ts:137-139 (`readTextFile` catch), 188-190 (`loadBootstrapBody` catch) | Zero-observability silent fallback: every miss returns `""` with no skip-count, no lane-level signal. A 30/74-missing roster (drift, bad checkout, permission regression) registers 44 agents and tells nobody — AC-001 catches it only if someone runs the count check. Intentional per INV-008 (never echo contents into errors — correct, keep it). Ask is contents-free: a numeric skip-count (no paths, no bodies) preserves security while making partial failure visible. Non-blocking; fix in gate-close or ride as follow-up. |
| RS-004 | Info | frame-ship.ts:111-112, 135 | Comment/code nuance (no behavior gap): "Misses are never cached" but line 135 caches even empty-file `""` — behaviorally identical to a miss (caller skips either way), so comment-only. `agentFileCache` has no invalidation: post-init agent edits serve stale until process restart — covered by the restart-required convention. No action. |

## Verified correct (evidence, not findings)

- **Partial failure isolation per entry:** each of the 74 reads is independently guarded (`readTextFile` try/catch; `if (!raw) continue`; `if (!parsed.prompt) continue`). One bad file can never break the other 73 or wedge init. Reject-path graceful degradation holds.
- **Empty-file edge:** 0-byte file → `""` → `parseAgentFile` returns `prompt:""` → skipped at line 321. No empty agent registered, no crash. Caching the `""` is benign (stable skip on replay).
- **Cache behavior across double-init:** module-level `agentFileCache` (line 112) serves hits from memory (no re-I/O, no FD storm); misses are NOT cached → transient miss self-heals on second init (implicit retry without backoff — correct for local FS, no thundering herd). `bootstrapCachePath/Text` precedent same shape.
- **Lane isolation skills ↔ agents:** skills-paths block and agents-roster block are independently guarded and sequentially ordered so skills-first always lands; bootstrap read failure still pushes the 3 static cards. Silent-fallback precedent from v0.5.0 (`loadBootstrapBody` catch → `""`) is preserved, not regressed.
- **Resource bounds:** sequential `for` = concurrency 1 (no parallel-open storm); memory O(74) small markdown bodies; no queue, no retry loop re-scanning datasets (no O(n²) under failure); no unbounded growth structure. No backpressure/circuit-breaker required — and none required by ADR: single-file monolith plugin, local FS only, no cross-service call, no outbox/saga surface. Pattern fidelity holds (no declared-but-unwired distributed pattern).
- **Crash/restart + reversibility:** no persistent state (caches die with process); `git revert` of the single plugin file restores v0.5.0 runtime (REQ-NF-004).

## Conditions (must clear for OPEN)

- [ ] **COND-RS-01 (RS-001):** Gate keeper rules one — (a) add a lightweight timeout race on the init read path (timeout treated as miss → skip entry, contents-free), single-file zero-dep compatible; OR (b) record explicit acceptance with rationale that blocked-FS hang is out of scope for local trusted-file init (no network; OS-level FS wedge takes down the harness regardless). Owner: engineering owner.
- [ ] **COND-RS-02 (RS-002):** Clears with reliability COND-001 (same fix): (a) move `default_agent`/`subagent_depth` inside the populated-roster guard (set only when ≥1 entry registered); OR (b) record explicit acceptance with harness evidence that a dangling `default_agent` degrades gracefully. Owner: engineering owner. (Listed here so the gate cannot go OPEN on resilience while the poisoned-pointer path stands.)

## Verdict Rationale

The happy path and all reject-paths degrade gracefully: partial roster loss, empty files, missing dirs, Bun-vs-node fallback, and double-init replay are all structurally sound with per-entry isolation, bounded resources, and lane independence — silent-fallback precedent holds. The two Mediums are both hang/pointer completeness gaps, not happy-path breaks: a never-settling read hangs init (no timeout covers it), and a totally-failed agents lane leaves a dangling default pointer (isolation incomplete on the defaults). Neither is Critical/High (local FS only, no data loss, no cascade beyond init, no distributed pattern owed). Hence **CONDITIONAL**, not CLOSED. RS-003 is advisory (observability without contents). No cross-domain need — engineering only; no sideways contact made. No commits (consolidation rides with gate keeper).

## DELTA — re-verification (2026-09-17, reviewer review-resilience, independent)

**Under re-review:** `.opencode/plugins/frame-ship.ts:123-175` (timeout race + `readTextFile`) × `353-380` (guarded-defaults roster lane) · **Fixes:** `ab64ca1` (timeout-race-as-miss, `READ_TIMEOUT_MS=2000`) + `253c94e` (guarded defaults) · **Evidence:** `docs/specs/40_workspace/engineering/TEST_MATRIX-agents-into-plugin.md` C-004 (timeout) + C-002 (guarded defaults); hang proof node-lane only per matrix assumptions 3–4 (mechanism is `Promise.race` + `setTimeout` only, runtime-agnostic).

| Condition | Verdict | Proof |
|-----------|---------|-------|
| COND-RS-01 (RS-001 no-timeout stall) | ✅ CLEARED | Bounded: `READ_TIMEOUT_MS=2000` (frame-ship.ts:121) + `withTimeout` race per read (123-131), wired as `await withTimeout(read, READ_TIMEOUT_MS)` with timeout-as-miss → `""`, entry skipped, uncached so retry self-heals (159-164). Timers cleared: `.finally(() => clearTimeout)` (128-130); sequential `for` = concurrency 1, at most 1 outstanding timer, no leak. Rejection-free: inner read never rejects (`try/catch → ""`, 142-158), timeout side only resolves (126), outer `try/catch → ""` (166-168) — race loser cannot surface an unhandled rejection. Behavior: C-004 GREEN — never-settling stub settles hook in ~2s, hung entry skipped, lane populates 73/74, defaults hold on partial roster; happy path 57ms node / 134ms bun (no per-read penalty). |
| COND-RS-02 (RS-002 dangling default; shared root w/ RL-001) | ✅ CLEARED | Guarded-defaults diff `253c94e`: defaults moved inside `if (Object.keys(c.agents ?? {}).length > 0)` (frame-ship.ts:377-380); mirrors created lazily `(c.agents ??= {})[key] ??=` (372-373) so a totally-failed lane creates no empty mirrors and sets no defaults — config left untouched, no poisoned `default_agent` pointer. C-002 GREEN: skipped lane leaves config untouched; total-miss sets no defaults and no empty mirrors; happy path still 74/74 + defaults `montilla`/2. |

**Residuals (not holds):** (a) `loadBootstrapBody` single-read keeps reject-only precedent (no timeout race) — COND-RS-01 explicitly scoped the timeout to the 74-await chain; matrix assumption 3 records it. (b) Custom-only pre-seeded roster (user keys, no `montilla`, lane skipped) can still receive `default_agent:"montilla"` via `??=` — matrix assumption 2, same as pre-remediation, user-driven state not loader failure; explicit user defaults always preserved. (c) RS-003 zero-observability silent fallback stands as Low advisory (numeric skip-count follow-up, contents-free). No new resilience findings; no ADR-distributed pattern owed (single-file monolith, local FS only — pattern fidelity holds).

**Delta verdict:** ✅ **PASS** — both gate conditions cleared with code + replay evidence; no ❌, no open ⚠️. No commits (gate keeper consolidates).
