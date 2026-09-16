# Spec: Skill-naming convention — canonical frame-ship:{skill-name} + carve-outs (Engineering Layer)

**ID:** SPEC-skill-naming-engineering
**Owner:** engineering owner
**Domains-Touched:** [engineering] (automation/ops conditional — plugin runtime strings recorded only, not edited here; automation owner owns any runtime follow-up)
**Brief Reference:** BRIEF-skill-naming (extends BRIEF-skill-refs-normalization, residual-only scope)
**Status:** draft
**Priority:** P1
**Execution_Mode:** single (inherited from BRIEF-skill-naming, frozen at frame-intent; not overridden)

## 1. Context

BRIEF-skill-naming (draft 2026-09-16) freezes one open convention question left over from the `skill-refs-normalization` PASS (10/10 `SKILL.md` Previous/Next already `frame-ship:`-prefixed): three coexisting cite forms — canonical `frame-ship:{skill-name}` navigation cites, bare tool-invocation cites `` `skill(<bare>)` `` in `§0` pre-flights, and bare chain/dir strings in the plugin `CHAIN` const, `AGENTS.md` files, and `README.md`. A newcomer copying the wrong form cites a stage that resolves on one surface (filesystem) but not another (skill tool / chain navigation).

Prior PASS already normalized inter-skill navigation and deliberately preserved `skill()` calls, file paths, and frontmatter `name:` as intentional bare (different namespaces: tool API vs navigation vs loader contract). This spec carries that forward residual-only: the 15 bare `` `skill(...)` `` cites in `skills/` plus bare chain/dir tables, with an explicit carve-out table so every future cite is either canonical or carved out — no third form.

## 2. Requirements

- **REQ-001 (F, P0):** Freeze canonical navigation form: inter-skill navigation cites (Previous/Next/handoff/trigger-route lines, chain diagrams in prose) use `` `frame-ship:{skill-name}` `` (e.g. `frame-ship:translate-to-spec`). Source: BRIEF OKR KR-1.1. Evidence: spec §4 rule + grep `frame-ship:` in `skills/*/SKILL.md`.
- **REQ-002 (F, P0):** Freeze carve-out table with exactly three surfaces that stay bare, each with loader/tool rationale: (a) skill frontmatter `name:` (kebab==dir, `name`/`description` only — loader contract); (b) filesystem paths (`skills/<stage>/`, `skills/<stage>/SKILL.md`, `references/...`, `.opencode/plugins/frame-ship.ts`, `docs/...`); (c) native `skill()` tool args where the harness resolves bare names (`skill(<stage>)`, `skill(stage)`, `skill(<bare>)` in `§0` pre-flights + `using-frame-ship` §3 + `gate-report.md` template). Source: BRIEF Desired Outcome. Evidence: table in §4.
- **REQ-003 (F, P0):** Disposition every bare `` `skill(...)` `` cite in `skills/` (baseline 15 per BRIEF KR-1.2): each cite is either canonicalized to `frame-ship:`-form (navigation context) or listed in the §4 carve-out with row + rationale; zero unmapped cites remain. In-scope files: 10 `SKILL.md` §0/§3 lines + `quality-gate/references/gate-report.md:34`. Source: OKR KR-1.2. Evidence: grep `skill\(` in `skills/` before/after + disposition table in proposal.
- **REQ-004 (F, P0):** Map chain/dir strings: state per surface which form it carries — bare stays for paths/dir globs (`skills/<stage>/SKILL.md`, `skills/*/SKILL.md`, `./skills/<stage>/SKILL.md` in `AGENTS.md:14,25-26`, `skills/AGENTS.md`, plugin header `:4`, `POINTERS`/`WORKFLOW_CARD` detail pointers); `frame-ship:`-prefixed stays for navigation chains (all 10 `SKILL.md` Previous/Next/route lines, `using-frame-ship` diagram). Plugin `CHAIN` const (`frame-ship.ts:13-14`) + `WORKFLOW_CARD`/`POINTERS`/`COMPACTION_REMINDER` injection strings are RECORDED as automation/ops follow-up, not edited in this unit (runtime risk, needs automation owner + typecheck). Source: OKR KR-2.1 + BRIEF Scope [automation/ops]. Evidence: surface table in §4 + open-question resolution note.
- **REQ-005 (F, P0):** Residual-only guard: do NOT touch intentional bare (frontmatter `name:`, paths), do NOT rename skills/dirs, do NOT edit runtime code (`frame-ship.ts`), do NOT rewrite specs/proposals. Change surface is docs prose cites only; reversible via `git revert`. Source: BRIEF Out of Scope. Evidence: `git status` + diff stat shows only cite-line edits.
- **REQ-NF-001 (NF, P0):** No secrets/tokens/credentials/PII in spec, REQ index, or any cite edit (Ley 172-13 minimization; scoped evidence = paths + line refs only). Evidence: pattern scan over changed files = 0.
- **REQ-NF-002 (NF, P0):** Grep-verifiable: `rg -n "skill\(" skills` count + disposition coverage, and `rg -n "frame-ship:" skills` vs bare backticked stage names, reproducible by gate. Evidence: counts logged in test matrix.
- **REQ-NF-003 (NF, P1):** Rollback: `git revert` of the execution commit(s); docs-only, ETA < 5 min. Evidence: rollback line in proposal + HANDOFF note.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Spec §4 states the canonical rule verbatim; gate greps navigation cites — 100% `frame-ship:{skill-name}` or carved out.
- [ ] AC-002 (REQ-002): Carve-out table has exactly the 3 rows above with rationale; no fourth bare form introduced.
- [ ] AC-003 (REQ-003): All 15 baseline `skill(...)` cites mapped (canonicalize or carve-out row); re-grep shows 0 unmapped.
- [ ] AC-004 (REQ-004): Surface table covers `AGENTS.md`, `skills/AGENTS.md`, `README.md` chains/dirs, `bootstrap-checklist.md:8`, plugin `CHAIN`/cards; plugin runtime marked follow-up with owner automation owner.
- [ ] AC-005 (REQ-005): Diff touches cite prose only; frontmatter/paths/runtime byte-identical; `git status` confirms scope.
- [ ] AC-006 (REQ-NF-001): Scan = 0 findings.
- [ ] AC-007 (REQ-NF-002): Before/after grep counts recorded and reproducible.
- [ ] AC-008 (REQ-NF-003): Rollback command + ETA recorded in proposal and HANDOFF.

