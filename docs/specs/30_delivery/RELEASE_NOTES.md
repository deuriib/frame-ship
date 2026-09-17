# Release Notes: debugging skill (rollout)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-debugging-engineering
**Domains-Touched:** [engineering, automation/ops]
**Ship Type:** rollout

## Highlights

- Native `skills/debugging/` live: Iron Law + 4 phases stop guess-fixes before they start.
- Pre-proposal lens per ADR-005: runs before propose/execute, hands off via PROPOSED_CHANGES — chain order untouched.
- 3-failure rule enforced: ≥3 failed fixes → question architecture + human escalation, never silent Fix #4.

## Changes

### Features

- `skills/debugging/SKILL.md` + 3 references (root-cause-tracing, defense-in-depth, condition-based-waiting) (SPEC-debugging-engineering, engineering)
- Sanitized boundary-evidence guidance: masked entry/exit, allowlisted evidence, condition polling (SPEC-debugging-engineering, automation/ops)

### Breaking Changes

- None — advisory skill only.

## Known Issues

- None.

## Rollback / Undo

Delete `skills/debugging/` dir; revert execute commit. No external sends/filings/launches/deploys. Owner: engineering owner, ETA <15 min.

---

# Release Notes: git-worktree skill (Unreleased)

**Date:** 2026-09-16
**Release Manager:** montilla
**Specs Included:** SPEC-git-worktree-engineering, SPEC-git-worktree-automation, SPEC-git-worktree-security, SPEC-git-worktree-people
**Domains-Touched:** [engineering, automation, security, people]
**Ship Type:** rollout

## Highlights

- Isolated parallel lanes: max-2 repo-local worktrees give each SPEC lane its own checkout so two execute-spec lanes run without stepping on each other.
- Fail-closed hygiene: repo-local placement, branch naming, dirty-tree blocks, and mutex rules keep parallel work safe by default on win32/pwsh.
- Consent plus announce: people consent gate and announce template ship alongside the workflow so parallel lanes start with approval and end with a clear team note.

## Changes

### Features

- git-worktree skill core (SKILL.md + 4 references: setup, dispatch, hygiene, mutex) enabling isolated parallel SPEC lanes (SPEC-git-worktree-engineering, engineering)
- Dispatch + hygiene workflow with runbook: setup/dispatch/teardown lifecycle, branch-per-SPEC convention, dirty-tree fail-closed checks (SPEC-git-worktree-automation, automation)
- Security guards policy: consent gate, least-privilege scope, no secrets/PII in worktree paths or logs, boundary hygiene per guardrails (SPEC-git-worktree-security, security)
- People announce template + consent flow: pre-dispatch consent check and post-setup announce note for parallel-lane visibility (SPEC-git-worktree-people, people)

### Fixes

- §5 drift corrected gate-driven: skill §5 references aligned 1:1 with disk filenames (gate-driven fix)
- Slash-canonical fix gate-driven: win32/pwsh path separators normalized to canonical slash form (gate-driven fix)
- `$worktreeRoot` fix gate-driven: worktree root variable resolution corrected for repo-local placement (gate-driven fix)

### Domain Ships

- Automation: workflow enabled + runbook link — `skills/git-worktree/references/dispatch.md` + `hygiene.md` drive setup/dispatch/teardown (SPEC-git-worktree-automation)
- People: announce template shipped — consent + announce flow in `skills/git-worktree/references/` people lane (SPEC-git-worktree-people)
- Security: guards policy enabled — consent, least-privilege, no-secrets/PII rules per security lane (SPEC-git-worktree-security)
- Engineering: skill files shipped — `skills/git-worktree/SKILL.md` + 4 references (SPEC-git-worktree-engineering)

### Breaking Changes

- None — supporting skill only, chain order unchanged, plugin untouched.

## Known Issues

- Mutex-wait note needs one-line clarification (Low hygiene residual — owner: engineering owner)
- Setup-log timestamps inconsistent across pwsh hosts (Low hygiene residual — owner: automation owner)

## Rollback / Undo

