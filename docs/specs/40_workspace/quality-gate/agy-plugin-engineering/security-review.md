# Review: security — SPEC-agy-plugin-engineering

**Reviewer:** security-reviewer (barrera lens, single mode direct)
**Date:** 2026-09-17
**Verdict:** conditional (1 condition → COND-001, waiver recorded)
**Findings:** 1 (C-001 environment-bound, rest cleared)

## Checked

- S-002 cleared: word-boundary regexes + chaining detection; allow/deny fixtures replay green (T-004a/b).
- S-003 cleared: secret-deny reason is rule-only (value absent from output, T-004c); scan shows 0 credential values (T-007a).
- S-004 cleared: empty stdin → fast `ask` (gates) / `{}` (observer/injector), exit 0.
- S-005 cleared: injector output contains marker + skill body only; `workspacePaths` value absent from output (C-006/E-006).
- No `permissionOverrides`, no `*` matchers, no freelance-fix instructions, no full-dump exports.

## Condition

- COND-001 (= C-001): staged-path verify (`agy plugin list` + `/hooks` showing `frame-ship`) on an agy host. No `agy` binary in this env — outstanding by environment. Severity Med, reversible (< 10 min rollback), fallback documented → waiver eligible.
