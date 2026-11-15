# ARCHIVE-RECORD — Release Evidence Index

One `ARCHIVE-RECORD.md` per archived spec, at `docs/frame-ship/archive/<spec-id>/ARCHIVE-RECORD.md`. Written in `ship-release` step 6.3, BEFORE the `.frame-ship/` purge (step 6.4) — it is the index that makes the purge safe: it says what was promoted (survives) and what was purged (gone, but accounted for).

**Singleton:** create-if-missing else update-in-place, never suffix — one record per `<spec-id>` dir.

## Template

```markdown
# ARCHIVE-RECORD: <spec-id>

**Spec:** docs/frame-ship/archive/<spec-id>/<spec-file>.md
**Date:** YYYY-MM-DD
**Gate verdict:** OPEN | CONDITIONAL | CLOSED+waiver
**Commit(s):** <release commit sha(s)>
**Tag:** vX.Y.Z
**Ship type:** deploy | filing | launch | close | rollout | policy-enable

## Promoted (survive in docs/frame-ship/archive/<spec-id>/)

- [x] <spec-file>.md          — moved via git mv (R rename)
- [x] GATE_REPORT.md          — from .frame-ship/quality-gate/<spec-id>/
- [x] HANDOFF.md              — from .frame-ship/<domain>/
- [ ] ARCHITECTURE_REVIEW.md  — from .frame-ship/<domain>/ (when present)
- [ ] SECURITY_REVIEW.md      — from .frame-ship/<domain>/ (when present)
- [ ] ADR-###-<slug>.md       — link if this spec created/amended one (docs/frame-ship/adr/, not copied)

## Purged (allowlist only, this <spec-id>)

- .frame-ship/<domain>/PROPOSED_CHANGES.md
- .frame-ship/<domain>/SECURITY_REVIEW.md (if present; promoted first)
- .frame-ship/<domain>/ARCHITECTURE_REVIEW.md (if present; promoted first)
- .frame-ship/<domain>/IMPLEMENTATION_PLAN.md
- .frame-ship/<domain>/TEST_MATRIX.md
- .frame-ship/<domain>/HANDOFF.md
- .frame-ship/quality-gate/<spec-id>/   (all <review-lens>.md; GATE_REPORT.md promoted first)

## Rollback plan

<revert + retract/void/reverse/disable with owner — from RELEASE_NOTES.md>

## Notes

- Other SPEC lanes active during this archive: <none | list> — purge aborted if any.
- Residual risk / open conditions: <none | COND-00x with owner + expiry>
```

## Rules

- Promote BEFORE purge: if `GATE_REPORT.md` or `HANDOFF.md` is not in `docs/frame-ship/archive/<spec-id>/`, the purge must not run.
- The purged list must exactly equal the allowlist in `ship-release` SKILL step 6.4 — any extra path in the purge is a violation.
- No PII/secrets/tokens in the record (Ley 172-13): owners by role, evidence by path.
