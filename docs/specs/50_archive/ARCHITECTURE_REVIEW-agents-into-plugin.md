# Architecture Review: SPEC-agents-into-plugin-engineering

**Reviewer:** architect (engineering specialist, design input) — independent verdict; arch arbitration stays with engineering owner (vasquez) at gate
**Date:** 2026-09-17
**Verdict:** Approved
**Scope (by reference only):** docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md (read-only here) / docs/specs/10_design/ARCHITECTURE.md v1 + docs/specs/10_design/API_CONTRACTS.md v1 (canonicals, read-only here)
**Packet:** SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:none-yet / DOMAINS:engineering
**Skill:** skills/review-architecture/SKILL.md (+ references/adr-template.md, architecture-review.md)
**Security:** verdict Approved, 0 findings (docs/specs/40_workspace/security/SECURITY_REVIEW-agents-into-plugin.md) — not overridden here; security conditions (none imposed) owned by security owner.

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (single-file zero-dep, tsc clean) | pass | Proposal touches one committed file (`.opencode/plugins/frame-ship.ts`); no new imports, no static `node:` import, no `package.json` deps; AC-003 (`mise run typecheck` green + diff stat) gates it at execute-spec |
| INV-002 (idempotent, never clobbers) | pass | REQ-003 row: `??=` per `config.agents`/`config.agent` key + `??=` defaults; mirrors proven `skills.paths` `includes()` precedent (frame-ship.ts:127-132); AC-004 double-init replay log gates it |
| INV-003 (prompts are bodies only) | pass | `parseAgentFile` strips `---` fences; `description` verbatim from each file's own frontmatter, never rewritten; AC-002 5-agent spot-check (montilla, vasquez, backend, qa, scout) gates it |
| INV-004 (roster-exact, 74 keys, sole alias) | pass | MANIFEST 74 entries; `montilla` primary; 8 C-levels `all`; 65 `subagent`; sole alias `espinoza-specialist` → `engineering/espinoza.md`; excluded `AGENTS.md`/`README.md`/`delegation-contract.md`; AC-001 key-count gates drift (R-001) |
| INV-005 (defaults stable) | pass | `default_agent ??= "montilla"`, `subagent_depth ??= 2` — apply only when unset; user overrides win; no later SPEC + CEO waiver in play |
| INV-006 (version triple together) | pass | Header comment + `VERSION` + `MARKER` v0.5.0 → v0.6.0 in one commit; `.opencode/plugins/AGENTS.md` ref follows (API_CONTRACTS §5); AC-003 version-grep gates it |
| INV-007 (reference-only provenance) | pass | Agent files read by path at init; no bodies pasted into plugin source or specs beyond AC-002 excerpts; proposal itself modifies no impl files |
| INV-008 (deny-default, no echo) | pass | No secrets/tokens/PII in code/config/logs/examples; loader silent `""` on miss, never echoes contents into reasons/errors; AC-005 pattern scan gates it; concurs with security light-screen Checks 1–3 (all PASS) |

Contract-shape check: proposal §Changes maps 1:1 onto ARCHITECTURE.md Components + Data Flow and API_CONTRACTS §§1–5 (MANIFEST → §1, loaders → §3, hook extension → §§2/4, triple → §5). Zero divergence found — no renamed keys, no new surface, no altered defaults, no canonical edits proposed (CEO ruling 2 honored).

## ADR Required?

- [ ] Yes — ADR-XXX created
- [x] No — change is within existing contracts

Rationale (options considered): (A) No ADR — chosen. ARCHITECTURE.md v1 + API_CONTRACTS.md v1 (both 2026-09-17, citing this SPEC) already record the roster-lane decision: static MANIFEST over glob discovery, `config.agent` mirror for harness compat, Bun-first/dynamic-fallback precedent reuse. The proposal adds an implementation of that recorded decision, not a new decision. (B) New ADR duplicating the v1 rationale — rejected: duplicates the canonicals (DRY violation), re-litigates CEO ruling (2), and is busywork theater per guardrail 13. (C) ADR for the rejected alternatives (two-plugin / glob / subset / patch-version) — rejected: the proposal's §Alternatives Considered already disposes of them with reasons; an ADR that records only rejections without a divergence earns no keep. Trigger for a future ADR: any change to roster size semantics, modes, defaults, loader trust root, or multi-file split — none present here.

## Design Notes (architect input)

