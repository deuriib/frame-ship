# QA Review: grilling-integration (C1–C4 skill wording + matrices + proposals)

**Reviewer:** qa (runs the real suite — behavior, not logic audit)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 3/4
**Packet:** SPEC:C1–C4 skill-text diffs + `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (14 rows) + both PROPOSED_CHANGES + SPECS + brief (read-only) / HARD:multi-subagents gate wave 3/4; RUN the verifiable checks myself; docs-only change → typecheck N/A justified by 0 .ts/.json in diff / GATE:arch Approved, security Conditional; prior verdicts (refuter/reliability/readability/resilience, all CONDITIONAL) taken as input, never re-decided / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/engineering/qa-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`). Domain role understood before acting: execute tests and verify behavior; do not merely audit logic.

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + `skills/quality-gate/references/engineering/qa-review.md`. Prior findings referenced by ID only (CE-xxx, RL-xxx, RD-xxx, RS-xxx); only test-claim verification is owned here.

## Checklist (qa-review.md × matrices)

- [⚠️] All acceptance criteria have tests — AC-001..005 + AC-SEC-001..005 traced, but trigger-evasion negative, thin-waiver FAIL demo, dead-link FAIL demo, multi-waiver demo, exit-terminal trace, N+1 FAIL demo are all unproven (QA-003..QA-008)
- [⚠️] All REQ-IDs traceable to test IDs — trace present per row, but E-020 wears a pass label while co-sign is outstanding (QA-002) and T-007 overclaims 4/4 (QA-001)
- [✅] Unit + integration + e2e coverage as appropriate — N/A accepted: lane diff is docs-only, 0 `.ts`/`.json` in `48757e8..94af54a` (Q8 below); no runtime/plugin/package change
- [⚠️] Regression suite updated — banned-lexicon + secret-shape greps are manual `rg` logs with no CI hook; drift re-opens silently (T-009 already demonstrates shipped-text regression)
- [✅] No flaky tests introduced — all evidence is deterministic Review-type + `rg` exit codes; re-ran stable across this session
- [⚠️] Coverage threshold met — 21/21 + 13/14+routed rows exist, but 2 cells mislabeled (QA-001, QA-002) inflate the pass count
- [⚠️] Manual exploratory testing done — gap probes A/B/C below executed live; exit-path and N+1-path exploration impossible by construction (no terminal rule, no numeric cap)

## Traceability (independently re-ran, not read)

