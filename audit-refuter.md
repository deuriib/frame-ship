# Adversarial Audit — Simplification/Alignment Plan for `frame-ship` → `agency-agents`

**Reviewer role:** Refuter (adversarial reasoning / assumption testing)
**Scope:** P-A (roster replacement), P-B (NEXUS runbooks replace the 9-stage chain), P-C (rule dedup), P-D (frame-ship becomes a thin adapter)
**Method:** read-only inspection of both repositories, plus executed verification of the parser and permission-mapping code paths
**Repos examined:** `/home/deuriib/projects/frame-ship` (`31` commits, last `2026-10-31`) and `/home/deuriib/projects/agency-agents` (`936` commits, `v1.13.0`, last `2026-11-12`)
**Rule:** every objection below cites a file, a count, or an executed result. A finding without proof is REFUTED (`GEN-10`).

---

## 0. Verdict at a glance

| # | Proposal | Verdict | One-line reason |
|---|---|---|---|
| **P-A1** | Drop fused specialists for agency-agents' granular engineering roles | **SUPPORT-WITH-CONDITIONS** | Granular counterparts genuinely exist, but the transfer silently strips every tool permission |
| **P-A2** | Drop the 9 named personas | **OPPOSE** | Zero counterparts upstream; they are the only carriers of the creed, Ley 172-13, and single-dispatcher authority |
| **P-B** | Replace the fixed chain with NEXUS scenario routing | **OPPOSE** | Runbooks are *downstream consumers* of the brief/spec chain and their `NEXUS-Micro` mode re-introduces the exact min-gate frame-ship forbids |
| **P-C** | Deduplicate rules into one source of truth | **OPPOSE** | The premise is false: there is no rule layer in `agency-agents` to deduplicate *into* |
| **P-D** | Make frame-ship a thin adapter over the agency roster+strategy | **SUPPORT-WITH-CONDITIONS** | Direction is real and already half-built, but the current attempt is broken and unwired, and two adapters already ship |

**Headline:** the plan is directionally reasonable on exactly one axis (P-A1) and its most attractive axis (P-D) is a narrower, better-specified version of work already attempted. But **P-C is built on a false premise** and **P-B would restore a failure mode the existing design explicitly outlaws**. Executed as written, the plan deletes the three things that make frame-ship distinct and leaves a wrapper around a project that already ships its own renderers for ~20 tools.

---

## 1. Evidence base (measured, not asserted)

I refuse to argue from the abstract. These are the numbers the rest of the document rests on.

### 1.1 Corpus size and shape

| Surface | frame-ship | agency-agents | Ratio |
|---|---|---|---|
| Agent files (frontmatter `name:`) | **32** | **299** | 9.3× |
| Agent bytes / approx. tokens | 152,208 B / ~38k | 4,337,383 B / **~1.08M** | 28× |
| Avg agent size | 4,756 B | 14,506 B | 3× |
| Scenario runbooks | 0 (fixed chain) | **42** / 808,502 B / **~225k tokens** | — |
| Phase playbooks | 0 | 7 / 61,429 B | — |
| Doctrine file | `rules/Frame-ship.md` (1,962 B) | `strategy/nexus-strategy.md` (**55,289 B**) | 28× |
| Stage skills | **11** skill dirs / 130,030 B | 0 | — |
| Domain rule files | **15** / 34,271 B | **0** | — |
| Runtime plugin LOC (TS) | **1,065** across 4 lanes | 0 (Python CLI, ~145 KB `core/` + `infrastructure/`) | — |

Two count corrections against the task framing, because they change the scoping: the roster is **32** agents, not 30; there are **9** named personas (Barrera, Dauhajre, Espinoza, Montero, Montilla, Santana, Subero, Vasquez, Vera), not 10; there are **11** stage skills, not 12; and there are **42** runbooks, not 47 (`strategy/runbooks.json` and `strategy/runbooks/` both enumerate 42 — the `find` count of 84 is the same 42 files duplicated into the packaged `data/` tree).

### 1.2 The executed interop test (the single most important finding)

`frame-ship/.opencode/plugins/agents.ts` parses agent tool grants with a **block-list-only** regex and then derives OpenCode permissions from the parsed list:

```ts
const toolsBlock = frontmatter.match(
  /^\s*tools\s*:\s*(?:\r?\n|$)((?:\s*-\s*.*(?:\r?\n|$))*)/m,
);
```

I executed that exact regex and the exact `toOpenCodePermissions` mapping from the file:

| Frontmatter form | Parsed tools | Resulting permissions |
|---|---|---|
| frame-ship block list (`tools:` newline `- view_file`) | `[view_file, list_dir, write_to_file]` | read allow, edit allow, subagent allow |
| **converter flow list** (`tools: [view_file, list_dir, write_to_file]`) | **`[]`** | **read DENY, edit DENY, shell DENY, subagent DENY** (only `skill` allow) |
| no `tools` field at all | **`[]`** | **identical total deny** |

And `agency-agents/src/agency_agents/core/models.py` `AgentFrontmatter.to_yaml()` renders list-valued extras as a **flow list** (`f"[{', '.join(map(str, v))}]"`). So any agency-side render round-trip produces the deny-everything form.

