# frame-ship — Install (V2)

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Requires **opencode V2** (`opencode --version` → `2.x`). The plugin is V2-only
and ships as three independent lane plugins plus a shared module:

| File | Plugin id | Role |
| ------ | ----------- | ------ |
| `plugins/skills.ts` | `frame-ship-skills` | `frame-ship:<stage>` skills + session context/compaction injection |
| `plugins/guardrails.ts` | `frame-ship-guardrails` | `always_on` foundation rules from `rules/*.md` on context and compaction |
| `plugins/commands.ts` | `frame-ship-commands` | Custom slash commands from `commands/*.md` |
| `lib/shared.ts` | — (module) | version lockstep + fs helpers; **never** list as a plugin entry |
| `plugins/frame-ship.ts` | `frame-ship` | composed entry (`package.json` `main`): runs all three lanes under one id |

V1 (`@opencode-ai/plugin`, `plugin` key,
`experimental.*` hooks) is not supported — see `CHANGELOG.md` v0.7.0.
Never list the composed entry together with individual lane files.

## Prerequisites

- [opencode](https://opencode.ai/) V2 installed
- Git + [GitHub CLI (`gh`)](https://cli.github.com/) authenticated (repo is private)
- Node 24 LTS (via `mise install` in this repo — no manual install needed)

Config locations:

- Global: `~/.config/opencode/opencode.json`
- Project override: `<your-project>/opencode.json`

> Key name is `plugins` (V2 array). The old V1 `plugin` key and
> `{"name": "frame-ship@..."}` object form are skipped by V2 with a
> normalization warning — use the forms below.

## Option A — Package install (normal use, Recommended)

```bash
opencode plugin add github:deuriib/frame-ship
```

This installs the repo as a package; the loader uses the repo-root
`package.json` (`main: ./.opencode/plugins/frame-ship.ts` — the **composed
entry**: all lanes under id `frame-ship`, so a package install keeps full
behavior with one entry). Skills and rules resolve
relative to the plugin file via `import.meta.url` — never from cwd. To run the
lanes as independent plugins instead, use the local entries in Option B.

Equivalent manual entry (`opencode.jsonc`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["frame-ship@github:deuriib/frame-ship"]
}
```

## Option B — Local entries (development only)

Use when editing this repo and want live changes. Relative paths resolve from
the config file containing the entry (only `.opencode/plugins/` is auto-discovered).

**B1 — config entries, no copy (recommended):**

```jsonc
{
  "plugins": [
    "./.opencode/plugins/skills.ts",
    "./.opencode/plugins/guardrails.ts",
    "./.opencode/plugins/commands.ts"
  ]
  // composed alternative (all lanes, one id — never combine with the lanes above):
  // "plugins": ["./.opencode/plugins/frame-ship.ts"]
}
```

**B2 — copy into the project's auto-discovery dir:**

```bash
mkdir -p <your-project>/.opencode/plugins <your-project>/.opencode/lib
# split install: independent plugins (+ shared module imported by all)
cp .opencode/plugins/skills.ts .opencode/plugins/guardrails.ts .opencode/plugins/commands.ts <your-project>/.opencode/plugins/
cp .opencode/lib/shared.ts <your-project>/.opencode/lib/
```

Notes:

- The source of truth stays at `.opencode/plugins/*.ts` in this repo —
  never edit copies directly; re-copy after every edit.
- `@opencode/plugin` must resolve from the plugin file (nearest `node_modules`
  walking up). If load fails with `Cannot find package '@opencode/plugin'`,
  install it where the plugin can see it.
- `shared.ts` has no default export: if it shows up as skipped/inactive (or
  `status: error`) in `/api/plugin`, that is cosmetic — `skills.ts`,
  `guardrails.ts`, and `commands.ts` import it directly and load regardless.
- Never commit a `file:///` path to a shared project config.

**B3 — global auto-discovery symlinks (no config entries at all):**

```bash
ln -s <this-repo>/.opencode/plugins/skills.ts ~/.config/opencode/plugins/
ln -s <this-repo>/.opencode/plugins/guardrails.ts ~/.config/opencode/plugins/
ln -s <this-repo>/.opencode/plugins/commands.ts ~/.config/opencode/plugins/
```

- V2 scans `~/.config/opencode/plugins/*.ts` at startup; each file loads as
  its own plugin — the `plugins` array in `opencode.json` can stay empty of
  frame-ship entries. Never symlink `frame-ship.ts` (composed) together with
  the individual lanes.
- `shared.ts` needs no symlink: the loader resolves symlinks to the real
  path, so `../lib/shared` and `resolveRepoDir` (`import.meta.url`) hit this repo.
- Adding or removing a symlink requires a restart — plugins are not hot-reloaded.

## Verify

1. Quit + restart opencode (config is not hot-reloaded; `opencode service restart`).
2. `opencode api get "/api/plugin?location[directory]=<your-project>"` lists
   `frame-ship` with `status: active` — or `frame-ship-skills`,
   `frame-ship-guardrails`, and `frame-ship-commands` when you configure the
   split entries (Option B).
3. `opencode api get "/api/skill?location[directory]=<your-project>"` lists all
   `frame-ship:*` skills (`using-frame-ship` + stage skills).
4. Start any session — the system prompt contains `[frame-ship v0.12.0]`
   (workflow card + pointers + `using-frame-ship` bootstrap) and
   `[frame-ship-guardrails v0.12.0]` (`always_on` foundation rules on context
   and compaction).

```bash
# in this repo: toolchain + typecheck still pass
mise trust
mise install
mise run install
mise run typecheck
mise exec -- node --version   # expect v24.x
```

## Troubleshooting

| Symptom | Fix |
| --------- | ----- |
| Plugin not loaded after edit | quit + restart opencode (or `opencode service restart`); sessions keep the old system prompt |
| `github:` install asks for auth | `gh auth login`, or use the `git+ssh://` variant with your key loaded |
| Duplicated `[frame-ship]` banner | update to latest — `hasMarker()` dedupes object parts; don't list both git + local at once |
| Skills not found | keep only one `frame-ship` entry; check `skills/` exists next to the plugin root |
| No guardrails marker in prompt | check `rules/` exists next to the plugin root; the lane falls back to the minimal fail-closed set |
| `tsc` fails | run from repo root: `mise run typecheck` — plugins must stay zero runtime deps (`frame-ship`, `skills`, `guardrails`, `commands`, `shared`) |
| `Cannot find package '@opencode/plugin'` | install `@opencode/plugin@2.0.9` where the plugin file resolves (repo root has it) |
| Duplicate plugin registration in `/api/plugin` | you listed the composed entry (`frame-ship.ts`) together with individual lanes — pick one form: composed alone, or `skills.ts` + `guardrails.ts` + `commands.ts` |
| Old `{"name": "frame-ship@..."}` entry ignored | V2 wants bare `"frame-ship@..."` string or `{"package": ..., "options": ...}` — rewrite the entry |
| `plugins: ["./.opencode/plugins/frame-ship.ts"]` after the split | still valid — that path is the composed entry. Use `skills.ts` + `guardrails.ts` + `commands.ts` entries to load the lanes independently |
| `shared.ts` listed as skipped/error in `/api/plugin` | expected — it is a module without a default export, never a plugin entry; skills/guardrails/commands import it directly |

## V2 notes

- System injection moved to `ctx.session.hook("context")` as
  `{type:"text", text}` parts; compaction reminder to `ctx.session.hook("compaction")`.
- Skills are registered via `ctx.skill.transform` as `frame-ship:<stage>`.
- `subagent_depth` is dropped (V1 field has no V2 equivalent; native counterpart
  is `experimental.subagent_depth`).

## Which to use?

- Default: **Option A (package)** — portable, shareable.
- Only when editing `.opencode/plugins/*.ts` or `skills/`: **Option B (local)** — then restart opencode after every edit.
