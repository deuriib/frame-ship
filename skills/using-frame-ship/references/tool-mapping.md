# Tool Mapping — using-frame-ship

> Skills speak in actions, not harness tool names. Resolve per harness below.
> Default harness today is opencode; add rows as new harnesses land.

## opencode (native)

- "Invoke a skill" / "load stage skill" → `skill` tool.
- "Create a todo" / "mark complete" → `todowrite`.
- "Dispatch a subagent" → `task` tool with `subagent_type: "general"` (or `"explore"` for codebase exploration).
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
