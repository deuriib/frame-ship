---
name: pricing-micro-saas
description: Use when an automation works for one client and you want recurring revenue - validate the Excel-dependent niche, package the offer, price on ROI.
---

# Pricing Micro-SaaS

One automation is a project. The same pain in five businesses is a Micro-SaaS. Package it, price it on ROI, aim $2,000 USD MRR floor.

> Invoke `using-automation` first. Announce "Using pricing-micro-saas to [purpose]".

## Steps

1. **Niche test.** Who else lives in this spreadsheet? Name 5 lookalike businesses/roles with the same file shape. If you can't, it's a project, not a product.
2. **Offer packaging.** One Excel in, one Excel out, one promise (hours saved or errors killed per cycle). Delivery: script + Docker, `FastAPI + htpy + HTMX` only if clients need uploads/history, `Flet` only if desktop matters. Client keeps Excel — always.
3. **ROI math.** Per client: `[hours freed/mo] × [their hourly cost] + [error cost avoided] = monthly value`. Price at a fraction of value (anchor: 10–25%), never at your hours.
4. **MRR check.** `price × clients needed ≥ $2,000`. If 10 clients at $200 works, say so. If the math needs 50 clients, niche is too small or price too low — say so.
5. **Next sell.** One-line pitch + which file to ask for in the first call ("send me last month's `[file]` and I'll show you `[output]`").

## Output — Product Card (in chat)

```markdown
## Micro-SaaS: [name]
- Niche: [5 lookalikes with same spreadsheet pain]
- Offer: `[input.xlsx]` → `[output.xlsx]` — [promise per cycle]
- Delivery: [script | FastAPI+htpy+HTMX | Flet + Docker]
- ROI/client: [hours] × [$/h] + [errors avoided] = [value/mo] → price [$/mo]
- MRR: [price] × [n] clients = [total] (floor $2,000: [pass/fail + fix])
- First call ask: "send me [file], I'll return [output]"
```

<HARD-GATE>
No product without 5 lookalikes, ROI math, and the MRR floor check. Hourly pricing = rejected, re-anchor to value.
</HARD-GATE>

## Red Flags

| Thought | Reality |
|---------|---------|
| "Charge per hour, safer" | Hours punish efficiency. Price the bottleneck you removed. |
| "Add a dashboard" | Client wants Excel. Dashboard is a second product. |
| "Any business can use it" | Name five. Same file shape or it isn't a niche. |
