# Review-Refuter Re-verification Report: grilling-integration

**Reviewer:** review-refuter (adversarial)  
**Date:** 2026-09-18  
**Verdict:** CONDITIONAL (29/31 CLEARED, 1 PARTIAL, 1 PENDING)  
**Skill:** `frame-ship:quality-gate` via skill tool  
**Commit:** 5cd163f (re-verification appended to `docs/specs/40_workspace/quality-gate/grilling-integration/review-refuter.md`)

## Summary

Re-verified 31 conditions (5 CEs + 26 shared conditions from COND-R/D/S/K/Q/SEC/P lists) against 12 fix commits. **29 conditions CLEARED**, **1 PARTIALLY_CLEARED** (COND-D4: "surgical" undefined), **1 NOT_YET_VERIFIED** (COND-K5: residual preservation, synthesis-dependent).

## Counterexample Re-verification (CE-001..CE-005)

| CE | Verdict | Key Evidence |
|----|---------|--------------|
| CE-001 | **PARTIALLY_CLEARED** | 5 inherited `interrogat*` hits remain; people-reviewer RULING 1: keep-per-fidelity with recorded expiring waiver. |
| CE-002 | **CLEARED** | T-007 corrected to "3/4 refs" in `TEST_MATRIX.md:19`. |
| CE-003 | **CLEARED** | "Hard cap" qualified as "declared prompt text, enforced by agent discipline + gate review" at `frame-intent/SKILL.md:60`. |
| CE-004 | **CLEARED** | E-020 relabeled "conditional (impl done, co-sign pending at gate)" at `TEST_MATRIX.md:37`. |
| CE-005 | **CLEARED** | SPEC insert #4 amended to intent-match paraphrase at `SPEC-grilling-integration-people.md:75`. |

## Shared Condition Re-verification (COND-R/D/S/K/Q/SEC/P)

| Condition | Verdict | Fix Commit(s) |
|-----------|---------|---------------|
| COND-R1 (C2 cap ≤3 + pass-definition + N+1 demo) | **CLEARED** | 8d673b1 |
| COND-R2 (Retry N=2 + exit-terminal) | **CLEARED** | 8ab7271 |
| COND-R3 (trigger synonym table + scan rule) | **CLEARED** | 1a16100 |
| COND-R4 (every-not-sample + multi-waiver demo) | **CLEARED** | af00b4a + 17f02a9 |
| COND-R5 (people-owner ruling on `interrogat*`) | **CLEARED** | d4364ab |
| COND-D1 (glossary + tone ruling) | **CLEARED** | 7690f57 |
| COND-D2 (every-not-sample fix) | **CLEARED** | af00b4a |
| COND-D3 (break up C1/C2/C3 blocks) | **CLEARED** | 7690f57 |
| COND-D4 (bind variables) | **PARTIALLY_CLEARED** | 8d673b1 + c5cde40 + 7690f57 — **"surgical" still undefined** |
| COND-D5 (single-source + honest counts) | **CLEARED** | 7690f57 + d807d5a |
| COND-S1 (stall breaker) | **CLEARED** | 8ab7271 |
| COND-S2 (backpressure) | **CLEARED** | 8d673b1 |
| COND-S3 (degraded-mode honesty) | **CLEARED** | af00b4a + 17f02a9 |
| COND-S4 (recovery pointer) | **CLEARED** | 91ac798 |
| COND-K1 (gate substance) | **CLEARED** | af00b4a + 17f02a9 |
| COND-K2 (evidence substance) | **CLEARED** | 17f02a9 |
| COND-K3 (count honesty) | **CLEARED** | d807d5a |
| COND-K4 (tone ruling) | **CLEARED** | d4364ab |
| COND-K5 (residual preservation) | **NOT_YET_VERIFIED** | Pending gate report synthesis |
| COND-Q1 (T-007 corrected) | **CLEARED** | 81b18ef |
| COND-Q2 (E-020 relabeled) | **CLEARED** | d807d5a |
| COND-Q3 (C2 cap + synonym/scan + every-not-sample + exit-terminal) | **CLEARED** | 8d673b1 + 1a16100 + af00b4a + 8ab7271 |
| COND-Q4 (thin-waiver + dead-link FAIL demos) | **CLEARED** | 17f02a9 |
| COND-P1 (recorded expiring waiver) | **CLEARED** | d4364ab |
| COND-P2 (SPEC insert #4 amended) | **CLEARED** | d4364ab |
| COND-P3 (numeric C2 cap + pass-definition + N+1 demo) | **CLEARED** | 8d673b1 |
| COND-P4 (E-020 relabeled conditional) | **CLEARED** | d807d5a |
| COND-P5 (exit-terminal rule + exit/salir alias) | **CLEARED** | cb988d6 + c5cde40 |
| COND-SEC1 (substance backstop) | **CLEARED** | 17f02a9 |
| COND-SEC2 (every-not-sample C3 scope) | **CLEARED** | af00b4a |

## E-004/E-010 "verbatim-in-intent" Staleness Ruling

**PARTIALLY_CLEARED** — "verbatim-in-intent" qualified as "intent-match paraphrase (T-010)" per people-reviewer RULING 2 + SPEC amendment. Matrix labels (E-001/E-002/E-004) are accurate for their specific claims (budgets/ratchet/contract ARE verbatim; warmth row specifies "intent-match paraphrase per T-010").

## Outstanding Conditions (2)

1. **COND-D4 residual:** "surgical" undefined at `skills/quality-gate/SKILL.md:66` + `gate-report.md:32` — needs define-or-delete.
2. **COND-K5:** Gate report synthesis must carry every residual with owner (RK table + RR-C12/RR-C34 carries) — synthesis-dependent.

## Risks

- **RR-R1 (people owner):** COND-P1 waiver recorded but not yet in gate report synthesis — must appear before ship.
- **RR-R2 (engineering owner):** "surgical" undefined — readers must import meaning from matrices.
- **RR-R3 (barrera):** thin-but-polite waiver passes C3 by box-ticking — substance backstop demo exists but live reviewer judgment still the only backstop.

## Verdict

**CONDITIONAL** — Gate stays CONDITIONAL until:
1. "surgical" defined or deleted (COND-D4 residual)
2. Gate report synthesis carries every residual with owner (COND-K5)

No handoff until conditions clear (waiver only by domain owners + orchestrator).

## Commit

```
5cd163f docs(gate-grilling): review-refuter re-verification — 29/31 conditions CLEARED, 1 PARTIAL, 1 PENDING
```
