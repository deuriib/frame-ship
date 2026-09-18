# Reliability Review: Grilling Integration C1–C4 skill wording

**Reviewer:** review-reliability (correctness / edge-case auditor — reads tests, does not run the suite)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 1/4
**Packet:** SPEC:both execute lanes (`docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..006` + sibling security slice `docs/specs/50_archive/SPEC-grilling-integration-security.md#REQ-SEC-001..007` by content, archived mid-lane) + TEST_MATRIX files + proposals / HARD:multi-subagents gate wave 1/4, retry N=2 preserved? (see RL-002) / GATE:arch Approved, security Conditional / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + `references/engineering/reliability-review.md` (this checklist) + `references/gate-report.md` + `references/waiver-template.md`

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + checklist `skills/quality-gate/references/engineering/reliability-review.md`. Domain role understood before acting: hunt bugs, edge cases, error handling in C1–C4 wording; no suite run (→ qa).

## Checklist (reliability-review.md × wording)

- [⚠️] Error paths handled explicitly — missing-link=FAIL / missing-block=FAIL present (C3/C4 ✅), but grill-exit terminal, unclassified default, approver-loop cap absent (RL-002/007/008 ❌-adjacent)
- [⚠️] No swallowed exceptions — thin-waiver box-tick and dead-link pass as PASS (RL-006); user-exit swallowed with no terminal (RL-007)
- [❌] Input validation at boundaries — C2 trigger is self-reported prose, no synonym/scan rule (RL-003); C2 budget N undefined (RL-001); link/block substance unchecked (RL-006)
- [⚠️] Deterministic behavior (no hidden state) — approver-request re-grill unbounded (RL-001/002); C3 every-vs-sample nondeterministic (RL-004)
- [⚠️] Edge cases tested (empty, null, max, boundary) — 0-question / N+1 / unclassified / multi-waiver / 20-REQ cases unproven (see Edge checklist)
- [✅] Idempotency where required — C1 no-re-ask-same-stage + C2 one-pass + C3 re-review ban give re-run safety (within a stage)
- [⚠️] Timeouts on external calls — no grill-round timeout / no-answer stall path; only waiver-expiry TTL exists (RL-002/007)

## Failure Modes Analyzed

| ID | Failure Mode | Expected Behavior | Handled? |
|----|--------------|-------------------|----------|
| FM-001 | C2 asks N=15 questions as "one pass" | Hard cap rejects question N+1 | NO — RL-001 ❌ |
| FM-002 | Proposer omits trigger words to dodge C2 | Independent scan still fires grill | NO — RL-003 ❌ |
| FM-003 | User says `salir` before C2 approve/reject | Terminal recorded + escalate (N=2) | NO — RL-002/007 ⚠️ |
| FM-004 | 3 CONDITIONALs, C3 checks 1 easy waiver | Every waiver checked per-block | NO — RL-004 ❌ |
| FM-005 | Thin-but-polite 3-block waiver | FAIL on substance, not just presence | NO — RL-006 ⚠️ (residual RR-C34-1) |
| FM-006 | Dead/irrelevant evidence link at C4 | FAIL on substance | NO — RL-006 ⚠️ |
| FM-007 | User exits C3 mid-interrogation | Waiver stays uncleared + escalate | NO — RL-007 ⚠️ |
| FM-008 | Unclassified initiative enters C1 | Default heaviest path | UNSPECIFIED — RL-008 ⚠️ |
| FM-009 | 20-REQ spec at C4 one-at-a-time | Bounded batch + pause/exit per batch | NO — RL-009 ⚠️ |
| FM-010 | Approver requests 3rd/4th C2 re-grill | N=2 → escalate orchestrator | NO — RL-001/002 ❌ |

## Loophole Table (HARD audit: unbounded loops? exit-hatch enforceable? FAIL machine-checkable? N=2 preserved?)

