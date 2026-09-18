# Architecture Review: Engineering Lane (Singleton Canonical)

**Owner:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18
**Scope:** consolidation index of prior lane architecture reviews; no new design (ADR waived — links truth, forks nothing)

## Verdict

No new architecture. This file is the singleton canonical for `ARCHITECTURE_REVIEW.md` in the engineering lane: it indexes the 6 prior suffixed reviews (archived) and records the standing pointers. Prior review substance stands as written in the archived originals.

## Standing Architecture Pointers

- Truth: `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` (see lane `ARCHITECTURE.md` / `API_CONTRACT.md` for the link index).
- Prior lane reviews (superseded as live documents, preserved as history): table below.

## Consolidation Record

| Source (moved to `50_archive/`) | Subject |
|----------------------------------|---------|
| `ARCHITECTURE_REVIEW-agents-into-plugin.md` | agents-into-plugin review |
| `ARCHITECTURE_REVIEW-brainstorm-frame-intent.md` | brainstorm-frame-intent review |
| `ARCHITECTURE_REVIEW-debugging.md` | debugging lens review |
| `ARCHITECTURE_REVIEW-git-worktree.md` | git-worktree review |
| `ARCHITECTURE_REVIEW-hidden-flag.md` | hidden-flag review |
| `ARCHITECTURE_REVIEW-single-dispatcher.md` | single-dispatcher review |

---

# Architecture Review: SPEC-grilling-integration-engineering (C1+C2 lane)

**Reviewer:** vasquez (engineering owner, with architect design input)
**Date:** 2026-09-18
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (single-file zero-dep) | pass | Skill-text only (`skills/frame-intent/`, `skills/propose-changes/` + refs); no runtime/plugin/package.json change |
| INV-002 (idempotent, never clobbers) | pass | No config-hook surface touched |
| INV-003 (prompts are bodies only) | pass | No agent-file / manifest change |
| INV-004 (roster-exact) | pass | No roster key added/renamed |
| INV-005 (defaults stable) | pass | No default_agent/subagent_depth change |
| INV-006 (version triple) | pass | No version bump in this unit |
| INV-007 (reference-only provenance) | pass | People inserts 1–6 woven by reference to people SPEC §4; no verbatim external grilling text; SPEC/HARD/GATE/DOMAINS packet preserved |
| INV-008 (deny-default) | pass | No secrets/tokens in proposal; masking reminder + allowlisted evidence ride C2 prompt/exports |
| REQ-005 plug-in invariants (no new dir/stage/reviewer/dep) | pass | Explicitly untouched: quality-gate/*, verify-handoff/*, STRIDE/ADR cores, ship-release, debugging, git-worktree, pull-request |
| API_CONTRACTS.md | pass | No endpoints/adapters/boundaries/payloads; proposal states no API_CONTRACTS.md change |

## ADR Required?

- [x] Yes — ADR-007 created (`docs/specs/10_design/ADR-007-grilling-integration.md`, proposed): fold-in decision C1–C4, budgets, bans, consequences.
- [ ] No — change is within existing contracts

## Conditions for Approval

None blocking execute-spec. Gate carries (not re-decided here): people-owner co-sign on C1 budget default + inserts 1–6 intent-match (REQ-P-004); security-owner masking co-sign (REQ-P-006); parallel security-lane conditions bind — never overridden.

## Sign-off

- [x] engineering owner (vasquez, with architect input) — architecture Approved; hand off toward execute-spec
