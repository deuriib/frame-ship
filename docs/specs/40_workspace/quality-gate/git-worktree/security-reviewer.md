# Security Review: git-worktree isolation (gate)

**Reviewer:** security-reviewer (barrera lens, security owner)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/domains/security-review.md`
**Guardrails:** AGENTS.md 1-14 (deny-default, OWASP, least-privilege, no freelance fixes, Ley 172-13 minimization/boundary/TTL/scoped-export, severity 9-11, conduct 12-14)
**Packet (by reference only):** SPEC `skills/git-worktree/` (5 files) + `.gitignore` + `docs/specs/40_workspace/barrera/THREAT_MODEL-git-worktree.md` + `docs/specs/40_workspace/barrera/SECURITY_REVIEW-git-worktree.md` (Conditional C-001..C-006) + prior gate verdicts (`docs/specs/40_workspace/quality-gate/git-worktree/readability.md`, `reliability.md`, `resilience.md`, `refuter.md`) + matrices (`docs/specs/40_workspace/barrera/TEST_MATRIX-git-worktree-security.md`, `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md`)
**HARD:** execution_mode=multi-subagents, win32/pwsh, deny-default secrets/PII, reference-only packets, finding w/o proof = REFUTED
**GATE:** sec-Conditional C-001..C-006 must be evidenced
**DOMAINS:** [engineering, automation/ops, security, people] — this review covers security at gate

## Checklist (per `skills/quality-gate/references/domains/security-review.md`)

- [x] Threat model complete (STRIDE) — `THREAT_MODEL-git-worktree.md`: 8-row attack surface (worktree path / ignore gate / prompt packet / logs / gate evidence / submodule / sandbox fallback / announce channel) + 6-row STRIDE + residual (Low-if-conditions-met / High-if-skipped) + owners (barrera + vasquez/automation/santana co-owners, orchestrator escalation). No silent PASS.
- [x] AuthN/AuthZ verified — least-privilege per worktree (own branch-per-SPEC, own `<spec-id>` dir, no shared credentials, no cross-worktree access) in `guards.md` §3 + SPEC REQ-SEC-003; live `git worktree list` = 1 entry (`D:/GitHub/frame-ship e7a6ba4 [main]`, count 1 ≤ 2); no shared-credential copies observed (rg hits are prohibition text only, see C-003).
- [x] Input validation at all boundaries — boundary table 4/4 rows (path / prompt packet / log line / gate evidence → checkpoint → mask-or-refuse → security owner) in `guards.md` §1, deny-default stated; prompt packets reference-only (`<path>#REQ-ID`), never pasted bodies.
- [x] Secrets not in code — 0 credential values over `skills/git-worktree/**`: high-signal `api_key|passwd|access_token|bearer|aws_access|ghp_|sk-` matches only the documented probe-pattern string at `guards.md:71` (pattern text, not a value); SSN `\d{3}-\d{2}-\d{4}` 0 hits; email-shape 0 hits; broad `secret|token|…` prose matches are policy vocabulary, not values. See C-002.
- [x] Dependencies scanned — N/A with justification: no executable deps in this slice (md policy + pwsh probes + `.gitignore` entry); submodule surface covered separately under C-004 (empty `git submodule status`, no `.gitmodules` → none-needed, guard defined in `guards.md` §5).
- [ ] Data handling compliant (PII, retention, Ley 172-13) — minimization + checkpoints + purpose+TTL+deletion + scoped-export allowlist defined (`guards.md` §§4/6/7, `announce-template.md` §6); live scans 0 PII values; **conditional** only because C-006 dry-run count/excerpts unexecuted (see S-GATE-001).
- [ ] Audit logging in place — consent Q+A → recorded answer → `add`, exactly-once announce, per-`<spec-id>` attribution, `override: <who> <timestamp> <reason>` contract (`announce-template.md` §§1-4, `worktree-lifecycle.md` §§0-1); **conditional** only because dry-run log paths are unattached slots (see S-GATE-002).

## Gate condition verification (live probes 2026-09-16, pwsh)

