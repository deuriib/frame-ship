---
trigger: always_on
description: Use when writing or reviewing a commit message, creating a branch,
  or preparing a change for review, to follow the repo's commit and merge
  contract.
---

# Git Commit Conventions

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
This is strictly required because automated release tooling (like `release-please`) uses these commits to calculate semantic versioning bumps and generate changelogs.

## Format

```text
<type>(<optional scope>): <subject>
```

### Type

Must be one of the following:

| Type | Intent | Release impact |
| --- | --- | --- |
| `feat` | A new feature | MINOR bump |
| `fix` | A bug fix | PATCH bump |
| `docs` | Documentation only changes | none |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, etc) | none |
| `refactor` | A code change that neither fixes a bug nor adds a feature | none |
| `perf` | A code change that improves performance | none |
| `test` | Adding missing tests or correcting existing tests | none |
| `build` | Changes that affect the build system or external dependencies | none |
| `ci` | Changes to CI configuration files and scripts | none |
| `chore` | Other changes that don't modify src or test files | none |

### Scope

Optional noun describing a section of the codebase (e.g., `rules`, `convert`, `harness`, `docs`).

### Subject

A short description in the imperative mood (e.g., "add", not "added").

## Rules

- Use the **imperative, present tense** (e.g., "fix bug" not "fixed bug").
- Do **not** capitalize the first letter of the subject.
- Do **not** end the subject line with a period.
- Keep the subject line under **72 characters**.
- Separate the subject from the body with a blank line.
- Use the body to explain *what* and *why* (not *how*).
- Use footers for referencing issues (e.g., `Closes #123`) or declaring breaking changes (`BREAKING CHANGE: <description>`).

## Branches and review

- **Short-lived branches.** Name them `type/short-hyphen-name`, cut from the current default branch, and rebase before requesting review. Days, not weeks.
- **Rebase, don't merge.** No merge commits on a feature branch; a linear history is the point of the log.
- **No direct-to-main.** Every change reaches the default branch through a pull request, including a one-line fix.
- **Peer review on every change.** No self-merge — a change without a second reader is unreviewed, not approved.
- **Green CI gates the merge.** Failing checks block; never merge red and fix forward.

## Examples

```text
feat(rules): add python async conventions
fix(antigravity): join globs with comma instead of space
docs(spec): clarify trigger precedence for model_decision
chore(deps): bump biome to 2.5.1
feat(harness): support Cursor rules format

BREAKING CHANGE: The `trigger` field is now required for all Antigravity rules.
```
