---
name: ship-release
description: Orchestrate release shipping including release notes, changelog, and deployment coordination. Use when verified work is ready to ship or when preparing a tagged release.
---

# Ship-Release — Release Orchestration

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

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

0. Pre-flight LOAD — HARD STOP: `skill(ship-release)` loaded? Agent templates read for orchestrator + owning domain owner / devops? All gates OPEN (or waived) verified? Any NO → STOP. Single = direct; multi = orchestrator dispatches ordered to read skill.
1. Verify all DoD checklists + gate reports are OPEN (with `SPEC/HARD/GATE/DOMAINS` intact).
2. Produce `docs/specs/30_delivery/RELEASE_NOTES.md` via `references/release-notes.md` (ship type: deploy | filing | launch | close | rollout | policy-enable). Singleton: create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per lane (only `RELEASE_NOTES.md`, never `RELEASE_NOTES-*.md`).
3. Update changelog via `references/changelog-template.md` (or record N/A with justification for internal-only non-code).
4. Audit documentation via `references/documentation-checklist.md` and synchronize version lockstep across the repository via `node scripts/bump-version.mjs --sync` (or bump version). README (`references/readme-template.md`), INSTALL (`references/install-template.md`), and MIGRATION (`references/migration-guide-template.md`) are CONDITIONAL: required only when `ship-type` is `deploy` with breaking changes; otherwise cited, not required.
5. Coordinate ship mechanics with rollback/undo plan: devops for deploys; owning domain owner for filings/launches/closes/workflows.
6. Archive by MOVE + promote evidence + purge allowlist (never copy, never sweep) — exactly these 5 substeps, in order:
   1. `git mv docs/specs/20_backlog/<spec-file>.md docs/specs/50_archive/<spec-id>/` and verify `git status --short` shows `R` rename with the source path gone (no duplicate, no copy).
   2. Promote evidence into `50_archive/<spec-id>/`: copy `GATE_REPORT.md` + `HANDOFF.md` (from `40_workspace/quality-gate/<spec-id>/` and `40_workspace/<domain>/`) — these prove the release and must survive the purge.
   3. Write `docs/specs/50_archive/<spec-id>/ARCHIVE-RECORD.md` via `references/archive-record.md`: spec, gate verdict, commit(s), tag, promoted list, purged list, ADR link if any.
   4. Purge ONLY this allowlist for this `<spec-id>`: `40_workspace/<domain>/{PROPOSED_CHANGES,IMPLEMENTATION_PLAN,TEST_MATRIX,HANDOFF}.md` + `40_workspace/quality-gate/<spec-id>/`. Nothing outside the allowlist is touched; if another SPEC's lane is active, STOP (do not purge across lanes).
   5. Verify before commit: purged paths absent (`ls`), other lanes untouched, `git status` clean of strays — then release commit includes the ARCHIVE-RECORD.
7. Close with a release commit (tag after commit). Example: `chore(release-0.4.0): ship SPEC-003 with notes, ARCHIVE-RECORD and rollback plan`.

## 4. What I won't do

- Ship without verification gates complete (OPEN or waived CONDITIONAL/CLOSED with record).
- Skip changelog for user-facing changes (any domain — code or non-code).
- Ship with out-of-sync documentation or unverified install instructions (README, INSTALL, or migration guides lagging behind released behavior).
- Ship with version mismatch or drift between manifest, plugin runtime, rules, and context hooks.
- Ship without a rollback/undo plan (revert + retract/void/reverse/disable with owner).
- Leave the allowlisted drafts in `docs/specs/40_workspace/` after archival, or purge anything OUTSIDE the allowlist (parallel SPEC lanes must survive).
- Archive evidence: `GATE_REPORT.md` + `HANDOFF.md` must be promoted to `50_archive/<spec-id>/` BEFORE the purge — purging them silently loses the audit trail.

## 5. References

- `references/release-notes.md` — Highlights/features/fixes/breaking/rollback.
- `references/changelog-template.md` — Keep-a-Changelog format.
- `references/documentation-checklist.md` — Pre-release documentation audit + the exact purge allowlist.
- `references/archive-record.md` — `50_archive/<spec-id>/ARCHIVE-RECORD.md`: what was promoted, purged, tagged.
- Conditional (only `ship-type=deploy` with breaking changes): `references/readme-template.md`, `references/install-template.md`, `references/migration-guide-template.md`.
