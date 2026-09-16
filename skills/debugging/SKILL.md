---
name: debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. Triggered by defect investigation pre-proposal and pre-execute.
---

# Debugging — Systematic Root Cause Before Fixes

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Enforce root-cause-first debugging so no fix is proposed or implemented from symptoms. Produce evidence + single hypothesis, then hand off through the chain.

## 2. Chain Contract

- Previous: bug report / failed test / `execute-spec` failure (entry); calls back into `frame-ship:propose-changes` for the fix.
- Next: frame-ship:propose-changes (fix proposal), then review / execute / gate as required.

## 2b. Role Binding (Org)

- **Bound to:** engineering owner + executing specialist diagnosing the defect; automation owner for boundary-evidence/runbook lens; security owner for example/log hygiene.
- Never self-approves the resulting fix; never edits impl files from this skill.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(debugging)` loaded? `SPEC/HARD/GATE/DOMAINS` packet ready? Any NO → STOP. Iron Law applies from here.
1. Phase 1 — Root cause (MUST complete before any fix talk): read errors fully; reproduce consistently with exact steps; check recent diffs/commits/config; at each component boundary log masked entry/exit + config presence (placeholders only, no secrets); trace bad value backward to source. No hypothesis yet.
2. Phase 2 — Pattern: find working example in same codebase; read reference completely; list every difference; map dependencies/config/assumptions.
3. Phase 3 — Hypothesis: state one theory ("X is root cause because Y"); test with smallest single-variable change; verify or form NEW hypothesis (never stack fixes). Say "I don't understand X" when stuck; research or escalate.
4. Phase 4 — Implementation handoff: create failing reproduction first; hand single root-cause fix to `propose-changes` (never edit code here). Count fixes: <3 → return to Phase 1 with new info; ≥3 → STOP, question architecture with human/orchestrator before any Fix #4.
5. Red flags — STOP and return to Phase 1 on: "quick fix now", "try X and see", bundled changes, skipped test, "probably X", partial-pattern adaptation, solutions before data-flow trace, "one more fix" after 2 failures, each fix surfacing new-area symptoms.
6. Packets: carry `SPEC/HARD/GATE/DOMAINS` by reference; trace `REQ-ID → reproduction → PROPOSED_CHANGES → gate verdict`. Evidence allowlisted + masked per guardrails 1-8.

## 4. What I won't do

- Propose or apply fixes without Phase-1 evidence (Iron Law).
- Bundle refactors with the fix or stack hypotheses.
- Attempt Fix #4 without architecture review + human sign-off.
- Paste secrets/PII into logs, examples, or evidence.

## 5. References

- `references/root-cause-tracing.md` — Backward trace technique.
- `references/defense-in-depth.md` — Layered validation after root cause.
- `references/condition-based-waiting.md` — Condition polling over arbitrary sleeps.
