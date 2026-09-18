# Proposed Changes: vasquez (engineering owner) — Antigravity Discovery-Path Fix

**Spec Reference:** Prior diagnosis `ses_f4dbd8fecffez6VfQUqdImYsr8` (root cause: pathing miss — `rules/frame-ship.md` not on Antigravity discovery path) + source packet by reference: `rules/frame-ship.md` (v0.6.1, 47 lines) + `hooks/context-inject.ts` (135 lines) + root `hooks.json` + `plugin.json` + root `AGENTS.md`
**Agent:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no task dispatch; docs/config-only, min gate)
**Domains-Touched:** [engineering]

> **Singleton note:** this file reuses the canonical `40_workspace/engineering/PROPOSED_CHANGES.md` slot per propose-changes discipline (create-if-missing else update-in-place, never suffix). Prior content (singleton-consolidation proposal, 2026-09-18) is superseded by this unit and recoverable from git history (`git log -- docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`); no archive-move is performed in proposal phase (repo untouched except this artifact).

## Summary

Mirror `rules/frame-ship.md` verbatim onto the Antigravity discovery path as `.agents/rules/frame-ship.md` (Always On), promote `.agents/hooks.json` to single-source hook registration, conditionally declare surfaces in `plugin.json` only if the v1 schema supports it, and add a one-line by-reference bridge in root `AGENTS.md`. Single-file runtimes untouched, version lockstep held at v0.6.1 with no bump.

## Changes

