# Spec: Multi-subagents por defecto — engineering lane

**ID:** SPEC-multi-default-engineering
**Owner:** vasquez (engineering owner)
**Domains-Touched:** [engineering]
**Brief Reference:** docs/briefs/BRIEF-multi-default.md#OKRs + docs/briefs/OKR-multi-default.md (read-only)
**Status:** implemented
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)

## 1. Context

BRIEF-multi-default removes the `single | multi-subagents` dual-track from the chain and makes `multi-subagents` the single natural process (orchestrator dispatches, owners do the work or brief back, reference-only packets, full-wave always). The people lane (santana) owns uniform wording for agent-facing rules (`using-frame-ship` §3, `frame-intent` §3 + product-brief, bootstrap-checklist). This engineering-lane spec owns the mechanics: SKILL §3 rewrites for `translate-to-spec`, `execute-spec`, `quality-gate`, the engineering-owned templates (`spec-template`, `proposal-template`, `gate-report`, `dod-checklist`), the `git-worktree` norm adjustment, the AGENTS.md contract touch-ups, and the ADR filing. Docs/config-only, reversible, history intact.

## 2. Requirements

- REQ-001: Rewrite `skills/translate-to-spec/SKILL.md §3` to multi-only (pre-flight + dispatch + carry-forward lines name `multi-subagents` as the single process; sequential same-thread degradation defined for harnesses without `task`; no `single` branch) + `references/spec-template.md` `Execution_Mode` line to multi-only.
- REQ-002: Rewrite `skills/execute-spec/SKILL.md §3` to multi-only (mode-confirm reads `multi-subagents`; dispatch = orchestrator dispatches entire team / degradation sequential mismo contrato; plan/matrix singleton lines unchanged).
- REQ-003: Rewrite `skills/quality-gate/SKILL.md §3` (Execution-mode block: min-gate removed, full-wave único + adversarial `review-refuter` before `qa`) + `references/gate-report.md` Load-Evidence line to multi-only (`max 2, read orders in prompt`).
- REQ-004: Rewrite mode lines in `skills/propose-changes/references/proposal-template.md` (`Execution_Mode` inherited multi-only), `skills/verify-handoff/references/dod-checklist.md` (load-evidence `execution_mode declared: multi-subagents`), keeping all non-mode content byte-identical.
- REQ-005: Adjust `skills/git-worktree/SKILL.md` so parallel lanes read as the norm (`multi-subagents` process; max-2 live worktrees kept; `execution_mode` ref multi-only; no `single` fallback branch).
- REQ-006: Touch up contract index lines only — `skills/AGENTS.md` (execution-mode frozen line → multi-only), `docs/AGENTS.md` / `docs/specs/AGENTS.md` / root `AGENTS.md` only where they quote the dual-track; chain order, 8-domain catalogue, loader `name/description` rules untouched.
- REQ-007: File ADR in `docs/specs/10_design/` as new `ADR-008-multi-default.md` (recommended — ADR-001..007 taken; brief open question resolved: new, not completing an old slug) recording remoción-total decision, sequential-degradation wording (verbatim from santana), full-wave-único, fast-path CEO boundary (<15 líneas, checkpoint-only, fuera de metodología), rollback (`git revert` per commit).
- REQ-NF-001: Docs-only, reversible, masked, history intact — no runtime/plugin code change, no new deps, no PII/secrets in skills/evidences (Ley 172-13), `50_archive/` + old ADRs + past BRIEFs untouched, per-commit `git revert` rollback.
- REQ-NF-002: Zero live `single` as methodological mode — `grep single` + `grep execution_mode` over `skills/` + touched templates returns 0 mode-branch hits post-change (allowlist logged: `singleton`, `single responsibility`, `single-file`, `single source`, historical pointers explicitly marked as such).

## 3. Acceptance Criteria

- [x] AC-001: `grep -rn "single" skills/using-frame-ship/SKILL.md skills/frame-intent/SKILL.md skills/translate-to-spec/ skills/execute-spec/ skills/quality-gate/ skills/propose-changes/references/proposal-template.md skills/verify-handoff/references/dod-checklist.md skills/git-worktree/SKILL.md skills/AGENTS.md` shows zero methodological-mode hits (allowlist only) — covers KR-1.1/KR-1.2.
- [x] AC-002: `translate-to-spec`, `execute-spec`, `quality-gate` SKILL §3 each read multi-only with sequential-degradation line; `quality-gate` has no min-gate path — covers KR-2.1.
- [x] AC-003: `spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md` mode lines declare `multi-subagents` only — templates consistent.
- [x] AC-004: `ADR-008-multi-default.md` filed in `10_design/` with decision + degradation wording + fast-path boundary + rollback — covers brief Scope + open question (new slug).
- [x] AC-005: `50_archive/` untouched, `git status --porcelain` shows only lane files, no PII/secret pattern hits over the diff — covers HARD constraints.

## 4. Contracts & Interfaces

Docs/config surface only — no API, schema, or event changes. Engineering contracts touched by reference: `docs/specs/10_design/ARCHITECTURE.md` (no change required — docs-only initiative adds no component; ADR-008 links here), `docs/specs/10_design/API_CONTRACTS.md` (untouched). Wording contract: sequential-degradation sentence consumed verbatim from santana's people lane (no divergent paraphrase); cross-domain need → formal Cross-domain request brief to montilla (CEO), never sideways.

## 5. Out of Scope

History (`50_archive/`, old ADRs, past BRIEFs); 8-domain catalogue; stage order; loader `name/description`; plugin runtime (`.opencode/plugins/frame-ship.ts`) + deps; fast-path CEO mechanics (<15 líneas, checkpoint-only — CEO prerogative); max-2 lanes, keys, deploys, permissions; people-lane wording ownership (`using-frame-ship` §3, `frame-intent`, bootstrap-checklist — santana); security wording review (barrera).

## 6. Dependencies

- Upstream: BRIEF-multi-default approval (file-approval pending 2026-09-20); santana people-lane spec (uniform wording source, parallel); barrera security wording review at gate.
- Downstream: `frame-ship:propose-changes` packet `SPEC:docs/specs/20_backlog/SPEC-multi-default-engineering.md#REQ-001..007+NF / HARD:multi-subagents+docs-only,reversible,masked,history-intact,max-2 / GATE:none-yet / DOMAINS:[engineering]`.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001, AC-002 | PROPOSED_CHANGES.md | grep `single\|execution_mode` in translate-to-spec + review |
| REQ-002 | AC-001, AC-002 | PROPOSED_CHANGES.md | grep in execute-spec + review |
| REQ-003 | AC-001, AC-002 | PROPOSED_CHANGES.md | grep in quality-gate + gate-report + review |
| REQ-004 | AC-003 | PROPOSED_CHANGES.md | diff of 3 template lines + review |
| REQ-005 | AC-001 | PROPOSED_CHANGES.md | grep in git-worktree + review |
| REQ-006 | AC-001 | PROPOSED_CHANGES.md | grep in AGENTS.md layers + review |
| REQ-007 | AC-004 | PROPOSED_CHANGES.md | filing-proof `10_design/ADR-008-multi-default.md` + review |
| REQ-NF-001 | AC-005 | PROPOSED_CHANGES.md | `git status` + pattern scan 0 findings + archive untouched |
| REQ-NF-002 | AC-001 | PROPOSED_CHANGES.md | logged grep counts with allowlist |

Singleton: per lane, create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per type (only `PROPOSED_CHANGES.md`, never `PROPOSED_CHANGES-*.md`).
