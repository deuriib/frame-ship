# Readability Review: SPEC-agents-into-plugin-engineering

**Reviewer:** review-readability (engineering wave; independent — did not author or implement this work)
**Date:** 2026-09-17
**Verdict:** ⚠️ CONDITIONAL (one doc-ref condition; plugin code itself reads well)
**Artifact type:** CODE (code lens applied; no code jargon outside this verdict)
**Scope:** `.opencode/plugins/frame-ship.ts` v0.6.0 (350 lines) + `.opencode/plugins/AGENTS.md` ref lines
**Packet:** SPEC `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004` / HARD `multi-subagents+single-file-zero-deps-idempotent-tsc-clean` / GATE `security-Approved-0-findings+architecture-Approved-no-ADR+impl-9f8328b-69de0f4-6eae5a8-a91a486` / DOMAINS `engineering`
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`
**Checklist source:** `skills/quality-gate/references/engineering/readability-review.md` + role per `skills/quality-gate/SKILL.md` §2b/§3

## Checklist

- [x] Naming is intention-revealing (no `data`, `tmp`, `x`)
- [x] Functions have single responsibility (one strain noted, RD-005, Low)
- [x] Nesting depth <= 3 (worst case ~3 sequential guards inside `for`; resolver `try→if→if→if` is early-return shaped, readable)
- [x] Comments explain WHY, not WHAT
- [x] Public APIs documented (`AGENTS_MANIFEST` header, loader contracts, hook invariants)
- [x] No dead code or commented-out blocks
- [ ] Consistent style with surrounding code — ✅ in `.ts`; ⚠️ in `AGENTS.md` line refs (RD-001, the single condition)

## Findings

| ID | Severity | Location | Principle violated | Finding + evidence |
|----|----------|----------|--------------------|--------------------|
| RD-001 | Medium | `.opencode/plugins/AGENTS.md:9-12` (WHERE TO LOOK table) | Maintainability / Consistency | Line refs are stale vs the v0.6.0 file and send the next reader to the wrong code. Evidence: table says Skills registration `frame-ship.ts:127-132` (actual roster-extended `config` hook is `frame-ship.ts:293-329`, skills-paths block `301-305`), System injection `134-141` (actual `330-337`), Bootstrap loader `89-117` (actual `163-191`), Compaction `142-147` (actual `338-343`). Only Dedupe `33-36` and Version `10-11` still resolve. Proposal promised "version ref follows the triple" but the line-number follow-through did not happen. Fix is 4 cell edits. |
| RD-002 | Low | `.opencode/plugins/frame-ship.ts:57-80` vs `85-108` | DRY / Maintainability | `resolveSkillsDir` and `resolveAgentsDir` are ~90% identical (own `import.meta.url` → drop last 3 → join leaf; only the leaf differs: `/skills` vs `/agents`). Readable and commented, so not blocking — but the next leaf addition is the 3rd occurrence that proves the pattern. Recommendation (next touch, not this gate): extract `resolveRepoLeaf(fallbackBase, leaf)` and keep the two thin wrappers. |
| RD-003 | Low | `.opencode/plugins/frame-ship.ts:117-140` vs `163-191` | DRY / Cognitive load | Bun-first + dynamic `node:fs/promises` fallback block is duplicated in `readTextFile` and `loadBootstrapBody` (same `globalThis.Bun?.file` probe, same `@ts-ignore` dynamic import, same silent-`""` contract). Consistent with the stated "precedent" convention, so accepted for v0.6.0; a shared `readFileWithFallback(path)` helper would remove the second copy when a third reader arrives. |
| RD-004 | Low | `.opencode/plugins/frame-ship.ts:150` (`parseAgentFile` regex) | Cognitive load | The description-extraction regex `/^\s*description\s*:\s*(?:"([^"]*)"\|'([^']*)'\|(.*?))\s*$/m` is dense with no shape example. The surrounding comment states the contract (verbatim, never rewritten) but a one-line example (`description: "Foo …"` → `Foo …`) would let the reader verify the three alternations at a glance. Cosmetic; suggest adding on next touch. |
| RD-005 | Low | `.opencode/plugins/frame-ship.ts:293-329` (`config` hook) | SRP / SoC | The `config` closure now owns three lanes: skills-paths (old), roster fill + mirror (new, `310-326`), defaults (`327-328`). Cohesive (all init registration) and well-sectioned by the "Roster lane (additive)" comment, so no split required now. If a fourth lane arrives, extract `fillAgents(c, agentsDir)` to keep the hook a three-line orchestrator. |
| RD-006 | Low | `.opencode/plugins/frame-ship.ts:193-207` + `112` vs `160-161` | Consistency (naming/details) | Two micro-inconsistencies, neither blocking: (a) `AgentMode = "primary" \| "all" \| "subagent"` — the WHY behind `montilla=primary` vs 8 C-levels=`all` lives in the SPEC, not in-code; one clause ("primary = default_agent target; all = dispatchable C-levels") would close it. (b) Two cache shapes for the same idea: `agentFileCache: Map` (per-path) vs `bootstrapCachePath/Text` pair (single-path). Both correct; unifying is optional polish. |

Out-of-scope for this lens (noted, not judged): correctness of the 74-key count, `tsc` green, idempotency replay, secret/PII scan → `review-reliability` / `qa` / `security-reviewer`. No bugs hunted, no compliance verified, no tests run (read-only review).

## Verdict Rationale

