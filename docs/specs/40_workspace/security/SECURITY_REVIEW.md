# Security Review: SPEC-subagents-naming (Engineering & People Lanes)

**Reviewer:** Barrera (Security Owner / CISO lens)  
**Date:** 2026-09-20  
**Verdict:** **Approved**  
**Specs Reviewed:**
- `docs/specs/20_backlog/SPEC-subagents-naming-engineering.md` (Proposal: `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`)
- `docs/specs/20_backlog/SPEC-subagents-naming-people.md` (Proposal: `docs/specs/40_workspace/people/PROPOSED_CHANGES.md`)

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

---

## 1. Executive Summary & Scope

As Security Owner under `frame-ship:review-security`, I have conducted a rigorous security evaluation and threat model of the proposed changes for the standardization of execution mode naming to `subagents`.

The review covers two coordinated, parallel proposals:
1. **Engineering Lane (Vasquez):** Lexical standardization across 4 stage skills (`translate-to-spec`, `execute-spec`, `quality-gate`, `git-worktree`), 4 engineering templates (`spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`), 4 documentation catalogs (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, root `AGENTS.md`), and registration of `docs/specs/12_adr/ADR-009-subagents-naming.md`.
2. **People Lane (Santana):** Standardization across onboarding skills (`using-frame-ship/SKILL.md`), bootstrap checklists (`bootstrap-checklist.md`), initiative framing (`frame-intent/SKILL.md`, `product-brief.md`), persistent framework rules (`rules/frame-ship.md`), Antigravity discovery mirror (`.agents/rules/frame-ship.md`), and gate checklist (`people-review.md`).

Both proposals are **strictly documentation, specification, prompt guidelines, and architectural contracts**. No TypeScript runtime code (`.opencode/plugins/frame-ship.ts`) is modified, no dependencies are added, and no network or data-plane interfaces are introduced.

---

## 2. Threat Model (STRIDE Methodology)

### Attack Surface Analysis

| Surface / Target | Entry Point | Trust Boundary | Impact Assessment |
|------------------|-------------|----------------|-------------------|
| Stage Skills (`skills/*/SKILL.md`) | Agent prompt ingestion / LLM context | Internal developer tooling | Low / None: Text edits standardize prompt instructions to `subagents`. No executable code paths modified. |
| Stage Templates (`references/*.md`) | Document generation / Agent output formatting | Internal development workflow | Low / None: Updates template headers (`Execution_Mode: subagents`). Zero script execution. |
| Framework Rules (`rules/frame-ship.md`, `.agents/rules/frame-ship.md`) | Agent context injection / Discovery | Internal repo policy boundary | Low / None: Standardizes execution mode section (`W-SUBAGENTS`). Lockstep mirror preserves rule integrity. |
| Architectural Decision Record (`ADR-009`) | Archival reference / Documentation | Internal governance | None: Historical auditable record of naming decision. |
| Inter-stage Packets (`SPEC/HARD/GATE/DOMAINS`) | Agent communication across chain stages | Inter-agent coordination boundary | Positive / Hardening: Canonical `HARD:subagents+<constraints>` prefix eliminates mode ambiguity and cognitive drift. |

### STRIDE Threat Evaluation

| Threat Category | Applicable? | Threat Description & Evaluation | Mitigation / Control in Place |
|-----------------|-------------|---------------------------------|-------------------------------|
| **Spoofing** (Identity) | **No** | Unauthorized entity attempting to impersonate an agent role, domain owner, or orchestrator through mode manipulation. | Agent identity and role dispatching remain strictly anchored in harness session configurations and persona definitions (`agents/`). Packet envelope metadata (`SPEC/HARD/GATE/DOMAINS`) enforces domain identity. No authentication or token mechanisms altered. |
| **Tampering** (Integrity) | **No** | Unauthorized manipulation of framework contracts, historical audit logs, or executable code during naming update. | Strict adherence to Option A (Historical Immutability): `50_archive/`, prior briefs, and past ADRs (`ADR-001..008`) remain untouched. Shared contracts `W-SUBAGENTS` and `W-SEQ` are verified byte-identical (`diff = 0`) across lanes. Toolchain static check (`mise run typecheck`) remains clean (exit 0). |
| **Repudiation** | **No** | An actor denying actions taken during specification, execution, or gate sign-off. | Full end-to-end traceability maintained: `REQ-ID → test → artifact → gate verdict`. All modifications are tracked via atomic Git commits with explicit co-signatures. |
| **Information Disclosure** | **No** | Leakage of confidential material, customer data, API keys, credentials, or PII. | 100% static confirmation of zero PII and zero secrets. Complies fully with Dominican Ley 172-13 privacy minimization standards. No production data stores or logs touched. |
| **Denial of Service** | **No** | Resource exhaustion or harness deadlocks caused by concurrent agent dispatching or worktree proliferation. | Concurrency bounds strictly enforced: `skills/git-worktree/SKILL.md` preserves hard cap of max-2 live parallel worktrees. Sequential degradation contract (`W-SEQ`) guarantees graceful fallback on single-thread harnesses without hangs. |
| **Elevation of Privilege** | **No** | Unauthorized escalation to bypass review gates or execute arbitrary code without approval. | Chain contract strictly enforced: `propose-changes` prohibits repository file modification; code implementation is unlocked only via approved proposals under `execute-spec`. Full-wave quality gate with adversarial `review-refuter` prior to `qa` is preserved (no min-gate, no bypass). CEO fast-path remains capped at <15 lines trivial reversible work outside methodology. |

