# Requirements Index: Git-Worktree Isolation (Engineering)

**Owner:** vasquez — engineering owner
**Brief Reference:** BRIEF-git-worktree
**Domains-Touched:** [engineering] (full initiative: engineering, automation/ops, security, people)
**Spec:** docs/specs/20_backlog/SPEC-git-worktree-engineering.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..008 + REQ-NF-001..003) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Supporting skill file `skills/git-worktree/SKILL.md` with exact frontmatter (`name: git-worktree`, 1-sentence `description` with `Use when`/`Triggered by`, no extra keys) and body shape (`# Title — Sub` + creed + `1.Purpose/2.Chain/2b.Role/3.Process/4.Won't do/5.References`) | P0 | BRIEF-git-worktree (Scope), skills/AGENTS.md conventions | SPEC-git-worktree-engineering | engineering | review + file listing + frontmatter dump |
| REQ-002 | Directory contract: default repo-local `.worktrees/<spec-id>`; `git check-ignore -q .worktrees` fail-closed before first `git worktree add`; `.gitignore` contains `.worktrees/` entry, never commit worktree contents | P0 | BRIEF-git-worktree (Scope, Desired Outcome.3) | SPEC-git-worktree-engineering | engineering | test (`check-ignore` log + `git status` snapshot) |
| REQ-003 | win32/pwsh-native flows: no POSIX `$(...)`, `Resolve-Path`-safe joins, clean-baseline check via `git status --porcelain`, max 2 parallel worktrees per frozen `execution_mode` | P0 | BRIEF-git-worktree (Scope, Desired Outcome.4) | SPEC-git-worktree-engineering | engineering | test (`rg` scan log + `git worktree list` snapshot) |
| REQ-004 | Per-worktree setup reuses `mise.toml` toolchain (`mise run typecheck` baseline gate), serialized setup to avoid lock flake; baseline green before implementation | P0 | BRIEF-git-worktree (Scope) | SPEC-git-worktree-engineering | engineering | test (per-worktree typecheck logs) |
| REQ-005 | Consent-before-create plus warm announce line (dónde + rama + por qué + limpieza) with uniform wording on every creation | P0 | BRIEF-git-worktree (Scope, Constraints) | SPEC-git-worktree-engineering | engineering | attestation (transcript excerpts) |
| REQ-006 | Lifecycle create → verify → remove: clean-baseline verify, dirty-baseline refuse/override, submodule guard, sandbox fallback (`Temp\opencode` only when repo-local refused) | P0 | BRIEF-git-worktree (Scope) | SPEC-git-worktree-engineering | engineering | test (drill logs) |
| REQ-007 | Chain/runtime invariants: no chain-order change, no new stage, no edit to `.opencode/plugins/frame-ship.ts` (single-file zero-dep), no 8-domain catalogue change | P0 | BRIEF-git-worktree (Out of Scope) | SPEC-git-worktree-engineering | engineering | review (`git diff --stat` in gate) |
| REQ-008 | Proposal-before-code and reference-only `SPEC/HARD/GATE/DOMAINS` packets ride into every worktree — no cross-worktree pasting, no phantom state | P0 | BRIEF-git-worktree (Desired Outcome.2) | SPEC-git-worktree-engineering | engineering | review (prompt packet sample) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/tokens/credentials/PII in skill files, paths, logs, examples, or gate evidence (Ley 172-13 minimization) | Security / Privacy | Secret/PII scan over `skills/git-worktree/**` + spec = 0 findings |
| REQ-NF-002 | Plugin stays single-file zero-dep; `tsc --noEmit` green after any touched file | Engineering | `mise run typecheck` exit 0 in `main` and each worktree |
| REQ-NF-003 | `main` stays clean and committable throughout parallel runs; failed setup restores via remove + prune | Operability | `git status --porcelain` empty on `main`; post-cleanup `git worktree list` clean |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Skill file shape + pwsh command contracts + `.gitignore` contract per SPEC §4; branch-per-SPEC convention; promotion rule proposal for `40_workspace/<owner>/` → lifecycle | vasquez |
| automation/ops | Serialized `mise` setup, baseline `typecheck` gate, max-2 discipline, cleanup TTL — consumed from automation spec, mechanics confirmed here | automation owner + engineering owner |
| security | `.gitignore` fail-closed gate + trust-boundary map + submodule/sandbox guards — security-owner review required before gate PASS | barrera |
| people | Consent + uniform announce wording — people-owner wording consumed verbatim, no per-owner variants | santana |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Skill shape | `skills/git-worktree/SKILL.md` + `references/*.md` | REQ-001, REQ-NF-001 |
| Ignore gate | `.gitignore` (`.worktrees/`), check-ignore log | REQ-002, REQ-NF-001 |
| pwsh flow + baseline | `references/pwsh-flow.md`, `references/worktree-lifecycle.md`, `mise.toml` | REQ-003, REQ-004, REQ-NF-002, REQ-NF-003 |
| Consent/lifecycle | session transcripts, drill logs, `references/guards.md` | REQ-005, REQ-006 |
| Invariants/packets | `git diff --stat`, prompt packet samples, `ARCHITECTURE-git-worktree.md` INV-001..009 | REQ-007, REQ-008 |
