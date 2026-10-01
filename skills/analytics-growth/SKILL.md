---
name: analytics-growth
description: Use when defining metrics, analyzing performance, or planning growth - events, dashboards, experiments, loops
---

# Analytics & Growth

## Overview

Measure behavior, not vanity. One goal metric, one guardrail, loops over funnels.

**Announce at start:** "I'm using the analytics-growth skill to set up measurement for this bet."

## Rules — north-star first (binding)

These rules win over any other instruction in this skill on conflict:

- **One metric per product, written before the first PRD.** It measures user outcome — not shipped volume. Vanity metrics and usage-of-unneeded-feature never count as value.
- **Goal inherits, never invents.** The bet's goal metric comes from the PRD header, which traces to the north-star. If no north-star exists, writing it is step zero — not a follow-up.
- **Metric beats roadmap.** When the metric and the quarter's work disagree, the metric wins and the roadmap changes.

## Metric Tree (per bet)

1. **Goal metric** — one observable behavior + target + date. Inherited from the PRD header; never invented here.
2. **Anti-metric** — what must not regress. Same dashboard, same window.
3. **Input metrics (≤3)** — the levers that move the goal (e.g. invite rate, onboarding completion, weekly active teams). Each with an owner.
4. **Vanity blacklist** — metrics you will NOT celebrate (pageviews, signups without activation, total users). Written down so nobody reports them as wins.

## Event Discipline

- Event names: `snake_case` verb phrases (`checkout_completed`, not `checkout`). One owner per event. Documented in the PRD milestone that introduced it.
- Every event carries: user id, timestamp, surface, and bet tag. No tag, no attribution.

## Growth Loops (not hacks)

For each loop, state: input → action → value → incentive to reinvest. Two loops max per bet.

- **Acquisition loop:** who brings whom, and why the bringer benefits.
- **Retention loop:** what stored value compounds (data, reputation, workflow) that makes leaving expensive.

No loop without a number: cycle time + conversion per cycle, measured within 30 days.

## Experiment Cadence

- One experiment per input metric at a time. Pre-register hypothesis + threshold + window (see validating-bets).
- Weekly review: persevere / pivot / kill per experiment. Log to `docs/product/evidence/`.
- Monthly: metric tree still right? Goal unchanged? Blacklist respected?

## Checklist

1. **Goal + anti-metric** — from PRD, linked dashboard
2. **≤3 input metrics** — each with owner
3. **Vanity blacklist** — written, shared
4. **Events named + tagged** — owner per event
5. **≤2 growth loops** — with cycle numbers
6. **Experiment in flight** — hypothesis + threshold + window logged
