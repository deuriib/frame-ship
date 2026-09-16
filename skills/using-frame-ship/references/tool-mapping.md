# Tool Mapping — using-frame-ship

> Skills speak in actions, not harness tool names. Resolve per harness below.
> Default harness today is opencode; add rows as new harnesses land.

## Orchestrator-only dispatch rule (all harnesses)

**orchestrator-only dispatch rule:** **orchestrator dispatches entire team; domain owners/specialists do the work or brief back.** Only the orchestrator (main agent) dispatches subagents. Every other role — domain owners, reviewers, leaves — never dispatches: it does the work end to end, and a cross-domain need returns **inside the agent's return** as a formal **Cross-domain request** brief to the orchestrator (Need + Reason + Suggested owner + Urgency); the orchestrator delegates to the right role or resolves. No sideways dispatch, no self-approval. Generic fallback: a harness without a subagent mechanism runs **single mode** (direct execution, no task — see Rules).

## opencode (native)

- "Invoke a skill" / "load stage skill" → `skill` tool. MANDATORY BEFORE any task/edit/bash/task dispatch — single AND multi. No skill = STOP.
- "Understand domain role" → domain owner/specialist understands their domain's practices. MANDATORY with every skill load: skill = process, role = craft.
- "Create a todo" / "mark complete" → `todowrite`.
- "Dispatch a subagent" → `task` tool with `subagent_type="general"` (general-purpose) — **orchestrator-only**:
  - Prompt MUST include: (1) read stage `skills/<stage>/SKILL.md`, (2) understand domain role, (3) accept `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` by reference only, (4) return deliverable + file list + risks + assumptions + scoped evidence.
  - Roles: orchestrator dispatches entire team; domain owners/specialists do the work or brief back — only the orchestrator dispatches. Canonical 8 business domains: engineering (engineering owner), security (security owner), finance (finance owner), legal (legal owner), marketing/brand (marketing owner), people (people owner), revenue (revenue owner), automation/ops (automation owner + engineering owner mechanics).
  - Leaf + reviewers: domain specialists who understand their domain's practices — run INSIDE dispatched subagents that first understand their role.
  - Fast-path: `subagent_type: "general"` for small fully-specified units, `"explore"` for read-only codebase exploration — still requires skill + role understanding first.
- "Read a file" → `read`.
- "Create / edit a file" → `apply_patch` (via edit tools).
- "Run a shell command" → `bash`.
- "Search file contents" / "find files by name" → `grep`, `glob`.
- "Fetch a URL" → `webfetch`.

## Other harnesses (provisional — only opencode verified)

- **Codex**: dispatching → `spawn_agent` (start), `followup_task` (continue), `wait_agent` (collect). Same orchestrator-only rule, max 2 parallel, reference-only packets, no-subagents contract on leaves. Provisional per SPEC §5 (full verification deferred; open question → HANDOFF lessons).
- **Generic harness (no subagent tool)**: **fallback to single mode** — direct execution, no `task`; note the substitution in the artifact.

## Rules

- Prefer native tools over shell equivalents for file operations.
- MANDATORY LOAD ORDER (single AND multi): skill(stage) → understand domain role → act. No task/edit/bash before both. FAIL → retry N=2 → escalate to orchestrator.
- single mode: NO task dispatch — direct execution after skill + role. multi-subagents: **orchestrator-only** `task(general)`, each ordered to understand domain role first; orchestrator dispatches entire team; domain owners/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to the orchestrator, who delegates or resolves.
- Never paste full context between stages — pass references (paths + IDs).
- When a harness lacks a native tool, use the closest equivalent and note the
  substitution in the artifact.
