# Risk Review: grilling-integration (C1–C4 skill-text plug-in)

**Reviewer:** review-risk (security-risk / data-exposure / business-risk auditor)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 3/4
**Packet:** SPEC:C1–C4 skill-text diffs (`skills/frame-intent/SKILL.md:51-71` C1, `skills/propose-changes/SKILL.md:36-53` C2, `skills/quality-gate/SKILL.md:66-87` C3, `skills/verify-handoff/SKILL.md:35-52` C4 + refs) + both TEST_MATRIX files + both PROPOSED_CHANGES + SPECS (`10_design`, `15_requirements`, `20_backlog`/`50_archive` security slice) + brief `docs/briefs/BRIEF-grilling-integration.md` (all read-only) / HARD:multi-subagents gate wave 3/4; risk-rate each finding family; residual must name owner or fail / GATE:arch Approved, security Conditional (C-1..C-6 + D-1..D-7, not re-decided) / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + engineering risk lens (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`)

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`). Domain role understood before acting: audit security-risk, data-exposure, and business-risk of the diff. No deep OWASP (security lane owned S-C12/S-C34 findings) and no functional-correctness hunting (reliability owned RL findings) — sibling verdicts taken as input by ID, never re-decided: refuter CONDITIONAL (CE-001..005), reliability CONDITIONAL (RL-001..011), readability CONDITIONAL (RD-001..011), resilience CONDITIONAL (RS-001..010).

## Trust Boundaries — expected (ADR-007) vs actual

- Expected: docs-only fold-in, no new endpoints/adapters/service boundaries/payloads, no new trust boundary. Only new data ingress is the human-in-the-loop grill answer (user → corpus → export/log); only egress is the waiver record + evidence exports.
- Actual: matches. Lane diffs are markdown-only (`skills/frame-intent/`, `skills/propose-changes/`, `skills/quality-gate/`, `skills/verify-handoff/` + refs + lane singletons), disjoint file sets per lane, no runtime/dep/stage/reviewer change (E-016, T-006 boundary scans). **No trust-boundary violation.** ✅
- Boundary that remains: grill answers cross user→corpus→export, and waiver justifications cross reviewer→gate-record→ship. Both crossings have checkpoint text (masking 4/4 refs per T-010, three-block bar per T-001) — but enforcement is prompt wording, not mechanism. Risk-graded below, not boundary-failed.

## Family Risk-Rating (each sibling family, risk lens only)

| Family | Sibling verdict | Risk reading |
|--------|----------------|--------------|
| CE-001..005 (refuter) | CONDITIONAL | CE-001/T-009 banned-lexicon conflict is a **governance risk, not an exposure**: 5 inherited `interrogat*` hits violate REQ-P-003's letter while new text is clean — ships as waiver-laundering precedent if gate does not rule (RK-007). CE-002 triage-line overclaim leaves a **triage-record gap** in the waiver template (RK-013, Low). CE-003 declarative-caps caveat converts "hard cap" into an **expectation risk** (RK-008 contributor). CE-004 premature E-020 pass is a **gate-misread vector** (RK-006). CE-005 SPEC self-contradiction needs a ruling, else paraphrase-vs-verbatim becomes a future waiver excuse (folds into RK-007). |
| RL-001..011 (reliability) | CONDITIONAL | From risk: RL-003 trigger evasion = **ungrilled high-blast-radius change ships** (business risk, folds into RK-008/RK-003). RL-004 every-vs-sample = **systematic cherry-pick** (RK-004, High). RL-006 presence≠substance = **attestation-grade gate** (RK-003/RK-005). RL-001/002 unbounded budget + missing N=2 = **fatigue/stall business risk** (RK-008). RL-005 banned lexicon = same as RK-007. RL-007..011 = contained Mediums/Lows, risk-accepted with cited fixes. |
| RD-001..011 (readability) | CONDITIONAL | From risk: RD-002 every-vs-sample + RD-004 undefined N make the normative text **unenforceable as written** — an unauditable control is a control that fails silently (compounds RK-004). RD-006 five-copy duplication means every future fix (exit alias, masking update) needs 5 edits — **drift risk**: copies diverge, one touchpoint loses its guardrail (Low/Med, owner engineering). Rest is hygiene. |
| RS-001..010 (resilience) | CONDITIONAL | From risk: RS-001/002 stall-without-breaker = **initiative hang**, operational not data risk (accepted as Medium contributor to RK-008). RS-007 dual SPEC copies + dangling pointer = **gate-integrity risk**: re-entrant reviewer clears against stale/missing source (RK-009). RS-008/009 verified-contained (✅, no SPOF, ratchet holds). RS-010 observability half-present — stall/exit counts unlogged, so fatigue has no meter (Low, recommend log line, rides gate). |