| # | Wording | Loophole | Trigger input | Fix |
|---|---------|----------|---------------|-----|
| L-1 | C2 "exactly one budgeted pass, máx N" (`skills/propose-changes/SKILL.md:42-44`) | N undefined → one pass with ∞ questions is compliant | Trigger fires, agent asks 15 Qs, claims "one pass" | Hard cap N (e.g. ≤3 mirroring C1 bounded) + define pass = ≤N questions, grep-checkable |
| L-2 | C2 "no second pass without approver request" (`skills/propose-changes/SKILL.md:44-45` + `references/proposal-template.md:48-50`) | Approver-request hatch has no counter → unbounded re-grill loop, N=2 bypassed | Approver requests re-grill ×4 | Counter: approver-requested re-grill ≤1 (total ≤2 passes) then N=2 → escalate |
| L-3 | C2 trigger list (`skills/propose-changes/SKILL.md:39-41`) | Self-reported; synonyms/omission evade: users/clients/GDPR ≠ customers/regulators/revenue | API change for "users", blast radius "internal consumers only" (cf. `SAMPLE-grilling-C2.md:9-10`) → no fire | Synonym table + independent scan rule (blast-radius grep + API-surface grep) + negative test |
| L-4 | C3 "every … interrogated" vs "interrogates the waiver sample" (`skills/quality-gate/SKILL.md:68-69` vs `:77-79`) | Every-vs-sample quantifier mismatch → cherry-pick easy waiver | 3 CONDITIONALs, check 1, promote 3 | "Every CONDITIONAL/waiver gets a row" + gate-report requires N rows = N CONDITIONALs |
| L-5 | C3/C4 presence checks (`references/gate-report.md:39-43`, `references/dod-checklist.md:10`) | Presence ≠ substance → `Accepted-risk: low because low` passes grep | Thin 3-block waiver / dead link | Substance rubric or explicit reviewer-judgment FAIL reason (carry as COND-R, not silent) |
| L-6 | Exit hatch C1–C4 (e.g. `skills/quality-gate/SKILL.md:64`, `skills/verify-handoff/SKILL.md:51-52`) | Exit terminal undefined at C3/C4 → gate limbo | Exit after 1 of 2 waivers; exit before C2 approve/reject | Exit = pause + recorded `grill: exited` + escalate; waiver stays uncleared; proposal stays unapproved (no silent promote) |
| L-7 | Retry N=2 (`skills/frame-intent/SKILL.md:51-71` C1: absent; `skills/propose-changes/SKILL.md:36-53` C2: absent; C3 ✅ `:79`; C4 ✅ `:40-41`) | C1/C2 grill deadlocks have no N=2 → escalate line (REQ-006 chain invariant gap; global pre-flight N=2 covers load, not round stall) | No-answer / `salir` stall | Add `Retry N=2 → escalate orchestrator` verbatim to C1 + C2 sections |

## Edge Checklist

- [ ] Empty: 0-question round (immediate close) — compliant with cap but violates intent; no FAIL — RL-008 ⚠️
- [ ] Null: unclassified initiative (no `Classification:`) → C1 budget undefined; "when in doubt take heavier path" not restated in C1 — RL-008 ⚠️
- [ ] Min: bounded floor — is 1 question for bounded a violation of "2–3"? Floor unenforceable — RL-008 ⚠️
- [ ] Max: spike Q2, bounded Q4, arch Q6 → must FAIL; caps present in C1 ✅ but no test firing N+1 — unproven ⚠️
- [ ] Boundary: C2 trigger synonyms (users/clients/members/GDPR/Ley 172-13) — untested ❌ (RL-003)
- [ ] Multi: 3 waivers / 20 REQs — every-vs-sample + one-at-a-time blowup — RL-004/009 ⚠️
- [ ] i18n: EN-only user never discovers `salir` — add `exit/salir` alias — RL-011 Low
- [ ] Race: C1/C2 vs C3/C4 parallel lanes touch disjoint skill files (frame-intent/propose-changes vs quality-gate/verify-handoff) — ✅ no shared-state race; singletons per-domain-dir ✅