- **C-001 ignore active — EVIDENCED (pass).** `.gitignore:55-56` carries `.worktrees/` with REQ-002/C-001 comment; `git check-ignore -q .worktrees/` LASTEXIT=0 (green); `git ls-files -- .worktrees/` empty; `git status --porcelain -- .worktrees/` empty (zero tracked worktree paths). Note: bare form `git check-ignore -q .worktrees` exits 1 on this clone (no dir on disk) — canonical slash form is authoritative; `guards.md:33` bare-form drift carried as Low hygiene S-GATE-003 (same as RD-003/RF-002).
- **C-002 scans 0 — EVIDENCED with annotation (conditional-pass).** Credential-shape scan 0 real hits (1 match = probe-pattern text `guards.md:71`); SSN 0; email 0; tracked secret-shaped files (`.env`/`.pem`/`.key`) none observed; broad policy-vocabulary matches are not values. Rescan proof exists as live probe output but lane matrices cite unpathed "session shell log" (RF-004) — attach log path to close (S-GATE-002).
- **C-003 count≤2, no credential copies — EVIDENCED (pass).** `git worktree list` = 1 live entry (main only) ≤ 2; `shared credential|copy.*credential|\.pem|\.key` rg hits only prohibition text (`guards.md:51`); branch-per-SPEC holds (no lanes live). Dirty baseline (`M .gitignore`, `M AGENTS.md`, `M README.md`, `?? quality-gate/git-worktree/`) sits outside `.worktrees/` — next `add` takes refuse-or-recorded-override path per FM-001 (S-GATE-004, not a violation).
- **C-004 submodule — EVIDENCED as none-needed (pass).** `git submodule status` empty output exit 0; `Test-Path .gitmodules` = False; guard + 5-step drill defined (`guards.md` §5); security matrix T-005 records none-needed. Attach drill-log path to close citation gap (S-GATE-002).
- **C-005 TTL — POLICY DEFINED, no fallback exercised (pass with Low carry).** `guards.md` §6 + `pwsh-flow.md` §5 + `worktree-lifecycle.md` §§3.2/4 require purpose+TTL+deletion owner, `Temp\opencode`-only, `remove+prune+list` verify; live state shows no fallback path created and no off-sandbox location. Automation co-sign + orchestrator confirm on sandbox TTL Open Question still pending (S-005) — rides gate as Low (S-GATE-005), owned automation+security.
- **C-006 scoped excerpts — NOT CLOSED (conditional).** Slots carry no secrets/PII (`<donde>/<rama>/<porque>/<limpieza>`, `<n> archivos`); `guards.md` §7 + `announce-template.md` §6 enforce allowlisted excerpts, refuse full dumps; no full dumps observed in skill/evidence reviewed. But people dry run unexecuted: excerpt slots `<path-or-session-ref>` unfilled, count "expect 2 create + ≤2 remove" not observed (people matrix §C-006 "carried, not closed here"; RF-005). Gate cannot OPEN C-006 on this packet.

## Rejected-trigger checks (block execute-spec / handoff on hit)

- **Secrets/PII in skill files or evidence:** none found (0 values per scans above). PASS.
- **`.worktrees/` content tracked:** none (`ls-files` empty, status empty for path). PASS.
- **Freelance-fix instructions (rotation/prod-patch/perm-widen):** none operative. `rotate|chmod|prod-patch` rg matches are prohibition sentences only (`guards.md:136-140` never-rotate clause, proposal R-006/AC-SEC-008). Zero instructions to rotate keys / patch prod / widen perms. PASS.
- **Sideways third worktree:** none (count 1 ≤ 2). PASS.
- **Full-dump export:** none observed; policy explicitly rejects full-transcript-for-"completeness" (`guards.md:127-128`, proposal Alternatives). Matrices cite paths only, zero bodies. PASS.

## Findings

