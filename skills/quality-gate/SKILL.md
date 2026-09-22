---
name: quality-gate
description: Orchestrate domain reviewers and produce a consolidated Quality Gate Report. Use when implementation is ready for review, or when domain owners plus orchestrator must waive a gate. Triggered by "run quality gate" or "gate SPEC-XXX", after execute-spec completes.
---

# Quality-Gate — Domain Review Orchestrator

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

## 1. Purpose

Route a completed spec to the correct reviewers per touched domain, collect
verdicts into one gate report, and enforce "no handoff until all reviewers
sign". Reuses existing reviewers — creates none except the data dupla.

## 2. Chain Contract

- Previous: frame-ship:execute-spec | (optional branch PR) frame-ship:pull-request
- Next: frame-ship:verify-handoff (only on OPEN gate) | (on failure/bug) frame-ship:debugging → frame-ship:propose-changes

```text
frame-ship:execute-spec → frame-ship:quality-gate → frame-ship:verify-handoff → frame-ship:ship-release
                     ↑ (domain owners + orchestrator waive only, via waiver record)
```

## 2b. Role Binding (Org)

- **Bound to:** orchestrator dispatches all gate reviewers; owning domain owner acts as gate keeper (engineering owner for engineering, else
  the domain owner); orchestrator synthesizes multi-domain gates.
- Reviewers are domain specialists who understand their domain's review criteria and never approve their own work.
- **Reviewer Independence (1 Subagent per Reviewer):** Reviewers are strictly independent from each other. No single agent does the work of all or multiple reviewers. The orchestrator dispatches exactly one dedicated subagent per reviewer role (`1 subagent per reviewer`). Bundling reviewer roles into a single subagent is strictly prohibited.

## 3. Reviewer Routing Table

| Domain                    | Owner             | Reviewers                                                                                                            |
| ------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| engineering               | engineering owner | review-readability, review-reliability, review-refuter, review-resilience, review-risk, quality-assurance, review-data (data specs) |
| security                  | security owner    | security-reviewer                                                                                                    |
| finance                   | finance owner     | finance-reviewer                                                                                                     |
| legal                     | legal owner       | legal-reviewer                                                                                                       |
| brand/marketing           | marketing owner   | brand-reviewer                                                                                                       |
| people                    | people owner      | people-reviewer                                                                                                      |
| revenue                   | revenue owner     | revenue-reviewer                                                                                                     |
| automation/ops            | automation owner  | automation-reviewer (+ ops lens)                                                                                     |
| data (cross-cutting lens) | engineering owner | review-data + data-engineer lineage check                                                                            |

A spec spanning multiple domains needs ALL touched-domain reviewers to sign. `Domains-touched` comes from the spec packet; data lens attaches to any spec with schema/lineage/PII-store impact.

Execution mode (from spec `execution_mode`): `subagents` only — full wave per routing table below + adversarial `review-refuter` before `quality-assurance` (full-wave único, no min-gate). Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.

Each reviewer understands their domain's review criteria. The orchestrator dispatches reviewers who understand their domain's practices.

## 4. Process

0. Pre-flight LOAD — HARD STOP: `skill(quality-gate)` loaded? Owning domain owner identified? Each reviewer dispatched by orchestrator? Any NO → STOP.
1. Identify touched domains from spec `Domains-touched`/tags/requirements (must be subset of 8-domain catalogue in `../AGENTS.md`).
2. Dispatch each required reviewer via orchestrator as a separate, independent subagent (strictly 1 subagent per reviewer; reference-only `SPEC/HARD/GATE/DOMAINS` packet + explicit orders to understand domain role first). No single agent may perform the work of multiple reviewers or combine reviewer audits.
3. Each reviewer create-if-missing else update-in-place `docs/specs/40_workspace/quality-gate/<spec-id>/<reviewer>.md`.
4. Consolidate into `GATE_REPORT.md` via `references/gate-report.md` create-if-missing else update-in-place.
5. Any ❌ → gate CLOSED. Any ⚠️ → CONDITIONAL (conditions must clear).
6. All ✅ → gate OPEN → hand off to `frame-ship:verify-handoff` with `SPEC/HARD/GATE/DOMAINS` intact.
7. Waivers only by domain owners + orchestrator via `references/waiver-template.md`.
8. Close with a commit (never fails the gate). Example: `docs(gate-003): record OPEN verdict for SPEC-003 with 7 reviews`.

## 4b. C3 — CONDITIONAL/waiver interrogation lane (security-owned)

- Mechanics + human contract: `../using-frame-ship/references/challenge-round.md` §1–§2. Trigger/budget (C3 row): every CONDITIONAL/waiver, interrogated against the three-block bar in `references/waiver-template.md` only — per-block pass/fail recorded in the C3 row of `references/gate-report.md`; missing block = FAIL, no promotion.
- Surgical scope: C3 does NOT re-run the routing table, re-dispatch reviewers, or re-review the spec. Rows = CONDITIONALs — sample-of-one never satisfies. Every C3-interrogated CONDITIONAL lists `residual-risk + owner` (or explicit `none + owner`); silent APPROVE+conditions = FAIL. Expiry default: 90 days or next release, whichever first (orchestrator-confirmed, re-review owner mandatory). CLOSED stays CLOSED without recorded `domain-owners + orchestrator` sign-off.
- Evidence + safety: PII checkpoint per `challenge-round.md` §3 (zero PII/secrets/tokens in rounds/logs/exports; allowlisted evidence only; Ley 172-13). Proof-or-refuted (`diff/scan/log`) and no-freelance-fix rules apply. Exit = pause + `grill: exited` + escalate; uncleared waivers stay CONDITIONAL, no silent promote. No routing-table change.

## 5. What I won't do

- Open a gate with any ❌ verdict (only domain owners + orchestrator waive).
- Allow handoff with unverified conditions.
- Skip reviewers for a touched domain or override a verdict myself.
- Allow a single agent to conduct multiple reviewers' work (strictly 1 subagent per reviewer; no bundled reviews).

## 6. References

- `references/gate-report.md` — Consolidated verdicts + conditions.
- `references/waiver-template.md` — Domain owners + orchestrator override record.
- `references/engineering/` — readability, reliability, refuter, resilience, risk, quality-assurance checklists.
- `references/domains/` — finance, legal, marketing, people, security, data, revenue, automation checklists + ops lens.