This is not hypothetical. It is a **silent, non-throwing degradation**: the agent still loads, still shows a name and description, still answers — it simply cannot read a file, cannot edit, and cannot delegate. You would discover it as "the agents got dumber," weeks later.

### 1.3 Frontmatter compatibility matrix

| Field the frame-ship runtime needs | frame-ship | agency-agents |
|---|---|---|
| `tools:` (drives all permissions) | **32 / 32** | **17 / 299** (5.7%) |
| `subagent: true` | 23 / 32 | **0 / 299** |
| `mainAgent: true` | 0 / 32 | **0 / 299** |
| `effort:` | present on reviewers/QA | **0 / 299** |
| `vibe:` (agency-only, ignored downstream) | — | 299 / 299 |

The 17 that do carry `tools:` are concentrated in `product/`, `paid-media/`, and `marketing/` — i.e. **not** the engineering agents P-A1 wants to adopt. `engineering/`, `security/`, `testing/`, and `specialized/` carry none.

### 1.4 Real content overlap (is P-A's premise even true?)

Normalizing bodies (frontmatter stripped, whitespace collapsed) and matching against the 299 agent corpus:

- **7 of 32** frame-ship agents have a near-identical upstream twin: `review-observability`, `review-readability`, `review-refuter`, `review-reliability`, `review-resilience`, `review-risk`, `security-reviewer`.
- **25 of 32** have **no upstream twin at all** — including every domain specialist, every domain reviewer except security, and all 9 named personas.

So frame-ship's roster is not a redundant copy of the agency roster. It is a **small, mostly-original roster plus 7 vendored reviewers**, with runtime frontmatter bolted on. P-A as framed ("replace fused specialists with the granular roster") describes a swap that covers at most 7 files and would delete 25.

### 1.5 Name collisions: 2, and one is a loaded gun

- `security-reviewer`: frame-ship `agents/security-reviewer.md` vs agency `engineering/engineering-review-security.md` — **body-identical siblings**, so this is a benign-but-real duplicate.
- `vasquez`: **not a duplicate — an incompatible homonym.**

| | frame-ship `agents/vasquez.md` | agency `specialized/vasquez.md` |
|---|---|---|
| Identity | **Engineering Owner (CTO)** | **Agency-Flow process steward** |
| Mandate | Owns SPEC → ADR → review wave → DoD | Enforces two-gate model; **never** signs a domain gate; never leads a domain |
| Authority | Dispatches `engineering-specialist`, blocks release | Explicitly forbidden from producing domain artifacts |
| Explicitly declared primary? | no | **yes** — `PRIMARY_AGENT_SLUGS = frozenset({"agents-orchestrator", "vasquez"})` (`core/converter.py:64`) |

A naive roster merge collapses these two into one slug. The result is either an engineering owner who refuses to sign engineering verdicts, or a process steward who starts writing architecture. Both are worse than either original.

### 1.6 The two repos already overlap harder than P-C admits

`frame-ship/.omp/agents/` contains **15 agency-agents agents** (`agents-orchestrator`, `engineering-backend-architect`, `engineering-frontend-developer`, `engineering-devops-automator`, `testing-reality-checker`, `testing-evidence-collector`, …), transformed (display name replaced by slug, `color`/`emoji`/`vibe` stripped). That directory is referenced by **no manifest** — not `package.json`, not `plugin.json`, not `.claude-plugin/plugin.json`, not the pi/opencode plugin code. It is a **dead fourth roster**.

And `agents-orchestrator.md:61` carries a runtime path dependency the loader cannot satisfy:

> "Read from `strategy/` in the agency-agents checkout. If it is absent, use the installed copy at `~/.agency-agents/strategy/`."

Neither path is guaranteed to exist in a `pi`/`opencode` install of frame-ship. This is P-D already attempted, and already broken.

### 1.7 Duplication inside the proposed "source of truth"

`agency-agents` maintains **354 `.md` files byte-identical in two locations** (`<division>/` at repo root and `src/agency_agents/data/<division>/`). I verified this by hashing every file: **0 files only-in-root, 0 only-in-bundled, 0 content drift.** It is held together by `scripts/sync_catalog_data.py --check`, wired into `scripts/gate.sh:78` as the `catalog-sync` gate.

That is a defensible engineering choice — but it is the exact pattern P-C proposes to eliminate. Proposing that a repo with a two-copy corpus should become the *single* source of truth for a third repo's rules is a claim that needs an argument, not an assumption.

### 1.8 What the two design philosophies actually guarantee

| Guarantee | frame-ship | agency-agents |
|---|---|---|
| Creed ("Haces las cosas como para Dios…") | **34 files** | **0 files** |
| Dominican data-protection law (Ley 172-13) | **23 files** | **0 files** |
| Spanish-language warmth/consent contract (`exit/salir`, `ronda de desafío`, masking per `Ley 172-13`) | **3 files** (`references/challenge-round.md` + 2 stage SKILLs) | **0 files** |
| Enforced CI gate on the harness itself | **disabled** (`.github/workflows/ci.yml` — `npm ci`, `typecheck`, `test` all commented out) | active (`ci.yml`, `quality.yml`, `gate.sh`, `release.yml`, CodeQL) |

The asymmetry in 1.8 runs in both directions and both directions matter: agency-agents is the *better-governed repo*; frame-ship is the *only* one carrying the values layer. That is precisely why "pick one source of truth" cannot be resolved by repository size or commit count.

