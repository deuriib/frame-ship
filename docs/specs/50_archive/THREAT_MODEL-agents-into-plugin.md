# Threat Model: SPEC-agents-into-plugin-engineering (STRIDE-lite)

**Methodology:** STRIDE-lite (light config-surface screen, not a deep audit)
**Date:** 2026-09-17
**Scope (by reference only):** docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004; docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md; .opencode/plugins/frame-ship.ts v0.5.0 (precedent)

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| config hook extension (`config.agents` / `config.agent` mirror + `default_agent` + `subagent_depth`) | plugin `config` hook at init | internal (local-trusted-file → config surface); additive only, skills lane untouched |
| file-read loader (`resolveAgentsDir` + `readTextFile` + `parseAgentFile`, static 74-entry MANIFEST) | plugin init file reads under `agents/` | internal (repo-owned `agents/**/*.md` read-only source → config); no network, no user-input paths |
| version triple bump (header + `VERSION` + `MARKER`, v0.5.0 → v0.6.0) | build/typecheck | internal; single-file revert restores v0.5.0 |

## STRIDE Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | No — no authN/Z change; `default_agent="montilla"` is a routing default, not an identity grant; static keys, no caller-controlled identity | N/A; any future authN/Z use of agent keys re-opens full STRIDE |
| Tampering | Yes (Low) — malformed `agents/*.md` body or MANIFEST drift injects prompt content into config | Read-only source (`agents/` untracked per CEO ruling 1); static MANIFEST + AC-001 74-key count check; `parseAgentFile` strips `---` fences; single-file `git revert` rollback |
| Repudiation | No — no audit-relevant actions; init observable via config dump + typecheck log | Out of scope |
| Information Disclosure | No — proposal + SPEC + baseline scan = 0 real findings (only guardrail-text matches); loader never echoes contents (INV-008); `description` verbatim, never rewritten; AC-005 scan gates diff | AC-005 pattern-scan log at execute-spec; allowlisted excerpts only (Ley 172-13 minimization) |
| Denial of Service | No — silent `""` skip-entry, never throw; skills lane works independently; worst case is additive-lane absence, never outage | Guard-clause returns before polluting config |
| Elevation of Privilege | No — `??=` on every insert, never clobbers user keys; minimum scope per key; no perm widening, no key rotation, no prod touch | AC-004 double-init replay log proves idempotency + override survival |

## Residual Risk

MANIFEST drift on roster rename/add (R-001, Med/Med, owner vasquez — regenerate MANIFEST from fresh `agents/**/*.md` scan at execute time, AC-001 blocks completion) remains after mitigations. No secret-echo residual accepted — any echo in implementation or evidence re-raises to High and blocks gate. Owner: security owner (barrera).
