# Test Matrix: SPEC-single-dispatcher-people (santana — people / agent-rules)

**Spec Reference:** SPEC-single-dispatcher-people (REQ-F-001..008, REQ-NF-001..006)
**Proposal:** PROPOSED_CHANGES-single-dispatcher.md (approved; CEO decisions #1–#3 binding)
**Agent:** santana (CHRO/CPO — people / agent-rules)
**Date:** 2026-09-16
**Execution Mode:** single (direct execution; no subagent dispatch)

## Legend

- **Test method:** grep / surface-extraction (normalized CRLF→LF, trimmed) / cross-file diff
- **Verdict:** PASS / FAIL / N/A / CANCELLED
- **Scope note:** all greps below run against `agents/` (69 files = 68 templates + README) unless stated. Repo-wide context greps exclude `docs/specs/40_workspace/*` (planning artifacts that legitimately quote old wording) and `skills/using-frame-ship/references/tool-mapping.md` (vasquez scope, KR-2.2, permitted by AC REQ-NF-002).

## Functional Requirements

| REQ | Test method | Evidence | Artifact | Verdict |
|-----|-------------|----------|----------|---------|
| REQ-F-001 — Cross-domain request contract (W2 4-field block: Need, Reason, Suggested owner, Urgency) as the Delegation section in all templates; montilla gets receiving-side W5b | grep "Cross-domain request" (agents/) | 69/69 files contain the phrase (68 templates + README W7; proposal anticipated 68 — README inclusion is correct per diff set). Delegation surface extraction: 67 × identical W2 (with all 4 fields + closure bullet), 1 × W5b (montilla), 1 × README (no Delegation section — expected) | Delegation surfaces: D:\GitHub\frame-ship\agents\**\*.md | **PASS** (AC-REQ-F-001) |
| REQ-F-002 — Route line → W1 in 67 templates; montilla:19 → W5a (drops "fan out", keeps sole-dispatch authority) | grep "Route: no delegation" = 67; "Route: no sub-delegation" = 0; "sole dispatcher" in montilla ≥ 3; "fan out" = 0 | 67 × W1 (surface extraction: 67 identical W1 + 1 × W5a, 1 × README no Route line — expected); 0 × "no sub-delegation"; montilla "sole dispatcher" = 5; "fan out" = 0 | Route surface extraction; grep counts | **PASS** (AC-REQ-F-002) |
| REQ-F-003 — Delegation section uniform W2 (eliminates c-level ×7, Variant A ×20, Variant B ×40); montilla W5b | surface extraction of `## Delegation` blocks; grep old bullets = 0 ("Do your own work." variants, "Delegate to other agents only via your harness subagent mechanism") | 67 × identical W2 block; 1 × W5b (montilla); zero hits for all 3 prior shapes and for "(need + reason + suggested owner)" phrasing | Delegation surface extraction; grep | **PASS** (AC-REQ-F-003) |
| REQ-F-004 — montilla negative control: :45/:49 retained, :19 → W5a, no old verb | grep "sole dispatcher" ≥ 3; "fan out" = 0; read :45/:49 | "sole dispatcher" = 5; "fan out" = 0; :45/:49 untouched (reviewed via read) | montilla.md | **PASS** (AC-REQ-F-004) |
| REQ-F-005 — adapter line 2 → W3 (c-level ×7 / specialist ×60); c-level stage-4 line → W4 (×7) | grep "and never dispatch" = 67; "you return your deliverable, never dispatch" = 0; stage-4 surface extraction 7 × identical | 67 × "and never dispatch" (montilla excluded by design — adapter :74 intentionally unchanged); 0 × old c-level phrasing; stage-4: 7 × identical W4 (`4. **execute-spec** (\`execute-spec\`) — the CEO dispatches …`) | Adapter surface extraction (60 × specialist + 7 × c-level + 1 × montilla untouched); stage-4 surface extraction | **PASS** (AC-REQ-F-005) |
| REQ-F-006 — espinoza.md:114 outbound-dispatch residue → W6 | grep "outbound dispatch" = 0 (agents/) | 0 hits in agents/. Only repo-wide hit is the REQ-NF-002 pattern definition itself (docs/specs/15_requirements/REQ-single-dispatcher-people.md:26 — planning artifact, expected) | espinoza.md:114 (edited → "you never dispatch from yourself"); grep | **PASS** (AC-REQ-F-006) |
| REQ-F-007 — agents/README.md:35 "flag don't grab" → W7 | grep "flag don't grab" = 0 | 0 hits repo-wide | README.md:35; grep | **PASS** (AC-REQ-F-007) |
| REQ-F-008 — implementer prompts W8 wording contract | **CANCELLED (CEO decision #3): do NOT create or edit `skills/templates/implementers/`.** Read-only existence check | Directory **absent** from working tree: Test-Path = False; glob `**/implementers/**` = 0; `git ls-files skills/templates/implementers/` = 0; `git status` = warning (cannot open dir). The 4 files vasquez recorded as untracked leftovers (TEST_MATRIX-single-dispatcher.md:17) are no longer on disk at execution time. No creation (DEP-5: silent creation = scope expansion). Keep-or-remove of any leftovers = CEO commit decision | Test-Path/glob/git-ls-files outputs | **CANCELLED** (AC-REQ-F-008 N/A — superseded) |

## Non-Functional Requirements

| REQ | Test method | Evidence | Artifact | Verdict |
|-----|-------------|----------|----------|---------|
| REQ-NF-001 — W1/W2/W3 cross-file diff = 0 bytes; montilla W5 variants compared separately | surface extraction of Route / Delegation / Adapter / stage-4 blocks per file, normalized (CRLF→LF, Trim), grouped by distinct value | Route: 1 distinct × 67 + W5a × 1 (+ 1 file without Route line = README — expected). Delegation: 1 distinct × 67 + W5b × 1 (+ README no section — expected). Adapter: 1 distinct specialist × 60 + 1 distinct c-level × 7 + 1 × montilla unchanged (+ README no adapter — expected). Stage-4: 1 distinct × 7. Zero byte-diff within each surface group. Note: repo has mixed line endings (CRLF pairs in santana.md and others) — all comparisons normalized to LF before diff; edit tool preserved original endings so no unintended EOL churn | surface-extraction script output (recorded in execution log) | **PASS** (AC-REQ-NF-001) |
| REQ-NF-002 — zero residue: 8 targets = 0 outside montilla.md (negative control) + tool-mapping.md (vasquez scope, KR-2.2) | grep each of the 8 targets in agents/ (and repo-wide with scope exclusions) | All 8 = 0 in agents/: "no sub-delegation" 0; "flag it in your return" 0; "Delegate to other agents only via your harness subagent mechanism" 0; "never called sideways" 0; "flag don't grab" 0; "routes work onward" 0; "fan out" 0; "outbound dispatch" 0. Permitted holders: montilla.md (negative control), tool-mapping.md (vasquez), planning artifacts | grep counts (agents/); tool-mapping.md = 2 hits (allowed) | **PASS** (AC-REQ-NF-002) |
| REQ-NF-003 — freeze (diff set = 68 templates + README; no renames; frontmatter name/description only) | `git status` review of changed files | Only `agents/**` templates + README edited. No renames (same file names present). Frontmatter untouched (edits were body sections only — Route, Delegation, adapter line, stage-4 line, README:35, espinoza:114, architect craft lines 232/:241) | git status; per-file diff review | **PASS** (attestation — full diff verified) |
| REQ-NF-004 — privacy (Ley 172-13): wording-only, no PII/secrets/credentials | static review of full diff for credential/secret/token/PII patterns | No such patterns in diff; text-only change, zero data paths. barrera (CISO) attestation recorded at gate | full diff | **PASS** (attestation) |
| REQ-NF-005 — gate (people-reviewer APPROVE + 7 C-level sign-offs) | — | Pending at quality-gate stage | quality-gate | **PENDING** (at gate) |
| REQ-NF-006 — mechanism compatibility: W1-W8 contain no packet tokens (SPEC/HARD/GATE/DOMAINS); plugin unaffected | static review of W1-W8 strings + no plugin edits | No packet token appears in any applied string; `frame-ship.ts` untouched (git status clean for plugin). vasquez (CTO) mechanism sign-off recorded at gate | W-string review; git status | **PASS** (attestation; sign-off at gate) |

## Gate Conditions (C-1..C-5 from vasquez + barrera reviews) — Status

| Cond | Owner | Status |
|------|-------|--------|
| C-1 adr | vasquez — ADR-003 single-dispatcher upheld (no new ADR needed; wording-only) | Met (no arch-contract change) |
| C-2 w1-w3 exact strings | vasquez — engineering proposal cites spec §4 W1/W2/W3 verbatim | Met — this execution used spec §4 canonical strings (recorded in execution log) |
| C-3 prompt dir | barrera/vasquez — implementer dir absent: no silent creation | Met — directory left absent; existence check recorded (read-only) |
| C-4 crlf | vasquez — mixed-line-ending handling must not corrupt templates | Met — edits preserved original EOLs; REQ-NF-001 comparison normalized only, no file rewrite |
| C-5 residue | barrera — 8-target zero-residue sweep | Met — see REQ-NF-002 |

## Known Gaps / Follow-ups

1. **REQ-F-008 / implementer prompts** — CANCELLED; directory absent at execution time. If CEO reopens, restoration is a separate proposal + vasquez scope (DEP-2), not an edit here.
2. **REQ-NF-005 gate** — PENDING; quality-gate stage (people-reviewer APPROVE + 7 C-level sign-offs + barrera attestation) is the next chain stage.
3. **Mixed line endings** — repo-wide CRLF/LF mix pre-exists; not normalized in this change (out of scope, would churn the diff); flagged for vasquez awareness (C-4).
4. **README counted in AC-REQ-F-001** (69 vs proposal's 68) — README legitimately carries "Cross-domain request" via W7; no action needed, noted for gate.