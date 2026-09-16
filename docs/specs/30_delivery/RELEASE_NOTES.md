# Release Notes: v0.3.0-templates

**Date:** 2026-09-15
**Release Manager:** montilla (CEO) / vasquez (CTO)
**Specs Included:** SPEC-001-agent-templates

## Highlights

- 68 opencode agents vendored to `skills/templates/agents/` as reference-only templates, portable with repo
- `execution_mode: single | multi-subagents` chosen once at `frame-intent`, rides SPEC/HARD/GATE packets
- Dispatcher + gates + tool map updated for both modes; plugin stays single-file zero-dep

## Changes

### Features

- Central templates `skills/templates/agents/<domain>/<agent>.md` + README index (SPEC-001-agent-templates, REQ-001)
- Brief/spec/proposal carry `execution_mode` (REQ-002)
- `execute-spec` single (one leaf + min gate) vs multi (fan-out + full wave) (REQ-003)
- `quality-gate` mode-aware routing + real `subagent_type` map (REQ-004)

### Fixes

- Killed parallel reviewer universe; fixed `tool-mapping.md` vs `permission.task` contradiction
- Scrubbed templates, no secrets/PII (REQ-005)

### Breaking Changes

- None. Rollback = delete `skills/templates/` pointers + revert 10 skill files. Globals remain as deprecated mirror.

## Known Issues

- Template meta fence shows 2 ticks vs 3 (cosmetic, loader-safe) — fix in 0.3.1
- `tsc --noEmit` should be re-run after opencode restart (plugin untouched, no regression expected)

## Rollback

`git revert` skill edits + `Remove-Item -Recurse skills/templates, docs/` to return to v0.2.0. No prod, no keys, no migrations.

---

# Release Notes: v0.3.1-agents-to-root

**Date:** 2026-09-16
**Release Manager:** montilla (CEO) / vasquez (CTO)
**Specs Included:** SPEC-003-agents-to-root

## Highlights

- Vendored agent craft moved to repo-root `agents/` (69 files, 9 subdirs), bytes-exact per SPEC-003
- Live pointers rewritten (7 files); `skills/templates/` removed; previously-broken `../../` relative links repaired
- Gate OPEN (architect Approved + readability/risk/refuter PASS + qa GREEN); `docs/` history intentionally untouched (audit trail)

## Changes

### Features

- Repo-root craft truth `agents/<domain>/<agent>.md` + `agents/README.md` index (SPEC-003, REQ-001; see ADR-002)
- Pointer rewrites in `skills/AGENTS.md`, 4x `SKILL.md` (§3/§5), `tool-mapping.md`, `agents/README.md:13` (SPEC-003, REQ-002)

### Fixes

- `../../templates/agents/README.md` (broken — resolved to non-existent repo-root `templates/`) → `../../agents/README.md` resolves (SPEC-003, REQ-005)

### Breaking Changes

- Path break (docs-only, reversible): old cites `skills/templates/agents/...` no longer resolve. Migration: `s|^skills/templates/agents/|agents/|` + `s|../../templates/agents/|../../agents/|`. Override to `skills/agents/` stays mechanical per HANDOFF caveats.

## Known Issues

- Mixed baseline: 10 tracked `M` files = SPEC-002 (execution_mode) + SPEC-003 (path rewrite) layered; cannot be committed independently — committer verifies baseline PASS-worthiness at commit time (per HANDOFF caveats).
- Untracked-tree move: `skills/templates/` was untracked at dispatch, so impl used filesystem move — `git log --follow` continuity starts at the next commit; bytes + subdirs preserved, not history linkage.
- `docs/briefs|specs/**` keep old-path strings by design (immutable record; ADR-002 is the delta).
- v0.3.0 entry above references the OLD path — left as-is, history not rewritten.

## Rollback

- `git mv agents skills/templates/agents` (or plain `mv` — tree is currently untracked) + revert the 7 pointer files (`skills/AGENTS.md`, `skills/frame-intent/SKILL.md`, `skills/execute-spec/SKILL.md`, `skills/translate-to-spec/SKILL.md`, `skills/quality-gate/SKILL.md`, `skills/using-frame-ship/references/tool-mapping.md`, `agents/README.md:13`) + revert this file and `CHANGELOG.md`. ~2 min, no data loss, no prod/keys/migrations. Rollback plausibility verified via `git status` (repo functional, baseline listed) — rollback NOT executed.

