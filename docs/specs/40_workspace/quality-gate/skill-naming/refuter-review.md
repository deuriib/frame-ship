# Refuter Review: SPEC-skill-naming-engineering

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Verdict:** pass ("could not falsify")
**Skill:** `skills/quality-gate/SKILL.md` (§3 min gate for `single`) — loaded and cited
**Checklist ref:** `skills/quality-gate/references/engineering/refuter-review.md`
**Domains-touched:** [engineering]
**Packet:** SPEC: `docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md`#REQ-001..005 (+ REQ-NF-001..003) / HARD: single, docs-only, reference-only packets, no PII, revertible / GATE: engineering-owner-APPROVED-2026-09-16 incoming / DOMAINS: [engineering]

## Mission

Attempt to **falsify** the execution. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | An unmapped bare `skill(` cite survives outside D-01..D-15 | `rg -n "skill\(" skills/` → 15 hits, diffed line-by-line against disposition table | Confirmed (15/15 mapped, 0 unmapped) |
| RF-002 | A bare navigation cite survives (third form reintroduced) | `rg -n "frame-ship:" skills/` → 43 hits reviewed as navigation lines; scanned SKILL.md Previous/Next/route lines for bare stage names | Confirmed (100% canonical or carved out, 0 bare navigation) |
| RF-003 | Scope leaked beyond cite prose (frontmatter/paths/runtime touched) | `git status --short` (clean) + `git diff --stat HEAD` (empty) + frontmatter spot-checks (`name:` bare kebab intact) | Confirmed (zero-change holds; S-05 record-only honored) |
| RF-004 | PII/secret smuggled into spec, proposal, or evidence | Pattern scan over spec + proposal for `secret\|token\|credential\|session\|password\|api[_-]?key\|ssn\|passport` | Confirmed (0 findings — only the scan-description lines match) |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None | — | — |

## Verdict Rationale

- pass = attempted falsification, no counterexamples found
- Four attacks, zero counterexamples. The KEEP-bare disposition (which a naive reader could mistake for incompleteness) is the spec-correct outcome per C-3 tool-namespace rationale. Pass.
