# Release Notes: Grilling-Style Challenge Plug-in (C1–C4)

**Date:** 2026-09-18
**Release Manager:** orchestrator
**Specs Included:** SPEC-grilling-integration-engineering, SPEC-grilling-integration-security, SPEC-grilling-integration-people
**Domains-Touched:** [engineering, security, people]
**Ship Type:** policy-enable (skill-text behavior change, no deploy)

## Highlights

- **C1 — frame-intent challenger:** classification-scaled opt-in challenge (spike 1 / bounded cap 3 / architectural cap 5) with one-way ratchet, falsifiable-bet prompt, and exit hatch. Turns pleasing framings into falsifiable bets before BRIEF locks.
- **C2 — propose-changes pre-approval grill:** trigger-based (auth/data/API/PII, multi-domain, customer/regulator/revenue blast radius, or approver request) with one-pass budget (≤3 questions) and terminal approve/reject. Last cheap stop before code.
- **C3 — quality-gate refuter amplification + waiver interrogation:** every CONDITIONAL/waiver gets a row against the three-block bar (Accepted-risk + Compensating-controls+owner + Expiry+owner). Thin-waiver FAIL demo + substance backstop. Full re-review banned; CLOSED stays CLOSED.
- **C4 — verify-handoff evidence-link check:** REQ→evidence presence check; attestation-alone = FAIL; missing = FAIL; re-litigation banned → return to execute-spec.

## Changes

### Features

- C1 challenger in `frame-intent` skill-text (engineering, REQ-001)
- C2 trigger + one-pass in `propose-changes` skill-text + refs (engineering, REQ-002)
- C3 waiver bar + every-not-sample + substance backstop in `quality-gate` skill-text + refs (security, REQ-SEC-001..003)
- C4 evidence-link + exit-terminal in `verify-handoff` skill-text + refs (security, REQ-SEC-005)
- People guardrails: opt-in, exit/salir alias, warmth, masking, budget co-sign (people, REQ-P-001..007)
- ADR-007 fold-in decision recorded

### Fixes

- T-007 corrected to 3/4 triage refs (CE-002)
- E-020 relabeled conditional (COND-P4)
- SPEC insert #4 amended to intent-match paraphrase T-010 (COND-P2)
- Canonical SPEC pointer fixed (COND-S4)
- "Surgical" scope defined inline (COND-D4)

### Domain Ships

- Engineering: skill-text C1+C2 + refs + samples + TEST_MATRIX (20/21 + 1 conditional)
- Security: skill-text C3+C4 + refs + TEST_MATRIX (15/16 + 1 routed-fail) + FAIL demos (T-011, T-012)
- People: SPEC guardrails + co-signs (budget C1, masking, exit-terminal, paraphrase blessing)

### Breaking Changes

- None (additive-only skill-text changes; routing table untouched; no new deps/stages/reviewers)

## Known Issues

- 5 inherited `interrogat*` hits in quality-gate SKILL under expiring 90d waiver (T-009, owner: santana, reword queued) — no user impact, internal wording only
- QA-008: banned-lexicon/secret-shape greps are manual `rg` — no CI hook yet (Low, owner: engineering)

## Rollback / Undo

- **Code revert:** `git revert` the fix-loop commits (8d673b1, 8ab7271, 1a16100, 7690f57, c5cde40, d807d5a, af00b4a, 17f02a9, 81b18ef, cb988d6, 91ac798, d4364ab) — reverts all skill-text changes, restores prior state. ETA: < 15 min.
- **Non-code undo:** Remove C1–C4 sections from skill-texts; delete samples; restore prior TEST_MATRIX rows. No external comms/filings/launches to retract.
- **Owner:** engineering owner (vasquez)
