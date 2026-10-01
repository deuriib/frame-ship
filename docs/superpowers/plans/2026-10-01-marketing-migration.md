# superpowers-marketing Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 15 dev skills with 8 RomuMarketer marketing skills and rewire bootstrap + manifests multi-harness.

**Architecture:** Delete-then-create: remove dev skill dirs and orphaned tests first, then write the 8 marketing SKILL.md files from the spec's anatomy template, then rewire bootstrap entrypoints (Pi extension, OpenCode plugin) and rename manifests. No shims, no dual identity.

**Tech Stack:** Markdown skills (SKILL.md frontmatter), Node/TS bootstrap (Pi extension, OpenCode plugin), JSON manifests.

**Spec:** `docs/superpowers/specs/2026-10-01-marketing-migration-design.md`

## Global Constraints

- Package name is `superpowers-marketing` — never `romumarketer`.
- Bootstrap skill dir is `skills/using-marketing` — never `using-romumarketer`.
- Reemplazo total — no shims, no compat dev, no dual triggers.
- Multi-harness — Pi + OpenCode + manifests, no harness roto.
- Every skill recommendation closes with ROI/intent why.

## Review Focus

- A dev skill dir surviving deletion and double-registering triggers — executor must list `skills/` after deletion and expect exactly the 8 marketing dirs.
- A manifest still pointing at `using-superpowers` bootstrap path — stale path means silent no-bootstrap on that harness.
- A skill `description:` so generic the harness never auto-triggers it — each description must contain its literal trigger words.
- A test dir importing a deleted skill path — orphaned test fails CI after skills are gone.
- A response-voice line slipping back to dev tone ("run the tests", "refactor") — voice must stay ROI/search-intent.

---

### Task 1: Delete dev skills + orphaned tests

**Files:**
- Delete: `skills/brainstorming/`, `skills/diagnosing-superpowers/`, `skills/dispatching-parallel-agents/`, `skills/executing-plans/`, `skills/finishing-a-development-branch/`, `skills/receiving-code-review/`, `skills/requesting-code-review/`, `skills/subagent-driven-development/`, `skills/systematic-debugging/`, `skills/test-driven-development/`, `skills/using-git-worktrees/`, `skills/using-superpowers/`, `skills/verification-before-completion/`, `skills/writing-plans/`, `skills/writing-skills/`
- Delete: `tests/brainstorm-server/`, `tests/systematic-debugging/`, `tests/writing-skills/`, `tests/diagnosing-superpowers/`
- Test: `ls skills/` + `ls tests/`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: empty `skills/` ready for 8 marketing dirs; orphaned test dirs gone.

- [ ] **Step 1: Delete the 15 dev skill dirs**

```bash
git rm -r skills/brainstorming skills/diagnosing-superpowers skills/dispatching-parallel-agents skills/executing-plans skills/finishing-a-development-branch skills/receiving-code-review skills/requesting-code-review skills/subagent-driven-development skills/systematic-debugging skills/test-driven-development skills/using-git-worktrees skills/using-superpowers skills/verification-before-completion skills/writing-plans skills/writing-skills
```
Expected: 15 dirs staged for deletion, no error.

- [ ] **Step 2: Delete the 4 orphaned test dirs**

```bash
git rm -r tests/brainstorm-server tests/systematic-debugging tests/writing-skills tests/diagnosing-superpowers
```
Expected: 4 dirs staged, no error. If a dir does not exist, skip it and note which.

- [ ] **Step 3: Verify skills/ is empty and tests/ has no orphans**

