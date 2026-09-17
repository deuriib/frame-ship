# Spec: Antigravity CLI Plugin — TypeScript+Bun Hooks (Engineering)

**ID:** SPEC-agy-plugin-engineering
**Owner:** engineering owner (vasquez)
**Domains-Touched:** engineering, security, automation/ops
**Brief Reference:** bounded-initiative short-BRIEF in chat 2026-09-17 (no BRIEF file per bounded path) + session amendments 2026-09-17 (1:1 opencode parity for context injection; root-drop layout per agy best practices)
**Status:** draft
**Priority:** P0
**Execution_Mode:** single (frozen at frame-intent; override only with orchestrator waiver)

## 1. Context

`agy` (Antigravity CLI v1.2.0) loads namespaced plugin bundles from `~/.gemini/antigravity-cli/plugins/<plugin_name>/` with mandatory `plugin.json` and optional `hooks.json` + `skills/|agents/|rules/|mcp_config.json`. Hooks intercept `PreToolUse / PostToolUse / PreInvocation / PostInvocation / Stop` with stdin-JSON → stdout-JSON contracts. This spec defines the repo root itself as the installable plugin source (`agy plugin install .`), with hook handlers in TypeScript executed via `bun` — and, per amendment, 1:1 context-injection parity with `.opencode/plugins/frame-ship.ts` v0.4.0: the same `skills/` directory serves both harnesses, `rules/frame-ship.md` carries the persistent cards, and a `PreInvocation` hook injects the workflow card + guardrails + live bootstrap (mirroring `chat.system.transform`) plus the compaction reminder (mirroring `session.compacting`).

Reference docs (by reference only, never pasted): `https://antigravity.google/docs/cli/plugins/` (plugin.json schema, filesystem layout, `agy plugin` subcommands) + `https://antigravity.google/docs/hooks/` (hooks.json schema, matcher, I/O contracts).

## 2. Requirements

