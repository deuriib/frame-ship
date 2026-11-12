import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseAgentFile,
  toOpenCodePermissions,
} from "../.opencode/lib/agent-parse.ts";

function perm(
  perms: Array<{ action: string; effect: string }>,
  action: string,
): string | undefined {
  return perms.find((p) => p.action === action)?.effect;
}

test("block-list tools parse and map to allow permissions", () => {
  const raw = `---
name: Test Agent
description: "Does the thing"
subagent: true
effort: medium
tools:
  - view_file
  - list_dir
  - write_to_file
  - run_command
---
Body`;
  const p = parseAgentFile(raw, "test.md");
  assert.equal(p.name, "Test Agent");
  assert.equal(p.subagent, true);
  assert.deepEqual(p.tools, ["view_file", "list_dir", "write_to_file", "run_command"]);
  const perms = toOpenCodePermissions(p.tools);
  assert.equal(perm(perms, "read"), "allow");
  assert.equal(perm(perms, "edit"), "allow");
  assert.equal(perm(perms, "shell"), "allow");
});

test("flow-list tools parse (never silent deny)", () => {
  const raw = `---
name: Test
subagent: true
tools: [view_file, list_dir, write_to_file]
---
Body`;
  const p = parseAgentFile(raw, "test.md");
  assert.deepEqual(p.tools, ["view_file", "list_dir", "write_to_file"]);
  const perms = toOpenCodePermissions(p.tools);
  assert.equal(perm(perms, "read"), "allow");
  assert.equal(perm(perms, "edit"), "allow");
});

test("malformed tools value throws", () => {
  const raw = `---
name: Test
subagent: true
tools: garbage
---
Body`;
  assert.throws(() => parseAgentFile(raw, "test.md"), /tools/);
});

test("empty tools: key throws", () => {
  const raw = `---
name: Test
subagent: true
tools:
---
Body`;
  assert.throws(() => parseAgentFile(raw, "test.md"), /tools/);
});

test("no tools key = deny by default (fail-closed)", () => {
  const raw = `---
name: Test
subagent: true
---
Body`;
  const p = parseAgentFile(raw, "test.md");
  assert.deepEqual(p.tools, []);
  const perms = toOpenCodePermissions(p.tools);
  assert.equal(perm(perms, "read"), "deny");
  assert.equal(perm(perms, "edit"), "deny");
  assert.equal(perm(perms, "shell"), "deny");
  assert.equal(perm(perms, "subagent"), "deny");
  // bootstrap/skill access stays allowed regardless of tool grants
  assert.equal(perm(perms, "skill"), "allow");
});
