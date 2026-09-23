# Spec: Repo Professionalization — CI, Smoke Tests, Doc-Drift, Tag Hygiene

**ID:** SPEC-repo-hygiene
**Owner:** engineering owner
**Domains-Touched:** [engineering, automation/ops]
**Brief Reference:** in-session bounded classification (frame-intent, 2026-09-23 — chat plan approved "Go"; no BRIEF file per bounded path)
**Status:** approved
**Priority:** P1
**Execution_Mode:** subagents (frozen at frame-intent; orchestrator dispatches, specialists do the work)

## 1. Context

frame-ship ships a rigorous methodology (REQ→test→artifact→verdict) but its own repo has zero verification: no `.github/workflows/`, no `tests/` (both promised in README Roadmap), documented doc-drift (README references a root `hooks/` dir that lives at `plugins/antigravity/hooks/`, a raw `tsc` command missing `guardrails.ts`, stale roadmap claims like "docs/briefs not yet in repo" when the dirs exist, `skills.ts` header claiming 13 skills for a 12-skill `SKILL_DIRS`, duplicate `## [v0.6.1]` changelog sections and a doubled `### Added` under v0.8.0), and release tags missing for 8 of 11 released versions (only `v0.3.2`, `v0.11.0` exist). Closing these makes the repo practice what it preaches — evidence over claims.

## 2. Requirements

- REQ-001 (CI workflow): `.github/workflows/ci.yml` runs on push to `main` + all PRs with two jobs — `typecheck` (mise-managed: `mise run typecheck` + `node scripts/bump-version.mjs --check`) and `test` (`npm ci` + `npm test`), Node 22, third-party actions pinned to major tags.
- REQ-002 (smoke tests): `tests/` exists, Node built-in `node:test` runner, zero new dependencies, covering — (a) `SKILL_DIRS` in `plugins/opencode/skills.ts` ↔ `skills/` dirs stay in sync (count + each `SKILL.md` exists with `name:` == dir and non-empty `description:`), (b) marker idempotency guard present on BOTH `context` and `compaction` hooks (`hasMarker` cited before every `event.system.push`), (c) Antigravity hook fixture replays: `safety-gate` deny → blocked / allow → pass, `context-inject` first invocation → injects / later → no-op, `format-note` → `{}`.
- REQ-003 (test entry point): `package.json` gains `"test": "node --test \"tests/*.test.mjs\""` (quoted glob — the bare `node --test tests/` directory form exits 1 on node v22.23.2, reproduced; text aligned in residual sweep 2026-09-23); dependency set unchanged (`@opencode/plugin@2.0.9` only) + `package-lock.json` committed so `npm ci` pins it.
- REQ-004 (doc-drift fixes): README structure block + local-replay commands use real paths (`plugins/antigravity/hooks/…`); raw `tsc` command includes `guardrails.ts` (parity with `mise.toml`); Roadmap checks off "docs/briefs+specs scaffolding" and "test harness + CI"; `AGENTS.md` skills count reads 12 = bootstrap + 9 stages + 2 supporting; `plugins/AGENTS.md` lockstep example carries no stale hardcoded version; `skills.ts` header "Registers 13" → 12. Residual sweep (approved 2026-09-23): runtime claims unified bun→node — README prose (handlers) + prerequisites + roadmap, `plugins/AGENTS.md` COMMANDS replay lines, hook file headers (shebang `#!/usr/bin/env node` + `run via node plugins/antigravity/hooks/…`; comment/shebang only), stale `mise run install` comment corrected (installs at repo root, not `.opencode/`).
- REQ-005 (changelog structure): merge the duplicate `## [v0.6.1]` sections into one; resolve the doubled `### Added` under v0.8.0 (restore a lost version header only if git history proves one — otherwise merge; no content invention). Residual sweep (approved 2026-09-23): merge the duplicate `## [v0.3.0]` sections (both born in commit `19532cd`) into a single section at the semver-correct position below `v0.3.1` — content verbatim, no invented numbers.
- REQ-006 (tag rule): this release ships tagged `v0.12.0` matching `package.json` + CHANGELOG; the forward rule "every CHANGELOG release section gets a matching git tag" is stated in README Contributing.
- REQ-007 (plan/build lane transform — sponsor fold-in): `plugins/opencode/agents.ts` transform block active — when `plan`/`build` agents exist they receive `planPermissions()` / skill `allow` permission + idempotent `PLAN_TAG`/`BUILD_TAG` system suffixes; `PLAN_DESCRIPTION`/`BUILD_DESCRIPTION` overrides stay commented (built-in descriptions untouched). Sponsor-authored, sponsor-directed inclusion 2026-09-23 ("add it to these changes aswell") — reverts the disable of `d043f85` while keeping desc overrides off.

### Non-Functional

