# Architecture Review: SPEC-single-dispatcher-engineering

**Reviewer:** vasquez (CTO)
**Date:** 2026-09-16
**Verdict:** APPROVED — with conditions (C-1..C-5)
**Files reviewed:** `docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md`;
`docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-single-dispatcher.md`;
`docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md` §4 (W1-W8);
`docs/briefs/BRIEF-single-dispatcher.md`; `docs/briefs/OKR-single-dispatcher.md`

## Review Basis

`docs/specs/10_design/ARCHITECTURE.md` and `API_CONTRACTS.md` are **absent**
repo-wide (glob `**/ARCHITECTURE*.md` = only a prior review artifact in
`40_workspace/single-demo/`; `**/API_CONTRACTS*.md` = 0). Per the brief and
`skills/review-architecture/SKILL.md:1` (Purpose), this review runs against the
canonical chain contract in `skills/AGENTS.md` + root `AGENTS.md` CONVENTIONS,
the SPEC §4 Contracts & Interfaces, and the HARD packet (multi-subagents;
uniform wording; no renames; ADR in `10_design`; plugin zero-dep single-file).

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| Chain order fixed (9 stages, no renames) | pass | Proposal touches no stage order; zero renames (HARD, SPEC:70); all targets referenced by existing paths (PROPOSED_CHANGES:19-31) |
| Skill loader contract (frontmatter `name`/`description` only; body shape fixed) | pass | REQ-003 rewrites delegation-language lines only; frontmatter untouched (SPEC:60; risk R-002 mitigated) |
| Plugin single-file zero-dep + `hasMarker()` idempotency | pass | REQ-001 preserves the guard (`frame-ship.ts:36-39`); REQ-NF-004 gates `tsc --noEmit` exit 0; HARD (SPEC:28,72) |
| Reference-only packets (SPEC/HARD/GATE/DOMAINS) | pass | No REQ/W wording creates, renames, or removes a packet token (people REQ-NF-006 attestation; SPEC:62); engineering consumes, never pastes |
| Single-primary-owner rule + no c-level dispatch | pass | The proposal IS the enforcement: vasquez issues this verdict, montilla (CEO) dispatches at execute-spec; ADR-003 filed in this stage (REQ-006) |
| Artifact naming convention (SCREAMING, `ADR-XXX-<slug>`) | pass | `ADR-003-ceo-only-dispatch.md` matches existing `ADR-001-agent-templates.md` / `ADR-002-*` shape (glob `10_design/`) |
| No invariant break without an explicit ADR | pass | This stage files ADR-003 — the decision record the entire change set depends on (KR-1.3, OKR-single-dispatcher.md:12) |
| DRY — single source of truth, no paraphrase | pass | Uniform sentence consumed **verbatim** from SPEC-single-dispatcher-people §4 W2/W8; engineering reuses, never paraphrases (SPEC:58; PROPOSED_CHANGES:38); gate diff target = 0 bytes |
| Open/Closed — extend via contract strings, no new mechanics | pass | Wording-only edits; no new interfaces, adapters, endpoints, or payloads (PROPOSED_CHANGES:103) |
| Traceability REQ → AC → evidence | pass | 10/10 REQs map to greppable/runable ACs (SPEC §3/§7): grep counts, file diffs, `tsc` exit code — each AC is an executable check (TDD-by-design) |
| Prior-cycle citation chain restores | pass (C-4) | ADR-003 Decision §4 (prompts scope), §5 (harness adapters, Codex provisional), §6 (AC-001 grep scope + exemptions) carry the cited content — TEST_MATRIX:9,27,30,41; IMPLEMENTATION_PLAN:5; skills/AGENTS.md:24 |
| Version consistency (4 locations) | pass (C-3) | REQ-002 binds VERSION/MARKER/header/`plugins/AGENTS.md` bump together; currently drifted (doc v0.2.0 vs plugin v0.3.0, SPEC:29) — fixed by the same bump |
| Rollback completeness | pass | Per-layer revert points + ETA < 15 min (PROPOSED_CHANGES:88-99; REQ-NF-003), mirrors prior-cycle shape (IMPLEMENTATION_PLAN:34-43) |
| Security/data surface | pass (attestation) | No auth, data path, API, or PII-store impact — wording-only; barrera attestation + REQ-NF-001 scan at gate (BRIEF:49,56) |

## ADR Required?

- [x] Yes — **ADR-003 created** (`docs/specs/10_design/ADR-003-ceo-only-dispatch.md`, this stage, per CEO decision #1 — not ADR-004)
- [ ] No — change within existing contracts

## Conditions for Approval

- **C-1 (people coupling / wording):** REQ-003 + REQ-007 mechanism lines are
  implemented **verbatim** from SPEC-single-dispatcher-people §4 (W1-W8, esp. W8
  prompt line); santana signs off on this proposal before execute-spec;
  people-gate diff against the contract strings = 0 bytes (people REQ-NF-001).
- **C-2 (prompts restoration):** execute-spec first verifies
  `skills/templates/implementers/` existence and records the check as evidence
  (REQ-007 contingency, superseded by CEO decision #2); restoration limited to
  the 4 approved names per IMPLEMENTATION_PLAN:14; if it fails → escalate to
  montilla, no silent creation, no third loop.
- **C-3 (version bump):** REQ-002 default **v0.3.1** (wording-only string
  change) with all four version locations reading identical; a semantic change
  beyond wording → minor bump + recorded amendment (condition that breaks the
  default, PROPOSED_CHANGES:22).
- **C-4 (ADR citation restoration):** ADR-003 carries Decision §4 (scope incl.
  implementer-prompts location), §5 (harness adapters, Codex provisional), §6
  (AC-001 grep scope + exemptions) — gate checks content, not only file
  existence (SPEC AC-006).
- **C-5 (gate attestations):** barrera sign-off on plugin diff + wording (no
  auth/data/API surface — waiver-with-reason per TEST_MATRIX:20) + REQ-NF-001
  scan; people gate: 7 C-level sign-offs for domain template sets
  (BRIEF:49-50).

## Sign-off

- [x] vasquez (CTO) — verdict APPROVED with the conditions above; hand off to
  frame-ship:execute-spec only after C-1..C-5 are evidenced at the quality gate.