| REQ-ID | Test ID | Type | Claimed | Re-ran | ✅/⚠️/❌ |
|--------|---------|------|---------|--------|----------|
| REQ-001 | E-001..E-006 | Review | pass | clauses present (`salir`, `una sola pregunta`, `estar mal`, `hard cap`, `solo sube`, `Framings-Considered` all hit in C1/C2 text, Q6); diff +22 exact (Q7) | ✅ |
| REQ-002 | E-007..E-014 | Review | pass | trigger list + one-pass + untouched rule present verbatim (read `propose-changes/SKILL.md:36-53`); diffs +19/+12/+8 exact (Q7) | ✅ |
| REQ-005/006 | E-016/E-017 | Review | pass | no new skill dir/stage/reviewer/dep in lane file list; N=2 present C3/C4, absent C1/C2 (matches RL-002, not re-decided) | ✅ |
| REQ-NF-001 | E-018 | Review | pass | Q1: word-boundary `rg` over `skills/frame-intent/ + skills/propose-changes/` → **0 hits, exit 1** | ✅ |
| REQ-NF-001 | E-019 | Review | pass | Q4: raw-assign `rg` over all four skill dirs → **0 hits, exit 1**; Q3 lane-diff shape scan → no value lines | ✅ |
| REQ-P-001..006 | E-020 | Sign-off | pass (impl) / pending co-sign at gate | Q10: cell text confirmed verbatim; **people co-sign still outstanding** (no `people-review.md` in `quality-gate/grilling-integration/` at audit time) | ⚠️ QA-002 |
| REQ-SEC-001/005 | T-001/T-005 | Review | pass | three-block bar + record table + residual lines present at cited lines | ✅ |
| REQ-SEC-002 | T-002 | Review | pass | CLOSED-authority + re-review ban + N=2 present; routing table §3 unaltered in diff | ✅ |
| REQ-SEC-003/004 | T-003/T-004 | Review | pass | 0 raw values (Q3/Q4); checkpoint notes present in 3 refs | ✅ |
| REQ-SEC-006 | T-006 | Review | pass | Q5a: `no-freelance-fix` hits in **4/4** refs (qg-SKILL:84, vh-SKILL:47, waiver:52, gate-report:57) | ✅ |
| REQ-SEC-007 | T-007 | Review | pass | Q5b: `proof-or-refuted` in 4/4 refs BUT Q5c: `Critical/High` triage line in **3/4 only** (waiver-template:54 carries proof-line, **no Critical/High line**) — cell claim "incl. Critical/High same-session line" is factually wrong | ❌ QA-001 |
| REQ-P-003 | T-009 | Review | fail (routed) | Q2: word-boundary `rg` over `skills/quality-gate/ + skills/verify-handoff/` → **exactly 5 `interrogat*` hits** (qg-SKILL:66,69,73,78 + waiver:30); new C3/C4 text = 0 hits. Routed, not re-decided | ✅ (claim verified) |
| REQ-P-006 | T-010 | Review | pass | masking clauses 4/4; warmth paraphrase avoids banned tokens (Q1 covers new text) | ✅ |

## Coverage

- Line coverage: N/A (docs-only skill-text; justification: 0 `.ts`/`.json` in lane commits `48757e8..94af54a`, Q8)
- Branch coverage: N/A (same justification)
- Acceptance criteria coverage: 10/10 traced, **6/10 behaviorally proven**; 4 unproven without demos (thin-waiver substance, dead-link substance, trigger-evasion negative, every-vs-sample multi-waiver) + 2 untestable by construction (exit-terminal, C2 N+1 while N undefined)
- Machine-checkable rows re-ran: 9/9 reproduced (E-018, E-019, E-006/E-012 stats, T-003, T-006, T-009 hit set, T-010, typecheck-N/A file boundary, row counts 23/16 pipe-rows = 21+2 / 14+2)

## Commands + outputs (actual, this session)

- Q0 tree: `git status --porcelain` → clean except untracked sibling `review-risk.md` (not mine, untouched); `git log --oneline -15` → lane sequence `48757e8, 1f0cd22, e80129c, 91c7631, 289f7b0, 6f17251, 94af54a` + 4 gate verdict commits, all present.
- Q1 eng-6 banned: `rg -i -n "\b(relentless|interrogat\w*|drill|corner|trap)\b" skills/frame-intent/ skills/propose-changes/` → **no hits, exit 1** ✅.
- Q2 sys-wide banned: same `rg` over `skills/quality-gate/ skills/verify-handoff/` → **5 hits** (`SKILL.md:66,69,73,78` + `waiver-template.md:30`), exit 0 ✅ (matches CE-001/T-009 exactly).
- Q3 lane-diff secret-shape: `git diff -U0 48757e8^..HEAD -- skills/...` piped to value-pattern scan → **no value lines** ✅.
- Q4 raw-assign: `rg -i -n "password\s*[:=]\s*\S+|api_key\s*[:=]\s*\S+|BEGIN [A-Z ]*PRIVATE KEY"` over four skill dirs → **no hits, exit 1** ✅.
- Q5a/b/c clause grep: `no-freelance-fix` 4/4 ✅; `proof-or-refuted` 4/4 ✅; `Critical/High` **3/4 (waiver-template absent)** ❌ → QA-001.
- Q6 clause presence: `salir`, `una sola pregunta`, `estar mal`, `hard cap`, `solo sube`, `one-pass`, `Framings-Considered` all hit C1/C2 text ✅.
- Q7 diff stats: `git show --stat 48757e8` → frame-intent **+22** ✅; `1f0cd22` → propose-changes **+19**, template **+12**, risk **+8** ✅; `e80129c` waiver 34+/3-; `91c7631` qg-SKILL +23; `289f7b0` gate-report +35; `6f17251` vh-SKILL +19, dod +3/-1 ✅.
- Q8 typecheck N/A: `git log --name-only --pretty=format: 48757e8..94af54a | Sort-Object -Unique | Select-String "\.ts$|\.json$|\.opencode"` → **no matches** ✅ (docs-only justified).
- Q9 artifacts: both SAMPLE files + security IMPLEMENTATION_PLAN exist ✅.
- Q10 E-020: cell reads `pass (impl) / pending co-sign at gate` verbatim ⚠️ → QA-002.

