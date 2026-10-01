# superpowers-marketing Migration Design

**Date:** 2026-10-01
**Status:** Approved sections s1–s4, s5 in progress
**Decisions:** reemplazo total · fork renombrado · package `superpowers-marketing` · bootstrap `using-marketing` · multi-harness · eliminar skills dev

## 1. Skill map (8 dirs)

| Dir | Cubre (Flota / prompt) |
|-----|------------------------|
| `using-marketing` | Bootstrap: ROI es Dios, search intent, velocidad, rangos C/B/A/S |
| `nichos-rangos` | Etapa 1: detección nichos rentables + clasificación C/B/A/S |
| `keywords-intent` | Etapa 3: transaccionales, informacionales, inbound |
| `contenidos-turbo` | Etapa 4 + plantillas TSA / TSG / TSR |
| `copy-ctr` | Etapa 6: títulos emotivos, CTAs, bloques comparativos |
| `enlaces-flota` | Etapa 5: linkbuilding + interlinking entre flota |
| `monetizar-web` | Etapas 2+7: web ligera conversión + AdSense/afiliación |
| `escalar-analitica` | Etapa 8: canibalizaciones, mejora URLs, escala + CreceTube |

Replaces all 15 dev skills. No shims.

## 2. Bootstrap + wiring

`using-marketing/SKILL.md` enforces per session:

1. ROI es Dios — every action declares expected return or is dropped.
2. Search intent rules — CTR + dwell over keyword stuffing.
3. Speed > perfection — launch, measure, optimize.
4. Rangos C/B/A/S — classify each site before investing.

Wiring (rename, no path changes):

1. `.opencode/plugins/superpowers.js` + `index.js` — read `skills/`, voice update only.
2. `.pi/extensions/superpowers.ts` — bootstrap text update.
3. Manifests (`.claude-plugin/`, `.codex-plugin/`, etc.) — name `superpowers-marketing`, marketing description.
4. `package.json` — name `superpowers-marketing`.
5. `AGENTS.md`, `README.md`, `GEMINI.md` — RomuMarketer voice.

## 3. Deletions

1. `skills/` — delete 15 dev dirs, add 8 marketing dirs.
2. `tests/` — delete `brainstorm-server`, `systematic-debugging`, `writing-skills`, `diagnosing-superpowers` (orphaned).
3. `hooks/`, `scripts/brainstorm-*` — review, delete dev-only.
4. `docs/superpowers/plans|specs` — keep as history, do not migrate.
5. `RELEASE-NOTES.md` — keep + new entry. `evals/` untouched (external repo).

## 4. Skill anatomy (all 8)

1. Frontmatter `name:` + `description:` with literal triggers ("nicho rentable", "canibalización", "CTR YouTube").
2. `## Cuándo usar` — max 3 triggers, first line.
3. `## Proceso` — numbered steps, one bounded action each.
4. `## Porqué negocio` — every recommendation closes with ROI/intent why.
5. `## Checklist` — verification before done-claims.

`using-marketing` description:

> Use when starting any marketing/SEO/content/monetization task - enforces ROI, search intent, rangos C/B/A/S before any action

## 5. Implementation

1. This spec → `writing-plans` generates implementation plan.
2. Execution method chosen by human partner (inline vs subagents).
3. Response voice for all skills: transparent, pragmatic, no fluff; every recommendation carries strategic business why.
