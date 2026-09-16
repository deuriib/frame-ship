# Commit Convention — Frame→Ship

> Shared source of truth for per-stage commit guidance. Each stage SKILL.md shows its own one-line example; format rules live here so examples never drift.

## Format (work-unit commits)

- Header: `type(<stage>/<work-unit>): imperative lowercase subject ≤72 chars, no trailing period`
- Body: WHAT + WHY of the grouped step (grouped chapter, not scattered atoms).
- Stage diary fragments (`wip`, `fixed bug`, `stuff`) get squashed into their stage commit before push.
- Commit only approved files: check `git status --short` first; never commit secrets, tokens, session material, or unscoped files.
- Guidance only: missing/bad commit format never fails `quality-gate` or blocks `verify-handoff`.

## Work Unit Definition

A **work unit** is the smallest independently meaningful unit of work within a stage. Each work unit maps to one commit. The work unit varies by stage:

| Stage | Work Unit | Identifier |
|-------|-----------|------------|
| frame-intent | One brief | `<slug>` (e.g., `brief-auth`) |
| translate-to-spec | One spec | `<spec-id>` (e.g., `spec-003`) |
| propose-changes | One proposal | `<proposal-id>` (e.g., `proposal-003`) |
| review-security | One security review | `<sec-id>` (e.g., `sec-003`) |
| review-architecture | One ADR | `<adr-nnn>` (e.g., `adr-004`) |
| execute-spec | One REQ-ID / task | `<req-id>` or `<feature-slug>` (e.g., `REQ-001`) |
| quality-gate | One gate report | `<spec-id>` (e.g., `gate-003`) |
| verify-handoff | One handoff | `<spec-id>` (e.g., `handoff-003`) |
| ship-release | One release | `<version>` (e.g., `release-0.4.0`) |

## Types

- `docs`: briefs, specs, proposals, reviews, gates, handoffs (most stages).
- `feat` / `fix`: `execute-spec` implementation tasks per REQ-ID.
- `chore`: `ship-release` shipping + archival.

## Scope per stage

The scope follows the pattern `<stage>/<work-unit>`:

| Stage | Scope pattern | Commits |
|-------|--------------|---------|
| frame-intent | `frame-intent/<slug>` | 1 per brief |
| translate-to-spec | `translate-to-spec/<spec-id>` | 1 per spec |
| propose-changes | `propose-changes/<proposal-id>` | 1 per proposal |
| review-security | `review-security/<sec-id>` | 1 per review |
| review-architecture | `review-architecture/<adr-nnn>` | 1 per ADR |
| execute-spec | `execute-spec/<req-id>` or `execute-spec/<feature-slug>` | 1 per REQ-ID/task |
| quality-gate | `quality-gate/<spec-id>` | 1 per gate report |
| verify-handoff | `verify-handoff/<spec-id>` | 1 per handoff |
| ship-release | `ship-release/<version>` | 1 per release (+ tag) |

## Examples by stage

- frame-intent: `docs(frame-intent/brief-auth): add BRIEF-auth with OKRs and domains-touched`
- translate-to-spec: `feat(translate-to-spec/spec-003): add REQ-IDs and ARCHITECTURE contract for auth`
- propose-changes: `docs(propose-changes/proposal-003): add PROPOSED_CHANGES for auth with blast radius`
- review-security: `docs(review-security/sec-003): approve SECURITY_REVIEW with STRIDE verdict`
- review-architecture: `docs(review-architecture/adr-004): record ADR for session contract change`
- execute-spec (per task): `feat(execute-spec/REQ-001): add session store with REQ-001 test trace`
- execute-spec (fix): `fix(execute-spec/REQ-002): enforce TTL per REQ-002`
- quality-gate: `docs(quality-gate/gate-003): record OPEN verdict for SPEC-003 with 7 reviews`
- verify-handoff: `docs(verify-handoff/handoff-003): verify DoD and route SPEC-003 to ship`
- ship-release: `chore(ship-release/release-0.4.0): ship SPEC-003 with notes and rollback plan`

## Splitting rules (when to use multiple commits)

**Mandatory split — separate commit for each:**
- Different REQ-IDs (execute-spec: 1 commit per REQ-ID, never batch unrelated REQ-IDs).
- Different briefs (frame-intent: 1 commit per brief).
- Different specs (translate-to-spec: 1 commit per spec).
- Different proposals (propose-changes: 1 commit per proposal).
- Different ADRs (review-architecture: 1 commit per ADR).
- Different reviews (review-security: 1 commit per review).
- Different gate reports (quality-gate: 1 commit per gate).
- Different handoffs (verify-handoff: 1 commit per handoff).
- Different releases (ship-release: 1 commit per release).

**Split when concerns differ, even within the same work unit:**
- Code changes vs. documentation changes → separate commits.
- Implementation vs. test → separate commits (if they serve different purposes).
- Feature vs. config → separate commits.

## Batching rules (when grouping is allowed)

**Batch only when:**
- The plan explicitly groups multiple steps into one work unit.
- The changes are tightly coupled and reverting one requires reverting all.
- Same stage, same work unit, same concern.

**Never batch:**
- Different REQ-IDs.
- Different work units from different stages.
- Code + docs that serve different purposes.

## execute-spec per-task rule

One work-unit commit per approved task/REQ-ID. Body links `REQ-ID → test → artifact`. Never batch unrelated REQ-IDs in one commit. Implementation plan steps map 1:1 to commits unless the plan explicitly groups them.