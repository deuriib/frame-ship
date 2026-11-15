import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("CODEOWNERS file exists, defines fallback, and maps critical paths to @deuriib", async () => {
  const codeownersPath = join(ROOT, ".github", "CODEOWNERS");
  assert.ok(existsSync(codeownersPath), ".github/CODEOWNERS must exist");

  const content = await readFile(codeownersPath, "utf8");
  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith("#"));

  // Must have global fallback * @deuriib
  assert.ok(
    lines.some((l) => /^\*\s+@deuriib$/.test(l)),
    "CODEOWNERS must define global fallback '* @deuriib'",
  );

  // Must cover required paths
  const requiredPatterns = [
    "/rules/",
    "/skills/",
    "/.github/",
    "/tests/",
    "/package.json",
    "/tsconfig.json",
    "/mise.toml",
    "/plugin.json",
    "/.frame-ship/",
    "/docs/frame-ship/",
  ];

  for (const pattern of requiredPatterns) {
    const matching = lines.find((l) => l.startsWith(pattern));
    assert.ok(matching, `CODEOWNERS must include pattern for ${pattern}`);
    assert.ok(matching.includes("@deuriib"), `Pattern ${pattern} must specify @deuriib`);
  }

  // Must not have forbidden negation or character ranges
  assert.ok(!content.includes("!"), "CODEOWNERS cannot contain negation patterns");
  assert.ok(!/\[[a-zA-Z0-9_-]+\]/.test(content), "CODEOWNERS cannot contain character ranges");
});

test("labels.yml adheres to declarative schema and contains all required categories", async () => {
  const labelsPath = join(ROOT, ".github", "labels.yml");
  assert.ok(existsSync(labelsPath), ".github/labels.yml must exist");

  const content = await readFile(labelsPath, "utf8");
  assert.match(
    content,
    /\$schema:\s*"https:\/\/raw\.githubusercontent\.com\/kjanat\/github-labelmanager\/master\/\.github\/labels\.schema\.json"/,
    "labels.yml must declare github-labelmanager JSON schema",
  );

  // Parse labels entries roughly without external yaml parser
  const nameMatches = [...content.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(nameMatches.length >= 27, `Expected at least 27 labels, found ${nameMatches.length}`);

  // Unique names
  const uniqueNames = new Set(nameMatches);
  assert.strictEqual(nameMatches.length, uniqueNames.size, "All label names must be unique");

  // Verify categories
  const requiredTypes = ["bug", "feature", "rule", "skill", "docs", "refactor", "chore"];
  for (const t of requiredTypes) {
    assert.ok(uniqueNames.has(t), `Type category must include label: ${t}`);
  }

  const requiredPriorities = ["priority: critical", "priority: high", "priority: medium", "priority: low"];
  for (const p of requiredPriorities) {
    assert.ok(uniqueNames.has(p), `Priority category must include label: ${p}`);
  }

  const requiredDomains = [
    "domain: engineering",
    "domain: security",
    "domain: legal",
    "domain: finance",
    "domain: marketing",
    "domain: revenue",
    "domain: automation",
    "domain: people",
  ];
  for (const d of requiredDomains) {
    assert.ok(uniqueNames.has(d), `Domain category must include label: ${d}`);
  }

  const requiredStatuses = ["triage", "blocked", "needs-info", "in-progress", "ready-to-ship"];
  for (const s of requiredStatuses) {
    assert.ok(uniqueNames.has(s), `Status category must include label: ${s}`);
  }

  const requiredSupplyChain = ["dependencies", "security", "cve"];
  for (const sc of requiredSupplyChain) {
    assert.ok(uniqueNames.has(sc), `Security/Supply Chain category must include label: ${sc}`);
  }

  // Verify colors
  const colorMatches = [...content.matchAll(/color:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const color of colorMatches) {
    assert.match(color, /^#[0-9A-Fa-f]{6}$/, `Color ${color} must be a 6-digit hex string`);
  }

  // Verify descriptions
  const descMatches = [...content.matchAll(/description:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const desc of descMatches) {
    assert.ok(desc.length > 0 && desc.length <= 100, `Description length invalid: "${desc}"`);
  }
});

test("sync-labels.yml workflow is automated with pinned SHAs and correct permissions", async () => {
  const syncWorkflowPath = join(ROOT, ".github", "workflows", "sync-labels.yml");
  assert.ok(existsSync(syncWorkflowPath), ".github/workflows/sync-labels.yml must exist");

  const content = await readFile(syncWorkflowPath, "utf8");

  // Triggers
  assert.match(content, /push:/, "Workflow must trigger on push");
  assert.match(content, /\.github\/labels\.yml/, "Workflow must trigger on changes to .github/labels.yml");
  assert.match(content, /workflow_dispatch:/, "Workflow must support workflow_dispatch");

  // Permissions
  assert.match(content, /issues:\s*write/, "Workflow must require issues: write permission");
  assert.match(content, /contents:\s*read/, "Workflow must require contents: read permission");

  // Pinned action commit SHAs
  assert.match(
    content,
    /actions\/checkout@11bd71901bbe5b1630ceea73d27597364c9af683/,
    "actions/checkout must be pinned to full commit SHA",
  );
  assert.match(
    content,
    /kjanat\/github-labelmanager@e968d59fb16afae3a977f7620089e14ac3bd8872/,
    "kjanat/github-labelmanager must be pinned to full commit SHA",
  );
});

test("dependabot.yml configures npm and github-actions updates on weekly schedule", async () => {
  const dependabotPath = join(ROOT, ".github", "dependabot.yml");
  assert.ok(existsSync(dependabotPath), ".github/dependabot.yml must exist");

  const content = await readFile(dependabotPath, "utf8");

  assert.match(content, /^version:\s*2/m, "dependabot.yml must declare version 2");
  assert.match(content, /package-ecosystem:\s*"npm"/, "dependabot.yml must configure npm ecosystem");
  assert.match(content, /package-ecosystem:\s*"github-actions"/, "dependabot.yml must configure github-actions ecosystem");
  assert.match(content, /interval:\s*"weekly"/, "dependabot.yml must configure weekly updates");
  assert.match(content, /day:\s*"monday"/, "dependabot.yml schedule must be Monday");
  assert.match(content, /prefix:\s*"chore\(deps\)"/, "dependabot.yml commit prefix must be chore(deps)");
  assert.match(content, /-\s*"deuriib"/, "dependabot.yml must configure reviewer deuriib");
});

test("FUNDING.yml is clean and points to github: [deuriib] without stale noise", async () => {
  const fundingPath = join(ROOT, ".github", "FUNDING.yml");
  assert.ok(existsSync(fundingPath), ".github/FUNDING.yml must exist");

  const content = await readFile(fundingPath, "utf8");
  assert.match(content, /github:\s*\[deuriib\]/, "FUNDING.yml must declare github: [deuriib]");
  assert.ok(!content.includes("brew-browser"), "FUNDING.yml must not contain stale brew-browser references");
});
