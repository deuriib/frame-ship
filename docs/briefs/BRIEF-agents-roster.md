# Product Brief: Canonical Agents Roster in /agents (Unified Domain Specialists)

**ID:** BRIEF-agents-roster
**Initiator:** orchestrator
**Date:** 2026-09-21
**Status:** draft
**Execution_Mode:** subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
**Domains-Touched:** [engineering, security, finance, legal, marketing, people, revenue, automation]
**Classification:** architectural-initiative (full BRIEF file — establishes repository agent architecture, tool permission profiles, domain fusion specialists, and guardrails mapping)
**Framings-Considered:** [1) Framing A (Recommended, chosen): 1 Orchestrator + 8 Domain Owners + 8 Fused Domain Specialists (1 especialista unificado por dominio que consolida los roles previos) + Revisores Metodológicos de Calidad en `/agents` con perfiles de herramientas bajo mínimo privilegio y guardrails por dominio. 2) Framing B: Port de 70+ agentes fragmentados; descartado por sobrecarga contextual, dispersión de responsabilidades y fricción de mantenimiento (YAGNI). 3) Framing C: Especialistas aislados sin fusión; descartado porque obligaría a múltiples llamadas cruzadas en vez de un especialista integral por dominio.]
**Approval:** file-approval — pending (approver: user, date: 2026-09-21)

## Problem Statement

Actualmente, el flujo de trabajo de Frame→Ship depende de definiciones de agentes dispersas en configuraciones externas (`~/.config/opencode/agents/`), donde los roles de craft están hiper-fragmentados (ej. `architect`, `backend`, `frontend`, `data-engineer` como archivos desconectados) o residen en la memoria implícita del harness, sin un directorio canónico `/agents` versionado dentro del repositorio.

Esta arquitectura fragmentada genera fricciones críticas:
1. **Dispersión de Craft dentro del Dominio:** Un flujo de ingeniería requiere coordinar múltiples micro-especialistas para tareas continuas que un solo especialista de craft integral puede ejecutar coherentemente.
2. **Ausencia de Control de Privilegios en Herramientas:** No existe una política declarativa de herramientas (`tools: [...]`) por nivel de agente, arriesgando ejecuciones destructivas o escrituras indebidas en roles de liderazgo y revisión.
3. **Guardrails Desalineados:** Los rigurosos guardrails técnicos y de conducta de [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md) no están embebidos directamente en las directivas de cada especialista y revisor.

## Desired Outcome

Establecer un subsistema canónico, versionado y estructurado en `/agents` compuesto por cuatro capas bien delimitadas:

1. **Liderazgo / Orquestación (1 agente):**
   - `orchestrator.md` (`montilla`): Entrada de la cadena Frame→Ship, dueño del brief, despachador exclusivo hacia los Domain Owners, y sintetizador cross-domain. Restringido a despacho e inspección (sin edición de código ni bash).

2. **Domain Owners (8 agentes C-Level / Chain Owners):**
   - `vasquez.md` (Engineering), `barrera.md` (Security), `dauhajre.md` (Finance), `subero.md` (Legal), `vera.md` (Marketing), `santana.md` (People), `montero.md` (Revenue), `espinoza.md` (Automation/Ops).
   - Responsables de traducir briefs a specs, coordinar gates y emitir handoffs sin escribir código de craft directo. Herramientas de lectura, coordinación de subagentes y plantillas de gate.

3. **Fused Domain Specialists (1 Especialista Integral por Dominio — 8 agentes):**
   Cada especialista fusiona holísticamente los roles de craft previos de su dominio en un único practicante de alto nivel:
   - **`engineering-specialist.md`**: Fusión de `architect` + `backend` + `frontend` + `data-engineer` + `devops`. Domina diseño de sistemas (ADRs), lógica de negocio backend, interfaces frontend, contratos de datos/migraciones y configuración de CI/CD bajo TDD estricto y cero-any.
   - **`security-specialist.md`**: Fusión de `security` (OWASP/pentest) + `iam-specialist` + `privacy-engineer` + `incident-responder` + `grc-analyst`. Ejecuta análisis estático/dinámico, auditoría de permisos, modelado de amenazas STRIDE y privacidad técnica (Ley 172-13).
   - **`finance-specialist.md`**: Fusión de `financial-analyst` + `fpna-analyst` + `cost-analyst` + `accountant` + `tax-specialist`. Elabora modelos financieros, proyecciones de retorno, optimización de gasto cloud y auditoría fiscal.
   - **`legal-specialist.md`**: Fusión de `compliance-officer` + `contract-drafter` + `privacy-counsel` + `ip-counsel` + `legal-researcher`. Redacta contratos, audita licencias de dependencias y verifica conformidad legal y regulatoria.
   - **`marketing-specialist.md`**: Fusión de `brand-strategist` + `content-strategist` + `copywriter` + `seo` + `social-media` + `marketing-analyst`. Diseña estrategia de posicionamiento, mensajería técnica y análisis de canales.
   - **`people-specialist.md`**: Fusión de `people-operations` + `payroll-specialist` + `performance-analyst` + `friction-mediator`. Gestiona acuerdos de trabajo, diseño organizacional, resolución de conflictos y salud del equipo.
   - **`revenue-specialist.md`**: Fusión de `pricing-strategist` + `funnel-optimizer` + `revops-analyst` + `deal-closer`. Optimiza estructura de precios, embudos de conversión, métricas de retención y monetización.
   - **`automation-specialist.md`**: Fusión de `automation-engineer` + `devops` + integrador de flujos. Desarrolla automatizaciones, scripts operacionales, integración de herramientas e infraestructura como código.

