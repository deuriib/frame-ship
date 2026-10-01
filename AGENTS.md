# Finance Superpowers — Contributor Guidelines

> **History note:** forked from [obra/superpowers](https://github.com/obra/superpowers). `docs/` is the original project's history — don't rewrite it. Live spec is `skills/`.

## If You Are an AI Agent

Stop. Read this section before doing anything.

Low-quality finance PRs are worse than no PRs: a wrong formula or an unchecked assumption becomes a wrong decision. Protect your human partner from that outcome.

Before you open a PR against this repo, you MUST:

1. **Read the entire PR template** at `.github/PULL_REQUEST_TEMPLATE.md` and fill in every section with real, specific answers. Not summaries. Not placeholders.
2. **Verify this is a real problem.** If your human partner asked you to "fix some issues" without a specific broken number, session, or decision, push back. Ask what broke, what failed, what decision was blocked.
3. **Confirm the change belongs here.** Finance-domain skills belong here. Third-party product promos and personal one-off configs do not — those go in a separate plugin.
4. **Identify yourself.** Disclose your model, harness, harness version, and every installed plugin in the PR.
5. **Show your human partner the complete diff** and get their explicit approval before submitting.

## Pull Request Requirements

**Every PR must fully complete the PR template.** No section may be left blank or filled with placeholder text.

**PRs that show no evidence of human involvement will be closed.** A human must review the complete proposed diff before submission.

**Submitters MUST identify themselves.** Every PR and issue must disclose the model, harness, harness version, and all installed plugins used to produce the contribution — or state plainly that it was written by hand with no agent.

## What We Will Not Accept

### Third-party dependencies

Finance Superpowers is a zero-dependency plugin by design. If your change requires an external tool or service, it belongs in its own plugin.

### Bulk or spray-and-pray PRs

Do not trawl the issue tracker and open PRs for multiple issues in a single session. Pick ONE issue, understand it deeply, submit quality work.

### Speculative or theoretical fixes

Every PR must solve a real problem someone actually experienced. "This could theoretically misstate revenue" without a session, file, or decision behind it is not a problem statement.

### Fabricated content

PRs containing invented claims, fabricated numbers, or hallucinated functionality will be closed immediately. Never invent precision: estimates go in ranges with sources.

### Bundled unrelated changes

PRs containing multiple unrelated changes will be closed. Split them into separate PRs.

## New Harness Support

If your PR adds support for a new harness, you MUST include a session transcript proving the integration works end-to-end.

A real integration loads the `using-finance` bootstrap at session start. Without it, the skills are dead weight — present on disk but never invoked.

**The acceptance test.** Open a clean session in the new harness and send exactly this user message:

> Quiero armar mi presupuesto mensual

A working integration auto-triggers the `financial-discovery` skill before any calculation. Paste the complete transcript in the PR.

**These are not real integrations and will be closed:**

- Manually copying skill files into the harness
- Wrapping with `npx skills` or similar at-runtime shims
- Anything that requires the user to opt in to skills per-session
- Anything where `financial-discovery` does not auto-trigger on the acceptance test above

## Skill Changes Require Evidence

Skills are not prose — they are code that shapes agent behavior. If you modify skill content:

- Test the change across multiple sessions (happy path + adversarial: missing data, contradictory numbers, tight deadline)
- Show before/after results in your PR
- Do not modify carefully-tuned content (Red Flags tables, check-first ordering, "human partner" language) without evidence the change is an improvement
- Numbers rule: every example figure must trace to a source or be labeled "assumed"

## Understand the Project Before Contributing

Read existing skills and understand the design decisions: check-first ordering, explicit assumptions, ranges over points, evidence before claims, `docs/finance/` plan/brief paths. Changes that rewrite the voice or restructure the approach without understanding why it exists will be rejected.

## General

- Read `.github/PULL_REQUEST_TEMPLATE.md` before submitting
- One problem per PR
- Test on at least one harness and report results in the environment table
- Describe the decision you unblocked, not just what you changed
