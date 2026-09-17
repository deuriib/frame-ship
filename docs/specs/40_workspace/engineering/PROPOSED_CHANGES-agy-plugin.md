# Proposed Changes: engineering specialist (vasquez lens)

**Spec Reference:** docs/specs/20_backlog/SPEC-agy-plugin-engineering.md#REQ-001..010
**Architecture Reference:** docs/specs/10_design/ARCHITECTURE-agy-plugin.md v2 (INV-001..008)
**Requirements Reference:** docs/specs/15_requirements/REQ-agy-plugin-engineering.md (REQ-001..010 + REQ-NF-001..004)
**Agent:** engineering specialist + vasquez (engineering owner) lens
**Date:** 2026-09-17
**Execution_Mode:** single
**Domains-Touched:** [engineering, security, automation/ops]

## Summary

Propose the repo root as the installable agy plugin source (`agy plugin install .`, root-drop per agy best practices) — `plugin.json` + `hooks.json` + three `hooks/*.ts` handlers via `bun` (`frame-ship-context` PreInvocation for 1:1 context parity, `safety-gate` PreToolUse, `format-note` PostToolUse) plus six replay fixtures, `rules/frame-ship.md` persistent cards, and a README Antigravity section with the 1:1 mapping table. `skills/` is reused verbatim (zero new files). Covers REQ-001..010 and ARCH INV-001..008; `mcp/agents/PostInvocation/Stop` stay reserved; opencode runtime, `skills/` content, chain order, and 8-domain catalogue untouched.

**Amendment record (2026-09-17, session):** v1 proposed `plugins/agy-frame-ship-hooks/` subdir + 2 hooks. Amended per orchestrator direction: (1) 1:1 opencode parity for context injection → `context-inject.ts` + `rules/frame-ship.md` + REQ-008..010; (2) root-drop layout → all plugin files at repo root, `plugins/` staging dir removed. Security review re-run as amendment (PreInvocation inject surface).

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `plugin.json` | file-create | Marker manifest: `$schema https://antigravity.google/schemas/v1/plugin.json`, `name: frame-ship`, `description`. Covers REQ-001 / AC-001. |
| `hooks.json` | file-create | 3 named hooks: `frame-ship-context` PreInvocation (no matcher) → `bun ./hooks/context-inject.ts`; `safety-gate` PreToolUse matcher `run_command` → `bun ./hooks/safety-gate.ts`; `format-note` PostToolUse matcher `write_to_file\|replace_file_content` → `bun ./hooks/format-note.ts`; all `timeout: 10`. Covers REQ-002 / AC-002. |
| `hooks/context-inject.ts` | file-create | 1:1 context parity: `invocationNum==0` → one `ephemeralMessage` with workflow + guardrails + pointers cards (same meaning as `frame-ship.ts`, identical `[frame-ship v0.4.0]` marker) + live `skills/using-frame-ship/SKILL.md` read (cwd + `workspacePaths` candidates) with pointer fallback; `initialNumSteps>=40` → compaction reminder; else `{}`. Injected content is local-trusted-only, never stdin echoes. Covers REQ-008 / AC-003+AC-008. |
| `hooks/safety-gate.ts` | file-create | PreToolUse filter: deny destructive/secret/pipe-to-shell patterns with rule-only `reason`; `ask` on privilege-escalation grey zone; `allow` otherwise; unreadable stdin → `ask`. Single JSON to stdout, exit 0. Covers REQ-003/004/007. |
| `hooks/format-note.ts` | file-create | PostToolUse observer: drain stdin, emit `{}` always, exit 0, never blocks. Covers REQ-003/004. |
| `hooks/fixtures/*.json` (6) | file-create | `pretool-allow` → allow; `pretool-deny` → deny; `pretool-secret` → deny, rule-only reason (AWS-docs canary `AKIAIOSFODNN7EXAMPLE`, the one sanctioned scan exception); `posttool-ok` → `{}`; `preinvocation-first` → full-cards inject; `preinvocation-compact` → reminder. Cover AC-003. |
| `rules/frame-ship.md` | file-create | Persistent cards (chain, load order, triggers, hard rules, guardrails, truth) + version-lockstep note (`[frame-ship v0.4.0]`). Covers REQ-009 / AC-008. |
| `README.md` | file-modify | Append Antigravity section: 1:1 mapping table + install (`agy plugin install .`) + verify (`agy plugin list`, `/hooks`) + disable/uninstall + local replay + rollback. Covers REQ-006/010 / AC-005+AC-008. |
| `skills/` | untouched | Reused verbatim as plugin `skills/` dir (REQ-010) — proven by AC-007 diff stat showing zero `skills/` lines. |

