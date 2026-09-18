# Security-Reviewer Verdict: grilling-integration (C1–C4 skill-text plug-in)

**Reviewer:** security-reviewer (security owner) — independent audit; NOT barrera-lane author (no self-review)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 4/4
**Packet:** SPEC:C1–C4 skill diffs (9 files, `48757e8^..HEAD`) + `docs/specs/40_workspace/engineering/SECURITY_REVIEW.md` (C-1..C-6) + `docs/specs/40_workspace/security/SECURITY_REVIEW.md` (D-1..D-7, carried by reference) + both `THREAT_MODEL.md` (STRIDE) + both `TEST_MATRIX.md` + both `PROPOSED_CHANGES.md` + SPECS + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only) / HARD:multi-subagents gate wave 4/4; independent eyes, no deference to lane-author claims; thin-waiver box-tick (demonstrated live by qa) gets explicit ruling below / GATE:arch Approved; sibling verdicts refuter/reliability/readability/resilience/risk/qa all CONDITIONAL (input, never re-decided); people-reviewer pending — this verdict + people-reviewer feed final synthesis / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/domains/security-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`). Domain role understood before acting: deep security audit of the diff; rule security only.

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + `skills/quality-gate/references/domains/security-review.md`. Sibling findings referenced by ID only (CE/RL/RD/RS/RK/QA); only security-rule items are owned here.

## Checklist (security-review.md × diff)

- [✅] Threat model complete (STRIDE) — both lanes' `THREAT_MODEL.md` present; surfaces = grill-answer ingress (user→corpus→export) + waiver-record egress (reviewer→gate-record→ship); no new endpoints/adapters/boundaries/payloads, no new runtime trust boundary. Verified via lane file list (9 md files only).
- [⚠️] AuthN/AuthZ verified — no identity surface in scope (STRIDE Spoofing correctly N/A except classification-spoof, contained by ratchet C-3). CLOSED-authority + re-review/re-litigation bans present verbatim (T-002 re-verified). Residual: CLOSED-override vector contained, not eliminated — carried.
- [❌] Input validation at all boundaries — C2 trigger self-reported prose, no synonym/scan rule (RL-003 carry → SEC-G3); C2 budget `máx N` undefined (RL-001 carry → C-3 partial); link/block substance unchecked (RL-006 carry → SEC-G1/G4). See C-1..C-6 below.
- [✅] Secrets not in code — re-ran raw-assign `rg` over all four skill dirs → **0 hits**; lane-diff shape scan → 0 value lines. S-C12-005/S-C34-006 REFUTED pattern confirmed independently. ✅
- [✅] Dependencies scanned — N/A with justification: 0 `.ts`/`.json`/package changes in lane diff (re-verified via `git log --name-only` filter → no matches); docs-only, `mise run typecheck` unaffected per arch INV-001. No new dep surface. ✅
- [⚠️] Data handling compliant (PII, retention, Ley 172-13) — masking clauses present C1/C2 (re-verified), checkpoints in 3 C3/C4 refs (T-004 re-verified), allowlisted-evidence-only honored (matrices cite paths, no dumps). Residual: elicitation-by-design (S-C12-001) + volunteered PII (RR-C12-1) contained, not eliminated — carried with owners.
- [⚠️] Audit logging in place — scan logs + C3 record table + residual-risk+owner lines present; `grill: declined/exited` recorded C1/C2. Gap: no stall-duration/exit-count signal; all evidence manual `rg` with no CI hook (QA-008 carry). Rides gate.

## C-1..C-6 Disposition (binding conditions from review-security — verified, carried or failed)

| Cond | Claim | Re-ran | Disposition |
|------|-------|--------|-------------|
| C-1 masking verbatim C1+C2 | Warm masking clause in grill openers + C2 prompt + every export | `rg mask\|privacidad\|allowlist` hits `propose-changes/SKILL.md:51` + `frame-intent/SKILL.md:67`; samples 0 PII (scan logs re-verified) | **CARRY as met-text, residual carried** — elicitation-by-design remains (RK-001/RR-C12-1, owners engineering+people, verifier security-reviewer). Not a fail; containment evidenced on samples. |
| C-2 scan-log proof + allowlist | Sample C1+C2 rounds + export each ship scan log 0 raw; attestation-alone = FAIL | Re-ran banned-grep (eng set 0 hits exit 1) + raw-assign grep (4 dirs 0 hits) + lane-diff shape scan (0 value lines); FAIL rules present in gate-report C3 + dod-checklist | **CARRY as met** — proof (not attestation) verified independently. Regression-harness gap (manual rg, QA-008) rides as Low, does not fail C-2. |
| C-3 ratchet + budget verbatim | C1 caps + one-way ratchet + C2 one-pass + pause/exit verbatim | Ratchet `"Profundidad solo sube` present `frame-intent:61`; caps 1/cap 3/cap 5 present; one-pass present — BUT C2 `máx N` undefined in normative text (RL-001/RD-004/QA-003, read `propose-changes:42-44`) | **CONDITIONAL — not met as written** (budget half unbound). Shares fix with COND-R1/COND-S2/COND-D4: bind numeric C2 cap + pass-definition + N+1 FAIL demo. Ratchet half carries as met. |
| C-4 tone gate | Opt-in + exit + one-at-a-time + disagreement-invite + warmth verbatim; banned-grep 0; people co-sign | New text clean (eng set 0 hits ✅) BUT system scope RED: 5× `interrogat*` (`qg-SKILL:66,69,73,78` + `waiver:30`, re-ran exact) vs REQ-P-003 letter; E-020 co-sign outstanding (no people-reviewer verdict in dir at audit time); CE-005 paraphrase needs blessing | **CONDITIONAL — people-owner ruling required** (shares fix with COND-R5/COND-D1/COND-K4). No ship until ruled: keep-per-fidelity with recorded waiver vs reword-per-tone + paraphrase blessing + E-020 co-sign. |
| C-5 no verbatim external text | Original wording only; LICENSE stays with orchestrator | Lane diff reviewed: no external-text reuse markers; E-016 claim holds; open question untouched in skill text | **CARRY as met** — owner orchestrator; no finding. |
| C-6 no scope drift | No new skill dir/stage/reviewer/dep; typecheck unaffected | `git diff 48757e8^..HEAD --stat -- skills/` = 9 md files, +174/-4, disjoint per-lane sets; runtime-file filter → 0 matches; no routing-table change (T-002 re-verified §3 unaltered) | **CARRY as met** — deny-by-default holds (0 unwaived findings ship except routed T-009 with owner). ✅ |

