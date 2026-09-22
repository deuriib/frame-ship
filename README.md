# frame-ship

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

![Node](https://img.shields.io/badge/node-22%20LTS-339933?logo=node.js&logoColor=white)
![Mise](https://img.shields.io/badge/mise-managed-7950ED?logo=mise&logoColor=white)
![Opencode](https://img.shields.io/badge/opencode-plugin-000000?logo=openai&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Private](https://img.shields.io/badge/repo-private-lightgrey)

**An agentic skills framework & Frame→Ship methodology that works — from strategic intent to shipped release.**

A complete delivery methodology for your coding agents, built on top of a set of composable skills and a small plugin that makes sure your agent uses them. Single-file runtime, zero dependencies, idempotent injection, compaction-safe.

## Table of Contents

- [How it works](#how-it-works)
- [Installation](#installation)
- [The Basic Workflow](#the-basic-workflow)
- [What's Inside](#whats-inside)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [Updating](#updating)
- [Developing](#developing)
- [Roadmap](#roadmap)
- [License](#license)

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it _doesn't_ just jump into writing code. Instead, it loads `using-frame-ship` and asks what you're really trying to do.

Once it's teased a brief out of the conversation (`frame-intent`), it shows it to you in chunks short enough to actually read and digest — problem, affected who, success criteria, OKRs.

After you've signed off on the brief, your agent translates it into testable requirements and architecture contracts (`translate-to-spec`), then puts together a proposal clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow (`propose-changes`). No code is written until the proposal is approved.

Next up, once you say "go", it runs mandatory reviews for auth/data/API (`review-security`, STRIDE verdict) and for public APIs/data models (`review-architecture`, ADR), implements strictly within approved boundaries with `REQ-ID → test → artifact` traceability (`execute-spec`), routes every touched domain through reviewers (`quality-gate`), verifies Definition of Done (`verify-handoff`), and ships with notes, changelog, and rollback plan (`ship-release`).

There's guardrails throughout — deny-by-default secrets, OWASP by default, PII minimization — but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has Frame→Ship.

## Installation

Opencode is the supported harness today. Frame-ship is a general plugin by design — Claude Code and others follow the same skills + bootstrap pattern (see Roadmap).

### Opencode

Add the plugin by name + source in your opencode config (`~/.config/opencode/opencode.json` globally, or `<your-project>/opencode.json`):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["frame-ship@github:deuriib/frame-ship"],
}
```

Or via CLI:

```bash
opencode plugin add github:deuriib/frame-ship
```

Then quit + restart opencode (config is not hot-reloaded). Verify: the system prompt contains `[frame-ship v0.9.0]` and the native `skill` tool discovers `using-frame-ship` through `ship-release`.

Prerequisites: [opencode](https://opencode.ai/), Git + [`gh`](https://cli.github.com/) authenticated (repo is still private), Node 22 LTS via `mise install`.

For development on frame-ship itself (live local changes), use a local path instead — see [`plugins/opencode/INSTALL.md`](./plugins/opencode/INSTALL.md). Never commit a `file:///` path to a shared config.

> Note: full per-harness guides (`docs/README.<harness>.md`) land as each adapter ships. Today: opencode + Antigravity CLI (agy).

### Antigravity CLI (agy)

This repo root **is** the agy plugin source (root-drop layout — `agy plugin install .`). Handlers are TypeScript executed via `bun`, and context injection is 1:1 with the opencode plugin (same cards, same bootstrap, same `skills/`).

Install globally:

```bash
agy plugin install https://github.com/deuriib/frame-ship
agy plugin list        # frame-ship appears
```

Or per-workspace: `agy plugin install /path/to/frame-ship` from any checkout. Verify loaded hooks in the TUI with `/hooks`. Disable/enable without deleting assets:

```bash
agy plugin disable frame-ship
agy plugin enable frame-ship
agy plugin uninstall frame-ship   # purge + rollback (ETA < 10 min with git revert)
```

Prerequisites: [Antigravity CLI](https://antigravity.google/docs/cli/overview/) (`agy` v1.2.0), [`bun`](https://bun.sh/) ≥ 1.x on PATH.

What maps to what (opencode → agy):

| OpenCode plugin                                                                 | Antigravity CLI equivalent                                                                                   |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `experimental.chat.system.transform` — WORKFLOW_CARD, POINTERS (+ guardrails lane: full `rules/guardrails.md` on context, minimal set on compaction) | `rules/frame-ship.md` — automatically injected into agent context                                            |
| `experimental.chat.system.transform` — live `using-frame-ship/SKILL.md`         | PreInvocation hook (`hooks/context-inject.ts`) — `injectSteps` + `ephemeralMessage` on `invocationNum === 0` |
| `experimental.session.compacting` — COMPACTION_REMINDER                         | No compaction event in agy — `rules/frame-ship.md` is persistent & always-on in context             |
| `hasMarker` idempotency                                                         | `invocationNum === 0` guard — bootstrap injected exactly once per session                                    |

Local replay (no `agy` binary needed):

```bash
bun ./hooks/safety-gate.ts < hooks/fixtures/pretool-allow.json
bun ./hooks/context-inject.ts < hooks/fixtures/preinvocation-first.json
```

## The Basic Workflow

0. **using-frame-ship** — Bootstrap. Loads at session start and after compaction. States chain order, routes by trigger, enforces hard rules. Check skills before any task.
1. **frame-intent** — Activates before specs. Refines rough strategic direction through questions, freezes `BRIEF-<slug>.md` + 2–4 OKRs. No specs, no code.
2. **translate-to-spec** — Activates with approved brief. Produces REQ-IDs + `ARCHITECTURE.md` + API contracts. Testable requirements only.
3. **propose-changes** — Activates with spec. Writes `PROPOSED_CHANGES.md` with risk assessment. Repo untouched. Blocks until approved.
4. **review-security** — Activates for auth/data/external API. STRIDE review, verdict Approved / Conditional / Rejected. CISO sign-off.
5. **review-architecture** — Activates for public API / data model / cross-cutting changes. Records ADR + contract verdict.
6. **execute-spec** — Activates with approved proposal. Implements only approved files, produces test matrix, keeps `REQ-ID → test → artifact` trace.
7. **quality-gate** — Activates when implementation is ready. Routes to domain reviewers, consolidates `GATE_REPORT.md`. CLOSED on any fail; waivers only by orchestrator.
8. **verify-handoff** — Activates when work declares complete. Verifies DoD checklist, produces `HANDOFF.md`. No OPEN gate = no handoff.
9. **ship-release** — Activates when verified. Ships `RELEASE_NOTES.md` + changelog + deployment order + rollback plan, archives spec.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

```text
using-frame-ship → frame-intent → translate-to-spec → propose-changes
  → review-security/review-architecture → execute-spec → quality-gate
  → verify-handoff → ship-release
```

## What's Inside

### Skills Library

**Bootstrap**

- **using-frame-ship** — Chain contract + session-start/post-compaction checklist

**Frame**

- **frame-intent** — Strategic intent to Product Brief + OKRs

**Specify**

- **translate-to-spec** — Brief to REQ-IDs + architecture contracts
- **propose-changes** — Design-before-code proposal + risk assessment

**Guard**

- **review-security** — STRIDE threat model + verdict
- **review-architecture** — ADR + contract verdict
- **quality-gate** — Multi-domain reviewer router + consolidated gate report (includes waiver template)

**Build**

- **execute-spec** — Specialist implementation + test matrix with traceability

**Close**

- **verify-handoff** — DoD verification + handoff
- **ship-release** — Release notes + changelog + rollback + archive

### Plugin Runtime

- **`plugins/opencode/`** — Split zero-deps V2 runtime (two plugins + shared module + composed entry):
  - **`skills.ts`** (id `frame-ship`) — registers 12 `frame-ship:<stage>` skills via `ctx.skill.transform`, injects workflow card + guardrails + pointers via `ctx.session.hook("context")`, preserves chain across compaction via `ctx.session.hook("compaction")`. `hasMarker()` keeps injection idempotent.
  - **`agents.ts`** (id `frame-ship-agents`) — provisions the 31-agent roster from `agents/*.md` into the global discovery route, enriches every discovered id in place, sets the orchestrator default.
  - **`shared.ts`** — version lockstep target (`header + const VERSION`) + bounded filesystem helpers. Not a plugin (no default export).
  - **`frame-ship.ts`** — composed entry (`package.json` `main`): runs both lanes under the original id `frame-ship`, preserving single-file installs. Never list it together with `skills.ts`.

## Philosophy

- **Excellence as creed** — _"Haces las cosas como para Dios…"_ Non-negotiable.
- **Proposal before code** — Never write code without an approved proposal.
- **Systematic over ad-hoc** — Fixed chain order. Do not skip stages.
- **Deny by default** — No secrets in code/config/logs/examples. Finding without proof (diff/scan/log pointer) = REFUTED. OWASP on every change; new endpoints/boundaries are trust boundaries until proven otherwise.
- **Privacy by minimization** — Minimum PII for purpose; map every PII flow source → store → log → third party; explicit retention + deletion.
- **Evidence over claims** — Always trace `REQ-ID → test → artifact → gate verdict`. Residual risk explicit — no silent PASS.
- **Reference-only packets** — Never paste full context between stages.

Hard rules (non-negotiable):

1. NEVER write code without an approved proposal.
2. NEVER skip security review for auth/data/API changes.
3. NEVER modify architecture contracts without an ADR.
4. NEVER hand off with a CLOSED gate unless waived by orchestrator with waiver record.
5. ALWAYS trace REQ-ID → test → artifact → gate verdict.
6. ALWAYS produce HANDOFF.md before shipping.
7. Reference-only packets between stages — never paste full context.

## Contributing

1. Start at `frame-intent` for initiatives, or `propose-changes` for scoped fixes (proposal first, no code).
2. Keep changes small, traced (`REQ-ID → test → artifact`), and verified.
3. Run `mise run typecheck` before pushing.
4. After any plugin/skill edit: quit + restart opencode (config not hot-reloaded).
5. One problem per change; never approve your own proposal.

Skill frontmatter stays exact: `name: <kebab==dir>`, one-sentence `description` with `Use when/Triggered by`. No extra keys. Body shape: Purpose / Chain / Role / Process / Won't do / References. Creed lives in `SKILL.md` only.

## Updating

Pull latest, restart opencode:

```bash
cd <your-checkout-of-frame-ship>
git pull --ff-only
# quit + restart opencode
```

If updates don't appear (pinned git dep / cache), reinstall the plugin entry. To pin a version:

```jsonc
{
  "plugins": ["frame-ship@git+https://github.com/deuriib/frame-ship.git#v0.9.0"],
}
```

## Developing

Project structure:

```text
./
├── plugin.json                   # agy marker: name frame-ship (agy plugin install .)
├── hooks.json                    # frame-ship-context + safety-gate + format-note
├── hooks/
│   ├── context-inject.ts         # PreInvocation → injectSteps (1:1 context parity, bun)
│   ├── safety-gate.ts            # PreToolUse gate on run_command (bun)
│   ├── format-note.ts            # PostToolUse observer → {} (bun)
│   └── fixtures/                 # replay vectors (allow/deny/secret/{}/first/compact)
├── rules/
│   └── frame-ship.md             # persistent cards, verbatim, version-locked v0.9.0
├── mise.toml                    # Node 22 + tasks (mise install)
├── plugins/
│   └── opencode/
│       ├── INSTALL.md              # install: package (use) + local file (dev)
│       ├── frame-ship.ts           # composed entry (main): both lanes, id frame-ship
│       ├── skills.ts               # plugin: skills lane + session hooks (id frame-ship)
│       ├── agents.ts               # plugin: agents lane (id frame-ship-agents)
│       └── shared.ts               # version lockstep + fs helpers (not a plugin)
├── skills/
│   ├── using-frame-ship/       # → bootstrap + chain contract
│   ├── frame-intent/           # → docs/briefs/BRIEF-<slug>.md + OKRs
│   ├── translate-to-spec/      # → REQ-IDs + ARCHITECTURE.md
│   ├── propose-changes/        # → PROPOSED_CHANGES.md, repo untouched
│   ├── review-security/        # → SECURITY_REVIEW.md + STRIDE verdict
│   ├── review-architecture/    # → ADR + contract verdict
│   ├── execute-spec/           # → impl + test-matrix.md
│   ├── quality-gate/           # → GATE_REPORT.md (multi-reviewer)
│   ├── verify-handoff/         # → HANDOFF.md via DoD
│   └── ship-release/           # → RELEASE_NOTES.md + changelog + rollback
├── tests/                      # harness TBD (see Roadmap)
├── AGENTS.md                   # project knowledge base (source of truth)
├── LICENSE.md                  # MIT
└── README.md
```

Commands:

```bash
# from repo root (mise)
mise run typecheck   # typecheck plugins/opencode/{frame-ship,skills,agents,shared}.ts
mise run install     # npm install in .opencode/

# raw (from repo root)
npx -y -p typescript tsc --noEmit --skipLibCheck --module esnext --target es2022 --moduleResolution bundler plugins/opencode/frame-ship.ts plugins/opencode/skills.ts plugins/opencode/agents.ts plugins/opencode/shared.ts
```

Conventions:

- SKILL frontmatter exact: `name: <kebab==dir>`, 1-sentence `description` with `Use when/Triggered by`. No extra keys.
- Every SKILL body: `# Title — Sub` + creed quote + `Purpose / Chain / Role / Process / Won't do / References`.
- Artifacts SCREAMING: `BRIEF-XXX`, `SPEC-XXX`, `REQ-001`, `PROPOSED_CHANGES.md`, `HANDOFF.md`, `GATE_REPORT.md`, `ARCHITECTURE.md`, `RELEASE_NOTES.md`.
- Chain order fixed — do not skip stages.
- Commits tell a lineal story: `type(scope): imperative lowercase subject ≤72 chars`.

Anti-patterns:

- Code without approved `PROPOSED_CHANGES.md`.
- Skipping `review-security` on auth/data/API; arch change without ADR.
- Handoff on CLOSED gate without c-levels+CEO waiver record.
- Pasting full context between stages — reference-only packets.
- Adding runtime deps to the plugins — all four `plugins/opencode/*.ts` files stay zero-dep (loading the composed entry together with `skills.ts` duplicates id `frame-ship`).
- Editing `references/` without updating parent SKILL `§5`.
- Adding `version/author` to SKILL frontmatter — loader expects `name/description` only.

## Roadmap

- [x] Bootstrap skill `using-frame-ship` (session-start + post-compaction contract)
- [x] General plugin adapters: Antigravity CLI (agy) — root-drop plugin (plugin.json, hooks.json, hooks/*.ts via bun, rules/, skills/ reused verbatim, 1:1 context parity) → Zed → VS Code → rest (one at a time, opencode stays green)
- [ ] `docs/README.<harness>.md` per supported harness
- [ ] Test harness in `tests/` (plugin injection + marker idempotency) + CI typecheck on push
- [ ] `docs/briefs` + `docs/specs` scaffolding (referenced by skills, not yet in repo)
- [ ] Release automation via `ship-release` skill + tagged versions
- [ ] Public flip (explicit): license detection, code of conduct, topics, homepage — repo stays private until then

## License

MIT — see [LICENSE.md](./LICENSE.md).
