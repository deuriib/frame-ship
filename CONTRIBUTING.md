# Contributing to frame-ship

First off, thank you for considering contributing to `frame-ship`! 🎉

This document explains our development workflow, contribution guidelines, quality gates, and how to submit changes smoothly.

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started: Zero to Running Tests](#getting-started-zero-to-running-tests)
- [Development Principles](#development-principles)
- [Branching & Commit Guidelines](#branching--commit-guidelines)
  - [Conventional Commits](#conventional-commits)
  - [Developer Certificate of Origin (DCO) Sign-off](#developer-certificate-of-origin-dco-sign-off)
- [Pull Request Workflow](#pull-request-workflow)
- [Testing & Quality Verification](#testing--quality-verification)
- [Authoring Skills & Rules](#authoring-skills--rules)

---

## Code of Conduct

Participation in this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to `deuriib@gmail.com`.

---

## Getting Started: Zero to Running Tests

### Prerequisites

Before you begin, ensure you have the following installed locally:
- **Node.js**: `v22.x` or `v24.x LTS` (we test against Node `24.22.1`)
- **npm**: `v10+`
- **Git**: `2.30+`
- *(Optional)* [mise-en-place](https://mise.jdx.dev/): if installed, `mise install` will automatically set up the pinned Node version and tasks.

### Local Setup Walkthrough

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deuriib/frame-ship.git
   cd frame-ship
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the test suite**:
   ```bash
   npm test
   ```
   *Expected output: All unit, schema, and catalog checks execute green (`pass 7`, 0 failures).*

4. **Run TypeScript typechecking**:
   ```bash
   npm run typecheck
   ```
   *Expected output: Clean compile with zero errors.*

5. **Verify runtime injection script (Antigravity hook)**:
   ```bash
   echo '{"invocationNum": 0}' | node scripts/context-inject.ts
   ```
   *Expected output: Valid JSON with `injectSteps` containing the bootstrap skill.*

If using `mise`, you can also run:
```bash
mise run test
mise run typecheck
```

---

## Development Principles

When contributing to `frame-ship`, we follow the core tenets of the Frame→Ship methodology:

1. **Proposal before code**: Never write code or submit extensive changes without alignment. For major features or refactors, open a proposal discussion or issue first.
2. **Minimal code**: The best code is the code you never write. Keep changes focused, small, and directly tied to the issue.
3. **Docs upkeep**: Any behavioral, structural, or configuration change must update documentation (`README.md`, relevant `docs/`, or skill references) in the **same pull request**.
4. **Tested, not trusted**: Every change that alters behavior must include a test proving the change works and will not regress.

---

## Branching & Commit Guidelines

### Branch Naming

Create short-lived feature branches cut from `main`:
```bash
git checkout -b <type>/<short-hyphen-description>
```
*Example*: `git checkout -b feat/add-opencode-telemetry` or `git checkout -b fix/rule-frontmatter-syntax`.

### Conventional Commits

All commit messages in `frame-ship` must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (v1.0.0). Our automated release tooling calculates version bumps and generates `CHANGELOG.md` directly from commit messages.

Format:
```text
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

#### Allowed Types:
- `feat`: A new feature or capability (bumps MINOR version).
- `fix`: A bug fix (bumps PATCH version).
- `docs`: Documentation-only updates.
- `style`: Formatting, missing semi-colons, whitespace (no functional change).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding or correcting tests.
- `build`: Changes affecting dependencies or the build system.
- `ci`: Changes to GitHub Actions or CI configuration scripts.
- `chore`: Tooling updates, metadata, or maintenance tasks.

#### Rules:
- Use the **imperative, present tense** in the subject: `"fix: add timeout"` not `"fix: added timeout"`.
- Do **not** capitalize the first letter of the description.
- Do **not** put a period `.` at the end of the subject.
- Keep the subject line under **72 characters**.

### Developer Certificate of Origin (DCO) Sign-off

All commits must include a `Signed-off-by` trailer certifying that you wrote the code or have the right to submit it under the project's open-source license.

To sign off automatically, use the `-s` (or `--signoff`) flag when committing:
```bash
git commit -s -m "feat(skills): add telemetry export validation"
```

This appends a line to your commit message:
```text
Signed-off-by: Your Name <your.email@example.com>
```

---

## Pull Request Workflow

1. **Rebase on `main`**: Ensure your branch is up-to-date with a clean, linear history (no merge commits):
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. **Run local verification**:
   ```bash
   npm test
   npm run typecheck
   ```
3. **Push to your fork or branch**:
   ```bash
   git push origin <your-branch-name>
   ```
4. **Open a Pull Request**:
   - Provide a clear summary of what was changed and why.
   - Link related issues (e.g., `Closes #42`).
   - Fill out the PR verification checklist.
5. **Code Review & CI Gates**:
   - All CI status checks (`test`, `typecheck`) must pass green.
   - All PRs require review and approval from `@deuriib` before merge.

---

## Testing & Quality Verification

Our automated test suite runs via Node.js native test runner (`node --test`). Tests live in `tests/` and enforce:
- **Rule Frontmatter**: All `rules/*.md` files declare valid `trigger: always_on` or `trigger: model_decision`.
- **Clean Hygiene**: Deprecated directories (`agents/`, legacy `commands/`) and obsolete workspace references are rejected.
- **Review Skills**: All 16 review skills in `skills/review-*` have valid `SKILL.md` frontmatter and `references/` directories.
- **Ephemeral Storage**: Ensure skills route transient artifacts to `.frame-ship/` and permanent artifacts to `docs/frame-ship/archive/<spec-id>/`.

---

## Authoring Skills & Rules

If you are contributing a new skill or rule, please adhere strictly to these standards:

### Skills (`skills/<skill-name>/`)
- Directory name must be kebab-case (e.g. `skills/my-skill/`).
- `SKILL.md` must have exact YAML frontmatter:
  ```yaml
  ---
  name: my-skill
  description: Use when [trigger condition]...
  ---
  ```
- No extra keys in frontmatter (no `version`, `author`, `tags`).
- Body structure:
  1. `# Title — Subtitle`
  2. Creed quote: `*"Haces las cosas como para Dios..."*`
  3. Sections: `## Overview`, `## Chain Contract`, `## Role Binding`, `## Process`, `## What I Won't Do`, `## References`.

### Rules (`rules/<rule-name>.md`)
- Must contain frontmatter declaring either:
  - `trigger: always_on` (loaded into every context build)
  - `trigger: model_decision` (loaded on demand)
- Avoid spelling typos in frontmatter (`trigger:`, never `triger:`).
- Keep rules concise, unambiguous, and enforceable by tests.