- Code revert: `git checkout -- skills/git-worktree` plus `.gitignore` hunk revert plus docs revert restores the pre-skill tree. No archive or skill-file edits outside this scope.
- Worktree residue: `git worktree remove <path> --force` per lane then `git worktree prune` clears residue; verify with `git worktree list`.
- No external sends/filings/launches/deploys to undo. Owner: engineering owner + automation owner, ETA: < 15 min.

---

# Release Notes: v0.3.3

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-commit-convention-v2
**Domains-Touched:** [engineering]
**Ship Type:** policy-enable

## Highlights

- Commit convention upgraded to work-unit scope syntax: `type(<stage>/<work-unit>): subject`. Every commit now self-describes its stage and work unit, making history traceable to briefs, specs, REQ-IDs, ADRs, and releases.
- Multiple commits are now mandated when work units are distinct — no more 1-commit-per-stage rigidity. Splitting and batching rules give agents a clear decision procedure.

## Changes

### Features

- Work-unit scope syntax `type(<stage>/<work-unit>): subject` for all 9 stages (SPEC-commit-convention-v2, engineering)
- Work Unit Definition table mapping each stage to its unit identifier
- Splitting rules: mandatory split per distinct work unit + split when concerns differ (code vs. docs, impl vs. test, feature vs. config)
- Batching rules: allowed only when plan explicitly groups, tightly coupled, or same stage/work-unit/concern; never batch different REQ-IDs

### Fixes

- Rigid "1 per stage" defaults replaced with work-unit-based commit counts
- Flat scope syntax (`brief-auth`, `spec-003`) replaced with stage-qualified scopes (`frame-intent/brief-auth`, `translate-to-spec/spec-003`)

### Breaking Changes

- Commit scope format changes from `type(scope)` to `type(<stage>/<work-unit>)` — guidance only, existing history untouched, no enforcement

## Known Issues

- Stage SKILL.md one-line examples still show old flat syntax; they drift naturally as stages execute (reference file is authoritative)

## Rollback / Undo

`git checkout -- skills/using-frame-ship/references/commit-convention.md` reverts the convention file. No downstream dependencies on content — all 9 SKILL.md files reference by path only. Owner: vasquez, ETA: immediate.

---

# Release Notes: commit-convention-purge (internal close)

**Date:** 2026-09-16
**Release Manager:** operations function + engineering owner (dispatched by orchestrator Montilla CEO)
**Specs Included:** commit-convention purge (`docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` @ `a17c7d8`)
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- Commit convention fully purged from the repo: convention template deleted plus all 8 historical commit-convention-v2 work products and their 5 gate review files — 14 deletions total via `f859726`.
- All live citations updated: 14 edits (13 files, 23 lines — 9 stage SKILL close lines + `skills/AGENTS.md` + `implementation-plan.md` + `using-frame-ship` §5 + `docs/specs/AGENTS.md` index rows) plus the COND-001 count fix via `f5ef7ad`. `rg "commit-convention" skills/` returns zero matches.
- Shipped-record prose kept as history (§C keep-as-history per orchestrator ruling): prior v0.3.3 entries above untouched — append only, audit trail intact.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- COND-001: `skills/AGENTS.md:24` file-count prose corrected (`using-frame-ship` 3 files, `translate-to-spec` 4) via `f5ef7ad` (commit-convention purge, engineering)

### Removed

- `skills/using-frame-ship/references/commit-convention.md` + 8 historical commit-convention-v2 artifacts + 5 gate v2 reviews (commit-convention purge, engineering)

### Breaking Changes

- None — guidance only per prior v0.3.3 entry (existing history untouched, no enforcement ever existed).

## Known Issues

- None. Residual `commit-convention` strings repo-wide are exactly the §C keep-as-history set (CHANGELOG 2 lines, RELEASE_NOTES v0.3.3 lines above, plugin-001 archive 1 line, vasquez handoff 1 line) plus the purge proposal/gate self-descriptions; zero live pointers.

## Rollback / Undo

`git revert f859726` then `git revert f5ef7ad` — in that order (impl first, gate fix second); single-work-unit reverts restore all 14 deleted files and all citation edits. No external sends/filings/launches/deploys to undo. Owner: engineering owner, ETA: immediate (< 5 min).

