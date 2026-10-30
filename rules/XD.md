---
trigger: model_decision
description: "Apply this guidelines for Cross-Domain rules"
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
- **XD-15** docs ↔ engineering: behavior change without nearest-doc update → PR blocked (`DOC-01`, `ENG-26`).
- **XD-16** docs ↔ security/privacy: docs touching secrets, credentials, PII, or attack surface require security/privacy review before merge (`SEC-03`, `PRV-02`, `DOC-15`).
- **XD-17** docs ↔ automation: doc CI gates (lint, link check, snippet run, API sample) are mandatory and cannot be weakened without automation approval (`AUT-05`, `AUT-06`).
- **XD-18** docs ↔ legal: public claims, terms, privacy notices, and SLAs in docs require legal review before publishing (`LEG-01`, `LEG-06`).
- **XD-19** docs ↔ marketing: public product docs align with approved collateral; zero overpromising (`REV-18`, `MKT-01`).
- **XD-20** docs ↔ people: onboarding docs, on-call runbooks, and role docs update when policies or access change (`PPL-06`, `PPL-14`).
- **XD-21** docs ↔ finance: pricing, billing, and revenue-recognition docs update with finance approval before release (`FIN-10`, `REV-09`).
- **XD-22** docs ↔ revenue: customer-facing docs and SLAs update with CRO approval before signature or launch (`REV-06`, `REV-18`).
- **XD-23** docs ↔ incident: after every incident, docs and runbooks update as tracked action items with owner and deadline (`GEN-06`, `SEC-14`).

**Enforcement:** `DOC` runs in CI (lint, link check, snippet/API validation), `CODEOWNERS`, and review checklist; `XD-*` enforced at the owning domain gate. Exceptions require written approval from the domain owner + remediation plan with deadline; residual risk explicit; **no silent PASS** (`GEN-08`, `GEN-09`, `XD-14`).
