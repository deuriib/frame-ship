# Threat Model: agy-plugin TS+Bun hooks

**Methodology:** STRIDE
**Date:** 2026-09-17
**Scope (by reference only):** docs/specs/40_workspace/engineering/PROPOSED_CHANGES-agy-plugin.md; docs/specs/20_backlog/SPEC-agy-plugin-engineering.md; docs/specs/10_design/ARCHITECTURE-agy-plugin.md

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| hook stdin (`toolCall.args.CommandLine`, file paths) | `agy` spawns `bun ./hooks/*.ts` with event JSON on stdin | external (agent/tool output) → internal (gate decision); untrusted input |
| hook stdout (`{decision, reason}` / `{}`) | script stdout parsed by `agy` to allow/deny/ask | internal → platform gate; over/under-block impacts tool execution |
| injector stdin (`invocationNum`, `initialNumSteps`) | `agy` spawns `bun ./hooks/context-inject.ts` per model invocation | external counters → internal context; untrusted numbers, trusted message content |
| injector stdout (`{injectSteps:[{ephemeralMessage}]}`) | message injected into trajectory before the model call | internal → model context; content is local-trusted-only (embedded cards + repo skill file), stdin never echoed |
| `hooks.json` command strings + `rules/frame-ship.md` | plugin root / staging dir `~/.gemini/antigravity-cli/plugins/frame-ship/` | internal config; tamper = arbitrary command exec or prompt injection on every invocation |
| fixtures + logs | repo `hooks/fixtures/*.json`, gate evidence excerpts | internal; one documented AWS-docs canary (`pretool-secret.json`), logs allowlisted |

## STRIDE Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | Yes — crafted `CommandLine` mimics benign (`npm test; rm -rf /`); crafted `invocationNum` requests full re-inject | Chaining-operator detection + grey-zone `ask`; injector ignores stdin for content (counters only select which local-trusted message to emit) |
| Tampering | Yes — modified `hooks.json`/`*.ts`/`rules/*.md` after install escalates to per-tool-code-exec or prompt injection | Install from versioned source + `git revert` rollback; diff-stat scope guard (root plugin files + `docs/**` + README only); marker-grep lockstep (INV-008); no auto-update channel in v1 |
| Repudiation | No (v1) — hooks are advisory gates, audit lives in `agy` transcript | Out of scope; transcript path carried in stdin but never written by hooks |
| Information Disclosure | Yes — `reason` or logs echoing secret material (`AKIA…`, private keys, tokens) | Reason names rule only; fixtures use synthetic canaries; rg scan gate = 0 findings; Ley 172-13 minimization (allowlisted excerpts) |
| Denial of Service | Yes — hang on empty stdin / slow regex burns 10s per tool call | Drain-with-fast-path, empty → `ask`+reason immediately; word-boundary simple regexes; timeout 10s declared; p95 < 2s target |
| Elevation of Privilege | Yes — `permissionOverrides` or `*` matcher widens gate silently | No `permissionOverrides` in v1; explicit matchers (`run_command`, `write_to_file\|replace_file_content`); `deny_unless_prior_grant`/`force_ask` unused; least-privilege INV-005 |

## Residual Risk

Over-block annoyance (R-003, Low, owner engineering) + bun-absent fallback to platform default (R-005, Low, owner automation) remain after mitigations. No secret-echo residual accepted — any echo in implementation or evidence re-raises to High and blocks gate. Owner: security owner (barrera lens).
