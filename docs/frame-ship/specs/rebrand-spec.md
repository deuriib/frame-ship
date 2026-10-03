# Rebrand superpowers → frame-ship:{domain}:{skill}

> Estado: spec aprobado por Deuri Vasquez (deuriib). Listo para `writing-plans`.
> Decisiones irreversibles tomadas: corte limpio (sin shims), alcance vivo
> (historia intacta), atribución mínima a obra, autoría deuriib.

## 1. Entendimiento acordado

- **Destino:** cada invocación lleva el dominio: `frame-ship:{domain}:{skill}`.
  Ej: `frame-ship:dev:brainstorming`, `frame-ship:product:discovery`,
  `frame-ship:security:threat-modeling`.
- **Estrategia:** renombrar este repo (`origin deuriib/superpowers` → `deuriib/frame-ship`).
- **Compatibilidad:** corte limpio. Nada de `superpowers:` sobrevive como alias
  funcional; solo existe como mensaje de error ruidoso ("soy frame-ship, actualiza tu bootstrap").
- **Alcance:** código + docs vivos + `MIGRATION.md`. Historia intacta:
  `RELEASE-NOTES.md`, `docs/plans/*`, `docs/superpowers/plans/*` no se reescriben.
- **Autoría:** Deuri Vasquez (`deuriib`, deuriib@gmail.com) en todo lo vivo +
  línea de atribución "Based on obra/superpowers (MIT)" en `README.md` y `MIGRATION.md`.
- **Éxito:** `grep -ri superpower` en cero fuera de `.git/`, historia y notas de
  migración; suite verde; smoke de install en Pi.

## 2. Dominios (10, medidos del repo)

| Dominio | Fuente | Bootstrap | Ejemplo invocación |
|---|---|---|---|
| `dev` | `skills/` (core, 15 skills) | `using-frame-ship` (router) | `frame-ship:dev:brainstorming` |
| `product` | `.worktrees/product/skills` | `using-product` (ya existe) | `frame-ship:product:product-discovery` |
| `security` | `.worktrees/security/skills` | `using-security` (ya existe) | `frame-ship:security:threat-modeling` |
| `devops` | `.worktrees/devops/skills` | `using-devops` | `frame-ship:devops:planning-rollouts` |
| `finance` | `.worktrees/finance/skills` | `using-finance` | `frame-ship:finance:budgeting-forecasting` |
| `legal` | `.worktrees/legal/skills` | `using-legal` | `frame-ship:legal:intake-caso` |
| `marketing` | `.worktrees/marketing/skills` | `using-marketing` | `frame-ship:marketing:copy-ctr` |
| `people` | `.worktrees/people/skills` | `using-people` | `frame-ship:people:hiring-talent` |
| `revenue` | `.worktrees/revenue/skills` | `using-revenue` | `frame-ship:revenue:closing-deals` |
| `automation-roi` | `.worktrees/automation-roi/skills` | `using-automation` | `frame-ship:automation-roi:shipping-automation` |

NOTA abierta para el plan: los worktrees son ramas de trabajo, no la forma final
de distribución por dominio (ver `docs/proposals/using-superpowers-v2-router.md`).
**Decisión (scope2): los 10 dominios entran en scope.** Cada rama se renombra en su
propio worktreerama.

**Regla de nombrado (vinculante):** el tercer segmento es el nombre exacto del
directorio del skill. `frame-ship:product:product-discovery`, no `frame-ship:product:discovery`.
Los parsers mapean el segmento 3 → `skills/<segmento-3>/SKILL.md`.

## 3. Superficie a renombrar (151 archivos medidos)

### 3.1 Identidad (paquete + marketplaces)
- `package.json`: `name` → `frame-ship`, `description`, keywords, `pi.skills` path si cambia.
- 7 manifiestos: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`,
  `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `.devin-plugin/plugin.json`,
  `.kimi-plugin/plugin.json`, `.muse-plugin/plugin.json`, `.agents/plugins/marketplace.json`,
  `.hermes-plugin/plugin.yaml`, `gemini-extension.json`, `GEMINI.md`, `.gitignore` (si nombra).
- Autor en todos: `Deuri Vasquez <deuriib@gmail.com>`, urls `github.com/deuriib/frame-ship`.
- `.github/FUNDING.yml`: `github: [deuriib]`.

### 3.2 Runtime (entrypoints físicos)
- `.pi/extensions/superpowers.ts` → `.pi/extensions/frame-ship.ts`:
  `BOOTSTRAP_MARKER`, `bootstrapSkillPath` (`using-frame-ship`), texto "You have superpowers.",
  mapeo de invocación, nombre de función exportada.
- `.opencode/plugins/superpowers.js` → `.opencode/plugins/frame-ship.js` + `index.js` re-export:
  `superpowersSkillsDir`, `skillPath` (`using-frame-ship`), `id: 'superpowers'`, logs `[superpowers]`.
- `.hermes-plugin/__init__.py`: `BOOTSTRAP_MARKER`, `_skills_dir` (`using-frame-ship`),
  textos `skill_view("superpowers:...")` → `skill_view("frame-ship:dev:...")`, install url.
