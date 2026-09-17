# Reliability Review: SPEC-agents-into-plugin-engineering

**Reviewer:** review-reliability (engineering wave; independent — did not author or implement)
**Date:** 2026-09-17
**Verdict:** ✅ PASS (delta re-verification 2026-09-17 — COND-001 + COND-002 both CLEARED; was ⚠️ CONDITIONAL)

**Packet:** `SPEC:docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md#REQ-001..004+NF-001..004 / HARD:multi-subagents+single-file-zero-deps-idempotent-tsc-clean / GATE:security-Approved-0-findings+architecture-Approved-no-ADR+impl-9f8328b-69de0f4-6eae5a8-a91a486 / DOMAINS:engineering`
**Under review:** `.opencode/plugins/frame-ship.ts` (v0.6.0, 350 lines) + `.opencode/plugins/AGENTS.md` ref line · Proposal: `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`

## Checklist

- [x] Error paths handled explicitly — ✅ all loader I/O in try/catch, skip-entry, config hook has no throw path
- [x] No swallowed exceptions — ⚠️ swallowing is SPEC-mandated ("silent `""`", R-004), but zero observability: a drifted roster is invisible at runtime (see RL-002)
- [x] Input validation at boundaries — ⚠️ malformed-frontmatter path leaks fence into prompt; empty description unvalidated (see RL-002)
- [x] Deterministic behavior (no hidden state) — ✅ static 74-key MANIFEST; module caches benign (same-value replays)
- [x] Edge cases tested (empty, null, max, boundary) — ⚠️ no repo harness; AC-004/AC-001 rely on impl-time replay logs; malformed-fence case unproven
- [x] Idempotency where required — ✅ `??=` per key, `includes()` for paths, dual-side continue; misses uncached so retry self-heals
- [x] Timeouts on external calls — N/A (local file reads only, no network)

## Failure Modes Analyzed

| ID | Failure Mode | Expected Behavior | Handled? |
|----|--------------|-------------------|----------|
| FM-001 | Agents dir unresolvable (empty directory/worktree) | Roster lane skipped, skills lane intact, no wedge | Partial ⚠️ — lane skips ✅ but dangling defaults still set (RL-001) |
| FM-002 | Single agent file missing/unreadable (Bun + node both fail) | Skip that entry, register the other 73, never throw | yes ✅ — `readTextFile` catch → `""` → `if (!raw) continue` (frame-ship.ts:318-319) |
| FM-003 | Malformed frontmatter (no closing `---`, BOM/whitespace before fence) | Frontmatter stripped per INV-003, or entry skipped | NO ⚠️ — whole raw incl. fence leaks into `prompt` (RL-002) |
| FM-004 | Double-init | No duplicate paths/keys | yes ✅ — `includes()` + `hasAgents && hasAgent → continue`; cache replays |
| FM-005 | User pre-seeds `config.agents` and/or `config.agent` | Never clobbered | yes ✅ — `??=` per key; dual-side check preserves either side independently |
| FM-006 | win32 paths (drive letter, spaces, separators) | Valid joins | yes ✅ — `fileUrlToPath` strips `/D:/` prefix; URL pathnames always `/`; fw-slash joins accepted on win32 |
| FM-007 | Bun-vs-node loader paths (Bun absent, Bun read fails, node import fails) | Fallback chain, never throw | yes ✅ — `typeof bunFile === "function"` probe; dynamic import inside try; catch → `""` |
| FM-008 | Agent file with frontmatter but empty body | Entry skipped (no empty prompt registered) | yes ✅ — `if (!parsed.prompt) continue` (frame-ship.ts:321) |
| FM-009 | Manifest drift (disk file renamed/added) | AC-001 count check blocks completion | Process-level ✅ — verified 74=74 today; runtime itself silently diverges (see RL-002 observability note) |

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RL-001 | Med | frame-ship.ts:327-328 (vs guard 311) | Dangling defaults: `c.default_agent ??= "montilla"` + `c.subagent_depth ??= 2` run UNCONDITIONALLY, outside the `agentsDir !== "/agents"` guard. Repro: `directory=""`, `worktree=""` → `resolveAgentsDir("")` returns `"/agents"` → lane skipped, yet defaults set — `default_agent` points at a `montilla` key that was never registered. Same when guard passes but all 74 reads miss (plus empty `c.agents={}`/`c.agent={}` pollution from lines 312-313). Contradicts proposal R-004 "guard-clause returns before polluting config". Harness behavior on dangling default unverified → misroute or init error possible. → COND-001 |
| RL-002 | Med | frame-ship.ts:145-154 (`parseAgentFile`, line 148) | Malformed-fence leak: any input without a well-formed `^---\n…\n---` fence hits `if (!fence) return { description: "", prompt: text.trim() }` — the ENTIRE raw, including `---`/`name:`/`description:` lines, becomes `prompt`. Violates INV-003 (frontmatter stripped). Triggers: missing closing `---`, BOM/leading whitespace before opening fence. Latent today — verified 0/74 roster files malformed, all carry `description:` — but one bad edit ships a poisoned prompt silently (no log, no skip). Empty-`description` files likewise register with `description:""` unvalidated. → COND-002 |
| RL-003 | Low | frame-ship.ts:322-324 | Shared record identity across mirrors: same `record` object `??=`-assigned to both `c.agents[key]` and `c.agent[key]`. A mutation via one alias is visible via the other (shared identity, not just shared value). No evidence the harness mutates entries — advisory: clone per mirror (`{...record}`) if mirror independence is intended. Non-blocking. |
| RL-004 | Low | `.opencode/plugins/AGENTS.md:9-12` | Stale line pointers: 4 of 6 WHERE-TO-LOOK rows cite v0.5.0 lines — skills registration `127-132` (actual ~293-305), system injection `134-141` (actual 330-337), bootstrap loader `89-117` (actual 163-191), compaction `142-147` (actual 338-343). Dedupe `33-36` and version `10-11` still correct. Docs-only, but this file is under review and wrong pointers slow the next incident. Non-blocking; fix in gate-close commit. |
| RL-005 | Low | frame-ship.ts:111,135 | Comment/code drift + uninvalidated cache: "Misses are never cached" (line 111) but line 135 caches even empty-file `""` (behaviorally identical to a miss — caller skips either way — so comment-only). `agentFileCache` has no invalidation: post-init agent edits serve stale until process restart (restart-required convention covers it). Info only. |

