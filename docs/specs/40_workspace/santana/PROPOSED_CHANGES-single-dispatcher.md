# Proposed Changes: santana (CHRO/CPO — people / agent-rules)

**Spec Reference:** SPEC-single-dispatcher-people (REQ-F-001..008, REQ-NF-001..006)
**Agent:** santana (people domain chain owner)
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents (inherited from spec; frozen at frame-intent, not overridden)
**Domains-Touched:** people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops — all 8 template sets touched mechanically (wording-only)
**Packet carried forward:** SPEC: `docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md#REQ-F-001..REQ-NF-006` / HARD: multi-subagents; uniform wording across 68 templates + 4 implementer prompts; no file renames; frontmatter `name`/`description` only / GATE: none-yet → quality-gate (people-reviewer APPROVE + 7 C-level sign-offs at gate) / DOMAINS: [people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops]

## Summary

This proposal converts the approved SPEC-single-dispatcher-people into a reviewable wording-change plan: one canonical Cross-domain request contract (4 fields: Need, Reason, Suggested owner, Urgency) applied word-for-word across all 68 agent templates, replacing the three divergent delegation shapes (c-level ×7, Variant A ×20, delegation-authorizing Variant B ×40), and binding the brief-back wording of the 4 restored implementer prompts (REQ-F-008). montilla.md stays the sole dispatcher (negative control) with dispatch authority retained and the old verb "fan out" removed. The repo stays untouched — no template file is modified at this stage; implementation is execute-spec after approval.

## Coupling Requirements (CEO decisions)

1. **Canonical wording** — The Cross-domain request wording in `SPEC-single-dispatcher-people.md` §4 (Contracts W1/W2/W3) is **canonical**. The engineering proposal (vasquez) must cite it **verbatim**: `SPEC-single-dispatcher-engineering.md:35` already binds "matching santana's exact wording contract" — this proposal makes that coupling explicit and gate-checkable (any divergence from W1/W2/W3 strings fails the people gate).
2. **Implementer-prompt restoration (DEP-2)** — The 4 prompts under `skills/templates/implementers/` are being **restored** by the engineering track (glob at spec time = 0 files; deleted by prior IMPLEMENTATION_PLAN-ceo-only-dispatch.md:38). This proposal covers their **wording contract** (REQ-F-008 / Contract W8) and depends on restoration before execute-spec: AC-REQ-F-008 is an execution blocker if the directory is still absent — escalate to montilla per DEP-5 (no silent creation, no 3rd loop).
3. **montilla negative control** — montilla.md keeps its sole-dispatcher role: dispatch authority retained on lines 45/49/68 (unchanged except old-verb removal) and line 19 reframed per W5a — authority kept, "fan out" dropped. montilla is the ONLY template that dispatches.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| 68 templates (all 8 sets) | policy-update | REQ-F-001: canonical Cross-domain request contract (W2 block: Need, Reason, Suggested owner, Urgency) as the Delegation section; montilla gets the receiving-side variant (W5b). 4 fields present in 68/68 (AC-REQ-F-001, grep = 68). |
| 67 non-montilla templates + montilla.md:19 | policy-update | REQ-F-002: Capabilities `Route:` line → W1 uniform wording in 67 templates (`Route: no delegation — do the work yourself end to end; cross-domain need → formal Cross-domain request to montilla (CEO) in your return, never sideways.`); montilla.md:19 → W5a (drops "fan out", keeps sole-dispatch authority). Greps: 0 × "Route: no sub-delegation", 67 × "Route: no delegation", montilla has "sole dispatcher" and no "fan out" (AC-REQ-F-002). |
| 67 non-montilla templates + montilla.md:67-70 | policy-update | REQ-F-003: Delegation section → uniform W2 brief-back block in 67 files (60 specialists + 7 c-levels); montilla.md:67-70 → W5b. Eliminates all three current shapes: c-level "never delegate" ×7, Variant A "Do your own work." ×20, delegation-authorizing Variant B ×40. Greps 0 (AC-REQ-F-003). |
| `agents/c-level/montilla.md` | policy-update | REQ-F-004: negative control — :45 and :49 retained (contain "sole dispatcher", no old verb); :19 → W5a; :69 ("flag it in your return (need + reason + suggested owner)") → receiving-side Cross-domain request clause (W5b bullet 2); adapter :74 unchanged (dispatcher, no brief-back to itself). "sole dispatcher" count ≥ 3; "fan out" = 0 (AC-REQ-F-004). |
| 68 templates (adapter line 2) + 7 c-level files (stage-4 line) | policy-update | REQ-F-005: adapter line 2 → W3 — c-level variant (7 files): `...you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch.`; specialist variant (60 files): appends `; you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch.` to the task(general) clause. c-level SDD stage-4 line (7 files, e.g. santana.md:32) → W4. Greps: 0 × "you return your deliverable, never dispatch", 67 × "and never dispatch" (montilla excluded), stage-4 clause 7/7 (AC-REQ-F-005). |
| `agents/engineering/espinoza.md:114` | policy-update | REQ-F-006: outbound-dispatch residue → W6 (`Routing lives with your harness; inside frame-ship only montilla (CEO) dispatches — never outbound dispatch from you; see the adapter below`). Grep "outbound dispatch" = 0 (AC-REQ-F-006). |
| `agents/README.md:35` | policy-update | REQ-F-007: convention doc "flag don't grab" → W7 (CEO-only dispatch + Cross-domain request fields). Grep "flag don't grab" = 0 repo-wide (AC-REQ-F-007). |
| `skills/templates/implementers/{engineering-implementer, engineering-reviewer, engineering-qa-verifier, generic-implementer}.md` (4) | policy-update | REQ-F-008: no-subagents line → W8 (`You do not dispatch subagents — do the work end to end; if the work needs another domain/specialist, return a formal Cross-domain request to montilla (CEO): Need + Reason + Suggested owner + Urgency.`). **Wording bound by this proposal; file restoration is vasquez's DEP-2 scope.** Execution blocker + escalate montilla (DEP-5) if not restored. Grep "Cross-domain request" 4/4 + "You do not dispatch subagents" 4/4 post-restoration (AC-REQ-F-008). |
| All targets above | policy-update | REQ-NF-001..006: consistency (W1/W2/W3 cross-file diff = 0 bytes; montilla W5 variants compared separately), zero residue (8 grep targets = 0 outside montilla.md + tool-mapping.md), freeze (no renames, frontmatter name/description only, diff set = 68 templates + README + 4 prompts via vasquez), privacy (wording-only, no PII/secrets), gate (people-reviewer APPROVE + 7 C-level sign-offs), mechanism compatibility (packet tokens intact — attestation below). |

