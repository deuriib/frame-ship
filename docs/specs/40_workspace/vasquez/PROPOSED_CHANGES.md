# Proposed Changes: vasquez (CTO)

**Spec Reference:** INTENT-2026-09-16-concise-plugin-prompts (ad-hoc user intent, no BRIEF/SPEC — scope + REQ-IDs defined herein)
**Agent:** vasquez
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** engineering

## Summary

Condense the prompt-injection payload in `.opencode/plugins/frame-ship.ts` (single-file, zero-deps runtime) without losing behavior. The session-injected system text (~11,098 chars) duplicates the live-loaded `using-frame-ship` bootstrap body almost verbatim; this proposal shrinks the hardcoded cards to compact pointer-form, extracts one shared `CHAIN` const, and keeps all hooks, resolvers, and loader logic byte-identical in behavior. Repo stays untouched until approval.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `.opencode/plugins/frame-ship.ts` (H1: header comment L1-28) | file-modify | Trim header to version + chain pointer + creed; move chain string to shared `CHAIN` const (REQ-004) |
| `.opencode/plugins/frame-ship.ts` (H2: new `CHAIN` const) | file-modify | Single source for `frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`; all cards + compaction reminder interpolate it (REQ-004) |
| `.opencode/plugins/frame-ship.ts` (H3: `WORKFLOW_CARD` L36-72, 3,926 chars) | file-modify | Dedupe MANDATORY LOAD ORDER + execution modes + 9 stage triggers + role bindings + hard rules against live bootstrap body (4,458 chars, injected anyway): keep one-line contract + compact trigger table + hard-rules short-form with pointers to `skills/*/SKILL.md` (REQ-001, REQ-002) |
| `.opencode/plugins/frame-ship.ts` (H4: `GUARDRAILS_FULL` L75-91, 1,979 chars) | file-modify | Compress guardrails 1-14 to short-form (one clause each, grouped Security/Privacy/Severity/Conduct) + pointer to AGENTS.md; every numbered rule still present and greppable (REQ-003) |
| `.opencode/plugins/frame-ship.ts` (H5: `POINTERS` L93-98, 735 chars) | file-modify | Tighten to 3-bullet source-of-truth pointer; drop prose already stated in bootstrap body (REQ-002) |
| `.opencode/plugins/frame-ship.ts` (H6: `COMPACTION_REMINDER` L100, 508 chars) | file-modify | Shorten to chain + reload order + trace keys using shared `CHAIN` const (REQ-004) |
| `.opencode/plugins/frame-ship.ts` (logic L102-223: `hasMarker`, `fileUrlToPath`, `resolveSkillsDir`, `loadBootstrapBody`, hooks, exports) | file-modify | NO behavior change — verbatim preservation required; only string-literal contents above change (REQ-005) |

Change types per `skills/propose-changes/references/proposal-template.md` (`file-modify` for engineering).

### REQ-IDs (defined by this proposal — no prior SPEC)

- **REQ-001** — Eliminate WORKFLOW_CARD ↔ bootstrap-body duplication (load order, exec modes, triggers, roles, hard rules stated once, in full, in the live body; card keeps compact form + pointers).
- **REQ-002** — Compress trigger list + pointers to table/bullets; all 9 stages + owners + outputs still addressable.
- **REQ-003** — Compress guardrails 1-14 to short-form; semantic checklist maps each number 1:1 (no rule dropped, merged, or reworded in meaning).
- **REQ-004** — Single `CHAIN` const; chain string appears once in source, interpolated everywhere (kills 4x literal drift risk).
- **REQ-005** — Zero behavior change: `config` idempotent path-append, `system.transform` 3-push + bootstrap + `hasMarker` dedupe, `compacting` single-push + dedupe, `resolveSkillsDir` import.meta-first resolution, `loadBootstrapBody` Bun-first/file-fallback/cache, dual named+default export.
- **REQ-006** — Acceptance: (a) injected system payload (`WORKFLOW_CARD + GUARDRAILS_FULL + POINTERS + bootstrap`) reduced **≥30% chars** vs. 11,098 baseline; (b) semantic checklist passes 1:1 (7 hard rules, 14 guardrails, 9 triggers, load order 1-4, 2 exec modes, role bindings, chain order); (c) `tsc` typecheck clean per project command (below); (d) single-file, zero-deps invariant holds (`import type` only, no new imports).

## Rationale

