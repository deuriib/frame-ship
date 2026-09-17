# Spec: Agents Into Plugin Config — Single-File Roster (Engineering)

**ID:** SPEC-agents-into-plugin-engineering
**Owner:** vasquez (engineering owner, domain chain owner)
**Domains-Touched:** [engineering]
**Brief Reference:** docs/briefs/BRIEF-agents-into-plugin.md#OKRs (read-only; paired OKRs: docs/briefs/OKR-agents-into-plugin.md)
**Status:** draft
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from brief, frozen at frame-intent; override only with CEO waiver)

## 1. Context

`frame-ship.ts` v0.5.0 registers only `skills.paths` — the agent roster under `agents/` is invisible to the harness, so CEO/C-level dispatch has no routable team. A proven previous plugin (`frame-ship-agents`) solved this with a static MANIFEST + file loader + `config.agents`/`config.agent` mirror + `default_agent` + `subagent_depth`. This spec ports that mechanism into the single-file runtime, unchanged in behavior, so installing frame-ship alone brings the full roster. Single-domain (engineering only); no cross-cutting review.

## 2. Requirements

- REQ-001: Port static MANIFEST — full roster (74 agent files; same names/files/modes; `engineering/espinoza.md` aliased to key `espinoza-specialist`) into `.opencode/plugins/frame-ship.ts`
- REQ-002: Port `resolveAgentsDir` + `readTextFile` (Bun.file first, dynamic node:fs fallback) + `parseAgentFile` (description from own frontmatter + clean body, frontmatter stripped)
- REQ-003: Extend existing `config` hook to fill `config.agents` + `config.agent` mirror idempotently + `default_agent=montilla` + `subagent_depth=2`, never clobbering user overrides
- REQ-004: Version bump triple — header comment + `VERSION` + `MARKER` together (v0.5.0 → next)
- REQ-NF-001: Single-file, zero-deps, `tsc` clean (existing `mise run typecheck` contract holds)
- REQ-NF-002: Idempotent registration — double-init produces no duplicates in `skills.paths`, `config.agents`, or `config.agent`
- REQ-NF-003: No secrets/tokens/credentials/PII in code, config, logs, or examples; agent prompts are bodies only
- REQ-NF-004: Reversible — `git revert` of the single plugin file restores prior runtime; ETA < 15 min

## 3. Acceptance Criteria

- [ ] AC-001: Post-init `config.agents` key count == 74 roster keys (KR-1.1); `default_agent==montilla`, `subagent_depth==2` — evidence: init log / config dump excerpt
- [ ] AC-002: Spot-check 5 agents (montilla, vasquez, backend, qa, scout) — real bodies + descriptions, no raw frontmatter fences (KR-1.2) — evidence: excerpt grep
- [ ] AC-003: `mise run typecheck` passes; `package.json` gains no deps; plugin stays one committed file (KR-2.1) — evidence: typecheck log + diff stat
- [ ] AC-004: Double-init diff shows no duplicate paths/keys and user-supplied `config.agents` entries survive (KR-2.2) — evidence: idempotency replay log
- [ ] AC-005: Secret/PII pattern scan over the plugin diff = 0 findings (REQ-NF-003) — evidence: scan log

## 4. Contracts & Interfaces

Engineering config contract only (no HTTP/RPC surface). Canonical shapes live in `docs/specs/10_design/API_CONTRACTS.md` v1; summary:

- `config.agents: Record<key, { description, prompt, mode }>` — keys: `montilla` (primary), 8 C-levels (`all`), 65 specialists (`subagent`); `espinoza-specialist` aliases `agents/engineering/espinoza.md`
- `config.agent` mirror of the same record (harness compat); `default_agent="montilla"`; `subagent_depth=2`
- Loader fns (TS-internal): `resolveAgentsDir(fallbackBase)`, `readTextFile(path)`, `parseAgentFile(raw)` — Bun.file first, dynamic `node:fs/promises` fallback, no static `node:` import
- Invariants: (1) single-file zero-dep; (2) idempotent, never clobbers; (3) frontmatter stripped from prompts; (4) version triple bumped together
- Data lens: N/A (no schemas, lineage, or stores — file bodies only)

## 5. Out of Scope

Rewriting any agent body or description; renaming agents, files, or modes (except the mandated `espinoza-specialist` alias key); restoring remote `frame-ship@git+...` self-compose ref; adding npm deps or touching `~/.config/opencode/`; rotating keys, prod deploys, permission widening.

## 6. Dependencies

Upstream: `.opencode/plugins/frame-ship.ts` v0.5.0 (config hook + `resolveSkillsDir`/`loadBootstrapBody` precedent); `agents/**/*.md` roster (74 files, authoritative bodies); `docs/briefs/BRIEF-agents-into-plugin.md` (read-only). Downstream: `propose-changes` (PROPOSED_CHANGES.md pre-approval), `review-security` (config-surface screen), `review-architecture` (ADR only if contract shape diverges — not expected). No cross-domain sign-offs (single-domain per brief).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | config dump key count (74) |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | 5-agent spot-check excerpts |
| REQ-003 | AC-001, AC-004 | PROPOSED_CHANGES.md | config dump + double-init log |
| REQ-004 | AC-003 | PROPOSED_CHANGES.md | version grep (header+VERSION+MARKER) |
| REQ-NF-001 | AC-003 | PROPOSED_CHANGES.md | `mise run typecheck` log + diff stat |
| REQ-NF-002 | AC-004 | PROPOSED_CHANGES.md | double-init replay log |
| REQ-NF-003 | AC-005 | PROPOSED_CHANGES.md | pattern scan log (0 findings) |
| REQ-NF-004 | — (process) | PROPOSED_CHANGES.md | rollback note (git revert) |

## Roster (enumerated 2026-09-17 via `agents/**/*.md` scan; excluded: `AGENTS.md`, `README.md`, `delegation-contract.md`)

- `c-level/` (9): `montilla` (primary, default_agent) + `all`: barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera
- `engineering/` (15, subagent): architect, automation-engineer, automation-reviewer, backend, data-engineer, devops, espinoza→`espinoza-specialist`, frontend, qa, review-data, review-readability, review-refuter, review-reliability, review-resilience, review-risk
- `security/` (6, subagent): security, security-reviewer, iam-specialist, privacy-engineer, incident-responder, grc-analyst
- `finance/` (14, subagent): accountant, cost-analyst, credit-analyst, finance-reviewer, financial-analyst, fpna-analyst, internal-auditor, investment-analyst, payroll-specialist, personal-finance, personal-investor, risk-analyst, tax-specialist, treasurer
- `legal/` (8, subagent): compliance-officer, contract-drafter, ip-counsel, labor-counsel, legal-researcher, legal-reviewer, litigation-counsel, privacy-counsel
- `marketing/` (9, subagent): brand-reviewer, brand-strategist, content-strategist, copywriter, email-marketer, marketing-analyst, ppc-specialist, seo, social-media
- `people/` (4, subagent): friction-mediator, people-operations, people-reviewer, performance-analyst
- `revenue/` (5, subagent): deal-closer, funnel-optimizer, pricing-strategist, revenue-reviewer, revops-analyst
- `shared/` (4, subagent): explore, general, scout, writer

Packet: `SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:none-yet / DOMAINS:engineering`. Data lens: N/A.