Run: `ls skills/; echo "---"; ls tests/`
Expected: `ls skills/` prints nothing; `tests/` lists no brainstorm-server, systematic-debugging, writing-skills, diagnosing-superpowers.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove dev skills and orphaned tests for marketing migration"
```
Expected: commit created.

### Task 2: Write using-marketing bootstrap skill

**Files:**
- Create: `skills/using-marketing/SKILL.md`
- Test: frontmatter `name: using-marketing` parses; `description` contains "marketing/SEO/content/monetization".

**Interfaces:**
- Consumes: nothing (spec §2 + §4 define content).
- Produces: `skills/using-marketing/SKILL.md` — bootstrap other tasks reference; Pi extension + OpenCode plugin point at this path.

- [ ] **Step 1: Write `skills/using-marketing/SKILL.md`**

Frontmatter:
```yaml
---
name: using-marketing
description: Use when starting any marketing/SEO/content/monetization task - enforces ROI, search intent, rangos C/B/A/S before any action
---
```
Body sections (spec §2 + §4 anatomy): `<SUBAGENT-STOP>` adapted (subagents skip unless marketing task), `<EXTREMELY-IMPORTANT>` 1%-rule verbatim pattern, `## The Rule` (invoke marketing skill BEFORE any response), `## Los 4 principios` (ROI es Dios, search intent, velocidad, rangos C/B/A/S — one line each + 1-sentence why), `## Skill Priority` (nicho → keywords → contenidos → copy → enlaces → monetizar → escalar), `## Red Flags` (table, marketing rationalizations: "esto es solo branding", "publiquemos y ya"), `## Checklist` (ROI declarado, intent clasificado, rango asignado).
Expected: file exists with all 7 sections.

- [ ] **Step 2: Verify frontmatter + triggers**

Run: `head -n 5 skills/using-marketing/SKILL.md && grep -c "ROI\|search intent\|rango" skills/using-marketing/SKILL.md`
Expected: frontmatter shows `name: using-marketing`; grep count ≥ 5.

- [ ] **Step 3: Commit**

```bash
git add skills/using-marketing/SKILL.md && git commit -m "feat: add using-marketing bootstrap skill"
```
Expected: commit created.

### Task 3: Write nichos-rangos + keywords-intent

**Files:**
- Create: `skills/nichos-rangos/SKILL.md`, `skills/keywords-intent/SKILL.md`
- Test: each `description` contains its literal triggers.

**Interfaces:**
- Consumes: `using-marketing` priority order (nicho → keywords).
- Produces: two skill files; Task 4 follows the same anatomy.

- [ ] **Step 1: Write `skills/nichos-rangos/SKILL.md`**

Description: `Use when detecting profitable niches or classifying sites - nicho rentable, rango C/B/A/S, flota`.
Body: `## Cuándo usar` (max 3 triggers), `## Proceso` (1. demanda comercial observable → 2. competencia/rentabilidad → 3. asignar rango C/B/A/S → 4. veredicto entrar/escalar/descartar), `## Porqué negocio` (cada paso cierra con ROI), `## Checklist`.
Expected: file exists, description has "nicho rentable".

- [ ] **Step 2: Write `skills/keywords-intent/SKILL.md`**

Description: `Use when researching keywords or classifying search intent - intención transaccional, informacional, inbound, canibalización`.
Body: `## Proceso` (1. extraer intenciones → 2. clasificar transaccional/informacional/inbound → 3. mapear 1 URL = 1 intent → 4. marcar canibalizaciones), `## Porqué negocio`, `## Checklist`.
Expected: file exists, description has "transaccional".

- [ ] **Step 3: Verify both**

Run: `grep -h "^description:" skills/nichos-rangos/SKILL.md skills/keywords-intent/SKILL.md`
Expected: two description lines, each with its trigger words.

- [ ] **Step 4: Commit**

```bash
git add skills/nichos-rangos/SKILL.md skills/keywords-intent/SKILL.md && git commit -m "feat: add nichos-rangos and keywords-intent skills"
```
Expected: commit created.

### Task 4: Write contenidos-turbo + copy-ctr

**Files:**
- Create: `skills/contenidos-turbo/SKILL.md`, `skills/copy-ctr/SKILL.md`
- Test: contenidos mentions TSA/TSG/TSR; copy mentions CTR.

**Interfaces:**
- Consumes: `keywords-intent` output (1 URL = 1 intent).
- Produces: two skill files; TSA/TSG/TSR live here as templates, nowhere else.

- [ ] **Step 1: Write `skills/contenidos-turbo/SKILL.md`**

Description: `Use when writing or auditing SEO content - contenido SEO, cluster, TSA/TSG/TSR, satisfacer intención`.
Body: `## Proceso` (1. intent de la URL → 2. elegir plantilla TSA (afiliación/categorías) · TSG (volumen informacional) · TSR (reseña profunda) → 3. responder conciso arriba (respuesta directa) → 4. estructura + interlink interno), `## Plantillas TSA/TSG/TSR` (one paragraph each: cuándo + estructura), `## Porqué negocio`, `## Checklist`.
Expected: file contains "TSA", "TSG", "TSR".

