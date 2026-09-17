# API Contracts: plugin config surface (agent roster lane)

**Owner:** engineering owner (vasquez)
**Version:** v1
**Last Updated:** 2026-09-17
**Domains-Touched:** [engineering]
**Spec:** `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md`
**Brief Reference:** docs/briefs/BRIEF-agents-into-plugin.md (read-only)

> No HTTP/RPC surface. The complete contract surface is the opencode `config`-hook shape below plus the TS-internal loader signatures. This file is the canonical contract of record; the SPEC §4 summary links here.

## 1. `config.agents` record

```ts
type AgentMode = "primary" | "all" | "subagent";
type AgentEntry = { description: string; prompt: string; mode: AgentMode };
config.agents: Record<string, AgentEntry>; // 74 keys post-init
```

| Key set | Keys | Mode |
|---------|------|------|
| Primary (1) | `montilla` | `primary` |
| C-level (8) | `barrera`, `dauhajre`, `espinoza`, `montero`, `santana`, `subero`, `vasquez`, `vera` | `all` |
| Specialists (65) | all remaining roster keys incl. `espinoza-specialist` (aliases `agents/engineering/espinoza.md`) | `subagent` |

Rules:

- `description`: verbatim from each agent file's own frontmatter `description`; never rewritten.
- `prompt`: file body with frontmatter fences (`---` blocks) stripped; no raw `name:`/`description:` lines leak into prompts.
- Insert rule: `config.agents[key] ??= entry` — existing user keys are never overwritten.
- Excluded from manifest: `agents/AGENTS.md`, `agents/README.md`, `agents/delegation-contract.md`.

## 2. `config.agent` mirror + defaults

```ts
config.agent: Record<string, AgentEntry>; // mirror of config.agents, same ??= rule
config.default_agent ??= "montilla";
config.subagent_depth ??= 2;
```

- Mirror exists for harness compat (`agents` plural + `agent` singular both served).
- Defaults apply only when unset — user-configured `default_agent` / `subagent_depth` win.

## 3. Loader signatures (TS-internal, single-file)

```ts
resolveAgentsDir(fallbackBase: string): string;
// <root>/agents from own import.meta.url; fallback (directory || worktree) + "/agents"; no static node: import.

readTextFile(path: string): Promise<string>;
// Bun.file(path).text() first; dynamic import("node:fs/promises").readFile fallback; "" on miss.

parseAgentFile(raw: string): { description: string; prompt: string };
// First ---...--- fence → description (description: "..." or '...'); remainder trimmed → prompt.
```

Constraints: zero static `node:` imports (dynamic only, `@ts-ignore` precedent); per-path cache allowed; failures skip the entry, never throw init.

## 4. Idempotency contract

- `skills.paths`: `includes()` guard before push (existing, unchanged).
- `config.agents` / `config.agent`: `??=` per key (new).
- `default_agent` / `subagent_depth`: `??=` (new).
- Verify: run `config` hook twice over the same object → `JSON.stringify` before == after second run (no duplicates, no clobber).

## 5. Version contract

`frame-ship.ts` header comment + `VERSION` + `MARKER` bump together (triple); `.opencode/plugins/AGENTS.md` version ref follows in the same commit. Marker stays greppable: `[frame-ship vX.Y.Z]`.

## 6. Worked example (post-init excerpt, illustrative keys)

```json
{
  "default_agent": "montilla",
  "subagent_depth": 2,
  "agents": {
    "montilla": { "description": "Montilla — CEO, default strategic entry point…", "prompt": "# Montilla — CEO\n…", "mode": "primary" },
    "vasquez": { "description": "vasquez — Senior CTO…", "prompt": "# Vasquez — Senior CTO…", "mode": "all" },
    "espinoza-specialist": { "description": "Pragmatic automation consultant…", "prompt": "# Espinoza - Automation Consultant\n…", "mode": "subagent" }
  }
}
```

(`description`/`prompt` truncated here; canonical values are the agent files themselves.)
