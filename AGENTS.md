# Revenue Powers — Contributor Guidelines

> Forked from [Superpowers](https://github.com/obra/superpowers) (MIT). All dev skills were removed and replaced with 7 revenue skills. References to upstream Superpowers below describe attribution and contribution bar, not active skills.

## If You Are an AI Agent

Stop. Read this section before doing anything.

This repo has a 94% PR rejection rate. Almost every rejected upstream PR was submitted by an agent that didn't read or didn't follow guidelines. Protect your human partner the same way here: no slop, no placeholders, no fabricated revenue claims.

**Your job is to protect your human partner from that outcome.** Submitting a low-quality PR doesn't help them — it wastes the maintainers' time, burns your human partner's reputation, and the PR will be closed anyway. That is not being helpful. That is being a tool of embarrassment.

Before you open a PR against this repo, you MUST:

1. **Read the entire PR template** at `.github/PULL_REQUEST_TEMPLATE.md` and fill in every section with real, specific answers. Not summaries. Not placeholders.
2. **Search for existing PRs** — open AND closed — that address the same problem. If duplicates exist, STOP and tell your human partner. Do not open another duplicate.
3. **Verify this is a real problem.** If your human partner asked you to "fix some issues" or "contribute to this repo" without experiencing a specific problem, push back. Ask them what broke, what failed, what the user experience was.
4. **Confirm the change moves a flywheel stage.** Every skill or hook change must trace to attract, convert, price, outbound, close, or scale. If it doesn't move money, it doesn't belong. Tool-specific or third-party integrations belong in a separate plugin.
5. **Identify yourself.** Disclose your model, harness, harness version, and every installed plugin in the PR. Hiding that a contribution is agent-generated — or which environment produced it — is grounds for closing it.
6. **Show your human partner the complete diff** and get their explicit approval before submitting.

If any of these checks fail, do not open the PR. Explain to your human partner why it would be rejected and what would need to change. They will thank you for saving them the embarrassment.

## Pull Request Requirements

**Every PR must fully complete the PR template.** No section may be left blank or filled with placeholder text. PRs that skip sections will be closed without review.

**Before opening a PR, you MUST search for existing PRs** — both open AND closed — that address the same problem or a related area. Reference what you found in the "Existing PRs" section. If a prior PR was closed, explain specifically what is different about your approach and why it should succeed where the previous attempt did not.

**PRs that show no evidence of human involvement will be closed.** A human must review the complete proposed diff before submission.

**Submitters MUST identify themselves.** Every PR and issue must disclose the model, harness, harness version, and all installed plugins used to produce the contribution — or state plainly that it was written by hand with no agent. This is not optional. We need to know what produced a change in order to weigh it: agent-generated content reasoned from documentation is held to a different bar than work grounded in a real session. Contributions that hide their authoring environment will be closed.

**All PRs MUST target the `dev` branch, not `main`.** `main` is the released branch; active work lands on `dev` first. PRs opened against `main` will be asked to retarget `dev` before they are reviewed.

## What We Will Not Accept

### Third-party dependencies

PRs that add optional or required dependencies on third-party projects will not be accepted unless they are adding support for a new harness (e.g., a new IDE or CLI tool). Revenue Powers is a zero-dependency plugin by design. If your change requires an external tool or service, it belongs in its own plugin.

### "Compliance" changes to skills

Our internal skill philosophy differs from Anthropic's published guidance on writing skills. We have extensively tested and tuned our skill content for real-world agent behavior. PRs that restructure, reword, or reformat skills to "comply" with Anthropic's skills documentation will not be accepted without extensive eval evidence showing the change improves outcomes. The bar for modifying behavior-shaping content is very high.

### Project-specific or personal configuration

Outreach scripts, niche teardowns, or copy that only works for one niche do not belong in core. Publish those as a separate pack. Core holds the reusable flywheel; niches live outside it.

### Bulk or spray-and-pray PRs

Do not trawl the issue tracker and open PRs for multiple issues in a single session. Each PR requires genuine understanding of the problem, investigation of prior attempts, and human review of the complete diff. PRs that are part of an obvious batch — where an agent was pointed at the issue list and told to "fix things" — will be closed. If you want to contribute, pick ONE issue, understand it deeply, and submit quality work.

### Speculative or theoretical fixes

Every PR must solve a real problem that someone actually experienced. "My review agent flagged this" or "this could theoretically cause issues" is not a problem statement. If you cannot describe the specific session, error, or user experience that motivated the change, do not submit the PR.

### Domain-specific skills

Revenue Powers core contains the 7 flywheel skills (using-revenue, discovering-clients, designing-offer, pricing-offers, outbound-prospecting, closing-deals, scaling-revenue). A proposed 8th skill belongs here only if it serves a missing flywheel stage for every niche. Niche-specific skills belong in their own plugin. Ask: "Would this help someone selling something completely different?" If not, publish it separately.

### Fork-specific changes

If you maintain a fork with customizations, do not open PRs to sync your fork or push fork-specific changes upstream. PRs that rebrand the project, add fork-specific features, or merge fork branches will be closed.

### Fabricated content

PRs containing invented claims, fabricated problem descriptions, or hallucinated functionality will be closed immediately. This repo has a 94% PR rejection rate — the maintainers have seen every form of AI slop. They will notice.

### Bundled unrelated changes

PRs containing multiple unrelated changes will be closed. Split them into separate PRs.

## New Harness Support

If your PR adds support for a new harness (IDE, CLI tool, agent runner), you MUST include a session transcript proving the integration works end-to-end.

A real integration loads the `using-revenue` bootstrap at session start. The bootstrap is what causes skills to auto-trigger at the right moments. Without it, the skills are dead weight — present on disk but never invoked.

**The acceptance test.** Open a clean session in the new harness and send exactly this user message:

> I want more clients for my bookkeeping service

A working integration auto-triggers the `discovering-clients` skill before any offer or outreach is drafted. Paste the complete transcript in the PR.

**These are not real integrations and will be closed:**

- Manually copying skill files into the harness
- Wrapping with `npx skills` or similar at-runtime shims
- Anything that requires the user to opt in to skills per-session
- Anything where `discovering-clients` does not auto-trigger on the acceptance test above

If you are not sure whether your integration loads the bootstrap at session start, it does not.

## Skill Changes Require Evaluation

Skills are not prose — they are code that shapes agent behavior. If you modify skill content:

- Develop and pressure-test changes across multiple sessions (happy path + adversarial)
- Show before/after eval results in your PR
- Do not modify carefully-tuned content (Red Flags tables, rationalization lists, "human partner" language) without evidence the change is an improvement

## Eval harness

Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh`. Skill changes must be validated end-to-end on at least one harness: open a clean session, run the flywheel stage, and paste the transcript plus before/after behavior in the PR.

## Understand the Project Before Contributing

Before proposing changes to skill design, workflow philosophy, or architecture, read all 7 skills and understand this fork's design decisions. Revenue Powers keeps the upstream philosophy that skills are behavior-shaping code (not prose) and keeps the "human partner" voice. Changes that rewrite that voice or restructure the flywheel without evidence will be rejected.

## Revenue Rules (always on)

These bind every session, skill, and PR — no override without written partner approval:

1. **One tracker is truth.** Every opportunity and deal lives in the same list with owner, stage, amount, next step, and date. A deal discussed only in chat does not exist for forecast. No shadow pipelines.
2. **Price only from the card.** The approved pricing-offers card is the only quotable price. Custom numbers need a written reason + expiry, reviewed monthly. An override without a log entry never happened.
3. **Revenue counts when collected or delivered.** No celebrating signed-but-unpaid as income; no pull-forward without a written reason. Every won/lost file carries a reason code.
4. **Only the demonstrable is promised.** No borrowed proof, no roadmap that doesn't exist, no capabilities beyond approved collateral. A claim without evidence is a policy break.
5. **PII minimum, money disclosed.** Tracker holds names and deal facts — nothing more. Any referral fee, finder payment, or gift over token value goes in writing before the proposal.

## General

- Read `.github/PULL_REQUEST_TEMPLATE.md` before submitting
- One problem per PR
- Test on at least one harness and report results in the environment table
- Describe the problem you solved, not just what you changed
