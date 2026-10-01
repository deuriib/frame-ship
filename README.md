# Finance Superpowers

Finance Superpowers is a complete finance workflow for your agents, built on 14 composable skills and a bootstrap (`using-finance`) that makes sure your agent uses them. Covers FP&A, accounting close, compliance, personal finance, and investment analysis.

> **History note:** this repo was forked from [obra/superpowers](https://github.com/obra/superpowers) (dev methodology) and migrated to a finance domain. `docs/` is kept as historical record of the original project — the live spec is `skills/`.

## Table of Contents

- [How it works](#how-it-works)
- [Getting Started](#installation)
  - [Claude Code](#claude-code)
  - [Antigravity](#antigravity)
  - [Codex App](#codex-app)
  - [Codex CLI](#codex-cli)
  - [Cursor](#cursor)
  - [Devin CLI](#devin-cli)
  - [Factory Droid](#factory-droid)
  - [Gemini CLI](#gemini-cli)
  - [GitHub Copilot CLI](#github-copilot-cli)
  - [Grok Build CLI](#grok-build-cli)
  - [Kimi Code](#kimi-code)
  - [OpenCode](#opencode)
  - [Pi](#pi)
  - [Qwen Code](#qwen-code)
  - [Hermes Agent](#hermes-agent)
  - [Muse](#muse)
- [The Basic Workflow](#the-basic-workflow)
- [When Something Goes Wrong](#when-something-goes-wrong)
- [What's Inside](#whats-inside)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [Updating](#updating)
- [License](#license)

## How it works

It starts from the moment you fire up your agent. As soon as it sees a money question, it *doesn't* just jump into calculating. Instead, it steps back and asks what decision you're really trying to make.

Once it's teased a brief out of the conversation, it shows it back to you in lines short enough to actually read and correct.

After you've signed off on the brief, your agent puts together a work plan with exact inputs, checks, and versioned outputs — every number traces to a stated assumption or source.

Next up, once you say "go", it executes the plan task by task (`financial-delivery`), proving each step with a check it watched fail and then pass, and verifying everything before declaring anything done (`financial-verification`).

There's more to it, but that's the core. Because the skills trigger automatically, you don't need to do anything special. Your agent just has finance superpowers.

## Installation

Installation differs by harness. If you use more than one, install Finance Superpowers separately for each one.

### Claude Code

Install Finance Superpowers from this repository's marketplace (`.claude-plugin/`):

```bash
/plugin marketplace add <owner>/superpowers-finance
/plugin install superpowers-finance@superpowers-dev
```

### Antigravity

Install Finance Superpowers as a plugin from this repository:

```bash
agy plugin install <repo-url>
```

Antigravity runs the plugin's session-start hook, so finance skills are active from
the first message. Reinstall with the same command to update.

### Codex App / Codex CLI

Install the `superpowers-finance` plugin (`.codex-plugin/`) via your Codex plugin marketplace or from this repository checkout. Look for `Finance Superpowers` in the plugin list and install it.

### Cursor

- In Cursor Agent chat, install from marketplace:

  ```text
  /add-plugin superpowers-finance
  ```

- Or search for "finance superpowers" in the plugin marketplace.

### Devin CLI

- Install the plugin from this repository:

  ```bash
  devin plugins install <owner>/superpowers-finance
  ```

- Update to the latest version with:

  ```bash
  devin plugins update superpowers-finance
  ```

### Factory Droid

- Register this repository as marketplace and install `superpowers-finance`:

  ```bash
  droid plugin marketplace add <repo-url>
  droid plugin install superpowers-finance@superpowers-dev
  ```

### Gemini CLI

- Install the extension from this repository:

  ```bash
  gemini extensions install <repo-url>
  ```

- Update later:

  ```bash
  gemini extensions update superpowers-finance
  ```

### GitHub Copilot CLI

- Register this repository as marketplace and install `superpowers-finance`:

  ```bash
  copilot plugin marketplace add <repo-url>
  copilot plugin install superpowers-finance@superpowers-dev
  ```

### Grok Build CLI

- Install `superpowers-finance` from your Grok marketplace, or open the marketplace in the TUI and search for Finance Superpowers:

  ```text
  /marketplace
  ```

### Kimi Code

Finance Superpowers is available in Kimi Code's plugin marketplace (`.kimi-plugin/`).

- Open Kimi Code's plugin manager (`/plugins`), go to `Marketplace` > `Finance Superpowers` and install it.
- Or install directly from this repository (`/plugins install <repo-url>`).

- Historical docs: [docs/README.kimi.md](docs/README.kimi.md) (original project, kept as history)

### OpenCode

OpenCode uses its own plugin install; install Finance Superpowers separately even if you
already use it in another harness.

- Tell OpenCode to fetch and follow `.opencode/INSTALL.md` from this repository checkout.
- Historical docs: [docs/README.opencode.md](docs/README.opencode.md) (original project, kept as history)

### Pi

Install Finance Superpowers as a Pi package from this repository:

```bash
pi install git:<repo-url>
```

For local development, run Pi with this checkout loaded as a temporary package:

```bash
pi -e /path/to/superpowers-finance
```

The Pi package loads the finance skills and a small extension that injects the `using-finance` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.

### Qwen Code

Qwen Code installs plugins from Claude Code marketplaces directly.

- Install the plugin from this repository, and pick `superpowers-finance` when prompted.

### Hermes Agent

Install Finance Superpowers as a Hermes plugin from this repository (`.hermes-plugin/`):

```bash
hermes plugins install <repo-url> --enable
```

Restart any active Hermes sessions after installing. Note: Hermes has no
post-compaction hook, so a very long session that compacts over its first
turn loses the bootstrap — start a fresh session if skills stop triggering.

### Muse

Finance Superpowers is available as a native Muse plugin — same repo, same skills, all harnesses. The `using-finance` bootstrap is injected via the native `SessionStart` hook — no per-session opt-in.

- Install from a local checkout:

  ```bash
  muse plugins install ./
  muse plugins approve superpowers-finance
  ```

- Update later:

  ```bash
  muse plugins update superpowers-finance
  ```

Restart any active Muse sessions after installing so the `SessionStart` hook takes effect — skills are active immediately, hooks require approval on first install. To verify, start a fresh session and send `Quiero armar mi presupuesto mensual` — a working install auto-triggers `financial-discovery` before any calculation. Version is tracked in `.version-bump.json` so `scripts/bump-version.sh` keeps it in sync.

## The Basic Workflow

1. **financial-discovery** — New money question. Clarifies the decision, inputs, and success metric before any number moves.
2. **financial-shaping** — Vague idea → approved brief. Three paths: quick probe, bounded tweak, full design.
3. **financial-planning** — Approved brief → bite-sized work plan. Exact inputs, checks, and versioned outputs per task.
4. **financial-delivery** — Executes the plan task by task in-session, proving each step with a check watched fail then pass.
5. **Domain skills** — `budgeting-forecasting`, `financial-analysis`, `financial-modeling`, `personal-finance`, `accounting-close`, `compliance-tax`, `investment-research`. One per money job.
6. **financial-verification** — Evidence before claims. No complete/tied/filed without a fresh check run.
7. **diagnosing-finance** — Numbers don't tie. Reproduce on the data, isolate the layer, fix one thing, add the check that would have caught it.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## When Something Goes Wrong

Sometimes a session misbehaves: a skill fires when it shouldn't, stays silent when it should, or the agent ignores its plan or its checks. Ask your agent to "figure out what went wrong with finance skills in this session" and it will invoke **diagnosing-finance**. To examine an earlier session, name it: "figure out what went wrong with finance skills in session `<id>`".

## What's Inside

### Skills Library

**Process**
- **using-finance** — Bootstrap: skill routing, priority, red flags
- **financial-discovery** — Raw money question → sharp brief
- **financial-shaping** — Idea → approved brief (probe / bounded / full)
- **financial-planning** — Brief → executable work plan
- **financial-delivery** — Plan → task-by-task execution with ledger
- **financial-verification** — Evidence before completion claims
- **diagnosing-finance** — Numbers don't tie → root cause → guard check

**Domain (FP&A + accounting + personal + investment)**
- **budgeting-forecasting** — Budgets, forecasts, P&L, cash flow, scenarios
- **financial-analysis** — Statements, ratios, trends, comparables
- **financial-modeling** — Excel/Sheets: Inputs/Calcs/Outputs, checks, sensitivity
- **personal-finance** — Emergency fund → debt → saving, household budget
- **accounting-close** — Month-end close, reconciliations, statements
- **compliance-tax** — Obligations calendar, internal control, audit trail
- **investment-research** — Thesis, valuation range, quantified risk (education, not advice)

## Philosophy

- **Decision first, numbers second** — Every deliverable serves a decision
- **Assumptions explicit** — One assumption = one line with source or "assumed"
- **Checks over claims** — A check watched fail then pass, or it didn't happen
- **Evidence over claims** — Verify before declaring anything done
- **Ranges over points** — Estimates in ranges, never invented precision

## Contributing

1. Fork the repository
2. Create a branch for your work
3. Keep `docs/` as history — don't rewrite it; document finance changes in `skills/`
4. One domain problem per PR, with real numbers or a real session behind it
5. Fill in the pull request template completely

Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh` or `npm test`.

## Updating

Finance Superpowers updates are somewhat agent-dependent, but are often automatic.

## License

MIT License - see LICENSE file for details
