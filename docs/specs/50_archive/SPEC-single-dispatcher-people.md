# Spec: Single Dispatcher — Agent-Rules Contract (people)

**ID:** SPEC-single-dispatcher-people
**Owner:** santana (CHRO/CPO — people domain; agent-rules contract)
**Domains-Touched:** [people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops] — all 8 template sets touched mechanically (wording-only)
**Brief Reference:** BRIEF-single-dispatcher (approved 2026-09-15) + OKR-single-dispatcher
**Status:** draft
**Priority:** P0 (blocks the uniform-wording outcome; open question #2 owned by santana)
**Execution_Mode:** multi-subagents (inherited from brief; not overridden)

## 1. Context

The delegation contract is ambiguous at the edges. ADR-003 (CEO-only dispatch) exists in workspace artifacts but the ADR file is absent from `docs/specs/10_design/` (BRIEF-single-dispatcher.md:12). Per the brief, only montilla delegates, montilla dispatches to the **entire team** (C-levels AND specialists), and cross-domain needs return as a **formal brief to the CEO** (BRIEF-single-dispatcher.md:18-21). The mechanism today is an informal flag ("need + reason + suggested owner") with no defined shape (BRIEF-single-dispatcher.md:12; the shape is open question #2, owned by santana, BRIEF-single-dispatcher.md:62).

Research across `agents/` (68 templates) found **three drift problems**:

1. **The delegation contract has three divergent shapes.** C-levels (7) carry "Do your own work; never delegate. Cross-domain needs are flagged to montilla (CEO) in your return — never called sideways." (e.g. agents/c-level/santana.md:61, vasquez.md:68). Specialist Variant A (20 files: engineering 13 + security 6 + shared 1) carries "Do your own work." (agents/engineering/backend.md:114, agents/security/security-reviewer.md:57, agents/shared/writer.md:63). Specialist **Variant B (40 files: finance 14 + legal 8 + marketing 9 + revenue 5 + people 4) still authorizes harness delegation**: "Do your own work. **Delegate to other agents only via your harness subagent mechanism**..." (agents/finance/accountant.md:65, agents/people/friction-mediator.md:62, agents/marketing/copywriter.md:65, agents/legal/compliance-officer.md:65, agents/revenue/deal-closer.md:62). Variant B is old-model residue that contradicts Desired Outcome #1.
2. **The Return/Route contract is inconsistent.** Capabilities Route line has two variants — em-dash c-level (7, e.g. santana.md:19) and semicolon specialist (60, e.g. accountant.md:17) — and the shared/writer + security variants simply omit the cross-domain clause entirely (writer.md:17 "Route: no sub-delegation; do the work yourself end to end."). The c-level adapter says "you return your deliverable, never dispatch" (santana.md:32,67; vasquez.md:32,74) while specialist adapters say only "you run inside task(general)" (backend.md:120) with no dispatch prohibition.
3. **Residue beyond the three surfaces.** `agents/README.md:35` documents the convention as "flag don't grab"; `agents/engineering/espinoza.md:114` keeps "Inbound and outbound dispatch references"; `mountilla` aside, `agents/engineering/review-risk.md:33` still says "the orchestrator dispatches `security`". The 4 implementer prompts required by REQ-005/ADR-003 (skills/templates/implementers/, 4 files per TEST_MATRIX-ceo-only-dispatch.md:17) are **absent from the repo** (glob: zero files; skills/AGENTS.md:24 still claims the exception location exists); the prior IMPLEMENTATION_PLAN-ceo-only-dispatch.md:38 deleted them post-commit, so the brief-back wording must apply to their **restored** content (KR-2.1 counts them: 68 templates + 4 prompts).

Vasquez (engineering) owns plugin/skills/AGENTS/ADR mechanics in parallel (BRIEF-single-dispatcher.md:48); this spec owns the **agent-rules contract wording** — Route line, Delegation section, adapter closing lines, espinoza adapter-adjacent residue, README convention line, and implementer-prompt wording consistency. No template file is modified at this stage (that is execute-spec after an approved PROPOSED_CHANGES.md).

## 2. Requirements

### Functional

- REQ-F-001: Define the Cross-domain request contract exactly: 4 fields (Need, Reason, Suggested owner, Urgency), returned inside the agent's return to montilla (CEO), identical wording in all 68 templates (montilla: receiving-side variant). [people]
- REQ-F-002: Replace the Capabilities Route line in all 68 templates: 67 non-montilla templates get the uniform no-delegation + brief-back wording (Contract W1); montilla.md:19 is reworded to keep sole-dispatch authority without the old verb "fan out" (Contract W5a). [people, all 8 sets]
- REQ-F-003: Rewrite the Delegation section in all 68 templates with the uniform brief-back block (Contract W2 for 60 specialists + 7 c-levels; Contract W5b for montilla). This eliminates all three current variants — c-level "never delegate" form (7), Variant A (20), and delegation-authorizing Variant B (40). [people, all 8 sets]
- REQ-F-004: Keep montilla.md as the negative control — the ONLY template that dispatches. Its sole-dispatcher authority (montilla.md:19,45,49,68) is retained; its self-directed "flag it in your return" line (montilla.md:69) becomes the receiving-side Cross-domain request clause (Contract W5b bullet 2). [people]
- REQ-F-005: Extend the Frame-Ship adapter line 2 in all 68 templates and the c-level SDD stage-4 line (7 files) with the brief-back clause "you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch" (Contracts W3/W4). [people, all 8 sets]
- REQ-F-006: Remove the outbound-dispatch residue in agents/engineering/espinoza.md:114 (Contract W6). [people, engineering set wording]
- REQ-F-007: Update the convention documentation in agents/README.md:35 from "flag don't grab" to the CEO-only dispatch + Cross-domain request contract (Contract W7). [people]
- REQ-F-008: Implementer prompts (4, `skills/templates/implementers/`) carry the same brief-back wording in their no-subagents line, replacing "You do not dispatch subagents." (Contract W8). Location/content restoration is vasquez's engineering scope (DEP-2); this REQ binds their wording once restored. [people + engineering]

### Non-Functional

- REQ-NF-001 (Consistency): The three contract surfaces read word-for-word identical across all 68 templates (diff-verifiable against Contracts W1/W2/W3). [people]
- REQ-NF-002 (Zero residue, KR-1.1 + KR-1.2): Old contract wording = 0 hits repo-wide outside montilla's negative control wording and `skills/using-frame-ship/references/tool-mapping.md` (vasquez scope, KR-2.2): grep targets — "no sub-delegation", "flag it in your return", "Delegate to other agents only via your harness subagent mechanism", "never called sideways", "flag don't grab", "routes work onward", "fan out", "outbound dispatch". [people + engineering]
- REQ-NF-003 (Freeze compliance, HARD): No file renames; no frontmatter key changes (name/description only) in any of the 68 templates; no new deps. [people, all 8 sets]
- REQ-NF-004 (Privacy, Ley 172-13): Wording-only change — no PII, secrets, tokens, or credentials introduced into any template (constraint BRIEF-single-dispatcher.md:56). Static review evidence. [people]
- REQ-NF-005 (Gate): Uniform wording verified by `people-reviewer` across all 8 domain template sets before handoff; owning C-levels sign off their template sets at the gate (BRIEF-single-dispatcher.md:50). [people + all C-levels]
- REQ-NF-006 (Mechanism compatibility): Template wording changes must not alter dispatch mechanics or packet constants (SPEC/HARD/GATE/DOMAINS) consumed by plugin `frame-ship.ts`; attestation that no edit renames or removes a packet token. [people + engineering]

## 3. Acceptance Criteria

- [ ] AC-REQ-F-001: `grep -r "Cross-domain request" agents/ --include=*.md -l | wc -l` = 68; each of the 4 fields (Need, Reason, Suggested owner, Urgency) present in the canonical block (review evidence: diff extract).
- [ ] AC-REQ-F-002: `grep -r "Route: no sub-delegation" agents/` = 0 matches; `grep -r "Route: no delegation" agents/` = 67 matches; montilla.md Route line contains "sole dispatcher" and not "fan out".
- [ ] AC-REQ-F-003: `grep -r "flag it in your return" agents/` = 0 matches; `grep -r "Delegate to other agents only via your harness subagent mechanism" agents/` = 0 matches; `grep -r "never called sideways" agents/` = 0 matches (all three variants replaced); canonical bullet 2 present in 68/68 files.
- [ ] AC-REQ-F-004: `grep -c "sole dispatcher" agents/c-level/montilla.md` ≥ 3 (lines 19/45/49 reframed); `grep -r "fan out" agents/` = 0 matches; montilla.md:45 and :49 unchanged except old-verb removal; montilla.md contains a receiving-side "Cross-domain requests arrive as formal briefs" clause.
- [ ] AC-REQ-F-005: `grep -r "you return your deliverable, never dispatch" agents/` = 0 matches; `grep -rl "and never dispatch" agents/ --include="*.md" | wc -l` = 67 (montilla excluded — the dispatcher must NOT say "never dispatch"); c-level stage-4 line updated in 7/7 (grep stage-4 clause at santana.md:32-equivalent lines).
- [ ] AC-REQ-F-006: `grep -r "outbound dispatch" agents/` = 0 matches.
- [ ] AC-REQ-F-007: `grep -r "flag don't grab" .` = 0 matches (repo-wide); agents/README.md:35 documents CEO-only dispatch + Cross-domain request fields.
- [ ] AC-REQ-F-008: `skills/templates/implementers/*.md` = 4 files (after vasquez restoration, DEP-2) and each contains "Cross-domain request" (grep 4/4) and "You do not dispatch subagents" (grep 4/4). Execution blocker if prompts not restored — escalate to montilla.
- [ ] AC-REQ-NF-001: Extract Contracts W1/W2/W3 from every template; `diff` across the 68 extractions = 0 bytes (montilla variants W5a/W5b compared separately).
- [ ] AC-REQ-NF-002: `grep -rn "no sub-delegation\|flag it in your return\|Delegate to other agents only via your harness subagent mechanism\|never called sideways\|flag don't grab\|routes work onward\|fan out\|outbound dispatch" .` = 0 hits outside `agents/c-level/montilla.md` (negative control) and `skills/using-frame-ship/references/tool-mapping.md` (vasquez scope; its "fans out" phrasing is KR-2.2's target).
- [ ] AC-REQ-NF-003: `git diff --name-only` for the agents/ change set = 68 templates + agents/README.md (+ 4 implementer prompts via vasquez); frontmatter of every touched template still `name`/`description` only (grep frontmatter block, 0 extra keys).
- [ ] AC-REQ-NF-004: Static review of the full diff: 0 matches for credential/secret/PII patterns; attestation recorded by security lens (barrera sign-off at gate per BRIEF-single-dispatcher.md:49).
- [ ] AC-REQ-NF-005: GATE_REPORT for this unit shows people-reviewer APPROVE with the grep evidence above; dauhajre, subero, vera, montero, espinoza, barrera, vasquez sign off their template sets (BRIEF-single-dispatcher.md:50).
- [ ] AC-REQ-NF-006: Attestation in PROPOSED_CHANGES.md that packet tokens SPEC/HARD/GATE/DOMAINS are untouched; plugin `frame-ship.ts` diff (if any) is vasquez's spec scope, not this one.

## 4. Contracts & Interfaces

The canonical uniform wording (exact strings; the Cross-domain request contract — open question #2 resolution).

### W1 — Capabilities Route line (67 non-montilla templates; replaces both current variants at Capabilities `Route:`)

```text
- Route: no delegation — do the work yourself end to end; cross-domain need → formal Cross-domain request to montilla (CEO) in your return, never sideways.
```

### W2 — Delegation section, uniform brief-back block (60 specialists + 7 c-levels = 67 templates; replaces the three current section shapes)

```text
## Delegation — Cross-domain request (brief back to montilla, CEO)
- **CEO dispatches entire team; c-levels/specialists do the work or brief back.** Do your own work end to end; never delegate. Only montilla (CEO) dispatches.
- If the work needs another domain/specialist, return a formal Cross-domain request to montilla (CEO) in your return:
  - Need: what must be done
  - Reason: why it needs another domain/specialist
  - Suggested owner: the owning C-level or specialist (8-domain catalogue)
  - Urgency: P0 | P1 | P2
- Montilla delegates it to the right agent — or resolves it. Never sideways, never self-dispatch.
- Never approve your own proposal or gate your own work; an independent review is required.
```

Return contract: the Cross-domain request lives **inside the return**, alongside the existing deliverable + file list + risks + assumptions + scoped evidence (template Working agreement, e.g. santana.md:23). It is a section of the return, not a new file.

### W3 — Frame-Ship adapter line 2 (68 templates)

- C-level (replaces `...you return your deliverable, never dispatch.`):
  `... you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch.`
- Specialist (appends to `Single mode = direct execution; multi = you run inside task(general) with packet SPEC/HARD/GATE/DOMAINS.`):
  `; you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch.`

### W4 — c-level SDD stage-4 line (7 files; replaces `you return your deliverable, never dispatch. No dispatch without an approved proposal.`)

```text
you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch. No dispatch without an approved proposal.
```

### W5 — montilla (negative control — the ONLY template that dispatches)

- W5a Route line (montilla.md:19; keeps sole-dispatch authority, drops "fan out"):
  `- Route: sole dispatcher — you delegate to any agent (C-level or specialist) via your harness subagent mechanism per your routing table; synthesize on return.`
- W5b Delegation section (montilla.md:67-70; bullet 1 keeps dispatch authority, bullet 2 becomes the receiving side):

```text
## Delegation — sole dispatcher (receives Cross-domain requests)
- You are the sole dispatcher (CEO-only dispatch, ADR-003): you delegate to any agent — C-level or specialist — via your harness subagent mechanism, max 2 parallel; never sideways.
- Cross-domain requests arrive as formal briefs inside agent returns (Need + Reason + Suggested owner + Urgency); delegate to the right agent per the 8-domain catalogue — or resolve — and tell the requester.
- Never approve your own proposal or gate your own work; an independent review is required.
```

montilla.md:45 and :49 (sole-dispatcher statements) are retained unchanged; montilla.docx adapter (montilla.md:74) is unchanged (it is the dispatcher, no brief-back to itself).

### W6 — espinoza.md:114 (removes outbound-dispatch residue)

```text
Routing lives with your harness; inside frame-ship only montilla (CEO) dispatches — never outbound dispatch from you; see the adapter below (inputs by reference, never HOW).
```

### W7 — agents/README.md:35 (convention doc)

```text
5. `Delegation` (plain-language contract: only montilla dispatches; every other role does the work end to end and briefs back cross-domain needs as a formal Cross-domain request — Need + Reason + Suggested owner + Urgency).
```

### W8 — Implementer prompts (4, content-restored; replaces `You do not dispatch subagents.`)

```text
You do not dispatch subagents — do the work end to end; if the work needs another domain/specialist, return a formal Cross-domain request to montilla (CEO): Need + Reason + Suggested owner + Urgency.
```

## 5. Out of Scope

- Plugin `frame-ship.ts`, all `skills/*/SKILL.md` + references wording (incl. `tool-mapping.md`, `bootstrap-checklist.md`), three AGENTS.md files, and ADR filing in `docs/specs/10_design/` → vasquez engineering spec (BRIEF-single-dispatcher.md:29-33).
- Restoring/creating the `skills/templates/implementers/` directory → vasquez (DEP-2); this spec only binds the wording of the restored prompts (REQ-F-008).
- Craft-body functional routing lines (e.g. review-risk.md:33 "orchestrator dispatches security", vasquez.md Classify table) — routed to vasquez as a finding; the 8-domain catalogue, stage order, and skill frontmatter loader contract are untouched (BRIEF-single-dispatcher.md:37).
- File renames, frontmatter key changes, credential/permission changes, prod deploys, plugin deps (BRIEF-single-dispatcher.md:38-40).
- Executing any template edit — that is execute-spec after PROPOSED_CHANGES.md approval.

## 6. Dependencies

- DEP-1: vasquez engineering spec — ADR filing decision (complete ADR-003 vs ADR-004, BRIEF-single-dispatcher.md:61), plugin/skills/AGENTS wording, tool-mapping brief-back flow (KR-2.2).
- DEP-2: vasquez engineering spec — restoration of `skills/templates/implementers/` (4 prompts; IMPLEMENTATION_PLAN-ceo-only-dispatch.md:14,38 deleted them; skills/AGENTS.md:24 still references the location). REQ-F-008 AC fails as an execution blocker if not restored before execute-spec.
- DEP-3: Gate sign-offs — dauhajre, subero, vera, montero, espinoza (+ barrera security attestation, vasquez) for their template sets (BRIEF-single-dispatcher.md:50); people-reviewer runs the people gate.
- DEP-4: TEST_MATRIX-ceo-only-dispatch.md (docs/specs/40_workspace/vasquez/) — prior ADR-003 evidence; ADR-003's own file missing from 10_design is unresolved (montilla + vasquez).
- DEP-5: montilla decision — implementer-prompt wording if the 4 prompts are not restored in time (escalation path, no 3rd loop).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-F-001 | AC-REQ-F-001 | PROPOSED_CHANGES.md, §Contracts W2 | review (68-file grep) |
| REQ-F-002 | AC-REQ-F-002 | PROPOSED_CHANGES.md, W1/W5a | review (grep 0 + 67) |
| REQ-F-003 | AC-REQ-F-003 | PROPOSED_CHANGES.md, W2 | review (grep 0) |
| REQ-F-004 | AC-REQ-F-004 | PROPOSED_CHANGES.md, W5 | review (grep montilla) |
| REQ-F-005 | AC-REQ-F-005 | PROPOSED_CHANGES.md, W3/W4 | review (grep 0 + 67) |
| REQ-F-006 | AC-REQ-F-006 | PROPOSED_CHANGES.md, W6 | review (grep 0) |
| REQ-F-007 | AC-REQ-F-007 | PROPOSED_CHANGES.md, W7 | review (grep 0 repo-wide) |
| REQ-F-008 | AC-REQ-F-008 | PROPOSED_CHANGES.md, W8 | review (grep 4/4, post DEP-2) |
| REQ-NF-001 | AC-REQ-NF-001 | PROPOSED_CHANGES.md | review (cross-file diff = 0) |
| REQ-NF-002 | AC-REQ-NF-002 | PROPOSED_CHANGES.md | review (grep 0 outside exclusions) |
| REQ-NF-003 | AC-REQ-NF-003 | PROPOSED_CHANGES.md | attestation (git diff + frontmatter) |
| REQ-NF-004 | AC-REQ-NF-004 | PROPOSED_CHANGES.md | attestation (barrera sign-off) |
| REQ-NF-005 | AC-REQ-NF-005 | GATE_REPORT | sign-off (7 C-level owners) |
| REQ-NF-006 | AC-REQ-NF-006 | PROPOSED_CHANGES.md | attestation (packet tokens intact) |
