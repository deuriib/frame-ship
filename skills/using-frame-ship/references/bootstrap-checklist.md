# Bootstrap Checklist — using-frame-ship

> Session-start and post-compaction checks. Keep it short — detail lives in stage skills.

## Session start

- [ ] Bootstrap loaded (`using-frame-ship`) before any domain work.
- [ ] Chain order stated: `frame-intent → translate-to-spec → propose-changes → review-* → execute-spec → quality-gate → verify-handoff → ship-release`.
- [ ] Current stage identified by trigger (see SKILL.md §3.2), stage skill loaded via `skill` tool.
- [ ] Hard rules acknowledged:
  - [ ] NEVER code without approved `PROPOSED_CHANGES.md`.
  - [ ] NEVER skip `review-security` for auth/data/API.
  - [ ] NEVER modify contracts without ADR.
  - [ ] NEVER hand off on CLOSED gate without c-levels + CEO waiver record.
  - [ ] ALWAYS trace `REQ-ID → test → artifact → gate verdict`.
  - [ ] ALWAYS produce `HANDOFF.md` before shipping.
  - [ ] Reference-only packets between stages.

## Post-compaction resume

- [ ] `using-frame-ship` re-loaded first.
- [ ] Active stage + spec ID + gate verdicts restored from trace.
- [ ] Next stage skill loaded before continuing.
- [ ] No code written until proposal approval is re-confirmed.
