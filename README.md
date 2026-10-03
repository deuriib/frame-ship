# Frame-ship

Frame-ship is a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them.

> Based on [obra/superpowers](https://github.com/obra/superpowers) (MIT). Rebranded and maintained by [Deuri Vasquez](https://github.com/deuriib) as `frame-ship` with per-domain invocation (`frame-ship:{domain}:{skill}`). See [MIGRATION.md](MIGRATION.md).

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
- [Community](#community)
- [What's Inside](#whats-inside)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [Updating](#updating)
- [License](#license)

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do.

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest.

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and DRY.

Next up, once you say "go", it launches a *subagent-driven-development* process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for your agent to work autonomously for a couple hours at a time without deviating from the plan you put together.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has Frame-ship. Every invocation names its domain: `frame-ship:dev:brainstorming`, `frame-ship:security:threat-modeling`, `frame-ship:product:product-discovery`.

## Installation

Installation differs by harness. If you use more than one, install Frame-ship separately for each one.

### Claude Code

Frame-ship is available via the plugin marketplace in this repository.

- Register the marketplace:

  ```bash
  /plugin marketplace add deuriib/frame-ship-marketplace
  ```

- Install the plugin from this marketplace:

  ```bash
  /plugin install frame-ship@frame-ship-marketplace
  ```

### Antigravity

Install Frame-ship as a plugin from this repository:

```bash
agy plugin install https://github.com/deuriib/frame-ship
```

Antigravity runs the plugin's session-start hook, so Frame-ship is active from
the first message. Reinstall with the same command to update.

### Codex App

- In the Codex app, click on Plugins in the sidebar.
- You should see `Frame-ship` in the Coding section.
- Click the `+` next to Frame-ship and follow the prompts.

### Codex CLI

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
  copilot plugin install frame-ship@frame-ship-marketplace
  ```

### Grok Build CLI

- Install the plugin:

  ```bash
  grok plugin install frame-ship --trust
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
pi -e /path/to/frame-ship
```

The Pi package loads the Frame-ship skills and a small extension that injects the `using-frame-ship` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.

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

Frame-ship is available as a native Muse plugin — same repo, same skills, all harnesses. The `using-frame-ship` bootstrap is injected via the native `SessionStart` hook alongside Claude Code, Codex, Cursor, Gemini, Pi, and the rest — no per-session opt-in.

- Install from a local checkout:

  ```bash
  muse plugins install ./
  muse plugins approve frame-ship
  ```

  Or clone and install:

  ```bash
  git clone https://github.com/deuriib/frame-ship.git
  muse plugins install ./frame-ship
  muse plugins approve frame-ship
  ```

- Update later:

  ```bash
  muse plugins update frame-ship
  ```

Restart any active Muse sessions after installing so the `SessionStart` hook takes effect — skills are active immediately, hooks require approval on first install. To verify, start a fresh session and send `Let's make a react todo list` — a working install auto-triggers `brainstorming` before any code is written. Version is tracked in `.version-bump.json` so `scripts/bump-version.sh` keeps it in sync.

## The Basic Workflow

1. **brainstorming** (`frame-ship:dev:brainstorming`) - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.

2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.

3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.

4. **subagent-driven-development** or **executing-plans** - Activates with plan. Either dispatches a fresh subagent per task with a review after each (most thorough), or implements every task inline in the current session with one fresh review of the whole branch at the end (cheapest).

5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.

6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.

7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## When Something Goes Wrong

Sometimes a session misbehaves: a skill fires when it shouldn't, stays silent when it should, or the agent ignores its plan, repeats work, or burns more tokens than you'd expect. Ask your coding agent to "figure out what went wrong with frame-ship in this session" and it will invoke the **diagnosing-frame-ship** skill. To examine an earlier session, name it: "figure out what went wrong with frame-ship in session `<id>`".

The skill reads the session transcript, reports what happened with line-level evidence, and, if you want, packages a scrubbed bundle for a bug report.

## Community

Frame-ship is maintained by [Deuri Vasquez](https://github.com/deuriib).

- **Issues**: https://github.com/deuriib/frame-ship/issues

## What's Inside

### Skills Library

**Testing**
- **test-driven-development** - RED-GREEN-REFACTOR cycle (includes testing anti-patterns reference)

**Debugging**
- **systematic-debugging** - 4-phase root cause process (includes root-cause-tracing, defense-in-depth, condition-based-waiting techniques)
- **verification-before-completion** - Ensure it's actually fixed
- **diagnosing-frame-ship** - Work out what went wrong in a session, with evidence; export a scrubbed bundle or file an issue

**Collaboration**
- **brainstorming** - Socratic design refinement
- **writing-plans** - Detailed implementation plans
- **executing-plans** - Inline plan execution: one context, one final review
- **dispatching-parallel-agents** - Concurrent subagent workflows
- **requesting-code-review** - Pre-review checklist
- **receiving-code-review** - Responding to feedback
- **using-git-worktrees** - Parallel development branches
- **finishing-a-development-branch** - Merge/PR decision workflow
- **subagent-driven-development** - Fast iteration with two-stage review (spec compliance, then code quality)

**Meta**
- **writing-skills** - Create new skills following best practices (includes testing methodology)
- **using-frame-ship** - Introduction to the skills system (session router across the 10 `frame-ship:{domain}` plugins)

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Contributing

The general contribution process for Frame-ship is below. Keep in mind that we don't generally accept contributions of new skills and that any updates to skills must work across all of the coding agents we support.

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Follow the `writing-skills` skill for creating and testing new and modified skills
5. Submit a PR, being sure to fill in the pull request template.

Skill-behavior tests use the drill eval harness, cloned into `evals/` — see `evals/README.md` for setup. Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh` or `npm test`.

See `skills/writing-skills/SKILL.md` for the complete guide.

## Updating

Frame-ship updates are somewhat coding-agent dependent, but are often automatic.

## License

MIT License - see LICENSE file for details
