# Test / Evidence Matrix: SPEC-agents-into-plugin-engineering (remediation retry N=1)

**Agent:** backend (engineering specialist, skill `execute-spec` §2b — within approved boundaries + gate conditions, no scope expansion)
**Date:** 2026-09-17
**Domains-Touched:** [engineering]
**Packet:** proposal `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` / gate verdicts `docs/specs/40_workspace/quality-gate/agents-into-plugin/` (readability, reliability, resilience, risk, refuter, qa)
**Harness:** driver + fixtures in session temp (re-runnable): compile plugin via `tsc --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext --outDir <tmp>` (`.opencode` dir), then `node evidence.mjs <tmp>/frame-ship.js` (node lane, `node:fs` fallback) and `bun evidence.mjs <tmp>/frame-ship.js` (bun lane, `Bun.file`). RED baseline recorded pre-fix (13 failures); all rows below GREEN post-fix on both lanes unless noted.

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-NF docs | C-001 | AGENTS.md 4 line-ref cells → v0.6.1 actuals (skills 348-352, injection 383-390, loader 210-238, compacting 391-396; dedupe 33-36 + version 10-11 re-verified) + count 350→403; root `package.json` 0.5.0→0.6.1 (header+VERSION+MARKER+manifest quadruple) | Review (read-back verify) | pass | 2966f15 |
| REQ-003 / NF-002 | C-002 | Guarded defaults: skipped lane leaves config untouched; total-miss lane sets no defaults and creates no empty mirrors; happy path still 74/74 + defaults montilla/2 | Integration (hook replay) | pass | 253c94e |
| REQ-002 / NF-003 | C-003 | parseAgentFile adversarial fixture: BOM prefix, unclosed fence, leading-newline prefix → description extracted + zero fence/metadata lines in prompt; well-formed control unchanged; 5-agent spot-check regression (d=158/216/246/200/154) | Integration (hook replay w/ fixture) | pass | 92a4941 |
| REQ-NF-001 | C-004 | Timeout-race-as-miss: never-settling read settles hook in ~2s (READ_TIMEOUT_MS=2000), hung entry skipped, lane populates 73, defaults hold on partial roster; happy path 57ms node / 134ms bun (no per-read penalty, timers cleared, no unhandled rejections) | Integration (hook replay w/ hang stub; node lane — Bun global readonly under bun, mechanism runtime-agnostic) | pass | ab64ca1 |
| REQ-003 | C-005 | Mirror independence: write via `config.agents[k]` invisible via `config.agent[k]` (advisory CE-001/RL-003/RK-004, accepted as trivial) | Integration (hook replay) | pass | 14eaa4e |
| REQ-001 | T-001 | Roster exact: MANIFEST 74 `key: "` entries vs disk 77 files − 3 excluded (`AGENTS.md`, `README.md`, `delegation-contract.md`); modes 1 primary / 8 all / 65 subagent; sole alias `espinoza-specialist` | Integration (count) | pass | — (re-verified at 2966f15, unchanged by remediation) |
| REQ-003 / NF-002 | T-003/T-006 | Double-init byte-stable both lanes; user pre-seed (custom key + explicit default) survives; missing-side mirror still fills | Integration (hook replay) | pass | — (regression, both lanes GREEN) |
| REQ-004 / NF-001 | T-004/T-005 | Version triple + zero-dep + `mise run typecheck` EXIT 0 (canonical command, `.opencode` dir) after every commit | Gate (toolchain) | pass | 253c94e, 92a4941, ab64ca1, 14eaa4e, 2966f15 |
| REQ-NF-003 | T-007 | Strict secret scan over remediation range `a91a486..HEAD`: 0 findings | Gate (scan) | pass | — (run at 2966f15) |
| REQ-NF-004 | — | Rollback: revert range `253c94e..2966f15` restores pre-remediation runtime; skills lane untouched throughout | Process | deferred to verify-handoff | — |

Types per `skills/execute-spec/references/test-matrix.md`.

## Coverage Summary

- Unit coverage: N/A (no repo harness; `tests/` empty — evidence is live hook replay, same method as qa verdict)
- Integration coverage: every REQ-001..004 + NF-001..003 exercised via replay on bun + node lanes
- Evidence coverage: 9/9 runnable REQ-IDs with linked commit (NF-004 process-deferred)
- Acceptance criteria covered: AC-001 (roster 74), AC-002 (spot-check + adversarial), AC-003 (triple + typecheck + zero-dep), AC-004 (double-init + preseed), AC-005 (scan 0)

## Assumptions / residuals (for gate re-verification)

1. Commit order follows dependency, not list order: code fixes (101–104) landed before the docs fix (105) so AGENTS.md line refs cite final numbers; evidence IDs C-001..C-005 still map to brief fixes 1–5.
2. Custom-only pre-seeded roster (user keys, no `montilla`, no explicit default, lane skipped) can still receive `default_agent: "montilla"` via `??=` — same as pre-remediation; explicit user defaults always preserved. Recorded, not fixed (gate option (a) implemented literally).
3. `loadBootstrapBody` single-read keeps its reject-only precedent (no timeout race) — COND-RS-01 scoped the timeout to the 74-await chain; noted as residual.
4. C-004 hang proof runs in the node lane only (Bun forbids overriding `globalThis.Bun`); race uses only `Promise.race` + `setTimeout`, identical in both runtimes.
5. Out of scope, untouched as ordered: `agents/` bodies (read-only, still untracked), canonical `ARCHITECTURE.md` / `API_CONTRACTS.md` (no ADR), skills lane behavior, plus live `0.5.0` refs outside the brief (`README.md` install snippets, `hooks/context-inject.ts` parity marker, root `AGENTS.md` history, `CHANGELOG.md`) — flagged for orchestrator ruling, not freelanced.
