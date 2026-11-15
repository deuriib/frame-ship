# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-11-15

### Added
- **16 Specialized Review Skills**: Introduced modular review skills spanning all 8 functional domains (`review-legal`, `review-finance`, `review-marketing`, `review-revenue`, `review-people`, `review-automation`, `review-data`, `review-security`) and engineering quality lenses (`review-architecture`, `review-readability`, `review-reliability`, `review-refuter`, `review-observability`, `review-resilience`, `review-risk`, `review-quality-assurance`) under `skills/review-*` (#6).
- **42 Modular Domain Rules**: Decomposed monolithic rules into 42 granular, composable guardrail files in `rules/` categorized by `always_on` and `model_decision` frontmatter triggers (#6).
- **Discovery Research Stage**: Added optional `skills/research/` stage with quantified `GO`/`NO-GO`/`PIVOT` decision aid thresholds prior to `frame-intent` (#4, #5).
- **Post-Ship Operate Stage**: Added `skills/operate/` stage covering telemetry capture at T+5, T+15, and T+60, SLO monitoring, on-call feedback loops, and automated rollback rules (#5).
- **Scaffold Checklist**: Added greenfield project bootstrap checklist to `skills/execute-spec/references/scaffold-checklist.md` (#5).
- **Unified Documentation Hierarchy**: Standardized folder structure under `docs/frame-ship/` (`briefs/`, `research/`, `design/`, `adr/`, `requirements/`, `backlog/`, `archive/`) and merged OKR goals into product briefs (#2, #5).
- **Project Funding**: Added `.github/FUNDING.yml` and repository analytics (#1).

### Changed
- **Ephemeral Workspace Relocation**: Migrated scratch and in-progress artifacts from `docs/frame-ship/workspace/` to `<root>/.frame-ship/` (gitignored), enforcing final deliverable promotion into `docs/frame-ship/archive/<spec-id>/` (#6).
- **CI Test Suite Enforcement**: Restored active automated testing and strict TypeScript typechecking in `.github/workflows/ci.yml` (#5).
- **Unified Verdict Vocabulary**: Standardized review findings to `PASS` / `CONDITIONAL` / `FAIL` and quality gate statuses to `OPEN` / `CONDITIONAL` / `CLOSED` (#5).
- **Command Architecture**: Refactored commands in `.opencode/` and `.pi/` into structured chain-pointer skills (#5).

### Deprecated
- **Monolithic Agent Personas**: Legacy agent markdown personas under `agents/*.md` and the agent plugin lane are deprecated and superseded by decoupled skills (#6).

### Removed
- **Legacy Agent Directory**: Deleted `agents/`, `.opencode/plugins/agents.ts`, `.opencode/lib/agent-parse.ts`, and legacy persona references across skills and documentation (#6).
- **Obsolete Root Commands**: Removed legacy `commands/` directory in favor of `.opencode/commands/` and `.pi/prompts/` (#5).
- **Numeric Documentation Folders**: Eliminated numeric folder prefixes (`12_adr`, `20_backlog`, `40_workspace`, `50_archive`) (#5).

### Fixed
- **YAML Flow-List Parser**: Fixed agent frontmatter parser to support flow-list array syntax (`tools: [a, b]`) without dropping permissions (#5).
- **Rule Frontmatter Typos**: Corrected `triger:` misspelling in revenue rule and deduplicated documentation restatements (#5).

[Unreleased]: https://github.com/deuriib/frame-ship/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/deuriib/frame-ship/releases/tag/v1.1.0