D-1..D-7 (security C3/C4 lane bar) carried by reference, not re-decided: D-1 bar verbatim ✅ (re-verified three-block lines), D-2 sample-vs-bar ✅ text-present, D-3 authority bans ✅ verbatim, D-4 PII checkpoints ✅ (3 refs), D-5 TTL ✅ orchestrator-confirmed per packet (taken as given), D-6 tone/no-freelance/proof ✅ (4/4; triage line 3/4 per QA-001 — Low record gap, see SEC-G6), D-7 no drift ✅. Substance caveat (D-1/D-2 presence≠substance) is the thin-waiver ruling below.

## Thin-Waiver Ruling (HARD-required explicit ruling on qa PROBE-A)

**Confirmed independently by reading the rule text:** a vacuous-but-complete waiver (`Accepted-risk: low because low / Compensating-controls: will be careful (owner: someone) / Expiry: later / Sign-off: me / Residual-risk: none`) satisfies every machine-checkable C3 predicate — all five presence checks (`Accepted-risk`, `Compensating-controls`, `Expiry`, `Sign-off`, `Residual-risk`) return PASS on vocabulary alone; no substance rubric, counter, or link-resolution rule in `gate-report.md:39-43` / `waiver-template.md:14-31` / `dod-checklist.md:10` rejects it. **Box-ticking passes the letter of C3 today; the only backstop is implicit reviewer judgment.** This is the carried residual RR-C34-1/S-C34-001/RL-006/RK-003 — not a new vulnerability, not a silent PASS, and not grounds for CLOSED (no prod surface, no secret exposure, bar text + judgment path exist). **Ruling: gate stays CONDITIONAL until the substance backstop is explicit** — either a substance rubric or a recorded reviewer-judgment FAIL reason per waiver, plus a thin-waiver FAIL demo (shares fix with COND-K1/COND-Q4). Cherry-pick (every-vs-sample, SEC-G2) and dead-link (SEC-G4) are the same presence≠substance root at C3-scope and C4-evidence respectively.

## Findings (security-owned; sibling items cited, not re-decided)

