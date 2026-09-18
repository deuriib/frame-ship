# Readability Review: grilling-integration (C1–C4 skill wording + matrices + proposals)

**Reviewer:** review-readability (clarity gate — structure, consistency, maintainability; no bug-hunt, no brand judgment)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 2/4
**Packet:** SPEC:C1–C4 skill-text diffs (`skills/frame-intent/SKILL.md:51-71` C1, `skills/propose-changes/SKILL.md:36-53` C2 + `references/proposal-template.md:43-53` + `references/risk-assessment.md:29-35`, `skills/quality-gate/SKILL.md:66-87` C3 + `references/gate-report.md:32-65` + `references/waiver-template.md:14-54`, `skills/verify-handoff/SKILL.md:35-52` C4 + `references/dod-checklist.md:10-11`) + both TEST_MATRIX files + both PROPOSED_CHANGES + SPECS + brief (read-only) / HARD:multi-subagents gate wave 2/4, one point per paragraph, flag vague normative language + inconsistent terms + placeholder leaks / GATE:arch Approved, security Conditional (not re-decided here); refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (RL-001..011) taken as input, not re-decided / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/engineering/readability-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`). Domain role understood before acting: audit clarity, structure, consistency, maintainability of shipped wording, matrices, proposals.

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + `skills/quality-gate/references/engineering/readability-review.md`. No correctness re-litigation; reliability/refuter findings referenced by ID only.

## Checklist (readability-review.md × wording)

- [⚠️] Naming is intention-revealing — C1/C2 names clear; C3/C4 lane names + grill/challenge/ronda/interrogate synonyms are not (RD-001, RD-002 ❌-adjacent)
- [⚠️] Functions have single responsibility / one idea per unit — C1 §C1 (9 rules, one block), C2 §C2 (7 rules, one block), C3 §4b (10 rules, one block) each do many jobs (RD-003)
- [❌] Nesting depth ≤ 3 (cognitive load) — C3 §4b requires holding bar + record + residual + expiry + authority + re-review ban + N=2 + PII + no-freelance + proof simultaneously; reader needs 3+ levels of mental indentation (RD-003)
- [✅] Comments explain WHY, not WHAT — proposals' Rationale / Alternatives-Considered tables explain why (both PROPOSED_CHANGES exemplary)
- [⚠️] Public APIs documented (normative language precise) — `máx N`, `exactly one budgeted pass/round`, `every vs sample`, `surgical` vague or undefined (RD-004, RD-005)
- [⚠️] No dead code or commented-out blocks — no dead text; but 5× duplicated opt-in/warmth/masking clauses with no single source (RD-006)
- [❌] Consistent style with surrounding code — ES/EN exit word, warmth verbatim-vs-paraphrase, status vocabulary, count claims inconsistent (RD-002, RD-007, RD-008)

## Findings

| ID | Severity | Location | Finding | ✅/⚠️/❌ |
|----|----------|----------|---------|----------|
| RD-001 | High | `skills/frame-intent/SKILL.md:51` (C1 "challenger") vs `skills/propose-changes/SKILL.md:36` (C2 "challenge trigger") vs `skills/quality-gate/SKILL.md:66` (C3 "interrogation lane") vs proposals ("grilling-style", "grill", "ronda de desafío") vs people SPEC `:32-35` (banned: interrogate) | Terminology: grill / challenge / ronda / interrogat* used interchangeably with no glossary. C3's normative heading *is* a banned token (5× hits per T-009/CE-001). Reader cannot tell whether "grill = challenge = interrogation" or three different things. | ❌ |
| RD-002 | High | `skills/quality-gate/SKILL.md:68-69` ("every CONDITIONAL/waiver … is interrogated") vs `:77-79` ("interrogates the waiver sample") + `references/gate-report.md:39-41` (singular "waiver sample" row) | Quantifier mismatch: every-vs-sample. One reading says all waivers get a row; the other says one sample row suffices. Cherry-pick reading is compliant. Same root as RL-004; clarity alone blocks understanding of C3 scope. | ❌ |
| RD-003 | High | `skills/frame-intent/SKILL.md:54-71` (C1, 18 lines / 9 rules) + `skills/propose-changes/SKILL.md:38-53` (C2, 16 lines / 7 rules) + `skills/quality-gate/SKILL.md:66-87` (C3 §4b, 22 lines / ~10 rules) | Walls of text: opener + exit + budgets + ratchet + turn-taking + disagreement + warmth + masking + bet/record (C1); trigger + budget + terminal + untouched + contract (C2); bar + record + residual + expiry + authority + re-review ban + N=2 + PII + no-freelance + proof (C3). One idea per unit violated; C3 needs 3+ levels of mental indentation. Gate-report C3 table (`gate-report.md:39-43`) shows the fix: one rule per row. | ❌ |
| RD-004 | High | `skills/propose-changes/SKILL.md:42-44` ("máx N preguntas", "exactly one budgeted pass") vs `references/proposal-template.md:48-50` ("exactly one budgeted round", "re-challenge only on approver request") vs `skills/frame-intent/SKILL.md:55-58` ("máx N") | Vague normative + placeholder leak: `N` undefined in normative skill text (template variable leaked into law); pass vs round undefined; "budgeted" never defined (questions? minutes? rounds?). "Should/may/appropriate" not present — the vagueness here is worse: a capital-letter `N` with no binding. Same root as RL-001; clarity verdict: unimplementable as written. | ❌ |
| RD-005 | Med | `skills/quality-gate/SKILL.md:66` ("surgical, security-owned") + `skills/propose-changes/SKILL.md:44-45` ("no second pass without approver request") + `skills/verify-handoff/SKILL.md:37-39` ("not a tick") | Undefined adjectives: "surgical" (never defined — means additive-only + sample-only? or something else?), "thin-but-polite waiver" (matrices' term, absent from skill text — the thing C3 must FAIL has no skill-text definition), "budgeted" (RD-004), unbounded "approver request" hatch. Reader must import meaning from matrices. | ⚠️ |
| RD-006 | Med | Opt-in opener ×5 (`frame-intent:54-56`, `propose-changes:42-43`, `proposal-template:51-53`, `gate-report:62-65`, `verify-handoff:50-52`) + warmth ×4 + masking ×4 | Duplicated content, no single source of truth: 5 verbatim-ish copies of the opener with small drifts ("una a la vez" vs "una sola pregunta"; "di sí" vs "say salir/pause"). Exit-word fix (RL-011 `exit/salir`) needs 5 edits. Maintainability: point C2/C3/C4 at one canonical clause (people SPEC §4) instead of re-pasting. Proposals already do this correctly ("woven by reference") — skill text does not. | ⚠️ |
| RD-007 | Med | People SPEC `:75` insert #4 ("sin modo relentless" — contains banned token) vs shipped `frame-intent:65-67` + `propose-changes:49-51` ("desafío firme, nunca dureza" paraphrase) vs matrices E-004/E-010 ("verbatim-in-intent") | Verbatim claim unclear: "verbatim-in-intent" is defined by usage (paraphrase that keeps grep = 0) but reads as "verbatim". Strict-verbatim fails by design (canonical insert contains the banned word — CE-005). Rename the claim ("intent-match paraphrase, deviation recorded in T-010") so the gate does not misread it as word-identical. | ⚠️ |
| RD-008 | Med | `docs/specs/40_workspace/engineering/TEST_MATRIX.md:37` (E-020 "pass (impl) / pending co-sign at gate") + `:45` ("21/21 rows") vs `docs/specs/40_workspace/security/TEST_MATRIX.md:49` ("13/14 + routed fail") | Status vocabulary + count clarity: E-020's "pass/pending" is a CONDITIONAL wearing a pass label (CE-004); "21/21 pass" reads OPEN-ready. Security matrix's "13/14 + routed fail" is the honest pattern — copy it ("20/21 pass + 1 conditional (E-020, co-sign pending)"). Type column "Sign-off" on one row vs "Review" on 20 adds confusion. | ⚠️ |
| RD-009 | Low | `skills/propose-changes/SKILL.md:45` ("Repo files stay untouched") vs `references/proposal-template.md:41` ("no external sends/filings/launches") | Scope narrowing unclear: skill text bans file edits; template bans external sends too. Non-code reader asks: may I send during the grill? Same root as RL-010; clarity fix is one aligned sentence. | ⚠️ |
| RD-010 | Low | `salir`-only exit (`frame-intent:54-56`, `propose-changes:42-43`, samples ES-mixed) | Discoverability: EN-only reader never learns the exit word. Same root as RL-011; clarity fix: `exit/salir` alias everywhere (RD-006's single-source fix covers it). | ⚠️ |
| RD-011 | Low | Security PROPOSED_CHANGES `:8` (PACKET line, ~60 tokens) + engineering TEST_MATRIX `:13` (singleton note) + both matrices' header blocks (7-11 lines of packet metadata) | Header bloat: packet headers repeat SPEC/HARD/GATE/DOMAINS at full length in every file. Useful for trace, heavy for reading. Keep (trace beats brevity here) but never lengthen; future lanes cite packet by file path. | ✅ |

No Critical (docs-only wording; no safety-critical instruction misread that causes loss — the ❌s block gate comprehension, not safe operation).

## Positive observations (what reads well)

- Both PROPOSED_CHANGES: Summary → Changes table → Rationale → Alternatives-Considered → Risk Matrix → Blast Radius → Rollback → Trace. One idea per section, tables scannable, alternatives carry rejected-why. Exemplary structure.
- Security TEST_MATRIX honesty: "13/14 + routed fail" with T-009 evidence inline (exact rg + 5 hit locations) — discloses rather than inflates. Engineering scan log (`TEST_MATRIX.md:48-53`) with exact commands + exit codes is reproducible.
- Gate-report C3 record table (waiver × 3 blocks → PASS/FAIL per block) and waiver-template three-block bar (Accepted-risk / Compensating-controls+owner / Expiry+owner + Residual-risk) — the one place where hierarchy reveals intent. C3 skill text should mirror this table shape (see COND-D3).
- Sibling reviews this wave: refuter (RF/CE IDs + reproduction column) and reliability (FM/L/RL IDs + loophole table) are models of precise referencing (file:line + command). This review reuses their IDs without re-deciding them.

## Verdict Rationale

Four High clarity blockers (RD-001 terminology, RD-002 every-vs-sample, RD-003 walls-of-text, RD-004 undefined N) prevent a reader from answering "what must I do?" at C2/C3 without importing meaning from matrices. Mediums (RD-005..008) are condition-manageable wording fixes; Lows ride the gate. Per gate math (any ❌-class High → not OPEN; no Critical → not CLOSED-alone), this review is **CONDITIONAL**: conditions COND-D1..D5 below must clear. No handoff until conditions clear (waiver only by domain owners + orchestrator). Reliability RL-001..005 and refuter CE-001..005 are referenced, never re-decided — several COND-D overlap their conditions deliberately (same sentence fix clears both lenses).

### Conditions to clear (COND-D1..D5)

- [ ] COND-D1 (RD-001 + RD-007): glossary + tone ruling. One canonical term per concept (challenge = the round; grill = informal collective only, or vice versa — pick one, reword the other); C3 heading reworded per people-owner T-009 ruling (keep-per-fidelity with recorded waiver vs reword-per-tone); "verbatim-in-intent" renamed to "intent-match paraphrase (T-010)".
- [ ] COND-D2 (RD-002): every-not-sample fix — "every CONDITIONAL/waiver gets a row; rows = CONDITIONALs" in `quality-gate/SKILL.md:68-79` + `gate-report.md:39-41` (shared with RL-004/COND-R4; one edit clears both).
- [ ] COND-D3 (RD-003): break up C1/C2/C3 blocks — one bullet per rule (mirrors gate-report table shape for C3); no new normative content, pure restructure. C3 §4b → sub-bullets: bar, record, residual, expiry, authority, re-review ban, N=2, PII, no-freelance, proof.
- [ ] COND-D4 (RD-004 + RD-005 + RD-009): bind the variables — numeric C2 cap (≤3, mirrors C1) + pass-definition + `exit/salir` alias in skill text (shared with RL-001/COND-R1, RL-010, RL-011); "surgical" defined once or deleted; skill-text untouched rule aligned to template (files + external sends).
- [ ] COND-D5 (RD-006 + RD-008): single-source + honest counts — opener/warmth/masking point to people SPEC §4 canonical clauses (5 copy sites → 1 source + references); engineering matrix E-020 relabeled conditional + coverage line "20/21 pass + 1 conditional (co-sign pending)".

## Risks

- Thin-but-polite waiver passes C3 by box-ticking — carried RR-C34-1/RL-006 (owner barrera); this review adds: skill text gives the reviewer no substance rubric, only presence checks, so judgment load is implicit.
- T-009/CE-001 tone conflict ships unresolved if gate does not rule — carried RR-C34-3 (owner santana/people owner); clarity exposure: new text clean, §4b + waiver:30 keep banned tokens against REQ-P-003's letter.
- "Hard cap" read as mechanical guarantee — carried refuter RR-R2 (owner engineering owner); clarity exposure: caps are declarative prompt text with no counter (CE-003/RL-001).
- E-020 "21/21 pass" misread as OPEN-ready — gate must read E-020 as CONDITIONAL until people co-sign (REQ-P-004).

## Assumptions

1. Refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (RL-001..011) + arch Approved + security Conditional taken as GATE input — referenced by ID, never re-decided or re-evidenced here.
2. Sibling-lane commits + working tree verified by sibling reviews (refuter A4, reliability A3) — not re-verified here; file:line citations assume committed state = working tree.
3. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given.
4. People-owner ruling (T-009/CE-001 tone + CE-005 paraphrase blessing + E-020 co-sign) arrives via people-reviewer at quality-gate; this review writes the wording conditions, not the ruling.
5. Template placeholders (`{{AGENT_ROLE}}`, `SPEC-XXX`, `YYYY-MM-DD` in `proposal-template.md`) are by-design template slots, not leaks — only `máx N` in normative skill text (RD-004) is flagged as a leak.

## Scoped Evidence (reference-only, allowlisted)

- `skills/frame-intent/SKILL.md:51-71` (C1) + `skills/propose-changes/SKILL.md:36-53` (C2) + `skills/propose-changes/references/proposal-template.md:43-53` (C2 hook) + `skills/propose-changes/references/risk-assessment.md:29-35` (C2 note)
- `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/quality-gate/references/gate-report.md:32-65` (C3 record + residual + checkpoint + tone) + `skills/quality-gate/references/waiver-template.md:14-54` (bar + checkpoint, minus triage line per CE-002) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `skills/verify-handoff/references/dod-checklist.md:10-11`
- `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (117 lines) + `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (104 lines) + `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (58 lines, E-001..E-020) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (62 lines, T-001..T-010) + `docs/specs/10_design/SPEC-grilling-integration-people.md:71-77` (§4 canonical inserts, incl. insert #4 self-contradiction) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only)
- Sibling verdicts (input, not re-decided): `docs/specs/40_workspace/quality-gate/grilling-integration/review-refuter.md` (CONDITIONAL, CE-001..005) + `review-reliability.md` (CONDITIONAL, RL-001..011)
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/readability-review.md` (checklist authority for this verdict)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) at gate:** COND-D1 ruling (T-009/CE-001 `interrogat*` keep vs reword + CE-005 paraphrase blessing) + E-020 co-sign (REQ-P-004) + exit-terminal wording co-sign.
2. **Engineering owner (vasquez) at gate:** COND-D2..D4 mechanics wording (every-not-sample, block breakup, C2 cap + pass-definition, "surgical" define-or-delete) + routing-table/DoD additive-only confirm.
3. **Security owner (barrera) at gate:** residual-risk watch (RR-C34-1 thin waiver, RR-C12-1 volunteered PII) + C-1..C-6 clearance carry + T-009 triage confirm.
4. **Orchestrator (montilla):** TTL default confirm (90d-or-next-release) at synthesis; LICENSE open question stays with orchestrator (C-5); COND-D5 single-source pattern approval (SPEC §4 as canonical clause source).
