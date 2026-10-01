---
name: validating-bets
description: Use when validating any product bet before committing build or launch resources - hypothesis, cheapest probe, kill/pivot/persevere decision
---

# Validating Bets

## Overview

Never build on an untested belief. Every milestone gets its riskiest assumption probed with the cheapest evidence that can kill it — before any build commitment.

**Announce at start:** "I'm using the validating-bets skill to validate this bet."

**The loop:** Hypothesis → Probe → Evidence → Decision. No step skipped. No "we're confident, let's just build."

## The Loop

### 1. Hypothesis (one sentence, falsifiable)

Format: "We believe [user segment] will [behavior] because [struggle], and we'll know we're wrong if [metric] is below [threshold] by [date]."

- One assumption per hypothesis. The riskiest first: desirability → viability → feasibility → usability.
- Threshold set BEFORE probing. Moving the goalpost after seeing data is the cardinal sin.

### 2. Probe (cheapest evidence that can kill it)

Pick the cheapest probe that could prove you wrong, in this order:

1. **Data cut** (hours) — cohort query, funnel slice, session replays. Kills "users do X" claims.
2. **Interview slice** (1 afternoon) — 5 target users, one job, one struggle. Kills desirability fantasies.
3. **Concierge / Wizard-of-Oz** (1-3 days) — deliver manually what you'd automate. Kills willingness-to-pay doubts.
4. **Fake-door / landing test** (3-5 days) — offer it, measure clicks + emails, then tell the truth. Kills demand uncertainty.
5. **Priced pilot** (1-2 weeks) — one paying customer on a promise + refund. Kills viability questions.

Never build the real thing to validate demand for the real thing.

### 3. Evidence (write it down)

Log every probe to `docs/product/evidence/YYYY-MM-DD-<bet>-<probe>.md`:

```markdown
# [Bet] — [Probe type + date]

**Hypothesis:** [one sentence]
**Kill threshold:** [metric + number + date]
**Probe:** [what you did, n=]
**Result:** [numbers, quotes (verbatim, attributed by segment not name)]
**Decision:** KILL / PIVOT / PERSEVERE + one-line why
```

Commit it. Evidence that isn't written down didn't happen.

### 4. Decision

- **PERSEVERE** — threshold met. Next riskiest assumption enters the loop.
- **PIVOT** — signal in adjacent segment, message, or price. State the new hypothesis; re-enter the loop.
- **KILL** — threshold missed with no adjacent signal. Write the one-paragraph postmortem in the evidence file. Killing in days is the win — say so.

## Red Flags

| Thought | Reality |
|---------|---------|
| "We're confident, let's build" | Confidence is not evidence. Run the probe. |
| "5 users is too few to matter" | 5 users kill bad ideas weekly. Zero users kill nothing. |
| "The landing page converts, so they'll pay" | Clicks ≠ payment. Priced pilot or it didn't happen. |
| "Let's lower the threshold, we learned a lot" | Learning is not validation. Hold the line or name a new hypothesis. |
| "Kill feels like failure" | A kill in 3 days saves a quarter. Celebrate it. |

## Checklist

1. **State hypothesis** — falsifiable, one assumption, threshold + date
2. **Pick cheapest killing probe** — lowest on the ladder that can falsify
3. **Run it** — timebox: data (hours), interviews (afternoon), concierge (days), fake-door (days), pilot (weeks)
4. **Log evidence** — file + commit, numbers + verbatim quotes
5. **Decide KILL / PIVOT / PERSEVERE** — one line why; next loop or postmortem
6. **Hand off** — persevered bets go to shipping-product; killed bets stay dead unless a new hypothesis re-opens them
