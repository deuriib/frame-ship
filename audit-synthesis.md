# Frame→Ship Audit Synthesis & Alignment Recommendation

**Orchestrator:** AgentsOrchestrator
**Date:** audit pass 1
**Target:** `/home/deuriib/projects/frame-ship` @ `8191d93`
**Benchmark:** `/home/deuriib/projects/agency-agents` @ `v1.13.0`
**Method:** 3 independent read-only subagent audits + orchestrator synthesis. No repository behavior was changed.

## Sources

| Report | Author | Focus |
|--------|--------|-------|
| `audit-structure.md` | Explore Agent | Structural inventory, duplication map, verbosity, consistency gaps (681 lines) |
| `audit-workflow-optimizer.md` | Workflow Optimizer | Workflow gaps, lifecycle coverage, NEXUS alignment, prioritized remediation |
| `audit-refuter.md` | Refuter Reviewer | Adversarial stress-test of the 4 alignment proposals + pre-existing defects |

Where the three disagree, this synthesis resolves toward the more conservative (control-preserving) position.

---

## 1. Executive Summary

Frame→Ship is a **rigorous, evidence-oriented delivery chain** wrapped in a **thin, partially-wired runtime**. The chain is coherent and in several places *better* than NEXUS (proposal-before-code, ADR gating, REQ→test→artifact trace, three-block waiver bar, C1–C4 challenge rounds, per-reviewer independence, Ley 172-13 PII checkpoints). The problems are **structural, not conceptual**.

The single most important fact: **Frame→Ship's value is not its roster or its stage list — it is its controls.** The creed ("Haces las cosas como para Dios…"), the Dominican-jurisdiction privacy bar (Ley 172-13), the single-dispatcher invariant, and "no min-gate / no silent downgrade" are the product. Any simplification that deletes these is control removal, not tidiness.

---

## 2. The Alignment Question, Answered

**Question:** "How do we simplify and align frame-ship with agency-agents' available agents?"

**Answer:** Align them as **runtime vs. talent pool**, not as two competing methodologies. Frame→Ship is the *harness + methodology* (chain, rules, skills, plugin runtime). Agency-agents is the *roster + scenario knowledge* (299 agents, 42 NEXUS runbooks). The correct relationship is:

- **Frame→Ship = the runtime and the delivery doctrine** (keep it).
- **Agency-agents = the talent pool and the scenario catalog** (consume additively, pinned and vendored).
- **Borrow NEXUS *patterns*, never replace the chain with NEXUS runbooks.**

### 2.1 The four proposals, with verdicts

| # | Proposal | Verdict | One-line reason |
|---|----------|---------|-----------------|
| **P-A1** | Adopt agency-agents' granular engineering roles (drop fused specialists) | **SUPPORT-WITH-CONDITIONS** | Additive vendoring only, never replacement; keep the 25/32 agents with no upstream twin |
| **P-A2** | Drop the 9 named personas | **OPPOSE** | No upstream counterpart; they carry creed, Ley 172-13, and single-dispatcher authority |
| **P-B** | Replace the fixed chain with NEXUS scenario routing | **OPPOSE** | Runbooks are *downstream consumers* of the chain (they consume BRIEF/REQ/ADR); `NEXUS-Micro` reintroduces the min-gate frame-ship forbids |
| **P-C** | Deduplicate rules into one source of truth | **OPPOSE** | Premise false: `agency-agents` has **no rule layer** (0 files carry the `SEC-nn`/`ENG-nn` ID scheme) |
| **P-D** | Make frame-ship a thin adapter over roster+strategy | **SUPPORT-WITH-CONDITIONS (reduced)** | Repair/wire the *roster-only* adapter already half-attempted; exclude strategy/runbooks |

### 2.2 The correct mental model

```
frame-ship (harness + doctrine)          agency-agents (talent + scenarios)
─────────────────────────────────        ─────────────────────────────────
  chain (9 stages → 6 target)              42 NEXUS runbooks
  rules/ (235 IDs, gate-bearing)           299 role-based agents
  skills/ (11 stage skills)                nexus-strategy.md (7 phases)
  plugin runtime (4 lanes, 1065 LOC)       divisions.json + runbooks.json
  named personas (creed + Ley 172-13)      converters for 21 tools
        │                                         │
        │   borrow PATTERNS (additive)            │   consume ROSTER (additive)
        │   ─ Applicability tables                │   ─ granular specialists
        │   ─ GO/NO-GO discovery gate             │   ─ Reality Checker
        │   ─ Operate phase + cadence             │   ─ Evidence Collector
        │   ─ human-authority boundary            │   ─ (pinned, vendored, hashed)
        └─────────────▶ KEEP the chain ◀──────────┘
```