## Verified correct (evidence, not findings)

- **Roster exact:** disk 74 roster files (77 scanned − `AGENTS.md`/`README.md`/`delegation-contract.md`) == MANIFEST 74 keys; sole alias `espinoza-specialist → engineering/espinoza.md` correct, c-level `espinoza` intact; modes 1×`primary` (montilla) + 8×`all` + 65×`subagent`. All 74 disk files carry `description:` + well-formed fence (scan 2026-09-17).
- **REQ-002 loader:** `resolveAgentsDir` mirrors `resolveSkillsDir` precedent; `readTextFile` Bun-first + dynamic `node:fs/promises` fallback, no static `node:` import; `parseAgentFile` handles `\r\n`, double/single/unquoted descriptions, strips fence from prompt.
- **REQ-003 idempotency + never-clobber:** `??=` on every insert (skills paths via `includes`, agents per-key dual-side, `default_agent`, `subagent_depth`); user overrides on either mirror survive independently; misses uncached → second init self-heals.
- **REQ-004/NF-001 triple + zero-dep:** header `v0.6.0` + `VERSION="0.6.0"` + derived `MARKER` move together (lines 1-2, 10-11); `import type` only; **`mise run typecheck` re-run 2026-09-17 → EXIT 0**.
- **NF-002/NF-004:** double-init replay safe by construction (above); single-file revert restores v0.5.0.

## Conditions (must clear for OPEN)

- [ ] **COND-001 (RL-001):** Gate keeper rules one — (a) move `default_agent`/`subagent_depth` inside the populated-roster guard (set only when ≥1 entry registered), or (b) record explicit acceptance with harness evidence that a dangling `default_agent` degrades gracefully. Owner: engineering owner.
- [ ] **COND-002 (RL-002):** Harden `parseAgentFile` malformed path (skip entry when fence opens-but-never-closes, or strip fence-looking lines) — or record acceptance + add a malformed-frontmatter case to the execute-spec evidence matrix proving current behavior. Owner: engineering owner.

