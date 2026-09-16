# Commit Convention — Frame→Ship

> Shared source of truth for per-stage commit guidance. Each stage SKILL.md shows its own one-line example; format rules live here so examples never drift.

## Format (work-unit commits)

- Header: `type(scope): imperative lowercase subject ≤72 chars, no trailing period`
- Body: WHAT + WHY of the grouped step (grouped chapter, not scattered atoms).
- Stage diary fragments (`wip`, `fixed bug`, `stuff`) get squashed into their stage commit before push.
- Commit only approved files: check `git status --short` first; never commit secrets, tokens, session material, or unscoped files.
- Guidance only: missing/bad commit format never fails `quality-gate` or blocks `verify-handoff`.

## Types

- `docs`: briefs, specs, proposals, reviews, gates, handoffs (most stages).
- `feat` / `fix`: `execute-spec` implementation tasks per REQ-ID.
- `chore`: `ship-release` shipping + archival.

## Scope per stage (default)

| Stage | Default scope | Commits |
|-------|--------------|---------|
| frame-intent | `brief-<slug>` | 1 per brief |
| translate-to-spec | `spec-<id>` | 1 per spec batch |
| propose-changes | `proposal-<id>` | 1 per proposal (doc itself; impl files stay untouched) |
| review-security | `sec-<id>` | 1 per review |
| review-architecture | `adr-<nnn>` | 1 per ADR/review |
| execute-spec | `<req-id>` or feature slug | 1 per approved task/REQ-ID |
| quality-gate | `gate-<spec-id>` | 1 per gate report |
| verify-handoff | `handoff-<id>` | 1 per handoff |
| ship-release | `release-<version>` | 1 per release (+ tag) |

## Examples by stage

- frame-intent: `docs(brief-auth): add BRIEF-auth with OKRs and domains-touched`
- translate-to-spec: `feat(spec-003): add REQ-IDs and ARCHITECTURE contract for auth`
- propose-changes: `docs(proposal-003): add PROPOSED_CHANGES for auth with blast radius`
- review-security: `docs(sec-003): approve SECURITY_REVIEW with STRIDE verdict`
- review-architecture: `docs(adr-004): record ADR for session contract change`
- execute-spec (per task): `feat(auth-001): add session store with REQ-001 test trace`
- quality-gate: `docs(gate-003): record OPEN verdict for SPEC-003 with 7 reviews`
- verify-handoff: `docs(handoff-003): verify DoD and route SPEC-003 to ship`
- ship-release: `chore(release-0.4.0): ship SPEC-003 with notes and rollback plan`

## execute-spec per-task rule

One work-unit commit per approved task/REQ-ID. Body links `REQ-ID → test → artifact`. Never batch unrelated REQ-IDs in one commit. Implementation plan steps map 1:1 to commits unless the plan explicitly groups them.
