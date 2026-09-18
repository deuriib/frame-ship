# frame-ship — Install (named path style)

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Install the plugin by **name + source** (`frame-ship@<source>`) in your opencode config.
Pick **one**: git for normal use, local `file:///` for development.

## Prerequisites

- [opencode](https://opencode.ai/) installed
- Git + [GitHub CLI (`gh`)](https://cli.github.com/) authenticated (repo is private)
- Node 22 LTS (via `mise install` in this repo — no manual install needed)

Config locations:

- Global (use here): `~/.config/opencode/opencode.json`
- Project override: `<your-project>/opencode.json`

> Key name is `plugin` (v1) / `plugins` (v2). Use whichever your version accepts.

## Option A — From git (normal use, Recommended)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["frame-ship@github:deuriib/frame-ship"]
}
```

Variants if the shortcut fails (private repo = needs your existing git credentials):

```jsonc
{
  "plugin": [
    "frame-ship@git+https://github.com/deuriib/frame-ship.git#main",
    "frame-ship@git+ssh://git@github.com/deuriib/frame-ship.git#main"
  ]
}
```

Or via CLI:

```bash
opencode plugin add github:deuriib/frame-ship
```

Why this works: the repo root has `package.json` (`name: frame-ship`, `main: ./.opencode/plugins/frame-ship.ts`) so Bun can install the directory; skills resolve relative to the plugin file via `import.meta.url` — never from cwd.

## Option B — Local path (development only)

Use when you are editing this repo and want live changes.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["frame-ship@file:///D:/GitHub/frame-ship"]
}
```

Notes:

- Windows form is `file:///D:/...` (three slashes + drive letter).
- macOS/Linux form is `file:///home/you/GitHub/frame-ship`.
- Replace the path with your checkout location — non-portable by design.
- Never commit a `file:///` path to a shared project config.

Or via CLI:

```bash
opencode plugin add file:///D:/GitHub/frame-ship
```

## Verify

1. Quit + restart opencode (config is not hot-reloaded).
2. Start any session — the system prompt contains `[frame-ship v0.6.1]`.
3. The native `skill` tool discovers all 9 stages (`frame-intent` … `ship-release`).

```bash
# in this repo: toolchain + typecheck still pass
mise trust
mise install
mise run install
mise run typecheck
mise exec -- node --version   # expect v22.x
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Plugin not loaded after edit | quit + restart opencode; sessions keep the old system prompt |
| `github:` install asks for auth | `gh auth login`, or use the `git+ssh://` variant with your key loaded |
| Duplicated `[frame-ship]` banner | update to latest — `hasMarker()` dedupes; don't list both git + local at once |
| Skills not found | keep only one `frame-ship@` entry; check `skills/` exists at repo root next to `.opencode/` |
| `tsc` fails | run from `.opencode/`: `mise run typecheck` — plugin must stay single-file, zero runtime deps |

## Which to use?

- Default: **Option A (git)** — portable, shareable.
- Only when editing `frame-ship.ts` or `skills/`: **Option B (local)** — then restart opencode after every edit.
