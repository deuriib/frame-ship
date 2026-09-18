# PROPOSED_CHANGES — hidden flag (engineering, single)

**SPEC:** `docs/specs/40_workspace/engineering/SPEC-hidden-flag-engineering.md#REQ-001..004+NF`
**HARD:** single + optional-only + backward-compatible + exact shape `hidden:true`
**GATE:** none-yet
**DOMAINS:** [engineering]
**Execution_Mode:** single

## Files

| File | Op | Change |
|------|----|--------|
| `.opencode/plugins/frame-ship.ts:242-246` | modify | `interface AgentManifestEntry { key; file; mode; hidden?: boolean }` — add `hidden?: boolean;` |
| `.opencode/plugins/frame-ship.ts:257-264` | modify | 8 C-level `mode:"all"` lines append `, hidden: true` — barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera. montilla line untouched. |
| `.opencode/plugins/frame-ship.ts:341-347,372-373` | modify | Mirror types `Record<string, { description; prompt; mode; hidden?: boolean }>` (both `agents` and `agent`) + conditional spread in both `??=` inserts: `...(entry.hidden !== undefined ? { hidden: entry.hidden } : {})` |
| `docs/specs/10_design/ARCHITECTURE.md` | modify | INV-004 line extended: roster-exact + hidden overlay (8× `hidden:true` on C-level all, montilla visible, subagents no flag) |

No other files touched. Subagent manifest lines untouched. Agent markdown untouched. Version triple untouched (v0.6.1).

## Diff sketch

```ts
interface AgentManifestEntry {
  key: string;
  file: string;
  mode: AgentMode;
  hidden?: boolean;
}
{ key: "barrera", file: "c-level/barrera.md", mode: "all", hidden: true },
... (×8, montilla stays { key: "montilla", file: "c-level/montilla.md", mode: "primary" })
...
c.agents ??= {}; c.agent ??= {};
// types gain hidden?: boolean on both Records
if (!hasAgents) (c.agents ??= {})[entry.key] ??= { description: parsed.description, prompt: parsed.prompt, mode: entry.mode, ...(entry.hidden !== undefined ? { hidden: entry.hidden } : {}) };
if (!hasAgent) (c.agent ??= {})[entry.key] ??= { description: parsed.description, prompt: parsed.prompt, mode: entry.mode, ...(entry.hidden !== undefined ? { hidden: entry.hidden } : {}) };
```

## Risk assessment

- Blast radius: config surface only (`config.agents`/`config.agent` hidden flag on 8 keys). Skills lane, injection cards, resolvers, defaults unchanged.
- Reversible: `git revert` of single file restores prior roster; ETA < 5 min.
- Backward-compat: absent `hidden` → object shape byte-identical (conditional spread); host default applies. No key/mode/count change (74 stays).
- Security/Privacy: no secrets/PII in diff; loader still silent on miss, never echoes contents. Trust boundary unchanged (local trusted files → config).
- Failure mode: host ignores unknown `hidden` → harmless extra field on 8 entries; chat roster simply not decluttered (no wedge — inserts still `??=`, never clobber).

## Approvers

- Owning domain owner: vasquez (engineering) — mandatory.
- Architecture impact: review-architecture (contract change: manifest shape + ARCHITECTURE.md INV-004) — required.
- Security: not required (no auth/data/API/PII surface) — review-risk fast check at gate only.

## Trace

REQ-001 → interface line; REQ-002 → 8× hidden:true; REQ-003 → 0 hidden on subagents; REQ-004 → mirror conditional spread; NF-001 → typecheck + diff scope; NF-002 → scan.
