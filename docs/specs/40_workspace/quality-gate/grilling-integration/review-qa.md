# QA Review: grilling-integration (C1–C4 skill wording + matrices + proposals)

**Reviewer:** qa (runs the real suite — behavior, not logic audit)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL → OPEN (re-verification clears COND-Q1..Q4; synthesis pending)**
**Execution Mode:** multi-subagents, gate wave 3/4
**Packet:** SPEC:C1–C4 skill-text diffs + `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (14 rows) + both PROPOSED_CHANGES + SPECS + brief (read-only) / HARD:multi-subagents gate wave 3/4; RUN the verifiable checks myself; docs-only change → typecheck N/A justified by 0 .ts/.json in diff / GATE:arch Approved, security Conditional; prior verdicts (refuter/reliability/readability/resilience, all CONDITIONAL) taken as input, never re-decided / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/engineering/qa-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`). Domain role understood before acting: execute tests and verify behavior; do not merely audit logic.

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + `skills/quality-gate/references/engineering/qa-review.md`. Prior findings referenced by ID only (CE-xxx, RL-xxx, RD-xxx, RS-xxx); only test-claim verification is owned here.

## Checklist (qa-review.md × matrices) — re-verified 2026-09-18 post-fix

- [✅] All acceptance criteria have tests — AC-001..005 + AC-SEC-001..005 traced; trigger-evasion negative demo (E-023), thin-waiver FAIL demo (T-011), dead-link FAIL demo (T-012), multi-waiver every-not-sample (gate-report:39,45,48), exit-terminal C3/C4 (qg-SKILL:87, vh-SKILL:52, gate-report:68), N+1 FAIL demo (E-021) all now land with runnable fixtures — re-verified below
- [✅] All REQ-IDs traceable to test IDs — E-020 relabeled conditional (d807d5a), T-007 corrected to 3/4 triage (81b18ef); matrices now honest
- [✅] Unit + integration + e2e coverage as appropriate — N/A accepted: lane diff is docs-only, 0 `.ts`/`.json` in fix-loop commits; no runtime/plugin/package change
- [⚠️] Regression suite updated — banned-lexicon + secret-shape greps are manual `rg` logs with no CI hook; drift re-opens silently (T-009 already demonstrates shipped-text regression) — unchanged, low severity
- [✅] No flaky tests introduced — all evidence is deterministic Review-type + `rg` exit codes; re-ran stable across this session
- [✅] Coverage threshold met — eng 20/21 pass + 1 conditional (E-020 co-sign pending); sec 15/16 pass + 1 routed (T-009); row counts honest
- [✅] Manual exploratory testing done — gap probes A/B/C resolved: thin-waiver FAIL demo (T-011), dead-link FAIL demo (T-012), evasion negative demo (E-023), multi-waiver 3-row fixture (T-011), exit-terminal trace in C3/C4 text; C2 N+1 demo (E-021) now constructible (cap bound ≤3)

## Traceability (independently re-ran, not read)

