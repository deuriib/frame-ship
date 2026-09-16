# Security Review: INTENT-2026-09-16-concise-plugin-prompts

**Reviewer:** barrera (CISO) via security-reviewer / review-risk (fast gate)
**Date:** 2026-09-16
**Spec Reference:** docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md (REQ-001..REQ-006, R-001..R-005)
**Target:** .opencode/plugins/frame-ship.ts (H1-H6 string literals only; logic L102-223 verbatim per REQ-005)
**Execution_Mode:** single
**Verdict (security-reviewer):** APPROVE with conditions (= Conditional)
**Verdict (STRIDE):** Conditional
**Skill:** skills/review-security/SKILL.md

## Scope

Fast gate (review-risk lens), not deep audit. No auth/data/API logic change — only prompt wording compression (~30% reduction, guardrails 1-14 numbers intact, CHAIN const extraction, logic verbatim). User approved proposal; repo untouched at this stage.

Checked by reference:
- Proposal: docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md:1-98
- Target literals: .opencode/plugins/frame-ship.ts:36-100 (WORKFLOW_CARD 3926 + GUARDRAILS_FULL 1979 + POINTERS 735 + COMPACTION 508 chars)
- Target logic (must stay verbatim): .opencode/plugins/frame-ship.ts:102-223 (hasMarker, fileUrlToPath, resolveSkillsDir, loadBootstrapBody, hooks, exports)
- Bootstrap source of truth: skills/using-frame-ship/SKILL.md (live body, 4458 chars injected)

## Threat Model (STRIDE — focused on R-001 guardrail-weakening)

| Threat | Applicable? | Analysis + Mitigation |
|--------|-------------|------------------------|
| Spoofing | No | No identity, authN/Z, or session material in scope. Target file holds no credentials (frame-ship.ts:30-100 verified — no secret/token patterns). No control needed. |
| Tampering (R-001 — PRIMARY) | Yes | Risk: trim rewords guardrails 1-14 and weakens deny-by-default / OWASP / least-privilege / PII enforcement. Proposal itself flags this (PROPOSED_CHANGES.md:68, R-001 Med/High). Mitigation (binding): REQ-003 1:1 semantic checklist (all 14 numbers greppable, no rule dropped/merged/meaning-changed); diff restricted to H1-H6 string literals; verbatim-logic rule REQ-005; review-risk fast gate (this review) PASS required before execute-spec; full review wave re-verifies semantics at quality-gate. Residual persists — see Residual Risk. |
| Repudiation | No | Trace rule (guardrail HARD-5: REQ-ID → test → artifact → gate verdict) and FAIL → retry N=2 → escalate must survive compression verbatim in meaning. Condition C-1 covers it. No repudiation vector introduced by CHAIN extraction. |
| Information Disclosure | No (verified) | Scan of target literals + proposal: no secrets, tokens, credentials, session material; no PII flows added (proposal §Blast Radius explicitly declares none, PROPOSED_CHANGES.md:76). OWASP A01/A02/A07 screen: no new endpoints/adapters/boundaries/payloads — prompt text only. Condition C-5 re-scans post-implementation. Privacy Ley 172-13: no PII store/log/third-party in scope. |
| Denial of Service | No (note R-003) | No algorithmic/runtime change (logic verbatim). Orientation-degradation risk R-003 (compact card under-orients long sessions, PROPOSED_CHANGES.md:70) is availability-of-process, not DoS: mitigated because live bootstrap body still injected + COMPACTION_REMINDER keeps chain + reload order (REQ-004). Watch at verify-handoff on first sessions post-change. |
| Elevation of Privilege | Yes (conditional) | Guardrails 3 (least privilege) + 4 (no freelance fixes) are the privilege boundary in prompt form. If short-form drops "minimum scope" / "never rotate keys, patch prod, or widen permissions yourself" semantics, sessions could over-authorize. Mitigation: Condition C-1 requires those two clauses verbatim-in-meaning; least-privilege + no-freelance-fixes screened under OWASP A01:2021 Broken Access Control. |

## Findings