## Files Touched (68 templates + README; grouped by domain — no renames, wording-only)

| Group | Files |
|-------|-------|
| c-level (8) | `agents/c-level/{barrera,dauhajre,montero,montilla,santana,subero,vasquez,vera}.md` |
| engineering (13) | `agents/engineering/{architect,backend,data-engineer,devops,espinoza,frontend,qa,review-data,review-readability,review-refuter,review-reliability,review-resilience,review-risk}.md` |
| shared (1) | `agents/shared/writer.md` |
| security (6) | `agents/security/{grc-analyst,iam-specialist,incident-responder,privacy-engineer,security,security-reviewer}.md` |
| finance (14) | `agents/finance/{accountant,cost-analyst,credit-analyst,financial-analyst,finance-reviewer,fpna-analyst,internal-auditor,investment-analyst,payroll-specialist,personal-finance,personal-investor,risk-analyst,tax-specialist,treasurer}.md` |
| legal (8) | `agents/legal/{compliance-officer,contract-drafter,ip-counsel,labor-counsel,legal-researcher,legal-reviewer,litigation-counsel,privacy-counsel}.md` |
| marketing (9) | `agents/marketing/{brand-reviewer,brand-strategist,content-strategist,copywriter,email-marketer,marketing-analyst,ppc-specialist,seo,social-media}.md` |
| people (4) | `agents/people/{friction-mediator,people-operations,people-reviewer,performance-analyst}.md` |
| revenue (5) | `agents/revenue/{deal-closer,funnel-optimizer,pricing-strategist,revenue-reviewer,revops-analyst}.md` |
| convention doc (1) | `agents/README.md` (REQ-F-007, line 35) |
| implementer prompts (4, wording-bound) | `skills/templates/implementers/{engineering-implementer,engineering-reviewer,engineering-qa-verifier,generic-implementer}.md` — restored by vasquez (DEP-2); wording per W8 |

**Totals:** 68 agent templates + 1 README = 69 files in `agents/`, + 4 implementer prompts (worded at restoration). Matches AC-REQ-NF-003 diff set. No other file in the repo is touched by this proposal.

> **Stage rule:** no repository file modifications during proposal phase — nothing above is edited until execute-spec after approval.

## Rationale

