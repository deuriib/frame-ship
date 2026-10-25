# Risk Review: SPEC-XXX

**Reviewer:** review-risk
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Blast radius analysis bounded and verified
- [ ] Backward compatibility preserved (no breaking API/schema shifts without ADR)
- [ ] Dependencies pinned; zero critical/high CVEs or supply-chain hazards
- [ ] Rollback determinism proven (revertible in production in ≤15 minutes)
- [ ] Architectural contract invariants intact (`ARCHITECTURE.md`)
- [ ] Zero unmitigated regression risk across touched systems

## Risk Assessment Matrix

| ID | Risk Dimension | Impact | Likelihood | Mitigation | Residual |
|----|----------------|--------|------------|------------|----------|
| RK-001 | [e.g. Migration drift] | Med | Low | [e.g. Expand/contract pattern] | Low |

## Verdict Rationale

[Why this verdict]
