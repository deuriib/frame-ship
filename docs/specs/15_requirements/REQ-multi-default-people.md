# Requirements Index: Multi-default — proceso natural (people)

**Owner:** santana (people owner — agent-rules)
**Brief Reference:** docs/briefs/BRIEF-multi-default.md + docs/briefs/OKR-multi-default.md
**Domains-Touched:** [people]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-F-001 | using-frame-ship SKILL §3 a multi-único (W-MULTI + W-SEQ, 0 rama single) | P0 | BRIEF-multi-default.md:31; OKR KR-1.2 | SPEC-multi-default-people | people | review (grep) |
| REQ-F-002 | bootstrap-checklist a contrato multi-único + degradación secuencial | P0 | BRIEF-multi-default.md:31; OKR KR-1.2 | SPEC-multi-default-people | people | review (grep) |
| REQ-F-003 | frame-intent SKILL §3 paso 3: congelar multi-único sin pregunta de modo | P0 | BRIEF-multi-default.md:32; OKR KR-1.1 | SPEC-multi-default-people | people | review (grep) |
| REQ-F-004 | product-brief.md Execution_Mode a multi-único frozen + fast-path fuera | P0 | BRIEF-multi-default.md:32; OKR KR-1.1 | SPEC-multi-default-people | people | review (grep) |
| REQ-F-005 | Contrato uniforme W-MULTI idéntico en 4 superficies people | P0 | BRIEF-multi-default.md:64; OKR KR-1.2 | SPEC-multi-default-people | people | review (diff 0) |
| REQ-F-006 | Wording degradación secuencial W-SEQ idéntico (mismo hilo, mismo contrato) | P0 | BRIEF-multi-default.md:23; OKR KR-1.2 | SPEC-multi-default-people | people | review (diff 0) |
| REQ-F-007 | people-reviewer gate: wording uniforme + full-wave sin min-gate + impacto regla | P0 | BRIEF-multi-default.md:49; OKR KR-2.1 | SPEC-multi-default-people | people | review (gate) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | single como modo = 0 menciones vivas (fast-path solo fuera-de-metodología) | Zero residue | grep 0 (KR-1.1) |
| REQ-NF-002 | W-MULTI/W-SEQ byte-idénticos cross-superficie | Consistency | diff 0 (KR-1.2) |
| REQ-NF-003 | Historia intacta (50_archive, ADRs, BRIEFs) | Freeze | git diff --name-only = 0 en historia |
| REQ-NF-004 | Ley 172-13: cero PII/secretos/tokens en wording y evidencias | Privacy | attestation barrera |
| REQ-NF-005 | Docs-only reversible, 5 archivos lane people, sin runtime/deps | Reversibility | git diff 5 files |
| REQ-NF-006 | Trace REQ→AC→propuesta→veredicto 13/13 | Traceability | GATE_REPORT OPEN |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | wording único es el deliverable; people-reviewer verifica uniformidad antes de handoff | santana |
| engineering | mecánica skills/templates/ADR + ratificación W-MULTI/W-SEQ cross-lane (lane paralelo) | vasquez |
| security | wording review (sin auth/data/API); attestation Ley 172-13 | barrera |
