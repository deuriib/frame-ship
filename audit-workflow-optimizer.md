# Frame→Ship — Workflow Gap, Redundancy & Alignment Audit

**Auditor:** Workflow Optimizer (process improvement / automation specialist)
**Target:** `/home/deuriib/projects/frame-ship` @ `8191d93`
**Benchmark:** `/home/deuriib/projects/agency-agents` (NEXUS, `strategy/nexus-strategy.md`, `strategy/runbooks/`)
**Date:** audit pass 1
**Mode:** read-only. No repository file was modified except this report.
**Sibling audit:** `audit-structure.md` (structural/duplication inventory) already covers file counts, template boilerplate, and byte-level duplication. This report is deliberately complementary: **workflow gaps, lifecycle coverage, alignment, and prioritized remediation.** Where the two overlap (rules duplication, roster, chain copies), the figures agree — cross-references are marked `→ audit-structure.md §N`.

---

## 0. Executive Summary

Frame→Ship is a **rigorous, evidence-oriented delivery chain** wrapped in a **thin, partially-wired runtime**. The chain itself (9 stages, 11 skills) is coherent and in places *better* than NEXUS (REQ→evidence trace, ADR gating, waiver three-block bar, per-reviewer independence, C1–C4 challenge rounds, PII checkpoints). The problems are structural, not conceptual:

| # | Finding | Severity |
|---|---|---|
| 1 | **235 rule IDs across 15 rule files, 233 never referenced by any skill, gate, or reviewer.** The rule corpus is a second, un-wired truth injected on every context build (≈6.1k tokens) with no compliance checkpoint. | **Critical** |
| 2 | **No post-ship phase.** `ship-release` declares `Next: none` — there is no Operate/observe route, no incident route, no SLO/error-budget handoff, no feedback→backlog loop. Rules that mandate it (`AUT-08/13/14`, `SEC-14`, `ENG-22`) have no stage to enforce them. | **Critical** |
| 3 | **Three chains, not one.** The chain string exists in 6 places in 3 different texts (with/without `research`, with/without `using-frame-ship`), plus a 4th list in `README.md` (0–9) and a 5th in `skills.ts`. | **Critical** |
| 4 | **Two dangling routes that gates actively point at.** `frame-ship:debugging` and `frame-ship:pull-request` are cited as next stages from `using-frame-ship`, `quality-gate`, and `execute-spec` but **no such skills exist**. A CLOSED gate routes to a dead end. | **High** |
| 5 | **CI is a no-op.** Both jobs in `.github/workflows/ci.yml` have their real steps commented out — green check on an unrun suite. Violates `DENY-04`/`AUT-05`, and the repo's own `TST-07`. | **High** |
| 6 | **No discovery/GO-NO-GO gate.** `research` exists but is optional, un-gated (no verdict artifact, only `decision-aid.md`), and absent from the authoritative chain in `rules/Frame-ship.md`. NEXUS Phase 0 has a 5-criterion gate and a GO/NO-GO/PIVOT decision. | **High** |
| 7 | **Roster has three sources of truth and one ghost.** `AGENTS.md` documents 15 of 32 agents, invents a `marketing-reviewer` that does not exist, and names 6 "Key Skill" values that do not exist (`brand-audit`, `finance-audit`, `legal-audit`, `mkt-audit`, `people-audit`, `rev-audit`). | **High** |
| 8 | **Parallelism rule is self-contradictory**: "max 2 lanes" (5 files) vs "1 subagent per reviewer" (up to 9 reviewers in `quality-gate`) vs "Always use subagents as much as possible" (`skills.ts:32,34`). | **High** |
| 9 | **`rules/REV.md` is dead on trigger** — frontmatter says `triger:` (typo, line 2), so the entire 22-rule revenue block never matches any trigger loader. | **High** |
| 10 | **No scenario routing.** One chain depth for a 900-line typo fix and a 12-week enterprise feature. NEXUS sizes 42 scenario runbooks across 3 activation modes with an Applicability table that routes sideways. | **Medium** |
| 11 | **Four verdict vocabularies in one gate**, one of which (`CLOSED`) means *approved* in `agents/*-reviewer.md` and *rejected* in `quality-gate/SKILL.md:64`. Gate output is therefore unparseable and unauditable by machine. | **Medium** |

**Net effect:** the cognitive contract is strong, the enforcement layer is thin. Roughly **40% of the instructions an agent receives are never checkable**, and **3 of the 7 lifecycle phases a delivery methodology must cover (Scaffold, Launch-GTM, Operate) have no stage at all.**

---

## 1. Evidence Base and Measurements

### 1.1 What was read

| Corpus | Files | Words |
|---|---|---|
| `rules/*.md` | 15 | 4,617 |
| `skills/*/SKILL.md` | 11 | 5,857 |
| `skills/*/references/**/*.md` | 45 | 11,575 |
| `agents/*.md` | 32 | 20,878 |
| `README.md` + `AGENTS.md` | 2 | 2,475 |
| `.opencode/plugins/*.ts` | 6 | — |
| `commands/`, `.opencode/commands/`, `.pi/prompts/` | 18 files | — |
| NEXUS `strategy/nexus-strategy.md` | 1 | 1,110 lines |
| NEXUS `strategy/runbooks/*.md` | **42** | — |
| NEXUS `strategy/runbooks.json` | 1 | 42 rosters |

Measured counts differ from the brief in two places, recorded for accuracy: **11 skills, not 12** (`skills/` has 11 dirs); **32 agents, not 30**; **42 NEXUS runbooks, not 47**; **284 agent files across 18 divisions** in `agency-agents`, not 299.

### 1.2 Structural inventory (frame-ship)

```
rules/        15 files, 235 numbered rules, 14 parseable triggers (REV.md broken)
skills/       11 dirs: using-frame-ship, research, frame-intent, translate-to-spec,
              propose-changes, review-security, review-architecture, execute-spec,
              quality-gate, verify-handoff, ship-release
agents/       32: 1 CEO (montilla), 8 domain owners, 8 specialists,
              8 domain reviewers (7 + review-data), 6 engineering reviewers, quality-assurance
commands/     6 prompts  ×3 copies (commands/, .opencode/commands/, .pi/prompts/)
docs/         docs/antigravity/README.md only — the entire docs/frame-ship/ tree is absent
```

---

## 2. WORKFLOW GAPS

The reference axis is NEXUS Phase 0→6: **Discovery → Strategy → Foundation/Scaffold → Build → Harden → Launch → Operate**, with a quality gate between every phase, parallel workstreams *inside* phases, and feedback loops at boundaries.

### G1 — No discovery gate before `frame-intent` (NEXUS Phase 0)

**Current state.** `skills/research/SKILL.md` exists and is well-formed, but:

- `rules/Frame-ship.md:12` — the authoritative chain **omits** `research` entirely.
- `skills/using-frame-ship/SKILL.md:20` — shows it as `[research] →`, optional.
- `README.md:116-124` — "The Basic Workflow 0–9" **omits it**.
- `skills/research/SKILL.md:14` — `Previous: none (optional chain entry)`, `Next: frame-intent`.

So four documents describe the entry point three different ways.

