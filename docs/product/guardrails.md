# Product Guardrails — Binding Rules

These guardrails are non-negotiable. Every product skill enforces the section that applies to its stage. A deliverable that violates its guardrail is returned, not filed — never worked around.

## 1. Problem Framing

- One written problem statement per initiative: **user + moment + cost of status quo.**
- No statement = no PRD. "It would be nice" is not a problem.
- Stated in the user's words with source attached. Unattributed framing is labelled **hypothesis**, not fact.
- Scope grows only via written decision. Explicit non-goals live **in the statement**, not an appendix.

## 2. Discovery

- Every artefact **and** every killed hypothesis carries two fields: `qué aprendimos` + `a quién hay que avisar`. Missing either = returned, not filed.
- Interviews, notes, and tickets are personal-data stores: each declares **purpose, TTL, deletion route, DSR route.**
- A method producing agreement instead of disagreement gets **fixed, not reported** — it is a broken instrument.
- No names, emails, or account IDs in specs, PRDs, roadmaps, or commits — source tokenised at capture (e.g. `SEG-042`, never a name).

## 3. Prioritization

- Rank + reason travel in the **same sentence**. A ranked list without reason is an order, not a prioritisation.
- De-prioritisation without written reason = rejection. Unexplained rejection is **refused** — sent back, not executed.
- Ordering = one decision, one owner, one record.
- The person whose work falls is told **by a person, with the reason, same session** — never by diff.

## 4. Roadmap

- Each entry is a **bet with stated confidence + evidence**, not a date. An attached date is a promise under boundary rule 5.
- Removing or reclassifying an already-sold capability is customer-visible and triggers the **same notification** as any other customer-facing change.

## 5. PRD & Acceptance

- Every PRD carries: problem, evidence, north-star metric, explicit non-goals, **≥1 falsifiable acceptance criterion** (must be able to come back false).
- No falsifiable criterion = process theatre → **`CLOSED` at product gate, never `CONDITIONAL`.**
- PRD reaches `vera` + `montero` with **no price and no date attached.**

## 6. North-Star Metric

- One metric per product, written **before the first PRD**, measuring user outcome — not shipped volume.
- Vanity metrics and usage-of-unneeded-feature ≠ value.
- When the metric and the quarter's work disagree, **the metric wins and the roadmap changes.**

## Gate Summary

| Stage | Guardrail | Fail outcome |
|-------|-----------|--------------|
| Discovery output | §1 problem statement, §2 learnings + notify fields, tokenised sources | Returned, not filed |
| Prioritization | §3 rank+reason same sentence, human notification | Refused, not executed |
| Roadmap entry | §4 confidence + evidence, date = promise | Not committed |
| PRD | §5 all five elements + falsifiable criterion, no price/date to vera+montero | CLOSED, never CONDITIONAL |
| Any stage | §6 north-star exists before first PRD, metric beats roadmap on conflict | Roadmap changes |