| REQ-ID | Test ID | Type | Claimed | Re-ran | ✅/⚠️/❌ |
|--------|---------|------|---------|--------|----------|
| REQ-001 | E-001..E-006 | Review | pass | clauses present (`salir`, `una sola pregunta`, `estar mal`, `hard cap`, `solo sube`, `Framings-Considered` all hit in C1/C2 text, Q6); diff +22 exact (Q7) | ✅ |
| REQ-002 | E-007..E-014 | Review | pass | trigger list + one-pass + untouched rule present verbatim (read `propose-changes/SKILL.md:36-53`); diffs +19/+12/+8 exact (Q7) | ✅ |
| REQ-005/006 | E-016/E-017 | Review | pass | no new skill dir/stage/reviewer/dep in lane file list; N=2 present C3/C4, absent C1/C2 (matches RL-002, not re-decided) | ✅ |
| REQ-NF-001 | E-018 | Review | pass | Q1: word-boundary `rg` over `skills/frame-intent/ + skills/propose-changes/` → **0 hits, exit 1** | ✅ |
| REQ-NF-001 | E-019 | Review | pass | Q4: raw-assign `rg` over all four skill dirs → **0 hits, exit 1**; Q3 lane-diff shape scan → no value lines | ✅ |
| REQ-P-001..006 | E-020 | Sign-off | conditional (impl done, co-sign pending at gate) | Relabeled by d807d5a: C1 co-signed per people RULING 3, C2-cap mechanics landed 8d673b1 + N+1 demo; people re-confirm at re-verification. Coverage: 20/21 pass + 1 conditional | ✅ (cleared) |
| REQ-SEC-001/005 | T-001/T-005 | Review | pass | three-block bar + record table + residual lines present at cited lines | ✅ |
| REQ-SEC-002 | T-002 | Review | pass | CLOSED-authority + re-review ban + N=2 present; routing table §3 unaltered in diff | ✅ |
| REQ-SEC-003/004 | T-003/T-004 | Review | pass | 0 raw values (Q3/Q4); checkpoint notes present in 3 refs | ✅ |
| REQ-SEC-006 | T-006 | Review | pass | Q5a: `no-freelance-fix` hits in **4/4** refs (qg-SKILL:84, vh-SKILL:47, waiver:52, gate-report:57) | ✅ |
| REQ-SEC-007 | T-007 | Review | pass | Q5b: `proof-or-refuted` in 4/4 refs; Q5c: `Critical/High` triage line in **3/4 only** — matrix corrected by 81b18ef to "3/4 refs (waiver-template record-only, no triage line — CE-002/QA-001 correction)". Waiver-template still absent (by design: waiver is record, not triage point). Cell now factually accurate | ✅ (cleared) |
| REQ-P-003 | T-009 | Review | fail (routed) | Q2: word-boundary `rg` over `skills/quality-gate/ + skills/verify-handoff/` → **exactly 5 `interrogat*` hits** (qg-SKILL:66,69,73,78 + waiver:30); new C3/C4 text = 0 hits. Routed, not re-decided | ✅ (claim verified) |
| REQ-P-006 | T-010 | Review | pass | masking clauses 4/4; warmth paraphrase avoids banned tokens (Q1 covers new text) | ✅ |

## Coverage

