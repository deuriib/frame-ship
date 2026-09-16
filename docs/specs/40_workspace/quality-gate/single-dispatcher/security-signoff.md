# Security Sign-off: SPEC-single-dispatcher (quality-gate re-verification)

**Reviewer:** security-reviewer (barrera/CISO lens — gate-stage sign-off)
**Date:** 2026-09-16
**Stage:** quality-gate — C-5 re-verification of `SECURITY_REVIEW-single-dispatcher.md`
**Verdict:** **APPROVE** — barrera's wording-only attestation **holds at gate time**
**Domains:** security (attestation only — no auth/data/API surface)
**Execution Mode:** multi-subagents (frozen at frame-intent)

## Load Evidence (per gate-report.md §Load Evidence)

- [x] Stage skill loaded: `skills/quality-gate/SKILL.md` (routing table §3: security → security-reviewer)
- [x] Output shape read: `skills/quality-gate/references/gate-report.md`
- [x] Agent template read: `agents/security/security-reviewer.md`
- [x] Checklist read: `skills/quality-gate/references/domains/security-review.md`
- [x] Packet intact (by reference): SPEC:`docs/specs/40_workspace/vasquez|santana/SPEC-single-dispatcher-*.md` / HARD:multi-subagents, wording-only, v0.3.3, REQ-007/REQ-F-008 CANCELLED / GATE:this verdict / DOMAINS:security(attestation)

## 1. Surface Confirmation — wording-only, no new trust boundary

Verified the implemented diff (working tree) directly:

- **Plugin:** `git diff .opencode/plugins/frame-ship.ts` = **4 insertions / 4 deletions, all string content**: header + `VERSION` bump to v0.3.3 (`:2,:10-11`), WORKFLOW_CARD modes line reword to CEO-sole-dispatcher (`:19`), MONTILLA_OWNERSHIP reword (`:34`). Logic block (`hasMarker()` `:36-39`, hooks, loaders) **untouched**. Zero-dep preserved (`import type` only, `:8`).
- **Surface grep** (`fetch\(|https?://|endpoint|router\.|api\.`) over changed surface (plugin + `agents/` + `skills/` + 3 AGENTS.md): **0 real findings in changed lines**. Hits attributed: prohibition clause `frame-ship.ts:25` (guardrail prose); pre-existing checklist prose `agents/engineering/review-risk.md:37,41` (outside diff hunks); pre-existing prohibition `bootstrap-checklist.md:14`; `https://keepachangelog.com/` in `changelog-template.md:4` — file **not in the changed set** (pre-existing template).
- **No new endpoints, adapters, trust boundaries, or payloads** — matches SECURITY_REVIEW attack-surface table (`SECURITY_REVIEW-single-dispatcher.md:32-39`), still accurate at gate time.

## 2. Guardrails 1-14 Re-check (final tree)

- **Secrets/credentials/session (G1, G2):** full scan over changed surface for `api_key|secret|token|password|credential|private key|AKIA|JWT|bearer|BEGIN PRIVATE KEY` — all hits are **prohibition clauses** (standard working-agreement line, e.g. `agents/security/security-reviewer.md:23`, guardrail strings `frame-ship.ts:25-26`) or pre-existing policy prose (`agents/engineering/devops.md:30,49,79`; `espinoza.md:73,88` `reviewToken` = tool parameter name in pre-existing doc, outside diff hunks). Corroborated by qa full changed-set scan (98 files) = policy language only (`qa-review.md:59-63`). `sk-` substring false positive in `risk-analyst` filename confirmed benign (S-002). **0 real credential material.**
- **PII / Ley 172-13 (G5-G8):** wording-only change; no data stores, flows, logs, or third parties introduced or touched. Role handles (montilla/santana/vasquez/barrera) are session personas, not natural-person data. **No PII flow to map** — nothing added (matches SECURITY_REVIEW `:48`).
- **Least privilege / restrictive direction (G3):** the change **restricts** dispatch to montilla only — 67 templates × "Route: no delegation" + W2 formal brief-back; montilla negative control intact (`montilla.md:19,:45,:49,:68`); old-model wording ("fan out", "Delegate to other agents only via your harness subagent mechanism", "no sub-delegation", "flag it in your return") = **0 hits** in scope (santana REQ-NF-002; my grep confirmed). The one adversarial survivor — `review-risk.md:33` "the orchestrator dispatches \`security\`" (refuter F-1/CE-001) — **is fixed in the working tree**: line now reads **"montilla (CEO) dispatches \`security\`"**; `rg "orchestrator dispatches"` = 0 repo-wide. **C-4 satisfied at gate time.**
- **No freelance fixes (G4):** diff = docs/config/string content only; no keys rotated, no prod touched, no permissions widened (nothing infra/external exists in scope). Implementer-prompt leftovers handled read-only — directory absent at gate time (`Test-Path` False; `git status` clean; refuter RF-007, qa §5).