- REQ-NF-001 (zero-dep preserved): no new runtime or dev dependencies — tests use `node:test` + `node:assert`, typecheck keeps `npx -y -p typescript`; plugin sources change only via the REQ-004 comment fix and the REQ-007 sponsor-directed transform reactivation (the single behavior change, sponsor-owned).
- REQ-NF-002 (reversibility): every change revertible via `git revert`; disabling CI cannot affect plugin runtime (harness-agnostic split).
- REQ-NF-003 (traceability): full `REQ-ID → test → artifact → gate verdict` chain recorded in `TEST_MATRIX.md` and enforced by the quality gate.

## 3. Acceptance Criteria

- [ ] AC-001: CI workflow file present, triggers on push+PR, both jobs defined; evidence `.github/workflows/ci.yml`.
- [ ] AC-002: `npm test` passes locally with 0 failures; evidence test run output.
- [ ] AC-003: Frontmatter/sync test fails if a `SKILL_DIRS` entry lacks its dir (negative check by inspection); evidence test code.
- [ ] AC-004: `grep -rn "hooks/context-inject" README.md` matches only `plugins/antigravity/`-prefixed paths (bare root `hooks/` claims = 0); raw tsc command matches `mise.toml` file list; roadmap claims match repo state; `grep -rn bun README.md plugins/AGENTS.md plugins/antigravity/hooks/*.ts` → 0 bun runtime-claim hits (every residual hit must classify as a non-claim: `bundler` substring, `Bun.file` API, `maybeBun` stdin code); evidence grep output in `TEST_MATRIX.md`.
- [ ] AC-005: Exactly one `## [v0.6.1]` heading; exactly one `## [v0.3.0]` heading; exactly one `### Added` per version section; evidence grep counts.
- [ ] AC-006: `git tag` contains `v0.12.0` pointing at the release commit; tag rule line present in README; evidence tag list.
- [ ] AC-007: `npm run typecheck` + `npm run version:check` green after all edits; evidence command output.
- [ ] AC-008: `agents.ts` transform block uncommented and active, description-override lines still commented; `mise run typecheck` + `npm test` green after inclusion; evidence diff + command output.

## 4. Contracts & Interfaces

- No public API, data model, or cross-domain contract changes → **no ADR** (rule: ADR only on invariant/component/cross-domain change; CI + tests are repo tooling, not runtime components of `ARCHITECTURE.md` Components table). No `ARCHITECTURE.md` edit.
- Security surface: none new — no auth/data/PII/external API in workflow (repo-scoped default token, no secrets referenced) → `review-security` not triggered; accepted residual: third-party actions pinned to mutable major tags (owner: engineering owner; re-evaluate at public flip → SHA pinning + Dependabot).
- Handoff packet to `propose-changes`: `SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change / GATE:none-yet / DOMAINS:[engineering,automation/ops]`.

## 5. Out of Scope

- Public-flip items: `SECURITY.md`, `CONTRIBUTING.md` extraction, CODEOWNERS, issue templates, topics/homepage, repo-visible badge changes.
- Dependabot, SBOM/provenance, coverage thresholds, devcontainers — explicitly rejected as theater at single-maintainer size.
- Plugin runtime behavior changes (comment fix only), skill content changes, new harness adapters.
- Back-tagging missing historical tags (`v0.4.0`–`v0.10.0`) — forward rule only.
- ARCHITECTURE.md / ADR work (see §4 rationale).

## 6. Dependencies

- README Roadmap already commits to "Test harness in `tests/` + CI typecheck on push" and "Public flip: license detection…" — this spec executes the first.
- `mise.toml` tasks (`typecheck`), `scripts/bump-version.mjs --check`, `plugins/antigravity/hooks/fixtures/*` (existing replay vectors), `plugins/opencode/skills.ts` `SKILL_DIRS` (becomes the tested contract).
- Node 22 LTS (type-stripping runs `.ts` hooks via `node`, matching `hooks.json`).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | workflow file + trigger/job inspection |
| REQ-002 | AC-002, AC-003 | PROPOSED_CHANGES.md | `npm test` output + negative-check reading |
| REQ-003 | AC-002 | PROPOSED_CHANGES.md | `package.json` scripts + lockfile diff |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | grep counts in TEST_MATRIX.md |
| REQ-005 | AC-005 | PROPOSED_CHANGES.md | heading grep counts |
| REQ-006 | AC-006 | PROPOSED_CHANGES.md | `git tag -l v0.12.0` + README line |
| REQ-007 | AC-008 | PROPOSED_CHANGES.md | agents.ts diff (block active, desc overrides commented) + typecheck/test output + sponsor directive |
| REQ-NF-001 | AC-007 | PROPOSED_CHANGES.md | `dependencies` diff empty; typecheck green (behavior change limited to REQ-007) |
| REQ-NF-002 | AC-001..006 | PROPOSED_CHANGES.md | per-file revert notes in TEST_MATRIX.md |
| REQ-NF-003 | all | TEST_MATRIX.md + GATE_REPORT.md | gate verdict per REQ |
