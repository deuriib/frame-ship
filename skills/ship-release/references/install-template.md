# Installation Guide Template: INSTALL.md

Use this template to create, verify, or update the project's `INSTALL.md` (or platform-specific installation guides) during `ship-release`.

---

```markdown
# Installing [Project Name]

Detailed installation and setup instructions for [Project Name] vX.Y.Z.

---

## Supported Environments & Runtimes

| Platform / Runtime | Version Tested | Support Level | Notes |
|---|---|---|---|
| **Node.js** | >= 22.x | Tier 1 (Primary) | Required for runtime and plugins |
| **Bun** | >= 1.2.x | Tier 1 | Supported for hooks and scripts |
| **Linux (x64 / arm64)** | Ubuntu 22.04+, Debian 12+, Fedora | Tier 1 | Fully tested |
| **macOS (Apple Silicon / Intel)** | macOS 14+ (Sonoma) | Tier 1 | Fully tested |
| **Windows** | Windows 11 (WSL2 / PowerShell 7) | Tier 1 | Tested via WSL2 and native PowerShell |

---

## Installation Pathways

### Pathway A: Plugin / Extension Install (Recommended)

To install as an automated plugin or agent extension:

```bash
# Using CLI / Plugin Manager
[cli-name] plugin add [package-name]@vX.Y.Z

# Or declare in project config (.project/config.json):
{
  "plugins": [
    "[package-name]@git+https://github.com/[org]/[repo].git#vX.Y.Z"
  ]
}
```

### Pathway B: Package Manager Install

```bash
# Using npm
npm install -g [package-name]@vX.Y.Z

# Using pnpm
pnpm add -g [package-name]@vX.Y.Z

# Using bun
bun add -g [package-name]@vX.Y.Z
```

### Pathway C: Local Development / Worktree Setup

```bash
git clone https://github.com/[org]/[repo].git
cd [repo]
git checkout vX.Y.Z

# Toolchain initialization
mise trust
mise install
mise run install
mise run typecheck
```

---

## Verification & Health Check

After installation, verify that the package or plugin is operational:

```bash
# 1. Check version output
[cli-name] --version
# Expected: vX.Y.Z

# 2. Check plugin / service status
[cli-name] api get "/api/plugin?location[directory]=."
# Expected: status: active

# 3. Verify session banner / system prompt
# Starts session and inspects output for:
# [project-name vX.Y.Z]
```

---

## Upgrading from Previous Versions

To upgrade from an existing installation to vX.Y.Z:

```bash
# 1. Pull latest release or update pin
[cli-name] plugin update [package-name]
# Or edit configuration to point to #vX.Y.Z

# 2. Clear stale cache if applicable
rm -rf .cache/[project-name] node_modules/.cache

# 3. Restart daemon / agent service
[cli-name] service restart
```

> **Note:** For breaking changes and database or config migrations, consult [`MIGRATION.md`](./MIGRATION.md).

---

## Troubleshooting

| Error / Symptom | Probable Cause | Remediation |
|---|---|---|
| `EACCES / Permission denied` | Global install without directory permissions | Use mise/nvm, or run `npm config set prefix ~/.npm-global` |
| `Version mismatch error` | Cached plugin version or lingering daemon | Restart daemon: `[cli-name] service restart` |
| `Module not found` | Incomplete dependencies installation | Run `mise run install` or `npm install` inside root directory |
| `Hook execution timeout` | Slow disk or unresponsive child process | Check timeout settings in hook config |

---

## Uninstallation

```bash
# Remove plugin
[cli-name] plugin remove [package-name]

# Or remove global package
npm uninstall -g [package-name]
```
```

---

## Release-Time INSTALL Maintenance Checklist

During `ship-release`, verify and execute the following updates on `INSTALL.md`:

1. **Version Pinning:**
   - [ ] Verify that all install snippets reference the exact target release `vX.Y.Z`.
   - [ ] Check that verify output snippets match the exact banner `[project-name vX.Y.Z]`.
2. **Environment & Toolchain Check:**
   - [ ] Validate Node, Bun, and OS version requirements against `mise.toml` and CI configuration.
   - [ ] Test clean installation steps in a clean temporary directory or container.
3. **Upgrade Path Sanity:**
   - [ ] Confirm upgrade steps work from the immediate prior version without data loss.
