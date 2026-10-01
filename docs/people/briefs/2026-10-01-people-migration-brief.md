# Migracion a Superpowers People - Design Brief

Fecha: 2026-10-01
Estado: aprobado por human partner ("dale al diseno con todo, no dejes nada para despues")
Alcance: ciclo talento completo CHRO/CPO, cero skills dev.

## Decision

Migrar el repo completo de Superpowers dev a Superpowers People:
misma estructura (bootstrap, HARD-GATE, paths, red flags, checklists, verification),
contenido 100% dominio people.

## Skills finales (8)

| Skill | Reemplaza a | Proposito |
|---|---|---|
| using-people | using-superpowers | Bootstrap + routing CHRO/CPO |
| discovering-needs | brainstorming | Spike / bounded / structural + brief en docs/people/briefs/ |
| hiring-talent | test-driven-development (scorecard=tests) | Scorecard primero, entrevistas estructuradas, 30-60-90 |
| reviewing-performance | requesting/receiving-code-review | Evidencia + calibracion antes de comunicar |
| shaping-culture | subagent-driven-development, executing-plans | Medir, rituales, incentivos, reorg (ultimo) |
| growing-talent | finishing-a-development-branch, writing-plans | Sucesion, career paths, HiPo, 1 growth bet/trimestre |
| diagnosing-people | systematic-debugging, diagnosing-superpowers | Sintoma con numeros, 2 fuentes, causa raiz, prescribir |
| verifying-people-decisions | verification-before-completion | Re-leer package + draft + recipients antes de enviar |

## Skills dev eliminadas (15)

brainstorming, diagnosing-superpowers, dispatching-parallel-agents,
executing-plans, finishing-a-development-branch, receiving-code-review,
requesting-code-review, subagent-driven-development, systematic-debugging,
test-driven-development, using-git-worktrees, using-superpowers,
verification-before-completion, writing-plans, writing-skills.

## Infra actualizada

- `.opencode/plugins/superpowers.js`: bootstrap using-people, "You have people powers."
- `.pi/extensions/superpowers.ts`: idem.
- `hooks/session-start`: idem.
- `GEMINI.md`: `@./skills/using-people/SKILL.md`.
- `gemini-extension.json` + 5 plugin.json + hermes yaml + package.json: descripciones people.
- `README.md`: titulo, workflow, filosofia, acceptance prompt people.
- `AGENTS.md`: bootstrap + acceptance test people.
- `tests/pi/test-pi-extension.mjs`: asserts people powers + prompt hire sales lead.
- `skills/using-people/references/pi-tools.md`: nuevo mapping Pi-people.
- `docs/people/briefs/`: destino de briefs estructurales.

## Verificacion

- `node --test tests/pi/test-pi-extension.mjs`: 6/6 pass.
- `bash tests/hooks/test-session-start.sh`: PASSED.
- `node -e import opencode plugin`: exports OK.
- Frontmatter name+description valido en las 8 skills.
