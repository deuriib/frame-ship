# Frame-ship Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renombrar superpowers a frame-ship con invocación `frame-ship:{domain}:{skill}` en los 10 dominios, corte limpio, cero `superpower` en superficie viva.

**Architecture:** TDD por capas: primero tests guardia que fallan (marca prohibida + parser tres segmentos), luego identidad+runtime+skills en core `dev` (main), después réplica en las 9 ramas de dominio (un task por rama), y cierre con docs vivos + MIGRATION.md + verificación final. Cada rama se trabaja en su worktree (`C:/Users/deuri/Projects/superpowers/.worktrees/<dominio>`).

**Tech Stack:** Bash + grep (marca), Node `node:test` (pi/opencode/brainstorm-server), pytest (hermes), JSON manifests, SKILL.md frontmatter.

**Spec:** `docs/frame-ship/specs/rebrand-spec.md`

## Global Constraints

- Invocación vinculante: `frame-ship:{domain}:{skill}`, tercer segmento = nombre exacto del directorio del skill (ej. `frame-ship:product:product-discovery`, NUNCA `frame-ship:product:discovery`).
- Dominios (10): `dev` (main, `skills/`, 15 skills), `product` (13), `security` (8), `devops` (15), `finance` (14), `legal` (8), `marketing` (8), `people` (8), `revenue` (7), `automation-roi` (7).
- Corte limpio: ningún alias funcional `superpowers:` sobrevive; solo mensaje de error ruidoso con equivalencia + link a `MIGRATION.md`.
- Alcance vivo únicamente: historia intacta — `RELEASE-NOTES.md`, `docs/plans/*`, `docs/superpowers/plans/*` NO se tocan.
- Autoría viva: `Deuri Vasquez <deuriib@gmail.com>`, `github.com/deuriib/frame-ship`; `FUNDING.yml` → `github: [deuriib]`.
- Atribución mínima obligatoria en `README.md` y `MIGRATION.md`: `Based on obra/superpowers (MIT)`.
- Versión `6.4.2` se conserva en todos los `package.json`; el rebrand no bumpea versión.
- Excepción intencional: `Skill-Name-With-Hyphens` en `skills/writing-skills/SKILL.md:107` es placeholder de documentación, NO se renombra y va allowlisteado en el test guardia.
- Marca ajena `primeradiant.com` en `tests/brainstorm-server/branding.test.js` es del visual companion, fuera de scope.
- Renames físicos via `git mv` (preserva historia): `superpowers.ts`→`frame-ship.ts`, `superpowers.js`→`frame-ship.js`, `skills/using-superpowers`→`skills/using-frame-ship`, `skills/diagnosing-superpowers`→`skills/diagnosing-frame-ship`.

## Workflow Guardrails G1-G5 (blocking, every task, stack-agnostic)

- **G1 Test-with-change:** each behavior/fix task ships new/updated test; docs typo-only exempt.
- **G2 Layout + type by risk:** unit + integration + e2e + regression + acceptance/BDD in `tests/unit|integration|e2e|fixtures|helpers`; extras (contract, security/STRIDE, architecture/fitness, perf/bench, mutation/property, chaos, smoke, attestation) only when boundary demands.
- **G3 Coverage floors (defaults):** line ≥80% / branch ≥75% / function ≥85%; critical ≥95% / ≥90% / ≥95%; P0 100% trace. Unit suite <30s, zero flaky tolerance.
- **G4 Blocking verify:** no step done on red/unrun; skipped/flaky named with owner + reason.
- **G5 Engineering standards:** strict types, no unsafe escapes w/o proof; pure core/edges; Result, timeouts/retries/breakers/idempotency; ADR mandatory; atomic Conventional Commits with type-check + tests + coverage + security evidence.

## Review Focus

- Invocación de dos segmentos `frame-ship:brainstorming` → debe dar error ruidoso con la forma de tres segmentos, no resolver en silencio.
- Invocación vieja `superpowers:brainstorming` → debe dar error ruidoso con equivalencia `frame-ship:dev:brainstorming` + link a MIGRATION.md.
- Dominio inexistente `frame-ship:nope:algo` → error ruidoso listando los 10 dominios válidos.
- Skill inexistente `frame-ship:dev:nope` → error ruidoso, no inyección de bootstrap parcial.
- Bootstrap `using-frame-ship` debe seguir inyectándose una sola vez por sesión (idempotencia del marker) tras el rename de paths.

