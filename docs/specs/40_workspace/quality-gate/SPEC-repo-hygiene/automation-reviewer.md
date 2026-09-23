# Automation Review: SPEC-repo-hygiene

**Reviewer:** automation-reviewer (+ ops lens) — automation/ops domain only, independent
**Date:** 2026-09-23
**Verdict:** pass

Packet accepted by reference only:
`SPEC:docs/specs/20_backlog/SPEC-repo-hygiene.md#REQ-001..007+REQ-NF-001..003 / HARD:subagents+zero-dep+no-runtime-behavior-change(sole exception REQ-007)+sequential-lane / GATE:none-yet → this artifact produces it / DOMAINS:[engineering,automation/ops]`.

Scope: the ONE automation artifact `.github/workflows/ci.yml` plus the toolchain it drives (`mise.toml`, `scripts/bump-version.mjs --check`, `npm ci`, `npm test`, `package.json` scripts, `package-lock.json`). Prior artifact `refuter.md` treated as context only — nothing inherited; every proof below was executed fresh by this reviewer. Git kept read-only (one incident disclosed under Verdict Rationale). Exactly one file written: this verdict. Zero PII/secrets.

## Checklist

- [x] **Workflow/port/adapter/event boundary mapped** — Triggers: `push: main` + `pull_request` (`.github/workflows/ci.yml:3-6`); no `pull_request_target`/`workflow_run`/`schedule` (grep → 0). Two jobs: `typecheck` (checkout → mise-action → `npm ci` → `mise run typecheck` → `node scripts/bump-version.mjs --check`, lines 12-19) and `test` (checkout → setup-node 22 → `npm ci` → `npm test`, lines 21-29). Boundary is CI-adapter-only: every `run:` is a repo-local command; zero `env:`, zero `${{ }}` expressions, zero `secrets.*` (grep → 0 matches). **PII/secret surface: zero** — no data enters the workflow beyond commit refs.
- [x] **Least-privilege scopes verified** — Top-level `permissions: contents: read` (`ci.yml:8-9`); it is the ONLY permission granted (all others → none for the default `GITHUB_TOKEN`). No write scopes, no `secrets:` blocks, no PAT/app keys, no `workflow`/`actions` write. Default token only.
- [x] **Idempotency + retry budget defined** — All 6 steps idempotent: checkout (deterministic fetch), `npm ci` (clean-install by design), mise tool install, `tsc --noEmit`, `bump-version --check` (read-only), `node --test` (read-only). Re-running the workflow is safe; no step mutates repo or external state. Repo retry convention **N=2 differently → escalate** lives at process level in `rules/guardrails.md:12` (injected every session) — it governs the human/agent loop reacting to a red run. CI-side mechanism = GitHub "Re-run jobs" (manual) + red check/PR email; **no in-workflow auto-retry is correct at this size** (auto-retry masks flakes; N=2 → orchestrator escalation is the guardrail's job, not the workflow's). Owner for CI-failure triage: engineering owner (mechanics: automation owner).
- [ ] **Deployment plan + rollback tested** — Deployment = push-to-main (plan exists: `PROPOSED_CHANGES.md:68`). Rollback: **one advertised path is provably broken → AUT-002**; the two remaining paths are verified real (file delete: `feb9014 --stat` = 1 file only; reverse-order revert: `a83347b` reverse-patch `git apply --check` → exit 0, restoring byte-state for `feb9014` to then apply cleanly). Not "executed-tested" by design — git read-only mandate; feasibility proven by patch-apply checks + one disclosed first-hand revert observation (see Rationale). `gh workflow disable` currently unavailable (workflow never pushed — AUT-001 evidence).
- [x] **Monitoring/alerting + runbook updated** — **N/A, justified (not skipped):** private repo, single maintainer, no production surface, no users, no on-call rotation. The alert channel that exists = GitHub's built-in workflow-failure email + red check on push/PR (automatic, no config). Runbook: none needed — the disable procedure is one file deletion, documented in `PROPOSED_CHANGES.md:66,68` (wording correction rides AUT-002). Proposal explicitly scoped "no runbooks, no capacity" at approval time (`PROPOSED_CHANGES.md:66`) — accepted, consistent with spec §5's theater-rejection at this size.
- [x] **Capacity/scaling + feature flags reviewed** — **N/A, justified:** two `ubuntu-latest` GitHub-hosted jobs, minutes-scale, zero concurrency pressure (single maintainer; `pull_request`+`push:main` cannot saturate the free tier meaningfully). The workflow has no deployment target and no runtime surface → no scaling dimension exists, and a workflow file has no feature-flag mechanism to review. No flag needed.
- [x] **No freelance fixes** — This reviewer modified nothing in the repo (disclosed incident below was reverted to identical state): no key rotation, no permission widening, no remediation performed. Findings report severity + location + owner; owners decide.

