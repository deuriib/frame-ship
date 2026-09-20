---
name: frame-intent
description: Convert strategic direction into a structured Product Brief and OKR set. Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered. Triggered by "start a new initiative", "define OKRs", or "strategic planning".
---

# Frame-Intent — Strategic Intent to Product Brief

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

## 1. Purpose

Elicit strategic intent and freeze it into a Product Brief + OKRs before any
domain work starts. No specs, no code, no budgets committed here.

## 2. Chain Contract

- Previous: none (chain entry for this pack)
- Next: frame-ship:translate-to-spec

```text
frame-ship:frame-intent → frame-ship:translate-to-spec → frame-ship:propose-changes → frame-ship:review-security / frame-ship:review-architecture → frame-ship:execute-spec
  → frame-ship:quality-gate → frame-ship:verify-handoff → frame-ship:ship-release
```

## 2b. Role Binding (Org)

- **Bound to:** Orchestrator — classifies strategic intent and owns the brief.
- Domain owners do NOT write briefs; they receive them via reference.

## 3. Process

0. Pre-flight LOAD — HARD STOP (multi-subagents only): `skill(frame-intent)` loaded? Domain ownership identified? `execution_mode` about to be frozen? Any NO → STOP, load first. FAIL → retry N=2 → escalate. Output cites skill.
1. Explore context first — files, docs, recent commits — before detailed questions. If the request describes multiple independent subsystems, flag this immediately and decompose into sub-initiatives (own BRIEF→SPEC cycle each); brainstorm the first through the normal flow.
2. Classify first, announce the path, allow override — "this looks bounded, so I'll present a short brief here rather than write a full BRIEF file":
   - `spike-equivalent` — a feasibility question whose output is an answer, not a brief. Present probe in 2-3 sentences, get a nod, report a recommendation; anything built stays labeled throwaway.
   - `bounded-initiative` — a well-scoped intent with an existing flow to change. Ask the questions that matter, present a short BRIEF in chat, and STOP for an explicit yes. No BRIEF file.
   - `architectural-initiative` — new direction, new subsystem, restructure of how parts fit together. Follow the full flow below and write the BRIEF file.
     Ratchet is one-way: hidden complexity upgrades the path — stop, say so, step up. Nothing downgrades mid-initiative. When in doubt, take the heavier path.