## Risks (severity + owner per risk — no ownerless residual)

| ID | Severity | Risk | Owner | ✅/⚠️/❌ |
|----|----------|------|-------|----------|
| RK-001 | Medium | PII elicitation by design: C2 trigger fires on customers/regulators/revenue, inviting regulated detail into grill answers/exports (S-C12-001 carry). Contained by verbatim masking clause C-1 + scan-log proof C-2 + allowlist; samples show 0 PII. Live-use residual remains. | engineering owner (verbatim) + people co-owner, verifier barrera | ⚠️ |
| RK-002 | Medium | Volunteered PII in grill answers despite masking reminder — user pastes customer detail unprompted (RR-C12-1 carry). Likelihood Low under C-1, impact High. Contained by scan-log + allowlist + Ley 172-13 minimization at export; watched at sample-vs-checkpoint review. | engineering owner + people owner, verifier barrera | ⚠️ |
| RK-003 | High | Waiver laundering: thin-but-polite waiver passes C3 by box-ticking — presence checks without substance rubric, reviewer judgment the only (implicit) backstop (S-C34-001 + RR-C34-1 + RL-006 carry). A CONDITIONAL promoted without substance ships weak justification past the gate. | barrera | ❌ |
| RK-004 | High | Cherry-pick: every-vs-sample quantifier mismatch lets a sample-of-one satisfy the letter while N-1 waivers ship unexamined — partial check presented as full gate, false confidence worse than explicit degraded mode (RL-004/L-4 + RS-005 carry). | engineering owner (wording fix) + barrera (watch) | ❌ |
| RK-005 | Medium | Attestation-grade C4: dead/irrelevant evidence link passes presence check; HANDOFF routes on hollow REQ→evidence links (RL-006 C4-half carry). No FAIL demo exists for substance. | engineering owner, watcher barrera | ⚠️ |
| RK-006 | Medium | E-020 "21/21 pass" misread as OPEN-ready: pass recorded while people co-sign (REQ-P-004) outstanding (CE-004 carry). A CONDITIONAL wearing a pass label is a waiver-laundering vector at synthesis. | engineering owner (relabel) | ⚠️ |
| RK-007 | Medium | T-009/CE-001 tone conflict ships unresolved: §4b + waiver:30 keep banned tokens against REQ-P-003's letter while new text stays clean. Unruled = precedent that approved wording outranks the ban without a record. Gate-resolvable. | santana / people owner (ruling), verifier people-reviewer | ⚠️ |
| RK-008 | Medium | Fatigue → rubber-stamp at scale: unbounded C2 one-pass (`máx N` undefined) + 20-REQ one-at-a-time C4 + uncapped approver re-grill consume attention until later gates nod along (RL-001/009 + RS-003/006 + brief F2 risk carry). REQ-P-005 spirit violated at volume. | engineering owner + people owner | ⚠️ |
| RK-009 | Medium | Stale-source gate: security proposal cites non-existent `40_workspace/security/SPEC-…` path; security SPEC lives in two places (`20_backlog/` + `50_archive/`). Re-entrant reviewer resolves wrong/dead source and clears against it (RS-007 carry). Docs-pointer fix, no content change. | orchestrator (single-source ruling) | ⚠️ |
| RK-010 | Low | Secret/credential exposure in code/config/logs: lane scans show 0 raw values — hits are masking-clause declarations + synthetic "0 PII" claims only (S-C12-005/S-C34-006 REFUTED pattern, E-019, T-003). No finding; recorded as verified. | — (verified, no owner needed) | ✅ |
| RK-011 | Low | Scope drift / new attack surface: no new skill dir/stage/reviewer/dep/runtime; deny-by-default holds (E-016, T-006/T-008). No finding; recorded as verified. | — (verified, no owner needed) | ✅ |
| RK-012 | Low | LICENSE verbatim-reuse: external grilling text reuse without clearance would be a legal/business risk; execute used original wording only, open question stays with orchestrator (C-5 carry). | orchestrator | ⚠️ |
| RK-013 | Low | Triage-record gap: waiver-template carries no-freelance-fix + proof-or-refuted but no Critical/High same-session triage line (CE-002) — a Critical surfacing via the waiver path has no template-forced same-session escalation. Behavior lives in 3/4 refs; record gap only. | barrera (template) + engineering owner (matrix correction T-007 → 3/4) | ⚠️ |
| RK-014 | Low | Waiver TTL lapse without re-review (RR-C34-2 carry): contained — TTL 90d-or-next-release orchestrator-confirmed, re-review owner mandatory per waiver (D-5). Watch item, not a blocker. | barrera | ✅ |

