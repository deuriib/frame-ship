# People Review: SPEC-single-dispatcher-people

**Reviewer:** people-reviewer (people gate; template: `agents/people/people-reviewer.md`)
**Date:** 2026-09-16
**Verdict:** **APPROVE**

## Load Evidence (HARD STOP checks)

- [x] Stage skill loaded: `skill(quality-gate)` — name `quality-gate`, trigger "run quality gate"/"gate SPEC-XXX" (SKILL.md:3)
- [x] Agent template read: `agents/people/people-reviewer.md` (craft contract; read before review)
- [x] Output shape read: `skills/quality-gate/references/gate-report.md`
- [x] Domain checklist read: `skills/quality-gate/references/domains/people-review.md`
- [x] Execution mode declared: multi-subagents (frozen at frame-intent; SPEC-single-dispatcher-people.md:9); reviewer works directly, never dispatches (people-reviewer.md:17,56-64)
- [x] Packet intact by reference: SPEC / HARD / GATE / DOMAINS — all read as files, no pastes

## Checklist (people lens)

- [x] Team impact assessed — 68 agent templates = every role's behavioral contract; wording-only, single-session, reversible (IMPLEMENTATION_PLAN-single-dispatcher.md:34-36)
- [x] Skills gap identified — none: no new capability required; 4-field Cross-domain request is a return-section format, not a new skill (SPEC §4 W2, RETURN CONTRACT note)
- [x] Workload implications reviewed — uniform wording removes the three divergent delegation contracts (SPEC:17); implementer prompts out of scope (HARD: REQ-F-008 CANCELLED)
- [x] Culture/values alignment — "brief back to CEO, never sideways" formalizes the cross-domain path; creed-compatible, no hierarchy change (montilla remains sole dispatcher)
- [x] Hiring/training needs flagged — none (wording-only, no role changes)
- [x] Change management plan — one W-pass per commit, `git revert` per surface < 5 min (IMPLEMENTATION_PLAN-single-dispatcher.md:15-30,40); gate is the checkpoint

## Findings

| ID | Severity | Finding | Evidence | Status |
|----|----------|---------|----------|--------|
| PPL-001 | Info | `architect.md:231` contains the phrase "No sub-delegation" in its craft-body Hard Rules ("No sub-delegation to `explore`, `scout`, or any other agent"). It is **not** the old Route-line contract string (`Route: no sub-delegation; do the work yourself end to end.`) and does not authorize delegation — it restates the no-delegation principle. Craft-body functional routing lines are out of scope per SPEC §5 ("Craft-body functional routing lines (e.g. ...) — routed to vasquez as a finding"). Not a residue violation. | agents/engineering/architect.md:231; SPEC-single-dispatcher-people.md:138 | Noted — no action |
| PPL-002 | Info | REQ-NF-002/exhale report uses the exact W1/W2/W3 strings; TEST_MATRIX claims 8 targets = 0 in agents/, which holds for **all old contract strings**. The one non-contract substring hit (architect.md:231, PPL-001) is excluded by SPEC §5 scope. Substring-clean vs contract-clean distinction documented here for the gate. | TEST_MATRIX-single-dispatcher.md:33 vs agents/engineering/architect.md:231; SPEC §5:138 | Noted — no action |
| PPL-003 | Info | `espinoza.md:114` W6 applied; line 113 still says "before a refactor dispatch, recall past lessons" — mechanism-description language, not outbound-dispatch authority. No violation. | agents/engineering/espinoza.md:113-114; SPEC §4 W6 | Noted — no action |
| PPL-004 | Info | REQ-F-008 CANCELLED by CEO decision #3; `skills/templates/implementers/` verified absent (Test-Path False; glob 0; `git ls-files` 0). No silent creation. Per HARD, absence is NOT flagged as a defect; word-bound contract W8 stays bound for the engineering track's restoration (DEP-2). | TEST_MATRIX-single-dispatcher.md:26; IMPLEMENTATION_PLAN-single-dispatcher.md:30 | Noted — no action |

## Verdict Rationale

All REQ-F-001..007 and REQ-NF-001..006 acceptance criteria verified with independent grep/extraction evidence (below). REQ-F-008 is CANCELLED per CEO decision #3 (HARD packet) — its absence is not a defect at this gate; W8 wording is bound for vasquez's DEP-2 restoration. montilla.md holds as the negative control: sole dispatcher, zero "fan out", receiving-side W5b present, adapter untouched. No old contract wording survives in `agents/` outside montilla's receiver clause. Wording-only change: no PII/secrets/credentials introduced (static scan of pattern hits shows policy language only — review-risk.md:49, security.md:41,61-62). No findings block the gate.

## Evidence (independent verification, 2026-09-16)

### REQ-F-001 (Cross-domain request contract)
- `grep -r "Cross-domain request" agents/ -l` = 69 files (68 templates + README W7 — README hits are the documented W7 convention, so 68/68 templates carry it) — AC-REQ-F-001 met
- 4 fields present 67/67 non-montilla templates: `Need: what must be done` (67), `Reason: why it needs another domain/specialist` (67), `Suggested owner: the owning C-level or specialist` (67), `Urgency: P0 | P1 | P2` (67)
- Delegation headers: `## Delegation — Cross-domain request (brief back to montilla, CEO)` ×67, `## Delegation — sole dispatcher (receives Cross-domain requests)` ×1 (montilla)

