# Spec: brainstorm → frame-intent — classify-first elicitation before briefs

**ID:** SPEC-brainstorm-frame-intent-engineering
**Owner:** engineering owner
**Domains-Touched:** [engineering, people]
**Brief Reference:** BRIEF-brainstorm-frame-intent
**Status:** draft
**Priority:** P1
**Execution_Mode:** single (inherited from brief)

## 1. Context

Adapt obra `brainstorming` (pinned b36e082) into native improvement of `skills/frame-intent/`. Current frame-intent freezes intent with 3 flat questions and no gate; brainstorming adds classify-first (Spike / Bounded / Architectural), HARD-GATE approval, one-question-at-a-time elicitation, 2–3 framings with recommendation, YAGNI, decomposition, and self-review — while keeping frame-ship contract (BRIEF + OKRs only, handoff to translate-to-spec via reference-only packets).

## 2. Requirements

- REQ-001: Classify-first with announce + override + one-way ratchet: spike-equivalent / bounded-initiative / architectural-initiative mapped to BRIEF outputs (answer-only vs short BRIEF vs full BRIEF), never to `docs/superpowers/` or `writing-plans`.
- REQ-002: HARD-GATE: no handoff to translate-to-spec without explicit user approval; ceremony scales with size, approval never skipped; one-question-at-a-time (multiple-choice preferred).
- REQ-003: 2–3 framings with trade-offs + stated recommendation + YAGNI cut; context explored first (files/docs/commits) before detailed questions.
- REQ-004: Decomposition rule: multi-subsystem requests split into sub-initiatives before refinement; each gets own BRIEF→SPEC cycle; first sub-initiative brainstormed normally.
- REQ-005: Sectioned BRIEF presentation with per-section approval + post-write self-review (placeholder / consistency / scope / ambiguity, fixed inline) + final user review gate on written BRIEF file.
- REQ-006: Reference-only packets + REQ→evidence→artifact→verdict trace preserved; `execution_mode` freeze + `Domains-touched` carried; zero sideways refs (no writing-plans, no visual-companion, no superpowers paths).
- REQ-007: Frame-ship body shape + frontmatter convention: `name: frame-intent`, 1-sentence description with `Use when/Triggered by`; body Purpose / Chain / 2b Role / Process / Won't do / References; creed quote in SKILL only.

## 3. Acceptance Criteria

- [ ] AC-001: `skills/frame-intent/SKILL.md` contains classification + ratchet + HARD-GATE + one-at-a-time + framings + decompose + sectioned approval + self-review, worded as gates not advice.
- [ ] AC-002: Output contract intact: `docs/briefs/BRIEF-<slug>.md` + OKRs only; handoff packet `SPEC/HARD/GATE/DOMAINS` to translate-to-spec verified in text.
- [ ] AC-003: Red Flags table present (adapted, not dropped silently); Spike/Bounded/Architectural terminal states mapped to frame-ship outputs (no code/scaffold in this skill).
- [ ] AC-004: No vendored visual-companion / writing-plans / style skills; referenced by name only or explicitly excluded with reason.
- [ ] AC-005: Guardrails 1-14 hold: no secrets/PII in examples, least-privilege elicitation logging, PII minimization at prompt checkpoints.

## 4. Contracts & Interfaces

- Output targets: `skills/frame-intent/SKILL.md`, `skills/frame-intent/references/product-brief.md` (add `Classification:`, `Framings-considered:`, `Approval:` only if needed), `skills/frame-intent/references/okr-template.md` (unchanged expected).
- Sign-off contracts: engineering owner (process fidelity + chain binding), people owner (elicitation / collaboration wording, Red Flags tone).

## 5. Out of Scope

Runtime/plugin changes; other stage edits; visual-companion browser mode; `docs/superpowers/` output paths.

## 6. Dependencies

BRIEF-brainstorm-frame-intent; source SKILL.md @ b36e082 (reference only); skills/AGENTS.md conventions.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001, AC-003 | PROPOSED_CHANGES.md | classification text |
| REQ-002 | AC-001, AC-002 | PROPOSED_CHANGES.md | HARD-GATE text |
| REQ-003 | AC-001 | PROPOSED_CHANGES.md | framings + YAGNI text |
| REQ-004 | AC-001 | PROPOSED_CHANGES.md | decompose rule text |
| REQ-005 | AC-001, AC-002 | PROPOSED_CHANGES.md | self-review + gate text |
| REQ-006 | AC-002, AC-004 | PROPOSED_CHANGES.md | packet + no-sideways statement |
| REQ-007 | AC-001 | PROPOSED_CHANGES.md | frontmatter + shape diff |
