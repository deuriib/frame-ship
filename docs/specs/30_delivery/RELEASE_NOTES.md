# Release Notes: Supporting Skills Workflow Integration (rollout)

**Date:** 2026-09-16
**Release Manager:** orchestrator
**Specs Included:** SPEC-supporting-skills-integration
**Domains-Touched:** [engineering]
**Ship Type:** rollout

## Highlights

- Formalizada la integración de las 3 Supporting Skills (`git-worktree`, `debugging`, `pull-request`) en la gobernanza y contratos del sistema.
- `skills/AGENTS.md` y `AGENTS.md` raíz actualizados a 13 directorios de habilidades con catálogo de triggers y acoples.
- Disparadores de opt-in agregados al enrutador de `skills/using-frame-ship/SKILL.md`.
- Rutas condicionales (`Previous`, `Next`, `Supporting`) explicitadas directamente en los Chain Contracts de `propose-changes`, `execute-spec` y `quality-gate`.

## Changes

### Features

- `skills/AGENTS.md` + `AGENTS.md`: catálogo oficial de Supporting Skills y recuento a 13 dirs (REQ-SSI-001, REQ-SSI-002).
- `skills/using-frame-ship/SKILL.md`: enrutamiento por disparador para debugging, git-worktree y pull-request (REQ-SSI-003).
- `skills/propose-changes/SKILL.md`: `Previous: ... | (optional defect triage) frame-ship:debugging` (REQ-SSI-004).
- `skills/execute-spec/SKILL.md`: `Supporting: (optional / multi-subagents) frame-ship:git-worktree` y `Next: ... | frame-ship:pull-request` (REQ-SSI-005).
- `skills/quality-gate/SKILL.md`: `Previous: ... | frame-ship:pull-request` y loop de retorno por fallo a `debugging` (REQ-SSI-006).

### Breaking Changes

- None.

## Known Issues

- None.

## Rollback / Undo

- `git revert <release-commit>` restaura el estado previo de los contratos sin impacto colateral.

---

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

---

# Release Notes: agy plugin 1:1 with opencode (rollout)

**Date:** 2026-09-17
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-agy-plugin-engineering
**Domains-Touched:** [engineering, security, automation/ops]
**Ship Type:** rollout

## Highlights

- Repo root IS the agy plugin: `agy plugin install .` stages `frame-ship` with zero subdir indirection.
- 1:1 context parity with the opencode plugin: same `skills/` (zero copies), verbatim cards in `rules/frame-ship.md`, live bootstrap via PreInvocation `injectSteps`.
- TypeScript hooks via `bun`: context injector (first-invocation + compaction reminder), `run_command` safety gate (deny/ask), write-event observer (never blocks).

## Changes

### Features

- `plugin.json` + `hooks.json` at root: 3 named hooks (`frame-ship-context`, `safety-gate`, `format-note`), all `bun ./hooks/*.ts`, timeout 10 (SPEC-agy-plugin-engineering, engineering)
- `hooks/context-inject.ts`: self-locating root resolution (opencode `resolveSkillsDir` parity), live SKILL.md read with pointer fallback, threshold reminder (SPEC-agy-plugin-engineering, engineering)
- `hooks/safety-gate.ts` + `hooks/format-note.ts`: deny-list/ask-grey-zone gate + `{}` observer, rule-only reasons (SPEC-agy-plugin-engineering, security)
- `rules/frame-ship.md`: verbatim workflow/guardrails/pointers cards + version lockstep + 1:1 mapping table (SPEC-agy-plugin-engineering, engineering)
- README Antigravity section: global + workspace install, `/hooks` verify, replay, rollback (SPEC-agy-plugin-engineering, automation/ops)

### Breaking Changes

- None — additive root files; opencode runtime, `skills/` content, chain order untouched.

## Known Issues

- Staged-path verify (`agy plugin list` + `/hooks` on an agy host) outstanding by environment — waived (WAIVER.md, expires on verify or 30 days). Owner: engineering owner.
- agy skill-recursion (`skills/*/SKILL.md` discovery) assumed — verify at install; flat-shim fallback documented. Owner: engineering owner.

## Rollback / Undo