## Findings

| ID | Severity | Location | Finding | ✅/⚠️/❌ |
|----|----------|----------|---------|----------|
| RL-001 | High | `skills/propose-changes/SKILL.md:42-44`, `references/proposal-template.md:48-50` | C2 one-pass budget has no numeric cap (`máx N` undefined; sample shows Q1 only). One pass with unbounded questions is compliant — unbounded loop in disguise + approver-request re-grill uncapped. | ❌ |
| RL-002 | High | `skills/frame-intent/SKILL.md:51-71` (C1, no N=2), `skills/propose-changes/SKILL.md:36-53` (C2, no N=2) vs C3 `:79` / C4 `:40-41` (have N=2) | Grill-deadlock path missing retry N=2 → escalate (REQ-006). `salir`/no-answer stall has no escalation; global pre-flight N=2 covers skill-load, not round stall. | ❌ |
| RL-003 | High | `skills/propose-changes/SKILL.md:39-41` | C2 trigger evadable by omission/wording. Self-reported blast radius; synonyms (users/clients/GDPR) bypass; no independent scan. Sample `SAMPLE-grilling-C2.md:9-10` demonstrates how "internal consumers only" avoids the customer/regulator/revenue prong. | ❌ |
| RL-004 | High | `skills/quality-gate/SKILL.md:68-69` vs `:77-79` | Quantifier mismatch: "every CONDITIONAL/waiver" vs "the waiver sample" (singular). Sampling-bias loophole — cherry-pick easy waiver, promote rest. Gate-report row shape supports per-waiver but text allows sample-of-one. | ❌ |
| RL-005 | High | `skills/quality-gate/SKILL.md:66,69,73,78` + `references/waiver-template.md:30` vs people `SPEC-grilling-integration-people.md:33-35` (REQ-P-003 ban) | Shipped C3 text violates its own banned-lexicon invariant (5× `interrogat*`). Proof: security `TEST_MATRIX.md` T-009 = fail (routed). Machine-checkable FAIL (grep=0) is currently RED — gate cannot be OPEN while red; needs people-owner ruling (keep-per-fidelity vs reword-per-tone). | ❌ |
| RL-006 | Med | `references/gate-report.md:39-43`, `references/dod-checklist.md:10`, `skills/verify-handoff/SKILL.md:37-39` | Presence ≠ substance. Thin 3-block waiver (`Accepted-risk: low because low`) and dead/irrelevant evidence link both pass presence checks. Acknowledged residual RR-C34-1. No substance rubric; reviewer judgment is the only backstop and is implicit. | ⚠️ |
| RL-007 | Med | `skills/quality-gate/SKILL.md:64`, `skills/verify-handoff/SKILL.md:51-52`, `skills/propose-changes/SKILL.md:53` | Exit-hatch terminal state undefined at C3/C4 (and pre-decision at C2). Exit mid-interrogation leaves gate CONDITIONAL with uninterrogated waivers; exit pre-approve leaves proposal undecided. No terminal rule, no auto-escalate. | ⚠️ |
| RL-008 | Med | `skills/frame-intent/SKILL.md:59-60` | C1 range/undefined edges: bounded "2–3" floor unenforceable (is 1 a violation? is 0?); unclassified initiative has no default budget (heavier-path rule lives in §3 step 2, not restated in C1). | ⚠️ |
| RL-009 | Med | `skills/verify-handoff/SKILL.md:50-52`, `skills/quality-gate/SKILL.md:64` | One-at-a-time over N items unbounded: 20-REQ C4 → 20 sequential checks; multi-waiver C3 → N rounds. No batching/cap; fatigue risk (REQ-P-005 spirit) despite surgical labels. | ⚠️ |
| RL-010 | Low | `skills/propose-changes/SKILL.md:45-46` | "Repo files stay untouched" narrows the global proposal-phase rule (which also bans external sends/filings/launches for non-code domains). Non-code lane could send during grill and stay C2-compliant. Align to template rule. | ⚠️ |
| RL-011 | Low | All C1/C2 openers (`frame-intent:54-56`, `propose-changes:42-43`) | Exit word `salir` undiscoverable for EN users; samples ES-mixed. Add `exit/salir` alias (grep for both). | ⚠️ |

