# frame-ship — Install (V2)

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Requires **opencode V2** (`opencode --version` → `2.x`). The plugin is V2-only:
`plugins/opencode/frame-ship.ts` exports `Plugin.define({ id: "frame-ship" })`
from `@opencode/plugin`. V1 (`@opencode-ai/plugin`, `plugin` key,
`experimental.*` hooks) is not supported — see `CHANGELOG.md` v0.7.0.

## Prerequisites

- [opencode](https://opencode.ai/) V2 installed
- Git + [GitHub CLI (`gh`)](https://cli.github.com/) authenticated (repo is private)
- Node 22 LTS (via `mise install` in this repo — no manual install needed)

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
`package.json` (`main: ./plugins/opencode/frame-ship.ts`). Skills resolve
relative to the plugin file via `import.meta.url` — never from cwd.

Equivalent manual entry (`opencode.jsonc`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["frame-ship@github:deuriib/frame-ship"],
  // frame-ship entry point: new sessions start on the Orchestrator.
  // (The plugin also sets this at runtime via editor.default("orchestrator").)
  "default_agent": "orchestrator"
}
```

## Option B — Local file (development only)

Use when editing this repo and want live changes. Copy the single file into
the project's auto-discovered plugin dir (a root-level `plugins/` dir is NOT
auto-discovered — only `.opencode/plugins/` is):

```bash
mkdir -p <your-project>/.opencode/plugins
cp plugins/opencode/frame-ship.ts <your-project>/.opencode/plugins/frame-ship.ts
```

`@opencode/plugin` must resolve from the plugin file (nearest `node_modules`
walking up). If load fails with `Cannot find package '@opencode/plugin'`,
install it where the plugin can see it.

Notes:

- The source of truth stays at `plugins/opencode/frame-ship.ts` in this repo —
  never edit the copy directly; re-copy after every edit.
- Never commit a `file:///` path to a shared project config.

## Verify

1. Quit + restart opencode (config is not hot-reloaded; `opencode service restart`).
2. `opencode api get "/api/plugin?location[directory]=<your-project>"` lists
   `frame-ship` with `status: active`.
3. `opencode api get "/api/skill?location[directory]=<your-project>"` lists all
   13 `frame-ship:*` skills (`using-frame-ship`, 9 stages, 3 supporting).
4. Start any session — the system prompt contains `[frame-ship v0.8.0]`
   (workflow card + guardrails + pointers + `using-frame-ship` bootstrap).
5. Agents (automatic): on setup the plugin provisions V2-native files from the
   canonical `agents/*.md` into `<your-project>/.opencode/agents/` (missing
   only — your customized files are never rewritten; a `.frame-ship.json`
   manifest tracks what it generated), reloads the agent domain, then enriches
   each id in place. `opencode api get "/api/agent?location[directory]=<your-project>"`
   shows `orchestrator` (`primary`, the default), 8 owners (`all`),
   22 specialists/reviewers (`subagent`) with wrapper `permissions` appended.

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
| Plugin not loaded after edit | quit + restart opencode (or `opencode service restart`); sessions keep the old system prompt |
| `github:` install asks for auth | `gh auth login`, or use the `git+ssh://` variant with your key loaded |
| Duplicated `[frame-ship]` banner | update to latest — `hasMarker()` dedupes object parts; don't list both git + local at once |
| Skills not found | keep only one `frame-ship` entry; check `skills/` exists next to the plugin root |
| `tsc` fails | run from repo root: `mise run typecheck` — plugin must stay single-file, zero runtime deps |
| `Cannot find package '@opencode/plugin'` | install `@opencode/plugin@2.0.9` where the plugin file resolves (repo root has it) |
| Old `{"name": "frame-ship@..."}` entry ignored | V2 wants bare `"frame-ship@..."` string or `{"package": ..., "options": ...}` — rewrite the entry |
| Agents not listed after restart | check `<project>/.opencode/agents/` was provisioned (31 `<id>.md` + `.frame-ship.json`); if the project is read-only, copy `agents/*.md` manually (see V2 notes) and restart |

## V2 notes (behavior deltas vs v0.6.1)

- System injection moved to `ctx.session.hook("context")` as
  `{type:"text", text}` parts; compaction reminder to `ctx.session.hook("compaction")`.
- Skills are registered via `ctx.skill.transform` as `frame-ship:<stage>` (13 total).
- Agents: frontmatter wrapper inside `frame-ship.ts` (`parseAgentFile` →
  `toOpenCodeMode` / `toOpenCodeSteps` / `toPermissionMap`) translates the
  canonical `agents/*.md` (frame-ship keys: `mainAgent`, `subagent`, `effort`,
  custom `tools`) to OpenCode V2 (`mode`, `steps`, `system`,
  `permission:{action:"allow"|"deny"}`). V2 renamed `bash→shell` and
  `task→subagent`; the wrapper owns that mapping so `agents/*.md` never carry
  V2 syntax. V2 `AgentEditor` has no `add` (ids are born in file discovery, so
  the filename is the canonical id), therefore `setup()` **provisions**
  V2-native `<project>/.opencode/agents/<id>.md` files with permission blocks
  (missing only, never overwriting your edits), calls `ctx.agent.reload()`,
  and then **updates in place** (missing ids skipped; runtime transform
  enriches name/description/mode/system/steps only — permissions live in the
  markdown frontmatter and survive V2's host reconciliation). `orchestrator`
  becomes the default via `editor.default("orchestrator")`; config equivalent:
  `"default_agent": "orchestrator"` (must be set in `opencode.json`).
  Mapping (least privilege): `view_file|list_dir→read`,
  `find_by_name→glob`, `grep_search→grep`,
  `write_to_file|replace_file_content→edit`, `run_command→bash`,
  `invoke_subagent|manage_subagents|send_message→task`,
  `ask_question→question`, `read_url_content→webfetch`, `skill→allow` always.
  Mode: `mainAgent+subagent→all`, `mainAgent→primary`, else `subagent`.
  Hidden: mode `all` (the 8 C-level owners) → `hidden:true`, out of the `@`
  autocomplete menu; dispatch flows through the visible `orchestrator`.
  Effort: `high→12`, `medium→8`, `low→5`, missing→8.
- `subagent_depth` is dropped (V1 field has no V2 equivalent; native counterpart
  is `experimental.subagent_depth`).

## Which to use?

- Default: **Option A (package)** — portable, shareable.
- Only when editing `frame-ship.ts` or `skills/`: **Option B (local)** — then restart opencode after every edit.
