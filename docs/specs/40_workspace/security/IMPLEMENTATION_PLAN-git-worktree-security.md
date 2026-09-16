# Implementation Plan: SPEC-git-worktree-security

**Agent:** security specialist (barrera lens, security owner)
**Date:** 2026-09-16
**Approved By:** security owner (barrera) — Conditional verdict `SECURITY_REVIEW-git-worktree.md`
  (C-001..C-006); ARCH Approved (per packet); engineering owner fit-check pending at gate
**Domains-Touched:** security (packet DOMAINS [engineering, automation/ops, security, people] —
  this plan owns the security slice only)

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create trust-boundary + gate policy file (REQ-SEC-001..008) | `skills/git-worktree/references/guards.md` (create; single-writer: this lane only) | this plan §Order; `TEST_MATRIX-git-worktree-security.md` T-001..T-008 | 1h |
| 2 | Run secret/PII credential-shape scan over `skills/git-worktree/**` (C-002) | scan only, no files modified | test matrix T-004 (scan refs + 0-hit result) | 0.25h |
| 3 | Run submodule drill probes (C-004) | scan only, no checkout executed | test matrix T-005 (none-needed statement) | 0.25h |
| 4 | Record `check-ignore` fail-closed state by reference (C-001; engineering lane lands entry) | no edit to `.gitignore` (parallel-lane owned) | test matrix T-002 (probe exit refs) | 0.25h |
| 5 | Self-check: no PII in lane files, scoped excerpts only, no commits | the 3 lane files | test matrix Coverage Summary | 0.25h |

Each step maps to zero commits — No commits per packet (orchestrator batches at gate).

## Order of Operations

Guards.md first (Step 1) because every scan and drill (Steps 2–4) quotes its
section paths as the control definition — evidence without the control text is
unverifiable. Scans run after the file lands so the 0-hit result covers final
content. The `check-ignore` state is recorded last-by-reference because the
`.gitignore` entry is owned by the parallel engineering lane: this lane asserts
the gate definition, cites the observed fail-closed probe (`exit 1`, entry
absent 2026-09-16), and stops — it never edits `.gitignore` itself.
No cross-lane edits at any point; cross-domain need → Cross-domain request to
orchestrator.

## Rollback Points

- **Before gate:** revert = delete the 3 lane files (`guards.md`,
  `IMPLEMENTATION_PLAN-git-worktree-security.md`,
  `TEST_MATRIX-git-worktree-security.md`); zero repo mechanics touched, zero
  external sends made. Owner: security specialist; ETA: immediate.
- **After gate (if approved):** revert = remove `guards.md` via follow-up
  proposal + prune any drill worktrees (`git worktree remove --force` +
  `prune`, verified by `git worktree list`). No keys, prod, or perms are
  touched by rollback — owner remediates live findings separately.
- Safe-stop after any step: Steps 1–5 are read-only except the Step-1 file
  create, which is itself reverted by deletion.

## Quality Gates

Domain checks (security slice only; non-touched deleted):

- [x] Security: secret/PII scan 0 credential-shaped hits + 0 PII-shaped hits
  with rescan annotation (matrix T-004); no-freelance-fix prohibition present,
  zero instructions (matrix T-008); boundary table complete 4/4 rows (T-001)
- [ ] Engineering: skill file-shape fit (`guards.md` slots into
  `skills/git-worktree/references/` without breaking §5 resolution) — engineering
  owner confirms at gate; not asserted by this lane
- [ ] Automation/ops: sandbox TTL + deletion-owner co-sign for `Temp\opencode`
  fallback — automation owner confirms at gate; not asserted by this lane
