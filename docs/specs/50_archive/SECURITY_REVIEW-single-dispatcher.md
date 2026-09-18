# Security Review: SPEC-single-dispatcher (engineering + people)

**Reviewer:** barrera (CISO) via security-reviewer / review-risk (wording-only attestation lens)
**Date:** 2026-09-16
**Spec Reference:**
- `docs/specs/40_workspace/vasquez/SPEC-single-dispatcher-engineering.md` (REQ-001..007, REQ-NF-001..004)
- `docs/specs/40_workspace/santana/SPEC-single-dispatcher-people.md` (REQ-F-001..008, REQ-NF-001..006)
- `docs/briefs/BRIEF-single-dispatcher.md` (approved 2026-09-15; scope + constraints)
- Proposals: `PROPOSED_CHANGES-single-dispatcher.md` (vasquez) + `PROPOSED_CHANGES-single-dispatcher.md` (santana)
**Execution_Mode:** multi-subagents (frozen at frame-intent; not overridden)
**HARD:** wording-only; uniform wording across all layers; no file renames; no PII/secrets (Ley 172-13); plugin single-file zero-dep; ADR in `docs/specs/10_design/`
**GATE:** none-yet (this attestation precedes quality-gate)
**DOMAINS:** security (attestation only — no auth/data/API surface)
**Verdict (security lens):** APPROVE (wording-only attestation) — with conditions binding on execute-spec + quality-gate

## Scope

Attestation, not deep audit: the change set is documentation/config wording only — agent template prose (68 files + README, Contracts W1-W8), plugin injected string literals (`WORKFLOW_CARD` modes line `frame-ship.ts:19`, `MONTILLA_OWNERSHIP` `:34`, version trio `:2/:10-11`), skill process text (7 reworded lines + 13 verify-only lines), three AGENTS.md clause additions, ADR-003 filing (`document-create`), and 4 implementer-prompt wordings (restored by vasquez, wording bound by W8). No auth, no data paths, no external APIs, no endpoints, no adapters, no payloads, no runtime code behavior change (logic block `frame-ship.ts:36-157` — hooks, `hasMarker()`, loaders — untouched).

Checked by reference:
- Plugin target literals: `.opencode/plugins/frame-ship.ts:17-21` (WORKFLOW_CARD), `:24-28` (GUARDRAILS_FULL), `:30` (POINTERS), `:34` (MONTILLA_OWNERSHIP), `:10-11` (VERSION/MARKER), `:36-39` (`hasMarker()` — invariant preserved per REQ-001/AC-001).
- Canonical wording to be enforced verbatim: `SPEC-single-dispatcher-people.md:66-132` (Contracts W1-W8); engineering reuses verbatim per `SPEC-single-dispatcher-engineering.md:54-59` §4 and `PROPOSED_CHANGES-single-dispatcher.md:38` (vasquez, rationale).
- Wording-bound prompt mechanism line (W8): `SPEC-single-dispatcher-people.md:130-132`; mirrored at `PROPOSED_CHANGES-single-dispatcher.md:31` (santana) + `PROPOSED_CHANGES-single-dispatcher.md:27` (vasquez, REQ-007).
- Prior security precedent for wording-only fast gate: `docs/specs/40_workspace/barrera/SECURITY_REVIEW.md` (INTENT concise-plugin-prompts — same reviewer, same lens family; its C-5/C-6 conditions carried forward here).

## Threat Model

Methodology: STRIDE per `skills/review-security/references/threat-model.md`. Full attack-surface table: `docs/specs/40_workspace/barrera/SECURITY_REVIEW-single-dispatcher.md` (this file).

### Attack Surface

| Surface | Entry Point | Trust Boundary | Status |
|---------|-------------|----------------|--------|
| Injected session context (plugin strings) | `experimental.chat.system.transform` (`frame-ship.ts:137-144`) | repo-authored static constants → session context | Existing — content-only edit, surface unchanged |
| Live bootstrap body | `loadBootstrapBody()` read of `skills/using-frame-ship/SKILL.md` (`frame-ship.ts:92-120`) | repo file → session context | Existing — REQ-003 rewrites 1 line of the same file; read path unchanged |
| Skill loader | `skill()` tool reads `skills/<stage>/SKILL.md` + references | repo files → session context | Existing — reworded lines only |
| Agent templates on dispatch | task(general) prompt read of `agents/<domain>/<agent>.md` | repo files → task prompt | Existing — reworded sections only |

