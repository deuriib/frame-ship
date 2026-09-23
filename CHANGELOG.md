# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [v0.11.0] — 2026-09-23

### Added

- `rules/skills.md`: skill-loading policy — chain skills first (`using-frame-ship` pre-loaded, stage skill ONCE, no skill = STOP), then at most 1-2 external skills on trigger match; chain wins on conflict; external skills never waive hard rules, gates, or load order; cite by path + anchor (reference-only). Loaded natively from `rules/` on agy; distilled into `POINTERS` on OpenCode.
- `rules/frame-ship.md`: `## External skills (complement the chain)` section mirroring the policy above.

### Changed

- `skills/using-frame-ship` MANDATORY LOAD ORDER step 2 now states the external-skills complement (after stage skill, budget of 1-2, precedence, reference-only).
- `POINTERS` skills line replaces the vague "always load skills proactively" wording with the chain-first + external budget rule; `COMPACTION_REMINDER` typo (`metions`) fixed.
- `AGENTS.md` + `skills/AGENTS.md` document the internal-vs-external loading convention and list all four `rules/` files.
- `rules/subagents.md` wording simplified (dropped retired `multi-subagents` mode mention).

## [v0.10.0] — 2026-09-22

### Removed

- Standalone `skills/git-worktree/` skill (SKILL + 4 refs): merged into `skills/execute-spec/references/worktree-annex.md` as a supporting annex. Plugin now registers 12 `frame-ship:<stage>` skills (was 13); `frame-ship:git-worktree` trigger retired — parallel lanes are invoked via `execute-spec` + the annex. Security guards, pwsh flow, and people announce wording preserved by reference inside the annex.

### Added

- `skills/ship-release/references/archive-record.md`: `50_archive/<spec-id>/ARCHIVE-RECORD.md` template (spec, gate verdict, commits, tag, promoted/purged lists, ADR link, rollback plan).
- `skills/using-frame-ship/references/challenge-round.md`: single source for shared C1–C4 opt-in challenge mechanics (glossary, opener/exit, one-at-a-time, warmth, masking Ley 172-13, N+1, stall breaker).

### Changed

- `ship-release` archive is now promote-then-purge in 5 ordered substeps: `git mv` to `50_archive/<spec-id>/`, promote `GATE_REPORT.md` + `HANDOFF.md` BEFORE purging, write `ARCHIVE-RECORD.md`, purge allowlist only (`PROPOSED_CHANGES`/`IMPLEMENTATION_PLAN`/`TEST_MATRIX`/`HANDOFF` of that spec + `quality-gate/<spec-id>/`), verify other lanes untouched. Purging evidence without promoting it is now an explicit violation.
- `ship-release` refs 6 → 3 core (`release-notes`, `changelog`, `documentation-checklist` + `archive-record`); `readme`/`install`/`migration-guide` templates conditional on `ship-type=deploy` with breaking changes.
- Singleton-per-lane naming fixed as the single convention: scope comes from the directory (`<domain>/`, `quality-gate/<spec-id>/`), never from `-*` filename suffixes; kebab-case only for per-reviewer gate verdicts. `docs/AGENTS.md` + `docs/specs/AGENTS.md` corrected (they previously mandated `<spec-id>` suffixes).
- ADRs are now conditional: only when a change breaks/creates an invariant, adds a component, or changes a cross-domain contract — within-contract changes get an architecture review only, no ADR. `Status: proposed` with code already merged = gate FAIL.
- Duplicate `ADR-002` renumbered to `ADR-012-agents-to-root.md` (one number = one file, numbers never reused); `ADR-007-grilling-integration` `proposed` → `accepted`.
- Ghost `API_CONTRACTS.md` reference removed from `translate-to-spec` + `review-architecture` (file never existed; interfaces live in `ARCHITECTURE.md` Components table); `architecture-template.md` moved to `review-architecture/` as template owner.
- C1 (`frame-intent`), C2 (`propose-changes`), C3 (`quality-gate`), C4 (`verify-handoff`) reduced to trigger + budget lines citing the shared `challenge-round.md`.

## [v0.9.0] — 2026-09-22

### Changed

