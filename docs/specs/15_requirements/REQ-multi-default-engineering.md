# Requirements Index: Multi-default — engineering lane

**Owner:** vasquez (engineering owner)
**Brief Reference:** docs/briefs/BRIEF-multi-default.md
**Domains-Touched:** [engineering] (people lane parallel, owned by santana)
**Spec:** docs/specs/20_backlog/SPEC-multi-default-engineering.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..007 + REQ-NF-001..002) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | translate-to-spec §3 + spec-template to multi-only (pre-flight/dispatch/carry-forward; sequential same-thread degradation; Execution_Mode line multi-only) | P0 | BRIEF Scope (engineering), OKR KR-1.1/1.2 | SPEC-multi-default-engineering | engineering | grep + review |
| REQ-002 | execute-spec §3 to multi-only (mode-confirm multi-subagents; orchestrator-dispatch / sequential degradation; plan/matrix singletons unchanged) | P0 | BRIEF Scope, OKR KR-1.2 | SPEC-multi-default-engineering | engineering | grep + review |
| REQ-003 | quality-gate §3 + gate-report Load-Evidence to multi-only (min-gate removed; full-wave + refuter-before-qa único) | P0 | BRIEF Scope, OKR KR-2.1 | SPEC-multi-default-engineering | engineering | grep + review |
| REQ-004 | Mode lines in proposal-template + dod-checklist to multi-only, non-mode content byte-identical | P0 | BRIEF Scope, OKR KR-1.2 | SPEC-multi-default-engineering | engineering | diff + review |
| REQ-005 | git-worktree SKILL lanes-as-norm (multi process; max-2 kept; execution_mode ref multi-only) | P0 | BRIEF Scope | SPEC-multi-default-engineering | engineering | grep + review |
| REQ-006 | Contract index touch-ups only (skills/AGENTS.md + docs/AGENTS.md + specs/AGENTS.md + root AGENTS.md dual-track lines); catalogue/order/loader untouched | P1 | BRIEF Scope | SPEC-multi-default-engineering | engineering | grep + review |
| REQ-007 | ADR-008-multi-default.md filed in 10_design (remoción total + degradation verbatim + full-wave + fast-path boundary + rollback) | P1 | BRIEF Scope + open question (new slug) | SPEC-multi-default-engineering | engineering | filing-proof + review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Docs-only, reversible, masked, history intact (no runtime/deps change; 0 PII/secrets; 50_archive + old ADRs + past BRIEFs untouched; per-commit revert) | Operability / Privacy | `git status` + pattern scan 0 findings + archive diff empty |
| REQ-NF-002 | Zero live `single` as methodological mode (allowlist: singleton/single responsibility/single-file/single source/marked historical) | Consistency | logged `grep single` + `grep execution_mode` counts = 0 mode hits |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Mechanics only; degradation wording consumed verbatim from santana; ADR-008 new slug; no runtime change | vasquez |
| people | Uniform wording source (using-frame-ship §3, frame-intent, bootstrap-checklist) — owned by santana's parallel spec; engineering consumes verbatim | santana |
| security | Wording review at gate, no auth/data/API surface | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Stage SKILLs | `skills/translate-to-spec/SKILL.md`, `skills/execute-spec/SKILL.md`, `skills/quality-gate/SKILL.md` | REQ-001..003, REQ-NF-002 |
| Templates | `references/spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md` | REQ-001, REQ-003, REQ-004, REQ-NF-002 |
| Supporting + index | `skills/git-worktree/SKILL.md`, `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md` | REQ-005, REQ-006, REQ-NF-002 |
| ADR | `docs/specs/10_design/ADR-008-multi-default.md` | REQ-007 |