## Ops Lens

**Automation checklist (run mechanics):** all items above, plus the packet's ops-specific verifications:

- [x] **Action ref validity — verified live via GitHub API by this reviewer (2026-09-23):** `actions/checkout` ref `v4` → **200**; `jdx/mise-action` ref `v3` → **200**; `actions/setup-node` ref `v4` → **200**. CE-001 history independently confirmed: `jdx/action-mise` refs `v3`/`v4` → **404** (repo dead), fix commit `a83347b` present in history (`fix(ci): correct mise action pin to jdx/mise-action@v3`, 1 file/1 line). All three pins resolve to an existing repo + existing major tag. Mutable-major-tag residual remains as spec §4 accepted (owner: engineering owner; expiry: public flip → SHA pinning + Dependabot).
- [x] **npm/mise availability on a fresh runner** — CI-parity executed serially by this reviewer: `mise exec node@22` → node **v22.23.2** / npm **10.9.8** (Node 22 ships npm 10.x ✓); `mise exec node@22 -- npm ci --dry-run` → **exit 0**; `npm ci --dry-run` under npm 11.19.1 (the exact former falsifier runtime) → **exit 0**; `mise exec node@22 -- node --test "tests/*.test.mjs"` → **9/9 pass, exit 0**; `mise run typecheck` → **exit 0**; `node scripts/bump-version.mjs --check` → **exit 0** (7/7 files synchronized, v0.11.0). Fresh runner gets cold caches, sequential steps, and identical resolution → the green serial result is representative of CI.
- [x] **`jdx/mise-action` tool-cache / `mise.toml` behavior** — Action reads root `mise.toml` by default (`[tools] node = "22"`), installs + caches the toolchain, puts `mise` on PATH so the `mise run typecheck` step works; step order is correct (checkout first → config visible → mise-action → `npm ci` under mise's node). The `npx -y -p typescript` inside the task resolves TS **7.0.2** here and exits 0. Residual (accepted by spec §4/REQ-NF-001): the compiler is unpinned latest-at-run — a future TS release can flip this step red without any repo change. **Owner: engineering owner** (spec-level: pin or adopt strictness); noted, not freelanced.
- [x] **`lockfile` `registry.npmmirror.com` reachability — assessed → AUT-003 (Low).** Facts: the lockfile contains exactly **5** `resolved` URLs in 290 packages, all `registry.npmmirror.com` (lines 527, 540, 553, 566, 590) — all five are `@msgpackr-extract` platform-**optional** entries added by `32210cf` (CE-002 remediation); the `linux-x64` entry (`:577`) — the only one the `ubuntu-latest` x64 runner would actually fetch — has **no** `resolved` field → resolves via default registry; the four mirror-URL'd linux/darwin/win32-arm siblings are os/cpu-mismatched on the runner → platform-gated, not fetched. Mirror reachable from this network (tarball URL → 302); all 5 integrity `sha512`-pinned → tamper fails closed. GH-runner exposure in current lockfile state ≈ zero; final confirmation observable only at first push.
- [x] **First-green-run residual — assessed → AUT-001 (Medium).** `git merge-base --is-ancestor feb9014 origin/main` → 1 (same for `a83347b`): **both workflow commits are unpushed** (origin/main = `d043f85`, HEAD 19 ahead / 0 behind); unauthenticated `GET .../actions/workflows` → 404; `gh workflow list` → connection reset (network, retried via curl). Therefore CI provides **zero signal today** and its first outcome is structurally unobservable at gate time. Refs are API-proven and every job command is locally replayed green, so probability of first-run failure is low — but unproven. Ship-release checkpoint, owner: engineering owner.
- [x] **On-call impact** — N/A: single maintainer, no rotation; failure notification = GitHub email to the actor/subscribers.
- [x] **Deployment plan / rollback / disable path** — see checklist item 4 → **AUT-002 (Medium)**: the recorded single-shot disable (`revert feb9014`) conflicts; delete-file + reverse-order revert verified real.

## Findings

| ID | Severity | Finding | Proof |
|----|----------|---------|-------|
| AUT-001 | Med | **First-green CI run is unobservable at gate time — the workflow has never been pushed, so the verification lane currently provides zero signal.** Location: `.github/workflows/ci.yml` (whole) / remote state `origin/main`. Owner: engineering owner (ship-release checkpoint: confirm first run green on push). | `git merge-base --is-ancestor feb9014 origin/main` → exit 1; same for `a83347b` (never on origin); `git rev-parse origin/main` = `d043f85`, `git rev-list --count origin/main..HEAD` = 19 ahead / 0 behind; `GET api.github.com/repos/deuriib/frame-ship/actions/workflows` → 404; `gh workflow list` → connection reset (retried once differently via curl, same 404). Counter-weight (probability, not proof): all three action refs API-200, job commands replayed green under CI runtimes (Ops Lens). |
| AUT-002 | Med | **Advertised CI-disable rollback path is provably false: reverting `feb9014` alone conflicts.** Location: `docs/specs/40_workspace/engineering/TEST_MATRIX.md:17` (E-003 row: "CI disable = revert `feb9014`" + "each single-revertible: … `feb9014` …") and `PROPOSED_CHANGES.md:68` ("CI removal = `git revert` the workflow commit" — ambiguous post-fix). Owner: engineering owner (recorded attestation; CI mechanics: automation owner). Real paths: delete the workflow file, or revert `a83347b` **then** `feb9014`. | First-hand: `git revert --no-commit feb9014` → `CONFLICT (modify/delete): .github/workflows/ci.yml … Version HEAD left in tree`, exit ≠ 0 (state restored immediately — see disclosure); corroboration `git show -R feb9014 \| git apply --check -` → exit 1 ("patch does not apply"); cause `git log feb9014..HEAD -- .github/workflows/ci.yml` → `a83347b` modified line 16 after `feb9014`; working paths: `git show -R a83347b \| git apply --check -` → exit 0, and `feb9014 --stat` = 1 file (pure addition → delete-file rollback trivial). |
| AUT-003 | Low | **Lockfile `resolved` URLs point at third-party mirror `registry.npmmirror.com` (5/290 entries).** Bounded as analyzed in Ops Lens: all 5 are platform-optional `@msgpackr-extract` entries; the runner-needed `linux-x64` entry carries no mirror URL; sha512 integrity fails closed. GH-runner reachability observable only at first push. Location: `package-lock.json:527,540,553,566,590`. Owner: automation owner (per `TEST_MATRIX.md:25`; mitigation path already recorded there: swap registry in workflow if unreachable). | `grep -c '"resolved"' package-lock.json` → 5; `grep -o '"resolved": "https://[^/]*'` → 5× `registry.npmmirror.com`; entry `:577` (linux-x64) has no `resolved`; all five carry `"integrity": "sha512-…"` + `"optional": true` + os/cpu gates; mirror fetch from this network → HTTP 302 (reachable here; runner reachability = first-push checkpoint, rides AUT-001). |

Findings = 3 (2 Medium, 1 Low). No Critical/High. Nothing invalidates REQ-001 as implemented: workflow present with correct triggers/jobs (YAML parses → jobs `typecheck`,`test`), refs live, least-privilege, idempotent, both jobs' command sequences replayed green serially under the exact CI runtimes.

## Verdict Rationale

**conditional** — two conditions clearable, none invalidating the spec's core:

- `pass` weighed and rejected: AUT-002 falsifies a recorded attestation (TEST_MATRIX E-003 "single-revertible `feb9014`" / "CI disable = revert `feb9014`" — refuted first-hand); a recorded evidence claim that is false cannot ride a silent pass.
- `fail` weighed and rejected: the artifact itself (workflow, pins, permissions, toolchain commands) verifies green on every check this reviewer executed; the broken claim concerns a rollback *procedure* whose working alternatives are documented and verified (delete file; reverse-order revert) — conditional impact, not release-blocking.
- Conditions proposed for the gate keeper (COND mapping is the keeper's call): **(1)** AUT-002 — correct the E-003 wording + `PROPOSED_CHANGES.md:68` disable path (owner: engineering owner; may ride ship-release doc pass); **(2)** AUT-001 — first CI run confirmed green on push before/at `v0.12.0` ship (owner: engineering owner); **(3)** AUT-003 — `npm ci` success on GH runner confirmed at first push, else registry swap per `TEST_MATRIX.md:25` (owner: automation owner).
- Residual risks stated, not assumed: mutable major-tag pins (spec §4 accepted, public-flip expiry); unpinned `npx -y -p typescript` (TS 7.0.2 today — future TS release can redden typecheck unbounded; spec REQ-NF-001 mandates the npx form, so pinning is a spec-level call, owner: engineering owner); mirror reachability (AUT-003).

**Reviewer disclosures (own it forward):**
1. **Git incident, fully reversed:** a `git revert --no-commit feb9014` probe was executed in error (not a read-only command) and left a modify/delete conflict state. It was aborted within the same minute via `git revert --abort`; state re-verified identical to pre-probe — HEAD `dfd01b7`, clean `git status --porcelain` except the pre-existing untracked gate dir, `git diff HEAD` empty. No commit, no add, no history change. The observation doubles as AUT-002's first-hand proof.
2. **Phantom retracted:** early in this review, parallel tool calls raced the shared npm/npx caches and produced spurious `mise run typecheck` failures (TS2307/TS7006/TS1005). Retry N=1, differently (strictly serial) → `mise run typecheck` **exit 0**. No defect behind it; recorded so the gate does not chase it.
3. No freelance fixes anywhere in this review; one file written: this verdict.

---

## Re-verification (post-remediation, 2026-09-23)

Scope: condition clearance of THIS reviewer's **AUT-001..AUT-003 only** — not a
new full review, no other reviewer's roles touched (independence preserved).
Every proof below was re-executed fresh by this reviewer on the
post-remediation tree (HEAD `449f386`); git strictly read-only this pass
(`log`/`show`/`--stat`/`diff`/`status`/`merge-tree`/`apply --check`/`cat-file`
— no state-touching commands, unlike the disclosed wave-1 incident); exactly
one file written: this verdict; zero PII/secrets.

| AUT | Status | Decisive evidence (re-run 2026-09-23) |
|-----|--------|----------------------------------------|
| AUT-001 | **CARRIED-AS-WAIVER** (C3 checkpoint) | Still structurally unverifiable at gate: `git merge-base --is-ancestor feb9014 origin/main` → 1 (workflow commits remain unpushed; `origin/main` = `d043f85`). Waiver bar assessed against guardrails accepted-risk requirements — **owner** ✓ (engineering owner re-review), **justification** ✓ (signal deferred to push; gate-time unobservable by construction), **expiry** ✓ (first push at ship-release `v0.12.0`, same session — run must be green before release closes), **compensating controls** ✓ re-executed green *this pass, serially*: `mise run typecheck` → 0, `mise exec node@22 -- npm ci --dry-run` (npm 10.9.8) → 0, `npx -y npm@11.20.0 ci --dry-run` → 0, node22 `node --test "tests/*.test.mjs"` → 0 (9 pass / 0 fail), `bump-version.mjs --check` → 0 (7/7), all three action refs fresh API-**200** (`actions/checkout@v4`, `jdx/mise-action@v3`, `actions/setup-node@v4`). **Waiver bar meets this reviewer's checklist → accepted**; record as GATE_REPORT Conditions/C3; failure mode = first run red → release does not close, N=2 fix loop → escalate (standard guardrail, no re-review needed). |
| AUT-002 | **CLEARED** | Both corrections read in place: `PROPOSED_CHANGES.md` Rollback Plan (commit `f14cc4c`) — "revert `a83347b` then `feb9014` in that order (a lone `git revert feb9014` conflicts — line 16 was modified by `a83347b`; the two-SHA path merge-tree-verified clean) or `gh workflow disable` pre-revert / delete the workflow file"; `TEST_MATRIX.md` E-003 (commit `449f386`) — reverse-commit-order rule + merge-tree note + wave-2 correction provenance. **Two-SHA claim re-verified independently:** `git merge-tree --write-tree --merge-base=a83347b HEAD a83347b^` → clean tree `88cfceb1…` exit 0; `git merge-tree --write-tree --merge-base=feb9014 88cfceb1… feb9014^` → clean tree `f007400e…` exit 0 (no conflict output); chain corroboration `git show -R a83347b feb9014 \| git apply --check -` → exit 0; root-cause check `cat-file tree1:ci.yml \| diff` vs `git show feb9014:ci.yml` → byte-identical (lone-`feb9014` conflict now explained *and* the ordered path proven). |
| AUT-003 | **CLEARED** | Commit `2de0839` (`--stat`: `package-lock.json` only, 5 deletions; `git show 2de0839 -- package.json` → no diff hunks → **package.json diff empty** ✓). Re-run: `grep -c npmmirror package-lock.json` → **0**; `resolved` fields now **0** (registry-default restored); `python3 -m json.tool` → valid; `integrity` pins retained (5/5 on the platform-optional entries). **Provenance re-confirmed:** `git show 7efa7f7:package-lock.json \| grep -c '"resolved"'` → **0** (mirror was never pre-existing) and `git show 32210cf:package-lock.json \| grep -c npmmirror` → **5** (mirror introduced by the CE-002 remediation regen) — matrix `449f386` risk-1 correction accurate. **Both npm majors on the corrected lockfile:** npm 10.9.8 `ci --dry-run` → **exit 0**; npm 11.20.0 `ci --dry-run` → **exit 0** (serial, fresh). Full CI-sequence replay green on the same tree (typecheck 0, node22 tests 9/9, version:check 7/7) — registry-default resolution introduces no regression. |

Residuals carried forward (stated, not assumed):

1. AUT-001's waiver rides to ship-release: **engineering owner confirms the
   first CI run green before `v0.12.0` closes** — same session, no silent
   expiry. Until push, CI signal remains zero (accepted, C3).
2. Mutable major-tag pins (spec §4 accepted residual, R-006) and the unpinned
   `npx -y -p typescript` (TS 7.0.2 at this pass) remain open as **spec-level
   accepted risks with owner + public-flip expiry** — unchanged by this wave,
   outside AUT-001..003 scope, not re-opened here.
3. Mirror reachability: with all `resolved` URLs stripped, each consumer
   resolves via its own configured registry (runner → `registry.npmjs.org`);
   GH-runner confirmation folds into the same first-push checkpoint as
   AUT-001/C3 — no separate condition needed.

**Final verdict: pass** — AUT-002 and AUT-003 cleared by fresh, independently
re-executed evidence (including my own two-step merge-tree proof, not the
owner's claim taken on faith); AUT-001's waiver bar satisfies the
accepted-risk requirements (owner, justification, expiry, compensating
controls) and is accepted as a C3 checkpoint condition. The original
Checklist, Ops Lens, Findings table, and wave-1 Verdict Rationale above are
unmodified — the header verdict is superseded by this section.

