# Architecture Contract: Execution Modes and Packet Structure

**Owner:** vasquez (engineering owner)
**Version:** v1.0
**Last Updated:** 2026-09-20
**Domains-Touched:** [engineering, people, security, finance, legal, marketing, revenue, automation]

## Overview

This contract establishes the canonical architecture for execution modes, dispatch semantics, and inter-stage packet encapsulation across the Frame→Ship chain. Following the architectural unification initiated in ADR-008 and formalized in ADR-009, `subagents` is defined as the single, universal methodological execution mode for all non-trivial initiatives.

Inter-stage communication in Frame→Ship is strictly decoupled and stateless: stages exchange immutable, reference-only packet envelopes (`SPEC/HARD/GATE/DOMAINS`). This architecture eliminates full-context pasting, guarantees auditability across domain boundaries, enforces clean isolation for parallel work, and provides deterministic sequential degradation when executing in harnesses lacking background task concurrency.

```
+-----------------------------------------------------------------------------------+
|                            FRAME->SHIP CHAIN PIPELINE                             |
|                                                                                   |
|  [frame-intent] --> [translate-to-spec] --> [propose-changes] --> [execute-spec]  |
|                                                     |                     |       |
|                                              (arch/sec review)      (worktree/PR) |
|                                                     |                     |       |
|  [ship-release] <-- [verify-handoff] <-------- [quality-gate] <-----------+       |
+-----------------------------------------------------------------------------------+
                                          |
                      PACKET ENVELOPE CONVEYANCE (REFERENCE-ONLY)
         SPEC:<path>#<anchors> / HARD:subagents+<constraints> / GATE:<v> / DOMAINS:<d>
```

---

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| **Packet Envelope (`SPEC/HARD/GATE/DOMAINS`)** | Encapsulates inter-stage execution state strictly by reference. Conveys spec anchors, hard execution constraints, gate verdicts, and touched domain scope without carrying file content. | Canonical 4-tuple string: `SPEC:<path>#<anchors> / HARD:<mode+constraints> / GATE:<verdict> / DOMAINS:<list>` |
| **Orchestrator Dispatcher** | Central coordinator that dispatches domain owners and specialists based on `Domains-Touched`. Enforces role clarity, load orders, and full-wave gate orchestration. Specialists never self-dispatch; they execute or brief back. | Subagent invocation / Task dispatch order with explicit role definition and packet envelope |
| **Domain Specialist Lane (`git-worktree`)** | Isolated working environment created repo-locally under `.worktrees/<spec-id>` with branch-per-SPEC for up to 2 concurrent parallel lanes. Guarantees zero cross-contamination of working tree and dependencies. | Git worktree lifecycle: `git worktree add`, clean baseline check, `Join-Path` discipline, removal + prune |
| **Sequential Degradation Engine** | Preserves identical methodological contracts, packet envelopes, domain reviewers, and full-wave gates when running within harnesses lacking concurrent task capabilities, running stages sequentially in the same thread. | Same-thread sequential execution; no gate attenuation; zero contract downgrade |
| **CEO Fast-Path Boundary** | Strictly circumscribed pathway for trivial (<15 lines), reversible, urgent tasks executed directly under CEO authority (checkpoint-only). Operates entirely outside the Frame→Ship methodology and never branches the chain. | Direct edit + checkpoint; forbidden from altering chain contracts, templates, or stage workflows |

---

## Data Flow

The flow of state between stages is strictly mediated by the packet envelope:

```
                  +----------------------------------------------+
                  |  Stage N Output (Deliverable Artifacts)      |
                  +----------------------------------------------+
                                         |
                                         v
                  +----------------------------------------------+
                  |  Assemble Canonical Packet Envelope:         |
                  |  - SPEC: path to markdown spec with REQ anchors
                  |  - HARD: subagents + operational constraints |
                  |  - GATE: current verdict / waiver link       |
                  |  - DOMAINS: array of touched business domains|
                  +----------------------------------------------+
                                         |
                                         v
                  +----------------------------------------------+
                  |  Stage N+1 Input (Reference-Only Ingestion)  |
                  |  - Validate Load Evidence                    |
                  |  - Ingest SPEC by reference (no paste)       |
                  |  - Enforce HARD constraints                  |
                  |  - Dispatch domain owners per DOMAINS        |
                  +----------------------------------------------+
```