## Gap probes (ran live — the demos prior reviewers flagged missing)

- **PROBE-A thin-waiver (RL-006/RR-C34-1):** fed a vacuous-but-complete waiver (`Accepted-risk: low because low / Compensating-controls: will be careful (owner: someone) / Expiry: later / Sign-off: me / Residual-risk: none`) through the C3 presence vocabulary — all five presence checks (`Accepted-risk`, `Compensating-controls`, `Expiry`, `Sign-off`, `Residual-risk`) return **PASS**, substance rejection is **NOT-CHECKED-BY-TEXT**. Gap confirmed runnable: box-ticking passes the letter of C3. ⚠️
- **PROBE-B dead-link (RL-006):** `dod-checklist.md:10` rule is `link present; attestation-alone = FAIL; missing link = FAIL` — presence of a link string satisfies the rule; resolvability/relevance is never tested. A dead or irrelevant URL passes the letter of C4. Gap confirmed runnable. ⚠️
- **PROBE-C trigger-evasion negative (RL-003/L-3):** C2 prongs require the literal words `customers/regulators/revenue` (SKILL.md:41) or auth/data/API/PII surface. Input "API change for users, internal consumers only" carries none of the blast-radius words and self-reports its radius as internal-only — no prong fires without approver request. Synonym table + independent scan rule absent, so the negative (evasion → still fires) **cannot pass today**. Gap confirmed. ❌ (same root as RL-001-class High: untestable-by-construction until hardened)
- **Multi-waiver / every-vs-sample:** no 3-CONDITIONAL fixture exists in tree — cherry-pick rejection unproven. ⚠️
- **Exit-terminal:** both SAMPLE files show happy-path `sí` only; no `salir`-mid-round trace exists — terminal rule unproven (and undefined at C3/C4 per RL-007). ⚠️
- **C2 N+1:** `máx N` undefined in normative text — an over-cap FAIL demo is unconstructible until the cap binds. ❌

## Findings

