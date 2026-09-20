# Proposed Changes: vasquez (engineering owner) — Multi-default mechanics lane

**Spec Reference:** SPEC-multi-default-engineering (`docs/specs/20_backlog/SPEC-multi-default-engineering.md` REQ-001..007 + REQ-NF-001/002)
**Agent:** vasquez (engineering owner)
**Date:** 2026-09-20
**Execution_Mode:** multi-subagents (inherited from SPEC; frozen at frame-intent; single-session per SPEC, reversible via per-commit `git revert`)
**Domains-Touched:** [engineering]

## Summary

Remove the `single | multi-subagents` dual-track from the engineering-owned mechanics so `multi-subagents` reads as the single natural process: rewrite SKILL §3 mode lines in `translate-to-spec`, `execute-spec`, `quality-gate` (min-gate removed, full-wave único), retouch mode lines in 4 engineering-owned templates plus the `git-worktree` norm and the `skills/AGENTS.md` frozen-mode index line, and file ADR-008. Agent-facing rule wording (W-MULTI/W-SEQ) is consumed verbatim by reference from santana's people lane (DEP-1 ratification) — never paraphrased here. Docs-only, reversible, history intact.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (this file) | file-create | This proposal — canonical slot created (verified absent pre-write; create-if-missing, never suffixed) |
| `skills/translate-to-spec/SKILL.md` §3 (lines 27, 29–30, 33) | file-modify | Pre-flight + dispatch + carry-forward lines name `multi-subagents` as the single process; sequential same-thread degradation defined for harnesses without `task`; no `single` branch. Non-mode content byte-identical |
| `skills/translate-to-spec/references/spec-template.md:9` | file-modify | `Execution_Mode` line → multi-only: `multi-subagents (inherited from brief, frozen at frame-intent; overridden per SPEC only with CEO waiver)` |
| `skills/execute-spec/SKILL.md` §3 (lines 29–30, 32–34) + §2 line 18 | file-modify | Mode-confirm reads `multi-subagents`; dispatch = orchestrator dispatches entire team / sequential-degradation mismo contrato where harness lacks `task`; plan/matrix singleton lines unchanged. Non-mode content byte-identical |
| `skills/quality-gate/SKILL.md` §3 Execution-mode block (lines 48–51) | file-modify | Min-gate path removed; full-wave único per routing table + adversarial `review-refuter` before `qa`. Non-mode content byte-identical |
| `skills/quality-gate/references/gate-report.md:75` | file-modify | Load-Evidence line → multi-only: execution mode declared `multi-subagents` (max 2, read orders in prompt) |
| `skills/propose-changes/references/proposal-template.md:6` | file-modify | `Execution_Mode` line → multi-only inherited (`multi-subagents (inherited from spec)`); all non-mode content byte-identical |
| `skills/verify-handoff/references/dod-checklist.md:14` | file-modify | Load-evidence line → execution_mode declared: `multi-subagents`; packet-intact + FAIL rule unchanged |
| `skills/git-worktree/SKILL.md` §3 (lines 30, 34) | file-modify | Parallel lanes read as the norm (`multi-subagents` process; max-2 live worktrees kept; `execution_mode` ref multi-only; no `single` fallback branch). Lines 13–16 already multi-norm; untouched |
| `skills/AGENTS.md:33` | file-modify | Execution-mode frozen line → multi-only (`multi-subagents` rides `SPEC/HARD/GATE/DOMAINS` packets, never skill frontmatter). Chain order, 8-domain catalogue, loader rules untouched |
| `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md` | verify-only | Grep-verified: no dual-track quote present (root hits are allowlisted `single-file` ×2 only) — no change |
| `docs/specs/10_design/ADR-008-multi-default.md` | file-create (at execute-spec) | Mint new ADR per draft in §ADR-008 below (recommended: ADR-001..007 taken; resolves brief open question #1 as new slug) |

Change types per `proposal-template.md`. No other files touched. Non-engineering surfaces (`using-frame-ship` §3, `frame-intent`, bootstrap-checklist, people-review) belong to santana — cross-domain need → formal brief to montilla (CEO), never sideways.

## Wording ratification (DEP-1 — verbatim by reference, no paraphrase)

Canonical source: `docs/specs/40_workspace/people/SPEC-multi-default-people.md` §4 (santana owns wording; this lane consumes). Applied verbatim wherever engineering SKILL §3 text names the process or degradation (diff 0 cross-lane on shared contracts; drift → santana wins, ratified at gate):

- **W-MULTI** (uniform multi-only contract): "Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."
- **W-SEQ** (sequential degradation, same contract): "Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade."

## Allowlist (single-substring, post-change)

Zero live `single` as methodological mode. These substrings remain and are logged, not edited: `singleton`, `single responsibility` (`readability-review.md:10`), `single-file` (root `AGENTS.md` ×2, plugin contract), `single source` (C2 hook lines), `single reviewer` (`quality-gate/AGENTS.md:11`), `single point of failure` (`resilience-review.md:13`), `Single writer per file` (`git-worktree/SKILL.md:30` — concurrency rule, not mode branch), historical suffixed pointers explicitly marked as such (`pwsh-flow.md`, `announce-template.md`). AC-001 grep evidence must show allowlist-only hits.

## Rationale

REQ-001..006 each map to one mechanical rewrite with mode-lines-only deltas — non-mode content stays byte-identical, so review is a line-scoped grep + read-through, not a redesign. REQ-007 mints ADR-008 as new slug (ADR-001..007 taken; brief open question #1 resolved without rewriting history). W-MULTI/W-SEQ verbatim-by-reference keeps one wording owner (santana) and kills cross-lane drift at the source. REQ-NF-001/002 hold via docs-only scope, masked exports, and the logged allowlist.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Soft-default (multi default + single as waiver) | Leaves dual-track alive; brief Framing 2 explicitly discarded it |
| Re-label only (`default` surname on multi) | Cosmetic; brief demands remoción total, multi without surname |
| Complete an old ADR slug instead of ADR-008 | Rewrites history; brief open question resolved as new slug (ADR-001..007 taken) |
| Touch people-lane surfaces in this lane | Sideways — santana owns wording; cross-domain need goes to montilla |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering owner) — proposer cannot self-approve; approval recorded at quality-gate
- [ ] Engineering arch impact: vasquez (mechanics + ADR-008; `ARCHITECTURE.md`/`API_CONTRACTS.md` untouched — docs-only initiative adds no component)
- [ ] Security wording review: barrera (text-only review; no auth/data/API surface)
- [ ] Wording fidelity: santana People-lane DEP-1 (W-MULTI/W-SEQ diff 0, ratified at gate)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc is produced at this stage; impl files stay untouched.

## C2 challenge hook (REQ-002 — assessment, no round opened)

- Trigger scan: no auth/data/API/PII surface (docs-only wording); single-domain scope [engineering]; blast radius below scoped to skills/docs with no external exposure; no approver request at proposal time.
- Result: **no trigger fires — no challenge round opened.** Hook rides to gate: if review widens scope or blast radius, the budgeted one-pass round (≤3 questions, then terminal approve/reject) applies there per `propose-changes/SKILL.md` §C2.

## Risk Assessment

**Proposer:** vasquez (engineering owner) | **Date:** 2026-09-20 | **Domains-Touched:** [engineering]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Mode-line edit alters adjacent non-mode prose | Low | Med | Byte-identical rule on non-mode content; review diffs line-scoped per Changes table |
| R-002 | Wording drift vs santana (W-MULTI/W-SEQ paraphrase) | Low | High | Verbatim-by-reference + DEP-1 ratification; gate diffs shared contracts (must read 0) |
| R-003 | Missed `single` mode-branch survivor | Med | Med | AC-001 grep sweep over all 9 listed surfaces + logged allowlist; gate re-verifies |
| R-004 | Scope creep into people lane or runtime | Low | Med | HARD per-lane scope; people surfaces → santana; plugin/runtime explicitly out; sideways needs go to montilla |
| R-005 | ADR-008 slug collision or history touch | Low | Low | New slug confirmed (ADR-001..007 taken); `50_archive/` + old ADRs + past BRIEFs untouched, verified via `git status --porcelain` |

### Blast Radius

Systems: 10 files modified (3 SKILL §3 blocks + 4 template lines + `git-worktree` §3 + `skills/AGENTS.md:33`) + 1 file created (ADR-008) + this proposal. Teams: engineering owner executes; santana wording consumed verbatim (fidelity check at gate); barrera text-only review. External exposure: none — docs-only wording change; no endpoints, adapters, boundaries, payloads, stores, or flows added or altered.

### Rollback Plan

Per-commit `git revert` (one commit per REQ group at execute-spec); ETA < 15 min; owner vasquez. Full revert restores all 10 modified files + removes ADR-008; this proposal stays as audit trail.

### Security Considerations

Docs surface only — no secret/token/credential/session in skills, templates, ADR, or evidence (Guardrails 1–4 hold). No new endpoints/adapters/boundaries/payloads, so no new trust boundaries (OWASP screen: nothing to screen beyond text). Least privilege unchanged. No freelance fixes — findings (if any) report severity + location + evidence; owner remediates. Privacy (Ley 172-13): zero PII in diff; role handles (vasquez/santana/barrera/montilla) are session personas, not natural-person data; all exports masked, allowlisted evidence only.

### Domain Considerations

Engineering only. Non-touched domains (security, finance, legal, marketing/brand, people, revenue, automation/ops) carry no considerations — barrera provides text-only wording review; santana provides wording-fidelity ratification; neither is asked to approve engineering substance outside those lenses.

## Assumptions

1. BRIEF-multi-default approval lands via file-approval (pending 2026-09-20); this proposal assumes approval, executes after.
2. Santana people-lane wording (W-MULTI/W-SEQ) is stable as quoted in §Wording ratification; any santana-side amendment propagates here verbatim before execute-spec.
3. `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md` need no edits (verified no dual-track quotes; re-verified at execute-spec).
4. ADR-008 stays `proposed` until gate verdict; deciders recorded in ADR header.
5. Max-2 lanes, fast-path CEO mechanics, and plugin runtime are out of scope and untouched.

## ADR-008 draft (to be filed at execute-spec as `docs/specs/10_design/ADR-008-multi-default.md`)

- **Title:** Multi-subagents as the single natural process (remoción total of the `single` branch)
- **Deciders:** vasquez (engineering owner), santana (people owner, wording), barrera (security, wording review); CEO waiver authority montilla
- **Decision:** remoción total — delete the `single` methodological branch everywhere in-chain; `multi-subagents` without surname; sequential-degradation wording verbatim from santana (W-SEQ); full-wave único (refuter before qa, no min-gate); trivial <15-line reversible work lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
- **Consequences:** one mental model, one gate; harnesses without `task` degrade sequentially same-thread same-contract; history intact; rollback per-commit `git revert`.
- **Shape precedent:** ADR-007 (fold-in, no new stage/dir/reviewer).

## Trace

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001, AC-002 | translate-to-spec §3 + spec-template:9 rewrites | grep `single\|execution_mode` in translate-to-spec + review |
| REQ-002 | AC-001, AC-002 | execute-spec §3 rewrite | grep in execute-spec + review |
| REQ-003 | AC-001, AC-002 | quality-gate §3 + gate-report:75 rewrites | grep in quality-gate + gate-report + review |
| REQ-004 | AC-003 | proposal-template:6 + dod-checklist:14 rewrites | diff of template lines + review |
| REQ-005 | AC-001 | git-worktree §3 norm touch-up | grep in git-worktree + review |
| REQ-006 | AC-001 | skills/AGENTS.md:33 rewrite; AGENTS layers verify-only | grep in AGENTS layers + review |
| REQ-007 | AC-004 | ADR-008 filed (draft above) | filing-proof `10_design/ADR-008-multi-default.md` + review |
| REQ-NF-001 | AC-005 | docs-only scope | `git status` + pattern scan 0 findings + archive untouched |
| REQ-NF-002 | AC-001 | allowlist logged (§Allowlist) | logged grep counts with allowlist |

## Scoped Evidence (proposal phase)

- Lane slot: `docs/specs/40_workspace/engineering/` held 10 files pre-write (THREAT_MODEL, TEST_MATRIX, SECURITY_REVIEW, 2× SAMPLE-grilling, RELEASE_NOTES, IMPLEMENTATION_PLAN, DRILL, ARCHITECTURE_REVIEW, ARCHITECTURE, API_CONTRACT — glob-verified); `PROPOSED_CHANGES.md` absent → create-if-missing holds, no suffix, no overwrite.
- Pre-change grep (proposal phase, scoped to lane targets):
  - `skills/translate-to-spec/`: `single` mode-branch hits in SKILL §3 (lines 27, 29–30, 33) + `spec-template.md:9` (`single | multi-subagents…`).
  - `skills/execute-spec/SKILL.md`: mode-branch hits (lines 29–30, 32–34); singleton plan/matrix lines unchanged scope.
  - `skills/quality-gate/`: `single` min-gate branch (SKILL lines 48–51) + `gate-report.md:75` dual-mode line; remaining `single*` hits allowlisted (`single responsibility`, `single point of failure`, `single reviewer` in AGENTS).
  - `skills/propose-changes/references/proposal-template.md:6` dual-mode line; `skills/verify-handoff/references/dod-checklist.md:14` generic load-evidence line.
  - `skills/git-worktree/SKILL.md`: no `single` fallback branch (multi-norm lines 13–16 present); mode refs at lines 30, 34 to retouch.
  - `skills/AGENTS.md:33` dual-track frozen line; root/docs/specs AGENTS layers: no dual-track quotes (root `single-file` ×2 allowlisted).
- Packets by reference (never pasted): SPEC `docs/specs/20_backlog/SPEC-multi-default-engineering.md` REQ-001..007+NF; HARD multi-subagents + docs-only + reversible + masked + history-intact + max-2; GATE none-yet; DOMAINS [engineering]. Wording source: `docs/specs/40_workspace/people/SPEC-multi-default-people.md` §4.
- Impl files untouched: this proposal is the only file written in this unit.
