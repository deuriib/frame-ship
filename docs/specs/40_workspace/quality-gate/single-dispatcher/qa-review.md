# QA Review: SPEC-single-dispatcher-engineering + SPEC-single-dispatcher-people

**Reviewer:** qa (runs the real suite — verification, not static read-through)
**Date:** 2026-09-16
**Verdict:** **PASS (APPROVE)**
**Execution Mode:** multi-subagents (frozen at frame-intent; HARD packet)
**Packet:** SPEC:<vasquez|santana paths>#REQ-001..006+NF / HARD:multi-subagents, v0.3.3, REQ-007/REQ-F-008 CANCELLED / GATE:none-yet → this verdict / DOMAINS:[engineering, people + all 8 template sets]

## Checklist

- [x] All acceptance criteria have tests — 11/11 engineering REQ-IDs + 13/13 people REQ-IDs evidenced (matrices), re-verified by real greps below
- [x] All REQ-IDs traceable to evidence IDs — TEST_MATRIX-single-dispatcher.md (vasquez) + TEST_MATRIX-single-dispatcher.md (santana) cross-referenced; spot-verified against spec AC lists
- [x] Unit + integration + e2e coverage as appropriate — docs/config-only change; evidence = review/attestation/scan/tsc per spec §5 (non-code); N/A for code coverage
- [x] Regression suite updated — N/A (no code); regression = old-model residue greps = 0 (below)
- [x] No flaky tests introduced — N/A (no test code)
- [x] Coverage threshold met — evidence coverage 100% of active REQs (REQ-007/REQ-F-008 CANCELLED by CEO decision #3, existence-check recorded)
- [x] Manual exploratory testing done — real commands executed by reviewer against working tree (outputs below)

## Real Checks Executed (reviewer-ran, not matrix-trusted)

### 1. Typecheck — PASS
Command (from `.opencode/`): `npx -y -p typescript tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts`
Actual output: `TS_EXIT=0` (run 3x, incl. bare invocation; zero diagnostics). Plugin remains single-file zero-dep (`import type` only, `frame-ship.ts:8`).
Evidence: real exit code 0 → AC-001/AC-002 tsc gates met; REQ-001/REQ-002.

### 2. Version consistency — PASS
Actual grep (`.opencode/`): `rg -n "v0\.3\.[0-9]+" plugins/frame-ship.ts plugins/AGENTS.md`:
- `frame-ship.ts:2` header → `frame-ship v0.3.3`
- `frame-ship.ts:10` `const VERSION = "0.3.3"`
- `frame-ship.ts:11` `MARKER = \`[frame-ship v${VERSION}]\`` → derived `[frame-ship v0.3.3]`
- `.opencode/plugins/AGENTS.md:4` → `frame-ship.ts\` v0.3.3`
4/4 locations identical = **v0.3.3**, matching HARD packet. → REQ-002, C-3.
Finding F-1: TEST_MATRIX-single-dispatcher.md:11 (E-002) + :31 (C-3) record v0.3.1 — stale matrix text vs actual v0.3.3; the requirement passes on current state; update matrix at closing commit.

### 3. Canonical sentence — PASS
Pattern: `CEO dispatches entire team; c-levels/specialists do the work or brief back` (exact, fixed-string):
- `agents/` = **67 files** (non-montilla templates; montilla is the negative control with W5a/W5b variant — expected)
- `skills/` = **7 files**: using-frame-ship/SKILL.md, translate-to-spec/SKILL.md, propose-changes/SKILL.md, execute-spec/SKILL.md, tool-mapping.md, bootstrap-checklist.md, skills/AGENTS.md (6 REQ-003-named + skills/AGENTS.md)
- 3 AGENTS.md: root `AGENTS.md`, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` — all present
- people spec W2: `SPEC-single-dispatcher-people.md:76` (verbatim)
- plugin: `frame-ship.ts:19` (WORKFLOW_CARD: "CEO dispatches entire team; c-levels/specialists do the work or brief back"); `:34` MONTILLA_OWNERSHIP variant "sole dispatcher to the entire team — c-levels/specialists do the work or brief back" (per REQ-001's own wording contract) → REQ-001/003/005, C-1, AC-005.

### 4. Old-model residue — PASS
- AC-003 verbs regex `never dispatches|never fan out|NEVER fans out|no C-level fan-out|C-levels return deliverables and never dispatch` in `skills/ .opencode/ AGENTS.md/` = **1 hit total**: `tool-mapping.md:8` — the CEO-only dispatch rule mechanism line (explicitly exempt per ADR-003 §Decision.6 + REQ-NF-002). 0 elsewhere.
- HARD residue set `flag it in your return|suggested owner|fan out|route onward|never called sideways|flag don't grab` (case-sensitive) in `agents/ + skills/ + .opencode/` = **0 hits** (rg exit 1).
- Case-insensitive reinforcement `fan[- ]out|never called sideways|flag don't grab|route onward|flag it in your return` = **0 hits** (rg exit 1).
→ REQ-NF-002, AC-009, AC-REQ-NF-002. Cleaner than the allowed distribution (montilla receiver clause + tool-mapping mechanism line were permitted to hold residue; they hold none for these patterns).

### 5. Implementer prompts out — PASS (CANCELLED consistent)
- `Test-Path skills/templates/implementers` = **False**; glob `implementers/**` = 0 files; `skills/templates/` = **absent entirely**.
- `git status --short` shows **no** `?? skills/templates/` untracked entry — no leftovers on disk.
- `rg -in "implementer" tool-mapping.md skills/AGENTS.md ADR-003 *.md BRIEF/OKR` = **only** `ADR-003-ceo-only-dispatch.md:45,47` (the CEO decision #3 cancellation note). BRIEF + OKR: 0 hits.
→ REQ-007/REQ-F-008 CANCELLED as declared; AC-007/AC-REQ-F-008 N/A by CEO decision #3.
Finding F-2 (INFO): vasquez TEST_MATRIX E-008 recorded 4 untracked prompt files on disk; santana REQ-F-008 recorded dir absent at its execution time. Current state resolves to **absent** — cancellation contract holds; keep-or-restore remains CEO commit decision.

### 6. Frontmatter — PASS (full set, not sample)
Script over all **69** changed `agents/` files (68 templates + README, README exempt — no frontmatter): every frontmatter block contains only `name:`/`description:` keys → `FRONTMATTER_OK`, 0 extra keys. → REQ-NF-003 (people), loader contract per skills/AGENTS.md.

### 7. No PII/secrets — PASS
Scan over the full changed-file set (98 files incl. untracked new docs; patterns `sk-|api_key|password|token=|credential|private key|AKIA|JWT|bearer|BEGIN PRIVATE KEY`):
- All content hits = **policy/prohibition language** ("no secrets, tokens, credentials...", guardrails `frame-ship.ts:25`, threat-model guidance e.g. `review-risk.md:49`, `security.md:41,59`), or prior-cycle evidence docs quoting the scan itself.
- Known false positive confirmed: `risk-analyst.md:2` `name: risk-analyst` ("sk-" substring in a legitimate filename) — explicitly excluded per HARD; not a finding.
- **0 real credentials/tokens/PII** → REQ-NF-001/004, AC-008, barrera C-2/C-5 satisfied at engineering-layer scan.

## Traceability (active REQs, spot-verified)

| REQ-ID | Test ID | Type | Status |
|--------|---------|------|--------|
| REQ-001 | E-001 | Review + tsc | pass |
| REQ-002 | E-002 | grep 4 locations | pass (F-1 stale text only) |
| REQ-003 | E-003/E-004 | grep counts + file list | pass |
| REQ-004 | E-005 | read-through | pass |
| REQ-005 | E-006 | grep 3/3 | pass |
| REQ-006 | E-007 | ADR-003 read | pass |
| REQ-007 | E-008 | glob/existence | cancelled (CEO #3) |
| REQ-NF-001 | E-009 | scan | pass (0 real) |
| REQ-NF-002 | E-010 | residue grep | pass (1 allowed hit) |
| REQ-NF-003 | E-011 | rollback table (plan §Rollback Points) | pass |
| REQ-NF-004 | E-012 | tsc exit 0 | pass |
| REQ-F-001..007 | — | people matrix + independent greps | pass |
| REQ-F-008 | — | Test-Path/glob | cancelled (CEO #3) |
| REQ-NF-001..006 | — | extraction/diff/scan | pass (+ REQ-NF-005 gate pending here) |

## Coverage

- Line/branch coverage: N/A — docs/config-only change (all REQs evidenced by review/attestation/scan/tsc)
- Acceptance criteria coverage: engineering 9/10 active (AC-007 N/A-cancelled); people all active ACs pass

## Findings

| ID | Severity | Finding | Evidence |
|----|----------|---------|----------|
| F-1 | Low | TEST_MATRIX-single-dispatcher.md E-002/C-3 record version v0.3.1; actual 4-location version is v0.3.3. Requirement passes on current state; matrix evidence text stale. | `TEST_MATRIX-single-dispatcher.md:11,31` vs `frame-ship.ts:2,10,11` + `plugins/AGENTS.md:4` |
| F-2 | Info | Vasquez vs santana matrices contradict on implementers-dir existence at execution time; current tree resolves to absent (no leftovers) — cancellation contract holds. | `TEST_MATRIX-single-dispatcher.md:17` vs `TEST_MATRIX-single-dispatcher.md:26`; `Test-Path` = False; `git status --short` |
| F-3 | Info | Pre-existing mixed EOLs (git CRLF warnings on all 69 agents files) — out of scope, edits preserved original endings (C-4); flagged for awareness, not a regression. | `git diff --name-only HEAD -- agents` + working-copy warnings |

No Medium/High/Critical findings. No residual conditions.

## Verdict Rationale

Every real check executed by the reviewer against the working tree passes: tsc exit 0, version 4/4 = v0.3.3 (HARD-aligned), canonical sentence present in all four layers (67 templates + 7 skills files + 3 AGENTS.md + plugin + people spec W2), old-model residue = 0 (1 allowed mechanism line in tool-mapping.md), implementer prompts cancelled-and-absent with zero leftovers, all 69 changed template frontmatters clean (name/description only), and a full changed-set secret/PII scan showing policy language only. The two matrices' only visible friction is a stale version reference (F-1) and an execution-time existence contradiction already resolved by the current tree (F-2) — neither affects the acceptance criteria on the shipped state. Gate readiness: **APPROVE** — no ❌, no ⚠️.