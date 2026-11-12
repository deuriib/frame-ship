# Structural, Duplication & Verbosity Inventory — `frame-ship`

**Audit date:** 2026-02-18
**Scope:** read-only. No file in the repository was modified except this report.
**Method:** `find`, `wc -l`, `grep -n`, `diff`, `md5sum`, plus a Python section/line-frequency analysis over `rules/`, `agents/`, `skills/`, `commands/`, `.opencode/`, `.pi/`.

---

## 0. Headline numbers

| Metric | Value |
|---|---|
| Files on disk (excl. `.git`) | 180 |
| Files on disk (excl. `.git` and untracked `.omp/`) | 165 |
| Git-tracked files | 150 |
| Lines, tracked | 8,187 |
| Lines, whole working tree incl. untracked `.omp/` | 12,901 |
| Untracked `.omp/` (15 agent defs, not in git, not in any manifest) | 4,714 lines |
| `rules/` | 15 files · 395 lines |
| `agents/` | **32 files** · 2,746 lines (task brief said 30 — actual is 32) |
| `skills/` | 56 files (11 `SKILL.md` + 45 references) · 2,700 lines |
| `commands/` + `.opencode/commands/` + `.pi/prompts/` | 18 files · 78 lines for **6 logical commands** |
| Plugin runtime (`.opencode/lib` + `.opencode/plugins`) | 6 files · 1,182 lines |
| Rules text injected into every context build | 34,041 chars (~4,617 words) |
| `hooks/` directory | 1 file, `hooks/.gitkeep`, **0 bytes — dead directory** |

---

## 1. FULL INVENTORY

### 1.1 `rules/` — 15 files, 395 lines

All 15 are **injected verbatim into every system prompt** by `.opencode/plugins/guardrails.ts:117-153` (and `.pi/extensions/frame-ship-guardrails.ts:42-82`), regardless of their `trigger:` frontmatter value.

| File | Lines | Purpose | `trigger:` | Defined IDs |
|---|---|---|---|---|
| `rules/AUT.md` | 25 | Automation / CI-CD & Ops guardrails | `model_decision` | AUT-01…17 |
| `rules/DENY.md` | 17 | Hard-gate deny rules, no silent pass | `always_on` | DENY-01…12 |
| `rules/DOCS.md` | 14 | Docs-upkeep rules | `model_decision` | DOC-01…06 |
| `rules/ENG.md` | 44 | Engineering standards | `model_decision` | ENG-01…36 |
| `rules/FIN.md` | 26 | Finance controls | `model_decision` | FIN-01…17 |
| `rules/Frame-ship.md` | 38 | Chain order + load order + trigger→skill table | `always_on` | — |
| `rules/GEN.md` | 21 | Shared foundation (all domains) | `always_on` | GEN-01…13 |
| `rules/LEG.md` | 18 | Legal | `model_decision` | LEG-01…10 |
| `rules/MKT.md` | 27 | Marketing | `model_decision` | MKT-01…19 |
| `rules/PPL.md` | 36 | People / CHRO-CPO | `model_decision` | PPL-01…28 |
| `rules/PRV.md` | 18 | Privacy (Ley 172-13) | `always_on` | PRV-01…10 |
| `rules/REV.md` | 30 | CRO / Revenue | `triger` **(typo)** | REV-01…22 |
| `rules/SEC.md` | 26 | Security | `model_decision` | SEC-01…18 |
| `rules/TST.md` | 22 | Testing rules (no `#` H1 — inconsistent) | `model_decision` | TST-01…07 |
| `rules/XD.md` | 33 | Cross-domain interfaces | `model_decision` | XD-01…23 |
| | **395** | **235 rule IDs total** | | |

**Notable:** 235 rule IDs are defined; exactly **7** are ever cited from `skills/`, `agents/`, `AGENTS.md` or `README.md` (`GEN-12`, `PRV-02`, `DOC-01`, `ENG-26`, plus dangling `OPS-11`, `KR-1`, `KR-2`). 228 defined rules have zero cross-reference.

### 1.2 `agents/` — 32 files, 2,746 lines

Two disjoint populations that share no frontmatter contract: **9 named personas** (no `subagent:`, no `effort:`) and **23 role agents** (`subagent: true`, `effort:`).

**Named personas (C-suite / domain owners) — 9 files, 842 lines**

| File | Lines | `name:` | `mainAgent:` | `subagent:` | `effort:` | Tools | Purpose |
|---|---|---|---|---|---|---|---|
| `agents/montilla.md` | 90 | Montilla | **true** | — | — | 10 | CEO / orchestrator, sole dispatcher |
| `agents/vasquez.md` | 91 | Vasquez | — | — | — | 9 | Engineering Owner (CTO) |
| `agents/barrera.md` | 94 | Barrera | — | — | — | 9 | Security Owner (CISO) |
| `agents/dauhajre.md` | 92 | Dauhajre | — | — | — | 9 | Finance Owner (CFO) |
| `agents/subero.md` | 92 | Subero | — | — | — | 9 | Legal Owner (CLO) |
| `agents/vera.md` | 92 | Vera | — | — | — | 9 | Marketing Owner (CMO) |
| `agents/santana.md` | 93 | Santana | — | — | — | 9 | People Owner (CHRO/CPO) |
| `agents/montero.md` | 94 | Montero | — | — | — | 9 | Revenue Owner (CRO) |
| `agents/espinoza.md` | 93 | Espinoza | — | — | — | 9 | Automation & Ops Owner (COO) |

**Domain reviewers (quality-gate wave) — 15 files, 1,158 lines**

| File | Lines | `name:` | `effort:` | Purpose |
|---|---|---|---|---|
| `agents/automation-reviewer.md` | 91 | Automation Reviewer | medium | Automation & Ops domain gate |
| `agents/brand-reviewer.md` | 90 | Brand Reviewer | medium | Brand & Marketing domain gate |
| `agents/finance-reviewer.md` | 91 | Finance Reviewer | medium | Finance domain gate |
| `agents/legal-reviewer.md` | 90 | Legal Reviewer | high | Legal domain gate |
| `agents/people-reviewer.md` | 93 | People Reviewer | high | People & Culture domain gate |
| `agents/revenue-reviewer.md` | 91 | Revenue Reviewer | high | Revenue domain gate |
| `agents/security-reviewer.md` | 71 | Security Reviewer | high | Security domain gate |
| `agents/review-data.md` | 92 | **Data Reviewer** | high | Data lens / schema governance |
| `agents/review-observability.md` | 70 | Observability Reviewer | high | Telemetry reviewer |
| `agents/review-readability.md` | 70 | Readability Reviewer | high | Readability reviewer |
| `agents/review-refuter.md` | 70 | **Refuter Reviewer** | high | Adversarial refuter |
| `agents/review-reliability.md` | 70 | Reliability Reviewer | high | Reliability reviewer |
| `agents/review-resilience.md` | 70 | Resilience Reviewer | high | Resilience reviewer |
| `agents/review-risk.md` | 71 | Risk Reviewer | high | Change-risk reviewer |
| `agents/quality-assurance.md` | 94 | **Quality Assurance** | high | Test-suite verifier |

**Domain specialists (fused craft) — 8 files, 727 lines**

