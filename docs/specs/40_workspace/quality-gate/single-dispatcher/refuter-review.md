# Refuter Review: SPEC-single-dispatcher (engineering + people)

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Verdict:** **conditional** (7/8 claims confirmed, 1 refuted as absolute → mitigations available)
**Inputs (by reference):** `SPEC-single-dispatcher-engineering.md`, `SPEC-single-dispatcher-people.md`, `TEST_MATRIX-single-dispatcher.md` (×2), `ADR-003-ceo-only-dispatch.md`; skill+template+checklist loaded per quality-gate §4 (`skills/quality-gate/SKILL.md`, `agents/engineering/review-refuter.md`, `references/engineering/refuter-review.md`, `references/gate-report.md`).

> Attempted to **falsify** the implementers' 8 claims against the working tree
> (HEADS `7fe71c8`, all uncommitted) using grep sweeps with `--hidden`
> (`rg`), file reads, and a fresh `tsc --noEmit` run.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | Claim 1 fails: some non-montilla role still authorizes dispatch | grep `subagent mechanism`, `dispatches`, `delegate`, `orchestrator dispatches`, `fan out` in agents/ + skills/ + plugin + 3× AGENTS.md; read all hits | **Falsified partially** — 1 survivor: `agents/engineering/review-risk.md:33` |
| RF-002 | Claim 2 fails: a layer paraphrases the canonical sentence | `rg -o "CEO dispatches entire team[^;]{0,80}"` across 77 files + people spec W2 read | Not falsified — 77/77 exact, 0 divergent continuations |
| RF-003 | Claim 3 fails: old-model phrase survives outside exemptions | grep 8 people-track + 6 engineering-track phrases (+ `never fan out`/`NEVER fans out`/`no C-level fan-out`/bare `Do your own work.`) | Not falsified — 0 hits in scope |
| RF-004 | Claim 4 fails: montilla lost sole-dispatcher authority or keeps an old verb | grep `sole dispatcher`/`fan out` in montilla.md + read | Not falsified — 4× `sole dispatcher`, 0× `fan out`, receiver clause present |
| RF-005 | Claim 5 fails: version locations diverge | grep `v0.3` in plugin header/VERSION/MARKER + `.opencode/plugins/AGENTS.md` | Not falsified — all 4 read `v0.3.3` |
| RF-006 | Claim 6 fails: plugin gained a dep or lost idempotency | full plugin read + fresh `tsc --noEmit` | Not falsified — `import type` only, `hasMarker()` intact, exit 0 |
| RF-007 | Claim 7 fails: prompts still referenced as live | glob `skills/templates/**` + grep `implementer\|prompt` in tool-mapping/BRIEF/OKR/ADR-003 | Not falsified — directory absent, zero live refs |
| RF-008 | Claim 8 fails: a changed template carries extra frontmatter keys | key extraction on all 68 changed `agents/*.md` | Not falsified — exactly `name, description` in 68/68 |
| RF-009 | W1/W2/W3/W4 uniformity claims fail somewhere | grep counts: `Route: no delegation`=67, W2 header=67, `and never dispatch`=67, stage-4 W4 read | Not falsified |
| RF-010 | Claim 7/“no renames” violated | `git status`/`git diff --name-only` on agents/ | Not falsified — 0 renames, 0 deletions |

## Claims Outcome