Change types per `skills/propose-changes/references/proposal-template.md`. No other files touched: zero lines in `.opencode/plugins/frame-ship.ts`, `skills/`, chain constants, 8-domain catalogue (AC-007 scope guard). `plugins/` staging dir from the superseded v1 proposal was removed before implementation (never committed).

## Rationale

- REQ-001 → root `plugin.json` gives `agy plugin install .` a valid marker (AC-001: bun parse + name-regex log).
- REQ-002 → root `hooks.json` wires all three events with `bun` commands + 10s timeouts (AC-002: dump + `bun` grep).
- REQ-003 → all `.ts` handlers implement stdin→stdout contracts exactly, single JSON + exit 0 (AC-003: replay logs).
- REQ-004 → gate + observer + context-injector cover the shipped surface; `PostInvocation/Stop` stay reserved (no `Stop→continue` loop risk).
- REQ-005 → bun-direct (no build, no committed `node_modules`); win32/pwsh smoke `bun --version` + replay exit 0 (AC-004).
- REQ-006 → README runbook makes install verifiable without prod mutation (AC-005).
- REQ-007 → deny-default + least-privilege matchers + rule-only reasons + canary-documented scan (AC-006 rg + AC-007 diff stat).
- REQ-008 → `context-inject.ts` reproduces transform + compacting without a compaction event (threshold delta documented); dedupe mirrors `hasMarker` (AC-003 replay + AC-008 marker grep).
- REQ-009 → `rules/frame-ship.md` persists the cards for sessions where hooks are disabled; lockstep marker keeps the two harnesses from drifting (AC-008).
- REQ-010 → `skills/` reuse is the strongest parity claim: one source of truth, two harnesses, zero copies (AC-007 proves untouched; README table states the recursion assumption as verify-at-install).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Keep `plugins/agy-frame-ship-hooks/` subdir | Rejected by orchestrator: agy best practice is root-drop (`agy plugin install .`); subdir adds indirection with zero benefit. |
| Shell (`.sh`) handlers instead of TS+bun | Loses type safety + JSON-contract testability; user constrained to TypeScript+bun. |
| Single `*` matcher for all tools | Violates least privilege; explicit matchers gate exactly the risky surface. |
| `Stop` handler for the compaction reminder | Loop risk (`decision: continue` re-enters execution); threshold-based PreInvocation reminder has no loop surface. Revisit only with a dedicated loop-guard review. |
| Copy `skills/` into the plugin (vendored duplicate) | Drift factory: two copies of 10 skills diverge on first edit; reuse + lockstep marker is the 1:1 answer. Full per-file parity audit is a follow-up, not v1. |
| `bun run <script>` / absolute plugin paths in `command` | `bun ./hooks/*.ts` is the documented direct-exec form and stays relocatable after staging. |

## Approval Required From

- [ ] Owning domain owner: engineering owner (vasquez) — mandatory
- [ ] engineering owner (vasquez) — architecture contract surface (INV-001..008, root-drop + parity)
- [ ] security owner (barrera) — stdin trust boundary, secret patterns, injected-content trust (local-only), deny-default (amended `review-security` before gate PASS)

> **Rule:** Proposal phase is closed — implementation below proceeded only on the Conditional security verdict with C-001..C-005 carried as evidence obligations.

---

# Risk Assessment: SPEC-agy-plugin-engineering (amended)

