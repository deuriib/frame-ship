# Security Review: git-worktree isolation

**Reviewer:** security owner (barrera) via security reviewers — proposal-only review wave (no impl mods)
**Date:** 2026-09-16
**Verdict:** Conditional
**Scope (by reference only):** `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-git-worktree-engineering.md` + `docs/specs/40_workspace/barrera/PROPOSED_CHANGES-git-worktree-security.md` + `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-git-worktree-automation.md` + `docs/specs/40_workspace/santana/PROPOSED_CHANGES-git-worktree-people.md`; specs `docs/specs/20_backlog/SPEC-git-worktree-*.md`; `docs/specs/10_design/ARCHITECTURE-git-worktree.md`; `.gitignore`
**Packet:** HARD (execution_mode=multi-subagents, win32/pwsh, proposal-only, deny-default secrets/PII, reference-only) / GATE (review-security wave, blocks execute-spec on Rejected) / DOMAINS ([engineering, automation/ops, security, people])

## Threat Model

See `docs/specs/40_workspace/barrera/THREAT_MODEL-git-worktree.md` for full STRIDE analysis (Attack Surface with worktree paths/ports/logs trust boundaries, 6-row STRIDE table, Residual Risk + owner).

## Findings

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| S-001 | Medium | `.worktrees/` ignore entry absent — fail-closed gate trips today. Location: `.gitignore` (53 lines, zero `worktrees` hits). Proof: `git check-ignore -q .worktrees` exit=1 (2026-09-16); `rg -c worktrees .gitignore` = 0; security proposal §Changes correctly records entry absent. | Append `.worktrees/` entry (root-anchored `/.worktrees/` only if repo convention adopts it — gate confirms either way); re-run `git check-ignore -q .worktrees` must exit 0; attach check-ignore log + `git status` zero-tracked snapshot in execute-spec evidence. Owner: engineering owner (entry) + security owner (gate confirm). No freelance fix — report only. |
| S-002 | Low | PII/secret leak surface across 2 lanes (paths/logs/prompts/evidence) relies on future gate scans. Proof: proposal-doc secret scan reads 0 hits today (`rg` secret-pattern scan over the 4 proposals, exit 1 = no match); residual is future impl/log content, not current docs. | `rg`/`Select-String` scan over `skills/git-worktree/**` + worktree logs must read 0 findings with rescan proof at gate; mask/tokenize at every checkpoint; allowlisted evidence excerpts only (Ley 172-13 minimization). Owner: security owner. |
| S-003 | Medium | Cross-worktree scope creep / shared-credential copy is conditional but probable under 2-lane speed pressure. Proof: no shared-credential helper in proposal diffs (`git status --porcelain` shows no `skills/git-worktree/**` touched — proposal-only holds); proposals explicitly reject the shared-helper alternative (security proposal Alternatives Considered). | Enforce least-privilege clause (own branch/dir, no shared creds, no cross-worktree access); any shared-secret copy at gate = High finding with owner; attach `git worktree list` count ≤ 2 snapshot. Owner: security owner. |
| S-004 | Medium | Unpinned/recursive submodule checkout would execute pre-review (conditional on submodule-bearing repos). Proof: guard text present (engineering `guards.md` row + security REQ-SEC-005 refuse-or-pinned-verify); no checkout executed in proposal phase (`git status` clean of worktrees). | Refuse-or-pinned-verify before checkout; unpinned/recursive without recorded security-owner exception = gate finding; drill log (or none-needed statement for non-submodule repos) required. Owner: security owner. |
| S-005 | Low | Sandbox fallback `Temp\opencode` TTL + deletion owner pending orchestrator confirm (ARCH Open Questions). Proof: `ARCHITECTURE-git-worktree.md` Open Questions + security proposal fallback clause (`Temp\opencode` only, TTL-bound). | Fallback requires declared purpose + TTL + deletion owner (automation + security co-sign) with removal log; off-sandbox location = finding; never silently permanent. Owner: automation owner + security owner. |
| S-006 | Low | People announce/refusal transcript excerpts could leak PII if full dumps are exported for "completeness". Proof: people proposal §Security Considerations (scoped excerpts only) + template slots carry no secrets/PII (`<donde>/<rama>/<porque>/<limpieza>`, `<n> archivos`). | Allowlisted paths + redacted excerpts only; exactly-once byte-uniform announce; full-transcript evidence refused per scoped-export allowlist. Owner: people owner (santana); security confirms only on Cross-domain touch. |

Findings without proof (diff/scan/log ref) = REFUTED per guardrails. All findings above carry proof refs. No Critical/High findings in proposal artifacts — nothing to surface same-session under guardrails 9–11 beyond this Conditional record.

## Conditions for Approval

Execute-spec may proceed only with these conditions carried into implementation + gate evidence:

1. C-001 (S-001): `.gitignore` `.worktrees/` entry landed + `git check-ignore -q .worktrees` exit 0 log + `git status` zero-tracked snapshot attached.
2. C-002 (S-002): secret/PII `rg`/`Select-String` scan over `skills/git-worktree/**` + worktree logs reads 0 hits with rescan proof; exports match allowlist (command logs, `list` snapshots, redacted excerpts).
3. C-003 (S-003): `git worktree list` live-count ≤ 2 snapshot per lane; no shared-credential copies; branch-per-SPEC holds.
4. C-004 (S-004): submodule drill log or none-needed statement; any unpinned/recursive checkout carries recorded security-owner exception.
5. C-005 (S-005): every worktree declares TTL + owner; fallback (if any) is `Temp\opencode`-only with purpose + TTL + deletion owner and removal log.
6. C-006 (S-006): announce/refusal evidence is scoped excerpts only; exactly-once count verified in 2-SPEC dry run.

Rejected triggers (block execute-spec, escalate to orchestrator): secrets/PII in skill files or evidence; `.worktrees/` content tracked; freelance fix instructions (rotation/prod-patch/perm-widen); sideways third worktree; full-dump evidence export.

## Sign-off

- [x] security owner (barrera) — binding verdict: Conditional (2026-09-16)
- [ ] engineering owner (vasquez) — skill file-shape/mechanics fit (`guards.md` slots into `skills/git-worktree/references/`)
- [ ] automation owner — sandbox TTL + deletion owner co-sign + serialized-setup mutex
- [ ] orchestrator — waiver authority only (CLOSED on security findings never ships without recorded waiver)
