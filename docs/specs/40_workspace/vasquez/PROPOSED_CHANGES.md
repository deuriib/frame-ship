# Proposed Changes: Engineering specialist — skill-naming convention (residual-only)

**Spec Reference:** docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md#REQ-001..005 (+ REQ-NF-001..003)
**REQ Index:** docs/specs/15_requirements/REQ-skill-naming-engineering.md
**Agent:** Engineering specialist
**Date:** 2026-09-16
**Execution_Mode:** single (inherited from spec §header + BRIEF-skill-naming, frozen at frame-intent; not overridden)
**Domains-Touched:** [engineering] (automation/ops conditional — plugin runtime strings RECORDED only, not edited; automation owner owns any runtime follow-up)

## Summary

Freeze the canonical navigation form `` `frame-ship:{skill-name}` `` with the normative 3-row carve-out table, disposition all 15 bare `` `skill(...)` `` cites in `skills/` as C-3 KEEP-bare (tool-API namespace), and map every chain/dir surface per REQ-004 with the plugin `CHAIN`/card strings deferred to an automation-owner follow-up. This unit proposes **zero repository file modifications** — it is a verification/record unit: execute-spec will reproduce the greps and scans, quality-gate will enforce them. Prior content at this path (INTENT-2026-09-16-concise-plugin-prompts proposal) is preserved in git history; this revision retargets the path to SPEC-skill-naming-engineering per orchestrator packet.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| *(none — verification/record unit)* | — | No `file-create` / `file-modify` / `file-delete` proposed. All 15 `skill(...)` cites KEEP bare per C-3; frontmatter/paths/plugin runtime byte-identical per REQ-005. Execution = reproduce greps + scans (§Verification). |

Change types per `skills/propose-changes/references/proposal-template.md` (`file-*` for engineering; zero rows = zero edits).

### Disposition table — 15 bare `skill(...)` cites (REQ-003, baseline verified 2026-09-16 via `rg -n "skill\(" skills/`)

Every cite below is tool-invocation context (pre-flight load check or template checklist), NOT inter-skill navigation → disposition **KEEP bare under C-3**. Zero canonicalizations required; prior PASS already normalized all navigation cites to `frame-ship:`-form.

| # | File:Line | Cite (verbatim) | Disposition | Carve-out |
|---|-----------|-----------------|-------------|-----------|
| D-01 | `skills/execute-spec/SKILL.md:28` | `` `skill(execute-spec)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-02 | `skills/execute-spec/SKILL.md:32` | `` `skill(execute-spec)` `` (`single` output-cites line) | KEEP bare — no edit | C-3 |
| D-03 | `skills/review-architecture/SKILL.md:28` | `` `skill(review-architecture)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-04 | `skills/propose-changes/SKILL.md:28` | `` `skill(propose-changes)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-05 | `skills/verify-handoff/SKILL.md:27` | `` `skill(verify-handoff)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-06 | `skills/frame-intent/SKILL.md:32` | `` `skill(frame-intent)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-07 | `skills/quality-gate/SKILL.md:56` | `` `skill(quality-gate)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-08 | `skills/using-frame-ship/SKILL.md:39` | `` `skill(using-frame-ship)` `` (§3 load-order step 1) | KEEP bare — no edit | C-3 |
| D-09 | `skills/using-frame-ship/SKILL.md:40` | `` `skill(<stage>)` `` (§3 load-order step 2, template arg) | KEEP bare — no edit | C-3 |
| D-10 | `skills/using-frame-ship/SKILL.md:63` | `` `skill(stage)` `` (`single` mode line) | KEEP bare — no edit | C-3 |
| D-11 | `skills/using-frame-ship/SKILL.md:64` | `` `skill(stage)` `` (`multi-subagents` mode line) | KEEP bare — no edit | C-3 |
| D-12 | `skills/ship-release/SKILL.md:30` | `` `skill(ship-release)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-13 | `skills/review-security/SKILL.md:28` | `` `skill(review-security)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-14 | `skills/translate-to-spec/SKILL.md:27` | `` `skill(translate-to-spec)` `` (§0 pre-flight LOAD) | KEEP bare — no edit | C-3 |
| D-15 | `skills/quality-gate/references/gate-report.md:34` | `` `skill(<stage>)` `` (stage-skill-loaded checklist) | KEEP bare — no edit | C-3 |

Re-grep acceptance (execute-spec / gate): `rg -n "skill\(" skills/` → same 15 hits, 0 unmapped (15/15 rows above).