## Verdict Rationale

No Critical/High: the roster lane is additive, never-throw holds on every probed path, idempotency and user-override preservation are structurally sound, roster is exact, and typecheck is green on re-run. The two Mediums are both conditional-path defects (empty-fallback defaults; malformed-file leak — latent at 0/74 today) that contradict stated invariants (R-004 guard-clause, INV-003 strip) and therefore gate OPEN, but neither breaks the happy path. Lows are advisory/docs-only. Hence **CONDITIONAL**, not CLOSED. No cross-domain need — engineering only; no sideways contact made. No commits (consolidation rides with gate keeper).

## DELTA Re-verification (2026-09-17, reviewer independent — authored/implemented/fixed nothing)

**Scope:** prior verdict above vs fix commits `253c94e` + `92a4941` + `14eaa4e`, code under review `.opencode/plugins/frame-ship.ts:123-206,353-380`, evidence matrix `docs/specs/40_workspace/engineering/TEST_MATRIX-agents-into-plugin.md` (C-001..C-005). Each edge re-probed against the real code (diff read + line read), never-throw re-traced, typecheck re-run by this reviewer.

- [x] **COND-001 (RL-001 dangling-default) → CLEARED.** Proof: `253c94e` moved defaults inside the lane guard and behind a populated-roster check — skipped lane (`agentsDir === "/agents"`, frame-ship.ts:360) leaves config untouched; total-miss lane never creates mirrors (lazy `(c.agents ??= {})` only post-parse, :372-373) so `Object.keys(c.agents ?? {}).length > 0` (:377) is false and no defaults are set; happy path still sets `montilla`/`2` via `??=` (never clobber). Matches matrix C-002. Residual (accepted, not held): guard counts user pre-seeded keys, so custom-only pre-seed + total disk miss can still set `default_agent: "montilla"` — user-owned config, explicit user defaults win via `??=`, narrow triple-condition; matrix assumption 2 records it.
- [x] **COND-002 (RL-002 malformed/BOM fence) → CLEARED.** Proof: `92a4941` hardened `parseAgentFile` (:178-201) — leading BOM/whitespace stripped before match (`/^[\uFEFF\s]*/`, :179); well-formed path unchanged; unclosed-fence fallback (:188-199) extracts description and filters `---`/`name:`/`description:` lines from the prompt, so raw frontmatter never leaks wholesale (INV-003 holds); `typeof raw === "string"` guard closes the non-string throw path; pure string ops, zero logging → never-throw + never-echo hold. Matches matrix C-003 (BOM/unclosed/leadnl adversarial + 5-agent spot-check regression). Residuals (info only): bare `"---"` without trailing newline falls through to plain-trim prompt (fence debris, not metadata leak); empty-`description` files still register (metadata quality, harness-accepted).
- [x] **RL-003 (Low, mirror aliasing) → CLEARED.** Proof: `14eaa4e` issues two independent object literals per entry (:372-373, string-only fields) — `config.agents[k] !== config.agent[k]`, a write via one mirror stays invisible via the other. Matches matrix C-005. Was already non-blocking; now closed.

**Never-throw re-trace (current code):** `readTextFile` inner-catch + outer-catch + timeout race with rejection-free sides (:136-169); `parseAgentFile` string-guarded, no throw path (:178-201); config hook `?.` probes + `?? {}` guards (:362-363, :377); transform/compacting hooks early-return on non-array (:385, :393). No new throw path introduced by the delta. (Pre-existing, out of scope: `c.skills.paths.includes` assumes array — untouched by this delta.)

**Typecheck state:** `mise run typecheck` (canonical, `.opencode` dir) re-run by this reviewer on current HEAD → **EXIT 0**. Corroborates matrix T-004/T-005 (EXIT 0 after every fix commit).

**Delta verdict rationale:** both gate conditions cleared with code-diff proof + matrix evidence on both lanes; mirror advisory closed; never-throw holds; typecheck green on independent re-run. No new findings (two info-only residuals noted above, neither gates OPEN). Hence reviewer verdict moves **CONDITIONAL → PASS**. Gate-state consolidation rides with the gate keeper; no commits by this reviewer.
