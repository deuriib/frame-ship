# PLUGINS — Multi-Harness Runtime Adapters

## OVERVIEW
Runtime adapters connecting Frame→Ship methodology to coding agent platforms: OpenCode plugin and Antigravity CLI hooks.

## WHERE TO LOOK
| Harness | Path | Description |
|---|---|---|
| OpenCode | `opencode/frame-ship.ts` | Zero-dep plugin; registers 13 skills, hooks session context & compaction |
| OpenCode Setup | `opencode/INSTALL.md` | Installation and local link instructions for OpenCode |
| Antigravity Hook | `antigravity/hooks/context-inject.ts` | PreInvocation hook; injects prompt rules & live bootstrap on invocation 0 |
| Antigravity Gate | `antigravity/hooks/safety-gate.ts` | PreToolUse hook; blocks destructive commands and leaks on `run_command` |
| Antigravity Observer| `antigravity/hooks/format-note.ts` | PostToolUse hook; drains file modification events safely |
| Hook Payloads | `antigravity/hooks/fixtures/` | Replay test vectors for PreInvocation, PreToolUse, and PostToolUse hooks |

## CONVENTIONS
- **Zero Runtime Dependencies**: The plugin layer relies exclusively on `@opencode/plugin` as a compile-time type dependency.
- **Dynamic File System Access**: Code checks `globalThis.Bun.file` first, falling back to function-scoped dynamic import `await import("node:fs/promises")` to pass `tsc` typechecks without `@types/node`.
- **Bounded I/O**: File reading in hooks and plugin setup uses a 2000ms deadline (`withTimeout`) to prevent hanging on disk or mount stalls.
- **Hook Stdin Draining**: CLI hooks drain `process.stdin` safely via buffer chunks and fail closed on corrupt JSON without uncaught exceptions.
- **Windows Path Handling**: Strips leading slash from file URLs before drive letters (`/D:/...` -> `D:/...`).
- **Version Lockstep**: Plugin header comments and `const VERSION = "0.8.0"` must stay synchronized with repository root.

## COMMANDS
```bash
# Replay fixture test payloads against Antigravity hooks
bun plugins/antigravity/hooks/safety-gate.ts < plugins/antigravity/hooks/fixtures/pretool-deny.json
bun plugins/antigravity/hooks/context-inject.ts < plugins/antigravity/hooks/fixtures/preinvocation-first.json
bun plugins/antigravity/hooks/format-note.ts < plugins/antigravity/hooks/fixtures/posttool-ok.json
```

## ANTI-PATTERNS
- Adding static Node runtime imports (`import fs from "node:fs"`) that break zero-dep `tsc` typechecking.
- Introducing external npm runtime dependencies into `plugins/`.
- Permitting destructive commands or unmasked credential patterns to pass `safety-gate.ts`.
- Logging or returning raw secret values in hook denial messages (cite rule name only).
- Bypassing version synchronization when updating plugin files.

