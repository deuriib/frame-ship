# Product Brief: Grilling-Style Challenge Plug-in (C1–C4, Full)

**ID:** BRIEF-grilling-integration
**Initiator:** orchestrator
**Date:** 2026-09-18
**Status:** approved
**Execution_Mode:** multi-subagents
**Domains-Touched:** [engineering, people, security]
**Classification:** architectural-initiative
**Framings-Considered:**
- Framing 1 (Lean C1+C2 plug-in): Challenge step only in `frame-intent` framings + `propose-changes` pre-approval. Rejected by user override (under-scoped for gate/handoff rigor goals): leaves waiver laundering + attestation-grade evidence unaddressed.
- Framing 2 (Recommended by user — Full C1–C4 plug-in): Opt-in challenge inside `frame-intent` (C1) + `propose-changes` pre-approval (C2) + `quality-gate` refuter/waiver scrutiny (C3, surgical) + `verify-handoff` evidence-link check (C4). No new stage, no new skill dir, existing templates reused. Accepted risk: 4-stage touch raises review load; contained by one-pass budget + classification-scaled depth + explicit non-targets.
- Framing 3 (Standalone grilling skill doc): New `skills/grilling/` reference + wiring. Rejected (YAGNI cut): duplicates `quality-gate` refuter + `review-architecture` ADR adversarial core, adds a file to maintain, risks a verdict-less gate bypass.
**Approval:** file-approval — user approved on 2026-09-18

## Problem Statement

Frame-ship has rigor at the gates (STRIDE verdicts, ADR invariants, gate refuter with falsification mission, debugging Iron Law) but soft challenge early and late: `frame-intent` section-wise "looks right?" invites nod-along; `propose-changes` blast radius/rollback is self-graded by the proposer; `quality-gate` CONDITIONALs/waivers can pass on thin justification; `verify-handoff` DoD accepts attestation-grade evidence links. Weak intent and thin proposals travel 3+ stages before meeting an adversary, and polite yeses substitute for challenge. External `grilling` (mattpocock/skills, design-tree + frontier + facts-vs-decisions + recommended-answer + frontier-empty done) offers the missing forcing function, but raw import conflicts with retry N=2, attention budget, and single-primary-owner gate authority.

## Desired Outcome

An opt-in grilling-style challenge plug-in living *inside* four existing stages — never a new stage, never a mandatory gate — that:
1. Falsifies framings before the BRIEF locks `execution_mode` + `Domains-touched` (C1).
2. Interrogates blast radius/rollback before code is allowed (C2).
3. Amplifies the existing refuter and scrutinizes CONDITIONALs/waivers without re-running the full routing table (C3).
4. Demands REQ→evidence links, not ticks, before HANDOFF routes to ship (C4).
Tone stays warm, one question at a time, with opt-in + exit hatch; retry N=2 → escalate and gate authority (CLOSED stays CLOSED) hold throughout.

## Scope

### In Scope

- [engineering] C1 — `frame-intent`: classification-scaled challenger (spike 1 question / bounded 2–3 / architectural full grill), falsifiable-bet prompt for 2–3 framings, recorded in `Framings-Considered`.
- [engineering] C2 — `propose-changes`: pre-approval grill trigger (auth/data/API/PII, multi-domain, blast radius mentions customers/regulators/revenue, or approver request) + one-pass budget, then approve/reject.
- [engineering] C3 — `quality-gate`: refuter-output amplification + CONDITIONAL/waiver interrogation lane only; explicit ban on full re-review; CLOSED stays CLOSED without domain-owners + orchestrator sign-off.
- [engineering] C4 — `verify-handoff`: REQ→evidence-link presence check; explicit ban on re-litigating settled verdicts (return to `execute-spec` with findings instead); missing = FAIL, no handoff.
- [people] Tone/attention guardrail across C1–C4: opt-in + exit hatch, one question at a time, recommended answer invites disagreement (anti-sycophancy), no "relentless" interrogation mode.
- [security] C3 waiver scrutiny validation: accepted-risk + compensating-controls + expiry quality bar preserved, no sideways override.

### Out of Scope

- New skill directory, new stage, or new reviewer role — reuse existing reviewers/templates only.
- Changes to `review-security` STRIDE core or `review-architecture` ADR core beyond C3 scrutiny lane.
- Mid-`execute-spec` interruption, worktree isolation changes, or per-REQ commit rhythm changes.
- `ship-release` rollback re-litigation or archive mechanics changes.
- Verbatim copy of external `grilling` text without LICENSE verification + attribution.
- `debugging` Iron Law, `git-worktree` mechanics, or `pull-request` budget changes.

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decision authority, owns brief + multi-domain gate |
| Owner | engineering owner | Delivery ownership of C1–C4 contract wiring |
| Touched | people owner | Tone/attention/opt-in guardrail sign-off |
| Touched | security owner | Waiver scrutiny + residual-risk bar sign-off |

## Constraints

- Budget: Zero new dependencies; no new skill dir without catalogue update.
- Timeline: One SPEC cycle in `multi-subagents` mode (max 2 parallel lanes); execution_mode frozen here unless orchestrator waiver per SPEC.
- Regulatory: No PII/secrets in grill rounds; masking rules ride every export.
- Brand/GTM: Warmth preserved — "relentless" tone explicitly excluded.
- People/change: Opt-in + exit hatch mandatory; classification-scaled depth (never downgrade mid-initiative, one-way ratchet).
- Chain invariants (non-negotiable): proposal-before-code, STRIDE on auth/data/API, ADR on contract change, no handoff on CLOSED without waiver, retry N=2 → escalate, `SPEC/HARD/GATE/DOMAINS` reference-only packets.

## Open Questions

- [ ] LICENSE + attribution terms of `mattpocock/skills` grilling text — owner: orchestrator (verify before any verbatim reuse)
- [ ] Exact per-classification question budget for C1 (1 / 2–3 / full) — owner: engineering owner + people owner
- [ ] C3 waiver justification quality bar wording — owner: security owner
