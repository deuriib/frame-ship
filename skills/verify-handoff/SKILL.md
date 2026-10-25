---
name: verify-handoff
description: Use when a specialist declares work complete and it needs review before shipping.
---

# Verify Handoff — Definition of Done Verification

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Run the full DoD checklist against spec + test matrix + open gate report, then produce `HANDOFF.md` routing to the next agent. **No gate OPEN, no handoff.**

## Chain Contract

- **Previous:** `frame-ship:quality-gate` (must be OPEN)
- **Next:** `frame-ship:ship-release` (on complete) or `frame-ship:execute-spec` (on findings)

## Role Binding

Bound to the **owning domain owner gate** (engineering / security / domain owner) with orchestrator synthesizing cross-domain handoffs.

## Process

0. **Pre-flight load — HARD STOP.** `skill(verify-handoff)` loaded? Owning domain owner template read? `SPEC/HARD/GATE/DOMAINS` packet + `GATE_REPORT.md` in hand? Any NO → STOP. Single = direct verify; multi = orchestrator dispatches ordered to read skill. **No OPEN gate = no handoff** (waiver only domain owners + orchestrator).
1. Read spec + test/evidence matrix + `GATE_REPORT.md` with `SPEC/HARD/GATE/DOMAINS` packet intact.
2. **Run DoD** via `references/dod-checklist.md`—Common section for all, Domain appendix only for touched domains.
3. **Produce `docs/specs/40_workspace/<domain>/HANDOFF.md`** via `references/handoff-template.md` (deliverables may be files, documents, filings, campaigns, closes, workflows—with evidence links). **Singleton:** create-if-missing else update-in-place, never suffixed.
4. **All gates pass** → hand off to `ship-release`.
5. **Gates fail** → return to `execute-spec` with specific findings.
6. **Close with a commit.** Example: `docs(handoff-003): verify DoD and route SPEC-003 to ship`.

### C4 — REQ→Evidence-Link Presence Check (surgical, security-owned)

- Mechanics: `../using-frame-ship/references/challenge-round.md` §1–§2. Trigger/budget (C4 row): every REQ must link evidence (test/scan/log/review-link)—link present AND resolves AND relevant; missing/dead/irrelevant = FAIL with recorded reviewer-judgment reason; attestation-alone = FAIL. No handoff on FAIL.
- Every C4 FAIL lists `residual-risk + owner`. Re-litigating settled gate verdicts banned—findings return to `execute-spec`. Packets preserved; Retry N=2 → escalate orchestrator.
- **Evidence safety:** PII checkpoint per `challenge-round.md` §3 (zero PII/secrets/tokens in handoff text/exports; allowlisted evidence only; Ley 172-13). Proof-or-refuted + no-freelance-fix apply. Tone (people owner verifies at gate): warm and direct—one item at a time, `exit/salir`/pause anytime, no penalty, masking rides every export. Exit = pause + `grill: exited` + escalate; proposal stays unapproved on pre-decision exit, no silent promote.

## What I Won't Do

- Approve without the full DoD checklist.
- Skip security verification for security-relevant specs.
- Allow shipping without doc updates.

## Red Flags

| Thought | Reality |
|---|---|
| "Gate is basically OPEN" | OPEN or waived (CONDITIONAL/CLOSED with record) only. No handoff otherwise. |
| "Attestation counts as evidence" | Attestation-alone = FAIL. Link must be present, resolve, and be relevant. |
| "Findings can be fixed during ship" | Findings return to `execute-spec`. Ship does not fix. |
| "Re-litigate the gate to save a cycle" | Settled gate verdicts are not re-litigated in C4. Findings → `execute-spec`. |
| "DoD can be run from memory" | Common section for all, Domain appendix for touched domains. No memory runs. |

## References

- `references/handoff-template.md` — Deliverables + DoD + next agent.
- `references/dod-checklist.md` — Functional/quality/security/docs gates.