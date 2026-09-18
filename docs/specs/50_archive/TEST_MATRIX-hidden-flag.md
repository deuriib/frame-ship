# TEST_MATRIX — hidden flag (single)

**SPEC:** SPEC-hidden-flag-engineering | **Proposal:** PROPOSED_CHANGES-hidden-flag.md | **Review:** ARCHITECTURE_REVIEW-hidden-flag.md (APPROVED, ADR waived)

| REQ | Test / Evidence | Result |
|-----|-----------------|--------|
| REQ-001 interface `hidden?: boolean` | Read `frame-ship.ts:242-247` shows `hidden?: boolean;`; `mise run typecheck` EXIT 0 | PASS |
| REQ-002 8× `hidden:true` C-level all | `rg "hidden: true"` → 8 entry lines (260-267) + 1 comment line (255); `montilla` line has no hidden (grep exit 1) | PASS |
| REQ-003 subagents untouched | `rg 'mode: "subagent".*hidden'` → 0 matches (exit 1) | PASS |
| REQ-004 mirror propagates hidden | Read `frame-ship.ts:344-345` Record types gain `hidden?: boolean`; lines 376-377 conditional spread `...(entry.hidden !== undefined ? { hidden: entry.hidden } : {})` on BOTH mirrors; absent-hidden → `{ description, prompt, mode }` identical | PASS |
| REQ-NF-001 backward-compat/single-file | `mise run typecheck` EXIT 0; `git diff --stat` touches only `frame-ship.ts` + `ARCHITECTURE.md`; no new imports/deps; `default_agent`/`subagent_depth` unchanged | PASS |
| REQ-NF-002 no secrets/PII | `rg -i "secret\|token\|credential\|session.*key\|BEGIN.*PRIVATE" .opencode/plugins/frame-ship.ts` → 0 code findings (only guardrail words "session/credential" in pre-existing comment strings, no values); diff adds no literals beyond `hidden:true` | PASS |

**Artifacts:** `.opencode/plugins/frame-ship.ts` (interface + 8 entries + mirror), `docs/specs/10_design/ARCHITECTURE.md` (INV-004 overlay), SPEC + PROPOSED_CHANGES + ARCHITECTURE_REVIEW + IMPLEMENTATION_PLAN + this matrix.
**Verdict trace:** REQ-001..004 + NF-001/002 → tests above → artifacts → gate input OPEN (min gate for single: readability + risk + refuter + qa).
