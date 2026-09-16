# Tool Mapping — using-frame-ship

> Skills speak in actions, not harness tool names. Resolve per harness below.
> Default harness today is opencode; add rows as new harnesses land.

## CEO-only dispatch rule (all harnesses)

**CEO-only dispatch rule (ADR-003):** **CEO dispatches entire team; c-levels/specialists do the work or brief back.** Only `montilla` (CEO / main agent) dispatches subagents — `task(general)` (or harness equivalent) max 2 parallel in multi mode. Every other role — C-levels, reviewers, leaves — never dispatches: it does the work end to end, and a cross-domain need returns **inside the agent's return** as a formal **Cross-domain request** brief to the CEO (Need + Reason + Suggested owner + Urgency); the CEO delegates to the right agent or resolves. No sideways dispatch, no self-approval. Generic fallback: a harness without a subagent mechanism runs **single mode** (direct execution, no task — see Rules).

## opencode (native)

- "Invoke a skill" / "load stage skill" → `skill` tool. MANDATORY BEFORE any task/edit/bash/task dispatch — single AND multi. No skill = STOP.
- "Read agent craft" → `read` on `agents/<domain>/<agent>.md`. MANDATORY with every skill load: skill = process, template = craft. Cite path in output. Never paste full bodies of OTHER roles — only your dispatched role.
- "Create a todo" / "mark complete" → `todowrite`.
- "Dispatch a subagent" → `task` tool with `subagent_type="general"` (general-purpose; approved default until agents are natively registered) — **CEO-only, max 2 parallel**:
  - Prompt MUST include: (1) read stage `skills/<stage>/SKILL.md`, (2) read `agents/<domain>/<agent>.md` for the assigned role, (3) accept `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` by reference only, (4) return deliverable + file list + risks + assumptions + scoped evidence.
  - Roles: CEO dispatches entire team; c-levels/specialists do the work or brief back — only `montilla` (CEO) dispatches. Canonical 8 business domains: engineering (vasquez), security (barrera), finance (dauhajre), legal (subero), marketing/brand (vera), people (santana), revenue (montero), automation/ops (espinoza + vasquez mechanics).
  - Leaf + reviewers (craft in `agents/<domain>/<agent>.md`: `architect, backend, frontend, devops, data-engineer, qa, review-readability, review-reliability, review-resilience, review-risk, review-refuter, review-data, security, security-reviewer` + domain specialists (`finance-reviewer, legal-reviewer, brand-reviewer, people-reviewer, revenue-reviewer, automation-reviewer`)): run INSIDE `general` subagents dispatched by the CEO that first read their template — never as raw `subagent_type` names until natively registered.
  - Fast-path: `subagent_type: "general"` for small fully-specified units, `"explore"` for read-only codebase exploration — still requires skill + template read first.
- "Read a file" → `read`.
- "Create / edit a file" → `apply_patch` (via edit tools).
- "Run a shell command" → `bash`.
- "Search file contents" / "find files by name" → `grep`, `glob`.
- "Fetch a URL" → `webfetch`.

## Other harnesses (provisional — only opencode verified)

- **Codex**: dispatching → `spawn_agent` (start), `followup_task` (continue), `wait_agent` (collect). Same CEO-only rule, max 2 parallel, reference-only packets, no-subagents contract on leaves. Provisional per SPEC §5 (full verification deferred; open question → HANDOFF lessons).
- **Generic harness (no subagent tool)**: **fallback to single mode** — direct execution, no `task`; note the substitution in the artifact.

## Rules

- Prefer native tools over shell equivalents for file operations.
- MANDATORY LOAD ORDER (single AND multi): skill(stage) → read(1 agent template) → act. No task/edit/bash before both. FAIL → retry N=2 → escalate to montilla.
- single mode: NO task dispatch — direct execution after skill + template. multi-subagents: **CEO-only** `task(general)` max 2 parallel, each ordered to read skill + template first; CEO dispatches entire team; c-levels/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to the CEO, who delegates or resolves.
- Never paste full context between stages — pass references (paths + IDs). Only exception: the ONE dispatched template is read fully; all other roles stay path-cites.
- When a harness lacks a native tool, use the closest equivalent and note the
  substitution in the artifact.
