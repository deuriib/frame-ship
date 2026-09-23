# frame-ship — skills

## Skills (chain + external, non-negotiable)

- Chain first: `using-frame-ship` is pre-loaded, never re-load it. Load the active `frame-ship:<stage>` skill ONCE per stage via the skill tool. No skill = STOP.
- External second: after the stage skill is loaded, proactively load at most 1-2 external skills when the trigger matches the task (language, platform, tool). Name the trigger + skill path in output.
- Precedence: chain wins on conflict. External skills never waive proposal-before-code, security/architecture review, CLOSED-gate waiver, or the `REQ-ID → test → artifact → gate verdict` trace.
- Reference-only: cite external guidance by path + anchor, never paste full bodies into packets or between subagents.