| ID | Severity | Finding | OWASP | Evidence | ✅/⚠️/❌ |
|----|----------|---------|-------|----------|----------|
| SEC-G1 | High | Thin-waiver box-tick passes C3 presence checks (ruling above) | A04:2021 Insecure Design (waiver laundering) | `gate-report.md:39-43` (presence-only rows) + qa PROBE-A live demo (input quoted in ruling) | ❌ (condition, not CLOSED-alone) |
| SEC-G2 | High | Every-vs-sample quantifier mismatch lets N-1 waivers ship unexamined (RL-004 carry, security grading: false-confidence gate) | A04:2021 Insecure Design | `quality-gate/SKILL.md:68-69` vs `:77-79` + `gate-report.md:39-41` singular row | ❌ (COND-K1/COND-R4/COND-D2/COND-S3 shared fix) |
| SEC-G3 | High | C2 trigger evadable by omission/synonym; ungrilled high-blast-radius change ships with PII (RL-003/L-3 carry, security grading: exposure path) | A04:2021 Insecure Design (+ A01 evasion aspect) | `propose-changes/SKILL.md:39-41` literal-word prongs; qa PROBE-C negative cannot pass today | ❌ (COND-R3 shared fix) |
| SEC-G4 | Med | Dead/irrelevant evidence link passes C4 presence rule; HANDOFF routes on hollow links (RL-006 C4-half carry) | A09:2021 Security Logging Failures | `dod-checklist.md:10` (`link present` satisfies); qa PROBE-B live demo | ⚠️ (COND-K2/COND-Q4 shared fix) |
| SEC-G5 | Med | Shipped C3 text violates REQ-P-003 letter (5× `interrogat*`) while new text clean — governance precedent risk, not exposure | N/A (governance; A01-adjacent) | Re-ran Q2: exact 5 hits listed in C-4 row; T-009/CE-001/RL-005 carry | ⚠️ (people-owner ruling, COND-R5/COND-D1/COND-K4) |
| SEC-G6 | Low | T-007 cell overclaims triage-line 4/4; `waiver-template.md:54` carries proof-line but no Critical/High line (re-verified: triage in 3/4 refs) | N/A (record integrity) | `rg Critical/High` → 3/4 (waiver absent); QA-001/CE-002 carry | ⚠️ (one-line matrix correction or line-add via new proposal; never freelance-fix per Guardrail 4) |
| SEC-G7 | Med | E-020 `pass (impl) / pending co-sign` misreadable as OPEN-ready (CE-004 carry; gate-misread vector) | N/A (process integrity) | `engineering/TEST_MATRIX.md:37` cell text confirmed verbatim | ⚠️ (relabel conditional; COND-K3/COND-Q2 shared fix) |
| SEC-OK1 | — | No credential/secret/session material in diff (0 raw values) | — | Raw-assign `rg` 4 dirs → 0 hits; lane-diff shape scan → 0 value lines | ✅ |
| SEC-OK2 | — | No scope drift / no new trust boundary / no new dep | — | 9 md files; runtime filter 0; disjoint lanes; routing §3 unaltered | ✅ |
| SEC-OK3 | — | Masking + checkpoints + no-freelance-fix + proof-or-refuted present (triage 3/4 noted in SEC-G6) | — | Clause greps: masking 2/2 openers + 4/4 refs; no-freelance 4/4; proof 4/4 | ✅ |

No Critical (docs-only skill-text; no exploitable prod surface, no auth bypass, no secret material — severity ceiling High per risk-lens assumption-3, concurred).

## Verdict Rationale

OPEN is unavailable: three Highs (SEC-G1/G2/G3) mean CONDITIONALs can be promoted, waivers shipped unexamined, and high-blast-radius changes ungrilled — the exact failures the C1–C4 plug-in exists to prevent — plus C-3/C-4 conditions unmet pending people-owner rulings. CLOSED is unwarranted: no Critical, no boundary violation, no secret exposure; PII elicitation is by-design and contained by evidenced controls on samples; every residual names an owner. **CONDITIONAL**, aligned with all six sibling verdicts. No handoff until security conditions + people-reviewer co-sign clear (waiver only by domain owners + orchestrator).

### Conditions to clear (security-owned; de-duplicated — shared fix cited, never forked)

- [ ] COND-SEC1 (SEC-G1 thin-waiver; shares fix with COND-K1/COND-Q4): substance backstop explicit (rubric or reviewer-judgment FAIL reason per waiver) + thin-waiver FAIL demo. Box-tick without substance must FAIL loudly.
- [ ] COND-SEC2 (SEC-G2/G4 scope+evidence; shares fix with COND-R4/COND-D2/COND-S3 + COND-K2): every-not-sample wording ("every CONDITIONAL/waiver gets a row; rows = CONDITIONALs") + multi-waiver demo + dead-link FAIL demo.
- [ ] COND-SEC3 (SEC-G3 evasion + C-3 budget; shares fix with COND-R1/R3 + COND-S2/COND-D4): numeric C2 cap + pass-definition + N+1 FAIL demo + trigger synonym table + independent scan rule + evasion-negative demo.
- [ ] COND-SEC4 (SEC-G5/G7/G6 + C-4; people-owner ruling + honesty fixes): T-009/CE-001 ruling (keep-per-fidelity with waiver vs reword) + CE-005 paraphrase blessing + E-020 relabel conditional + T-007 correction to 3/4 (or line-add via new proposal).

