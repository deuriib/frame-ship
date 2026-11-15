# Operate Checklist — Post-Ship Verification

Every row below is **openable by a second person** — a timestamp, telemetry link, or alert log, not an attestation.

## Deploy Verification

- [ ] Canary / blue-green observed (or explicit N/A with reason for one-shot work)
- [ ] Rollback rehearsed: revert + retract/void/reverse/disable exercised, timestamp recorded
- [ ] Change event emitted: version + commit + actor + timestamp (`rules/devops.md`)
- [ ] Alerts routed to on-call with a runbook (`rules/reliability.md`)

## SLO / Error Budget

- [ ] Error rate, latency, saturation within budget (telemetry link)
- [ ] Breach → recorded rollback triggered, not a manual patch (`rules/devops.md`)
- [ ] No cron without owner + monitoring + failure alerting (`rules/devops.md`)

## Feedback Loop

- [ ] Defects → `propose-changes` (reproduce → failing test → propose fix)
- [ ] Incidents → incident runbook (not a silent hotfix)
- [ ] Product feedback → `research` / `frame-intent`

## Finding → Owner Register

| Finding | Severity | Owner | Route |
|---------|----------|-------|-------|
| [ ] | [ ] | [ ] | [ ] |