- Split the single-file OpenCode plugin into two independent plugins plus a shared module:
  - `plugins/opencode/skills.ts` (id `frame-ship`): skills lane, system injection (workflow card + pointers + bootstrap), compaction reminder.
  - `plugins/opencode/agents.ts` (id `frame-ship-agents`): agents lane (parse, provision, transform, orchestrator default).
  - `plugins/opencode/guardrails.ts` (id `frame-ship-guardrails`): guardrails lane — full `rules/guardrails.md` injected on session context, minimal one-line-per-domain set injected on compaction so the guardrails survive context compression behind the `[frame-ship-guardrails v…]` marker; falls back to the minimal set when the rules file is unreadable.
  - `plugins/opencode/shared.ts`: version lockstep target (header + `const VERSION`) + bounded filesystem helpers; no default export, never listed as a plugin entry.
  - `plugins/opencode/frame-ship.ts` becomes the composed entry point (still `package.json` `main`) that runs all three lanes under the original id — package installs and existing `plugins: ["./plugins/opencode/frame-ship.ts"]` entries keep full behavior with zero changes. Never list it together with `skills.ts`.
- Version lockstep bump target moved from `plugins/opencode/frame-ship.ts` to `plugins/opencode/shared.ts` (7-file lockstep count unchanged).
- `mise run typecheck` now checks all five plugin sources with `--moduleResolution bundler`, mirroring how the loader resolves the extensionless relative imports between the split files.

## [v0.8.0] — 2026-09-21

### Added

- Canonical repository-local agent subsystem in `/agents` containing 31 structured agent definitions across 4 architectural tiers:
  - Tier 1: 1 Orchestrator (`orchestrator.md` / `montilla`) as primary chain entry (`mainAgent: true`) and sole dispatcher.
  - Tier 2: 8 Domain Owners (`vasquez.md`, `barrera.md`, `dauhajre.md`, `subero.md`, `vera.md`, `santana.md`, `montero.md`, `espinoza.md`) governing domain chain execution and gates (`mainAgent: true`, `subagent: true`).
  - Tier 3: 8 Fused Domain Specialists (`engineering-specialist.md`, `security-specialist.md`, `finance-specialist.md`, `legal-specialist.md`, `marketing-specialist.md`, `people-specialist.md`, `revenue-specialist.md`, `automation-specialist.md`) consolidating previous 70+ fragmented micro-roles into 1 authoritative craftsman per domain (`subagent: true`).
  - Tier 4: 14 Methodological Quality Gate Reviewers (7 engineering wave + 7 domain gate auditors) with independent verification roles (`subagent: true`).
- Universal File Authoring: Enabled `write_to_file` and `replace_file_content` across all 31 agents in `agents/` ensuring all roles can author artifacts, specifications, audit findings, and reports, while command execution (`run_command`) remains strictly restricted to authorized execution specialists (`engineering-specialist`, `automation-specialist`, `quality-assurance`).
- Comprehensive rename of QA to `quality-assurance`: Renamed `agents/qa.md` to `agents/quality-assurance.md`, renamed `skills/quality-gate/references/engineering/qa-review.md` to `quality-assurance-review.md`, and updated all routing tables, checklists, and gate report templates across `skills/` and `agents/`.
- Formally recorded architectural decision `ADR-010-canonical-agents-roster.md` in `docs/specs/12_adr/` and updated `docs/specs/10_design/ARCHITECTURE.md` to v1.1 formalizing invariants INV-009 through INV-012.

### Changed

- Standardized operational execution nomenclature from `multi-subagents` to `subagents` across all active stage skills, reference templates, catalogs (`AGENTS.md`), and packet envelopes (`HARD:subagents+<constraints>`).
- Formalized canonical contract string `W-SUBAGENTS` and indexed `ADR-009-subagents-naming.md` in `docs/specs/12_adr/`.
- Preserved historical immutability under Option A (past releases, closed gate reports in `40_workspace/`, and completed briefs remain untouched).
- Standardized execution mode to `multi-subagents` across the Frame→Ship chain (`skills/translate-to-spec/`, `skills/execute-spec/`, `skills/quality-gate/`, `skills/git-worktree/`, and canonical templates). Removed the dual-track `single` methodological mode everywhere in-chain.
- Defined deterministic sequential degradation contract (W-SEQ) for single-thread or non-task harnesses, maintaining full-wave gate and review rigor without silent downgrade.
- Unified quality gates to full-wave only with adversarial `review-refuter` prior to `qa` (min-gate removed).
- Recorded architectural decision `ADR-008-multi-default.md` in `docs/specs/10_design/`.

