# Risk Review: SPEC-agents-into-plugin-engineering

**Reviewer:** review-risk (engineering wave; independent — did not author, propose, or implement this work)
**Date:** 2026-09-17
**Verdict:** ⚠️ CONDITIONAL — APPROVE+conditions (no Critical/High; 3 Medium risks gate conditions; 2 Low residual advisories; no ❌)

**Packet:** `SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:security-Approved-0-findings+architecture-Approved-no-ADR+impl-9f8328b-69de0f4-6eae5a8-a91a486 / DOMAINS:engineering`
**Under review:** `.opencode/plugins/frame-ship.ts` (v0.6.0, 350 lines) init-time roster loader · Proposal risk assessment: `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (Risk Matrix R-001..R-005 + Blast Radius + Rollback Plan)
**Role basis:** `skills/quality-gate/SKILL.md` §2b/§3 — orchestrator-dispatched engineering-wave reviewer; reviewers never approve their own work (this work authored by vasquez, implemented across 9f8328b–a91a486 — not mine). No engineering risk checklist exists under `references/engineering/` (5 files: readability/reliability/refuter/resilience/qa — no risk file), so criteria applied: guardrails 1–14 + proposal Risk Matrix + trust-boundary analysis below.

## Verdict Rationale

No Critical/High risk found — nothing exploitable in production, no secret/PII exposure, no new remote attack surface, no prod/data touch. The change is internal dev tooling (plugin init, local trusted-file → config surface only). Three Medium conditional-path risks (all latent on today's happy path, all already flagged by sibling reviewers) gate OPEN per guardrail 10 and ride as explicit APPROVE+conditions per guardrail 11 — no silent PASS. No `ESCALATE_TO_SECURITY`: security already Approved with 0 findings and this review finds no new authN/Z, datastore, PII-flow, or network surface that would warrant a `barrera` deep audit.

## Trust Boundaries — Expected (per ADR/SPEC) vs Actual

| # | Expected per SPEC §4/proposal §Security | Actual in code | Verdict |
|---|------------------------------------------|----------------|---------|
| TB-1 | Trust root: local `agents/**/*.md` (trusted) → `config.agents`/`config.agent` surface only; no HTTP/RPC, no new endpoints/adapters/boundaries | Confirmed: `resolveAgentsDir` mirrors `resolveSkillsDir` precedent (frame-ship.ts:85-108); file reads are `Bun.file` → dynamic `node:fs/promises` only; grep for `fetch\|axios\|http\|WebSocket\|child_process\|exec(\|spawn\|process.env` = 0 code hits (only guardrail-text mentions) | ✅ holds |
| TB-2 | No secrets/tokens/credentials/PII in code/config/logs/examples/events (REQ-NF-003, guardrail 1) | Confirmed: secret-pattern scan over plugin diff = 0 real findings (refuter RF-016 independently confirms; sole hit is `risk-analyst` key matching `sk-` — false positive); `readTextFile` catch returns `""` and never echoes contents (frame-ship.ts:137-139); `parseAgentFile` never logs bodies | ✅ holds |
| TB-3 | Least privilege: `??=` on every insert, never clobbers user keys (INV-002) | Confirmed: dual-side `hasAgents/hasAgent` check + `??=` per mirror (frame-ship.ts:314-324); `includes()` for skills paths; `default_agent`/`subagent_depth` via `??=` | ✅ holds, minus RK-001 scope note |
| TB-4 | Zero new deps; single-file; `tsc` clean (REQ-NF-001) | Confirmed: sole import is `import type` (line 8, erased at compile); `node:fs/promises` only via function-scoped dynamic import (lines 129, 177); `mise run typecheck` re-verified green by reliability + refuter | ✅ holds |
| TB-5 | Failure mode is additive-lane absence (roster missing, skills lane intact), never outage (proposal Blast Radius) | Partial ⚠️ — lane-skip holds, but RK-001 leaves a dangling default pointer and RK-003 leaves a hang path outside the reject model | ⚠️ conditional (see RK-001/RK-003) |

## Findings

| ID | Severity | Location | Risk (OWASP / principle lens) + Evidence |
|----|----------|----------|-------------------------------------------|
| RK-001 | Med | frame-ship.ts:327-328 vs guard 311 | **Dangling-default misroute (business/availability).** `default_agent ??= "montilla"` + `subagent_depth ??= 2` run unconditionally, outside the `agentsDir !== "/agents"` guard. Repro: `directory=""` → `resolveAgentsDir("")` returns `"/agents"` → lane skipped, yet defaults set — `default_agent` points at an unregistered key. Same on total read-miss (plus empty `c.agents={}`/`c.agent={}` pollution, lines 312-313). Contradicts proposal R-004 "guard-clause returns before polluting config". Harness behavior on dangling default unverified → dispatch misroute possible. Shares root cause with reliability RL-001 / resilience RS-002 (cited, not duplicated — risk angle is routing integrity). No data loss, no exfiltration → Med, not High. → COND-RK-01 |
| RK-002 | Med | frame-ship.ts:145-154 (`parseAgentFile`, line 148) | **Malformed-fence prompt poisoning (integrity; low-grade exposure).** No well-formed `^---\n…\n---` fence → whole raw incl. `---`/`name:`/`description:` lines becomes `prompt`, violating INV-003. Triggers: missing closing fence, BOM/leading-whitespace prefix (refuter CE-002 proves BOM defeats the `^---` anchor). Latent today — full roster scan shows 0/74 malformed, all carry `description:` — but one bad edit ships a poisoned agent prompt silently (no log, no skip). Exposure content is frontmatter metadata, not secrets/PII → integrity risk, not a data-breach risk → Med conditional, not High. → COND-RK-02 |
| RK-003 | Med | frame-ship.ts:117-140 × 314-325 (74-await `for` loop) | **No-timeout init stall (availability / self-DoS only).** `try/catch → ""` covers *reject* (missing file, EACCES, failed import) but not *never-settle* (hung handle, wedged mount, `Bun.file().text()` that neither resolves nor rejects). One hung await stalls the `config` hook → init never completes → session never starts. NOT attacker-exploitable remotely (local FS only; no endpoint, no user-controlled input size — O(74) bounded, sequential concurrency-1, no regex-backtracking or hash-collision vector; DSA/DoS lens: no finding). Local-FS likelihood Low, impact init-hang → Med conditional. Precedent `loadBootstrapBody` shares the shape — precedent covers rejects, not hangs. → COND-RK-03 (clears with resilience COND-RS-01) |
| RK-004 | Low | frame-ship.ts:322-324 | **Shared-record mirror aliasing (encapsulation; advisory).** Same `record` object `??=`-assigned to both `c.agents[key]` and `c.agent[key]` — mutation via one alias visible via the other (refuter CE-001 proves `MUTATED` propagates; reliability RL-003 concurs). No evidence the harness mutates entries → cross-tenant/privilege-bleed not reachable (no shared-credential Singleton, no over-eager DRY across privilege levels). Fix is one spread per mirror (`{...record}`). Non-blocking residual. |
| RK-005 | Low | `package.json:3` vs frame-ship.ts:2,10-11; impl range 9f8328b..a91a486 | **Revert-surface + version-ref drift (rollback hygiene; advisory).** Proposal claims single-commit revert; impl landed as 4 commits (manifest → loaders → hook → triple) + `AGENTS.md` ref follow. Revert is still `git revert 9f8328b..a91a486` (2 files, diffstat 202+/6-) — ETA < 15 min holds (see Rollback Viability). Root `package.json` lags at `0.5.0` while plugin triple is `0.6.0` — SPEC REQ-004's triple (header+VERSION+MARKER, all in-file) IS together; only the root manifest ref lags (refuter CE-003). Needs a gate-keeper ruling: align root manifest or declare it out-of-triple. Non-blocking. |

## Verified Correct (risk evidence, not findings)

- **Data exposure:** agent prompts are bodies only (SPEC REQ-NF-003); no PII flow source→store→log→third-party exists (Ley 172-13 lenses 5–8: N/A — no PII store, no retention/TTL owed, no export beyond allowlisted gate evidence). Scoped export holds: this verdict cites excerpts, not full dumps.
- **Clobber/duplication:** double-init provably stable (`??=` per key, dual-side `continue`, `includes()` for paths — refuter T1/T2/T3 simulations confirm); user overrides on either mirror survive independently; misses uncached → retry self-heals.
- **Blast radius is plugin-init surface only:** diffstat `9f8328b~1..HEAD` = 2 files (`frame-ship.ts` + `AGENTS.md` ref); no services, schemas/lineage/stores (data lens N/A), no network egress, no RBAC/on-call/workflow change. Worst case per proposal holds: malformed loader edit breaks `tsc`/init → caught pre-gate, reverted in one range.
- **Dependencies:** zero new deps — no CVE/supply-chain surface added.
- **Regulatory/business:** internal dev tooling; no customer, DGII e-invoice, budget, or revenue impact. Positive side: unblocks CEO/C-level dispatch for all domains.

## Rollback Viability

- **Mechanism:** `git revert` of the impl range (`9f8328b 69de0f4 6eae5a8 a91a486`, touching only `.opencode/plugins/frame-ship.ts` + `.opencode/plugins/AGENTS.md` ref) restores the v0.5.0 runtime — roster lane removed, skills lane intact. Single-range revert, no data migration, no external undo, no key rotation (guardrail 4: freelance fixes forbidden — owner remediates).
- **Verify rollback:** `config.agents` roster keys absent; `skills.paths` registration + chat injection unchanged; `mise run typecheck` green.
- **ETA:** < 15 min (REQ-NF-004 holds; 4-commit range vs "single commit" wording is a doc nuance, not an ETA risk — see RK-005).
- **Owner:** vasquez (engineering owner).

## Conditions (must clear for OPEN — gate keeper rules)

- [x] **COND-RK-01 (RK-001):** CLEARED per DELTA 2026-09-17 (fix `253c94e`; see mapping below). Owner: engineering owner.
- [x] **COND-RK-02 (RK-002):** CLEARED per DELTA 2026-09-17 (fix `92a4941`; see mapping below). Owner: engineering owner.
- [x] **COND-RK-03 (RK-003):** CLEARED per DELTA 2026-09-17 (fix `ab64ca1`; see mapping below). Owner: engineering owner.

## Residual Risks (explicit per guardrail 11 — ride as advisories, not blocks)

- **RK-004** shared-record aliasing → follow-up spread-per-mirror; owner: engineering owner.
- **RK-005** root `package.json` 0.5.0 vs plugin 0.6.0 → gate-keeper ruling (align or declare out-of-triple); owner: engineering owner.
- **Zero-observability silent fallback** (resilience RS-003, endorsed): partial roster loss is invisible at runtime; contents-free numeric skip-count is a safe future hardening; owner: engineering owner.

## Verdict

**⚠️ CONDITIONAL — APPROVE+conditions.** No Critical/High risk; no trust-boundary breach beyond the three conditioned completeness gaps; blast radius confined to plugin init; rollback viable in < 15 min. Gate goes OPEN when the keeper clears COND-RK-01..03 (shared with reliability/resilience conditions — one ruling each, not three fixes). No cross-domain need — engineering only; no sideways contact made. No commits (consolidation rides with gate keeper).

## Scoped Evidence (for orchestrator)

- Network/exec/env grep over `frame-ship.ts`: 0 code hits (only guardrail-text mentions) → no new remote attack surface.
- Secret-pattern scan over plugin diff: 0 real findings (1 false positive: `risk-analyst` key vs `sk-`).
- Diffstat `9f8328b~1..HEAD`: 2 files, 202 insertions / 6 deletions → init-surface-only blast radius.
- `package.json:3` `"version": "0.5.0"` vs `frame-ship.ts:2,10` `v0.6.0` → RK-005 drift evidence.
- Sibling corroboration: RL-001/RL-002 (reliability), RS-001/RS-002 (resilience), CE-001/CE-002/CE-003 (refuter) — cited, not re-litigated.

## DELTA (re-verification 2026-09-17, reviewer independent — did not author, implement, or fix this work)

**Delta verdict:** ✅ PASS — COND-RK-01..03 all CLEARED. No Critical/High on current HEAD (`220e2b4`); trust boundaries TB-1..TB-5 hold (TB-5 now holds — was the sole ⚠️); blast radius confined to plugin init; rollback viable in < 15 min. No `ESCALATE_TO_SECURITY`.

**Fix scope verified (read-back on HEAD, `frame-ship.ts` @ 403 lines):** remediation range `253c94e..2966f15` + evidence matrix `TEST_MATRIX-agents-into-plugin.md` (C-001..C-005 all GREEN, both lanes unless noted). Remediation diffstat `a91a486..HEAD`: `frame-ship.ts` 86+/33-, `AGENTS.md` ref cells, `package.json` 0.5.0→0.6.0, plus the matrix file. No new remote attack surface in the range (network/exec/env grep = 0 code hits — only guardrail-text mentions; sole import still `import type` L8; `node:fs/promises` still function-scoped dynamic; `console.*` = 0 hits; `Promise.race`+`setTimeout` are builtins, zero-dep). Sibling delta verdicts read back: readability ✅ PASS (COND-001 cleared, `2966f15`), reliability ✅ PASS (COND-001+COND-002 cleared, `253c94e`+`92a4941`+`14eaa4e`) — corroborated below, proofs not duplicated. Resilience file at read time carries no DELTA section yet; the shared-root fixes are verified here on risk posture only — gate keeper rules the resilience line separately.

**Condition → root → fix mapping (risk angle only):**

- [x] **COND-RK-01 (RK-001 dangling default) → CLEARED by `253c94e`.** Defaults now sit inside the lane guard and behind a populated-roster check (`frame-ship.ts:359-381`): skipped lane leaves config untouched; total-miss lane creates no mirrors (lazy `(c.agents ??= {})` post-parse, `:372-373`) so `Object.keys(c.agents ?? {}).length > 0` (`:377`) is false and no defaults are set; happy path still `??=`s `montilla`/`2`. Matches matrix C-002. Shares root with reliability COND-001 / resilience COND-RS-02 (cited — reliability delta already marks both CLEARED with diff proof). Residual (accepted, not held): custom-only pre-seeded keys count toward the guard, so user pre-seed + total disk miss can still set `default_agent: "montilla"` — user-owned config, explicit user defaults win via `??=`, narrow triple-condition; matrix assumption 2 + reliability residual record it. Routing integrity restored.
- [x] **COND-RK-02 (RK-002 fence poisoning) → CLEARED by `92a4941`.** `parseAgentFile` (`:178-201`) strips BOM/leading-WS before the fence match (`/^[\uFEFF\s]*/`, `:179`); unclosed-fence fallback (`:188-199`) extracts description and filters `---`/`name:`/`description:` lines from the prompt, so raw frontmatter never leaks wholesale (INV-003 holds); `typeof raw === "string"` guard closes the non-string path; pure string ops, zero logging → never-echo holds. Matches matrix C-003. Shares root with reliability COND-002 (cited — reliability delta marks it CLEARED with fixture proof). Residuals (info only): bare `"---"` without trailing newline falls through to plain-trim prompt (fence debris, not metadata leak); empty-`description` files still register (metadata quality, harness-accepted). Integrity risk closed; exposure content was and remains frontmatter metadata, never secrets/PII.
- [x] **COND-RK-03 (RK-003 init stall) → CLEARED by `ab64ca1`.** `readTextFile` (`:136-169`) races each read against `READ_TIMEOUT_MS=2000` via `withTimeout` (`:123-131`); timeout wins → miss (`""`, entry skipped, uncached so retry self-heals); timer cleared on settle; raced read never rejects (inner try/catch `:143-157`) so the race loser cannot surface an unhandled rejection; zero-dep (builtins only). Matches matrix C-004 (never-settling stub settles hook in ~2s, 73 populate, no unhandled rejections; happy path 57ms node / 134ms bun). Shares root with resilience COND-RS-01 (cited — mechanism verified here; resilience-line ruling rides with the keeper). DSA/DoS lens: still no finding — O(74) bounded, sequential concurrency-1, no regex-backtracking or hash-collision vector, no attacker-controlled input size. Residuals (advisory, not held): (a) all-hung worst case is ~74×2s ≈ 148s bounded stall, not an infinite hang — self-DoS only, local FS; (b) `loadBootstrapBody` single-read keeps its reject-only precedent (matrix assumption 3, out of COND scope — single read, same local-trusted shape, lower exposure than the 74-chain).

**Advisories closed by the range (were Low, non-blocking):** RK-004 mirror aliasing → CLOSED by `14eaa4e` (independent object literals per mirror, `:372-373`; matches matrix C-005; reliability delta concurs). RK-005 version drift → CLOSED by `2966f15` (`package.json` 0.5.0→0.6.0; readability DELTA confirms header+VERSION+MARKER+manifest quadruple aligned at 403 lines).

**Trust boundaries on HEAD — restated (expected per SPEC/proposal vs actual):**

| # | Expected | Actual | Verdict |
|---|----------|--------|---------|
| TB-1 | No new endpoints/adapters/boundaries | Holds — `withTimeout`/`setTimeout` is an in-process timer, not a trust boundary; grep confirms no network/exec surface | ✅ holds |
| TB-2 | No secrets/PII in code/config/logs | Holds — 0 log hits, parse path content-free on failure, matrix T-007 scan 0 findings over remediation range | ✅ holds |
| TB-3 | Least privilege (`??=`, never clobber) | Holds, strengthened — guarded defaults + lazy mirrors preserve user keys on either mirror independently | ✅ holds |
| TB-4 | Zero new deps, single-file, `tsc` clean | Holds — builtins only; typecheck green per reliability independent re-run + matrix T-004/T-005 after every fix commit | ✅ holds |
| TB-5 | Additive-lane absence, never outage | Now holds — no dangling pointer (RK-001 fix) + bounded hang (RK-003 fix); worst case is degraded roster or ~2s-per-hung-entry skip, never silent misroute or infinite stall | ✅ holds (was ⚠️ conditional) |

**Blast radius / rollback on HEAD:** blast radius unchanged — plugin-init surface only (remediation touches `frame-ship.ts` + `AGENTS.md` refs + `package.json` manifest + matrix file; no services, schemas/lineage/stores, network egress, or RBAC change). Rollback: `git revert` of range `253c94e..2966f15` restores pre-remediation runtime, skills lane untouched (matrix defers the revert note to verify-handoff); ETA < 15 min holds; owner: engineering owner (vasquez). No freelance fixes per guardrail 4.

**Residual risks (explicit per guardrail 11 — ride as advisories, not blocks):**

- **Pre-seed + total-miss `default_agent` (from RK-001):** user pre-seeded keys with no `montilla`, no explicit default, lane fully missed → `default_agent: "montilla"` may still be set. User-owned config, `??=` preserves explicit user defaults, narrow triple-condition. Owner: engineering owner.
- **Bare-`---` debris + empty-`description` registration (from RK-002):** cosmetic prompt debris / metadata-quality gap, not a leak. Harness-accepted. Owner: engineering owner.
- **Bounded-stall worst case + bootstrap reject-only precedent (from RK-003):** ~148s all-hung bound; `loadBootstrapBody` single-read without timeout race. Self-DoS only, local trusted FS. Owner: engineering owner.
- **Zero-observability silent fallback (RS-003, endorsed):** partial roster loss invisible at runtime; contents-free numeric skip-count remains safe future hardening. Owner: engineering owner.

**Independence:** I did not author, propose, implement, or fix this work (authors/implementers per packet + fix commits by vasquez). This delta is read-back verification + own grep/diffstat checks only; sibling proofs corroborated, not duplicated; no harness re-run (matrix C-001..C-005 + reliability typecheck re-run cited as evidence). No commits. No sideways contact. Gate-state consolidation rides with the gate keeper.
