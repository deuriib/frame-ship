# Requirements Index: Git-Worktree Isolation (People)

**Owner:** santana — people owner
**Brief Reference:** BRIEF-git-worktree
**Domains-Touched:** [people] (full initiative: engineering, automation/ops, security, people)
**Spec:** docs/specs/20_backlog/SPEC-git-worktree-people.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-PPL-001..005 + REQ-NF-001..002) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-PPL-001 | Consent-before-create on every worktree creation: explicit human-answered prompt before any `git worktree add`; silent/auto creation forbidden; answer recorded in session transcript | P1 | BRIEF-git-worktree (Scope, Constraints: consent required) | SPEC-git-worktree-people | people | attestation (transcript excerpts, consent Q+A per creation) |
| REQ-PPL-002 | Warm announce line per creation (and removal) using the uniform template: dónde + rama + por qué + limpieza in order; per-owner tone variants forbidden without people-owner + orchestrator waiver | P1 | BRIEF-git-worktree (Open Questions: announce tone — answered uniform default) | SPEC-git-worktree-people | people | attestation (transcript excerpts + `rg` uniformity check) |
| REQ-PPL-003 | Dirty-baseline refusal is human-readable: cause + next options (stash / commit / explicit override) in plain language, never a raw git dump; override only on explicit recorded human confirmation | P1 | BRIEF-git-worktree (Scope: refuse/override path) | SPEC-git-worktree-people | people | test (dirty-baseline drill log + override record) |
| REQ-PPL-004 | Change-fatigue guard: announce fires exactly once per create and once per remove (not per setup command); wording byte-uniform with template; no repeat consent prompt within the same live worktree session | P1 | BRIEF-git-worktree (Constraints: uniform wording) | SPEC-git-worktree-people | people | test (announcement count in test matrix) |
| REQ-PPL-005 | Cross-domain brief-back rides the orchestrator: DX feedback on submodule-guard and sandbox-fallback messaging goes as formal Cross-domain request; specialists never negotiate wording sideways | P1 | skills/AGENTS.md (sole-dispatcher contract) | SPEC-git-worktree-people | people | attestation (brief-back path or none-needed statement) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No new roles and no hiring/training plan beyond the announce/consent habit; skills gap flagged only if gate finds one | Change load | Handoff states "no new roles" or flags gap with owner |
| REQ-NF-002 | No PII/secrets in announce lines, refusal scripts, or transcript excerpts shared to gate (Ley 172-13 minimization) | Privacy | Excerpts redacted/allowlisted; scan = 0 findings |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | Consent/announce/refusal wording owned here (SPEC §4 templates); people-reviewer owns wording verdict at gate | santana |
| engineering | Mechanics complement (no duplication): file shape, `check-ignore` gate, pwsh joins, `typecheck` baseline owned by engineering spec | vasquez |
| automation/ops | Fallback messaging DX reviewed only; TTL decision owned by automation + security | automation owner + engineering owner |
| security | Wording reviewed for PII hygiene; trust-boundary map and `.gitignore` entry owned by security spec | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Consent + announce | session transcript excerpts, `rg` uniformity check | REQ-PPL-001, REQ-PPL-002, REQ-NF-002 |
| Refusal + fatigue | dirty-baseline drill log, override record, announcement count in test matrix | REQ-PPL-003, REQ-PPL-004 |
| Brief-back | Cross-domain request brief path or none-needed statement in handoff | REQ-PPL-005, REQ-NF-001 |
