# Review-Refuter Re-verification: grilling-integration

**Reviewer:** review-refuter (adversarial)  
**Date:** 2026-09-18  
**Verdict:** CONDITIONAL (29/31 CLEARED, 1 PARTIAL, 1 PENDING)  
**Skill:** `frame-ship:quality-gate` via skill tool  
**Commits:** 9388822 (final) + 1428dc4 (summary) + e45242b (report) + 5cd163f (re-verification in review-refuter.md)

## Per-Condition CLEARED/NOT-CLEARED

| Condition | Verdict | Evidence |
|-----------|---------|----------|
| CE-001 (banned-lexicon 5 hits) | **PARTIALLY_CLEARED** | 5 inherited hits remain; people-reviewer RULING 1: keep-per-fidelity with recorded expiring waiver |
| CE-002 (T-007 overclaims) | **CLEARED** | `TEST_MATRIX.md:19` corrected to "3/4 refs" |
| CE-003 (hard cap declarative) | **CLEARED** | `frame-intent/SKILL.md:60` qualified as "declared prompt text, enforced by agent discipline + gate review" |
| CE-004 (E-020 premature pass) | **CLEARED** | `TEST_MATRIX.md:37` relabeled "conditional (impl done, co-sign pending at gate)" |
| CE-005 (SPEC self-contradiction) | **CLEARED** | `SPEC-grilling-integration-people.md:75` amended to intent-match paraphrase |
| COND-R1 (C2 cap ≤3 + pass-definition + N+1 demo) | **CLEARED** | `propose-changes/SKILL.md:40-41` + `SAMPLE-grilling-C2.md` N+1 section |
| COND-R2 (Retry N=2 + exit-terminal) | **CLEARED** | `frame-intent/SKILL.md:68` + `propose-changes/SKILL.md:43-44` |
| COND-R3 (trigger synonym table + scan rule) | **CLEARED** | `propose-changes/SKILL.md:39` + evasion demo |
| COND-R4 (every-not-sample + multi-waiver demo) | **CLEARED** | `quality-gate/SKILL.md:78` + `SAMPLE-grilling-C3-thin-FAIL.md` |
| COND-R5 (people-owner ruling on `interrogat*`) | **CLEARED** | People-reviewer RULING 1: keep-per-fidelity with recorded waiver |
| COND-D1 (glossary + tone ruling) | **CLEARED** | `frame-intent/SKILL.md:54` glossary + RULING 2 |
| COND-D2 (every-not-sample fix) | **CLEARED** | Same as COND-R4 |
| COND-D3 (break up C1/C2/C3 blocks) | **CLEARED** | One bullet per rule in all three sections |
| COND-D4 (bind variables) | **PARTIALLY_CLEARED** | C2 cap + pass-definition + exit/salir alias CLEARED; **"surgical" undefined** at `quality-gate/SKILL.md:66` |
| COND-D5 (single-source + honest counts) | **CLEARED** | Single-source §4 + E-020 relabeled conditional |
| COND-S1 (stall breaker) | **CLEARED** | Same as COND-R2 |
| COND-S2 (backpressure) | **CLEARED** | Same as COND-R1 |
| COND-S3 (degraded-mode honesty) | **CLEARED** | Same as COND-R4 |
| COND-S4 (recovery pointer) | **CLEARED** | `security/PROPOSED_CHANGES.md:3` canonical path corrected |
| COND-K1 (gate substance) | **CLEARED** | Every-not-sample + substance backstop demo |
| COND-K2 (evidence substance) | **CLEARED** | Dead-link FAIL demo + `dod-checklist.md:10` updated |
| COND-K3 (count honesty) | **CLEARED** | E-020 relabeled conditional |
| COND-K4 (tone ruling) | **CLEARED** | People-reviewer RULING 1 + RULING 2 |
| COND-K5 (residual preservation) | **NOT_YET_VERIFIED** | Pending gate report synthesis |
| COND-Q1 (T-007 corrected) | **CLEARED** | T-007 corrected to "3/4 refs" |
| COND-Q2 (E-020 relabeled) | **CLEARED** | Same as COND-K3 |
| COND-Q3 (C2 cap + synonym/scan + every-not-sample + exit-terminal) | **CLEARED** | All sub-conditions CLEARED |
| COND-Q4 (thin-waiver + dead-link FAIL demos) | **CLEARED** | Both demos exist |
| COND-P1 (recorded expiring waiver) | **CLEARED** | Waiver recorded in RULING 1 with expiry = waiver TTL |
| COND-P2 (SPEC insert #4 amended) | **CLEARED** | SPEC amended at `SPEC-grilling-integration-people.md:75` |
| COND-P3 (numeric C2 cap + pass-definition + N+1 demo) | **CLEARED** | Same as COND-R1 |
| COND-P4 (E-020 relabeled conditional) | **CLEARED** | Same as COND-K3 |
| COND-P5 (exit-terminal rule + exit/salir alias) | **CLEARED** | Exit-terminal in 3 refs + exit/salir alias in 2 openers |
| COND-SEC1 (substance backstop) | **CLEARED** | Same as COND-K1 |
| COND-SEC2 (every-not-sample C3 scope) | **CLEARED** | Same as COND-R4 |

## E-004/E-010 "verbatim-in-intent" Staleness Ruling

**PARTIALLY_CLEARED** — "verbatim-in-intent" qualified as "intent-match paraphrase (T-010)" per people-reviewer RULING 2 + SPEC amendment. Matrix labels accurate for their specific claims.

## Outstanding Conditions (2)

1. **COND-D4 residual:** "surgical" undefined at `skills/quality-gate/SKILL.md:66` + `gate-report.md:32` — needs define-or-delete.
2. **COND-K5:** Gate report synthesis must carry every residual with owner — synthesis-dependent.

## Risks

- **RR-R1 (people owner):** COND-P1 waiver recorded but not yet in gate report synthesis — must appear before ship.
- **RR-R2 (engineering owner):** "surgical" undefined — readers must import meaning from matrices.
- **RR-R3 (barrera):** thin-but-polite waiver passes C3 by box-ticking — substance backstop demo exists but live reviewer judgment still the only backstop.

## Verdict

**CONDITIONAL** — Gate stays CONDITIONAL until:
1. "surgical" defined or deleted (COND-D4 residual)
2. Gate report synthesis carries every residual with owner (COND-K5)

No handoff until conditions clear (waiver only by domain owners + orchestrator).

## Commits

```
9388822 docs(gate-grilling): review-refuter re-verification final summary
1428dc4 docs(gate-grilling): review-refuter re-verification summary
e45242b docs(gate-grilling): review-refuter re-verification summary report
5cd163f docs(gate-grilling): review-refuter re-verification — 29/31 conditions CLEARED, 1 PARTIAL, 1 PENDING
```