---

## 2. P-A — Replace fused specialists + named personas with the granular roster

### 2.1 Core claim under test

> *agency-agents' role-based roster is a strict superset in capability and quality; frame-ship's fused specialists and named personas are redundant.*

### 2.2 Strongest counter-arguments

**Counter-argument 1 (P-A1, the specialists): the replacement is mechanically lossy and fails silently.**

This change assumes **X**: *that an agent file which renders correctly in `agency-agents` will render correctly in `frame-ship`.*

If **X** is false, then **Y**: *every adopted agent gets `read=deny, edit=deny, shell=deny, subagent=deny` and still appears healthy.*

Here is evidence that **X** is false — §1.2, executed: the flow-list form the agency converter emits (`models.py` `to_yaml`) parses to `[]` in the frame-ship parser, and `toOpenCodePermissions([])` denies all four capability classes. §1.3 shows the source corpus supplies `tools:` on only **17 of 299** files, and **0 of 299** supply `subagent: true` — so a raw copy fails the same way the flow-list copy does.

The failure mode is what makes this a *strong* refutation rather than a nuisance: it does not throw, does not warn, does not fail a type check, and does not surface until an agent silently fails to do work. There is no CI in frame-ship to catch it (§1.8 — the workflow's steps are commented out).

**Counter-argument 2 (P-A2, the personas): the swap is a net capability *loss* dressed as deduplication.**

This change assumes **Y**: *that agency-agents contains equivalent substitutes for the 9 named personas.*

If **Y** is false, then **Z**: *the framework loses its only enforcement carriers for the creed, jurisdictional privacy law, and dispatch authority — and gains nothing, because the substitutes in question are not gates.*

Evidence that **Y** is false:

- The creed appears in **34** frame-ship files and **0** agency files (§1.8).
- Ley 172-13 appears in **23** frame-ship files and **0** agency files. `agents/subero.md` is the named owner of "data privacy legislation (Ley 172-13, GDPR)"; `agents/barrera.md` protects privacy under the same law; the privacy review bar in `skills/using-frame-ship/references/challenge-round.md` §3 is written *against* that statute. agency-agents' nearest analogue is `specialized/data-privacy-officer.md`, whose regime framing is US-centric (there is also `specialized-fedramp-rmf-compliance.md`) — a different legal question with different obligations.
- `agents/montilla.md` is declared "**the CEO and sole dispatcher** of the Frame→Ship framework … the only agent authorized to dispatch to the 8 Domain Owners (**ADR-003, INV-012**)". `agents/santana.md` is "the guardian of the Creed, Active Mentorship, and Dominican Human Warmth." agency-agents has `specialized/agents-orchestrator.md`, which is **also** a sole pipeline controller ("Make progression decisions yourself"). Two sole dispatchers is not a deduplication; it is a constitutional collision.

### 2.3 Hidden assumptions

1. **"Fused is worse than granular."** Unstated and unmeasured. `engineering-specialist.md` is 3.5 KB against 4 granular agents averaging 14.5 KB — the granular form costs ~4× the context to deliver the same remit, and requires 4 dispatches where 1 sufficed. Fusing may be a deliberate context-budget decision, not sloppiness. The plan never tests this.
2. **"Agent identity is a name."** False in this codebase: identity is `(slug, mode, permissions, system)`, and `mode`/`permissions` are *derived from frontmatter the upstream corpus does not carry*.
3. **"The 9 personas are vanity."** Contradicted by `ADR-003`/`INV-012` being cited as the authority model for dispatch — and by the fact that `challenge-round.md` assigns *tone and masking* ownership to specific personas (people owner for tone/masking, security owner for the waiver bar, engineering owner for budgets).
4. **"Vasquez means the same thing in both repos."** False — §1.5, opposite mandates, and upstream has it hardcoded as a primary agent in `converter.py`.
5. **"We can adopt the roster without adopting its orchestrator."** Not supported by the artifacts: `validator.py:24` sets `RUNBOOK_REQUIRED_AGENT = "agents-orchestrator"` and `validator.py:202` **fails the build** for any runbook that does not roster it. Roster and orchestration are coupled by a lint gate.

### 2.4 Failure of success

If P-A works perfectly and the granular roster is adopted, frame-ship's `quality-gate` routing table ("1 subagent per reviewer, bundled reviews prohibited") now addresses 299 candidate agents whose division membership is `agency-agents`' 18 divisions, not frame-ship's 8-domain catalogue. The routing table becomes a lookup over a foreign namespace with 2 known homonyms and 282 permission-less members. The gate does not get simpler; it gets *less determinable*.

### 2.5 Verdict

- **P-A1: SUPPORT-WITH-CONDITIONS.** Granular engineering roles are a legitimate dispatch target and the direction is defensible.
- **P-A2: OPPOSE.**

### 2.6 Minimal change that would make it safe

For **P-A1**, adopt as *additive vendoring*, never replacement:

1. Vendor into a namespaced path (`agents/external/<slug>.md`) so `resolveRepoDir(base, "agents")` keeps working and nothing collides by accident.
2. Ship a **render step** that emits, per adopted agent: block-list `tools:`, `subagent: true`, `effort:`, and an explicit `id`. Treat the agency file as *input*, frame-ship's file as *build output* — and commit the output so runtime never depends on the converter being run.
3. Extend the parser to **fail loudly** on an unexpected `tools` shape (a `tools: [` match that does not parse must throw, not yield `[]`). This single guard converts the §1.2 silent failure into a startup error.
4. Keep all 25 agents that have no twin. Re-check the twin set per release; the 7 duplicates can be regenerated, the other 25 cannot.

For **P-A2**, the persona layer stays. If the objection is that 9 named personas are too many, the safe move is *consolidation with an explicit gate-owner mapping* (one persona can own two gates), not deletion — because the creed, Ley 172-13, and single-dispatcher authority have no upstream home.

---

## 3. P-B — Replace the fixed linear chain with NEXUS scenario routing

### 3.1 Core claim under test

> *A fixed 9-stage chain is over-rigid; scenario routing picks the applicable subset, which is cheaper and better fitted.*

### 3.2 Strongest counter-arguments

**Counter-argument 1: runbooks are *downstream* of the chain, not a substitute for it.**

This change assumes **X**: *a NEXUS runbook covers the same work as the 9-stage chain.*

If **X** is false, then **Y**: *adopting routing deletes the artifact-producing stages and the runbooks then block on inputs nothing produces.*

Evidence that **X** is false, from `strategy/runbooks/scenario-enterprise-feature.md` itself — its "Required Inputs" table's first row:

> "**The approved spec, with the acceptance criteria it was approved against** — *A feature approved against a paragraph cannot be graded…* | Product owner with Senior Project Manager"

That is `translate-to-spec`'s output. The runbook **consumes** it. The same table demands "the named stakeholder approvers" and "the compliance regime … with the named human who answers for it" — governance artifacts the runbook explicitly refuses to produce ("Registries and policies are input, not output").

Measured: across all 42 runbooks, `BRIEF` appears in 1, `REQ` in 2, `ADR` in 1, and `HANDOFF`, `PROPOSED_CHANGES`, `STRIDE` in **0**. The runbook set does not produce this repo's chain artifacts; it presumes them.

**Counter-argument 2: `NEXUS-Micro` re-introduces the exact failure the chain forbids.**

This change assumes **Z**: *reducing process for small work is safe.*

Here is the direct contradiction, quoted from both sides:

- `agency-agents/strategy/nexus-strategy.md:126`: `NEXUS-Micro | 5-10 [agents] | Bug fix, content campaign, single deliverable | 1-5 days`
- 20 of the 42 runbooks are `NEXUS-Micro` (9–10 agents) — including `incident-response`, `bug-triage-and-defect-elimination`, `release-train`, `accessibility-remediation-sprint`.
- `frame-ship/skills/quality-gate/SKILL.md`: *"full wave per routing table + adversarial `review-refuter` before `quality-assurance` (**full-wave único, no min-gate**). Sequential degradation, same contract: same packet, same reviewers, same full-wave gate. **No min-gate, no silent downgrade.**"*
- `frame-ship/skills/using-frame-ship/SKILL.md`: same prohibition, repeated.
- `frame-ship` even names this in its Red Flags table: *"'This is too small for a stage skill' → Trivial (<15 lines, reversible) is CEO fast-path only—outside the chain."*

So P-B's own routing vocabulary contains a mode that frame-ship's doctrine explicitly outlaws. Adopting runbooks does not "right-size rigor"; for 20 of 42 scenarios it imports a permitted downgrade path. That is not a simplification — it is the removal of a control, which `DENY-04` forbids.

### 3.3 Hidden assumptions

1. **"Selection is cheap and correct."** Unstated. There is no selector contract in the runbook set: `runbooks.json` carries `slug`, `mode`, `duration`, `summary`, but selection authority lives inside a *prose persona* (`agents-orchestrator.md`: "Discover, don't recall"). Mis-routing is a new failure class with no gate. The applicability tables help — but they route among 42 options whose relevance to a code-only repo is uneven: ~22 are software/delivery, ~20 are not (`clinical-evidence-review`, `gis-program-launch`, `game-launch`, `post-merger-integration`, `monthly-close-and-financial-reporting`, `spatial-app-launch`…). "Pick 1 of 42" is really "pick 1 of ~6" plus 36 rejection decisions.
2. **"The chain's linearity is the defect."** Look at what linearity buys: `translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release` is **deterministic**, which is why `verify-handoff` can demand `HANDOFF.md` and `quality-gate` can demand one subagent per reviewer. Runbooks are timeline-shaped (weeks, G1/G2/G3), not artifact-shaped. They optimize for a human project calendar; the chain optimizes for an auditable artifact trail. These are different products.
3. **"Runbooks are cheap to load."** They are not: 808,502 bytes ≈ **225k tokens** for the set; the mean runbook is ~5.4k tokens and the largest (`contract-and-legal-intake`) is 36 KB. Plus `nexus-strategy.md` at 55 KB. Whichever runbook is "always-on" is 10-40× the cost of the current workflow card. If none is always-on, selection requires reading summaries — a retrieval problem the plan does not address.
4. **"You can adopt routing without adopting the orchestrator."** Blocked by lint (§2.3 item 5): `RUNBOOK_REQUIRED_AGENT = "agents-orchestrator"`.

### 3.4 Failure of success

If P-B succeeds, every repo interaction acquires a *mode* (Micro/Sprint/Full) chosen by a *foreign orchestrator*, and frame-ship's `Montilla = sole dispatcher` invariant is void. The methodology no longer has one authority. Every gate verdict now has two possible owners, and `XD-12` ("Critical/High → same-session notification, owner assigned") can no longer name a single owner deterministically.

### 3.5 Verdict

**OPPOSE** as stated (replace).

There is a genuinely good idea buried here, and I want to name it so this does not read as reflexive rejection: *frame-ship's 8-domain routing could borrow runbooks' applicability tables as a domain-selection aid* — which domains a change touches. That is additive, keeps the chain, keeps one dispatcher, and keeps `no min-gate`.

### 3.6 Minimal change that would make it safe

1. **Do not replace the chain.** Add a `research`-style optional stage ("scenario profile") that *classifies* the work and annotates the spec's `Domains-touched` field. The chain stays; only its inputs get sharper.
2. **If runbooks are adopted at all, ban `NEXUS-Micro`** for anything that produces a shipped artifact, and record that ban as an explicit override in `quality-gate`. Without this, `DENY-04` is violated by construction.
3. **Keep exactly one dispatcher.** Either `Montilla` keeps dispatch and `agents-orchestrator` becomes a non-dispatched consultant, or `agents-orchestrator` is not adopted. Two sole controllers cannot both be true.
4. **Budget the load cost explicitly.** Any always-on runbook must fit a stated token ceiling, or it is retrieved on demand with a selector contract that has its own test.

---

## 4. P-C — Deduplicate rules into one source of truth

### 4.1 Core claim under test

> *frame-ship's 15 domain rule files overlap with agency-agents' rule layer; pick one.*

### 4.2 Strongest counter-argument

**The premise is factually false: there is no rule layer in `agency-agents` to deduplicate into.**

This change assumes **X**: *both repos have a rule layer and the layers overlap.*

If **X** is false, then **Y**: *"deduplication" is one-directional deletion, and every reference to a rule ID dangles.*

Evidence that **X** is false:

- `ls -d agency-agents/rules` → **does not exist**.
- Rule IDs of the frame-ship scheme (`SEC-nn`, `ENG-nn`, `DENY-nn`, `PRV-nn`) appear in exactly **1** file across all of agency-agents (`docs/agency-flow/repo-standards-baseline/00-frame.md`), and that file is a repository-hardening checklist, not a rule layer.
- frame-ship's guardrails are not documentation — they are **injected into every session context at runtime**. `guardrails.ts` walks `rules/**/*.md` recursively on every context build, and `.pi/extensions/frame-ship-guardrails.ts` does the same in `before_agent_start`. `context-inject.ts` reads the same tree for the agy hook. Remove `rules/` and all three silently fall back to a hardcoded summary (`SHARED_GUARDRAILS` / `FALLBACK_GUARDRAILS`) — which is a *different, shorter text*. There is no error path that tells you guardrails got thinner.

The real numbers: **15 files, 34,271 bytes, ≈9.5k tokens injected per context build**, re-injected after compaction, behind a versioned marker with idempotency guards. That is a measurable, deliberate cost with a measurable, deliberate purpose. Deleting it "because it overlaps" deletes a control (`DENY-04`, `GEN-13`).

### 4.3 Hidden assumptions

1. **"Overlap exists."** Unverified in the plan. What I actually measured is asymmetry, not overlap: 34 frame-ship files carry the creed vs 0 upstream; 23 carry Ley 172-13 vs 0 (§1.8). Deduplicating asymmetric content is not deduplication.
2. **"Rules are inert text."** They are *load-bearing at runtime* in three independent code paths (opencode plugin, pi extension, agy hook) and are the fallback contract for the guardrails lane.
3. **"One repo should own everything."** Disproven by agency-agents' own architecture: it already owns its catalog twice (354 byte-identical files, §1.7) and gates the duplication with `sync_catalog_data.py --check`. A repo that tolerates a deliberate two-copy corpus is not a natural single source of truth for a third repo's *behavioral* rules.
4. **"Dedup shrinks maintenance."** It moves maintenance into a repo with **936 commits and `release-please` automation** against frame-ship's **31 commits**. Every upstream release becomes a frame-ship compatibility event — a real dependency, on a fast-moving project, for the layer that most needs to be stable.

### 4.4 Failure of success

If P-C succeeds, the rule layer lives in a Python package's data directory (or a repo root), versioned by someone else's release cadence, read by a TypeScript plugin over `importlib`-style resources. The day a `rules/SEC.md` change lands upstream for an unrelated reason, frame-ship's security gate changes behavior with no frame-ship commit and no frame-ship review — a supply-chain change to the *rules that govern the gates* (`SEC-16`, `AUT-07`).

### 4.5 Verdict

**OPPOSE.**

### 4.6 Minimal change that would make it safe

Invert the direction of the merge, and make ownership explicit rather than singular:

1. **Declare a boundary, not a dedup:** frame-ship owns **process/behavior rules** (`GEN`, `DENY`, `XD`, `SEC`, `PRV` — the gate-bearing ones, including Ley 172-13). agency-agents owns **role knowledge** (how a frontend developer works). These are different layers with different change cadences; the "overlap" is mostly vocabulary.
2. **If a shared layer is genuinely wanted**, publish it *from* frame-ship *to* agency-agents as an additive `rules/` directory — the direction that preserves the jurisdictional and creed content upstream rather than deleting it downstream.
3. **Whichever way it goes, add the missing control:** frame-ship's CI must actually run (`ci.yml` steps are commented out, §1.8). Governance changes with no gate is the one condition under which *any* of P-A…P-D becomes unrecoverable.

---

## 5. P-D — Make frame-ship a thin adapter over agency roster + strategy

### 5.1 Core claim under test

> *frame-ship should stop being a parallel methodology and become a harness: skills + plugin + context injection over agency-agents' roster and strategy.*

### 5.2 Strongest counter-arguments

**Counter-argument 1: this is already the architecture — and the existing attempt is broken and unwired.**

This change assumes **X**: *frame-ship is currently a parallel methodology that would need restructuring into an adapter.*

If **X** is false, then **Y**: *P-D spends effort re-deciding a decision already taken, without fixing the thing that actually failed.*

Evidence that **X** is largely false:

- frame-ship **is** a harness: 4 plugin lanes (`skills.ts`, `agents.ts`, `guardrails.ts`, `commands.ts`, composed in `frame-ship.ts`), 1,065 LOC, zero dependencies, 3 distribution manifests (`plugin.json`, `.claude-plugin/plugin.json`, `gemini-extension.json`) plus a `pi` package block and a PreInvocation hook. It already *is* "skills + plugin + context injection."
- It already vendors the agency roster: `.omp/agents/` holds **15** agency agents (§1.6) — which no manifest references, making it a **failed prior attempt at P-D** sitting in the tree.
- It already points at agency strategy: `agents-orchestrator.md:61` instructs reading `strategy/` from "the agency-agents checkout" or `~/.agency-agents/strategy/` — a path no installer guarantees.

So the accurate framing of P-D is *not* "restructure into an adapter." It is **"finish and repair an adapter that was started and abandoned."** That is a smaller, better-scoped, and materially different plan — and it should be written as such, because the difference determines the work.

**Counter-argument 2: "thin" is doing unexamined work — the thin part is the differentiator.**

If P-D succeeds fully (P-A + P-B + P-C + P-D), what remains of frame-ship is a loader plus `rules/` plus the chain. P-A2 deletes the personas, P-B replaces the chain's authority, P-C deletes `rules/`. The residue is a plugin that loads a roster `agency-agents` **already ships converters for** — the repo has `integrations/` with 21 tool adapters including `opencode`, `pi-agent`, `claude-code`, `cursor`, `codex`, `gemini-cli`, `antigravity`, `oh-my-pi`. After full execution, frame-ship duplicates one of those 21 adapters while having deleted the creed, the jurisdictional privacy bar, the warmth contract, and the single-dispatcher invariant that no other adapter provides.

**That is the plan's own failure-of-success condition:** the plan optimizes for "less duplication" and its terminal state is "a redundant adapter with none of the original value."

### 5.3 Hidden assumptions

1. **"Distribution models are compatible."** They are not equivalent. frame-ship is a **runtime plugin** (in-memory `ctx.agent.transform()`, `ctx.skill.transform()`, session context hooks, compaction hooks — never writes to disk). agency-agents is a **render-to-disk CLI** (`render`, `install`, `convert`, `update-manifest`; `PRIMARY_AGENT_SLUGS` is a *render policy*, not a frontmatter field). A harness over a renderer must own the render step, or it inherits stale files.
2. **"The roster is available at runtime."** `resolve_catalog_root()` tries `Path.cwd()`, then `resources.files("agency_agents.data")`, then `cwd`. The stashed `dist/agency_agents-1.4.0-py3-none-any.whl` contains **42 entries and 0 `.md` files** — a stale artifact, but concrete evidence that packaging the roster has been fragile. Whether the *current* wheel ships 299 agents is **unverified in this audit** (I did not run `uv build`, to honor read-only). This must be verified before any adapter depends on it.
3. **"Path plumbing is trivial."** `resolveRepoDir(base, leaf)` is hardcoded to `<root>/agents` and `<root>/skills` relative to the plugin's own `import.meta.url`. A foreign corpus in `<repo>/engineering/`, `<repo>/specialized/` needs either vendoring (then it drifts) or a new resolution contract (then it breaks `import.meta.url` install-anywhere behavior, which the code's own comment calls out as a deliberate design property).
4. **"Version skew is a non-issue."** Upstream ships `release-please` on every merge; frame-ship has 31 commits total. There is no pinning mechanism, no hash manifest, no compatibility matrix in the plan.
5. **"The reaction is free."** `RUNBOOK_REQUIRED_AGENT` couples P-D's strategy half to the orchestrator (§2.3 item 5), so "adapter over roster+strategy" quietly imports the dispatcher conflict from P-B.