| ID | Severity | Finding | OWASP | Evidence | Fix location / Remediation |
|----|----------|---------|-------|----------|----------------------------|
| S-001 (R-001) | High (potential) → Medium residual under conditions | Guardrail semantic loss during compression weakens deny-by-default / OWASP / PII / triage enforcement | A04:2021 Insecure Design (primary); A01:2021 if rules 3-4 diluted | PROPOSED_CHANGES.md:68 (R-001 Med/High self-declared); frame-ship.ts:75-91 (14 rules, current full-form carrier) | Conditions C-1 + C-4: 1:1 semantic checklist at execute-spec + re-verification at quality-gate; reject any paraphrase that changes meaning |
| S-002 (R-002) | Low | Chain-order drift in compact card misstates authoritative 9-stage order | N/A (integrity) | frame-ship.ts:17-19,36-37,100 + SKILL.md:22-26 (4x literal today); PROPOSED_CHANGES.md:69 | Condition C-2: single CHAIN const, exact order string asserted in acceptance |
| S-003 (R-004) | Low likelihood / High impact → Medium | Accidental touch of hook/resolver/loader logic during string edit (skill registration, dedupe, path resolution regression) | N/A (integrity) | frame-ship.ts:102-223 (protected logic block); PROPOSED_CHANGES.md:71 | Condition C-3: verbatim-logic rule + tsc typecheck + init/compact smoke; git revert single-file rollback (PROPOSED_CHANGES.md:80) |

No Critical findings. No High active vulnerabilities in current code — S-001 is a forward-looking design risk on the *proposed wording change*, mitigated by binding conditions below. No secrets/PII found in target literals (frame-ship.ts:36-100) — claim evidenced by read, not refuted.

## Conditions for Approval (binding on execute-spec + quality-gate)

- [ ] **C-1 — Guardrail semantics 1:1:** all 14 numbered rules present, greppable by number, grouped Security (1-4) / Privacy (5-8) / Severity (9-11) / Conduct (12-14). Rules 1 (deny-by-default + evidence-or-refuted), 2 (OWASP + trust-boundaries), 3 (least-privilege minimum scope), 4 (no freelance fixes — never rotate/patch/widen), 5-8 (minimization, boundary hygiene, retention TTL+deletion, scoped export), 9-11 (severity scale, Critical/High same-session surfacing, no silent PASS), 12-14 (no sugarcoating, no busywork, respect attention) + FAIL → retry N=2 → escalate — verbatim in meaning. Any meaning change = STOP + re-review.
- [ ] **C-2 — Chain integrity:** single CHAIN const interpolated in header + WORKFLOW_CARD + COMPACTION_REMINDER; exact order `frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release` asserted in acceptance.
- [ ] **C-3 — Verbatim logic + hygiene:** diff touches H1-H6 string literals ONLY; frame-ship.ts:102-223 byte-identical in behavior; `tsc` typecheck clean per project command; single-file zero-deps holds (`import type` only); init/compact smoke (restart opencode, single injection, no duplication on retry).
- [ ] **C-4 — Token gate:** REQ-006 ≥30% reduction measured on (WORKFLOW_CARD + GUARDRAILS_FULL + POINTERS + bootstrap) vs 11,098 baseline with same measuring method; semantic checklist (7 hard rules, 14 guardrails, 9 triggers, load order 1-4, 2 exec modes, role bindings) passes 1:1.
- [ ] **C-5 — No new secrets/PII:** post-implementation scan of new literals confirms no secret/token/credential/session material and no PII examples; PII handling unchanged (Ley 172-13 minimization/boundary/retention/scoped-export intact).
- [ ] **C-6 — Full wave at quality-gate:** this fast-gate PASS does not replace the quality-gate review wave — guardrail semantics re-verified there against implemented diff before verify-handoff/ship.

## Residual Risk (explicit — no silent PASS)

- **RR-1 (owner: vasquez, verifier: barrera at quality-gate):** subtle rewording may pass the checklist yet weaken enforcement tone in long sessions (e.g., "screen every change" → weaker verb). Likelihood Low under C-1, impact High. Watched via first-sessions verify-handoff orientation check (R-003 mitigation).
- **RR-2 (owner: vasquez):** sessions habituated to duplicated wording may under-orient on compact form. Likelihood Low, impact Med. Mitigated by live bootstrap body remaining the full source of truth.

## Sign-off

- [x] barrera (CISO) — Conditional APPROVE (fast gate), 2026-09-16
- [ ] vasquez (CTO, architecture-impacting? No — prompt-only, logic verbatim; CTO acceptance at execute-spec still required per proposal §Approval)
- [ ] Re-verification at quality-gate (full review wave, C-6)
