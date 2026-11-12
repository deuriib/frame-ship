# Documentation Synchronization Checklist: Ship-Release

Use this checklist during `ship-release` to guarantee that all project documentation, install instructions, version markers, and knowledge base files remain synchronized with shipped behavior.

---

## 1. Release Documentation Audit Matrix

| Documentation Target | Reference Template | Responsibility | Verification Method | Pass Criteria |
| --- | --- | --- | --- | --- |
| **RELEASE_NOTES.md** | `references/release-notes.md` | Release Manager / Ops | Inspection & diff | Highlights, fixes, domain ships, and rollback plan documented. |
| **CHANGELOG.md** | `references/changelog-template.md` | Release Manager / Dev | Diff review | `[Unreleased]` promoted to `[vX.Y.Z] — YYYY-MM-DD` with Keep-a-Changelog format. |
| **README.md** | `references/readme-template.md` | Owning Specialist / Dev | Read-back + command test | Version badges, install snippets `#vX.Y.Z`, and feature lists updated. |
| **INSTALL.md** | `references/install-template.md` | Dev / Ops | Clean install dry-run | Platform requirements, verify commands, and banner markers aligned. |
| **MIGRATION.md** | `references/migration-guide-template.md` | Engineering Owner | Review / dry-run | Required if breaking changes exist; rollback steps documented. |
| **Code & Header Markers** | `scripts/bump-version.mjs` | Automated script | `node scripts/bump-version.mjs --check` | Plugin header, `VERSION` constant, and parity comments identical. |
| **Context & Rules** | `rules/Frame-ship.md` | Automated script / Dev | Marker grep | Version lockstep note and persistent cards updated. |
| **Knowledge Base** | `AGENTS.md` (root & subdirs) | Engineering Owner | Read-back & line count | Runtime line counts, package version, and toolchain commands aligned. |
| **Spec Lifecycle** | `docs/frame-ship/` | Release Manager | Git status check | Spec `git mv` to `archive/<spec-id>/` (R rename, source gone); `ARCHIVE-RECORD.md` written; allowlisted scratch in `workspace/` purged (nothing outside the allowlist). |

---

## 2. Pre-Ship Step-by-Step Verification Flow

```
1. Run Version Sync Tool
   └── node scripts/bump-version.mjs vX.Y.Z (or --sync)
       ├── package.json
       ├── plugins/opencode/shared.ts
       ├── plugins/antigravity/hooks/context-inject.ts
       ├── rules/Frame-ship.md
       ├── README.md
       ├── plugins/opencode/INSTALL.md
       └── AGENTS.md (version + runtime line count)

2. Audit User-Facing Documentation
   ├── Verify README.md quickstart snippets
   ├── Verify INSTALL.md installation pathways
   ├── Update CHANGELOG.md release block
   └── If breaking changes: produce or update MIGRATION.md

3. Validate Toolchain & Gate Integrity
   ├── mise run typecheck (must exit 0)
   ├── Run automated tests / evidence collection
   └── node scripts/bump-version.mjs --check (must report 0 drift)

4. Spec Archival & Workspace Hygiene (promote before purge — see SKILL §3 step 6)
   ├── mkdir docs/frame-ship/archive/<spec-id>/ && git mv docs/frame-ship/backlog/<spec>.md docs/frame-ship/archive/<spec-id>/
   ├── Copy GATE_REPORT.md + HANDOFF.md into docs/frame-ship/archive/<spec-id>/ (evidence survives)
   ├── Write docs/frame-ship/archive/<spec-id>/ARCHIVE-RECORD.md (references/archive-record.md)
   ├── Purge allowlist ONLY: docs/frame-ship/workspace/<domain>/{PROPOSED_CHANGES,IMPLEMENTATION_PLAN,TEST_MATRIX,HANDOFF}.md + docs/frame-ship/workspace/quality-gate/<spec-id>/
   └── Verify: purged paths absent, OTHER SPEC lanes untouched, git status clean
```

---

## 3. Strict Prohibitions (What I won't do)

- **Never ship with version drift:** Leaving any plugin header, context hook, or manifest on an older version is a gate violation.
- **Never ship with dead documentation links:** Every link in `README.md`, `INSTALL.md`, and `RELEASE_NOTES.md` must resolve.
- **Never skip changelog for user-facing changes:** Even non-code ships must document operational, legal, or financial changes.
- **Never leave the allowlisted drafts lingering in `workspace/` after archive:** The 4 lane singletons for THIS spec + `quality-gate/<spec-id>/` are purged before the release commit — but ONLY after `GATE_REPORT.md` + `HANDOFF.md` are promoted to `archive/<spec-id>/`, and NEVER across other SPECs' lanes.
