# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-15
**Commit:** n/a (not a git repo)
**Branch:** n/a

## OVERVIEW
frame-ship: local opencode plugin + 9-skill Frame→Ship chain. Stack: 1 TS file + 31 Markdown skill templates.

## STRUCTURE
```
./
├── .opencode/plugins/frame-ship.ts  # runtime: injects chain into context
├── skills/<stage>/SKILL.md + references/*.md  # 9 stages, process source of truth
└── tests/  # empty, no harness
```
`docs/briefs|specs/*` referenced by skills does NOT exist in repo.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Change session behavior | `.opencode/plugins/frame-ship.ts` | single-file, zero deps |
| Change stage process | `skills/<stage>/SKILL.md` | 9 files, identical body shape |
| Change output shape | `skills/<stage>/references/` | 22 templates, bracket placeholders |
| Gate routing/waivers | `skills/quality-gate/` | only multi-reviewer domain |
| Plugin deps | `.opencode/package.json` | only `@opencode-ai/plugin@1.18.29`, no scripts |

## CODE MAP
Single runtime export: `export const FrameShipPlugin: Plugin` (`frame-ship.ts:90`).
Hooks: `config` → append `./skills/` to `skills.paths` (idempotent); `experimental.chat.system.transform` → push 3 strings; `experimental.session.compacting` → push reminder. Guard: `hasMarker()` idempotency.

## CONVENTIONS
- SKILL frontmatter exact: `name: <kebab==dir>`, 1-sentence `description` with `Use when/Triggered by`. No extra keys.
- Every SKILL body: `# Title — Sub` + creed quote `> *"Haces las cosas..."* + `1.Purpose/2.Chain/2b.Role/3.Process/4.Won't do/5.References`.
- Artifacts SCREAMING: `BRIEF-XXX`, `SPEC-XXX`, `REQ-001`, `PROPOSED_CHANGES.md`, `HANDOFF.md`, `GATE_REPORT.md`, `ARCHITECTURE.md`, `RELEASE_NOTES.md`.
- Chain order fixed: `frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`.

## ANTI-PATTERNS (THIS PROJECT)
- Code without approved `PROPOSED_CHANGES.md`.
- Skipping `review-security` on auth/data/API; arch change without ADR.
- Handoff on CLOSED gate without c-levels+CEO waiver record.
- Pasting full context between stages — reference-only packets.
- Adding deps to plugin — must stay single-file (`.opencode/.gitignore` hides package.json anyway).

## COMMANDS
```bash
# typecheck plugin (from .opencode/)
npx -y -p typescript tsc --noEmit --skipLibCheck --module nodenext --target es2022 --moduleResolution nodenext plugins/frame-ship.ts
# after any plugin/skill edit: quit + restart opencode (config not hot-reloaded)
```
No build/test scripts in repo. `tests/` empty.

## NOTES
- `.opencode/.gitignore` ignores `node_modules/package.json/package-lock.json/bun.lock` — don't commit those.
- `AGENTS.md` absent before this run; plugin points to it as source of truth — this file fills that gap.
- Case gap: template `ship-release/references/release-notes.md` vs artifact `RELEASE_NOTES.md`.
- Reference suffix inconsistent: `-template.md` (12) vs bare `*-review.md/gate-report.md/threat-model.md` (13+). Don't rename without updating SKILL `§5 References`.
