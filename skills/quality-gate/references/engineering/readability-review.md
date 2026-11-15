# Readability Review: SPEC-XXX

**Review Lens:** Readability (engineering)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Naming is intention-revealing (no `data`, `tmp`, `x`)
- [ ] Functions have single responsibility
- [ ] Nesting depth <= 3
- [ ] Comments explain WHY, not WHAT
- [ ] Public APIs documented
- [ ] No dead code or commented-out blocks
- [ ] Consistent style with surrounding code

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RD-001 | Low | `src/foo.ts:42` | Variable `d` unclear |

## Verdict Rationale

[Why this verdict]