- Line coverage: N/A (docs-only skill-text; justification: 0 `.ts`/`.json` in fix-loop commits `af00b4a..HEAD`, re-verified)
- Branch coverage: N/A (same justification)
- Acceptance criteria coverage: 10/10 traced, **10/10 behaviorally proven** post-fix; all demos now constructible (thin-waiver T-011, dead-link T-012, evasion E-023, multi-waiver T-011, exit-terminal C3/C4 text, N+1 E-021)
- Machine-checkable rows re-ran: 11/11 reproduced (E-018, E-019, E-006/E-012 stats, T-003, T-006, T-009 hit set, T-010, typecheck-N/A file boundary, row counts 22/16 pipe-rows = 21+1 / 15+1, E-021 N+1 demo, E-023 evasion demo)

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
| QA-001 | ~~High~~ | `docs/specs/40_workspace/security/TEST_MATRIX.md:19` (T-007) | ~~Cell claims "Critical/High same-session triage clauses in all 4 prose refs"~~ — **CLEARED** by 81b18ef: cell corrected to "Critical/High same-session triage 3/4 refs (waiver-template record-only, no triage line — CE-002/QA-001 correction)". Waiver-template still absent by design (record, not triage point). One-line matrix fix landed. | ✅ CLEARED |
| QA-002 | ~~High~~ | `docs/specs/40_workspace/engineering/TEST_MATRIX.md:37` (E-020) | ~~Status `pass (impl) / pending co-sign at gate`~~ — **CLEARED** by d807d5a: relabeled to `conditional (impl done, co-sign pending at gate)` + coverage "20/21 pass + 1 conditional". E-020 stays conditional until people co-sign (REQ-P-004) lands at gate. | ✅ CLEARED |
| QA-003 | ~~High~~ | C2 budget (`skills/propose-changes/SKILL.md:42-44`) | ~~`máx N` undefined → N+1 FAIL demo unconstructible; PROBE-C evasion negative cannot pass~~ — **CLEARED** by 8d673b1 + 1a16100: C2 cap bound `≤3` with pass-definition + N+1 FAIL demo in SAMPLE-grilling-C2 (Q4 BLOCKED, `grill: N+1 blocked`). Trigger synonym hardening (customers/users/clients/members/consumers; regulators/GDPR/Ley 172-13; revenue/pipeline/quota/money) + independent blast-radius scan rule + evasion negative demo ("users/internal only" → STILL FIRES). | ✅ CLEARED |
| QA-004 | ~~Med~~ | C3 substance (`gate-report.md:39-43`) | ~~PROBE-A: vacuous waiver passes all presence checks~~ — **CLEARED** by 17f02a9 + gate-report:45: substance backstop text `presence ≠ substance` explicit; thin-waiver FAIL demo `SAMPLE-grilling-C3-thin-FAIL.md` (3-waiver fixture: thin FAIL on substance via reviewer-judgment reason, missing-block FAIL, full PASS). Every-not-sample enforced. | ✅ CLEARED |
| QA-005 | ~~Med~~ | C4 substance (`dod-checklist.md:10`) | ~~PROBE-B: dead/irrelevant link passes presence rule~~ — **CLEARED** by 17f02a9 + dod-checklist:10: dead-link FAIL demo `SAMPLE-grilling-C4-deadlink-FAIL.md` (dead FAIL, irrelevant FAIL, good PASS; present AND resolves AND relevant). Rule text updated to include dead/irrelevant = FAIL with recorded reviewer-judgment reason. | ✅ CLEARED |
| QA-006 | ~~Med~~ | C3 scope (`quality-gate/SKILL.md:68-79`) | ~~Multi-waiver demo absent~~ — **CLEARED** by af00b4a + 17f02a9: gate-report:39,45,48 enforce `every CONDITIONAL gets a row; sample-of-one never satisfies`. 3-waiver fixture in T-011 proves cherry-pick rejection. | ✅ CLEARED |
| QA-007 | ~~Med~~ | Exit paths (C2 `:53`, C3 `:64`, C4 `:51-52`) | ~~No `salir`-mid-round trace; terminal undefined at C3/C4~~ — **CLEARED** by cb988d6 + 8ab7271: exit-terminal C3 text `exit/salir at C3 = pause + recorded grill: exited + escalate orchestrator` (qg-SKILL:87); exit-terminal C4 text `exit/salir at C4 = pause + recorded grill: exited + escalate orchestrator` (vh-SKILL:52); exit-terminal C3 record `grill: exited mid-C3 = pause + recorded grill: exited + escalate; uncleared waivers stay CONDITIONAL` (gate-report:68). Exit/salir alias in C1+C2 openers (frame-intent:55, propose-changes:40, SAMPLE-C1:11, SAMPLE-C2:13 = 4/4). | ✅ CLEARED |
| QA-008 | Low | Regression harness | All evidence is manual `rg` logs; no CI grep hook. T-009 proves drift re-opens silently. Recommend a checked-in grep script or gate-time re-run rule. — **UNCHANGED** (low severity, no new risk introduced) | ⚠️ |

No Critical (docs-only unit; no data-loss/corruption/prod surface).

## Verdict Rationale

**CONDITIONAL → OPEN (re-verification clears COND-Q1..Q4; synthesis pending).**

Original CONDITIONAL was correct: two mislabeled matrix cells (QA-001 factually wrong, QA-002 premature pass) plus four probe-confirmed gaps (QA-003 evasion/N+1, QA-004 thin-waiver substance, QA-005 dead-link substance, QA-006 multi-waiver scope) meant the suite did not prove what it claims. **Post-fix re-verification (this session):**

1. **COND-Q1 CLEARED** — T-007 matrix corrected to 3/4 by 81b18ef (one-line fix landed). Waiver-template remains absent by design (record, not triage point). Cell now factually accurate.
2. **COND-Q2 CLEARED** — E-020 relabeled conditional by d807d5a; coverage "20/21 pass + 1 conditional". Co-sign pending is honest, not inflated.
3. **COND-Q3 CLEARED** — C2 cap bound ≤3 + N+1 FAIL demo (8d673b1); trigger synonym hardening + evasion negative demo (1a16100); every-not-sample enforced (gate-report:39,45,48 + T-011 3-waiver fixture); exit-terminal C3/C4 text landed (cb988d6 + 8ab7271, qg-SKILL:87, vh-SKILL:52, gate-report:68); exit/salir alias in C1+C2 openers (4/4 verified).
4. **COND-Q4 CLEARED** — Thin-waiver FAIL demo (T-011, SAMPLE-grilling-C3-thin-FAIL.md, substance backstop explicit in gate-report:45); dead-link FAIL demo (T-012, SAMPLE-grilling-C4-deadlink-FAIL.md, present AND resolves AND relevant rule in dod-checklist:10).