## [v0.7.0] — 2026-09-19

### Added

- V2-only port (`plugins/opencode/frame-ship.ts`, `Plugin.define({ id: "frame-ship" })`, `@opencode/plugin@2.0.9`): skills lane via `ctx.skill.transform` (13 `frame-ship:<stage>` skills, never overwriting user skills), system injection via `ctx.session.hook("context")` as `{type:"text", text}` parts (workflow card + guardrails + pointers + live `using-frame-ship` bootstrap, idempotent), compaction reminder via `ctx.session.hook("compaction")`.
- `plugins/opencode/package.json` directory manifest (`main: ./frame-ship.ts`) marking the explicit plugin root; `.ts` path unchanged.
- `plugins/opencode/INSTALL.md` rewritten for V2 (package install via `opencode plugin add`, local file via `.opencode/plugins/`, V2 behavior deltas).

### Changed

- Path resolvers now match the kept layout (`<root>/plugins/opencode/frame-ship.ts` → `<root>/skills|agents`); `mise run typecheck` runs from repo root against the real path.
- `hasMarker()` accepts V2 `{type:"text", text}` system parts (string parts still accepted).

### Removed

- V1 implementation: `@opencode-ai/plugin` dep, `config` hook, `experimental.chat.system.transform` / `experimental.session.compacting` hooks, `config.agents`/`config.agent` mirror writes, `default_agent`/`subagent_depth` writes (V2 has no `subagent_depth` equivalent).

### Known issues

- Agent roster degrades gracefully: V2 `AgentEditor` has no `add`, so the 74-key manifest updates existing agents in place only (verified: `general`/`explore` pick up roster body + mode) and skips missing keys; `montilla` default applies only when present. File-based `.opencode/agents/` discovery is the V2-native path for new agents (follow-up, needs layout change).
- Live model-request hook firing not exercised against a model (insufficient account funds at verify time); hook logic + idempotency proven via mock harness (4 context parts + marker, 1 compaction part, rerun adds 0) and 13/13 skills + `active` status via server API.

## [v0.6.1] — 2026-09-17

### Added

- C-level chat roster declutter: optional `hidden` in `AGENTS_MANIFEST` + `config.agents`/`config.agent` mirror; 8 C-level `mode:all` `hidden:true` (`barrera`, `dauhajre`, `espinoza`, `montero`, `santana`, `subero`, `vasquez`, `vera`), `montilla` visible, 0 subagent flags; backward-compatible exact shape `hidden:true` ([engineering], SPEC-hidden-flag-engineering; gate OPEN 4/4, DoD PASS; restart opencode to take effect).
- Agent roster in the single-file plugin: static 74-key `AGENTS_MANIFEST` (`montilla` primary + 8 C-levels + 65 specialists, `espinoza-specialist` alias) + loader (`resolveAgentsDir`, `readTextFile`, `parseAgentFile`) + `config.agents`/`config.agent` mirror with `default_agent="montilla"` + `subagent_depth=2`, never clobbering user overrides ([engineering], SPEC-agents-into-plugin-engineering; gate OPEN 6/6, DoD PASS; `.opencode/plugins/frame-ship.ts` v0.6.1, 403 lines, zero deps, restart opencode to take effect).
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
- MANDATORY LOAD ORDER enforced in plugin + all 9 stage skills: `skill(stage)` + `read(agents/<domain>/<agent>.md)` BEFORE any task/edit/bash, single AND multi-subagents. HARD STOP + retry N=2 → escalate montilla.
- Execution modes frozen: `single` = direct (no task) + skill/template cite; `multi-subagents` = `task(general)` max 2 parallel with read orders in prompt (general-purpose default until agents natively registered).
- 68 agent templates: adapter `when run` → `REQUIRED inside frame-ship` + portable note fixed; dispatched ONE template read fully, rest path-cites.
- Gate + handoff verification: `Load Evidence` section in `gate-report.md`, DoD + `HANDOFF.md` fail without skill/template/mode/packet cites.
