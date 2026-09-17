# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-16
**Commit:** 42e566f (repo git verificado vía `git rev-parse --short HEAD`)
**Branch:** main (verificada vía `git branch --show-current`)

## OVERVIEW

frame-ship: local opencode plugin + 9-skill Frame→Ship chain (+ bootstrap + 3 supporting skills). Stack: 1 TS runtime (154 lines, v0.5.0) + `skills/` templates + `docs/` artifact store.

## STRUCTURE

```
./
├── .opencode/plugins/frame-ship.ts  # runtime: injects chain into context (ver `.opencode/plugins/AGENTS.md`)
├── skills/<stage>/SKILL.md + references/*.md  # 13 dirs (bootstrap + 9 stages + 3 supporting), process source of truth (ver `skills/AGENTS.md`)
├── docs/briefs/ + docs/specs/10_design|15_requirements|20_backlog|30_delivery|40_workspace|50_archive/  # artifact lifecycle (ver `docs/AGENTS.md`, `docs/specs/AGENTS.md`)
├── tests/ harness TBD (see Roadmap)
├── mise.toml  # toolchain: node 22, tasks typecheck/install
└── package.json  # v0.5.0 (matches plugin header)
```

## WHERE TO LOOK

| Task                                  | Location                                              | Notes                                                   |
| ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Change session behavior               | `.opencode/plugins/frame-ship.ts`                     | single-file, zero deps                                  |
| Change stage process                  | `skills/<stage>/SKILL.md`                             | 13 dirs (10 chain + 3 supporting), identical body shape |
| Supporting skills (worktree/debug/pr) | `skills/git-worktree/`, `debugging/`, `pull-request/` | opt-in transversal tools                                |
| Change output shape                   | `skills/<stage>/references/`                          | bracket placeholders                                    |
| Gate routing/waivers                  | `skills/quality-gate/`                                | only multi-reviewer domain                              |
| Find briefs/specs/releases            | `docs/briefs/`, `docs/specs/`                         | lifecycle 10→50, per-domain workspace                   |
| Plugin deps                           | `.opencode/package.json`                              | only `@opencode-ai/plugin@1.18.29`, no scripts          |
| Toolchain                             | `mise.toml`                                           | `mise run typecheck`, `mise run install`                |

## CODE MAP

Single runtime export: `export const FrameShipPlugin: Plugin` (+ mirrored `default`) (`frame-ship.ts:119-154`).
Hooks: `config` → append `<root>/skills` to `skills.paths` (idempotent); `experimental.chat.system.transform` → push 3 cards + live bootstrap body; `experimental.session.compacting` → push reminder. Guards: `hasMarker()` idempotency, early-return if system/context not array.
Resolvers: `resolveSkillsDir()` from own `import.meta.url` (fallback `directory||worktree`); `loadBootstrapBody()` `Bun.file` → dynamic `node:fs/promises`, per-path cache; `fileUrlToPath()` win32 drive fix.

## CONVENTIONS

- SKILL frontmatter exact: `name: <kebab==dir>`, 1-sentence `description` with `Use when/Triggered by`. No extra keys.
- Every SKILL body: `# Title — Sub` + creed quote `> *"Haces las cosas..."* + `1.Purpose/2.Chain/2b.Role/3.Process/4.Won't do/5.References` (`quality-gate`inserta`3.Routing Table`, desplaza resto a `§5/§6`).
- Artifacts SCREAMING: `BRIEF-XXX`, `SPEC-XXX`, `REQ-001`, `PROPOSED_CHANGES.md`, `HANDOFF.md`, `GATE_REPORT.md`, `ARCHITECTURE.md`, `RELEASE_NOTES.md`.
- Chain order fixed: `frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`.
- Reference-only packets: `SPEC/HARD/GATE/DOMAINS` between stages; retry N=2 → escalate orchestrator, no 3rd loop.
- Version bump triple: header comment + `VERSION` + `MARKER` juntos.
- Skills reference naming convention: `frame-ship:<stage>` (no `frame-ship:` prefix in SKILL frontmatter `name`).

## ANTI-PATTERNS (THIS PROJECT)

- Code without approved `PROPOSED_CHANGES.md`.
- Skipping `review-security` on auth/data/API; arch change without ADR.
- Handoff on CLOSED gate without waiver record.
- Pasting full context between stages — reference-only packets.
- Adding deps to plugin — must stay single-file (`.opencode/.gitignore` hides package.json anyway).
- Shadowing built-in `/init` or touching `~/.config/opencode/` — project scope only.

## COMMANDS

```bash
# typecheck plugin (mise wrapper, dir=.opencode)
mise run typecheck
# npx -y -p typescript tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts
mise run install  # dir=.opencode, npm install
# after any plugin/skill edit: quit + restart opencode (config not hot-reloaded)
```

No build/test scripts in repo. `tests/` empty.

## NOTES

- `.opencode/.gitignore` ignores `node_modules/package.json/package-lock.json/bun.lock` — don't commit those.
- Sub-AGENTS map: `skills/AGENTS.md` (chain + 8-domain catalogue) → `skills/quality-gate/AGENTS.md` (router split); `.opencode/plugins/AGENTS.md` (runtime); `docs/AGENTS.md` → `docs/specs/AGENTS.md` (artifact lifecycle).
- Case gap: template `ship-release/references/release-notes.md` vs artifact `RELEASE_NOTES.md`. Regla: template minúsculas → artefacto MAYÚSCULAS; no renombrar sin actualizar SKILL `§5 References`.
- Reference suffix inconsistent: `-template.md` (12) vs bare `*-review.md/gate-report.md/threat-model.md` (13+). Don't rename without updating SKILL `§5 References`.
- Version aligned: root `package.json` v0.5.0 matches plugin header `v0.5.0` — bump header comment + `VERSION` + `MARKER` + manifest together on next release.