| File | Lines | `name:` | `effort:` | Purpose |
|---|---|---|---|---|
| `agents/automation-specialist.md` | 91 | Automation Specialist | medium | IaC / CI-CD / runbooks |
| `agents/engineering-specialist.md` | **48** | **`engineering-specialist`** (kebab) | medium | Fused architect/backend/frontend/data/devops |
| `agents/finance-specialist.md` | 90 | Finance Specialist | medium | Unit economics / FinOps |
| `agents/legal-specialist.md` | 91 | Legal Specialist | medium | Licenses / Ley 172-13 / contracts |
| `agents/marketing-specialist.md` | 91 | Marketing Specialist | medium | Positioning / release notes / SEO |
| `agents/people-specialist.md` | 90 | People Specialist | high | Governance policies / agent contracts |
| `agents/revenue-specialist.md` | 90 | Revenue Specialist | medium | Pricing / funnel / RevOps |
| `agents/security-specialist.md` | 100 | Security Specialist | medium | Threat modeling / IAM / privacy |

### 1.3 `skills/` — 11 skills, 56 files, 2,700 lines

| Skill | `SKILL.md` lines | Description (verbatim) | References |
|---|---|---|---|
| `using-frame-ship` | 90 | Use when a session starts, after compaction, or when asking what frame-ship does. | `bootstrap-checklist.md` (31), `challenge-round.md` (42) |
| `frame-intent` | 69 | Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered. | `okr-template.md` (18), `product-brief.md` (54) |
| `translate-to-spec` | 52 | Use after a brief is approved or when a new domain needs spec coverage. | `requirements-template.md` (28), `spec-template.md` (43) |
| `propose-changes` | 59 | Use when a specialist is ready to implement or a change needs pre-approval. | `proposal-template.md` (60), `risk-assessment.md` (40) |
| `review-security` | 58 | Use when a change touches auth, data, external APIs, or when security owner sign-off is required. | `security-review-template.md` (24), `threat-model.md` (25) |
| `review-architecture` | 51 | Use when a change modifies public APIs, data models, or cross-cutting concerns. | `adr-template.md` (27), `architecture-review.md` (24), `architecture-template.md` (31) |
| `execute-spec` | 57 | Use when a proposal is approved and the specialist is cleared to write code. | `implementation-plan.md` (34), `test-matrix.md` (21), `testing-template.md` (201), `worktree-annex.md` (85) |
| `quality-gate` | 87 | Use when implementation is ready for review, or when domain owners plus orchestrator must waive a gate. | `gate-report.md` (88), `waiver-template.md` (60), `domains/` ×9, `engineering/` ×7 |
| `verify-handoff` | 57 | Use when a specialist declares work complete and it needs review before shipping. | `dod-checklist.md` (44), `handoff-template.md` (33) |
| `ship-release` | 66 | Use when verified work is ready to ship or when preparing a tagged release. | `archive-record.md` (48), `changelog-template.md` (29), `documentation-checklist.md` (62), `install-template.md` (148), `migration-guide-template.md` (106), `readme-template.md` (125), `release-notes.md` (41) |
| `research` | 41 | Use when a task has high uncertainty, a novel domain, or a dependency on data not yet in hand. | `decision-aid.md` (13) |

`skills/quality-gate/references/domains/` (9 files, 232 lines): `automation-review.md` (29), `data-review.md` (25), `finance-review.md` (24), `legal-review.md` (24), `marketing-review.md` (24), `ops-review.md` (26), `people-review.md` (29), `revenue-review.md` (24), `security-review.md` (25).

`skills/quality-gate/references/engineering/` (7 files, 203 lines): `observability-review.md` (35), `quality-assurance-review.md` (31), `readability-review.md` (25), `refuter-review.md` (27), `reliability-review.md` (31), `resilience-review.md` (25), `risk-review.md` (24).

### 1.4 `commands/` — 6 files, 36 lines (triplicated, see §2.6)

| File | Lines | `name:` | Purpose |
|---|---|---|---|
| `commands/ab-test-landing.md` | 6 | `experiment-designer` | Design and scaffold an A/B test on a landing page |
| `commands/audit-production.md` | 6 | `production-auditor` | Audit prod readiness, rank gaps by risk |
| `commands/build-ai-feature.md` | 6 | `ai-feature-builder` | Build a production-ready AI feature |
| `commands/build-feature-e2e.md` | 6 | `feature-builder` | Build feature end-to-end incl. CI + deploy |
| `commands/research-competitors.md` | 6 | `market-researcher` | Research competitors, positioning + gaps |
| `commands/synthesize-feedback.md` | 6 | `feedback-synthesizer` | Synthesize user feedback into themes |

### 1.5 `.opencode/` — 13 files, 1,208 lines

| File | Lines | Purpose |
|---|---|---|
| `.opencode/README.md` | 201 | Install guide for the Opencode V2 plugin (duplicates `README.md` §Installation) |
| `.opencode/lib/shared.ts` | 182 | Shared runtime: `VERSION = "0.12.0"`, `resolveRepoDir`, timeout-bounded FS helpers |
| `.opencode/plugins/frame-ship.ts` | 31 | Composed entry — runs skills + agents + guardrails + commands under id `frame-ship` |
| `.opencode/plugins/skills.ts` | 251 | Skills lane: registers `frame-ship:<stage>`, injects WORKFLOW_CARD/POINTERS/COMPACTION_REMINDER |
| `.opencode/plugins/agents.ts` | 209 | Agents lane: parses `agents/*.md` frontmatter → OpenCode agent definitions + permissions |
| `.opencode/plugins/guardrails.ts` | 154 | Guardrails lane: reads `rules/**/*.md` at runtime, injects full text on `context` + `compaction` |
| `.opencode/plugins/commands.ts` | 156 | Commands lane: registers `commands/*.md` as V2 slash commands |
| `.opencode/commands/*.md` (6) | 24 | Same 6 commands, opencode-flavoured frontmatter |

### 1.6 `.pi/` — 8 files, 112 lines

| File | Lines | Purpose |
|---|---|---|
| `.pi/README.md` | **0** | **Empty file** |
| `.pi/extensions/frame-ship-guardrails.ts` | 82 | Pi extension: `before_agent_start` guardrails injection with its own fallback text |
| `.pi/prompts/*.md` (6) | 30 | Same 6 commands, pi-flavoured frontmatter (`argument-hint`, `${1:-…}`) |

### 1.7 `.claude-plugin/`, `.antigravity-plugin/`, `.agents/` — 4 files, 75 lines

| File | Lines | Purpose |
|---|---|---|
| `.claude-plugin/plugin.json` | 18 | Claude/Antigravity manifest — **no** `agents`/`skills`/`hooks` keys |
| `.claude-plugin/marketplace.json` | 19 | Claude marketplace entry pointing at `./` |
| `.antigravity-plugin/plugin.json` | 19 | Byte-identical to `.claude-plugin/plugin.json` **+ only** `displayName` |
| `.agents/marketplace.json` | 19 | Third marketplace descriptor, different schema (no owner/version/author) |

### 1.8 `scripts/`, `hooks/`, root manifests

| File | Lines | Purpose |
|---|---|---|
| `scripts/context-inject.ts` | 124 | `PreInvocation` hook for Antigravity CLI: emits bootstrap body once at `invocationNum === 0`; holds its own copy of `CHAIN` (L26-27) |
| `hooks.json` | 10 | Declares `frame-ship-context.PreInvocation` → `node scripts/context-inject.ts` |
| `hooks/.gitkeep` | 0 | Dead directory — nothing lives in `hooks/` |
| `plugin.json` | 20 | Root plugin manifest (`agents`, `skills`, `hooks` keys) |
| `package.json` | 29 | npm/pi package: `main` → `.opencode/plugins/frame-ship.ts`, `pi.skills/extensions/prompts` |
| `gemini-extension.json` | 5 | Gemini extension descriptor, `contextFileName: AGENTS.md` |
| `mise.toml` | 8 | Node 24.22.1 toolchain, **zero tasks** (yet 5 docs cite `mise run typecheck`/`mise run install`) |