`agy plugin disable frame-ship` (immediate) → `agy plugin uninstall frame-ship` → `git revert` of `2c461a6`. `skills/` needs no rollback (untouched). No external sends/filings/launches/deploys. Owner: engineering owner, ETA < 10 min.

---

# Release Notes: v0.6.0 — agents into plugin (rollout)

**Date:** 2026-09-17
**Release Manager:** vasquez (CTO, engineering owner — orchestrator-delegated ship mechanics, single-domain)
**Specs Included:** SPEC-agents-into-plugin-engineering
**Domains-Touched:** [engineering] (data lens N/A — no schemas/lineage/stores, file bodies only)
**Ship Type:** rollout (local plugin — restart opencode to take effect)

## Highlights

- Installing frame-ship alone now brings the full agent roster: 74 keys (`montilla` primary + 8 C-levels `all` + 65 specialists `subagent`, `espinoza-specialist` alias) mirrored into `config.agents` + `config.agent`, with `default_agent="montilla"` + `subagent_depth=2` — never clobbering user overrides.
- Hardened loader: BOM/leading-whitespace strip + unclosed-fence fallback (no frontmatter leak into prompts), guarded defaults (missed lanes leave config untouched), `READ_TIMEOUT_MS=2000` race-as-miss (bounded ~148s worst case, no infinite stall), independent mirror records.
- Single-file contract holds: `.opencode/plugins/frame-ship.ts` v0.6.0 (403 lines), zero deps, `mise run typecheck` clean, double-init byte-stable, secret scan 0 findings.

## Changes

### Features

- Static `AGENTS_MANIFEST` (74 entries) + `resolveAgentsDir` / `readTextFile` (Bun.file first, dynamic `node:fs/promises` fallback) + `parseAgentFile` (description from own frontmatter, body with fences stripped) ported into the single-file runtime (REQ-001, REQ-002 — SPEC-agents-into-plugin-engineering, engineering)
- `config` hook fills `config.agents` + `config.agent` mirror idempotently with guarded defaults (`??=` only inside populated-roster guard) (REQ-003 — same spec, engineering)
- Version triple bumped together: header comment + `VERSION` + `MARKER` → v0.6.0, manifest quadruple (`package.json` → 0.6.0), `.opencode/plugins/AGENTS.md` ref cells re-verified (REQ-004 — same spec, engineering)

### Fixes

- Dangling defaults cleared: skipped/total-miss lanes no longer write defaults or empty mirrors (COND reliability-001 / resilience COND-RS-02 / risk COND-RK-01, cleared by `253c94e` — same spec, engineering)
- Malformed-frontmatter fence leak cleared: BOM strip + unclosed-fence fallback filter frontmatter lines (COND reliability-002 / risk COND-RK-02, cleared by `92a4941` — same spec, engineering)
- No-timeout stall cleared: `withTimeout` race-as-miss with cleared timers, rejection-free (COND resilience-001 / risk COND-RK-03, cleared by `ab64ca1` — same spec, engineering)
- Shared mirror record split into independent literals per entry; stale `AGENTS.md` line refs + root manifest aligned; remediation matrix committed as auditable evidence (advisories, closed by `14eaa4e` + `2966f15` + `220e2b4` — same spec, engineering)

### Breaking Changes

- None — additive roster lane only; skills registration, injection cards, chain order, and API contracts (v1, unchanged, no ADR) untouched.

## Known Issues

- **Roster-pending condition (CEO ruling 1, binding): plugin-only ship — `agents/` stays untracked (77 files: 74 roster + `AGENTS.md` + `README.md` + `delegation-contract.md`, 0 tracked).** Runtime proven WITH roster present (qa 8/8 both lanes, refuter 74/74 disk scan, matrix C-001..C-005). Fresh-clone installs run degraded via graceful miss lanes until roster packaging is resolved (track `agents/` after a dedicated secret/PII scan, or document an external roster source). Owner: orchestrator. Break condition: if the release contract requires install-alone-brings-roster with zero external fetch, tracking becomes a hard ship-blocker.
- Pre-seed edge: custom-only roster + skipped lane can still receive `default_agent: "montilla"` via `??=` (explicit user defaults always preserved). User-owned config; narrow, recorded. Owner: vasquez.
- Bare-fence debris: bare `---` w/o trailing newline → plain-trim prompt (cosmetic, no metadata leak); empty-`description` files still register. Owner: vasquez.
- Silent-fallback advisory (RS-003): partial roster loss invisible at runtime; contents-free numeric skip-count is safe future hardening. Owner: vasquez.
- Out-of-scope live `0.5.0` refs outside touched files (`README.md` snippets, `hooks/context-inject.ts` parity marker, `CHANGELOG.md` history below kept as history) remain for a later spec. Owner: orchestrator.

