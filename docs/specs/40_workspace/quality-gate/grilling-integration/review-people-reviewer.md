# People Review: grilling-integration (C1–C4 tone / attention / opt-in gate)

**Reviewer:** people-reviewer (santana, CHRO/CPO — people owner)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 4/4
**Packet:** SPEC:C1–C4 skill-text diffs (`skills/frame-intent/SKILL.md:51-71` C1, `skills/propose-changes/SKILL.md:36-53` C2 + `references/proposal-template.md:43-53` + `references/risk-assessment.md:29-35`, `skills/quality-gate/SKILL.md:66-87` C3 + `references/gate-report.md:32-65` + `references/waiver-template.md:14-54`, `skills/verify-handoff/SKILL.md:35-52` C4 + `references/dod-checklist.md:10-11`) + `SPEC-grilling-integration-people.md` §4 inserts + both TEST_MATRIX files + both PROPOSED_CHANGES + brief (read-only) / HARD:multi-subagents gate wave 4/4; three people-owned rulings required (tone, paraphrase, budget co-sign) + exit-terminal + exit/salir alias + masking co-sign / GATE:arch Approved, security Conditional (C-1..C-6 + D-1..D-7, not re-decided); sibling verdicts (refuter/reliability/readability/resilience/risk/qa, all CONDITIONAL) taken as input, never re-decided / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/domains/people-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`), marketing/people shared criteria applied where customer-facing copy is concerned (warmth clause is user-facing copy → brand-tone lens borrowed, not a brand verdict). Domain role understood before acting: rule tone/attention/opt-in only; engineering fidelity + security residual-bar referenced by ID, never re-decided.

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + `skills/quality-gate/references/domains/people-review.md`. I did NOT implement either lane (C1+C2 vasquez, C3+C4 barrera) — this is independent review, not self-approval.

## Checklist (people-review.md × C1–C4 human contract)

- [✅] Team impact assessed — C1 caps (1 / cap 3 / cap 5) + C2 one-pass + C3 surgical-only + C4 presence-only bound attention; fatigue cascade at volume flagged PPL-007 (shared fix, not a people-only hold)
- [✅] Skills gap identified — none: round text is prompt wording, no new skill/stage/reviewer to staff (E-016 verified)
- [⚠️] Workload implications reviewed — C2 `máx N` undefined = unbounded one-pass; 20-REQ C4 one-at-a-time unbounded (PPL-007, shares fix with COND-R1/COND-S2)
- [⚠️] Culture/values alignment — new C1/C2/C3-record/C4 text is warm ✅; 5 inherited `interrogat*` hits violate REQ-P-003's letter (PPL-001 ruling below); SPEC insert #4 self-contradiction (PPL-002 ruling below)
- [✅] Hiring/training needs flagged — none; opt-in + `salir` + pause/exit offer are self-documenting in the opener
- [⚠️] Change management plan — exit-terminal undefined at C3/C4 + `salir`-only undiscoverable for EN users (PPL-004, PPL-005); C1/C2 terminal humane and co-signed

## The three rulings (explicit, as ordered)

### RULING 1 — T-009 / CE-001 / RL-005 / RD-001: 5× `interrogat*` in shipped C3 text vs REQ-P-003 ban → KEEP-PER-FIDELITY with recorded waiver (CONDITIONAL, not reword-now)

**Facts (verified by reference, not re-tried):** exactly 5 hits — `skills/quality-gate/SKILL.md:66` (heading "interrogation"), `:69`, `:73`, `:78`, `references/waiver-template.md:30` — all inherited working-tree text per approved proposal + eng REQ-003 + arch Approved. New C3/C4 text added this cycle (gate-report C3, vh-SKILL §3a, dod-checklist) = 0 hits. QA re-ran the split live (0 / 5). No freelance rewrite is available to me at gate: the wording is approved + arch-signed, and `SPEC-grilling-integration-people.md` REQ-P-007 + HARD forbid rule edits without a new approved proposal.

**Ruling:** the 5 inherited lines **stay for this cycle under an explicit, time-boxed waiver** (recorded in the gate report, expiry = waiver TTL 90d-or-next-release, owner santana/people owner). All future new text follows **reword-per-tone** (already the demonstrated practice — every new clause this cycle uses challenge/explore/test/falsify vocabulary and greps clean). The C3 heading + `waiver-template.md:30` are queued for reword (`interrogation lane` → `challenge lane`; `interrogates` → `challenges/tests`) via the next proposal cycle — tracked as COND-P1, not silently waived. Rationale: fidelity to an approved, arch-signed record outranks a retroactive tone edit at gate time; but an unrecorded exception would set a waiver-laundering precedent (RK-007), so the waiver must be written, owned, and expiring — never silent.

**Effect:** REQ-P-003 reads CONDITIONAL (new text ✅, inherited 5 ⚠️ under waiver) until the reword lands or the waiver is renewed by domain owners + orchestrator. Banned-grep returns to 0 on new-text scope today; system-scope 0 waits for COND-P1.

### RULING 2 — CE-005 / RD-007: SPEC insert #4 contains banned `relentless` → BLESS the shipped paraphrase as intent-match deviation + AMEND the SPEC (both, not either/or)

**Facts:** canonical insert #4 (`SPEC-grilling-integration-people.md:75` — "Reto cálido y directo: sin modo relentless…") contains the banned token, violating its own REQ-P-003. Shipped text (`frame-intent:65-67`, `propose-changes:49-51` — "desafío firme, nunca dureza. Si el tono aprieta, dilo y pausamos.") is a paraphrase that keeps new-text grep = 0 (T-010 deviation recorded). Strict-verbatim would fail by design; the implementers chose correctly.

**Ruling:** (a) the shipped paraphrase is **blessed as an intent-match deviation** — it preserves every normative element of insert #4 (warm + direct + firm-not-harsh + invite-to-pause) while removing the banned token, so E-004/E-010 "verbatim-in-intent" hold under the "-in-intent" qualifier; (b) **SPEC §4 insert #4 must be amended** to the shipped wording (one-line SPEC correction, people-owner authorized — I own this SPEC) so no future lane can "verbatim-paste" the banned token back in. Until the amendment lands, the "verbatim-in-intent" label must read "intent-match paraphrase (T-010)" per RD-007 (COND-P2). No new proposal needed for the SPEC-pointer fix; the skill-text paraphrase itself is already shipped and blessed here.

### RULING 3 — E-020 / QA-002: REQ-P-004 budget co-sign → CO-SIGN COLLECTED for C1 budgets + ratchet (CONDITIONAL co-sign, C2 cap withheld)

**Facts:** C1 budgets present verbatim-in-intent (`frame-intent:58-60`): spike 1 hard cap / bounded 2–3 cap 3 / architectural full cap 5 (4 core + 1 frontier-empty); ratchet present ("solo sube… nunca baja mid-initiative"); sample C1 runs 2 ≤ 3 with 1:1 turn-taking, 0 PII. The brief's open question (exact C1 budget, joint engineering + people sign-off) is what E-020 holds pending.

**Ruling:** I **co-sign the C1 budget table (1 / cap 3 / cap 5) + the one-way ratchet** as humane and sufficient for this cycle — caps are tight enough to protect attention, the ratchet blocks mid-initiative downgrade games, and the pause/exit offer rides every round. E-020's "pending co-sign at gate" is therefore **collected for its C1 scope**. The co-sign is CONDITIONAL, not blanket: (a) C2 `máx N` is still undefined — I withhold the C2-budget portion until a numeric cap (≤3 mirroring C1 bounded) + pass-definition + N+1 FAIL demo land (shares fix with COND-R1/COND-S2/COND-D4/COND-Q3, COND-P3); (b) E-020 must be relabeled "20/21 pass + 1 conditional (C2-cap pending)" mirroring the security matrix honesty pattern (COND-P4, shares fix with COND-D5/COND-Q2/COND-K3) so synthesis never reads it as OPEN-ready.

### Companion co-signs (ordered in the same HARD packet)

- **Exit-terminal: co-sign C1/C2, require C3/C4 rule (COND-P5).** C1/C2 terminal is humane and complete (immediate stop + no re-ask same stage + no penalty + recorded `grill: declined/exited` + pause/exit offer) — co-signed as-is. C3/C4 terminal is undefined (exit mid-interrogation → gate limbo; exit pre-decision → proposal limbo) — I require the terminal rule (exit = pause + recorded `grill: exited` + escalate; waiver stays uncleared / proposal stays unapproved; no silent promote) in skill text with a `salir`-mid-round trace demo. Shares fix with COND-R2/COND-S1/COND-Q3.
- **`exit/salir` alias: BLESSED and REQUIRED (COND-P5 companion).** `salir`-only opener is undiscoverable for EN-only users (RL-011/RD-010/RS-S8). The alias `exit/salir` preserves the brief's Spanish warmth while making the hatch discoverable — no tone cost, pure dignity gain. Single-source fix rides COND-D5/COND-D4 (canonical clause in people SPEC §4, 5 copy sites → 1 source + references).
- **Masking-prompt wording: CO-SIGNED without reservation ✅.** "Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)" is warm, opt-in-compatible, and minimization-correct; present 4/4 refs per T-010; samples show 0 PII/secrets; Ley 172-13 purpose + allowlist + checkpoint pattern holds (T-004). Joint people + security ownership confirmed from the people side — security-reviewer confirms the mechanism half at synthesis.

## Findings

| ID | Severity | Location | Finding | ✅/⚠️/❌ |
|----|----------|----------|---------|----------|
| PPL-001 | High | `skills/quality-gate/SKILL.md:66,69,73,78` + `references/waiver-template.md:30` vs REQ-P-003 | 5 inherited `interrogat*` hits violate the ban's letter; new text clean. RULED: keep-per-fidelity + recorded expiring waiver, reword queued (COND-P1). | ⚠️ |
| PPL-002 | Med | `SPEC-grilling-integration-people.md:75` vs shipped `frame-intent:65-67` / `propose-changes:49-51` | SPEC insert #4 self-contradiction (contains banned `relentless`); shipped paraphrase correct. RULED: bless paraphrase + amend SPEC + rename claim to "intent-match paraphrase (T-010)" (COND-P2). | ⚠️ |
| PPL-003 | High | `skills/propose-changes/SKILL.md:42-44` (`máx N`) + E-020 | C2 budget unbounded; C1 co-sign granted, C2 portion withheld until numeric cap + pass-definition + N+1 demo (COND-P3). E-020 relabel required (COND-P4). | ❌ |
| PPL-004 | Med | C3 `:64` / C4 `:51-52` exit refs (terminal absent) | C1/C2 terminal co-signed ✅; C3/C4 terminal undefined → gate limbo. Require exit-terminal rule + `salir`-mid-round trace (COND-P5). | ⚠️ |
| PPL-005 | Low | C1 `:54-56`, C2 `:42-43` openers (`salir`-only) | EN-only user never discovers exit. Bless + require `exit/salir` alias everywhere (rides COND-P5/COND-D5). | ⚠️ |
| PPL-006 | Low | C1 `:67-68`, C2 `:51-52`, gate-report C3 Tone, vh-SKILL §3a Tone | Masking-prompt wording warm + minimization-correct, 4/4 present, 0 PII in samples. CO-SIGNED ✅. | ✅ |
| PPL-007 | Med | C2 one-pass + C4 one-at-a-time at volume | Unbounded C2 pass + 20-REQ sequential C4 + uncapped approver re-grill = fatigue → rubber-stamp (REQ-P-005 spirit at volume). Shared fix: C2 cap + batching/cap note for C4 (rides COND-R1/COND-S2/COND-S3). | ⚠️ |
| PPL-008 | Low | C1 `:62-65`, C2 `:47-50` (turn-taking + disagreement invite) | One-question-at-a-time + "¿dónde puede estar mal?" present C1/C2; sample rounds show 1:1 turn-taking. No finding — recorded as verified ✅. | ✅ |

No Critical (docs-only wording unit; no safety-critical misread causing loss — the ❌ blocks gate comprehension/budget enforcement, not safe operation).

## Verdict Rationale

OPEN is unavailable: one ❌-class High owned here (PPL-003 C2 unbounded budget — a co-sign cannot cover an undefined number) plus the inherited tone exception (PPL-001, waiver-recorded but not yet reworded) and the undefined C3/C4 exit terminal (PPL-004) mean the human contract is humane where it is defined and undefined where the chain needs it most (the gate itself). CLOSED is unwarranted: consent machinery (opt-in + exit + no-penalty + no-re-ask + recorded decline/exit) is present and co-signed C1/C2; warmth is preserved in every new clause; masking is co-signed 4/4 with 0 PII in samples; attention caps C1 are co-signed with ratchet; every residual I carry names an owner. **CONDITIONAL (REQUEST_CHANGES)** is correct and aligned with all six sibling verdicts — conditions COND-P1..P5 below must clear (several deliberately share sibling fixes so one edit clears all lenses). No handoff until conditions clear (waiver only by domain owners + orchestrator).

### Conditions to clear (COND-P1..P5, people-owned)

- [ ] COND-P1 (PPL-001, shares fix with COND-R5/COND-D1/COND-K4): recorded expiring waiver for the 5 inherited `interrogat*` lines (owner santana, expiry = waiver TTL) in the gate report + queued reword (`interrogation lane` → `challenge lane`, `interrogates` → `challenges/tests`) via next proposal. Glossary note: one canonical term per concept (challenge = the round).
- [ ] COND-P2 (PPL-002, shares fix with COND-D1): SPEC §4 insert #4 amended to the shipped paraphrase + "verbatim-in-intent" renamed to "intent-match paraphrase (T-010)" wherever the warmth claim appears.
- [ ] COND-P3 (PPL-003, shares fix with COND-R1/COND-S2/COND-D4/COND-Q3): numeric C2 cap (≤3 mirroring C1 bounded) + pass-definition (pass = ≤N questions) + N+1 FAIL demo in skill text. C1 co-sign stands regardless.
- [ ] COND-P4 (PPL-003 E-020, shares fix with COND-D5/COND-Q2/COND-K3): E-020 relabeled conditional + coverage line "20/21 pass + 1 conditional (C2-cap pending)".
- [ ] COND-P5 (PPL-004 + PPL-005, shares fix with COND-R2/COND-S1/COND-Q3 + COND-D4/D5): exit-terminal rule in skill text (exit = pause + recorded `grill: exited` + escalate; waiver uncleared / proposal unapproved; no silent promote) + `salir`-mid-round trace demo + `exit/salir` alias in all 5 opener copies (single-sourced to people SPEC §4).

## Risks

- Thin-but-polite waiver passes C3 by box-ticking — carried RR-C34-1/RL-006/RK-003 (owner barrera); people lens: fatigue makes politeness a pass signal — COND-P3 backpressure is my contribution.
- E-020 read as OPEN-ready at synthesis — gate must read it as CONDITIONAL until COND-P3/P4 land (carried CE-004/RD-008/RK-006/QA-002).
- T-009 tone conflict ships unresolved if gate does not rule — RULED here (COND-P1 waiver + queued reword, owner santana); synthesis must carry the waiver record, not silence.
- "Hard cap" read as mechanical guarantee — carried CE-003/RR-R2 (owner engineering owner); people lens: cap credibility is dignity credibility — qualify to stated-not-mechanically-enforced until a counter exists.
- Unbounded C2 + 20-REQ C4 burn attention until later gates nod along — carried RK-008 (owners engineering + people); COND-P3/P5 are the backpressure.
- Volunteered PII in grill answers despite warm masking reminder — carried RR-C12-1/RK-002 (owners engineering + people, verifier barrera); masking co-sign (PPL-006) contains, not eliminates.

## Assumptions

1. Sibling verdicts taken as GATE input, never re-decided: refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (RL-001..011, COND-R1..R5) + readability CONDITIONAL (RD-001..011, COND-D1..D5) + resilience CONDITIONAL (RS-001..010, COND-S1..S4) + risk CONDITIONAL (RK-001..RK-014, COND-K1..K5) + qa CONDITIONAL (QA-001..008, COND-Q1..Q4) + arch Approved + security Conditional (C-1..C-6, D-1..D-7).
2. Sibling-lane commits `48757e8..94af54a` are the complete C1–C4 diff per refuter assumption-3; banned-lexicon 0/5 split + clause-presence + 0-PII samples accepted by reference from engineering/security matrices + qa live re-run (Q1/Q2/Q4/Q6), not re-run here.
3. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given; doubles as the COND-P1 waiver expiry.
4. SPEC insert #4 amendment (COND-P2) is a people-SPEC pointer/wording correction owned by santana — no cross-domain proposal needed for the SPEC text itself; any skill-text reword (COND-P1) rides the next proposal per REQ-P-007.
5. Template placeholders in `proposal-template.md` are by-design slots, not leaks — only `máx N` in normative skill text is ruled here (PPL-003).

## Scoped Evidence (reference-only, allowlisted)

- Round/bar text ruled: `skills/frame-intent/SKILL.md:51-71` (C1: opener + `salir` + caps 1/cap-3/cap-5 + ratchet + turn-taking + disagreement + warmth paraphrase + masking + pause/exit) + `skills/propose-changes/SKILL.md:36-53` (C2: trigger + `máx N` + one-pass + terminal + same human contract) + `skills/quality-gate/SKILL.md:64-87` (§4b: exit-hatch ref + 5× `interrogat*` + bar + authority + N=2 + PII + no-freelance + proof) + `skills/verify-handoff/SKILL.md:35-52` (§3a: presence + N=2 + Tone `salir`/pause + masking co-sign)
- Contract sources: `docs/specs/10_design/SPEC-grilling-integration-people.md` (REQ-P-001..007 + §4 inserts 1–6 incl. #4 `:75` self-contradiction) + `docs/specs/15_requirements/REQ-grilling-integration-people.md` (REQ-P-001..007 + NF-001/002) + `docs/briefs/BRIEF-grilling-integration.md` (Scope[people] + Constraints Brand/Regulatory/People + open Q budget, read-only)
- Matrices (evidence by reference): `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows incl. E-020 conditional-in-pass-clothing + scan log 0/0) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (13/14 + T-009 routed 5-hit log + T-010 paraphrase record) + `docs/specs/40_workspace/engineering/SAMPLE-grilling-C1.md` + `SAMPLE-grilling-C2.md` (happy-path `sí`, 0 PII)
- Sibling verdicts (input, not re-decided): `docs/specs/40_workspace/quality-gate/grilling-integration/review-refuter.md` (CE-001..005) + `review-reliability.md` (RL-001..011) + `review-readability.md` (RD-001..011) + `review-resilience.md` (RS-001..010) + `review-risk.md` (RK-001..RK-014) + `review-qa.md` (QA-001..008) + `ARCHITECTURE_REVIEW.md` (Approved) + `SECURITY_REVIEW.md` (Conditional)
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/domains/people-review.md` (checklist authority for this verdict; marketing/people shared tone criteria borrowed for the warmth clause as user-facing copy)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **Engineering owner (vasquez) at gate:** COND-P3/P4 mechanics (C2 cap ≤3 + pass-definition + N+1 demo + E-020 relabel) + COND-P5 exit-terminal wiring + COND-P1 reword queue acknowledgment + routing-table/DoD additive-only confirm (shared with COND-R1/R2/R4).
2. **Security owner (barrera) at gate:** masking co-sign confirmation from the security side (T-010/PPL-006) + thin-waiver/dead-link substance backstop (RK-003/RK-005, COND-K1/K2) + T-009 triage confirm + C-1..C-6/D-1..D-7 clearance carry.
3. **Orchestrator (montilla) at gate/synthesis:** record COND-P1 waiver (owner santana, expiry = waiver TTL) in `GATE_REPORT.md`; confirm TTL; synthesis must use corrected counts (E-020 conditional, T-007 3/4 per QA-001) not matrix labels; LICENSE open question stays with orchestrator (C-5); authorize COND-P2 SPEC amendment landing.
