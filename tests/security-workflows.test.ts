import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("codeql.yml workflow is configured with pinned SHAs, security permissions, and schedule", async () => {
  const codeqlPath = join(ROOT, ".github", "workflows", "codeql.yml");
  assert.ok(existsSync(codeqlPath), ".github/workflows/codeql.yml must exist");

  const content = await readFile(codeqlPath, "utf8");

  // Verify triggers
  assert.match(content, /push:\s*\n\s*branches:\s*\[main\]/, "CodeQL must trigger on push to main");
  assert.match(content, /pull_request:\s*\n\s*branches:\s*\[main\]/, "CodeQL must trigger on pull_request to main");
  assert.match(content, /cron:\s*['"]0 6 \* \* 1['"]/, "CodeQL must run on weekly Monday cron schedule '0 6 * * 1'");

  // Verify permissions
  assert.match(content, /permissions:\s*\n\s*contents:\s*read/, "Top-level permissions must be contents: read");
  assert.match(content, /security-events:\s*write/, "Job must grant security-events: write permission");

  // Verify action pins to 40-char full commit SHAs
  assert.match(
    content,
    /actions\/checkout@11bd71901bbe5b1630ceea73d27597364c9af683\s+#\s+v4\.2\.2/,
    "actions/checkout must be pinned to full commit SHA v4.2.2",
  );
  assert.match(
    content,
    /github\/codeql-action\/init@b56ba49b26e50535fa1e7f7db0f4f7b4765d08d1\s+#\s+v3\.28\.10/,
    "github/codeql-action/init must be pinned to full commit SHA v3.28.10",
  );
  assert.match(
    content,
    /github\/codeql-action\/analyze@b56ba49b26e50535fa1e7f7db0f4f7b4765d08d1\s+#\s+v3\.28\.10/,
    "github/codeql-action/analyze must be pinned to full commit SHA v3.28.10",
  );

  // Verify language matrix
  assert.match(content, /javascript-typescript/, "CodeQL matrix must specify javascript-typescript");
});

test("dependency-review.yml workflow enforces high severity gating and license compliance", async () => {
  const depReviewPath = join(ROOT, ".github", "workflows", "dependency-review.yml");
  assert.ok(existsSync(depReviewPath), ".github/workflows/dependency-review.yml must exist");

  const content = await readFile(depReviewPath, "utf8");

  // Verify trigger
  assert.match(content, /pull_request:\s*\n\s*branches:\s*\[main\]/, "Dependency review must trigger on PR to main");

  // Verify permissions
  assert.match(content, /permissions:\s*\n\s*contents:\s*read/, "Permissions must be scoped to contents: read");

  // Verify pinned action commit SHA
  assert.match(
    content,
    /actions\/dependency-review-action@5a50f586e3b11f0b604d78294ff22708b7d7b39a\s+#\s+v4\.5\.0/,
    "actions/dependency-review-action must be pinned to full commit SHA v4.5.0",
  );

  // Verify severity and license config
  assert.match(content, /fail-on-severity:\s*high/, "Workflow must fail on high severity");
  assert.match(content, /license-check:\s*true/, "Workflow must enforce license checks");
});

test("SBOM artifacts exist and conform to CycloneDX and SPDX standards", async () => {
  const cdxPath = join(ROOT, ".frame-ship", "evidence", "hardening", "sbom.cdx.json");
  const spdxPath = join(ROOT, ".frame-ship", "evidence", "hardening", "sbom.spdx.json");

  assert.ok(existsSync(cdxPath), "CycloneDX SBOM must exist");
  assert.ok(existsSync(spdxPath), "SPDX SBOM must exist");

  const cdxContent = JSON.parse(await readFile(cdxPath, "utf8"));
  assert.strictEqual(cdxContent.bomFormat, "CycloneDX");
  assert.strictEqual(cdxContent.metadata.component.name, "frame-ship");
  assert.strictEqual(cdxContent.metadata.component.licenses[0].license.id, "MIT");

  const spdxContent = JSON.parse(await readFile(spdxPath, "utf8"));
  assert.strictEqual(spdxContent.spdxVersion, "SPDX-2.3");
  assert.strictEqual(spdxContent.packages[0].name, "frame-ship");
  assert.strictEqual(spdxContent.packages[0].licenseDeclared, "MIT");
});
