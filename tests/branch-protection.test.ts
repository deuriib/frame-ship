import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("production-main.json ruleset satisfies GitHub Ruleset requirements for main", async () => {
  const rulesetPath = join(ROOT, ".github", "rulesets", "production-main.json");
  assert.ok(existsSync(rulesetPath), ".github/rulesets/production-main.json must exist");

  const content = await readFile(rulesetPath, "utf8");
  const ruleset = JSON.parse(content);

  // Target and enforcement
  assert.strictEqual(ruleset.target, "branch", "Target must be branch");
  assert.strictEqual(ruleset.enforcement, "active", "Enforcement must be active");
  assert.deepStrictEqual(
    ruleset.conditions.ref_name.include,
    ["~DEFAULT_BRANCH"],
    "Must target ~DEFAULT_BRANCH",
  );

  // Rules present
  const ruleTypes = ruleset.rules.map((r: { type: string }) => r.type);
  assert.ok(ruleTypes.includes("deletion"), "Must include deletion rule");
  assert.ok(ruleTypes.includes("non_fast_forward"), "Must include non_fast_forward rule");
  assert.ok(ruleTypes.includes("required_linear_history"), "Must include required_linear_history rule");
  assert.ok(ruleTypes.includes("pull_request"), "Must include pull_request rule");
  assert.ok(ruleTypes.includes("required_status_checks"), "Must include required_status_checks rule");

  // Pull request parameters (tailored for solo maintainer governance: PR workflow required, 0 external approvals required)
  const prRule = ruleset.rules.find((r: { type: string }) => r.type === "pull_request");
  assert.strictEqual(
    prRule.parameters.required_approving_review_count,
    0,
    "Solo maintainer mode: required_approving_review_count must be 0 to avoid author self-approval deadlock",
  );
  assert.strictEqual(
    prRule.parameters.require_code_owner_review,
    false,
    "Solo maintainer mode: require_code_owner_review must be false to avoid author self-approval deadlock",
  );
  assert.strictEqual(prRule.parameters.required_review_thread_resolution, true, "Must resolve all review threads");

  // Status checks parameters
  const statusRule = ruleset.rules.find((r: { type: string }) => r.type === "required_status_checks");
  assert.strictEqual(
    statusRule.parameters.strict_required_status_checks_policy,
    true,
    "Strict required status checks policy must be enabled",
  );
  const contexts = statusRule.parameters.required_status_checks.map((c: { context: string }) => c.context);
  assert.ok(contexts.includes("Typecheck"), "Must require Typecheck check context");
  assert.ok(contexts.includes("Unit & Contract Tests"), "Must require Unit & Contract Tests check context");
  assert.ok(
    contexts.includes("Verify Documentation Commands"),
    "Must require Verify Documentation Commands check context",
  );
});

test("enterprise-main-spec.json includes Conventional Commits regex pattern and enterprise parameters", async () => {
  const specPath = join(ROOT, ".github", "rulesets", "enterprise-main-spec.json");
  assert.ok(existsSync(specPath), ".github/rulesets/enterprise-main-spec.json must exist");

  const content = await readFile(specPath, "utf8");
  const spec = JSON.parse(content);

  const commitRule = spec.rules.find((r: { type: string }) => r.type === "commit_message_pattern");
  assert.ok(commitRule, "Enterprise spec must define commit_message_pattern rule");
  assert.strictEqual(commitRule.parameters.operator, "regex", "Operator must be regex");
  assert.ok(
    commitRule.parameters.pattern.includes("feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert"),
    "Commit message pattern must match Conventional Commits prefixes",
  );

  // Validate regex against valid and invalid messages
  const regex = new RegExp(commitRule.parameters.pattern);
  assert.ok(regex.test("feat: add new feature"), "Valid conventional commit must pass regex");
  assert.ok(regex.test("fix(core): resolve race condition"), "Valid scoped conventional commit must pass regex");
  assert.ok(regex.test("chore!: breaking release"), "Valid breaking change conventional commit must pass regex");
  assert.ok(!regex.test("bad commit message without type"), "Invalid commit message must fail regex");
  assert.ok(!regex.test("WIP: unfinished work"), "WIP commit message must fail regex");
});
