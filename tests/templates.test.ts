import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("issue templates exist as YAML forms and no blank templates exist", async () => {
  const templateDir = join(ROOT, ".github", "ISSUE_TEMPLATE");
  assert.ok(existsSync(templateDir), ".github/ISSUE_TEMPLATE directory must exist");

  const files = await readdir(templateDir);

  // Assert required template files exist
  assert.ok(files.includes("1-bug-report.yml"), "1-bug-report.yml must exist");
  assert.ok(files.includes("2-feature-request.yml"), "2-feature-request.yml must exist");
  assert.ok(files.includes("config.yml"), "config.yml must exist");

  // Assert no blank markdown templates in ISSUE_TEMPLATE directory
  const mdTemplates = files.filter((f) => f.endsWith(".md"));
  assert.strictEqual(mdTemplates.length, 0, "No markdown issue templates allowed; use YAML forms");

  // Verify 1-bug-report.yml
  const bugReportContent = await readFile(join(templateDir, "1-bug-report.yml"), "utf8");
  assert.match(bugReportContent, /^name:\s*Bug Report/m, "Bug report must have name 'Bug Report'");
  assert.match(bugReportContent, /title:\s*["']\[Bug\]:\s*["']/m, "Bug report title must start with '[Bug]: '");
  assert.match(bugReportContent, /labels:.*"bug".*"triage"/s, "Bug report labels must include 'bug' and 'triage'");
  assert.match(bugReportContent, /id:\s*description/m, "Bug report must include description field");
  assert.match(bugReportContent, /id:\s*steps-to-reproduce/m, "Bug report must include steps-to-reproduce field");
  assert.match(bugReportContent, /id:\s*expected-behavior/m, "Bug report must include expected-behavior field");
  assert.match(bugReportContent, /id:\s*actual-behavior/m, "Bug report must include actual-behavior field");
  assert.match(bugReportContent, /id:\s*environment/m, "Bug report must include environment field");
  assert.match(bugReportContent, /render:\s*shell/m, "Bug report logs must specify render: shell");

  // Verify 2-feature-request.yml
  const featureContent = await readFile(join(templateDir, "2-feature-request.yml"), "utf8");
  assert.match(featureContent, /^name:\s*Feature Request/m, "Feature request must have name 'Feature Request'");
  assert.match(featureContent, /title:\s*["']\[Feat\]:\s*["']/m, "Feature request title must start with '[Feat]: '");
  assert.match(featureContent, /labels:.*"enhancement".*"triage"/s, "Feature request labels must include 'enhancement' and 'triage'");
  assert.match(featureContent, /id:\s*problem/m, "Feature request must include problem field");
  assert.match(featureContent, /id:\s*proposed-solution/m, "Feature request must include proposed-solution field");
  assert.match(featureContent, /id:\s*alternatives/m, "Feature request must include alternatives field");
  assert.match(featureContent, /id:\s*domain/m, "Feature request must include domain selection");

  // Verify config.yml
  const configContent = await readFile(join(templateDir, "config.yml"), "utf8");
  assert.match(configContent, /^blank_issues_enabled:\s*false/m, "blank_issues_enabled must be false");
  assert.match(configContent, /Community Discussions/, "config.yml must route to Community Discussions");
  assert.match(configContent, /Security Vulnerability Reporting/, "config.yml must route to Security Vulnerability Reporting");
  assert.match(configContent, /Support and Guidance/, "config.yml must route to Support and Guidance");
});

test("pull request template is structured with checklist, breaking changes, and DCO sign-off", async () => {
  const prTemplatePath = join(ROOT, ".github", "PULL_REQUEST_TEMPLATE.md");
  assert.ok(existsSync(prTemplatePath), ".github/PULL_REQUEST_TEMPLATE.md must exist");

  const content = await readFile(prTemplatePath, "utf8");
  assert.ok(content.length > 200, "PR template must not be empty or blank");
  assert.match(content, /## Description/m, "PR template must have Description section");
  assert.match(content, /## Type of Change/m, "PR template must have Type of Change section");
  assert.match(content, /## Related Issue/m, "PR template must have Related Issue section");
  assert.match(content, /## Breaking Changes/m, "PR template must have Breaking Changes section");
  assert.match(content, /## Self-Review Checklist/m, "PR template must have Self-Review Checklist");
  assert.match(content, /Developer Certificate of Origin \(DCO\)/m, "PR template must require DCO sign-off");
  assert.match(content, /Signed-off-by/m, "PR template must reference Signed-off-by");
});
