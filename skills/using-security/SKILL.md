---
name: using-security
description: Use when starting any conversation - establishes how to find and use security skills, requiring skill invocation before ANY response including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a security skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested security skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files. If it turns out wrong for the situation, you don't have to use it.

**Before entering plan mode:** if you haven't threat-modeled, invoke security:threat-modeling first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

Security process skills come first — they set the approach, then implementation carries it out.

- "Let's build X" → security:threat-modeling first, then security:writing-secure-plans.
- "Fix this vuln/bug" → security:vulnerability-debugging first.
- "Review this" → security:secure-code-review first.
- "Ship this" → security:verification-before-release first.
- "We got breached/alert" → security:incident-response first.

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "Security is overkill here" | Attackers love "overkill" gaps. Use it. |
| "I'll add security later" | Later = breach. Threat-model now. |
| "I remember this skill" | Skills evolve. Read current version. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |

## Skill Index

| Skill | Trigger |
|-------|---------|
| security:threat-modeling | Any new feature, endpoint, auth change, data flow |
| security:writing-secure-plans | Multi-step security work, before touching code |
| security:secure-implementation | Writing or changing product code |
| security:vulnerability-debugging | Vuln report, test failure, anomalous behavior |
| security:secure-code-review | Before merging anything |
| security:verification-before-release | Before claiming done / shipping |
| security:incident-response | Active incident, alert, suspected compromise |

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Codex: `references/codex-tools.md`
- Pi: `references/pi-tools.md`
- Antigravity: `references/antigravity-tools.md`
- Hermes Agent: `references/hermes-tools.md`

When a security instruction says to invoke a skill, use your harness's native skill system. When it says subagent, use your harness's subagent tool; if none exists, do the work inline. When it says todo, use your harness's task tracker; if none exists, track in a markdown file.
