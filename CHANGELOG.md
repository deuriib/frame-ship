# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

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