No new surfaces, entry points, or trust boundary crossings. All proposed strings are static, author-authored content: the only interpolation in the reworded plugin constants stays `${MARKER}`/`${CHAIN}` from repo constants (`frame-ship.ts:11,13-14`). No user/model/external input flows into any proposed string — no new prompt-injection or prompt-leak vector beyond existing behavior.

### STRIDE Analysis

| Threat | Applicable? | Analysis |
|--------|-------------|----------|
| Spoofing | N/A | No identity, authN/Z, or session material in scope. Role names (montilla/CEO, c-levels, specialists) in the new wording are session personas, not authenticatable principals. W5 montilla negative control (`SPEC-single-dispatcher-people.md:101-114`) restates a role-authority contract, not an identity claim. No credential-bearing string anywhere in W1-W8 or the plugin reword. |
| Tampering | No (attacker) / Low (integrity drift) | Repo is trusted content reviewed through proposal → gate; no attacker path to alter the strings. Integrity risk is accidental semantic drift in the reword (see S-001): the change direction is *restrictive* (removes delegation authorization from 40 Variant-B templates, `SPEC-single-dispatcher-people.md:17`), so drift risk is contract weakening, not permission widening. Mitigated by verbatim contract + grep evidence (AC-003/AC-009) + gate diff = 0 target. |
| Repudiation | N/A | No new transaction/audit/log surface. The Cross-domain request lives inside the agent return as text (`SPEC-single-dispatcher-people.md:86`) — not a signed or logged event; no non-repudiation claim introduced or removed. Traceability contract (HARD-5 REQ→test→artifact→verdict) rides unchanged. |
| Information Disclosure | No (verified) | Pattern scan over both proposals: vasquez `PROPOSED_CHANGES-single-dispatcher.md` + prior-cycle dir artifacts — only prohibition clauses ("no secrets, tokens, credentials...", TEST_MATRIX-ceo-only-dispatch.md:50); santana `PROPOSED_CHANGES-single-dispatcher.md` — single hit is the filename substring false positive `sk-` in `risk-analyst` (line 42, file list); no credential material. Privacy Ley 172-13: no PII introduced, no data flows — the wording adds no source→store→log→third-party mapping (none exists), no retention obligation; role handles (montilla/santana/vasquez/barrera) are internal system personas, not natural-person data; W2 fields (Need/Reason/Suggested owner/Urgency, `SPEC-single-dispatcher-people.md:77-81`) are plain-language contract fields, not data payloads. OWASP A01/A02/A07 screen: no new endpoints/adapters/boundaries/payloads. |
| Denial of Service | N/A | No runtime/algorithmic change. Plugin logic verbatim (REQ-001/AC-001, `tsc --noEmit` exit 0 per REQ-NF-004 + AC-002). No input-validation surface, no new deps (zero-dep invariant). Worst realistic failure is a misloaded skill (process availability), caught by grep + tsc at execute-spec — not an attacker-DoS vector. |
| Elevation of Privilege | N/A (direction is restrictive) | The change *narrows* the dispatch permission surface: Variant-B delegation authorization ("Delegate to other agents only via your harness subagent mechanism", 40 files) is removed; dispatch authority centralizes to montilla only (W1/W2/W5). Guardrail 3 (least privilege) and 4 (no freelance fixes) are strengthened, not weakened; no keys/roles/IAM/permission config touched. Condition C-4 guards against any line reading as permissive of non-CEO dispatch. |

## Findings

