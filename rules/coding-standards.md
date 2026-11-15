---
trigger: always_on
description: Use on every code edit, regardless of file type or language.
---

# Coding Standards

These are the baseline expectations for any file you touch. Language-specific
rules live in `stacks/` and layer on top of these.

## Size and shape

- **Small functions.** Keep functions under 40 lines. If it needs a scroll, split it. This is a soft limit: a cohesive 45-line function beats three fragments sharing mutable state.
- **Bounded complexity.** Cyclomatic complexity at or below 10 per function, and no more than 3 levels of nesting. Both are symptoms of a function deciding too many things.
- **Early returns over nesting.** Guard clauses at the top; the happy path stays at the left margin.
- **One responsibility per function.** If the name needs an "and", it is two functions.
- **No magic values.** A named constant, not a bare `86400` or `"admin"` repeated across the file.

## Rules

- **Named exports.** Prefer named exports over default exports so imports stay greppable and rename-safe.
- **No debug output.** Never commit `console.log` or any other debug print. Use a structured logger, or delete the statement before committing.

## Hygiene

- **No dead code.** No unused functions, variables, exports, parameters, or private helpers. Delete them — git keeps the history.
- **No commented-out code.** It is neither documentation nor a backup. Delete it.
- **No ticketless TODOs.** A `TODO` names the issue that resolves it, or it does not survive review.
- **No circular imports.** Two modules importing each other means the boundary is wrong. Move the shared piece down.
- **Store UTC, display local.** Persist and transport timestamps in UTC; convert to the user's timezone only at the presentation edge.

## Scope

- These rules apply to application source, scripts, and tests alike.
- Where a language rule under `stacks/` is stricter, the stricter rule wins.
