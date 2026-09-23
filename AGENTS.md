# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-21 07:30 UTC-4
**Commit:** 2a75ef7
**Branch:** main

## OVERVIEW
Agentic skills framework and software delivery methodology plugin for OpenCode and Antigravity CLI.
Creed: *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## STRUCTURE
```text
.
├── agents/             # 31 agent personas (Montilla CEO, 8 domain owners, specialists, reviewers)
├── docs/               # Artifact store: briefs/ (intent) and specs/ (lifecycle 10->50)
├── plugins/            # Runtime adapters: OpenCode plugins (split lanes) and Antigravity CLI hooks
├── rules/              # Context rules: frame-ship.md, guardrails.md, skills.md, subagents.md
├── scripts/            # Repository automation (bump-version.mjs)
└── skills/             # 12 process skills (9 core chain stages + 2 supporting)
```

## WHERE TO LOOK
| Task / Role | Location | Notes |
|---|---|---|
| Methodology chain & bootstrap | `skills/using-frame-ship/` | Pre-injected at session start; DO NOT reload |
| Strategy & briefs | `docs/briefs/`, `skills/frame-intent/` | BRIEF-<slug>.md + paired OKR-*.md |
| Specs & requirements | `docs/specs/15_requirements/`, `skills/translate-to-spec/` | REQ-F/NF-001 IDs + ARCHITECTURE.md |
| Proposals & implementation | `docs/specs/40_workspace/`, `skills/propose-changes/` | PROPOSED_CHANGES.md before any code edit |
| Multi-domain quality gate | `skills/quality-gate/`, `agents/` | 1 subagent per reviewer, independent evaluations |
| Version sync & release | `scripts/bump-version.mjs`, `skills/ship-release/` | Lockstep across 7 files; moves spec to 50_archive/ |
| Harness adapters | `plugins/opencode/`, `plugins/antigravity/` | Zero-dep split runtime (skills/agents/shared + composed entry) + PreInvocation hooks |

## CODE MAP
- `plugins/opencode/skills.ts`: OpenCode skills plugin (id `frame-ship`); registers skills, injects prompt card and live bootstrap.
- `plugins/opencode/guardrails.ts`: OpenCode guardrails plugin (id `frame-ship-guardrails`); injects full `rules/guardrails.md` on context + minimal one-liner-per-domain set on compaction (marker `[frame-ship-guardrails v…]`).
- `plugins/opencode/agents.ts`: OpenCode agents plugin (id `frame-ship-agents`); provisions the 31-agent roster, sets orchestrator default.
- `plugins/opencode/frame-ship.ts`: composed entry (`package.json` `main`); runs all three lanes under id `frame-ship`.
- `plugins/opencode/shared.ts`: version lockstep target + bounded filesystem helpers (not a plugin).
- `plugins/antigravity/hooks/context-inject.ts`: Antigravity PreInvocation hook; injects rules and bootstrap on invocation 0.
- `plugins/antigravity/hooks/safety-gate.ts`: PreToolUse hook intercepting `run_command` against dangerous commands and secrets.
- `plugins/antigravity/hooks/format-note.ts`: PostToolUse hook draining file modification notifications.
- `scripts/bump-version.mjs`: Synchronizes semver across manifests, prompt cards, and rule files.
- `agents/orchestrator.md`: Montilla (CEO), sole dispatcher across the entire agent fleet.

## CONVENTIONS
- **Chain order**: `frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`.
- **Load order**: `using-frame-ship` pre-loaded. Load `<stage>` skill ONCE at start of stage. No skill = STOP. External skills: after the stage skill, at most 1-2 on trigger match; chain wins on conflict (see `rules/skills.md`).
- **Execution mode**: `subagents` is the sole execution mode. Orchestrator dispatches all roles; specialists never self-dispatch.
- **Inter-stage communication**: Reference-only 4-tuple envelopes (`SPEC:<path>#<anchors> / HARD:subagents+<constraints> / GATE:<verdict> / DOMAINS:<list>`). Never paste full context.
- **Traceability**: Strict `REQ-ID → test → artifact → gate verdict` chain.
- **Singleton working files**: Working files per lane (`PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `GATE_REPORT.md`, `HANDOFF.md`) are singletons; never add suffixes.
- **Reviewer independence**: Exactly 1 dedicated subagent per reviewer (`1 subagent per reviewer`). Never bundle.
- **Tool permissions**: File edits permitted to all agents; `run_command` restricted strictly to technical specialists (`engineering`, `automation`, `qa`).
- **Retry budget**: `FAIL → retry N=2 differently → escalate to orchestrator`. No third loop, no sideways.

## ANTI-PATTERNS (THIS PROJECT)
- Writing code without an approved `PROPOSED_CHANGES.md` (Hard Rule 1).
- Bundling multiple reviewer roles into a single subagent during quality gate.
- Copy-pasting full spec or artifact text between stages instead of reference envelopes.
- Re-reading or re-loading `using-frame-ship` via the skill tool during a session.
- Specialists self-dispatching or calling peer specialists sideways.
- Using retired execution mode names (`single`, `multi-subagents`).
- Modifying `docs/specs/50_archive/` or leaving active specs outside `20_backlog/`.
- Leaving scratch drafts or gate records in `docs/specs/40_workspace/` after release archive.
- Using `sleep()` in tests or code; condition-based waiting with deadlines only.
- Unmasked PII or credentials in logs, gate reports, or error messages (Ley 172-13).

## COMMANDS
```bash
npm run typecheck        # Verify OpenCode plugin TypeScript compilation without emit
npm run version:check    # Verify version lockstep across all 7 target files
npm run bump -- --sync   # Synchronize version across repository to match package.json
node scripts/bump-version.mjs <patch|minor|major> --changelog # Bump version and update changelog
```

## NOTES
- Version lockstep: [frame-ship v0.11.0] — bump with `plugins/opencode/shared.ts` + `plugins/antigravity/hooks/context-inject.ts`.
- Zero runtime dependencies: `@opencode/plugin` is compile-time only. Filesystem operations use `Bun.file` with dynamic `node:fs` fallback.
- Windows file URLs in `fileUrlToPath` require stripping leading slashes before drive letters (`/D:/...` -> `D:/...`).

