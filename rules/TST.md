---
trigger: model_decision
description: "Apply this guidelines for Testing rules"
globs:
---

## Testing Rules

- **TST-01** Test with change. Every behavior or fix ships with new/updated tests. Docs-only exempt. Missing test = `REQUEST_CHANGES`.
- **TST-02** `tests/unit/<name>.test.<language>` ·
  `tests/integration/<name>.integration.test.<language>` · `tests/e2e/<flow>.e2e.test.<language>` ·
  `tests/contract/<boundary>-contract.test.<language>` ·
  `tests/architecture/fitness.test.<language>` ·
  `tests/security/<threat>.security.test.<language>` ·
  `tests/performance/<scenario>.bench.<language>`. Shared helpers in
  `tests/fixtures/` + `tests/helpers/` only. Non-code evidence →
  `docs/evidence/`.
- **TST-03** Coverage floors: line ≥80% / branch ≥75% / function ≥85%. Critical paths (auth, data, finance, PII) ≥95% / ≥90% / ≥95%. P0 acceptance 100% automated trace.
- **TST-04** Count-only assertions fail. Verify invariants, transitions, side-effects.
- **TST-05** Unit suite <30s. Zero flaky tolerance: quarantine + root-cause, never hide.
- **TST-06** Layer by risk: unit + integration + e2e + regression + acceptance/BDD; add contract, security/STRIDE, architecture fitness, perf, mutation/property, resilience/chaos, smoke/synthetic as the boundary demands.
- **TST-07** Blocking verify, no silent pass. No step completes on red or unrun suite. Skipped/flaky tests are named with owner + reason.
