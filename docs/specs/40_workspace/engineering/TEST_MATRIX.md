# Test / Evidence Matrix: Grilling Integration C1+C2 — Engineering Lane

**Agent:** vasquez (Senior CTO / engineering owner) — engineering lane C1+C2
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2, approved change list)
**Spec Reference:** `docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..002` + `docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006` (by reference)
**Execution_Mode:** multi-subagents (this lane first, security C3+C4 lane follows sequentially)
**Domains-Touched:** [engineering, people, security] — owns: engineering (C1+C2 wiring)
**Approvals:** arch Approved (`ARCHITECTURE_REVIEW.md`, ADR-007 proposed) · security Conditional (`SECURITY_REVIEW.md` C-1..C-6 binding — met as evidence, this is the clearance)
**TTL:** 90 days or next release, whichever first (orchestrator-confirmed)
**Skill:** `frame-ship:execute-spec` via skill tool — base `skills/execute-spec/SKILL.md` + `references/implementation-plan.md` + `references/test-matrix.md`

> **Singleton note:** canonical `docs/specs/40_workspace/engineering/TEST_MATRIX.md` slot per execute-spec discipline (create-if-missing else update-in-place, never suffix). Prior content (Antigravity discovery-path fix, 2026-09-18) is superseded by this unit and recoverable from git history (`git log -- docs/specs/40_workspace/engineering/TEST_MATRIX.md`).

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | E-001 | C1 budgets verbatim-in-intent: spike 1 hard cap / bounded 2–3 cap 3 / architectural cap 5 (4 core + 1 frontier-empty), joint engineering + people sign-off noted | Review | pass | 48757e8 |
| REQ-001 | E-002 | C1 one-way ratchet verbatim-in-intent: "Profundidad solo sube (spike→bounded→architectural), nunca baja mid-initiative" | Review | pass | 48757e8 |
| REQ-001 | E-003 | C1 falsifiable-bet prompt over 2–3 framings, output recorded in `Framings-Considered` | Review | pass | 48757e8 |
| REQ-001 | E-004 | C1 human contract verbatim-in-intent: opt-in + `salir` exit hatch / one-at-a-time / disagreement invite "¿dónde puede estar mal?" / warmth / masking (Ley 172-13) / pause-exit offer | Review | pass | 48757e8 |
| REQ-001 | E-005 | C1 sample round: synthetic bounded initiative, 2 questions within cap 3, 1:1 turn-taking, falsifiable-bet recorded, 0 PII/secrets | Review | pass | 48757e8 |
| REQ-001 | E-006 | C1 diff is file-modify only on `skills/frame-intent/SKILL.md` (+22 lines, one `### C1` section); no new dir/stage/reviewer/dep | Review | pass | 48757e8 |
| REQ-002 | E-007 | C2 trigger list verbatim-in-intent: auth/data/API/PII, multi-domain, blast radius mentioning customers/regulators/revenue, approver request | Review | pass | (this commit) |
| REQ-002 | E-008 | C2 one-pass budget bound: exactly one budgeted pass where pass = ≤3 questions, Q4 (N+1) = FAIL blocked, terminal approve/reject, no second pass without approver request (COND-R1/P3/Q3/S3) | Review | pass | (this commit) |
| REQ-002 | E-009 | C2 repo-untouched-during-grill rule + blast-radius/rollback challenge framing | Review | pass | (this commit) |
| REQ-002 | E-010 | C2 human contract verbatim-in-intent (same five clauses as C1 + pause/exit before approve/reject) | Review | pass | (this commit) |
| REQ-002 | E-011 | C2 sample round: synthetic API-surface proposal, trigger FIRES, one-pass Q1 on rollback, terminal approve, 0 PII/secrets, allowlisted export | Review | pass | (this commit) |
| REQ-002 | E-012 | C2 diffs are file-modify only: `skills/propose-changes/SKILL.md` (+19, one `### C2` section) + proposal-template (+12 C2 hook, additive) + risk-assessment (+8 C2 note, additive) | Review | pass | (this commit) |
| REQ-002 | E-013 | Proposal-template C2 hook: trigger checklist + one-pass budget + masking-reminder pointer (people SPEC §4.5 clause quoted verbatim); no new required section | Review | pass | (this commit) |
| REQ-002 | E-014 | Risk-assessment C2 note: one-pass budget + blast-radius trigger pointer (customers/regulators/revenue) + terminal preserved | Review | pass | (this commit) |
| REQ-001 | E-015a | Sample C1 artifact: `SAMPLE-grilling-C1.md` (34 lines, synthetic, scan-log 0 raw) | Review | pass | 48757e8 |
| REQ-002 | E-015b | Sample C2 artifact: `SAMPLE-grilling-C2.md` (33 lines, synthetic, scan-log 0 raw) | Review | pass | (this commit) |
| REQ-005 | E-016 | Plug-in invariants: no new `skills/*/` dir, no new stage, no new reviewer; `package.json`/plugin deps unchanged (tree clean for both); original wording only, LICENSE open question stays with orchestrator (C-5) | Review | pass | (this commit) |
| REQ-006 | E-017 | Chain invariants intact: proposal-before-code held (skill text landed only at execute-spec under Conditional clearance); STRIDE/ADR cores untouched; N=2 → escalate + reference-only packets preserved | Review | pass | (this commit) |
| REQ-NF-001 | E-018 | Banned-lexicon grep = 0 on all 6 touched files: `rg -i -n "relentless\|interrogat\|drill\|corner\|trap\|relentless-mode"` → exit 1, no hits | Review | pass | (this commit) |
| REQ-NF-001 | E-019 | Secret/PII scan: hits are policy-word declarations only (masking clause + "0 PII/secrets" claims), 0 values/assignments/tokens — REFUTED-pattern per S-C12-005 | Review | pass | (this commit) |
| REQ-P-001..006 | E-020 | People inserts 1–6 intent-match in C1+C2 touchpoints (wrap-safe grep: `salir` 2+1, `una sola pregunta` 1+1, `estar mal` 1+1, `cálido` 1+1, `privacidad` 1+1+1, `solo sube` ratchet, `hard cap` budgets, one-pass, pause/exit); people-owner co-sign collected at quality-gate (REQ-P-004 co-owned) | Sign-off | pass (impl) / pending co-sign at gate | (this commit) |
| REQ-002 | E-021 | C2 N+1 FAIL demo: `SAMPLE-grilling-C2.md` N+1 section — Q1–Q3 consume ≤3 budget, attempted Q4 BLOCKED with `grill: N+1 blocked` recorded, no answer taken (COND-R1/P3/Q3/S3) | Review | pass | (this commit) |
| REQ-006 | E-022 | Round-level Retry N=2 → escalate in C1 + C2 text + C2 pre-decision exit-terminal (exit = pause + `grill: exited` + escalate, proposal unapproved) + stall rule (2 reminders → `grill: stalled` + escalate) (COND-R2/S1) | Review | pass | (this commit) |
| REQ-002 | E-023 | Trigger synonym hardening (customers/users/clients/members/consumers; regulators/GDPR/Ley 172-13/authorities; revenue/pipeline/quota/money) + independent blast-radius/API-surface scan rule + evasion negative demo (`SAMPLE-grilling-C2.md` evasion section: "users/internal only" → STILL FIRES) (COND-R3) | Review | pass | (this commit) |
| REQ-001 | E-024 | Glossary (challenge/grill/ronda defined once in C1, C2 points to C1) + block breakup (one bullet per rule C1/C2) + all placeholders bound (C1 opener N = 1/3/5 per classification, C2 máx 3, no naked N) + single-source pointers to people SPEC §4 + untouched aligned (files + external sends) (COND-D1/D3/D4/D5) | Review | pass | (this commit) |