1. **Stage Completion:** When a stage finishes its deliverable, it writes its output artifact to the canonical lifecycle location (`docs/specs/`).
2. **Envelope Assembly:** The stage constructs the packet envelope string:
   `SPEC:<path>#<anchors> / HARD:subagents+<constraints> / GATE:<verdicts> / DOMAINS:<list>`
3. **Stage Ingestion:** The next stage receives the envelope, verifies pre-flight load orders (`skill(<stage>)` + role understanding), confirms `execution_mode: subagents`, and parses the domain list.
4. **Attribution & Gate:** Reviewers inspect artifacts in place or within the designated worktree lane, filing verdicts into `docs/specs/40_workspace/quality-gate/<spec-id>/<reviewer>.md`, consolidated into `GATE_REPORT.md`.

---

## Invariants

The following invariants are inviolable and must be enforced by all stages, domain owners, reviewers, and automated tooling:

- **INV-001 (Singular Methodological Mode):** `subagents` is the sole canonical execution mode across all active skills, templates, and orchestration rules. The legacy terms `single` and `multi-subagents` are permanently retired from active methodology.
- **INV-002 (Envelope Purity — Reference-Only):** Inter-stage data exchange must occur exclusively through the 4-tuple packet envelope. Pasting full file bodies, spec text, or transcripts between stages is an anti-pattern and invalidates Load Evidence.
- **INV-003 (HARD Prefix Discipline):** The `HARD` token within any packet envelope must begin with `subagents` (e.g., `HARD:subagents+<constraints>`). Any override requires explicit CEO waiver documentation recorded in the gate report.
- **INV-004 (Sequential Equivalence):** In execution environments where parallel task dispatch is unavailable, execution must degrade sequentially in the same thread under the exact same packet, same reviewers, and same full-wave gate. No "min-gate" or silent downgrade is permitted.
- **INV-005 (Fast-Path Containment):** Trivial reversible work (<15 lines) executed via CEO fast-path is strictly out-of-methodology. It must never create pseudo-stages, bypasses, or hybrid branches within the Frame→Ship chain.
- **INV-006 (Parallel Worktree Bound):** Concurrent execution lanes under `git-worktree` must not exceed 2 live worktrees at any time (`max 2 parallel lanes`). Each worktree must have an isolated branch and must be cleaned up post-handoff.
- **INV-007 (Historical Immutability):** Historical records (`docs/specs/50_archive/`, prior `BRIEF-*.md` files, past ADRs `ADR-001` through `ADR-008`, and historical gate evaluations) are immutable audit trails and must never be altered retroactively.
- **INV-008 (Singleton Working File Discipline):** Working files per lane (`PROPOSED_CHANGES.md`, `IMPLEMENTATION_PLAN.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACTS.md`, `GATE_REPORT.md`, `HANDOFF.md`, `RELEASE_NOTES.md`) are strict singletons. Creating suffixed variants (e.g., `ARCHITECTURE-*.md`) is strictly forbidden.

---

## Non-Functional Requirements

- **Consistency & Lexical Precision:** 100% lexical uniformity across active skills (`skills/`), reference templates (`skills/*/references/`), catalogue documents (`AGENTS.md`), and orchestration rules (`rules/frame-ship.md`). Zero occurrences of `multi-subagents` in active operational files.
- **Traceability:** Strict end-to-end traceability from `BRIEF` -> `OKR` -> `SPEC` (REQ-IDs) -> `PROPOSED_CHANGES` -> `IMPLEMENTATION_PLAN` -> `TEST_MATRIX` (evidence) -> `GATE_REPORT` -> `HANDOFF`.
- **Security & Privacy (Ley 172-13):** Zero PII, tokens, secrets, credentials, or session data in packet envelope strings, markdown artifacts, diffs, or logs. All exports and checkpoints must declare masking controls.
- **Reversibility:** Architectural changes must be documented via ADR (`ADR-009`) and remain atomic, verifiable, and cleanly revertible via git commits within ≤15 minutes.