## Risks

- Thin-but-polite waiver passes C3 by box-ticking — carried RR-C34-1 (owner barrera; watcher security-reviewer). Explicit ruling above; COND-SEC1 closes it.
- Cherry-picked sample-of-one presented as full gate — RK-004 (owner engineering + watcher barrera); COND-SEC2 closes it.
- Ungrilled high-blast-radius change ships via trigger evasion — RL-003 root (owner engineering); COND-SEC3 closes it.
- Volunteered PII in grill answers despite masking — carried RR-C12-1 (owners engineering + people, verifier security-reviewer); contained by C-1/C-2, watched at sample-vs-checkpoint review.
- T-009 tone conflict ships unresolved — carried RR-C34-3 (owner santana/people owner); COND-SEC4 closes it.
- Waiver TTL lapse — carried RR-C34-2 (owner barrera; D-5 confirmed); contained, watch item.
- E-020 read as OPEN-ready at synthesis — SEC-G7; synthesis must use corrected counts (20/21 + 1 conditional eng; 13/14 + routed security with T-007 at 3/4).

## Assumptions

1. Sibling verdicts (refuter/reliability/readability/resilience/risk/qa, all CONDITIONAL) + arch Approved taken as GATE input, never re-decided; cited by ID.
2. Sibling-lane commits `48757e8..94af54a` are the complete C1–C4 diff per refuter assumption-3; tree state verified via `git log`/`git diff --stat` this session (`git status` runner-blocked, accepted via committed-state reads + qa Q0 clean-tree log by reference).
3. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given (D-5); graded as waiver-expiry, not round timeout.
4. People-owner ruling (T-009 tone + CE-005 paraphrase + E-020 co-sign) arrives via people-reviewer; this review writes the security conditions, not the ruling.
5. No freelance fixes per Guardrail 4: SEC-G6 correction is matrix-or-proposal work, owned by engineering + security owners, not applied here.

## Scoped Evidence (reference-only, allowlisted)

- Diff under audit: `git diff 48757e8^..HEAD --stat -- skills/` (9 md, +174/-4) + round text `skills/frame-intent/SKILL.md:51-71` (C1) + `skills/propose-changes/SKILL.md:36-53` (C2) + `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `references/gate-report.md:32-65` + `references/waiver-template.md:14-54` + `references/dod-checklist.md:10-11` + `references/proposal-template.md:43-53` + `references/risk-assessment.md:29-35`
- Security ownership: `docs/specs/40_workspace/engineering/SECURITY_REVIEW.md` (Conditional C-1..C-6) + `docs/specs/40_workspace/security/SECURITY_REVIEW.md` (Conditional D-1..D-7) + both `THREAT_MODEL.md` (STRIDE)
- Matrices: `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (14 rows, T-009 routed)
- Sibling verdicts (input): `review-refuter.md` (CE-001..005) + `review-reliability.md` (RL-001..011) + `review-readability.md` (RD-001..011) + `review-resilience.md` (RS-001..010) + `review-risk.md` (RK-001..014) + `review-qa.md` (QA-001..008, PROBE-A/B/C)
- Commands (re-ran this session, outputs inline in C-1..C-6 + Findings): word-boundary banned `rg` (eng set 0 / sys set exact 5); raw-assign `rg` (0); `no-freelance-fix` 4/4, `proof-or-refuted` 4/4, `Critical/High` 3/4; masking/ratchet/cap clause `rg`; lane-diff `--stat` + runtime-file filter (0); three-block bar `rg`
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/domains/security-review.md` (checklist authority for this verdict)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) via people-reviewer:** COND-SEC4 ruling (T-009/CE-001 keep vs reword + CE-005 paraphrase blessing) + E-020 co-sign (REQ-P-004) + exit-terminal wording co-sign.
2. **Engineering owner (vasquez) at gate:** COND-SEC1/2/3 mechanics (C2 cap, trigger hardening, every-not-sample, substance demos, E-020/T-007 relabels) + routing-table/DoD additive-only confirm.
3. **Security owner (barrera) at gate:** RR-C34-1 thin-waiver watch + C-1..C-6/D-1..D-7 clearance carry + RK-013 template triage-line disposition.
4. **Orchestrator (montilla):** TTL re-confirm at synthesis; LICENSE stays with orchestrator (C-5); synthesis must use corrected counts (E-020 conditional, T-007 3/4) and carry every residual with its owner — any ownerless residual = FAIL.