### Chain/dir surface map (REQ-004 — informative; enforced here, plugin rows RECORDED not edited)

| # | Surface | Form carried | Disposition |
|---|---------|--------------|-------------|
| S-01 | `AGENTS.md:14,25-26` (`skills/<stage>/SKILL.md`, `skills/<stage>/references/`, `skills/quality-gate/`) | bare (paths) | KEEP per C-2 |
| S-02 | `AGENTS.md:65`, `skills/AGENTS.md` trigger table + catalogue paths + `frame-intent` bare cite (`skills/AGENTS.md:26`) | paths bare; navigation already `frame-ship:`-prefixed where applicable | KEEP per C-2 / REQ-001 |
| S-03 | `README.md:31,62,86-88,125,187-196` (chain diagram `using-frame-ship → …` bare stage names; tree paths) | diagram + tree are dir/path context | KEEP bare per C-2; NOT navigation cites (no edit in this unit) |
| S-04 | `skills/using-frame-ship/references/bootstrap-checklist.md:8` (chain `frame-intent → … → ship-release` bare) | bare chain shorthand in checklist | KEEP — checklist shorthand, navigation canon lives in SKILL.md Previous/Next/route lines (REQ-001) |
| S-05 | `.opencode/plugins/frame-ship.ts:4,13-14,16,20,29` (`./skills/<stage>/SKILL.md`, `skills/*/SKILL.md`, `CHAIN`, `WORKFLOW_CARD`, `POINTERS`, `COMPACTION_REMINDER` strings incl. `skill(frame-ship:…)` load-order literals `:18`) | paths bare per C-2; runtime injection strings | RECORD ONLY — **not edited in this unit** (runtime risk). Follow-up owned by automation owner + typecheck (REQ-004) |
| S-06 | All 10 `SKILL.md` Previous/Next/route/handoff lines + `using-frame-ship` diagram (`:23-25`) | `frame-ship:`-prefixed (prior PASS 10/10) | KEEP canonical per REQ-001 — no edit |

### Carve-out table (normative, frozen per SPEC §4 / REQ-002 — exactly 3 rows, no fourth form)

| # | Surface | Form | Example | Rationale |
|---|---------|------|---------|-----------|
| C-1 | Skill frontmatter `name:` | bare kebab, `name==dir` | `name: translate-to-spec` (`skills/translate-to-spec/SKILL.md:2`) | Loader contract — harness resolves by dir/name; prefix would break discovery |
| C-2 | Filesystem paths / dir globs | bare | `skills/<stage>/SKILL.md`, `skills/*/SKILL.md`, `./skills/<stage>/SKILL.md` | File resolution — paths are not skill invocations |
| C-3 | Native `skill()` tool args | bare | `` `skill(translate-to-spec)` `` (§0 pre-flights), `` `skill(<stage>)` `` / `` `skill(stage)` `` (`using-frame-ship` §3, `gate-report.md:34`) | Tool API namespace — harness resolves bare names; distinct from navigation cites |

## Rationale

REQ-001: navigation canon already holds (10/10 Previous/Next `frame-ship:`-prefixed, verified by `rg -n "frame-ship:" skills/` — 40+ hits, zero bare navigation cites outstanding); this proposal freezes the rule verbatim rather than re-editing. REQ-002: the 3-row table above is copied normatively from SPEC §4 — frontmatter/paths/tool-args each have a loader/tool rationale, closing the "third form" ambiguity for future cites. REQ-003: all 15 `skill(` hits are §0/§3 tool-API context (D-01..D-15), so KEEP-bare is the correct disposition — canonicalizing any of them would break the harness-resolved tool namespace. REQ-004: chain/dir surfaces split cleanly into C-2 paths vs REQ-001 navigation, with the plugin runtime explicitly deferred (single-file zero-deps runtime, needs automation owner + `mise run typecheck`). REQ-005: zero file edits → guard holds by construction; `git status` + diff stat at execute-spec will show only this proposal doc (plus its commit).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Canonicalize the 15 `skill(...)` cites to `skill(frame-ship:…)` | Breaks tool namespace — harness resolves bare names (C-3 rationale); SPEC REQ-002/003 explicitly keep them bare |
| Edit plugin `CHAIN`/`WORKFLOW_CARD` strings in this unit | Runtime risk without automation owner; SPEC REQ-004 + HARD defer it — record-only here |
| Rewrite `README.md:86-88` diagram + `bootstrap-checklist.md:8` to `frame-ship:`-form | Out of residual scope — those are path/checklist shorthand (C-2), not navigation cites; prior PASS deliberately preserved them |
| Touch frontmatter `name:` or rename skill dirs | Violates loader contract + REQ-005 (no renames); prefix would break discovery |