---

## 3. Top Findings (cross-report consensus)

### 3.1 Critical

1. **The rule corpus is un-wired.** 235 rule IDs across 15 files; **233 are never cited** by any stage, gate, reviewer, or artifact (0.8% governing effect). ~6.1k tokens injected on every context build with no checkpoint.
2. **CI is a no-op.** `.github/workflows/ci.yml` has `typecheck` and `test` steps commented out — green on zero executed steps. Violates the repo's own `DENY-04`, `TST-07`, `AUT-05`.
3. **Silent permission-stripping parser bug.** `agents.ts` parses `tools:` with a block-list-only regex; the flow-list form (`tools: [a, b]`) that the agency-agents converter emits parses to `[]`, which denies **all four capability classes silently** (no throw, no warning, no CI to catch it).
4. **No Operate phase.** `ship-release` declares `Next: none`. Eight rule families (`AUT-08/13/14/17`, `SEC-14`, `ENG-22`, `REV-12..15`) mandate post-ship controls with no stage to enforce them.

### 3.2 High

5. **Three chains, one truth.** The chain string exists in 6 places, 3 different texts (with/without `research`, with/without `using-frame-ship`).
6. **Two dangling routes that gates actively point at.** `frame-ship:debugging` and `frame-ship:pull-request` are cited as next stages but **no such skills exist**. A CLOSED gate under the repo's own "No skill = STOP" rule is an unrecoverable stop.
7. **`Vasquez` is two incompatible agents, one name.** frame-ship's = Engineering Owner (CTO); agency's = Agency-Flow process steward (forbidden from signing domain gates). agency-agents hardcodes it as a primary agent (`converter.py:64`).
8. **Four verdict vocabularies in one gate.** `APPROVE/CONDITIONAL/CLOSED` vs `Approved/Conditional/Rejected` vs `pass/conditional/fail` vs `✅/⚠️/❌`; the token `CLOSED` means *approved* in some files and *rejected* in others. Gate output is unparseable/unauditable by machine.
9. **No human-authority boundary.** Every approver in the roster is an agent; no row requires a human signature for legal/regulatory/security-exception/irreversible decisions. Contradicts `MKT-13`/`DENY-07`.

### 3.3 Medium

10. **Four rosters, one of them dead.** `agents/` (32), `AGENTS.md` (15, with ghosts), `quality-gate` routing table (9, with ghosts), and `.omp/agents/` (15 agency-agents already vendored, referenced by **no manifest**).
11. **Commands are sanctioned chain bypasses.** 6 prompts × 3 copies ("build it, loop until green") with no chain/proposal/gate reference.
12. **`rules/REV.md` typo** `triger:` → 22 revenue rules never trigger.
13. **`docs/frame-ship/` tree, `tests/`, `scripts/bump-version.mjs`, and cited ADR-003/INV-012 do not exist** — yet are referenced by 11+ skill steps and documented as `[x]` in the README.
14. **Version/license drift.** `shared.ts` `0.12.0` vs manifests `1.0.0`; MIT vs Apache-2.0.

---

## 4. Prioritized Action Plan

### P0 — Correctness (do first; nothing else is safe until these land)

| ID | Action | Effort |
|----|--------|--------|
| **P0-1** | Restore CI: un-comment `typecheck` + `test`; add a real green-suite gate | 1h |
| **P0-2** | Make the `tools:` parser strict: unparseable shape → throw at setup, never silently `[]` | 2h |
| **P0-3** | Ship or delete the two dangling skills (`debugging`, `pull-request`); stop routing gates to a dead end | 2h–2d |
| **P0-4** | Fix `rules/REV.md:2` `triger:` → `trigger:` | 1min |
| **P0-5** | Single machine-readable chain source (generated cards), delete the 5 hand copies | 1–2d |
| **P0-6** | Delete the 2 hardcoded guardrail condensations; fix agy lookup to read `rules/**/*.md` | 0.5d |
| **P0-7** | Wire the rule corpus or shrink it: add `Rule-ID` to gate reports (target ≥80% cited) **or** cut to the ~40 checkable IDs | 1–5d |

