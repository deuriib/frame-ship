# Implementation Plan: santana (CHRO/CPO — people / agent-rules)

**Spec Reference:** SPEC-single-dispatcher-people (REQ-F-001..008, REQ-NF-001..006)
**Proposal Reference:** PROPOSED_CHANGES-single-dispatcher.md (approved)
**Agent:** santana (people domain chain owner)
**Date:** 2026-09-16
**Execution Mode:** single (skill + template, direct execution — no subagent dispatch)
**Domains-Touched:** all 8 template sets (wording-only, mechanical)
**Packet:** SPEC: `docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md#REQ-F-001..REQ-NF-006` / HARD: uniform wording across 68 templates; no renames; frontmatter `name`/`description` only / GATE: ARCHITECTURE_REVIEW (vasquez) APPROVE + SECURITY_REVIEW (barrera) APPROVE — conditions C-1..C-5 tracked / DOMAINS: people, engineering, security, finance, legal, marketing/brand, revenue, automation/ops

## Scope

Word-for-word wording change across the 68 agent templates in `agents/` + `agents/README.md` (69 files total), per approved contracts W1–W8. Wording-only: no renames, no frontmatter changes, no code, no packet-token edits. **REQ-F-008 CANCELLED (CEO decision #3): nothing created or edited under `skills/templates/implementers/`.**

## Steps (applied sequentially — each pass is one reversible unit)

| # | Step | Files | Rollback Point | Evidence |
|---|------|-------|----------------|----------|
| 1 | **W1 pass — Route line.** 67 non-montilla templates: `Route: no sub-delegation; do the work yourself end to end.` → W1 `- Route: no delegation — do the work yourself end to end; cross-domain need → formal Cross-domain request to montilla (CEO) in your return, never sideways.` | 67 templates (all but montilla) | git revert (single surface) | grep: 67 × "Route: no delegation"; 0 × "no sub-delegation" |
| 2 | **W5a pass — montilla Route :19.** → `- Route: sole dispatcher — you delegate to any agent (C-level or specialist) via your harness subagent mechanism per your routing table; synthesize on return.` ("fan out" dropped, authority kept) | montilla.md:19 | git revert | grep: "sole dispatcher" ≥ 3 in montilla.md (5); "fan out" = 0 |
| 3 | **W2 pass — Delegation section.** Three divergent shapes (c-level ×7, Variant A ×20, Variant B ×40) → uniform W2 block `## Delegation — Cross-domain request (brief back to montilla, CEO)` + 4-field request (Need/Reason/Suggested owner/Urgency: P0|P1|P2) + closure bullet. Editorial variant: espinoza.md:114 trailing residue fixed with bullet added (1st pass applied W2 without closure bullet — caught by consistency diff, re-applied). | 67 non-montilla templates | git revert (single surface) | surface extraction: 67 × identical W2; 1 × montilla W5b |
| 4 | **W5b pass — montilla Delegation.** → `## Delegation — sole dispatcher (receives Cross-domain requests)` + receiving-side bullets. | montilla.md:67-70 | git revert | surface extraction: 1 × W5b |
| 5 | **W3 pass — adapter line 2.** C-level variant (7 files): append `; you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch.` Specialists (60): same append on the task(general) clause. montilla adapter :74 **intentionally unchanged** (dispatcher; no brief-back to itself). | 67 non-montilla templates | git revert | surface extraction: 60 × specialist variant, 7 × c-level variant, 1 × montilla untouched |
| 6 | **W4 pass — c-level stage-4 line (7 files).** → `4. **execute-spec** (\`execute-spec\`) — the CEO dispatches the specialist with a reference-only packet + hard constraints; you return your deliverable — plus a Cross-domain request to montilla (CEO) if another domain/specialist is needed — and never dispatch. No dispatch without an approved proposal.` | 7 c-level files | git revert | surface extraction: 7 × identical W4 |
| 7 | **W6 pass — espinoza.md residue.** :114 outbound-dispatch residue → `Routing lives with your harness; inside frame-ship only montilla (CEO) dispatches — you never dispatch from yourself; see the adapter below (inputs by reference, never HOW).` | espinoza.md | git revert | grep: "outbound dispatch" = 0 (agents/) |
| 8 | **W7 pass — agents/README.md:35.** "flag don't grab" → CEO-only dispatch + Cross-domain request fields. | agents/README.md:35 | git revert | grep: "flag don't grab" = 0 |
| 9 | **Craft-body sweep — architect.md:232/:241.** "flag it in your return" residue in Architecture Contract + Domain Weave → "return a Cross-domain request" phrasing (CEO-approved scope inclusion). | architect.md | git revert | grep: "flag it in your return" = 0 |
| 10 | **Verification (this plan).** Full AC grep suite + surface-consistency extraction (REQ-NF-001) + zero-residue sweep (REQ-NF-002). | — | — | See TEST_MATRIX |

**REQ-F-008 (W8):** CANCELLED by CEO decision #3 — no steps against `skills/templates/implementers/`. Verified read-only: directory **absent** from current working tree (Test-Path False; glob `**/implementers/**` = 0; `git ls-files` = 0; the 4 files recorded as untracked in vasquez TEST_MATRIX are no longer on disk). No creation (silent creation = scope expansion per DEP-5). Keep-or-remove of any leftovers remains a CEO commit decision.

## Credo / Guardrails Applied

- One contract surface per pass — each pass independently revertible, matching the brief's "single session, reversible (text edits)" freeze.
- No freelance fixes: no key rotation, no prod patch, no permission widening (N/A — text-only).
- No sugarcoating: REQ-F-008 cancelled state surfaced in this plan + TEST_MATRIX verdict line (CANCELLED), not silently dropped.

## Rollback Plan

Text-edits only. Each pass (steps 1–9) is a clean `git revert <commit>` of a single surface per the commit convention. ETA < 5 min per revert. No external sends/filings/launches/deploys to undo. If a gate CLOSES at quality-gate: retry N=2 differently → escalate to montilla (never a 3rd loop, never sideways).