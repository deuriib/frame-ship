# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- C-level chat roster declutter: optional `hidden` in `AGENTS_MANIFEST` + `config.agents`/`config.agent` mirror; 8 C-level `mode:all` `hidden:true` (`barrera`, `dauhajre`, `espinoza`, `montero`, `santana`, `subero`, `vasquez`, `vera`), `montilla` visible, 0 subagent flags; backward-compatible exact shape `hidden:true` ([engineering], SPEC-hidden-flag-engineering; gate OPEN 4/4, DoD PASS; restart opencode to take effect).

## [v0.6.0] — 2026-09-17

### Added

- Agent roster in the single-file plugin: static 74-key `AGENTS_MANIFEST` (`montilla` primary + 8 C-levels + 65 specialists, `espinoza-specialist` alias) + loader (`resolveAgentsDir`, `readTextFile`, `parseAgentFile`) + `config.agents`/`config.agent` mirror with `default_agent="montilla"` + `subagent_depth=2`, never clobbering user overrides ([engineering], SPEC-agents-into-plugin-engineering; gate OPEN 6/6, DoD PASS; `.opencode/plugins/frame-ship.ts` v0.6.0, 403 lines, zero deps, restart opencode to take effect).
- Loader hardening: BOM/whitespace strip + unclosed-fence fallback, guarded defaults on miss lanes, `READ_TIMEOUT_MS=2000` race-as-miss, independent mirror records ([engineering], same spec; remediation `253c94e`, `92a4941`, `ab64ca1`, `14eaa4e`, evidence matrix C-001..C-005).

### Known issues

- Plugin-only ship per CEO ruling: `agents/` stays untracked — fresh-clone installs run degraded via graceful miss lanes until roster packaging is resolved (track after secret/PII scan, or external roster source). No breaking changes; rollback = single-file `git revert`, ETA < 15 min.

## [v0.5.0] — 2026-09-17

### Added

