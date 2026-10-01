---
name: using-revenue
description: Use when starting any conversation - establishes how to find and use revenue skills, requiring skill invocation before ANY response including clarifying questions
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

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring prior context, or checking files. If it turns out wrong for the situation, you don't have to use it.

**Before shaping any money-making work:** if you haven't already run discovery, invoke the discovering-clients skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, discovery comes first — it sets the bet, then execution skills carry it out. discovering-clients and closing-deals are this repo's most common process skills, but the rule holds for any of them.

- "Let's find clients" → revenue:discovering-clients first, then outbound-prospecting.
- "Help me price this" → revenue:pricing-offers first, then designing-offer.
- "I have a call tomorrow" → revenue:closing-deals first, then scaling-revenue.
- "Grow my income" → revenue:scaling-revenue first, then the skill it points to.

## Revenue Flywheel

Every task maps to one stage. Pick the skill for the stage you're in:

| Stage | Skill | Question it answers |
|-------|-------|---------------------|
| Attract | discovering-clients | Who pays, and what pain hurts enough? |
| Convert | designing-offer | What do I promise, and why believe me? |
| Price | pricing-offers | What do I charge, anchored to ROI? |
| Outbound | outbound-prospecting | How do I open conversations that book calls? |
| Close | closing-deals | How do I run the call and win the yes? |
| Scale | scaling-revenue | How do I upsell, retain, and get referrals? |

If the request spans stages, start at the earliest incomplete one. Never price before discovering. Never close before an offer exists.

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me draft the proposal first" | Skills tell you HOW to draft. Check first. |
| "I can send a quick message" | Outbound without a skill burns pipeline. Check first. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes pipeline. Skills prevent this. |
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
