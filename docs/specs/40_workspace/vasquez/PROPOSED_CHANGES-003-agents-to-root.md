# Proposed Changes: vasquez (CTO) — agents/ to repo root

**Spec Reference:** SPEC-003-agents-to-root
**Agent:** vasquez
**Date:** 2026-09-16
**Execution_Mode:** single (small fully-specified unit; min gate readability+risk+refuter+qa per ADR-001)

## Summary

Move 68 vendored agent templates + README from `skills/templates/agents/` to repo-root `agents/` via git-mv semantics (contents exact), then rewrite every live pointer to the new path. Historical `docs/` records stay immutable; a new ADR-002 records the move. Fixes currently-broken `../../templates/agents/README.md` relative links (they resolve to repo-root, not `skills/`).

## SPEC (reference-only)

No brief — scoped engineering restructure. Testable REQs:

- **REQ-001 (move exact):** All files under `skills/templates/agents/**/*` (68 `.md` + `README.md`, subdirs `c-level, engineering, finance, legal, marketing, people, revenue, security, shared`) land at `agents/**/*` with identical bytes (`git mv` semantics, history kept). No logic/content change except the one self-pointer inside the moved `README.md` (REQ-002).
- **REQ-002 (reference rewrite):** Every *live* pointer to the old path is rewritten; post-move `grep -r "templates/agents" --include="*.md" --include="*.ts" skills/ .opencode/ README.md AGENTS.md` returns zero hits in live code. Historical `docs/briefs|specs/**` hits explicitly excluded (immutable record — see Out-of-scope).
- **REQ-003 (contract preservation):** Skill frontmatter stays exact (`name: <kebab==dir>`, no extra keys); SKILL body shape unchanged except §3/§5 path strings; no plugin deps added; `.opencode/plugins/frame-ship.ts` untouched (verified: contains zero `templates/agents` hits today).
- **REQ-004 (empty-dir cleanup):** `skills/templates/` (left empty after move) is removed; no redirect stub (stub would reintroduce a dangling pointer).
- **REQ-005 (verify):** Post-move verification = (a) file-count check `68 + README` at destination, (b) live-grep zero, (c) relative-link resolution check from `skills/frame-intent/SKILL.md` (`../../agents/README.md` → `agents/README.md` exists).

## Changes

| File/Component | Change Type | Description |
|----------------|-------------|-------------|
| `skills/templates/agents/**/*` → `agents/**/*` | move (69 files) | `git mv` per file, bytes identical; subdirs preserved |
| `agents/README.md` (moved) | modify (1 line) | `skills/templates/agents/<domain>/<agent>.md` → `agents/<domain>/<agent>.md` (L13 layout line) |
| `skills/frame-intent/SKILL.md` | modify (2 lines) | L36 `skills/templates/agents/<domain>/<agent>.md` → `agents/<domain>/<agent>.md`; L49 `../../templates/agents/README.md` → `../../agents/README.md` |
| `skills/execute-spec/SKILL.md` | modify (2 lines) | L24 two `skills/templates/agents/...` → `agents/...`; L48 `../../templates/agents/README.md` → `../../agents/README.md` |
| `skills/translate-to-spec/SKILL.md` | modify (2 lines) | L30 `skills/templates/agents/c-level/<owner>.md` → `agents/c-level/<owner>.md`; L47 `../../templates/agents/README.md` → `../../agents/README.md` |
| `skills/quality-gate/SKILL.md` | modify (1 line) | L51 `skills/templates/agents/engineering/*` + `skills/templates/agents/<domain>/*` → `agents/engineering/*` + `agents/<domain>/*` |
| `skills/using-frame-ship/references/tool-mapping.md` | modify (1 line) | L10 `skills/templates/agents/<domain>/<agent>.md` → `agents/<domain>/<agent>.md` |
| `skills/AGENTS.md` | modify (2 lines) | L5 `` `templates/agents/<domain>/<agent>.md` `` → `` `agents/<domain>/<agent>.md` `` (adopt repo-root-relative for greppability); L24 `templates/agents/` → `agents/` + note empty-dir removal |
| `skills/templates/` | delete (empty dir) | `rmdir` after move; verifies REQ-004 |
| `docs/specs/10_design/ADR-002-agents-to-root.md` | create | Arch decision for this move (review-architecture stage) |
| `docs/` history (`BRIEF-agent-templates.md`, `SPEC-001*`, `ADR-001*`, `40_workspace/**`, `30_delivery/RELEASE_NOTES.md`, `GATE_REPORT.md`) | explicitly untouched | Immutable record; new ADR + HANDOFF explain the delta |