### REQ-F-002 (Route line)
- W1 exact string (`- Route: no delegation — do the work yourself…never sideways.`) = **67** (byte-checked: em-dash ×1 at canonical position, e.g. agents/finance/accountant.md:17)
- `Route: no sub-delegation` = **0**; old semicolon variant = **0**
- montilla:19 = W5a exact (`- Route: sole dispatcher — you delegate to any agent (C-level or specialist) via your harness subagent mechanism per your routing table; synthesize on return.`) — em-dash ×2 as canonical; 3 ASCII hyphens as canonical; `fan out` absent

### REQ-F-003 (Delegation section)
- Old shapes: c-level "Do your own work; never delegate" = 0; Variant A/B "Delegate to other agents only via your harness subagent mechanism" = 0; "never called sideways" = 0; "flag it in your return" = 0
- Closure bullet "Montilla delegates it to the right agent" ×67; self-approval prohibition ×68 (67 templates + montilla)

### REQ-F-004 (montilla negative control)
- `sole dispatcher` in montilla.md = **5** (≥3 required) — lines 45, 49, 69 and W5a:19 carry it; W5b bullet 1 restates it
- Lines 45/49 retained (sole-dispatcher statements, no old verb); :19 → W5a; :67-70 → W5b; adapter :74 untouched (dispatcher, no brief-back); receiving-side clause present at :69 ("Cross-domain requests arrive as formal briefs inside agent returns (Need + Reason + Suggested owner + Urgency)")

### REQ-F-005 (Adapter + stage-4)
- `and never dispatch` = 74 = 60 specialist adapter lines + 7 c-level adapter lines + 7 c-level stage-4 lines — AC expected 67 **files**; confirmed 67 files (60 + 7), montilla excluded 0
- Old `you return your deliverable, never dispatch` = 0
- W3 variants: specialist `you run inside task(general)…; you return your deliverable — plus a Cross-domain request…and never dispatch.` ×60; c-level `multi = the CEO dispatches you inside task(general)…` ×7 — uniform per group
- W4 stage-4: 7/7 c-level files byte-identical (`4. **execute-spec** (execute-spec) — the CEO dispatches the specialist…never dispatch. No dispatch without an approved proposal.`)

### REQ-F-006 / REQ-F-007
- `outbound dispatch` in agents/ = **0** (espinoza.md:114 → W6 wording confirmed)
- `flag don't grab` repo-wide = **0** outside planning artifacts (13 hits all in docs/specs + BRIEF/OKR planning files, which quote old wording as targets — matcher's documented exclusion)
- README.md:35 W7 byte-compared to SPEC W7: 223 chars, case-sensitive exact match TRUE

### REQ-NF-001 (Consistency)
- **W2 block extraction**: all 67 non-montilla templates → SHA256 `321BB9A69BE5187FD0C2ED0D6DE213628CDDE3A1675FEFAD649FA51195D7D15D` — byte-identical, diff = 0
- Em-dash census: W2 blocks 2× em-dash each in 67/67; montilla W5b 5× em-dash (matches spec W5b surface); W1 1× em-dash ×67; W3/W4 clauses em-dash counts match spec canon (santana adapter em=2; stage-4 em=3)
- No byte-diff within any surface group: Route, Delegation, Adapter, Stage-4 — all uniform (normalized CRLF→LF for comparison only; edit preserved original EOLs)

### REQ-NF-002 (Zero residue — 8 grep targets in agents/)
- `no sub-delegation` in **contract surfaces** = 0 (architect.md:231 is craft-body, out of spec §5 scope — see PPL-001); `flag it in your return` = 0; `Delegate to other agents only via your harness subagent mechanism` = 0; `never called sideways` = 0; `flag don't grab` = 0; `routes work onward` = 0; `fan out` = 0; `outbound dispatch` = 0
- Permitted holders only: montilla.md (receiver clause), tool-mapping.md (vasquez scope, KR-2.2 — 2 hits as documented mechanism)

### REQ-NF-003 (Freeze)
- `git status`: 69 modified files in agents/ (68 templates + README) — **zero renames** (no `R` status), zero deletes, zero adds outside expected
- Frontmatter: all 68 templates `name` + `description` only (key audit: 0 extra keys); `name` matches basename 68/68; README has no frontmatter (documentation file, expected)

### REQ-NF-004 (Privacy, Ley 172-13)
- Static scan of all template pattern hits: `password` ×1 (policy example `passwordHash` in review-risk.md:49), `Authorization` ×3 (policy guidance text security.md:41,61-62), 40+ char base64 ×1 (Spanish prose false-positive espinoza.md:99) — **no credentials, tokens, secrets, or PII** in any template; wording-only change by construction

### REQ-NF-006 (Mechanism compatibility)
- Packet tokens intact: `SPEC/HARD/GATE/DOMAINS` present verbatim in adapter lines of all 68 templates; no W1-W8 string adds/removes a packet token; `frame-ship.ts` not touched by this change set

## Conditions for Opening

None — no conditions required for this review.

## Escalation

None required. Informational notes (PPL-001..004) carried; PPL-001 routed per SPEC §5 to vasquez's scope awareness (craft-body routing lines).

## Sign-off (people reviewer)

- [x] All checklist items verified
- [x] Verdict: **APPROVE** — no ❌, no ⚠️ findings
- Gate Keeper to consolidate: santana (people/agent-rules) via GATE_REPORT; remains OPEN for remaining domain sign-offs (finance, legal, marketing, revenue, automation/ops, security attestation, engineering) per REQ-NF-005