| ID | Severity | Finding | OWASP | Evidence | Fix location / Remediation |
|----|----------|---------|-------|----------|----------------------------|
| S-001 | Low | Semantic drift in reworded delegation lines could weaken the "only CEO dispatches" qualifier (e.g., uniform sentence mis-scoped) — the riskiest of 7 skill lines + 68 template blocks + plugin strings being mechanically rewritten. Direction of change is restrictive, so drift would dilute, not widen, the contract. | N/A (integrity of process contract) | Current residue at `skills/translate-to-spec/SKILL.md:29,32`, `skills/execute-spec/SKILL.md:23,33`, `skills/propose-changes/SKILL.md:25,30`, `skills/using-frame-ship/SKILL.md:64`, `references/tool-mapping.md:8,17,35` (grep-verified today); proposed replacement is the uniform sentence + W1-W8 strings (`SPEC-single-dispatcher-people.md:66-132`) | Conditions C-1 + C-4: verbatim contract reuse (no paraphrase) + grep evidence per AC-003/AC-009 + gate diff = 0; any meaning change = STOP + re-review |
| S-002 | Low (hygiene) | Secret-pattern scan tooling is naive: `sk-` matches the legitimate agent filename `risk-analyst` (substring false positive). Not a vulnerability; without boundary-aware patterns the REQ-NF-001/004 scan evidence will be noisy and could mask a real hit in review noise. | N/A | santana `PROPOSED_CHANGES-single-dispatcher.md:42` (line 42 = finance file list, hit text `sk-` in "ri**sk-an**alyst") | Condition C-2: execute-spec + gate scans use word-boundary / anchored patterns or an explicit exclusion of the 8-domain agent filename list; log hits with context, prohibition-clauses-only pass |
| S-003 | Low (residual-monitor, not this change) | The runtime bootstrap read continues to pull repo file content (`using-frame-ship/SKILL.md`) into session context. Existing, trusted, author-controlled boundary — reword of one line in it does not alter the vector. | N/A | `frame-ship.ts:92-120` (loader, unchanged), `SPEC-single-dispatcher-engineering.md:73` (noted at spec time) | No remediation required; keep repo-write access controlled per existing access rules (out of this change's scope) |

No Critical, no High, no Medium findings. No active vulnerabilities in current code; S-001/S-002 are forward-looking process risks on the proposed wording change, mitigated by binding conditions. Prohibited-material claim is evidenced by read + scan, not refuted.

## Conditions for Approval (binding on execute-spec + quality-gate)

- [ ] **C-1 — Verbatim contract:** the uniform sentence and prompt mechanism lines are copied exactly from `SPEC-single-dispatcher-people.md:66-132` (W1-W8) — no paraphrase in plugin (`PROPOSED_CHANGES-single-dispatcher.md:21` vasquez REQ-001), skills, AGENTS.md (3 files), or the 4 restored prompts (`:27` vasquez REQ-007 / W8). Evidence: grep against canonical strings + cross-file diff = 0 bytes target (people REQ-NF-001).
- [ ] **C-2 — No secrets/PII reintroduced (Ley 172-13):** post-implementation scan of the full changed-file diff (plugin strings, 68 templates, README, 3 AGENTS.md, skills lines, ADR, 4 prompts) using boundary-aware patterns per S-002 — prohibition-clauses-only matches; no PII, credentials, tokens, session material, or data-flow additions. Evidence: scan output with hit context logged per file:line.
- [ ] **C-3 — Mechanism integrity:** packet tokens SPEC/HARD/GATE/DOMAINS untouched (REQ-NF-006 attestation `PROPOSED_CHANGES-single-dispatcher.md:130` santana); `hasMarker()` idempotency preserved (`frame-ship.ts:36-39`); plugin stays single-file zero-dep (import type only); `tsc --noEmit` exit 0 from `.opencode/` (REQ-NF-004/AC-002). Evidence: `git diff --name-only` + grep + tsc output.
- [ ] **C-4 — Restrictive direction preserved:** every reworded line reads "CEO dispatches" / "never dispatch [for others]" — no line may be readable as authorizing any non-montilla role to dispatch. Evidence: AC-003 + AC-009 greps = 0 old verbs in `skills/` + plugin + 3 AGENTS.md, outside exclusions.
- [ ] **C-5 — Gate re-verification:** this attestation signs the proposal (pre-execution). Per the security lens, the full review wave at quality-gate re-verifies C-1..C-4 against the implemented diff — including the restored 4 prompts (grep "Cross-domain request" 4/4, AC-REQ-F-008) — before verify-handoff/ship. barrera sign-off on security template set (6 files) at people gate per REQ-NF-005.

## Residual Risk (explicit — no silent PASS)

- **RR-1 (owner: santana + vasquez; verifier: barrera at gate):** wording drift between canonical contract and implemented lines re-fragments the dispatch contract (the exact failure mode this initiative repairs). Likelihood Low under C-1/C-4 grep gates; impact Med (contract ambiguity returns, cross-domain routing friction). Watched via gate diff + post-implementation grep.
- **RR-2 (owner: vasquez; verifier: barrera at gate):** restored implementer prompts may carry prior-cycle content inconsistent with the current contract (they were deleted once before, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md:38`). Likelihood Med; impact Med. Mitigated by W8 verbatim word contract + grep 4/4 + scan per C-2.
- **RR-3 (monitored — existing boundary, not sized by this change):** session-context injection of repo file content (bootstrap + skill loader) remains a trust dependency on repo write-access control. No change to the vector; out of scope for remediation.

## Sign-off

- [x] barrera (CISO) — APPROVE (wording-only attestation, conditions C-1..C-5), 2026-09-16
- [ ] vasquez (CTO, architecture-impacting? No — wording-only; no API/model/data/trust-boundary change; CTO sign-off required on the proposals themselves per their approval lists, outside this attestation)
- [ ] Re-verification at quality-gate (full review wave, C-5)