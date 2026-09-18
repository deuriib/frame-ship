# Resilience Review: grilling-integration (C1–C4 skill-text plug-in)

**Reviewer:** review-resilience (robustness-against-external-failure auditor)
**Date:** 2026-09-18
**Verdict:** **CONDITIONAL (REQUEST_CHANGES)**
**Execution Mode:** multi-subagents, gate wave 2/4
**Packet:** SPEC:`docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2) + `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4) + `docs/specs/10_design/SPEC-grilling-integration-engineering.md` + `docs/specs/10_design/SPEC-grilling-integration-people.md` + `docs/specs/20_backlog/SPEC-grilling-integration-security.md` (+ `50_archive/` copy, content-intact) + `docs/specs/15_requirements/REQ-grilling-integration-*.md` + brief `docs/briefs/BRIEF-grilling-integration.md` (all read-only) / HARD:multi-subagents gate wave 2/4; external surfaces: user-as-dependency (stall, `salir`, fatigue), parallel C3/C4 lane divergence, archived-mid-lane SPEC path drift / GATE:arch Approved, security Conditional (C-1..C-6) / DOMAINS:[engineering, people, security]
**Skill:** `frame-ship:quality-gate` via skill tool — base `skills/quality-gate/SKILL.md` + checklist `skills/quality-gate/references/engineering/resilience-review.md` (local mirror `D:\GitHub\frame-ship\skills\quality-gate\`)

> Skill path cited per orders: `skills/quality-gate/SKILL.md` (loaded via `frame-ship:quality-gate`) + checklist `skills/quality-gate/references/engineering/resilience-review.md`. Domain role understood before acting: audit timeouts, degradation, external-dependency failure; pure logic bugs NOT hunted here — correctness/edge-case findings below are cited by reference to reliability (`review-reliability.md`), refuter (`review-refuter.md`), never re-decided.

## Checklist (resilience-review.md × C1–C4 wording)

- [⚠️] Graceful degradation under partial failure — C1/C2 `salir` records `grill: declined/exited` ✅, but C3/C4 mid-interrogation exit has no terminal → gate limbo (RS-004); every-vs-sample lets a partial check present as a full gate (RS-005)
- [❌] Circuit breakers / retries with backoff — `Retry N=2 → escalate orchestrator` present in C3 (`quality-gate/SKILL.md:79`, gate-report `:47`) + C4 (`verify-handoff/SKILL.md:40-41`) + all pre-flights ✅, but **absent from the C1/C2 round text** where the stall actually happens (RS-002); no timeout/backoff concept on any grill round (RS-001; backoff N/A for a human loop — a deadline + escalate is the breaker)
- [❌] Resource limits (memory, CPU, connections) — translated here as attention budgets: C1 caps (1 / cap 3 / cap 5) ✅ as backpressure, but C2 `máx N` undefined = unbounded one-pass (RS-003); 20-REQ / multi-waiver one-at-a-time unbounded (RS-006)
- [⚠️] Recovery from crash / restart — one-way ratchet ✅ (no downgrade cascade); dangling SPEC path in the security proposal (RS-007) + archived-mid-lane dual copies = re-entrant reviewer can resolve the wrong source
- [✅] No single point of failure introduced — parallel lanes touch disjoint skill files (C1/C2: frame-intent + propose-changes; C3/C4: quality-gate + verify-handoff), sequential landing documented; no shared state, no SPOF added
- [⚠️] Observability (logs, metrics, traces) — `grill: declined/exited` recording + mandatory `residual-risk + owner` + scan logs ✅; no stall-duration / exit-count signal (how long has this round been stalled? how many exits?) ⚠️
- [⚠️] Chaos scenarios tested — happy-path `sí` samples only; no `salir`-mid-round trace, no no-answer trace, no N+1 trace, no multi-waiver trace (all unproven — see Stress Scenarios)

## External Dependencies Identified (with pattern/layer)

| # | Dependency | Pattern / Layer | Failure mode | Containment present? |
|---|-----------|-----------------|--------------|----------------------|
| D-1 | User-as-dependency (answers, stalls, `salir`, fatigue) | Human-in-the-loop port inside stage process text (`frame-intent/SKILL.md:54-71` C1, `propose-changes/SKILL.md:42-53` C2, `quality-gate/SKILL.md:66-87` C3, `verify-handoff/SKILL.md:35-52` C4) | No-answer stall = initiative hangs; `salir` mid-C3/C4 = gate limbo; 20-question round = fatigue cascade | Partial: opt-in + `salir` + one-at-a-time + pause/exit offer ✅; timeout + round-level N=2 ❌ (RS-001/002) |
| D-2 | Parallel C3/C4 lane vs C1/C2 lane | Disjoint file-set lanes, sequential landing (eng 48757e8+1f0cd22 → sec e80129c…6f17251) | Lane divergence / shared-state race | ✅ No race: disjoint targets, boundary scans clean in both matrices; sequential order recorded |
| D-3 | SPEC source-of-truth path (backlog → workspace → archive) | Reference-only packet `SPEC:<path>#REQ` | Archived-mid-lane drift: reviewer resolves stale/missing path on re-entry | ⚠️ RS-007: dual live copies (`20_backlog/` + `50_archive/`) + dangling workspace path in security proposal |
| D-4 | Orchestrator escalation + waiver record as fallback | Circuit-breaker / fallback (`Retry N=2 → escalate`, waiver-template sign-off, CLOSED-stays-CLOSED) | Breaker present at gate, absent at the round | ⚠️ Breaker wired C3/C4 + pre-flights, not C1/C2 rounds (RS-002) |

No network/disk/process external I/O in this unit (docs-only skill-text plug-in) — the "network" is the user, the "queue" is the question budget, the "timeout" is the stall deadline. Graded accordingly; no Critical (no data-loss/corruption/prod-cascade surface).

## Stress Scenarios

| ID | Scenario | Expected | Observed | Pass? |
|----|----------|----------|----------|-------|
| RS-S1 | User goes silent mid-C1 round (no-answer, no `salir`) | Round deadline → recorded `grill: stalled` → N=2 → escalate orchestrator, initiative pauses (no hang) | No timeout, no round-level N=2 in C1 text; only waiver TTL (90d) exists, which is a waiver expiry, not a round deadline | **no** → RS-001/002 |
| RS-S2 | User says `salir` after 1 of 2 C3 waivers interrogated | Terminal: `grill: exited` recorded + escalate; uncleared waiver stays CONDITIONAL; no promotion of uninterrogated waivers | Exit terminal defined for C1/C2 (`grill: declined/exited`), undefined at C3/C4; gate-report Load Evidence covers skill-load, not round exit | **no** → RS-004 |
| RS-S3 | C2 round asks 15 questions as "one pass" | Backpressure: hard cap rejects question N+1 (≤3 mirroring C1) | `máx N` undefined; 15-Q single pass is compliant text | **no** → RS-003 (reliability RL-001/L-1 by reference) |
| RS-S4 | 20-REQ spec hits C4 one-at-a-time | Bounded batch + pause/exit per batch; stall logged per batch | Unbounded sequential; fatigue failure with no breaker | **no** → RS-006 (RL-009 by reference) |
| RS-S5 | 3 CONDITIONALs, C3 checks 1 easy waiver, promotes 3 | Degraded-check refusal: every waiver gets a row; rows = CONDITIONALs | `every…` vs `the waiver sample` quantifier mismatch allows sample-of-one | **no** → RS-005 (RL-004/L-4 by reference) |
| RS-S6 | Re-entrant reviewer resolves security SPEC after archive move | Single canonical path; packet resolves unambiguously | Two live copies + proposal cites non-existent workspace path (see RS-007) | **no** → RS-007 |
| RS-S7 | Approver requests 4th C2 re-grill | Re-grill counter ≤1 (total ≤2 passes) then N=2 → escalate | Approver-request hatch uncapped; N=2 bypassed | **no** → RS-002 (RL-001/L-2 by reference) |
| RS-S8 | EN-only user never discovers `salir` | `exit/salir` alias; graceful exit discoverable | `salir`-only opener; exit hatch undiscoverable = no graceful degradation for EN users | **no** → Low (RL-011 by reference) |

## Findings

| ID | Severity | Location | Finding | ✅/⚠️/❌ |
|----|----------|----------|---------|----------|
| RS-001 | High | `skills/frame-intent/SKILL.md:51-71` (C1), `skills/propose-changes/SKILL.md:36-53` (C2); C3 `:66-87`, C4 `:35-52` (no round deadline either) | No grill-round timeout / no-answer stall path. Only TTL in the system is waiver expiry (90d-or-next-release) — a fallback for stale waivers, not a deadline for a stalled human loop. A silent user hangs the initiative indefinitely with no signal, no deadline, no auto-escalate. (Reliability RL-002/007Timeout-half cited by reference; this is the resilience grading: missing timeout on the single external dependency.) | ❌ |
| RS-002 | High | C1 + C2 round text (absent) vs C3 `quality-gate/SKILL.md:79` / `gate-report.md:47` + C4 `verify-handoff/SKILL.md:40-41` (present) | Retry-budget N=2 → escalate missing exactly where the stall lives. Global pre-flight N=2 covers skill-load failure, not round deadlock; approver-request re-grill hatch uncapped (L-2). Retry-budget preservation fails: unbounded re-grill consumes attention with no breaker. (RL-002/L-7 + RL-001/L-2 by reference.) | ❌ |
| RS-003 | High | `skills/propose-changes/SKILL.md:42-44` (`máx N` undefined) + `references/proposal-template.md:48-50` | Missing backpressure on the C2 queue: one pass with unbounded questions is compliant. O(n) unbounded interrogation → fatigue cascade under load; the brief's accepted F2 review-load risk is contained by a budget that has no number. C1 caps (1/cap 3/cap 5) are the correct pattern — C2 lacks it. (RL-001/L-1 by reference; resilience angle: resource limit.) | ❌ |
| RS-004 | Med | `skills/quality-gate/SKILL.md:64` (exit hatch ref), `skills/verify-handoff/SKILL.md:51-52` (Tone `salir`/pause) | Exit-terminal undefined at C3/C4 → gate limbo on exit. C1/C2 define `grill: declined/exited` ✅; exiting mid-C3-interrogation or pre-C2-decision leaves CONDITIONALs uninterrogated / proposal undecided with no recorded terminal, no auto-escalate, no no-promote rule. Degradation path exists at the front of the chain and vanishes at the gate. (RL-007/L-6 by reference.) | ⚠️ |
| RS-005 | Med | `skills/quality-gate/SKILL.md:68-69` (`every…`) vs `:77-79` (`the waiver sample`) + `gate-report.md:39-43` | Partial-failure presented as full success: sample-of-one satisfies the letter while N-1 waivers ship unexamined — false confidence, worse than an explicit degraded-mode flag. Fix is an every-not-sample rule (rows = CONDITIONALs). (RL-004/L-4 by reference; resilience angle: graceful-degradation honesty.) | ⚠️ |
| RS-006 | Med | `skills/verify-handoff/SKILL.md:50-52` (one-at-a-time Tone) + `skills/quality-gate/SKILL.md:64` | Unbounded O(n) sequential interrogation: 20-REQ C4 → 20 rounds; multi-waiver C3 → N rounds; no batching, no per-batch pause/exit, no cap. Fatigue failure mode with no backpressure despite warm one-at-a-time labels. (RL-009 by reference.) | ⚠️ |
| RS-007 | Med | `docs/specs/40_workspace/security/PROPOSED_CHANGES.md:3` (cites `docs/specs/40_workspace/security/SPEC-grilling-integration-security.md`) vs tree (no such file; lane holds PLAN+MATRIX+PROPOSAL only) + dual copies `docs/specs/20_backlog/SPEC-grilling-integration-security.md` ≡ `docs/specs/50_archive/SPEC-grilling-integration-security.md` | Dangling recovery pointer + dual-source drift. The security proposal's SPEC reference resolves to a path that does not exist; the actual security SPEC lives in two places at once (backlog canonical + archive copy, content-intact per diff but two writers' targets). On restart/re-entry a reviewer resolves the wrong source or a dead link — recovery-from-restart hazard. Fix: single canonical path + correct the proposal citation (docs-only, no new proposal needed if ruled as pointer fix at gate). | ⚠️ |
| RS-008 | Low | Lanes 48757e8/1f0cd22 (C1/C2) vs e80129c…6f17251 (C3/C4); both TEST_MATRIX boundary scans | ✅ Parallel-lane divergence contained: disjoint skill targets, sequential landing, boundary scans clean. No finding — recorded as verified. | ✅ |
| RS-009 | Low | `skills/frame-intent/SKILL.md:58-62` ratchet text | ✅ One-way ratchet prevents downgrade cascade mid-initiative. No finding — recorded as verified (wording-softening caveat CE-003 carried from refuter, not re-decided). | ✅ |
| RS-010 | Low | C1 `:57` + C2 `:42-44` (`grill: declined/exited` recording) + waiver-template residual lines + both scan logs | ⚠️ Observability half-present: decline/exit recorded, residual-risk+owner mandatory, scan evidence linked. Missing: stall-duration / exit-count signal (no "stalled Xsessions → escalated" trace). Recommend logging stall + exit counts in gate-report C3 record; cheap, high-value for the next fatigue review. | ⚠️ |