| ID | Severity | Location | Finding | ✅/⚠️/❌ |
|----|----------|----------|---------|----------|
| QA-001 | High | `docs/specs/40_workspace/security/TEST_MATRIX.md:19` (T-007) | Cell claims "Proof-or-refuted + Critical/High same-session triage clauses in all 4 prose refs". Re-ran Q5c: `Critical/High` present in 3/4 refs only — `waiver-template.md:54` carries the proof-line but **no Critical/High line**. Same root as CE-002. One-line matrix correction (→ "3/4 for the triage line; proof-line 4/4") or add the line via new proposal. | ❌ |
| QA-002 | High | `docs/specs/40_workspace/engineering/TEST_MATRIX.md:37` (E-020) | Status `pass (impl) / pending co-sign at gate` with REQ-P-004 co-sign still outstanding (no people-reviewer verdict in `quality-gate/grilling-integration/` at audit time). A pass with an open co-sign is a CONDITIONAL. Same root as CE-004/RD-008. Relabel conditional until people co-sign lands. | ❌ |
| QA-003 | High | C2 budget (`skills/propose-changes/SKILL.md:42-44`) | `máx N` undefined → N+1 FAIL demo unconstructible; PROBE-C evasion negative cannot pass. Shares fix with COND-R1/COND-S2/COND-D4. Blocks any OPEN reading of C2. | ❌ |
| QA-004 | Med | C3 substance (`gate-report.md:39-43`) | PROBE-A: vacuous waiver passes all presence checks. Carried RR-C34-1/RL-006; needs substance rubric or explicit reviewer-judgment FAIL reason, plus thin-waiver FAIL demo. | ⚠️ |
| QA-005 | Med | C4 substance (`dod-checklist.md:10`) | PROBE-B: dead/irrelevant link passes presence rule. Needs link-resolution FAIL demo. | ⚠️ |
| QA-006 | Med | C3 scope (`quality-gate/SKILL.md:68-79`) | Multi-waiver demo absent — every-not-sample fix + 3-waiver fixture (shares fix with COND-R4/COND-S3/COND-D2). | ⚠️ |
| QA-007 | Med | Exit paths (C2 `:53`, C3 `:64`, C4 `:51-52`) | No `salir`-mid-round trace; terminal undefined at C3/C4. Needs exit-terminal rule + recorded `grill: exited` + escalate demo (shares fix with COND-R2/COND-S1). | ⚠️ |
| QA-008 | Low | Regression harness | All evidence is manual `rg` logs; no CI grep hook. T-009 proves drift re-opens silently. Recommend a checked-in grep script or gate-time re-run rule. | ⚠️ |

No Critical (docs-only unit; no data-loss/corruption/prod surface).

## Verdict Rationale

OPEN is unavailable: two mislabeled matrix cells (QA-001 factually wrong, QA-002 premature pass) plus three probe-confirmed gaps that fail-or-cannot-run today (QA-003 evasion/N+1, QA-004 thin-waiver substance, QA-005 dead-link substance) mean the suite as a whole does not prove what it claims. CLOSED is unwarranted: every machine-checkable row I re-ran reproduced exactly (9/9: banned-lexicon 0/5 split, secret-shape 0, clause presence, diff stats, row counts, typecheck-N/A boundary, T-009 hit set, T-006 4/4, artifact existence) — the matrices disclose rather than inflate, and the routed fail (T-009) is honest. **CONDITIONAL** is correct, aligned with all four sibling verdicts: conditions COND-Q1..Q4 below must clear, overlapping sibling conditions by design (one fix clears all lenses).

### Conditions to clear (COND-Q1..Q4, QA-owned)

- [ ] COND-Q1 (QA-001, shares fix with CE-002): correct T-007 cell to "proof-line 4/4, Critical/High triage 3/4" — or land the triage line in waiver-template via new proposal. One-line edit.
- [ ] COND-Q2 (QA-002, shares fix with CE-004/COND-D5): relabel E-020 to conditional + coverage line "20/21 pass + 1 conditional (co-sign pending)" until people-reviewer co-sign (REQ-P-004) lands.
- [ ] COND-Q3 (QA-003 + QA-006 + QA-007, shares fix with COND-R1/R2/R4 + COND-S1/S2/S3): numeric C2 cap + pass-definition + synonym/scan rule + every-not-sample + exit-terminal in skill text, each with a runnable negative demo (N+1 FAIL, evasion → still fires, 3-waiver rows, `salir`-mid-round trace).
- [ ] COND-Q4 (QA-004 + QA-005, thin/dead substance): thin-waiver FAIL demo + dead-link FAIL demo, or an explicit substance rubric / reviewer-judgment FAIL reason recorded as COND-risk rather than silent.

## Risks

