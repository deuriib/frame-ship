# People Review: SPEC-git-worktree-people

**Reviewer:** people-reviewer (santana lens, people owner)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/domains/people-review.md`
**Packet (by reference only):** SPEC `skills/git-worktree/references/announce-template.md` + `docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005` + `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md` (5/5, C-006 carried not closed) + `docs/specs/15_requirements/REQ-git-worktree-people.md` + `docs/specs/40_workspace/santana/PROPOSED_CHANGES-git-worktree-people.md` + prior gate verdicts (arch-Approved INV-008; sec-Conditional C-006 dry run unexecuted per `docs/specs/40_workspace/quality-gate/git-worktree/security-reviewer.md` S-GATE-001; refuter RF-005)
**HARD:** execution_mode=multi-subagents, consent-before-create + uniform announce exactly-once, byte-uniform wording, no PII in excerpts, reference-only packets, finding w/o proof = REFUTED
**DOMAINS:** [engineering, automation/ops, security, people] — this review covers people only; never approves own work (santana proposal reviewed here by gate lens, not by proposer)

## Checklist (per `skills/quality-gate/references/domains/people-review.md` + task verify list)

- [x] Team impact assessed — one consent prompt + one announce line per create/remove; minimal load per proposal Blast Radius + matrix Domain Checks. Design PASS; live count pending P-001.
- [x] Skills gap identified — none: no new roles, habit-only surface per SPEC §5 + REQ-NF-001; handoff to state "no new roles".
- [x] Workload implications reviewed — minimal (one prompt + one line per create/remove, zero mid-session re-prompts per template §4). Design PASS; execution count pending P-001.
- [x] Culture/values alignment — warm uniform tone (donde+rama+porque+limpieza), blame-free refusal ("No pierdo tu trabajo sin tu visto bueno") per template §§1-3 vs SPEC §4 verbatim. PASS.
- [x] Hiring/training needs flagged — none needed beyond announce/consent habit per SPEC §5 + REQ-NF-001. PASS.
- [x] Change management plan — fatigue guard itself is the plan (exactly-once, byte-uniform, no re-prompts, template §4). Design PASS; dry-run proof pending P-001.
- [x] Consent prompt ES+EN — both present with same slot order + gate force: ES `announce-template.md:10-12`, EN `announce-template.md:18-20`; contract prompt → recorded answer → only then `add` (`:22`). PASS.
- [x] Uniform template donde+rama+porque+limpieza — create line slot order fixed (`:14`), remove line (`:26-28`), slot-only variance (`:14`); matches SPEC §4 verbatim modulo slots. PASS as design.
- [x] Exactly-once — fires once per create + once per remove, never per setup command (`:46`); 2-SPEC expectation exactly 2 create + ≤2 remove (`:49`). Design PASS; observed count pending P-001.
- [x] Fatigue guard — byte-uniform wording (`:47`, `rg` diff only slots differ), zero repeat consent within live session (`:48`). Design PASS; live proof pending P-001.
- [x] Dirty-baseline DX plain language + recorded override contract — cause + `<n> archivos` + 3 options (stash/commit/recorded override), never raw dump (`:38-40`); override `override: <who> <timestamp> <reason>` before proceed (`:42`). PASS as design; drill log path pending P-001.
- [x] Brief-back line — formal Cross-domain request to orchestrator, never sideways (`:54-57`), satisfies REQ-PPL-005/AC-005. PASS.
- [x] No PII in excerpts/slots — slots carry no secrets/PII, scoped excerpts only, full dumps refused (`:60-63`); sec gate probes 0 values; matrix attests zero secrets. PASS.

## Findings

| ID | Severity | Finding + proof | Remediation + owner |
|----|----------|-----------------|---------------------|
| P-001 | Medium | C-006 dry run unexecuted — consent Q+A excerpts, removal excerpt, drill log, and exactly-once count are unfilled slots, not evidence. Proof: `TEST_MATRIX-git-worktree-people.md:25` slots `<path-or-session-ref>` unfilled; §C-006 "carried, not closed here"; sec gate S-GATE-001 + refuter RF-005 confirm. In-table 5/5 `pass` ≠ proven per HARD (finding w/o proof = REFUTED). | Run orchestrator-aggregated 2-SPEC dry run; fill create-consent excerpt path + removal excerpt path + dirty-baseline drill log path + `override:` record (if any) + announce count (expect 2 create + ≤2 remove); gate closes C-006 on aggregated count. Owner: people owner (santana); security confirms Cross-domain touch only. |

No other people findings. No Critical/High in this lens — nothing to surface same-session beyond this Conditional record. Every claim above cites line-level proof; any claim without such proof is REFUTED per guardrail 1.

## Verdict Rationale

Conditional, not pass: the people contract is sound on paper — ES+EN consent, uniform donde+rama+porque+limpieza order, exactly-once + fatigue guard, plain-language refusal with recorded override contract, brief-back line, and no-PII slots all verify against template §§1-6 vs SPEC §4 verbatim — and team/workload/culture/change checks all assess clean with no hiring need. But the packet cannot OPEN on people evidence alone: AC-001/AC-003/AC-004 depend on the unexecuted 2-SPEC dry run (excerpt paths + drill log + count are slots per matrix :25), the same gap that holds sec-Conditional S-GATE-001 and refuter RF-005. Conditional, not fail: no wording defect, no PII leak, no fatigue-guard hole, no missing brief-back — every gap is a closable dry-run attachment, not a design invalidation. Re-check flips to pass when P-001 evidence lands (filled excerpt paths + observed 2 create + ≤2 remove count + drill log/override record).