### 5.4 Failure of success

If P-D succeeds, frame-ship's users get a loader whose behavior changes when someone else merges to a Python repo. Today they get a self-contained 152 KB roster and 34 KB of rules that change only when frame-ship changes.

### 5.5 Verdict

**SUPPORT-WITH-CONDITIONS** — but for a *reduced* P-D: **"repair and wire the existing adapter"** (roster consumption only), **not** "become a thin shell over roster+strategy+runbooks."

Note the coupling honestly: P-D's *roster* half is compatible with P-A1. P-D's *strategy* half is P-B by another name, and inherits P-B's OPPOSE.

### 5.6 Minimal change that would make it safe

1. **Scope P-D to roster only.** Strategy/runbooks out of scope (that is P-B, OPPOSE).
2. **Pin, hash, and verify.** Record upstream version + per-file SHA-256 in a `VENDOR.md`; a check script fails when the vendored set drifts from the pin. (agency-agents itself does this with `sync_catalog_data.py --check` — copy the pattern.)
3. **Own the render, commit the output.** Never parse upstream frontmatter at runtime. Emit frame-ship-native files (block-list `tools:`, `subagent:`, `effort:`, `id`) and commit them. Runtime reads only what it already knows how to read.
4. **Make the parser strict.** `tools:` present but unparseable → throw at setup. This is the guard that would have caught §1.2.
5. **Kill the dead surface.** Either wire `.omp/agents/` into a manifest with tests, or delete it. A fourth unwired roster is indistinguishable from a bug.
6. **Remove the `~/.agency-agents/strategy/` dependency** (`agents-orchestrator.md:61`) or declare it a hard requirement with a startup check. Right now it is a promise the code does not keep.
7. **Green CI first.** `ci.yml`'s `typecheck` and `test` steps are commented out. Refactoring a harness with no automated verification is the precondition failure that makes every other condition moot.