**Deeper gap: no discovery *gate*.** NEXUS Phase 0 (`nexus-strategy.md:165-179`) closes with a 5-criterion gate (market validated / ≥3 validated pain points / regulatory path clear / data foundation assessed / tech feasibility) producing **GO / NO-GO / PIVOT**. Frame→Ship has no such artifact and **no exit that says no**: every path leads forward into `frame-intent` and then into `PROPOSED_CHANGES`. The only legitimate stop is `Rejected` at `review-security`, which is a security veto, not a viability veto.

`skills/research/references/decision-aid.md` gives four YES / four NO criteria — prose, no threshold, no owner, no verdict token, no artifact template. Compare `scenario-feature-discovery-to-spec.md:45-58`: named thresholds ("Evidence is sufficient = ≥2 independent sources in ≥2 channels, one quantitative with n≥30"), a named decision deadline, and `PASS / NEEDS WORK / NO DECISION` where "NO DECISION is a failed run, not an extension".

**Impact.** False-positive initiatives are structurally guaranteed to reach `execute-spec`; the cheapest possible kill point (week 0) is not available.

### G2 — No Foundation/Scaffold phase (NEXUS Phase 2)

NEXUS Phase 2 (`nexus-strategy.md:235-285`) exists because greenfield work needs a skeleton before features: CI/CD pipeline, schema + auth scaffold, design tokens, monitoring, repo conventions — with a 6-criterion gate.

Frame→Ship has **no greenfield path at all**:

- `execute-spec` assumes an approved proposal against an existing `ARCHITECTURE.md` singleton (`skills/translate-to-spec/SKILL.md:29`).
- `translate-to-spec` assumes a `BRIEF` from an existing product context.
- Nothing creates the repo skeleton, CI, test harness, or conventions.

Empirically visible in the repo itself: `docs/frame-ship/` (documented in `AGENTS.md:70-78`, referenced by 9 skill steps) **does not exist**; `tests/` claimed as `[x]` in `README.md:280` **does not exist**; `scripts/bump-version.mjs` required by `skills/ship-release/SKILL.md:29` and `references/documentation-checklist.md:16,27,45` **does not exist** (`scripts/` contains only `context-inject.ts`). Frame→Ship cannot bootstrap Frame→Ship.

### G3 — No Operate phase (NEXUS Phase 6) — the largest structural gap

`skills/ship-release/SKILL.md:17`:

```
- **Next:** none (chain close; lessons captured by owning C-level on PASS)
```

And `skills/using-frame-ship/SKILL.md:32` (`skills.ts:32` repeats it): *"Entry frame-intent; close ship-release (lessons on PASS)."*

There is no route, artifact, owner, or cadence for anything after the tag. Meanwhile the rule corpus demands it:

| Rule | Mandate | Stage that enforces it |
|---|---|---|
| `rules/AUT.md:16` AUT-08 | progressive delivery, canary/blue-green, **automated rollback on SLO breach** | none |
| `rules/AUT.md:21` AUT-13 | every deploy emits a change event; **rollback triggers on error rate/latency/saturation** | none |
| `rules/AUT.md:22` AUT-14 | **alerts routed to on-call with runbook** | none |
| `rules/AUT.md:25` AUT-17 | no cron without owner, monitoring, failure alerting | none |
| `rules/SEC.md:22` SEC-14 | SIEM, anomaly detection, **IR plan tested with tabletops**, 72h breach notification | none |
| `rules/ENG.md:30` ENG-22 | SLOs, alerts, tested backups, rehearsed DR, graceful degradation | none |
| `rules/REV.md:20-23` REV-12..15 | onboarding SLAs, health scores, renewals 90d, churn reasons fed back | none |
| `rules/PPL.md:35` PPL-27 | HR metrics cadence | none |

Grep proof: `operate|post-launch|SLO|error budget|canary` appears **7 times** across all of `skills/`, and every hit is a *pre-ship* checklist row (`verify-handoff/references/dod-checklist.md:37`, `quality-gate/references/domains/ops-review.md:12-13`, `execute-spec/references/testing-template.md:161`). Nothing downstream.

**Impact.** Three consequences:

1. **Deploys are unverified in the state that matters.** The DoD (`dod-checklist.md`) is 100% pre-ship. NEXUS closes on "rollback path has been exercised" with a timestamp (`scenario-enterprise-feature.md:9-11`) and a `release-train` go/no-go that **is allowed to say NO-GO** (`scenario-release-train.md:16`). Frame→Ship's `ship-release` has a rollback *plan* (`SKILL.md:45`), never a rehearsal gate.
2. **No incident path.** Rules reference IR; no skill routes to it. CLOSED gates point to `frame-ship:debugging` (see G4) which does not exist.
3. **No learning loop.** `verify-handoff` returns findings to `execute-spec`; nothing returns production findings to `frame-intent`/`research`. NEXUS Phase 6 is exactly that loop (`nexus-strategy.md:528-551` MEASURE→ANALYZE→PLAN→ACT).

### G4 — Two dangling stage routes (active dead ends)

| Cited at | Target | Exists? |
|---|---|---|
| `skills/using-frame-ship/SKILL.md:53` | `frame-ship:debugging` | **No** |
| `skills/using-frame-ship/SKILL.md:55` | `frame-ship:pull-request` | **No** |
| `skills/quality-gate/SKILL.md:17` | `frame-ship:debugging` → `propose-changes` | **No** |
| `skills/execute-spec/SKILL.md:18` | `frame-ship:pull-request` | **No** |
| `skills/execute-spec/references/testing-template.md:165` | `debugging` (4-phase RCA) | **No** |

This is worse than a gap: `quality-gate` tells the orchestrator that a failed gate routes to a skill that cannot load. Under the repo's own load rule — *"No skill = STOP"* (`rules/Frame-ship.md:20`) — **every CLOSED gate is an unrecoverable stop.** The failure path is the most-used path in any delivery system.

NEXUS has both: `scenario-bug-triage-and-defect-elimination` (15.6K), `scenario-delivery-recovery` (20.9K), `scenario-incident-response` (17.2K), `scenario-release-train` (19.6K).

### G5 — No parallel-lane orchestration beyond an unenforceable note

Three mutually inconsistent statements:

1. `skills/translate-to-spec/SKILL.md:28` — *"Max 2 parallel lanes"*; `execute-spec/SKILL.md:29` and `references/worktree-annex.md:7` — *"max 2 live (third waits or escalates)"*; `agents/montilla.md:35` — INV-006; `using-frame-ship/SKILL.md:54`.
2. `skills/quality-gate/SKILL.md:28,52,70,76` — *"**strictly 1 subagent per reviewer**"*, routing table has **9 domains → up to 9 engineering reviewers + 8 domain reviewers = 17 potential concurrent subagents**.
3. `.opencode/plugins/skills.ts:32,34` — *"Subagents: **Always use subagents as much as possible proactively**, this is no negociable."*

Statement 3 is injected into every session; it directly contradicts statement 1. Statement 2 contradicts 1 by construction. There is no scheduler, no lane registry, no dependency graph, no arbitration rule for "reviewer wave is wider than 2 lanes".

