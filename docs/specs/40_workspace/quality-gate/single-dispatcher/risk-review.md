# Risk Review: SPEC-single-dispatcher (engineering + people)

**Reviewer:** review-risk (FAST gate — operational/regulatory/business risk lens)
**Date:** 2026-09-16
**Specs Reviewed:** SPEC-single-dispatcher-engineering (vasquez), SPEC-single-dispatcher-people (santana)
**Execution_Mode:** multi-subagents (frozen at frame-intent)
**Packet:** SPEC: docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md + docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md / HARD: multi-subagents; text-edits only, reversible per commit; version v0.3.3; REQ-007/REQ-F-008 CANCELLED; no external sends/filings/launches/deploys / GATE: none-yet (this review feeds GATE_REPORT) / DOMAINS: [engineering, people + 8 template sets mechanical]

## Verdict

**APPROVE — with conditions (COND-R1..R3).** No Critical/High findings. Two Medium (conditional, both coordination/documentation with defined mitigations), three Low (hygiene), zero regulatory exposure, rollback and continuity verified. No escalation to `security` (wording-only, barrera attestation already on file: `docs/specs/40_workspace/barrera/SECURITY_REVIEW-single-dispatcher.md`).

## Load Evidence (quality-gate/bootstrap checklist)

- [x] Skill loaded: `skills/quality-gate/SKILL.md` (cited, §3 routing table row "engineering → review-risk")
- [x] Template read: `agents/engineering/review-risk.md` (mounted craft — full methodology §§Review Focus/Design Principles/DSA/Pattern/Workflow/Output)
- [x] Output shape read: `skills/quality-gate/references/gate-report.md`
- [x] **Divergence:** packet item 4 (`skills/quality-gate/references/engineering/risk-review.md`) DOES NOT EXIST on disk — and by design: `quality-gate/SKILL.md:76` lists exactly 5 engineering checklists (no risk) and `gate-report.md:15` records review-risk as "fast gate note". The risk checklist IS the template. Recorded as R-06 below; no halt (STOP was to prevent reviewing unloaded — process+craft both loaded).
- [ ] Execution mode declared: multi-subagents ✅
- [ ] Packet intact: SPEC/HARD/GATE/DOMAINS by reference ✅; GATE none-yet ✅

## Risk Findings