---

## 6. The plan's shared premise (meta-refutation)

All four proposals assume one thing they never state:

> **"frame-ship's value lives in its roster and its stage list; therefore roster and stage list are safe to replace."**

The evidence says frame-ship's value lives somewhere else:

| frame-ship's actual differentiator | Where it lives | Deleted by |
|---|---|---|
| Creed as a non-negotiable identity contract | 34 files | P-A2, P-C |
| Ley 172-13 as the privacy bar (jurisdictional, not generic) | 23 files | P-A2, P-C |
| Spanish warmth + consent contract with masking (`challenge-round.md`) | 3 files | P-A2, P-C |
| Single-dispatcher authority (`Montilla`, ADR-003/INV-012) | `agents/montilla.md` | P-A2, P-B, P-D |
| `no min-gate, no silent downgrade` | 2 SKILLs | P-B |
| Runtime guardrail injection (3 code paths, versioned, idempotent) | `guardrails.ts`, `.pi/extensions`, `context-inject.ts` | P-C |

Every one of those is a *control*, and `GEN-13` says controls are enforced, not advisory. The plan is framed as simplification; measured against the evidence, it is **control removal under a maintenance narrative**. That is the single strongest objection in this document, and it subsumes the rest.

A second meta-observation: **the plan argues from repository maturity, not from fitness.** agency-agents is the better-governed repo (active CI, 936 commits, release automation, 299 agents). That is real and it is why P-D is tempting. But maturity of the *host* says nothing about fitness of the *content* for a Dominican-jurisdiction, gate-centric, single-dispatcher methodology. The plan needs that argument made explicitly. It currently is not.