NEXUS resolves this explicitly: parallel *workstreams* inside a phase, a **Full / Sprint / Micro** mode that scales the roster to the work (`nexus-strategy.md:118-128`), and a per-phase execution tree with declared concurrency (`nexus-strategy.md:145-164, 250-269, 334-361`). Frame→Ship's only sizing knob — `frame-intent` classification spike/bounded/architectural (`skills/frame-intent/SKILL.md:27-30`) — changes **brief ceremony only**; it never changes chain depth, reviewer wave, or artifact set. `execution_mode` is hard-frozen to `subagents` (`SKILL.md:31`), so it cannot size anything either.

### G6 — Launch ≠ deploy: no go-to-market / stakeholder launch gate (NEXUS Phase 5)

`ship-release` defines ship-types `deploy | filing | launch | close | rollout | policy-enable` (`SKILL.md:27`) — good. But the *gate* is `verify-handoff`'s DoD, which is delivery-facing. There is no pre-launch act with a date on it: no stakeholders-informed criterion, no acquisition/feedback-channel readiness, no T-7/T-0/T+7 sequence (compare `nexus-strategy.md:461-490`), and — critically — **no ability for the launch gate to fail**. `scenario-enterprise-feature.md:15-17`: *"Stakeholder sign-off is a pre-launch act with a date on it. A sign-off collected after launch is not a gate: it is a record that the decision to ship was taken by nobody."*

### G7 — No human-authority boundary between agent verdict and human decision

NEXUS states it three times (`scenario-enterprise-feature.md:13-15`, `scenario-feature-discovery-to-spec.md:13-14`, `scenario-incident-response.md:17-19`): **the checker prepares, a named human decides**; an agent verdict on legal exposure is a draft, not a decision; G2/G3 fail when the only signature is an agent's.

Frame→Ship has approvers (`propose-changes/SKILL.md:29`, waivers by "domain owners + orchestrator") but every approver in the roster **is an agent** (`agents/barrera.md` = "Security Owner (CISO)", `agents/dauhajre.md` = "CFO", …). The legal reviewer "emits binding APPROVE/CONDITIONAL/CLOSED verdicts" (`agents/legal-reviewer.md:4`). There is no row anywhere in `skills/` that requires a human signature for a regulatory determination. Combined with `MKT-13`/`DENY-07` (no AI content without human review) this is an internal contradiction.

### G8 — No lateral/escape routes for work that is not a chain run

`using-frame-ship` has exactly one escape: the C-level fast-path for <15-line reversible work (`SKILL.md:60`, `frame-intent/SKILL.md:31`). There is no route for: a production incident, a security disclosure, a slipped program, a codebase modernization, a pricing decision, a monthly close, a design sprint, a compliance certification. The 6 `commands/` are the de facto escape hatch — and they are worse than no route (see V6): `commands/build-feature-e2e.md:6` says *"Build the specified feature end to end … loop until it's green in staging"* with **zero reference to the chain, a proposal, a gate, or a rule**. That is a sanctioned chain bypass sitting in the repo root.

### G9 — Evidence quality: gates verify attestation, not behavior

`quality-gate/references/gate-report.md:71-78` — "Load Evidence (HARD STOP)" rows are:

```
- [ ] Stage skill loaded: `skill(<stage>)` cited
- [ ] Domain owner/specialist role understood: domain role cited
- [ ] Execution mode declared: `subagents`
- [ ] Reviewer independence verified: strictly 1 dedicated subagent per reviewer
- [ ] Packet intact
```

Five self-certifications by the same agent being audited. `verify-handoff`'s C4 lane explicitly bans attestation-alone for REQ evidence (`SKILL.md:35`: *"attestation-alone = FAIL"*) — yet the gate's own evidence model is attestation-alone. Meanwhile NEXUS runbooks require openable evidence: *"a claim is sufficient when supported by ≥2 independent sources … each openable by a second person"* (`scenario-feature-discovery-to-spec.md:47`), and `scenario-enterprise-feature.md:9-10` requires *"an evidence pack a second person can audit without asking a question"*.

Two proof points that attestation fails in practice:

1. **CI: green on nothing.** `.github/workflows/ci.yml` — both jobs have `# - run: mise run typecheck` and `# - run: npm test` **commented out**. The pipeline reports success having executed zero commands. This is exactly `DENY-04` ("a red or unrun suite is not done") and `TST-07` ("no step completes on red or unrun suite") — violated by the repo that defines them.
2. **Dangling fixtures cited as evidence.** `gate-report.md:45` cites `docs/frame-ship/workspace/security/SAMPLE-grilling-C3-thin-FAIL.md`; `dod-checklist.md:10` cites `…SAMPLE-grilling-C4-deadlink-FAIL.md`. Neither path exists (`docs/frame-ship/` is absent). A gate that cites a missing demo is asserting evidence it has never produced.

### G10 — Stage count vs. decision count

The linear chain has 9 stages but the real decision points are ~15. Missing as first-class:

| Decision | Where it hides today | Missing because |
|---|---|---|
| Is this worth doing at all? | nowhere | G1 |
| Does the skeleton exist? | nowhere | G2 |
| Is the incident fixed? | nowhere | G3/G4 |
| Is this a bug or a scope change? | nowhere | G4 |
| Is the release a go? | `ship-release` (always proceeds) | G6 |
| Is the gate's evidence real? | self-attested | G9 |
| Do two lanes conflict? | verbal "max 2" | G5 |

### G11 — Artifact lifecycle is defined but the tree does not exist

`ship-release` defines a precise MOVE + promote + purge-allowlist sequence (`SKILL.md:31-37`) — genuinely good (better than most methodologies). But it operates on two namespaces simultaneously: `docs/frame-ship/{backlog,workspace,archive}/` (`SKILL.md:32-36`) **and** numeric `40_workspace/`, `50_archive/`, `20_backlog/`, `12_adr/` (`SKILL.md:33,35`; `review-architecture/SKILL.md:29,31`; `archive-record.md:3,19-32`). Five files use the numeric scheme, three use the named scheme, none exist on disk. `AGENTS.md:70-78` documents a third, named-only scheme and omits `research/`.

### G12 — Rule corpus is not wired to the workflow (the enforcement vacuum)

Measured: **235 rule IDs defined** (`AUT`17, `DENY`9, `DOC`6, `ENG`36, `FIN`17, `GEN`13, `LEG`10, `MKT`19, `PPL`28, `PRV`10, `REV`22, `SEC`18, `TST`7, `XD`23).

**Rule IDs cited anywhere outside `rules/`: 2.** (`GEN-12`, `PRV-02` at `quality-gate/references/engineering/observability-review.md:10`.) → **233 of 235 rules (99.1%) are never referenced by any stage, gate, reviewer checklist, or artifact.**

Consequences:

- The rules cannot be *verified*, only *read*. `SEC-03` says "OWASP screen on every new endpoint" — no gate row checks OWASP. `TST-03` demands coverage ≥80/75/85 — `dod-checklist.md:21` says only "Test coverage meets threshold" (unnamed). `ENG-31` sets LCP/INP/CLS budgets — no gate row. `AUT-05` lists 8 mandatory gates — CI runs 0.
- Two corpora with different vocabularies: rules say `SEC-01..18`; skills say "security owner", "gate", "condition". Neither references the other.
- 4,617 words (~6.1k tokens) injected **on every context build** for a governing effect of ~0.8%.

---

