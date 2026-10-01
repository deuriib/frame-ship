---
name: using-people
description: Use when starting any conversation - establishes how to find and use people skills, requiring skill invocation before ANY response including clarifying questions
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

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the organization, or checking documents. If it turns out wrong for the situation, you don't have to use it.

**Before shaping any people decision:** if you haven't already run discovering-needs, invoke the discovering-needs skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach, then talent skills carry it out. Discovering-needs and diagnosing-people are People Powers' most common process skills, but the rule holds for any of them.

- "Let's hire / open a role / interview" → people:discovering-needs first, then people:hiring-talent.
- "Review / PIP / raise / promotion" → people:discovering-needs first, then people:reviewing-performance.
- "Engagement is down / conflict / attrition" → people:diagnosing-people first, then the matching talent skill.
- "New team / reorg / values / onboarding" → people:discovering-needs first, then people:shaping-culture.
- "Succession / career path / high potential" → people:discovering-needs first, then people:growing-talent.

## Routing Table (CHRO/CPO domain)

| Human partner says | Invoke |
|---|---|
| Hiring, role, scorecard, interview, offer, onboarding hire | people:hiring-talent |
| Review, performance, feedback, PIP, raise, bonus, promotion | people:reviewing-performance |
| Engagement, climate, values, culture, rituals, reorg, org design, onboarding program, offboarding | people:shaping-culture |
| Succession, career path, HiPo, mentoring, development plan, training | people:growing-talent |
| Attrition, conflict, complaint, investigation, absenteeism, low performance pattern | people:diagnosing-people |
| New initiative, new program, new policy, restructure (unknown scope) | people:discovering-needs first, then route |
| About to announce / communicate / sign a people decision | people:verifying-people-decisions before anything leaves your hands |

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me look at the org chart first" | Skills tell you HOW to explore. Check first. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple people decisions become lawsuits. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action with people wastes trust. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |
| "It's just one hire / one message" | One hire shapes culture for years. Use the skill. |
| "HR already approved it" | Then the skill runs fast. Skipping it is how bias slips in. |

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Codex: `references/codex-tools.md`
- Pi: `references/pi-tools.md`

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.