---

## 7. Pre-existing defects found during the audit (report only — not fixed, per `GEN-05`)

These are independent of the plan but they change its risk profile, because they are the exact surfaces the plan would touch.

| # | Defect | Severity | Evidence |
|---|---|---|---|
| D-1 | **frame-ship CI is inert.** `typecheck` and `test` steps are commented out; nothing runs on PR. | **High** | `.github/workflows/ci.yml` |
| D-2 | **Silent permission-stripping on `tools` shape mismatch.** Flow-list or absent `tools:` → all four capability classes denied, no error. | **Critical** | executed; §1.2 |
| D-3 | **`Vasquez` is two incompatible agents with one name**, and upstream hardcodes it as a primary agent. | **High** | §1.5; `converter.py:64` |
| D-4 | **`.omp/agents/` is a dead fourth roster** (15 agency agents, no manifest reference). | Medium | §1.6 |
| D-5 | **Dangling skill references:** `frame-ship:debugging` and `frame-ship:pull-request` are routed to by 3 files but `skills/debugging/` and `skills/pull-request/` do not exist. | **High** | `using-frame-ship/SKILL.md:53,55`; `quality-gate/SKILL.md:17`; `execute-spec/SKILL.md:18` |
| D-6 | **`AGENTS.md` documents 6 skills that do not exist:** `brand-audit`, `finance-audit`, `legal-audit`, `mkt-audit`, `people-audit`, `rev-audit`. | Medium | `AGENTS.md` persona table vs `ls skills/` |
| D-7 | **`ADR-003` and `INV-012` are cited as the authority basis for sole dispatch but do not exist.** `docs/` contains only `antigravity/README.md`; the `docs/frame-ship/**` tree `AGENTS.md` describes is absent. | **High** | `agents/montilla.md:25`; `find docs -type f` |
| D-8 | **Runtime path the code cannot guarantee:** `agents-orchestrator.md` depends on `~/.agency-agents/strategy/`. | Medium | `.omp/agents/agents-orchestrator.md:61` |
| D-9 | **Roster packaging unverified:** stashed wheel has 0 `.md` files; whether the current build ships 299 agents needs a `uv build` check. | Medium | `dist/agency_agents-1.4.0-py3-none-any.whl` |
| D-10 | **`VERSION` skew:** `shared.ts` declares `0.12.0`; `package.json` and `plugin.json` declare `1.0.0`. | Low | `lib/shared.ts:12` vs `package.json` |

