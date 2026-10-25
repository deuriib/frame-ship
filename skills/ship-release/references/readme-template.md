# Project README Template & Release Maintenance Guide

Use this template to create, verify, or update the project's root `README.md` during `ship-release`.

---

```markdown
# [Project Name]

> *"[One-line core mission, value proposition, or creed]"*

[![Version](https://img.shields.io/badge/version-vX.Y.Z-blue.svg)](https://github.com/[org]/[repo]/releases/tag/vX.Y.Z)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![Build & Test](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Methodology: Frame-Ship](https://img.shields.io/badge/methodology-Frame%E2%86%92Ship-orange.svg)](https://github.com/deuriib/frame-ship)

[2-3 paragraph executive summary of what this project does, why it exists, and the primary problem it solves.]

---

## Key Features

- **[Feature 1]:** [Description and business / technical benefit]
- **[Feature 2]:** [Description and business / technical benefit]
- **[Feature 3]:** [Description and business / technical benefit]
- **[Feature 4]:** [Description and business / technical benefit]

---

## Architecture & Workflow

```
[ASCII or Mermaid diagram illustrating component relationships or the Frame→Ship lifecycle]
frame-intent ──► translate-to-spec ──► propose-changes ──► review ──► execute-spec ──► quality-gate ──► verify ──► ship
```

---

## Prerequisites

- [Runtime / Tool 1, e.g. Node.js >= 22.0.0]
- [Runtime / Tool 2, e.g. Bun >= 1.2.0]
- [Operating Systems supported: Linux, macOS, Windows (WSL/PowerShell)]

---

## Quick Start / Installation

### Option 1: Package Manager / Plugin Add

```bash
# Add as plugin / package (pinned to current release vX.Y.Z)
[install command, e.g. opencode plugin add [package]@vX.Y.Z or npm install [package]@vX.Y.Z]
```

### Option 2: Clone & Local Setup

```bash
git clone https://github.com/[org]/[repo].git -b vX.Y.Z
cd [repo]
[install command, e.g. mise run install or npm install]
[verification command, e.g. mise run typecheck]
```

---

## Configuration & Usage

[Minimal working configuration example, e.g. JSON/TOML snippet or CLI invocation]

```json
{
  "plugins": ["[package]@git+https://github.com/[org]/[repo].git#vX.Y.Z"]
}
```

---

## Documentation Index

| Resource | Path | Description |
|---|---|---|
| **Installation Guide** | [`INSTALL.md`](./INSTALL.md) | Platform compatibility, verify steps, and troubleshooting |
| **Changelog** | [`CHANGELOG.md`](./CHANGELOG.md) | Full release history and changes per version |
| **Migration Guide** | [`MIGRATION.md`](./MIGRATION.md) | Upgrade instructions and breaking change migrations |
| **Specifications** | `docs/specs/` | Living specs, ADRs (`12_adr/`), and archived deliverables |
| **Knowledge Base** | [`AGENTS.md`](./AGENTS.md) | Architecture map, toolchain commands, and conventions |

---

## Verification & Health Check

```bash
# Run test suite / verification
[test command, e.g. npm test or mise run typecheck]
```

---

## License

[License Name, e.g. MIT] © [Year] [Author / Organization]. See [`LICENSE.md`](./LICENSE.md) for details.
```

---

## Release-Time README Maintenance Checklist

During `ship-release`, verify and execute the following updates on `README.md`:

1. **Version Pinning & Badges:**
   - [ ] Update version badge: `badge/version-vX.Y.Z-blue.svg`.
   - [ ] Update git release tag link: `releases/tag/vX.Y.Z`.
   - [ ] Update git installation pins: `#vX.Y.Z` in all clone/plugin snippets.
2. **Feature Synchronization:**
   - [ ] Ensure newly shipped features from `RELEASE_NOTES.md` are reflected in Key Features.
   - [ ] Remove or update any deprecated capabilities or altered command flags.
3. **Quickstart Verification:**
   - [ ] Copy-paste and execute the quickstart instructions in a fresh workspace or container.
   - [ ] Verify that all cited paths, file names, and output markers match current behavior.
4. **Documentation Links:**
   - [ ] Verify that all markdown links in the Documentation Index resolve correctly.
