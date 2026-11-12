# Routing — Entry Point & Scope Selection

The chain is fixed and linear; this table only chooses **where to enter** and **how much to run**. It borrows the NEXUS "Applicability" pattern without replacing the chain.

## Entry Point by Request Type

| Request type | Enter at | Mode | Note |
|--------------|----------|------|------|
| One-line request, "done" is disputed | `research` → `frame-intent` | Sprint | Evidence before spec |
| New initiative / OKRs | `frame-intent` | Full | Brief + OKRs |
| Scoped fix on an existing spec | `propose-changes` | Micro | Proposal before code |
| Auth / data / external API | `propose-changes` → `review-security` | Sprint | STRIDE mandatory |
| Public API / data model / cross-cutting | `propose-changes` → `review-architecture` | Sprint | ADR mandatory |
| Greenfield (no repo / CI / tests) | `frame-intent` → … → `execute-spec` (scaffold first) | Full | `scaffold-checklist.md` |
| Production incident / active breach | incident runbook (out-of-chain) | — | Contain first, plan after |
| Trivial reversible (<15 lines) | CEO fast-path (checkpoint only) | — | Outside the chain |

## Domains Touched → Reviewer Wave

A change that touches a domain routes that domain's reviewer into `quality-gate`. Domains: engineering, security, finance, legal, marketing/brand, people, revenue, automation/ops + the `review-data` lens for any schema/PII-store impact.

## Mode Sizing

| Mode | Roster depth | Artifact set |
|------|--------------|--------------|
| **Micro** | Single deliverable | `PROPOSED_CHANGES` + gate |
| **Sprint** | Feature | Full chain, one lane |
| **Full** | Multi-domain / greenfield | Full chain, parallel lanes ≤2 |