- `hooks/session-start`: cualquier marca o path con `superpowers` / `using-superpowers`.
- `scripts/package-codex-plugin.sh`, `scripts/sync-to-codex-plugin.sh`: nombres y urls.

### 3.3 Skills core (15 dirs en `skills/`)
- Renames físicos: `skills/using-superpowers` → `skills/using-frame-ship`;
  `skills/diagnosing-superpowers` → `skills/diagnosing-frame-ship`.
- Frontmatter `name:` en cada `SKILL.md` afectado (mínimo los dos renombrados;
  el plan verifica si otros 13 contienen la marca en el body).
- Body: `superpowers:<skill>` → `frame-ship:dev:<skill>`; "Superpowers'" / "superpowers"
  genéricos → "Frame-ship" según gramática; `using-superpowers` router → `using-frame-ship`
  con tabla de señales por dominio (apoyarse en `docs/proposals/using-superpowers-v2-router.md`).
- Skill fantasma: `Skill-Name-With-Hyphens` (aparece en el grep de `name:`; el plan lo verifica
  y lo elimina o renombra, no se migra tal cual).

### 3.4 Parser de tres segmentos (el cambio técnico real)
Hoy el ecosistema asume `prefijo:skill` (dos partes). El spec exige tres:
`frame-ship:{domain}:{skill}`. Tocar:
- Strip de prefijo (`// Strip superpowers: prefix if present` y equivalentes en
  `.pi`, `.opencode`, `.hermes-plugin`, scripts de worktrees).
- `forceSuperpowers` / flags equivalentes → `forceFrameShip` o lógica por dominio.
- Asserts en tests: `skill_view("superpowers:brainstorming")` → `skill_view("frame-ship:dev:brainstorming")`.
- Rechazo ruidoso: invocación `superpowers:*` o de dos segmentos responde con la
  equivalencia correcta + link a `MIGRATION.md`. Nunca silencio.

### 3.5 Docs vivos
- `README.md`, `AGENTS.md`, `docs/porting-to-a-new-harness.md`,
  `docs/README.kimi.md`, `docs/README.opencode.md`, `.opencode/INSTALL.md`,
  `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md`
  (cuidado: el template nombra "Superpowers core" como concepto; reescribir a Frame-ship).
- `docs/diagrams/superpowers-multidominio.*` → renombrar archivos + `meta.title` +
  labels (`using-superpowers v2`, `plugin superpowers`).
- `docs/proposals/using-superpowers-v2-router.md` → actualizar o mover a
  `docs/frame-ship/proposals/using-frame-ship-v2-router.md` con el esquema de tres segmentos.
- NUEVO `MIGRATION.md` (una página): tabla `superpowers:X` → `frame-ship:dev:X`,
  nota de corte limpio, atribución a obra, fecha de corte.

### 3.6 Tests
- Actualizar todos los asserts con `superpowers:` al esquema nuevo.
- NUEVO test de marca prohibida: falla si `grep -ri superpower` encuentra algo fuera de
  `.git/`, historia (`RELEASE-NOTES.md`, `docs/plans/`, `docs/superpowers/plans/`) y
  `MIGRATION.md` (que la nombra para documentar el corte).
- NUEVO test de invocación: `frame-ship:{domain}:{skill}` parsea a tres segmentos;
  dos segmentos o `superpowers:` → error ruidoso.

## 4. Threat-note (resumen operativo)

1. **Suplantación del nombre abandonado** (alta): reservar/defender `superpowers`
   donde se pueda + comunicar fecha de corte en `MIGRATION.md`.
2. **Fallo silencioso de prompts viejos** (media): rechazo ruidoso obligatorio, no shims.
3. **Restos no renombrados en hooks/scripts** (media): inventario con checksum pre/post
   + test de marca prohibida.
4. **Pérdida de sync con `upstream obra`** (baja, aceptada): el corte limpio la rompe
   por diseño; documentarlo, no mitigarlo.

## 5. Orden de ejecución sugerido (para writing-plans)

1. Tag pre-rename + aviso al equipo.
2. Identidad (3.1) + runtime (3.2).
3. Skills core + router `using-frame-ship` (3.3).
4. Parser tres segmentos + rechazo ruidoso (3.4).
5. Tests (3.6) — deben fallar antes del rename y pasar después.
6. Docs vivos + `MIGRATION.md` (3.5).
7. `grep` final + smoke install Pi + verificación (`verification-before-completion`).

## 6. Criterios de aceptación

- [ ] Cero `superpower` (cualquier caso) fuera de `.git/`, historia y `MIGRATION.md`.
- [ ] `frame-ship:dev:brainstorming` y al menos un dominio no-dev resuelven a su `SKILL.md`.
- [ ] `superpowers:cualquier-cosa` responde error ruidoso con equivalencia, no silencio.
- [ ] Suite verde + test de marca prohibida verde.
- [ ] Autoría deuriib en manifiestos; atribución "Based on obra/superpowers (MIT)" visible.
- [ ] `MIGRATION.md` de una página enlazado desde `README.md`.