## 3. VERBOSITY & REDUNDANCY

### V1 — The chain: 6 occurrences, 3 different texts

| File:line | Text | Includes `research`? | Includes `using-frame-ship`? |
|---|---|---|---|
| `rules/Frame-ship.md:12` | canonical | ❌ | ❌ |
| `scripts/context-inject.ts:27` | agy hook | ❌ | ❌ |
| `.opencode/plugins/skills.ts:24` | `CHAIN` const | ❌ | ❌ |
| `README.md:123-124` | 3-line wrap | ❌ | ✅ (as step 0) |
| `skills/using-frame-ship/SKILL.md:20-22` | 3-line wrap | ✅ `[research]` | ❌ |
| `skills/using-frame-ship/references/bootstrap-checklist.md:8` | `review-*` | ❌ | ❌ |
| plus `README.md:112-121` | numbered 0–9 prose restatement | ❌ | ✅ |

Two of them are executable (`skills.ts:24` is the `CHAIN` const used by both cards) and one is the "always-on" rule file. **They disagree.** Fixing `research` into the chain requires 4 synchronized edits in 3 languages; nothing enforces it.

### V2 — Trigger→skill routing table: 3 copies, drifting

| Copy | Rows | Dangling rows |
|---|---|---|
| `rules/Frame-ship.md:23-32` | 10 | 0 |
| `.opencode/plugins/skills.ts:28` (WORKFLOW_CARD) | 10 (pipe-joined one-liner) | 0 |
| `skills/using-frame-ship/SKILL.md:41-56` | 13 | **2** (`debugging`, `pull-request`) |

The richest and most-read copy (`using-frame-ship`, injected live into context by `skills.ts:243`) is the one with the dead routes. The always-on rule file is the stalest.

### V3 — Hard rules: 3–4 copies

| Location | Count | Wording drift |
|---|---|---|
| `README.md:265-272` | 7 | "NEVER write code without an approved proposal…" |
| `skills/using-frame-ship/SKILL.md:58-68` | 8 | "**Proposal before code**…", adds "Execution is subagents only", adds CEO fast-path |
| `.opencode/plugins/skills.ts:29` | 7 | compressed: "1.no code w/o proposal 2.security review…" |
| `scripts/context-inject.ts:30` | — | only chain + ack |

Three lists, three lengths, no single source. The list has no ID scheme (unlike rules), so it cannot be cited — which is why it keeps getting retyped.

### V4 — Roster: 3 sources of truth + ghosts

| Source | Universe | Ghosts |
|---|---|---|
| `agents/*.md` (32 files) | actual | — |
| `AGENTS.md:30-60` | 15 (47%) | `marketing-reviewer` (does not exist); skills `brand-audit`, `finance-audit`, `legal-audit`, `mkt-audit`, `people-audit`, `rev-audit` (none exist) |
| `skills/quality-gate/SKILL.md:32-42` | 9 rows | "data dupla" & "data-engineer lineage check" — no such agent |
| `.opencode/plugins/agents.ts` | reads `agents/` at runtime ✅ | — |

Also: 7 of 8 domain owners (barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera), the orchestrator (montilla), and 7 of 8 engineering reviewers are **entirely absent from `AGENTS.md`** — the file the plugin card calls "Truth" (`skills.ts:32`). `AGENTS.md` also omits `automation-specialist` and `review-data`.

### V5 — Guardrails: 3 copies, one of them silently dead

| Copy | Lines | State |
|---|---|---|
| `rules/*.md` (runtime read) | 4,617 words | source |
| `.opencode/plugins/guardrails.ts:25-95` `SHARED_GUARDRAILS` | ~70 lines | hardcoded condensation of GEN+PRV+XD, used as *fallback* but also the value shipped to compaction |
| `.pi/extensions/frame-ship-guardrails.ts:7-24` `FALLBACK_GUARDRAILS` | ~18 lines | **a third, shorter condensation** — already drifted from the opencode one |
| `scripts/context-inject.ts:90-91` (agy) | — | looks for `rules/guardrails.md` — **file does not exist**; agy injects bootstrap only, **zero domain rules** |

So: the agy harness claims 1:1 parity (`README.md:88-99`, `context-inject.ts:5-15`) but delivers **0% of the guardrails**. And on the opencode path the "single source of truth" claim in `guardrails.ts:3-4` is undercut by two embedded copies.

### V6 — Commands: 18 files, 3 copies, 6 sanctioned bypasses

`commands/*.md`, `.opencode/commands/*.md`, `.pi/prompts/*.md` are three copies of 6 prompts with frontmatter drift (`commands/` has `name:` + `tools:`, the others have `description:` only — verified by `diff`).

Content problem is worse than the drift: all six are imperative "build it, loop until green" prompts with **no chain reference, no proposal gate, no rules reference**:

```
commands/build-feature-e2e.md:6   Build the specified feature end to end … loop until it's green in staging
commands/build-ai-feature.md:6    Design and build the specified AI feature … loop until the evals pass
commands/ab-test-landing.md:6     … ship 3 A/B test variants … loop until each variant is live and measurable
```

These contradict `README.md:265` hard rule #1 and `DENY-05` (nothing to production outside the pipeline). They are the repo's most direct route to unproposed code.

### V7 — Rules duplicate rules

`rules/XD.md` is 33 lines of cross-domain *restatement*: it re-asserts `SEC-03`, `PRV-02`, `DOC-01/15`, `AUT-05/06`, `LEG-01/06`, `REV-18`, `PPL-06/14`, `GEN-06/08/09`, `FIN-10`, `REV-06/09`, `SEC-14` — 10 explicit `(RULE-ID)` back-references plus 13 unlinked restatements. `DENY-04` is `TST-07`/`AUT-06` restated. `DENY-01` is `SEC-02`/`GEN-12` restated. `DENY-03` is `SEC-04` restated. Roughly **4 of 15 rule files are the same content in different voices**, which is why 235 IDs govern 0 decisions.

### V8 — Documentation of a tree that does not exist

`docs/frame-ship/{briefs,design,adr,requirements,backlog,delivery,workspace,archive}` is documented in `AGENTS.md:70-78`, `README.md:277`, and used by 11 skill steps. Also asserted: `research/` (`skills/research/SKILL.md:29`) — in no folder table. **`docs/` contains exactly one file: `docs/antigravity/README.md`.** Zero artifacts exist at any stage. The methodology has never been run end-to-end inside its own repository — which also means `README.md:280`'s `[x] Test harness in tests/` is a false claim.

### V9 — Four verdict vocabularies in one gate

The same gate must consolidate reviewer output that is written in four incompatible encodings:

| Encoding | Where | Count |
|---|---|---|
| `APPROVE / CONDITIONAL / CLOSED` | `agents/*-reviewer.md` frontmatter descriptions | 8 files |
| `Approved / Conditional / Rejected` | `review-security/SKILL.md:12`; `references/security-review-template.md:5`; `review-architecture/references/architecture-review.md:5` | 4 files |
| `pass / conditional / fail` | `quality-gate/references/domains/*.md:5`, `engineering/*.md` | 16 checklists |
| `✅ / ⚠️ / ❌` → `OPEN / CONDITIONAL / CLOSED` | `quality-gate/SKILL.md:64-66` | consolidation step |

