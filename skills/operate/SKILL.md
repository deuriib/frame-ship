---
name: operate
description: Use after ship-release to verify post-ship behavior and feed findings back into the chain.
---

# Operate — Post-Ship Verification & Feedback

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Close the loop that `ship-release` opens. Verify the release in the state that matters (production), and feed findings back into discovery so the next cycle starts from evidence, not recollection. Non-blocking for one-shot work; mandatory for anything with a running system.

## Chain Contract

- **Previous:** `frame-ship:ship-release`
- **Next:** `frame-ship:research` / `frame-ship:frame-intent` (feedback loop) | incident runbook on failure

## Role Binding

Bound to the **orchestrator** + operations/devops + owning domain owner. Emits `OPERATE_REPORT.md`, not new code.

## Process

0. **Pre-flight load** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(operate)` loaded? Post-ship window defined? SLO/error-budget targets named?
1. **Verify the deploy**: canary/blue-green observed, rollback rehearsed (timestamped), change event emitted (`AUT-13`), alerts routed to on-call with a runbook (`AUT-14`).
2. **Confirm SLO / error budget**: error rate, latency, saturation within budget; a breach triggers the recorded rollback, not a manual patch (`AUT-08`).
3. **Route findings**: defects → `frame-ship:propose-changes` (reproduce → failing test → propose fix); incidents → incident runbook; product feedback → `frame-ship:research`/`frame-intent`.
4. **Produce `OPERATE_REPORT.md`** via `references/operate-checklist.md` — post-ship evidence (rollback rehearsal timestamp, SLO telemetry, alert/runbook status) + a finding → owner register.
5. **Feed the loop**: close with a commit; findings land in the next discovery/brief.

## What I Won't Do

- Verify by attestation alone — every claim carries a timestamp or telemetry a second person can open.
- Fix production defects out-of-band (report severity + location + owner; the owner remediates through the chain).

## References

- `references/operate-checklist.md` — Post-ship verification rows (SLO, rollback rehearsal, on-call, incident trigger).
