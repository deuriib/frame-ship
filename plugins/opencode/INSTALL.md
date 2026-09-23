# frame-ship — Install (V2)

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Requires **opencode V2** (`opencode --version` → `2.x`). The plugin is V2-only
and ships as three independent plugins plus a shared module:

| File | Plugin id | Role |
|------|-----------|------|
| `plugins/opencode/skills.ts` | `frame-ship` | 13 `frame-ship:<stage>` skills + session context/compaction injection |
| `plugins/opencode/agents.ts` | `frame-ship-agents` | 31-agent provisioning + in-place enrichment (no default; orchestrator is `primary` visible entry) |
| `plugins/opencode/guardrails.ts` | `frame-ship-guardrails` | Full `rules/guardrails.md` on context + minimal one-liner set on compaction |
| `plugins/opencode/shared.ts` | — (module) | version lockstep + fs helpers; **never** list as a plugin entry |
| `plugins/opencode/frame-ship.ts` | `frame-ship` | composed entry (`package.json` `main`): runs all three lanes under one id |

V1 (`@opencode-ai/plugin`, `plugin` key,
`experimental.*` hooks) is not supported — see `CHANGELOG.md` v0.7.0.
Never list the composed entry together with `skills.ts` (duplicate id).

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
`package.json` (`main: ./plugins/opencode/frame-ship.ts` — the **composed
entry**: all three lanes under id `frame-ship`, so a package install keeps full
behavior with one entry). Skills resolve
relative to the plugin file via `import.meta.url` — never from cwd. To run the
lanes as two independent plugins instead, use the local entries in Option B.

