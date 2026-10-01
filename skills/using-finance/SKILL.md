---
name: using-finance
description: Use when starting any conversation - establishes how to find and use finance skills, requiring skill invocation before ANY response including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring numbers, or checking files. If it turns out wrong for the situation, you don't have to use it.

**Before entering plan mode:** if you haven't already clarified the financial question, invoke the financial-discovery skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach, then domain skills carry it out. financial-discovery and diagnosing-finance are this repo's most common process skills, but the rule holds for any of them.

- "Analiza / arma un modelo / presupuesto / forecast" → finance:financial-discovery first, then domain skills.
- "Los números no cuadran / el reporte falla" → finance:diagnosing-finance first, then domain skills.
- "¿En qué invierto / cómo va mi portafolio?" → finance:investment-research first.
- "Cierra el mes / audita esto" → finance:accounting-close first, then compliance.

## Routing Table

| Request | Skill |
|---------|-------|
| Nueva pregunta financiera, modelo, presupuesto, análisis | financial-discovery |
| Presupuesto empresarial, forecast, P&L, cash flow | budgeting-forecasting |
| Análisis de estados, ratios, tendencias, comparables | financial-analysis |
| Modelo Excel/Sheets: estructura, fórmulas, escenarios | financial-modeling |
| Ahorro, deuda, fondo emergencia, plan personal | personal-finance |
| Cierre contable, conciliaciones, estados financieros | accounting-close |
| Impuestos, auditoría, control interno, normativa | compliance-tax |
| Acción, bono, portafolio, valuación, riesgo-retorno | investment-research |
| Algo salió mal en números o proceso | diagnosing-finance |
| Pregunta que pide diseño (idea → brief) | financial-shaping |
| Plan de trabajo multi-paso con números | financial-planning |
| Ejecutar un plan aprobado | financial-delivery |
| Verificar antes de declarar terminado | financial-verification |

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple number question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me look at the spreadsheet quickly" | Skills tell you HOW to look. Check first. |
| "Finance doesn't need process" | Money mistakes compound. Use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "The skill is overkill" | Small errors become big losses. Use it. |
| "I'll just calculate this first" | Check BEFORE calculating anything. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |
| "Una fórmula rápida no hace daño" | Las fórmulas rápidas rompen modelos. Descubre primero. |

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.
