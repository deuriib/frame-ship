import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseAgentFile } from "../.opencode/lib/agent-parse.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

async function* walk(dir: string): AsyncGenerator<string> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

test("every agent file parses with a non-empty tools list", async () => {
  const agentsDir = join(ROOT, "agents");
  const files: string[] = [];
  for await (const f of walk(agentsDir)) files.push(f);
  assert.ok(files.length > 0, "no agent files found under agents/");
  for (const f of files) {
    const raw = await readFile(f, "utf8");
    const rel = f.slice(agentsDir.length + 1);
    const p = parseAgentFile(raw, rel);
    assert.ok(p.name, `${rel}: missing name`);
    assert.ok(
      p.tools.length > 0,
      `${rel}: empty tools (deny-by-default) — declare a block or flow list`,
    );
  }
});

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
