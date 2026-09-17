# Refuter Review: SPEC-brainstorm-frame-intent-engineering

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Verdict:** pass ("could not falsify")

## Mission

Attempt to **falsify** the implementation. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | Old 3-question flow survives beside new steps | Grep `What problem? Who is affected?` in `skills/frame-intent/SKILL.md` | Confirmed (0 hits — fully replaced) |
| RF-002 | Sideways path leaked in (writing-plans / superpowers / visual-companion) | Grep `writing-plans\|superpowers\|visual-companion` in touched files | Confirmed (0 hits outside Won't-do exclusion, which names them only to forbid) |
| RF-003 | Frontmatter convention broken (extra keys) | Read SKILL.md:1-4 | Confirmed intact (`name` + `description` only) |
| RF-004 | Creed leaked into template | Grep creed line in `references/product-brief.md` | Confirmed (0 hits — creed in SKILL only) |
| RF-005 | Scope leaked beyond approved targets | `git status` scoped to `skills/frame-intent/` | Confirmed (SKILL.md + product-brief.md only; okr-template untouched) |
| RF-006 | Downgrade path exists mid-initiative | Read ratchet rule | Confirmed upgrade-only, nothing downgrades |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None | — | — |

## Verdict Rationale

- pass = attempted falsification, no counterexamples found
- Six attacks, zero counterexamples. Pass.
