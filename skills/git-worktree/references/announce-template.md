# Announce Template — git-worktree isolation (people contract)

**Owner:** people owner (santana)
**Spec:** `docs/specs/20_backlog/SPEC-git-worktree-people.md#REQ-PPL-001..005` (SPEC §4 verbatim)
**Architecture:** `docs/specs/10_design/ARCHITECTURE-git-worktree.md` INV-008 (adopted verbatim)
**Scope note:** this file owns announce/consent/refusal wording only. Skill mechanics (`worktree-lifecycle.md`), pwsh flow (`pwsh-flow.md`), security gates (`guards.md`), and `.gitignore` live with sibling lanes — complement, never duplicate. Consumed by reference from `worktree-lifecycle.md` §1/§3. Single writer: people lane.

## 1. Create line (exactly once per create, consent prompt included)

```text
Voy a crear el worktree en <donde: .worktrees/<spec-id>> con rama <rama> para <porque: SPEC-ID + motivo corto>; al terminar ejecuto <limpieza: git worktree remove ...> y te confirmo. ¿Procedo? [sí/no]
```

Slot order fixed: donde + rama + porque + limpieza. Slot-only variance permitted (`<donde>` / `<rama>` / `<porque>` / `<limpieza>`); any other wording change requires people-owner + orchestrator waiver (REQ-PPL-002).

EN consent equivalent (same slot order, same gate force):

```text
I will create the worktree at <donde: .worktrees/<spec-id>> on branch <rama> for <porque: SPEC-ID + short reason>; on completion I run <limpieza: git worktree remove ...> and confirm. Proceed? [yes/no]
```

Contract: prompt → recorded human answer (transcript line ref) → only then `git worktree add`. Silent/auto creation forbidden (REQ-PPL-001).

## 2. Remove line (exactly once per remove)

```text
Cierro el worktree en <donde> (rama <rama>): ejecuto <limpieza> y verifico `git worktree list`. Nada queda en tu workspace.
```

EN equivalent:

```text
Closing the worktree at <donde> (branch <rama>): running <limpieza> and verifying `git worktree list`. Nothing remains in your workspace.
```

## 3. Dirty-baseline refusal script (plain language, never raw git dump)

```text
No puedo crear el worktree todavía: tu workspace tiene cambios sin guardar (<n> archivos). Opciones: (1) `git stash` y reintento, (2) commit en tu rama actual, (3) override explícito — dime "override registrado" y documento tu confirmación antes de continuar. No pierdo tu trabajo sin tu visto bueno.
```

Override contract: human types explicit override phrase → operator records `override: <who> <timestamp> <reason>` in session/test matrix → proceed (REQ-PPL-003). `git worktree add` stays blocked until that record exists.

## 4. Change-fatigue guard (REQ-PPL-004)

- Announce fires exactly once per create and once per remove — never per setup command.
- Wording byte-uniform with this template (`rg` diff of announce lines shows only slot values differ).
- Zero repeat consent prompts within the same live worktree session.
- 2-SPEC parallel dry run expectation: exactly 2 create-announces + ≤2 remove-announces total.

## 5. Cross-domain brief-back (REQ-PPL-005)

Any wording-change request or DX feedback on sibling guard/fallback messaging is filed as a formal Cross-domain request brief to the orchestrator — never as a direct edit to sibling specs, never sideways:

```text
Cross-domain request → orchestrator: [Need] <wording/DX feedback> [Reason] <why> [Suggested owner] <engineering/automation/security> [Urgency: P0|P1|P2]
```

## 6. Evidence hygiene (SEC Conditional C-006, S-006)

- Transcript evidence is scoped excerpts only (allowlisted paths + redacted slot values); full-transcript dumps refused.
- Slots carry no secrets/PII (`<donde>/<rama>/<porque>/<limpieza>`, `<n> archivos`); scan before share.
- Exactly-once count verified in 2-SPEC dry run and recorded in `TEST_MATRIX-git-worktree-people.md`.
