# Revenue Powers

Revenue Powers is a complete revenue methodology for your agents, built on top of composable skills and bootstrap instructions that make sure your agent uses them.

Forked from [Superpowers](https://github.com/obra/superpowers) (dev workflow) and rebuilt for a revenue domain: every skill moves money - attract, convert, price, outbound, close, scale.

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
- [Attribution](#attribution)

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you want more revenue, it *doesn't* just jump into drafting messages or quoting prices. Instead, it steps back and asks who pays and what pain hurts enough. 

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest. 

After finding the buyer, it shapes the opportunity into an offer with a named outcome, a believable mechanism, and a guarantee - then prices it on ROI, never on hours. 

After you've signed off on the offer and pricing, your agent runs outbound that books calls, helps you run those calls to a yes, and compounds signed clients into upsells, renewals, and referrals - measured on one scorecard, one lever per month.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your agent just has revenue powers.

## Commercial Services

If you're using Superpowers in enterprise and could benefit from commercial support, additional tooling, or managed spending, please don't hesitate to drop us a line at sales@primeradiant.com.

## Installation

Installation differs by harness. If you use more than one, install Revenue Powers separately for each one.

### Claude Code

Superpowers is available via the [official Claude plugin marketplace](https://claude.com/plugins/superpowers)

#### Official Marketplace

- Install the plugin from Anthropic's official marketplace:

  ```bash
  /plugin install superpowers@claude-plugins-official
  ```

#### Superpowers Marketplace

The Superpowers marketplace provides Superpowers and some other related plugins for Claude Code.

- Register the marketplace:

  ```bash
  /plugin marketplace add obra/superpowers-marketplace
  ```

- Install the plugin from this marketplace:

  ```bash
  /plugin install superpowers@superpowers-marketplace
  ```

### Antigravity

Install Superpowers as a plugin from this repository:

```bash
agy plugin install https://github.com/obra/superpowers
```

Antigravity runs the plugin's session-start hook, so Superpowers is active from
the first message. Reinstall with the same command to update.

### Codex App

Superpowers is available via the [official Codex plugin marketplace](https://github.com/openai/plugins).

- In the Codex app, click on Plugins in the sidebar.
- You should see `Superpowers` in the Coding section.
- Click the `+` next to Superpowers and follow the prompts.

### Codex CLI

Superpowers is available via the [official Codex plugin marketplace](https://github.com/openai/plugins).

- Open the plugin search interface:

  ```bash
  /plugins
  ```

- Search for Superpowers:

  ```bash
  superpowers
  ```

- Select `Install Plugin`.

### Cursor

- In Cursor Agent chat, install from marketplace:

  ```text
  /add-plugin superpowers
  ```

- Or search for "superpowers" in the plugin marketplace.

### Devin CLI

- Install the plugin from this repository:

  ```bash
  devin plugins install obra/superpowers
  ```

- Update to the latest version with:

  ```bash
  devin plugins update superpowers
  ```

### Factory Droid

- Register the marketplace:

  ```bash
  droid plugin marketplace add https://github.com/obra/superpowers
  ```

- Install the plugin:

  ```bash
  droid plugin install superpowers@superpowers
  ```

### Gemini CLI

- Install the extension:

  ```bash
  gemini extensions install https://github.com/obra/superpowers
  ```

- Update later:

  ```bash
  gemini extensions update superpowers
  ```

### GitHub Copilot CLI

- Register the marketplace:

  ```bash
  copilot plugin marketplace add obra/superpowers-marketplace
  ```

- Install the plugin:

  ```bash
  copilot plugin install superpowers@superpowers-marketplace
  ```

### Grok Build CLI

Superpowers is available via the [official Grok plugin marketplace](https://github.com/xai-org/plugin-marketplace).

- Install the plugin from xAI's official marketplace:

  ```bash
  grok plugin install superpowers@xai-official --trust
  ```

- Or open the marketplace in the TUI, search for Superpowers, and install it:

  ```text
  /marketplace
  ```

### Kimi Code

Superpowers is available in Kimi Code's plugin marketplace.

- Open Kimi Code's plugin manager:

  ```text
  /plugins
  ```

- Go to `Marketplace` > `Superpowers` and install it.

- Or install directly from this repository:

  ```text
  /plugins install https://github.com/obra/superpowers
  ```

- Detailed docs: [docs/README.kimi.md](docs/README.kimi.md)

### OpenCode

OpenCode uses its own plugin install; install Superpowers separately even if you
already use it in another harness.

- Tell OpenCode:

  ```
  Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
  ```

- Detailed docs: [docs/README.opencode.md](docs/README.opencode.md)

### Pi

Install Superpowers as a Pi package from this repository:

```bash
pi install git:github.com/obra/superpowers
```

For local development, run Pi with this checkout loaded as a temporary package:

```bash
pi -e /path/to/superpowers
```

The Pi package loads the revenue skills and a small extension that injects the `using-revenue` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.

### Qwen Code

Qwen Code installs plugins from Claude Code marketplaces directly.

- Install the plugin from this repository, and pick `superpowers` when prompted:

  ```bash
  qwen extensions install obra/superpowers
  ```

- Update later:

  ```bash
  qwen extensions update superpowers
  ```

### Hermes Agent

Install Superpowers as a Hermes plugin from this repository:

```bash
hermes plugins install obra/superpowers --enable
```

Restart any active Hermes sessions after installing. Note: Hermes has no
post-compaction hook, so a very long session that compacts over its first
turn loses the bootstrap — start a fresh session if skills stop triggering.

### Muse

Revenue Powers is available as a native Muse plugin — same repo, same skills, all harnesses. The `using-revenue` bootstrap is injected via the native `SessionStart` hook alongside Claude Code, Codex, Cursor, Gemini, Pi, and the rest — no per-session opt-in.

- Install from a local checkout:

  ```bash
  muse plugins install ./
  muse plugins approve superpowers
  ```

  Or clone and install:

  ```bash
  git clone https://github.com/obra/superpowers.git
  muse plugins install ./superpowers
  muse plugins approve superpowers
  ```

- Update later:

  ```bash
  muse plugins update superpowers
  ```

Restart any active Muse sessions after installing so the `SessionStart` hook takes effect — skills are active immediately, hooks require approval on first install. To verify, start a fresh session and send `I want more clients` — a working install auto-triggers `discovering-opportunities` before any offer is drafted. Version is tracked in `.version-bump.json` so `scripts/bump-version.sh` keeps it in sync.

## The Basic Workflow

1. **discovering-opportunities** - Activates before any money-making work. Names the buyer, prices their pain, gathers 3+ willingness-to-pay signals, picks one channel to reach 50 buyers, sets kill criteria. Saves opportunity brief.

2. **designing-offer** - Activates with approved brief. Writes one-sentence outcome, 3-5 step mechanism, proof stack, guarantee with teeth, scope fence. Saves offer sheet.

3. **pricing-packaging** - Activates with approved offer. Shows ROI math, builds three tiers (Core = 10-20% of first-year ROI), sets payment terms and a raise trigger. Saves pricing card.

4. **outbound-prospecting** - Activates with offer + pricing. Builds a 50-name list, opener under 50 words, 3 follow-ups, booking flow. Tracks sent / replies / calls weekly; kills dead sequences after 100 touches.

5. **closing-deals** - Activates with a booked call. Discovery first, diagnosis second, prescription last. One recommended tier anchored to buyer ROI math, one ask, then silence. Objection playbook included.

6. **scaling-revenue** - Activates with signed clients. One lever per month: upsell at the win, renewals on calendar, one referral ask per win, one monthly scorecard. Fixes the worst number first.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## When Something Goes Wrong

Sometimes a session misbehaves: a skill fires when it shouldn't, stays silent when it should, or the agent quotes prices before discovery, pitches before pain, or chases maybes. Re-read the `using-revenue` bootstrap and name the stage you're in - most failures trace to skipping discovering-opportunities or quoting without a pricing card.

## Community

Superpowers is built by [Jesse Vincent](https://blog.fsck.com) and the rest of the folks at [Prime Radiant](https://primeradiant.com).

- **Discord**: [Join us](https://discord.gg/35wsABTejz) for community support, questions, and sharing what you're building with Superpowers
- **Issues**: https://github.com/obra/superpowers/issues
- **Release announcements**: [Sign up](https://primeradiant.com/superpowers/) to get notified about new versions

## What's Inside

### Skills Library

**Flywheel**
- **using-revenue** - Bootstrap: skill routing, flywheel stages, red flags
- **discovering-opportunities** - Attract: named buyer, priced pain, pay signals, channel, kill criteria
- **designing-offer** - Convert: outcome, mechanism, proof stack, guarantee, scope fence
- **pricing-packaging** - Price: ROI anchor, three tiers, payment terms, raise trigger
- **outbound-prospecting** - Outbound: 50-name list, opener, 3 follow-ups, weekly scorecard
- **closing-deals** - Close: call flow, objection playbook, proposal rules
- **scaling-revenue** - Scale: upsell, retention, referrals, monthly scorecard

## Philosophy

- **Discovery before offer** - Never price or pitch an unnamed buyer
- **Price on ROI, never on hours** - Hours punish speed and cap income
- **One channel, 100 touches, then judge** - Focus beats multichannel chaos
- **Ask at the win** - Upsells and referrals happen when the outcome lands
- **Evidence over claims** - Scorecards before opinions

Forked from [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent / Prime Radiant. Revenue domain, structure, and all 7 skills are this fork's own work.

## Contributing

The general contribution process for Revenue Powers is below. Keep in mind that we don't generally accept contributions of new skills and that any updates to skills must work across all of the coding agents we support.

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Test new or modified skills end-to-end on at least one harness and report results
5. Submit a PR, being sure to fill in the pull request template.

Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh`. Skill changes are validated end-to-end on at least one harness with a clean-session transcript.

See `AGENTS.md` for contributor guidelines.

## Updating

Revenue Powers updates are somewhat agent dependent, but are often automatic.

## License

MIT License - see LICENSE file for details

## Attribution

Forked from [Superpowers](https://github.com/obra/superpowers) (MIT) by Jesse Vincent / Prime Radiant. All dev skills were removed; the 7 revenue skills and methodology are original to this fork.