Measurement (`frame-ship.ts:36-100` vs `skills/using-frame-ship/SKILL.md:22-66`): the plugin injects the load order, exec modes, 9 triggers, role bindings, and hard rules in `WORKFLOW_CARD` and then injects the same content again via the live bootstrap body — ~3,900 of ~11,100 injected chars are near-verbatim duplicates. The bootstrap body is already the declared source of truth ("runtime file read keeps a single source of truth — no hardcoded copy to drift", `frame-ship.ts:151-152`), so the hardcoded copy is the one to shrink. Short-form guardrails stay greppable by number, preserving gate enforceability. One `CHAIN` const removes the current 4x literal (header L17-19, card L36-37, compaction L100, bootstrap L22-26) as a drift vector.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Delete `WORKFLOW_CARD` entirely, rely on bootstrap body alone | Card carries the HARD STOP + trigger routing the bootstrap states in prose; compact card keeps the enforcement posture without the prose cost |
| Move card text to a second runtime-read file | Adds a second file read to the hot session-init path + new failure mode; hardcoded compact literals keep init synchronous-safe with the existing silent-fallback posture |
| Compress the bootstrap `SKILL.md` instead | SKILL.md is the chain's process source of truth shared by all stages; shrinking it degrades every stage, while shrinking the plugin copy fixes the duplication at its source |
| Paraphrase guardrails into fewer rules | Violates HARD constraint "preserve guardrails 1-14"; renumbering breaks every gate reference — short-form keeps all 14 numbers intact |

## Approval Required From

- [ ] Owning C-level: vasquez (engineering — session behavior for all 9 stages)
- [ ] review-risk fast gate (flagged, per packet GATE): prompt trims touch the security-baseline wording — verdict required before execute-spec, full review wave runs at quality-gate

> **Rule:** No repository file modifications during proposal phase. Implementation file `.opencode/plugins/frame-ship.ts` stays untouched until approval + reviews pass.

---

# Risk Assessment: INTENT-2026-09-16-concise-plugin-prompts

**Proposer:** vasquez
**Date:** 2026-09-16
**Domains-Touched:** engineering

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Guardrail semantic loss — a trim rewords one of guardrails 1-14 and weakens enforcement (deny-by-default, PII, severity) | Med | High | REQ-003 1:1 semantic checklist enforced at quality-gate; review-risk fast gate must PASS before execute-spec; diff review restricted to string literals |
| R-002 | Chain-order drift — compact card misstates the authoritative 9-stage order | Low | High | REQ-004 single `CHAIN` const interpolated everywhere; acceptance checklist asserts exact order string |
| R-003 | Sessions depended on the duplicated (belt-and-suspenders) wording; compact form under-orients long sessions | Low | Med | Bootstrap full body still injected live; compaction reminder keeps chain + reload order; verify-handoff on first sessions after change watches for orientation failures |
| R-004 | Refactor accidentally touches hook/resolver/loader logic (regression in skill registration, dedupe, path resolution) | Low | High | REQ-005 verbatim-logic rule; acceptance runs existing typecheck + manual init/compact smoke (restart opencode, confirm single injection, no duplication on retry) |
| R-005 | Token saving under-delivers (short-forms bloat back during review) | Med | Low | REQ-006 ≥30% gate is PASS/FAIL on chars measured by the same python one-liner as baseline; reject creep in review |

## Blast Radius

Engineering (only domain touched): session behavior for **all 9 stages** — every session's system prompt changes. Failure mode is orientation/gate-enforcement degradation, not data loss: no services, no data stores, no customers, no revenue, no regulators affected. No PII flows in scope (no PII in prompt literals; proposal adds none). Worst case is a confusing or under-constrained session, caught by the semantic checklist + review-risk gate before ship.

## Rollback Plan

Code revert only: `git revert` the single-file commit to `.opencode/plugins/frame-ship.ts`, then quit + restart opencode (config not hot-reloaded). Owner: vasquez. ETA: <15 min. No data migration, no external undo.

## Security Considerations

Prompt text *is* the security baseline's carrier (guardrails 1-11 inline in `GUARDRAILS_FULL`). Any rewording is a security-relevant change: barrera lens via review-risk fast gate required (per packet GATE). No auth/data/API logic, no secrets, no credentials in scope — barrera deep audit NOT required; fast gate sufficient. Full review wave runs at quality-gate, not now.

## Domain Considerations

Engineering only (vasquez). Delete non-touched domains: finance (dauhajre) — n/a; legal (subero) — n/a; marketing (vera) — n/a; people (santana) — n/a; revenue (montero) — n/a; automation/ops (espinoza + vasquez) — n/a beyond restart-opencode step in rollback.

---

## Verification (this stage — proposal only, repo untouched)

- [x] Target read: `.opencode/plugins/frame-ship.ts` (223 lines, 14,234 chars)
- [x] Baseline measured: WORKFLOW_CARD 3,926 + GUARDRAILS_FULL 1,979 + POINTERS 735 + bootstrap body 4,458 = **11,098 injected chars**; compaction 508 chars
- [x] Duplication cites: load-order/exec-modes (`frame-ship.ts:39-47` ≡ `SKILL.md:38-64`), triggers (`frame-ship.ts:49-59` ≡ `SKILL.md:46-55`), roles/rules (`frame-ship.ts:61-71` ≡ `SKILL.md:28-34,56-61`), chain 4x (`frame-ship.ts:17-19,36-37,100` + `SKILL.md:22-26`)
- [ ] Approval: vasquez + review-risk fast gate (BLOCKED until granted)
- [ ] Post-approval typecheck (execute-spec stage): from `.opencode/`: `npx -y -p typescript tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts`
