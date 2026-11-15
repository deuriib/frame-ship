import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

async function* walk(dir: string, extension = ".md"): AsyncGenerator<string> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full, extension);
    } else if (entry.isFile() && (extension === "" || entry.name.endsWith(extension))) {
      yield full;
    }
  }
}

test("every rule file declares a valid trigger (never the triger: typo)", async () => {
  const rulesDir = join(ROOT, "rules");
  const files: string[] = [];
  for await (const f of walk(rulesDir)) files.push(f);
  assert.ok(files.length > 0, "no rule files found under rules/");
  for (const f of files) {
    const raw = await readFile(f, "utf8");
    const rel = f.slice(rulesDir.length + 1);
    const fence = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(fence, `${rel}: no frontmatter`);
    assert.ok(
      /^\s*trigger\s*:\s*(always_on|model_decision)\s*$/m.test(fence[1]),
      `${rel}: missing or invalid "trigger:" frontmatter`,
    );
    assert.ok(!/^\s*triger\s*:/m.test(fence[1]), `${rel}: typo "triger:"`);
  }
});

test(".gitignore ignores .frame-ship/, .worktrees/, and .omp/", async () => {
  const gitignoreContent = await readFile(join(ROOT, ".gitignore"), "utf8");
  assert.match(gitignoreContent, /^\.frame-ship\//m, ".gitignore must contain .frame-ship/");
  assert.match(gitignoreContent, /^\.worktrees\//m, ".gitignore must contain .worktrees/");
  assert.match(gitignoreContent, /^\.omp\//m, ".gitignore must contain .omp/");

  // Verify git check-ignore exits with 0 for each path individually (-q requires single pathname)
  assert.doesNotThrow(() => {
    execSync("git check-ignore -q .frame-ship/", { cwd: ROOT, stdio: "pipe" });
    execSync("git check-ignore -q .frame-ship/engineering/PROPOSED_CHANGES.md", { cwd: ROOT, stdio: "pipe" });
    execSync("git check-ignore -q .worktrees/", { cwd: ROOT, stdio: "pipe" });
    execSync("git check-ignore -q .omp/", { cwd: ROOT, stdio: "pipe" });
  }, "git check-ignore must recognize .frame-ship/, .worktrees/, and .omp/ as ignored");
});

test("agents/ directory, agents plugin and parser files do not exist", async () => {
  assert.strictEqual(existsSync(join(ROOT, "agents")), false, "agents/ directory must not exist");
  assert.strictEqual(
    existsSync(join(ROOT, ".opencode/plugins/agents.ts")),
    false,
    ".opencode/plugins/agents.ts must not exist",
  );
  assert.strictEqual(
    existsSync(join(ROOT, ".opencode/lib/agent-parse.ts")),
    false,
    ".opencode/lib/agent-parse.ts must not exist",
  );
  assert.strictEqual(
    existsSync(join(ROOT, "tests/agent-parse.test.ts")),
    false,
    "tests/agent-parse.test.ts must not exist",
  );

  const pluginJson = await readFile(join(ROOT, "plugin.json"), "utf8");
  assert.doesNotMatch(pluginJson, /"agents"/, "plugin.json must not reference agents");

  const frameShipPlugin = await readFile(join(ROOT, ".opencode/plugins/frame-ship.ts"), "utf8");
  assert.doesNotMatch(frameShipPlugin, /\bagents\b/, ".opencode/plugins/frame-ship.ts must not reference agents");
});

test("zero files contain docs/frame-ship/workspace or stale delivery/HANDOFF.md", async () => {
  const targetDirs = [
    join(ROOT, "skills"),
    join(ROOT, "rules"),
    join(ROOT, ".opencode"),
  ];
  const targetFiles = [
    join(ROOT, "AGENTS.md"),
    join(ROOT, "README.md"),
  ];

  for (const dir of targetDirs) {
    for await (const file of walk(dir, "")) {
      const content = await readFile(file, "utf8");
      assert.doesNotMatch(
        content,
        /docs\/frame-ship\/workspace/,
        `${file} contains obsolete docs/frame-ship/workspace reference`,
      );
      assert.doesNotMatch(
        content,
        /docs\/frame-ship\/delivery\/HANDOFF\.md/,
        `${file} contains obsolete docs/frame-ship/delivery/HANDOFF.md reference`,
      );
    }
  }

  for (const file of targetFiles) {
    if (existsSync(file)) {
      const content = await readFile(file, "utf8");
      assert.doesNotMatch(
        content,
        /docs\/frame-ship\/workspace/,
        `${file} contains obsolete docs/frame-ship/workspace reference`,
      );
      assert.doesNotMatch(
        content,
        /docs\/frame-ship\/delivery\/HANDOFF\.md/,
        `${file} contains obsolete docs/frame-ship/delivery/HANDOFF.md reference`,
      );
    }
  }
});

test("zero files in skills/ contain agent persona names or hardcoded agent slugs", async () => {
  const personaRegex = /\b(montilla|vasquez|barrera|subero|dauhajre|vera|montero|santana|espinoza)\b/i;
  const slugRegex = /\b(engineering-specialist|security-specialist|legal-specialist|marketing-specialist|finance-specialist|revenue-specialist|people-specialist|automation-specialist|brand-reviewer|people-reviewer|revenue-reviewer|automation-reviewer|data-engineer|privacy-engineer)\b/;
  const templateCheckRegex = /agent templates?|\{\{AGENT_ROLE\}\}|\*\*Agent:\*\*|## Next Agent/i;

  const skillsDir = join(ROOT, "skills");
  for await (const file of walk(skillsDir)) {
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(content, personaRegex, `${file} contains agent persona name`);
    assert.doesNotMatch(content, slugRegex, `${file} contains hardcoded agent slug`);
    assert.doesNotMatch(content, templateCheckRegex, `${file} contains agent template reference`);
  }
});

test("all 16 specialized review skills are properly configured", async () => {
  const expectedReviewSkills = [
    "review-architecture",
    "review-automation",
    "review-data",
    "review-finance",
    "review-legal",
    "review-marketing",
    "review-observability",
    "review-people",
    "review-quality-assurance",
    "review-readability",
    "review-refuter",
    "review-reliability",
    "review-resilience",
    "review-revenue",
    "review-risk",
    "review-security",
  ];

  for (const skillName of expectedReviewSkills) {
    const skillPath = join(ROOT, "skills", skillName, "SKILL.md");
    assert.strictEqual(existsSync(skillPath), true, `SKILL.md must exist for ${skillName}`);

    const raw = await readFile(skillPath, "utf8");
    const fence = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(fence, `${skillName}/SKILL.md missing frontmatter`);
    assert.match(
      fence[1],
      new RegExp(`^\\s*name\\s*:\\s*${skillName}\\s*$`, "m"),
      `${skillName}/SKILL.md frontmatter name must match directory name`,
    );

    const refDir = join(ROOT, "skills", skillName, "references");
    assert.strictEqual(existsSync(refDir), true, `references/ directory must exist for ${skillName}`);
  }
});

test("skills specify .frame-ship/ for ephemeral artifacts and promotion to docs/frame-ship/archive/<spec-id>/", async () => {
  const proposeChanges = await readFile(join(ROOT, "skills/propose-changes/SKILL.md"), "utf8");
  assert.match(proposeChanges, /\.frame-ship\/<domain>\/PROPOSED_CHANGES\.md/, "propose-changes must reference .frame-ship/");

  const qualityGate = await readFile(join(ROOT, "skills/quality-gate/SKILL.md"), "utf8");
  assert.match(qualityGate, /\.frame-ship\/quality-gate\/<spec-id>/, "quality-gate must reference .frame-ship/");

  const shipRelease = await readFile(join(ROOT, "skills/ship-release/SKILL.md"), "utf8");
  assert.match(
    shipRelease,
    /docs\/frame-ship\/archive\/<spec-id>\//,
    "ship-release must specify promoting into docs/frame-ship/archive/<spec-id>/",
  );
  assert.match(
    shipRelease,
    /\.frame-ship\/<domain>\/\{PROPOSED_CHANGES/,
    "ship-release must specify purge allowlist under .frame-ship/",
  );
});