## Rollback / Undo

- `git revert` of the impl + remediation range (touching only `.opencode/plugins/frame-ship.ts` + `.opencode/plugins/AGENTS.md` refs + `package.json` manifest + matrix file) restores the v0.5.0 runtime — roster lane removed, skills lane intact. No data migration, no external undo, no key rotation (guardrail 4: owner remediates).
- Verify rollback: `config.agents` roster keys absent; `skills.paths` registration + 3-card injection + compaction unchanged; `mise run typecheck` green.
- Owner: vasquez (engineering owner). ETA: < 15 min (NF-004 holds). Restart opencode after revert to take effect.

---

# Release Notes: hidden-flag manifest overlay (rollout)

**Date:** 2026-09-17
**Release Manager:** vasquez (CTO, engineering owner — orchestrator-delegated ship mechanics, single-domain)
**Specs Included:** SPEC-hidden-flag-engineering
**Domains-Touched:** [engineering] (data lens N/A — no schemas/lineage/stores)
**Ship Type:** rollout (local plugin — restart opencode to take effect)

## Highlights

- C-level chat roster decluttered: `montilla` only visible; 8 C-level `mode:all` (`barrera`, `dauhajre`, `espinoza`, `montero`, `santana`, `subero`, `vasquez`, `vera`) carry exact `hidden:true`; 65 subagents untouched (hidden by default in host).
- Backward-compatible optional-only overlay: `AgentManifestEntry.hidden?: boolean` + conditional spread in both mirror inserts — absent flag = byte-identical objects, no migration.
- Full chain in `single` mode: brief → spec → proposal → arch review (APPROVED, ADR waived) → exec (`91cff38`) → min-gate (4/4 pass) → DoD PASS → this rollout. Version triple untouched v0.6.0 (docs-only ship, no bump per SPEC §5).

## Changes

### Features

- `AgentManifestEntry` gains optional `hidden?: boolean` (`frame-ship.ts:242-247`) — `AgentMode` unchanged (REQ-001 — SPEC-hidden-flag-engineering, engineering)
- 8 C-level `mode:all` entries carry exact `hidden:true` boolean literal; `montilla` (primary) has no hidden field (REQ-002 — same spec, engineering)
- Subagents untouched: 0 `hidden` on all 65 `mode:subagent` lines (REQ-003 — same spec, engineering)
- Config mirror propagates hidden when present: both Record types gain `hidden?: boolean` + `...(entry.hidden !== undefined ? { hidden: entry.hidden } : {})` on both inserts (REQ-004 — same spec, engineering)
- `docs/specs/10_design/ARCHITECTURE.md` INV-004 overlay sentence (contract doc touch, not a decision change — same spec, engineering)

### Fixes

- N/A (no defect; display-overlay addition)

### Breaking Changes

- None — additive optional flag; absent = host default (visible for primary/all, hidden for subagent); single-file zero-dep holds, `mise run typecheck` green.

## Known Issues

- Host ignoring unknown `hidden` leaves roster undecluttered but harmless — no wedge, no data loss. Owner: engineering.

## Rollback / Undo

- `git revert 91cff38` restores the pre-flag tree (manifest interface + 8 entries + mirror types/inserts + ARCHITECTURE.md overlay). No data migration, no external sends/filings/launches/deploys, no key rotation (guardrail 4: owner remediates).
- Verify rollback: C-level `mode:all` lines have no `hidden`; mirror inserts are `{ description, prompt, mode }` only; `mise run typecheck` green.
- Release commit itself reverts via `git revert <release-sha>` (docs-only, ETA < 5 min). Owner: vasquez (engineering owner). ETA: < 10 min. Restart opencode after revert to take effect.