**Proposer:** engineering specialist + vasquez lens
**Date:** 2026-09-17
**Domains-Touched:** [engineering, security, automation/ops]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | `command` cwd differs after staging → `bun ./hooks/*.ts` not found | Med | Med | README pins relative-path assumption + verify step (`/hooks`); fallback absolute `bun "<plugin-dir>/hooks/*.ts"` documented if TUI shows resolution error |
| R-002 | Handler hangs on empty stdin → 10s timeout burn per event | Low | Med | Drain-with-fallback + fast-path defaults (`ask` for gates, `{}` for observer/injector); empty-stdin vector in matrix |
| R-003 | Over-broad deny regex blocks legit commands | Med | Low | Word-boundary regexes + `ask` grey zone; allow-fixture guards benign path |
| R-004 | Secret value echoed in `reason`/logs | Low | High | Rule-only reasons; single documented canary fixture; rg scan gate (AC-006) |
| R-005 | `bun` missing on target machine | Med | Med | README prereq `bun ≥1.x` + `bun --version` smoke; failure is platform-default, documented |
| R-006 | Scope creep into agents/MCP/PostInvocation/Stop without review | Low | Med | AC-007 diff-stat guard (root plugin files + `docs/**` + README only) |
| R-007 | Cards drift: opencode `frame-ship.ts` vs `context-inject.ts` vs `rules/frame-ship.md` diverge | Med | Med | INV-008 lockstep: identical `[frame-ship v0.4.0]` marker in all three, AC-008 grep proves; bump-together rule in rules file + README |
| R-008 | Injected `ephemeralMessage` becomes prompt-injection vector | Low | High | Injected content is local-trusted-only (embedded cards + repo skill file); stdin is never echoed into messages; tamper requires write access to staged plugin dir (same privilege as `hooks.json` tamper, already modeled) |
| R-009 | agy skill discovery doesn't recurse into `skills/*/` (flat-file assumption) | Med | Low | Documented as verify-at-install delta in README; fallback is a flat `skills/using-frame-ship.md` shim (follow-up, not v1); chain still rides the injected context regardless |

## Blast Radius

- **engineering:** new root files (`plugin.json`, `hooks.json`, `hooks/**`, `rules/**`) + README section. Failure: broken hook JSON/TS → `agy` hook errors; no frame-ship runtime impact (separate bundle, `skills/` untouched). Contained by fixture replay + diff-stat guard.
- **security:** stdin is untrusted tool args; stdout is gate decision or injected context. Failure: bad decision → over/under-block; bad inject → noisy context (never a gate bypass — injector emits no decisions). Contained by deny-default INV-007, local-only inject INV-007, barrera amendment review, canary fixtures.
- **automation/ops:** bun prerequisite + 10s timeouts + one extra spawn per model invocation (injector returns `{}` fast after first). Contained by p95 target + timeout ceiling + disable runbook.
- **finance/legal/marketing/people/revenue:** none (no budget/regulatory/brand/team/pipeline surface).

## Rollback Plan

Code: `agy plugin disable frame-ship` (immediate) → `agy plugin uninstall frame-ship` → `git revert` of root plugin files commit. ETA < 10 min, owner: engineering. `skills/` needs no rollback (untouched). No external sends/filings/launches to retract.

## Security Considerations

Trust boundaries: (1) hook stdin (attacker-influenced `CommandLine`) → stdout gate verdict — deny-list + grey-zone `ask` + unreadable → `ask`; (2) injector stdin (invocation counters) → `ephemeralMessage` — content is local-trusted-only, stdin never echoed, no `permissionOverrides`, no `*` matchers. One documented canary (`AKIAIOSFODNN7EXAMPLE`, AWS-docs example) lives in `pretool-secret.json` only. Security owner confirms amendment before gate PASS.

## Domain Considerations

- Automation/ops: bun ≥1.x, 10s per-hook timeout, README runbook (install/verify/disable/uninstall + local replay + root-drop note). Owner: automation + engineering.
- Engineering: schema-exact manifests, contract-exact handlers, bun-direct, `skills/` byte-untouched, lockstep marker in 3 files. Owner: vasquez.
- Security: patterns + deny-default + local-only inject + scan gate. Owner: barrera (lens review).
- Finance/legal/marketing/people/revenue: untouched — deleted per template.