The spec's three drift findings (`SPEC-single-dispatcher-people.md:16-20`) are directly addressed: (1) three divergent delegation shapes collapse into one W2 block + montilla W5b; (2) the Return/Route contract variants (em-dash c-level ×7, semicolon specialist ×60, omitted ×3) collapse into W1; (3) residue outside the three surfaces is swept by W6/W7/W8 and the REQ-NF-002 grep set. Each REQ carries its acceptance criterion from spec §3, and the canonical strings in spec §4 are the single source of truth — the reviewer diffs template extractions against them (REQ-NF-001: diff = 0 bytes). This delivers OKR KR-1.1 (68/68 no-delegation + formal request), KR-1.2 (0 old verbs), KR-2.1 (Cross-domain request defined in 68 templates + 4 prompts). The packets SPEC/HARD/GATE/DOMAINS ride untouched (REQ-NF-006): nothing in W1-W8 alters a packet token the plugin consumes.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Keep the informal flag mechanism (status quo) | Contradicts Desired Outcome #1/#3; no defined shape (BRIEF-single-dispatcher.md:12); open question #2 was exactly this and the spec resolves it (W2 4-field contract) |
| Keep delegation-authorizing Variant B (40 files) | Old-model residue that contradicts CEO-only dispatch ADR-003 (SPEC:18); violates Desired Outcome #1 "only montilla delegates" |
| Centralize the contract in one shared doc and reference it | Templates must stay portable standalone ("Works standalone on any harness", santana.md:12) — wording must be inline in all 68 files; a shared reference breaks REQ-NF-001 |
| Per-domain wording variants | REQ-NF-001 requires word-for-word identical (KR-1.1/1.2); per-domain wording reintroduces drift and fails the 0-byte cross-file diff |
| Rename montilla / replace the dispatcher role | HARD: no file renames (REQ-NF-003); montilla stays the negative control per CEO decision #3 — only the old verb "fan out" is dropped |
| Apply W8 to prompts created in this stage | Out of scope: restoration is vasquez's DEP-2 (SPEC §5, §6); this proposal binds wording, never creates the files (silent creation = scope expansion) |

## Approval Required From

