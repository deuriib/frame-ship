# Migration Guide Template: MIGRATION.md

Use this template to create, verify, or update `MIGRATION.md` whenever a release introduces breaking changes, configuration renames, or architectural migrations.

---

```markdown
# Migration Guide: Upgrading to vX.Y.Z

**From Version:** vA.B.C  
**To Version:** vX.Y.Z  
**Release Date:** YYYY-MM-DD  
**Owner / Author:** [Release Manager / Engineering Owner]  
**Migration Severity:** Low | Medium | Breaking  

---

## Executive Summary

[Brief high-level summary of why these changes were made, benefits of upgrading, and estimated migration effort (e.g. <15 minutes for standard setups).]

---

## Breaking Changes Registry

| Area / Component | Previous Behavior (vA.B.C) | New Behavior (vX.Y.Z) | Associated ADR / SPEC | Impacted Domains |
|---|---|---|---|---|
| **Plugin Hook API** | `experimental.chat.system.transform` string parts | `ctx.session.hook("context")` `{type:"text", text}` objects | ADR-008, SPEC-002 | engineering |
| **Config Key** | `"legacy_key": true` | `"modern_key": "explicit_mode"` | ADR-007 | engineering, ops |
| **CLI Command** | `agy run-gate` | `agy gate --full-wave` | SPEC-gate | automation, engineering |

---

## Deprecation Notice & Timeline

- **[Feature / API Name]:** Deprecated in `vX.Y.Z`. Planned for complete removal in `v(X+1).0.0`. Alternative: Use `[ReplacementAPI]` instead.
- **[Config Option]:** Will continue to warn until `YYYY-MM-DD`.

---

## Step-by-Step Upgrade Instructions

### Step 1: Pre-Migration Backup & State Check
Before upgrading, capture a snapshot or ensure your git working tree is clean:
```bash
git status
git tag pre-migration-vA.B.C
```

### Step 2: Update Package / Plugin Version
Update your dependency or plugin pointer in configuration:
```json
// Before:
"frame-ship@git+https://github.com/deuriib/frame-ship.git#vA.B.C"

// After:
"frame-ship@git+https://github.com/deuriib/frame-ship.git#vX.Y.Z"
```

### Step 3: Configuration & File Renames
[Detail any config key renames, file moves, or environment variable changes.]
- Rename key `X` to `Y` in `.config.json`.
- Relocate file `legacy-path/` to `modern-path/`.

### Step 4: Automated Migration / Codemods (if available)
```bash
# Run migration script or codemod
node scripts/migrate-to-vX.mjs
```

### Step 5: Post-Upgrade Verification
Run the verification commands to confirm everything is operational:
```bash
mise run typecheck
[cli-name] api get "/api/plugin"
```

---

## Rollback & Downgrade Plan

If unexpected failures occur during or after migration:

1. **Revert Version Pin:**
   Change configuration back to `#vA.B.C`.
2. **Restore Files / Data:**
   ```bash
   git checkout pre-migration-vA.B.C
   ```
3. **Restart Runtime / Service:**
   ```bash
   [cli-name] service restart
   ```
4. **Estimated Recovery Time:** `< 10 minutes`.
```

---

## Release-Time Migration Guide Checklist

During `ship-release`, verify and execute the following:

- [ ] Every breaking change cited in `RELEASE_NOTES.md` has a corresponding section in `MIGRATION.md`.
- [ ] Before/After examples are tested and syntactically valid.
- [ ] Downgrade/Rollback instructions tested and verified reversible.
- [ ] Migration guide linked from `README.md` and `RELEASE_NOTES.md`.