Note the semantic inversion at the security boundary: a reviewer's **`Rejected`** must become the gate's **`CLOSED`**, and an agent's **`CLOSED`** (per its own description, meaning "I closed the gate") is the same token the gate uses for "failed" — `agents/automation-reviewer.md` emits "APPROVE / CONDITIONAL / CLOSED" while `quality-gate/SKILL.md:64` maps `❌ → CLOSED`. **A verdict token that means success in one file and failure in another cannot be machine-read, counted, or audited.** This is why every gate report is prose.

*Also established by → `audit-structure.md` §5.5: `VERSION = "0.12.0"` (`.opencode/lib/shared.ts:14`) vs `"version": "1.0.0"` in all six manifests; `LICENSE`/`package.json` MIT vs `plugin.json`/`.claude-plugin`/`.antigravity-plugin` Apache-2.0; `hooks/` is an empty dead directory (`.gitkeep`, 0 bytes) despite `hooks.json` driving the agy PreInvocation hook; `.omp/` (15 agency-agents imports) is untracked in git and appears in no manifest.*

### V10 — Injected-context volume vs. governing value

| Channel | Injected when | Words | Enforced by |
|---|---|---|---|
| `rules/*.md` | every context build | 4,617 | 2 rule-ID citations |
| `WORKFLOW_CARD` + `POINTERS` (`skills.ts:27-32`) | every context build | ~250 | partially |
| `using-frame-ship/SKILL.md` body | every session (`skills.ts:243`) | ~1,500 | partially, **incl. 2 dead routes** |
| stage `SKILL.md` | per stage | 500–900 | ✅ |
| `agents/*.md` system bodies | on agent invoke | 20,878 total | ✅ (per agent) |

**~6.4k words (~8.5k tokens) of always-on instruction, of which ~6.1k has no checkpoint.** Meanwhile the 15 instructions that *are* enforced live in ~900 words of skill bodies. The signal-to-noise ratio is inverted.

---

## 4. IMPROVEMENTS (prioritized)

### P0 — Correctness: the chain cannot be trusted as written

| ID | Action | Evidence | Effort | Impact |
|---|---|---|---|---|
| **P0-1** | **Single machine-readable chain source** (`chain.json` or `CHAIN` const in `plugins/lib/shared.ts`) with `stages[]`, `previous`, `next`, `optional`, `artifacts[]`, `owner`. Generate `rules/Frame-ship.md` card, `skills.ts` card, and `using-frame-ship` table from it in CI. Delete the 5 hand-maintained copies (V1). | 6 copies, 3 texts | 1–2 d | Kills the #1 drift class permanently |
| **P0-2** | **Ship the two missing stage skills** — `debugging` (4-phase RCA → failing test → `propose-changes`) and `pull-request`. Until they exist, gate `quality-gate`'s failure text on a real target. If they will not be built, **remove the 5 citations** so the gate stops routing to a dead end. | `using-frame-ship:53,55`; `quality-gate:17`; `execute-spec:18` | 2 d / 2 h to remove | Removes an unrecoverable stop on the most-traveled path |
| **P0-3** | **Un-comment CI or delete it.** `# - run: mise run typecheck` / `# - run: npm test` → real steps. A pipeline that asserts nothing is worse than no pipeline: it manufactures `DENY-04` evidence. | `.github/workflows/ci.yml:11-22` | 1 h | First real evidence in the repo's history |
| **P0-4** | **Fix `rules/REV.md:2` `triger:` → `trigger:`.** 22 rules currently unreachable by any trigger loader. | typo, line 2 | 1 min | +22 rules restored |
| **P0-5** | **Wire the rule corpus or shrink it.** Two options, pick one: (a) add a `Rules` column to every reviewer checklist and a `Rule-ID` field to `GATE_REPORT.md`, so a verdict cites what it checked — target ≥80% of 235 IDs cited; or (b) cut `rules/` to the ~40 IDs a gate can actually check and move the rest to `docs/` as reference. **Do not ship 233 uncheckable rules as guardrails.** | 2/235 citations | 3–5 d (a) / 1 d (b) | Turns reading into verification |
| **P0-6** | **Delete the two hardcoded guardrail condensations** (`guardrails.ts:25-95`, `.pi/…:7-24`) and fix the agy lookup (`context-inject.ts:90` → read `rules/**/*.md`, not `rules/guardrails.md`). Otherwise harnesses diverge silently and permanently. | agy = 0% rules | 0.5 d | Restores the parity the README claims |

### P1 — Lifecycle completeness: close the three missing phases

| ID | Action | Evidence | Effort | Impact |
|---|---|---|---|---|
| **P1-1** | **Add stage 10 `operate`** (or `observe`): post-ship verification with SLO/error-budget targets, canary/rollback **rehearsal with timestamp**, on-call + runbook handoff, incident trigger, and a monthly `OPERATE_REPORT.md` → feeds `research`/`frame-intent`. Change `ship-release`'s `Next: none` to `Next: operate` — but keep it non-blocking so one-shot work can close. This gives `AUT-08/13/14/17`, `SEC-14`, `ENG-22`, `REV-12..15` an enforcement home. | `ship-release/SKILL.md:17` | 3–4 d | Adds the 3rd of NEXUS's 7 phases |
| **P1-2** | **Add a discovery gate to `research`**: `RESEARCH_FINDINGS` + explicit `GO / NO-GO / PIVOT` verdict + the `decision-aid.md` criteria turned into named thresholds with owners. Add `research` to the canonical chain as `optional-but-gated-when-invoked`. | `research/SKILL.md` (no verdict), `nexus-strategy.md:165-179` | 1–2 d | Creates the cheapest kill point |
| **P1-3** | **Add stage `scaffold`** (or fold into `execute-spec` as a mandatory first lane): repo skeleton, CI, test harness, conventions, monitoring — gated by "pipeline green on empty suite". Solves greenfield and makes the repo's own `docs/frame-ship/` + `tests/` + `scripts/bump-version.mjs` real. | G2; 3 missing repo artifacts | 2–3 d | Unblocks greenfield (currently impossible) |
| **P1-4** | **Give `ship-release` a go/no-go that can fail** (`GO / NO-GO / HOLD` + recorded decision + rehearse rollback). Adopt `scenario-release-train`'s doctrine: "a NO-GO is a normal, non-punished outcome". Today the only possible outcome is ship. | `ship-release/SKILL.md` step 1 | 0.5 d | Converts a checkpoint into a gate |
| **P1-5** | **Parallelism: pick one rule and encode it.** Recommended: lanes = `max 2` for *implementation worktrees* (`worktree-annex`), reviewer wave = `unbounded but sequential-batched`, and delete the contradicting "as much as possible" sentence from `skills.ts:32,34`. State the arbitration rule in one place. | 3-way contradiction | 2 h | Removes an unresolvable instruction |
| **P1-6** | **Add the human-authority boundary.** One row in `waiver-template.md` + `propose-changes` approver table: *human signature required* for legal/regulatory, security exception, and any irreversible/financial commitment. `agents/legal-reviewer.md:4` must downgrade "binding verdict" to "draft finding" where a human must decide. | G7; `agents/legal-reviewer.md:4` | 0.5 d | Closes a real liability hole |
| **P1-8** | **Unify the verdict vocabulary to one enum** (`PASS | CONDITIONAL | FAIL` at reviewer level → `OPEN | CONDITIONAL | CLOSED` at gate level), and make `GATE_REPORT.md` a fenced, parseable block so the gate can be machine-read in CI. Today it is prose in four encodings and one token (`CLOSED`) means both "approved" and "rejected". | V9 | 1 d | Enables all automation below |
| **P1-7** | **Make gate evidence non-self-attested.** Replace the 5 "Load Evidence" checkboxes with machine-checkable rows: skill id present in transcript, `GATE_REPORT.md` path exists, reviewer artifacts resolve, `git status` clean. Anything not openable by a second person is not evidence. | `gate-report.md:71-78` vs `SKILL.md:35` | 1 d | Removes the attestation/skepticism contradiction |

