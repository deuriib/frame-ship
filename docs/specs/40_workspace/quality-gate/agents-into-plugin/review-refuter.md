# Refuter Review: SPEC-agents-into-plugin-engineering

**Reviewer:** review-refuter (adversarial — did not author, propose, or implement this work)
**Date:** 2026-09-17
**Verdict:** ✅ pass ("could not falsify" — claims hold; 4 advisory Low/Info findings, none gate-blocking)
**SPEC:** `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` (REQ-001..004 + NF-001..004)
**Under review:** `.opencode/plugins/frame-ship.ts` v0.6.0 (impl commits `9f8328b`, `69de0f4`, `6eae5a8`, `a91a486`) + `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`

## Mission

Attempt to **falsify** the implementer's claims against the real code. Success = a counterexample with proof. Finding without proof (diff/scan/log) = REFUTED — including my own.

## Implementer claims under test

1. 74/74 roster (MANIFEST keys == disk files, modes 1 primary / 8 `all` / 65 `subagent`, sole alias `espinoza-specialist`)
2. 5-agent spot check (montilla, vasquez, backend, qa, scout — real bodies + descriptions, no frontmatter leak)
3. Idempotent never-clobber double-init (no dupes in `skills.paths` / `config.agents` / `config.agent`; user overrides survive)
4. Never-throw init (missing files, malformed frontmatter, double-init, user pre-seeds, unresolvable agentsDir)
5. Typecheck green, single-file zero-deps, version triple bumped together

## Attack vectors tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | MANIFEST count ≠ disk count | Disk scan (`agents/**/*.md` minus 3 excluded) vs `key:` count in plugin | **Confirmed (74 == 74).** Disk: 74 files; excluded `AGENTS.md`/`README.md`/`delegation-contract.md` all present on disk and correctly excluded; MANIFEST: 74 `key:` entries, 0 dup keys |
| RF-002 | A MANIFEST `file:` path does not resolve on disk | Resolved all 74 `file:` values against `agents/` | **Confirmed.** 0 missing (`scan-done`, no MISSING lines) |
| RF-003 | Mode split ≠ contract (1 primary / 8 all / 65 subagent) | Grouped `mode:` values | **Confirmed.** `primary=1, all=8, subagent=65` (frame-ship.ts:209-282) |
| RF-004 | Per-category counts ≠ SPEC §Roster | Disk group-by vs MANIFEST group-by vs SPEC | **Confirmed.** Both: c-level 9, engineering 15, finance 14, legal 8, marketing 9, people 4, revenue 5, security 6, shared 4 |
| RF-005 | Key ≠ file stem (undeclared renames beyond the alias) | Compared all 74 key/stem pairs | **Confirmed.** All match except the single documented alias `espinoza-specialist` → `engineering/espinoza.md` (frame-ship.ts:224); c-level `espinoza` keeps its key (line 212). No other renames |
| RF-006 | Spot-check agents have empty descriptions or fence leak in prompts | Replicated `parseAgentFile` exactly, ran over the 5 files | **Confirmed.** desc_len 158/216/246/200/154, prompt_len 2118-6200, no `---` head leak in any prompt |
| RF-007 | Double-init duplicates keys or paths | Logic simulation of config-hook lane (T1) + code read (`??=` per key, `continue` when both sides present, `includes()` for paths) | **Confirmed.** Keys stable across runs; no dupes |
| RF-008 | User pre-seed gets clobbered | Simulation T2 (one side pre-seeded) + T3 (both sides pre-seeded) + code read (frame-ship.ts:314-324) | **Confirmed.** Pre-seeded side survives; missing side still fills; both-seeded skips file read entirely |
| RF-009 | Missing agent file throws or wedges init | Simulation T5 + code read (`readTextFile` try/catch → `""`, `if (!raw) continue`, `if (!parsed.prompt) continue`) | **Confirmed.** Skip-entry, never throw |
| RF-010 | Malformed frontmatter (no fence, no description, CRLF, unquoted) throws or leaks | Adversarial inputs through exact-logic replica | **Confirmed** for all shapes present on disk. No-fence → whole-text prompt (safe); no-description → empty desc + clean body; CRLF/unquoted parse correctly. **Latent exception:** BOM or leading-newline prefix defeats the `^---` anchor → frontmatter leaks into prompt (see F-002; no such files on disk — full scan: 0 BOM, 0 non-`---` first lines) |
| RF-011 | Unresolvable agentsDir pollutes config or throws | Code read (frame-ship.ts:286, 310-311, 327-328) | **Confirmed.** `""` fallback → `"/agents"` guard skips the lane; `default_agent`/`subagent_depth` still apply via `??=`; skills lane independent |
| RF-012 | `parseAgentFile` description regex truncates real descriptions | All 74 disk files match `^description:\s*".+"`; replica parsed the 5 spot-checks verbatim | **Confirmed.** 0 empty/unquoted descriptions on disk |
| RF-013 | Typecheck is red | `mise run typecheck` | **Confirmed green** (exit=0) |
| RF-014 | Hidden deps or static `node:` import | Grep `^import`/`require(`/`from "node:` | **Confirmed zero-dep.** Sole import is `import type` (frame-ship.ts:8, erased at compile); `node:fs/promises` only via function-scoped dynamic import behind `@ts-ignore` (lines 129, 177) |
| RF-015 | "Single-export" as literally stated | Grep `^export` | **Refuted as worded — by design, not regression.** Two exports: named `FrameShipPlugin` (line 285) + `export default` mirror (line 350). The mirror is the intentional pre-existing v1-loader pattern (comment lines 347-349), untouched by this spec. Claim holds only as "single-file, dual-export-shape" |
| RF-016 | Secrets/PII smuggled into the plugin diff | Pattern scan (keys, tokens, private-key headers, JWT, Slack tokens) | **Confirmed clean.** 1 hit = false positive (`risk-analyst` key matching `sk-`) |
| RF-017 | Impl scope exceeds proposal (extra files touched) | `git show --stat` on all 4 impl commits + diff stat | **Confirmed scoped.** Only `frame-ship.ts` + the approved `.opencode/plugins/AGENTS.md` version-ref follow (commit `a91a486`); `agents/` untouched |