No Critical: docs-only skill-text unit — no exploitable production surface, no data-loss/corruption path, no auth bypass, no secret material. Highest grade is High (RK-003/RK-004 gate-integrity risks).

## Regulatory & business-risk notes

- **Ley 172-13 (personal data):** minimization holds — no new PII store (T-004/REQ-SEC-NF-002); checkpoints declare purpose + TTL + deletion; exports allowlisted, matrices cite paths not dumps. Residual is live-use volunteered PII (RK-002), contained not eliminated — correctly carried with owners, not silently passed.
- **Waiver-laundering (business risk):** RK-003 + RK-004 + RK-006 are the same business story — the gate can be satisfied on paper while substance escapes. Combined they are the reason this verdict is CONDITIONAL, not OPEN.
- **Attestation-grade evidence (business risk):** RK-005 — C4 as written accepts link presence for link substance. Until a substance demo or explicit judgment-backstop exists, HANDOFF evidence is attested, not proven.
- **Residual ownership (HARD):** every carried residual names an owner: RR-C12-1 (engineering + people / verifier barrera), RR-C12-2 (engineering), RR-C34-1 (barrera), RR-C34-2 (barrera), RR-C34-3/T-009 (santana/people), RR-R1..R3 refuter (people / engineering / barrera), RR-S1..S5 resilience (engineering / engineering+people / barrera / people / orchestrator). This review's own residuals (RK-001..RK-014) all name owners except the two verified-✅ rows, which need none. HARD satisfied — no ownerless residual ships from this lane.

## Verdict Rationale

OPEN is unavailable: two High gate-integrity risks (RK-003 thin-waiver box-tick, RK-004 cherry-pick) mean CONDITIONALs could be promoted and waivers shipped without substance examination — the exact failure the C3/C4 plug-in exists to prevent. CLOSED is unwarranted: no Critical, no exploitable surface, no boundary violation, no secret exposure; PII elicitation is by-design and contained by evidenced controls on samples; all residuals carry named owners. **CONDITIONAL** is correct and aligned with all four sibling verdicts — conditions below are risk-owned, de-duplicated against sibling conditions (shared fix cited, not forked), plus two risk-only conditions (E-020 relabel honesty, residual-owner preservation at synthesis).

### Conditions to clear (COND-K1..K5, risk-owned)

