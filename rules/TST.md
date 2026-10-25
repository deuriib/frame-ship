---
description: "Hard Testing rules"
---

## Testing Rules

- **TST-01** Test with change. Every behavior or fix ships with new/updated tests. Docs-only exempt. Missing test = `REQUEST_CHANGES`.
- **TST-02** `tests/unit/<name>.test.ts` ·
  `tests/integration/<name>.integration.test.ts` · `tests/e2e/<flow>.e2e.test.ts` ·
  `tests/contract/<boundary>-contract.test.ts` ·
  `tests/architecture/fitness.test.ts` ·
  `tests/security/<threat>.security.test.ts` ·
  `tests/performance/<scenario>.bench.ts`. Shared helpers in
  `tests/fixtures/` + `tests/helpers/` only. Non-code evidence →
  `docs/evidence/`.
- **TST-03** Coverage floors: line ≥80% / branch ≥75% / function ≥85%. Critical paths (auth, data, finance, PII) ≥95% / ≥90% / ≥95%. P0 acceptance 100% automated trace.
- **TST-04** Count-only assertions fail. Verify invariants, transitions, side-effects.
- **TST-05** Unit suite <30s. Zero flaky tolerance: quarantine + root-cause, never hide.
- **TST-06** Layer by risk: unit + integration + e2e + regression + acceptance/BDD; add contract, security/STRIDE, architecture fitness, perf, mutation/property, resilience/chaos, smoke/synthetic as the boundary demands.
- **TST-07** Blocking verify, no silent pass. No step completes on red or unrun suite. Skipped/flaky tests are named with owner + reason.