# Requirements Index: Repo Professionalization (CI, Smoke Tests, Doc-Drift, Tags)

**Owner:** engineering owner
**Brief Reference:** in-session bounded classification (2026-09-23; no BRIEF file per bounded path)
**Domains-Touched:** [engineering, automation/ops]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | CI workflow on push+PR: typecheck (mise + version lockstep) + test (`npm ci` + `npm test`), Node 22, actions pinned to major tags | P1 | bounded brief | SPEC-repo-hygiene | automation/ops | review |
| REQ-002 | `tests/` smoke suite (`node:test`, zero deps): SKILL_DIRS↔dirs sync + frontmatter shape, `hasMarker` on both hooks, hook fixture replays (deny/allow, first/later, `{}`) | P1 | bounded brief | SPEC-repo-hygiene | engineering | test |
| REQ-003 | `npm test` entry point + committed `package-lock.json`; dependency set unchanged | P1 | bounded brief | SPEC-repo-hygiene | engineering | test |
| REQ-004 | Doc-drift fixes: README paths (`plugins/antigravity/hooks/`), raw tsc parity with `mise.toml`, roadmap truth, skill-count wording (12), no stale hardcoded version in `plugins/AGENTS.md`, `skills.ts` header 13→12; residual sweep: bun→node across README prose/roadmap, `plugins/AGENTS.md` COMMANDS, hook headers/shebangs; stale `mise run install` comment | P1 | repo audit 2026-09-23 | SPEC-repo-hygiene | engineering | review |
| REQ-005 | CHANGELOG structure: single `## [v0.6.1]`, single `## [v0.3.0]` (residual-sweep merge, verbatim from `19532cd`), one `### Added` per version (history-proven header restore only, no invention) | P2 | repo audit 2026-09-23 | SPEC-repo-hygiene | engineering | review |
| REQ-006 | Release tagged `v0.12.0` (package.json + CHANGELOG parity) + forward tag rule stated in README Contributing | P1 | repo audit 2026-09-23 | SPEC-repo-hygiene | automation/ops | review |
| REQ-007 | Reactivate plan/build lane transform (permissions + idempotent suffixes); description overrides stay commented — sponsor-authored fold-in | P1 | sponsor directive 2026-09-23 | SPEC-repo-hygiene | engineering | test |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Zero new dependencies; plugin behavior change limited to REQ-007 (sponsor-owned), everything else behavior-neutral | Reliability | `dependencies` diff = empty; typecheck green |
| REQ-NF-002 | Full reversibility; CI decoupled from plugin runtime | Reliability | single `git revert` per work unit |
| REQ-NF-003 | REQ→test→artifact→verdict traceability | Process | complete chain in TEST_MATRIX + GATE_REPORT |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | ADR rule honored (none required — evidence in spec §4); zero-dep invariant; behavior-neutral edits only | engineering owner |
| automation/ops | CI pins + Node 22 parity with `mise.toml`; workflow disables cleanly without touching runtime | automation owner + engineering owner |