---
### Task 1: Tests guardia TDD (marca prohibida + invocación tres segmentos)

**Files:**
- Create: `tests/frame-ship/test-brand-guard.sh`
- Create: `tests/frame-ship/test-invocation.mjs`
- Test: `tests/frame-ship/test-brand-guard.sh`, `tests/frame-ship/test-invocation.mjs`

**Interfaces:**
- Consumes: nada (primer task).
- Produces: `isValidInvocation(ref: string) -> { brand: 'frame-ship', domain: string, skill: string } | throws Error` (contrato que Tasks 4–13 implementan por runtime); `VALID_DOMAINS: string[]` = los 10 del spec; `brandGuardAllowlist: string[]` = historia + `Skill-Name-With-Hyphens` + `MIGRATION.md`.

- [ ] **Step 1: Write the failing brand-guard test**

```bash
# tests/frame-ship/test-brand-guard.sh
# FAIL si grep -ri "superpower" encuentra algo fuera de:
# .git/, RELEASE-NOTES.md, docs/plans/, docs/superpowers/plans/,
# docs/frame-ship/specs/, MIGRATION.md (menciona el corte),
# skills/writing-skills/SKILL.md (línea Skill-Name-With-Hyphens)
```

- [ ] **Step 2: Write the failing invocation test**

```js
// tests/frame-ship/test-invocation.mjs (node:test)
test('acepta frame-ship:dev:brainstorming', () => {
  assert.deepEqual(isValidInvocation('frame-ship:dev:brainstorming'),
    { brand: 'frame-ship', domain: 'dev', skill: 'brainstorming' });
});
test('acepta frame-ship:product:product-discovery (tercer segmento exacto)', () => {
  assert.deepEqual(isValidInvocation('frame-ship:product:product-discovery'),
    { brand: 'frame-ship', domain: 'product', skill: 'product-discovery' });
});
test('rechaza dos segmentos frame-ship:brainstorming', () => {
  assert.throws(() => isValidInvocation('frame-ship:brainstorming'), /tres segmentos/);
});
test('rechaza superpowers:brainstorming con equivalencia', () => {
  assert.throws(() => isValidInvocation('superpowers:brainstorming'), /frame-ship:dev:brainstorming/);
});
test('rechaza dominio inválido con lista de 10', () => {
  assert.throws(() => isValidInvocation('frame-ship:nope:algo'), /dev.*product.*security/);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `bash tests/frame-ship/test-brand-guard.sh; node --test tests/frame-ship/test-invocation.mjs`
Expected: FAIL en ambos (marca presente hoy; `isValidInvocation` no existe).

- [ ] **Step 4: Implement stub mínimo `isValidInvocation` + allowlist en los propios tests**

`isValidInvocation(ref: string)` en `tests/frame-ship/invocation.mjs`: regex `^frame-ship:([a-z-]+):([a-z-]+)$`, valida dominio contra los 10, mensaje de error con equivalencia para `superpowers:X` → `frame-ship:dev:X`.

- [ ] **Step 5: Run tests to verify guard behavior**

Run: `bash tests/frame-ship/test-brand-guard.sh` (sigue FAIL hasta completar Tasks 2–14, eso es esperado y se documenta); `node --test tests/frame-ship/`
Expected: invocation PASS, brand-guard FAIL con lista de archivos pendientes (línea base del rename).

- [ ] **Step 6: Commit**

```bash
git add tests/frame-ship/
git commit -m "test: add frame-ship brand-guard and 3-segment invocation tests"
```

---
### Task 2: Core dev — identidad + runtime (main)

**Files:**
- Modify: `package.json` (`name` → `frame-ship`, description, `pi` paths si cambian)
- Modify: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `.devin-plugin/plugin.json`, `.kimi-plugin/plugin.json`, `.muse-plugin/plugin.json`, `.agents/plugins/marketplace.json`, `gemini-extension.json`, `GEMINI.md`, `index.js`, `.github/FUNDING.yml`, `.gitignore` (solo si nombra)
- Rename (git mv): `.pi/extensions/superpowers.ts` → `.pi/extensions/frame-ship.ts`, `.opencode/plugins/superpowers.js` → `.opencode/plugins/frame-ship.js`
- Modify: `.hermes-plugin/__init__.py`, `.hermes-plugin/plugin.yaml`, `hooks/session-start`, `scripts/package-codex-plugin.sh`, `scripts/sync-to-codex-plugin.sh`
- Test: `tests/pi/test-pi-extension.mjs`, `tests/hermes/test_plugin.py`, `tests/hooks/test-session-start.sh`

**Interfaces:**
- Consumes: `VALID_DOMAINS` de Task 1 (dominio `dev` para este task).
- Produces: `BOOTSTRAP_MARKER = "frame-ship:dev:using-frame-ship bootstrap for <runtime>"` por runtime; `bootstrapSkillPath = skills/using-frame-ship/SKILL.md`; `defaultExportId = 'frame-ship'`; autoría `Deuri Vasquez <deuriib@gmail.com>`.

- [ ] **Step 1: Update failing assertions to the new identity**

En `tests/pi/test-pi-extension.mjs`: `assert.equal(pkg.name, 'frame-ship')`, extension path `frame-ship.ts`, bootstrap path `using-frame-ship`. En `tests/hermes/test_plugin.py`: `BOOTSTRAP_MARKER = "frame-ship:dev:using-frame-ship bootstrap for hermes"`. En `tests/hooks/test-session-start.sh`: espera `frame-ship:dev:using-frame-ship`.

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/pi/test-pi-extension.mjs; python -m pytest tests/hermes/ -x -q; bash tests/hooks/test-session-start.sh`
Expected: FAIL (código aún con marca vieja).