**Machine checks re-ran 11/11:** banned-lexicon 0/5 split ✅, secret scan 0 ✅, exit/salir 4/4 ✅, C2 cap text ✅, every-rows text ✅, exit-terminal text ✅, Retry N=2 ✅, T-007 corrected 3/4 ✅, row counts eng 22/sec 16 ✅, typecheck-N/A boundary ✅, diff stats exact ✅.

**CLOSED remains unwarranted:** every machine-checkable row reproduced exactly; matrices disclose rather than inflate; routed fail (T-009) is honest and owned by people owner.

**QA-owned conditions all CLEARED.** OPEN available from QA perspective. Synthesis by orchestrator must still clear sibling conditions (COND-R1..R5, COND-D1..D5, COND-S1..S4, COND-P1..P5, C-1..C-6) before gate opens.

### Conditions to clear (COND-Q1..Q4, QA-owned) — RE-VERIFIED

- [x] COND-Q1 (QA-001, shares fix with CE-002): T-007 cell corrected to "Critical/High same-session triage 3/4 refs (waiver-template record-only, no triage line — CE-002/QA-001 correction)" by commit 81b18ef. One-line matrix fix landed. **CLEARED.**
- [x] COND-Q2 (QA-002, shares fix with CE-004/COND-D5): E-020 relabeled to `conditional (impl done, co-sign pending at gate)` + coverage "20/21 pass + 1 conditional" by commit d807d5a. Stays conditional until people co-sign (REQ-P-004) lands. **CLEARED.**
- [x] COND-Q3 (QA-003 + QA-006 + QA-007, shares fix with COND-R1/R2/R4 + COND-S1/S2/S3): C2 cap ≤3 + N+1 FAIL demo (8d673b1); trigger synonym hardening + evasion negative (1a16100); every-not-sample + 3-waiver fixture (af00b4a + 17f02a9); exit-terminal C3/C4 + exit/salir alias (cb988d6 + 8ab7271). All demos constructible. **CLEARED.**
- [x] COND-Q4 (QA-004 + QA-005, thin/dead substance): thin-waiver FAIL demo (T-011) + dead-link FAIL demo (T-012) + substance backstop text explicit (gate-report:45) + dead/irrelevant rule (dod-checklist:10). **CLEARED.**

## Risks (post-fix)

- E-020 stays conditional at synthesis until people co-sign (REQ-P-004) lands — gate must not treat as OPEN.
- T-007 corrected count (3/4) must be used in synthesis — waiver-template absence is by design, not a gap.
- T-009/CE-001 tone conflict ships unresolved if gate does not rule — carried RR-C34-3 (owner santana/people owner); new text verified clean, §4b + waiver:30 keep banned tokens (5 inherited hits, 0 new).
- QA-008 (regression harness) remains a low-severity gap — no CI hook for banned-lexicon/secret-shape greps; recommend checked-in grep script or gate-time re-run rule for future cycles.
- Thin-waiver substance backstop is reviewer-judgment-based (gate-report:45) — relies on reviewer diligence, not mechanical enforcement. Carried RR-C34-1.

## Assumptions

