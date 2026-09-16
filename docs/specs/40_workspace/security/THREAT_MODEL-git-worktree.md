# Threat Model: git-worktree isolation

**Methodology:** STRIDE
**Date:** 2026-09-16
**Reviewer role:** security owner orchestrating security reviewers (skills/AGENTS.md + AGENTS.md guardrails 1-14)
**Scope (proposal-only review, no impl mods):** 4 proposals by reference — `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-git-worktree-engineering.md`, `docs/specs/40_workspace/barrera/PROPOSED_CHANGES-git-worktree-security.md`, `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-git-worktree-automation.md`, `docs/specs/40_workspace/santana/PROPOSED_CHANGES-git-worktree-people.md` — plus `docs/specs/10_design/ARCHITECTURE-git-worktree.md` (INV-001..009), `.gitignore`
**Packet:** SPEC (4 proposals + specs + ARCH, by reference) / HARD (execution_mode=multi-subagents, win32/pwsh, proposal-only, deny-default secrets/PII, reference-only) / GATE (review-security wave, blocks execute-spec on Rejected) / DOMAINS ([engineering, automation/ops, security, people])

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| Worktree path `.worktrees/<spec-id>` (max 2 lanes) | CLI: `git worktree add .worktrees/<spec-id> -b <branch>` / `list` / `remove --force` + `prune` | internal (repo-local) → external if committed — `.gitignore` fail-closed gate is the boundary control |
| `.gitignore` gate (`.worktrees/` entry) | CLI: `git check-ignore -q .worktrees` (nonzero = STOP, no override) | internal control; missing entry = gate fails closed (observed 2026-09-16: entry absent, exit 1) |
| Prompt packet per worktree (`SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>`) | Prompt/adapter: orchestrator dispatch to each lane | internal lane ↔ lane — reference-only, never pasted bodies (INV-006/INV-009) |
| Log-transcript lines (`mise` output, `git status --porcelain`, `git worktree list`, pwsh transcripts) | Log/event: per-worktree setup + baseline + drill logs | internal → external on share — PII checkpoint: mask/tokenize, allowlisted excerpts only |
| Gate evidence share (`40_workspace/<domain>/`, `quality-gate/<spec-id>/`) | Share/event: command logs, `list` snapshots, redacted excerpts, check-ignore log | internal → external — scoped-export boundary: allowlisted paths only, never full dumps/raw PII |
| Submodule checkout inside worktree | CLI: submodule `add`/update (unpinned/recursive = untrusted code execution pre-review) | external (unvetted content) → internal — refuse-or-pinned-verify guard before checkout |
| Sandbox fallback `Temp\opencode` (repo-local refusal only) | Path: fallback worktree root outside repo | internal → external host path — TTL + purpose + deletion-owner boundary; never silently permanent |
| People announce/refusal channel (create/remove lines, dirty-baseline refusal script) | UI/prompt: consent Q+A + uniform announce (`dónde + rama + por qué + limpieza`) | human ↔ system — wording boundary: byte-uniform template, slot-only variance, scoped transcript excerpts |

## STRIDE Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | Yes — lane/branch confusion across 2 parallel worktrees; shared-credential copy would impersonate a lane | Branch-per-SPEC + own `<spec-id>` dir + no shared credentials/cross-worktree access (security REQ-SEC-003; engineering R-003); shared-secret copy = High finding with owner at gate; `git worktree list` count ≤ 2 snapshot |
| Tampering | Yes — `.worktrees/` content committed; dirty `main` baseline contaminates lane; scope drift into plugin/catalogue | Fail-closed `git check-ignore -q .worktrees` before first `add` (nonzero = STOP); `git status --porcelain` clean-baseline verify with recorded-override only (INV-004); `git diff --stat` scope guard (only `skills/git-worktree/**`, `docs/specs/**`, `.gitignore`) |
| Repudiation | Yes — silent/auto `add`, unattributable gate evidence, unrecorded overrides | Consent-before-create with transcript Q+A preceding every `add` (people REQ-PPL-001/AC-001); exactly-once uniform announce per create/remove; per-`<spec-id>` evidence attribution; `override: <who> <timestamp> <reason>` recorded in-session |
| Information Disclosure | Yes — secrets/PII via worktree paths, logs, prompts, full-dump gate evidence (Ley 172-13 exposure) | Deny-default: no secrets/tokens/credentials/sessions in code/config/logs/examples/events; mask/tokenize at every port/adapter/event/log/prompt checkpoint; reference-only packets; scoped-export allowlist (command logs, `list` snapshots, redacted excerpts); every PII store declares purpose + TTL + deletion, expired data purged post-snapshot |
| Denial of Service | Yes — parallel `mise install` lock flake; orphaned residue breaking max-2; sideways third worktree | Orchestrator-serialized setup (max 1 installer, timestamped logs prove no overlap); `mise run typecheck` green-in-worktree gate (red blocks impl); live `git worktree list` count guard (third waits/escalates, no sideways); per-worktree TTL + owner with `remove --force` + `prune` + residue verify |
| Elevation of Privilege | Yes — perm widening, freelance key rotation / prod patching from inside a lane | Least privilege: minimum scope per worktree (own branch/dir, no widened perms; violations = recorded findings); no-freelance-fixes clause — never rotate keys / patch prod / widen perms; report severity + location, owner remediates; violations route to orchestrator via Cross-domain request |

## Residual Risk

If APPROVED-as-Conditional with conditions met: residual is **Low** — R-004 (submodule conditional path) and R-005 (sandbox TTL path) remain conditional until drill logs exist; `.gitignore` entry + `check-ignore` green log and secret/PII rescan proof are pending execute-spec/gate evidence. Carried explicitly as gate conditions S-001..S-006 in `SECURITY_REVIEW-git-worktree.md`; no silent PASS.

If conditions are skipped: residual rises to **High** — unignored `.worktrees/` contents entering history (R-001) and PII/secret spread across 2 lanes via logs/evidence (R-002) are the probable loss paths.

**Risk owner:** security owner (barrera). **Co-owners:** engineering owner (vasquez — `.gitignore` entry + skill file-shape fit), automation owner (sandbox TTL + deletion owner + serialized setup), people owner (santana — announce/refusal wording). **Escalation:** orchestrator on any Critical/High with severity + evidence + owner, same session (guardrails 9–11); CLOSED gate on security findings never ships without recorded orchestrator + domain-owner waiver.
