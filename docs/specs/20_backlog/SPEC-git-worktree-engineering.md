# Spec: Git-Worktree Isolation (Engineering)

**ID:** SPEC-git-worktree-engineering
**Owner:** engineering owner (vasquez)
**Domains-Touched:** engineering
**Brief Reference:** BRIEF-git-worktree
**Status:** draft
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent; override only with orchestrator + montilla waiver)

## 1. Context

`multi-subagents` (max 2 parallel) has no isolated-workspace contract: parallel SPECs risk dirtying the current workspace (mixed edits, `node_modules`/lock contention, unattributable gate evidence). This spec defines the engineering mechanics for a supporting skill `skills/git-worktree/` so each parallel Task runs on a clean baseline without contaminating `main`. Chain order is unchanged — `git-worktree` is supporting, not a stage. Upstream `obra/superpowers:using-git-worktrees` is reference-only (no copy without license/attribution check).

## 2. Requirements

- REQ-001: Supporting skill file `skills/git-worktree/SKILL.md` exists with exact frontmatter (`name: git-worktree`, 1-sentence `description` containing `Use when`/`Triggered by`, no extra keys) and body shape (`# Title — Sub` + creed quote + `1.Purpose/2.Chain/2b.Role/3.Process/4.Won't do/5.References`).
- REQ-002: Directory contract defaults to repo-local `.worktrees/<spec-id>`; creation flow runs `git check-ignore -q .worktrees` (fail-closed) before the first `git worktree add`, and `.gitignore` contains a `.worktrees/` entry so no worktree content is ever committed.
- REQ-003: All flows are win32/pwsh-native: no POSIX `$(...)`, `Resolve-Path`-safe path joins, clean-baseline check via `git status --porcelain`, and max 2 parallel worktrees per frozen `execution_mode`.
- REQ-004: Per-worktree setup reuses `mise.toml` toolchain (`mise run typecheck` as baseline gate) with serialized setup to avoid lock flake; baseline must be green before implementation starts.
- REQ-005: Every creation requires consent-before-create plus a warm announce line stating dónde + rama + por qué + limpieza, using uniform wording.
- REQ-006: Lifecycle covers create → verify → remove: clean-baseline verify, dirty-baseline refuse/override path, submodule guard, and sandbox fallback (`Temp\opencode` only when repo-local is refused — decision owned by automation + security per brief Open Questions).
- REQ-007: Chain and runtime invariants hold: no chain-order change, no new stage, no edit to `.opencode/plugins/frame-ship.ts` (stays single-file zero-dep), no change to the 8-domain catalogue.
- REQ-008: Proposal-before-code and reference-only `SPEC/HARD/GATE/DOMAINS` packets ride into every worktree — no cross-worktree pasting, no phantom state.

## 3. Acceptance Criteria

- [ ] AC-001: `skills/git-worktree/SKILL.md` exists, frontmatter parses with exactly `name`/`description`, and `§5 References` resolves to existing `references/*.md` files (evidence: file listing + frontmatter dump in proposal).
- [ ] AC-002: Fresh-clone dry run shows `git check-ignore -q .worktrees` succeeding and `.gitignore` containing `.worktrees/` before any `git worktree add` executes; `git status` of `main` shows zero `.worktrees/` tracked files (evidence: command log in test matrix).
- [ ] AC-003: Skill contains zero POSIX `$(...)` substitutions, all path joins are `Resolve-Path`-safe, and a 2-SPEC parallel dry run never exceeds 2 live entries in `git worktree list` (evidence: `rg` scan log + `git worktree list` snapshot).
- [ ] AC-004: `mise run typecheck` passes in `main` and in each created worktree before handoff to `execute-spec`; concurrent setups are serialized (evidence: per-worktree typecheck logs).
- [ ] AC-005: Session transcript for every creation shows consent prompt answered plus one announce line containing the four parts (dónde/rama/porqué/limpieza) (evidence: transcript excerpt paths in test matrix).
- [ ] AC-006: Dirty-baseline drill refuses `git worktree add` on `git status --porcelain` non-empty unless explicit override is recorded; submodule repo drill hits guard or sandbox fallback (evidence: drill logs).
- [ ] AC-007: `git diff --stat` for this SPEC touches only `skills/git-worktree/**`, `docs/specs/**`, `.gitignore` — zero lines in `.opencode/plugins/frame-ship.ts`, `skills/AGENTS.md` catalogue, or stage order constants (evidence: diff stat in gate).
- [ ] AC-008: Worktree task prompts carry only `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` references with no pasted file bodies (evidence: prompt packet sample in proposal).

