---
name: verification-before-launch
description: Use when about to claim a bet is shipped, launched, or passing, before announcing or merging - requires running acceptance checks and confirming output
---

# Verification Before Launch

## Overview

Evidence before assertions. Always. Never claim a milestone shipped, a metric hit target, or a launch is ready without pasting the check output that proves it.

**Announce at start:** "I'm using verification-before-launch to verify this bet."

## The Gate

Before ANY success claim, run and paste:

1. **Acceptance re-run** — each milestone's Given/When/Then, re-checked against live surfaces. Quote the PRD line, then the live proof (link, screenshot ref, query output).
2. **Success metric** — the header metric query over the committed window. Paste numbers vs target.
3. **Anti-metric** — the guardrail query. Paste numbers proving nothing regressed.
4. **Broken-promise scan** — open the brief + PRD; every "we promise / users can / within X" gets a live check. List any gap as a blocker, not a footnote.

## Rules

- **No claim without output.** "It works" without pasted evidence is a draft, not a report.
- **One blocker = stop.** A failed check blocks the launch claim. Fix, re-verify, then claim.
- **Stale evidence doesn't count.** Checks older than the last change to that surface must be re-run.

## Checklist

- [ ] All milestone acceptance checks re-run against live, outputs pasted
- [ ] Success metric query run, result vs target stated
- [ ] Anti-metric query run, no regression stated
- [ ] Every brief/PRD promise checked live, gaps listed as blockers
- [ ] Only then: claim shipped / launched / passed
