# Spec: Git-Worktree Isolation (Security)

**ID:** SPEC-git-worktree-security
**Owner:** security owner (barrera)
**Domains-Touched:** security
**Brief Reference:** BRIEF-git-worktree
**Status:** draft
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent; override only with orchestrator + montilla waiver)

## 1. Context

Parallel worktrees (max 2, per frozen `execution_mode`) multiply the attack and leakage surface: one extra checkout each for paths, logs, prompts, and gate evidence. The engineering spec (`docs/specs/20_backlog/SPEC-git-worktree-engineering.md`) owns skill mechanics and pwsh flow; this spec owns the security controls that make that flow deny-by-default. It complements — never duplicates — the sibling: where engineering defines *how* to create `.worktrees/<spec-id>`, this spec defines *what must be refused, masked, or allowlisted* before, during, and after creation. Guardrails AGENTS.md 1–14 ride every requirement; Ley 172-13 minimization is non-negotiable.

## 2. Requirements

- REQ-SEC-001: Trust-boundary map exists in `skills/git-worktree/references/guards.md`: every new worktree path, port/adapter, event/log line, and prompt packet is a declared boundary with owner (security) and default-deny posture.
- REQ-SEC-002: `.gitignore` fail-closed gate — `git check-ignore -q .worktrees` must succeed before the first `git worktree add`, `.gitignore` must contain a `.worktrees/` entry, and any nonzero exit or missing entry is STOP (no override; fix the ignore, then retry).
- REQ-SEC-003: Least-privilege per worktree — each worktree runs with minimum scope (own branch, own `<spec-id>` dir, no shared credentials, no cross-worktree file access); wide/shared/cross-tenant access is a recorded finding with owner.
- REQ-SEC-004: PII checkpoints mask/tokenize — worktree paths, logs, prompts, and gate evidence are PII checkpoints; secrets/tokens/credentials/sessions never appear in code, config, logs, examples, or events; any finding without proof (diff/scan/log) is REFUTED, any with proof is surfaced same session with severity + evidence + owner.
- REQ-SEC-005: Submodule guard — `git worktree add` on a repo with submodules hits an explicit guard (refuse or pinned-submodule verify) before checkout; unpinned or recursive submodules are refused unless security owner records an exception.
- REQ-SEC-006: Sandbox fallback — when repo-local `.worktrees/` is refused (dirty baseline, policy, or guard trip), fallback is `Temp\opencode` sandbox only, with declared purpose + TTL + deletion owner; fallback never silently becomes permanent.
- REQ-SEC-007: Scoped export allowlist — gate evidence, shares, and lessons export allowlisted paths only (command logs, `git worktree list` snapshots, redacted transcript excerpts); never full dumps, never raw PII; every PII store in the flow declares purpose + TTL + deletion, and expired data is purged post-snapshot.
- REQ-SEC-008: No freelance fixes — this spec never rotates keys, patches prod, or widens perms; violations are reported with severity + location and routed to the owning remediator (orchestrator + montilla for waivers).

## 3. Acceptance Criteria

- [ ] AC-SEC-001: `guards.md` contains a boundary table (path/port/log/prompt → checkpoint → mask rule → owner) with deny-default stated; missing row = gate finding (evidence: `guards.md` section path in test matrix).
- [ ] AC-SEC-002: Fresh-clone dry run shows `git check-ignore -q .worktrees` green AND `.gitignore` containing `.worktrees/` before any add; simulated missing-entry drill exits nonzero and blocks creation with no override path (evidence: check-ignore logs + drill log).
- [ ] AC-SEC-003: Two-worktree parallel drill shows distinct branches/dirs, no shared credential file copied, and `git worktree list` count ≤ 2; any shared-secret copy is a High finding with owner assigned (evidence: `git worktree list` snapshot + file listing).
- [ ] AC-SEC-004: `rg` scan over skill + new spec shows zero secret/token patterns and zero PII-shaped strings in paths/logs/examples; any hit blocks gate until masked with proof of rescan (evidence: scan log in test matrix).
- [ ] AC-SEC-005: Submodule drill (repo or fixture with submodule) triggers guard message and refuses checkout or demands pinned verify; unpinned/recursive case is refused without security-owner exception record (evidence: drill log).
- [ ] AC-SEC-006: Sandbox-fallback drill records purpose + TTL + deletion owner and cleans up via `git worktree remove`; fallback outside `Temp\opencode` is a finding (evidence: fallback record + removal log).
- [ ] AC-SEC-007: Gate packet for this spec lists allowlisted evidence paths only (no full dumps); any PII store cited declares purpose + TTL + deletion (evidence: packet sample in proposal).
- [ ] AC-SEC-008: Spec text contains zero key-rotation / prod-patch / perm-widening instructions; violations route to orchestrator per Cross-domain request (evidence: `rg` for rotate/patch/chmod-equivalent in gate).

