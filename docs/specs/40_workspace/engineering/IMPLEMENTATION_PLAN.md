# Implementation Plan: SPEC-repo-hygiene

**Agent:** engineering specialist (dispatched by orchestrator)
**Date:** 2026-09-23
**Approved By:** engineering owner + automation owner — sponsor "aprobado" 2026-09-23 (recorded in `PROPOSED_CHANGES.md`); arch/security reviews formally not required (stated in proposal)
**Domains-Touched:** [engineering, automation/ops]
**Packet:** SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..006+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change+sequential-lane / GATE:none-yet / DOMAINS:[engineering,automation/ops]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Smoke suite: registry sync (SKILL_DIRS ↔ `skills/`, 12 dirs, frontmatter `name`==dir + non-empty `description`), marker guard on both hooks (source-structural: `if (hasMarker(event.system)) return;` precedes every `event.system.push`), agy hook fixture replays via `node` spawn (deny→blocked / allow→pass, first→injects / later→no-op, format-note→`{}`) | `tests/smoke.test.mjs` | `npm test` output (REQ-002 / AC-002, AC-003) | ~45m |
| 2 | `npm test` entry point + committed lockfile; `dependencies` untouched | `package.json`, `package-lock.json` | `npm ci && npm test` green (REQ-003 / AC-002) | ~10m |
| 3 | CI workflow: 2 jobs on push:main + pull_request — `typecheck` (mise → `npm ci` → `mise run typecheck` → `node scripts/bump-version.mjs --check`) and `test` (setup-node 22 → `npm ci` → `npm test`); `permissions: contents: read`; actions pinned major tags; no secrets | `.github/workflows/ci.yml` | file review + local replay of both job command sequences (REQ-001 / AC-001, R-001 mitigation) | ~30m |
| 4 | Doc-drift fixes: README structure block + local-replay cmds → real paths `plugins/antigravity/hooks/`; raw `tsc` cmd + `guardrails.ts`; Roadmap checks off tests/CI + docs-scaffolding lines; Contributing gains tag rule; `AGENTS.md` skills-count arithmetic (12 = bootstrap+9+2); `plugins/AGENTS.md` stale `VERSION = "0.8.0"` example → version-neutral; `skills.ts` header "Registers 13" → 12 (comment-only) | `README.md`, `AGENTS.md`, `plugins/AGENTS.md`, `plugins/opencode/skills.ts` | grep evidence per fix (REQ-004 / AC-004) | ~30m |
| 4b | Sponsor fold-in: reactivate plan/build lane transform (desc overrides stay commented); sponsor-authored, sponsor-directed | `plugins/opencode/agents.ts` | typecheck + `npm test` green post-inclusion; sponsor directive in transcript (REQ-007 / AC-008) | ~5m |
| 4c | Residual sweep (approved 2026-09-23): unify runtime claims bun→node (README prose/roadmap, `plugins/AGENTS.md` COMMANDS, hook headers shebang+comment), fix stale `mise run install` comment, merge duplicate `## [v0.3.0]` sections (born together in `19532cd`; verbatim, semver-correct position below `v0.3.1`) | `README.md`, `plugins/AGENTS.md`, `plugins/antigravity/hooks/*.ts`, `CHANGELOG.md` | greps (bun=0 in docs/headers; `v0.3.0` heading count=1) + `npm test` + typecheck (REQ-004/REQ-005 extension / AC-004, AC-005) | ~20m |
| 5 | Changelog structure: merge duplicate `## [v0.6.1]` sections; restore `## [v0.7.0] — 2026-09-19` header over orphaned block — verbatim provenance `git show e496c25:CHANGELOG.md` | `CHANGELOG.md` | heading grep counts + diff vs `e496c25` (REQ-005 / AC-005) | ~15m |
| 6 | Domain checks + evidence matrix: typecheck, version:check, npm test, prohibition-clause scan (no secrets/tokens in new files), revert notes per unit | `TEST_MATRIX.md` (singleton) | command outputs → matrix rows (REQ-NF-001..003 / AC-007) | ~20m |
| 7 | Ship-release stage (deferred by chain): `bump-version.mjs minor --changelog` → v0.12.0, release notes, `git tag v0.12.0`, spec → `50_archive/` with promote-then-purge | 7 lockstep files, `CHANGELOG.md`, `30_delivery/`, `50_archive/` | ship-release stage artifacts (REQ-006 / AC-006) | ~30m |

Each step maps to exactly one commit (steps grouped only where same REQ): S1→`test(repo-hygiene): … (REQ-002)`, S2→`chore(repo-hygiene): … (REQ-003)`, S3→`ci(repo-hygiene): … (REQ-001)`, S4→`docs(repo-hygiene): … (REQ-004)`, S4b→`refactor(agents): … (REQ-007)` (only after the REQ-007 amendment commit), S4c→`docs(repo-hygiene): … (REQ-004 residual)` + `docs(repo-hygiene): … (REQ-005 residual)`, S5→`docs(repo-hygiene): … (REQ-005)`; S6 commits the matrix; S7 commits at ship-release. Text-only amendment commits (spec/proposal/plan/index) precede their fix commits — proposal-before-code.

## Order of Operations

1 (tests exist) → 2 (lockfile makes `npm ci` legal) → 3 (CI runs 1+2) → 4 (docs truthful once artifacts exist: Roadmap check-offs reference real files) → 5 (independent, any time after 4) → 4c (residual sweep, approved 2026-09-23, after 4+5 evidence lands) → 6 (verify all) → 7 (only after green gate + handoff).

**Lane model:** ONE sequential specialist lane in the main tree — parallel lanes (max 2) not used, so the worktree annex (consent/announce/gates) is not triggered. Same packet, same reviewers, same full-wave gate; no min-gate, no silent downgrade. Specialist edits files only; orchestrator verifies + commits per REQ (run-command discipline stays with the technical specialist for checks it runs itself).

## Rollback Points

- After every step: single `git revert <sha>`, ETA < 5 min, owner engineering owner.
- CI removal: revert step-3 commit (or `gh workflow disable` pre-revert). No data, no external comms.
- Step 7 only after gate green; tag removal = `git tag -d v0.12.0` if needed pre-push.
- Safe stop: anywhere between steps — repo remains coherent (docs-only after S4, changelog-only after S5).

## Quality Gates

- [ ] Engineering: Type checks (`mise run typecheck`) / Tests (`npm test`) / Security (prohibition-clause scan on new files; zero-dep diff empty; `skills.ts` executable tokens unchanged) / Lint: N/A (no linter in repo — stated, not skipped)
- [ ] Automation/ops: automation owner + engineering owner — workflow commands replay locally, action pins present, `permissions: contents: read`, no secrets referenced, clean disable path
- [ ] Finance / Legal / Marketing / People / Revenue: N/A — domains not touched (per spec Domains-Touched)
