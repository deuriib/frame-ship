# Agent Templates — Portable References

> 68 portable agent templates. Each works standalone on any harness
> (opencode, Claude Code, Cursor, generic LLM subagents): load the file as a
> persona/subagent as-is, pass inputs by reference, expect deliverable +
> file list + risks + assumptions.
> Inside frame-ship the `Frame-Ship adapter` is REQUIRED: every dispatch does
> `skill(<stage>)` + `read(agents/<domain>/<agent>.md)` before acting (single
> AND multi). The dispatched ONE template is read fully; all other roles stay
> path-cites. Dispatch via `task(subagent_type="general")` with explicit read
> orders until agents are natively registered.

## Layout

`agents/<domain>/<agent>.md` — central, no duplicate bodies.

- `c-level/` (8): montilla, vasquez, dauhajre, subero, vera, santana, barrera, montero — orchestrate stages+gates
- `engineering/` (13): architect, backend, frontend, devops, data-engineer, qa, review-readability, review-reliability, review-resilience, review-risk, review-refuter, review-data, espinoza — build + review wave (+ vasquez = 14 pilot slice)
- `security/` (6): security, security-reviewer, iam-specialist, privacy-engineer, incident-responder, grc-analyst
- `finance/` (14): accountant, cost-analyst, credit-analyst, financial-analyst, fpna-analyst, internal-auditor, investment-analyst, personal-finance, personal-investor, risk-analyst, tax-specialist, treasurer, payroll-specialist, finance-reviewer
- `legal/` (8): compliance-officer, contract-drafter, ip-counsel, labor-counsel, legal-researcher, legal-reviewer, litigation-counsel, privacy-counsel
- `marketing/` (9): brand-reviewer, brand-strategist, content-strategist, copywriter, email-marketer, marketing-analyst, ppc-specialist, seo, social-media
- `people/` (4): friction-mediator, people-operations, people-reviewer, performance-analyst
- `revenue/` (5): deal-closer, funnel-optimizer, pricing-strategist, revops-analyst, revenue-reviewer
- `shared/` (1): writer

## Template Schema

Each file, in order:

1. Generic frontmatter (`name`, `description` only) — no harness keys.
2. H1 craft heading + portable-use note.
3. Original craft body (role, principles, responsibilities, workflow, output shape, constraints), scrubbed of harness lock-in.
4. `Delegation` (plain-language contract: only montilla dispatches; every other role does the work end to end and briefs back cross-domain needs as a formal Cross-domain request — Need + Reason + Suggested owner + Urgency).
5. `Frame-Ship adapter (REQUIRED inside frame-ship)` — 3 lines, the only harness-conditional section; craft may cite chain roles/stages by plain reference. Enforces skill + template load before acting, single/multi routing, STOP + N=2 + escalate.

## Use

- Standalone: load the file as a persona/subagent in any harness; give it inputs by reference; expect the deliverable its Output section defines, plus file list, risks, and assumptions.
- Inside frame-ship: dispatcher does skill(stage) + read(this template) first (HARD STOP if missing); the agent follows the adapter (approved proposal before repo writes; verdict + scoped evidence for the gate; fail → retry max twice differently, then escalate). Single = direct execution, no task. Multi = task(general) max 2 parallel, each ordered to read skill + template first.

## Sync Rule

Templates are authoritative. Changes go here first, then port to installed mirrors if needed. No renames without updating all cites + count check (68 + this README).

## Guardrails

- No secrets/tokens/creds/session material (finding without evidence = REFUTED)
- Personal-data minimization: map each flow (source → store → log → third party); state purpose + retention + deletion path
- Reference-only packets between stages — paths + IDs, never full context
