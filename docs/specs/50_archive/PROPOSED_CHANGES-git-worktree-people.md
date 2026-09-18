# Proposed Changes: people specialist (santana people owner lens)

**Spec Reference:** SPEC-git-worktree-people (REQ-PPL-001..005)
**Agent:** santana (people specialist, people owner lens)
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent)
**Domains-Touched:** people

## Summary

People-side contract for git-worktree isolation: consent-before-create plus one warm uniform announce per create/remove, a human-readable dirty-baseline refusal script, and a change-fatigue guard (exactly-once, byte-uniform, no mid-session re-prompts). DX feedback on sibling guard/fallback wording rides a formal Cross-domain request to the orchestrator — no sideways edits. Proposal only; no implementation changes, no external sends.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/santana/announce-template-git-worktree.md` | document-create | Uniform announce template (create + remove) adopting SPEC §4 verbatim: create line `dónde + rama + por qué + limpieza + ¿Procedo? [sí/no]`; remove line `dónde + rama + limpieza + git worktree list verify`; slots `<donde>/<rama>/<porque>/<limpieza>` only; per-owner tone variants forbidden without people-owner + orchestrator waiver (REQ-PPL-002, AC-002) |
| `workflows/worktree-consent.md` | workflow-update | Consent-before-create workflow: prompt → recorded human answer (transcript line ref) → only then `git worktree add`; silent/auto creation forbidden; explicit override contract (`override: <who> <timestamp> <reason>` recorded before proceeding) (REQ-PPL-001, REQ-PPL-003-override, AC-001, AC-003) |
| `workflows/worktree-dx-guards.md` | workflow-update | Dirty-baseline DX + change-fatigue guard: refusal script adopting SPEC §4 verbatim (cause + `<n> archivos` + 3 options: stash / commit / explicit override, plain language, never raw git dump); announce fires exactly once per create and once per remove; wording byte-uniform with template; zero repeat consent prompts within same live worktree session; 2-SPEC parallel dry run shows exactly 2 create + ≤2 remove announces (REQ-PPL-003, REQ-PPL-004, AC-003, AC-004) |

Change types per `skills/propose-changes/references/proposal-template.md`: non-engineering rows use `document-create` / `workflow-update`; no `file-*` rows — worktree mechanics stay in sibling engineering SPEC.

## Rationale

- REQ-PPL-001 (consent-before-create) → `workflows/worktree-consent.md` update: prompt-answer-record gate before any `git worktree add` satisfies AC-001 (transcript Q+A per creation, zero silent creations).
- REQ-PPL-002 (uniform announce) → `announce-template-git-worktree.md` create: fixed order dónde + rama + por qué + limpieza with slot-only variance satisfies AC-002 (`rg` diff shows only slot values differ).
- REQ-PPL-003 (readable refusal) → `workflows/worktree-dx-guards.md` update (refusal half): cause + 3 options in plain language (ES acceptable), blocks `add` until recorded override, satisfies AC-003 (drill log + override record).
- REQ-PPL-004 (fatigue guard) → `workflows/worktree-dx-guards.md` update (fatigue half): exactly-once announce, byte-uniform wording, no mid-session re-prompts, satisfies AC-004 (announcement count in test matrix).
- REQ-PPL-005 (brief-back via orchestrator) → process rule, no target row: any wording-change request or DX feedback on submodule-guard / sandbox-fallback messaging is filed as a Cross-domain request brief to the orchestrator, never as a direct edit to sibling specs; satisfies AC-005 (brief-back path or none-needed statement in handoff).
- Complements (not duplicates) sibling `SPEC-git-worktree-engineering.md` (file shape, pwsh flow, ignore gates) and links `ARCHITECTURE-git-worktree.md` INV-008/INV-009 unchanged.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Per-owner announce tone variants (each dispatcher writes own wording) | Rejected: creates change fatigue and trust erosion via inconsistent wording; SPEC answers brief Open Question with uniform-template default; variants allowed only via people-owner + orchestrator waiver |
| Auto-create worktrees with post-hoc notification (consent after the fact) | Rejected: violates consent-before-create (REQ-PPL-001) and HARD constraint; surprise directory creation erodes trust; transcript must show prompt preceding `git worktree add` |
| Raw `git status --porcelain` dump as refusal message | Rejected: cryptic for humans, violates REQ-PPL-003 readability contract; plain-language cause + options required |
| Consent re-prompt before every setup command inside live worktree | Rejected: violates REQ-PPL-004 fatigue guard; exactly-once per create/remove with no mid-session re-prompts |

## Approval Required From

- [ ] Owning domain owner: people owner (santana) — **mandatory**
- [ ] Orchestrator — waiver authority only (per-owner tone variants, REQ-PPL-002 exception path; Cross-domain request receiver per REQ-PPL-005)
- [ ] engineering owner — N/A (no mechanics change; consulted only if Cross-domain DX feedback touches sibling engineering SPEC)
- [ ] security owner — N/A (no auth/data/API/PII surface; consulted only if Cross-domain feedback touches guard/fallback PII hygiene)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

---

# Risk Assessment: SPEC-git-worktree-people

**Proposer:** santana (people specialist, people owner lens)
**Date:** 2026-09-16
**Domains-Touched:** people

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-PPL-001 | Change fatigue from parallel isolation (extra prompts/lines per worktree) erodes adoption | Med | Med | Exactly-once announce per create/remove; zero mid-session re-prompts (REQ-PPL-004); dry-run count evidence (AC-004) |
| R-PPL-002 | Inconsistent wording if operators improvise announce/refusal phrasing | Med | Med | Byte-uniform template, slot-only variance, `rg` uniformity check (AC-002); waiver-only exception path |
| R-PPL-003 | Surprise directory creation (silent/auto add) breaks trust | Low | High | Consent-before-create gate with transcript Q+A evidence; silent creation forbidden (AC-001) |
| R-PPL-004 | Cryptic dirty-baseline block loses human work or stalls session | Med | High | Plain-language refusal script (cause + 3 options); override only on explicit recorded confirmation (AC-003) |
| R-PPL-005 | Sideways wording negotiation with engineering/automation/security bypasses orchestrator | Low | Med | REQ-PPL-005: all DX feedback rides formal Cross-domain request to orchestrator; evidence is brief-back path or none-needed statement |

## Blast Radius

People (team/culture) only. If this change fails: team faces confusing or inconsistent worktree messaging, surprise directories, or blocked sessions with cryptic errors — culture impact is trust erosion and resistance to `multi-subagents` isolation habit. No systems/services/data, customer, regulator, revenue, or runbook/capacity blast radius — those belong to sibling engineering / automation-ops / security specs. Failure mode is reversible (wording + workflow, no code or infra).

## Rollback Plan

Retract comms, no code revert needed (proposal phase; wording-only surface):
1. People owner (santana) issues one correction notice in-session retracting the announce/refusal wording (owner: santana, ETA: same session).
2. Operators fall back to previous session habit (manual consent phrasing) until revised template is approved; no worktree state to clean (no impl files touched).
3. If a Cross-domain brief was filed, orchestrator is notified of withdrawal in the same thread (owner: orchestrator, ETA: same session).

## Security Considerations

No auth/data/external-API/PII surface in this proposal. Announce/refusal slots (`<donde>/<rama>/<porque>/<limpieza>`, `<n> archivos`) carry no secrets or PII; transcript excerpts used as evidence must be scoped (paths + excerpts only, no full dumps). Security owner to confirm only if Cross-domain DX feedback touches guard/fallback PII hygiene — otherwise N/A.

## Domain Considerations

People (people owner — santana): workload minimal (one prompt + one line per create/remove, no new roles or training plan beyond the habit); culture guarded by warm uniform tone (dónde + rama + por qué + limpieza) and plain-language refusal that never blames the human; change plan is the fatigue guard itself (exactly-once, byte-uniform, no re-prompts) plus gate lens `skills/quality-gate/references/domains/people-review.md` (team impact, culture alignment, change plan) at quality-gate. Non-touched domains (finance, legal, marketing/brand, revenue, automation/ops, engineering, security) deleted per template — cross-domain needs ride REQ-PPL-005 brief-back, not direct edits.
