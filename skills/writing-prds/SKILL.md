---
name: writing-prds
description: Use when you have a validated brief or requirements for a multi-step product bet, before building or launching anything
---

# Writing PRDs

## Overview

Write PRDs for a product team that has not seen this repo or this brief. Assume they make reasonable choices wherever the PRD leaves one open. What they cannot know is what you decided: who the user is, what job they hire us for, what success looks like in observable behavior, what is explicitly out of scope, and which evidence proves each requirement. Document those. Give them the whole bet as bite-sized milestones. Ruthless scope cuts. No vanity metrics. Testable acceptance.

**Announce at start:** "I'm using the writing-prds skill to create the PRD."

**Save PRDs to:** `docs/product/prds/YYYY-MM-DD-<bet-name>.md`
- (User preferences for PRD location override this default)

## Scope Check

If the brief covers multiple independent bets, it should have been broken into sub-briefs during product-discovery. If it wasn't, suggest breaking this into separate PRDs — one per bet. Each PRD should describe shippable, measurable value on its own.

## PRD Structure

Before defining milestones, map out what ships and what explicitly does not. This is where scope decisions get locked in.

- Design bets with clear boundaries. Each milestone should have one clear user-visible outcome.
- Prefer smaller, independently measurable milestones over big-bang launches. Split by user job, not by internal layer.
- In existing products, follow established positioning. If current messaging has gaps that affect this bet (confusing tiers, unclear value), include targeted fixes — don't propose unrelated rebrands.

## Milestone Right-Sizing

A milestone is the smallest unit that carries its own acceptance check and is worth a fresh reviewer's gate. When drawing boundaries: fold research, copy, and setup steps into the milestone whose outcome needs them; split only where a reviewer could meaningfully reject one milestone while approving its neighbor. Each milestone ends with an independently observable user behavior.

## Step Granularity

**Each step is one action with a checkable result:**
- "Write the acceptance check" - step
- "Run the probe to confirm it currently fails" - step
- "Ship the minimal change that satisfies it" - step
- "Measure and confirm the behavior" - step
- "Commit / publish" - step

## PRD Document Header

**Every PRD MUST start with this header:**

```markdown
# [Bet Name] PRD

> **For agentic workers:** REQUIRED NEXT SKILL: Use validating-bets to validate this PRD milestone-by-milestone before any build or launch commitment. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence describing the user outcome]

**User & Job:** [Who hires this, and the JTBD in one sentence]

**Success metric:** [One observable behavior + target + timeframe, e.g. "12% of invited trial users complete onboarding within 7 days by 2026-03-01"]

**Anti-metric:** [What must NOT get worse while we chase the goal]

**North-star:** [The product's one outcome metric — must already exist before this PRD; if this is the first PRD, writing the north-star is step zero, not a follow-up]

**Problem statement:** [user + moment + cost of status quo, in the user's words with source; unattributed = labelled hypothesis]

**Evidence:** [links to discovery artefacts + killed hypotheses, each with `qué aprendimos` + `a quién hay que avisar`]

**Non-goals:** [explicit, in-PR D — scope grows only via written decision]

**Falsifiable criteria:** [≥1 acceptance criterion able to come back false — state what a FAIL looks like, not just the target]

**Brief:** [path to the discovery brief this PRD implements]

## Global Constraints

[The brief's bet-wide requirements — pricing guardrails, brand voice,
platform promises, compliance limits — one line each, with exact values
copied verbatim from the brief. Every milestone implicitly includes this section.]

## Risks & Unknowns

[The five user behaviors or market responses the brief implies but no
milestone's acceptance checks exercise that are most likely to surprise
us — one line each, naming the behavior and what a reasonable person
would expect, most likely first. For each line, add the probe that pins
it to the milestone that owns the surface, in that milestone's own step style.]

---
```

## Milestone Structure

````markdown
### Milestone N: [User-visible Outcome]

**Artifacts:**
- Create: `exact/path/to/artifact (e.g. onboarding email 2, pricing page section)`
- Modify: `exact/path/to/existing (section + lines if applicable)`
- Measure: `event name + tool (e.g. signup_completed in PostHog)`

**Dependencies:**
- Needs: [what this milestone uses from earlier milestones — exact names]
- Enables: [what later milestones rely on — exact outcome names. A milestone's
  owner sees only their own milestone; this block is how they learn the names
  neighboring milestones use.]

- [ ] **Step 1: Write the acceptance check**

```gherkin
Given a trial user who completed step X
When they reach <surface>
Then <observable behavior> within <timeframe>
```

- [ ] **Step 2: Confirm it currently fails**

Run: `<cheapest probe — cohort query, session replay sample, concierge test>`
Expected: FAIL — behavior absent or below baseline `<baseline + source>`

