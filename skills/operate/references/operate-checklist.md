# Operate Checklist — Post-Ship Verification

Every row below is **openable by a second person** — a timestamp, telemetry link, or alert log, not an attestation.

## Deploy Verification

- [ ] Canary / blue-green observed (or explicit N/A with reason for one-shot work)
- [ ] Rollback rehearsed: revert + retract/void/reverse/disable exercised, timestamp recorded
- [ ] Change event emitted: version + commit + actor + timestamp (`AUT-13`)
- [ ] Alerts routed to on-call with a runbook (`AUT-14`)

## SLO / Error Budget

- [ ] Error rate, latency, saturation within budget (telemetry link)
- [ ] Breach → recorded rollback triggered, not a manual patch (`AUT-08`)
- [ ] No cron without owner + monitoring + failure alerting (`AUT-17`)

## Feedback Loop

- [ ] Defects → `propose-changes` (reproduce → failing test → propose fix)
- [ ] Incidents → incident runbook (not a silent hotfix)
- [ ] Product feedback → `research` / `frame-intent`

## Finding → Owner Register

| Finding | Severity | Owner | Route |
|---------|----------|-------|-------|
| [ ] | [ ] | [ ] | [ ] |
