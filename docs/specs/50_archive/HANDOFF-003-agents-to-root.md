# Handoff: vasquez (CTO) — SPEC-003 agents/ to repo root

**Spec Reference:** SPEC-003-agents-to-root
**Agent:** vasquez
**Date:** 2026-09-16
**Status:** complete

## Deliverables

| Artifact | Location | Status |
|----------|----------|--------|
| Moved craft (68 + README) | `agents/<domain>/<agent>.md` + `agents/README.md` | done (69 files, 9 subdirs) |
| Live pointer rewrites (7 files) | `skills/AGENTS.md`, `skills/frame-intent/SKILL.md`, `skills/execute-spec/SKILL.md`, `skills/translate-to-spec/SKILL.md`, `skills/quality-gate/SKILL.md`, `skills/using-frame-ship/references/tool-mapping.md`, `agents/README.md:13` | done |
| Empty-dir removal | `skills/templates/` gone | done |
| Proposal | `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-003-agents-to-root.md` | done |
| ADR | `docs/specs/10_design/ADR-002-agents-to-root.md` (accepted) | done |
| Gate evidence | Architect Approved + 5 gate verdicts below | done (gate OPEN) |

## Definition of Done Checklist

- [x] REQ-001 move exact — 69 files at `agents/`, 9/9 subdirs, 68/68 SHA256 identical (README differs only by approved L13); `skills/templates/` gone
- [x] REQ-002 zero dangling — live-grep `templates/agents` zero in `skills/ .opencode/ README.md AGENTS.md *.ts`; repo-wide 35 hits all in immutable `docs/briefs|specs/**` (excluded by design)
- [x] REQ-003 contract preserved — 4 edited SKILL frontmatter `name/description` only; body shape intact; `frame-ship.ts` untouched (zero hits, `import type` only)
- [x] REQ-004 empty-dir cleanup — no stub left
- [x] REQ-005 verify — count + live-grep-zero + `../../agents/README.md` resolves (previously-broken `../../templates/...` now repaired)
- [x] review-architecture Approved (cross-cutting path change, ADR-002 required YES) — architect verdict 2026-09-16
- [x] quality-gate min gate (`single`): readability PASS (1 Low) · reliability PASS · review-risk PASS (security-skip justified, residual Low) · refuter PASS (5/5 HOLDS) · qa GREEN (5/5)
- [x] No Critical/High findings; 3 Lows acknowledged (AGENTS.md mixed-base convention for greppability; one long bullet; docs-history grep noise) — all ride gate, owners noted
- [x] Security: no secrets/PII/new boundaries (guardrails 1-8 REFUTED with evidence); no freelance fixes
- [x] Docs: ADR-002 written; `docs/` history intentionally untouched (audit trail); lessons captured below

## Gate Verdicts (scoped evidence)

- `architect` (review-architecture): **Approved** — repo-root `agents/` over `skills/agents/` (SoC, out of `skills.paths` scan, shorter cites, repairs `../../` links); no contract break; history immutability correct; 4 conditions all met
- `review-readability`: **PASS** — consistent `agents/...` + `../../agents/README.md` ×3; assumption + override stated
- `review-reliability`: **PASS** — 69 files, 7 files at proposed lines, frontmatter exact, plugin untouched
- `review-risk`: **PASS** — skip of `review-security` justified (no auth/data/API); residual Low explicit, owner vasquez
- `review-refuter`: **PASS** — 5/5 HOLDS with file:line evidence; 2 Low hygiene notes (mixed-base convention; untracked caveat must repeat here — repeated below)
- `qa`: **GREEN** — count 69 + 9 subdirs; live-grep zero (5 scopes); resolve exists/gone; spot-checks; frontmatter

Domain-gate: **OPEN** (no ❌, no open conditions).

## Caveats (honest history note per refuter condition)

- **Untracked-tree move:** `skills/templates/` was untracked at dispatch (`git status ??`), so `git mv` was impossible — impl used filesystem move. Git history for `agents/**` therefore starts at the next commit; "history kept" means bytes + subdirs preserved, not `git log --follow` continuity. Rollback: `git mv agents skills/templates/agents` + pointer revert (2 min).
- **Pre-existing dirty baseline:** 10 tracked files were already `M` before SPEC-003 (SPEC-002-era work); SPEC-003 layers path strings only and cannot be committed independently without sweeping that baseline in — committer verifies baseline PASS-worthiness at commit time.
- **`docs/` old-path strings by design:** `SPEC-001/BRIEF/ADR-001/HANDOFFs/GATE_REPORT/RELEASE_NOTES` keep `skills/templates/agents` as the record of where files were; ADR-002 is the delta record.

## Blockers / Open Questions

None. Single reversible assumption ("root" = repo-root `agents/`); override to `skills/agents/` is mechanical (`s|^agents/|skills/agents/|` + `s|../../agents/|../agents/|`).

## Lessons (captured on PASS)

1. `../../templates/...` from `skills/<stage>/SKILL.md` never resolved to `skills/templates/` — relative §5 links must be resolution-checked, not eyeballed; the move repaired them.
2. Adopt one cite base and declare it: repo-root-relative `agents/...` in prose + `../../agents/...` in §5 References; note the base in the proposal so refuter doesn't flag mixed-base as breakage.
3. For vendored-tree moves, snapshot SHA256 pre-move (`spec003-premove-hashes.txt` pattern) — makes "bytes-exact" provable instead of claimed.
4. Recall hook: before any future `agents/` refactor-dispatch, re-read this HANDOFF + ADR-002 (override recipe + baseline-dirtiness warning ride along).

## Next Agent

`ship-release` (via `montilla` + `vasquez`) — commit scope = `agents/` (new) + 7 live-pointer files + `ADR-002` + `PROPOSED_CHANGES-003` + this HANDOFF; verify live-grep-zero at commit time; no `HANDOFF` without this gate record.