- [ ] **Owning C-level: santana (people / agent-rules)** — mandatory; spec owner
- [ ] **vasquez (CTO)** — mechanism consistency (REQ-NF-006 packet tokens; DEP-1 ADR coupling; DEP-2 implementer-prompt restoration); must confirm engineering proposal cites spec §4 W1/W2/W3 verbatim (coupling #1)
- [ ] **barrera (CISO)** — attestation: wording-only diff introduces no secrets, tokens, credentials, or PII (REQ-NF-004, Ley 172-13 minimization)
- **Gate-stage sign-offs** (at quality-gate per REQ-NF-005 + BRIEF-single-dispatcher.md:50, not required for this proposal): dauhajre (finance set, 14), subero (legal set, 8), vera (marketing set, 9), montero (revenue set, 5), espinoza + vasquez (automation/ops — espinoza.md:114 W6), montilla (CEO — owns negative-control template + gate synthesis), vasquez (already above), barrera (security set, 6); people-reviewer runs the people gate.
- montilla (CEO) approves via dispatch of this proposal; his template's wording is part of the change set and reviewed independently at gate (never self-approves his own gate)

> **Rule:** No repository file modifications during proposal phase. No external sends/filings/launches (docs-only change).

---

# Risk Assessment: SPEC-single-dispatcher-people

**Proposer:** santana (CHRO/CPO)
**Date:** 2026-09-16
**Domains-Touched:** people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops (mechanical, wording-only)

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Mechanical edit drift — W1/W2/W3 not word-for-word identical across 68 files (REQ-NF-001 diff > 0) | Med | Med | Canonical strings live in one place (spec §4); execute one contract surface per pass; cross-file diff = 0 verified before each commit; people-reviewer grep evidence at gate (AC-REQ-NF-001) |
| R-002 | Residue missed — old wording survives (REQ-NF-002 grep > 0) | Low-Med | Med | Automated grep for all 8 target strings repo-wide before commit; exclusions only montilla.md (negative control) + tool-mapping.md (vasquez scope, KR-2.2); AC-REQ-NF-002 evidence |
| R-003 | montilla negative control broken — authority lost or "fan out" survives | Low | High | W5a exact string for :19; lines 45/49 retained as-is (only old-verb removal); grep "fan out" = 0 repo-wide; "sole dispatcher" ≥ 3 in montilla.md (AC-REQ-F-004) |
| R-004 | Implementer prompts not restored (DEP-2) — REQ-F-008 AC fails, gate blocked | Med | Med | DEP-2 tracked by vasquez; execution blocker defined (AC-REQ-F-008); escalation to montilla per DEP-5, no silent creation, no 3rd loop |
| R-005 | Coupling drift — engineering wording diverges from canonical W1/W2/W3 | Low | Med | Explicit coupling requirement (this doc, §Coupling #1); vasquez spec REQ-007 already binds verbatim citation (SPEC-single-dispatcher-engineering.md:35); cross-spec word check at gate |
| R-006 | Edit alters dispatch mechanics / packet tokens (REQ-NF-006) | Low | High | Wording-only change: W1-W8 contain no token strings (SPEC/HARD/GATE/DOMAINS untouched); attestation below; vasquez mechanism sign-off |
| R-007 | Wording diff introduces secret/credential/PII (REQ-NF-004, Ley 172-13) | Very Low | High | Wording-only by construction; full-diff static review for credential/secret/PII patterns; barrera attestation at gate |

## Blast Radius

- **Systems:** `agents/` templates are the craft layer consumed on every dispatch (skill = process, template = craft). A broken wording change alters role behavior contract globally across all 8 domains — but it is text-only, no runtime, no code, no packet tokens, no plugin state.
- **Teams (people/culture):** all 8 domain roles read their own template every session; 68 templates change. Uniform wording removes the three divergent delegation contracts that confuse cross-domain handoffs — the change plan is single-session, text-only, reversible, and verified by people-reviewer before handoff (REQ-NF-005).
- **Customers:** none — internal documentation only; no product surface.
- **Regulators:** none — no filing, no external send; Ley 172-13 minimization satisfied (no PII introduced; REQ-NF-004).
- **Revenue:** none direct — indirect upside (faster cross-domain delegation flow removes informal-flag friction, OKR KR-2.1); no pipeline/quota exposure.
- **Engineering split:** plugin `frame-ship.ts` and skills/AGENTS wording are vasquez's spec (SPEC §5 Out of Scope) — this proposal touches nothing outside `agents/` + 4 prompt wordings, so the blast radius does not overlap the engineering diff set except at the W8 boundary (coupled, §Coupling #2).

## Rollback Plan

Text-edits only, reversible per commit — the brief freezes "single session, reversible (text edits; git revert points per commit)" (BRIEF-single-dispatcher.md:55). Each commit carries one contract pass (W1 pass, W2 pass, W3/W4 pass, W5 pass, W6, W7, W8) so a revert is a clean `git revert <commit>` of a single surface. Owner: santana (people wording) with vasquez (prompts/mechanism boundary); ETA for revert: < 5 min per commit. No external sends, filings, launches, or deploys to undo. If the gate CLOSES: retry N=2 differently → escalate to montilla (never a 3rd loop, never sideways).

## Security Considerations

No auth flows, no data paths, no external APIs, no permission changes, no new assets — the templates carry no credentials and this change adds none. barrera (CISO) to attest on the full diff: 0 matches for credential/secret/token/PII patterns (REQ-NF-004 + BRIEF:56). No escalation to security review stage required beyond this attestation (wording-only; no auth/data/API touched, matching BRIEF:49).

## Domain Considerations

- **people (santana):** agent-rules wording IS the deliverable; every role's template changes → uniform contract reduces role confusion; change plan = one W-pass per commit, people-reviewer verifies at gate (REQ-NF-005).
- **engineering (vasquez):** mechanism consistency (packet tokens, REQ-NF-006); implementer-prompt restoration DEP-2; ADR filing decision DEP-1; sign-off engineering set + espinoza.md W6 (automation/ops).
- **security (barrera):** attestation wording-only, no PII/secrets (Ley 172-13); sign-off security set (6 files).
- **finance (dauhajre):** sign-off finance set (14 files — incl. removal of the delegation-authorizing Variant B bullet in accountant.md:65-equivalents).
- **legal (subero):** sign-off legal set (8 files).
- **marketing/brand (vera):** sign-off marketing set (9 files).
- **revenue (montero):** sign-off revenue set (5 files).
- **automation/ops (espinoza + vasquez):** espinoza.md:114 outbound-dispatch residue removal (REQ-F-006) + sign-off.

## Attestations (per spec ACs, recorded here for the gate)

- **REQ-NF-003 (freeze):** change set is limited to the 69 files above + 4 prompt wordings (restoration by vasquez) — no renames, no new deps, frontmatter stays `name`/`description` only.
- **REQ-NF-006 (mechanism compatibility):** no W1-W8 string contains or removes a packet token (SPEC/HARD/GATE/DOMAINS); plugin `frame-ship.ts` diff (if any) is vasquez's spec scope, not this one.
- **REQ-NF-004 (privacy):** wording-only by construction; barrera static-review attestation pending at gate.
- **GATE:** none-yet → next stage: quality-gate (people-reviewer APPROVE + 7 domain-owner sign-offs + barrera attestation).