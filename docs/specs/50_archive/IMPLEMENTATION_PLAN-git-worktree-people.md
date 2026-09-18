# Implementation Plan: SPEC-git-worktree-people

**Agent:** santana (people specialist, people owner lens)
**Date:** 2026-09-16
**Approved By:** ARCH Approved via `docs/specs/10_design/ARCHITECTURE-git-worktree.md` (INV-008/INV-009); SEC Conditional C-006 (`docs/specs/40_workspace/barrera/SECURITY_REVIEW-git-worktree.md` S-006 — scoped excerpts only, exactly-once count in 2-SPEC dry run)
**Domains-Touched:** people (sibling lanes: engineering, automation/ops, security — by reference only)
**Spec Reference:** `docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005`
**Proposal Reference:** `docs/specs/40_workspace/santana/PROPOSED_CHANGES-git-worktree-people.md` (approved)
**Execution Mode:** multi-subagents (frozen at frame-intent; max 2 parallel)
**Packet:** SPEC:`docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005` / HARD:`execution_mode=multi-subagents, consent-before-create + uniform announce, single writer (people lane owns ONLY announce-template.md + plan/matrix), reference-only, no external sends` / GATE:`arch-Approved, sec-Conditional C-006` / DOMAINS:`[engineering, automation/ops, security, people]`

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | CREATE uniform announce template (create + remove + ES/EN consent + refusal script + fatigue guard + brief-back line), SPEC §4 verbatim | `skills/git-worktree/references/announce-template.md` | this plan + TEST_MATRIX E-002..E-004 | 0.5h |
| 2 | Byte-uniformity self-check: `rg` diff of create/remove lines shows only slot values differ; slot order donde+rama+porque+limpieza | `skills/git-worktree/references/announce-template.md` vs SPEC §4 | TEST_MATRIX E-002 | 0.2h |
| 3 | PII/secret hygiene self-check: slots carry no secrets/PII; no transcript content pasted into files (paths only) | all 3 lane files | TEST_MATRIX E-001..E-005 + C-006 note | 0.2h |
| 4 | WRITE implementation plan (this file) | `docs/specs/40_workspace/santana/IMPLEMENTATION_PLAN-git-worktree-people.md` | quality-gate packet | 0.3h |
| 5 | WRITE test/evidence matrix REQ-PPL-001..005 → E-001..E-005 with C-006 excerpt-path + exactly-once count slots | `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md` | quality-gate packet | 0.3h |
| 6 | Domain checks: people owner sign-off shape (`people-review.md` lens), no-PII attestation, uniform-wording attestation | lane files (review only, no edits outside scope) | TEST_MATRIX Coverage Summary | 0.2h |

Path note: proposal §Changes listed `docs/specs/40_workspace/santana/announce-template-git-worktree.md` as a document-create; orchestrator packet overrides with canonical `skills/git-worktree/references/announce-template.md` (the path `worktree-lifecycle.md` §1/§3 consumes by reference and `SKILL.md` §3 reserves for the people lane). This plan implements the packet path; no file created at the proposal draft path.

## Order of Operations

Template first (step 1) because uniformity + refusal + C-006 wording is the deliverable everything else traces to; self-checks (steps 2–3) immediately after while the text is fresh; plan/matrix writes (steps 4–5) last so they describe what actually landed, not what was intended. No dependency on sibling lanes (engineering/automation/security mechanics consumed by reference only); cross-domain DX feedback — if any — rides a formal Cross-domain request to the orchestrator per REQ-PPL-005, never a sideways edit.

## Rollback Points

Wording-only surface, fully reversible: delete `skills/git-worktree/references/announce-template.md` (single file, no code/infra touched); retract plan/matrix scratch files in `40_workspace/santana/`; operators fall back to prior manual consent phrasing until a revised template is approved. No worktree state to clean (no `git worktree add` executed in this lane). ETA < 5 min. If a filed Cross-domain brief exists, notify orchestrator of withdrawal in the same thread.

## Quality Gates

Domain checks (people lane; non-touched deleted per template):

- [ ] People: people owner impact/change-plan sign-off — uniform warm tone, exactly-once fatigue guard, readable refusal; gate lens `skills/quality-gate/references/domains/people-review.md` at quality-gate
- [ ] C-006 carried: scoped excerpts only (paths, no PII/full dumps); exactly-once count verified in 2-SPEC dry run (count recorded in TEST_MATRIX, orchestrator aggregates across lanes)
- [ ] Uniform wording: byte-uniform with SPEC §4 modulo slots; per-owner variants forbidden without people-owner + orchestrator waiver
- [ ] No-PII attestation: lane files contain zero secrets/PII (slots + template prose only)
