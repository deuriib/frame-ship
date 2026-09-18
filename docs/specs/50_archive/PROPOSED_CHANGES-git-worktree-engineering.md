# Proposed Changes: engineering specialist (vasquez lens)

**Spec Reference:** docs/specs/20_backlog/SPEC-git-worktree-engineering.md#REQ-001..008
**Architecture Reference:** docs/specs/10_design/ARCHITECTURE-git-worktree.md (INV-001..009)
**Requirements Reference:** docs/specs/15_requirements/REQ-git-worktree-engineering.md (REQ-001..008 + REQ-NF-001..003)
**Agent:** engineering specialist + vasquez (engineering owner) lens
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents
**Domains-Touched:** [engineering]

## Summary

Propose the supporting (non-stage) skill `skills/git-worktree/` — one `SKILL.md` plus three `references/*.md` files — implementing the pwsh-native create → verify → remove lifecycle for max-2 parallel worktrees under repo-local `.worktrees/<spec-id>`, with a fail-closed `git check-ignore` gate backed by a `.gitignore` entry. Chain order, plugin runtime (single-file zero-dep), and the 8-domain catalogue are untouched; proposal-before-code and reference-only `SPEC/HARD/GATE/DOMAINS` packets ride into every worktree.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/git-worktree/SKILL.md` | file-create | Supporting skill with exact frontmatter (`name: git-worktree`, 1-sentence `description` containing `Use when`/`Triggered by`, no extra keys) and body shape (`# Title — Sub` + creed quote + `1.Purpose/2.Chain/2b.Role/3.Process/4.Won't do/5.References`). Covers REQ-001, REQ-007 (supporting not a stage), REQ-008 (reference-only packets), REQ-NF-001 (no secrets/PII in examples). |
| `skills/git-worktree/references/worktree-lifecycle.md` | file-create | Canonical create → verify → remove sequence with branch-per-SPEC convention (`git worktree add .worktrees/<spec-id> -b <branch>` / `list` / `remove --force`), clean-baseline verify (`git status --porcelain`), consent + announce hook. Covers REQ-005, REQ-006, ARCH Data Flow. |
| `skills/git-worktree/references/pwsh-flow.md` | file-create | Win32-native flow: `Resolve-Path`-safe joins, zero POSIX `$(...)`, serialized `mise run typecheck` baseline gate (green before `execute-spec`), max-2 live-worktree discipline (`git worktree list` count guard). Covers REQ-003, REQ-004, REQ-NF-002, REQ-NF-003, INV-003, INV-007. |
| `skills/git-worktree/references/guards.md` | file-create | Fail-closed gates: `git check-ignore -q .worktrees` before first add (nonzero = STOP), dirty-baseline refuse/override path, submodule guard, sandbox fallback (`Temp\opencode` only when repo-local refused). Covers REQ-002, REQ-006, INV-002, INV-004. |
| `.gitignore` | config-update | Append `.worktrees/` entry (root-anchored `/.worktrees/` iff repo convention adopts it — gate confirms `git check-ignore` green either way) so no worktree content is ever tracked. Verified pre-add via `git check-ignore -q .worktrees`; `git status` on `main` shows zero tracked `.worktrees/` files. Covers REQ-002, INV-002. |

Change types per `skills/propose-changes/references/proposal-template.md`. No other files touched: zero lines in `.opencode/plugins/frame-ship.ts`, `skills/AGENTS.md` catalogue, or stage-order constants (REQ-007 / AC-007).

## Rationale

- REQ-001 → `SKILL.md` file-create gives the orchestrator a loadable `skill(git-worktree)` habit with repo-convention shape (AC-001: frontmatter dump + `§5 References` resolution in test matrix).
- REQ-002 → `.gitignore` config-update + `guards.md` check-ignore gate makes the ignore fail-closed before any `add` (AC-002: dry-run log + `git status` snapshot).
- REQ-003 → `pwsh-flow.md` bans POSIX substitution and pins `Resolve-Path`-safe joins plus the max-2 count guard (AC-003: `rg` scan + `git worktree list` snapshot).
- REQ-004 → `pwsh-flow.md` serializes `mise` setup and gates each worktree on `mise run typecheck` green (AC-004: per-worktree logs).
- REQ-005 → `worktree-lifecycle.md` pins consent-before-create plus the uniform dónde + rama + por qué + limpieza announce (AC-005: transcript excerpts; wording owned by people, consumed verbatim).
- REQ-006 → `worktree-lifecycle.md` + `guards.md` cover verify/remove, dirty-baseline refuse/override, submodule guard, sandbox fallback (AC-006: drill logs).
- REQ-007 → scope statement above plus `SKILL.md` §2 Chain Contract ("supporting, not a stage") holds INV-001/INV-005 (AC-007: `git diff --stat` in gate).
- REQ-008 → packet clause (`SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>`, never pasted bodies) rides every worktree prompt (AC-008: prompt sample; INV-006/INV-009).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Default worktree root in `Temp\opencode` instead of repo-local `.worktrees/` | Loses repo-local attribution and `check-ignore` single-gate simplicity; sandbox stays fallback-only per ARCH (decision owned by automation + security). |
| One shared worktree for all parallel SPECs (no branch-per-SPEC) | Reintroduces mixed-edit and lock-contention risk the spec exists to remove; breaks per-`<spec-id>` gate evidence attribution. |
| Root-anchored `/.worktrees/` decided here unilaterally | Repo convention call, not engineering fiat — proposal offers it, gate confirms `check-ignore` green either way per SPEC §4. |

