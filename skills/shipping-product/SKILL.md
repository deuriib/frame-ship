---
name: shipping-product
description: Use when executing a validated PRD milestone-by-milestone in this session - ship slices, measure, commit, retro
---

# Shipping Product

## Overview

Execute a PRD milestone-by-milestone in this session. One milestone at a time: confirm acceptance, ship the smallest slice that satisfies it, measure the behavior, publish. No parallel milestones — sequencing is the review.

**Announce at start:** "I'm using the shipping-product skill to ship this PRD."

**Context:** The PRD (from writing-prds) travels with you. Read it plus the brief before touching anything.

## Rules

1. **One milestone at a time.** Finish milestone N (shipped + measured + published) before starting N+1. Dependencies in the PRD are load-bearing.
2. **Acceptance first.** Restate the milestone's Given/When/Then before acting. If it's ambiguous, stop and clarify with your human partner — don't reinterpret silently.
3. **Smallest shippable slice.** Ship the minimum surface that can produce the acceptance behavior. Cut scope; never cut measurement.
4. **Measure or it didn't ship.** Every milestone ends with the PRD's measure step run and pasted. No metric, no done.
5. **Publish every milestone.** Commit docs + changelog entry per milestone. A milestone that isn't published blocks the next one.

## Loop (per milestone)

- [ ] **Confirm** — quote the milestone's acceptance check; verify dependencies from earlier milestones are live
- [ ] **Ship** — smallest slice: copy, surface, offer, or experiment per the PRD ship step
- [ ] **Measure** — run the PRD's query/probe; paste result vs target
- [ ] **Publish** — commit with `feat(product): <milestone outcome> (+metric result)`
- [ ] **Gate** — acceptance met? Next milestone. Missed? Stop, report, propose pivot/kill — don't bulldoze into N+1

## Mid-flight Changes

- **PRD ambiguity found mid-milestone:** stop, propose the smallest clarifying edit to the PRD, get approval, then continue. Don't freelance.
- **Metric missed:** do NOT proceed to the next milestone. Report: expected vs actual, likely cause (segment? message? surface?), and recommend PIVOT (new hypothesis → validating-bets), RETRY (one scoped fix), or KILL.
- **New idea mid-ship:** log it in the PRD's "Parking lot" section, keep shipping. New ideas don't expand the current milestone.

## Completion

When all milestones are shipped + measured + published:

1. **Report the bet:** goal vs success metric vs anti-metric, per-milestone results (one line each).
2. **Retro (5 lines):** what validated, what surprised, what we'd cut next time, metric to watch for 30 days, owner of that watch.
3. **Hand off:** launches needing distribution → go-to-market; pricing questions → pricing-packaging; metric ownership → analytics-growth.
4. **Invoke verification-before-launch** before claiming the bet is done.
