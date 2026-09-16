# ADR-002: Agent Templates to Repo-Root `agents/`

**Date:** 2026-09-16
**Deciders:** vasquez (CTO), montilla (CEO)
**Status:** accepted

## Context

SPEC-001 vendored 68 agent personas to `skills/templates/agents/` (central, reference-only). Follow-up request: move `/templates/agents/***` "to the root" and update references. Destination ambiguous (repo-root vs `skills/`-root). Live pointers exist in 6 files (`skills/AGENTS.md`, 4× `SKILL.md` §3/§5, `tool-mapping.md`); `../../templates/agents/README.md` relative links currently resolve to non-existent repo-root `templates/` (broken). Plugin `frame-ship.ts` has zero hits. `docs/` history records the old path. Architect review: Approved (2026-09-16).

## Decision

Move vendored craft from `skills/templates/agents/` to repo-root `agents/` via exact move (bytes identical, subdirs preserved) plus live-pointer rewrite (`skills/templates/agents/` → `agents/`, `../../templates/agents/` → `../../agents/`, `templates/agents/` → `agents/` in `skills/AGENTS.md` adopting repo-root-relative). Historical `docs/briefs|specs/**` left immutable. Empty `skills/templates/` removed. Assumption: "root" = repo-root; override to `skills/agents/` is mechanical (`s|^agents/|skills/agents/|` + `s|../../agents/|../agents/|`).

## Consequences

### Positive

- One craft truth at stable harness-neutral path; shorter cites; broken `../../` links repaired (`../../agents/README.md` resolves).
- Craft out of `skills.paths` `**/SKILL.md` scan (no loader confusion); process-vs-craft separation.
- Fully reversible in one commit; no runtime/plugin/frontmatter/body-shape break.

### Negative

- Vendored-tree currently untracked → impl is filesystem move + `git add` (history starts at next commit, noted in HANDOFF).
- `docs/` history keeps old path strings (intended — audit trail; this ADR is the delta record).

## Supersedes / Superseded By

Supplements ADR-001 (does not supersede — ADR-001 records why vendoring exists; this records where it lives).
