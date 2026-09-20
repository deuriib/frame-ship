#!/usr/bin/env node
/**
 * bump-version.mjs — Synchronize and bump versions across all project files.
 *
 * Enforces version lockstep across:
 * 1. package.json ("version": "X.Y.Z")
 * 2. plugins/opencode/frame-ship.ts (header comment + const VERSION = "X.Y.Z")
 * 3. plugins/antigravity/hooks/context-inject.ts (const VERSION = "X.Y.Z" + parity comment)
 * 4. rules/frame-ship.md (Version lockstep note)
 * 5. README.md (prompt banner verification + git install URL #vX.Y.Z + version-locked note)
 * 6. plugins/opencode/INSTALL.md (prompt banner verification)
 * 7. AGENTS.md (runtime line count + version triple notes)
 *
 * Usage:
 *   node scripts/bump-version.mjs --check                 # Check for version drift (exit 0 if synced, 1 if drift)
 *   node scripts/bump-version.mjs --sync                  # Sync all files to current package.json version
 *   node scripts/bump-version.mjs <patch|minor|major>     # Semver bump and sync
 *   node scripts/bump-version.mjs <new-version>           # Set specific version (e.g. 0.7.1)
 *
 * Options:
 *   --dry-run      Preview changes without writing to disk
 *   --changelog    Promote [Unreleased] in CHANGELOG.md to new version header
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");

// Paths
const PKG_PATH = resolve(ROOT_DIR, "package.json");
const OPENCODE_PLUGIN_PATH = resolve(ROOT_DIR, "plugins/opencode/frame-ship.ts");
const AGY_HOOK_PATH = resolve(ROOT_DIR, "plugins/antigravity/hooks/context-inject.ts");
const RULES_PATH = resolve(ROOT_DIR, "rules/frame-ship.md");
const README_PATH = resolve(ROOT_DIR, "README.md");
const INSTALL_PATH = resolve(ROOT_DIR, "plugins/opencode/INSTALL.md");
const AGENTS_PATH = resolve(ROOT_DIR, "AGENTS.md");
const CHANGELOG_PATH = resolve(ROOT_DIR, "CHANGELOG.md");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function countLines(path) {
  const content = readFileSync(path, "utf-8");
  return content.split("\n").length;
}

function parseSemver(v) {
  const clean = v.replace(/^v/, "");
  const parts = clean.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid semver version: "${v}"`);
  }
  return parts;
}

function bumpSemver(current, type) {
  const [major, minor, patch] = parseSemver(current);
  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Unknown bump type: ${type}`);
  }
}

function getFileReplacements(targetVersion) {
  const runtimeLines = countLines(OPENCODE_PLUGIN_PATH);

  return [
    {
      file: PKG_PATH,
      name: "package.json",
      check: (content) => {
        const match = content.match(/"version":\s*"([^"]+)"/);
        return match ? match[1] : null;
      },
      transform: (content) =>
        content.replace(/"version":\s*"[^"]+"/, `"version": "${targetVersion}"`),
    },
    {
      file: OPENCODE_PLUGIN_PATH,
      name: "plugins/opencode/frame-ship.ts",
      check: (content) => {
        const headerMatch = content.match(/\*\s*frame-ship v([\d\w.-]+)\s*—/);
        const constMatch = content.match(/const VERSION = "([^"]+)";/);
        if (headerMatch && constMatch && headerMatch[1] === constMatch[1]) {
          return constMatch[1];
        }
        return headerMatch ? headerMatch[1] : (constMatch ? constMatch[1] : null);
      },
      transform: (content) => {
        let updated = content.replace(
          /(\*\s*frame-ship v)[\d\w.-]+(\s*—)/,
          `$1${targetVersion}$2`
        );
        updated = updated.replace(
          /const VERSION = "[\d\w.-]+";/,
          `const VERSION = "${targetVersion}";`
        );
        return updated;
      },
    },
    {
      file: AGY_HOOK_PATH,
      name: "plugins/antigravity/hooks/context-inject.ts",
      check: (content) => {
        const constMatch = content.match(/const VERSION = "([^"]+)";/);
        return constMatch ? constMatch[1] : null;
      },
      transform: (content) => {
        let updated = content.replace(
          /const VERSION = "[\d\w.-]+";/,
          `const VERSION = "${targetVersion}";`
        );
        updated = updated.replace(
          /(\/\/\s*\[frame-ship v)[\d\w.-]+(\]\s*parity marker)/,
          `$1${targetVersion}$2`
        );
        return updated;
      },
    },
    {
      file: RULES_PATH,
      name: "rules/frame-ship.md",
      check: (content) => {
        const match = content.match(/Version lockstep:\s*\[frame-ship v([\d\w.-]+)\]/);
        return match ? match[1] : null;
      },
      transform: (content) =>
        content.replace(
          /Version lockstep:\s*\[frame-ship v[\d\w.-]+\]\s*—\s*bump with `[^`]+` \+ `[^`]+`\./,
          `Version lockstep: [frame-ship v${targetVersion}] — bump with \`plugins/opencode/frame-ship.ts\` + \`plugins/antigravity/hooks/context-inject.ts\`.`
        ),
    },
    {
      file: README_PATH,
      name: "README.md",
      check: (content) => {
        const promptMatch = content.match(/contains `\[frame-ship v([\d\w.-]+)\]`/);
        return promptMatch ? promptMatch[1] : null;
      },
      transform: (content) => {
        let updated = content.replace(
          /(contains `\[frame-ship v)[\d\w.-]+(\]`)/g,
          `$1${targetVersion}$2`
        );
        updated = updated.replace(
          /(frame-ship@git\+https:\/\/github\.com\/[^"'\s]+#v)[\d\w.-]+/g,
          `$1${targetVersion}`
        );
        updated = updated.replace(
          /(version-locked v)[\d\w.-]+/g,
          `$1${targetVersion}`
        );
        return updated;
      },
    },
    {
      file: INSTALL_PATH,
      name: "plugins/opencode/INSTALL.md",
      check: (content) => {
        const promptMatch = content.match(/contains `\[frame-ship v([\d\w.-]+)\]`/);
        return promptMatch ? promptMatch[1] : null;
      },
      transform: (content) =>
        content.replace(
          /(contains `\[frame-ship v)[\d\w.-]+(\]`)/g,
          `$1${targetVersion}$2`
        ),
    },
    {
      file: AGENTS_PATH,
      name: "AGENTS.md",
      check: (content) => {
        const stackMatch = content.match(/Stack: 1 TS runtime \(\d+ lines, v([\d\w.-]+)\)/);
        return stackMatch ? stackMatch[1] : null;
      },
      transform: (content) => {
        let updated = content.replace(
          /Stack: 1 TS runtime \(\d+ lines, v[\d\w.-]+\)/,
          `Stack: 1 TS runtime (${runtimeLines} lines, v${targetVersion})`
        );
        updated = updated.replace(
          /└── package\.json\s+# v[\d\w.-]+ \(matches plugin header\)/,
          `└── package.json  # v${targetVersion} (matches plugin header)`
        );
        updated = updated.replace(
          /- Version aligned: root `package\.json` v[\d\w.-]+ matches plugin header `v[\d\w.-]+`/,
          `- Version aligned: root \`package.json\` v${targetVersion} matches plugin header \`v${targetVersion}\``
        );
        return updated;
      },
    },
  ];
}

function updateChangelog(targetVersion, isDryRun) {
  try {
    const content = readFileSync(CHANGELOG_PATH, "utf-8");
    const today = new Date().toISOString().slice(0, 10);
    const unreleasedHeader = "## [Unreleased]";
    const newReleaseHeader = `## [Unreleased]\n\n## [v${targetVersion}] — ${today}`;

    if (content.includes(unreleasedHeader) && !content.includes(`## [v${targetVersion}]`)) {
      const updated = content.replace(unreleasedHeader, newReleaseHeader);
      if (!isDryRun) {
        writeFileSync(CHANGELOG_PATH, updated, "utf-8");
      }
      console.log(`  [CHANGELOG.md] Promoted [Unreleased] to [v${targetVersion}] — ${today}`);
    } else {
      console.log(`  [CHANGELOG.md] Header for v${targetVersion} already present or [Unreleased] missing.`);
    }
  } catch (err) {
    console.error(`  [CHANGELOG.md] Could not update changelog: ${err.message}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const isCheck = args.includes("--check") || args.includes("check");
  const isSync = args.includes("--sync") || args.includes("sync");
  const shouldUpdateChangelog = args.includes("--changelog");

  const nonFlagArgs = args.filter((a) => !a.startsWith("--") && a !== "check" && a !== "sync");

  const pkg = readJson(PKG_PATH);
  const currentVersion = pkg.version;

  if (isCheck) {
    console.log(`Checking version synchronization across repository (canonical: v${currentVersion})...\n`);
    const targets = getFileReplacements(currentVersion);
    let hasDrift = false;

    for (const target of targets) {
      try {
        const content = readFileSync(target.file, "utf-8");
        const found = target.check(content);
        if (found === currentVersion) {
          console.log(`  ✓ ${target.name.padEnd(45)} v${found}`);
        } else {
          console.error(`  ✗ ${target.name.padEnd(45)} v${found || "NOT FOUND"} (expected: v${currentVersion})`);
          hasDrift = true;
        }
      } catch (err) {
        console.error(`  ✗ ${target.name.padEnd(45)} ERROR: ${err.message}`);
        hasDrift = true;
      }
    }

    if (hasDrift) {
      console.error("\nVersion drift detected! Run `node scripts/bump-version.mjs --sync` to synchronize.");
      process.exit(1);
    } else {
      console.log("\nAll target files are perfectly synchronized!");
      process.exit(0);
    }
  }

  let targetVersion = currentVersion;

  if (isSync) {
    targetVersion = currentVersion;
    console.log(`Synchronizing all files to current canonical version: v${targetVersion}${isDryRun ? " (DRY RUN)" : ""}`);
  } else if (nonFlagArgs.length > 0) {
    const arg = nonFlagArgs[0];
    if (["major", "minor", "patch"].includes(arg)) {
      targetVersion = bumpSemver(currentVersion, arg);
      console.log(`Bumping ${arg} version: v${currentVersion} ──► v${targetVersion}${isDryRun ? " (DRY RUN)" : ""}`);
    } else {
      parseSemver(arg); // Validate
      targetVersion = arg.replace(/^v/, "");
      console.log(`Setting explicit version: v${currentVersion} ──► v${targetVersion}${isDryRun ? " (DRY RUN)" : ""}`);
    }
  } else {
    console.log(`Current version in package.json: v${currentVersion}\n`);
    console.log("Usage:");
    console.log("  node scripts/bump-version.mjs --check               Check for version drift");
    console.log("  node scripts/bump-version.mjs --sync                Sync all files to package.json version");
    console.log("  node scripts/bump-version.mjs <patch|minor|major>   Bump semver and sync all files");
    console.log("  node scripts/bump-version.mjs <version>             Set explicit version and sync all files");
    console.log("  Options: --dry-run, --changelog\n");
    process.exit(0);
  }

  const targets = getFileReplacements(targetVersion);
  let changedCount = 0;

  for (const target of targets) {
    try {
      const original = readFileSync(target.file, "utf-8");
      const currentDetected = target.check(original);
      const updated = target.transform(original);

      if (original !== updated) {
        if (!isDryRun) {
          writeFileSync(target.file, updated, "utf-8");
        }
        console.log(`  Updated ${target.name.padEnd(45)} (v${currentDetected || "?"} ──► v${targetVersion})`);
        changedCount++;
      } else {
        console.log(`  Already synced ${target.name.padEnd(39)} (v${targetVersion})`);
      }
    } catch (err) {
      console.error(`  Error updating ${target.name}: ${err.message}`);
    }
  }

  if (shouldUpdateChangelog) {
    updateChangelog(targetVersion, isDryRun);
  }

  console.log(`\nDone! ${changedCount} file(s) ${isDryRun ? "would be updated" : "updated"}.`);
}

main();