| # | Claim | Verdict | Evidence (file:line) |
|---|-------|---------|----------------------|
| 1 | Only montilla dispatches; c-levels/specialists never delegate | **PARTIALLY REFUTED** (1 survivor, Low-Med) | `agents/engineering/review-risk.md:33` — "For deep audit, the orchestrator dispatches \`security\`." Routed to vasquez as a known finding at `SPEC-single-dispatcher-people.md:138` (out of scope), never reworded; vasquez REQ-NF-002 phrase list omits "orchestrator dispatches". All other dispatch lines CEO-named: plugin `frame-ship.ts:19,:34`; skills mechanism lines `frame-intent/SKILL.md:34`, `review-security/SKILL.md:28`, `review-architecture/SKILL.md:28`, `quality-gate/SKILL.md:28,30,56,58`, `verify-handoff/SKILL.md:27`, `ship-release/SKILL.md:30`, `execute-spec/SKILL.md:23,28,33`; `tools.` `subagent mechanism` = montilla (`montilla.md:19,:68`) + tool-mapping mechanism only |
| 2 | Canonical sentence uniform across all layers | **CONFIRMED** | `rg -o "CEO dispatches entire team[^;]{0,80}"` → 77/77 files in scope cut exactly at `;` (0 divergent continuations): 67 templates + 8 skills-layer (`using-frame-ship/SKILL.md:64`, `tool-mapping.md:8,17,35`, `bootstrap-checklist.md:11`, `translate-to-spec/SKILL.md:29,32`, `propose-changes/SKILL.md:25,30`, `execute-spec/SKILL.md:23,33`, `quality-gate/AGENTS.md:4`-adjacent line, `skills/AGENTS.md:26`) + root `AGENTS.md:37` + `.opencode/plugins/AGENTS.md:19` + `frame-ship.ts:19`. People spec W2 verbatim: `SPEC-single-dispatcher-people.md:76` |
| 3 | Zero old-model residue (listed phrases) | **CONFIRMED** (for the listed phrase set) | All = 0 in agents/ + skills/ + `.opencode/` + `AGENTS.md`: `flag it in your return`, `Delegate to other agents only via your harness subagent mechanism`, `never called sideways`, `flag don't grab`, `routes work onward`/`route onward`, lowercase `suggested owner`, `fan out`/`fans out`/`fan-out`, `no sub-delegation`, `outbound dispatch`, `never fan out`/`NEVER fans out`/`no C-level fan-out`, bare `Do your own work.` Permitted holders only: montilla negative control, tool-mapping mechanism (:8), new-contract capitalized `Suggested owner`. Caveat: "orchestrator dispatches" (F-1) is residue not on this claim's phrase list — tracked under claim 1 |
| 4 | montilla.md negative control intact | **CONFIRMED** | `agents/c-level/montilla.md:19` (W5a Route), `:45`, `:49`, `:68` — `sole dispatcher` ×4 (≥3 required); receiver clause `:69` ("Cross-domain requests arrive as formal briefs…"); dispatch authority kept `:68`; `fan out` = 0; adapter `:74` unchanged; montilla carries no "never dispatch" (grep `and never dispatch` = 67, montilla excluded) |
| 5 | Version v0.3.3 consistent in 4 locations | **CONFIRMED** (evidence artifact drift noted) | `frame-ship.ts:2` (header), `:10` (`VERSION`), `:11` (`MARKER`), `.opencode/plugins/AGENTS.md:4` — all `v0.3.3`. Drift: `TEST_MATRIX-single-dispatcher.md:11` E-002 documents `v0.3.1` (F-3) |
| 6 | Plugin zero-dep single-file + `hasMarker()` preserved | **CONFIRMED** (re-ran tsc myself) | `frame-ship.ts:8` single `import type`; `hasMarker()` `:36-39`, used `:140,:148`; named+default exports; fresh `npx tsc --noEmit` from `.opencode/` → **exit 0** |
| 7 | Implementer prompts fully out | **CONFIRMED** | `skills/templates/` absent entirely (Test-Path False; glob 0; `git ls-files skills/templates/*` = 0). Zero references: `tool-mapping.md` (full read), `BRIEF-single-dispatcher.md`, `OKR-single-dispatcher.md`; `ADR-003-ceo-only-dispatch.md:46-47` holds only the cancellation note ("out of scope… cancelled; no … location"). Residual (non-live): `skills/AGENTS.md:24` historical parenthetical "(`skills/templates/` removed)" — flagged E-008 as CEO follow-up |
| 8 | Frontmatter name/description only | **CONFIRMED** (verified all 68, not just 10) | Scripted frontmatter-key extraction on every changed `agents/**/*.md`: 68/68 = `[name, description]`; `agents/README.md` has no frontmatter (expected). CRLF/LF warnings benign — no EOL churn in diff |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| CE-001 | `agents/engineering/review-risk.md:33` — "For deep audit, the orchestrator dispatches \`security\`." | Old-model dispatch attribution to an unnamed "orchestrator" survives inside a leaf reviewer template; a deployed agent could read it as authorization for a non-CEO to dispatch. No harness mechanism granted, prose only. Known to implementers — routed to vasquez at `SPEC-single-dispatcher-people.md:138`, never fixed by either track | `rg -n "orchestrator dispatches" agents/` → 1 hit (working tree) |
| CE-002 | `agents/engineering/espinoza.md:114` — applied "…only montilla (CEO) dispatches — **you never dispatch from yourself**…" vs Contract W6 exact string "…— **never outbound dispatch from you**…" | Paraphrase of the exact-strings contract (people spec §4 W6); meaning-equal, wording-divergent; deviation recorded in santana matrix (REQ-F-006) | diff `agents/engineering/espinoza.md:114` vs `SPEC-single-dispatcher-people.md:116-120` |

## Non-Refuted Evidence Highlights (sweep log)

