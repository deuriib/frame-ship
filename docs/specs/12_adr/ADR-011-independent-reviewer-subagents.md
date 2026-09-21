# ADR-011: Strict Independence of Quality Gate Reviewers (1 Subagent per Reviewer)

**Date:** 2026-09-21  
**Deciders:** Vasquez (Engineering Owner), Santana (People Owner), Barrera (Security Owner), Montilla (Orchestrator)  
**Status:** accepted  

## Context

During execution of the Frame→Ship `quality-gate` stage, multiple distinct quality dimensions must be evaluated (readability, reliability, resilience, blast-radius risk, adversarial refutation, quality-assurance test verification, and 7 domain-specific gates).

A potential anti-pattern arises when an orchestrator or harness bundles multiple review roles into a single subagent invocation (e.g., instructing a single agent to evaluate readability, security, refutation, and test verification concurrently). This creates critical hazards:
1. **Cognitive Overload & Surface Skimming:** Bundled agents inevitably gloss over subtle edge cases, compromising the adversarial posture of `review-refuter` and the precision of `quality-assurance`.
2. **Loss of Separation of Concerns:** Reviewers possess fundamentally distinct mandates (e.g., `review-refuter` actively attacks assumptions; `quality-assurance` executes deterministic test suites; `review-reliability` scrutinizes state mutability). Combining them dilutes accountability.
3. **Auditability Failure:** When a single agent emits verdicts across multiple dimensions, it obfuscates which specific lens uncovered an issue and weakens gate traceability in `GATE_REPORT.md`.

## Decision

Enforce strict independence across all Quality Gate reviewers:
1. **1 Subagent per Reviewer:** The Orchestrator must dispatch exactly one dedicated subagent per required reviewer role (`1 subagent per reviewer`).
2. **Prohibition of Bundled Reviews:** No single agent may perform the work of multiple reviewers or combine reviewer audits into a unified session.
3. **Isolated Deliverables:** Each reviewer subagent must inspect the repository independently and generate its own separate review record under `docs/specs/40_workspace/quality-gate/<spec-id>/<reviewer>.md` before verdicts are synthesized into `GATE_REPORT.md`.
4. **Sequential Degradation Parity:** When running in single-thread or non-task harnesses, sequential degradation must execute each reviewer as an independent, isolated lane in sequence rather than collapsing them into a monolithic review.

## Invariants Formalized

- **INV-013 (Independent Reviewer Subagents):** Within `quality-gate`, reviewers are strictly independent from each other. The Orchestrator must dispatch exactly one dedicated subagent per reviewer role (`1 subagent per reviewer`). No single agent may perform the work of multiple reviewers or combine reviewer assessments into a bundled review session.

## Consequences

### Positive
- **Uncompromised Review Rigor:** Each quality dimension receives full, focused cognitive depth from a dedicated agent persona.
- **True Adversarial Separation:** `review-refuter` operates in genuine isolation, ensuring unbiased falsification attacks prior to `quality-assurance`.
- **Clean Audit Trail:** Clear, unambiguous line-by-line attribution of all findings in `GATE_REPORT.md`.

### Negative / Trade-offs
- Higher subagent invocation volume at `quality-gate` (up to 7 engineering wave reviewers + touched domain auditors). Mitigated by parallel dispatch and reference-only packet envelopes.