### P2 — Simplification: collapse, dedupe, route

| ID | Action | Effort | Impact |
|---|---|---|---|
| **P2-1** | **Collapse 9 stages → 6**: `discover` (research+intent) → `specify` (translate+propose) → `review` (security+architecture, one skill, two lenses) → `build` (scaffold+execute) → `gate` (quality+handoff, one skill: reviewers → DoD → verdict) → `ship` (release+operate). 11 skills → 7. Preserves every artifact and verdict, removes 4 handoffs and 4 "Pre-flight load — HARD STOP" blocks that only re-assert the same 5 preconditions (`frame-intent:25`, `translate-to-spec:25`, `propose-changes:25`, `review-security:25`, `review-architecture:25`, `execute-spec:26`, `quality-gate:48`, `verify-handoff:25`, `ship-release:25` — 9 near-identical paragraphs). | 3–5 d | ~30% fewer handoffs, ~15% less always-on text |
| **P2-2** | **Regenerate `AGENTS.md` from `agents/`** (script + CI check). Fix `marketing-reviewer` → `brand-reviewer`; replace the 6 ghost `Key Skill` values with real ones (`quality-gate`, `review-security`, `verify-handoff`, `review-architecture`). Add the 17 missing agents. Then delete the roster third-source in `quality-gate/SKILL.md:32-42` and reference one file. | 0.5 d | Kills V4 permanently |
| **P2-3** | **Add scenario routing** (`skills/routing/` + `routing.json`): 8–12 runbooks with an **Applicability table** (the NEXUS pattern — `scenario-feature-discovery-to-spec.md:21-28`) that says when *not* to use it, plus `mode: Full/Sprint/Micro` sizing chain depth, reviewer wave, and artifact set. Start with the 8 highest-frequency: `quick-fix`, `feature`, `incident`, `security-disclosure`, `greenfield`, `modernization`, `release-train`, `compliance`. Make `frame-intent` classification pick the runbook instead of only sizing the brief. | 4–6 d | Turns one rigid chain into a repeatable system |
| **P2-4** | **Delete or rewrite `commands/`.** Rewrite each as a 3-line pointer into the chain (`propose-changes` → runbook → `gate`). Delete 2 of the 3 copies; keep one location per harness via symlink or generated file. | 0.5 d | Removes 6 sanctioned bypasses + 12 redundant files |
| **P2-5** | **Unify the artifact tree on `docs/frame-ship/`.** Kill the numeric namespace (`40_workspace/`, `50_archive/`, `20_backlog/`, `12_adr/`) or adopt it everywhere — not both. Create the tree with `.gitkeep` + `README.md`, add it to `AGENTS.md` table including `research/`. | 0.5 d | Removes G11 and 3 dangling fixtures |
| **P2-6** | **Tables over prose in rules.** `XD.md` (23 rows) and `DENY.md` (9 rows) collapse to one matrix: `Rule | Boundary | Owner | Enforced-at`. Cuts ~35% of rules words with zero semantic loss. | 1 d | Smaller always-on payload |
| **P2-7** | **Fix the `skills/AGENTS.md` ghost** (`using-frame-ship/references/bootstrap-checklist.md:29` → `AGENTS.md`) and `rules/frame-ship.md` casing (`README.md:95,97`; `context-inject.ts:7,12`; `engineering-specialist.md:41`; `documentation-checklist.md:17,31` → actual `rules/Frame-ship.md`). | 15 min | Removes 6 broken pointers |

### Projected impact (estimates, to be validated by the first three real runs)

| Metric | Now | After P0+P1 | After P0+P1+P2 |
|---|---|---|---|
| Always-on instruction tokens | ~8.5k | ~6.5k | ~4.5k |
| Rules with a verification checkpoint | 2 / 235 (0.8%) | ~190 / 235 (80%) | ~190 / 235 |
| Lifecycle phases covered (of 7) | 4 (Discover-opt, Strategy, Build, Harden, Launch-partial) | 6 | 7 |
| Dead routes for a CLOSED gate | 2 | 0 | 0 |
| Handoffs per feature | 9 | 9 | 6 |
| Distinct chain definitions | 6 | 1 | 1 |
| Agent roster sources | 3 (+1 ghost) | 1 | 1 |

---

## 5. ALIGNMENT: Frame→Ship ↔ NEXUS

### 5.1 Stage ↔ Phase ↔ Runbook map

| Frame→Ship stage | Closest NEXUS phase | Closest NEXUS runbook(s) | Fit |
|---|---|---|---|
| `research` (optional) | **Phase 0** Discovery (`nexus-strategy.md:130-179`) | `feature-discovery-to-spec`, `design-sprint`, `security-posture-review`, `academic-research-program` | **Weak** — no gate, no thresholds, no GO/NO-GO |
| `frame-intent` | **Phase 0→1** boundary (Discovery Gate + Strategic Portfolio) | `feature-discovery-to-spec` (week 3 G4 decision), `zero-to-one-venture`, `startup-mvp` | **Partial** — strong brief/OKR/approval; missing NO-GO and stakeholder authority rows |
| `translate-to-spec` | **Phase 1** Strategy & Architecture (`:181-234`) | `feature-discovery-to-spec` (week 3), `api-platform-launch`, `data-platform-foundation` | **Strong** — REQ-IDs + architecture singleton; NEXUS adds a spec→task conversion the frame-ship lacks |
| `propose-changes` | **Phase 1** (architecture + budget approval) | `enterprise-feature` (Key Decisions), `design-sprint`, `pricing-and-monetization-review` | **Strong** — proposal-before-code has no NEXUS equal |
| `review-security` | **Phase 4** Harden, pulled forward | `security-posture-review`, `security-vulnerability-response`, `compliance-certification-program`, `enterprise-feature` G2/G3 | **Strong** — STRIDE + binding verdict; NEXUS is weaker here |
| `review-architecture` | **Phase 1 → 2** Architecture Gate | `codebase-modernization-program`, `api-platform-launch`, `legacy-platform-migration`, `toolchain-standardization` | **Strong** — ADR gating has no NEXUS equal |
| `execute-spec` | **Phase 3** Build & Iterate (`:287-377`) | `enterprise-feature` (Phases 3-4), `bug-triage-and-defect-elimination`, `agentic-product-build`, `mobile-app-launch` | **Partial** — REQ→test trace is better; missing per-task Dev↔QA loop with attempt counting |
| `quality-gate` | **Phase 3 gate + Phase 4** (`:362,378-439`) | `repository-hardening-program`, `accessibility-remediation-sprint`, `design-system-and-ui-quality` | **Strong on breadth, weak on evidence** — NEXUS's Reality Checker defaults to NEEDS WORK; frame-ship's gate defaults to whatever reviewers say |
| `verify-handoff` | **Phase 4** Production Gate | `enterprise-feature` G3, `release-train` | **Strong** — C4 evidence-link check is better than anything in NEXUS |
| `ship-release` | **Phase 5** Launch (`:440-506`) — deploy half only | `release-train`, `mobile-app-launch`, `ecommerce-storefront-launch`, `api-platform-launch`, `oss-maintainer-operations` | **Partial** — archive/purge discipline is excellent; no GO/NO-GO, no rehearsal gate, no GTM sequence |
| *— missing —* | **Phase 2** Foundation & Scaffolding (`:235-285`) | `startup-mvp`, `data-platform-foundation`, `developer-experience-platform`, `toolchain-standardization`, `design-system-and-ui-quality` | **Absent** |
| *— missing —* | **Phase 6** Operate & Evolve (`:507-553`) | `incident-response`, `customer-support-operations`, `oss-maintainer-operations`, `growth-experiment-loop`, `security-vulnerability-response`, `monthly-close-and-financial-reporting`, `delivery-recovery` | **Absent** |
| *— missing —* | Phase 3/6 repair loop | `bug-triage-and-defect-elimination`, `delivery-recovery`, `incident-response` | **Absent (cited as `debugging`, no skill)** |