Equivalent manual entry (`opencode.jsonc`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["frame-ship@github:deuriib/frame-ship"]
}
```

## Option B — Local entries (development only)

Use when editing this repo and want live changes. Relative paths resolve from
the config file containing the entry (a root-level `plugins/` dir is NOT
auto-discovered — only `.opencode/plugins/` is).

**B1 — config entries, no copy (recommended):**

```jsonc
{
  "plugins": [
    "./plugins/opencode/skills.ts",
    "./plugins/opencode/agents.ts",
    "./plugins/opencode/guardrails.ts"
  ]
  // composed alternative (all three lanes, one id — never combine with the three above):
  // "plugins": ["./plugins/opencode/frame-ship.ts"]
}
```

**B2 — copy into the project's auto-discovery dir:**

```bash
mkdir -p <your-project>/.opencode/plugins
# split install: three independent plugins (+ shared module imported by all)
cp plugins/opencode/skills.ts plugins/opencode/agents.ts plugins/opencode/guardrails.ts plugins/opencode/shared.ts <your-project>/.opencode/plugins/
```

Notes:

- The source of truth stays at `plugins/opencode/*.ts` in this repo —
  never edit copies directly; re-copy after every edit.
- `@opencode/plugin` must resolve from the plugin file (nearest `node_modules`
  walking up). If load fails with `Cannot find package '@opencode/plugin'`,
  install it where the plugin can see it.
- `shared.ts` has no default export: if it shows up as skipped/inactive (or
  `status: error`) in `/api/plugin`, that is cosmetic — `skills.ts` and
  `agents.ts` and `guardrails.ts` import it directly and load regardless.
- Never commit a `file:///` path to a shared project config.

**B3 — global auto-discovery symlinks (no config entries at all):**

```bash
ln -s <this-repo>/plugins/opencode/skills.ts ~/.config/opencode/plugins/
ln -s <this-repo>/plugins/opencode/agents.ts ~/.config/opencode/plugins/
ln -s <this-repo>/plugins/opencode/guardrails.ts ~/.config/opencode/plugins/
```

- V2 scans `~/.config/opencode/plugins/*.ts` at startup; each file loads as
  its own plugin — the `plugins` array in `opencode.json` can stay empty of
  frame-ship entries. Never symlink `frame-ship.ts` (composed) together with
  the lanes (duplicate id `frame-ship`).
- `shared.ts` needs no symlink: the loader resolves symlinks to the real
  path, so `./shared` and `resolveRepoDir` (import.meta.url) hit this repo.
- Adding or removing a symlink requires a restart — plugins are not hot-reloaded.

## Verify

1. Quit + restart opencode (config is not hot-reloaded; `opencode service restart`).
2. `opencode api get "/api/plugin?location[directory]=<your-project>"` lists
   `frame-ship` with `status: active` — and `frame-ship-agents` /
   `frame-ship-guardrails` too when you configure the split entries (Option B);
   the composed entry bundles all three lanes under `frame-ship` alone.
3. `opencode api get "/api/skill?location[directory]=<your-project>"` lists all
   13 `frame-ship:*` skills (`using-frame-ship`, 9 stages, 3 supporting).
4. Start any session — the system prompt contains `[frame-ship v0.10.0]`
   (workflow card + pointers + `using-frame-ship` bootstrap) and
   `[frame-ship-guardrails v0.10.0]` (full guardrails on context, minimal set
   on compaction).
5. Agents (automatic): on setup the `frame-ship-agents` lane (or the composed
   entry) provisions V2-native files from the
   canonical `agents/*.md` into the global discovery route
   `~/.config/opencode/agents/` (missing only — your customized files are never
   rewritten; a `.frame-ship.json` manifest tracks what it generated), reloads
   the agent domain, then enriches each id in place. `opencode api get "/api/agent?location[directory]=<your-project>"`
   shows `orchestrator` (`primary`, the only visible entry), 8
   owners (`all`) and 22 specialists/reviewers (`subagent`) — the latter 30
   `hidden:true`, each with its V2 `permissions:` rule list in frontmatter.

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
| No guardrails marker in prompt | check `rules/guardrails.md` exists next to the plugin root; the lane falls back to the minimal one-liner set |
| `tsc` fails | run from repo root: `mise run typecheck` — plugins must stay zero runtime deps (5 files: frame-ship/skills/agents/guardrails/shared) |
| `Cannot find package '@opencode/plugin'` | install `@opencode/plugin@2.0.9` where the plugin file resolves (repo root has it) |
| Duplicate id `frame-ship` in `/api/plugin` | you listed the composed entry (`frame-ship.ts`) together with `skills.ts` — pick one form: composed alone, or `skills.ts` + `agents.ts` + `guardrails.ts` |
| Old `{"name": "frame-ship@..."}` entry ignored | V2 wants bare `"frame-ship@..."` string or `{"package": ..., "options": ...}` — rewrite the entry |
| `plugins: ["./plugins/opencode/frame-ship.ts"]` after the split | still valid — that path is now the composed entry (all three lanes). Use `skills.ts` + `agents.ts` + `guardrails.ts` entries to load the lanes independently |
| `shared.ts` listed as skipped/error in `/api/plugin` | expected — it is a module without a default export, never a plugin entry; skills/agents/guardrails import it directly |
| Agents not listed after restart | check `~/.config/opencode/agents/` was provisioned (31 `<id>.md` + `.frame-ship.json`); if that dir is read-only, copy `agents/*.md` there manually (see V2 notes) and restart |

## V2 notes (behavior deltas vs v0.6.1)

- System injection moved to `ctx.session.hook("context")` as
  `{type:"text", text}` parts; compaction reminder to `ctx.session.hook("compaction")`.
- Skills are registered via `ctx.skill.transform` as `frame-ship:<stage>` (13 total).
- Agents: frontmatter wrapper inside `agents.ts` (`parseAgentFile` →
  `toOpenCodeMode` / `toOpenCodePermissions`) translates the
  canonical `agents/*.md` (frame-ship keys: `mainAgent`, `subagent`, `effort`,
  custom `tools`) to OpenCode V2 (`mode`, `system`, `hidden`,
  `permissions:[{action,resource,effect}]`). V2 renamed `bash→shell` and
  `task→subagent`; the wrapper owns that mapping so `agents/*.md` never carry
  V2 syntax (the legacy `permission:` map is rejected by V2). V2 `AgentEditor`
  has no `add` (ids are born in file discovery, so the filename is the
  canonical id), therefore `setup()` **provisions** V2-native
  `~/.config/opencode/agents/<id>.md` files (env-resolved global route —
  `XDG_CONFIG_HOME`/`HOME` + `/.config/opencode/agents`, never
  `ctx.location.directory`; missing only, never overwriting your edits; manifest
  `frame-ship` version-guarded so relaunches write nothing), calls
  `ctx.agent.reload()`, and then **updates in place** (missing ids skipped;
  runtime transform enriches name/description/mode/system/hidden only —
  permissions live in the markdown frontmatter and survive V2's host
  reconciliation). No default is set — select `orchestrator` via `@orchestrator` / agent picker.
  Mapping (least privilege): `view_file|list_dir→read`,
  `find_by_name→glob`, `grep_search→grep`,
  `write_to_file|replace_file_content→edit`, `run_command→shell`,
  `invoke_subagent|manage_subagents|send_message→subagent`,
  `ask_question→question`, `read_url_content→webfetch`, `skill→allow` always.
  Mode: `mainAgent+subagent→all`, `mainAgent→primary`, else `subagent`.
  Hidden: every non-primary agent (30 of 31 — owners, specialists, reviewers)
  → `hidden:true`, out of listings and the subagent catalog; dispatch flows
  through the visible `orchestrator`.
  No `steps` mapping (effort is parsed but unused; V2 default allowance applies).
- `subagent_depth` is dropped (V1 field has no V2 equivalent; native counterpart
  is `experimental.subagent_depth`).

## Which to use?

- Default: **Option A (package)** — portable, shareable.
- Only when editing `plugins/opencode/*.ts` or `skills/`: **Option B (local)** — then restart opencode after every edit.