---

# Release Notes: remove-tool-mapping (internal close)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-remove-tool-mapping-engineering
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- `tool-mapping.md` removed from the live tree: the CEO-only dispatch contract now has a single source — `using-frame-ship/SKILL.md §3` + `bootstrap-checklist.md` + `skills/AGENTS.md` + plugin strings. Full chain run in `single` mode: brief → spec → proposal → exec → min-gate (4/4 pass) → DoD PASS → this close.
- `SKILL.md` left self-contained: §3.1 ends at `acting.` (user amendment stripped the intermediate checklist clause; full load order lives in §3.0), §5 lists only `bootstrap-checklist.md` — refs 1:1 with disk.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- N/A (no defect; duplication removal)

### Removed

- `skills/using-frame-ship/references/tool-mapping.md` (38 lines: CEO-only rule + opencode/Codex/generic adapter rows + Rules) — SPEC-remove-tool-mapping-engineering, engineering
- `SKILL.md §5` tool-mapping bullet; `§3.1` tool-mapping pointer (then checklist clause per amendment) — same spec

### Breaking Changes

- None — session-load prose only; no runtime, no API, no contract semantics changed. External memory/links citing the old path will miss; recorded as accepted Low residual.

## Known Issues

- `README.md:97,236` prose still mentions tool-mapping (descriptive, non-load-bearing) — CEO follow-up, not a defect.
- `commit-convention.md` pointer dangling across stage skills (pre-existing, flagged at frame-intent) — CEO follow-up.

## Rollback / Undo

`git revert ea2733c` then `git revert 8d2e58b` — in that order (amendment first, exec second); restores the deleted file plus both SKILL lines. Evidence commits (`0fd68b5`, `70044a4`, gate `b037033`, handoff `deb242f`) revert independently with no live-tree effect. No external sends/filings/launches/deploys to undo. Owner: vasquez, ETA: immediate (< 5 min).

---

# Release Notes: residual-cleanup (internal close)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-residual-cleanup-engineering
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- Front-door exact: the last two `tool-mapping` prose mentions outside history are gone — `README.md:97` descriptor without parenthetical, `:236` roadmap item without the harness clause (still `[ ]`, honestly pending).
- The second retained risk (dangling `commit-convention.md` pointers) was formally REFUTED with disk proof (`grep commit-convention skills/` = 0; purge `f859726` + its gate verified it) — closed without spending a commit.
- Full chain in `single` mode: brief → spec → proposal → exec → min-gate (4/4 pass) → DoD PASS → this close.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- N/A (no defect; stale-prose removal)

### Removed

- `README.md:97` parenthetical `(includes tool-mapping reference)` — SPEC-residual-cleanup-engineering, engineering
- `README.md:236` clause `+ tool-mapping per harness` — same spec

### Breaking Changes

- None — descriptive prose only; no loader, runtime, skill, or harness consumes the README as a contract.

## Known Issues

- None. Remaining `tool-mapping` strings repo-wide are `docs/` history + trace artifacts (by design, they reference the removed name as evidence, not as pointers).

## Rollback / Undo

`git revert e73eee0` — restores both README lines in one step. Evidence commits (`f1aa7a3`, gate `62a3667`, handoff `4707b79`) revert independently with no live-tree effect. No external sends/filings/launches/deploys to undo. Owner: vasquez, ETA: immediate (< 2 min).

---

# Release Notes: skill-naming-convention (policy-enable rollout)

**Date:** 2026-09-16
**Release Manager:** orchestrator + engineering owner (release mechanics delegated to owning domain owner)
**Specs Included:** SPEC-skill-naming-engineering
**Domains-Touched:** [engineering]
**Ship Type:** rollout (policy-enable — naming-convention freeze; docs-only verification unit, zero file changes)

## Highlights

