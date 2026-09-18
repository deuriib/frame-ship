# Guards: git-worktree isolation (security policy)

**Owner:** security owner (barrera)
**Spec:** `docs/specs/20_backlog/SPEC-git-worktree-security.md#REQ-SEC-001..008`
**Status:** deny-by-default — any gap below is STOP, no override.
**Scope note:** this file owns security controls only. Skill mechanics, pwsh
flow, `mise` baseline serialization, and announce-line wording live with the
sibling engineering / automation-ops / people lanes — complement, never
duplicate. Cross-domain need → formal Cross-domain request to orchestrator.

## 1. Trust-boundary map (REQ-SEC-001)

Default posture for every row: **deny**. Missing row = gate finding.

| Boundary | Checkpoint | Default rule | Owner |
|----------|-----------|--------------|-------|
| worktree path (`.worktrees/<spec-id>`) | no PII/secrets in path segment | mask, refuse on hit | security owner |
| prompt packet (`SPEC/HARD/GATE/DOMAINS`) | reference-only, no bodies | refuse paste, link by path | security owner |
| log / transcript line | secret/PII scan before share | tokenize, allowlisted excerpt only | security owner |
| gate evidence | allowlisted paths only | refuse full dump | security owner |

Rules:

- Every new worktree path, port/adapter, event/log line, and prompt packet
  is a declared boundary before the first `git worktree add`.
- Prompt packets cross lanes by reference (`<path>#REQ-ID`) — never pasted bodies.
- A finding without proof (diff/scan/log ref) is REFUTED; a finding with
  proof surfaces same session with severity + evidence + owner.

## 2. Fail-closed `.gitignore` gate (REQ-SEC-002)

```powershell
git check-ignore -q .worktrees/  # exit 0 = gate green; nonzero = STOP
```

- `.gitignore` MUST contain a `.worktrees/` entry before the first
  `git worktree add`. Either `.worktrees/` or root-anchored `/.worktrees/`
  satisfies the gate — the `check-ignore` probe is authoritative, not the spelling.
- Nonzero exit or missing entry = STOP. No override, no flag to skip.
  Fix the ignore, re-run the probe green, then retry the `add`.
- Gate evidence (carried by reference, engineering lane attaches logs):
  `check-ignore` log + missing-entry drill log + `git status` zero-tracked
  snapshot for `.worktrees/`.
- Observed 2026-09-16: entry present (`.gitignore:55-56`, 56 lines),
  slash probe `git check-ignore -q .worktrees/` exits 0 — gate green on
  fresh clones with no directory on disk. Bare form without the slash
  exits 1 here: it is a dir-existence variant only, never the gate probe.
  Slash-form nonzero still = STOP, no override. The entry itself is landed
  by the engineering lane; this file only defines the gate, never edits
  `.gitignore`.

## 3. Least privilege per worktree (REQ-SEC-003)

- Each worktree gets minimum scope: own branch (branch-per-SPEC), own
  `<spec-id>` dir, no shared credentials, no cross-worktree file access.
- Live guard — count MUST stay ≤ 2:

```powershell
git worktree list   # live count MUST be <= 2; third waits or escalates, no sideways
```

- Wide, shared, or cross-tenant access is a recorded finding with owner.
  A shared-secret file copied into a lane is a **High** finding with owner
  assigned — never a convenience.
- Evidence: `git worktree list` snapshot + per-lane branch/dir listing.

## 4. PII checkpoints — mask / tokenize (REQ-SEC-004, Ley 172-13)

- Worktree paths, logs, prompts, and gate evidence are PII checkpoints.
  Flow mapped end-to-end: source → store → log → third party.
- Secrets, tokens, credentials, and sessions NEVER appear in code, config,
  logs, examples, or events. Scan before share:

```powershell
Select-String -Pattern '(?i)(secret|token|api[_-]?key|passwd|credential|session)' `
  -Path skills/git-worktree/** -Quiet
# Any match = STOP: mask, then rescan to 0 hits with rescan proof before gate.
```

- Gate scan (`rg` equivalent over `skills/git-worktree/**` + worktree logs)
  must read **0 hits**; any hit blocks the gate until masked with proof of rescan.
- Minimization: minimum PII in paths, logs, and evidence. Mask or tokenize
  at every port/adapter/event/log/prompt checkpoint; allowlists below (§6)
  decide what may leave the lane.

## 5. Submodule guard — drill steps (REQ-SEC-005)

`git worktree add` on a repo with submodules hits this guard BEFORE checkout:

```powershell
git submodule status          # empty output = no submodules: record none-needed statement
git config --file .gitmodules --list  # present = submodule-bearing repo: guard applies
```

Drill:

1. Probe `git submodule status` + `.gitmodules` presence before any `add`.
2. No submodules → record a none-needed statement with the probe output ref;
   proceed to the `check-ignore` gate (§2).
3. Submodules present → REFUSE checkout by default, or demand pinned-verify
   (each submodule pinned to an explicit SHA, no recursive/unpinned entries).
4. Unpinned or recursive submodule without a recorded security-owner
   exception = gate finding; checkout stays refused.
5. Attach the drill log (probe output + refuse-or-verify decision) to gate evidence. Singleton: drill logs attach to the lane singleton `DRILL.md` — create-if-missing else update-in-place, never `DRILL-*.md`.

## 6. Sandbox fallback `Temp\opencode` (REQ-SEC-006)

- When repo-local `.worktrees/` is refused (dirty baseline, policy, or guard
  trip), the ONLY fallback root is `Temp\opencode`. Any other location = finding.
- Every fallback records three fields before use:
  `purpose` + `TTL` + `deletion owner` (automation + security co-sign;
  orchestrator confirms the brief Open Question on sandbox TTL).
- Fallback never silently becomes permanent: cleanup is explicit —

```powershell
git worktree remove <fallback-path> --force
git worktree prune
git worktree list   # verify lane gone
```

- Evidence: fallback record (purpose + TTL + deletion owner) + removal log.

## 7. Scoped-export allowlist (REQ-SEC-007)

Gate evidence, shares, and lessons export allowlisted paths ONLY:

- command logs (`check-ignore`, `worktree list`, drill probes)
- `git worktree list` snapshots
- redacted transcript excerpts (slots only, e.g. `<spec-id>` / `<branch>`)

NEVER full dumps, NEVER raw PII. Full-transcript exports for "completeness"
are refused under this rule.

- Every PII store in the flow declares purpose + TTL + deletion; expired data
  is purged post-snapshot.
- PASS exports carry allowlisted evidence only (guardrail 8).

## 8. No freelance fixes (REQ-SEC-008)

This policy never rotates keys, patches prod, or widens perms. Violations are
reported with severity + location and routed to the owning remediator
(orchestrator + montilla for waivers) via Cross-domain request. Gate scans
for freelance-fix instructions (`rotate` / prod-`patch` / `chmod`-equivalent)
must read 0 hits.

## 9. Residual + escalation

- Conditional paths (submodule drill, sandbox TTL) remain carried as gate
  conditions C-001..C-006 until drill logs exist — no silent PASS.
- Critical/High findings surface same session with severity + evidence +
  owner; Med/Low ride the gate (guardrails 9–11).
- CLOSED gate on security findings never ships without a recorded
  orchestrator + domain-owner waiver.