- [ ] **Step 2: Write `skills/copy-ctr/SKILL.md`**

Description: `Use when optimizing titles, CTAs or snippets for clicks - CTR, título emotivo, CTA, bloque comparativo`.
Body: `## Proceso` (1. diagnosticar CTR (impresiones vs clics) → 2. reescribir título con ruptura/gatillo emotivo → 3. CTA + bloque comparativo → 4. medir y iterar), `## Porqué negocio`, `## Checklist`.
Expected: file contains "CTR".

- [ ] **Step 3: Verify both**

Run: `grep -c "TSA\|TSG\|TSR" skills/contenidos-turbo/SKILL.md; grep -c "CTR" skills/copy-ctr/SKILL.md`
Expected: both counts ≥ 2.

- [ ] **Step 4: Commit**

```bash
git add skills/contenidos-turbo/SKILL.md skills/copy-ctr/SKILL.md && git commit -m "feat: add contenidos-turbo and copy-ctr skills"
```
Expected: commit created.

### Task 5: Write enlaces-flota + monetizar-web + escalar-analitica

**Files:**
- Create: `skills/enlaces-flota/SKILL.md`, `skills/monetizar-web/SKILL.md`, `skills/escalar-analitica/SKILL.md`
- Test: flota/interlink, AdSense/afiliación, canibalización/CreceTube present.

**Interfaces:**
- Consumes: contenidos-turbo URLs (link targets), rangos (escala).
- Produces: final 3 skills — `skills/` now has exactly 8 dirs.

- [ ] **Step 1: Write `skills/enlaces-flota/SKILL.md`**

Description: `Use when building links between flota sites or planning interlinking - linkbuilding, interlinking, flota, enlazado en cadena`.
Body: `## Proceso` (1. mapa flota (emisores→receptores) → 2. enlazado en cadena por rango (C sostiene B, B sostiene A) → 3. anchors por intent → 4. ritmo/medición), `## Porqué negocio`, `## Checklist`.
Expected: file contains "flota" and "interlink".

- [ ] **Step 2: Write `skills/monetizar-web/SKILL.md`**

Description: `Use when setting up web structure or monetization - monetización, AdSense, afiliación Amazon, web ligera conversión`.
Body: `## Proceso` (1. web ligera (velocidad = conversión) → 2. colocar monetización (AdSense / afiliación / producto) según intent → 3. CTAs + bloques comparativos → 4. verificar clics salida/ingreso), `## Porqué negocio`, `## Checklist`.
Expected: file contains "AdSense" and "afiliación".

- [ ] **Step 3: Write `skills/escalar-analitica/SKILL.md`**

Description: `Use when analyzing performance, fixing cannibalization or scaling - canibalización, escalar nicho, analítica, CreceTube, CTR YouTube`.
Body: `## Proceso` (1. detectar canibalizaciones (2 URLs mismo intent) → 2. fusionar/redirigir y mejorar URL ganadora → 3. escalar rango (C→B→A→S) con datos → 4. CreceTube: embudo impresiones→CTR→retención, SEOLISTAS evergreen alto RPM), `## Porqué negocio`, `## Checklist`.
Expected: file contains "canibalización" and "CreceTube".

- [ ] **Step 4: Verify skills/ has exactly 8 dirs**

Run: `ls skills/`
Expected: using-marketing, nichos-rangos, keywords-intent, contenidos-turbo, copy-ctr, enlaces-flota, monetizar-web, escalar-analitica — and nothing else.

- [ ] **Step 5: Commit**

```bash
git add skills/enlaces-flota/SKILL.md skills/monetizar-web/SKILL.md skills/escalar-analitica/SKILL.md && git commit -m "feat: add enlaces-flota, monetizar-web, escalar-analitica skills"
```
Expected: commit created.

### Task 6: Rewire bootstrap + rename manifests

