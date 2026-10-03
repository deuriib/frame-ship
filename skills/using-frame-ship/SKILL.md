---
name: using-frame-ship
description: Use when starting any conversation - establishes how to find and use skills, requiring skill invocation before ANY response including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files. If it turns out wrong for the situation, you don't have to use it.

**Before entering plan mode:** if you haven't already brainstormed, invoke the brainstorming skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach, then implementation skills (frontend-design, etc.) carry it out. Brainstorming and systematic-debugging are Frame-ship's most common process skills, but the rule holds for any of them.

- "Let's build X" → frame-ship:dev:brainstorming first, then implementation skills.
- "Fix this bug" → frame-ship:dev:systematic-debugging first, then domain skills.

## Domain Routing

This skill is the session router. It does no domain work — it classifies, delegates, and disappears.

**Classify the request BEFORE any response or action** — including clarifying questions, exploring the repo, or checking files:

1. Scan the request for domain signals (table below).
2. Exactly one domain matches → announce "Routing to `[domain]` → invoking `frame-ship:[domain]:using-[x]`" and invoke that domain's bootstrap. From there, the domain bootstrap owns the session.
3. No domain matches → this is core dev work. Proceed as `frame-ship:dev:*`: brainstorming / systematic-debugging / etc. Announce "No domain signals — staying in core dev" so your human partner can correct you.
4. Two or more domains match → ask your human partner ONE question with the candidate domains as options. Then route.

The router never diagnoses, estimates, designs, or codes. It routes.

| Signals in the request | Domain | Delegate to |
|---|---|---|
| build, bug, refactor, test, PR, code review, feature | dev (core) | `frame-ship:dev:*` (this repo's skills) |
| pipeline, deploy, infra, k8s, terraform, prod incident | devops | `frame-ship:devops:using-devops` |
| budget, forecast, model, costs, P&L | finance | `frame-ship:finance:using-finance` |
| contract, lawsuit, compliance, regulation | legal | `frame-ship:legal:using-legal` |
| campaign, SEO, copy, content, traffic | marketing | `frame-ship:marketing:using-marketing` |
| hiring, culture, performance, team | people | `frame-ship:people:using-people` |
| roadmap, PRD, funnel, pricing, discovery | product | `frame-ship:product:using-product` |
| prospecting, offer, closing, sales | revenue | `frame-ship:revenue:using-revenue` |
| threat, vulnerability, security incident | security | `frame-ship:security:using-security` |
| automation, micro-saas, workflow | automation-roi | `frame-ship:automation-roi:using-automation` |

Default: if nothing matches, it is dev. The router confirms the default out loud.

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Codex: `references/codex-tools.md`
- Pi: `references/pi-tools.md`
- Antigravity: `references/antigravity-tools.md`
- Hermes Agent: `references/hermes-tools.md`
- Muse: `references/muse-tools.md`

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.