## 3. Conditions C-1..C-5 (SECURITY_REVIEW `:64-68`) — gate-time status

| Cond | Source | Gate-time evidence | Status |
|------|--------|--------------------|--------|
| C-1 verbtim contract | SECURITY_REVIEW `:64` | Canonical sentence exact 77/77 files (refuter RF-002); template surfaces 1 distinct value × 67 + W5a/W5b (santana REQ-NF-001). Edv. exception: W6 paraphrase at `espinoza.md:114` (CE-002) — meaning-equal, restrictive direction, recorded (santana REQ-F-006); no security impact | **Met** |
| C-2 no secrets/PII | SECURITY_REVIEW `:65` | My scan + qa §7 over 98-file changed set = prohibition-clauses only; `sk-` filename FP excluded | **Met** |
| C-3 mechanism integrity | SECURITY_REVIEW `:66` | `tsc --noEmit` exit 0 (qa ran 3×); v0.3.3 in 4/4 locations; `hasMarker()` intact; zero-dep `import type` only | **Met** |
| C-4 restrictive direction | SECURITY_REVIEW `:67` | Old verbs = 0 in scope; "orchestrator dispatches" residue = 0 (fixed at `review-risk.md:33`); montilla negative control 4× | **Met** |
| C-5 gate re-verification | SECURITY_REVIEW `:68` | **This sign-off** | **Met** |

## Findings (gate-time security lens)

| ID | Severity | Finding | OWASP | Evidence |
|----|----------|---------|-------|----------|
| GS-001 | None (0 real) | No security findings in the implemented diff. All pattern hits = prohibition clauses, pre-existing prose, or filename FP | N/A | scan outputs; `git diff` attribution (this file §1-§2) |

Non-security gate notes carried for the record (do not affect this verdict): refuter F-3 + qa F-1 — stale `TEST_MATRIX-single-dispatcher.md:11,31` evidence text documents v0.3.1 while the tree reads v0.3.3 (evidence hygiene, owner vasquez, fix at closing commit); qa F-2 — matrix existence contradiction resolved by current tree (absent).

## 4. Residual Risk (explicit — no silent PASS)

- **RR-1 (owner: santana + vasquez; verifier: barrera):** wording drift re-fragmenting the dispatch contract. Likelihood Low (C-1/C-4 grep gates, gate diff verified today); impact Med. Watched via future greps; this initiative's own residue = 0.
- **RR-2 (closed):** restored implementer prompts — CANCELLED (CEO decision #3); dir absent, 0 live refs (`ADR-003-ceo-only-dispatch.md:45-47` carries only the cancellation note). No risk remains.
- **RR-3 (monitored — existing boundary):** session-context injection of repo file content (bootstrap + skill loaders) stays a trust dependency on repo write-access control. Unchanged by this diff; out of scope (SECURITY_REVIEW `:58`, `:74`).
- **Gate-note (owner: santana/vasquez; security-neutral):** `espinoza.md:114` W6 paraphrase — accepted deviation, meaning-equal, restrictive; signed at people/engineering gate; no security surface.

## 5. Sign-off

- [x] security-reviewer (barrera/CISO lens) — **APPROVE** at gate time; attestation that the wording-only review holds: no auth/data/API surface, no findings, C-1..C-5 met, residual risks explicit (RR-1, RR-3 monitored; RR-2 closed), 2026-09-16
- [x] Load evidence complete (skill, template, output shape, checklist, packet by reference)
- [ ] Consolidated into GATE_REPORT-single-dispatcher.md by gate keeper (owning C-level + montilla)