| ID | Risk | Sev | Assessment | Mitigation | Evidence |
|----|------|-----|------------|------------|----------|
| R-01 | **Operational — single-dispatcher bottleneck.** montilla is sole routing point; dispatch throughput bounded by CEO; `task(general)` max 2 parallel caps fan-out. Stalled-work risk if the CEO doesn't act on brief-back. | **Medium (conditional)** | Pre-existing accepted design (ADR-003), not newly introduced — this change formalizes and uniformizes it. Mitigations are strong: the 4-field Cross-domain request returns **inside the agent's return** (no new file, no channels to lose), CEO must delegate **or resolve** and tell the requester; c-levels/specialists work end-to-end (no delegation chains); escalation path FAIL→retry N=2→montilla exists. Condition: CEO brief-triage commitment (COND-R2). | 4-field brief + resolve-or-delegate + tell-requester loop; end-to-end work rule; max-2-parallel cap; escalation N=2. | ADR-003:75-76 (negative consequence acknowledged); tool-mapping.md:8 (rule clause); review-risk.md:94-101 (brief-back shape); frame-ship.ts:19,34 (sole-caller strings). |
| R-02 | **Regulatory — Ley 172-13 / DGII / e-invoice.** Does the change touch personal-data, tax/e-invoice, or filings? | **None (verified N/A)** | Wording-only change: no data flows, no PII, no secrets, no external sends/filings/launches anywhere in the change set. Both specs carry prohibition-only scans (eng REQ-NF-001, people REQ-NF-004) and REFUTED-without-proof applies. barrera attestation on file. | Prohibition-clause scans as gate evidence; barrera attestation; no data-plane surface by construction. | ENG SPEC:63 (data lens N/A); ADR-003:83-87 ("no data migration, no external undo"); santana PROPOSED_CHANGES:114; barrera SECURITY_REVIEW-single-dispatcher.md. |
| R-03 | **Rollback — reversibility of a 77-file change set.** | **Low** | Verified good: §Rollback Points table exists with one revert point per layer (plugin / skills ×7 lines / tool-mapping / AGENTS.md ×3 / ADR / evidence docs) and ETA < 15 min total; people side < 5 min per commit (one contract pass per commit). Working tree is currently uncommitted (rollback now = checkout/stash); once montilla commits per-surface, `git revert <commit>` per plan. Nuance: plan's ADR row says "no delete" — correct for this execution unit (ADR filed at propose-changes), but whole-initiative rollback deletes the ADR file (ADR-003:86). | Per-layer revert table + ETA; per-surface commits; tsc re-run on plugin revert; HANDOFF carries rollback note. | IMPLEMENTATION_PLAN-single-dispatcher.md:38-49; ADR-003:81-87; santana PROPOSED_CHANGES:110; `git status --short` (all M, uncommitted); git log 5221ab6/862d9a4/3f74de0 (per-surface commit precedent). |
| R-04 | **Adoption — cross-layer lockstep failure (68 templates + 9 skills + plugin + 3 AGENTS.md).** | **Low (after verification)** | Verified consistent on disk: 77/77 files carry the uniform sentence word-for-word (incl. people spec W2 at :76 — the refuter's grep falsifies readability RD-002's "not in people spec" claim), version sync 4/4 at v0.3.3, review-risk.md:33 reads exactly "montilla (CEO) dispatches `security`" (the dispatch authority is CEO-scoped, not orchestrator-scoped), old-model residue repo-wide = 1 hit and it is the ALLOWED mechanism description in tool-mapping.md:8 (exempt per ADR-003:56-59). Canonical wording single-sourced in people spec §4 W1-W8. | Canonical strings in one place; verbatim consumption; cross-file diff = 0 target; greps per layer (77/77, residue=0); refuter adversarial check. | refuter-review.md:32 (77/77 exact, 0 divergent); SPEC-single-dispatcher-people.md:76 (sentence in W2 block); frame-ship.ts:2,:10-11 + plugins/AGENTS.md:4 (v0.3.3 sync); agents/engineering/review-risk.md:33; rg old-verbs = 1 allowed hit (tool-mapping.md:8). |
| R-05 | **Continuity — chain order / frontmatter / packet tokens.** | **None** | Verified: plugin CHAIN const untouched (frame-ship.ts:13-14), stage order files unchanged, skill frontmatter contract untouched (name/description only — spec §5 out-of-scope), W1-W8 strings contain no packet tokens SPEC/HARD/GATE/DOMAINS (mechanism-compat attestation), reference-only packet discipline preserved verbatim in plugin strings and stage skills. | Out-of-scope freeze (§5); REQ-NF-006 attestation; plugin diff limited to injected strings. | frame-ship.ts:13-14,:24-28 (GUARDRAILS unchanged shape); santana PROPOSED_CHANGES:130; ENG SPEC:65-73. |
| R-06 | **Doc-truth hygiene (Low ×3):** (a) plan REQ-002 default says v0.3.1, disk is v0.3.3 — the 4 version locations are internally consistent (AC-002 holds), the plan's default was superseded by later bumps; (b) plan step 7 records "4 prompt files present on disk (untracked leftovers)" but `skills/templates/implementers/` does NOT exist at review time — evidence-record inaccuracy, behavior-neutral now that REQ-007 is CANCELLED; (c) live session markers may show v0.3.0 until opencode restart — documented plugin behavior. | **Low (hygiene)** | Fix the plan/TEST_MATRIX evidence records (COND-R3); restart note already documented in plugins/AGENTS.md:27; 4-location version sync verified — no action beyond annotation. | IMPLEMENTATION_PLAN:17 (v0.3.1), :22 (prompts existence claim) vs disk v0.3.3 (frame-ship.ts:2,:10) and dir absent (Test-Path skills/templates/implementers = false); plugins/AGENTS.md:27. |
| R-07 | **Coordination — REQ-007/REQ-F-008 CANCELLED vs proposal text.** Both PROPOSED_CHANGES documents still list prompt restoration/wording-binding rows; people AC-REQ-F-008 (grep 4/4) is voided for the engineering track by CEO decision #3. Without a gate note, santana's people gate could fail a voided AC (or the test matrix could be cited for a false "restored" claim). | **Medium (conditional)** | GATE_REPORT records the cancellation + CEO decision #3; santana confirms W8 wording still binds any FUTURE restoration; no files created under skills/templates/implementers/ (verified absent). | HARD packet ("REQ-007/REQ-F-008 CANCELLED"); IMPLEMENTATION_PLAN:22,:35,:48,:61; people PROPOSED_CHANGES REQ-F-008 row; Test-Path result. |