| Target                               | Change Type               | Description                                                                                                                                                                                                                |
| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/rules/frame-ship.md` (new)  | file-create               | Verbatim mirror of `rules/frame-ship.md` (47 lines, footer lockstep line intact) + activation frontmatter: **Always On** (decision §1) with `description:` trigger line (decision §1)                                      |
| `.agents/hooks.json` (new canonical) | file-create               | Single-source hook registration: verbatim move of root `hooks.json` three entries (`frame-ship-context` PreInvocation `bun ./hooks/context-inject.ts`; `safety-gate`; `format-note`, same matchers/timeouts) (decision §2) |
| `hooks.json` (root)                  | file-delete               | Deprecate/remove after `.agents/hooks.json` verified — eliminates dual-source drift; git history preserves it (decision §2)                                                                                                |
| `plugin.json`                        | file-modify (conditional) | Declare surfaces **only if** the `$schema` v1 contract supports a surfaces/hooks field; otherwise left byte-identical — contract-change gate applies (§Approval)                                                           |
| `AGENTS.md` (root)                   | file-modify               | One-line bridge by reference to `.agents/rules/frame-ship.md` (pointer only, no pasted context; reference-only packets)                                                                                                    |
| verify runbook (post-execute)        | workflow-update           | 5-check verify: mirror byte-identical (diff) + footer intact; rule active as Always On; single hooks source resolves (no root twin); `plugin.json` valid per v1 schema; bridge line resolves                               |

Change types per proposal-template. Explicitly untouched: `.opencode/plugins/frame-ship.ts` + `hooks/context-inject.ts` bodies, `rules/frame-ship.md` source, `agents/` org roster (not the Antigravity `.agents/` discovery path — must not be confused).

## Decisions (single, no drift)

**§1 — Rule activation: Always On (default).** Mirrors opencode `chat.system.transform` behavior, which injects the chain cards + bootstrap unconditionally; the chain contract is "do not skip", so Model Decision would reintroduce the exact skip-risk class this fix removes. Description frontmatter (concise trigger, e.g. `Frame-Ship chain contract — enforce stage load order + guardrails on every session`) rides with it; footer version-lockstep line stays intact.

**§2 — Hooks registration: deprecate root `hooks.json`; `.agents/hooks.json` is the single source.** Antigravity discovers under `.agents/`; keeping both files is dual-source drift by definition. The three entries move verbatim (same commands, matchers, timeouts), then the root file is removed post-verification.

## Rationale

The diagnosed root cause is pathing, not content: the rule body is correct (47 lines, chain + load order + triggers + hard rules + guardrails + v0.6.1 lockstep) but invisible to Antigravity off `rules/`. Mirroring (not moving) preserves opencode/agy parity — `rules/` stays the source, `.agents/rules/` the discovered copy. Single-source hooks + conditional `plugin.json` edit + by-reference bridge complete the 5-step path with zero behavior change to either runtime.

## Alternatives Considered

| Alternative                                                        | Reason Rejected                                                                                                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Model Decision activation                                          | Reintroduces silent-skip risk; contradicts always-inject parity + "do not skip" contract                                 |
| Move (not mirror) `rules/` → `.agents/rules/`                      | Breaks opencode/agy shared source + violates mirror-not-move constraint                                                  |
| Keep root `hooks.json` alongside `.agents/hooks.json` (or symlink) | Dual-source drift on win32-fragile symlinks; violates single-decision constraint                                         |
| Unconditional `plugin.json` surfaces edit                          | Risks inventing a contract the v1 schema doesn't support → triggers avoidable ADR; conditional is the reversible default |
| Version bump with this fix                                         | No behavior change; lockstep constraint holds v0.6.1 across rule + hook + plugin                                         |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering owner) — proposer cannot self-approve; approval recorded at gate
- [ ] review-risk fast gate: **not triggered** — same hook commands/timeouts, no new permissions/scope; screen only. Triggers only if execute uncovers a permission/scope change
- [ ] architect/ADR: **not triggered unless** the `plugin.json` surfaces edit is elected AND changes the v1 contract — then ADR required before execute (prior verdict carried forward)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc is produced.

## Risk Assessment

**Proposer:** vasquez (engineering owner) | **Date:** 2026-09-18 | **Domains-Touched:** [engineering]

### Risk Matrix

| ID    | Risk                                                                 | Likelihood | Impact | Mitigation                                                                                                                               |
| ----- | -------------------------------------------------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| R-001 | Mirror drifts from source on future edits                            | Med        | Med    | Footer lockstep line + execute step writes a drift-check (diff) into the verify runbook; future rule edits update both paths in one unit |
| R-002 | Overwrite loses prior canonical proposal content                     | Low        | Med    | Git history preserves it (singleton note above); HANDOFF will carry the supersession pointer                                             |
| R-003 | `plugin.json` edit breaks v1 schema validation                       | Low        | Med    | Conditional only — validate against `$schema` pre-write; default is leave byte-identical                                                 |
| R-004 | Root `hooks.json` removal strands a consumer still reading root path | Low        | Med    | Remove only post-verification that `.agents/hooks.json` resolves; rollback is `git checkout -- hooks.json`                               |
| R-005 | `.agents/` vs `agents/` path confusion recurs                        | Med        | Low    | This proposal names the discovery path explicitly (`.agents/`); bridge line uses the exact path                                          |

### Blast Radius

Systems: `.agents/rules/`, `.agents/hooks.json`, `plugin.json` (conditional), `AGENTS.md` (one line), root `hooks.json` (removal). Teams: engineering owner only. Customers/regulators/revenue: none (config/docs-only, no auth/data/API/PII, no behavior change). Runtimes (`frame-ship.ts`, `context-inject.ts`) and `skills/`: untouched.

### Rollback Plan

Delete `.agents/rules/frame-ship.md` + `.agents/hooks.json`, restore root `hooks.json` via `git checkout -- hooks.json`, revert the one-line `AGENTS.md` bridge and any `plugin.json` edit; ETA < 10 min; owner vasquez. Mirror is additive until the root removal step, so rollback before removal is delete-only.

### Security Considerations

No secret/token/credential/session in code/config (Guardrails 1–4); hook commands unchanged (`bun ./hooks/...`, same timeouts) so no new trust boundary or privilege (least-privilege holds). No PII surface (Ley 172-13 minimization holds — rule text carries no PII).

### Domain Considerations

Engineering only. Non-touched domains carry no considerations. Any non-engineering need arising at review → formal Cross-domain request to montilla, never sideways.

## Assumptions

1. Antigravity discovery path is `.agents/rules/` + `.agents/hooks.json` (diagnosis packet premise; verify step confirms resolution post-execute).
2. `plugin.json` v1 schema is inspected at execute time; "supports surfaces" is determined by schema read, not assumed.
3. Git history is the preservation mechanism for the superseded consolidation proposal (no archive-move in proposal phase per constraints).

## Trace

`ses_f4dbd8fecffez6VfQUqdImYsr8` diagnosis → this proposal → review-risk screen (fast gate, expected PASS/no-trigger) + architect only-if-contract-change → execute-spec (5 steps) → quality-gate min-review → verify-handoff → ship-release.

## Scoped Evidence (proposal phase)

- `rules/frame-ship.md`: 47 lines; chain + HARD-STOP load order + trigger→skill map + hard rules + guardrails summary + v0.6.1 lockstep footer (line 47).
- `hooks/context-inject.ts`: 135 lines; `VERSION = "0.6.1"` + `MARKER` parity comment; `bun ./hooks/context-inject.ts` invocation.
- Root `hooks.json`: 3 entries (`frame-ship-context` PreInvocation; `safety-gate` PreToolUse `run_command`; `format-note` PostToolUse write matchers), timeout 10 each.
- `plugin.json`: 5 lines; `$schema` Antigravity v1 + `name` + `description` only — no surfaces field today (conditional edit justified).
- `.agents/rules` absent (`Test-Path` False); repo root carries `agents/` (org roster: `c-level/`, `engineering/`, `security/`, …) — distinct from `.agents/` discovery path, called out to prevent confusion.
- Skill loaded: `propose-changes` (proposal + risk per `references/proposal-template.md` + `references/risk-assessment.md`); singleton update-in-place honored.
