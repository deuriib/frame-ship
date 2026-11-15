# Data Review: SPEC-XXX

**Review Lens:** Data (`data`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Schema changes are backward-compatible (expand-and-contract pattern)
- [ ] Database migrations execute without locking tables or dropping columns prematurely
- [ ] Rollback and down-migration scripts tested and verified
- [ ] Indexes placed appropriately on foreign keys and high-cardinality filter fields
- [ ] Data minimization strictly applied (no unnecessary PII stored)
- [ ] Encryption at rest and in transit enforced for all sensitive fields
- [ ] Data retention, purge, and archive policies respected
- [ ] Data lineage and ETL/ELT pipeline dependencies documented

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| DAT-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
