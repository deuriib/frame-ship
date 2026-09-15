# PLUGINS — opencode runtime

## OVERVIEW
Single auto-discovered entry: `frame-ship.ts` v0.1.0. Zero deps, injection-only.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| System injection | `frame-ship.ts:89-97` | `experimental.chat.system.transform`, pushes 3 strings |
| Compaction | `frame-ship.ts:98-102` | `experimental.session.compacting`, pushes 1 reminder |
| Dedupe | `frame-ship.ts:83-86` | `hasMarker()` checks `MARKER` before push |
| Version | `frame-ship.ts:26-27` | `VERSION` + `MARKER` must bump together |

## CONVENTIONS
- `import type { Plugin }` only; `export default ... satisfies Plugin`.
- Constants prefixed with `${MARKER}` so injected strings are greppable.
- Defensive: return early if `output.system/context` not array.
- Payloads: system gets `WORKFLOW_CARD + GUARDRAILS_FULL + POINTERS`; compacting gets `COMPACTION_REMINDER` only.
- Header comment carries version + chain + creed; bump all three together.
- No `config()` hook — skills resolve via `skills/` dir, not runtime registration.

## NOTES
- `.opencode/.gitignore` hides `package.json/lock` — plugin file itself is the only committed runtime artifact here.
- Restart opencode after any edit; sessions keep old system prompt otherwise.

## ANTI-PATTERNS
- Adding npm deps — `.gitignore` hides `package.json`, plugin must stay portable.
- Blocking hooks (`tool.execute.before` deny) — this plugin advises via context only.
- Pushing without `hasMarker()` — causes duplication on retries.
- Shadowing built-in `/init` or touching `~/.config/opencode/` — project scope only.
