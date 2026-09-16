# Readability Review: SPEC-git-worktree-engineering

**Reviewer:** review-readability
**Date:** 2026-09-16
**Verdict:** conditional

## Checklist

- [ ] Naming is intention-revealing (no `data`, `tmp`, `x`) — see RD-002 (`$root` generic)
- [x] Functions have single responsibility — each pwsh block does one phase (create / verify / setup / baseline / remove); no multi-purpose snippet found
- [x] Nesting depth <= 3 — max heading depth 2, pwsh snippets flat (no nested conditionals beyond one `if`), no deep block nesting
- [x] Comments explain WHY, not WHAT — slash-form rationale (`worktree-lifecycle.md:28-34`), mutex rationale (`pwsh-flow.md:88-93`), deny-by-default posture (`guards.md:13`) all state reason
- [ ] Public APIs documented — see RD-001 (SKILL §5 omits 3 of 4 references)
- [x] No dead code or commented-out blocks — `Select-String` scan over `skills/git-worktree/**` for `TODO|FIXME|XXX|HACK` and commented-out pwsh: 0 hits; no POSIX `$(...)`: 0 hits
- [ ] Consistent style with surrounding code — see RD-003 (`check-ignore` slash-form drift)

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RD-001 | Medium | `skills/git-worktree/SKILL.md:45-47` | SKILL §5 References lists only `references/worktree-lifecycle.md` but `skills/git-worktree/references/` contains 4 files (`worktree-lifecycle.md`, `guards.md`, `pwsh-flow.md`, `announce-template.md`), all consumed normatively from §3 steps 1/3/4. Violates HARD "§5 must resolve to existing refs", SPEC AC-001, and `skills/AGENTS.md` anti-pattern "Editing references/ without updating parent SKILL §5". Public API undiscoverable: security/automation/people lanes unreachable from skill entry. Fix: add 3 missing reference lines to §5. |
| RD-002 | Low | `skills/git-worktree/references/worktree-lifecycle.md:39` | Generic variable `$root` instead of intention-revealing `$worktreeRoot`; same pattern also at `worktree-lifecycle.md:70`, `skills/git-worktree/references/pwsh-flow.md:54`, `pwsh-flow.md:120`. Short scope keeps risk low, but rename clarifies lane root vs repo root at a glance. Fix: rename to `$worktreeRoot` in all 4 snippets. |
| RD-003 | Low | `skills/git-worktree/references/guards.md:33` | Inconsistent `check-ignore` spelling: bare form `git check-ignore -q .worktrees` vs canonical trailing-slash form `git check-ignore -q .worktrees/` at `worktree-lifecycle.md:31` and `pwsh-flow.md:45`. Bare form only matches when the directory exists on disk (per `worktree-lifecycle.md:34`), so copy-paste from guards fails green on fresh clones. Fix: use trailing-slash form in `guards.md:33`. |

## Verdict Rationale

The 5 files are genuinely readable: single-purpose snippets, flat nesting, WHY-carrying comments, zero dead code, zero POSIX drift, and a well-commented `.gitignore` entry (`.gitignore:55-56`). One structural defect blocks PASS: RD-001 leaves 3 of 4 public references undiscoverable from the skill entry, failing AC-001 — hence not `pass`. The defect is a 3-line §5 addition with no redesign, and RD-002/RD-003 are renames of a variable and a slash, so `fail` would overstate harm. `conditional`: clear RD-001 (required) plus RD-002/RD-003 (recommended) and this review flips to pass on re-check.
