# PLUGINS — Multi-Harness Runtime Adapters

## OVERVIEW
Runtime adapters connecting Frame→Ship methodology to coding agent platforms: OpenCode plugin and Antigravity CLI hooks.

## WHERE TO LOOK
| Harness | Path | Description |
|---|---|---|
| OpenCode (skills) | `opencode/skills.ts` | Zero-dep plugin (id `frame-ship`); registers 12 skills, hooks session context & compaction |
| OpenCode (agents) | `opencode/agents.ts` | Zero-dep plugin (id `frame-ship-agents`); provisions 31 agents, in-place enrichment only — never touches built-in `plan`/`build` agents |
| OpenCode (guardrails) | `opencode/guardrails.ts` | Zero-dep plugin (id `frame-ship-guardrails`); injects full `rules/guardrails.md` on context + minimal one-liner set on compaction |
| OpenCode (shared) | `opencode/shared.ts` | Version lockstep target + bounded fs helpers (module, not a plugin) |
| OpenCode (composed) | `opencode/frame-ship.ts` | Composed entry (`package.json` `main`): all three lanes under id `frame-ship` |
| OpenCode Setup | `opencode/INSTALL.md` | Installation and local link instructions for OpenCode |
| Antigravity Hook | `antigravity/hooks/context-inject.ts` | PreInvocation hook; injects prompt rules & live bootstrap on invocation 0 |
| Antigravity Gate | `antigravity/hooks/safety-gate.ts` | PreToolUse hook; blocks destructive commands and leaks on `run_command` |
| Antigravity Observer| `antigravity/hooks/format-note.ts` | PostToolUse hook; drains file modification events safely |
| Hook Payloads | `antigravity/hooks/fixtures/` | Replay test vectors for PreInvocation, PreToolUse, and PostToolUse hooks |

## CONVENTIONS
- **Zero Runtime Dependencies**: The plugin layer relies exclusively on `@opencode/plugin` as a compile-time type dependency.
- **Dynamic File System Access**: Code checks `globalThis.Bun.file` first, falling back to function-scoped dynamic import `await import("node:fs/promises")` to pass `tsc` typechecks without `@types/node`.
- **Bounded I/O**: File reads in plugin setup (the `shared.ts` helpers) use a 2000ms deadline (`withTimeout`) to prevent hanging on disk or mount stalls; hook stdin reads are unbounded by design — the harness owns the pipe and closes it after the payload, so no timeout is applied there.
- **Hook Stdin Draining**: CLI hooks drain `process.stdin` safely via buffer chunks and fail closed on corrupt JSON without uncaught exceptions.
- **Windows Path Handling**: Strips leading slash from file URLs before drive letters (`/D:/...` -> `D:/...`).
- **Split lanes**: `skills.ts` (id `frame-ship`), `agents.ts` (id `frame-ship-agents`), and `guardrails.ts` (id `frame-ship-guardrails`) are the three independent plugins; `frame-ship.ts` composes all three for package installs. Never list the composed entry together with `skills.ts` (duplicate id `frame-ship`). `shared.ts` carries no default export and must never be listed as a plugin entry.
- **Version Lockstep**: `const VERSION` in `opencode/shared.ts` (single source imported by all lanes) must match the repository root `package.json`; verify with `npm run version:check`.

## COMMANDS
```bash
# Replay fixture test payloads against Antigravity hooks
node plugins/antigravity/hooks/safety-gate.ts < plugins/antigravity/hooks/fixtures/pretool-deny.json
node plugins/antigravity/hooks/context-inject.ts < plugins/antigravity/hooks/fixtures/preinvocation-first.json
node plugins/antigravity/hooks/format-note.ts < plugins/antigravity/hooks/fixtures/posttool-ok.json
```

## ANTI-PATTERNS
- Adding static Node runtime imports (`import fs from "node:fs"`) that break zero-dep `tsc` typechecking.
- Introducing external npm runtime dependencies into `plugins/`.
- Permitting destructive commands or unmasked credential patterns to pass `safety-gate.ts`.
- Logging or returning raw secret values in hook denial messages (cite rule name only).
- Bypassing version synchronization when updating plugin files.

