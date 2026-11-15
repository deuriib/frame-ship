---
trigger: always_on
description: Use on every behavior change, bug fix, or refactor that alters
  observable behavior, to prove it with a test before calling the work done.
---

# Testing Discipline

A behavior no test proves is a claim, not a change. This applies to every
feature, fix, and refactor that alters observable behavior — including the one
you believe is trivial. The shape of the suite — layers, coverage, layout —
lives in `testing-strategy`.

## The gate

- **Test with the change, in the same commit.** Every behavior change or bug fix
  ships with a new or updated test that fails without it. Docs-only and
  formatting-only changes are the only exemption.
- **A missing test blocks the review.** A change with observable behavior and no
  test is `REQUEST_CHANGES`, not a follow-up ticket. "I'll add tests later" is a
  no.
- **A bug fix starts with the failing test.** Reproduce it first, watch it fail,
  then fix it. A fix without a regression test will regress.

## Honesty

- **No silent pass.** A step is not done while a suite is red or unrun. Never
  merge red and fix forward.
- **A skip is a debt with a name.** Every `skip`, `xfail`, `todo`, or disabled
  test carries an owner and a reason, and the skip is visible in the report. An
  anonymous skip is a lie.
- **Assert something that can fail.** A count-only assertion proves cardinality,
  not behaviour. Assert the value, the state transition, or the side effect — and
  assert that the test fails when you break the code.
- **Test the contract, not the internals.** Assert on observable results. A test
  coupled to private structure breaks on every refactor and catches nothing.
- **No real personal data in fixtures.** Synthetic or anonymized only. A
  production dump in a test database is a breach waiting for a laptop.
