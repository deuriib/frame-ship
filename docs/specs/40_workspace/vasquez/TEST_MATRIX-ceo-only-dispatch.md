# Test / Evidence Matrix: SPEC-ceo-only-dispatch

**Agent:** engineering implementer (dispatched by vasquez; executed under generic fallback-to-single — no `task` tool in this harness, per tool-mapping generic adapter row)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]
**Skill:** `skills/execute-spec/SKILL.md` (loaded). **Craft:** `agents/c-level/vasquez.md` + `agents/shared/writer.md` (read full).

| REQ-ID | Evidence ID | Description | Type | Status | Artifact |
|--------|-------------|-------------|------|--------|----------|
| REQ-001 | E-001 | AC-001 dispatch-authorizing grep: 0 hits naming a non-CEO as task caller / granting fan-out outside montilla/tool-mapping (scoped per ADR-003 §Decision.6) | Attestation | pass | this file §AC-001 |
| REQ-001 | E-002 | AC-002 standalone read-through of 1 stripped template (agents/c-level/vasquez.md) — craft standalone-coherent, only dispatch lines cut | Review | pass | this file §AC-002 |
| REQ-001 | E-003 | Route/dispatch stripped from 7 C-level templates (barrera, dauhajre, montero, santana, subero, vasquez, vera); montilla keeps Route + annotated sole dispatcher (negative control) | Review | pass | `agents/c-level/*.md` diffs |
| REQ-001 | E-004 | AC-007 multi-line rewrites landed in translate-to-spec L12/29/31-32, propose-changes L21-23/30, execute-spec L23/28/33, quality-gate L28-30/52/56/58, using-frame-ship L64 + C1 audit rewords (review-architecture:28, review-security:28, verify-handoff:27, ship-release:30; frame-intent:34 no-change) | Review | pass | SKILL diffs |
| REQ-002 | E-005 | AC-003 single dry-run: resolves as direct execution — skill + 1 template read, no `task` call; this unit IS a live single-mode-style run (generic fallback harness, tool-mapping.md:31) | Attestation | pass | this file §AC-003 |
| REQ-003 | E-006 | AC-003 multi dry-run: resolves as CEO-only `task(general)` max 2 parallel with reference-only packets + read-orders (opencode) / spawn_agent+followup_task+wait_agent (Codex, provisional) | Attestation | pass | this file §AC-003 |
| REQ-004 | E-007 | AC-004 plugin intact: `tsc --noEmit` exit 0 (run from `.opencode/` per repo AGENTS.md); plugin committed at 81af290 by concurrent unit, not edited here | Test | pass | this file §AC-004 |
| REQ-005 | E-008 | 4 implementer prompts exist under `skills/templates/implementers/` with brief path + fit + interfaces + report path + <15-line return + "You do not dispatch subagents." (grep 4/4) | Review | pass | `skills/templates/implementers/*.md` |
| REQ-005 | E-009 | C2: `skills/AGENTS.md:24` acknowledges `skills/templates/implementers/` as scoped implementer-prompt location | Watch | pass | `skills/AGENTS.md:24` diff |
| REQ-006 | E-010 | AC-005 tool-mapping rewrite: CEO-only rule + opencode/Codex/generic adapter rows + no-subagents contract line; packets remain reference-only (this run consumed packet by path, never pasted) | Review | pass | `skills/using-frame-ship/references/tool-mapping.md` diff |
| REQ-NF-001 | E-011 | PII/secrets scan over 4 new prompts: no secrets/tokens/credentials; only prohibition statements matched; no personal data | Review | pass | this file §NF-001 |
| REQ-NF-002 | E-012 | OWASP screen: no new endpoints/adapters/boundaries/payloads (docs-only); barrera waiver-with-reason carried (PROPOSED_CHANGES.md:57,93); no execute-stage surface → waiver stands | Sign-off | pass | PROPOSED_CHANGES.md:57,93 |
| REQ-NF-003 | E-013 | Rollback: per-commit revert points recorded (IMPLEMENTATION_PLAN §Rollback Points); NF-003 rollback note rides HANDOFF (verify-handoff stage) | Attestation | pass | IMPLEMENTATION_PLAN-ceo-only-dispatch.md |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`. Non-code REQs use review/sign-off/attestation with artifact path — REQ-ID trace mandatory for all.

## AC-001 (C1) — dispatch-authorizing grep

Scope per ADR-003 §Decision.6: grep for *dispatch-authorizing* references — lines naming a C-level/agent as the `task` caller or granting fan-out (Route/dispatch/fan-out verbs) — outside montilla/tool-mapping. Mechanism-description lines describing the CEO path stay.

- `agents/c-level/`: `Route:` hits = 7 stripped templates now say "no sub-delegation — do the work yourself end to end; cross-domain needs flagged to montilla (CEO)" (vasquez.md:19, barrera.md:19, dauhajre.md:19, subero.md:19, vera.md:19, santana.md:19, montero.md:19) + montilla.md:19 KEPT Route (sole dispatcher anchor). **0 dispatch-authorizing outside montilla.** C1 reword beyond named list: vasquez.md:41 Classify row "You arbitrate → CEO decides dispatch" (was "You arbitrate → dispatch" — removed the C-level dispatch verb).
- `skills/`: all 22 `task(` hits are CEO-path mechanism descriptions ("CEO dispatches/runs/fans out", "barrera runs inside the CEO's task", leaf "you do not dispatch", bootstrap-checklist.md:11 + gate-report.md:36 explicitly exempt per ADR-003 §Decision.6) or frame-intent:34 (montilla's own stage). **0 dispatch-authorizing.**
- Audit of the 5 named mechanism lines: frame-intent:34 no change needed (montilla-owned stage, no C-level caller named); review-architecture:28, review-security:28, verify-handoff:27, ship-release:30 reworded to "CEO dispatches".

## AC-002 — standalone read-through (agents/c-level/vasquez.md)

Verdict: **PASS**. Read full file (77 lines): frontmatter + creed + portable note intact (L1-12); Capabilities shape preserved with Route now "no sub-delegation — do the work yourself end to end" (L19); Working agreement (L21-25), Classify (L36-45), Review Wave (L47-53), DoD (L55-57), Hard Rules (L59-65) untouched; execute-spec stage line (L32) + Delegation (L67-70) + adapter (L72-75) cut to CEO-dispatch wording. No dangling references to removed fan-out capability. Craft sections (Spanish persona, domain chain ownership) fully usable standalone.

## AC-003 — single + multi dry-runs

- **Single (opencode/any harness):** skill(stage) + read(1 craft template) → execute DIRECTLY, no `task` call (tool-mapping.md:35 "single mode: NO task dispatch"). Evidence = this unit's own run pattern: skill loaded, vasquez.md + writer.md read fully, executed by reference, returns deliverable + risks + assumptions + scoped evidence — PASS-shaped.
- **Multi (opencode):** montilla runs `task(subagent_type="general")` max 2 parallel; each prompt orders (1) read stage SKILL.md, (2) read own `agents/<domain>/<agent>.md`, (3) accept SPEC/HARD/GATE/DOMAINS by reference, (4) return deliverable + file list + risks + assumptions + scoped evidence (tool-mapping.md:8-13). C-levels/leaves return, never dispatch (tool-mapping.md:14, L35). Resolution: all returns converge to montilla; reviewer wave at quality-gate runs inside CEO-dispatched tasks (quality-gate/SKILL.md:56-58).
- **Multi (Codex, provisional):** `spawn_agent` → `followup_task` → `wait_agent`, same CEO-only rule (tool-mapping.md:31). Unverified — open question to HANDOFF lessons (SPEC §5, ADR-003 §Decision.5).
- **Generic harness (no subagent tool):** falls back to single (tool-mapping.md:31) — the path this execution took (no `task` tool in env; substitution noted).

## AC-004 — plugin intact

`tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts` from `.opencode/` → **exit 0**. Plugin single-file zero-dep preserved; no agents vendored. Provenance: `.opencode/plugins/frame-ship.ts` committed at 81af290 by the concurrent skill-refs-normalization unit during this run; `git diff HEAD -- .opencode/plugins/frame-ship.ts` empty — this unit made zero edits to the plugin (HARD packet + SPEC §5).

## NF-001 — PII/secrets review (4 new prompts)

Pattern scan `api_key|secret|token|password|credential|PRIVATE KEY|AKIA|JWT-format`: 4 matches, all the *prohibition* clauses ("no secrets, tokens, credentials...") in the Evidence-rule lines of the 4 prompts — **no actual secrets, tokens, credentials, keys, or personal data present**. Prompts carry paths + role contracts only. Finding without proof = REFUTED: no data found. Pass.

## Coverage Summary

- Unit coverage: N/A — docs-only change (non-code; every REQ evidenced by review/attestation instead of code tests)
- Integration coverage: N/A — docs-only
- Evidence coverage: 13/13 REQ-IDs (REQ-001..006 + NF-001..003) with linked artifact or attestation
- Acceptance criteria covered: 7/7 (AC-001..007) — AC-001: this §; AC-002: this §; AC-003: this §; AC-004: this §; AC-005: tool-mapping diff; AC-006: 4 prompt files; AC-007: 5 SKILL diffs