### 5.2 Frame→Ship capabilities with **NO** NEXUS equivalent (keep — these are the moat)

1. **`PROPOSED_CHANGES` before any code** — NEXUS jumps from Phase 1 architecture to Phase 3 implementation; there is no "repo untouched" proposal checkpoint.
2. **ADR-gated invariant changes** — `review-architecture/SKILL.md:28` ("`Status: proposed` + merged code = gate FAIL") has no NEXUS analog.
3. **REQ-ID → test → artifact → verdict trace + C4 link resolution** (`verify-handoff/SKILL.md:35`).
4. **Three-block waiver bar + expiry** (`gate-report.md:32-52`) — NEXUS waivers are "Studio Producer decides: fix, descope, or accept with risk" with no expiry or re-review owner.
5. **C1–C4 challenge rounds** (`challenge-round.md`) — budgeted adversarial interrogation with exit tokens. Nothing like it in NEXUS.
6. **Per-reviewer independence, enforced** ("strictly 1 subagent per reviewer").
7. **Four-layer rules corpus** (`DENY`/`GEN`/domain/`XD`) with numbered IDs — NEXUS doctrine is prose.
8. **Archive MOVE + promote + purge allowlist** (`ship-release/SKILL.md:31-37`).
9. **PII checkpoints in every artifact** (Ley 172-13) — NEXUS is compliance-aware but not artifact-level.

### 5.3 NEXUS capabilities with **NO** Frame→Ship equivalent (adopt)

| # | NEXUS capability | Cheapest adoption path |
|---|---|---|
| 1 | **Discovery gate with GO/NO-GO/PIVOT** | P1-2 |
| 2 | **Phase 2 Foundation/Scaffold** | P1-3 |
| 3 | **Phase 6 Operate with cadence table** (`nexus-strategy.md:511-527`: weekly/monthly/quarterly owners) | P1-1 |
| 4 | **3 activation modes sizing roster + depth** (Full/Sprint/Micro) | P2-3 |
| 5 | **42 scenario runbooks + Applicability routing tables** | P2-3 (start with 8) |
| 6 | **Named human authority boundary** ("checker prepares, human decides") | P1-6 |
| 7 | **Dev↔QA loop with attempt counting + escalation artifacts** | fold into P1-1/P2-1 |
| 8 | **Gate verdict that can fail**: READY / NEEDS WORK / NOT READY; GO / NO-GO / HOLD | P1-4 |
| 9 | **Rehearsed rollback with a timestamp** as closing condition | P1-1 |
| 10 | **Thresholds defined once, cited by gates** (`scenario-feature-discovery-to-spec.md:45-58` "Thresholds" table) | fold into P1-2 |
| 11 | **Risk severity → response time → decision authority matrix** (`:731-755`) | add to `gate-report.md` |
| 12 | **"Openable by a second person" evidence bar** | P1-7 |
| 13 | **Post-incident doc/runbook update as tracked action** (matches `XD-23`, unenforced) | P1-1 |

### 5.4 Where the two ecosystems already collide (in this repo)

`.omp/agents/` contains **15 agents imported from the agency-agents corpus** with division-prefixed slugs: `agents-orchestrator`, `engineering-backend-architect`, `engineering-frontend-developer`, `engineering-devops-automator`, `engineering-ai-engineer`, `engineering-prompt-engineer`, `engineering-rag-pipeline-engineer`, `engineering-multi-agent-systems-architect`, `engineering-finops-engineer`, `product-manager`, `security-ai-generated-code-auditor`, `specialized-mcp-builder`, `specialized-model-qa`, `testing-evidence-collector`, `testing-reality-checker`.

