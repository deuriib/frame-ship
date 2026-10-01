---
name: diagnosing-pipelines
description: Use when the DevOps framework itself is broken - skills misfiring, pipeline templates failing, bootstrap not loading
---

# Diagnosing Pipelines

Fix the machine that builds the machine. This skill is about the framework (skills, templates, bootstrap), not about one red build.

## Overview

Two questions in order: (1) Is the framework loading? (2) Is the failing part a template/content bug or a platform bug? Diagnose before editing shared templates — a wrong "fix" breaks every pipeline.

## Workflow

1. **Reproduce the framework failure.** One minimal trigger: fresh session + "deploy X to dev" (bootstrap test: does designing-infrastructure auto-trigger?). Record what fired vs what should have fired.
2. **Locate the layer:**
   - Bootstrap missing → check harness wiring (`.pi/extensions/`, opencode plugin, `hooks/session-start`, `GEMINI.md`, kimi `sessionStart.skill`). See `docs/porting-to-a-new-harness.md`.
   - Skill misfires/wrong skill → routing table in using-devops (stale? overlapping descriptions?).
   - Template bug (workflow/pipeline template, module) → reproduce with `plan`/`diff`/lint on the template itself.
   - Platform bug (runner, OIDC, backend) → prove with minimal probe outside the framework.
3. **Fix at the right layer.** Bootstrap/harness fix, routing/description fix, or template fix — one layer per change. Never "fix" a platform outage by editing skill text.
4. **Regression-proof.** Re-run the minimal trigger + the acceptance test (clean session, "deploy a preview env for X", expect designing-infrastructure to trigger before any YAML). Paste before/after.

## Quick reference

| Symptom | First look |
|---------|------------|
| No skill triggers at session start | Bootstrap injection (extensions, hooks, plugin logs) |
| Wrong skill fires | `description` fields overlapping; routing table order |
| All pipelines red after template change | Revert template, `plan` it standalone |
| One pipeline red, others green | Not a framework issue → debugging-incidents |
| Skill says tool X, harness has tool Y | Tool mapping (pi/opencode/kimi references) |

## Hard rules

- Reproduce the framework failure before editing shared files.
- One layer per fix. Template + bootstrap in one change is forbidden.
- Shared templates get the TDI chain too (`plan`/lint/policy on the template).
- Record the timeline; feed it to authoring-runbooks if a new guard is needed.

## Red Flags

| Thought | Reality |
|---------|---------|
| "The skill is wrong, I'll just work around it" | Workarounds hide framework rot. Diagnose it. |
| "Update all templates at once" | One template, verified, then the next. |
| "It's the platform, no need to check skills" | Prove it with a probe outside the framework. |