## 4. Contracts & Interfaces

Skill file shape (must match repo conventions in `skills/AGENTS.md`):

```text
skills/git-worktree/
├── SKILL.md                        # frontmatter: name: git-worktree + 1-sentence description (Use when/Triggered by); body: Title + creed + §1-§5
└── references/
    ├── worktree-lifecycle.md       # create → verify → remove, pwsh-native commands
    ├── pwsh-flow.md                # Resolve-Path joins, status checks, serialized mise setup, max-2 discipline
    └── guards.md                   # check-ignore fail-closed, submodule guard, sandbox fallback, dirty-baseline refuse/override
```

Key command contracts (pwsh, illustrative — canonical text lives in the skill):

```powershell
git check-ignore -q .worktrees          # fail-closed before first add; nonzero exit = STOP
git status --porcelain                  # empty = clean baseline; non-empty = refuse unless override recorded
git worktree add .worktrees/<spec-id> -b <branch>   # one worktree per SPEC-ID
git worktree list                       # live count MUST be <= 2
git worktree remove .worktrees/<spec-id> --force    # cleanup; announce line states it upfront
mise run typecheck                      # per-worktree baseline gate, serialized
```

`.gitignore` contract: append `.worktrees/` (trailing slash, root-anchored II preferred: `/.worktrees/` only if repo convention adopts it — proposal decides, gate confirms `git check-ignore` green either way).

## 5. Out of Scope

- Changing chain order (`frame-intent → translate-to-spec → … → ship-release`) or inserting a new stage — `git-worktree` is supporting, not a stage.
- Changing `.opencode/plugins/frame-ship.ts` runtime (stays single-file zero-dep) or the 8-domain catalogue.
- Rotating keys, patching prod, widening perms (no freelance fixes — owner remediates).
- Copying upstream code without license/attribution check (reference only).
- Deciding brief Open Questions (worktree-root TTL owner, announce template tone, `40_workspace/<owner>/` promotion rule) — this spec surfaces options; orchestrator + named owners decide.

## 6. Dependencies

- Upstream: `BRIEF-git-worktree` + `OKR-git-worktree.md` (read-only; brief stays draft, not modified here).
- Sibling specs (parallel, max 2): automation/ops (mise/baseline mechanics), security (trust boundaries, `.gitignore` gate), people (consent/announce wording) — cross-domain needs go to orchestrator as formal Cross-domain requests.
- Downstream: `frame-ship:propose-changes` (packet `SPEC:docs/specs/20_backlog/SPEC-git-worktree-engineering.md#REQ-001..008 / HARD:multi-subagents+win32-pwsh / GATE:none-yet / DOMAINS:[engineering,automation/ops,security,people]`), then `review-security`/`review-architecture` (submodule/sandbox + contract surface), then `execute-spec`.
- Toolchain: `mise.toml` (`mise run typecheck`), `git worktree` on win32/pwsh.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | file listing + frontmatter dump |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | check-ignore log + `git status` snapshot |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | `rg` POSIX scan + `git worktree list` snapshot |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | per-worktree `mise run typecheck` logs |
| REQ-005 | AC-005 | PROPOSED_CHANGES.md | session transcript excerpts |
| REQ-006 | AC-006 | PROPOSED_CHANGES.md | dirty-baseline + submodule drill logs |
| REQ-007 | AC-007 | PROPOSED_CHANGES.md | `git diff --stat` in gate |
| REQ-008 | AC-008 | PROPOSED_CHANGES.md | prompt packet sample |
