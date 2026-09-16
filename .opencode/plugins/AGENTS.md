# PLUGINS — opencode runtime

## OVERVIEW
Single auto-discovered entry: `frame-ship.ts` v0.3.3. Zero deps, registers skills + injection.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Skills registration | `frame-ship.ts:184-190` | `config` hook, appends `./skills/` to `skills.paths` (idempotent, never clobbers) |
| System injection | `frame-ship.ts:191-198` | `experimental.chat.system.transform`, pushes 3 cards + live `using-frame-ship/SKILL.md` body (silent fallback to 3 on read failure) |
| Bootstrap loader | `frame-ship.ts:140-175` | `loadBootstrapBody()` — `Bun.file` first, dynamic `node:fs/promises` fallback, per-path cache; label + already-loaded ack + SKILL.md body |
| Compaction | `frame-ship.ts:199-204` | `experimental.session.compacting`, pushes 1 reminder |
| Dedupe | `frame-ship.ts:91-94` | `hasMarker()` checks `MARKER` before push; `includes()` before paths push |
| Version | `frame-ship.ts:32-33` | `VERSION` + `MARKER` must bump together |

## CONVENTIONS
- `export const FrameShipPlugin: Plugin` + mirrored `export default` (both shapes load); `import type` only, zero runtime deps, single file.
- Constants prefixed with `${MARKER}` so injected strings are greppable.
- Dispatch (ADR-003, CEO-only): **CEO dispatches entire team; c-levels/specialists do the work or brief back** — plugin injects the dispatch contract in `WORKFLOW_CARD` + `MONTILLA_OWNERSHIP`; `montilla` (CEO) is the sole dispatcher; cross-domain needs return as a formal Cross-domain request brief to the CEO, who delegates or resolves.
- Defensive: return early if `output.system/context` not array.
- Payloads: system gets `WORKFLOW_CARD + GUARDRAILS_FULL + POINTERS` + live bootstrap body; compacting gets `COMPACTION_REMINDER` only.
- Header comment carries version + chain + creed; bump all three together.
- Skills dir resolves from own `import.meta.url` first, `PluginInput.directory || worktree` as fallback (plain string join, no static `node:` import so `tsc` passes without `@types/node` — dynamic import only inside loader); pushes absolute path once, never hardcodes `D:\...`.

## NOTES
- `.opencode/.gitignore` hides `package.json/lock` — plugin file itself is the only committed runtime artifact here.
- Restart opencode after any edit; sessions keep old system prompt otherwise.

## ANTI-PATTERNS
- Adding npm deps — `.gitignore` hides `package.json`, plugin must stay portable.
- Blocking hooks (`tool.execute.before` deny) — this plugin advises via context only.
- Pushing without `hasMarker()` — causes duplication on retries.
- Shadowing built-in `/init` or touching `~/.config/opencode/` — project scope only.
