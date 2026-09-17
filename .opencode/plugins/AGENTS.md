# PLUGINS — opencode runtime

## OVERVIEW
Single auto-discovered entry: `frame-ship.ts` v0.6.0 (350 lines). Zero deps, registers skills + agents + injection.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Skills registration | `frame-ship.ts:127-132` | `config` hook, appends `<root>/skills` to `skills.paths` (idempotent, never clobbers) |
| System injection | `frame-ship.ts:134-141` | `experimental.chat.system.transform`, pushes 3 cards + live `using-frame-ship/SKILL.md` body (silent fallback to 3 on read failure) |
| Bootstrap loader | `frame-ship.ts:89-117` | `loadBootstrapBody()` — `Bun.file` first, dynamic `node:fs/promises` fallback, per-path cache; label + already-loaded ack + SKILL.md body |
| Compaction | `frame-ship.ts:142-147` | `experimental.session.compacting`, pushes 1 reminder |
| Dedupe | `frame-ship.ts:33-36` | `hasMarker()` checks `MARKER` before push; `includes()` before paths push |
| Version | `frame-ship.ts:10-11` | `VERSION` + `MARKER` must bump together |

## CONVENTIONS
- `export const FrameShipPlugin: Plugin` + mirrored `export default` (both shapes load); `import type` only, zero runtime deps, single file.
- Constants prefixed with `${MARKER}` so injected strings are greppable.
- Dispatch (ADR-003, CEO-only): **orchestrator dispatches entire team; domain owners/specialists do the work or brief back** — plugin injects load order + `retry N=2 → escalate orchestrator` in `WORKFLOW_CARD`; cross-domain needs return as formal Cross-domain request brief to the orchestrator, who delegates or resolves.
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
