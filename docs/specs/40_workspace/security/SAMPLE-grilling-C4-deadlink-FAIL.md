# Sample: C4 dead-link FAIL demo (evidence substance backstop)

**Agent:** barrera (CISO) — security lane
**Date:** 2026-09-18
**Purpose:** prove link presence ≠ link substance at C4 (COND-K2/Q4/SEC2-shared)
**Skill:** `skills/execute-spec/SKILL.md` via `frame-ship:execute-spec`
**Rule:** `skills/verify-handoff/references/dod-checklist.md` Common (link present AND resolves AND relevant; dead/irrelevant = FAIL with recorded reviewer-judgment reason; no handoff)
**PII:** zero PII/secrets/tokens/credentials/sessions in this fixture (allowlisted evidence only; Ley 172-13 minimization)

## Fixture: 3 REQ→evidence links

| REQ-ID | Link | Present | Resolves | Relevant | Verdict |
|--------|------|---------|----------|----------|---------|
| REQ-SEC-001 | `docs/specs/40_workspace/security/SAMPLE-grilling-C3-thin-FAIL.md` | yes | yes | yes (3-waiver record vs three-block bar) | **PASS** |
| REQ-SEC-005 | `docs/specs/40_workspace/security/evidence-that-does-not-exist.md` | yes (string present) | no (dead link — target absent from tree) | n/a | **FAIL** (reviewer-judgment reason recorded below) |
| REQ-SEC-004 | `docs/specs/40_workspace/engineering/SAMPLE-grilling-C1.md` cited for a C4 checkpoint claim it does not contain | yes | yes | no (resolves to the wrong artifact — happy-path C1 round, not a checkpoint table) | **FAIL** (reviewer-judgment reason recorded below) |

**Residual-risk:** hollow-link HANDOFF routes on attested-not-proven evidence (owner: barrera); contained by this FAIL rule — no handoff until links resolve AND are relevant.

## Reviewer-judgment reasons (recorded, never silent)

- REQ-SEC-005 FAIL: link string present satisfies presence; resolution check fails (target absent). Dead link = FAIL, no handoff.
- REQ-SEC-004 FAIL: link resolves but proves nothing about the claim (irrelevant artifact). Irrelevant link = FAIL, no handoff.
- REQ-SEC-001 PASS: link present, resolves, and directly evidences the claim.

## What this proves

1. Presence-only C4 would pass all three rows on string-presence alone — the substance rule (present AND resolves AND relevant) FAILs two of three loudly.
2. Attestation-alone stays FAIL; missing link stays FAIL; dead/irrelevant joins them with a recorded reason.
3. No freelance fix (report severity + location + evidence; owner remediates); findings return to `frame-ship:execute-spec` instead of re-litigating settled gate verdicts.
