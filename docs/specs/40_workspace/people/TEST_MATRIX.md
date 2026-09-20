# Test Matrix: Multi-Default Wording — People Lane (execute-spec)

**Spec:** `docs/specs/40_workspace/people/SPEC-multi-default-people.md#REQ-F-001..007+REQ-NF-001..006` | **Owner:** santana (people owner) | **Date:** 2026-09-20
**Mode:** multi-subagents, docs-only; evidence = greps + extraction diffs + `git diff --name-only` (no code tests apply) — skill `frame-ship:execute-spec`
**Proposal:** `docs/specs/40_workspace/people/PROPOSED_CHANGES.md` §Diff plan 1–5 + §Trace

| REQ | Check (AC) | Method | Result |
|-----|-----------|--------|--------|
| REQ-F-001 | AC-REQ-F-001: `using-frame-ship/SKILL.md` §3 multi-only, W-MULTI + W-SEQ verbatim | `grep -n "single" skills/using-frame-ship/SKILL.md` | PASS — 0 matches (verified 2026-09-20) |
| REQ-F-002 | AC-REQ-F-002: bootstrap-checklist W-MULTI + W-SEQ pointer, no mode-choice line | `grep -n "single.*direct.*no task" skills/using-frame-ship/references/bootstrap-checklist.md` | PASS — 0 matches |
| REQ-F-003 | AC-REQ-F-003: frame-intent §3 paso 3 freezes multi-only, no mode question | `grep -n "Ask execution mode once" skills/frame-intent/SKILL.md` | PASS — 0 matches; paso 3 contains "no mode question" + W-INTENT-STEP3 verbatim |
| REQ-F-004 | AC-REQ-F-004: product-brief `Execution_Mode` = W-BRIEF-MODE | `grep -n "single \| multi" skills/frame-intent/references/product-brief.md` | PASS — 0 matches; L7 = W-BRIEF-MODE verbatim |
| REQ-F-005 | AC-REQ-F-005: W-MULTI byte-identical across 4 people surfaces | extract + `diff` (evidence: canonical check §Verification Log) | PASS — extraction diff = 0 (modulo `Execution declared:` line prefix in checklist; substring verbatim) |
| REQ-F-006 | AC-REQ-F-006: W-SEQ byte-identical in using-frame-ship §3 + bootstrap-checklist | extract + `diff` | PASS — diff = 0; both contain "same thread" + "same packet/reviewers/gate" + "No min-gate" |
| REQ-F-007 | AC-REQ-F-007: people-review checklist + rationale carry W-PPL-GATE | read-through `people-review.md` | PASS — 3 inserts verbatim + rationale evidence line present, hygiene 6 items intact |
| REQ-NF-001 | AC-REQ-NF-001: zero live `single` mode mentions | `grep -rn "\bsingle\b"` 5 paths | CONDITIONAL — 0 mode-branch hits; 4 non-mode hits flagged for gate waiver (see §NF-001 exception list) |
| REQ-NF-002 | AC-REQ-NF-002: W-MULTI/W-SEQ cross-diff = 0 | extraction diff | PASS — diff = 0 (see log) |
| REQ-NF-003 | AC-REQ-NF-003: history intact | `git diff --name-only` vs `50_archive/`, `docs/briefs/BRIEF-*.md` | PASS — neither listed (people lane stages only its 5 surfaces + lane evidence) |
| REQ-NF-004 | AC-REQ-NF-004: 0 credential/secret/PII patterns in diff | static diff review | PASS — wording-only; attestation for barrera at gate |
| REQ-NF-005 | AC-REQ-NF-005: skill-surface diff = exactly the 5 approved files | `git diff --name-only` (skill paths) | PASS — 5/5 match §Changes; no `*.ts`, no `package.json`, no frontmatter edits |
| REQ-NF-006 | AC-REQ-NF-006: full trace 13/13, no gaps | this table row-count | PASS — 13/13 rows present |

## NF-001 exception list (gate waiver request — NOT fixed in-lane, scope guard)

Naive `\bsingle\b` hits remaining after execution (all non-mode, out of approved change list — rewording them would exceed proposal scope):

1. `skills/frame-intent/SKILL.md:54` — "single source for C1+C2" (C1 glossary idiom, pre-existing, untouched §C1).
2. `skills/frame-intent/SKILL.md:64` — "single source §4" (same idiom, pre-existing).
3. `skills/quality-gate/references/domains/people-review.md:17` — "single-process wording" (W-PPL-GATE canonical verbatim line 3 — approved string itself).
4. `skills/quality-gate/references/domains/people-review.md:29` — "single-residue grep" (rationale meta-evidence line from approved diff plan §5).

Request: gate narrows NF-001 to mode-branch semantics (`single` as chain branch: backticks/`single:` bullet/`single | multi`/`single AND multi`/`single SPEC cycle`/`single (direct…` patterns — all 0) and waives the 4 idiom/meta hits; OR directs a proposal amendment. Lane recommendation: narrow-pattern waiver (no reword of canonicals, no C1 touch).

## Verification Log (filled at execute, confirmed at gate)

- `grep -n "single" skills/using-frame-ship/SKILL.md` → 0 matches (2026-09-20).
- `grep -n "single.*direct.*no task" skills/using-frame-ship/references/bootstrap-checklist.md` → 0 matches.
- `grep -n "Ask execution mode once" skills/frame-intent/SKILL.md` → 0 matches.
- `grep -n "single | multi" skills/frame-intent/references/product-brief.md` → 0 matches.
- W-MULTI extraction (`grep -h "Execution is multi-subagents only" SKILL §3 + bootstrap-checklist`) → shared substring byte-identical (checklist carries `Execution declared:` line prefix only).
- W-SEQ extraction (`grep -h "Sequential degradation, same contract" SKILL §3 + bootstrap-checklist`) → byte-identical both places.
- Canonical check (1 required): `grep -c "Sequential degradation, same contract" skills/using-frame-ship/SKILL.md` → 1.
- `git diff --name-only` skill surfaces (people lane): exactly the 5 files — `skills/using-frame-ship/SKILL.md`, `skills/using-frame-ship/references/bootstrap-checklist.md`, `skills/frame-intent/SKILL.md`, `skills/frame-intent/references/product-brief.md`, `skills/quality-gate/references/domains/people-review.md`. (Working tree also shows parallel vasquez-lane + pre-existing proposal modifications — never staged/committed here.)
- Masking attestation: 0 PII/secrets/tokens in diff and greps (Ley 172-13).

## Prior Verdicts Indexed (not re-executed)

Consolidation 2026-09-18 matrix verdicts (REQ-001..004 + NF-001/002 PASS, 7/7 hash-match moves) remain audit trail in `50_archive/`; this matrix supersedes lane state for SPEC-multi-default-people only.
