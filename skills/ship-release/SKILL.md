---
name: ship-release
description: Orchestrate release shipping including release notes, changelog, and deployment coordination. Use when verified work is ready to ship or when preparing a tagged release.
---

# Ship-Release — Release Orchestration

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Turn verified handoffs into a shippable release with notes, changelog,
deployment order, and archival. Never ship without verification gates complete.

## 2. Chain Contract

- Previous: frame-ship:verify-handoff
- Next: none (chain close; lessons captured by owning C-level on PASS)

## 2b. Role Binding (Org)

- **Bound to:** orchestrator delegating orchestration to the operations function
  with owning domain owner + engineering owner + devops for deployment mechanics.
  Non-code ships delegate mechanics to the owning domain owner (e.g. legal for
  filing, marketing/revenue for launch, finance for close, automation for
  workflow enablement).

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(ship-release)` loaded? Agent templates read for orchestrator + owning domain owner / devops? All gates OPEN (or waived) verified? Any NO → STOP. Single = direct; multi = orchestrator dispatches `task(subagent_type="general")` ordered to read skill + template first.
1. Verify all DoD checklists + gate reports are OPEN (with `SPEC/HARD/GATE/DOMAINS` intact).
2. Produce `docs/specs/30_delivery/RELEASE_NOTES.md` via `references/release-notes.md` (ship type: deploy | filing | launch | close | rollout | policy-enable).
3. Update changelog via `references/changelog-template.md` (or record N/A with justification for internal-only non-code).
4. Coordinate ship mechanics with rollback/undo plan: devops for deploys; owning domain owner for filings/launches/closes/workflows.
5. Archive by MOVE (never copy) completed spec to `docs/specs/50_archive/` with domain artifacts linked: `git mv <source-spec-path> docs/specs/50_archive/` then verify source path gone (`git status --short` shows `R` rename, no duplicate) before commit.
6. Close with a release commit (tag after commit). Example: `chore(release-0.4.0): ship SPEC-003 with notes and rollback plan`.

## 4. What I won't do

- Ship without verification gates complete (OPEN or waived CONDITIONAL/CLOSED with record).
- Skip changelog for user-facing changes (any domain — code or non-code).
- Ship without a rollback/undo plan (revert + retract/void/reverse/disable with owner).

## 5. References

- `references/release-notes.md` — Highlights/features/fixes/breaking/rollback.
- `references/changelog-template.md` — Keep-a-Changelog format.
