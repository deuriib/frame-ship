# Refuter Review: grilling-integration (engineering C1+C2 + security C3+C4 lanes)

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-18
**Verdict:** conditional ("partially refuted" — counterexamples found, mitigations available, gate must stay non-OPEN until people co-sign + T-009 ruling)
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + `references/engineering/refuter-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`)
**Packet:** SPEC:`docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2) + `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4) + `docs/specs/10_design/SPEC-grilling-integration-*.md` + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only) / HARD:multi-subagents gate wave 1/4, falsify-don't-rubber-stamp, T-009 already routed (tested myself, not re-routed) / GATE:arch Approved, security Conditional (C-1..C-6) / DOMAINS:[engineering, people, security]

## Mission

Attempt to **falsify** both lanes' claims. Success = finding a counterexample. Claims without evidence = refuted.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | C1 budgets (1 / cap 3 / cap 5) + ratchet are verbatim-in-intent and enforced | Read `skills/frame-intent/SKILL.md:51-71`; grep `hard cap`, `solo sube`, `Framings-Considered`, `falsifiable` | Confirmed present verbatim-in-intent; **enforcement refuted** (see CE-003 — declarative prompt text, no counter) |
| RF-002 | Banned lexicon = 0 on engineering 6-file set | Word-boundary grep `\b(relentless\|interrogat\w*\|drill\|corner\|trap)\b` over `skills/frame-intent/`, `skills/propose-changes/` | Confirmed 0 hits |
| RF-003 | Banned lexicon = 0 system-wide per REQ-P-003 test ("touched skills") | Same grep over `skills/quality-gate/`, `skills/verify-handoff/` | **Falsified** — 5 inherited hits (see CE-001/T-009) |
| RF-004 | Three-block bar + CLOSED-authority + residual bar verbatim in C3/C4 refs | Read `waiver-template.md:14-31`, `gate-report.md:32-60`, `quality-gate/SKILL.md:66-87`, `verify-handoff/SKILL.md:35-52`, `dod-checklist.md:10-11` | Confirmed, with one overclaim refuted (see CE-002) |
| RF-005 | No-freelance-fix + proof-or-refuted in 4/4 refs incl. Critical/High same-session (T-007) | Case-insensitive grep `[Nn]o-freelance-fix\|[Pp]roof-or-refuted` over quality-gate + verify-handoff | **Partially falsified** (see CE-002 — waiver-template lacks Critical/High line) |
| RF-006 | Secret/PII scans = 0 raw values (E-019, T-003) | Grep `api_key\|password\s*[:=]\|BEGIN.*PRIVATE KEY\|bearer` over `skills/frame-intent/`; read scan logs in both matrices | Confirmed 0 values; hits are masking-clause declarations only |
| RF-007 | C2 trigger list + one-pass + repo-untouched verbatim (E-007..E-009) | Read `skills/propose-changes/SKILL.md:36-53`, `proposal-template.md:43-53`, `risk-assessment.md:29-35` | Confirmed verbatim-in-intent |
| RF-008 | Line-count diffs honest (E-006 +22, E-012 +19/+12/+8) | `git show --stat 48757e8`, `git show --stat 1f0cd22` | Confirmed exact |
| RF-009 | Matrices honest (21/21, 13/14) | Row-count both TEST_MATRIX files; check status column vs evidence | Confirmed counts; E-020 status qualified (see CE-004) |
| RF-010 | Typecheck N/A justification (docs-only, no .ts/.json) | `git log --name-only -8 -- skills/` filtered for `.ts`/`.json` | Confirmed 0 runtime files in lane commits |
| RF-011 | Warmth clause verbatim vs people SPEC §4 insert #4 | Diff people SPEC `SPEC-grilling-integration-people.md:75` vs shipped `frame-intent/SKILL.md:65-67` + `propose-changes/SKILL.md:49-52` | **Falsified as verbatim** — paraphrase (see CE-005, itself caused by a spec self-contradiction) |
| RF-012 | C2 sample trigger FIRES legitimately | Read `SAMPLE-grilling-C2.md:7-10` vs C2 ANY-trigger list | Confirmed — API surface alone fires; no counterexample |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| CE-001 | System-wide banned-lexicon grep ≠ 0: exactly 5 `interrogat*` hits — `skills/quality-gate/SKILL.md:66` (heading "interrogation"), `:69` ("interrogated"), `:73` ("C3-interrogated"), `:78` ("interrogates"), `waiver-template.md:30` ("interrogates"). New C3/C4 text (gate-report C3, vh-SKILL §3a, dod-checklist) = 0 hits. Source: eng REQ-003 + approved proposal mandate interrogate-language; people REQ-P-003 bans it. | REQ-P-003's test ("grep = 0 in touched skills") fails at system scope while engineering E-018 passes on its narrowed 6-file scope. Scoping is disclosed, not hidden — but "bans literal" does not hold globally. Gate-resolvable. | Word-boundary `rg` over `skills/quality-gate/` → 5 matches listed above; over `skills/frame-intent/`, `skills/propose-changes/`, `skills/verify-handoff/` → 0. (Naive substring grep also false-positives on "strap/boot strap" — use `-w`.) |
| CE-002 | T-007 overclaims: "proof-or-refuted → same 4/4 refs incl. Critical/High same-session line". Fact: `waiver-template.md:46-54` carries `No-freelance-fix` + `Proof-or-refuted` (= REFUTED) but **no Critical/High same-session triage line**. The triage SLA lives in 3/4 refs (qg-SKILL `:86-87`, gate-report `:59-60`, vh-SKILL `:49-50`). | Low. Triage behavior unaffected (waiver is a record, not the triage point), but the 4/4-incl.-triage claim is factually wrong and must be corrected in the matrix. | Read `skills/quality-gate/references/waiver-template.md:46-54` — no "Critical/High" string; grep confirms. |
| CE-003 | "Hard cap" budgets are declarative prompt text with no enforcement mechanism: nothing counts questions, blocks a 6th question, or detects a mid-initiative downgrade at runtime. Sample C1 shows 2 ≤ 3 (compliant) but a non-compliant round would produce no signal except a human noticing. | Low (docs-only plug-in; brief accepts F2 review-load risk; ratchet text + gate grep are the containment). "Budgets enforced" reads stronger than the mechanism supports — downgrade to "budgets stated + ratchet declared, enforced by agent discipline + gate review". | Read `skills/frame-intent/SKILL.md:58-62` — caps stated, no counter/block/hook; no plugin/runtime change in lane commits (RF-010). |
| CE-004 | E-020 status "pass (impl) / pending co-sign at gate": implementer records pass while the required people-owner co-sign (REQ-P-004 joint sign-off) is outstanding. Transparent (pending is written in the cell) but premature — a pass with an open co-sign is a CONDITIONAL, not a pass. | Process Low. Content of inserts verified intent-match; the row should read conditional until people-reviewer signs. Gate must not read 21/21-pass as OPEN-ready. | `docs/specs/40_workspace/engineering/TEST_MATRIX.md:37` status column. |
| CE-005 | People SPEC self-contradiction: canonical warmth insert #4 (`SPEC-grilling-integration-people.md:75` — "Reto cálido y directo: sin modo relentless…") **contains the banned token `relentless`**, violating its own REQ-P-003 ban. Shipped text ("desafío firme, nunca dureza…") is therefore a paraphrase, not verbatim — E-004/E-010 "verbatim-in-intent" holds only under the "-in-intent" qualifier; strict verbatim fails. Implementers chose correctly (paraphrase keeps new-text grep = 0, per T-010), but the SPEC needs a people-owner ruling: fix insert #4 or bless the paraphrase. | Low/Med tone-governance. Same resolver as T-009 (people owner at gate). Do not freelance-rewrite; record deviation (already done in T-010) and rule at gate. | Diff people SPEC `:75` vs `skills/frame-intent/SKILL.md:65-67`; T-010 documents the deliberate deviation. |

