---
name: discovering-opportunities
description: Use when the user brings a vague idea, a manual process, or an Excel file - find the bottleneck, quantify ROI, and decide what to automate before designing anything.
---

# Discovering Opportunities

Turn "this takes forever" into a scoped automation bet: bottleneck found, ROI stated, Excel I/O confirmed.

> Invoke `using-automation` first. Announce "Using discovering-opportunities to [purpose]".

## Conversation (one question at a time)

1. **What hurts?** Which manual step eats the most time or produces the most errors? Who does it, how often, how long per run?
2. **Show me the Excel.** What spreadsheet goes in, what comes out? No Excel yet — what table would the client recognize as theirs?
3. **What does good look like?** Minutes saved per run, errors killed, deadline met. State the number.
4. **Low-code check.** Is any step faster in Sheets/Forms/Power Automate/Zapier than in code? Say so and carve it out.

Don't propose architecture until these four have answers.

## Output — Opportunity Brief (in chat)

```markdown
## Opportunity: [name]
- Bottleneck: [step] — [who], [frequency], [minutes/run today]
- Excel in: [file/sheets/columns] | Excel out: [file/sheets/columns]
- Success: [minutes saved/run], [errors killed], [deadline or trigger]
- Low-code carve-out: [tool + step, or "none — code wins because..."]
- ROI line: [hours freed/month] → [USD value or error cost avoided]
- Verdict: automate / simplify first / not worth it
```

Ask for correction before moving to `designing-automation`.

<HARD-GATE>
No design, no plan, no code until the brief exists and the partner signs off.
Excel I/O missing = STOP under Gate 1. ROI missing = STOP, price on value not hours.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "I already know what to build" | You know the pain, not the bottleneck. Run the four questions. |
| "Excel comes later" | Excel is the interface. It comes first. |
| "Small task, skip the brief" | Small tasks hide the ROI. Two minutes, write it. |