- [ ] **Step 3: Ship `milestone outcome` via `<surface>`**

One line on the approach when the acceptance check leaves a choice
(which channel, which message, which offer); copy blocks only for exact
user-facing text the brief fixes.

- [ ] **Step 4: Measure and confirm**

Run: `<query or dashboard link + date range>`
Expected: PASS — `<target from header>`

- [ ] **Step 5: Publish / commit**

```bash
git add docs/product/prds/<file>.md
git commit -m "feat(product): ship <milestone outcome>"
```
````

## What a Step Contains

A step is done when the owner can do exactly one reasonable thing from it. Unambiguous, not complete. Each kind of step carries what makes it unambiguous and nothing more:

- **An acceptance step:** the behavior, the surface, and the numbers, as a Given/When/Then with the brief's exact values.
- **A ship step:** the exact surface, the outcome, and the fixed copy or offer. No implementation detail the acceptance check already determines.
- **A measure step:** the query or dashboard plus the output that means it passed.
- **A reference to another milestone:** that milestone's Dependencies block says what to use; the PRD does not repeat that milestone's copy.

A PRD longer than the brief it implements has written the launch instead of planning it. Lines that decide nothing ("TBD", "optimize conversion", "add appropriate messaging", a metric no milestone measures) are the opposite failure, and the self-review catches both.

## Guardrails (§3, §4, §5, §6 — binding, see docs/product/guardrails.md)

- **Falsifiable or theatre:** no criterion able to come back false = `CLOSED`, never `CONDITIONAL`. State the FAIL shape alongside every target.
- **Roadmap entries are bets:** confidence + evidence per entry; attached date = promise. Removing/reclassifying sold capability triggers customer notification.
- **North-star before PRD:** metric measures user outcome, not shipped volume. Metric-vs-work conflict resolves for the metric.
- **Ordering discipline:** one decision, one owner, one record; rank + reason same sentence.

## Self-Review

After writing the complete PRD, check it against the brief. This is a checklist you run yourself.

**1. Brief coverage:** Skim each outcome in the brief. Can you point to a milestone that ships it? List any gaps.

**2. Step scan:** Every step must let the owner do exactly one reasonable thing, and no step may carry more than that: a line that decides nothing is a gap, a launch plan the acceptance checks already determine is a transcript. Fix both.

**2. Guardrail gate (§5, §6 — binding):** problem + evidence + north-star + non-goals present? ≥1 falsifiable criterion with an explicit FAIL shape? Sources tokenised, no price/date for vera + montero routing? Any NO = PRD is `CLOSED` at product gate, never `CONDITIONAL` — fix before items 3-6 below.

**3. Metric consistency:** Do the events, targets, and timeframes in later milestones match what you defined in the header? A metric called `activation` in Milestone 2 but `activated` in Milestone 4 is a bug.

**4. Risks & Unknowns:** For each behavior the brief implies, is there a milestone whose checks exercise it? The five least-covered ones go in Risks & Unknowns, each with its probe added to the owning milestone. An empty section means you checked and found none, not that you skipped the check.

**5. Proportion:** Compare the PRD's length to the brief's. A PRD several times longer than the brief is a transcript of the launch, not a plan. If copy blocks are most of the document, replace drafts with pointers and check each step is still unambiguous.

**6. Rank + reason (§3):** if this PRD orders milestones against other work, each ordering states reason in the same sentence, names one owner, and the deprioritised party has been told by a person same session — never by diff alone.

If you find issues, fix them inline. If you find a brief outcome with no milestone, add the milestone.

## Validation Handoff

After saving and self-reviewing the PRD, link it for your human partner to read. If they have already explicitly supplied a validation method, ask them to review the PRD and confirm it captures what they want; wait for that review, then use the preserved method. Otherwise, ask them to review the PRD and choose a validation method.

**When no validation method has already been supplied:**

**"PRD complete and saved to `docs/product/prds/<filename>.md`. Please review the PRD. Which validation approach would you prefer?**

- **Experiment-first** - Each milestone gets a cheapest-possible probe (interview slice, concierge, fake-door, pricing test) before any build commitment. Most evidence; slowest to ship.
- **Ship-and-measure** - I drive every milestone in this session through shipping-product, then one fresh review of the whole bet. Cheapest and fastest; no independent evidence until the end. Runs well when reversal cost is low.

**For this PRD I recommend <one of the two>, because <one sentence from the PRD: how much the milestones depend on unproven demand, how many there are, what a shipped mistake would cost>. Does the PRD capture what you want, and which approach should we use?"**

**If Experiment-first chosen:**
- **REQUIRED NEXT SKILL:** Use validating-bets

**If Ship-and-measure chosen:**
- **REQUIRED NEXT SKILL:** Use shipping-product