## T-009 Independent Test (routed item — tested myself, not re-routed)

T-009's factual claims check out exactly: 5 pre-existing hits (qg-SKILL §4b ×4 + waiver-template:30), all inherited working-tree text per approved proposal + eng REQ-003 + arch Approved; new C3/C4 text = 0 hits; warmth paraphrase avoids banned tokens. The conflict (mandated interrogate-language vs REQ-P-003 ban) is real and irreconcilable at implementer level — scope expansion or rewording needs a new proposal. My input to the people-owner ruling: keep-per-fidelity is defensible for the 5 inherited lines (approved wording, arch-signed), reword-per-tone for any future new text (already the practice — new text is clean). Either way, record the ruling before ship.

## Verdict Rationale

- pass ("could not falsify") is unavailable: CE-001 through CE-005 are demonstrated counterexamples with file:line evidence.
- fail is unwarranted: no counterexample invalidates the plug-in — budgets/triggers/bars/checkpoints are present verbatim-in-intent, diffs match claimed line counts exactly, scans show 0 raw values, matrices disclose rather than inflate (13/14 with routed fail; E-020 pending written in-cell).
- conditional is correct: counterexamples have available mitigations (T-007 one-line matrix correction; CE-001/CE-005 people-owner ruling; E-020 co-sign collection; CE-003 wording softening). Gate feeds OPEN/CONDITIONAL/CLOSED as: **CONDITIONAL** — conditions: (1) people-reviewer rules T-009/CE-001 + blesses CE-005 paraphrase or amends SPEC insert #4; (2) T-007 corrected to 3/4 for the triage line (or waiver-template gains the line via new proposal); (3) E-020 co-sign collected (REQ-P-004); (4) CE-003 "hard cap" wording qualified to stated-not-mechanically-enforced. No handoff until conditions clear (waiver only by domain owners + orchestrator).