4. **Revisores Metodológicos de Calidad (Quality Gate):**
   Revisores dedicados e independientes que ejecutan los checklists canónicos de calidad:
   - **Ola de Ingeniería:** `review-readability.md`, `review-reliability.md`, `review-resilience.md`, `review-risk.md`, `review-refuter.md` (adversarial), `qa.md` (verificación de suite), `review-data.md` (lente cross-cutting).
   - **Revisores de Dominio:** `security-reviewer.md`, `finance-reviewer.md`, `legal-reviewer.md`, `brand-reviewer.md`, `people-reviewer.md`, `revenue-reviewer.md`, `automation-reviewer.md`.
   - Herramientas: **Solo lectura estricta** (`view_file`, `grep_search`, `find_by_name`, `list_dir`).

5. **Gobernanza de Herramientas y Guardrails:**
   - Cada archivo `.md` declara en frontmatter `tools: [...]` sus herramientas autorizadas bajo el principio de mínimo privilegio.
   - Cada agente inyecta la base universal (Creed, Conducta, Menor Privilegio, Ley 172-13, Deny-by-default) y su sección de guardrails técnicos específicos extraída de [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md).

## Scope

### In Scope

- Creación del directorio canónico `agents/` en la raíz del repositorio [engineering].
- Definición de `orchestrator.md` con perfiles de herramientas de despacho y síntesis [people, engineering].
- Definición de los 8 Domain Owners (`vasquez.md`, `barrera.md`, `dauhajre.md`, `subero.md`, `vera.md`, `santana.md`, `montero.md`, `espinoza.md`) [people, engineering, security, finance, legal, marketing, revenue, automation].
- Definición de los 8 Fused Domain Specialists (`*-specialist.md`), sintetizando los roles previos con sus respectivas herramientas de craft y guardrails de ejecución [engineering, security, finance, legal, marketing, people, revenue, automation].
- Definición de los revisores metodológicos canónicos (`review-*`, `qa`, `*-reviewer`) con permisos de solo lectura [engineering, security, people].
- Matriz explícita de herramientas en frontmatter y directivas en Markdown para cada agente [engineering, security].
- Inyección estructurada de guardrails específicos de [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md) en cada agente [people, security, engineering].

### Out of Scope

- Fragmentación en micro-agentes individuales redundantes (ej. backend vs frontend separados quedan unificados en `engineering-specialist`).
- Modificación en tiempo de ejecución de plugins de OpenCode o Antigravity en este ciclo.
- Asignación de permisos destructivos o de escritura a roles de liderazgo o revisores.

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Autoridad de decisión, dueño del brief y guardián de la cadena |
| Owner (People) | santana | Coherencia del roster unificado, contratos de interacción y guardrails de conducta |
| Owner (Engineering) | vasquez | Estructura de archivos en `/agents`, integración de herramientas y TDD |
| Owner (Security) | barrera | Mínimo privilegio en herramientas, no-secrets y Ley 172-13 |
| Touched | Todos los Domain Owners | Revisión de su respectivo especialista unificado y revisor de dominio |

## Constraints

- **Budget:** Cero costo de infraestructura; archivos Markdown estructurados.
- **Timeline:** Ejecutable en un ciclo de spec bajo el modo `subagents`.
- **Seguridad (Least Privilege):** Agentes de revisión y liderazgo restringidos a solo-lectura/coordinación; escritura y ejecución restringida exclusivamente a especialistas de craft autorizados.
- **Privacidad (Ley 172-13):** Prohibición total de credenciales, secretos o PII en los prompts y configuraciones.
- **Consistencia:** 100% de coherencia con el catálogo canónico de 8 dominios de [`skills/AGENTS.md`](file:///mnt/DATA/GitHub/frame-ship/skills/AGENTS.md).

## Open Questions

- [ ] ¿Los nombres de los archivos de Domain Owners usarán los nombres canónicos (`vasquez.md`, `barrera.md`, etc.) o títulos (`engineering-owner.md`, `security-owner.md`)? (Recomendación: nombre canónico con alias en frontmatter para máxima compatibilidad).