- Canonical navigation frozen: inter-skill navigation cites (Previous/Next/handoff/trigger-route lines, chain diagrams in prose) use `frame-ship:{skill-name}` (e.g. `frame-ship:translate-to-spec`) per SPEC REQ-001. Prior PASS already normalized 10/10 `SKILL.md` navigation cites — this release freezes the rule, no re-edits.
- C-1/C-2/C-3 carve-out frozen per SPEC §4 / REQ-002: (C-1) frontmatter `name:` bare kebab — loader contract; (C-2) filesystem paths/dir globs bare — file resolution; (C-3) native `skill()` tool args bare — harness-resolved tool namespace. No fourth bare form.
- 15 cites KEEP bare under C-3: all 15 baseline `skill(...)` cites in `skills/` (10 `SKILL.md` §0/§3 lines + `gate-report.md:34`) dispositioned D-01..D-15 as tool-API context — zero canonicalizations, zero file changes. Re-grep acceptance: same 15 hits, 0 unmapped.
- Full chain in `single` mode: brief → spec → proposal → min-gate (4/4 pass) → DoD PASS → this rollout. Zero-change verification/record unit: execute reproduced greps + scans, no implementation edits proposed or made.

## Changes

### Features

- Naming-convention policy enabled: canonical rule + 3-row carve-out table + 15-cite disposition (D-01..D-15) + chain/dir surface map (S-01..S-06) frozen as the reference for every future cite (SPEC-skill-naming-engineering, engineering)

### Fixes

- N/A (no defect; convention freeze, not a bugfix)

### Domain Ships

- Engineering: policy rollout only — no contracts/filings/campaigns/workflows; plugin `CHAIN`/card injection strings (`frame-ship.ts:4,13-14,16,20,29`) RECORDED as automation-owner follow-up (S-05), not edited in this unit (SPEC-skill-naming-engineering)

### Breaking Changes

- None — docs-prose convention only; frontmatter/paths/runtime byte-identical per REQ-005; loader + tool namespaces unchanged.

## Known Issues

- None blocking. One owned non-blocking follow-up carried post-ship: S-05 plugin runtime strings need automation owner + `mise run typecheck` (informational, not a gate condition).

## Rollback / Undo

Zero-change release — nothing to revert in the live tree. Release commit itself reverts via `git revert <release-sha>` (docs-only, ETA < 5 min). Prior unit commits revert independently with no live-tree effect: proposal `ee218c7`, gate `e7e8836`, handoff `850c337` (spec `692ae76`, brief `71bbe0e`). No external sends/filings/launches/deploys to undo. Owner: engineering owner, ETA: immediate (< 5 min).

---

# Release Notes: brainstorm → frame-intent (rollout)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-brainstorm-frame-intent-engineering
**Domains-Touched:** [engineering, people]
**Ship Type:** rollout

## Highlights

- Chain entry now classifies first: `spike-equivalent / bounded-initiative / architectural-initiative` with announce + override + one-way ratchet — hidden complexity upgrades early instead of failing downstream.
- HARD-GATE on every brief: ceremony scales with size (nod → chat-yes → file approval), the approval itself never does.
- Elicitation discipline folded in: one-question-at-a-time, 2–3 framings with recommendation + YAGNI, decomposition rule, sectioned approval, self-review + user review gate — outputs stay BRIEF + OKRs per ADR-006.

## Changes

### Features

- `skills/frame-intent/SKILL.md` §3 rewritten (13 steps + Red Flags table); §4 hardened against sideways skills and gate skips (SPEC-brainstorm-frame-intent-engineering, engineering)
- `skills/frame-intent/references/product-brief.md` gains `Classification:` / `Framings-considered:` / `Approval:` placeholders (same spec, engineering)
- Full chain in `single` mode: brief → spec → proposal → arch review (ADR-006) → exec → min-gate + people (5/5 pass) → DoD PASS → this rollout

### Breaking Changes

- None — in-place upgrade; brief authors get 3 new optional fields, chain order and packet contract unchanged.

## Known Issues

- Spike→answer-only vs mini-BRIEF mapping stays open (BRIEF open question) — first real brief on the new flow confirms it. Owner: orchestrator.

## Rollback / Undo

Revert execute commit(s) on `skills/frame-intent/`; delete added brief fields. No external sends/filings/launches/deploys to undo. Owner: engineering owner, ETA < 15 min.