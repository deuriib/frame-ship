# Proposed Changes: security specialist (barrera lens, security owner)

**Spec Reference:** SPEC-git-worktree-security (`docs/specs/20_backlog/SPEC-git-worktree-security.md#REQ-SEC-001..008`)
**Agent:** security specialist (security owner lens — barrera)
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent)
**Domains-Touched:** security
**Packet DOMAINS (carried forward):** [engineering, automation/ops, security, people] — this proposal owns the security slice only; complements sibling engineering mechanics, never duplicates.

## Summary

Propose the deny-by-default security controls for parallel worktrees (max 2): a new `guards.md` boundary/gate policy, a fail-closed `.worktrees/` ignore gate, and PII/export/fallback rules under Ley 172-13 minimization. No implementation files are modified in this phase; `review-security` (STRIDE) follows before any `execute-spec`.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/git-worktree/references/guards.md` | document-create | New policy file: trust-boundary table, fail-closed `git check-ignore` gate, least-privilege per worktree, PII checkpoints, submodule guard, `Temp\opencode` sandbox fallback with TTL owner, scoped-export allowlist, no-freelance-fixes clause (covers REQ-SEC-001..008; complements sibling `SPEC-git-worktree-engineering.md` REQ-002/006/008, duplicates nothing). |
| `.gitignore` | config-update | Append `.worktrees/` entry (trailing slash; root-anchored `/.worktrees/` only if repo convention adopts it — gate confirms `git check-ignore` green either way). Gate: `git check-ignore -q .worktrees` must succeed before the first `git worktree add`; nonzero exit or missing entry = STOP, no override (REQ-SEC-002). Current state: entry absent (verified 2026-09-16), so the gate correctly fails closed today. |
| trust-boundary map (`guards.md` § Boundary Table) | policy-update | Canonical 4-row table — worktree path / prompt packet / log-transcript line / gate evidence → checkpoint → mask-or-refuse rule → owner (security owner), deny-default stated; missing row = gate finding (REQ-SEC-001; enforced by AC-SEC-001). |
| PII-checkpoint + scoped-export policy (`guards.md` § PII & Evidence) | policy-update | Mask/tokenize at every port/adapter/event/log/prompt checkpoint; secrets/tokens/credentials/sessions never in code/config/logs/examples/events; gate evidence exports allowlisted paths only (command logs, `git worktree list` snapshots, redacted excerpts) — never full dumps or raw PII; every PII store declares purpose + TTL + deletion, expired data purged post-snapshot (REQ-SEC-004, REQ-SEC-007; Ley 172-13 minimization). |
| least-privilege + submodule/sandbox/no-fix guards (`guards.md` § Guards) | policy-update | Per-worktree minimum scope (own branch, own `<spec-id>` dir, no shared credentials, no cross-worktree access; violations = recorded findings with owner); submodule `add` hits refuse-or-pinned-verify guard (unpinned/recursive refused without security-owner exception); repo-local refusal falls back to `Temp\opencode` sandbox only with declared purpose + TTL + deletion owner, never silently permanent; zero key-rotation / prod-patch / perm-widen instructions — violations route to orchestrator + montilla (REQ-SEC-003, REQ-SEC-005, REQ-SEC-006, REQ-SEC-008). |

Change types per `propose-changes` contract: engineering `file-*` rows are out of scope here (sibling engineering proposal owns skill mechanics); this proposal uses `document-create / policy-update / config-update` only.

## Rationale

- REQ-SEC-001 → boundary table makes every new path/port/log/prompt a declared deny-default checkpoint with an owner; AC-SEC-001 verifiable by section path.
- REQ-SEC-002 → the `.gitignore` entry + `check-ignore` probe is the single fail-closed gate before any checkout; the absent-entry state observed today proves the gate trips rather than passes silently.
- REQ-SEC-003 → least-privilege scoping bounds the 2-lane blast radius to one branch/dir per SPEC; shared-credential copies become High findings, not silent conveniences.
- REQ-SEC-004/007 → PII checkpoints plus an export allowlist satisfy Ley 172-13 minimization end-to-end (source → store → log → third party) and keep gate packets reference-only.
- REQ-SEC-005/006 → submodule and sandbox guards force explicit decisions (refuse, pinned verify, or TTL-bound fallback) instead of implicit checkouts in unvetted locations.
- REQ-SEC-008 → the no-freelance-fixes clause keeps this policy non-operational: it reports severity + location and routes to the owning remediator; it never rotates, patches, or widens.
- Complement-not-duplicate: mechanics (pwsh flow, lifecycle, `mise` baseline) stay with the sibling engineering spec; TTL disposal is co-signed with automation; announce wording with people — via Cross-domain request to orchestrator, not unilateral edits.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Allowlist worktree contents in git instead of ignoring `.worktrees/` | Inverts fail-closed posture; any allowlist gap silently tracks worktree state — rejected per deny-default (guardrail 1). |
| Shared-credential helper copied into each worktree for speed | Creates cross-tenant secret spread across lanes; violates least-privilege and Ley 172-13 minimization — rejected, recorded as High finding pattern instead. |
| Permissive submodule checkout with post-hoc scan | Checkout precedes control; unpinned/recursive submodules execute before any scan runs — rejected in favor of refuse-or-pinned-verify before checkout. |
| Permanent sandbox root outside repo-local default | Fallback silently becomes permanent infra with no TTL owner — rejected; `Temp\opencode` only, TTL-bound, orchestrator-confirmed. |
| Full-transcript gate evidence for "completeness" | Exports raw PII/secrets into shares and lessons — rejected per scoped-export allowlist (guardrail 8). |

## Approval Required From

- [ ] Owning domain owner: security owner (barrera) — MANDATORY for this security proposal (self-approval prohibited: a second security-owner read or orchestrator-confirmed reviewer signs).
- [ ] engineering owner (skill file-shape/mechanics complement — `guards.md` must slot into `skills/git-worktree/references/` without breaking REQ-001/§5 resolution).
- [ ] automation owner (co-sign: sandbox TTL + deletion owner for `Temp\opencode` fallback).
- [ ] security owner re-confirm at `review-security` (STRIDE verdict over REQ-SEC-001..008 before `execute-spec`).
- [ ] orchestrator + montilla (any waiver: CLOSED gate on security findings never ships without recorded waiver; `execution_mode` override only with waiver).

> **Rule:** No repository file modifications during proposal phase. Only this proposal file is produced; impl files stay untouched.

---

# Risk Assessment: SPEC-git-worktree-security

**Proposer:** security specialist (barrera lens)
**Date:** 2026-09-16
**Domains-Touched:** security

## Risk Matrix

| ID | Risk | Likelihood | Impact | Severity | Mitigation |
|----|------|-----------|--------|----------|------------|
| R-001 | `.worktrees/` content committed (missing ignore entry + skipped `check-ignore`) | Med (entry absent today; human skip possible) | High (worktree state, paths, possibly secrets enter history) | High | Fail-closed gate: `check-ignore` green required before first add; nonzero = STOP, no override; gate evidence requires check-ignore log + drill log (AC-SEC-002). |
| R-002 | Secret/PII leaks via worktree paths, logs, prompts, or gate evidence | Med (2 lanes double the surface) | High (Ley 172-13 exposure; credential compromise) | High | PII checkpoints with mask/tokenize; `rg`/`Select-String` scan must show zero hits with rescan proof; allowlisted evidence excerpts only; findings with proof surface same session with severity + evidence + owner (AC-SEC-004/007). |
| R-003 | Cross-worktree credential sharing or scope creep (shared files, widened perms) | Med | Med (tenant/lane contamination; unattributable evidence) | Medium | Least-privilege clause: own branch/dir, no shared credentials, no cross-worktree access; shared-secret copy = High finding with owner; `git worktree list` count ≤ 2 snapshot in evidence (AC-SEC-003). |
| R-004 | Malicious/unpinned submodule executes on checkout | Low (conditional on submodule-bearing repos) | High (code execution pre-review) | Medium | Refuse-or-pinned-verify guard before checkout; unpinned/recursive refused without recorded security-owner exception; drill log in evidence (AC-SEC-005). |
| R-005 | Sandbox fallback becomes permanent or lands outside `Temp\opencode` | Low | Med (unowned lived data; retention breach) | Medium | Fallback requires declared purpose + TTL + deletion owner; cleanup via `git worktree remove` with removal log; off-sandbox location = finding (AC-SEC-006). |
| R-006 | Proposal itself instructs freelance fixes (rotation/patch/perm-widen) | Low | High (prod incident; privilege escalation) | Medium | No-freelance-fixes clause; `rg` scan for rotate/patch/chmod-equivalents in gate; violations route to orchestrator per Cross-domain request (AC-SEC-008). |

Severity per guardrails 9–11: Critical/High surface same session with severity + evidence + owner; Med/Low ride the gate. Residual risk (if APPROVE with conditions): R-004/R-005 conditional paths remain until drill logs exist — carried as gate conditions with security owner as risk owner; no silent PASS.

## Blast Radius

- **Systems:** repo-local `.worktrees/<spec-id>` lanes (max 2), `.gitignore`, `skills/git-worktree/references/guards.md`; toolchain probes only (`git check-ignore`, `git worktree list`, `rg`/`Select-String`) — no runtime (`.opencode/plugins/frame-ship.ts`), no chain order, no catalogue changes. Failure mode is contained to scratch lanes; `main` stays clean and committable.
- **Teams:** security (owner of this slice), engineering (skill-shape complement), automation/ops (TTL co-sign), people (announce wording adjacent) — coordinated via orchestrator Cross-domain requests; no unilateral cross-domain edits.
- **Customers:** none directly (internal isolation control); indirect benefit is reduced leakage/contamination risk in parallel delivery.
- **Regulators:** Ley 172-13 (Dominican data protection) — minimization, checkpoint masking, purpose + TTL + deletion, and scoped exports are the compliance surface; a PII leak via logs/evidence is the primary regulatory exposure.
- **Revenue:** no direct pipeline/quota impact; indirect cost is rework and gate re-runs if the ignore gate or scans fail — bounded by proposal-before-code (failure caught before implementation spend).

## Rollback Plan

- **Proposal phase (now):** revert = delete this scratch file (`docs/specs/40_workspace/barrera/PROPOSED_CHANGES-git-worktree-security.md`); zero impl files touched, zero external sends made — nothing else to undo. Owner: security specialist; ETA: immediate.
- **Post-execution (if approved and executed):** revert = (1) remove `skills/git-worktree/references/guards.md` security sections via follow-up proposal, (2) revert the single `.gitignore` line, (3) `git worktree remove .worktrees/<spec-id> --force` + `prune`, verified by `git worktree list`. Owner: security owner + engineering owner; ETA: one session batch. No prod data, no keys, no perms are touched by rollback — owner remediates any live findings separately.

## Security Considerations

- **Auth:** no new principals or credentials; per-worktree scope forbids shared-credential copies; any shared-secret copy is a High finding with owner assigned. No authN/Z changes proposed.
- **Data exposure:** deny-default at all four boundary classes (path, prompt packet, log line, gate evidence); reference-only packets — full bodies never cross lanes; exports allowlisted (command logs, `list` snapshots, redacted excerpts).
- **Input validation:** `git check-ignore` exit code + `.gitignore` entry presence are the validated inputs before any `add`; submodule shape (pinned vs unpinned/recursive) validated before checkout; finding without proof (diff/scan/log) is REFUTED.
- **PII (Ley 172-13):** minimization — minimum PII in paths/logs/evidence; flow mapped source → store → log → third party in the checkpoint table; every PII store declares purpose + TTL + deletion; expired data purged post-snapshot; PASS exports carry allowlisted evidence only.

## Domain Considerations

- **Security (touched, owned):** this proposal + STRIDE review + gate sign-off all owned by security owner (barrera); CLOSED on findings without waiver blocks handoff.
- **Engineering (adjacent, not edited):** skill mechanics, pwsh flow, and `mise` baseline stay with the sibling engineering spec/proposal; this proposal only constrains them (complement, never duplicate). Engineering owner approves the file-shape fit.
- **Automation/ops (adjacent, not edited):** sandbox TTL + deletion ownership co-signed by automation owner; orchestrator confirms the brief Open Question on sandbox TTL.
- **People (adjacent, not edited):** consent/announce wording owned by people spec; guard/refusal messages must use people-owner readable wording — requested via Cross-domain request, not written here.
- **Finance / legal / marketing / revenue:** untouched — deleted per template (no budget, filing, campaign, or pipeline rows proposed). Non-code undo needs none: no external sends, filings, or launches in this phase.