## Verification (ship-release gate evidence)

- `agents/`: 69 files, 9 subdirs (`c-level, engineering, finance, legal, marketing, people, revenue, security, shared`) — PASS
- `skills/templates/`: absent — PASS
- Live-grep `templates/agents` over `skills/ .opencode/ README.md AGENTS.md *.ts`: zero hits (rg exit 1) — PASS
- `agents/README.md` exists; `skills/frame-intent/../../agents/README.md` resolves — PASS

## Refs (reference-only)

- `docs/specs/40_workspace/vasquez/HANDOFF-003-agents-to-root.md` (gate OPEN)
- `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-003-agents-to-root.md`
- `docs/specs/10_design/ADR-002-agents-to-root.md` (accepted)

---

# Release Notes: v0.3.2-plugin-001-concise-prompts

**Date:** 2026-09-16
**Release Manager:** montilla (CEO) / vasquez (CTO, release mechanics with devops lens)
**Specs Included:** INTENT-2026-09-16-concise-plugin-prompts (ad-hoc user intent; REQ-001..REQ-006 in proposal — no BRIEF/SPEC)
**Domains-Touched:** engineering
**Ship Type:** rollout (internal plugin, restart required to take effect)

## Highlights

- Plugin prompt injections cut −31.3% (11,098→7,620 chars, 223→156 lines) with byte-identical behavior — every session's orientation surface gets leaner, gates stay toothed
- Single `CHAIN` const kills the 4x-literal chain-order drift vector; future order changes touch exactly one line
- Gate OPEN (readability/risk/refuter/qa 4×pass) + DoD PASS; `tsc` typecheck exit 0 re-run 2026-09-16

## Changes

### Features

- Dedupe workflow-card ↔ bootstrap overlap (REQ-001, engineering)
- Compact trigger table + short-form pointers (REQ-002, engineering)
- Guardrails as greppable 1:1 numbered checklist, 14/14 (REQ-003, engineering)
- Single `CHAIN` const + 3 interpolations (REQ-004, engineering)
- Zero behavior change: string literals + header only, 0 logic lines (REQ-005, engineering)
- Acceptance met: −31.3% / semantic 1:1 / `tsc` clean / single-file zero-deps (REQ-006a–d, engineering)

### Fixes

- N/A — no defect fix; size reduction only (prompt-text-only change)

### Breaking Changes

- None. No API surface change; logic byte-identical. Rollback = single-file `git revert` + restart (<15 min, owner vasquez).

## Known Issues

- Restart required: config not hot-reloaded — quit + restart opencode or the new prompts do not take effect (owner: vasquez; follow-up F-1 init/compact smoke on first restart)
- Orientation watch on first sessions post-ship (owner: vasquez, watcher: barrera; follow-up F-2, watch-items RR-1/RR-2)

## Rollback / Undo

- `git revert <release-commit>` (single file `.opencode/plugins/frame-ship.ts`) + quit + restart opencode. ETA <15 min. Owner: vasquez. No prod, no keys, no migrations, no data loss.
- Rollback plausibility: single-file revert path declared in proposal (R-005), carried through gate (F-1) and handoff — rollback NOT executed.

## Verification (ship-release gate evidence)

- `GATE_REPORT.md:4` OPEN, 4/4 reviewer pass, no COND items, no waiver needed — PASS
- `HANDOFF.md` DoD PASS (all Common + engineering + security boxes checked; changelog/ADR N/A-by-owner) — PASS
- Impl `1a805bc` + gate `6513dad` + handoff `8c360b9` intact — PASS

## Refs (reference-only)

- `docs/specs/40_workspace/vasquez/HANDOFF.md` (DoD PASS, this release's input)
- `docs/specs/40_workspace/quality-gate/plugin-001-concise-prompts/GATE_REPORT.md` (OPEN)
- `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md` (REQ-001..REQ-006, R-001..R-005)
- `docs/specs/40_workspace/barrera/SECURITY_REVIEW.md` (Conditional, C-1..C-6 all verified at gate)