| ID | Severity | Finding + proof | Remediation + owner |
|----|----------|-----------------|---------------------|
| S-GATE-001 | Medium | C-006 dry run unexecuted — people excerpt paths + exactly-once count are slots, not evidence. Proof: `TEST_MATRIX-git-worktree-people.md:25` slots `<path-or-session-ref>` unfilled; §C-006 "carried, not closed here"; refuter RF-005. | Run orchestrator-aggregated 2-SPEC dry run; fill create-consent excerpt path + removal excerpt path + dirty-baseline drill log path + `override:` record (if any) + announce count (2 create + ≤2 remove); gate closes C-006 on aggregated count. Owner: people owner (santana); security confirms Cross-domain touch only. |
| S-GATE-002 | Medium | Gate evidence citation gaps — C-001/C-002/C-003 claims cite unpathed "session shell log(s)"; security T-002 stale. Proof: eng/auto matrices "session shell log for this lane" with no path; sec matrix `TEST_MATRIX-git-worktree-security.md:10` records 53-line `.gitignore` / absent entry / exit 1 vs current 56 lines + entry `:55-56` + slash exit 0; refuter RF-004/RF-006. States independently CONFIRMED by this review's live probes, but lane citations lack paths. | Attach log paths + `worktree list` snapshot + rescan proof to matrices (or downgrade rows to `pending`); security lane re-attests T-002 against landed entry (one line + probe code). Owner: engineering owner (C-001/C-003 logs) + security owner (C-002/C-004 rescan + T-002 re-attestation). |
| S-GATE-003 | Low | `guards.md:33` bare `check-ignore` form drifts from canonical slash form. Proof: `guards.md:33` bare vs `worktree-lifecycle.md:31` + `pwsh-flow.md:45` trailing-slash; live probe slash exit 0 / bare exit 1; same as RD-003/RF-002. | Use trailing-slash form in `guards.md:33` (one-line fix). Owner: security owner (barrera). Rides gate. |
| S-GATE-004 | Low | Dirty baseline needs override-or-clean record before next `add`. Proof: `git status --porcelain` → `M .gitignore`, `M AGENTS.md`, `M README.md`, `?? quality-gate/git-worktree/`; skill §3 step 2 + RF-003. | Record `override: <who> <timestamp> <reason>` in session/matrix or land clean before any lane creates. Owner: orchestrator. Rides gate; not a security defect. |
| S-GATE-005 | Low | Sandbox TTL co-sign pending. Proof: `SECURITY_REVIEW-git-worktree.md:21,34,43` S-005/C-005 + proposal sign-off unchecked (automation co-sign, orchestrator confirm on ARCH Open Question). | Automation + security co-sign purpose+TTL+deletion owner; orchestrator confirms Open Question; attach removal log if fallback ever exercised. Owner: automation owner + security owner. Rides gate. |

No Critical/High findings in this gate review — nothing to surface same-session under guardrails 9-11 beyond this Conditional record. Every finding above carries diff/scan/log proof; any claim without such proof is REFUTED per guardrail 1.

## Conditions to clear (conditional → pass)

1. C-006: 2-SPEC dry-run evidence attached (excerpt paths + exactly-once count) — clears S-GATE-001 (required).
2. C-002/C-004/C-001/C-003: log paths + `list` snapshots + rescan proof attached; T-002 re-attested against landed entry — clears S-GATE-002 (required).
3. S-GATE-003 slash fix + S-GATE-004 override-or-clean record + S-GATE-005 co-sign — recommended in the same pass; ride gate as Low and do not block handoff once 1-2 clear.
4. Waiver path: CLOSED never ships without recorded orchestrator + domain-owner waiver; none needed here (no fail verdict).

## Verdict Rationale

Conditional, not pass: the security mechanics hold live (ignore green with zero tracked paths, count 1 ≤ 2 with no credential copies, 0 secret/PII values, no freelance instructions, no full dumps, submodule none-needed with guard defined, TTL policy defined with no fallback exercised, STRIDE complete with explicit residual), but the packet cannot OPEN the gate — C-006 dry run is unexecuted by its own matrix's admission and C-001/C-002/C-003 lane citations lack attachable log paths with a stale T-002 observation superseded by the landed entry. Conditional, not fail: no counterexample breaks the lifecycle, ignore gate, capacity guard, or scan posture; all three independently probeable states confirm green, and every gap is a closable evidence attachment or a one-line fix, not a design invalidation. Re-check flips this review to pass when S-GATE-001 dry-run evidence lands and S-GATE-002 attachments + re-attestation are recorded.
