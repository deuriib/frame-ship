# ADR-008: Multi-subagents as the single natural process

**ID:** ADR-008-multi-default
**Status:** proposed
**Date:** 2026-09-20
**Deciders:** vasquez (engineering owner), santana (people owner, wording), barrera (security, wording review); CEO waiver authority montilla
**Spec:** `docs/specs/20_backlog/SPEC-multi-default-engineering.md` (REQ-007)
**Brief:** `docs/briefs/BRIEF-multi-default.md` (approved 2026-09-20; open question #1 resolved here as new slug — ADR-001..007 taken)

## Context

The chain maintained a `single | multi-subagents` dual-track across skills, `skills/AGENTS.md`, and templates. With harnesses that dispatch in parallel at no cost, the `single` branch is conceptual residue: two mental models, two gates, bifurcated packets. BRIEF-multi-default (framing 2, remoción total) directs deleting the `single` methodological branch everywhere in-chain; trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.

## Decision

Remoción total — delete the `single` methodological branch everywhere in-chain; `multi-subagents` without surname:

- Uniform contract (W-MULTI, verbatim from santana people lane `docs/specs/40_workspace/people/SPEC-multi-default-people.md` §4, drift → santana wins): "Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."
- Sequential degradation, same contract (W-SEQ, verbatim same source): "Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade."
- Full-wave único: `quality-gate` runs the full routing-table wave + adversarial `review-refuter` before `qa`; min-gate path removed.
- Fast-path boundary: trivial <15-line reversible work is CEO fast-path (checkpoint-only), outside methodology — never a chain branch, never designed here (CEO prerogative).
- Mechanics scope: SKILL §3 rewrites (`translate-to-spec`, `execute-spec`, `quality-gate`), 4 engineering-owned template mode lines (`spec-template`, `proposal-template`, `gate-report`, `dod-checklist`), `git-worktree` norm, `skills/AGENTS.md` frozen-mode line. People-lane surfaces owned by santana; runtime untouched.

## Consequences

One mental model, one gate; harnesses without `task` degrade sequentially same-thread same-contract; history intact (`50_archive/`, old ADRs, past BRIEFs untouched); rollback per-commit `git revert` (one commit per REQ group, ETA < 15 min, owner vasquez); gate re-verifies grep-0 mode-branch + W-MULTI/W-SEQ diff-0 cross-lane.

## Shape precedent

ADR-007 (fold-in, no new stage/dir/reviewer) — this ADR likewise adds no stage, directory, reviewer, or dependency.

## Links

- `docs/specs/10_design/ARCHITECTURE.md` (unchanged — docs-only initiative adds no component; this ADR links here)
- `docs/specs/10_design/API_CONTRACTS.md` (untouched)
