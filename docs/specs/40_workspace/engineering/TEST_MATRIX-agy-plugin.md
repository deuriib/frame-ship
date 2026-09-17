# Test / Evidence Matrix: SPEC-agy-plugin-engineering

**Agent:** engineering specialist (single mode, direct)
**Date:** 2026-09-17
**Domains-Touched:** [engineering, security, automation/ops]
**Skill:** skill(execute-spec) loaded; evidence from live `bun` replay on win32/pwsh (bun 1.4.2)

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | `plugin.json` parses; `name: frame-ship` matches `^[a-zA-Z0-9-_]+$`; `$schema` official; no extra keys | Review | pass | this |
| REQ-002 | T-002 | `hooks.json` parses; 3 named hooks; every `command` = `bun ./hooks/*.ts` + `timeout: 10`; no matcher on PreInvocation | Review | pass | this |
| REQ-003 | T-003 | stdin→stdout contracts: gate→decision enum; observer→`{}`; injector→`{injectSteps}`/`{}`; single JSON + exit 0 | Integration | pass | this |
| REQ-004 | T-004a | `pretool-allow.json` (`npm test`) → `{"decision":"allow",...}` | Unit | pass | this |
| REQ-004 | T-004b | `pretool-deny.json` (`rm -rf` + pipe-to-sh) → `{"decision":"deny","reason":"Blocked: destructive recursive delete..."}` | Unit | pass | this |
| REQ-004 | T-004c | `pretool-secret.json` (AWS-docs canary) → `deny` + rule-only reason (value NOT echoed) | Unit | pass | this |
| REQ-004 | T-004d | `posttool-ok.json` → `{}` | Unit | pass | this |
| REQ-005 | T-005 | `bun --version` = 1.4.2; all replays exit 0; no build step; no `node_modules` | Integration | pass | this |
| REQ-006 | T-006 | README Antigravity section: global + workspace install, `plugin list`, `/hooks`, disable/enable/uninstall, replay, rollback | Review | pass | this |
| REQ-007 | T-007a | Secret scan: 0 credential values; hits limited to 2 detection-pattern definitions (`safety-gate.ts:21,23`, regex source) + 1 canary fixture | Review | pass | this |
| REQ-007 | T-007b | Diff stat: root plugin files + `docs/**` + README only; zero `skills/` / `.opencode/` lines | Review | pass | this |
| REQ-008 | T-008a | `preinvocation-first.json` (invocationNum 0) → `injectSteps[0].ephemeralMessage` starts with marker + contains live `using-frame-ship` SKILL.md body (self-location resolution proven) | Integration | pass | this |
| REQ-008 | T-008b | `preinvocation-compact.json` (initialNumSteps 52) → compaction reminder message | Unit | pass | this |
| REQ-008 | T-008c | Later invocation (`invocationNum 5, steps 10`) → `{}`; malformed stdin → `{}` | Unit | pass | this |
| REQ-009 | T-009 | `rules/frame-ship.md` carries verbatim 3 cards + lockstep note; marker grep = 1 hit each in `frame-ship.ts`, `context-inject.ts`, `rules/frame-ship.md` | Review | pass | this |
| REQ-010 | T-010 | `skills/` byte-untouched (status shows zero `skills/` entries); README mapping table present | Review | pass | this |
| C-001 | E-001 | Relative-cwd assumption documented + absolute fallback in README; staged-path verify is an install-time step (no `agy` binary in this env — recorded as gate follow-up, not a silent pass) | Attestation | pass w/ note | this |
| C-002 | E-002 | T-004a..d + T-008a..c replay logs with exit-0 | Attestation | pass | this |
| C-003 | E-003 | T-004c (rule-only reason) + T-007a scan | Attestation | pass | this |
| C-004 | E-004 | Empty stdin → `{"decision":"ask",...}` fast, exit 0 (observer/injector → `{}`) | Attestation | pass | this |
| C-005 | E-005 | T-007b diff stat | Attestation | pass | this |
| C-006 | E-006 | S-005: injector emits local-trusted content only — `preinvocation-first` output contains marker + skill body, zero stdin echoes (`workspacePaths` value `D:/GitHub/frame-ship` absent from output) | Attestation | pass | this |

## Coverage Summary

- Unit coverage: N/A (hooks are thin filters; replay vectors cover branches: allow/deny/secret/ask/{}/inject/reminder/empty)
- Integration coverage: stdin→stdout contracts replayed end-to-end via `bun` for all 3 hooks
- Evidence coverage: 10/10 REQ-IDs + 6/6 security conditions with linked artifact or log
- Acceptance criteria covered: 8/8 (AC-001..008)