## 4. Contracts & Interfaces

Docs-only: no API signatures, schemas, events, `ARCHITECTURE.md` / `API_CONTRACTS.md` (no components change; this convention creates no runtime surface). Invariants: (1) loader contract intact — frontmatter stays `name`/`description` only, `name==dir`; (2) tool namespace vs navigation namespace stay distinct — `skill(...)` is tool API, `` `frame-ship:{skill}` `` is navigation; (3) reference-only packets preserved — this spec cited by path, never pasted.

**Canonical rule (frozen):** navigation cites → `` `frame-ship:{skill-name}` `` or an explicit carve-out row below; every `` `skill(...)` `` tool cite → canonicalized (if navigation context) or carved out (if tool-API context). No third form.

**Carve-out table (normative):**

| # | Surface | Form | Example | Rationale |
|---|---------|------|---------|-----------|
| C-1 | Skill frontmatter `name:` | bare kebab, `name==dir` | `name: translate-to-spec` (`skills/translate-to-spec/SKILL.md:2`) | Loader contract — harness resolves by dir/name; prefix would break discovery |
| C-2 | Filesystem paths / dir globs | bare | `skills/<stage>/SKILL.md`, `skills/*/SKILL.md`, `./skills/<stage>/SKILL.md` | File resolution — paths are not skill invocations |
| C-3 | Native `skill()` tool args | bare | `` `skill(translate-to-spec)` `` (§0 pre-flights), `` `skill(<stage>)` `` / `` `skill(stage)` `` (`using-frame-ship` §3, `gate-report.md:34`) | Tool API namespace — harness resolves bare names; distinct from navigation cites |

**Chain/dir surface map (informative, enforced at propose-changes):** `AGENTS.md:14,25-26,41`, `skills/AGENTS.md` trigger table + catalogue paths, `README.md:86-88` diagram + `:187-196` tree, `bootstrap-checklist.md:8`, plugin `frame-ship.ts:4,13-14,16,20,29` — paths stay bare per C-2, navigation chains stay `frame-ship:`-prefixed per REQ-001, plugin injection strings deferred per REQ-004.

Packet: `SPEC:docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md#REQ-001..005 / HARD:single+docs-only,reference-only-packets,no-PII,revertible / GATE:none-yet / DOMAINS:[engineering]`. Data lens: N/A.

## 5. Out of Scope

- Rewriting specs, proposals, or runtime code (`frame-ship.ts` edits → automation-owner follow-up).
- Renaming skills, directories, or frontmatter loader contract (`name`/`description` only).
- Rotating keys, prod deploys, permission widening.
- Full-prose scrub of historical artifacts (CHANGELOG / RELEASE_NOTES / archive prose stay as audit trail).

## 6. Dependencies

| Dependency | Status at spec time | Effect |
|------------|---------------------|--------|
| BRIEF-skill-naming (draft) + OKRs | present, read by reference | Scope + KR targets + execution_mode |
| BRIEF-skill-refs-normalization (approved) + prior PASS | present, read by reference | Baseline: 10/10 navigation cites already canonical; intentional-bare rationale reused |
| `skills/` cite inventory on disk (15 `skill(` hits; chains in AGENTS.md / README.md / plugin) | verified by grep at spec time | Exact residual surface; counts anchor REQ-003/004 |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES-skill-naming.md | grep `frame-ship:` in `skills/*/SKILL.md` |
| REQ-002 | AC-002 | PROPOSED_CHANGES-skill-naming.md | carve-out table §4 (3 rows) |
| REQ-003 | AC-003 | PROPOSED_CHANGES-skill-naming.md | `rg -n "skill\(" skills` before/after + disposition table |
| REQ-004 | AC-004 | PROPOSED_CHANGES-skill-naming.md | surface map + automation follow-up note |
| REQ-005 | AC-005 | PROPOSED_CHANGES-skill-naming.md | `git status` + diff stat |
| REQ-NF-001..003 | AC-006..008 | plan + handoff | scan + grep log + rollback note |