- [ ] **Step 3: Rename + rewrite identity in `package.json`, 8 manifiestos, `GEMINI.md`, `index.js`, `FUNDING.yml`**

Valores exactos: `author.name = "Deuri Vasquez"`, `author.email = "deuriib@gmail.com"`, urls `https://github.com/deuriib/frame-ship`, `FUNDING.yml` → `github: [deuriib]`. `package.json:name = "frame-ship"`.

- [ ] **Step 4: Rename + rewrite `.pi/extensions/frame-ship.ts`, `.opencode/plugins/frame-ship.js`, `.hermes-plugin/__init__.py`, `hooks/session-start`, `scripts/*.sh`**

`BOOTSTRAP_MARKER`, `bootstrapSkillPath`/`skillPath`/`_skills_dir`, `superpowersSkillsDir` → `frameShipSkillsDir`, `SuperpowersPlugin` → `FrameShipPlugin` (mantener alias de exportación vieja SOLO si el harness lo exige para no romper carga, documentarlo), `id: 'frame-ship'`, logs `[frame-ship]`, textos `You have superpowers.` → `You have frame-ship (dev).`, `skill_view("superpowers:...")` → `skill_view("frame-ship:dev:...")`, install url `deuriib/frame-ship`.

- [ ] **Step 5: Run runtime tests to verify they pass**

