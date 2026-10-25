# Antigravity CLI (agy)

This repo root **is** the agy plugin source (root-drop layout — `agy plugin install .`). Handlers are TypeScript executed via `node` (the `hooks.json` contract), and context injection is 1:1 with the opencode plugin (same cards, same bootstrap, same `skills/`).

Install globally:

```bash
agy plugin install https://github.com/deuriib/frame-ship
agy plugin list        # frame-ship appears
```

Or per-workspace: `agy plugin install /path/to/frame-ship` from any checkout. Verify loaded hooks in the TUI with `/hooks`. Disable/enable without deleting assets:

```bash
agy plugin disable frame-ship
agy plugin enable frame-ship
agy plugin uninstall frame-ship   # purge + rollback (ETA < 10 min with git revert)
```

Prerequisites: [Antigravity CLI](https://antigravity.google/docs/cli/overview/) (`agy` v1.2.0), Node 24 on PATH (hooks run via `node`, matching `hooks.json`).
