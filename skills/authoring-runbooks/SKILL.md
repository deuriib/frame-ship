---
name: authoring-runbooks
description: Use when creating or editing DevOps skills and runbooks - structure, validate and pressure-test before deploying
---

# Authoring Runbooks

Skills are pipeline code: they shape operator behavior. Write them like it — structured, tested, reviewed.

## Overview

A runbook/skill ships only when: it triggers on the right requests, its procedure fits its scope, and it survives adversarial pressure (an operator trying to skip it).

## What is a Skill?

Same contract as ever: `SKILL.md` with `name` + `description` frontmatter, one job, checklists over prose. For DevOps skills add: stack adapters (GH/GitLab/Azure) when the procedure differs, and the exact gate commands (not "verify somehow").

## Skill Types

- **Technique** (test-driven-infrastructure): a reusable validation loop.
- **Pattern** (dispatching-parallel-runners): a coordination shape.
- **Reference** (stack adapter tables): lookup material, no procedure.

## Directory Structure

```text
skills/<name>/SKILL.md
skills/<name>/references/<harness>-tools.md   # only if harness needs it
```

One skill, one directory, `SKILL.md` at root. No code dependencies — this repo stays zero-dependency; runbook scripts must be bash/std tools only.

## SKILL.md Structure

```markdown
---
name: <kebab-case>
description: Use when <trigger> - <outcome>
---

# <Name>

## Overview (or process, with HARD-GATE where writes are gated)
## When to Use / Scope Check
## Stack Adapters (if procedure differs per stack)
## The procedure (numbered, verbatim commands)
## Red Flags / Rationalizations table
## Verification / Checklist
```

Description = triggers only, no workflow summary (agents follow summaries instead of reading the skill).

## Pressure Testing

Before shipping a new/edited skill:

1. **Trigger test:** 3 phrasings that should fire it + 2 that shouldn't. Adjust `description` until all 5 classify right.
2. **Skip test:** ask "can I skip step X because urgent?" — the skill must make skipping harder than following (HARD-GATE for prod writes).
3. **Stack test:** walk the procedure once per supported adapter (GH/GitLab/Azure). Adapter-specific commands must be verbatim and runnable.
4. **Evidence test:** every claim the skill allows ("deployed", "healthy") must point at a gate command from verifying-releases.

## Shipping Checklist

- [ ] `name` kebab-case, `description` starts with "Use when"
- [ ] using-devops routing table updated (new row or changed trigger)
- [ ] Manifests updated if the harness enumerates skills (`.muse-plugin/plugin.json`, kimi `sessionStart` untouched — bootstrap only)
- [ ] Pressure tests pasted in the PR
- [ ] Human reviewed the full diff before merge

## Common Mistakes

- Description summarizes the workflow (agents skip reading).
- Procedure says "deploy" without the verbatim command per stack.
- No rollback pointer in a skill that authorizes writes.
- Bundling 3 skills into one "mega-runbook".
