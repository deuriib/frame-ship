---
name: financial-planning
description: Use when you have an approved finance brief for multi-step work, before building any model, budget, close, or report.
---

# Financial Planning — Del Brief al Plan Ejecutable

Escribe planes de trabajo para un analista que no vio el brief ni los números. Asume que construye modelos limpios si conoce inputs, salidas y checks exactos. Lo que no puede saber es lo que tú decidiste: qué entregables, qué inputs y fórmulas, qué valores del brief, qué checks prueban cada tarea. Documéntalo. Todo en tareas pequeñas. DRY. YAGNI. Checks por tarea. Salidas versionadas.

**Announce at start:** "I'm using the financial-planning skill to create the work plan."

**Context:** Trabaja sobre copia versionada, nunca sobre el único original. Una copia versionada por plan.

**Save plans to:** `docs/finance/plans/YYYY-MM-DD-<tema>.md`
- (User preferences for plan location override this default)

## Scope Check

Si el brief cubre varios frentes independientes, debió partirse en sub-briefs en financial-shaping. Si no, sugiere partirlo — un plan por frente. Cada plan produce un entregable verificable por sí solo.

## Deliverable Structure

Antes de definir tareas, mapea qué entregables se construyen o modifican y qué responsabilidad tiene cada uno. Aquí se fijan las decisiones de descomposición.

- Unidades con fronteras claras e interfaces bien definidas. Cada entregable una responsabilidad clara.
- Prefiere piezas pequeñas y enfocadas sobre monolitos que hacen todo.
- Lo que cambia junto vive junto. Divide por responsabilidad, no por capa técnica.
- En modelos existentes, sigue los patrones establecidos. Si una hoja creció sin control, incluir su partición en el plan es razonable.

## Task Right-Sizing

Una tarea es la unidad mínima con su propio ciclo de check y que vale una revisión. Pliega setup y documentación en la tarea cuyo entregable los necesita; divide solo donde un revisor podría rechazar una tarea y aprobar su vecina. Cada tarea termina en un entregable verificable independiente.

## Step Granularity

**Cada paso es una acción con resultado comprobable:**
- "Define el check" - paso
- "Córrelo y confirma que falta/falla" - paso
- "Construye la salida" - paso
- "Corre el check y confirma que pasa" - paso
- "Versiona" - paso

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Tema] Plan de Trabajo

> **For agentic workers:** REQUIRED SUB-SKILL: Use finance:financial-delivery to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [Una frase: qué entregable y qué decisión habilita]

**Approach:** [2-3 frases sobre el enfoque]

**Brief:** [ruta al brief del que el plan argumenta — viaja con el plan; se leen ambos]

## Global Constraints

[Requisitos transversales del brief — moneda, periodos, jurisdicción fiscal, reglas de formato — una línea cada uno, valores exactos copiados del brief.]

## Review Focus

[Las cinco clases de input o modos de fallo que el brief implica pero ningún check de tarea cubre y que más probablemente muerdan — una línea cada una, nombrando el input y el comportamiento esperado, lo más probable primero. El brief es visión: dice lo que el entregable debe hacer, no todo lo que encontrará, y su silencio sobre un input no es permiso para que ese input rompa el reporte. Escríbelo una vez, con el brief enfrente. Luego, por cada línea, agrega el check que la fija a la tarea dueña, en el estilo de esa tarea.]

---
```

## Task Structure

````markdown
### Task N: [Deliverable Name]

**Outputs:**
- Build: `exact/path/to/model-or-report.xlsx` (hoja, rango)
- Check: fila de Checks / conciliación que lo prueba

**Interfaces:**
- Consumes: [qué usa de tareas anteriores — inputs y supuestos exactos]
- Produces: [qué usan tareas posteriores — salidas y formatos exactos]

- [ ] **Step 1: Define el check que prueba la tarea** (rango, fórmula esperada, total de control)
- [ ] **Step 2: Corre el check y confirma que hoy falla o falta**
  Expected: FAIL / faltante declarado
- [ ] **Step 3: Construye la salida** (estructura, fórmulas, supuestos — valores exactos del brief)
- [ ] **Step 4: Corre el check y confirma que pasa**
  Expected: PASS (check en verde)
- [ ] **Step 5: Versiona** (guarda copia fechada + nota de supuestos)
````

## What a Step Contains

Un paso está listo cuando quien ejecuta puede producir exactamente una cosa razonable desde él. Cada tipo de paso lleva lo que lo hace inequívoco y nada más:

- **Un paso de check:** qué verifica, rango/fórmula exacta, total de control con valores del brief.
- **Un paso de construcción:** la salida exacta (hoja, estructura, fórmulas), los inputs que usa, los valores que el brief fija. Sin relleno.
- **Un paso de verificación:** el check a correr y la salida que confirma.
- **Un paso de versión:** qué se guarda, dónde, con qué nota.

Un plan es el conjunto de decisiones que quien ejecuta no puede tomar solo. Un plan más largo que el entregable que describe escribió el entregable en vez de planificarlo. Líneas que no deciden nada ("TBD", "casos borde", "validación apropiada", un supuesto que ninguna tarea define) son el fallo opuesto, y la auto-revisión caza ambos.

## Self-Review

Tras escribir el plan completo, míralo con ojos frescos contra el brief. Checklist propio — no un dispatch.

**1. Cobertura del brief:** cada sección/requisito del brief — ¿a qué tarea apunta? Lista huecos.

**2. Escaneo de pasos:** cada paso permite producir exactamente una cosa razonable, ni más ni menos.

**3. Consistencia:** ¿los nombres de hojas, rangos, supuestos y formatos en tareas tardías coinciden con lo definido en tempranas?

**4. Review Focus:** por cada modo de fallo que el brief implica, ¿hay tarea cuyo check lo cubra? Los cinco no cubiertos más probables van a Review Focus, cada uno con su check en la tarea dueña. Sección vacía = revisaste y no hay, no que saltaste.

**5. Proporción:** compara el largo del plan con el brief. Un plan varias veces más largo que el brief es transcripción, no plan.

Si encuentras issues, corrígelos inline. Si un requisito del brief no tiene tarea, agrega la tarea.

## Execution Handoff

Tras guardar y auto-revisar, presenta el handoff:

**"Plan complete and saved to `docs/finance/plans/<filename>.md`. Please review the plan. Does it capture what you want?"**

**REQUIRED SUB-SKILL:** Use finance:financial-delivery
