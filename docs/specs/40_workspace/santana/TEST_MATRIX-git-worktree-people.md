# Test / Evidence Matrix: SPEC-git-worktree-people

**Agent:** santana (people specialist, people owner lens)
**Date:** 2026-09-16
**Domains-Touched:** people (sibling lanes by reference: engineering, automation/ops, security)
**Spec Reference:** `docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005`
**Proposal Reference:** `docs/specs/40_workspace/santana/PROPOSED_CHANGES-git-worktree-people.md`
**Approvals:** ARCH Approved (`ARCHITECTURE-git-worktree.md` INV-008/INV-009); SEC Conditional C-006 (S-006: scoped excerpts only, exactly-once count in 2-SPEC dry run)
**Execution Mode:** multi-subagents

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-PPL-001 | E-001 | Consent-before-create contract in template: prompt → recorded answer → then `add`; silent/auto forbidden. Evidence: template §1 (`skills/git-worktree/references/announce-template.md`); transcript excerpt paths (scoped, slots only) recorded at dry run — no transcript body pasted here | Review | pass | n/a (no commit per packet) |
| REQ-PPL-002 | E-002 | Uniform announce (donde+rama+porque+limpieza, slot-only variance). Evidence: template §1/§2 verbatim vs SPEC §4; `rg` uniformity check at dry run shows only slot values differ | Review | pass | n/a |
| REQ-PPL-003 | E-003 | Readable dirty-baseline refusal (cause + `<n> archivos` + 3 options: stash/commit/recorded override); blocks `add` until `override: <who> <timestamp> <reason>` recorded. Evidence: template §3; drill log + override record paths at dry run | Review | pass | n/a |
| REQ-PPL-004 | E-004 | Change-fatigue guard: exactly-once per create/remove, byte-uniform, zero mid-session re-prompts. Evidence: template §4; 2-SPEC dry-run announcement count (expect 2 create + ≤2 remove) | Review | pass | n/a |
| REQ-PPL-005 | E-005 | Cross-domain brief-back rides orchestrator (formal brief, never sideways). Evidence: template §5 brief-back line; brief path or "none needed" statement at handoff | Sign-off | pass | n/a |

Types per `execute-spec` matrix: non-code REQs use Review/Sign-off with artifact path — REQ-ID trace mandatory.

## C-006 Condition (SEC Conditional, S-006) — carried, not closed here

- Scoped excerpts only: transcript evidence = excerpt paths + redacted slot values (e.g. `<spec-id>`/`<branch>`); full dumps refused per `guards.md` §7 allowlist. No PII/secrets in lane files (slots + template prose only).
- Exactly-once count: verified in orchestrator-aggregated 2-SPEC dry run; this lane contributes its create/remove announce count (expect 1+≤1 per lane) to the matrix count row. Gate closes C-006 on the aggregated count + excerpt-path list.
- Transcript excerpt paths (slots to fill at dry run, paths only — no bodies): `session transcript excerpt: <path-or-session-ref> (create consent Q+A)`; `removal announce excerpt: <path-or-session-ref>`; `dirty-baseline drill log: <path-or-session-ref>`; `override record (if any): override: <who> <timestamp> <reason>`.

## Coverage Summary

- Unit coverage: N/A (non-code, wording/workflow surface — justification: no executable code in people lane)
- Integration coverage: N/A (same justification)
- Evidence coverage: 5/5 REQ-IDs with linked artifact (template sections + dry-run count/excerpt slots)
- Acceptance criteria covered: 5/5 (AC-001 via E-001, AC-002 via E-002, AC-003 via E-003, AC-004 via E-004, AC-005 via E-005)

## Domain Checks (people lane)

- [x] People owner sign-off shape ready: team impact (one prompt + one line per create/remove), culture alignment (warm uniform tone, blame-free refusal), change plan (fatigue guard itself) — verdict at quality-gate via `people-review.md`
- [x] No PII in lane files (attestation: template slots + prose only, zero secrets/credentials/sessions)
- [x] Uniform wording attestation: template matches SPEC §4 verbatim modulo slots; slot order donde+rama+porque+limpieza holds in ES + EN lines
