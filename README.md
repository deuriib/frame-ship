# Superpowers Marketing

superpowers-marketing is a marketing, SEO and web-monetization methodology for your AI agents, built on the RomuMarketer philosophy: ROI es Dios, search intent manda, velocidad sobre perfección, flotas organizadas por rangos C/B/A/S.

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

It starts from the moment you fire up your coding agent. As soon as it sees that you're working on traffic, content or revenue, it *doesn't* just jump into publishing. Instead, it checks ROI, classifies search intent and assigns a rango before acting. 

Once it knows the intent, it picks the right Turbo template (TSA for affiliation, TSG for informational volume, TSR for deep reviews) and optimizes CTR before asking for a single backlink. 

After content converts, it scales through the Flota: enlazado en cadena from C to S, monetización per intent (AdSense, afiliación, producto), and CreceTube on YouTube. Every recommendation carries its business why. 

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your agent just has marketing Superpowers.

## Commercial Services

If you're using Superpowers in enterprise and could benefit from commercial support, additional tooling, or managed spending, please don't hesitate to drop us a line at sales@primeradiant.com.

## Installation

Installation differs by harness. If you use more than one, install Superpowers separately for each one.

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

The Pi package loads the superpowers-marketing skills and a small extension that injects the `using-marketing` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.

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

superpowers-marketing is available as a native Muse plugin — same repo, same skills, all harnesses. The `using-marketing` bootstrap is injected via the native `SessionStart` hook alongside Claude Code, Codex, Cursor, Gemini, Pi, and the rest — no per-session opt-in.

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

Restart any active Muse sessions after installing so the `SessionStart` hook takes effect — skills are active immediately, hooks require approval on first install. To verify, start a fresh session and send `Quiero montar una web de afiliación rentable` — a working install auto-triggers `nichos-rangos` before anything else. Version is tracked in `.version-bump.json` so `scripts/bump-version.sh` keeps it in sync.

## The Basic Workflow

1. **using-marketing** - Activates at session start. Enforces ROI, search intent, rangos C/B/A/S before any action.

2. **nichos-rangos** - Detects nichos rentables con prueba de dinero y clasifica cada web en rango C/B/A/S.

3. **keywords-intent** - Clasifica intenciones (transaccional / informacional / inbound) y mapea 1 URL = 1 intent, marcando canibalizaciones.

4. **contenidos-turbo** - Escribe o audita contenido con plantillas TSA / TSG / TSR, respuesta concisa arriba e interlink de cluster.

5. **copy-ctr** - Optimiza títulos emotivos, CTAs y bloques comparativos. Tráfico gratis a misma posición.

6. **enlaces-flota** - Enlazado en cadena C → B → A → S con anchors por intent, medido por URL receptora.

7. **monetizar-web** - Web ligera + monetización por intent: afiliación Amazon, AdSense, producto o servicio.

8. **escalar-analitica** - Fusiona canibalizaciones, escala rangos con datos y aplica CreceTube en YouTube.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## When Something Goes Wrong

Sometimes a session misbehaves: a skill fires when it shouldn't, stays silent when it should, or the agent ignores ROI, publishes without intent, or burns effort on rango C ideas. Re-read `skills/using-marketing/SKILL.md` — the Red Flags table names the failure — then ask for the right skill explicitly.

## Community

Superpowers is built by [Jesse Vincent](https://blog.fsck.com) and the rest of the folks at [Prime Radiant](https://primeradiant.com).

- **Discord**: [Join us](https://discord.gg/35wsABTejz) for community support, questions, and sharing what you're building with Superpowers
- **Issues**: https://github.com/obra/superpowers/issues
- **Release announcements**: [Sign up](https://primeradiant.com/superpowers/) to get notified about new versions

## What's Inside

### Skills Library

**Bootstrap**
- **using-marketing** - ROI, search intent y rangos C/B/A/S antes de cualquier acción

**Nicho y keywords**
- **nichos-rangos** - Detección de nichos rentables + clasificación C/B/A/S
- **keywords-intent** - Intenciones transaccional / informacional / inbound, 1 URL = 1 intent

**Contenido y conversión**
- **contenidos-turbo** - Plantillas TSA / TSG / TSR + clusters
- **copy-ctr** - Títulos emotivos, CTAs, bloques comparativos

**Autoridad y dinero**
- **enlaces-flota** - Linkbuilding e interlinking en cadena C → B → A → S
- **monetizar-web** - Web ligera + AdSense / afiliación / producto por intent
- **escalar-analitica** - Canibalizaciones, escala de rangos + CreceTube en YouTube

## Philosophy

- **ROI es Dios** - Toda acción declara retorno o se descarta
- **Search intent manda** - CTR + permanencia sobre keyword stuffing
- **Velocidad sobre perfección** - Lanzar, medir, optimizar
- **Rangos y flotas** - Escalar con datos, no con corazonadas

Read [the original release announcement](https://blog.fsck.com/2025/10/09/superpowers/).

## Contributing

The general contribution process for superpowers-marketing is below. Keep in mind that we don't generally accept contributions of new dev skills and that any updates to skills must work across all of the harnesses we support.

1. Fork the repository
2. Switch to the 'dev' branch
3. Create a branch for your work
4. Propose new or modified skills with evidence: before/after sessions, real traffic or revenue data where possible
5. Submit a PR, being sure to fill in the pull request template.

Skill-behavior tests use the drill eval harness from [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals/), cloned into `evals/` — see `evals/README.md` for setup. Plugin-infrastructure tests live at `tests/` and run via the relevant `run-*.sh` or `npm test`.

See `skills/using-marketing/SKILL.md` for the bootstrap and its checklist.

## Updating

Superpowers updates are somewhat coding-agent dependent, but are often automatic.

## License

MIT License - see LICENSE file for details

## Telemetry

No telemetry in superpowers-marketing: no remote asset loading, no tracking.
