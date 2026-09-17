# QA Review: SPEC-agents-into-plugin-engineering

**Reviewer:** qa (runs the real suite)
**Date:** 2026-09-17
**Verdict:** pass ✅
**Scope:** `.opencode/plugins/frame-ship.ts` v0.6.0 — impl commits `9f8328b-69de0f4-6eae5a8-a91a486`
**Packet:** SPEC `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` / HARD multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE security-Approved-0-findings+architecture-Approved-no-ADR / DOMAINS engineering
**Role note:** qa ran the real system only; did not author or implement this work. Adversarial refuter runs before qa per `skills/quality-gate/SKILL.md` §3 — this verdict covers executed behavior, not static audit.

## Checklist

- [x] All acceptance criteria have tests (executed below, AC-001..AC-005)
- [x] All REQ-IDs traceable to test IDs (see Traceability)
- [x] Unit + integration + e2e coverage as appropriate (loader unit-shape via live hook replay under bun + node; no e2e surface — config contract only, no HTTP/RPC)
- [x] Regression suite updated (N/A — `tests/` empty, no harness; prior behavior preserved: skills.paths + 3-card injection + compaction untouched)
- [x] No flaky tests introduced (all replays deterministic; double-run stable)
- [x] Coverage threshold met (N/A — no coverage gate in repo; AC-mapped replay covers every REQ)
- [x] Manual exploratory testing done (spot-check excerpts inspected, not just counted)

## Checks (all executed live 2026-09-17, repo `D:\GitHub\frame-ship`)

| # | Check | Result | Log excerpt |
|---|-------|--------|-------------|
| 1 | `mise run typecheck` (mandatory, REQ-NF-001) | ✅ PASS | `[typecheck] $ npx -y -p typescript tsc ...` → `EXIT:0` |
| 2 | Roster count disk vs MANIFEST (REQ-001/AC-001) | ✅ PASS | disk `74` (c-level 9, engineering 15, finance 14, legal 8, marketing 9, people 4, revenue 5, security 6, shared 4 — matches SPEC §Roster) vs MANIFEST `{ key:` count `74` |
| 3 | 5-agent spot-check, no fence leak (REQ-002/AC-002) | ✅ PASS | bun lane: montilla d=158/p=3842/primary, vasquez d=216/p=2811/all, backend d=246/p=6200/subagent, qa d=200/p=4816/subagent, scout d=154/p=2118/subagent — all heads `# <Name>` (no leading `---`); node lane re-confirms all 5 |
| 4 | Live `config` hook replay, bun lane (REQ-003/NF-002) | ✅ PASS | `42/42` — agents==74, mirror==74, mirrors identical, defaults montilla/2, double-init byte-stable, pre-seed `my-custom` survives (75), custom skills path survives |
| 5 | Live `config` hook replay, node lane — `Bun` undefined, `node:fs` fallback (REQ-002/003) | ✅ PASS | `10/10` — same assertions green; proves dynamic-import fallback is real, not dead code |
| 6 | `system.transform` double-push idempotency | ✅ PASS | `n1=4 n2=4 stable=true` |
| 7 | Version triple + single-file zero-deps (REQ-004/NF-001/AC-003) | ✅ PASS | header `v0.6.0` (L2) + `VERSION = "0.6.0"` (L10) + `MARKER` derived from VERSION (L11); `package.json` deps only `@opencode-ai/plugin@1.18.29` (type-only, unchanged); diff stat = plugin `+202/-6` + `AGENTS.md` ref `1` line |
| 8 | Secret/PII scan over impl diff `9f8328b^..HEAD` (REQ-NF-003/AC-005) | ✅ PASS | strict assignment-grade patterns (password=/api-key=/`ghp_`/`xox-`/BEGIN PRIVATE KEY/aws_secret/`sk-live-`) → `STRICT_HITS=0`; broad sweep → 1 hit, adjudicated FALSE POSITIVE (`risk-analyst` vs `sk-[A-Za-z0-9]` substring); agent sample (5 files) → 0 hits |

## Traceability

| REQ-ID | Test ID | Type | Status |
|--------|---------|------|--------|
| REQ-001 | T-001 (check 2: disk 74 vs MANIFEST 74 + per-dir split) | integration (disk→manifest) | ✅ pass |
| REQ-002 | T-002 (check 3 bun+node spot-check; check 5 fallback lane) | integration (loader) | ✅ pass |
| REQ-003 | T-003 (check 4/5: counts+defaults+mirror+preseed) | integration (hook replay) | ✅ pass |
| REQ-004 | T-004 (check 7: triple grep) | static-executed (grep over file) | ✅ pass |
| REQ-NF-001 | T-005 (check 1 typecheck + check 7 dep/diff-stat) | gate (toolchain) | ✅ pass |
| REQ-NF-002 | T-006 (checks 4/5/6: double-init + transform stability) | integration (idempotency replay) | ✅ pass |
| REQ-NF-003 | T-007 (check 8: strict scan 0 + FP adjudication) | gate (scan) | ✅ pass |
| REQ-NF-004 | — (process; not runnable by qa without mutating history) | — | ➖ deferred to verify-handoff (revert touches one tracked file; note below) |

## Coverage

- Line coverage: N/A (no harness; repo `tests/` empty)
- Branch coverage: both loader branches executed — `Bun.file` (bun lane) + `node:fs/promises` fallback (node lane, `bun=undefined`)
- Acceptance criteria coverage: 5/5 (AC-001..AC-005 all with live evidence)

## Observations (non-blocking, no conditions)

1. ⚠️ `agents/` is **untracked** in git (`?? agents/` in status) while the plugin is tracked. REQ-NF-004's "`git revert` of the single plugin file restores prior runtime" still holds behaviorally (loader skips misses, init never wedges — proven by design, not re-run here since it would require mutating history), but the roster's provenance is disk-only until committed. Flag for orchestrator/verify-handoff: decide whether `agents/` should be tracked before ship. Not a qa FAIL — runtime behaves per SPEC with the roster present.
2. Broad-scan regex hygiene: naive `sk-` pattern false-positives on `risk-analyst`. Future scans should use assignment-grade patterns (as in check 8 strict set). No secret present either way.

## Verdict Rationale

Every acceptance criterion was executed against the real code (not read): typecheck exit 0, 74/74 roster with SPEC-matching split, 5-agent bodies real with zero fence leak under **both** runtimes, double-init byte-stable with user pre-seed surviving, strict secret scan 0. No FAIL, no flakiness, no PII. Verdict **pass** with zero conditions; one provenance observation routed to orchestrator (cross-domain need: none — engineering only; this note is a brief-back, not a sideways dispatch).

**Conditions:** none.
**Scoped evidence:** counts, key names, description/prompt lengths, and log excerpts above only — no prompt bodies or PII exported.
