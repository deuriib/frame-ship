# Architecture Contract: frame-ship plugin runtime (single-file + agent roster)

**Owner:** engineering owner (vasquez, consolidating; single-domain, no cross-cutting lenses)
**Version:** v1
**Last Updated:** 2026-09-17
**Domains-Touched:** [engineering]
**Covered Specs:** `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` (REQ-001..004, REQ-NF-001..004)
**Brief Reference:** docs/briefs/BRIEF-agents-into-plugin.md (read-only) + docs/briefs/OKR-agents-into-plugin.md

## Overview

`.opencode/plugins/frame-ship.ts` is the single-file, zero-dep runtime: a `config` hook (registers `skills.paths` idempotently) plus `experimental.chat.system.transform` (pushes 3 cards + live bootstrap body) and `experimental.session.compacting` (pushes 1 reminder). This contract adds the agent-roster lane to the same file: a static MANIFEST of the 74 `agents/**/*.md` templates plus `resolveAgentsDir` + `readTextFile` + `parseAgentFile` loaders, wired into the existing `config` hook to fill `config.agents` + `config.agent` mirror with `default_agent=montilla` + `subagent_depth=2`. Additive only — skills registration, injection cards, dedupe guards, and resolver precedent (`resolveSkillsDir` from own `import.meta.url`, Bun.file first with dynamic `node:fs/promises` fallback) are unchanged.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| `AGENTS_MANIFEST` | Static roster: 74 entries `{ key, file, mode, hidden? }`; `engineering/espinoza.md` aliased to `espinoza-specialist`; hidden overlay: 8 C-level `all` carry `hidden:true`, `montilla` visible, 65 subagents no flag | TS const array; modes `primary \| all \| subagent`; `hidden?: boolean` optional-only |
| `resolveAgentsDir` | Locate `<root>/agents/` from own `import.meta.url` (fallback `directory \|\| worktree`) | `(fallbackBase: string) => string` (mirrors `resolveSkillsDir`) |
| `readTextFile` | Read one agent file: `Bun.file` first, dynamic `node:fs/promises` fallback | `(path: string) => Promise<string>`; silent `""` on miss |
| `parseAgentFile` | Split frontmatter `description` from clean body (strip `---` fences) | `(raw: string) => { description, prompt }` |
| `config` hook (extended) | Existing skills.paths behavior + fill `config.agents`/`config.agent` idempotently + defaults | `config.agents[key] ??=` per entry; never overwrite existing keys |
| `VERSION`/`MARKER`/header | Version triple, bumped together per brief | `frame-ship.ts:2,10-11` + plugin doc ref |
| `agents/**/*.md` | REUSED VERBATIM — bodies + own frontmatter descriptions are the source of truth | existing template schema (frontmatter `name`/`description` only) |

## Data Flow

```text
opencode init (merged config)
  → config hook: resolveSkillsDir → append skills.paths once (existing)
  → config hook (new): resolveAgentsDir → per MANIFEST entry readTextFile → parseAgentFile
      → config.agents[key] ??= { description, prompt, mode }
      → config.agent[key] ??= same (mirror)
      → default_agent ??= "montilla"; subagent_depth ??= 2
  → chat.system.transform: push 3 cards + live bootstrap (existing, unchanged)
  → dispatch: montilla routes by roster keys; subagents load skill + agents/<domain>/<agent>.md by reference
double-init → every insert guarded by ??=/includes() → byte-identical config (no duplicates, no clobber)
revert → git revert of frame-ship.ts restores v0.5.0 runtime (roster lane removed, skills lane intact)
```

## Invariants

- INV-001: Single-file zero-dep holds — no new imports, no `package.json` deps, `mise run typecheck` green.
- INV-002: Idempotent, never clobbers — `??=` / `includes()` on every insert; user-supplied `config.agents` entries and `skills.paths` survive.
- INV-003: Prompts are bodies only — frontmatter fences stripped; `description` comes from each file's own frontmatter, never rewritten.
- INV-004: Roster-exact — 74 keys: `montilla` primary; 8 C-levels `all`; 65 `subagent`; sole alias `espinoza-specialist` for `engineering/espinoza.md` (no other renames).
- INV-005: Defaults stable — `default_agent=montilla`, `subagent_depth=2` unless a later SPEC + CEO waiver changes them.
- INV-006: Version triple — header comment + `VERSION` + `MARKER` bump together; plugin doc version ref follows.
- INV-007: Reference-only provenance — agent files read by path at init; no bodies pasted into the plugin source or specs beyond the 5-agent spot-check excerpts.
- INV-008: Deny-default posture — no secrets/tokens in code/config/logs/examples; loader never echoes file contents into reasons or errors.

## Non-Functional Requirements

- Performance: init-time load of 74 small markdown files; per-file read cached per path (bootstrap precedent); no per-message I/O — roster resolves once at `config` time.
- Availability: loader failures degrade to skip-entry (silent `""`), never wedge init; skills lane works even if agents dir is unresolvable.
- Security: trust boundary at file read (local trusted content only) → config surface; secret/PII pattern scan over plugin diff = 0 findings; no freelance key rotation/prod patch/perm widen.
- Operability: rollback = `git revert` of the single plugin file, ETA < 15 min; verify via `config.agents` key count + double-init diff.
- Usability: `agents/<domain>/<agent>.md` paths remain the human-navigable roster; keys match `name` frontmatter except the single documented alias.
