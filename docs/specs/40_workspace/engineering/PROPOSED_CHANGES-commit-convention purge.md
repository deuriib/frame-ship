# Proposed Changes: engineering owner + specialist

**Spec Reference:** User request 2026-09-16 "remove commit-convention from the repo" + user scoping decision 2026-09-16 (Full purge incl. history + Update all citations)
**Agent:** engineering owner + specialist (dispatched by orchestrator Montilla CEO)
**Date:** 2026-09-16
**Execution_Mode:** single (inherited — single-domain owner acting directly, no subagent dispatch)
**Domains-Touched:** engineering

## Summary

Purge the commit convention from the repo in one work unit: delete the convention template plus all 8 historical commit-convention-v2 work products and their 5 gate review files, then remove all 21 live citation lines (9 stage SKILLs + `skills/AGENTS.md` + `implementation-plan.md`) so no file points at a deleted path. Shipped-release prose keeps its history lines with justification; the orchestrator decides the one open scrub question.

## Changes

### A. Deletions — convention file + historical artifacts (14 files, all glob-verified)

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/using-frame-ship/references/commit-convention.md` | file-delete | Delete convention template (source of truth for all citations) |
| `docs/briefs/BRIEF-commit-convention-v2.md` | file-delete | Delete historical brief |
| `docs/specs/10_design/SPEC-commit-convention-v2.md` | file-delete | Delete historical design spec |
| `docs/specs/50_archive/SPEC-commit-convention-v2.md` | file-delete | Delete historical archive copy |
| `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-commit-convention-v2.md` | file-delete | Delete historical proposal |
| `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-commit-convention-v2.md` | file-delete | Delete historical implementation plan |
| `docs/specs/40_workspace/vasquez/TEST_MATRIX-commit-convention-v2.md` | file-delete | Delete historical test matrix |
| `docs/specs/40_workspace/vasquez/HANDOFF-commit-convention-v2.md` | file-delete | Delete historical handoff |
| `docs/specs/40_workspace/vasquez/DOD-commit-convention-v2.md` | file-delete | Delete historical DoD checklist |
| `docs/specs/40_workspace/quality-gate/commit-convention-v2/GATE_REPORT.md` | file-delete | Delete gate report (dir becomes empty, drops out of git) |
| `docs/specs/40_workspace/quality-gate/commit-convention-v2/qa-review.md` | file-delete | Delete QA review |
| `docs/specs/40_workspace/quality-gate/commit-convention-v2/readability-review.md` | file-delete | Delete readability review |
| `docs/specs/40_workspace/quality-gate/commit-convention-v2/refuter-review.md` | file-delete | Delete refuter review |
| `docs/specs/40_workspace/quality-gate/commit-convention-v2/risk-review.md` | file-delete | Delete risk review |

Note: packet said "8 historical artifacts" — glob confirms 8 (1 brief + 2 specs + 5 vasquez files); +1 template +5 gate reviews = 14 deletions total.

### B. Citation updates — live pointers to the deleted path (21 lines, all grep-verified)

Rule applied per line: drop the `per <path-to-commit-convention.md> (guidance only…)` pointer clause, keep the stage's own commit example and any chain rule (REQ-ID trace, per-task, tag-after-commit, never-fails-gate). Delete §5/§6 reference bullets outright (bulleted lists — no renumbering needed).

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/frame-intent/SKILL.md:39` | file-modify | Close line → `7. Close with a commit. Example: \`docs(brief-auth): add BRIEF-auth with OKRs and domains-touched\`.` |
| `skills/frame-intent/SKILL.md:51` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/translate-to-spec/SKILL.md:34` | file-modify | Close line → `7. Close with a commit. Example: \`feat(spec-003): add REQ-IDs and ARCHITECTURE contract for auth\`.` |
| `skills/translate-to-spec/SKILL.md:47` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/propose-changes/SKILL.md:34` | file-modify | Close line → `6. Close with a commit (the proposal doc itself is committed, impl files stay untouched). Example: \`docs(proposal-003): add PROPOSED_CHANGES for auth with blast radius\`.` |
| `skills/propose-changes/SKILL.md:46` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/review-security/SKILL.md:33` | file-modify | Close line → `5. Close with a commit. Example: \`docs(sec-003): approve SECURITY_REVIEW with STRIDE verdict\`.` |
| `skills/review-security/SKILL.md:45` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/review-architecture/SKILL.md:34` | file-modify | Close line → `6. Close with a commit.` |
| `skills/review-architecture/SKILL.md:46` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/execute-spec/SKILL.md:37` | file-modify | Keep per-task chain rule, drop pointer → `7. Commit one commit per approved task/REQ-ID (never batch unrelated REQ-IDs). Body links \`REQ-ID → test → artifact\`. Examples: \`feat(auth-001): add session store with REQ-001 test trace\`, \`fix(auth-002): enforce TTL per REQ-002\`.` |
| `skills/execute-spec/SKILL.md:50` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/quality-gate/SKILL.md:64` | file-modify | Close line → `8. Close with a commit (never fails the gate). Example: \`docs(gate-003): record OPEN verdict for SPEC-003 with 7 reviews\`.` |
| `skills/quality-gate/SKILL.md:78` | file-modify | Delete §6 `commit-convention.md` bullet |
| `skills/verify-handoff/SKILL.md:33` | file-modify | Close line → `6. Close with a commit. Example: \`docs(handoff-003): verify DoD and route SPEC-003 to ship\`.` |
| `skills/verify-handoff/SKILL.md:45` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/ship-release/SKILL.md:36` | file-modify | Close line → `6. Close with a release commit (tag after commit). Example: \`chore(release-0.4.0): ship SPEC-003 with notes and rollback plan\`.` |
| `skills/ship-release/SKILL.md:48` | file-modify | Delete §5 `commit-convention.md` bullet |
| `skills/AGENTS.md:24` | file-modify | Bullet → `- Commit closings: every stage ends with a commit step + example; \`execute-spec\` commits one per approved task/REQ-ID.` |
| `skills/execute-spec/references/implementation-plan.md:14` | file-modify | Sentence → `Each step maps to one commit unless the plan explicitly groups them.` |
| `skills/using-frame-ship/SKILL.md:78` | file-modify | Delete §5 `references/commit-convention.md` bullet |
| `docs/specs/AGENTS.md:17` | file-modify | Design row: remove `+ \`SPEC-commit-convention-v2.md\`` (index accuracy — file will not exist) |
| `docs/specs/AGENTS.md:22` | file-modify | Archive row: remove `, \`SPEC-commit-convention-v2\`` (index accuracy — file will not exist) |

