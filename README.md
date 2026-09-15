# frame-ship

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

![Node](https://img.shields.io/badge/node-22%20LTS-339933?logo=node.js&logoColor=white)
![Mise](https://img.shields.io/badge/mise-managed-7950ED?logo=mise&logoColor=white)
![Opencode](https://img.shields.io/badge/opencode-plugin-000000?logo=openai&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Private](https://img.shields.io/badge/repo-private-lightgrey)

**Opencode plugin + 9-skill chain — Frame→Ship workflow (frame-intent to ship-release).**

Local opencode plugin that injects the Frame→Ship contract into every session, plus 9 stage skills as the process source of truth. Single-file runtime, zero dependencies, idempotent injection, compaction-safe.

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [The 9-Stage Chain](#the-9-stage-chain)
- [Commands](#commands)
- [Conventions](#conventions)
- [Anti-Patterns](#anti-patterns)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- **Single-file plugin** — `.opencode/plugins/frame-ship.ts` (v0.1.0), `import type { Plugin }` only.
- **9 skills, full lifecycle** — from strategic brief (`BRIEF-XXX`) to release (`RELEASE_NOTES.md`).
- **Guardrails built-in** — OWASP by default, deny-by-default secrets, Ley 172-13 PII hygiene, calibrated severity.
- **Role bindings** — `montilla` (briefs/releases), `vasquez` (architecture), `barrera` (security), leaf specialists implement.
- **Traceability** — every step traces `REQ-ID → test → artifact → gate verdict`.
- **Compaction-safe** — chain reminder survives long sessions via `experimental.session.compacting`.
- **Reproducible env** — `mise` pins Node 22 LTS + tasks.

## How It Works

1. Plugin hook `experimental.chat.system.transform` pushes 3 strings: `WORKFLOW_CARD` + `GUARDRAILS_FULL` + `POINTERS`.
2. `hasMarker()` guard keeps injection idempotent — no duplication on retries.
3. `experimental.session.compacting` pushes 1 reminder so the chain survives compaction.
4. Skills in `skills/<stage>/SKILL.md` define behavior. Plugin only injects pointers; skills are authoritative.

```text
frame-intent → translate-to-spec → propose-changes → review-security/review-architecture
  → execute-spec → quality-gate → verify-handoff → ship-release
```

## Project Structure

```text
./
├── mise.toml                    # Node 22 + tasks (mise install)
├── .opencode/
│   └── plugins/
│       └── frame-ship.ts       # runtime: injects chain into context (ONLY committed artifact here)
├── skills/
│   ├── frame-intent/           # → docs/briefs/BRIEF-<slug>.md + OKRs
│   ├── translate-to-spec/      # → REQ-IDs + ARCHITECTURE.md
│   ├── propose-changes/        # → PROPOSED_CHANGES.md, repo untouched
│   ├── review-security/        # → SECURITY_REVIEW.md + STRIDE verdict
│   ├── review-architecture/    # → ADR + contract verdict
│   ├── execute-spec/           # → impl + test-matrix.md
│   ├── quality-gate/           # → GATE_REPORT.md (15 files, multi-reviewer)
│   ├── verify-handoff/         # → HANDOFF.md via DoD
│   └── ship-release/           # → RELEASE_NOTES.md + changelog + rollback
├── tests/                      # empty, no harness yet
├── AGENTS.md                   # project knowledge base (source of truth)
├── LICENSE.md                  # MIT
└── README.md
```

> Note: `.opencode/.gitignore` hides `node_modules/package.json/package-lock.json/bun.lock` — the plugin file itself is the only committed runtime artifact in `.opencode/`.

## Prerequisites

- [mise](https://mise.jdx.dev/) (version manager)
- Git + [GitHub CLI (`gh`)](https://cli.github.com/) authenticated
- Node 22 LTS (via `mise install` — no manual install needed)
- [opencode](https://opencode.ai/) — restart after any plugin/skill edit (config not hot-reloaded)

## Quickstart

```bash
# 1. Clone (private repo)
gh repo clone deuriib/frame-ship
cd frame-ship

# 2. Trust + install toolchain
mise trust
mise install

# 3. Install plugin deps + typecheck
mise run install
mise run typecheck

# 4. Restart opencode to pick up plugin/skills
# quit + restart opencode
```

Verify:

```bash
mise exec -- node --version   # expect v22.x
git status                    # clean
```

## The 9-Stage Chain

| Trigger | Skill | Owner | Output |
|---------|-------|-------|--------|
| new initiative / OKRs | `frame-intent` | `montilla` | `BRIEF-<slug>.md` |
| brief approved | `translate-to-spec` | C-levels | REQ-IDs + `ARCHITECTURE.md` |
| ready to implement | `propose-changes` | specialist + C-level | `PROPOSED_CHANGES.md`, repo untouched |
| auth/data/API | `review-security` | `barrera` | STRIDE verdict |
| public API/model | `review-architecture` | `vasquez` | ADR |
| approved spec | `execute-spec` | backend/frontend/devops | impl + `test-matrix.md` |
| impl done | `quality-gate` | owning C-level | `GATE_REPORT.md` |
| complete | `verify-handoff` | owning C-level | `HANDOFF.md` |
| verified | `ship-release` | `montilla` + devops | notes + changelog + rollback |

Hard rules (non-negotiable):

1. NEVER write code without an approved proposal.
2. NEVER skip security review for auth/data/API changes.
3. NEVER modify architecture contracts without an ADR.
4. NEVER hand off with a CLOSED gate unless waived by c-levels + CEO with waiver record.
5. ALWAYS trace REQ-ID → test → artifact → gate verdict.
6. ALWAYS produce HANDOFF.md before shipping.
7. Reference-only packets between stages — never paste full context.

## Commands

```bash
# from repo root (mise)
mise run typecheck   # typecheck .opencode/plugins/frame-ship.ts
mise run install     # npm install in .opencode/

# raw (from .opencode/)
npx -y -p typescript tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts
```

No build/test scripts in repo. `tests/` is empty — harness TBD (see Roadmap).

## Conventions

- SKILL frontmatter exact: `name: <kebab==dir>`, 1-sentence `description` with `Use when/Triggered by`. No extra keys.
- Every SKILL body: `# Title — Sub` + creed quote + `Purpose / Chain / Role / Process / Won't do / References`.
- Artifacts SCREAMING: `BRIEF-XXX`, `SPEC-XXX`, `REQ-001`, `PROPOSED_CHANGES.md`, `HANDOFF.md`, `GATE_REPORT.md`, `ARCHITECTURE.md`, `RELEASE_NOTES.md`.
- Chain order fixed — do not skip stages.
- Commits tell a lineal story: `type(scope): imperative lowercase subject ≤72 chars`.

## Anti-Patterns

- Code without approved `PROPOSED_CHANGES.md`.
- Skipping `review-security` on auth/data/API; arch change without ADR.
- Handoff on CLOSED gate without c-levels+CEO waiver record.
- Pasting full context between stages — reference-only packets.
- Adding deps to plugin — must stay single-file.
- Editing `references/` without updating parent SKILL `§5`.
- Adding `version/author` to SKILL frontmatter — loader expects `name/description` only.

## Contributing

1. Start at `frame-intent` for initiatives, or `propose-changes` for scoped fixes (proposal first, no code).
2. Keep changes small, traced (`REQ-ID → test → artifact`), and verified.
3. Run `mise run typecheck` before pushing.
4. After any plugin/skill edit: quit + restart opencode.

## Roadmap

- [ ] Test harness in `tests/` (plugin injection + marker idempotency)
- [ ] CI: typecheck on push via GitHub Actions
- [ ] `docs/briefs` + `docs/specs` scaffolding (referenced by skills, not yet in repo)
- [ ] Release automation via `ship-release` skill

## License

MIT — see [LICENSE.md](./LICENSE.md).
