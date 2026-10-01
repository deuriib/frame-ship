---
name: diagnosing-finance
description: Use when numbers don't tie, a report fails, or a finance flow breaks - reproduce on the data before touching anything.
---

# Diagnosing Finance — Los Números No Cuadran

**Announce at start:** "Using diagnosing-finance to find the break."

## Procedure

1. **Reproduce en los datos.** Congela el caso: archivo, hoja, periodo, cifra esperada vs obtenida. Sin caso congelado, no toques nada.
2. **Aísla la capa + pantalla anti-fraude.** ¿Es dato fuente, fórmula/supuesto, o interpretación? Prueba una capa por vez: fuente → cálculo → presentación. En la pasada de fuente, corre el screen: duplicados, montos redondos, vendors nuevos/raros, asientos off-hours. Un hit no es acusación — es un item a explicar con soporte.
3. **Causa raíz.** Traza hacia atrás desde el síntoma hasta la celda/supuesto que lo origina. "Se rompió el total" no es causa; "el rango excluye la fila nueva" sí.
4. **Arregla una cosa.** Un fix por vez, re-ejecuta el check. Si el fix introduce otro desvío, revierte y re-diagnostica.
5. **Blindaje.** Agrega el check que habría atrapado esto (conciliación, fila de Checks, validación de rango) + nota en el brief.

## Rules

1. Datos antes que fórmulas, fórmulas antes que conclusiones.
2. Nada se "ajusta a mano" para que cuadre: el ajuste es un asiento con motivo.
3. El fix se prueba con el caso congelado del paso 1.
4. Todo hallazgo deja un check permanente, no solo un fix.

## Verification

- [ ] Caso reproducido y congelado antes del fix
- [ ] Causa raíz identificada a nivel celda/supuesto
- [ ] Check nuevo en verde que atrapa la regresión
