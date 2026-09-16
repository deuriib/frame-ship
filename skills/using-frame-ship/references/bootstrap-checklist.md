# Bootstrap Checklist — using-frame-ship

> Session-start and post-compaction checks. Keep it short — detail lives in stage skills.

## Session start

- [ ] Bootstrap loaded (`using-frame-ship`) before any domain work.
- [ ] Chain order stated: `frame-intent → translate-to-spec → propose-changes → review-* → execute-spec → quality-gate → verify-handoff → ship-release`.
- [ ] Current stage identified by trigger (see SKILL.md §3.2), stage skill loaded via `skill` tool BEFORE any read/edit/bash/task.
- [ ] Dispatched agent template read via `read` (`agents/<domain>/<agent>.md`) — skill + template, every task, single AND multi. Path cited in output.
- [ ] Execution mode declared: `single` (direct, no task) or `multi-subagents` via `task(general)` max 2 parallel with read orders in prompt — orchestrator dispatches entire team; domain owners/specialists do the work or brief back (cross-domain need → formal Cross-domain request brief to the orchestrator).
- [ ] Hard rules acknowledged:
  - [ ] NEVER code without approved `PROPOSED_CHANGES.md`.
  - [ ] NEVER skip `review-security` for auth/data/API.
  - [ ] NEVER modify contracts without ADR.
  - [ ] NEVER hand off on CLOSED gate without domain owners + orchestrator waiver record.
  - [ ] ALWAYS trace `REQ-ID → test → artifact → gate verdict`.
  - [ ] ALWAYS produce `HANDOFF.md` before shipping.
  - [ ] Reference-only packets between stages.

## Post-compaction resume

- [ ] `using-frame-ship` re-loaded first.
- [ ] Active stage + spec ID + gate verdicts + `execution_mode` restored from trace.
- [ ] Next stage skill loaded + agent template re-read before continuing.
- [ ] No code written until proposal approval is re-confirmed.
- [ ] No task/edit/bash until skill + template verified (STOP otherwise).

## Domain catalogue (canonical — 8, full chain for all)

- [ ] Domains resolved from `skills/AGENTS.md`: engineering (engineering owner), security (security owner), finance (finance owner), legal (legal owner), marketing/brand (marketing owner), people (people owner), revenue (revenue owner), automation/ops (automation owner + engineering owner).
- [ ] Spec packet carries `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` — never paste full context.
- [ ] Data (`review-data`) treated as cross-cutting lens, not a 9th domain.
