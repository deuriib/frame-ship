import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WORKFLOWS_DIR = join(ROOT, ".github", "workflows");

async function getWorkflowFiles(): Promise<{ filename: string; filepath: string; content: string }[]> {
  assert.ok(existsSync(WORKFLOWS_DIR), ".github/workflows directory must exist");
  const files = await readdir(WORKFLOWS_DIR);
  const yamlFiles = files.filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));
  assert.ok(yamlFiles.length >= 3, `Expected at least 3 workflow files, found ${yamlFiles.length}`);

  return Promise.all(
    yamlFiles.map(async (filename) => {
      const filepath = join(WORKFLOWS_DIR, filename);
      const content = await readFile(filepath, "utf8");
      return { filename, filepath, content };
    }),
  );
}

test("every workflow file declares explicit top-level permissions and zero write-all permissions", async () => {
  const workflows = await getWorkflowFiles();

  for (const { filename, content } of workflows) {
    // Check for top-level permissions before jobs:
    const jobsIndex = content.indexOf("\njobs:");
    assert.ok(jobsIndex > 0, `${filename} must declare a jobs: section`);

    const preJobsContent = content.slice(0, jobsIndex);
    assert.match(
      preJobsContent,
      /(?:^|\n)permissions:\s*\n/,
      `${filename} must declare an explicit top-level permissions: block before jobs:`,
    );

    // Ensure zero write-all permissions anywhere
    assert.ok(
      !content.includes("write-all"),
      `${filename} must not contain wildcard 'write-all' permissions`,
    );
  }
});

test("every workflow file configures concurrency controls", async () => {
  const workflows = await getWorkflowFiles();

  for (const { filename, content } of workflows) {
    assert.match(
      content,
      /(?:^|\n)concurrency:\s*\n\s+group:/,
      `${filename} must configure a concurrency group`,
    );
  }
});

test("every workflow file pins 100% of actions to 40-character commit SHAs", async () => {
  const workflows = await getWorkflowFiles();
  let totalActionCount = 0;

  for (const { filename, content } of workflows) {
    const lines = content.split("\n");
    let fileActionCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line.startsWith("#") && line.includes("uses:")) {
        fileActionCount++;
        totalActionCount++;

        // Exclude local workflow steps like `./.github/...` if any
        if (line.includes("uses: ./")) continue;

        // Pattern matching: uses: owner/repo@sha # optional-comment
        const match = line.match(/uses:\s*['"]?([a-zA-Z0-9_\-\./]+)@([^#\s'"]+)/);
        assert.ok(
          match,
          `${filename}:${i + 1} uses statement must match owner/repo@ref: "${line}"`,
        );

        const actionName = match[1];
        const ref = match[2];

        // Ensure not using mutable tags or branches
        assert.ok(
          !/^(v\d|main|master|latest|develop)/i.test(ref),
          `${filename}:${i + 1} action ${actionName} must not use mutable tag/branch "${ref}"`,
        );

        // Ensure ref is a 40-character hexadecimal commit SHA
        assert.match(
          ref,
          /^[a-f0-9]{40}$/i,
          `${filename}:${i + 1} action ${actionName} must use full 40-character commit SHA, found "${ref}"`,
        );
      }
    }

    assert.ok(fileActionCount > 0, `${filename} must contain at least one action step`);
  }

  assert.ok(totalActionCount >= 5, `Expected at least 5 action steps across workflows, found ${totalActionCount}`);
});

test("ci.yml satisfies strict hardening mandate and executes documentation commands", async () => {
  const ciPath = join(WORKFLOWS_DIR, "ci.yml");
  assert.ok(existsSync(ciPath), "ci.yml must exist");
  const content = await readFile(ciPath, "utf8");

  // Triggers
  assert.match(content, /pull_request:\s*(?:\n|$)/, "ci.yml must trigger on pull_request");
  assert.match(content, /push:\s*\n\s+branches:\s*\[main\]/, "ci.yml must trigger on push to main");

  // Top-level permissions
  assert.match(content, /permissions:\s*\n\s+contents:\s*read/, "ci.yml top-level must be contents: read");

  // Concurrency
  assert.match(content, /cancel-in-progress:\s*true/, "ci.yml concurrency must cancel in progress");

  // Specific pinned actions
  assert.match(
    content,
    /actions\/checkout@11bd71901bbe5b1630ceea73d27597364c9af683\s+#\s*v4\.2\.2/,
    "ci.yml must pin actions/checkout to 11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2",
  );
  assert.match(
    content,
    /actions\/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af\s+#\s*v4\.1\.0/,
    "ci.yml must pin actions/setup-node to 39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0",
  );

  // Node version
  assert.match(content, /node-version:\s*24\.22\.1/, "ci.yml must specify node-version 24.22.1");

  // Jobs
  assert.match(content, /typecheck:/, "ci.yml must contain typecheck job");
  assert.match(content, /npm run typecheck/, "ci.yml must execute npm run typecheck");

  assert.match(content, /test:/, "ci.yml must contain test job");
  assert.match(content, /npm test/, "ci.yml must execute npm test");

  assert.match(content, /docs-test:/, "ci.yml must contain docs-test job");
  assert.match(
    content,
    /echo '\{"invocationNum": 0\}' \| node scripts\/context-inject\.ts/,
    "ci.yml must execute README/CONTRIBUTING onboarding verification command",
  );
});

test("release.yml defines tag-triggered release with scoped permissions and asset digest", async () => {
  const releasePath = join(WORKFLOWS_DIR, "release.yml");
  assert.ok(existsSync(releasePath), "release.yml must exist");
  const content = await readFile(releasePath, "utf8");

  // Trigger on semver tags
  assert.match(content, /tags:\s*\n\s+-\s*["']v\*\.\*\.\*["']/, "release.yml must trigger on tags: ['v*.*.*']");

  // Top-level permissions default to read
  assert.match(content, /permissions:\s*\n\s+contents:\s*read/, "release.yml top-level must default to contents: read");

  // Job-level permissions scoped to write and gated to repo
  assert.match(
    content,
    /if:\s*github\.repository\s*==\s*['"]deuriib\/frame-ship['"]/,
    "release.yml job must be gated to base repository deuriib/frame-ship",
  );
  assert.match(
    content,
    /permissions:\s*\n\s+contents:\s*write/,
    "release.yml release job must scope contents: write",
  );

  // Pinned actions
  assert.match(
    content,
    /actions\/checkout@11bd71901bbe5b1630ceea73d27597364c9af683/,
    "release.yml must pin actions/checkout to commit SHA",
  );
  assert.match(
    content,
    /softprops\/action-gh-release@c062e08bd532815e2082a85e87e3ef29c3e6d191\s+#\s*v2\.0\.8/,
    "release.yml must pin softprops/action-gh-release to commit SHA",
  );

  // Artifact packing and cryptographic digest
  assert.match(content, /npm pack/, "release.yml must package npm tarball");
  assert.match(content, /sha256sum/, "release.yml must compute sha256 checksum");
  assert.match(content, /SHA256SUMS/, "release.yml must output SHA256SUMS asset");
});