No Critical (docs-only skill-text; no data loss/corruption surface, no runtime/prod path).

## Missing Test Coverage (unproven claims)

- C2 cap: no N+1 test possible while N undefined (RL-001) — needs cap + over-cap FAIL demonstration.
- Trigger evasion: no negative test (proposal omitting trigger words / using synonyms → grill must still fire via scan) — TEST_MATRIX C1+C2 E-007/E-008 cover happy-path fire only.
- Every-vs-sample: no multi-waiver test (3 CONDITIONALs → 3 rows, cherry-pick rejected) — unproven.
- Link/block substance: no thin-waiver FAIL demo, no dead-link FAIL demo — E-016/E-017 prove presence, not substance.
- Exit terminal: no `salir`-mid-round trace showing recorded `grill: exited` + escalate + no-promote — samples show happy-path `sí` only.
- All TEST_MATRIX evidence is Review-type + manual `rg` logs (no CI grep); drift re-opens silently (T-009 already demonstrates: shipped text red on banned-lexicon).

## Verdict Rationale

C1/C2 wiring is faithful to REQ-001/002 intent (classification scaling + falsifiable bet + trigger list + repo-untouched all present verbatim; samples demonstrate happy paths with 0 PII). But five Highs block OPEN: unbounded C2 budget (L-1/L-2), N=2 gap in C1/C2 (L-7), trigger evasion (L-3), every-vs-sample (L-4), and the self-violating banned lexicon already proven red by T-009 (RL-005). Mediums are real but condition-manageable (box-tick substance, exit terminal, range edges, batching). Per gate math (any ❌-class High → not OPEN; no Critical → not CLOSED-alone), the reliability verdict is **CONDITIONAL**: conditions COND-R1..R5 below must clear, then people + security reviewers rule on tone/substance. CLOSED authority and re-review/re-litigation bans hold throughout — this review seeks no override, only conditions.

### Conditions to clear (COND-R1..R5)

- [ ] COND-R1 (RL-001): numeric C2 cap in SKILL + proposal-template (e.g. ≤3) + pass-definition + N+1 FAIL demo.
- [ ] COND-R2 (RL-002/L-7): `Retry N=2 → escalate orchestrator` verbatim in C1 + C2 sections; exit-terminal rule (exit = recorded + escalate, no promote).
- [ ] COND-R3 (RL-003): trigger synonym table + independent scan rule + negative (evasion-attempt → still fires) test.
- [ ] COND-R4 (RL-004): every-not-sample fix ("every CONDITIONAL/waiver gets a row; rows = CONDITIONALs") + multi-waiver demo.
- [ ] COND-R5 (RL-005): people-owner ruling on 5× `interrogat*` (keep-per-fidelity with waiver vs reword-per-tone) + banned-grep back to 0 or recorded waiver before ship.

## Risks

- Thin-but-polite waiver passes C3 (box-tick without substance) — carried from `SECURITY_REVIEW.md` RR + `TEST_MATRIX.md (security)` RR-C34-1; watched via C3 record + reviewer judgment (RL-006).
- Volunteered PII in grill answers despite masking reminder — carried RR-C12-1; contained by scan-log + allowlist at export.
- Waiver TTL lapse without re-review — carried RR-C34-2; contained by mandatory re-review owner (D-5 TTL confirmed).
- T-009 tone conflict ships unresolved if gate does not rule — carried RR-C34-3 (owner santana/people owner).
- C1 budget default dispute/downgrade — carried RR-C12-2; contained by ratchet + joint sign-off.