- W1 `Route: no delegation` = **67** files; `Route: no sub-delegation` = 0.
- W2 `## Delegation — Cross-domain request (brief back to montilla, CEO)` = **67**; W5b header (montilla) = 1.
- `Cross-domain request` phrase: **69/69** agents files (68 templates + README).
- `and never dispatch` = **67** (montilla correctly excluded); old `you return your deliverable, never dispatch` = 0.
- W4 stage-4 line identical in 7/7 c-levels (e.g. `vasquez.md:32`, `santana.md:32`); W3 c-level/specialist adapter variants match §4 W3.
- `tool-mapping.md:6-8` brief-back flow documented (Need + Reason + Suggested owner + Urgency → CEO delegates `task(general)` max 2 or resolves); `:35` rules line; `bootstrap-checklist.md:11` mechanism-exempt line.
- Root `AGENTS.md:37` new Dispatch clause (closes plugin POINTERS `frame-ship.ts:30`); `skills/AGENTS.md:26` role-owner line; `quality-gate/AGENTS.md:4` → "Only stage whose reviewers the CEO dispatches in parallel".
- `ADR-003-ceo-only-dispatch.md` filed: Decision §1-§6 (single dispatcher, entire team, brief-back 4-field, scope incl. prompts cancellation, harness adapters, grep exemptions), Consequences, Rollback §81-87 → prior dangling citations resolve.
- No renames/deletions in agents/ (`git status` = 68 M + README M only).

## Findings

| ID | Severity | Finding | Location | Recommendation |
|----|----------|---------|----------|----------------|
| F-1 | Low-Med | "Orchestrator dispatches security" — surviving old-model dispatch attribution outside montilla.md + tool-mapping mechanism | `agents/engineering/review-risk.md:33` | vasquez rewrites to CEO-named wording (e.g. "montilla (CEO) dispatches `security` for deep audit") **or** c-levels + montilla explicitly waive the known routed finding (people spec §5:138) |
| F-2 | Low | W6 applied as paraphrase, not exact contract string | `agents/engineering/espinoza.md:114` vs `SPEC-single-dispatcher-people.md:116-120` | Align to W6 exact string or record accepted deviation with santana/vasquez sign-off at gate |
| F-3 | Low | Evidence artifact drift: matrix documents v0.3.1, repo reads v0.3.3 | `TEST_MATRIX-single-dispatcher.md:11` E-002 | Update E-002 to final version before commit |
| F-4 | Low | Working tree carries 6 modified files outside this unit's change list (prior skill-refs-normalization initiative): `SECURITY_REVIEW.md`, `HANDOFF-skill-refs-normalization.md`, `HANDOFF.md`, `TEST_MATRIX-ceo-only-dispatch.md`, `spec-template.md`, `handoff-template.md` | `git status --short` | Commit hygiene: exclude from the single-dispatcher commit / commit under their own unit |
| F-5 | Info | `.opencode/plugins/AGENTS.md` WHERE-TO-LOOK line refs (:32-33, :91-94, :140-175, :184-190, :191-198, :199-204) don't resolve against the current 157-line plugin | `.opencode/plugins/AGENTS.md:9-14` | Pre-existing; refresh refs opportunistically (not a gate blocker) |
| F-6 | Info | `MONTILLA_OWNERSHIP` uses paraphrase "sole dispatcher to the entire team — c-levels…" instead of the verbatim sentence; full verbatim sentence present in WORKFLOW_CARD | `frame-ship.ts:34` vs `:19` | AC-001 grep targets ("entire team" + brief-back) met; flag only if byte-exact grep across ALL injected strings becomes a requirement |

## Verdict Rationale

- 7/8 claims **confirmed** against the real repo, 1 (**claim 1**) refuted as an
  absolute — a single surviving dispatch-attribution line
  (`review-risk.md:33`) plus a wording-only W6 paraphrase. Both are known,
  routed items with trivial mitigations; neither invalidates the spec, the
  contract, or the negative control.
- `conditional` (per `references/engineering/refuter-review.md`): counterexamples
  exist **with mitigations available**; no spoof of the core contract was found
  after adversarial greps (`--hidden`, both tracks' full phrase lists, fan-out
  variants, frontmatter extraction, fresh `tsc`).
- Conditions must clear before handoff:
  - **COND-001:** reword `review-risk.md:33` to CEO-named wording **or** c-levels + montilla waiver recorded (F-1).
  - **COND-002:** align `espinoza.md:114` to W6 exact string **or** signed accepted-deviation note (F-2).
  - **COND-003:** fix E-002 version drift in the engineering test matrix (F-3).

## Sign-off

- [x] Refuter verdict: conditional (mitigations available)
- [ ] Conditions cleared (COND-001/002/003) before `verify-handoff`
- [ ] Owning gate keeper: vasquez (engineering) / santana (people)