No Critical: docs-only unit, no data-loss/hang-with-data-consequence/cross-service-cascade surface. Highest grade is High (initiative hang + unbounded attention consumption + breaker gap).

## Verdict Rationale

OPEN is unavailable: three Highs (RS-001 no timeout, RS-002 round-level N=2 gap + uncapped re-grill, RS-003 unbounded C2 budget) mean the system's sole external dependency (the user) can stall or flood it with no breaker. CLOSED is unwarranted: no data-loss/cascade surface; C1 caps + ratchet + disjoint lanes + CLOSED-stays-CLOSED + residual-risk bars are genuinely present; failures degrade to stall/fatigue/limbo, not corruption. **CONDITIONAL** is correct, aligned with refuter CONDITIONAL (CE-001..005) and reliability CONDITIONAL (COND-R1..R5): conditions below are resilience-owned and de-duplicated — where the fix is shared with reliability, the COND-R is cited rather than forked, plus two resilience-only conditions (stall deadline, SPEC-path single-sourcing).

### Conditions to clear (COND-S1..S4, resilience-owned)

- [ ] COND-S1 (RS-001/002 — stall breaker; shares fix with COND-R2): round-level `Retry N=2 → escalate orchestrator` verbatim in C1 + C2 sections AND a stall deadline (e.g. no-answer after N reminders → recorded `grill: stalled` + escalate, initiative pauses — no silent hang). C3/C4 exit-terminal rule rides the same edit (exit = recorded + escalate, waiver stays uncleared / proposal stays unapproved, no silent promote).
- [ ] COND-S2 (RS-003 — backpressure; shares fix with COND-R1): numeric C2 cap (e.g. ≤3 mirroring C1 bounded) + pass-definition (pass = ≤N questions) + N+1 FAIL demo. Unbounded queue must become bounded before ship.
- [ ] COND-S3 (RS-005/006 — degraded-mode honesty; shares fix with COND-R4 + RL-009): every-not-sample fix ("every CONDITIONAL/waiver gets a row; rows = CONDITIONALs") + multi-waiver demo; batching/cap note for 20-REQ-scale C4 (batch + pause/exit per batch) or explicit reviewer-judgment backstop recorded as COND-risk, not silent.
- [ ] COND-S4 (RS-007 — resilience-only, recovery pointer): single-source the security SPEC (rule which of `20_backlog/` vs `50_archive/` is canonical for this cycle; archive must stay read-only per `docs/specs/AGENTS.md`) + correct the dangling `40_workspace/security/SPEC-…` citation in the security proposal. Docs-pointer fix; no content change, no new proposal.