## Assumptions

1. Sibling security SPEC traced by content (archived mid-lane `40_workspace/security/` → `50_archive/SPEC-grilling-integration-security.md`, content intact) — packet accepted by reference per orders.
2. Arch Approved + security Conditional taken as GATE input (not re-decided here); engineering-owner fidelity + people tone co-sign + security residual bar collected at gate, never sideways.
3. Skill-text-only cycle: no runtime/plugin/package change, so N/A unit/integration coverage justification in both TEST_MATRIX files is accepted; `mise run typecheck` unaffected (re-verify at gate on healthy runner).
4. Banned-lexicon hits in proposal prose (S-C12-004 Info) are distinct from shipped skill-text hits (RL-005 High) — only the latter blocks OPEN.

## Scoped Evidence (reference-only, allowlisted)

- `docs/specs/10_design/SPEC-grilling-integration-engineering.md` (65 lines): REQ-001..006 + AC-001..005 + output targets §4.
- `docs/specs/10_design/SPEC-grilling-integration-people.md` (112 lines): REQ-P-001..007 + §4 canonical inserts 1–6 + banned lexicon.
- `docs/specs/50_archive/SPEC-grilling-integration-security.md` (74 lines, content-intact archive): REQ-SEC-001..007 + three-block template REQ-SEC-NF-003.
- `docs/specs/15_requirements/REQ-grilling-integration-engineering.md` (30 lines): REQ-001..006 P0 + REQ-NF-001/002.
- `docs/specs/10_design/ADR-007-grilling-integration.md` (39 lines, proposed): fold-in decision + budgets + bans.
- `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (117 lines): C1+C2 change list + people inserts by reference + R-001..006.
- `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (58 lines): E-001..E-020, 21/21 Review pass; scan log (banned-grep 0 on C1/C2 set).
- `docs/specs/40_workspace/engineering/SAMPLE-grilling-C1.md` (34 lines) + `SAMPLE-grilling-C2.md` (33 lines): happy-path demos (`sí`), no exit-path demo.
- `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (104 lines): C3+C4 bar + R-SEC-001..007.
- `docs/specs/40_workspace/security/TEST_MATRIX.md` (62 lines): T-001..T-010, 13/14 pass + T-009 fail (routed) — the RL-005 proof.
- `docs/specs/40_workspace/engineering/ARCHITECTURE_REVIEW.md:29-61` (Approved) + `SECURITY_REVIEW.md` (Conditional, C-1..C-6 binding).
- Skill diffs under review: `skills/frame-intent/SKILL.md:51-71` (C1) + `skills/propose-changes/SKILL.md:36-53` (C2) + `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `references/gate-report.md:32-65` (C3) + `references/waiver-template.md:14-31` (bar) + `references/dod-checklist.md:10-11` (C4) + `references/proposal-template.md:43-53` (C2 hook) + `references/risk-assessment.md:29-35` (C2 note).
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/reliability-review.md` (checklist authority for this verdict).

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) at gate:** COND-R5 ruling (RL-005 `interrogat*` keep vs reword) + warmth-paraphrase acceptance + C1 budget/ratchet co-sign (REQ-P-004) + exit-terminal wording co-sign.
2. **Engineering owner (vasquez) at gate:** COND-R1..R4 mechanics fidelity (C2 cap, N=2 inserts, trigger hardening, every-not-sample) + routing-table/DoD additive-only confirm.
3. **Security owner (barrera) at gate:** residual-risk watch (RR-C34-1 thin waiver, RR-C12-1 volunteered PII) + T-009 triage confirm + C-1..C-6 clearance carry.
4. **Orchestrator (montilla):** TTL default confirm (90d-or-next-release) already recorded per security TEST_MATRIX assumption-1 — re-confirm at synthesis; LICENSE open question stays with orchestrator (C-5).
