# Requirements Index: Git-Worktree Isolation (Security)

**Owner:** barrera — security owner
**Brief Reference:** BRIEF-git-worktree
**Domains-Touched:** [security] (full initiative: engineering, automation/ops, security, people)
**Spec:** docs/specs/20_backlog/SPEC-git-worktree-security.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-SEC-001..008 + REQ-NF-001..003) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-SEC-001 | Trust-boundary map in `skills/git-worktree/references/guards.md`: every worktree path, port/adapter, event/log line, and prompt packet is a declared boundary with owner (security) and default-deny posture | P0 | BRIEF-git-worktree (Scope: trust-boundary map), OKR KR-2.2 | SPEC-git-worktree-security | security | review (`guards.md` boundary table) |
| REQ-SEC-002 | `.gitignore` fail-closed gate: `git check-ignore -q .worktrees` succeeds before first add, `.gitignore` contains `.worktrees/`; nonzero exit or missing entry = STOP with no override | P0 | BRIEF-git-worktree (Desired Outcome.3), OKR KR-1.2 | SPEC-git-worktree-security | security | test (check-ignore logs + missing-entry drill log) |
| REQ-SEC-003 | Least-privilege per worktree: own branch, own `<spec-id>` dir, no shared credentials, no cross-worktree access; wide/shared/cross-tenant access = recorded finding with owner | P0 | Guardrails 3 (least privilege) | SPEC-git-worktree-security | security | test (`git worktree list` snapshot + file listing) |
| REQ-SEC-004 | PII checkpoints mask/tokenize: paths, logs, prompts, gate evidence scanned; secrets/tokens/credentials/sessions never in code/config/logs/examples/events; findings with proof surface same session with severity + evidence + owner, without proof = REFUTED | P0 | BRIEF-git-worktree (Regulatory Ley 172-13), Guardrails 1/5/6 | SPEC-git-worktree-security | security | test (secret/PII scan log + rescan proof) |
| REQ-SEC-005 | Submodule guard: `git worktree add` on submodule repos hits explicit guard (refuse or pinned-submodule verify); unpinned/recursive refused without security-owner exception | P0 | BRIEF-git-worktree (Scope: submodule guard) | SPEC-git-worktree-security | security | test (submodule drill log) |
| REQ-SEC-006 | Sandbox fallback: repo-local refused → `Temp\opencode` only, with declared purpose + TTL + deletion owner; fallback never silently permanent | P0 | BRIEF-git-worktree (Open Questions: sandbox owner) | SPEC-git-worktree-security | security | attestation (fallback record + removal log) |
| REQ-SEC-007 | Scoped export allowlist: gate evidence/shares/lessons export allowlisted paths only (logs, `worktree list` snapshots, redacted excerpts); never full dumps or raw PII; every PII store declares purpose + TTL + deletion, expired purged post-snapshot | P0 | BRIEF-git-worktree (Regulatory), Guardrails 7/8 | SPEC-git-worktree-security | security | review (allowlisted packet sample) |
| REQ-SEC-008 | No freelance fixes: never rotate keys, patch prod, or widen perms; violations reported with severity + location to owning remediator (orchestrator + montilla for waivers) | P0 | Guardrails 4, BRIEF Out of Scope | SPEC-git-worktree-security | security | review (`rg` no-freelance-fix scan in gate) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Deny-by-default posture holds end-to-end; CLOSED gate never ships on security findings without recorded waiver (orchestrator + montilla) | Security | 0 unwaived security findings at gate; waiver record path or clean scan |
| REQ-NF-002 | Ley 172-13 minimization: minimum PII, mapped flow source → store → log → third party; mask/tokenize at every checkpoint | Privacy | PII flow map present; scan = 0 raw PII in shares |
| REQ-NF-003 | Residual risk explicit: APPROVE + conditions lists risk + owner; no silent PASS | Governance | Gate packet states residual risks + owners or "none" |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| security | Boundary table + fail-closed gate + submodule/sandbox rules in `guards.md`; scans, allowlist, waiver ownership | barrera |
| engineering | Skill mechanics complement (no duplication): engineering owns *how* to create, security owns *what must be refused/masked/allowlisted* | vasquez |
| automation/ops | Sandbox TTL co-signed with automation; fallback cleanup via `remove` + `prune` | automation owner + engineering owner |
| people | Guard/fallback messaging DX reviewed for PII hygiene; wording changes via Cross-domain request only | santana |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Boundaries + gate | `skills/git-worktree/references/guards.md`, check-ignore + missing-entry drill logs | REQ-SEC-001, REQ-SEC-002, REQ-NF-001 |
| Privilege + PII | `git worktree list` snapshot, file listing, secret/PII scan + rescan logs | REQ-SEC-003, REQ-SEC-004, REQ-NF-002 |
| Guards + fallback | submodule drill log, fallback record + removal log | REQ-SEC-005, REQ-SEC-006 |
| Export + conduct | allowlisted packet sample, no-freelance-fix `rg` scan, gate residual statement | REQ-SEC-007, REQ-SEC-008, REQ-NF-003 |
