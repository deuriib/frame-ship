# Proposed Changes: engineering owner — Repo Professionalization (CI, Smoke Tests, Doc-Drift, Tag Hygiene)

**Spec Reference:** SPEC-repo-hygiene (`docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003`)
**Agent:** engineering owner — owning domain owner, engineering
**Date:** 2026-09-23
**Execution_Mode:** subagents (inherited from spec; orchestrator dispatches, specialists do the work)
**Domains-Touched:** [engineering, automation/ops]
**Packets:** SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..006 / HARD:subagents+zero-dep+no-runtime-behavior-change / GATE:none-yet / DOMAINS:[engineering,automation/ops]

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## Summary

Give the repo the verification layer its own methodology demands: a minimal GitHub Actions workflow (typecheck + version-lockstep job, smoke-test job), a zero-dependency `node:test` smoke suite covering skill-registry sync, marker idempotency, and Antigravity hook fixture replays, plus the doc-drift fixes found in today's audit (stale README paths/commands/roadmap, wrong skill counts, duplicate/broken CHANGELOG section headers — the lost `v0.7.0` header proven by commit `e496c25`). Release closes at `v0.12.0` with a matching tag and a forward tag rule. Plus the sponsor-authored `agents.ts` plan/build transform reactivation folded in by sponsor directive (REQ-007) — the single behavior change in this spec; no new dependencies, everything else revertible per work unit.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `.github/workflows/ci.yml` | file-create | Two jobs on `push:main` + `pull_request`: `typecheck` (Node 22, `mise` setup → `mise run typecheck` + `node scripts/bump-version.mjs --check`) and `test` (Node 22, `npm ci` + `npm test`). Third-party actions pinned to major tags (`actions/checkout@v4`, `jdx/action-mise@v3`, `actions/setup-node@v4`). No secrets referenced; default `GITHUB_TOKEN` only (REQ-001). |
| `tests/smoke.test.mjs` | file-create | `node:test` + `node:assert` only. (a) parse `SKILL_DIRS` from `plugins/opencode/skills.ts`, assert count 12, every `skills/<dir>/SKILL.md` exists with `name:` == dir and non-empty `description:` — missing dir must fail; (b) assert `hasMarker(event.system)` guard precedes every `event.system.push` in both `context` and `compaction` hooks (regex over source); (c) spawn `node plugins/antigravity/hooks/*.ts` with `hooks/fixtures/*` stdin and assert outputs: safety-gate deny→blocked / allow→pass, context-inject first→injects / later→no-op, format-note→`{}` (REQ-002). |
| `package.json` | file-modify | Add `"test": "node --test \"tests/*.test.mjs\""` (quoted glob — bare `tests/` dir form exits 1 on node v22.23.2, reproduced; REQ-003 text aligned in residual sweep). `dependencies` untouched (`@opencode/plugin@2.0.9` only) (REQ-003). |
| `package-lock.json` | file-create | Generated lockfile (`npm install --package-lock-only`) so `npm ci` pins the single dep; committed, no `package.json` change (REQ-003). |
| `README.md` | file-modify | Structure block + local-replay commands: root `hooks/…` → `plugins/antigravity/hooks/…` (real layout); raw `tsc` command gains `guardrails.ts` (parity with `mise.toml`); Roadmap checks off "test harness + CI" and "docs/briefs+specs scaffolding"; Contributing gains the forward rule "every CHANGELOG release section gets a matching `git tag vX.Y.Z`" (REQ-004, REQ-006). Residual sweep: handler prose + prerequisites + roadmap "via `bun`" → `node` (the `hooks.json` contract), bun prerequisite dropped (Node 22 already required), stale `mise run install` comment → installs at repo root (REQ-004). |
| `AGENTS.md` | file-modify | Skills count line: "12 process skills (9 core chain stages + 2 supporting)" → "12 skills (bootstrap + 9 stages + 2 supporting)" (11≠12 arithmetic drift) (REQ-004). |
| `plugins/AGENTS.md` | file-modify | Version-lockstep example `const VERSION = "0.8.0"` → version-neutral wording pointing at `shared.ts` (no stale hardcoded version to rot again) (REQ-004). Residual sweep: COMMANDS hook replay lines `bun` → `node` (REQ-004). |
| `plugins/antigravity/hooks/*.ts` | file-modify | Header only: shebang `#!/usr/bin/env node` + doc comment `run via node plugins/antigravity/hooks/…` (was `bun ./hooks/…`); comment/shebang only, zero logic change (REQ-004 residual sweep). |
| `plugins/opencode/skills.ts` | file-modify | Header comment "Registers 13 `frame-ship:<stage>` skills" → 12. Comment-only; zero executable-token change (REQ-004, REQ-NF-001). |
| `CHANGELOG.md` | file-modify | Merge duplicate `## [v0.6.1]` sections into one; restore `## [v0.7.0] — 2026-09-19` header over the orphaned `### Added/Changed/Removed/Known issues` block — verbatim provenance `git show e496c25:CHANGELOG.md`, no content invention (REQ-005). Residual sweep: merge duplicate `## [v0.3.0]` sections (both from `19532cd`) into one verbatim section below `v0.3.1` (REQ-005). |
| `package.json` + 7 lockstep files + `CHANGELOG.md` + git tag | workflow-update | At `ship-release` stage (deferred by chain): `node scripts/bump-version.mjs minor --changelog` → `v0.12.0`, release notes, `git tag v0.12.0`, spec archived to `50_archive/` (REQ-006). |
| `plugins/opencode/agents.ts` | file-modify | Reactivate plan/build lane transform block (permissions + idempotent `PLAN_TAG`/`BUILD_TAG` suffixes); `PLAN_DESCRIPTION`/`BUILD_DESCRIPTION` overrides stay commented. Sponsor-authored + sponsor-directed fold-in 2026-09-23 ("add it to these changes aswell") (REQ-007). |
| `docs/specs/50_archive/`, `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/40_workspace/quality-gate/*`, skill bodies, plugin logic (sole exception = the `agents.ts` row above) | explicitly-untouched | Audit trail frozen; no ADR (no invariant/component/cross-domain contract change — CI/tests are repo tooling, not `ARCHITECTURE.md` components; agents-lane reactivation is within its existing contract); no other skill-content or runtime behavior edits. |

