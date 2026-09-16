# Branch + Commit Guide

## Branch Naming

Pattern:

```text
^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$
```

Examples: `feat/pull-request-skill`, `fix/gate-waiver-path`, `docs/pr-body-update`, `refactor/extract-gate-router`, `chore/bump-deps`, `ci/split-typecheck-job`, `revert/undo-model-picker-change`.

Rules: all lowercase; separators hyphen/dot/underscore only; short and descriptive.

## Conventional Commits

Pattern:

```text
^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9._-]+\))?!?: .+
```

Format: `<type>(<optional-scope>)!: <description>`.

Breaking changes: append `!` (`feat(cli)!: ...`) with `BREAKING CHANGE:` footer.

Examples:

```text
feat(pull-request): add branch and PR skill
fix(gate): correct waiver path on CLOSED gate
docs: update PR body template
chore(deps): bump toolchain
```

Never add `Co-Authored-By` trailers. Never force-push to `main`/`master`.