- Antigravity CLI (agy) plugin at repo root: `plugin.json` + `hooks.json` + `hooks/*.ts` via bun (context-inject PreInvocation, safety-gate PreToolUse, format-note PostToolUse) + `rules/frame-ship.md` verbatim cards, 1:1 context parity with the opencode plugin, `skills/` reused verbatim ([engineering, security, automation/ops], SPEC-agy-plugin-engineering; gate OPEN 5/5 + waiver, DoD PASS).
- git-worktree supporting skill: isolated parallel SPEC lanes (max-2, repo-local worktrees) with fail-closed hygiene + consent/announce flow ([engineering, automation, security, people], SPEC-git-worktree-engineering, SPEC-git-worktree-automation, SPEC-git-worktree-security, SPEC-git-worktree-people; gate OPEN 9/9, DoD 47/47).
- Supporting skills integration: `git-worktree`, `debugging`, `pull-request` formally catalogued in `skills/AGENTS.md` (13 dirs) + opt-in triggers in `using-frame-ship` + conditional `Previous`/`Supporting`/`Next` in Chain Contracts of `propose-changes`, `execute-spec`, `quality-gate` ([engineering], SPEC-supporting-skills-integration; gate OPEN 4/4, DoD PASS).
- debugging supporting skill: Iron Law + 4-phase root-cause before fixes with 3-failure rule (stop after 3 failed fixes, question architecture, escalate — never silent Fix #4); `skills/debugging/SKILL.md` + 3 refs (root-cause-tracing, defense-in-depth, condition-based-waiting) ([engineering, automation/ops], SPEC-debugging-engineering; gate OPEN 6/6 incl. security + automation, DoD 6/6 TEST_MATRIX-debugging).
- pull-request supporting skill: frame-ship port of Gentle AI `branch-pr v2.0` — branch naming + PR body template + 400-line review budget + Conventional Commits, local checks mapped to `mise run typecheck` ([engineering, automation/ops], SPEC-pull-request; min gate OPEN 4/4, DoD PASS, review-security/architecture waived with rationale).

### Changed

- `frame-intent` classify-first elicitation: spike/bounded/architectural classification + HARD-GATE + one-at-a-time questions + 2–3 framings/YAGNI + decompose rule + sectioned approval + self-review + Red Flags ([engineering, people], SPEC-brainstorm-frame-intent-engineering; ADR-006; gate OPEN 5/5, DoD PASS). Brief template gains `Classification`/`Framings-considered`/`Approval` fields; outputs stay BRIEF + OKRs.

### Removed

- `skills/using-frame-ship/references/tool-mapping.md` (engineering, SPEC-remove-tool-mapping-engineering): CEO-only dispatch contract now single-sourced in `using-frame-ship/SKILL.md` + checklist + AGENTS.md + plugin; SKILL §3/§5 reworded, zero live pointers (gate OPEN, DoD PASS).
- `README.md` stale `tool-mapping` prose (engineering, SPEC-residual-cleanup-engineering): L97 descriptor + L236 roadmap clause reworded; front-door exact, roadmap honestly still pending (gate OPEN, DoD PASS).

## [v0.4.0] — 2026-09-16

### Added

- Per-stage commit closings (guidance only): every stage SKILL.md ends with a work-unit commit step + copy-paste example; shared format lives in `skills/using-frame-ship/references/commit-convention.md`.
- `execute-spec` per-task rule: one commit per approved task/REQ-ID with `REQ-ID → test → artifact` in body; `implementation-plan.md` steps map 1:1 to commits; `test-matrix.md` gains `Commit` column.

### Changed

- Removed vendored agent templates (`agents/` — 69 files, 9 subdirs): skills now reference domain roles directly without requiring template reads; simplifies dispatch model across all 9 stages.
- Simplified dispatching: removed `task(subagent_type="general")` max 2 parallel with template-read orders; replaced with domain role understanding (skills/execute-spec, skills/quality-gate, skills/frame-intent).
- Fixed workspace path convention: `<agent>` → `<domain>` in `docs/specs/40_workspace/<domain>/` paths (skills/propose-changes, skills/review-architecture, skills/review-security).
- Updated `skills/AGENTS.md`: removed vendored craft references, simplified role owner descriptions, removed execution mode template references.
- Updated `skills/quality-gate/references/gate-report.md`: Load Evidence checklist now checks domain role understanding instead of template reads.

### Removed

- `agents/` directory (69 files, 9 subdirs): vendored agent templates removed from repo root; skills reference domain roles directly.

## [v0.3.3] — 2026-09-16

### Changed

- Commit convention rewritten with work-unit scope syntax `type(<stage>/<work-unit>): subject` for all 9 stages; splitting rules mandate separate commits per distinct work unit (REQ-ID, brief, spec, proposal, ADR, review, gate, handoff, release); batching rules allow grouping only when plan explicitly groups or changes are tightly coupled (SPEC-commit-convention-v2; gate OPEN, DoD PASS).

## [v0.3.2] — 2026-09-16

### Changed

- Concise plugin prompt injections: `.opencode/plugins/frame-ship.ts` 223→156 lines (−31.3%, 11,098→7,620 chars), string literals + header only, zero behavior change (INTENT-2026-09-16-concise-plugin-prompts, REQ-001..REQ-006; gate OPEN, DoD PASS; restart required).
- Single `CHAIN` const replaces 4x chain-order literals; guardrails as greppable 1:1 numbered checklist (14/14).

## [v0.3.0] — 2026-09-16

### Added

- MANDATORY LOAD ORDER enforced in plugin + all 9 stage skills: `skill(stage)` + `read(agents/<domain>/<agent>.md)` BEFORE any task/edit/bash, single AND multi-subagents. HARD STOP + retry N=2 → escalate montilla.
- Execution modes frozen: `single` = direct (no task) + skill/template cite; `multi-subagents` = `task(general)` max 2 parallel with read orders in prompt (general-purpose default until agents natively registered).
- 68 agent templates: adapter `when run` → `REQUIRED inside frame-ship` + portable note fixed; dispatched ONE template read fully, rest path-cites.
- Gate + handoff verification: `Load Evidence` section in `gate-report.md`, DoD + `HANDOFF.md` fail without skill/template/mode/packet cites.

## [v0.3.1] — 2026-09-16

### Changed

- Vendored agent craft moved `skills/templates/agents/` → repo-root `agents/` (69 files, 9 subdirs, bytes-exact); live pointers rewritten in 7 files; `skills/templates/` removed (SPEC-003-agents-to-root; refs: `docs/specs/10_design/ADR-002-agents-to-root.md`, `docs/specs/40_workspace/vasquez/HANDOFF-003-agents-to-root.md`).

### Fixed

- Broken `../../templates/agents/README.md` relative links → `../../agents/README.md` resolves (SPEC-003, REQ-005).

### Known issues

- Mixed baseline: 10 tracked `M` files layer SPEC-002 + SPEC-003; committer verifies PASS-worthiness at commit time.
- `docs/briefs|specs/**` old-path strings immutable by design.

## [v0.3.0] — 2026-09-15

### Added

- 68 opencode agents vendored as reference-only templates + `execution_mode: single | multi-subagents` (SPEC-001-agent-templates; see `docs/specs/30_delivery/RELEASE_NOTES.md` v0.3.0-templates entry — old-path strings preserved as history).