## 4. Contracts & Interfaces

Non-code security contract (no API shape forced — this section declares policy targets + sign-off contracts):

- Policy targets: `skills/git-worktree/references/guards.md` (boundary table + fail-closed gate + submodule/sandbox rules), `.gitignore` (`.worktrees/` entry), `docs/briefs/BRIEF-git-worktree.md` Open Question on sandbox TTL (decision owned by automation + security — this spec proposes `Temp\opencode` + explicit TTL, orchestrator confirms).
- Boundary table shape (canonical text lives in `guards.md`):

```text
| Boundary | Checkpoint | Default rule | Owner |
| worktree path (.worktrees/<spec-id>) | no PII/secrets in segment | mask, refuse on hit | security owner |
| prompt packet (SPEC/HARD/GATE/DOMAINS) | reference-only, no bodies | refuse paste, link by path | security owner |
| log / transcript line | secret/PII scan before share | tokenize, allowlist excerpt | security owner |
| gate evidence | allowlisted paths only | refuse full dump | security owner |
```

- Sign-off contract: security owner (barrera) approves `guards.md` + `.gitignore` gate; automation owner co-signs sandbox TTL; orchestrator + montilla own any waiver (CLOSED gate never ships on security findings without recorded waiver).
- Illustrative pwsh probes (canonical commands live in the skill, never executed from this spec):

```powershell
git check-ignore -q .worktrees          # nonzero exit = STOP, no override
Select-String -Pattern '(?i)(secret|token|api[_-]?key|passwd)' -Path skills/git-worktree/*
git worktree list                       # live count MUST be <= 2
```

## 5. Out of Scope

- Skill mechanics, pwsh flow, `mise` baseline serialization, announce-line wording — owned by sibling engineering / automation-ops / people specs (complement, don't duplicate).
- Changing chain order, inserting a stage, editing `.opencode/plugins/frame-ship.ts`, or changing the 8-domain catalogue.
- Rotating keys, patching prod, widening perms (no freelance fixes — owner remediates).
- Copying upstream code without license/attribution check (reference only).
- Deciding brief Open Questions beyond the security slice (sandbox TTL co-owned with automation; announce tone with people; promotion rule with engineering) — this spec proposes, orchestrator + named owners dispose.

## 6. Dependencies

- Upstream (read-only): `docs/briefs/BRIEF-git-worktree.md` + `docs/briefs/OKR-git-worktree.md` (KR-1.2 fail-closed, KR-2.2 guards).
- Sibling (parallel, max 2 — complement, never duplicate): `docs/specs/20_backlog/SPEC-git-worktree-engineering.md` (mechanics: REQ-002 check-ignore, REQ-006 lifecycle/guards, REQ-008 packets); automation/ops (mise/baseline, TTL owner); people (consent/announce). Cross-domain needs → formal Cross-domain request to orchestrator.
- Downstream: `frame-ship:propose-changes` (packet `SPEC:docs/specs/20_backlog/SPEC-git-worktree-security.md#REQ-SEC-001..008 / HARD:multi-subagents+deny-default+Ley-172-13 / GATE:none-yet / DOMAINS:[engineering,automation/ops,security,people]`), then `review-security` (STRIDE over this spec), then `execute-spec`.
- Toolchain: `git check-ignore`, `git worktree` on win32/pwsh, `rg`/`Select-String` for secret scans.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-SEC-001 | AC-SEC-001 | PROPOSED_CHANGES.md | `guards.md` boundary table path |
| REQ-SEC-002 | AC-SEC-002 | PROPOSED_CHANGES.md | check-ignore log + missing-entry drill log |
| REQ-SEC-003 | AC-SEC-003 | PROPOSED_CHANGES.md | `git worktree list` snapshot + file listing |
| REQ-SEC-004 | AC-SEC-004 | PROPOSED_CHANGES.md | secret/PII scan log + rescan proof |
| REQ-SEC-005 | AC-SEC-005 | PROPOSED_CHANGES.md | submodule drill log |
| REQ-SEC-006 | AC-SEC-006 | PROPOSED_CHANGES.md | fallback record + removal log |
| REQ-SEC-007 | AC-SEC-007 | PROPOSED_CHANGES.md | allowlisted packet sample |
| REQ-SEC-008 | AC-SEC-008 | PROPOSED_CHANGES.md | `rg` no-freelance-fix scan in gate |
