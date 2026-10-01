---
name: financial-modeling
description: Use when building or fixing an Excel/Sheets model - structure, formulas, scenarios, and audit before delivery.
---

# Financial Modeling — Modelos que Recalculan

**Announce at start:** "Using financial-modeling to build/audit the model."

**Requires:** brief de `financial-discovery` + supuestos de `budgeting-forecasting` si aplica.

## Procedure

1. **Tres hojas, siempre.** `Inputs` (azul = editable, todo supuesto aquí), `Cálculos` (fórmulas, nada duro), `Salidas` (reporte/-dashboard, solo referencias). Nada duro fuera de Inputs.
2. **Fórmulas limpias.** Una lógica por celda. Sin constantes mágicas dentro de fórmulas — referencia a Inputs. Nombra rangos clave.
3. **Escenarios con switch.** Celda `Escenario = {Base, Opt, Pes}` + tabla de drivers. Cambiar escenario = cambiar una celda, no reescribir.
4. **Chequeos vivos.** Fila de `Checks`: balance cuadra (A = P + E), caja cierra, suma de partes = total. Todo check en verde o el modelo está roto.
5. **Sensibilidad.** Tabla de 2 drivers clave (±10/20%) contra la salida que decide. Si la decisión cambia de signo, el brief debe decirlo.
6. **Auditoría.** Recorre: precedentes de cada salida, sin `#REF!`, sin circulares no intencionales, rangos sin huecos. Documenta versión + fecha + autor.

## Guardrails

- **Una sola verdad:** el modelo versionado es la fuente; nada de spreadsheets sombra paralelos. Copia rival = se archiva o se concilia, nunca compite.

## Rules

1. Azul = input, negro = fórmula, verde = referencia entre hojas. Sin excepciones de color.
2. Cero valores pegados en Cálculos/Salidas.
3. Cada modelo trae sus Checks en verde o no se entrega.
4. Versión + fecha en celda visible. Sin "final_v2_REAL".
5. Si el usuario pide "una fórmula rápida", se hace dentro de la estructura — nunca suelta.

## Verification

- [ ] Inputs/Cálculos/Salidas separados, colores respetados
- [ ] Checks en verde (balance, caja, totales)
- [ ] Escenarios cambian con una celda
- [ ] Sensibilidad de 2 drivers documentada