## Counterexamples found

| ID | Counterexample | Impact | Reproduction | Severity |
|----|---------------|--------|--------------|----------|
| CE-001 | Shared `record` reference: `c.agents[k]` and `c.agent[k]` point to the **same object** (frame-ship.ts:322-324). Mutating one side's entry mutates the other | Low — harness treats config as read-only, but any consumer writing `config.agents.x.description` silently corrupts the mirror (violates the spirit of "never-clobber" across the mirror boundary) | Sim T4: after one hook run, `cfg.agents.k1.description = 'MUTATED'` → `cfg.agent.k1.description === 'MUTATED'` → `YES-shared-ref`. Fix: `c.agents[k] ??= {...record}` / separate literals | ⚠️ Low |
| CE-002 | BOM (`\uFEFF`) or leading-newline prefix defeats the `^---` fence anchor → **entire raw file incl. frontmatter becomes the prompt** | Latent Low — full disk scan proves 0 affected files today (no BOM, all 74 start with `---`), so AC-002 holds; a future editor-added BOM reopens it | Adversarial run: `bom: {"description":"","prompt":"---\nname: x\ndescription: ...` — description lost AND frontmatter leaks into prompt. Fix: strip leading `\uFEFF`/whitespace before matching | ⚠️ Low (latent) |
| CE-003 | Root `package.json` still `0.5.0` while plugin header is `0.6.0` — version-manifest drift vs the project convention (AGENTS.md: "bump header + VERSION + MARKER + manifest together") | Low — SPEC REQ-004's triple (header + VERSION + MARKER, all inside the plugin file) **is** together at v0.6.0 (lines 2, 10, 11); only the root manifest ref lags. Needs an explicit ruling (align it or declare root manifest out of the triple) | `package.json: "version": "0.5.0"` vs `frame-ship.ts:2 v0.6.0` | ⚠️ Low |
| CE-004 | Commit messages cite `TEMP verify.ts` AC-001/AC-004 GREEN logs that are **not in the repo** — test evidence is not independently auditable from the repo alone | Info — behavior re-verified independently by this review (RF-001..RF-011 with logs above); traceability gap only, not a behavior gap | `git show 6eae5a8` / `a91a486` messages reference TEMP script; no such file committed. Recommend attaching the log excerpt to the gate packet | ⚠️ Info |

## Claim table

| Claim | Verdict | Evidence |
|-------|---------|----------|
| 74/74 roster, modes 1/8/65, sole alias | ✅ Confirmed | RF-001..RF-005 |
| 5-agent spot check, no fence leak | ✅ Confirmed | RF-006, RF-012 |
| Idempotent never-clobber double-init | ✅ Confirmed | RF-007, RF-008 |
| Never-throw init | ✅ Confirmed (latent BOM edge noted, CE-002) | RF-009, RF-010, RF-011 |
| Typecheck green | ✅ Confirmed | RF-013 (`mise run typecheck`, exit=0) |
| Single-file zero-deps | ✅ Confirmed | RF-014, RF-017 |
| Version triple together | ✅ Confirmed for the plugin-file triple; root manifest lags (CE-003) | frame-ship.ts:2,10-11; `package.json` |
| Single-export (as worded) | ❌ Refuted — intentional pre-existing dual-export pattern, not a regression | RF-015, frame-ship.ts:347-350 |

## Verdict rationale

- **Pass ("could not falsify"):** every falsifiable behavior claim survived its attack vector with log/diff/scan proof. The two ❌/⚠️ items against literal wording (dual export, root-manifest lag) are pre-existing/conventional, not behavior regressions, and the two code-level items (shared record ref, BOM anchor) are Low/latent with fixes that fit a follow-up, not a gate block.
- No counterexample invalidates REQ-001..004 or NF-001..004. No ADR deviation (additive lane within v1 contracts, per architecture review). No cross-domain need — engineering only.
- Recommendations: fix CE-001 (spread the mirror record) and CE-002 (strip BOM/leading-WS) in a small follow-up; rule on CE-003 (align root `package.json` or record it as out-of-triple); attach TEMP verify logs for CE-004.

## Scoped evidence (for orchestrator)

- Disk: 74 roster files; category split 9/15/14/8/9/4/5/6/4; 0 BOM; 0 non-`---` first lines; 0 empty/unquoted descriptions
- Plugin: 74 MANIFEST entries, 0 dup keys, 0 unresolvable paths, modes 1/8/65, key==stem except `espinoza-specialist`
- Parse replica: 5/5 spot-checks with real desc+body, no head leak; adversarial matrix: empty/nofence/nodesc/unquoted/crlf safe; bom/leadnl leak (latent)
- Idempotency sim: T1 stable, T2/T3 user-override survives, T4 shared-ref proven, T5 missing-skipped
- `mise run typecheck` exit=0; secret scan 0 real findings; impl diff = `frame-ship.ts` + `AGENTS.md` ref only