This is a **fourth roster** (alongside `agents/`, `AGENTS.md`, and `quality-gate`'s table), undocumented in `README.md`/`AGENTS.md`, overlapping semantically with `engineering-specialist`, `quality-assurance`, `montilla`. Two naming universes (`engineering-backend-architect` vs `engineering-specialist`) now coexist with no bridge. Decide: either import NEXUS divisions deliberately with a slug-mapping table, or remove `.omp/agents/`.

---

## 6. Recommended Target State

```text
              ┌────────────────── scenario routing (P2-3) ──────────────────┐
              │  quick-fix · feature · greenfield · incident · modernization│
              │  security-disclosure · release-train · compliance           │
              └────────────────────────────┬───────────────────────────────┘
                                           ▼
 discover ──▶ specify ──▶ review ──▶ build ──▶ gate ──▶ ship ──▶ operate
 (research    (translate  (security   (scaffold  (quality  (release   (SLO,
  + intent,    + propose)  + arch,     + execute)  + handoff) + go/no-go) incident,
  GO/NO-GO)                two lenses)                                   feedback→discover)
    ▲                                                                        │
    └────────────────────────────────────────────────────────────────────────┘
                          (Phase 6 learning loop — currently absent)
```

Six stages, one chain definition (generated), one roster (generated), one artifact tree, one routing table, ~190 checkable rules, three phases recovered.

---

## 7. Evidence Appendix

| Claim | File:line |
|---|---|
| Chain omits `research` | `rules/Frame-ship.md:12`; `scripts/context-inject.ts:27`; `.opencode/plugins/skills.ts:24` |
| Chain includes `research` | `skills/using-frame-ship/SKILL.md:20` |
| `ship-release` is chain close | `skills/ship-release/SKILL.md:17`; `.opencode/plugins/skills.ts:32` |
| Dead route `debugging` | `skills/using-frame-ship/SKILL.md:53`; `skills/quality-gate/SKILL.md:17`; `skills/execute-spec/references/testing-template.md:165` |
| Dead route `pull-request` | `skills/using-frame-ship/SKILL.md:55`; `skills/execute-spec/SKILL.md:18` |
| Max 2 lanes | `skills/translate-to-spec/SKILL.md:28`; `skills/execute-spec/SKILL.md:29,58`; `skills/execute-spec/references/worktree-annex.md:7`; `skills/using-frame-ship/SKILL.md:54`; `agents/montilla.md:35` |
| "as much as possible" contradiction | `.opencode/plugins/skills.ts:32,34` |
| 1 subagent per reviewer | `skills/quality-gate/SKILL.md:28,52,70,76` |
| Single-subagent-banned waiver | `skills/quality-gate/SKILL.md:28` |
| CI no-op | `.github/workflows/ci.yml:11-22` |
| `triger:` typo | `rules/REV.md:2` |
| Ghost reviewer skill names | `AGENTS.md:33-43` (brand-audit, finance-audit, legal-audit, mkt-audit, people-audit, rev-audit) |
| Ghost agent `marketing-reviewer` | `AGENTS.md:38` (no `agents/marketing-reviewer.md`) |
| Ghost "data dupla" / data-engineer | `skills/quality-gate/SKILL.md:28,41` |
| Missing `scripts/bump-version.mjs` | `skills/ship-release/SKILL.md:29`; `references/documentation-checklist.md:16,27,45` |
| Missing `docs/frame-ship/` tree | `AGENTS.md:70-78`; 11 skill steps; `ls docs` → only `antigravity/README.md` |
| Missing `tests/` despite `[x]` | `README.md:280` vs `ls tests` → absent |
| Missing `rules/guardrails.md` (agy lookup) | `scripts/context-inject.ts:90-91` vs `ls rules/` |
| Hardcoded guardrail copies | `.opencode/plugins/guardrails.ts:25-95`; `.pi/extensions/frame-ship-guardrails.ts:7-24` |
| Numeric vs named artifact namespaces | `skills/ship-release/SKILL.md:32-36` vs `references/archive-record.md:3,19-32`; `skills/review-architecture/SKILL.md:29,31` |
| Self-attested gate evidence | `skills/quality-gate/references/gate-report.md:71-78` |
| Attestation banned for REQ evidence | `skills/verify-handoff/SKILL.md:35` |
| Missing demo fixtures | `gate-report.md:45`; `dod-checklist.md:10` |
| DoD has no post-ship rows | `skills/verify-handoff/references/dod-checklist.md:7-44` |
| Rules mandating Operate, no stage | `rules/AUT.md:16,21,22,25`; `rules/SEC.md:22`; `rules/ENG.md:30`; `rules/REV.md:20-23` |
| 2/235 rule citations | `skills/quality-gate/references/engineering/observability-review.md:10` (only site) |
| Four verdict vocabularies | `agents/*-reviewer.md` descriptions (8); `review-security/SKILL.md:12`; `security-review-template.md:5`; `architecture-review.md:5`; `quality-gate/references/domains/*.md:5` (16); `quality-gate/SKILL.md:64-66` |
| Version drift 0.12.0 vs 1.0.0 (→ `audit-structure.md` §5.5) | `.opencode/lib/shared.ts:14` vs `package.json`, `plugin.json`, `.claude-plugin/plugin.json`, `.antigravity-plugin/plugin.json`, `gemini-extension.json` |
| License mismatch MIT vs Apache-2.0 | `package.json` + `LICENSE` vs `plugin.json`, `.claude-plugin/plugin.json`, `.antigravity-plugin/plugin.json` |
| Dead `hooks/` directory | `hooks/.gitkeep` (0 bytes) while `hooks.json` wires `node scripts/context-inject.ts` |
| 4th roster untracked in git | `git ls-files .omp` → 0 files; `.omp/agents/` → 15 files |
| Version drift 0.12.0 vs 1.0.0 (→ `audit-structure.md` §5.5) | `.opencode/lib/shared.ts:14` vs `package.json`, `plugin.json`, `.claude-plugin/plugin.json`, `.antigravity-plugin/plugin.json`, `gemini-extension.json` |
| License mismatch MIT vs Apache-2.0 | `package.json` + `LICENSE` vs `plugin.json`, `.claude-plugin/plugin.json`, `.antigravity-plugin/plugin.json` |
| Dead `hooks/` directory | `hooks/.gitkeep` (0 bytes) while `hooks.json` wires `node scripts/context-inject.ts` |
| 4th roster untracked in git | `git ls-files .omp` → 0 files; `.omp/agents/` → 15 files |
| Duplicate domain rules | `rules/XD.md` (23 rows, 10 back-refs); `rules/DENY.md` (4 of 9 = `SEC-02`, `SEC-04`, `TST-07`, `AUT-06`) |
| 3 command copies | `commands/`, `.opencode/commands/`, `.pi/prompts/` (18 files, `diff` verified) |
| 4th roster (agency-agents import) | `.omp/agents/` (15 files) |
| NEXUS Phase 0 gate | `agency-agents/strategy/nexus-strategy.md:165-179` |
| NEXUS Phase 2 gate | `nexus-strategy.md:270-285` |
| NEXUS Phase 4 final gate | `nexus-strategy.md:418-439` |
| NEXUS Phase 5 launch sequence | `nexus-strategy.md:461-506` |
| NEXUS Phase 6 cadence | `nexus-strategy.md:511-553` |
| NEXUS gate summary | `nexus-strategy.md:703-728` |
| NEXUS activation modes | `nexus-strategy.md:118-128` |
| Runbook Applicability pattern | `runbooks/scenario-feature-discovery-to-spec.md:21-28` |
| Runbook threshold rigor | `runbooks/scenario-feature-discovery-to-spec.md:45-58` |
| Human-authority boundary | `runbooks/scenario-enterprise-feature.md:13-17`; `scenario-incident-response.md:17-19` |
| NO-GO is a normal outcome | `runbooks/scenario-release-train.md:16` |
| Rehearsed rollback as closing condition | `runbooks/scenario-enterprise-feature.md:9-11` |
| 42 runbooks / 3 modes / rosters | `runbooks.json` (42 entries, `mode`, `roster[]`) |

---

## Outcome

Outcome: **Done** — audit complete, 12 workflow gaps, 10 redundancy classes, 21 prioritized recommendations, full stage↔phase↔runbook alignment map. No repository file modified except this report.
Details: Three findings outrank everything else: (1) **233 of 235 rules are uncheckable** — the rule corpus is a second truth injected every context build with 2 citations total; (2) **there is no Operate phase**, so 8 rules families (`AUT-08/13/14/17`, `SEC-14`, `ENG-22`, `REV-12..15`) have no enforcement home and nothing verifies a deploy after the tag; (3) **the chain exists in 6 places in 3 texts**, and its two failure-path routes (`debugging`, `pull-request`) point at skills that do not exist — a CLOSED gate under the repo's own "No skill = STOP" rule is an unrecoverable stop. CI is also green on zero executed steps.
Artifacts:
`/home/deuriib/projects/frame-ship/audit-workflow-optimizer.md` — full audit report: gaps G1–G12, redundancy V1–V9, improvements P0/P1/P2 with effort/impact, projected metrics, stage↔NEXUS-phase↔runbook alignment (both-direction orphan analysis), recommended 6-stage target state, and a line-level evidence appendix.
