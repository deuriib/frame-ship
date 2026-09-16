# Tool Mapping — using-frame-ship

> Skills speak in actions, not harness tool names. Resolve per harness below.
> Default harness today is opencode; add rows as new harnesses land.

## opencode (native)

- "Invoke a skill" / "load stage skill" → `skill` tool.
- "Create a todo" / "mark complete" → `todowrite`.
- "Dispatch a subagent" → `task` tool with real `subagent_type` names (vendored in `agents/<domain>/<agent>.md`):
  - C-level orchestrators (`mode: all|primary`): `montilla, vasquez, dauhajre, subero, vera, santana, barrera, montero, espinoza` — only they dispatch across domains. Canonical 8 business domains: engineering (vasquez), security (barrera), finance (dauhajre), legal (subero), marketing/brand (vera), people (santana), revenue (montero), automation/ops (espinoza + vasquez mechanics).
  - Leaf + reviewers (`mode: subagent`): `architect, backend, frontend, devops, data-engineer, qa, review-readability, review-reliability, review-resilience, review-risk, review-refuter, review-data, security, security-reviewer` + domain specialists (`finance-reviewer, legal-reviewer, brand-reviewer, people-reviewer, revenue-reviewer, automation-reviewer`) — dispatched only by owning C-level with `SPEC/HARD/GATE/DOMAINS` packet.
  - Fast-path: `subagent_type: "general"` for small fully-specified units, `"explore"` for read-only codebase exploration.
- "Read a file" → `read`.
- "Create / edit a file" → `apply_patch` (via edit tools).
- "Run a shell command" → `bash`.
- "Search file contents" / "find files by name" → `grep`, `glob`.
- "Fetch a URL" → `webfetch`.

## Rules

- Prefer native tools over shell equivalents for file operations.
- Never paste full context between stages — pass references (paths + IDs).
- When a harness lacks a native tool, use the closest equivalent and note the
  substitution in the artifact.