## Risks

- RR-S1 (owner: engineering owner): silent-user stall hangs an architectural initiative mid-C1 with no signal — contained only after COND-S1 lands; until then, initiatives carry unbounded stall risk (brief's F2 review-load acceptance did not price infinite stall).
- RR-S2 (owner: engineering owner + people owner): unbounded C2 round burns attention budget (REQ-P-005 spirit) — fatigue cascade makes later gates rubber-stamps; COND-S2 is the backpressure.
- RR-S3 (owner: security owner, carried RR-C34-1): thin-but-polite waiver passes C3 by box-ticking — presence ≠ substance; watched via C3 record + reviewer judgment (RL-006 by reference, not re-decided).
- RR-S4 (owner: people owner, carried T-009/CE-001): banned-lexicon conflict ships unresolved if gate does not rule — resilience impact is EN-user exit discoverability + tone-fatigue interaction; ruling owned by people-reviewer (COND-R5 by reference).
- RR-S5 (owner: orchestrator): dual SPEC copies diverge under the next edit — re-entrant agents resolve different sources; COND-S4 closes it.

## Assumptions

1. Prior verdicts taken as GATE input, not re-decided: refuter CONDITIONAL (CE-001..005) + reliability CONDITIONAL (COND-R1..R5) + arch Approved + security Conditional (C-1..C-6). Overlap findings cited by ID, graded here only for timeout/degradation/retry-budget impact.
2. Skill-text-only cycle: no runtime/plugin/package change, so circuit-breaker/backoff expectations are graded as text invariants (deadline + N=2 + escalate wording), not as code (no timeout-ms, no jitter — correctly N/A for a human loop).
3. `20_backlog/` vs `50_archive/` security SPEC copies verified content-identical by spot-diff of head/body/tail sections (both trace to `20_backlog/` path in §handover line); full byte-diff left to orchestrator synthesis — RS-007 is about pointer hygiene, not content divergence.
4. Working tree at audit time: clean (`git status --porcelain` empty save the two gate verdict commits `0b2b4d5`, `2acbf92`); lane commits 48757e8…94af54a taken as the complete C1–C4 diff per refuter assumption-3.
5. TTL (90 days or next release, whichever first) taken as orchestrator-confirmed per dispatch packet — graded as waiver-expiry fallback, explicitly NOT as a round timeout (RS-001 distinction).

## Scoped Evidence (reference-only, allowlisted)

- Round text under audit: `skills/frame-intent/SKILL.md:51-71` (C1: opener + `salir` + caps + ratchet + `grill: declined/exited`, no timeout, no N=2) + `skills/propose-changes/SKILL.md:36-53` (C2: trigger + `máx N` + one-pass + uncapped approver hatch, no timeout, no N=2) + `skills/quality-gate/SKILL.md:64-87` (§4b: exit-hatch ref + three-block bar + CLOSED authority + N=2 `:79`, every-vs-sample `:68-69` vs `:77-79`) + `skills/verify-handoff/SKILL.md:35-52` (§3a: presence check + N=2 `:40-41` + Tone `salir`/pause `:51-52`, no exit terminal)
- Breaker/fallback text: `skills/quality-gate/references/gate-report.md:32-73` (C3 record + residual + Load Evidence + N=2 `:47`) + `skills/quality-gate/references/waiver-template.md:14-31` (three-block bar + residual + authority) + `skills/verify-handoff/references/dod-checklist.md:10-11` (link-presence FAIL + residual)
- Packet refs: `docs/briefs/BRIEF-grilling-integration.md` (71 lines, Framing 2, chain invariants `:65`) + `docs/specs/10_design/SPEC-grilling-integration-engineering.md` + `docs/specs/10_design/SPEC-grilling-integration-people.md` + `docs/specs/20_backlog/SPEC-grilling-integration-security.md` ≡ `docs/specs/50_archive/SPEC-grilling-integration-security.md` (dual-copy note) + `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (117 lines) + `docs/specs/40_workspace/security/PROPOSED_CHANGES.md:3` (dangling workspace SPEC path) + both `TEST_MATRIX.md` (21/21 + 13/14+T-009-routed) + `ARCHITECTURE_REVIEW.md` (Approved) + `SECURITY_REVIEW.md` (Conditional C-1..C-6)
- Prior gate verdicts (input, not evidence re-tried): `docs/specs/40_workspace/quality-gate/grilling-integration/review-refuter.md` (CONDITIONAL, CE-001..005) + `review-reliability.md` (CONDITIONAL, RL-001..011, COND-R1..R5)
- Commands: `git status --porcelain` (clean) + `git log --oneline -12` (lane sequence 48757e8…2acbf92) + `ls docs/specs/40_workspace/security/` (no SPEC file — RS-007) + read-through of all four round sections for timeout/N=2/exit-terminal strings (absent-in-C1/C2 confirmed by read, not by grep alone)
- Skill loaded: `frame-ship:quality-gate` → `skills/quality-gate/SKILL.md` + `skills/quality-gate/references/engineering/resilience-review.md` (checklist authority for this verdict)

## Cross-Domain Needs → Orchestrator (formal, no sideways)

1. **Engineering owner at gate:** COND-S1/S2/S3 mechanics (C2 cap, round-level N=2 + stall deadline, exit-terminal, every-not-sample, batching note) + routing-table/DoD additive-only confirm (shared with COND-R1/R2/R4).
2. **People owner at gate:** stall-deadline + exit-terminal wording co-sign (tone/fatigue interaction, REQ-P-005) + COND-R5 ruling (T-009/CE-001 `interrogat*`) + `exit/salir` alias blessing (RS-S8).
3. **Security owner at gate:** RR-C34-1 thin-waiver watch + residual-risk bar + T-009 triage confirm + C-1..C-6 clearance carry.
4. **Orchestrator:** COND-S4 single-sourcing ruling (which SPEC path is canonical; archive read-only enforcement) + TTL re-confirm at synthesis (as waiver-expiry, not round-timeout) + LICENSE open question stays with orchestrator (C-5, carried).
