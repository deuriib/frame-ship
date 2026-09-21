# Requirements Index: Estandarización de Nomenclatura — "subagents" (people)

**Owner:** santana (people owner — agent rules, core onboarding, culture & communication clarity)  
**Brief Reference:** docs/briefs/BRIEF-subagents-naming.md + docs/briefs/OKR-subagents-naming.md  
**Domains-Touched:** [people, engineering]  

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-F-001 | Actualizar `skills/using-frame-ship/SKILL.md §3` a nomenclatura canónica `subagents` y añadir `W-SUBAGENTS` | P0 | BRIEF-subagents-naming.md:33; OKR KR-1.1 | SPEC-subagents-naming-people | people | review (grep) |
| REQ-F-002 | Actualizar `skills/using-frame-ship/references/bootstrap-checklist.md` con `subagents` y cláusulas `W-SUBAGENTS` + `W-SEQ` | P0 | BRIEF-subagents-naming.md:34; OKR KR-1.2 | SPEC-subagents-naming-people | people | review (grep) |
| REQ-F-003 | Actualizar `skills/frame-intent/SKILL.md §3` (pasos 0 y 3) a `subagents only` sin pregunta de bifurcación de modo | P0 | BRIEF-subagents-naming.md:33; OKR KR-1.1 | SPEC-subagents-naming-people | people | review (grep) |
| REQ-F-004 | Actualizar template `skills/frame-intent/references/product-brief.md` con `Execution_Mode:` congelado en `subagents` | P0 | BRIEF-subagents-naming.md:34; OKR KR-1.2 | SPEC-subagents-naming-people | people | review (grep) |
| REQ-F-005 | Actualizar reglas persistentes de agentes en `rules/frame-ship.md` con directiva de ejecución `subagents` y `W-SUBAGENTS` | P0 | BRIEF-subagents-naming.md:35; OKR KR-1.3 | SPEC-subagents-naming-people | people | review (grep) |
| REQ-F-006 | Asegurar existencia y sincronización estricta de `.agents/rules/frame-ship.md` como mirror de `rules/frame-ship.md` con `W-SUBAGENTS` | P0 | BRIEF-subagents-naming.md:35; OKR KR-1.3 | SPEC-subagents-naming-people | people | review (diff 0) |
| REQ-F-007 | Aplicar contrato canónico `W-SUBAGENTS` uniforme e idéntico byte-a-byte en todas las superficies bajo alcance people | P0 | BRIEF-subagents-naming.md:24-25; OKR KR-1.2 | SPEC-subagents-naming-people | people | review (diff 0) |
| REQ-F-008 | Actualizar criterios de revisión en `skills/quality-gate/references/domains/people-review.md` verificando `W-SUBAGENTS` y asimilación de regla | P0 | BRIEF-subagents-naming.md:50; OKR KR-2.2 | SPEC-subagents-naming-people | people | review (gate) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Cero residuos de `multi-subagents` en superficies people activas (skills, templates, reglas) | Zero Residue | 0 matches en grep (KR-1.1 & KR-1.3) |
| REQ-NF-002 | Consistencia exacta byte-a-byte de `W-SUBAGENTS` en todos los puntos de integración | Consistency | `diff = 0` bytes (KR-1.2) |
| REQ-NF-003 | Preservación estricta de registros históricos (40_workspace, 50_archive, briefs antiguos) | Historical Integrity | `git diff` en historial = 0 (Opción A) |
| REQ-NF-004 | Cumplimiento Ley 172-13: cero PII, credenciales o secretos en especificaciones y evidencias | Privacy | Attestation de seguridad en gate |
| REQ-NF-005 | Cambios reversibles y limpios sin impacto en runtime TypeScript | Quality & Safety | `mise run typecheck` limpio |
| REQ-NF-006 | Trazabilidad completa REQ → AC → PROPOSED_CHANGES → Gate Verdict | Traceability | Cobertura 100% (14/14 criterios) |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | Liderazgo ontológico, claridad comunicativa, reglas de agentes, core onboarding y verificación en gate | santana |
| engineering | Mecánica de skills, templates de ingeniería, registro de `ADR-009` y coordinación cross-lane de contratos | vasquez |
| security | Revisión de confidencialidad, higiene de datos y certificación de cumplimiento Ley 172-13 | barrera |
