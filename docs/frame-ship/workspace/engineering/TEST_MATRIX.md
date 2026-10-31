# Test Matrix — SPEC-002 docs layout normalization

Every acceptance bullet from issue #2 becomes a `REQ-ID` with a mechanical, re-runnable check.
No P0 code paths; evidence is grep output, not prose.

| REQ-ID | Requirement (issue acceptance) | Evidence command | Expected |
|---|---|---|---|
| REQ-002-1 | No `docs/frame-ship/specs/` path exists anywhere | `grep -rn "frame-ship/specs" --exclude-dir=.git --exclude-dir=node_modules .` | no matches |
| REQ-002-2 | Artifact folders sit directly under `docs/frame-ship/`, no numeric prefix | `grep -rEn "(10_design\|12_adr\|15_requirements\|20_backlog\|30_delivery\|40_workspace\|50_archive)" --exclude-dir=.git --exclude-dir=node_modules .` | no matches |
| REQ-002-3 | `frame-intent` writes `## OKRs` inside `BRIEF-<slug>.md`; no separate OKR file produced | `grep -n "OKRs" skills/frame-intent/SKILL.md` | step 7/8 state inline section; no `OKR-<slug>.md` output |
| REQ-002-4 | `product-brief.md` includes the `## OKRs` section inline | `grep -n "^## OKRs" skills/frame-intent/references/product-brief.md` | one match |
| REQ-002-5 | All chain skills reference flat paths | `grep -rn "docs/frame-ship/" skills/*/SKILL.md` | every path flat |
| REQ-002-6 | All reference templates use flat paths | `grep -rn "docs/frame-ship/" skills/*/references/` | every path flat |
| REQ-002-7 | `AGENTS.md` folder table reflects flat layout | `grep -n "docs/frame-ship" AGENTS.md` | table present, flat paths |
| REQ-002-8 | No stale "paired OKR file" claim | `grep -rn "OKR-\*\.md\|OKR-<slug>\.md" --exclude-dir=.git .` | no matches |

## Domain checks

| Domain | Check | Verdict source |
|---|---|---|
| engineering | Grep gates above + `git diff --stat` review | reviewer sign-off in `quality-gate` |
| security | Not applicable — no auth, data, secret, or network surface | `review-security` skipped, justified |
| architecture | Not applicable — no public API, data model, or cross-cutting contract change | `review-architecture` skipped, justified |