Run: `node --test tests/pi/ tests/opencode/; python -m pytest tests/hermes/ -q; bash tests/hooks/test-session-start.sh`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor!: rebrand core dev identity and runtime to frame-ship"
```

---
### Task 3: Core dev — 15 skills + router using-frame-ship (main)

**Files:**
- Rename (git mv): `skills/using-superpowers` → `skills/using-frame-ship`, `skills/diagnosing-superpowers` → `skills/diagnosing-frame-ship`
- Modify: `skills/using-frame-ship/SKILL.md` (router con tabla de 10 dominios), `skills/diagnosing-frame-ship/SKILL.md`, y body de los otros 13 `skills/*/SKILL.md` solo donde aparezca marca o `superpowers:` (verificar con grep por archivo)
- Test: `tests/explicit-skill-requests/`, `tests/diagnosing-superpowers/` (renombrar dir a `tests/diagnosing-frame-ship/` si nombra la marca)

**Interfaces:**
- Consumes: `bootstrapSkillPath` de Task 2.
- Produces: skill invokable `frame-ship:dev:<skill>` para los 15; router `using-frame-ship` que clasifica y delega a `frame-ship:{domain}:{skill}`.

- [ ] **Step 1: Update skill tests to `frame-ship:dev:*`**

Referencias `superpowers:brainstorming`, `superpowers:finishing-a-development-branch`, `superpowers:subagent-driven-development` → `frame-ship:dev:brainstorming`, `frame-ship:dev:finishing-a-development-branch`, `frame-ship:dev:subagent-driven-development`.

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/explicit-skill-requests/ 2>/dev/null || bash tests/test-explicit*.sh 2>/dev/null; ls tests/diagnosing-superpowers/`
Expected: FAIL / paths viejos.

- [ ] **Step 3: Rename dirs + frontmatter `name:` + body**

`name: using-superpowers` → `name: using-frame-ship`; `name: diagnosing-superpowers` → `name: diagnosing-frame-ship`. Body: `superpowers:<s>` → `frame-ship:dev:<s>`; prosa `Superpowers` → `Frame-ship`. Router `using-frame-ship/SKILL.md`: regla clasificar → delegar `frame-ship:{domain}:{skill}` con tabla de señales (base: `docs/proposals/using-superpowers-v2-router.md`).

- [ ] **Step 4: Run skill tests to verify they pass**

Run: `grep -ri "superpowers:" skills/ | grep -v writing-skills || echo CLEAN; <suite de skill-requests>`
Expected: CLEAN (salvo placeholder allowlisteado) + PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor!: rename core skills to frame-ship:dev:* with domain router"
```

---
### Task 4: Parser tres segmentos + rechazo ruidoso (main, pi/opencode/hermes/hooks)

**Files:**
- Modify: `.pi/extensions/frame-ship.ts` (strip de prefijo + flag `forceSuperpowers` → `forceFrameShip`), `.opencode/plugins/frame-ship.js` (mismo), `.hermes-plugin/__init__.py` (idem), `hooks/session-start` (texto `superpowers:using-superpowers` → `frame-ship:dev:using-frame-ship`)
- Test: `tests/frame-ship/test-invocation.mjs` (Task 1) + suites de Task 2

**Interfaces:**
- Consumes: `isValidInvocation` (contrato Task 1).
- Produces: cada runtime parsea `frame-ship:{domain}:{skill}`, rechaza 2 segmentos y `superpowers:*` con mensaje `Soy frame-ship. Usa <equivalencia>. Ver MIGRATION.md`.

- [ ] **Step 1: Add rejection tests per runtime (pi + opencode + hermes)**

```js
test('pi ext rechaza superpowers:brainstorming con equivalencia', ...)
test('opencode rechaza frame-ship:brainstorming (dos segmentos)', ...)
```

```python
def test_hermes_rejects_two_segments(...): ...
```

```js
test('rechaza skill inexistente sin inyección parcial', () => {
  assert.throws(() => isValidInvocation('frame-ship:dev:nope'), /skill desconocido.*SKILL.md/);
});
test('bootstrap se inyecta una sola vez por sesión (idempotencia del marker)', ...);
```

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/pi/ tests/opencode/; python -m pytest tests/hermes/ -q`
Expected: FAIL (no hay rechazo aún).

- [ ] **Step 3: Implement `parseFrameShipRef(ref)` en cada runtime**

Regex `^frame-ship:([a-z-]+):([a-z-]+)$`; rama `^superpowers:(.+)$` → error con `frame-ship:dev:$1`; rama dos segmentos → error con sintaxis; dominio fuera de los 10 → error con lista. Tercer segmento mapea a `skills/<skill>/SKILL.md`; si el archivo no existe → error `skill desconocido` SIN inyectar bootstrap parcial. Marker de bootstrap verificado idempotente (segunda inyección = no-op).

- [ ] **Step 4: Run to verify they pass**

Run: `node --test tests/pi/ tests/opencode/ tests/frame-ship/; python -m pytest tests/hermes/ -q; bash tests/hooks/test-session-start.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat!: three-segment frame-ship:{domain}:{skill} parser with noisy rejection"
```

---
### Task 5: Dominio product (rama product)

**Files (en `.worktrees/product/`):**
- Modify: `package.json` (`superpowers-product` → `frame-ship-product`, autoría deuriib), `.claude-plugin/plugin.json` + `marketplace.json`, `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `.devin-plugin/plugin.json`, `.kimi-plugin/plugin.json`, `.muse-plugin/plugin.json`, `.agents/plugins/marketplace.json`, `gemini-extension.json`, `GEMINI.md`, `index.js`, `.hermes-plugin/__init__.py` + `plugin.yaml`
- Rename: `.pi/extensions/superpowers.ts` → `frame-ship.ts`, `.opencode/plugins/superpowers.js` → `frame-ship.js`, adaptar `BOOTSTRAP_MARKER` existente `product:using-product` → `frame-ship:product:using-product`
- Modify: `skills/*/SKILL.md` (13 skills; `using-product` intacto como nombre, body con invocaciones `frame-ship:product:<skill>`), `hooks/session-start`, `scripts/*.sh`, tests del worktree (`tests/pi`, `tests/hermes`, `tests/hooks`, `tests/diagnosing-product`, `tests/opencode`)
- Test: los del worktree + guardia con `DOMAIN=product`

**Interfaces:**
- Consumes: contrato `isValidInvocation` (Task 1), patrón de Task 2–4.
- Produces: `frame-ship:product:<skill>` resolviendo (spot-check: `frame-ship:product:product-discovery`, `frame-ship:product:using-product`).

- [ ] **Step 1: Update worktree tests a `frame-ship:product:*` y correr para ver FAIL**

Run: `cd .worktrees/product && node --test tests/pi/ tests/opencode/; python -m pytest tests/hermes/ -q`
Expected: FAIL.

- [ ] **Step 2: Rename + rewrite identidad, runtime, skills y hooks del worktree**

Tercer segmento = nombre exacto del dir (`product-discovery`, no `discovery`). `BOOTSTRAP_MARKER = "frame-ship:product:using-product bootstrap for <runtime>"`.

- [ ] **Step 3: Run worktree suite**

Run: `cd .worktrees/product && node --test tests/pi/ tests/opencode/; python -m pytest tests/hermes/ -q; bash tests/hooks/test-session-start.sh; grep -ri superpower skills/ .pi/ .opencode/ .hermes-plugin/ hooks/ || echo CLEAN`
Expected: PASS + CLEAN.

- [ ] **Step 4: Commit en la rama**

```bash
cd .worktrees/product && git add -A && git commit -m "refactor!: rebrand product branch to frame-ship:product:*"
```

---
### Task 6: Dominio security (rama security)

**Files (en `.worktrees/security/`):** mismo set que Task 5 (8 skills: `incident-response`, `secure-code-review`, `secure-implementation`, `threat-modeling`, `using-security`, `verification-before-release`, `vulnerability-debugging`, `writing-secure-plans`).

**Interfaces:**
- Consumes: patrón Tasks 2–5.
- Produces: `frame-ship:security:<skill>` (spot-check: `frame-ship:security:threat-modeling`).

- [ ] **Step 1: Update tests y verificar FAIL**

Run: `cd .worktrees/security && node --test tests/pi/ tests/opencode/; python -m pytest tests/hermes/ -q`
Expected: FAIL.

- [ ] **Step 2: Rename + rewrite identidad, runtime, skills, hooks**

`BOOTSTRAP_MARKER = "frame-ship:security:using-security bootstrap for <runtime>"`; `package.json` → `frame-ship-security`.

- [ ] **Step 3: Run suite y grep CLEAN**

Run: suite + `grep -ri superpower skills/ .pi/ .opencode/ .hermes-plugin/ hooks/ || echo CLEAN`
Expected: PASS + CLEAN.

- [ ] **Step 4: Commit en la rama**

```bash
cd .worktrees/security && git add -A && git commit -m "refactor!: rebrand security branch to frame-ship:security:*"
```

---
### Task 7: Dominios devops + finance (ramas devops, finance)

**Files:** `.worktrees/devops/` (15 skills, bootstrap `using-devops`), `.worktrees/finance/` (14 skills, bootstrap `using-finance`); mismo set de manifiestos/runtime/skills/hooks/tests que Task 5.

**Interfaces:**
- Consumes: patrón Tasks 2–5.
- Produces: `frame-ship:devops:<skill>` (spot-check `frame-ship:devops:planning-rollouts`), `frame-ship:finance:<skill>` (spot-check `frame-ship:finance:budgeting-forecasting`).

- [ ] **Step 1: Update tests en ambas ramas y verificar FAIL**

Run: `cd .worktrees/devops && node --test tests/pi/ 2>&1 | tail -3; cd ../finance && node --test tests/pi/ 2>&1 | tail -3`
Expected: FAIL en ambas.

- [ ] **Step 2: Rename + rewrite devops**

`frame-ship-devops`, marker `frame-ship:devops:using-devops bootstrap for <runtime>`, 15 skills a `frame-ship:devops:*`.

- [ ] **Step 3: Rename + rewrite finance**

`frame-ship-finance`, marker `frame-ship:finance:using-finance bootstrap for <runtime>`, 14 skills a `frame-ship:finance:*`.

- [ ] **Step 4: Run suites y grep CLEAN en ambas**

Run: suites + `grep -ri superpower` por rama → CLEAN.
Expected: PASS + CLEAN.

- [ ] **Step 5: Commit por rama**

```bash
cd .worktrees/devops && git add -A && git commit -m "refactor!: rebrand devops branch to frame-ship:devops:*"
cd ../finance && git add -A && git commit -m "refactor!: rebrand finance branch to frame-ship:finance:*"
```

---
### Task 8: Dominios legal + marketing (ramas legal, marketing)

**Files:** `.worktrees/legal/` (8 skills ES, bootstrap `using-legal`), `.worktrees/marketing/` (8 skills, bootstrap `using-marketing`); mismo set que Task 5.

**Interfaces:**
- Consumes: patrón Tasks 2–5.
- Produces: `frame-ship:legal:<skill>` (spot-check `frame-ship:legal:intake-caso`), `frame-ship:marketing:<skill>` (spot-check `frame-ship:marketing:copy-ctr`).

- [ ] **Step 1: Update tests y verificar FAIL en ambas**

Run: `cd .worktrees/legal && node --test tests/pi/ 2>&1 | tail -3; cd ../marketing && node --test tests/pi/ 2>&1 | tail -3`
Expected: FAIL.

- [ ] **Step 2: Rename + rewrite legal (cuidar idioma ES en prosa: `Frame-ship`, invocaciones en inglés técnico intactas)**

- [ ] **Step 3: Rename + rewrite marketing**

- [ ] **Step 4: Run suites y grep CLEAN**

Run: suites + grep → CLEAN. Expected: PASS + CLEAN.

- [ ] **Step 5: Commit por rama**

```bash
cd .worktrees/legal && git add -A && git commit -m "refactor!: rebrand legal branch to frame-ship:legal:*"
cd ../marketing && git add -A && git commit -m "refactor!: rebrand marketing branch to frame-ship:marketing:*"
```

---
### Task 9: Dominios people + revenue + automation-roi (ramas people, revenue, automation-roi)

**Files:** `.worktrees/people/` (8 skills, `using-people`), `.worktrees/revenue/` (7 skills, `using-revenue`), `.worktrees/automation-roi/` (7 skills, `using-automation` — OJO: bootstrap NO se renombra a `using-automation-roi`, el dominio va en la invocación: `frame-ship:automation-roi:using-automation`).

**Interfaces:**
- Consumes: patrón Tasks 2–5.
- Produces: `frame-ship:people:hiring-talent`, `frame-ship:revenue:closing-deals`, `frame-ship:automation-roi:shipping-automation`.

- [ ] **Step 1: Update tests y verificar FAIL en las tres**

Run: `for d in people revenue automation-roi; do (cd .worktrees/$d && node --test tests/pi/ 2>&1 | tail -2); done`
Expected: FAIL ×3.

- [ ] **Step 2: Rename + rewrite people y revenue**

- [ ] **Step 3: Rename + rewrite automation-roi (verificar `using-automation` conserva nombre de dir; solo cambia prefijo a `frame-ship:automation-roi:*`)**

- [ ] **Step 4: Run suites y grep CLEAN ×3**

Expected: PASS + CLEAN.

- [ ] **Step 5: Commit por rama**

```bash
for d in people revenue automation-roi; do (cd .worktrees/$d && git add -A && git commit -m "refactor!: rebrand $d branch to frame-ship:$d:*"); done
```

---
### Task 10: Docs vivos + MIGRATION.md + atribución (main)

**Files:**
- Create: `MIGRATION.md`
- Modify: `README.md` (título, marca, tabla skills `frame-ship:dev:*`, atribución), `AGENTS.md`, `docs/porting-to-a-new-harness.md`, `docs/README.kimi.md`, `docs/README.opencode.md`, `.opencode/INSTALL.md`, `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/proposals/using-superpowers-v2-router.md` → mover a `docs/frame-ship/proposals/using-frame-ship-v2-router.md` con esquema tres segmentos
- Rename: `docs/diagrams/superpowers-multidominio.*` → `docs/diagrams/frame-ship-multidominio.*` (+ `meta.title` y labels)
- Test: `tests/frame-ship/test-brand-guard.sh` (debe acercarse a PASS en main)

**Interfaces:**
- Consumes: nombres finales de Tasks 2–4.
- Produces: `MIGRATION.md` con tabla `superpowers:X` → `frame-ship:dev:X` + nota de corte + fecha + atribución.

- [ ] **Step 1: Write `MIGRATION.md` (una página)**

```markdown
# Migración superpowers → frame-ship
superpowers:brainstorming → frame-ship:dev:brainstorming
...
Corte limpio el <fecha>: superpowers:* responde error ruidoso.
Based on obra/superpowers (MIT).
```

- [ ] **Step 2: Rewrite docs vivos + mover propuesta + renombrar diagramas**

Atribución `Based on obra/superpowers (MIT)` en `README.md` y `MIGRATION.md`; link a `MIGRATION.md` desde `README.md`.

- [ ] **Step 3: Run brand-guard en main**

Run: `bash tests/frame-ship/test-brand-guard.sh`
Expected: PASS en main (worktrees se verifican en su rama).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs!: frame-ship docs, diagrams, and MIGRATION.md"
```

---
### Task 11: Verificación final + smoke Pi (main)

**Files:** ninguno (solo verificación); si algo falla, se abre task de fix, no se marca done.

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: evidencia verde para `verification-before-completion`.

- [ ] **Step 1: Grep final cero en main**

Run: `grep -ri "superpower" --exclude-dir=.git --exclude-dir=.worktrees . | grep -v -e RELEASE-NOTES.md -e "docs/plans/" -e "docs/superpowers/plans/" -e MIGRATION.md -e docs/frame-ship/specs/ -e Skill-Name-With-Hyphens; echo "exit=$?"`
Expected: `exit=1` (sin matches) → CLEAN.

- [ ] **Step 2: Full suite main**

Run: `node --test tests/pi/ tests/opencode/ tests/frame-ship/; python -m pytest tests/hermes/ -q; bash tests/hooks/test-session-start.sh; bash tests/frame-ship/test-brand-guard.sh`
Expected: todo PASS.

- [ ] **Step 3: Smoke install Pi**

Run: cargar `.pi/extensions/frame-ship.ts` en sesión Pi limpia, pedir `frame-ship:dev:brainstorming` y una invocación vieja `superpowers:brainstorming`; registrar transcript.
Expected: bootstrap `using-frame-ship` inyectado una vez; invocación nueva resuelve; vieja da error ruidoso con equivalencia.

- [ ] **Step 4: Tag + reporte**

Run: `git tag frame-ship-cutover && git status --short`
Expected: tag creado, worktree limpio salvo ramas de dominio por mergear. Escribir reporte de verificación en el PR/issue (no commit).