- [ ] COND-K1 (RK-003/RK-004 — gate substance; shares fix with COND-R4/COND-D2/COND-S3): every-not-sample wording ("every CONDITIONAL/waiver gets a row; rows = CONDITIONALs") + thin-waiver backstop — either a substance rubric or an explicit reviewer-judgment FAIL reason recorded per waiver. Box-tick without substance must FAIL loudly, not pass silently.
- [ ] COND-K2 (RK-005 — evidence substance): dead-link/hollow-link FAIL demo at C4, or explicit reviewer-judgment backstop recorded as COND-risk. Presence-only C4 must not route HANDOFF.
- [ ] COND-K3 (RK-006 — count honesty; risk-only): E-020 relabeled conditional + coverage line "20/21 pass + 1 conditional (co-sign pending)" mirroring security matrix honesty pattern. Gate synthesis must not read 21/21 as OPEN-ready.
- [ ] COND-K4 (RK-007 — tone ruling; shares fix with COND-R5/COND-D1): people-owner ruling on 5× `interrogat*` (keep-per-fidelity with recorded waiver vs reword-per-tone) + CE-005 paraphrase blessing (fix SPEC insert #4 or bless paraphrase) + E-020 co-sign (REQ-P-004). No ship until ruled.
- [ ] COND-K5 (residual preservation; risk-only): gate-report synthesis carries every residual with its owner (RK table + RR-C12/RR-C34 carries). Any residual without an owner at synthesis = FAIL per HARD.

## Assumptions

1. Prior verdicts taken as GATE input, never re-decided: refuter CONDITIONAL (CE-001..005), reliability CONDITIONAL (RL-001..011, COND-R1..R5), readability CONDITIONAL (RD-001..011, COND-D1..D5), resilience CONDITIONAL (RS-001..010, COND-S1..S4), arch Approved (ADR-007 proposed), security Conditional (C-1..C-6, D-1..D-7).
2. Scan evidence accepted by reference: eng matrix scan log (banned-grep 0 on C1/C2 set, secret-scan 0 raw) + security lane T-003 shape scan (0 raw) + T-009 5-hit log — commands and exit codes recorded in sibling matrices, not re-run here.
3. Skill-text-only cycle: severity ceiling is High — no runtime/plugin/package/prod surface, so no Critical available to this unit.
4. TTL (90 days or next release, whichever first) orchestrator-confirmed per dispatch packet — taken as given; graded as waiver-expiry fallback (RK-014 contained), not as round timeout.
5. People-owner ruling (T-009/CE-001 tone + CE-005 paraphrase + E-020 co-sign) arrives via people-reviewer at quality-gate; this review writes the risk condition, not the ruling.

## Scoped Evidence (reference-only, allowlisted)

- Round/bar text under audit: `skills/frame-intent/SKILL.md:51-71` (C1) + `skills/propose-changes/SKILL.md:36-53` (C2) + `skills/quality-gate/SKILL.md:66-87` (§4b) + `skills/verify-handoff/SKILL.md:35-52` (§3a) + `references/gate-report.md:32-73` + `references/waiver-template.md:14-54` + `references/dod-checklist.md:10-11`
- Security ownership (not re-decided): `docs/specs/40_workspace/engineering/SECURITY_REVIEW.md` (Conditional C-1..C-6, RR-C12-1/2) + `docs/specs/40_workspace/security/SECURITY_REVIEW.md` (Conditional D-1..D-7, RR-C34-1/2) + both `THREAT_MODEL.md` (STRIDE cores)
- Matrices (evidence by reference): `docs/specs/40_workspace/engineering/TEST_MATRIX.md` (21 rows, E-020 conditional-in-pass-clothing) + `docs/specs/40_workspace/security/TEST_MATRIX.md` (13/14 + T-009 routed fail, RR-C34-1/2/3)
- Sibling verdicts (input): `docs/specs/40_workspace/quality-gate/grilling-integration/review-refuter.md` (CE-001..005) + `review-reliability.md` (RL-001..011) + `review-readability.md` (RD-001..011) + `review-resilience.md` (RS-001..010)
- Contract sources: `docs/briefs/BRIEF-grilling-integration.md` (Framing 2, constraints, open questions) + `docs/specs/10_design/SPEC-grilling-integration-people.md` (§4 inserts incl. #4 self-contradiction `:75`, REQ-P-001..007) + `docs/specs/10_design/ADR-007-grilling-integration.md` (fold-in, no new boundary)
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` (chain contract + gate math: any ❌ → not OPEN)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **People owner (santana) at gate:** COND-K4 ruling (T-009/CE-001 keep vs reword + CE-005 paraphrase blessing) + E-020 co-sign (REQ-P-004) + RK-002 masking co-ownership confirm.
2. **Engineering owner (vasquez) at gate:** COND-K1/K2/K3 mechanics (every-not-sample, substance backstop/demo, E-020 relabel) + RK-008 budget caps co-sign (shared with COND-R1/COND-S2).
3. **Security owner (barrera) at gate:** RK-003/RK-004/RK-005 watch (thin-waiver, cherry-pick, hollow-link) + C-1..C-6/D-1..D-7 clearance carry + RK-013 template triage-line disposition.
4. **Orchestrator (montilla):** COND-K5 synthesis enforcement (no ownerless residual) + RK-009 single-source ruling (archive read-only) + RK-012 LICENSE stays with orchestrator + TTL re-confirm at synthesis.
