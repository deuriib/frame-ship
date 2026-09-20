# Release Notes: Multi-subagents por defecto — Engineering Lane Mechanics

**Date:** 2026-09-20
**Release Manager:** vasquez (engineering owner) / orchestrator
**Specs Included:** SPEC-multi-default-engineering
**Domains-Touched:** [engineering] (ratified by security & people)
**Ship Type:** policy-enable (skill-text behavior change, process normalization, zero deploy)

## Highlights

- **Single Natural Process:** Complete removal (remoción total) of the `single | multi-subagents` dual-track across the Frame→Ship chain skills, templates, and contracts. `multi-subagents` is now the single natural operational methodology.
- **Sequential Degradation Contract:** Defined uniform degradation for harnesses lacking subagent dispatch (`task`). Lanes run sequentially in the same thread under the exact same contract, same packets, and same reviewers with no silent downgrade.
- **Unified Full-Wave Quality Gate:** Eliminated min-gate paths; all specs execute a full-wave quality gate with adversarial `review-refuter` prior to `qa`.
- **ADR-008 Recorded:** Formalized architectural decision in `docs/specs/10_design/ADR-008-multi-default.md`.

## Changes

### Features

- `skills/translate-to-spec/SKILL.md §3`: Rewritten to multi-only with W-MULTI and W-SEQ verbatim; `references/spec-template.md` Execution_Mode updated to multi-only (REQ-001, commit `a282881`).
- `skills/execute-spec/SKILL.md §3`: Mode-confirm and dispatch rewritten to multi-only with W-MULTI and W-SEQ; singleton lines unchanged (REQ-002, commit `35f83be`).
- `skills/quality-gate/SKILL.md §3`: Min-gate path removed; full-wave routing table + adversarial `review-refuter` before `qa` instituted; `references/gate-report.md` load-evidence updated (REQ-003, commit `7beb7cd`).
- `skills/propose-changes/references/proposal-template.md` & `skills/verify-handoff/references/dod-checklist.md`: Execution mode declarations aligned to multi-only (REQ-004, commit `3484ce5`).
- `skills/git-worktree/SKILL.md §3` & `skills/AGENTS.md`: Parallel lanes established as standard norm; contract frozen-mode lines updated; non-mode concurrency rules preserved (REQ-005/006, commit `5780887`).
- `docs/specs/10_design/ADR-008-multi-default.md`: Filed architectural decision record documenting total removal, degradation contract, CEO fast-path boundary, and git-revert rollback (REQ-007, commit `33717cd`).

### Domain Ships

- **Engineering:** 10 skill/template files updated + ADR-008 filed + plan & trace matrix complete (5/5 ACs, 9/9 REQs verified).
- **Security:** Text-only review verified clean; zero credentials, tokens, or PII (Ley 172-13 compliant).
- **People:** Ratified W-MULTI and W-SEQ verbatim cross-lane consistency (diff 0).

### Breaking Changes

- Deprecation and removal of the `single` execution mode option. Trivial reversible changes (<15 lines) are handled outside methodology as CEO fast-path (checkpoint-only).

## Known Issues

- None. 0 methodological-mode `single` hits remaining across all targeted surfaces (allowlisted idiomatic usages only).

## Rollback / Undo

- **Code revert:** `git revert` commits `a282881`, `35f83be`, `7beb7cd`, `3484ce5`, `5780887`, `33717cd`. ETA: < 15 min.
- **Owner:** vasquez (engineering owner).
