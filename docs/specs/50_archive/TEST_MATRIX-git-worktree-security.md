# Test / Evidence Matrix: SPEC-git-worktree-security

**Agent:** security specialist (barrera lens, security owner)
**Date:** 2026-09-16
**Domains-Touched:** security (packet DOMAINS [engineering, automation/ops, security, people])

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-SEC-001 | T-001 | `guards.md` §1 boundary table: 4/4 rows (path / prompt packet / log line / gate evidence → checkpoint → mask-or-refuse rule → security owner) with deny-default stated | Review | pass | n/a (no commits per packet) |
| REQ-SEC-002 | T-002 | Fail-closed gate defined (`guards.md` §2, slash-canonical `git check-ignore -q .worktrees/`) + re-attested 2026-09-16: `.gitignore` 56 lines with entry at `:55-56`, slash probe exit=0 (green), bare form exit=1 (dir-existence variant only, never the gate probe); `git ls-files -- .worktrees/` empty + `git status --porcelain -- .worktrees/` empty (zero tracked worktree paths); entry landing owned by engineering lane (C-001: cite by reference, no `.gitignore` edit in this lane) | Attestation | pass | n/a |
| REQ-SEC-003 | T-003 | Least-privilege clause (`guards.md` §3) + live probe 2026-09-16: `git worktree list` → 1 entry (`D:/GitHub/frame-ship [main]`, count 1 ≤ 2), no shared-credential copies observed; lane file create only, no cross-worktree access | Review | pass | n/a |
| REQ-SEC-004 | T-004 | Credential-shape scan over `skills/git-worktree/**` 2026-09-16 = 0 real values: tight pattern (`api_key\|passwd\|access_token\|bearer\|secret:=…\|aws_access\|ghp_\|sk-`) matched only the documented probe-pattern string in `guards.md:71` (pattern text, not a credential — annotated, not a value); PII-shape scans (SSN `\d{3}-\d{2}-\d{4}` → 0 hits, email-shape → 0 hits, both 2026-09-16); broad prose matches (`secret/session/tokenize` vocabulary) are policy language, not values — C-002 met with this annotation | Review | pass | n/a |
| REQ-SEC-005 | T-005 | Submodule drill live probe 2026-09-16: `git submodule status` empty output exit=0 + `Test-Path .gitmodules` = False — none-needed statement for this repo; guard + drill steps defined in `guards.md` §5; no checkout executed — C-004 met as none-needed | Attestation | pass | n/a |
| REQ-SEC-006 | T-006 | Sandbox fallback defined (`guards.md` §6): `Temp\opencode`-only with purpose + TTL + deletion owner (automation + security co-sign, orchestrator confirms); no fallback exercised this lane, no off-sandbox location created | Review | pass | n/a |
| REQ-SEC-007 | T-007 | Scoped-export allowlist (`guards.md` §7): command logs + `list` snapshots + redacted excerpts only; this matrix cites paths only, zero bodies, zero PII — C-002 export half met | Review | pass | n/a |
| REQ-SEC-008 | T-008 | No-freelance-fixes clause (`guards.md` §8); zero rotation/prod-patch/perm-widen instructions lane-wide (sole `rotate/patch` match is the prohibition sentence itself); violations route to orchestrator + montilla | Review | pass | n/a |

Types per `execute-spec` contract: non-code REQs use Review/Attestation with
artifact path — REQ-ID trace mandatory, satisfied 8/8 above.

## Coverage Summary

- Unit coverage: N/A (non-code policy lane with justification — no executable code produced)
- Integration coverage: N/A (same justification)
- Evidence coverage: 8/8 REQ-SEC-IDs with linked artifact section or scan ref
- Acceptance criteria covered: 8/8 (AC-SEC-001..008 mapped T-001..T-008)
- Conditions: C-001 cited by reference (engineering lane lands entry + green log);
  C-002 scan proof delivered (T-004); C-004 drill delivered as none-needed (T-005);
  C-001 trust-map text contributed by reference (`guards.md` §1, engineering lane
  attaches its own `check-ignore` confirmation); C-003/C-005/C-006 carry to gate
  with named owners (engineering / automation+security / people+security)
