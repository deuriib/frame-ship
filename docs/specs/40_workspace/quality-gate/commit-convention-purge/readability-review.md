# Readability Review: commit-convention-purge

**Reviewer:** review-readability (engineering gate reviewer, dispatched by orchestrator Montilla CEO)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** `frame-ship:quality-gate` (`skills/quality-gate/SKILL.md` — single mode, min gate) + `references/engineering/readability-review.md` template
**Packet:** SPEC `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (commit `a17c7d8`) / HARD doc-only purge, §A 14 deletions + §B 23 citation edits, §C history kept per orchestrator ruling / GATE engineering single-domain, single mode (readability+risk only — this file) / DOMAINS engineering

## Checklist (adapted to doc-only purge)

- [x] No dangling references to deleted paths (no `commit-convention` pointer survives in `skills/`)
- [x] Markdown integrity of all 13 edited files (frontmatter untouched, numbering intact, examples retained per proposal)
- [x] Consistent style with surrounding docs (close lines read naturally, no orphan clauses)
- [x] No dead content (no commented-out blocks, no stub/redirect left behind)
- [ ] Inventory prose accurate post-delete (one stale count — see RD-001)

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RD-001 | Low | `skills/AGENTS.md:24` | Stage file-count line still claims `using-frame-ship` is "4 (SKILL + 3 refs)". After the template deletion `skills/using-frame-ship/references/` holds 2 files (`bootstrap-checklist.md`, `tool-mapping.md`) — actual is SKILL + 2 refs = 3 files. (`translate-to-spec` half of the same line is still accurate at 3 refs; `quality-gate` 18-file count re-verified: 2 top + 16 under `references/`.) One-line fix, no chain impact. |

## Verdict Rationale

Conditional on a single Low-severity item. All three focus areas verify clean against commit `f859726`:

1. **No dangling refs — ✅.** `git ls-files | grep -i commit-convention` → zero tracked files (all 14 §A deletions landed, empty gate dir dropped out of git). `rg commit-convention skills/` → zero matches (all 23 §B lines edited). Diff audit: 0 added (`+`) lines mention `commit-convention` anywhere — the purge is purely subtractive.
2. **Markdown integrity of 13 edited files — ✅.** All 7 stage-SKILL diffs match their proposal §B rows verbatim (close lines keep numbering + per-stage examples; `review-architecture` drops its example exactly as proposed). All §5/§6 reference bullets deleted outright from bulleted lists — no renumbering needed, none broken. Frontmatter (`name`/`description`) untouched in every file; no hunks outside §B scope. Residual `work-unit` phrasing in `skills/`: zero matches — cleaner than the proposal's carve-out required.
3. **§C history kept per ruling — ✅.** Repo-wide residual is exactly the §C set plus the proposal doc itself: `CHANGELOG.md` (2 lines), `RELEASE_NOTES.md` (3 lines), `plugin-001-concise-prompts.md` (1 line), `HANDOFF-skill-refs-normalization.md` (1 line) = 7 history lines as claimed in the commit message.

RD-001 is inventory prose, not a live pointer: no agent path reads that count line to resolve files, so nothing breaks. It clears with a one-line edit (COND-001) or an explicit orchestrator waive.

## Conditions for Opening

- [ ] COND-001 (RD-001): update `skills/AGENTS.md:24` count for `using-frame-ship` to SKILL + 2 refs (or rephrase the lumped line so both stages read accurately). Owner: engineering owner. ETA: minutes. Alternatively orchestrator records a waive.