### C. Historical mentions — keep-as-history (default, with justification)

| Target | Change Type | Description |
|--------|-------------|-------------|
| `CHANGELOG.md:12,31` | no-change | Keep. Shipped release narrative; rewriting falsifies the audit trail of what v0.4.0 contained. |
| `docs/specs/30_delivery/RELEASE_NOTES.md:5,18,38` | no-change | Keep. Shipped release record including its rollback note; rollback line (`git checkout -- …`) remains valid git syntax against history. |
| `docs/specs/50_archive/plugin-001-concise-prompts.md:33` | no-change | Keep. Archived lesson-learned; archive is terminal by lifecycle rule. |
| `docs/specs/40_workspace/vasquez/HANDOFF-skill-refs-normalization.md:23` | no-change | Keep. Prior handoff record describing work already done; editing rewrites history. |
| Incidental `work-unit` prose (`IMPLEMENTATION_PLAN-single-dispatcher.md:27`, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:22`, `santana/IMPLEMENTATION_PLAN-single-dispatcher.md:40`) | no-change | Keep. Generic phrasing, no pointer to the deleted file; out of purge scope. |

**Open decision for orchestrator:** user scoping says "Full purge incl. history." The §A deletions ARE the history purge (all 8 work-product artifacts gone). §C keeps prose mentions in shipped/archived records. If orchestrator requires full prose scrub instead, that is a follow-up work unit (rewrite CHANGELOG + RELEASE_NOTES + archive entries) — stated here so the waiver/decision is explicit, not silent.

## Rationale

The user request plus scoping decision fully determines the shape: every live pointer to `commit-convention.md` must go (otherwise 21 dangling references to a deleted file), every commit-convention-v2 work product goes (the "incl. history" decision), and shipped-record prose stays (audit-trail integrity — a release record must describe what actually shipped). Grep confirms no `commit-convention-v2` reference lives outside the §A deletion set and the §C history set, so the purge leaves zero dangling pointers. Doc-only change: no auth/data/API touched, no behavior change, no migration.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Leave SKILL citation lines pointing at a stub/redirect file | Keeps a dead concept alive; user asked for removal, not relocation |
| Scrub §C prose mentions in the same work unit | Rewrites shipped history (CHANGELOG/RELEASE_NOTES) and terminal archive; needs explicit orchestrator waiver first — recorded as open decision above |
| Split deletions and citation edits into two commits | Single coherent work unit (purge + pointer cleanup); one revert restores everything — splitting adds revert complexity for no traceability gain |

## Approval Required From

- [ ] Owning domain owner: engineering owner (mandatory — single-domain proposal; self-approval not permitted, orchestrator routes approval)
- [ ] engineering owner (architecture/API/model/cross-cutting impact) — N/A: doc-only deletion, no contract change (assumption stated)
- [ ] security owner (auth/data/external-API/PII impact) — N/A: no auth/data/API touched (assumption stated)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc is committed; all §A/§B files stay untouched until execute-spec.

## Risk Assessment

Per `skills/propose-changes/references/risk-assessment.md`.

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Dangling reference missed — some file still points at deleted path | Low | Med | Grep-verified twice (21 citation lines + 33 `commit-convention-v2` matches, all mapped to §A/§B/§C); execute-spec re-greps post-edit before commit |
| R-002 | Future agents lose commit-format guidance, produce inconsistent messages | Low | Low | Stage SKILLs keep their own per-stage examples; git history retains the convention file content for reference |
| R-003 | "Full purge incl. history" interpreted as requiring §C prose scrub, proposal judged incomplete | Med | Low | Open decision stated explicitly in §C for orchestrator ruling before execute-spec; scrub (if ordered) is a separate follow-up work unit |

### Blast Radius

- **Systems:** none. Doc/markdown files only; plugin runtime (`frame-ship.ts`), toolchain (`mise.toml`), and `package.json` untouched. No build, test, or deploy path references the deleted files.
- **Teams:** engineering (owns the edit work unit); all domain owners read updated SKILL close lines — content change is subtractive (pointer clause removed), no new process to learn.
- **Customers:** none. Internal process docs; no user-facing surface.
- **Regulators:** none. No PII, retention, or control surface involved; audit trail preserved via §C keep-as-history default + git history.
- **Revenue:** none. No pipeline, pricing, or GTM artifact touched.

### Rollback Plan

`git revert <proposal-impl-commit>` — single commit revert restores all 14 deleted files and all §B line edits (one work unit = one commit). Owner: engineering owner. ETA: immediate (< 5 min). No external sends/filings/launches/deploys to undo.

### Security Considerations

No auth, data exposure, or input validation surface. Doc-only deletion; no trust boundaries crossed. Security review not required (assumption: doc-only scope holds — orchestrator GATE confirms).

### Domain Considerations

Engineering only. Finance/legal/marketing/people/revenue/automation-ops: no budget, liability, brand, workload, pipeline, or runbook impact — domains deleted as non-touched per template.

## Definition of Done

- [ ] Proposal approved by engineering owner via orchestrator (no self-approval)
- [ ] Orchestrator rules on §C open decision (keep-as-history confirmed or scrub ordered as follow-up)
- [ ] Execute-spec deletes exactly the 14 §A files, edits exactly the 23 §B lines, touches nothing else
- [ ] Post-edit grep for `commit-convention` returns only §C history lines (zero live pointers)
- [ ] Rollback verified: single-commit revert path identified at commit time

## REQ → Test → Artifact → Verdict Trace (placeholder for execute-spec / quality-gate)

| REQ | Test / Evidence | Artifact | Gate Verdict |
|-----|-----------------|----------|--------------|
| REQ-001 (full purge: template + 8 historical + gate reviews deleted) | `glob **/*commit-convention*` returns zero files | Deletion commit | _pending gate_ |
| REQ-002 (all live citations updated) | `grep commit-convention skills/` returns zero matches | Citation-edit hunks in same commit | _pending gate_ |
| REQ-003 (no dangling pointers anywhere) | `grep commit-convention` repo-wide returns only §C history lines | Grep output attached to handoff | _pending gate_ |
| REQ-004 (impl files untouched except §A/§B set) | `git status --short` shows only listed paths | Commit file list | _pending gate_ |

## Assumptions

1. `execution_mode: single` — carried as single-domain direct execution (no subagent dispatch occurred for this proposal).
2. No security/architecture review required — doc-only deletion with no auth/data/API/contract touch; GATE packet confirms engineering owner only.
3. "Full purge incl. history" = delete all 8 work-product artifacts (§A); §C prose keeps history pending orchestrator ruling.