## Approval Required From

- [ ] Owning domain owner: engineering owner (vasquez) — mandatory
- [ ] engineering owner (vasquez) — architecture/API/model/cross-cutting impact (skill shape + INV-001..009 contract surface)
- [ ] security owner (barrera) — trust-boundary map, `.gitignore` fail-closed gate, submodule/sandbox guards (downstream `review-security` before gate PASS)

> **Rule:** No repository file modifications during proposal phase. Impl files stay untouched — verified via `git status`.

---

# Risk Assessment: SPEC-git-worktree-engineering

**Proposer:** engineering specialist + vasquez (engineering owner) lens
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | `.worktrees/` content committed (missing/mis-scoped `.gitignore` entry) | Low | High | Fail-closed `git check-ignore -q .worktrees` before first `add`; AC-002 snapshot proves zero tracked files; gate re-checks diff stat |
| R-002 | POSIX `$(...)` or non-`Resolve-Path` joins break win32/pwsh flow | Med | Med | `rg` scan for `$(` in `skills/git-worktree/**` in test matrix; pwsh-only command contracts in `pwsh-flow.md` |
| R-003 | Parallel `mise` setup lock flake / red baseline handed to `execute-spec` | Med | Med | Serialized setup + per-worktree `mise run typecheck` green gate; no implementation starts on red baseline |
| R-004 | Worktree residue (orphaned entries after failed run, count > 2) | Med | Low | Terminal `remove --force` + `prune` + `git worktree list` residue check; cleanup TTL declared per worktree |
| R-005 | Dirty `main` baseline contaminates new worktree (mixed edits, unattributable evidence) | Med | High | `git status --porcelain` clean-baseline verify; REFUSE `add` unless explicit session-recorded override (INV-004) |
| R-006 | Full file bodies pasted across worktrees (phantom state, PII leak surface) | Low | High | Reference-only packet clause in `SKILL.md` + AC-008 prompt sample; Ley 172-13 minimization (REQ-NF-001) |
| R-007 | Chain-order drift (worktree skill mistaken for a stage; plugin/catalogue edit) | Low | High | INV-001/INV-005 + AC-007 `git diff --stat` scope guard (only `skills/git-worktree/**`, `docs/specs/**`, `.gitignore`) |

## Blast Radius

- **engineering (modified here):** services/data — new `skills/git-worktree/**` (4 files) + `.gitignore` entry. Failure mode: broken isolation habit or ignored-path leak; contained by check-ignore gate + diff-stat scope guard + typecheck baseline. Teams: orchestrator + specialists (max-2 lanes). No customer/regulator/revenue surface.
- **automation/ops (adjacent, not modified):** runbook mechanics (serialized `mise`, TTL + prune) consumed verbatim from automation spec — this proposal confirms the interface, changes nothing. Failure mode owned by automation spec; surfaced here as R-003/R-004 mitigations.
- **security (adjacent, not modified):** trust boundaries at worktree paths/ports/logs + `.gitignore` gate + submodule/sandbox guards reviewed downstream by barrera. Failure mode owned by security spec; surfaced here as R-001/R-006 mitigations. No freelance fixes.
- **people (adjacent, not modified):** consent + uniform announce wording consumed verbatim from people spec — no per-owner variants without waiver. Failure mode (confusing refusal) owned by people spec; lifecycle wording hooks included here only.

## Rollback Plan

- Code revert: `git worktree remove .worktrees/<spec-id> --force` for any live test worktree, then `git worktree prune` and confirm clean via `git worktree list`; revert `.gitignore` hunk (`git checkout -- .gitignore` pre-commit, or revert commit post-merge); delete `skills/git-worktree/` (`Remove-Item -Recurse -LiteralPath "skills/git-worktree"`); confirm `git status --porcelain` empty on `main` and `mise run typecheck` green.
- Owner: engineering owner (vasquez). ETA: within one session turn-batch; no prod, customer, or data effects — workspace-only revert.

## Security Considerations

- Deny-default: no secrets/tokens/credentials/sessions in skill files, paths, examples, logs, or gate evidence (finding without diff/scan/log proof = REFUTED).
- Trust boundaries at every new path/adapter/log line (worktree paths, `mise` output, gate shares) — boundary map confirmed by security owner downstream; mask/tokenize by default, allowlisted evidence only.
- `.gitignore` fail-closed gate (`check-ignore` nonzero = STOP) prevents worktree-content exfiltration via commit.
- Least privilege: worktree-scoped branches, no widened perms; no key rotation / prod patching (owner remediates; severity + location reported).
- Privacy (Ley 172-13): minimization per REQ-NF-001 — secret/PII scan over `skills/git-worktree/**` + spec must read 0 findings; no full dumps in shares.

## Domain Considerations

- **engineering (touched):** skill file shape + pwsh command contracts + `.gitignore` contract per SPEC §4; branch-per-SPEC convention; `40_workspace/<domain>/` promotion-rule proposal (workspace → lifecycle, never move scratch) deferred to gate per ARCH Open Questions. Residual risk after mitigations: Low — R-002/R-003 reduce to hygiene once `rg` scan + serialized typecheck logs are in the test matrix.
