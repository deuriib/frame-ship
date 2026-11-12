---
trigger: model_decision
description: "Apply these guidelines for Cross-Domain rules"
globs:
---

# XD — Cross-Domain

- **XD-01** engineering ↔ security: new boundary, dependency, or secret handling → security review before merge.
- **XD-02** engineering ↔ automation: pipeline change → security + platform review; gates cannot be weakened without approval.
- **XD-03** engineering ↔ legal/privacy: new PII store, export, or cross-border flow → privacy review + DPIA if high risk.
- **XD-04** marketing ↔ legal/privacy: new channel, claim, or audience → legal + privacy review before launch.
- **XD-05** finance ↔ legal/security: new vendor or payment path → legal + security + finance review.
- **XD-06** revenue ↔ finance: pricing, discounts, revenue recognition, commissions, invoicing → joint approval, monthly reconciliation.
- **XD-07** revenue ↔ legal/privacy: contract terms, customer PII, marketing claims → review before signature or launch.
- **XD-08** revenue ↔ product/engineering: roadmap commitments, entitlements, SLAs → approved collateral only; no overpromising.
- **XD-09** people ↔ legal/privacy: employee data, investigations, terminations, cross-border transfers → legal + privacy review.
- **XD-10** people ↔ security: access provisioning/revocation, background checks, security training → enforced by SEC.
- **XD-11** people ↔ finance: payroll, compensation, benefits, headcount budget → dual approval, reconciliation.
- **XD-12** any domain ↔ incident: Critical/High → same-session notification, owner assigned, evidence attached, residual risk explicit.
- **XD-13** each domain's gates are enforced in its own tooling — CI, ERP, CRM, HRIS, contract management, SIEM; violations block the corresponding action.
- **XD-14** exceptions require written approval from the domain owner plus a remediation plan with deadline; residual risk explicit; no silent PASS.
- **XD-15** docs ↔ any domain: a docs change touching a domain's surface follows that domain's review rule plus `DOC-01` — engineering `ENG-26`, security/privacy `SEC-03`/`PRV-02`, automation `AUT-05`/`AUT-06`, legal `LEG-01`/`LEG-06`, marketing `MKT-01`, people `PPL-06`/`PPL-14`, finance `FIN-10`/`REV-09`, revenue `REV-06`/`REV-18`, incident `GEN-06`/`SEC-14`.

**Enforcement:** `DOC` runs in CI (lint, link check, snippet/API validation), `CODEOWNERS`, and review checklist; `XD-*` enforced at the owning domain gate. Exceptions require written approval from the domain owner + remediation plan with deadline; residual risk explicit; **no silent PASS** (`GEN-08`, `GEN-09`, `XD-14`).