D-2 and D-1 together are the load-bearing pair: a silent-failure parser with no CI to catch it. **Any** of P-A/P-C/P-D executed before D-1 and D-2 are fixed is an unrehearsed change to a system that cannot tell you it broke.

---

## 8. Decision criteria and the cheapest falsifying experiments

I will not block on disagreement alone. Each OPPOSE/SWC above has a time-boxed experiment that would change my mind, with a pre-registered pass condition.

| Refutation | Experiment | Time-box | Falsified if | My verdict changes if |
|---|---|---|---|---|
| **§2.2 (P-A1 silent deny)** | Vendor `engineering/engineering-backend-architect.md` + one testing agent through the proposed render step; start a real opencode/pi session; ask each agent to read a file and edit a file. | ½ day | Either agent can read + edit + delegate | **Any** adopted agent cannot. → P-A1 becomes OPPOSE until the parser is strict. |
| **§3.2 (runbooks don't subsume the chain)** | Take one existing frame-ship SPEC. Run it through a chosen runbook. Count which of the 6 chain artifacts (`BRIEF`, `REQ`, `ARCHITECTURE`/`ADR`, `PROPOSED_CHANGES`+STRIDE, `GATE_REPORT`, `HANDOFF`, release `NOTES`+rollback) are produced. | 1 day | ≥5 of 6 produced natively | ≤3 of 6. → P-B stays OPPOSE. |
| **§3.2 (min-gate)** | Read all 20 `NEXUS-Micro` runbooks and check whether each declares an equivalent of frame-ship's full-wave gate. | 2 h | Every Micro runbook carries a full-wave equivalent | Any left out the `review-refuter`-before-QA ordering. → P-B stays OPPOSE. |
| **§4.2 (no rule layer upstream)** | `grep -r` the ID scheme across upstream; confirm `rules/` absence; count creed/Ley-172-13 carriers. | 1 h | A real rule layer with matching semantics exists | Confirmed absent. → P-C stays OPPOSE. **This one is already settled by §4.2.** |
| **§5.2 (adapter already attempted)** | Verify whether `dist`/current wheel ships the 299-agent corpus; check whether `.omp/agents` was ever wired. | 2 h | The corpus ships and `.omp` is wired in some manifest | Corpus does not ship, or `.omp` is unreferenced. → P-D stays SWC and scoped to roster-only. |
| **§6 (control removal)** | For each of the 6 controls in §6, name the upstream artifact that would carry it after the change. | 2 h | 6/6 have a named upstream home | Any control with no home. → that specific proposal is OPPOSE. |

**Recommended sequencing** (this is the constructive path forward, and it is orthogonal to the plan's merits):

1. Fix **D-1** (restore CI) and **D-2** (strict parser). *Nothing else should start before this.*
2. Fix **D-5** and **D-7** (dangling skills, missing ADRs) — cheap, and they establish the baseline the migration would be measured against.
3. Run the §8 P-A1 experiment (½ day). That is the only proposal with a genuinely favourable risk/benefit after this audit, and it is falsifiable for the price of an afternoon.
4. Defer P-B and P-C. Both should be re-proposed only after the control-preservation table in §6 is filled in — if it can be.

---

## 9. Final recommendation

**Seek evidence — do not accept the plan as written.**

Concretely:

- **P-A1:** accept as *additive vendoring* with a render step, strict parsing, and namespacing. Keep the 25 agents that have no twin.
- **P-A2, P-B, P-C:** reject. Each removes a control and names no replacement carrier.
- **P-D:** accept only in its reduced form — *repair and wire the existing adapter for the roster alone*. Not as a shell over roster + strategy + runbooks.

The plan is not wrong because it is ambitious. It is wrong because it argues from *size and tidiness* toward *deleting the controls that are the product*, and because its one attractive axis (P-D) is better described as finishing a half-finished job than as a new architecture.

The strongest version of the plan's own argument is this: **"frame-ship cannot maintain 32 agents and 15 rule files against a 299-agent upstream indefinitely."** That is true, and it deserves a real answer — but the answer is a *narrowed adapter with a pinned roster and retained local controls*, not a wholesale absorption.

---

## Outcome
Outcome: done — full adversarial audit written; 1 SUPPORT-WITH-CONDITIONS (P-A1), 2 OPPOSE (P-A2/P-B/P-C), 1 narrowed SUPPORT-WITH-CONDITIONS (P-D), plus 10 pre-existing defects reported.
Details: The decisive finding is an executed parser test (§1.2): a converter-shaped `tools:` flow list silently yields zero tool permissions, and frame-ship's CI that would catch it is commented out. P-C's premise is factually false — `agency-agents` has no `rules/` layer to deduplicate into (0 files carry the ID scheme).
Files: `/home/deuriib/projects/frame-ship/audit-refuter.md` — full report with per-proposal counter-arguments, hidden assumptions, verdicts, minimal safe changes, 10 pre-existing defects, and 6 pre-registered falsifying experiments.