### 1.9 Root docs

| File | Lines | Purpose |
|---|---|---|
| `AGENTS.md` | 78 | Project context / agent architecture / 15-agent roster / folder structure |
| `README.md` | 290 | Public readme: how it works, install (opencode + agy), workflow, skills library, philosophy, dev |
| `docs/antigravity/README.md` | 20 | Antigravity CLI install/verify/disable |
| `.github/workflows/ci.yml` | 28 | Two jobs (`typecheck`, `test`) whose only real steps are **commented out** (L17-18, L27-28) |
| `.github/FUNDING.yml` | 3 | Sponsorship link |
| `LICENSE` | 21 | MIT |
| `.copilotignore` | 65 | Copilot ignore patterns |
| `.gitattributes` | 17 | LF normalization; references a **non-existent** `hooks/session-start` |
| `.gitignore` | 197 | Standard Node ignores; **does not** exclude `.omp/` |

### 1.10 Untracked, unlisted: `.omp/` — 15 files, 4,714 lines

`git status` → `?? .omp/`. Fifteen agent definitions (`agents-orchestrator.md` 400, `engineering-rag-pipeline-engineer.md` 447, `specialized-model-qa.md` 525, `engineering-multi-agent-systems-architect.md` 597, …) that are **not referenced by any manifest, skill, rule, or plugin**. They exceed the size of `agents/` by 1.7× and are invisible to the shipped product.

---

## 2. DUPLICATION MAP

### 2.1 The chain sequence — 6 textual variants in 6 files

`frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`