- **Patterns, each earning its place:** Static MANIFEST (deterministic roster, drift policed by AC-001 count check — chosen over glob discovery per proposal Alt C); Mirror (`config.agent` plural/singular for harness compat — adapter, not new semantics); Guard (`??=`/`includes()` idempotency — proven precedent, not new machinery); Precedent reuse (`resolveAgentsDir` mirrors `resolveSkillsDir`, `readTextFile` mirrors `loadBootstrapBody` — composition over new abstraction, OCP: hook extended, skills lane unmodified).
- **SOLID:** SRP (MANIFEST data vs. three single-job loader fns vs. hook wiring); OCP (additive lane, existing skills registration/cards/guards untouched); DIP (hook depends on path-string + dynamic-read abstraction, no static `node:` coupling); ISP/LSP N/A at this surface (no subtype hierarchy, no fat interface).
- **DSA / complexity:** init-time O(n), n = 74 small markdown reads, per-path cache allowed, zero per-message I/O (roster resolves once at `config` time). At 10x roster size the bound still holds (linear file reads at init); failure mode is skip-entry, never wedge (availability note). No pagination/indexing/caching layer warranted — KISS holds.
- **TDD trajectory (for execute-spec):** RED = AC-001 key-count ≠ 74 / AC-002 frontmatter fence leak / AC-004 double-init diff non-empty / AC-003 typecheck red / AC-005 scan hit; GREEN = minimal MANIFEST + loader + hook + triple satisfying each; REFACTOR = dedupe loader against `loadBootstrapBody` precedent only if zero-dep + idempotency invariants stay green.

## Conditions for Approval

None — 8/8 invariants pass, no divergence, no conditions imposed by this review. Execute-spec carries existing SPEC acceptance as gate evidence (AC-001..005 per proposal §Traceability). Security conditions: none imposed (security Approved outright) — this review does not override them. Rejected triggers (block execute-spec, escalate to orchestrator): `=` clobber instead of `??=`; static `node:` import or new dep; dynamic/user-derived path; content echo in errors/logs; secrets/PII in diff; canonical edits without ADR; impl-file mods outside the single approved plugin file.

## Risks

- R-001 manifest drift → policed by AC-001 count check + fresh disk re-scan at execute time (owner: execute-spec author).
- R-002 double-init clobber → policed by AC-004 replay log (owner: execute-spec author).
- R-003 frontmatter/secret leak → policed by AC-002 excerpts + AC-005 scan (owner: execute-spec author).
- R-004 init I/O wedge → contract Availability (skip-entry) + skills-lane independence; no new risk beyond precedent.
- R-005 triple drift → single-commit triple + ref follow, AC-003 grep.
- Meta-risk: proposal author is the engineering owner — mitigated by this independent design-input verdict + security's independent Approved + gate/orchestrator verification still to come. No self-approval claimed here.

## Assumptions

1. Disk roster at execute time still resolves to 74 keys (77 files minus 3 excluded); execute-spec re-verifies (proposal Assumption 2).
2. Next version v0.6.0 (minor, additive lane); gate/orchestrator may rule otherwise — triple moves together regardless.
3. Stale `PROPOSED_CHANGES.md` reuse is workspace scratch, not history rewrite; naming/promotion questions ride to gate per CEO ruling (2).
4. Single-domain (engineering); any cross-domain need arising later goes as formal Cross-domain request to orchestrator, never sideways — none at this stage.

## Scoped Evidence

- Read-only: `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` (§§1–7 + roster enumeration), `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (Changes/Rationale/Alternatives/Risks/Traceability), `docs/specs/10_design/ARCHITECTURE.md` v1 (Components/Data Flow/INV-001..008), `docs/specs/10_design/API_CONTRACTS.md` v1 (§§1–6), `.opencode/plugins/frame-ship.ts` v0.5.0 baseline (skills hook 127-132, resolver/loader precedent 57-117, VERSION/MARKER 10-11), `docs/specs/40_workspace/security/SECURITY_REVIEW-agents-into-plugin.md` (Approved, 0 findings).
- No impl files modified; no bodies pasted; no full-dump export (reference-only packet honored).
- This review file is the sole new artifact; committed alone per skill §3 step 6.

## Cross-Domain Request

None — engineering-only spec, no finance/legal/marketing/people/revenue/automation impact (proposal §Domain Considerations concurs).

## Sign-off

- [x] architect (engineering specialist, design input) — verdict Approved, no ADR, 2026-09-17
- [ ] engineering owner (vasquez) — arch arbitration + MANIFEST/loader exactness (AC-001/AC-002) at gate
- [ ] orchestrator — gate + waiver authority only