- REQ-001: Repo root contains `plugin.json` with `$schema: https://antigravity.google/schemas/v1/plugin.json`, `name: frame-ship` (matches `^[a-zA-Z0-9-_]+$`), `description`; `additionalProperties: false` holds.
- REQ-002: Repo root contains `hooks.json` mapping 3 named hooks (`frame-ship-context` PreInvocation, `safety-gate` PreToolUse with `matcher`, `format-note` PostToolUse with `matcher`); each handler has `type: command`, `command` invoking `bun` on a repo-local `./hooks/*.ts` path, `timeout: 10`.
- REQ-003: Each `hooks/*.ts` script reads the full stdin JSON payload, implements the event's Output contract exactly (`PreToolUse → {decision, reason?}` with decision in `allow|deny|ask|force_ask|deny_unless_prior_grant`; `PostToolUse → {}`; `PreInvocation → {injectSteps?}` or `{}`), writes single JSON object to stdout, exits 0 on success.
- REQ-004: Hook set ships working: (a) `safety-gate` PreToolUse on `run_command` denying secret exfiltration / destructive commands with `decision: deny|ask + reason`; (b) `format-note` PostToolUse on `write_to_file|replace_file_content` returning `{}` and never blocking; (c) `frame-ship-context` PreInvocation injecting chain context (REQ-008).
- REQ-005: Bun execution contract: scripts run with `bun ./hooks/<name>.ts` (bun ≥1.x), no compile step, no `node_modules` commit; `bun --version` + `bun ./hooks/*.ts < fixture.json` smoke passes on win32/pwsh.
- REQ-006: Install path works: `agy plugin install .` from repo root stages to `~/.gemini/antigravity-cli/plugins/frame-ship/`; `agy plugin list` shows it; `/hooks` in TUI lists the loaded hooks.
- REQ-007: Security/privacy guardrails hold: deny-default, no secret/token/credential/session in code/config/logs/examples (except the documented AWS-docs canary in `hooks/fixtures/pretool-secret.json`), OWASP screen (injection via matcher/command, broken authN/Z via permissionOverrides), least-privilege matchers (no `"*"` unless justified), PII minimization per Ley 172-13 (stdin payloads logged only as allowlisted excerpts).
- REQ-008: 1:1 context-injection parity — `hooks/context-inject.ts` on `invocationNum == 0` (0-indexed per official hooks docs; if a build ever sends 1-based, `rules/frame-ship.md` still orients the session — documented backstop) emits one `ephemeralMessage` with the live `skills/using-frame-ship/SKILL.md` body (plugin root resolved from the hook's own `import.meta.url`, mirroring opencode `resolveSkillsDir`, with cwd + `workspacePaths` fallbacks and silent pointer fallback); when `initialNumSteps >= 40` it emits the compaction reminder instead (agy has no compaction event); otherwise emits `{}` (dedupe mirrors opencode `hasMarker`, exactly-once full inject).
- REQ-009: `rules/frame-ship.md` carries the persistent chain context (chain order, load order, trigger→skill map, hard rules, guardrails summary, truth pointer) and declares version lockstep with `.opencode/plugins/frame-ship.ts` (`[frame-ship v0.4.0]` marker greppable in both; bump together).
- REQ-010: `skills/` is reused verbatim — zero new skill files; the same directory the opencode plugin registers via `config.skills.paths` is the agy plugin `skills/` directory. README documents the opencode→agy mapping table (config→skills/, system.transform→PreInvocation, session.compacting→threshold reminder) and the known delta (agy skill discovery is file-based per docs; recursive `SKILL.md` loading assumed, flagged as verify-at-install).

## 3. Acceptance Criteria

- [ ] AC-001: `plugin.json` validates against official schema (evidence: `bun` JSON parse + regex check log for `name` in test matrix).
- [ ] AC-002: `hooks.json` parses, all three hooks load, every `command` string contains `bun` + `./hooks/*.ts` reference (evidence: file dump + grep in test matrix).
- [ ] AC-003: Fixture replay: benign `npm test` → `allow`; `rm -rf` + pipe-to-shell → `deny`; secret canary → `deny` with rule-only `reason` (no value echoed); `PostToolUse` → `{}`; `PreInvocation` first → `injectSteps[0].ephemeralMessage` contains `[frame-ship v0.4.0]` + chain; `PreInvocation` compact → reminder message; later invocation → `{}` (evidence: stdin→stdout logs).
- [ ] AC-004: All three hooks exit 0 on win32/pwsh with `bun --version` recorded (evidence: command log).
- [ ] AC-005: Install docs verified by reading `agy plugin list` help text; no prod mutation required (evidence: README install section).
- [ ] AC-006: Secret/PII scan shows zero credential values; expected hits are limited to detection-pattern definitions in `hooks/safety-gate.ts` (regex source, not values) + the documented canary in `hooks/fixtures/pretool-secret.json` (evidence: `rg` log for `AKIA|BEGIN PRIVATE|sk-live|xox[bap]-|password` in gate, hits reviewed and dismissed with proof).
- [ ] AC-007: `git status --porcelain` / diff shows only root plugin files (`plugin.json`, `hooks.json`, `hooks/**`, `rules/**`) + `docs/**` + `README.md` — zero lines in `.opencode/plugins/frame-ship.ts`, `skills/`, chain order, or 8-domain catalogue (evidence: diff stat in gate).
- [ ] AC-008: Parity proof — `[frame-ship v0.4.0]` greps in both `.opencode/plugins/frame-ship.ts` and (`hooks/context-inject.ts` + `rules/frame-ship.md`); README carries the 1:1 mapping table (evidence: grep log + README section).

## 4. Contracts & Interfaces

Plugin source layout (repo root IS the plugin — root-drop per agy best practices, `agy plugin install .`):

```text
./
├── plugin.json                    # Required marker — $schema + name: frame-ship + description
├── hooks.json                     # frame-ship-context (PreInvocation) + safety-gate + format-note
├── hooks/
│   ├── safety-gate.ts             # PreToolUse on run_command → {decision, reason}
│   ├── format-note.ts             # PostToolUse on write events → {}
│   ├── context-inject.ts          # PreInvocation → {injectSteps} | {} (1:1 context parity)
│   └── fixtures/
│       ├── pretool-allow.json     # → allow
│       ├── pretool-deny.json      # → deny (destructive + pipe-to-shell)
│       ├── pretool-secret.json    # → deny, rule-only reason (AWS-docs canary)
│       ├── posttool-ok.json       # → {}
│       ├── preinvocation-first.json    # invocationNum 0 → full cards + live bootstrap
│       └── preinvocation-compact.json  # initialNumSteps 52 → compaction reminder
├── rules/
│   └── frame-ship.md              # persistent cards + version lockstep note
├── skills/                        # REUSED VERBATIM — same dir opencode registers (REQ-010)
└── README.md                      # + Antigravity section: mapping table + install + verify
```

1:1 mapping (opencode → agy):

| opencode (`frame-ship.ts`) | agy (this plugin) | Notes |
|---|---|---|
| `config` appends `<root>/skills` to `skills.paths` | repo-root `skills/` staged as plugin `skills/` | same files, zero copies |
| `chat.system.transform` pushes 3 cards | `frame-ship-context` PreInvocation, `invocationNum==0` | same meaning, `MARKER` identical |
| `loadBootstrapBody` live SKILL.md + silent fallback | `loadBootstrapBody` in `context-inject.ts` (cwd + `workspacePaths` candidates) + pointer fallback | same behavior |
| `session.compacting` reminder | reminder when `initialNumSteps >= 40` | agy has no compaction event — documented delta |
| `hasMarker` dedupe | exactly-once full inject (`invocationNum==0` only) | same guarantee |

`plugin.json` contract (per official schema): `name: frame-ship`, `$schema` official URL, one-line `description`.

`hooks.json` contract: three named hooks as in file; every `command` is `bun ./hooks/<n>.ts` with `timeout: 10`; PreInvocation entry carries no `matcher` (ignored per docs).

TS handler contract (all scripts): read stdin fully → `JSON.parse` → branch → `console.log(JSON.stringify(output))`. No network, no fs writes, no secrets in stdout. `bun` executes TS directly (no build).

## 5. Out of Scope

- `mcp_config.json`, `agents/` bundle content — reserved, not shipped in v1 (no MCP servers, no subagent templates yet).
- `PostInvocation` / `Stop` handlers — reserved, not shipped in v1 (no loop-risking `Stop→continue`).
- Rotating keys, patching prod, widening perms (no freelance fixes).
- Changing frame-ship chain order, opencode plugin runtime (single-file zero-dep), `skills/` content, or 8-domain catalogue — parity is additive context only.

## 6. Dependencies

- Upstream: Antigravity CLI `agy` v1.2.0 + `bun` ≥1.x on PATH; docs by reference only (plugins + hooks pages in §1).
- Sibling lenses: security (matcher least-privilege, secret patterns, injected-content trust), automation/ops (bun runbook, timeout discipline) — inline in this single-spec, no parallel specs.
- Downstream: `frame-ship:propose-changes` amendment (packet `SPEC:docs/specs/20_backlog/SPEC-agy-plugin-engineering.md#REQ-001..010 / HARD:single+win32-pwsh+bun-ts+root-drop / GATE:security-conditional / DOMAINS:[engineering,security,automation/ops]`), `review-security` amendment (PreInvocation inject surface), then `execute-spec` (this session), then `quality-gate`.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES-agy-plugin.md (amended) | schema validation log |
| REQ-002 | AC-002 | PROPOSED_CHANGES-agy-plugin.md (amended) | hooks.json dump + grep |
| REQ-003 | AC-003 | PROPOSED_CHANGES-agy-plugin.md (amended) | fixture stdin→stdout logs |
| REQ-004 | AC-003 | PROPOSED_CHANGES-agy-plugin.md (amended) | allow/deny/secret/{}/inject logs |
| REQ-005 | AC-004 | PROPOSED_CHANGES-agy-plugin.md (amended) | bun version + exit-0 log |
| REQ-006 | AC-005 | PROPOSED_CHANGES-agy-plugin.md (amended) | README + help excerpt |
| REQ-007 | AC-006, AC-007 | PROPOSED_CHANGES-agy-plugin.md (amended) | rg scan + diff stat |
| REQ-008 | AC-003, AC-008 | PROPOSED_CHANGES-agy-plugin.md (amended) | inject replay + marker grep |
| REQ-009 | AC-008 | PROPOSED_CHANGES-agy-plugin.md (amended) | marker grep + rules review |
| REQ-010 | AC-007, AC-008 | PROPOSED_CHANGES-agy-plugin.md (amended) | diff stat (skills/ untouched) + README table |
