# Bootstrap Checklist — using-frame-ship

> Session-start and post-compaction checks. Keep it short — detail lives in stage skills.

## Session start

- [ ] Bootstrap (`using-frame-ship`) active in context via hook — NEVER re-load via skill tool.
- [ ] Chain order stated: `frame-intent → translate-to-spec → propose-changes → review-* → execute-spec → quality-gate → verify-handoff → ship-release`.
- [ ] Current stage identified by trigger (see SKILL.md §3.2), stage skill loaded ONCE via `skill` tool at stage start (never re-loaded on every read/edit/bash).
- [ ] Domain owner/specialist role understood — skill + role per stage, multi-subagents full-wave. Path cited in output.
- [ ] Execution declared: Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch. Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
- [ ] Hard rules acknowledged:
  - [ ] NEVER code without approved `PROPOSED_CHANGES.md`.
  - [ ] NEVER skip `review-security` for auth/data/API.
  - [ ] NEVER modify contracts without ADR.
  - [ ] NEVER hand off on CLOSED gate without domain owners + orchestrator waiver record.
  - [ ] ALWAYS trace `REQ-ID → test → artifact → gate verdict`.
  - [ ] ALWAYS produce `HANDOFF.md` before shipping.
  - [ ] Reference-only packets between stages.

## Post-compaction resume

- [ ] Active stage + spec ID + gate verdicts + `execution_mode` restored from trace.
- [ ] Stage skill loaded ONCE before continuing (do not re-load on every command/edit).
- [ ] No code written until proposal approval is re-confirmed.

## Domain catalogue (canonical — 8, full chain for all)

- [ ] Domains resolved from `skills/AGENTS.md`: engineering (engineering owner), security (security owner), finance (finance owner), legal (legal owner), marketing/brand (marketing owner), people (people owner), revenue (revenue owner), automation/ops (automation owner + engineering owner).
- [ ] Spec packet carries `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` — never paste full context.
- [ ] Data (`review-data`) treated as cross-cutting lens, not a 9th domain.
