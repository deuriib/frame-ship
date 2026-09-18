# Implementation Plan: SPEC-agy-plugin-engineering (amended: root-drop + 1:1 parity)

**Agent:** engineering specialist (single mode, direct, no task)
**Date:** 2026-09-17
**Approved By:** proposal v1 (vasquez lens) + amendment (root-drop, parity) + security Conditional + amendment S-005 (barrera lens, C-001..C-006 carried); review-architecture skipped per INV-001 (no frame-ship runtime change)
**Domains-Touched:** [engineering, security, automation/ops]
**Skill:** skill(execute-spec) loaded; single = direct execution

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Root manifests: plugin.json + hooks.json (REQ-001/002) | `plugin.json, hooks.json` | TEST_MATRIX-agy-plugin.md T-001/T-002 | 0.2h |
| 2 | Handlers: context-inject.ts + safety-gate.ts + format-note.ts (REQ-003/004/008) | `hooks/*.ts` | TEST_MATRIX T-003/T-004/T-008 + replay logs | 0.6h |
| 3 | Fixtures (6) + rules/frame-ship.md + README Antigravity section (REQ-005/006/009/010) | `hooks/fixtures/*.json, rules/frame-ship.md, README.md` | TEST_MATRIX T-005/T-006/T-009 | 0.4h |
| 4 | Evidence: bun replay (allow/deny/secret/{}/first/compact/later/empty), schema checks, secret scan (canary-documented), diff stat, marker grep (REQ-007 + C-001..C-006) | command logs | TEST_MATRIX coverage + gate inputs | 0.3h |

Single cohesive deliverable — steps group into one commit with full REQ→test trace in the body (grouping justified here; per-REQ commits would be busywork theater for one root-drop).

## Order of Operations

Manifests first (identity + wiring), handlers second (depend on wiring paths `./hooks/*.ts`), fixtures + rules + README third (depend on handler I/O shape), evidence last (replays everything). Superseded `plugins/` subdir removed before Step 1 (never committed). No external services.

## Rollback Points

- After any step: `git status --porcelain` shows only intended root plugin files; `Remove-Item` the created paths restores pre-initiative tree (`skills/` untouched throughout).
- Post-commit: `git revert <sha>`; terminal rollback `agy plugin disable/uninstall frame-ship` (README, no prod mutation in this session).
- Safe-stop after Step 3 (files without evidence) or Step 4 (full green); gate consumes Step-4 logs.

## Quality Gates

- [ ] Engineering: `bun --version` recorded; replay exit-0 ×8 (allow/deny/secret/{}/first/compact/later/empty); JSON parse of plugin.json + hooks.json green; marker grep in 3 files; diff-stat scope guard (root plugin files + `docs/**` + README, zero `skills/` lines)
- [ ] Security: rule-only reasons confirmed; single documented canary; injector local-trusted-only; C-001..C-006 evidence attached (lens: barrera)
- [ ] Automation/ops: bun ≥1.x prereq; 10s timeouts declared; README runbook complete (global + workspace install, verify, disable/uninstall, replay)
