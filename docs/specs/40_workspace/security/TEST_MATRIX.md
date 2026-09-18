# Test / Evidence Matrix: SPEC-grilling-integration-security (C3+C4 lane)

**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Domains-Touched:** [engineering, people, security] (this lane owns: security C3+C4 only)
**Execution_Mode:** multi-subagents (sequential: engineering C1+C2 lane landed 48757e8 + 1f0cd22, this lane now)
**Packet:** SPEC:`docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4) + `docs/specs/20_backlog/SPEC-grilling-integration-security.md#REQ-SEC-001..007` (canonical; `50_archive/` is terminal history per orchestrator COND-S4 ruling) / HARD:multi-subagents+approved-list-only+TTL-90d-or-next-release-whichever-first+no-freelance-fixes / GATE:arch-Approved+security-Conditional(D-1..D-7 bind here) / DOMAINS:[engineering,people,security]
**Skill:** `skills/execute-spec/SKILL.md` via `frame-ship:execute-spec`
**TTL:** 90 days or next release, whichever first (orchestrator-confirmed; re-review owner mandatory on every waiver)

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-SEC-001 | T-001 | Normative three-block bar verbatim in waiver-template (Accepted-risk / Compensating-controls+owner+evidence-ref / Expiry+re-review-owner / Sign-off) + missing-block = FAIL; C3 review-record row in gate-report (pass/fail per block) | Review | pass | e80129c (waiver) / 289f7b0 (gate-report) |
| REQ-SEC-002 | T-002 | CLOSED-stays-CLOSED without recorded domain-owners + orchestrator sign-off + full re-review ban + retry N=2 → escalate, verbatim in quality-gate SKILL §4b; routing table untouched (additive §4b only) | Review | pass | 91c7631 |
| REQ-SEC-003 | T-003 | Secret/PII-shape scan over lane diff = 0 raw values (policy-declaration words only, no credentials/sessions/tokens); zero-PII rule text in all 4 prose refs | Review | pass | n/a (scan evidence below) |
| REQ-SEC-004 | T-004 | PII checkpoint declared in waiver-template + gate-report C3 + verify-handoff SKILL §3a (mask/tokenize + allowlist, purpose + TTL + deletion); allowlisted evidence only — this matrix cites refs, no dumps | Review | pass | e80129c / 289f7b0 / 6f17251 (clauses ride) |
| REQ-SEC-005 | T-005 | Residual-risk + owner mandatory in waiver-template + gate-report C3 + dod-checklist C4 note; silent APPROVE+conditions = FAIL; C4 missing-link = FAIL, attestation-alone = FAIL | Review | pass | 289f7b0 / 6f17251 |
| REQ-SEC-006 | T-006 | No-freelance-fix clause present in all 4 prose refs (report severity+location+evidence, owner remediates; never rotate keys/patch prod/widen perms); diff is docs-only, no prod surface | Review | pass | n/a (clause grep below) |
| REQ-SEC-007 | T-007 | Proof-or-refuted 4/4 refs; Critical/High same-session triage 3/4 refs (waiver-template record-only, no triage line — CE-002/QA-001 correction); this lane's same-session surfacing = T-009 tone conflict (Low, severity + evidence + owner, no batching) | Review | pass | (this commit = triage log) |
| REQ-SEC-NF-001 | T-008 | Deny-by-default holds: 0 unwaived findings ship (only routed tone watch T-009, owner assigned); waiver record path = waiver-template Sign-off block | Review | pass | e80129c |
| REQ-SEC-NF-002 | T-004 | Ley 172-13 minimization: no new PII store; grill corpus minimized; checkpoint notes declare purpose + TTL + deletion | Review | pass | same as T-004 |
| REQ-SEC-NF-003 | T-001 | Template conformance verbatim incl. Sign-off + Residual-risk lines; expiry default 90d-or-next-release with re-review owner mandatory | Review | pass | e80129c |
| Eng REQ-003 | T-002 | C3 surgical-lane + re-review ban + CLOSED-authority text present; routing-table lines unaltered (git diff shows additive blocks only) — engineering-owner fidelity verify at gate | Review | pass | 91c7631 |
| Eng REQ-004 | T-005 | C4 presence check + FAIL rule + re-litigation ban + return-to-execute-spec routing present; N=2 + packets preserved — engineering-owner fidelity verify at gate | Review | pass | 6f17251 |
| REQ-P-003 | T-009 | Banned-lexicon grep on 5 targets: 5 pre-existing `interrogat*` hits (qg-SKILL §4b ×4 + waiver-template:30, inherited working-tree text per approved proposal + eng REQ-003, arch Approved) — new C3/C4 text (gate-report, verify SKILL, dod-checklist) = 0 hits; warmth paraphrase avoids banned tokens | Review | fail (routed) | n/a — routed to people owner at quality-gate (see Residual) |
| REQ-P-006 | T-010 | Masking co-sign clause in all touched refs + warmth line (paraphrase, not verbatim insert #4, to keep new-text banned-grep = 0; deviation recorded, people co-sign at gate) | Review | pass | 289f7b0 / 6f17251 |
| REQ-SEC-001 | T-011 | Multi-waiver every-not-sample + thin-waiver FAIL demo: `SAMPLE-grilling-C3-thin-FAIL.md` (3 waivers rowed; thin FAILs on substance via reviewer-judgment reason, missing-block FAILs, full PASSes) | Review | pass | 17f02a9 (demos) |
| REQ-SEC-005 | T-012 | Dead-link FAIL demo: `SAMPLE-grilling-C4-deadlink-FAIL.md` (dead FAIL, irrelevant FAIL, good PASS; present AND resolves AND relevant) | Review | pass | 17f02a9 (demos) |

## Evidence

- T-001: `skills/quality-gate/references/waiver-template.md:14-31` (normative bar + missing-block = FAIL + Residual-risk + authority bans) + `skills/quality-gate/references/gate-report.md` C3 section (record table + residual statement + silent-PASS = FAIL).
- T-002: `skills/quality-gate/SKILL.md:66-87` (§4b: CLOSED-stays-CLOSED verbatim, full re-review banned, N=2, no routing-table change); `git diff` confirms routing-table lines (§3) unaltered.
- T-003: lane-diff shape scan → 0 raw values:
  `git diff -U0 -- skills/quality-gate skills/verify-handoff | rg -i "api[_-]?key|passwd|password\s*[:=]|secret\s*[:=]|token\s*[:=]|credential\s*[:=]|session\s*[:=]|@[\w.-]+\.[a-z]{2,}|\b\d{3}-\d{2}-\d{4}\b"` → no match lines (hits elsewhere are policy-declaration words, cf. S-C34-006 REFUTED pattern).
- T-004: checkpoint notes at waiver-template `## PII checkpoint`, gate-report `### PII checkpoint`, verify-handoff SKILL `§3a PII checkpoint`; this matrix + plan cite paths only (allowlisted evidence, no dumps).
- T-005: residual lines at waiver-template `**Residual-risk:**`, gate-report `**Residual-risk:**`, dod-checklist `C4 FAIL lists residual-risk + owner`; FAIL rules verbatim in gate-report C3 + dod-checklist Common + verify SKILL §3a.
- T-006: `rg -i "no-freelance-fix"` → waiver-template + gate-report C3 + qg-SKILL §4b + vh-SKILL §3a (4/4); `git status --porcelain` boundary = approved list only (5 skill targets + 2 lane singletons), no runtime/deps/prod.
- T-007: `rg -i "proof-or-refuted"` → 4/4 refs; `rg -i "Critical/High"` → 3/4 refs (waiver-template:54 absent by design — waiver is the record, not the triage point; CE-002/QA-001/SEC-G6); T-009 surfaced here same-session (Low, not batched).
- T-008: no lane findings except routed T-009 (owner assigned, gate-resolvable); waiver Sign-off block = record path.
- T-009: `rg -i "relentless|interrogat(e|ion)|drill|corner|trap"` on 5 targets → 5 hits: `skills/quality-gate/SKILL.md:66,69,73,78` (§4b heading + 3 body, inherited) + `skills/quality-gate/references/waiver-template.md:30` (inherited). New text added this lane (gate-report C3, vh-SKILL §3a, dod-checklist) → 0 hits. Conflict source: eng REQ-003 + approved proposal mandate interrogate-language; people REQ-P-003 bans it — resolver: people owner at quality-gate (no freelance rewrite of approved wording; scope expansion → new proposal).
- T-010: masking clauses 4/4 (same files as T-006); warmth paraphrase in gate-report C3 `### Tone` + vh-SKILL §3a `Tone (...)` — verbatim people-insert #4 deliberately not pasted (contains `relentless`, would trip T-009 on new text).
- T-011: `docs/specs/40_workspace/security/SAMPLE-grilling-C3-thin-FAIL.md` (3 rows: W-A thin FAIL on substance with recorded reviewer-judgment reason, W-B missing-block FAIL, W-C PASS) — every waiver rowed, sample-of-one rejected.
- T-012: `docs/specs/40_workspace/security/SAMPLE-grilling-C4-deadlink-FAIL.md` (dead FAIL, irrelevant FAIL, good PASS) — present AND resolves AND relevant.
- Fix-loop boundary (this session): `skills/quality-gate/SKILL.md` + `references/gate-report.md` + `references/waiver-template.md`, `skills/verify-handoff/SKILL.md` + `references/dod-checklist.md`, security `TEST_MATRIX.md` + 2 demos + proposal pointer line — engineering lane files (`skills/frame-intent/`, `skills/propose-changes/`, engineering TEST_MATRIX) and people SPEC untouched (no sideways).
- Typecheck: N/A with justification — lane diff is markdown-only (`git diff --name-only` shows 0 `.ts` files; no runtime/plugin/package change); `mise run typecheck` unaffected per arch INV-001. No `.opencode/` dir in this checkout; boundary scan is the evidence.
- Changed-files boundary: `M docs/specs/40_workspace/security/IMPLEMENTATION_PLAN.md, M skills/quality-gate/SKILL.md, M skills/quality-gate/references/gate-report.md, M skills/quality-gate/references/waiver-template.md, M skills/verify-handoff/SKILL.md, M skills/verify-handoff/references/dod-checklist.md, M docs/specs/40_workspace/security/TEST_MATRIX.md` (this file) — approved list + lane singletons only; sibling C1/C2 files (`skills/frame-intent/`, `skills/propose-changes/`) untouched.

## Coverage Summary

- Unit coverage: N/A (docs-only skill-text lane, no code; justification: arch INV-001 pass).
- Integration coverage: N/A (same justification).
- Evidence coverage: 15/16 REQ rows pass; 1 routed-fail (T-009 → people owner at gate; keep-per-fidelity + expiring 90d waiver recorded by people-reviewer, COND-P1 — this lane preserves all 5 inherited tokens verbatim, never freelance-rewords).
- Acceptance criteria covered: AC-SEC-001 (T-001 + T-011) / AC-SEC-002 (T-002) / AC-SEC-003 (T-003) / AC-SEC-004 (T-004 + T-012) / AC-SEC-005 (T-005 + T-007 at corrected 3/4 triage) — 5/5 with evidence links (no attestation-alone).

## Residual Risk (explicit — no silent PASS; owner barrera unless noted)

- RR-C34-1 (owner: barrera, verifier: security-reviewer at quality-gate): thin but polite waiver passes C3 (box-ticking without substance) — carried from SECURITY_REVIEW.md; watched via C3 record + reviewer judgment.
- RR-C34-2 (owner: barrera): waiver TTL lapses without re-review if expiry owner does not act — contained by mandatory re-review owner + D-5 TTL confirmed.
- RR-C34-3 (owner: santana/people owner, verifier: people-reviewer at quality-gate): T-009 banned-lexicon conflict (interrogate-language mandated by eng REQ-003 vs banned by REQ-P-003) — RULED by people-reviewer (COND-P1): keep-per-fidelity with recorded expiring waiver (owner santana, expiry = waiver TTL 90d-or-next-release), reword queued (`interrogation lane` → `challenge lane`); new C3/C4 text added this lane = 0 hits (T-009 split re-verified). This fix-loop preserves all 5 inherited tokens verbatim per the waiver — never freelance-rewords.
- RR-C34-4 (owner: orchestrator, closed this lane): dual SPEC copies (`20_backlog/` canonical vs `50_archive/` terminal) + dangling workspace pointer — closed by COND-S4 pointer fix (proposal + matrix now cite the canonical backlog path); re-entrant reviewers resolve backlog; archive stays read-only.

## Assumptions

1. TTL default (90 days or next release, whichever first) is orchestrator-confirmed per dispatch packet — executed as normative text accordingly (reverses SECURITY_REVIEW assumption-2 caution).
2. Engineering mechanics fidelity (routing table / DoD deltas are additive-only) is verified by the engineering owner at quality-gate, never sideways (per HARD).
3. People tone co-sign (T-009 ruling + warmth paraphrase acceptance) is collected at quality-gate via people-reviewer; this lane does not self-resolve cross-domain wording.
4. Sibling C1/C2 lane (48757e8 + 1f0cd22) is intact and untouched — verified via changed-files boundary.
5. Canonical SPEC source for this cycle = `docs/specs/20_backlog/SPEC-grilling-integration-security.md` per orchestrator COND-S4 ruling; `50_archive/` copy is terminal history (content-intact); the proposal's dangling `40_workspace/security/SPEC-…` citation is corrected here as a docs-pointer fix with no content change and no new proposal.
6. E-020 relabel (20/21 + 1 conditional) + C2 cap + trigger hardening + SPEC insert #4 amendment are engineering/people-lane owned (COND-D5/Q2/K3, COND-R1/R3, COND-P2/P3) — this lane does not relabel or reword them; synthesis must read E-020 as conditional until people co-sign lands (cross-domain need to orchestrator, no sideways edit).
