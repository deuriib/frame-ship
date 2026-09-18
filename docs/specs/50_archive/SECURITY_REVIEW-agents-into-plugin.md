# Security Review: SPEC-agents-into-plugin-engineering (light config-surface screen)

**Reviewer:** barrera (CISO, security owner) — read-only, no impl mods, no freelance fixes
**Date:** 2026-09-17
**Verdict:** Approved
**Scope (by reference only):** docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md / .opencode/plugins/frame-ship.ts v0.5.0 (baseline precedent only)
**Packet:** SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:none-yet / DOMAINS:engineering
**Skill:** skills/review-security/SKILL.md (+ references/security-review-template.md, threat-model.md)
**Mode:** LIGHT screen — owning engineer ruled no authN/Z, no datastores/PII, no external APIs, no secrets; this review verifies that claim on the proposal surface only (no deep audit, no STRIDE-full).

## Threat Model

See `docs/specs/40_workspace/security/THREAT_MODEL-agents-into-plugin.md` for STRIDE-lite (local-trusted-file → config surface, 6-row table, residual + owner).

## Findings

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| — | — | No findings. All three screen checks PASS (see evidence below). | — |

Findings without proof (diff/scan/log ref) = REFUTED per guardrail 1. No Critical/High — nothing to escalate same-session beyond this Approved record.

### Check 1 — Least-privilege on the extended config hook: PASS

- Proposal REQ-003 row: `config.agents[key] ??=` + `config.agent[key] ??=` mirror per MANIFEST entry, `default_agent ??= "montilla"`, `subagent_depth ??= 2`; "never overwrite existing user keys; skip-entry on loader miss, never throw init".
- Mirrors proven `skills.paths` precedent (`frame-ship.ts:127-132`: `??=`, `includes()` before push, early return on unresolvable base). Minimum scope per key; no wide/shared/cross-tenant grant; no perm widening (guardrails 3–4 hold).

### Check 2 — File-read loader stays local: PASS

- `resolveAgentsDir(fallbackBase)` mirrors `resolveSkillsDir` from own `import.meta.url`, fallback `directory || worktree` — same trust root as skills lane, no new base. Static MANIFEST (74 entries, `espinoza-specialist` single documented alias); no dynamic/user-derived path construction; no `../` traversal in proposal paths (grep evidence below).
- `readTextFile`: Bun.file first, dynamic `node:fs/promises` fallback, silent `""` on miss — never wedges init (R-004). `parseAgentFile`: `description` verbatim from own frontmatter, `prompt` = body with `---` fences stripped; loader never echoes contents (INV-008, REQ-NF-003).

### Check 3 — Guardrails 1–4 hold: PASS

- G1 (deny default / no secrets): `rg` scan over PROPOSED_CHANGES.md + SPEC + plugin = 0 real findings — only guardrail-text mentions + design statements of absence (log below). AC-005 scan gates execute-spec diff.
- G2 (OWASP): no new endpoints/adapters/boundaries/payloads — trust boundary is local-trusted-file → config surface only. No authN/Z change, no injection sink (prompts are repo-owned bodies, stdin never echoed), no insecure deps (zero-dep, no static `node:` import).
- G3 (least privilege): see Check 1.
- G4 (no freelance fixes): proposal §Rollback is `git revert` of one file, ETA < 15 min; explicitly "no key rotation, prod patch, or perm widening". Nothing for this review to rotate/patch/widen.

## Conditions for Approval

None — Approved outright. Execute-spec carries existing SPEC acceptance as gate evidence (no new security conditions imposed):

- AC-003: `mise run typecheck` green + no new deps + single-file diff stat.
- AC-004: double-init replay log (`JSON.stringify` before == after second run, user overrides survive).
- AC-005: secret/PII pattern scan over the plugin diff = 0 findings (scan log).

Rejected triggers (block execute-spec, escalate to orchestrator): secrets/PII in diff or evidence; dynamic path from user/config input; content echo in errors/logs; clobber (`=` instead of `??=`); static `node:` import or new dep; freelance fix instructions; full-dump transcript export.

## Sign-off

- [x] security owner (barrera, CISO) — binding verdict: Approved (2026-09-17)
- [ ] engineering owner (vasquez) — MANIFEST exactness + loader exactness (AC-001/AC-002)
- [ ] orchestrator — gate + waiver authority only

Review-architecture: not raised by this review — no contract shape divergence per SPEC §6 (canonical ARCHITECTURE/API_CONTRACTS v1 unchanged); engineering owner confirms at gate. Assumption stated; override breaks default only with engineering-owner + orchestrator waiver.
