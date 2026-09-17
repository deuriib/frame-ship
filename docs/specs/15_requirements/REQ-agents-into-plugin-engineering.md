# Requirements Index: Agents Into Plugin Config — Single-File Roster (Engineering)

**Owner:** vasquez (engineering owner, domain chain owner)
**Brief Reference:** docs/briefs/BRIEF-agents-into-plugin.md + docs/briefs/OKR-agents-into-plugin.md
**Domains-Touched:** [engineering]
**Spec:** docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..004 + REQ-NF-001..004) so the SPEC/HARD/GATE/DOMAINS packet and evidence chain stay traceable.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Static MANIFEST ported into `frame-ship.ts`: full 74-file roster, same names/files/modes, `engineering/espinoza.md` aliased to `espinoza-specialist` | P0 | BRIEF Scope (In-1), OKR KR-1.1 | SPEC-agents-into-plugin-engineering | engineering | review + config key count |
| REQ-002 | `resolveAgentsDir` + `readTextFile` (Bun.file first, dynamic node:fs fallback) + `parseAgentFile` (description + clean body, frontmatter stripped) | P0 | BRIEF Scope (In-2), OKR KR-1.2 | SPEC-agents-into-plugin-engineering | engineering | review + 5-agent spot-check |
| REQ-003 | `config` hook fills `config.agents` + `config.agent` mirror idempotently + `default_agent=montilla` + `subagent_depth=2`, never clobbering user overrides | P0 | BRIEF Scope (In-3), OKR KR-1.1/KR-2.2 | SPEC-agents-into-plugin-engineering | engineering | test (double-init log) |
| REQ-004 | Version bump triple: header comment + `VERSION` + `MARKER` together | P0 | BRIEF Scope (In-4) | SPEC-agents-into-plugin-engineering | engineering | review + version grep |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Single-file, zero-deps, `tsc` clean after the change | Engineering | `mise run typecheck` exit 0; diff stat = 1 file |
| REQ-NF-002 | Idempotent registration: double-init yields no duplicates, user entries survive | Reliability | Double-init replay log: before == after |
| REQ-NF-003 | No secrets/tokens/credentials/PII in code, config, logs, examples; prompts are bodies only (Ley 172-13 minimization) | Security / Privacy | Pattern scan over plugin diff = 0 findings |
| REQ-NF-004 | Reversible via `git revert` of the single plugin file | Operability | Rollback note in proposal; ETA < 15 min |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | MANIFEST roster-exact (74 keys, sole alias documented); loader mirrors `resolveSkillsDir`/`loadBootstrapBody` precedent (no static node: import); `??=`/`includes()` on every insert; version triple bumped together; `tsc` green | vasquez |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Plugin runtime | `.opencode/plugins/frame-ship.ts` (unchanged this stage — contract only) | REQ-001..004, REQ-NF-001..004 |
| Roster source | `agents/**/*.md` (74 files, read-only this stage) | REQ-001, REQ-002 |
| Contracts | `docs/specs/10_design/ARCHITECTURE.md` v1 + `docs/specs/10_design/API_CONTRACTS.md` v1 | all REQs |
| Intent | `docs/briefs/BRIEF-agents-into-plugin.md` + `docs/briefs/OKR-agents-into-plugin.md` | OKR KR-1.1/1.2/2.1/2.2 |
