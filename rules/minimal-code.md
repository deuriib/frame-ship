---
trigger: always_on
description: Use when about to write, add, or extract code — a helper, class,
  interface, dependency, config file, or error handler — to confirm it is needed
  before it exists.
---

# Minimal Code

The best code is the code you never write. The second best is the smallest
diff that fully solves the stated problem.

Minimal is not clever. Minimal is **less surface**: fewer lines, files,
dependencies, and branches — for the same behaviour. Every line is a
liability that someone must read, test, and maintain forever.

## Pre-flight (before you type)

Answer each in one line. If you cannot, you do not understand the problem yet.

1. **What breaks today?** If nothing breaks, it is YAGNI — stop.
2. **What already exists?** Grep the repo before designing anything.
3. **What is the smallest diff that makes the failing case pass?**

## Efficiency Ladder

Stop at the first rung that holds. Climb only when it provably fails.

| # | Rung | Ask | Stop if |
| --- | --- | --- | --- |
| 1 | **Don't build it** | Is this needed at all? | No requirement names it |
| 2 | **Reuse** | Does the repo already do this? | An existing function, component, or util covers it |
| 3 | **Standard library** | Does stdlib solve it? | `URL`, `fs.cp`, `path.join`, `str.padStart` |
| 4 | **Native platform** | Does the language, runtime, or CSS do it? | `Intl`, `Array.at`, `structuredClone`, `gap`, `datalist` |
| 5 | **Existing dependency** | Is it already installed? | Package already in `dependencies` |
| 6 | **One line** | Can it be one readable expression? | One expression, no cleverness |
| 7 | **Minimum code** | Only now write the diff | Everything above failed |

## Hard rules

- **No abstraction under three use sites.** Inline it twice; extract on the third real caller.
- **No unrequested future-proofing.** No interface, base class, generic, or options object without a current consumer.
- **No dependency for a small job.** Write the ~50 lines yourself if stdlib or a one-liner covers it; a dependency is justified only by non-trivial correctness surface (crypto, parsing, dates, PDFs).
- **No new file when an existing one has room.** Fewest files possible.
- **No boilerplate.** No getters/setters, DTOs, empty interfaces, barrel `index` files, or a factory wrapping a constructor.
- **No config for a hardcoded value.** Hardcode it until the second real use site.
- **No error handling for errors that cannot occur.** Handle errors that *can*.
- **No comments that restate code.** Comment the *why*: the invariant, the workaround, the upstream bug. Skip docstrings that echo the signature.
- **Delete before you add.** If removing something satisfies the requirement, that is the change.
- **Prefer flat and plain.** Early returns over nesting, functions over classes, data over objects with behaviour, prose over ceremony.
- **One sentence rule.** If the diff cannot be explained in one sentence, it is too big — split it.

Minimal never means cryptic. Do not golf, chain-ternary, or compress until it
is unreadable: unreadable code costs more than the lines it saved.

## Never minimal

Minimalism stops where correctness, safety, or the user's trust begins. Always write these:

- Input validation at every trust boundary: user input, network, files, DB.
- Authentication and authorization checks on any data access path.
- Handling for failures that can actually happen, including partial failure and lost work.
- Migrations and backfills that do not destroy existing data.
- Tests for behaviour you claim works; accessible markup (labels, focus, `alt`) in UI.
- Anything the spec explicitly requires, even if it looks unnecessary to you.

When a rule in this section conflicts with the one above, this section wins —
and you say so explicitly instead of silently dropping the check.

## Anti-patterns

| Anti-pattern | Instead |
| --- | --- |
| Installing a package for a one-liner | Use stdlib or write the line |
| A class wrapping a single function | Write the function |
| Config or env var for a hardcoded value | Hardcode until 2+ uses |
| A utility module created "for reuse" | Inline now, extract when the third caller appears |
| Error handling for an impossible error | Skip it |
| Logging added before the code works | Ship first, instrument on evidence |
| `interface Foo {}` / `type Foo = any` placeholder | Delete it |
| Rewriting a working module while implementing a feature | Touch only what the task needs |

## Verification

Before reporting done:

- `git diff --stat` — does the size match the problem? A 400-line diff for a 20-line fix is a smell.
- Every new dependency and every new file has a stated reason.
- No dead code, commented-out blocks, unused exports, or `TODO`s left behind.
- The failing case passes and nothing unrelated changed.