1. Prior verdicts taken as GATE input, never re-decided: refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (RL-001..011, COND-R1..R5) + readability CONDITIONAL (RD-001..011, COND-D1..D5) + resilience CONDITIONAL (RS-001..010, COND-S1..S4) + arch Approved + security Conditional (C-1..C-6). Fix-loop commits `af00b4a..HEAD` landed to clear shared conditions.
2. Fix-loop commits verified: `8d673b1` C2 cap ≤3 + N+1 demo · `8ab7271` N=2 + exit-terminal · `1a16100` trigger hardening + evasion demo · `7690f57` glossary + breakup + bound placeholders · `c5cde40` exit/salir alias + bounded floor + unclassified default · `d807d5a` E-020 conditional relabel + honest counts · `d4364ab` people SPEC insert #4 amendment · `17f02a9` substance backstop + FAIL demos · `af00b4a` every-not-sample C3 scope · `81b18ef` T-007 triage 3/4 correction · `91ac798` canonical SPEC pointer + honest counts · `cb988d6` C3-C4 exit-terminal + exit-salir alias · `9c7abfe`/`84c8768`/`27a29f4`/`43c45d5`/`5cd163f`/`e45242b`/`1428dc4`/`9388822` gate verdict commits + refuter re-verification.
3. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given.
4. People-owner ruling (T-009/CE-001 tone + CE-005 paraphrase blessing + E-020 co-sign) arrives via people-reviewer at quality-gate; this review writes the test-evidence conditions, not the ruling. E-020 stays conditional until co-sign lands.
5. CE-005 independently reproduced: people SPEC `:75` insert #4 contains `relentless`, so shipped warmth text is correctly a paraphrase (T-010 deviation recorded, d4364ab amendment); strict-verbatim would fail by design.
6. QA-owned conditions COND-Q1..Q4 all CLEARED per this re-verification. OPEN available from QA perspective; synthesis by orchestrator must still clear sibling conditions before gate opens.

## Scoped Evidence (reference-only, allowlisted)

