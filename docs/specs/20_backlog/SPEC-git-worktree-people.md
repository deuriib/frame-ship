# Spec: Git-Worktree Isolation (People)

**ID:** SPEC-git-worktree-people
**Owner:** people owner (santana)
**Domains-Touched:** people
**Brief Reference:** BRIEF-git-worktree
**Status:** draft
**Priority:** P1
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent; override only with orchestrator + montilla waiver)

## 1. Context

`multi-subagents` (max 2 parallel) introduces isolated worktrees — a new habit for the team: consent prompts, announce lines, dirty-baseline refusals, and sandbox fallbacks. Without a people contract, parallel isolation creates change fatigue: inconsistent wording, surprise directory creation, and cryptic refusal messages that erode trust. This spec defines the human side of `skills/git-worktree/` — consent, announcement, and DX wording — complementing the engineering mechanics in `docs/specs/20_backlog/SPEC-git-worktree-engineering.md` (which owns file shape, pwsh flow, and ignore gates). Brief stays read-only; open question on announce tone is answered here with a uniform-template default.

## 2. Requirements

- REQ-PPL-001: Every worktree creation requires consent-before-create — an explicit prompt answered by the human before any `git worktree add` executes; silent/auto creation is forbidden and the answer is recorded in the session transcript.
- REQ-PPL-002: Every creation (and removal) emits one warm announce line using the uniform template, stating dónde + rama + por qué + limpieza in that order; per-owner tone variants are forbidden without people-owner + orchestrator waiver.
- REQ-PPL-003: Dirty-baseline refusal is human-readable — when `git status --porcelain` is non-empty, the operator sees cause + next options (stash / commit / explicit override) in plain language, never a raw git dump; override proceeds only on explicit recorded human confirmation.
- REQ-PPL-004: Change-fatigue guard holds — announce fires exactly once per create and once per remove (not per setup command), wording is byte-uniform with the template, and no repeat consent prompt fires within the same live worktree session.
- REQ-PPL-005: Cross-domain brief-back rides the orchestrator — people owner returns DX feedback on submodule-guard and sandbox-fallback messaging to the orchestrator as a formal Cross-domain request; specialists never negotiate wording sideways with engineering/automation/security.

## 3. Acceptance Criteria

- [ ] AC-001: Session transcript for every creation shows consent prompt + affirmative answer preceding `git worktree add` (evidence: transcript excerpt paths listed in test matrix; zero silent creations).
- [ ] AC-002: Each announce line contains all four parts (dónde / rama / por qué / limpieza) in uniform wording matching the §4 template modulo `<spec-id>`/`<branch>`/`<reason>` slots (evidence: transcript excerpts; `rg` diff of announce lines shows only slot values differ).
- [ ] AC-003: Dirty-baseline drill produces the §4 refusal script (cause + 3 options) and blocks `git worktree add` until explicit override confirmation is recorded (evidence: drill log + override record path).
- [ ] AC-004: A 2-SPEC parallel dry run shows exactly 2 create-announces + ≤2 remove-announces total and zero mid-session re-prompts (evidence: announcement count in test matrix).
- [ ] AC-005: Any wording change request or DX feedback on guard/fallback messaging exists as a Cross-domain request brief to the orchestrator, not as a direct edit to sibling specs (evidence: brief-back path or "none needed" statement in handoff).

## 4. Contracts & Interfaces

Announce-line template (uniform, warm; slots in angle brackets):

```text
Voy a crear el worktree en <donde: .worktrees/<spec-id>> con rama <rama> para <porque: SPEC-ID + motivo corto>; al terminar ejecuto <limpieza: git worktree remove ...> y te confirmo. ¿Procedo? [sí/no]
```

Removal line:

```text
Cierro el worktree en <donde> (rama <rama>): ejecuto <limpieza> y verifico `git worktree list`. Nada queda en tu workspace.
```

Dirty-baseline refusal script (plain language, ES acceptable):

```text
No puedo crear el worktree todavía: tu workspace tiene cambios sin guardar (<n> archivos). Opciones: (1) `git stash` y reintento, (2) commit en tu rama actual, (3) override explícito — dime "override registrado" y documento tu confirmación antes de continuar. No pierdo tu trabajo sin tu visto bueno.
```

Consent contract: prompt → human answer → recorded (transcript line reference) → only then `git worktree add`. Override contract: human types explicit override phrase → operator records `override: <who> <timestamp> <reason>` in session/test matrix → proceed. Sign-off: people-reviewer owns wording verdict via `skills/quality-gate/references/domains/people-review.md` (team impact, culture alignment, change plan).

## 5. Out of Scope

- Worktree mechanics (file shape, `git check-ignore` gate, pwsh joins, `mise run typecheck` baseline, max-2 enforcement) — owned by `SPEC-git-worktree-engineering`.
- mise/toolchain setup, lock serialization, worktree-root TTL decision — owned by automation/ops + security sibling specs; people spec only reviews fallback messaging DX.
- Trust-boundary map, secrets/PII masking, `.gitignore` entry — owned by security sibling spec.
- Changing chain order, runtime plugin, or 8-domain catalogue.
- Hiring/training plan beyond announce/consent habit — no new roles; flag only if gate finds skills gap.

## 6. Dependencies

- Upstream: `BRIEF-git-worktree` + `OKR-git-worktree.md` (read-only; answers brief Open Question "announce-line uniform template vs per-owner tone" with uniform-template default — escalation to orchestrator only on waiver request).
- Sibling (parallel, max 2): `SPEC-git-worktree-engineering.md` (mechanics this spec complements — no duplicated REQ IDs), automation/ops (baseline messaging surface), security (guard/fallback wording reviewed for PII hygiene).
- Downstream: `frame-ship:propose-changes` (packet `SPEC:docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005 / HARD:multi-subagents+consent-before-create+uniform-wording+win32-pwsh / GATE:none-yet / DOMAINS:[engineering,automation/ops,security,people]`), then `quality-gate` (people-reviewer), then `verify-handoff`.
- Templates: `skills/translate-to-spec/references/spec-template.md` (shape), `skills/quality-gate/references/domains/people-review.md` (gate lens).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-PPL-001 | AC-001 | PROPOSED_CHANGES.md | session transcript excerpts (consent Q+A per creation) |
| REQ-PPL-002 | AC-002 | PROPOSED_CHANGES.md | transcript excerpts + `rg` uniformity check |
| REQ-PPL-003 | AC-003 | PROPOSED_CHANGES.md | dirty-baseline drill log + override record |
| REQ-PPL-004 | AC-004 | PROPOSED_CHANGES.md | announcement count in test matrix |
| REQ-PPL-005 | AC-005 | PROPOSED_CHANGES.md | Cross-domain request brief path or none-needed statement |
