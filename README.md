# Frame-ship

Frame-ship is a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them.

## Table of Contents

- [How it works](#how-it-works)
- [Commercial Services](#commercial-services)
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
- [Community](#community)
- [What's Inside](#whats-inside)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [Updating](#updating)
- [License](#license)
- [Visual companion telemetry](#visual-companion-telemetry)

## How it works

It starts from the moment you fire up your agent. As soon as it sees that you're shaping a product bet, it *doesn't* just jump into writing a PRD. Instead, it steps back and asks what job the user is hiring you to do.

Once it's teased a validated bet out of the conversation, it shows it to you in chunks short enough to actually read and digest.

After you've signed off on the bet, your agent writes a PRD that's clear enough for a product team with no repo context to execute: who the user is, what success looks like in observable behavior, what is explicitly out of scope, and which evidence proves each milestone. It emphasizes riskiest-assumption-first validation, kill/pivot/persevere decisions, and measurement before claims.

Next up, once you say "go", it validates each milestone with the cheapest probe that can kill it, ships slices, measures behavior, and retros. It's not uncommon for your agent to run discovery-to-launch autonomously without drifting from the bet you approved.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your agent just has product frame-ship.

## Commercial Services

If you're using Frame-ship in enterprise and could benefit from commercial support, additional tooling, or managed spending, please don't hesitate to drop us a line at sales@primeradiant.com.

## Installation

Installation differs by harness. If you use more than one, install Frame-ship separately for each one.

### Claude Code

Frame-ship is available via the [official Claude plugin marketplace](https://claude.com/plugins/superpowers)

#### Official Marketplace

- Install the plugin from Anthropic's official marketplace:

  ```bash
  /plugin install frame-ship@claude-plugins-official
  ```

#### Frame-ship Marketplace

The Frame-ship marketplace provides Frame-ship and some other related plugins for Claude Code.

- Register the marketplace:

  ```bash
  /plugin marketplace add deuriib/frame-ship-marketplace
  ```

- Install the plugin from this marketplace:

  ```bash
  /plugin install frame-ship@superpowers-marketplace
  ```

### Antigravity

Install Frame-ship as a plugin from this repository:

```bash
agy plugin install https://github.com/deuriib/frame-ship
```

Antigravity runs the plugin's session-start hook, so Frame-ship is active from
the first message. Reinstall with the same command to update.

### Codex App

Frame-ship is available via the [official Codex plugin marketplace](https://github.com/openai/plugins).

- In the Codex app, click on Plugins in the sidebar.
- You should see `Frame-ship` in the Coding section.
- Click the `+` next to Frame-ship and follow the prompts.

### Codex CLI

Frame-ship is available via the [official Codex plugin marketplace](https://github.com/openai/plugins).

- Open the plugin search interface:

  ```bash
  /plugins
  ```

- Search for Frame-ship:

  ```bash
  frame-ship
  ```

- Select `Install Plugin`.

### Cursor

- In Cursor Agent chat, install from marketplace:

  ```text
  /add-plugin frame-ship
  ```

- Or search for "frame-ship" in the plugin marketplace.

### Devin CLI

- Install the plugin from this repository:

  ```bash
  devin plugins install deuriib/frame-ship
  ```

- Update to the latest version with:

  ```bash
  devin plugins update frame-ship
  ```

### Factory Droid

- Register the marketplace:

  ```bash
  droid plugin marketplace add https://github.com/deuriib/frame-ship
  ```

- Install the plugin:

  ```bash
  droid plugin install frame-ship@frame-ship
  ```

### Gemini CLI

- Install the extension:

  ```bash
  gemini extensions install https://github.com/deuriib/frame-ship
  ```

- Update later:

  ```bash
  gemini extensions update frame-ship
  ```

### GitHub Copilot CLI

- Register the marketplace:

  ```bash
  copilot plugin marketplace add deuriib/frame-ship-marketplace
  ```

- Install the plugin:

  ```bash
  copilot plugin install frame-ship@superpowers-marketplace
  ```

### Grok Build CLI

Frame-ship is available via the [official Grok plugin marketplace](https://github.com/xai-org/plugin-marketplace).

- Install the plugin from xAI's official marketplace:

  ```bash
  grok plugin install frame-ship@xai-official --trust
  ```

- Or open the marketplace in the TUI, search for Frame-ship, and install it:

  ```text
  /marketplace
  ```

### Kimi Code

Frame-ship is available in Kimi Code's plugin marketplace.

- Open Kimi Code's plugin manager:

  ```text
  /plugins
  ```

- Go to `Marketplace` > `Frame-ship` and install it.

- Or install directly from this repository:

  ```text
  /plugins install https://github.com/deuriib/frame-ship
  ```

- Detailed docs: [docs/README.kimi.md](docs/README.kimi.md)

### OpenCode

OpenCode uses its own plugin install; install Frame-ship separately even if you
already use it in another harness.

- Tell OpenCode:

  ```
  Fetch and follow instructions from https://raw.githubusercontent.com/deuriib/frame-ship/refs/heads/main/.opencode/INSTALL.md
  ```

- Detailed docs: [docs/README.opencode.md](docs/README.opencode.md)

### Pi

Install Frame-ship as a Pi package from this repository:

```bash
pi install git:github.com/deuriib/frame-ship
```

For local development, run Pi with this checkout loaded as a temporary package:

```bash
pi -e /path/to/superpowers
```

The Pi package loads the Frame-ship skills and a small extension that injects the `using-product` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.

### Qwen Code

Qwen Code installs plugins from Claude Code marketplaces directly.

- Install the plugin from this repository, and pick `frame-ship` when prompted:

  ```bash
  qwen extensions install deuriib/frame-ship
  ```

- Update later:

  ```bash
  qwen extensions update frame-ship
  ```

### Hermes Agent

Install Frame-ship as a Hermes plugin from this repository:

```bash
hermes plugins install deuriib/frame-ship --enable
```

Restart any active Hermes sessions after installing. Note: Hermes has no
post-compaction hook, so a very long session that compacts over its first
turn loses the bootstrap — start a fresh session if skills stop triggering.

### Muse

Frame-ship is available as a native Muse plugin — same repo, same skills, all harnesses. The `using-product` bootstrap is injected via the native `SessionStart` hook alongside Claude Code, Codex, Cursor, Gemini, Pi, and the rest — no per-session opt-in.

- Install from a local checkout:

  ```bash
  muse plugins install ./
  muse plugins approve frame-ship
  ```

  Or clone and install:

  ```bash
  git clone https://github.com/deuriib/frame-ship.git
  muse plugins install ./superpowers
  muse plugins approve frame-ship
  ```

- Update later:

  ```bash
  muse plugins update frame-ship
  ```

Restart any active Muse sessions after installing so the `SessionStart` hook takes effect — skills are active immediately, hooks require approval on first install. To verify, start a fresh session and send `Let's make a react todo list` — a working install auto-triggers `brainstorming` before any code is written. Version is tracked in `.version-bump.json` so `scripts/bump-version.sh` keeps it in sync.

## The Basic Workflow

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.

2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.

3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.

4. **subagent-driven-development** or **executing-plans** - Activates with plan. Either dispatches a fresh subagent per task with a review after each (most thorough), or implements every task inline in the current session with one fresh review of the whole branch at the end (cheapest).

5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.

6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.

7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## When Something Goes Wrong

Sometimes a session misbehaves: a skill fires when it shouldn't, stays silent when it should, or the agent ignores its plan, repeats work, or burns more tokens than you'd expect. Ask your coding agent to "figure out what went wrong with frame-ship in this session" and it will invoke the **diagnosing-product** skill. To examine an earlier session, name it: "figure out what went wrong with frame-ship in session `<id>`".

The skill reads the session transcript, reports what happened with line-level evidence, and, if you want, packages a scrubbed bundle for a bug report.

## Community

Frame-ship is built by [Jesse Vincent](https://blog.fsck.com) and the rest of the folks at [Prime Radiant](https://primeradiant.com).

- **Discord**: [Join us](https://discord.gg/35wsABTejz) for community support, questions, and sharing what you're building with Frame-ship
- **Issues**: https://github.com/deuriib/frame-ship/issues
- **Release announcements**: [Sign up](https://primeradiant.com/superpowers/) to get notified about new versions

## What's Inside

### Skills Library

**Discovery & Shaping**
- **product-discovery** - JTBD, riskiest assumption, validated bet (spike / bounded / strategic paths)
- **writing-prds** - Testable PRDs: user, job, success metric, anti-metric, milestones
- **validating-bets** - Hypothesis → cheapest probe → kill/pivot/persevere

**Build & Launch**
- **shipping-product** - Milestone-by-milestone shipping with measurement gates
- **verification-before-launch** - Evidence before launch claims
- **diagnosing-funnel** - Metric-drop diagnosis before fixes
- **diagnosing-product** - Work out what went wrong in a session, with evidence

**Monetization & Growth**
- **pricing-packaging** - Willingness-to-pay, tiers, value metric
- **go-to-market** - Positioning, messaging, channels, launch checklist
- **analytics-growth** - Goal metric, inputs, loops, experiment cadence

**Collaboration**
- **requesting-product-review** - Pre-launch review checklist

**Meta**
- **writing-skills** - Create new skills following best practices (includes testing methodology)
- **using-product** - Introduction to the product skills system

## Philosophy

- **Riskiest assumption first** - Validate before building, always
- **Evidence over opinions** - Probes and metrics before claims
- **Kill fast, ship small** - Small bets, fast decisions, measured launches
- **Behavior over vanity** - Observable user behavior, not vanity metrics

Read [the original release announcement](https://blog.fsck.com/2025/10/09/superpowers/).

## Contributing

This fork is a product-workflow migration: dev skills were replaced by product skills (see Skills Library above). Upstream contribution rules below apply to product skills in this repo.

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Follow the `writing-skills` skill for creating and testing new and modified skills
5. Submit a PR, being sure to fill in the pull request template.

Skill-behavior tests use the drill eval harness from [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals/), cloned into `evals/` — see `evals/README.md` for setup. Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh` or `npm test`.

See `skills/writing-skills/SKILL.md` for the complete guide.

## Updating

Frame-ship updates are somewhat coding-agent dependent, but are often automatic.

## License

MIT License - see LICENSE file for details

## Visual companion telemetry

Because skills and plugins don't provide any feedback to creators, we have no idea how many of you are using this workflow. No telemetry ships with the product skills (the visual companion from upstream brainstorming was removed in this migration).