### P1 — Lifecycle completeness (recover the 3 missing NEXUS phases)

| ID | Action |
|----|--------|
| **P1-1** | Add `operate` stage (SLO, canary/rollback rehearsal with timestamp, on-call, incident trigger, feedback→discover loop) |
| **P1-2** | Add a discovery gate to `research` (GO/NO-GO/PIVOT with named thresholds) |
| **P1-3** | Add `scaffold` (greenfield: repo skeleton, CI, test harness, conventions) |
| **P1-4** | Give `ship-release` a `GO/NO-GO/HOLD` that can fail + rehearsed rollback |
| **P1-5** | Encode one parallelism rule (implementation lanes ≤2; reviewer wave unbounded-batched); delete the "as much as possible" contradiction |
| **P1-6** | Add the human-authority boundary (human signature for legal/regulatory/security/irreversible) |
| **P1-7** | Make gate evidence non-self-attested (openable by a second person) |
| **P1-8** | Unify verdict vocabulary to one enum; make `GATE_REPORT.md` machine-parseable |

### P2 — Simplification (collapse, dedupe, route)

| ID | Action |
|----|--------|
| **P2-1** | Collapse 9 stages → 6 (`discover` → `specify` → `review` → `build` → `gate` → `ship`); 11 skills → 7 |
| **P2-2** | Regenerate `AGENTS.md` from `agents/` (CI-checked); fix ghosts; single roster source |
| **P2-3** | Add scenario routing with Applicability tables (borrow the NEXUS *pattern*, keep the chain) — start with 8 runbooks |
| **P2-4** | Rewrite `commands/` as 3-line pointers into the chain; delete 2 of 3 copies |
| **P2-5** | Unify artifact tree on `docs/frame-ship/`; kill the numeric namespace |
| **P2-6** | Collapse `XD.md` + `DENY.md` into a rule matrix |

---

## 5. The Alignment Playbook (what to actually do)

1. **Fix the foundation first** (P0-1 and P0-2). A silent-failure parser with no CI makes any migration an unrehearsed change to a system that cannot tell you it broke.

2. **Adopt agency-agents' granular specialists additively** (P-A1), never by replacement:
   - Vendor into `agents/external/<slug>.md` with a render step that emits block-list `tools:`, `subagent: true`, `effort:`, `id`.
   - Commit the render output so runtime never depends on the converter.
   - Pin upstream version + per-file SHA-256 in a `VENDOR.md`; check drift in CI (copy agency-agents' `sync_catalog_data.py --check` pattern).
   - Keep all 25/32 frame-ship agents with no upstream twin.

3. **Keep the named personas and the local rules.** They carry the creed, Ley 172-13, and single-dispatcher authority — no upstream home exists for these.

4. **Borrow NEXUS *patterns* into the chain**, not NEXUS runbooks as a replacement: GO/NO-GO discovery gate, Operate phase, human-authority boundary, "openable by a second person" evidence, scenario Applicability tables, activation-mode sizing.

5. **Resolve the `Vasquez` collision explicitly** before any roster merge — they are incompatible homonyms, and upstream hardcodes it as primary.

6. **Wire or kill `.omp/agents/`** (the dead 4th roster) and remove the `~/.agency-agents/strategy/` runtime path dependency (or declare it a hard requirement with a startup check).

---

## 6. What Frame→Ship must NOT lose (the moat)

These have **no NEXUS equivalent** and are the reason to keep Frame→Ship as the doctrine layer:

1. `PROPOSED_CHANGES` before any code (repo untouched).
2. ADR-gated invariant changes (`Status: proposed` + merged code = FAIL).
3. `REQ-ID → test → artifact → verdict` trace + C4 link resolution.
4. Three-block waiver bar with expiry and re-review owner.
5. C1–C4 challenge rounds (budgeted adversarial interrogation).
6. Per-reviewer independence ("strictly 1 subagent per reviewer").
7. Four-layer rules corpus (`DENY`/`GEN`/domain/`XD`) with numbered IDs.
8. Archive MOVE + promote + purge allowlist.
9. Ley 172-13 PII checkpoints in every artifact.
10. The creed and Dominican warmth contract.
