---
name: ship-release
description: Orchestrate release shipping including release notes, changelog, and deployment coordination. Use when verified work is ready to ship or when preparing a tagged release.
---

# Ship-Release — COO Release Orchestration

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Turn verified handoffs into a shippable release with notes, changelog,
deployment order, and archival. Never ship without verification gates complete.

## 2. Chain Contract

- Previous: frame-ship:verify-handoff
- Next: none (chain close; lessons captured by owning C-level on PASS)

## 2b. Role Binding (Org)

- **Bound to:** `montilla` (CEO) delegating orchestration to the COO function
  with owning C-level + `vasquez` (CTO) + `devops` for deployment mechanics.
  Non-code ships delegate mechanics to the owning C-level (e.g. `subero` for
  filing, `vera`/`montero` for launch, `dauhajre` for close, `espinoza` for
  workflow enablement).

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(ship-release)` loaded? `read(agents/c-level/montilla.md)` + owning C-level / `devops` template done? All gates OPEN (or waived) verified? Any NO → STOP. Single = direct; multi = CEO dispatches `task(subagent_type="general")` ordered to read skill + template first.
1. Verify all DoD checklists + gate reports are OPEN (with `SPEC/HARD/GATE/DOMAINS` intact).
2. Produce `docs/specs/30_delivery/RELEASE_NOTES.md` via `references/release-notes.md` (ship type: deploy | filing | launch | close | rollout | policy-enable).
3. Update changelog via `references/changelog-template.md` (or record N/A with justification for internal-only non-code).
4. Coordinate ship mechanics with rollback/undo plan: `devops` for deploys; owning C-level for filings/launches/closes/workflows.
5. Archive completed spec to `docs/specs/50_archive/` with domain artifacts linked.
6. Close with work-unit release commit per `../using-frame-ship/references/commit-convention.md` (guidance only; tag after commit). Example: `chore(release-0.4.0): ship SPEC-003 with notes and rollback plan`.

## 4. What I won't do

- Ship without verification gates complete (OPEN or waived CONDITIONAL/CLOSED with record).
- Skip changelog for user-facing changes (any domain — code or non-code).
- Ship without a rollback/undo plan (revert + retract/void/reverse/disable with owner).

## 5. References

- `references/release-notes.md` — Highlights/features/fixes/breaking/rollback.
- `references/changelog-template.md` — Keep-a-Changelog format.
- `../using-frame-ship/references/commit-convention.md` — Commit format + release example (guidance only; see `frame-ship:using-frame-ship`).