3. Freeze execution as multi-subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as execution_mode in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
4. Elicit one question at a time — multiple-choice preferred, open-ended fine. Focus on purpose, constraints, success criteria. One question per message; break deeper topics into follow-ups.
5. Propose 2–3 framings with trade-offs, lead with the recommendation and why. YAGNI ruthlessly — cut every non-essential scope from each framing before presenting.
6. Present the BRIEF in sections scaled to complexity; ask after each section whether it looks right. Cover problem, outcome, scope, stakeholders, constraints.
7. Produce `docs/briefs/BRIEF-<slug>.md` using `references/product-brief.md` (with `Classification:`, `Framings-considered:`, `Approval:`) with `Domains-touched` declared from the 8-domain catalogue.
8. Define 2–4 OKRs using `references/okr-template.md`.
9. Self-review the written BRIEF with fresh eyes — placeholder scan (no TBD/TODO/vague lines), internal consistency, scope check (one SPEC cycle or decompose?), ambiguity check (one reading only) — fix inline, no re-review loop.
10. User reviews the BRIEF file before handoff: "BRIEF written at `<path>`. Please review and approve before we move to specs." Wait for explicit yes. HARD-GATE: ceremony scales with size — a spike's nod, a bounded yes, an architectural file approval — the approval itself never does.
11. Identify required domain owners (engineering, security, finance, legal, marketing, people, revenue, automation — 8-domain catalogue in `../AGENTS.md`) and flag cross-cutting concerns (data lens where schema/PII involved). Each domain owner understands their domain's practices.
12. Hand off the brief reference to `frame-ship:translate-to-spec` as `SPEC:<brief-path>#OKRs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
13. Close with a commit. Example: `docs(brief-auth): add BRIEF-auth with OKRs and domains-touched`.

### C1 — Classification-scaled challenger (opt-in plug-in, REQ-001)

- Scope: opt-in challenge round inside `frame-intent` only — never a new stage, never mandatory, never a reason to skip the HARD-GATE.
- Glossary (single source for C1+C2 — C2 points here, never redefines): `challenge` = the budgeted round; `grill` = informal collective noun for C1–C4 rounds only; `ronda` = Spanish alias for `challenge` in openers.
- Opener (exit alias `exit/salir`): "¿Quieres una ronda de desafío opt-in (máx N preguntas, una a la vez — N = 1 spike / 3 bounded / 5 architectural)? Di sí para empezar o `exit/salir` en cualquier momento para parar sin penalidad." (canonical: `docs/specs/10_design/SPEC-grilling-integration-people.md` §4 inserts 1–2).
- Exit: immediate stop, no re-ask in same stage, no penalty, recorded `grill: declined/exited`.
- Budgets, N per classification (default proposed, joint engineering + people sign-off at gate): spike 1 question hard cap; bounded typical 2–3 (hard cap 3); architectural full challenge hard cap 5 (4 core + 1 frontier-empty).
- Bounded floor: 1 question = early close, NOT a violation; 0 questions = invalid (must ask ≥1 or record `grill: declined`).
- Unclassified default: no `Classification:` → default heaviest path (architectural, cap 5); "when in doubt, take the heavier path" (§3 step 2) applies inside C1.
- N+1 enforcement: question N+1 = FAIL (blocked, must stop); declared prompt text, enforced by agent discipline + gate review.
- One-way ratchet: "Profundidad solo sube (spike→bounded→architectural), nunca baja mid-initiative." (canonical: people SPEC §4 insert 6).
- Turn-taking: "Hago una sola pregunta, espero tu respuesta, luego sigo." (canonical: people SPEC §4 insert 2).
- Disagreement invite on every recommended answer: "Mi respuesta recomendada es X — ¿dónde puede estar mal?" (where could this be wrong?) (canonical: people SPEC §4 insert 3).
- Warmth on every round: "Reto cálido y directo: desafío firme, nunca dureza. Si el tono aprieta, dilo y pausamos." (intent-match paraphrase per T-010 of people SPEC §4 insert 4; single source §4).
- Masking on every round: "Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)." (canonical: people SPEC §4 insert 5).
- Falsifiable-bet prompt: challenger runs a falsifiable-bet prompt over the 2–3 framings (what evidence would kill each framing?) and records the output in `Framings-Considered`.
- Pause/exit: after the round, offer pause/exit before continuing to the BRIEF.
- Stall breaker: Retry N=2 → escalate orchestrator. No-answer after 2 reminders → recorded `grill: stalled` + escalate, initiative pauses (no silent hang).

### Red Flags (adapted — approval scales, never skipped)

| Thought                                                 | Reality                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| "Too simple to need a brief"                            | Simple means a short brief in chat, not no brief. Two sentences, then approval. |
| "I'll call it bounded to skip the file"                 | Reaching for a label to skip work IS the doubt — take the heavier path.         |
| "The design is obvious — start while they read"         | The gate is the approval, not the length. Present, then stop until yes.         |
| "They approved the probe, so the follow-up is approved" | Each initiative gets its own classification and its own approval.               |
| "It grew, but almost done — no re-classify"             | Hidden complexity upgrades the path. Stop and say so.                           |

## 4. What I won't do

- Write implementation specs (→ `frame-ship:translate-to-spec`).
- Invoke sideways skills or paths (`writing-plans`, visual-companion browser mode, `docs/superpowers/`) — handoff is always `translate-to-spec` via reference-only packet.
- Approve my own brief or skip the HARD-GATE for any classification.
- Allocate budgets without finance domain owner approval.
- Commit to timelines without engineering domain owner feasibility input.

## 5. References

- `references/product-brief.md` — Product Brief template (includes `execution_mode`).
- `references/okr-template.md` — OKR template.