## Approval Required From

- [ ] Owning domain owner: **engineering owner** (mandatory; [engineering] is the sole touched domain — approves proposal + C-1/C-2/C-3 freeze)
- [ ] engineering owner for architecture impact: **same as above — no separate approval** (no API/model/cross-cutting surface; no `ARCHITECTURE.md`/`API_CONTRACTS.md` touched per SPEC §4)
- [ ] security owner: **not required** (docs-only, no auth/data/external-API/PII surface; REQ-NF-001 scan scope only — security lens N/A at gate per REQ index Domain Controls)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc is committed; implementation files stay untouched.

---

# Risk Assessment: SPEC-skill-naming-engineering

**Proposer:** Engineering specialist
**Date:** 2026-09-16
**Domains-Touched:** [engineering] (automation/ops conditional record-only)

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Over-canonicalization — a future editor prefixes a `skill()` tool arg or frontmatter `name:` and breaks harness/loader resolution | Med | Med | C-1/C-3 rows frozen with rationale; gate re-greps `skill\(` vs `frame-ship:`; this proposal dispositions 15/15 as KEEP |
| R-002 | Under-canonicalization — a new navigation cite is written bare and reintroduces the ambiguous third form | Med | Low | Canonical rule frozen (REQ-001); quality-gate checks Previous/Next/route lines for `frame-ship:`-form |
| R-003 | Scope creep — plugin runtime edit slips into execute-spec without automation owner | Low | Med | S-05 marked RECORD ONLY with owner; REQ-005 diff-stat check (`git status` shows proposal doc only) rejects runtime edits |
| R-004 | Collision — overwriting this shared `PROPOSED_CHANGES.md` path obscures the prior concise-plugin-prompts proposal | Low | Low | Prior revision preserved in git history (revertible); follow-up proposals use per-spec suffix (`PROPOSED_CHANGES-skill-naming.md`) |

## Blast Radius

- **Systems:** none — docs prose/record only; no services, data stores, endpoints, or runtime behavior change (plugin byte-identical).
- **Teams:** engineering (review load only: engineering owner approval + gate grep); automation owner informed of S-05 follow-up, no action required this unit.
- **Customers:** none — no user-facing surface.
- **Regulators:** none — no PII/auth/data in scope (Ley 172-13 minimization holds; scoped evidence = paths + line refs only).
- **Revenue:** none — no pipeline/quota/billing surface.

## Rollback Plan

`git revert` the single proposal-doc commit. Owner: Engineering specialist (commit author). ETA: **< 5 min** (docs-only, no migration, no external undo). Verify with `git status --short` clean + `git log --oneline -3`.

## Security Considerations

No auth, data exposure, or input-validation surface (docs-only cite inventory). REQ-NF-001: pattern scan over proposal + referenced cite lines for `secret|token|credential|session|password|api[_-]?key|ssn|passport` = expected 0; no PII added (paths + line refs only). Security owner review not required; full review wave runs at quality-gate only if scope expands.

## Domain Considerations

Engineering only. Delete non-touched domains: finance — n/a (no budget/controls); legal — n/a (no IP/regulatory/liability); marketing/brand — n/a (no GTM); people — n/a (no workload/culture change); revenue — n/a (no pipeline/quota); automation/ops — conditional record-only (S-05 plugin follow-up owned by automation owner, no runbook/capacity impact this unit).

---

## Verification (this stage — proposal only, repo untouched except this doc)

- [x] Skill loaded: `frame-ship:propose-changes` via skill tool; contract cited: `skills/propose-changes/SKILL.md` (§3 Process steps 1-6, §4 Won't-do)
- [x] SPEC read: `docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md` (REQ-001..005 + REQ-NF-001..003)
- [x] REQ index read: `docs/specs/15_requirements/REQ-skill-naming-engineering.md`
- [x] Templates used: `skills/propose-changes/references/proposal-template.md` + `skills/propose-changes/references/risk-assessment.md`
- [x] Baseline grep: `rg -n "skill\(" skills/` → 15 hits (D-01..D-15 above); `rg -n "frame-ship:" skills/` → navigation cites already canonical
- [ ] Approval: engineering owner (BLOCKED until granted — specialists never self-approve)
- [ ] Post-approval commit: proposal doc only (see commit below); `git status --short` must show only `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md`