- Thin-but-polite waiver passes C3 by box-ticking — PROBE-A demonstrated live; carried RR-C34-1/RL-006 (owner barrera; watcher security-reviewer).
- E-020 read as OPEN-ready at synthesis — gate must treat it as CONDITIONAL until people co-sign (REQ-P-004).
- T-007 4/4 claim copy-pasted into the gate report — synthesis must use the corrected 3/4 before ship.
- "Budgets enforced" read as mechanical guarantee — PROBE-C shows caps are declarative with no counter (carried CE-003/RR-R2, owner engineering owner).
- T-009/CE-001 tone conflict ships unresolved if gate does not rule — carried RR-C34-3 (owner santana/people owner); new text verified clean, §4b + waiver:30 keep banned tokens.

## Assumptions

1. Prior verdicts taken as GATE input, never re-decided: refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (RL-001..011, COND-R1..R5) + readability CONDITIONAL (RD-001..011, COND-D1..D5) + resilience CONDITIONAL (RS-001..010, COND-S1..S4) + arch Approved + security Conditional (C-1..C-6).
2. Sibling-lane commits `48757e8..94af54a` are the complete C1–C4 diff per refuter assumption-3; tree verified clean at audit time (save untracked sibling `review-risk.md`, untouched).
3. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given.
4. People-owner ruling (T-009/CE-001 tone + CE-005 paraphrase blessing + E-020 co-sign) arrives via people-reviewer at quality-gate; this review writes the test-evidence conditions, not the ruling.
5. CE-005 independently reproduced: people SPEC `:75` insert #4 contains `relentless`, so shipped warmth text is correctly a paraphrase (T-010 deviation recorded); strict-verbatim would fail by design.

## Scoped Evidence (reference-only, allowlisted)

- `skills/frame-intent/SKILL.md:51-71` (C1) + `skills/propose-changes/SKILL.md:36-53` (C2) + `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `references/gate-report.md:32-65` + `references/waiver-template.md:14-54` + `references/dod-checklist.md:10-11` + `references/proposal-template.md:43-53` + `references/risk-assessment.md:29-35`
- `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (23 pipe-rows = header + sep + 21 data) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (16 pipe-rows = header + sep + 14 data) + both PROPOSED_CHANGES + both SAMPLE files + `ARCHITECTURE_REVIEW.md` (Approved) + `SECURITY_REVIEW.md` (Conditional C-1..C-6) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only)
- Sibling verdicts (input, not re-decided): `review-refuter.md` (CE-001..005) + `review-reliability.md` (RL-001..011) + `review-readability.md` (RD-001..011) + `review-resilience.md` (RS-001..010)
- Commands (all re-ran this session, outputs inline above): word-boundary banned-lexicon `rg` (0 / 5 split); raw-assign `rg` (0); clause-presence `rg`; `no-freelance-fix` / `proof-or-refuted` / `Critical/High` greps (4/4, 4/4, 3/4); `git show --stat` ×6 (diffs exact); `git log --name-only` runtime-file boundary (0 `.ts`/`.json`); row counts; PROBE-A/B/C live demos
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/qa-review.md` (checklist authority for this verdict)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) at gate:** COND-Q2 co-sign (E-020, REQ-P-004) + COND-R5 ruling (T-009/CE-001 `interrogat*` keep vs reword + CE-005 paraphrase blessing) + exit-terminal wording co-sign.
2. **Engineering owner (vasquez) at gate:** COND-Q3 mechanics (C2 cap, trigger hardening, every-not-sample, exit-terminal) + COND-Q1 acknowledgment (T-007 correction is matrix-only, no skill change).
3. **Security owner (barrera) at gate:** COND-Q4 substance backstop (thin-waiver/dead-link reviewer-judgment rule) + residual-risk watch (RR-C34-1) + C-1..C-6 clearance carry.
4. **Orchestrator (montilla):** TTL re-confirm at synthesis; LICENSE open question stays with orchestrator (C-5); synthesis must use corrected T-007 (3/4) and E-020 (conditional) counts, not the matrices' labels.