## Conditions for Opening (COND-00x)

- [ ] **COND-R1** — GATE_REPORT records REQ-007/REQ-F-008 CANCELLED (CEO decision #3) with santana sign-off that W8 remains the binding wording for any future restoration.
- [ ] **COND-R2** — montilla (CEO) attests brief-triage commitment in HANDOFF: every Cross-domain request received gets delegate-or-resolve in-session (P0 immediate; P1/P2 same-session), bounding the single-DOA bottleneck (R-01).
- [ ] **COND-R3** — IMPLEMENTATION_PLAN step-7 existence claim corrected (dir absent at review) or TEST_MATRIX annotated "existence check N/A — superseded by cancellation", so evidence records stay truthful (R-06b).

## Assumptions

- Gate synthesis (GATE_REPORT) and remaining reviewer artifacts (reliability, resilience, security, domain C-level sign-offs) are outside this review's scope; verdicts merged by the gate keeper per `quality-gate/SKILL.md:60`.
- "Reversible per commit" interpreted as: montilla commits per-surface after this gate; `git revert` then restores any single layer (implied by plan §Rollback Points + commit convention).
- v0.3.3 on disk is the authoritative version (sessions not restarted keep stale markers — documented behavior, not a repo defect).

## Cross-domain request

None raised — single domain (engineering/people wording + mechanical 8-set application), no other domain/specialist work needed. (Per template: brief-back to montilla only on genuine cross-domain need.)

## Scoped evidence (file:line, all verified this session)

- Uniform sentence 77/77: refuter-review.md:32; spot-verified plugin `frame-ship.ts:19,:34`, root `AGENTS.md:37`, `skills/AGENTS.md:26`, `.opencode/plugins/AGENTS.md:19`, `SPEC-single-dispatcher-people.md:76`, tool-mapping.md:8,:17,:35, bootstrap-checklist.md:11, translate-to-spec:29,:32, propose-changes:25,:30, execute-spec:23,:33, c-level/engineering/security/legal/marketing/finance/people/revenue template samples.
- Version 4/4: frame-ship.ts:2 (header) = :10 (VERSION) = :11 (MARKER derived); plugins/AGENTS.md:4.
- review-risk.md:33: "For deep audit, montilla (CEO) dispatches `security`" — CEO-scoped, correct.
- Residue: repo-wide old-verb grep in engineering layer = 1 hit, allowed mechanism description (tool-mapping.md:8, ADR-003:56-59 exemption).
- Rollback: IMPLEMENTATION_PLAN:38-49 (table, ETA < 15 min at :40); ADR-003:81-87.
- Regulatory: ENG SPEC:63; ADR-003:83-85; santana PROPOSED_CHANGES:114; barrera SECURITY_REVIEW on file.
- Git: `git status --short` — all changed files `M` (uncommitted), 12 untracked in-scope deliverables; prompts dir absent; git log confirms per-surface commit precedent + prompt deletions at fdfca0a..7fe71c8.

## Sign-off

- [x] All findings documented with severity + mitigation + evidence
- [ ] Conditions COND-R1..R3 cleared at gate synthesis (gate keeper / montilla)
- [ ] Verdict: **APPROVE with conditions** — no REQUEST_CHANGES, no security escalation