The v0.6.0 diff reads like the v0.5.0 file it extends: same resolver precedent, same Bun-first/dynamic-fallback idiom, same `??=`/guard-clause idempotency voice, alias (`espinoza-specialist`, `frame-ship.ts:203-205,224`) and silent-skip contracts stated where the reader needs them. Naming is intention-revealing throughout (`hasMarker`, `resolveAgentsDir`, `readTextFile`, `parseAgentFile`, `AGENTS_MANIFEST`); comments carry WHY (global-install cwd note `50-56`, zero-dep/`tsc` note `54-56,114-116`, never-wedge note `306-309`); version triple is together (header `v0.6.0` L2 + `VERSION` L10 + `MARKER` L11 + `AGENTS.md:4` OVERVIEW). No finding blocks understanding of the plugin itself. The single condition is the stale `AGENTS.md` navigation table (RD-001): a clarity artifact that points at wrong lines is worse than no pointer, and the fix is four cells. Duplication findings (RD-002/003) stay advisory per the project's own DRY rule (extract at the 3rd occurrence; two explicit copies read better than a premature abstraction — KISS over DRY here).

## Conditions (must clear before gate keeper marks OPEN)

- [x] COND-001 (from RD-001): update `.opencode/plugins/AGENTS.md` WHERE TO LOOK line refs to v0.6.0 actuals — skills-paths block, system-transform hook, `loadBootstrapBody`, compacting hook (dedupe + version rows already correct). Verify each cited range resolves after edit. → CLEARED per DELTA 2026-09-17 (commit `2966f15`; see cell-by-cell table below).

## Positive observations (what reads well)

- Header comment (L1-6) + `CHAIN` single-source-of-truth (L13-14): the next reader learns version, chain, location, and creed in six lines.
- `??=` on every config insert (`301-304,312-313,323-324,327-328`) + `includes()` path guard (L304) + `hasMarker` push guards (L333,341): idempotency is visible at each site, matching REQ-NF-002/AC-004 without hunting.
- Loader honesty: `readTextFile` caches hits only, never misses (L111,135); misses skip the entry, never throw init (L318-319) — the failure contract a reader fears is answered in-code.
- `parseAgentFile` (L145-154): fence-strip + verbatim-description + trim-prompts in nine lines; no frontmatter leaks by construction.
- `AGENTS_MANIFEST` provenance comment (L201-207): count math (77−3=74), sole alias, mode legend, and "never pasted here (reference-only provenance)" — the exact context a future editor needs before touching the roster.
- Zero-dep discipline intact: `import type` only (L8), no static `node:` import, dynamic imports function-scoped with `@ts-ignore` justification — `tsc`-clean reasoning is local to each site.

## Scoped evidence (reference-only, no pastes)

- Config-hook extension: `frame-ship.ts:293-329` (impl commits `6eae5a8`, `a91a486` per packet).
- Loader trio: `frame-ship.ts:85-108,117-154` (impl commit `69de0f4`).
- Manifest: `frame-ship.ts:208-283` (impl commit `9f8328b`).
- Stale refs: `.opencode/plugins/AGENTS.md:9-12` vs actuals cited in RD-001.

## DELTA (re-verification 2026-09-17, fix commit 2966f15)

**Delta verdict:** ✅ PASS — COND-001 CLEARED. Prior verdict was ⚠️ CONDITIONAL solely on RD-001/COND-001; all other findings were advisory Low (RD-002..RD-006, unchanged by this fix).

**Fix scope verified:** commit `2966f15` touches `.opencode/plugins/AGENTS.md` (WHERE TO LOOK cells + line count) + `package.json` (0.5.0 → 0.6.0). No plugin-code change; prior CODE-lens findings stand as written.

**Cell-by-cell resolution (read back against `frame-ship.ts` @ 403 lines total):**

| Cell | Claim | Actual | Resolves? |
|------|-------|--------|-----------|
| OVERVIEW (`AGENTS.md:4`) | `v0.6.0`, 403 lines | Header `frame-ship.ts:2` = `v0.6.0`; `VERSION` L10 = `0.6.0`; `package.json:3` = `0.6.0`; file total = 403 lines | ✅ count + version quadruple (header + VERSION + MARKER L11 + manifest) aligned |
| Skills registration (`:348-352`) | `config` hook, skills-paths push, idempotent | L340 `config:` hook; L348-352 `??=` + `includes()` guard + `push(skillsDir)` | ✅ |
| System injection (`:383-390`) | `experimental.chat.system.transform`, 3 cards + live body, silent fallback | L383 hook; L387 pushes 3 cards; L388-389 bootstrap load + conditional push | ✅ |
| Bootstrap loader (`:210-238`) | `loadBootstrapBody()`, Bun-first, dynamic fallback, per-path cache, label+ack+body | L210-238 exact function span; L217-221 `Bun.file`; L223-228 dynamic `node:fs/promises`; L207-208/214/232-233 per-path cache; L231 labeled assembly | ✅ |
| Compaction (`:391-396`) | `experimental.session.compacting`, 1 reminder | L391-396 exact span; L395 single `push(COMPACTION_REMINDER)` | ✅ |
| Dedupe (`:33-36`) | `hasMarker()` + `includes()` | L33-36 `hasMarker()`; `includes()` at L351 (hook-scoped, correctly not in this range) | ✅ |
| Version (`:10-11`) | `VERSION` + `MARKER` bump together | L10 `VERSION = "0.6.0"` + L11 `MARKER` derived | ✅ |

**Readability notes on the fix itself:** table Notes column still describes intent in one clause per row (no WHAT-echo); ranges are tight (4-8 lines each) except the loader (29 lines = full function, justified — the Bun-first/fallback/cache contract needs the whole span). No new duplication, naming, or nesting introduced (docs-only diff).

**Independence:** I did not author, implement, or fix this work; this delta is a read-back verification only. No tests run (read-only review per lens constraints).

**Conditions:** none remaining. COND-001 is CLEARED; gate keeper may mark this reviewer's line OPEN.
