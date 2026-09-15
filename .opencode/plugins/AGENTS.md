# PLUGINS — opencode runtime

## OVERVIEW
Single auto-discovered entry: `frame-ship.ts` v0.2.0. Zero deps, registers skills + injection.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Skills registration | `frame-ship.ts:91-107` | `config` hook, appends `./skills/` to `skills.paths` (idempotent, never clobbers) |
| System injection | `frame-ship.ts:108-113` | `experimental.chat.system.transform`, pushes 3 strings |
| Compaction | `frame-ship.ts:114-119` | `experimental.session.compacting`, pushes 1 reminder |
| Dedupe | `frame-ship.ts:86-89` | `hasMarker()` checks `MARKER` before push; `includes()` before paths push |
| Version | `frame-ship.ts:28-29` | `VERSION` + `MARKER` must bump together |

## CONVENTIONS
- `export const FrameShipPlugin: Plugin` (single named export, no default export); `import type` only, zero runtime deps.
- Constants prefixed with `${MARKER}` so injected strings are greppable.
- Defensive: return early if `output.system/context` not array.
- Payloads: system gets `WORKFLOW_CARD + GUARDRAILS_FULL + POINTERS`; compacting gets `COMPACTION_REMINDER` only.
- Header comment carries version + chain + creed; bump all three together.
- `config` hook resolves `./skills/` from `PluginInput.directory || worktree` per session (plain string join, no `node:` import so `tsc` passes without `@types/node`); pushes absolute path once, never hardcodes `D:\...`.

## NOTES
- `.opencode/.gitignore` hides `package.json/lock` — plugin file itself is the only committed runtime artifact here.
- Restart opencode after any edit; sessions keep old system prompt otherwise.

## ANTI-PATTERNS
- Adding npm deps — `.gitignore` hides `package.json`, plugin must stay portable.
- Blocking hooks (`tool.execute.before` deny) — this plugin advises via context only.
- Pushing without `hasMarker()` — causes duplication on retries.
- Shadowing built-in `/init` or touching `~/.config/opencode/` — project scope only.