**Files:**
- Modify: `.pi/extensions/superpowers.ts` (bootstrap path + marker text), `.opencode/plugins/superpowers.js` (bootstrap/voice text), `package.json` (name + description), `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`, plus `.devin-plugin/`, `.kimi-plugin/`, `.muse-plugin/` equivalents if present, `index.js` re-export comment if it names superpowers voice.
- Delete or rewrite: `skills/using-superpowers/references/` equivalents — not recreated; new skills carry no per-harness refs (YAGNI).
- Test: `grep -rn "using-superpowers\|name.*superpowers\"" --include="*.ts" --include="*.js" --include="*.json" .pi .opencode index.js package.json .claude-plugin .codex-plugin` returns no stale refs.

**Interfaces:**
- Consumes: `skills/using-marketing/SKILL.md` path from Task 2.
- Produces: working bootstrap on Pi + OpenCode pointing at using-marketing; manifests named superpowers-marketing.

- [ ] **Step 1: Rewire `.pi/extensions/superpowers.ts` to using-marketing**

Replace `bootstrapSkillPath` (`using-superpowers` → `using-marketing`), `BOOTSTRAP_MARKER` text, and injected preamble ("You have superpowers" → marketing voice, e.g. "You have superpowers-marketing: ROI, search intent, rangos").
Expected: file contains `using-marketing`, zero occurrences of `using-superpowers`.

- [ ] **Step 2: Update `.opencode/plugins/superpowers.js` bootstrap text**

Same voice swap; skill dir resolution stays `skills/` (no path change needed beyond bootstrap skill name if hardcoded).
Expected: zero occurrences of `using-superpowers`; bootstrap names `using-marketing`.

- [ ] **Step 3: Rename package + manifests**

`package.json`: name → `superpowers-marketing`, description → marketing voice. Each `plugin.json`/`marketplace.json`: name/description → superpowers-marketing voice.
Expected: `grep -rn "\"superpowers\"" package.json` empty; manifests read superpowers-marketing.

- [ ] **Step 4: Verify no stale refs**

Run: `grep -rn "using-superpowers" .pi .opencode index.js package.json .claude-plugin .codex-plugin .devin-plugin .kimi-plugin .muse-plugin 2>/dev/null; echo "EXIT:$?"`
Expected: no matches (EXIT:1 from grep = clean).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: rewire bootstrap to using-marketing, rename to superpowers-marketing"
```
Expected: commit created.

### Task 7: Rewrite repo voice (README, AGENTS.md, GEMINI.md) + release note

**Files:**
- Modify: `README.md`, `AGENTS.md`, `GEMINI.md`, `RELEASE-NOTES.md`
- Test: no dev-skill names (brainstorming, TDD, systematic-debugging) remain in README/AGENTS.md outside history sections.

**Interfaces:**
- Consumes: final skill list from Task 5.
- Produces: repo reads as superpowers-marketing fork; release note entry documents the migration.

- [ ] **Step 1: Rewrite `README.md` voice + skill table**

Replace dev workflow narrative with RomuMarketer narrative (ROI, Flota 8 etapas, TSA/TSG/TSR, CreceTube); skill table lists the 8 marketing skills with their trigger descriptions.
Expected: README contains "superpowers-marketing", "ROI", "Flota", "TSA/TSG/TSR"; no standalone dev skill table.

- [ ] **Step 2: Rewrite `AGENTS.md` contributor voice**

Keep PR requirements intact; change identity/voice lines from dev methodology to marketing methodology (what contributors add: marketing skills, triggers, measurement).
Expected: AGENTS.md keeps PR template + dev-branch rules byte-identical; only voice/scope lines change.

- [ ] **Step 3: Update `GEMINI.md` + `RELEASE-NOTES.md`**

GEMINI.md: same voice swap, minimal. RELEASE-NOTES.md: prepend entry `## superpowers-marketing migration — 2026-10-01` (reemplazo total, 8 skills, bootstrap using-marketing, multi-harness).
Expected: both files updated.

- [ ] **Step 4: Final verification — full sweep**

Run: `ls skills/; echo "---"; grep -rln "brainstorming\|test-driven-development\|systematic-debugging\|subagent-driven-development" skills/ README.md AGENTS.md package.json .pi .opencode 2>/dev/null; echo "EXIT:$?"`
Expected: `ls` shows exactly 8 dirs; grep EXIT:1 (no stale dev refs outside docs/superpowers history + RELEASE-NOTES history).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "docs: rewrite repo voice to superpowers-marketing + release note"
```
Expected: commit created.