## Assumption (explicit, reversible default)

**"To the root" = repo-root `agents/`** (i.e. `D:\GitHub\frame-ship\agents/`), not `skills/agents/`. Rationale: (1) most literal reading of "root"; (2) keeps craft out of the `skills.paths` recursive `**/SKILL.md` scan (templates carry no skill frontmatter — root placement avoids loader confusion); (3) fixes the broken `../../templates/...` relative links — after the move `../../agents/README.md` resolves correctly from any `skills/<stage>/SKILL.md`. **Override condition:** if requester meant `skills/`-root (`skills/agents/`), the rewrite is mechanical (`s|^agents/|skills/agents/|` + `s|../../agents/|../agents/|`); say so and the same REQ/GATE ride without re-spec.

## Rationale

`skills/templates/agents/` conflates process (skills = chain order+gates) with craft (agents = how). Root `agents/` gives one craft truth at a stable, harness-neutral path, shortens every cite (`skills/templates/agents/...` → `agents/...`), and repairs relative resolution. Pure move + string rewrite: zero behavior change, fully reversible (`git mv agents skills/templates/agents` + revert pointer commit).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| `skills/agents/` (skills-root) | Keeps 68 non-skill files inside the `skills.paths` scan; longer cites than root; does not fix `../../` resolution as cleanly |
| Symlink / redirect stub at old path | Reintroduces a pointer to maintain; violates zero-dangling goal; Windows symlink friction |
| Rewrite `docs/` history to new path | Destroys audit trail (SPEC-001/ADR-001 describe where files *were*); new ADR is the correct record |

## Risk Assessment

- **Blast radius:** docs-only; no runtime, no plugin, no auth/data/API. `frame-ship.ts` has zero hits — untouched.
- **Breakage mode:** missed pointer → stale doc link (Low). Mitigated by live-grep zero gate (REQ-002/005) + count check.
- **History risk:** `git mv` preserves history; untracked-tree caveat — `skills/templates/` is currently untracked (`git status ??`), so impl uses filesystem move + `git add` (equivalent bytes, history starts at next commit; noted in HANDOFF).
- **Rollback:** one commit revert (`git mv agents skills/templates/agents` + pointer revert); 2-minute, no data loss.
- **Security/privacy:** no secrets/PII in move (templates pre-scrubbed per SPEC-001 gate); no new trust boundary; `review-security` skip with reason (below).

## GATE

`review-architecture` (cross-cutting path change → ADR-002 verdict) + `quality-gate` min gate for `single` mode: `review-readability + review-risk + review-refuter + qa`. Security review skipped: no auth/data/external-API touch (guardrail 10 — Medium/Low ride normal gate; stated here). `HANDOFF.md` before close; CLOSED = no handoff.

## Approval Required From

- [ ] vasquez (CTO) — cross-cutting path change, ADR-002 (this proposal + arch review = approval to execute)
- [ ] barrera (CISO) — N/A, skip with reason stated above (no auth/data/API)
- [x] Requester pre-authorization — full-chain-to-PASS requested with HARD constraints quoted; arch APPROVE unblocks `execute-spec`

> **Rule:** No repository file modifications during proposal phase (this file is the proposal artifact).
