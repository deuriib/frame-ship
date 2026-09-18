# Architecture Contract: agy-plugin TS+Bun hooks

**Owner:** engineering owner (vasquez, consolidating; security/automation lenses linked)
**Version:** v2 (amended: 1:1 opencode parity + root-drop layout)
**Last Updated:** 2026-09-17
**Domains-Touched:** engineering, security, automation/ops
**Covered Specs:** `docs/specs/20_backlog/SPEC-agy-plugin-engineering.md` (REQ-001..010)
**Brief Reference:** bounded-initiative short-BRIEF in chat 2026-09-17 + amendments (parity, root-drop) — read-only, no BRIEF file

## Overview

The repo root IS the agy plugin source (`agy plugin install .` stages to `~/.gemini/antigravity-cli/plugins/frame-ship/`). Runtime stays outside frame-ship: `agy` spawns `bun ./hooks/*.ts` per `hooks.json` event; each script is a pure stdin→stdout filter per the official I/O contract. Context injection is 1:1 with `.opencode/plugins/frame-ship.ts` v0.4.0 (see mapping table): the same `skills/` directory serves both harnesses with zero copies, `rules/frame-ship.md` carries the persistent cards, and `hooks/context-inject.ts` reproduces `chat.system.transform` + `session.compacting` through `PreInvocation`. No MCP, agents, or `Stop` handlers in v1 — paths reserved, files not created.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| `plugin.json` | Identity marker; editor autocomplete via `$schema` | Official schema: `name: frame-ship` (`^[a-zA-Z0-9-_]+$`), `description`; `additionalProperties: false` |
| `hooks.json` | Event wiring: 3 named hooks (`frame-ship-context` PreInvocation, `safety-gate` PreToolUse + matcher, `format-note` PostToolUse + matcher) | `{type: command, command: "bun ./hooks/<n>.ts", timeout: 10}`; no matcher on PreInvocation (ignored per docs) |
| `hooks/context-inject.ts` | 1:1 context parity: first-invocation live bootstrap + step-threshold compaction reminder; else `{}` | stdin `{invocationNum, initialNumSteps, workspacePaths?, ...}` → stdout `{injectSteps:[{ephemeralMessage}]} \| {}`; root from own `import.meta.url` (opencode `resolveSkillsDir` parity) |
| `hooks/safety-gate.ts` | PreToolUse gate on `run_command`: allow benign, ask/deny destructive or secret-bearing | stdin `{toolCall:{name,args}, stepIdx, ...}` → stdout `{decision, reason?}` |
| `hooks/format-note.ts` | PostToolUse observer on `write_to_file\|replace_file_content`: never blocks | stdin `{toolCall, stepIdx, error?, ...}` → stdout `{}` |
| `rules/frame-ship.md` | Persistent cards (chain, load order, triggers, hard rules, guardrails, truth) + version-lockstep note | plain markdown, no schema |
| `skills/` | REUSED VERBATIM — plugin skills dir AND opencode `skills.paths` entry (same files) | existing `SKILL.md` shape (frontmatter `name/description`, agy-compatible) |
| `hooks/fixtures/*.json` | Replay vectors for gate evidence (allow/deny/secret/{}/first/compact) | `pretool-*.json`, `posttool-ok.json`, `preinvocation-*.json` |
| `README.md` | Install/verify/disable runbook + 1:1 mapping table | `agy plugin install/list/disable/uninstall`, `/hooks` |

## Data Flow

```text
agy session start (first model invocation)
  → spawn: bun ./hooks/context-inject.ts (stdin {invocationNum:0,...})
  → stdout {injectSteps:[{ephemeralMessage: WORKFLOW+GUARDRAILS+POINTERS+live bootstrap}]}
  → agent continues with Frame→Ship context (== opencode system.transform)
agy event (PreToolUse run_command)
  → spawn: bun ./hooks/safety-gate.ts (timeout 10s, stdin = event JSON)
  → stdout {decision: allow|deny|ask, reason?} → agy gates tool call
agy event (PostToolUse write_to_file)
  → spawn: bun ./hooks/format-note.ts (timeout 10s, stdin = result JSON)
  → stdout {} → agy continues (no gate)
long trajectory (initialNumSteps >= 40)
  → spawn: bun ./hooks/context-inject.ts → {injectSteps:[{ephemeralMessage: COMPACTION_REMINDER}]}
  → (== opencode session.compacting; documented delta: threshold, not event)
```

Bun executes TS directly — no `tsc` build, no committed `node_modules`. Fixtures replay the same path offline: `bun ./hooks/<n>.ts < hooks/fixtures/<f>.json` from repo root.

## Invariants

- INV-001: Chain + opencode runtime unchanged — parity is additive context only; `.opencode/plugins/frame-ship.ts` stays single-file zero-dep; `skills/` content untouched.
- INV-002: Schema-exact — `plugin.json` validates against `https://antigravity.google/schemas/v1/plugin.json`; `hooks.json` uses only `PreToolUse/PostToolUse/PreInvocation + matcher + type/command/timeout + enabled?`.
- INV-003: Contract-exact — PreToolUse outputs only the documented `decision` enum; PostToolUse outputs `{}`; PreInvocation outputs `{injectSteps}` or `{}`; single JSON object on stdout, exit 0.
- INV-004: Bun-direct — every `command` contains `bun` + `./hooks/*.ts`; no shell-script handlers in v1.
- INV-005: Least-privilege matchers — explicit tool names/pipes (`run_command`, `write_to_file|replace_file_content`); no `"*"` in v1; no `permissionOverrides`.
- INV-006: Reference-only provenance — official docs linked, never pasted; no copied upstream code; no `Stop→continue` loop risk (`Stop` unused).
- INV-007: Deny-default posture — unknown/destructive/secret-bearing commands default to `ask` or `deny`, never silent `allow`; injected context is local trusted content only (rules + repo skill file), never stdin-derived.
- INV-008: Parity lockstep — `[frame-ship v0.4.0]` marker greppable in `.opencode/plugins/frame-ship.ts`, `hooks/context-inject.ts`, and `rules/frame-ship.md`; version + chain + cards bump together; root-drop layout (`agy plugin install .`) holds — no `plugins/` subdir indirection.

## Non-Functional Requirements

- Performance: per-hook wall < 10s timeout; local replay p95 < 2s; empty-stdin exits fast with safe default (`ask` for gates, `{}` for observers/injector) — no hang.
- Availability: hooks are pure filters — failure (nonzero exit / bad JSON) must not wedge `agy`; timeout fires, agent continues per platform default.
- Security: trust boundaries at stdin (untrusted tool args) → stdout (gate decision / injected context); injected messages contain only local trusted content, never stdin echoes; secret patterns denied with rule-only reasons, never echoed; `rg` scan = 0 findings outside the documented canary fixture; no freelance key rotation/prod patch/perm widen.
- Operability: `agy plugin disable|enable|uninstall frame-ship` + source `git revert`; README runbook; per-hook timeout declared.
- Usability: `reason` strings human-readable (qué + por qué + alternativa); install verifiable via `agy plugin list` + `/hooks`; mapping table in README answers "how is this 1:1?" in one screen.
