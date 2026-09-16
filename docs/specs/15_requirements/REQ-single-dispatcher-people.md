# Requirements Index: Single Dispatcher — CEO-only Delegation Contract (people / agent-rules)

**Owner:** santana (CHRO/CPO)
**Brief Reference:** BRIEF-single-dispatcher (approved 2026-09-15) + OKR-single-dispatcher
**Domains-Touched:** [people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops] — all 8 template sets touched mechanically (wording-only)
**Spec:** docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-F-001 | Cross-domain request contract defined: 4 fields (Need, Reason, Suggested owner, Urgency), returned inside the agent's return to montilla (CEO), identical wording in 68/68 templates (montilla receiving-side variant) | P0 | BRIEF-single-dispatcher.md:20,62; OKR KR-2.1 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-002 | Capabilities Route line replaced in 68/68 templates: uniform no-delegation + brief-back wording (W1); montilla.md:19 reworded to keep sole-dispatch authority without "fan out" (W5a) | P0 | BRIEF-single-dispatcher.md:28; OKR KR-1.1, KR-1.2 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-003 | Delegation section rewritten in 68/68 templates with uniform brief-back block (W2 for 67; W5b for montilla), eliminating all 3 current variants (c-level ×7, Variant A ×20, delegation-authorizing Variant B ×40) | P0 | BRIEF-single-dispatcher.md:28; OKR KR-1.1 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-004 | montilla.md kept as negative control — the ONLY template that dispatches; sole-dispatcher authority retained (montilla.md:19,45,49,68); line 69 becomes receiving-side Cross-domain request clause | P0 | BRIEF-single-dispatcher.md:19,21 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-005 | Frame-Ship adapter line 2 (68 templates) + c-level SDD stage-4 line (7) carry the brief-back clause "…plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch" (W3/W4) | P0 | BRIEF-single-dispatcher.md:20; OKR KR-1.1 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-006 | Outbound-dispatch residue in agents/engineering/espinoza.md:114 removed (W6) | P1 | BRIEF-single-dispatcher.md:28 | SPEC-single-dispatcher-people | people + engineering set wording | review (grep) |
| REQ-F-007 | Convention doc agents/README.md:35 updated from "flag don't grab" to CEO-only dispatch + Cross-domain request contract (W7) | P1 | BRIEF-single-dispatcher.md:28; OKR KR-1.2 | SPEC-single-dispatcher-people | people (agent-rules) | review (grep) |
| REQ-F-008 | 4 implementer prompts (skills/templates/implementers/, restored per DEP-2) carry brief-back wording in their no-subagents line (W8) | P0 | OKR KR-2.1; BRIEF-single-dispatcher.md:32 | SPEC-single-dispatcher-people | people + engineering | review (grep 4/4) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Three contract surfaces read word-for-word identical across 68/68 templates (W1/W2/W3 diff = 0) | Consistency | cross-file diff 0 bytes; excludes montilla W5 variants |
| REQ-NF-002 | Old contract wording = 0 hits repo-wide outside montilla negative control + tool-mapping.md (vasquez scope): "no sub-delegation", "flag it in your return", "Delegate to other agents only via your harness subagent mechanism", "never called sideways", "flag don't grab", "routes work onward", "fan out", "outbound dispatch" | Zero residue | grep 0 (KR-1.1: old flag wording = 0; KR-1.2: old verbs = 0) |
| REQ-NF-003 | No file renames; frontmatter `name`/`description` only; no new deps; diff set = 68 templates + README (+ 4 prompts via vasquez) | Freeze (HARD) | git diff --name-only + frontmatter grep |
| REQ-NF-004 | Wording-only change: no PII, secrets, tokens, or credentials introduced (Ley 172-13 minimization) | Privacy | static review attestation (barrera) |
| REQ-NF-005 | Uniform wording verified by people-reviewer across all 8 domain template sets; 7 C-level owners sign off their sets at gate | Gate | GATE_REPORT people APPROVE + 7 sign-offs |
| REQ-NF-006 | Template wording changes do not alter dispatch mechanics or packet constants (SPEC/HARD/GATE/DOMAINS) | Compatibility | attestation in PROPOSED_CHANGES.md |

## Domain Controls (touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | agent-rules wording is the deliverable; uniform wording verified by people-reviewer before handoff | santana |
| engineering | implementer-prompt location restoration (DEP-2); plugin/skills/AGENTS/ADR mechanics; sign-off engineering template set | vasquez |
| security | attestation that wording-only diff introduces no secrets/PII (Ley 172-13); sign-off security template set | barrera |
| finance | sign-off finance template set (14 files, incl. Variant B delegation-authorizing bullet removal) | dauhajre |
| legal | sign-off legal template set (8 files) | subero |
| marketing | sign-off marketing template set (9 files) | vera |
| revenue | sign-off revenue template set (5 files) | montero |
| automation/ops | sign-off automation/ops set (espinoza.md in engineering/, incl. REQ-F-006 residue) | espinoza + vasquez |