Change types per `references/proposal-template.md:23`.

## Rationale

- The repo mandates `REQ-ID → test → artifact → gate verdict` for everyone else while running zero tests and zero CI on itself — evidence over claims cuts both ways; your own Roadmap line "Test harness in `tests/` + CI typecheck on push" is already the committed intent.
- `SKILL_DIRS` ↔ `skills/` sync and marker idempotency are the two silent-breakage surfaces (a renamed dir or a dropped `hasMarker` guard degrades installs with no signal); one cheap test each converts them to red-on-push.
- Doc drift (paths to a directory that doesn't exist, a `tsc` command missing a file, roadmap claims contradicted by the tree, 11-vs-12 skill arithmetic) misroutes the exact agents this repo exists to guide.
- Changelog structure is history-provable (`e496c25` shows the lost v0.7.0 header verbatim) — fixing it is transcription, not rewriting.
- Scope stops at tooling + docs: zero-dep invariant preserved, one revert per unit, single-domain-pair blast radius (this private repo only).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Dependabot + SBOM + coverage thresholds + issue templates + CODEOWNERS | Theater at single-maintainer size — every guard must earn its keep; re-evaluated at public flip (documented in spec Out-of-Scope). |
| Vitest/jest test harness | New dev dependency violates REQ-NF-001 zero-dep; `node:test` ships with Node 22 and covers all three needs. |
| SHA-pinning actions now | Correct end-state but noisy without Dependabot to maintain pins; major-tag pins now + SHA pinning at public flip (residual risk recorded below). |
| Fix drift only, defer CI/tests | Leaves the central promise (tested traceability) unpracticed; CI is the mechanism that keeps drift from regrowing. |
| Backfill missing historical tags `v0.4.0`–`v0.10.0` | Points tags at commits after the fact with guessed mapping; forward-only rule is honest, cheap, and sufficient. |

## Risk Assessment

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Workflow syntax/command error fails on first push | Low | Low | Both job command sequences replayed locally before push; failure is visible-red, never silent; fix = trivial revert/rework. |
| R-002 | `npm ci` breaks for consumers without lockfile conventions | Low | Low | Lockfile generated + verified locally (`npm ci` clean); single dep. |
| R-003 | `.ts` hook spawn in tests behaves differently under `node:test` | Med | Med | `hooks.json` already executes these files via `node` on this runtime (v22.23.2, type-stripping default) — tests assert the same contract; fallback = assert exit codes only. |
| R-004 | Doc path "fixes" introduce new inaccuracies | Low | Low | Every fix carries grep evidence in `TEST_MATRIX.md` (REQ-004/AC-004). |
| R-005 | Version bump touches wrong file set | Low | Med | `version:check` before + after; 7-file lockstep enumerated in `AGENTS.md`; bump runs only at ship-release with gate green. |
| R-006 | Mutable major-tag actions (supply chain) | Low | High-at-public-flip | Accepted now: private repo, repo-scoped default token, no secrets; **owner:** engineering owner; **re-evaluate:** public flip → SHA pins + Dependabot. |
| R-007 | Reactivated transform injects permissions + suffixes into built-in plan/build agents (skill `allow` grant) | Low | Med | Sponsor-authored original code, sponsor-directed inclusion; description overrides stay off; idempotent tag check prevents duplicate suffixes; `mise run typecheck` + `npm test` green post-inclusion; single `git revert` restores the disabled state. |

**Blast Radius:** Engineering (repo tooling + docs only — no services, no runtime plugin behavior beyond one comment, no data/schema) and automation/ops (one new workflow — disable = delete file; no runbooks, no capacity). No customers/users affected (repo is private, single maintainer); no regulators; no revenue surfaces. Multi-domain fires C2 — opener offered once with this proposal.

**Rollback Plan:** Per-unit `git revert`, ETA < 5 min, owner engineering owner. CI removal = `git revert` the workflow commit (or `gh workflow disable` pre-revert); tag removal = `git tag -d v0.12.0` (+ remote delete if pushed); lockfile removal = revert commit, `npm install` unaffected. No data migration, no external comms.

**Security Considerations:** No auth/data/external-API/PII surface — workflow references no secrets, uses default `GITHUB_TOKEN` with repo-scoped permissions (`permissions: contents: read` declared); test fixtures are committed replay vectors already in-repo. Prohibition-clause pattern scan (no secrets/tokens) over all new files at execute-spec. **Security owner sign-off not required — stated, not assumed.** Residual = R-006 (major-tag pins) accepted with owner + expiry condition. **REQ-007 addendum:** the reactivated transform grants harness-internal `skill:*:allow` + system-suffix injection to the built-in `plan`/`build` agents — sponsor-designed original code, idempotent, no external trust boundary; security owner review optional, **stated not assumed**.

**Domain Considerations:** engineering — zero-dep + behavior-neutral invariants held (REQ-NF-001); automation/ops — workflow pins mirror `mise.toml` toolchain, clean disable path (owner: automation owner + engineering owner). Finance/legal/marketing/people/revenue: not touched.

## Approval Required From

- [x] Owning domain owner: engineering owner (mandatory — Domains-Touched [engineering]) — **approved** by sponsor 2026-09-23 ("aprobado")
- [x] automation owner: CI mechanics + toolchain parity (Domains-Touched [automation/ops]) — **approved** by sponsor 2026-09-23 ("aprobado")
- [x] engineering owner arch review: **not required** — no API/model/cross-cutting change; no ADR per rule (stated, not assumed)
- [x] security owner: **not required** — no auth/data/external-API/PII (stated in Security Considerations)
- [x] REQ-007 fold-in (`agents.ts`): **approved** by sponsor 2026-09-23 — "i added that change in plugins/opencode/agents.ts, dont revert it. add it to these changes aswell"
- [x] Residual sweep (F-001..F-006): **approved** by sponsor 2026-09-23 ("approved") — extends REQ-004/REQ-005 fixes (bun→node unification, hook headers, stale install comment, duplicate `v0.3.0` merge) + aligns REQ-003 script text; targets amended in this file, the spec, the REQ index, and the plan BEFORE the fix commits (proposal-before-code).

> **Rule:** No repository file modifications during proposal phase. Implementation files stay untouched until approval; spec + REQ index (translate-to-spec close) and this proposal doc are the only new files.

## C2 challenge hook (REQ-002 — additive, no new required section)

- **Trigger checklist:** ☐ auth/data/API/PII — no | ☑ multi-domain — `[engineering, automation/ops]` | ☐ customers/regulators/revenue in blast radius — none | ☐ approver request — not made.
- **Budget:** exactly 1 pass of ≤3 questions if opted-in (question 4 = FAIL); re-grill only on approver request (≤2 total).
- **Opt-in opener (once):** "¿Quieres una ronda de desafío opt-in (máx 3 preguntas, una a la vez)? Di sí para empezar o `exit/salir` en cualquier momento para parar sin penalidad." — declining or `exit` never skips the approval gate itself.
- **Masking:** "Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)."
- **Record:** `grill: declined` (opener offered once 2026-09-23, no round requested; approval terminal: "aprobado").
- **Single source:** mechanics live in `../using-frame-ship/references/challenge-round.md` §1–§2 — never redefined here.