| # | File:line | Form | Wording drift |
|---|---|---|---|
| 1 | `rules/Frame-ship.md:12` | Canonical, inside a ` ```text ` fence | `review-security/review-architecture` |
| 2 | `.opencode/plugins/skills.ts:23-24` | `const CHAIN` — "single source of truth for order" per its own header L3 | byte-identical to #1 |
| 3 | `scripts/context-inject.ts:26-27` | `const CHAIN` | byte-identical to #1 |
| 4 | `README.md:123-125` | Prose block, prefixed with `using-frame-ship →` | **starts with bootstrap**, line-wrapped |
| 5 | `skills/using-frame-ship/SKILL.md:19-23` | Fenced block, prefixed `[research] →` | **includes optional `research`** |
| 6 | `skills/using-frame-ship/references/bootstrap-checklist.md:8` | Inline code | **collapses to `review-*`** (loses the pair) |

Three *different* chain definitions (with/without `using-frame-ship`, with/without `[research]`, with/without `review-*`) for one ritual order.

**Amplification:** the string is interpolated **three times per session** from `skills.ts` alone — `WORKFLOW_CARD` (L27), `POINTERS` (L32), `COMPACTION_REMINDER` (L34) — and once more by `rules/Frame-ship.md:12` and once by `scripts/context-inject.ts:30`. In an agent session the same chain is stated **5×** in the system prompt.

**Trigger→skill table duplicated 2× (near-verbatim):**

- `rules/Frame-ship.md:23-32` — 10 bullet lines: `start / what-skills → using-frame-ship`, `initiative / OKRs → frame-intent (BRIEF + OKRs)`, … `verified → ship-release (NOTES + changelog + rollback)`.
- `.opencode/plugins/skills.ts:29` — one line, pipe-separated, identical 10 pairs in identical order: `start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | … | verified→frame-ship:ship-release(NOTES+changelog+rollback)`.

Because `guardrails.ts:126-141` reads **every** `rules/*.md` including `Frame-ship.md`, this table reaches the model **twice in the same prompt** every turn.

**Load-order rules triplicated:**

- `rules/Frame-ship.md:15-19` (§Load order, 3 numbered items)
- `.opencode/plugins/skills.ts:28` (`LOAD ORDER — HARD STOP: 1.… 2.… 3.…`)
- `skills/using-frame-ship/references/bootstrap-checklist.md:7-9`
- plus `AGENTS.md` §Guardrails preamble (same 3 steps, in-context)

### 2.2 The 14/15 domain rules — `rules/*.md` vs the injected guardrails fallback

`rules/` is the runtime source (read recursively, good). But **two hardcoded fallback copies exist and both contradict the "No duplication" claim in their own body**.

**Copy A — `.opencode/plugins/guardrails.ts:27-85` (`SHARED_GUARDRAILS`, 59 lines)**

Token-overlap analysis against every line of `rules/*.md`:

```
38 / 39 content lines restate a rules/*.md line at ≥40% token overlap
```

| Fallback line(s) | Restates | Overlap |
|---|---|---|
| L30 `Structure: … No duplication.` | *(self-refuting)* | — |
| L36 `No sugarcoating. State facts. One point per paragraph. Respect attention.` | `rules/GEN.md:9` | **100%** |
| L37 `No busywork theater.…` | `rules/GEN.md:10` | 71% |
| L38 `Assumptions on irreversible calls…` | `rules/GEN.md:11` | 60% |
| L39 `FAIL → retry N=2 differently → escalate…` | `rules/Frame-ship.md:19` | **100%** |
| L40 `No freelance fixes…` | `rules/GEN.md:13` | **100%** |
| L41 `Blameless post-mortems…` | `rules/GEN.md:14` | 88% |
| L45-48 `Critical:/High:/Medium:` three lines | `rules/GEN.md:15` (one line) | 71-83% |
| L49 `Critical/High surface same session…` | `rules/GEN.md:16` | **100%** |
| L50 `Accepted risks documented…` | `rules/GEN.md:17` | **100%** |
| L54 `Every claim requires proof: diff, scan, log, signed approval…` | `rules/GEN.md:18` | 91% |
| L55 `Finding without proof = REFUTED.` | `rules/GEN.md:18` | **100%** |
| L56 `PASS requires allowlisted evidence only. No raw PII, no secrets.` | `rules/GEN.md:19` | 86% |
| L58-64 privacy block (7 lines) | `rules/PRV.md:9,10,11,14,15,16,17` | 71-100% |
| L68 `No secrets/tokens/credentials/sessions…` | `rules/GEN.md:20` | **100%** |
| L72-83 cross-domain block (12 lines) | `rules/XD.md:9-20` | **100% each** |
| L85 `Enforcement: …no silent PASS.` | `rules/XD.md:22` | **100%** |

**Drift in Copy A:** it stops at the `XD-14` equivalent. `rules/XD.md:21-23` (XD-21 docs↔finance, XD-22 docs↔revenue, XD-23 docs↔incident) are **absent** from the fallback. It also cites `§6` (`People ↔ Security: … — enforced by §6`) — there is no `§6` anywhere in the repo. `GEN-12`/`GEN-13` are collapsed into one line; `PRV-02`'s "HR record" clause and `PRV-05`, `PRV-08`(ROPA/DPA), `PRV-10` (sensitive data) are dropped.

**Copy B — `.pi/extensions/frame-ship-guardrails.ts:7-24` (`FALLBACK_GUARDRAILS`, 18 lines)**

```
13 / 14 content lines restate a rules/*.md line at ≥40% token overlap
```

This is a *third, shorter* condensation: it merges `GEN-01..05`, `GEN-08`, `GEN-10`, `GEN-12` into 8 bullets, flattens all of `PRV` into a single line ("minimization, purpose limitation, PII checkpoints, 72h breach notification") and keeps only **4 of 23** `XD-*` interfaces (XD-01, XD-04, XD-06, XD-12). It has **no** `GEN-13`, no `PRV-05/08/10`, no `DENY-*`.

**Net:** the same normative content exists in **3 versions with 3 different scopes**:

| | `rules/**` (source) | OpenCode fallback | Pi fallback |
|---|---|---|---|
| Lines | 395 | 59 | 18 |
| Rule IDs preserved | 235 | 0 (IDs stripped) | 0 |
| Trigger frontmatter honoured | **no** (all 15 injected) | no | no |
| Marker | `[frame-ship-guardrails v0.12.0]` | same | `[frame-ship-guardrails]` (unversioned) |

Both fallbacks drop **every rule ID** — so a fallback-activated session cannot cite `GEN-12`/`PRV-02`, which are the only two IDs the skills actually reference.

**Also duplicated: YAML frontmatter is injected verbatim.** `guardrails.ts:131-134` pushes the raw file including its `---\ntrigger: …\ndescription: …\n---` block. Fifteen YAML headers (45 wasted lines) ship inside the prompt on every turn.

### 2.3 The 8-domain reviewer routing table vs the `agents/` roster

`skills/quality-gate/SKILL.md:32-42` (routing table) → 15 reviewer ids across 9 rows:

| Routing table (SKILL.md:34-42) | `agents/` file | Frontmatter `name:` | Reference checklist | Match? |
|---|---|---|---|---|
| `review-readability` | `agents/review-readability.md` | Readability Reviewer | `engineering/readability-review.md` | 3 spellings |
| `review-reliability` | `agents/review-reliability.md` | Reliability Reviewer | `engineering/reliability-review.md` | 3 spellings |
| `review-refuter` | `agents/review-refuter.md` | **Refuter Reviewer** | `engineering/refuter-review.md` | 3 spellings |
| `review-observability` | `agents/review-observability.md` | Observability Reviewer | `engineering/observability-review.md` | 3 spellings |
| `review-resilience` | `agents/review-resilience.md` | Resilience Reviewer | `engineering/resilience-review.md` | 3 spellings |
| `review-risk` | `agents/review-risk.md` | Risk Reviewer | `engineering/risk-review.md` | 3 spellings |
| `quality-assurance` | `agents/quality-assurance.md` | **Quality Assurance** (no "Reviewer") | `engineering/quality-assurance-review.md` | 2 of 3 |
| `review-data` | `agents/review-data.md` | **Data Reviewer** | `domains/data-review.md` | 3 spellings |
| `security-reviewer` | `agents/security-reviewer.md` | Security Reviewer | `domains/security-review.md` **and** `review-security/references/security-review-template.md` | **two checklists** |
| `finance-reviewer` | `agents/finance-reviewer.md` | Finance Reviewer | `domains/finance-review.md` | ✓ |
| `legal-reviewer` | `agents/legal-reviewer.md` | Legal Reviewer | `domains/legal-review.md` | ✓ |
| `brand-reviewer` | `agents/brand-reviewer.md` | Brand Reviewer | `domains/marketing-review.md` | **brand ≠ marketing** |
| `people-reviewer` | `agents/people-reviewer.md` | People Reviewer | `domains/people-review.md` | ✓ |
| `revenue-reviewer` | `agents/revenue-reviewer.md` | Revenue Reviewer | `domains/revenue-review.md` | ✓ |
| `automation-reviewer` | `agents/automation-reviewer.md` | Automation Reviewer | `domains/automation-review.md` (+ `ops-review.md`) | ✓ |
| `data-engineer lineage check` | **NO SUCH AGENT** | — | — | **dangling** |
| *(unmapped)* | — | — | `domains/ops-review.md` | lens, not a reviewer |
| *(unmapped specialists)* | 8 × `*-specialist.md` | — | — | not in table |
| *(unmapped owners)* | 9 × persona files | — | — | table says "owner", never names them |

**Naming mismatches, confirmed:**

- **`review-data` vs "Data Reviewer"** — file/reference use `review-data`; frontmatter says `Data Reviewer`; reference file is `data-review.md`. Three orders.
- **`review-refuter` vs "Refuter Reviewer"** — file `review-refuter.md`, frontmatter `Refuter Reviewer`, reference `refuter-review.md`.
- **`quality-assurance` vs "Quality Assurance"** — the only reviewer whose frontmatter name omits "Reviewer"; the only one whose description says "Verifier" not "Reviewer" (`agents/quality-assurance.md:3`).
- **`brand-reviewer` vs `marketing-reviewer`** — `AGENTS.md:29` lists `marketing-reviewer` with skill `mkt-audit`; no such file exists. The real file is `brand-reviewer`. The routing table row is `brand/marketing`.
- **`data-engineer`** — `skills/quality-gate/SKILL.md:42` requires a "data-engineer lineage check". No `data-engineer` agent, skill, or reference exists anywhere.
- **`marketing-reviewer`** — listed in `AGENTS.md:29` (as `marketing-reviewer` | Marketing Strategy & Impact | `mkt-audit`); does not exist.

**`AGENTS.md` roster (which calls itself "the following agents are available") is materially wrong:**

| Claimed in `AGENTS.md` | Reality |
|---|---|
| 15 agents listed | 32 files exist |
| `marketing-reviewer` (L29) | missing |
| keys skills `brand-audit`, `finance-audit`, `legal-audit`, `mkt-audit`, `people-audit`, `rev-audit` (L26-33) | **all 6 missing** from `skills/` |
| — | **18 files never mentioned:** `automation-specialist`, `finance-specialist`, `review-data`, `review-observability`, `review-readability`, `review-refuter`, `review-reliability`, `review-resilience`, `review-risk`, and all 9 personas (`montilla`, `vasquez`, `barrera`, `espinoza`, `dauhajre`, `subero`, `vera`, `santana`, `montero`) |
| — | **no domain catalogue table at all**, yet 3 files point here for it (§4.3) |

**Duplicated domain catalogue:** the same "8 domains + owners" list exists in 4 places with no shared source:

1. `skills/quality-gate/SKILL.md:32-42` — table, `engineering | security | finance | legal | brand/marketing | people | revenue | automation/ops`
2. `skills/using-frame-ship/references/bootstrap-checklist.md:29` — bullet list, same 8, adds `(automation owner + engineering owner)`
3. `skills/translate-to-spec/SKILL.md:21` — inline list, `marketing` (not `brand/marketing`), no owner names
4. `skills/frame-intent/SKILL.md:35,39` — references a catalogue in `../AGENTS.md` which does not contain it

### 2.4 The 9 named personas — where defined, where referenced

| Persona | Defined in | Referenced as owner / gate-keeper in | Ref count |
|---|---|---|---|
| **Montilla** (CEO) | `agents/montilla.md:21` | **only its own file** | **1** |
| **Vasquez** (CTO) | `agents/vasquez.md:19` | `agents/review-data.md` (×2, L23/L40ish), `agents/quality-assurance.md`, `agents/engineering-specialist.md:2` + author field of 5 manifests | 5 |
| **Barrera** (CISO) | `agents/barrera.md:19` | `agents/security-specialist.md` (×5) | 6 |
| **Espinoza** (COO) | `agents/espinoza.md:19` | `agents/automation-specialist.md` (×4), `agents/automation-reviewer.md` (×3) | 8 |
| **Dauhajre** (CFO) | `agents/dauhajre.md:19` | `agents/finance-specialist.md` (×4), `agents/finance-reviewer.md` (×3) | 8 |
| **Subero** (CLO) | `agents/subero.md:19` | `agents/legal-specialist.md` (×4), `agents/legal-reviewer.md` (×3) | 8 |
| **Vera** (CMO) | `agents/vera.md:19` | `agents/marketing-specialist.md` (×4), `agents/brand-reviewer.md` (×3) | 8 |
| **Santana** (CHRO/CPO) | `agents/santana.md:19` | `agents/people-specialist.md` (×4), `agents/people-reviewer.md` (×3) | 8 |
| **Montero** (CRO) | `agents/montero.md:19` | `agents/revenue-specialist.md` (×4), `agents/revenue-reviewer.md` (×3) | 8 |

**Key finding: the persona layer is a closed loop.** All 9 are referenced **exclusively from inside `agents/`**. Zero references in `rules/`, `skills/`, `commands/`, `AGENTS.md`, `README.md`, or any plugin `.ts`. Meanwhile `skills/` speaks of "the **engineering owner**", "the **security owner**", "owning **domain owner**", "the **orchestrator**" — abstract role names that are never bound to these personas anywhere in the skill layer:

| Abstract role | Appears in skills | Bound to a persona? |
|---|---|---|
| `orchestrator` | `quality-gate:26`, `ship-release:21`, `verify-handoff:21`, `execute-spec:22`, `frame-intent:21`, `propose-changes:21` (+ `bootstrap-checklist`) | **never** — Montilla is named only in `agents/montilla.md` |
| `engineering owner` | `quality-gate:34,42`, `translate-to-spec:21,29`, `verify-handoff:21`, `review-architecture:21` | **never** — Vasquez never cited |
| `security owner` | `quality-gate:35,59`, `review-security:21,25`, `verify-handoff:21` | **never** — Barrera never cited |
| `finance owner`, `legal owner`, `marketing owner`, `people owner`, `revenue owner`, `automation owner` | `quality-gate:36-41` | **never** |

`AGENTS.md` — declared "canonical truth" by `guardrails.ts:4` and by `skills.ts:32` ("`Truth: AGENTS.md`") — **does not mention a single persona name.**

**Also:** `agents/montilla.md:60` requires "the 8-domain table (R1–R8)" — no `R1`…`R8` row labels exist in any file.

### 2.5 Reviewer checklists — 16 near-identical templates

`skills/quality-gate/references/**` reviewer checklists (16 files, 305 non-blank lines):

```
104 of 305 lines (34%) are lines shared by >= 8 of the 16 checklists
```

Most repeated:

| Count | Line | File |
|---|---|---|
| 16× | `**Date:** YYYY-MM-DD` | all |
| 16× | `## Verdict Rationale` | all |
| 15× | `## Checklist` | all but `refuter-review.md` |
| 15× | `**Verdict:** pass \| conditional \| fail` | all but `refuter-review.md` |
| 14× | `[Why this verdict]` | all but `security-review.md`, `refuter-review.md` |
| 12× | `## Findings` | all but the 4 engineering ones with custom tables |
| 8× | `\| ID \| Severity \| Finding \| Mitigation \|` + separator | all `domains/*` |

`automation-review.md` and `ops-review.md` are the worst pair: `ops-review.md` is a separate file whose 7-item checklist is a **subset** of `automation-review.md:12-14` ("Deployment plan + rollback tested (see `ops-review.md` lens when infra-touched) / Monitoring/alerting + runbook updated / Capacity/scaling + feature flags reviewed"). `automation-review.md:27-29` even contains an "## Ops Lens" section pointing back at `ops-review.md` — a mutual cross-reference encoding the same 3 checks twice.

**Identical-template also true of the two security review checklists:**

`diff skills/review-security/references/security-review-template.md skills/quality-gate/references/domains/security-review.md` — the same artefact (`Security Review: SPEC-XXX`) with **different verdict vocabularies** (`Approved | Conditional | Rejected` vs `pass | conditional | fail`), different finding-ID prefixes (`S-001` vs `SEC-001`), and different reviewer attribution.

### 2.6 The 6 slash commands — triplicated across 3 harness directories

| Logical command | `commands/` | `.opencode/commands/` | `.pi/prompts/` |
|---|---|---|---|
| `ab-test-landing` | 6 lines, `name: experiment-designer`, `tools: […]` | 4 lines, description only, `$ARGUMENTS` | 5 lines, `argument-hint`, `${1:-…}` |
| `audit-production` | 6, `name: production-auditor` | 4, `$ARGUMENTS` | 5, `${1:-the app}` |
| `build-ai-feature` | 6, `name: ai-feature-builder` | 4, `$ARGUMENTS` | 5, `${1:-…}` |
| `build-feature-e2e` | 6, `name: feature-builder` | 4, `$ARGUMENTS` | 5, `${1:-the feature}` |
| `research-competitors` | 6, `name: market-researcher` | 4, `$ARGUMENTS` | 5, `${1:-…}` |
| `synthesize-feedback` | 6, `name: feedback-synthesizer` | 4, `$ARGUMENTS` | 5, `${1:-…}` |

18 files for 6 bodies of text. All 18 MD5s differ — i.e. **the copies have already drifted**: three frontmatter schemas (`name`+`tools` / none / `argument-hint`) and three placeholder syntaxes. Only `commands/*.md` carries `name:` and `tools:`; `.opencode/plugins/commands.ts:44-63` reads only `description`, so the `name`/`tools` keys in `commands/*.md` are **silently ignored** by the only reader.

### 2.7 Manifest duplication

`plugin.json` (root), `.claude-plugin/plugin.json`, `.antigravity-plugin/plugin.json`, `.agents/marketplace.json`, `.claude-plugin/marketplace.json`, `package.json`, `gemini-extension.json` — 7 manifests, 140 lines, describing one plugin.

```
diff .claude-plugin/plugin.json .antigravity-plugin/plugin.json
> 4  "displayName": "Frame→Ship"          ← the only difference
```

`plugin.json` (root, 20 lines) vs `.antigravity-plugin/plugin.json` (19 lines) differ in that root declares `agents`/`skills`/`hooks` while the antigravity manifest declares `repository`/`homepage`. Neither `.claude-plugin/plugin.json` nor `.antigravity-plugin/plugin.json` declares `agents`, `skills`, or `hooks` — so on those harnesses the 32 agents and 56 skill files are **not wired by any manifest**.

### 2.8 Verdict vocabulary — 3 incompatible sets

| Vocabulary | Where | Count |
|---|---|---|
| `APPROVE / CONDITIONAL / CLOSED` | `agents/` reviewers (automation, brand, finance, legal, people, revenue, review-data, quality-assurance) | 8 files |
| `Approved / Conditional / Rejected` | `skills/review-security/SKILL.md`, `review-security/references/security-review-template.md`, `review-architecture/references/architecture-review.md`, `README.md:113` | 4 files |
| `pass / conditional / fail` | every `skills/quality-gate/references/**` checklist (16 files) + `ops-review.md` | 16 files |

An agent told to "emit APPROVE/CONDITIONAL/CLOSED" writes into a template whose header field is `pass | conditional | fail`.

### 2.9 Intra-`skills/` boilerplate

All 11 `SKILL.md` share the same 6-section skeleton:

| Boilerplate element | Present in |
|---|---|
| The creed line `*"Do things as if for God—that's why you work with excellence and dedication."*` | **11/11** |
| `## Overview` | **11/11** |
| `## Chain Contract` | **11/11** |
| `## Role Binding` | **11/11** |
| `## Process` | **11/11** |
| `Pre-flight load … HARD STOP` numbered item 0 | **10/11** |
| `**Singleton:** create-if-missing else update-in-place, never suffixed` | 4/11 |
| `Reference-only` packet language | **11/11** |

The creed also appears in `AGENTS.md:76`, `README.md:65`, `plugin.json`, and 6 `.opencode/*.ts` headers — 10+ copies of one sentence. (Note: `skills/*` uses an English translation; `agents/*`, `AGENTS.md`, `README.md` use the Spanish original — so it is not even the same string.)

---

## 3. VERBOSITY — boilerplate vs unique content in `agents/`

### 3.1 The 24 persona-template agents

24 of 32 files instantiate one 11-section template:

```
## Your Identity & Memory     ## Your Technical Deliverables
## Your Core Mission           ## Your Workflow Process
## Critical Rules You Must Follow  ## Your Communication Style
## Review Criteria (…)         ## Learning & Memory
## Your Success Metrics        ## Advanced Capabilities
```

Measured boilerplate = content lines inside those 9 boilerplate headings ÷ total lines:

| File | Total lines | Boilerplate lines | **% boilerplate** |
|---|---|---|---|
| `agents/security-specialist.md` | 101 | 72 | **71%** |
| `agents/automation-specialist.md` | 92 | 64 | **70%** |
| `agents/barrera.md` | 95 | 66 | **69%** |
| `agents/brand-reviewer.md` | 91 | 63 | 69% |
| `agents/dauhajre.md` | 93 | 64 | 69% |
| `agents/espinoza.md` | 94 | 65 | 69% |
| `agents/montero.md` | 95 | 66 | 69% |
| `agents/finance-specialist.md` | 91 | 63 | 69% |
| `agents/people-specialist.md` | 91 | 63 | 69% |
| `agents/revenue-specialist.md` | 91 | 63 | 69% |
| `agents/santana.md` | 94 | 65 | 69% |
| `agents/subero.md` | 93 | 64 | 69% |
| `agents/vera.md` | 93 | 64 | 69% |
| `agents/legal-specialist.md` | 92 | 63 | 68% |
| `agents/marketing-specialist.md` | 92 | 63 | 68% |
| `agents/review-data.md` | 93 | 63 | 68% |
| `agents/vasquez.md` | 92 | 63 | 68% |
| `agents/finance-reviewer.md` | 92 | 62 | 67% |
| `agents/people-reviewer.md` | 94 | 64 | 68% |
| `agents/quality-assurance.md` | 95 | 64 | 67% |
| `agents/revenue-reviewer.md` | 92 | 62 | 67% |
| `agents/automation-reviewer.md` | 92 | 62 | 67% |
| `agents/legal-reviewer.md` | 91 | 61 | 67% |
| `agents/montilla.md` | 91 | 60 | 66% |

**Mean: 68% of every persona-template file is one of 9 fixed headings.** ~1,600 of the 2,746 `agents/` lines are skeleton.

### 3.2 Exact-duplicate lines across `agents/` (≥3 files)

| Copies | Line |
|---|---|
| **24** | `- **Creed**: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación." — Non-negotiable. Eternal.` |
| **32** | `tools:` / `  - view_file` / `  - list_dir` / `  - find_by_name` / `  - write_to_file` / `  - replace_file_content` / `  - grep_search` (the tool list is 100% duplicated; only the selection differs) |
| 23 | `subagent: true` |
| 9 | `  - send_message` / `  - manage_subagents` / `  - invoke_subagent` |
| 6 | `3. **Verdict**: Issue APPROVE, CONDITIONAL, or CLOSED with evidence.` |
| 6 | `- ❌ **No \`run_command\` execution.**` / `- ❌ **No \`run_command\` execution.** You inspect and report.` |
| 6 | `- Gate verdict records (APPROVE / CONDITIONAL / CLOSED).` |
| 6 | `- **Re-review time** ≤ 1 session after remediation.` |
| 5 | `5. **Track**: Maintain audit records for re-review.` |
| 5 | `### Blockers (Must Fix)` / `### Suggestions (Should Fix)` / `### Nits (Nice to Have)` |
| 4 | `- ✅ **Every verdict is APPROVE, CONDITIONAL, or CLOSED** — no soft language.` |
| 4 | `- You feed findings into future audit checklists.` |

The 8 domain reviewers are a **fill-in-the-blank form**: `automation-reviewer.md`, `brand-reviewer.md`, `finance-reviewer.md`, `legal-reviewer.md`, `people-reviewer.md`, `revenue-reviewer.md`, `review-data.md`, `quality-assurance.md` all carry the same four Communication bullets with one noun swapped:

```
- **Active Mentorship**: Explain *why* a manual step breaks reliability, not just *that* it does.   ← automation
- **Active Mentorship**: Explain *why* an architectural pattern drives cost, with a concrete example. ← finance
- **Active Mentorship**: Explain *why* a claim needs substantiation, not just *that* it does.        ← brand
- **Dominican Human Warmth**: Firm verdicts, professional respect, no drama.                         ← identical in 8 files
- **Blameless**: Focus on the missing gate, not the engineer.                                        ← 1 word swapped
```

### 3.3 The 7 engineering reviewers + `security-reviewer` — a 7-clone template

Counted over the 7 `review-*.md` + `security-reviewer.md` (`agents/review-readability.md` is the reference):

| File | Non-blank lines | Shared by all 8 | Shared by ≥2 | **Unique** |
|---|---|---|---|---|
| `agents/legal-reviewer.md` | 68 | 19 | 30 | **38 (56%)** |
| `agents/people-reviewer.md` | 71 | 19 | 31 | 40 (56%) |
| `agents/brand-reviewer.md` | 69 | 19 | 28 | 41 (59%) |
| `agents/finance-specialist.md` | 69 | 19 | 28 | 41 (59%) |
| `agents/review-readability.md` | 51 | 13 | 16 | **35 (69%)** |
| `agents/review-refuter.md` | 51 | 13 | 13 | 38 (75%) |
| `agents/review-risk.md` | 52 | 11 | 14 | 38 (73%) |

`diff agents/review-readability.md agents/security-reviewer.md` → **only 8 hunks differ**: frontmatter (5 lines), H1, Identity (4 bullets), Mission intro, Mission list (5 items), Critical Rules (6 items), and one reference path. Everything else — headings, table scaffolding, the whole `### Blockers / ### Suggestions / ### Nits` structure with identical items in 5 of the files, and the closing paragraph — is byte-identical.

### 3.4 Most redundant files — ranking

| Rank | File | Why |
|---|---|---|
| 1 | `agents/security-specialist.md` (101 L, 71% boilerplate) | Largest persona-template file; its 11 sections restate `rules/SEC.md` SEC-01…18 and `barrera.md` verbatim in places |
| 2 | `agents/barrera.md` (95 L, 69%) | Its "Critical Rules" ❌ list is `rules/SEC.md:9-20` re-worded; its "Success Metrics" restates `SEC-12` SLAs |
| 3 | `agents/automation-specialist.md` (92 L, 70%) | Restates `rules/AUT.md` AUT-01…17 |
| 4 | `agents/legal-reviewer.md` (68 L, **56% unique — lowest uniqueness in the repo**) | Smallest unique payload of any 90-line file; 30 of 68 lines shared with another agent |
| 5 | `agents/review-readability.md` `review-reliability.md` `review-resilience.md` `review-observability.md` `security-reviewer.md` | Five files with identical 13-line skeleton + identical `Blockers/Suggestions/Nits` scaffolding |
| 6 | `agents/quality-assurance.md` | 67% boilerplate, and the QA checklist it points at (`engineering/quality-assurance-review.md`) repeats the same 3-tier structure a 6th time |
| 7 | `agents/engineering-specialist.md` (48 L) | The **outlier** — the only agent with *no* persona template (0% of the 9 boilerplate headings), only 5 custom sections. Evidence the template is optional. |

### 3.5 Rules-layer verbosity

- Every one of 15 `rules/*.md` files duplicates the same 5-line YAML block (`---`, `trigger:`, `description:`, `globs:`, `---`) — 75 lines of `rules/`'s 395 (19%) is frontmatter, and it is injected verbatim.
- `rules/XD.md:2` triggers on `model_decision` — yet `rules/Frame-ship.md:16` forbids the model from deciding when to load guardrails. Trigger semantics contradict load semantics.
- `rules/ENG.md` (44 lines, 36 rules) is the densest; `rules/DOCS.md` (14 lines, 6 rules) the sparsest — no size policy.

---

## 4. CONSISTENCY GAPS

### 4.1 Frontmatter: `name:` casing — 3 conventions in 32 files

| Convention | Files | Example |
|---|---|---|
| Title Case ("Role Reviewer" / "Role Specialist") | 22 | `name: Automation Reviewer` |
| Bare person surname | 9 | `name: Vasquez`, `name: Barrera` |
| **kebab-case** | **1** | `agents/engineering-specialist.md:2` → `name: engineering-specialist` |

Inconsistent suffixes within the same population:
- `Quality Assurance` (no noun) — `agents/quality-assurance.md:2`
- `Data Reviewer` — `agents/review-data.md:2` (file says `review-data`)
- `Refuter Reviewer` — `agents/review-refuter.md:2`

`name:` never equals the id used by the routing table, the reference filenames, or `AGENTS.md`.

### 4.2 Missing / inconsistent frontmatter keys

**Complete key matrix (32 files):**

| Key | Count | Missing from |
|---|---|---|
| `name` | 32 | — |
| `description` | **32** | — *(no agent lacks a description)* |
| `tools` | 32 | — |
| `vibe` | 31 | `agents/engineering-specialist.md` |
| `emoji` | 31 | `agents/engineering-specialist.md` |
| `color` | 31 | `agents/engineering-specialist.md` |
| `subagent` | **23** | **8 persona owners:** `barrera`, `dauhajre`, `espinoza`, `montero`, `santana`, `subero`, `vasquez`, `vera` |
| `effort` | **23** | **same 8 persona owners** |
| `mainAgent` | **1** | only `agents/montilla.md` |

**Consequence (semantic, not cosmetic):** `.opencode/plugins/agents.ts:92-99`

```ts
function toOpenCodeMode(mainAgent, subagent) {
  if (mainAgent && subagent) return "all";
  if (mainAgent) return "primary";
  return "subagent";      // ← the 8 owners fall through here
}
```

The 8 domain owners (CTO, CISO, CFO, CLO, CMO, CHRO, CRO, COO) — the agents the skills call "domain owners" and "gate keepers" — carry `tools: [invoke_subagent, manage_subagents, send_message, …]` but are registered as **`mode: subagent`** and `hidden: mode !== "primary"` (`agents.ts:187`) → **hidden**, un-dispatchable as primary entry points. Only Montilla is reachable. Whether intentional or not, it is undeclared by any doc and invisible from the frontmatter.

**Tool-name vocabulary is unvalidated:** `agents/*.md` `tools:` entries are free-form strings (`view_file`, `run_command`, `read_url_content`, `ask_question`, `grep_search`) never checked against `toOpenCodePermissions` (`agents.ts:101-120`). `read_url_content` appears in 3 files; `agents/review-observability.md` etc. use `find_by_name`. Any typo silently degrades to `deny` (`effect: has(...) ? "allow" : "deny"`).

### 4.3 Broken path references (12 confirmed)

| Cited path | Cited in | Reality |
|---|---|---|
| `rules/guardrails.md` | `scripts/context-inject.ts:90`, `.opencode/README.md:12`, `.opencode/README.md:154`, `README.md:95` | **does not exist** (rules/ has 15 files, none named guardrails.md) |
| `rules/frame-ship.md` (lowercase f) | `scripts/context-inject.ts:7,12`, `agents/engineering-specialist.md:41`, `skills/ship-release/references/documentation-checklist.md:17,31`, `README.md:95,97` | actual file is **`rules/Frame-ship.md`** (capital F) — case-mismatched on a case-sensitive FS |
| `../AGENTS.md` (from `skills/*/`) | `skills/quality-gate/SKILL.md:51`, `skills/frame-intent/SKILL.md:39` | resolves to **`skills/AGENTS.md`** — does not exist (root `AGENTS.md` is 1 level up) |
| `skills/AGENTS.md` | `skills/using-frame-ship/references/bootstrap-checklist.md:29` | does not exist |
| `node scripts/bump-version.mjs` | `skills/ship-release/SKILL.md:29`, `skills/ship-release/references/documentation-checklist.md:16,27,45` | **`scripts/` contains only `context-inject.ts`** |
| `frame-ship:pull-request` | `skills/execute-spec/SKILL.md:18`, (also `frame-ship.ts` chain comments) | **no such skill** |
| `frame-ship:debugging` | `skills/quality-gate/SKILL.md:17` | **no such skill** |
| `../commands/*.md` | `.opencode/plugins/commands.ts:3` (header) | commands.ts actually reads `{root}/commands` — reference is stale |
| `./plugins/opencode/INSTALL.md` | `README.md:66` | does not exist; the dir is `.opencode/`, not `plugins/opencode/` |
| `main: ./plugins/opencode/frame-ship.ts` | `.opencode/README.md:23` | `package.json:5` says `./.opencode/plugins/frame-ship.ts` |
| `hooks/session-start` | `.gitattributes:3` | `hooks/` holds only `.gitkeep` |
| `§6` (People↔Security enforcement) | `.opencode/plugins/guardrails.ts:81` | no `§6` exists in the guardrails body |

**Dangling rule IDs:** `OPS-11` (cited in `skills/quality-gate/references/engineering/observability-review.md:17`), `KR-1`, `KR-2` (cited in `skills/frame-intent/references/okr-template.md:12,18`) — no `rules/OPS.md`, and `KR-*` are OKR keys masquerading as rule IDs.

### 4.4 Plugin id / version / count drift

| Claim | Source | Reality |
|---|---|---|
| `frame-ship-agents` | `agents.ts:2` (header), `README.md:164`, `.opencode/README.md:11,118,127` | `agents.ts:139` → **`id: "frame-ship-agent"`** (singular) |
| `frame-ship` | `skills.ts:2` (header), `.opencode/README.md:10` | `skills.ts:186` → **`id: "frame-ship-skills"`** |
| "three independent plugins plus a shared module" | `.opencode/README.md:6`, `README.md:164` | **five** plugin files (`frame-ship`, `skills`, `agents`, `guardrails`, `commands`) + `lib/shared.ts` |
| "5 files: frame-ship/skills/agents/guardrails/shared" | `.opencode/README.md:155` | **6** — `commands.ts` omitted |
| "all **three** lanes under one id" | `.opencode/README.md:43,72,120,159`, `frame-ship.ts:2-12` | `frame-ship.ts:26-29` runs **four** lanes (skills + agents + guardrails + **commands**) |
| "31-agent provisioning" | `.opencode/README.md:11` | **32** agent files |
| "never list this file with any of them (duplicate id `frame-ship` with `./skills.ts`)" | `frame-ship.ts:11-12` | stale — `skills.ts` id is now `frame-ship-skills`; the duplicate-id hazard no longer exists and the warning hides the real duplicate (`guardrails.ts` vs `frame-ship.ts` both `frame-ship…`) |
| `VERSION = "0.12.0"` | `.opencode/lib/shared.ts:14`, `README.md:63` (`[frame-ship v0.12.0]`) | every manifest says **`"version": "1.0.0"`** (`package.json:3`, `plugin.json:4`, `gemini-extension.json:4`, `.claude-plugin/plugin.json:5`, `.claude-plugin/marketplace.json:12`, `.antigravity-plugin/plugin.json:6`) — **2-major drift**, and `skills/quality-gate/SKILL.md` `bump-version.mjs` (which would catch it) does not exist |
| Marker `[frame-ship-guardrails v0.12.0]` | `.opencode/plugins/guardrails.ts:22` | marker in `.pi/extensions/frame-ship-guardrails.ts:5` is **unversioned** `[frame-ship-guardrails]` |
| License: `Apache-2.0` | `plugin.json:9`, `.claude-plugin/plugin.json:18`, `.antigravity-plugin/plugin.json:19` | `package.json:8` → **`MIT`**; `LICENSE:1` → **MIT** |
| Node 22 LTS | `README.md:64` | `mise.toml:5` → **24.22.1**; `.opencode/README.md:5` → "Node 24 LTS"; `ci.yml:26` → `24.22.1` |

### 4.5 Rules frontmatter defects

| File | Line | Defect |
|---|---|---|
| `rules/REV.md` | 2 | **`triger: model_decision`** — misspelled key, no `trigger:` at all |
| `rules/DOCS.md` | 3 | `"Apple this guideline for Docs rules"` — typo `Apple` for `Apply` |
| `rules/SEC.md` | 3 | `"Apply this guideliones for Security rules"` — typo `guideliones` |
| `rules/TST.md` | 7 | No `#` H1 — the only rule file with `## Testing Rules` as its top heading |
| `rules/*.md` | 2-4 | 14 files say `"Apply this guidelines for …"` (grammatically wrong) — 14× repeated |
| `rules/*.md` | 4 | `globs:` empty in all 15 files — the scoping mechanism is declared but never used |

### 4.6 Skills frontmatter

All 11 `SKILL.md` are **consistent** on `name:` + `description:` (2 keys, no extras) — and `README.md:198` states this rule explicitly ("`name: <kebab==dir>`, one-sentence `description`, no extra keys"). Verified: 11/11 compliant, all `name` == directory name. **This is the one clean frontmatter contract in the repo** — and it is the contract `agents/` and `rules/` do not follow.

The inconsistency is in the *body* contract: `README.md:198` prescribes `Purpose / Chain / Role / Process / Won't do / References`, but only `skills/quality-gate/SKILL.md` has a `## What I Won't Do` and a `## References` section; the other 10 use `## Overview` + `## Chain Contract` + `## Role Binding` + `## Process` and no `References` section.

### 4.7 Governance gaps

- **`.github/workflows/ci.yml`** — both jobs (`typecheck`, `test`) have every substantive step commented out (L17-18, L27-28). CI is green because it does nothing. This directly contradicts `rules/TST.md` TST-07 ("Blocking verify, no silent pass… no step completes on red **or unrun** suite") and `rules/AUT.md` AUT-05.
- **No `tests/` directory** — `rules/TST.md:10-17` mandates `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/contract/`, `tests/architecture/`, `tests/security/`, `tests/performance/`. None exist.
- **`mise.toml` has zero `[tasks]`**, yet `mise run typecheck` / `mise run install` are cited in 9 places.
- **`.omp/`** — 4,714 lines of agent definitions, untracked, in no manifest, matched by no `.gitignore` rule.
- **`.pi/README.md`** — 0 bytes, referenced by `package.json`'s `pi` block indirectly (as a package doc).
- **`hooks/`** — empty directory kept alive by `.gitkeep`, while `hooks.json` points at `scripts/`.
- **`.gitattributes:3`** — declares `hooks/session-start` for LF normalization; that file has never existed.
- **`agents/montilla.md:60`** — requires "the 8-domain table (R1–R8)"; no `R`-labelled table exists.
- **`.copilotignore`** — 65 lines of Copilot excludes for a repo with no Copilot integration in any manifest.

---

## 5. Top 5 findings

1. **The rules layer exists in three divergent versions.** `rules/**` (395 lines, 235 rule IDs, read at runtime by `guardrails.ts:117-141`) is duplicated by `.opencode/plugins/guardrails.ts:27-85` (**38 of 39 lines restate `rules/GEN.md`/`PRV.md`/`XD.md` at ≥40% token overlap, most at 100%**) and again by `.pi/extensions/frame-ship-guardrails.ts:7-24` (**13 of 14 lines**). Both fallbacks strip every rule ID and both are stale (the OpenCode copy stops at `XD-14` and cites a nonexistent `§6`; the Pi copy keeps 4 of 23 `XD-*` interfaces). Meanwhile `guardrails.ts:131-134` injects all 15 rule files *including their YAML frontmatter*, ignoring `trigger:` — 34,041 chars on every turn, ~1,747 of them pure duplication.

2. **The chain and the load order reach the model 5× per session, in 6 different textual variants.** `rules/Frame-ship.md:12`, `.opencode/plugins/skills.ts:23-24` (interpolated at L27, L32, L34), and `scripts/context-inject.ts:26-27,30` hold three hardcoded copies of the identical string; `README.md:123`, `skills/using-frame-ship/SKILL.md:20`, and `bootstrap-checklist.md:8` hold three *divergent* ones (one prefixes `using-frame-ship`, one `[research]`, one collapses to `review-*`). The trigger→skill table is likewise duplicated between `rules/Frame-ship.md:23-32` and `skills.ts:29`, arriving twice in the same prompt.

3. **`AGENTS.md` — self-declared "canonical truth" — is materially wrong about its own roster.** It lists 15 agents while 32 exist; it names `marketing-reviewer`, which has no file; it maps 6 reviewers to skills (`brand-audit`, `finance-audit`, `legal-audit`, `mkt-audit`, `people-audit`, `rev-audit`) that do not exist; it omits 18 files including all 9 named personas and all 8 `review-*`; and it contains **no domain table** even though `skills/quality-gate/SKILL.md:51` and `skills/frame-intent/SKILL.md:39` both send the reader to `../AGENTS.md` for one (a path that resolves to the nonexistent `skills/AGENTS.md`). The persona layer is a closed loop: the 9 owners are referenced *only* from other `agents/` files, and every skill speaks in abstract "engineering owner"/"security owner"/"orchestrator" terms that bind to no persona anywhere.

4. **68% of `agents/` is one 11-section template.** 24 of 32 files instantiate the identical heading skeleton (66-71% of lines are boilerplate); the creed line appears verbatim in 24 files; the tool list is 100% duplicated across 32; the 8 domain reviewers are a fill-in-the-blank form whose Communication bullets differ by one noun; and `review-readability.md` vs `security-reviewer.md` differ in only 8 hunks. Most redundant: `security-specialist.md` (71%), `automation-specialist.md` (70%), `barrera.md` (69%), `legal-reviewer.md` (only 56% unique — lowest in the repo). The lone outlier is `engineering-specialist.md` at 0% boilerplate — proof the template is optional, not intrinsic.

5. **Three incompatible verdict vocabularies plus 12 broken path references and 2-major version drift.** Reviewers are told to emit `APPROVE / CONDITIONAL / CLOSED` (8 agents), their templates' header field reads `pass | conditional | fail` (16 checklists), and the review lanes use `Approved | Conditional | Rejected` (4 files). `rules/TST.md` mandates a 7-directory `tests/` tree; no `tests/` exists and every CI step is commented out. `VERSION = "0.12.0"` vs `"version": "1.0.0"` in all six manifests, while the script that would catch it (`scripts/bump-version.mjs`, cited 4×) does not exist; license is MIT in `LICENSE`/`package.json` but Apache-2.0 in three plugin manifests. Plugin ids are documented as `frame-ship-agents`/`frame-ship` but coded as `frame-ship-agent`/`frame-ship-skills`, and "three lanes" is actually four.

---

*Inventory produced read-only. Only this file was created.*
