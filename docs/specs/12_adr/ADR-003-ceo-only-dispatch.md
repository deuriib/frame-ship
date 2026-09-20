# ADR-003: CEO-Only Dispatch — Single Dispatcher Contract

**Date:** 2026-09-16
**Deciders:** vasquez (CTO), montilla (CEO)
**Status:** accepted

## Context

The delegation contract was ambiguous at the edges and drifted into three
divergent shapes across `agents/` (68 templates), `skills/` (9 SKILLs +
references), the plugin `frame-ship.ts`, and three AGENTS.md files
(BRIEF-single-dispatcher.md:12). A prior cycle (SPEC-ceo-only-dispatch,
2026-09-16) implemented CEO-only dispatch and recorded its evidence in
`TEST_MATRIX-ceo-only-dispatch.md` and `IMPLEMENTATION_PLAN-ceo-only-dispatch.md` —
but the ADR file itself was never filed in `docs/specs/10_design/`, leaving the
citations dangling (TEST_MATRIX-ceo-only-dispatch.md:9,27,30,41;
IMPLEMENTATION_PLAN-ceo-only-dispatch.md:3,5,30; skills/AGENTS.md:24).
BRIEF-single-dispatcher (approved 2026-09-15) restores the decision as a formal
record: one dispatcher, one contract, zero residue. This filing completes ADR-003
(CEO decision #1); it is the repair of a missing record, not a new decision.

## Decision

1. **Single dispatcher = montilla (CEO) only.** No other role dispatches — not
   peers, not specialists, not sideways. Canonical contract sentence, uniform
   across all layers (wording contract owned by santana, SPEC-single-dispatcher-people
   §4 W2, reused verbatim by engineering): *"CEO dispatches entire team;
   c-levels/specialists do the work or brief back."*
2. **Montilla dispatches to the entire team** — C-levels AND specialists — via
   `task(general)`, max 2 parallel, with reference-only packets
   (SPEC/HARD/GATE/DOMAINS by path, never full-context pastes).
3. **C-levels/specialists never delegate.** They do the work end to end; a
   cross-domain need returns **inside the agent's return** (deliverable + file
   list + risks + assumptions + scoped evidence) as a formal **Cross-domain
   request** brief to the CEO: **Need** (what must be done) + **Reason** (why it
   needs another domain/specialist) + **Suggested owner** (owning C-level or
   specialist, 8-domain catalogue) + **Urgency** (P0 | P1 | P2). Montilla
   delegates it to the right agent — or resolves it — and tells the requester.
   Never sideways, never self-dispatch; never approve your own proposal or gate
   your own work.
4. **Scope (layers touched):** `agents/` (68 templates' Route/Delegation/adapter
   wording — santana-owned), `skills/` (SKILL.md process text + `tool-mapping.md`
   + `bootstrap-checklist.md`), plugin `frame-ship.ts` (injected strings only;
   single-file zero-dep, `hasMarker()` idempotency preserved), three AGENTS.md
   files (root, `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md`). Implementer
   prompts are out of scope (CEO decision #3 — cancelled; no
   `skills/templates/implementers/` location).
5. **Harness adapters for CEO-only dispatch:** opencode
   `task(subagent_type="general")` max 2 parallel; Codex
   `spawn_agent`/`followup_task`/`wait_agent` (provisional — unverified, open
   question carried to HANDOFF lessons); generic harness without a subagent tool
   falls back to single-mode direct execution. Packets remain reference-only.
6. **Scope of the dispatch-authorizing grep (AC-001 in TEST_MATRIX):** grep
   targets lines naming a non-CEO as `task` caller or granting fan-out
   (Route/dispatch/fan-out verbs), **excluding** montilla (negative control) and
   `tool-mapping.md` (mechanism documentation). Mechanism-description lines
   describing the CEO path stay; `bootstrap-checklist.md:11` and
   `quality-gate/references/gate-report.md:36` are explicitly exempt as
   mechanism descriptions.

## Consequences

### Positive

- One dispatcher, one contract, zero residue — grep-verifiable across all four
  layers (KR-1.1/1.2/2.1/2.2/2.3).
- Cross-domain needs get a defined shape (4-field formal brief) instead of an
  informal flag — the CEO routes or resolves fast, no sideways calls.
- Restores the dangling citation chain (TEST_MATRIX, IMPLEMENTATION_PLAN,
  skills/AGENTS.md) — the decision was already made and executed; filing is the
  repair.

### Negative

- montilla becomes the single routing point — dispatch throughput is bounded by
  the CEO; max 2 parallel caps fan-out per dispatch.
- The whole change set must move in lockstep (68 templates + 9 skills + plugin +
  3 AGENTS.md) or the contract drifts again — wording is a verbatim
  dependency on the people spec §4 (W1-W8), gate-diffed at 0 bytes.

## Rollback

Docs/config-only change — reversible per layer (owner: vasquez; ETA < 15 min):
plugin (`git revert` of the `frame-ship.ts` diff — version bump reverts with it;
re-run `tsc --noEmit`), skills (per-file `git revert` of reworded lines),
AGENTS.md (3 files), ADR (delete this file). No data migration, no external
undo.

## Supersedes / Superseded By

Supersedes the informal cross-domain flag mechanism ("need + reason + suggested
owner", never recorded as an ADR). Not superseded at filing time — ADR-004 does
not exist; this initiative completes ADR-003, it does not create ADR-004.