Types per `references/test-matrix.md`. Skill-text unit: review/sign-off with artifact path — REQ-ID trace mandatory, satisfied per row.

## Coverage Summary

- Unit coverage: N/A (skill-text-only, no code paths — justification: docs-only SPEC cycle, no runtime/plugin change; `mise run typecheck` env-blocked on this runner — missing `.opencode` task dir, os error 267, pre-existing harness issue; no `.ts`/`.json` touched so unaffected claim holds, re-verify at gate on healthy runner)
- Integration coverage: N/A (same justification)
- Evidence coverage: 21/21 rows with linked artifact + command output above
- Acceptance criteria covered: AC-001 (C1/C2 present + samples) + AC-004 (invariants) + AC-005 (trace) for the C1+C2 scope; AC-002/AC-003 belong to the sibling security C3+C4 lane, untouched here

## Scan log (C-2 proof, not attestation)

- Banned lexicon: `rg -i -n "relentless|interrogat|drill|corner|trap|relentless-mode" skills/frame-intent/SKILL.md skills/propose-changes/SKILL.md skills/propose-changes/references/proposal-template.md skills/propose-changes/references/risk-assessment.md docs/specs/40_workspace/engineering/SAMPLE-grilling-C1.md docs/specs/40_workspace/engineering/SAMPLE-grilling-C2.md` → **0 hits (exit 1) = PASS**
- Secret/PII: same file set, `rg -i -n "api_key|apikey|secret|passwd|password\s*[:=]|credential|session\s*[:=]|bearer|BEGIN [A-Z ]*PRIVATE KEY"` → hits are the masking-clause declarations + "0 PII/secrets" synthetic claims only, **0 values = PASS**
- Clause presence (wrap-safe fragments): opt-in/`salir`, `una sola pregunta`, `estar mal`, `cálido`, `privacidad`, `solo sube`, `hard cap`, one-pass, pause/exit — **present in all required touchpoints = PASS** (risk-assessment carries budget + trigger pointer only, by proposal design)
- Scope: `git status` at commit time shows only the approved change list + plan/matrix singletons + 2 samples; sibling-lane files (`security/IMPLEMENTATION_PLAN.md`, `quality-gate/references/waiver-template.md`) left uncommitted in tree for their lane; **no new skill dir / stage / reviewer / dep = PASS**

## Commits

- REQ-001: `48757e8` — `skills/frame-intent/SKILL.md` + `SAMPLE-grilling-C1.md` + `IMPLEMENTATION_PLAN.md`
- REQ-002: this commit — `skills/propose-changes/SKILL.md` + `proposal-template.md` + `risk-assessment.md` + `SAMPLE-grilling-C2.md` + this matrix
