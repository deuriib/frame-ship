# Proposed Changes: engineering owner — Version Sync to v0.6.0 (Parity + Docs)

**Spec Reference:** No formal SPEC-XXX (backlog empty 2026-09-17); ad-hoc source = version-verification 2026-09-17 + user scope answer "Parity + docs only"
**Agent:** engineering owner — owning domain owner, engineering
**Date:** 2026-09-17
**Execution_Mode:** single (per user answer 2026-09-17; no task dispatch, direct proposal → approval → edit)
**Domains-Touched:** [engineering]
**Packets:** SPEC:(verification: core quadruple already v0.6.0; stales in hooks/README/INSTALL/AGENTS/rules) / HARD:single; text-edits only, fully reversible per commit; target v0.6.0; archive/design history excluded / GATE:none-yet / DOMAINS:[engineering]

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## Summary

Core release quadruple is already consistent at v0.6.0 (plugin header + VERSION + MARKER + root manifest + plugin doc + changelog). This proposal syncs only the stale parity + docs lane to v0.6.0: agy hook marker, README pins, INSTALL verify string, root AGENTS.md version cells, and the missing lockstep note in rules. No logic changes, no archive/history rewrites, no implementation file touched at this stage.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `hooks/context-inject.ts:24-25` | file-modify | `VERSION "0.5.0"` → `"0.6.0"`; parity comment `[frame-ship v0.5.0]` → `[frame-ship v0.6.0]`. Restores INV-008 lockstep with `.opencode/plugins/frame-ship.ts`. String-only, no handler logic. |
| `README.md:62,209,227` | file-modify | `:62` verify marker `[frame-ship v0.5.0]` → `[frame-ship v0.6.0]`; `:209` pin `#v0.5.0` → `#v0.6.0`; `:227` `version-locked v0.5.0` → `v0.6.0`. User-facing install/verify path. |
| `.opencode/INSTALL.md:76` | file-modify | Verify string `[frame-ship v0.2.0]` → `[frame-ship v0.6.0]`. Stale since v0.2.0. |
| `AGENTS.md:9,20,79` | file-modify | `:9` `154 lines, v0.5.0` → `403 lines, v0.6.0`; `:20` `package.json v0.5.0` → `v0.6.0`; `:79` aligned note `v0.5.0 matches v0.5.0` → `v0.6.0 matches v0.6.0`. `Generated:` stamp line untouched (generator-owned history). |
| `rules/frame-ship.md` | file-modify | Add 1-line version-lockstep note carrying `[frame-ship v0.6.0]` (file currently has no marker; INV-008 requires greppable marker in plugin + hooks + rules). No card/chain/guardrail wording changes. |
| `.opencode/plugins/frame-ship.ts:2,10-11` + `package.json:3` + `.opencode/plugins/AGENTS.md:4` + `CHANGELOG.md:8` | verify-only | Already v0.6.0 — grep evidence only, zero edits. |
| `docs/specs/50_archive/*`, `docs/specs/10_design/ARCHITECTURE-agy-plugin.md`, `docs/specs/40_workspace/quality-gate/*` historical v0.3.x/v0.4.0/v0.5.0 refs | explicitly-untouched | Audit trail frozen per user scope; rewriting history rejected. `plugin.json` has no version field — N/A. |

Change types per `references/proposal-template.md:23`.

## Rationale

- The v0.6.0 release (agents-into-plugin, 403-line runtime) moved the core quadruple but left the parity lane at v0.5.0 by explicit deferral (`HANDOFF-agents-into-plugin.md:53`, `TEST_MATRIX-agents-into-plugin.md:37`). The deferral is now due: agy hook + rules + plugin must read identically or INV-008 fails on grep.
- Docs pins (`README`, `INSTALL`) point new installs at stale markers; a user verifying `[frame-ship v0.5.0]` on a v0.6.0 runtime sees a false mismatch. Forward-only pin to v0.6.0 closes it.
- Root `AGENTS.md` is the project knowledge base consumed by agents; leaving it at `154 lines v0.5.0` misroutes future work (wrong line-refs, wrong manifest claim).
- Scope stops at parity + docs so the change stays string-only, single-domain, reversible in one revert — no spec, no ADR, no security surface.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Parity-only (hooks file alone) | Restores lockstep grep but leaves user-facing README/INSTALL/AGENTS.md stale — same drift mode reproduced at doc layer. |
| Everything including archive/design history rewrite | Rewrites audit trail (v0.3.x/v0.4.0 gate evidence); violates read-only archive convention; user explicitly rejected. |
| Leave stale until next feature spec | Keeps false-mismatch UX + INV-008 red; version-sync is the exact hygiene this proposal exists to close. |

## Risk Assessment

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Hook string edit breaks agy injection shape | Low | Med | String-only (VERSION + comment); handler logic untouched; `bun ./hooks/context-inject.ts` fixture replay at execute-spec. |
| R-002 | README pin forward breaks pinned installs | Low | Low | Pin moves forward v0.5.0 → v0.6.0 only; rollback = revert; no breaking runtime change in v0.6.0 notes. |
| R-003 | Hand-edit of generated `AGENTS.md` diverges from generator | Low | Low | Version cells only; `Generated:` stamp untouched; next `/init-deep` regen converges. |

**Blast Radius:** Engineering docs + agy hook strings only. No services/data, no budget/controls, no legal exposure, no brand/GTM beyond install snippet, no team/culture change, no pipeline/quota, no runbook/capacity change.

**Rollback Plan:** Single-commit `git revert`, ETA < 5 min, owner engineering owner. Docs-only; no data migration, no external comms to retract.

**Security Considerations:** No auth/data/external-API/PII touched. Changed files get prohibition-clause pattern scan (no secrets/tokens/credentials) at execute-spec. Security owner sign-off not required — stated, not assumed.

## Approval Required From

- [ ] Owning domain owner: engineering owner (mandatory — Domains-Touched [engineering])
- [ ] engineering owner arch review: not required (no API/model/cross-cutting change — strings only)
- [ ] security owner: not required (no auth/data/external-API/PII — stated above)

> **Rule:** No repository file modifications during proposal phase. Implementation files stay untouched until approval; this proposal doc is the only new file.