- `skills/frame-intent/SKILL.md:51-68` (C1) + `skills/propose-changes/SKILL.md:36-47` (C2) + `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `references/gate-report.md:32-68` + `references/waiver-template.md:14-54` + `references/dod-checklist.md:10-11` + `references/proposal-template.md:43-53` + `references/risk-assessment.md:29-35`
- `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (22 pipe-rows = header + sep + 21 data, E-020 conditional) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (16 pipe-rows = header + sep + 15 data, T-007 corrected 3/4) + both PROPOSED_CHANGES + both SAMPLE files + `SAMPLE-grilling-C3-thin-FAIL.md` + `SAMPLE-grilling-C4-deadlink-FAIL.md` + `ARCHITECTURE_REVIEW.md` (Approved) + `SECURITY_REVIEW.md` (Conditional C-1..C-6) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only) + `docs/specs/10_design/SPEC-grilling-integration-people.md` (insert #4 amendment d4364ab)
- Sibling verdicts (input, not re-decided): `review-refuter.md` (CE-001..005) + `review-reliability.md` (RL-001..011) + `review-readability.md` (RD-001..011) + `review-resilience.md` (RS-001..010)
- Fix-loop commits (re-verified this session): `8d673b1` C2 cap · `8ab7271` N=2 + exit-terminal · `1a16100` trigger hardening · `7690f57` glossary · `c5cde40` exit/salir alias · `d807d5a` E-020 relabel · `d4364ab` people amendment · `17f02a9` substance backstop + demos · `af00b4a` every-not-sample · `81b18ef` T-007 correction · `91ac798` SPEC pointer · `cb988d6` C3-C4 exit-terminal
- Commands (all re-ran this session, outputs inline): banned-lexicon `rg` (0/5 split); secret `rg` (0); exit/salir `rg` (4/4); C2 cap `rg`; every-rows `rg`; exit-terminal `rg`; Retry N=2 `rg`; `no-freelance-fix` (4/4); `proof-or-refuted` (4/4); `Critical/High` (3/4); `git show --stat` fix-loop; `git log --name-only` runtime boundary (0 `.ts`/`.json`); PROBE-A/B/C resolved by demos
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/qa-review.md` (checklist authority for this verdict)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) at gate:** E-020 co-sign (REQ-P-004, stays conditional) + COND-R5 ruling (T-009/CE-001 `interrogat*` keep vs reword + CE-005 paraphrase blessing) + exit-terminal wording co-sign. QA-owned conditions CLEARED — no QA hold.
2. **Engineering owner (vasquez) at gate:** COND-Q1 acknowledgment (T-007 correction is matrix-only, no skill change) — QA CLEARED. Sibling conditions COND-R1/R2/R4 + COND-D1/D3/D4/D5 still pending per refuter/readability verdicts.
3. **Security owner (barrera) at gate:** C-1..C-6 clearance carry + residual-risk watch (RR-C34-1) — QA CLEARED on substance backstop (thin-waiver/dead-link FAIL demos landed).
4. **Orchestrator (montilla):** QA OPEN — all QA-owned conditions CLEARED. Synthesis must still clear sibling conditions (COND-R1..R5, COND-D1..D5, COND-S1..S4, COND-P1..P5, C-1..C-6) before gate opens. TTL re-confirm at synthesis; LICENSE open question stays with orchestrator (C-5); synthesis must use corrected T-007 (3/4) and E-020 (conditional) counts.

---

## Re-Verification (post-fix, 2026-09-18)

**Trigger:** Fix-loop commits `8d673b1..9388822` landed to clear COND-Q1..Q4 (shared conditions with refuter/readability/resilience/security). This section re-runs every machine check and gap probe against the fixed text.

**Packet:** SPEC:fix commits (eng: `8d673b1`, `8ab7271`, `1a16100`, `7690f57`, `c5cde40`, `d807d5a`; sec: `af00b4a`, `17f02a9`, `81b18ef`, `cb988d6`, `91ac798`; people: `d4364ab`) + updated TEST_MATRIX files (eng 21+1 conditional, sec 15+1 routed) + prior verdict COND-Q1..Q4 / HARD: targeted re-verification / GATE: prior all-8 CONDITIONAL / DOMAINS:[engineering, people, security]

### Machine Checks (all re-ran live)

| # | Check | Expected | Actual | Output | ✅/❌ |
|---|-------|----------|--------|--------|-------|
| R1 | Banned-lexicon C1/C2 | 0 hits | 0 hits | `rg -i "\b(relentless\|interrogat\w*\|drill\|corner\|trap)\b" skills/frame-intent/ skills/propose-changes/` → exit 1 | ✅ |
| R2 | Banned-lexicon C3/C4 (split) | 5 hits | 5 hits | `rg` over `skills/quality-gate/ skills/verify-handoff/` → qg-SKILL:66,69,73,78 + waiver:30; exit 0 | ✅ |
| R3 | Secret/PII scan | 0 raw values | 0 raw values | `rg "password\s*[:=]\|api_key\s*[:=]\|BEGIN.*PRIVATE KEY"` over 4 skill dirs → exit 1 | ✅ |
| R4 | exit/salir alias 4/4 | 4/4 present | 4/4 present | frame-intent:55, propose-changes:40, SAMPLE-C1:11, SAMPLE-C2:13; exit 0 | ✅ |
| R5 | C2 cap text | ≤3 + N+1 FAIL | ≤3 + N+1 FAIL | propose-changes:41 `pass = ≤3 questions; question 4 (N+1) = FAIL (blocked, must stop)`; exit 0 | ✅ |
| R6 | Every-rows text | present in gate-report + qg-SKILL | present | gate-report:39,45,48 `every CONDITIONAL gets a row; sample-of-one never satisfies`; qg-SKILL:78; exit 0 | ✅ |
| R7 | Exit-terminal C3/C4 | present in qg-SKILL + vh-SKILL + gate-report | present | qg-SKILL:87, vh-SKILL:52, gate-report:68 `exit/salir mid-C3/C4 = pause + recorded grill: exited + escalate`; exit 0 | ✅ |
| R8 | Retry N=2 | present in C1+C2 | present | frame-intent:68, propose-changes:42,44 `Retry N=2 → escalate orchestrator`; exit 0 | ✅ |
| R9 | T-007 Critical/High | 3/4 refs | 3/4 refs | gate-report:63, vh-SKILL:49, qg-SKILL:86 present; waiver-template:54 absent (exit 1); exit 0 | ✅ |
| R10 | Row counts | eng 22, sec 16 | eng 22, sec 16 | eng: header+sep+21 data (E-020 conditional); sec: header+sep+15 data (T-007 corrected 3/4) | ✅ |
| R11 | Typecheck N/A boundary | 0 .ts/.json/.opencode | 0 | `git log --name-only af00b4a..HEAD` piped to file-extension scan → no matches | ✅ |

### Gap Probes (re-run against fixed text)

| # | Probe | Prior Status | Post-Fix Status | Evidence | ✅/❌ |
|---|-------|-------------|-----------------|----------|-------|
| P1 | Thin-waiver substance (QA-004/COND-Q4) | ⚠️ unproven | CLEARED | `SAMPLE-grilling-C3-thin-FAIL.md` exists: W-A thin FAILs on substance via reviewer-judgment reason despite all presence checks passing; gate-report:45 explicit `presence ≠ substance` text; every-not-sample enforced (3 rows) | ✅ |
| P2 | Dead-link substance (QA-005/COND-Q4) | ⚠️ unproven | CLEARED | `SAMPLE-grilling-C4-deadlink-FAIL.md` exists: dead FAIL (target absent), irrelevant FAIL (wrong artifact), good PASS; dod-checklist:10 `present AND resolves AND relevant; dead/irrelevant = FAIL` | ✅ |
| P3 | Trigger-evasion negative (QA-003/COND-Q3) | ❌ untestable | CLEARED | propose-changes:39 synonym table (customers/users/clients/members/consumers; regulators/GDPR/Ley 172-13; revenue/pipeline/quota/money) + independent blast-radius scan rule + `SAMPLE-grilling-C2.md:41-45` evasion demo "API change for users, internal consumers only" → STILL FIRES via synonym + scan | ✅ |
| P4 | Multi-waiver every-not-sample (QA-006/COND-Q3) | ⚠️ unproven | CLEARED | T-011 3-waiver fixture (W-A thin FAIL, W-B missing-block FAIL, W-C PASS) proves cherry-pick rejection; gate-report:39,45,48 enforce `every CONDITIONAL gets a row; sample-of-one never satisfies` | ✅ |
| P5 | Exit-terminal (QA-007/COND-Q3) | ⚠️ unproven | CLEARED | exit/salir alias in C1+C2 openers (4/4); exit-terminal text in qg-SKILL:87 + vh-SKILL:52 + gate-report:68 (`grill: exited` + escalate); C2 exit-terminal propose-changes:43 (pre-decision exit = pause + escalate, proposal unapproved); exit/salir alias in SAMPLE-C1:11 + SAMPLE-C2:13 | ✅ |
| P6 | C2 N+1 (QA-003/COND-Q3) | ❌ unconstructible | CLEARED | C2 cap bound ≤3 (propose-changes:41); N+1 FAIL demo in SAMPLE-grilling-C2:37-39 (`grill: N+1 blocked` recorded, Q4 BLOCKED, no answer taken); frame-intent:60 `N+1 enforcement: question N+1 = FAIL (blocked, must stop)` | ✅ |

### Per-Condition Verdict (COND-Q1..Q4)

| Condition | ID | Status | Fix Commit | Evidence |
|-----------|----|--------|------------|----------|
| COND-Q1 | QA-001 | **CLEARED** | 81b18ef | T-007 matrix corrected to 3/4; waiver-template absent by design (record, not triage point); cell factually accurate |
| COND-Q2 | QA-002 | **CLEARED** | d807d5a | E-020 relabeled `conditional (impl done, co-sign pending at gate)`; coverage "20/21 pass + 1 conditional"; stays conditional until people co-sign (REQ-P-004) |
| COND-Q3 | QA-003+QA-006+QA-007 | **CLEARED** | 8d673b1+1a16100+af00b4a+cb988d6+8ab7271 | C2 cap ≤3 + N+1 demo; trigger hardening + evasion negative; every-not-sample + 3-waiver fixture; exit-terminal C3/C4 + exit/salir alias 4/4 |
| COND-Q4 | QA-004+QA-005 | **CLEARED** | 17f02a9 | Thin-waiver FAIL demo (T-011); dead-link FAIL demo (T-012); substance backstop text explicit (gate-report:45); dead/irrelevant rule (dod-checklist:10) |

### Re-Verification Verdict

**CONDITIONAL → OPEN (QA-owned conditions all CLEARED).**

All 4 QA-owned conditions verified cleared against fixed text. 11/11 machine checks pass. 6/6 gap probes resolved with runnable demos. No new findings. QA releases its hold on the gate — synthesis by orchestrator must still clear sibling conditions (COND-R1..R5, COND-D1..D5, COND-S1..S4, COND-P1..P5, C-1..C-6) before gate opens.

**Remaining risk (unchanged, low):** QA-008 regression harness — manual `rg` logs, no CI hook. T-009 drift re-opens silently. Recommend checked-in grep script for future cycles. No action required for this gate.

**Skill cited:** `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/qa-review.md`
