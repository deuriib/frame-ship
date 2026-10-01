---
name: budgeting-forecasting
description: Use when building a business budget, forecast, P&L, or cash flow - structure, assumptions, scenarios before numbers.
---

# Budgeting & Forecasting — FP&A Empresarial

**Announce at start:** "Using budgeting-forecasting to build the budget/forecast."

**Requires:** brief de `financial-discovery` (decisión, horizonte, inputs). Sin brief, vuelve atrás.

## Procedure

1. **Estructura.** Define periodos (mensual/trimestral), moneda, plan de cuentas mínimo: ingresos, COGS, OPEX, CAPEX, caja. Nada más hasta que el brief lo pida.
2. **Base histórica.** 3-12 meses reales como ancla. Sin historia: estima en rango con fuente, marca cada celda estimada.
3. **Supuestos explícitos.** Una tabla: supuesto | valor | fuente | sensibilidad. Crecimiento, precios, costos, tipo de cambio, impuestos.
4. **Tres escenarios.** Base, optimista (+), pesimista (−). Cambia máximo 3 drivers entre escenarios — el resto queda fijo.
5. **Cash flow.** Convierte P&L en caja: cobranzas, pagos, CAPEX, deuda. El P&L miente, la caja no.
6. **Varianza.** Real vs presupuesto: qué desvió, cuánto, por qué, qué acción. Sin acción, el reporte es decoración.

## Rules

1. Ninguna celda dura sin supuesto declarado.
2. Fórmulas > valores pegados. Todo recalculable.
3. Un driver por cambio: si todo se mueve, nada explica.
4. Caja mensual mínima 3 meses adelante, siempre.
5. El forecast se revisa cada periodo — fecha de revisión en el encabezado.

## Verification

- [ ] Cada número traza a un supuesto o dato fuente
- [ ] Los 3 escenarios recalculan sin error
- [ ] Caja nunca negativa sin alerta explícita
- [ ] Varianza con acción asignada, no solo observada
