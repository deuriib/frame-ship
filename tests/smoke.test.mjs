/**
 * smoke.test.mjs — zero-dependency smoke suite (node:test + node:assert only).
 *
 * Covers SPEC-repo-hygiene REQ-002:
 *   (a) SKILL_DIRS registry ↔ skills/ directory sync (count, frontmatter, bidirectional).
 *   (b) Marker idempotency guard present + preceding every event.system.push in BOTH
 *       session hooks (source-structural — dropping a guard turns this red).
 *   (c) Antigravity hook fixture replays via `node` spawn (same contract as hooks.json,
 *       runtime type-strips .ts natively): safety-gate allow→pass / deny→blocked,
 *       context-inject first→injects / later→no-op, format-note→{}.
 *
 * Run: node --test tests/
 */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_TS = join(ROOT, "plugins", "opencode", "skills.ts");
const SKILLS_DIR = join(ROOT, "skills");
const HOOKS_DIR = join(ROOT, "plugins", "antigravity", "hooks");
const FIXTURES_DIR = join(HOOKS_DIR, "fixtures");

/** Mirror of skills.ts parseSkillFile frontmatter shape (name + description only). */
function parseFrontmatter(raw) {
  const text = String(raw ?? "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!fence) return { name: "", description: "" };
  const frontmatter = fence[1];
  const pick = (key) => {
    const m = frontmatter.match(
      new RegExp(`^\\s*${key}\\s*:\\s*(?:"([^"]*)"|'([^']*)'|(.*?))\\s*$`, "m"),
    );
    return (m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim();
  };
  return { name: pick("name"), description: pick("description") };
}

/** Parse the SKILL_DIRS array literal straight from skills.ts source text. */
function skillDirsFromSource() {
  const src = readFileSync(SKILLS_TS, "utf8");
  const m = src.match(/const SKILL_DIRS = \[([\s\S]*?)\] as const/);
  assert.ok(
    m,
    "SKILL_DIRS array not found between `const SKILL_DIRS = [` and `] as const`",
  );
  const entries = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  return { src, entries };
}

// ---------------------------------------------------------------- (a) registry

test("(a) SKILL_DIRS registers exactly 12 entries", () => {
  const { entries } = skillDirsFromSource();
  assert.equal(entries.length, 12, `expected 12 SKILL_DIRS entries, got ${entries.length}: ${entries.join(", ")}`);
  assert.equal(new Set(entries).size, entries.length, "duplicate entries in SKILL_DIRS");
});

test("(a) every SKILL_DIRS entry ships SKILL.md with name==dir and non-empty description", () => {
  const { entries } = skillDirsFromSource();
  for (const dir of entries) {
    const file = join(SKILLS_DIR, dir, "SKILL.md");
    assert.ok(
      existsSync(file),
      `skills/${dir}/SKILL.md missing — SKILL_DIRS points at a non-existent skill dir`,
    );
    const fm = parseFrontmatter(readFileSync(file, "utf8"));
    assert.equal(fm.name, dir, `skills/${dir}/SKILL.md frontmatter name must equal dir, got "${fm.name}"`);
    assert.ok(fm.description.length > 0, `skills/${dir}/SKILL.md frontmatter description is empty`);
  }
});

test("(a) bidirectional: every top-level skills/ dir appears in SKILL_DIRS", () => {
  const { entries } = skillDirsFromSource();
  const dirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const d of dirs) {
    assert.ok(
      entries.includes(d),
      `skills/${d}/ exists but is NOT registered in SKILL_DIRS — a new unregistered skill dir fails this test`,
    );
  }
});

// ------------------------------------------------- (b) marker idempotency (source-structural)

const GUARD_RE = /if \(hasMarker\(event\.system\)\) return;/g;

/**
 * Extract each `ctx.session.hook("<name>", (event) => { ... })` body via
 * brace matching from the callback's opening brace. Bodies contain only
 * balanced object literals (no braces inside string literals), so a plain
 * depth counter is exact here.
 */
function extractHookBodies(src) {
  const heads = /ctx\.session\.hook\("([a-z]+)",\s*\(event\)\s*=>\s*\{/g;
  const bodies = [];
  let m;
  while ((m = heads.exec(src)) !== null) {
    let depth = 1; // opening `{` consumed by the regex above
    let i = heads.lastIndex;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
      i += 1;
    }
    bodies.push({ hook: m[1], body: src.slice(heads.lastIndex, i - 1) });
  }
  return bodies;
}

test("(b) hasMarker guard appears on both context and compaction hooks, before every push", () => {
  const { src } = skillDirsFromSource();

  const guardCount = (src.match(GUARD_RE) || []).length;
  assert.ok(
    guardCount >= 2,
    `expected at least 2 \`if (hasMarker(event.system)) return;\` guards (context + compaction hooks), found ${guardCount}`,
  );

  const bodies = extractHookBodies(src);
  assert.ok(bodies.some((b) => b.hook === "context"), "context hook body not found in skills.ts");
  assert.ok(bodies.some((b) => b.hook === "compaction"), "compaction hook body not found in skills.ts");

  for (const { hook, body } of bodies) {
    const pushIdx = body.indexOf("event.system.push(");
    assert.ok(
      pushIdx !== -1,
      `${hook} hook body must contain event.system.push( — body extractor sanity check failed`,
    );
    const guardIdx = body.search(GUARD_RE);
    assert.ok(guardIdx !== -1, `${hook} hook is MISSING the hasMarker idempotency guard`);
    assert.ok(
      guardIdx < pushIdx,
      `${hook} hook: hasMarker guard must precede event.system.push (guard at ${guardIdx}, push at ${pushIdx})`,
    );
  }
});

// ----------------------------------------------------- (c) hook fixture replays

/** Spawn a hook via `node` (hooks.json contract) feeding a committed fixture on stdin. */
function runHook(hookFile, fixtureFile) {
  const hook = join(HOOKS_DIR, hookFile);
  const input = readFileSync(join(FIXTURES_DIR, fixtureFile), "utf8");
  const res = spawnSync(process.execPath, [hook], {
    input,
    encoding: "utf8",
    cwd: ROOT,
    timeout: 15000,
  });
  assert.equal(res.error, undefined, `${hookFile} failed to spawn: ${res.error?.message}`);
  assert.equal(res.signal, null, `${hookFile} terminated by signal ${res.signal}`);
  return res;
}

test("(c) safety-gate replays allow fixture → passes", () => {
  const r = runHook("safety-gate.ts", "pretool-allow.json");
  assert.equal(r.status, 0, `safety-gate must exit 0 on handled payload (got ${r.status}; stderr: ${r.stderr})`);
  const out = JSON.parse(r.stdout.trim());
  assert.equal(out.decision, "allow", `allow fixture must pass, got: ${r.stdout.trim()}`);
  assert.ok(typeof out.reason === "string" && out.reason.length > 0, "allow decision must carry a reason");
});

test("(c) safety-gate replays deny fixture → blocked", () => {
  const r = runHook("safety-gate.ts", "pretool-deny.json");
  // Real contract: exit 0 always on handled payload — the block travels as decision "deny".
  assert.equal(r.status, 0, `safety-gate must exit 0 on handled payload (got ${r.status}; stderr: ${r.stderr})`);
  const out = JSON.parse(r.stdout.trim());
  assert.equal(out.decision, "deny", `deny fixture must be blocked, got: ${r.stdout.trim()}`);
  assert.ok(out.reason.startsWith("Blocked:"), `deny reason must name the blocking rule, got: ${out.reason}`);
  // Contract: reason names the RULE, never echoes the matched value (no exfil via reason/logs).
  assert.ok(
    !out.reason.includes("rm -rf") && !out.reason.includes("/tmp/x"),
    `deny reason must not echo the matched command value, got: ${out.reason}`,
  );
});

test("(c) context-inject replays first-invocation fixture → injects bootstrap", () => {
  const r = runHook("context-inject.ts", "preinvocation-first.json");
  assert.equal(r.status, 0, `context-inject must exit 0 (got ${r.status}; stderr: ${r.stderr})`);
  const out = JSON.parse(r.stdout.trim());
  assert.ok(
    Array.isArray(out.injectSteps) && out.injectSteps.length > 0,
    `first invocation must inject via injectSteps, got: ${r.stdout.trim()}`,
  );
  const msg = out.injectSteps[0].ephemeralMessage;
  assert.equal(typeof msg, "string", "injectSteps[0].ephemeralMessage must be a string");
  assert.ok(
    msg.includes("frame-ship:using-frame-ship bootstrap:"),
    "injected message must carry the bootstrap label",
  );
  // The live SKILL.md body must be embedded (not the silent fallback).
  const body = readFileSync(join(SKILLS_DIR, "using-frame-ship", "SKILL.md"), "utf8").trim();
  const chunk = body.slice(0, 60);
  assert.ok(chunk.length > 0 && msg.includes(chunk), "injected message must embed the live using-frame-ship SKILL.md body");
});

test("(c) context-inject replays later-invocation fixture → no injection", () => {
  const laterFixture = JSON.parse(readFileSync(join(FIXTURES_DIR, "preinvocation-compact.json"), "utf8"));
  assert.ok(laterFixture.invocationNum > 0, "later-invocation fixture must carry invocationNum > 0 to be a valid replay");

  const r = runHook("context-inject.ts", "preinvocation-compact.json");
  assert.equal(r.status, 0, `context-inject must exit 0 (got ${r.status}; stderr: ${r.stderr})`);
  const raw = r.stdout.trim();
  assert.equal(raw, "{}", `later invocation must emit exactly {} (no injection), got: ${raw}`);
  assert.equal(JSON.parse(raw).injectSteps, undefined, "later invocation must not inject steps");
});

test("(c) format-note replays ok fixture → stdout trimmed is {}", () => {
  const r = runHook("format-note.ts", "posttool-ok.json");
  assert.equal(r.status, 0, `format-note must exit 0 (got ${r.status}; stderr: ${r.stderr})`);
  assert.equal(r.stdout.trim(), "{}", `format-note must emit exactly {}, got: ${JSON.stringify(r.stdout)}`);
});