### Residual Risk Assessment

- **RR-1 (Lexical Drift Residue — Monitored):** Risk of isolated legacy string residue (`multi-subagents`) causing confusion.  
  *Mitigation:* Automated regex scans (`grep -rn "multi-subagents"`) enforced during gate verification. Residual impact: Low / purely aesthetic.
- **RR-2 (Context Injection Integrity — Existing Boundary):** Harness injection of repository files into agent session context depends on repo write-access controls.  
  *Mitigation:* Unchanged by this proposal. Standard Git branch protection and repository access controls apply.
- **RR-3 (Toolchain & Runtime Decoupling — Closed):** Risk of runtime breakage.  
  *Mitigation:* Plugin runtime `.opencode/plugins/frame-ship.ts` is decoupled from naming strings and untouched; verified with `mise run typecheck` passing with exit code 0.

---

## 3. Dominican Ley 172-13 Privacy Minimization & Security Baseline Attestation

In accordance with the statutory requirements of Dominican Republic **Ley No. 172-13** (sobre la Protección Integral de los Datos Personales) and industry security best practices, I formally attest the following:

1. **Zero Personally Identifiable Information (PII):**  
   Neither proposal introduces, references, collects, or processes any personal data of natural persons (names, identification numbers/cédulas, phone numbers, email addresses, biometric data, financial records, or geolocation). The handles referenced (`montilla`, `vasquez`, `santana`, `barrera`) are architectural roles and session personas within the Frame→Ship chain, not natural-person records.
2. **Zero Credentials, Tokens, or Secrets:**  
   Static scans of both proposals and their target changes confirm zero cryptographic keys, zero API keys, zero JWT/session tokens, zero passwords, and zero environment variables or credentials committed.
3. **Zero External Network Calls:**  
   All proposed modifications are local markdown documents, skills, and configuration. Zero network egress, zero HTTP/S fetch operations, zero telemetry reporting, and zero external endpoints are added or modified.
4. **Zero Authorization Bypass:**  
   No security controls, permission boundaries, or approval workflows are altered or weakened. The chain gate clearance hierarchy (`propose-changes → review-security/architecture → execute-spec → quality-gate → verify-handoff → ship-release`) is preserved in its entirety.

---

## 4. Findings

| ID | Severity | Finding | Remediation | Status |
|----|----------|---------|-------------|--------|
| **S-000** | None (0 Real) | No vulnerabilities found. The proposed changes are strictly limited to documentation, skill instructions, templates, and rules. Full STRIDE analysis reveals zero unmitigated threats. | None required | **PASS** |

**Total Vulnerabilities Found:** **0**

---

## 5. Conditions for Approval

**None.**  
Approval is **Unconditional**. Both proposals (`docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` and `docs/specs/40_workspace/people/PROPOSED_CHANGES.md`) demonstrate exemplary engineering discipline, full contract alignment with `W-SUBAGENTS` and `W-SEQ`, strict historical preservation (Option A), and zero security or privacy surface.

---

## 6. Verdict & Sign-off

### **Verdict: APPROVED**

The Engineering and People proposals are cleared from a security standpoint to proceed to the implementation stage under `frame-ship:execute-spec`.

### Sign-off

- [x] **Barrera (Security Owner / CISO lens)** — 2026-09-20
- [x] **Vasquez (Engineering Owner)** — Co-sign for architectural alignment (`ARCHITECTURE_REVIEW.md` Approved)
