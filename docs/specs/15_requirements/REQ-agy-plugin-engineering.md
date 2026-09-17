# Requirements Index: Antigravity CLI Plugin — TS+Bun Hooks (Engineering)

**Owner:** engineering owner (vasquez)
**Brief Reference:** bounded-initiative short-BRIEF in chat 2026-09-17 + amendments (1:1 opencode parity; root-drop layout)
**Domains-Touched:** [engineering, security, automation/ops]
**Spec:** docs/specs/20_backlog/SPEC-agy-plugin-engineering.md
**Execution_Mode:** single
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..010) so the SPEC/HARD/GATE/DOMAINS packet and evidence chain stay traceable.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | plugin.json at root with $schema + name `frame-ship` + description; additionalProperties false | P0 | docs/cli/plugins (manifest schema) | SPEC-agy-plugin-engineering | engineering | review + bun JSON parse log |
| REQ-002 | hooks.json at root with 3 named hooks (PreInvocation + PreToolUse/PostToolUse with matchers), `bun ./hooks/*.ts` commands + timeout 10 | P0 | docs/hooks (schema + matcher) | SPEC-agy-plugin-engineering | engineering | review + grep |
| REQ-003 | hooks/*.ts stdin-JSON → stdout-JSON per event contract (decision set / {} / injectSteps) | P0 | docs/hooks (I/O contract) | SPEC-agy-plugin-engineering | engineering | test (fixture replay) |
| REQ-004 | Hook set: safety-gate (deny/ask) + format-note ({}) + frame-ship-context (inject) | P0 | short-BRIEF + parity amendment | SPEC-agy-plugin-engineering | engineering | test (replay logs) |
| REQ-005 | Bun execution: `bun ./hooks/*.ts`, no build, bun ≥1.x, win32/pwsh smoke green | P0 | short-BRIEF TS+bun constraint | SPEC-agy-plugin-engineering | engineering | test (version + exit 0) |
| REQ-006 | Install: `agy plugin install .` → staged as `frame-ship`; `agy plugin list` + `/hooks` verify | P1 | docs/cli/plugins (subcommands) | SPEC-agy-plugin-engineering | automation/ops | review + help excerpt |
| REQ-008 | context-inject: first-invocation full cards + live bootstrap (fallback pointer); step≥40 reminder; else {} | P0 | parity amendment (opencode transform+compacting) | SPEC-agy-plugin-engineering | engineering | test (first/compact/later replay) |
| REQ-009 | rules/frame-ship.md persistent cards + version lockstep `[frame-ship v0.4.0]` | P0 | parity amendment | SPEC-agy-plugin-engineering | engineering | review + marker grep |
| REQ-010 | skills/ reused verbatim (zero new files); README 1:1 mapping table + install/verify | P0 | parity + root-drop amendments | SPEC-agy-plugin-engineering | engineering | review + diff stat |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Hook handler latency < timeout (10s per hook); no hanging on empty/unparseable stdin | Performance | Fixture replay p95 < 2s local |
| REQ-NF-002 | Least-privilege matchers; no `*` without justification; permissionOverrides empty in v1 | Security | review (barrera lens) |
| REQ-NF-003 | No secrets/PII in source, fixtures, logs — except documented AWS-docs canary in `hooks/fixtures/pretool-secret.json`; Ley 172-13 minimization, allowlisted excerpts | Security / Privacy | rg scan = 0 findings outside canary fixture |
| REQ-NF-004 | Rollback: `agy plugin disable/uninstall frame-ship` + `git revert` of root plugin files; ETA < 10 min | Operability | Rollback table in proposal + README |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | plugin.json schema exact; hooks.json event shape exact; TS handler I/O exact; `bun` direct-exec; `skills/` byte-untouched; version lockstep marker in 3 files | vasquez |
| security | Secret/destructive patterns → deny/ask with rule-only reason; injected context is local-trusted-only (never stdin echoes); canary fixture documented; scan gate | barrera (lens) |
| automation/ops | Bun ≥1.x prerequisite; per-hook timeout 10s; install/disable/uninstall runbook in README; root-drop `agy plugin install .` | automation owner + engineering |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Plugin root | `plugin.json, hooks.json, hooks/*.ts, rules/frame-ship.md` | REQ-001..005, REQ-008..009 |
| Reused | `skills/` (untouched — proven by diff stat) | REQ-010 |
| Docs | `README.md` (Antigravity section + mapping table) | REQ-006, REQ-010 |
| Guards | scans + diff stat + marker grep in gate | REQ-NF-001..004 |