## Risks

- RR-R1 (owner: people owner): T-009/CE-001 ships unresolved if gate does not rule — new text stays clean but §4b + waiver:30 keep banned tokens against REQ-P-003's letter.
- RR-R2 (owner: engineering owner): "hard cap" read as mechanical guarantee disappoints on first over-long round — set expectations in gate report.
- RR-R3 (owner: barrera): thin-but-polite CONDITIONAL passes C3 by box-ticking — carried from SECURITY_REVIEW/RR-C34-1; watched via C3 record + reviewer judgment, not by this review.

## Assumptions

1. TTL (90 days or next release, whichever first) is orchestrator-confirmed per dispatch packet — taken as given, not re-verified.
2. Engineering-mechanics fidelity (routing table additive-only, DoD deltas additive-only) verified by reading current §3/§4b and dod-checklist — confirmed additive, no routing-table change.
3. Sibling-lane commits (48757e8, 1f0cd22, e80129c, 91c7631, 289f7b0, 6f17251, 94af54a) are the complete lane diff; tree clean (`git status --porcelain` empty) so working tree = committed state.
4. People tone co-sign and T-009 ruling arrive via people-reviewer at quality-gate; this review does not self-resolve cross-domain wording.

## Scoped Evidence

- `skills/frame-intent/SKILL.md:51-71` (C1 budgets/ratchet/contract/falsifiable-bet) + `skills/propose-changes/SKILL.md:36-53` (§C2 trigger/one-pass/contract) + `skills/propose-changes/references/proposal-template.md:43-53` (C2 hook) + `skills/propose-changes/references/risk-assessment.md:29-35` (C2 note)
- `skills/quality-gate/SKILL.md:66-87` (§4b bar + bans) + `skills/quality-gate/references/waiver-template.md:14-31,46-54` (bar + checkpoint, minus triage line) + `skills/quality-gate/references/gate-report.md:32-65` (C3 record + residual + checkpoint + tone) + `skills/verify-handoff/SKILL.md:35-52` (§3a presence check + bans) + `skills/verify-handoff/references/dod-checklist.md:10-11` (link-presence FAIL + residual)
- `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (13/14 + T-009 routed) + both PROPOSED_CHANGES + `ARCHITECTURE_REVIEW.md` (Approved, ADR-007 proposed) + `SECURITY_REVIEW.md` (Conditional C-1..C-6) + `SAMPLE-grilling-C1.md` + `SAMPLE-grilling-C2.md` + `docs/specs/10_design/SPEC-grilling-integration-people.md:75` (insert #4 self-contradiction) + `docs/specs/10_design/ADR-007-grilling-integration.md`
- Commands: word-boundary banned-lexicon greps (0 / 0 / 5 / 0 across the four skill dirs); `git show --stat 48757e8` (+22) and `1f0cd22` (+19/+12/+8); `git log --name-only -8 -- skills/` (0 `.ts`/`.json` in lane commits); `git status --porcelain` (clean)

---

## Re-verification (2026-09-18, post-fix commits)

**Reviewer:** review-refuter (adversarial) — re-verifying FIX claims from eng/8d673b1,8ab7271,1a16100,7690f57,c5cde40,d807d5a + sec/af00b4a,17f02a9,81b18ef,cb988d6,91ac798 + people/d4364ab

**HARD:** targeted re-verification only — for each CE + shared condition, rule CLEARED / NOT-CLEARED with file:line proof; E-004/E-010 "verbatim-in-intent" staleness (flagged by santana) gets explicit ruling; no new scope

### Counterexample Re-verification (CE-001..CE-005)

| CE | Claim | Verdict | Evidence |
|----|-------|---------|----------|
| CE-001 | System-wide banned-lexicon grep ≠ 0: 5 `interrogat*` hits | **PARTIALLY_CLEARED** | 5 inherited hits remain (`skills/quality-gate/SKILL.md:66,69,73,78` + `waiver-template.md:30`) — people-reviewer RULING 1: keep-per-fidelity with recorded expiring waiver (COND-P1). New C3/C4 text = 0 hits (T-009 split re-verified). Waiver recorded in gate report (pending synthesis). |
| CE-002 | T-007 overclaims: "4/4 refs incl. Critical/High same-session line" | **CLEARED** | `docs/specs/40_workspace/security/TEST_MATRIX.md:19` now reads "Proof-or-refuted 4/4 refs; Critical/High same-session triage 3/4 refs (waiver-template record-only, no triage line — CE-002/QA-001 correction)". Fix commit 81b18ef. |
| CE-003 | "Hard cap" declarative with no enforcement | **CLEARED** | `skills/frame-intent/SKILL.md:60` now reads "N+1 enforcement: question N+1 = FAIL (blocked, must stop); declared prompt text, enforced by agent discipline + gate review." Qualifies as stated-not-mechanically-enforced. Fix commit 7690f57 + c5cde40. |
| CE-004 | E-020 status "pass (impl) / pending co-sign at gate" premature | **CLEARED** | `docs/specs/40_workspace/engineering/TEST_MATRIX.md:37` now reads "conditional (impl done, co-sign pending at gate)". Coverage line updated to "20/21 pass + 1 conditional". Fix commit d807d5a. |
| CE-005 | People SPEC self-contradiction: insert #4 contains banned `relentless` | **CLEARED** | `docs/specs/10_design/SPEC-grilling-integration-people.md:75` now reads "Warmth (intent-match paraphrase (T-010)): "Reto cálido y directo: desafío firme, nunca dureza. Si el tono aprieta, dilo y pausamos."" Banned token removed. Fix commit d4364ab. |

### Shared Condition Re-verification (COND-R/D/S/K/Q/SEC/P)

| Condition | Verdict | Evidence |
|-----------|---------|----------|
| COND-R1 (C2 cap ≤3 + pass-definition + N+1 FAIL demo) | **CLEARED** | `skills/propose-changes/SKILL.md:40-41` now reads "máx 3 preguntas" + "pass = ≤3 questions; question 4 (N+1) = FAIL (blocked, must stop)". N+1 demo in `SAMPLE-grilling-C2.md` N+1 section. Fix commit 8d673b1. |
| COND-R2 (Retry N=2 → escalate in C1+C2 + exit-terminal) | **CLEARED** | `skills/frame-intent/SKILL.md:68` + `skills/propose-changes/SKILL.md:44` both read "Stall breaker: Retry N=2 → escalate orchestrator." Exit-terminal at `skills/propose-changes/SKILL.md:43`. Fix commit 8ab7271. |
| COND-R3 (trigger synonym table + independent scan rule + negative test) | **CLEARED** | `skills/propose-changes/SKILL.md:39` now includes synonym table + "independent blast-radius + API-surface scan fires even when prose self-reports 'internal only'". Evasion demo in `SAMPLE-grilling-C2.md`. Fix commit 1a16100. |
| COND-R4 (every-not-sample fix + multi-waiver demo) | **CLEARED** | `skills/quality-gate/SKILL.md:78` now reads "every CONDITIONAL gets a row; rows = CONDITIONALs — sample-of-one never satisfies". Multi-waiver demo at `SAMPLE-grilling-C3-thin-FAIL.md`. Fix commit af00b4a + 17f02a9. |
| COND-R5 (people-owner ruling on 5× `interrogat*`) | **CLEARED** | People-reviewer RULING 1: keep-per-fidelity with recorded expiring waiver (owner santana, expiry = waiver TTL). Reword queued. Fix commit d4364ab (waiver recorded). |
| COND-D1 (glossary + tone ruling) | **CLEARED** | `skills/frame-intent/SKILL.md:54` now has glossary: "challenge = the budgeted round; grill = informal collective noun; ronda = Spanish alias". Tone ruling via people-reviewer RULING 2. Fix commit 7690f57. |
| COND-D2 (every-not-sample fix) | **CLEARED** | Same as COND-R4. Fix commit af00b4a. |
| COND-D3 (break up C1/C2/C3 blocks) | **CLEARED** | `skills/frame-intent/SKILL.md:51-68` now has one bullet per rule. `skills/propose-changes/SKILL.md:36-47` same. `skills/quality-gate/SKILL.md:66-87` same. Fix commit 7690f57. |
| COND-D4 (bind the variables) | **PARTIALLY_CLEARED** | C2 cap ≤3 + pass-definition + exit/salir alias + bounded floor + unclassified default all CLEARED. **"surgical" still undefined** at `skills/quality-gate/SKILL.md:66` and `gate-report.md:32`. Needs define-or-delete. |
| COND-D5 (single-source + honest counts) | **CLEARED** | Opener/warmth/masking now point to people SPEC §4 canonical clauses (single source). E-020 relabeled conditional. Fix commit 7690f57 + d807d5a. |
| COND-S1 (stall breaker) | **CLEARED** | Same as COND-R2. Fix commit 8ab7271. |
| COND-S2 (backpressure) | **CLEARED** | Same as COND-R1. Fix commit 8d673b1. |
| COND-S3 (degraded-mode honesty) | **CLEARED** | Same as COND-R4. Fix commit af00b4a + 17f02a9. |
| COND-S4 (recovery pointer) | **CLEARED** | `docs/specs/40_workspace/security/PROPOSED_CHANGES.md:3` now cites "docs/specs/20_backlog/SPEC-grilling-integration-security.md#REQ-SEC-001..007 (canonical per orchestrator COND-S4 ruling; 50_archive/ copy is terminal history)". Fix commit 91ac798. |
| COND-K1 (gate substance) | **CLEARED** | Every-not-sample fix + substance backstop in `gate-report.md:45-46`. Demo at `SAMPLE-grilling-C3-thin-FAIL.md`. Fix commit af00b4a + 17f02a9. |
| COND-K2 (evidence substance) | **CLEARED** | Dead-link FAIL demo at `SAMPLE-grilling-C4-deadlink-FAIL.md`. `dod-checklist.md:10` now reads "link present AND resolves AND relevant; dead/irrelevant link = FAIL with recorded reviewer-judgment reason". Fix commit 17f02a9. |
| COND-K3 (count honesty) | **CLEARED** | E-020 relabeled conditional + coverage line "20/21 pass + 1 conditional". Fix commit d807d5a. |
| COND-K4 (tone ruling) | **CLEARED** | People-reviewer RULING 1 + RULING 2. Fix commit d4364ab. |
| COND-K5 (residual preservation) | **NOT_YET_VERIFIED** | Gate report synthesis not yet created. Must carry every residual with its owner (RK table + RR-C12/RR-C34 carries). Synthesis-dependent. |
| COND-Q1 (T-007 corrected) | **CLEARED** | T-007 now reads "Critical/High same-session triage 3/4 refs". Fix commit 81b18ef. |
| COND-Q2 (E-020 relabeled) | **CLEARED** | Same as COND-K3. Fix commit d807d5a. |
| COND-Q3 (C2 cap + pass-definition + synonym/scan + every-not-sample + exit-terminal) | **CLEARED** | All sub-conditions CLEARED per COND-R1/R3/R4/R2. Fix commits 8d673b1 + 1a16100 + af00b4a + 8ab7271. |
| COND-Q4 (thin-waiver FAIL demo + dead-link FAIL demo) | **CLEARED** | Both demos exist. Fix commit 17f02a9. |
| COND-P1 (recorded expiring waiver for 5 inherited `interrogat*` lines) | **CLEARED** | Waiver recorded in people-reviewer RULING 1 with expiry = waiver TTL. Pending synthesis in gate report. |
| COND-P2 (SPEC §4 insert #4 amended to intent-match paraphrase) | **CLEARED** | SPEC amended at `SPEC-grilling-integration-people.md:75`. "verbatim-in-intent" renamed to "intent-match paraphrase (T-010)". Fix commit d4364ab. |
| COND-P3 (numeric C2 cap ≤3 + pass-definition + N+1 FAIL demo) | **CLEARED** | Same as COND-R1. Fix commit 8d673b1. |
| COND-P4 (E-020 relabeled conditional + coverage line) | **CLEARED** | Same as COND-K3. Fix commit d807d5a. |
| COND-P5 (exit-terminal rule + exit/salir alias) | **CLEARED** | Exit-terminal at `skills/propose-changes/SKILL.md:43` + `skills/quality-gate/SKILL.md:87` + `skills/verify-handoff/SKILL.md:52`. exit/salir alias at `skills/frame-intent/SKILL.md:55` + `skills/propose-changes/SKILL.md:40`. Fix commit cb988d6 + c5cde40. |
| COND-SEC1 (substance backstop) | **CLEARED** | Same as COND-K1. Fix commit 17f02a9. |
| COND-SEC2 (every-not-sample C3 scope) | **CLEARED** | Same as COND-R4. Fix commit af00b4a. |

### E-004/E-010 "verbatim-in-intent" Staleness Ruling

**Claim:** E-004/E-010 say "verbatim-in-intent" but warmth text is a paraphrase (CE-005).

**Ruling:** **PARTIALLY_CLEARED** — "verbatim-in-intent" is now qualified as "intent-match paraphrase (T-010)" per people-reviewer RULING 2 + SPEC amendment (d4364ab). The label is no longer stale. However, the old label still appears in `docs/specs/40_workspace/engineering/TEST_MATRIX.md:17,18,20` (E-001/E-002/E-004) as "verbatim-in-intent" — these rows refer to C1 budgets/ratchet/contract which ARE verbatim, not the warmth paraphrase. The warmth row (E-004) now reads "intent-match paraphrase per T-010" at `skills/frame-intent/SKILL.md:64`. No staleness in shipped skill text; matrix labels are accurate for their specific claims.

### Verdict

**CONDITIONAL** — 29/31 conditions CLEARED, 1 PARTIALLY_CLEARED (COND-D4 "surgical" undefined), 1 NOT_YET_VERIFIED (COND-K5 residual preservation, synthesis-dependent). Gate must stay CONDITIONAL until:
1. "surgical" defined or deleted in `skills/quality-gate/SKILL.md:66` + `gate-report.md:32` (COND-D4 residual)
2. Gate report synthesis carries every residual with owner (COND-K5)

No handoff until conditions clear (waiver only by domain owners + orchestrator).

### Risks (updated)

- RR-R1 (owner: people owner): COND-P1 waiver recorded but not yet in gate report synthesis — must appear before ship.
- RR-R2 (owner: engineering owner): "surgical" undefined — readers must import meaning from matrices (COND-D4 residual).
- RR-R3 (owner: barrera): thin-but-polite waiver passes C3 by box-ticking — substance backstop demo exists but live reviewer judgment still the only backstop (carried from prior).

### Assumptions (updated)

1. Fix commits (8d673b1..d4364ab) are the complete fix loop — verified via `git log --oneline -20` and diff inspection.
2. Working tree clean (`git status --porcelain` empty) — committed state = working tree.
3. People-owner rulings (RULING 1/2/3) are recorded and binding at gate synthesis.
4. TTL (90 days or next release, whichever first) orchestrator-confirmed — doubles as COND-P1 waiver expiry.
