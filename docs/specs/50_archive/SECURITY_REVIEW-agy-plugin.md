# Security Review: agy-plugin TS+Bun hooks

**Reviewer:** security owner (barrera lens) — proposal-only review, no impl mods
**Date:** 2026-09-17
**Verdict:** Conditional
**Scope (by reference only):** docs/specs/40_workspace/engineering/PROPOSED_CHANGES-agy-plugin.md; docs/specs/20_backlog/SPEC-agy-plugin-engineering.md; docs/specs/10_design/ARCHITECTURE-agy-plugin.md
**Packet:** HARD (execution_mode=single, win32/pwsh, bun-TS direct-exec, deny-default, reference-only) / GATE (review-security wave, blocks execute-spec on Rejected) / DOMAINS ([engineering, security, automation/ops])

## Threat Model

See `docs/specs/40_workspace/security/THREAT_MODEL-agy-plugin.md` for full STRIDE analysis (stdin→stdout trust boundary, 6-row table, residual risk + owner).

## Findings

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| S-001 | Medium | `bun ./hooks/*.ts` relative-cwd assumption unproven after `agy plugin install` staging. Proof: proposal Risk R-001 states assumption; superseded `plugins/` subdir removed before impl (root-drop), no staged-path log exists yet. | Verify at execute-spec: `agy plugin list` + `/hooks` shows hooks loaded from repo-root staging, else switch documented fallback to absolute `bun "<plugin-dir>/hooks/*.ts"` form with amended note. Owner: engineering. |
| S-002 | Low | Over-broad deny regex could false-positive (`format` substring) or miss chained payloads (`npm test; rm -rf`). Proof: proposal lists pattern names only, no regex text exercised yet (no impl files). | Word-boundary regexes + chaining-operator detection; grey zone → `ask`; allow/deny fixtures guard both paths with replay logs. Owner: engineering, security confirms log. |
| S-003 | Medium | Secret value echo risk in `reason`/logs (Information Disclosure). Proof: proposal commits to rule-only reasons + single documented AWS-docs canary (`AKIAIOSFODNN7EXAMPLE` in `hooks/fixtures/pretool-secret.json`); no impl/logs exist to scan yet — residual is future content, not current docs. | Rule-only reasons; `rg` scan = 0 findings outside the canary fixture with rescan proof at gate; allowlisted excerpts only. Owner: security. |
| S-004 | Low | Empty-stdin hang → per-event latency burn. Proof: no handler code exists yet; proposal fast-path described but unexercised. | Empty/unparseable → immediate safe default (`ask` for gates, `{}` for observer/injector), exit 0; empty-stdin vector in test matrix with timing. Owner: engineering. |
| S-005 | Low | Injected `ephemeralMessage` as prompt-injection vector (amendment surface). Proof: `hooks/context-inject.ts` builds messages from embedded cards + repo skill file only — stdin fields (`invocationNum`, `initialNumSteps`) select, never compose, message content (`grep stdin` in file = counters only); no `permissionOverrides`, no `*` matcher. | Keep injector local-trusted-only (never echo stdin into messages); any future stdin-derived injection content re-raises to High and blocks gate. Owner: security. |

Findings without proof (diff/scan/log ref) = REFUTED per guardrails. All findings above carry proof refs. No Critical/High findings in proposal artifacts — nothing to surface same-session beyond this Conditional record.

## Conditions for Approval

Execute-spec may proceed only with these conditions carried into implementation + gate evidence:

1. C-001 (S-001): staged-path verification log (`agy plugin list` excerpt or install-doc note if `agy` binary absent) + relative-vs-absolute decision recorded.
2. C-002 (S-002): allow/deny/`{}` fixture replay logs with exit-0 + timing attached.
3. C-003 (S-003): secret-pattern `rg` scan = 0 findings with log; reasons contain rule names only.
4. C-004 (S-004): empty-stdin vector exits fast with `ask`, timing logged.
5. C-005: diff-stat scope guard (only `plugins/agy-frame-ship-hooks/**` + `docs/specs/**`) in gate.

Rejected triggers (block execute-spec, escalate to orchestrator): secrets/PII in source or evidence; `permissionOverrides` introduced; `*` matcher introduced; freelance fix instructions; full-dump transcript export.

## Sign-off

- [x] security owner (barrera lens) — binding verdict: Conditional (2026-09-17)
- [ ] engineering owner (vasquez) — handler exactness + bun-direct fit
- [ ] orchestrator — waiver authority only

Review-architecture: skipped by default — no frame-ship runtime/chain/catalogue change (ARCH INV-001 holds); product-output contract reviewed here + engineering gate. Assumption stated; override breaks default only with engineering-owner + orchestrator waiver.
