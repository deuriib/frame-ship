/**
 * frame-ship-agents: agents plugin (id "frame-ship-agents") — Frame→Ship
 * agents lane (zero deps, V2-only). Source of truth: <repo-root>/agents/*.md
 * with frame-ship frontmatter, translated to OpenCode V2 agent files.
 * Version lockstep lives in ./shared.ts (header + const VERSION).
 * Provisions V2-native discovery files into the global route, reloads the
 * agent domain, enriches every discovered id in place, and enriches the
 * built-in plan/build agents with Frame→Ship lane descriptions (plan:
 * docs-only Frame lane, build: Ship lane executor, both with skill allow).
 * Location: plugins/opencode/agents.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents under one id).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import {
  VERSION,
  ensureDir,
  fileExists,
  readTextFile,
  resolveRepoDir,
  writeTextFile,
} from "./shared";

// V2's DEFAULT global discovery route (docs: locations): $XDG_CONFIG_HOME else
// $HOME/.config/opencode/agents — the one place V2 scans for every project.
// Env-based and zero-dep: reads process.env off globalThis (no node import, so
// tsc stays clean without @types/node) and never derives the path from
// ctx.location.directory — for the globally-symlinked install
// (~/.config/opencode/plugins/frame-ship.ts) that directory is the config dir,
// not the project, which is exactly why targeting it made discovery skip all
// 31 ids. XDG wins when set; HOME (POSIX) then USERPROFILE (win32) otherwise.
// Unresolvable (neither set) → "" and the caller skips provisioning: fail
// closed, never write to a guessed path discovery would not scan.
function resolveDefaultAgentsDir(): string {
  const env = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;
  const xdg = (env?.XDG_CONFIG_HOME || "").replace(/[/\\]+$/, "");
  if (xdg) return `${xdg}/opencode/agents`;
  const home = (env?.HOME || env?.USERPROFILE || "").replace(/[/\\]+$/, "");
  if (home) return `${home}/.config/opencode/agents`;
  return "";
}

// Canonical roster: <repo-root>/agents/<id>.md. Hardcoded (no readdir helper)
// so init I/O stays bounded — one small read per id, miss skipped, never cached.
const AGENT_FILES = [
  "orchestrator",
  "barrera",
  "dauhajre",
  "subero",
  "vera",
  "santana",
  "montero",
  "vasquez",
  "espinoza",
  "engineering-specialist",
  "security-specialist",
  "finance-specialist",
  "legal-specialist",
  "marketing-specialist",
  "people-specialist",
  "revenue-specialist",
  "automation-specialist",
  "security-reviewer",
  "finance-reviewer",
  "legal-reviewer",
  "people-reviewer",
  "revenue-reviewer",
  "automation-reviewer",
  "brand-reviewer",
  "quality-assurance",
  "review-data",
  "review-readability",
  "review-refuter",
  "review-reliability",
  "review-resilience",
  "review-risk",
] as const;

// FNV-1a 32-bit hex — zero-dep content hash so the provision manifest can tell
// our generated files apart from user-customized ones.
function hashText(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

// YAML double-quote escaping for single-line frontmatter scalars.
function yamlQuote(value: string): string {
  return `"${(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// ---- Agents lane: frame-ship frontmatter → OpenCode V2 --------------------
// Source of truth stays at <repo-root>/agents/*.md with frame-ship frontmatter:
//   name, description, mainAgent?, subagent?, effort?, tools:[custom names]
// OpenCode V2 wants: description, mode (primary|subagent|all), hidden, system
// (body), permissions:[{action, resource, effect}]. V2 renamed bash→shell and
// task→subagent; `tools` boolean map is deprecated. This wrapper is the only
// place that knows the translation — agents/*.md never carry V2 syntax.
// `effort` is parsed but deliberately NOT mapped (no `steps:` in V2 output —
// WIP decision; V2 default applies).
// V2 `AgentEditor` has no `add`, so setup() provisions V2-native discovery
// files first (~/.config/opencode/agents/<id>.md → id — the default global
// route, env-resolved), reloads the domain, then updates in place only
// (missing ids are skipped). File discovery owns id creation; the transform
// owns enrichment (description/mode/system/hidden).
interface ParsedAgent {
  name: string;
  description: string;
  mainAgent: boolean;
  subagent: boolean;
  effort: string;
  tools: string[];
  system: string;
}

function stripQuotes(value: string): string {
  const text = (value || "").trim();
  if (
    text.length >= 2 &&
    ((text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'")))
  ) {
    return text.slice(1, -1).trim();
  }
  return text;
}

function parseAgentFile(raw: string): ParsedAgent {
  const empty: ParsedAgent = {
    name: "",
    description: "",
    mainAgent: false,
    subagent: false,
    effort: "",
    tools: [],
    system: (raw || "").trim(),
  };
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!fence) return empty;
  const frontmatter = fence[1] || "";
  const nameMatch = frontmatter.match(
    /^\s*name\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const descMatch = frontmatter.match(
    /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const effortMatch = frontmatter.match(/^\s*effort\s*:\s*(\S+)\s*$/m);
  const toolsBlock = frontmatter.match(/^\s*tools\s*:\s*(?:\r?\n|$)((?:\s*-\s*.*(?:\r?\n|$))*)/m);
  const tools: string[] = [];
  if (toolsBlock) {
    for (const line of (toolsBlock[1] || "").split(/\r?\n/)) {
      const item = line.match(/^\s*-\s*(\S+)\s*$/);
      if (item) tools.push(item[1].trim());
    }
  }
  const body = text.slice(fence[0].length).trim();
  return {
    name: stripQuotes(nameMatch?.[1] ?? nameMatch?.[2] ?? nameMatch?.[3] ?? ""),
    description: stripQuotes(
      descMatch?.[1] ?? descMatch?.[2] ?? descMatch?.[3] ?? "",
    ),
    mainAgent: /^\s*mainAgent\s*:\s*true\s*$/m.test(frontmatter),
    subagent: /^\s*subagent\s*:\s*true\s*$/m.test(frontmatter),
    effort: (effortMatch?.[1] || "").trim().toLowerCase(),
    tools,
    system: body,
  };
}

// mainAgent+subagent → all (owners); mainAgent only → primary (orchestrator);
// anything else → subagent (specialists, reviewers). Never defaults to primary
// except for the explicit orchestrator shape, so a malformed flag fails closed.
function toOpenCodeMode(
  mainAgent: boolean,
  subagent: boolean,
): "primary" | "subagent" | "all" {
  if (mainAgent && subagent) return "all";
  if (mainAgent) return "primary";
  return "subagent";
}

// Custom frame-ship tools → V2 permission actions. Only actions we explicitly
// own are emitted; websearch/external_directory inherit the base policy.
//   view_file|list_dir → read | find_by_name → glob | grep_search → grep
//   write_to_file|replace_file_content → edit | run_command → shell
//   invoke_subagent|manage_subagents|send_message → subagent
//   ask_question → question | read_url_content → webfetch | skill → always allow
// Least privilege in practice: shell allow only for 3 executors
// (engineering/automation-specialist, quality-assurance), subagent allow only
// for orchestrator+8 owners, question allow only for orchestrator, webfetch
// allow only for 3 research specialists.
function toOpenCodePermissions(
  frameTools: string[],
): Array<{ action: string; resource: string; effect: "allow" | "deny" }> {
  const has = (name: string): boolean => frameTools.includes(name);
  const read = has("view_file") || has("list_dir");
  const edit = has("write_to_file") || has("replace_file_content");
  const delegation = has("invoke_subagent") || has("manage_subagents") || has("send_message");
  return [
    { action: "read", resource: "*", effect: read ? "allow" : "deny" },
    { action: "glob", resource: "*", effect: has("find_by_name") ? "allow" : "deny" },
    { action: "grep", resource: "*", effect: has("grep_search") ? "allow" : "deny" },
    { action: "edit", resource: "*", effect: edit ? "allow" : "deny" },
    { action: "shell", resource: "*", effect: has("run_command") ? "allow" : "deny" },
    { action: "subagent", resource: "*", effect: delegation ? "allow" : "deny" },
    { action: "question", resource: "*", effect: has("ask_question") ? "allow" : "deny" },
    { action: "webfetch", resource: "*", effect: has("read_url_content") ? "allow" : "deny" },
    { action: "skill", resource: "*", effect: "allow" },
  ];
}

interface ProvisionedAgent {
  id: string;
  displayName: string;
  description: string;
  mode: "primary" | "subagent" | "all";
  hidden: boolean;
  frameTools: string[];
  system: string;
}

// Serialize one agent to OpenCode V2 native markdown. Only keys V2 file
// discovery recognizes (description/mode/hidden/permissions + body = system).
// Frame-ship frontmatter (mainAgent/subagent/effort/custom tools) is
// translated, never copied verbatim. Permissions are emitted as the V2
// ordered `permissions:` rule list (action/resource/effect, last match wins)
// so they survive V2's config reconciliation — runtime editor.update()
// mutations for permissions are overwritten by the host, frontmatter sticks.
// Legacy `permission:` map and `steps:` are not V2 fields and stay out.
// `hidden` follows the WIP visibility intent (non-primary agents hidden):
// hidden keeps them out of listings and the `@` menu; dispatch behavior is
// verified by the runtime gate (Gate C) rather than assumed here.
function toAgentFileContent(agent: ProvisionedAgent): string {
  const permLines = toOpenCodePermissions(agent.frameTools)
    .map(
      (p) =>
        `  - action: ${p.action}\n    resource: ${yamlQuote(p.resource)}\n    effect: ${p.effect}`,
    )
    .join("\n");
  return [
    "---",
    `description: ${yamlQuote(agent.description)}`,
    `mode: ${agent.mode}`,
    `hidden: ${agent.hidden}`,
    "permissions:",
    permLines,
    "---",
    "",
    agent.system.trim(),
    "",
  ].join("\n");
}

const PROVISION_MANIFEST = ".frame-ship.json";

interface ProvisionManifest {
  version: string;
  files: Record<string, string>;
}

function parseManifest(raw: string): ProvisionManifest {
  try {
    const data = JSON.parse(raw || "") as Partial<ProvisionManifest>;
    const files =
      data && typeof data === "object" && data.files &&
        typeof data.files === "object"
        ? (data.files as Record<string, string>)
        : {};
    return {
      version: typeof data.version === "string" ? data.version : "",
      files,
    };
  } catch {
    return { version: "", files: {} };
  }
}

// Provision V2-native agent files into the DEFAULT global discovery route
// (~/.config/opencode/agents/, env-resolved by resolveDefaultAgentsDir) so V2
// file discovery registers one id per file (<id>.md → id). V2 `AgentEditor`
// has no `add`, so without these files the update transform below has nothing
// to enrich and no frame-ship agent ever appears. Policy: write missing files;
// rewrite only our own stale files (content hash still matches the manifest
// record from a previous version — user-customized files are never touched);
// then the caller reloads the agent domain. Returns true when at least one
// file was written. Best-effort: false on any I/O failure. Idempotent: a
// relaunch with unchanged VERSION and intact files performs zero writes.
async function provisionAgents(
  agentsDir: string,
  agents: ProvisionedAgent[],
): Promise<boolean> {
  const dir = (agentsDir || "").replace(/[/\\]+$/, "");
  if (!dir || dir === "/opencode/agents" || agents.length === 0) return false;
  if (!(await ensureDir(dir))) return false;
  const manifestPath = `${dir}/${PROVISION_MANIFEST}`;
  const manifest = parseManifest(await readTextFile(manifestPath));
  let wrote = false;
  for (const agent of agents) {
    const target = `${dir}/${agent.id}.md`;
    const content = toAgentFileContent(agent);
    const hash = hashText(content);
    if (!(await fileExists(target))) {
      if (!(await writeTextFile(target, content))) return false;
      manifest.files[agent.id] = hash;
      wrote = true;
      continue;
    }
    const recorded = manifest.files[agent.id];
    if (
      recorded !== undefined && recorded === hashText(await readTextFile(target)) &&
      manifest.version !== VERSION
    ) {
      // Our file from a previous version, untouched by the user → upgrade.
      if (!(await writeTextFile(target, content))) return false;
      manifest.files[agent.id] = hash;
      wrote = true;
    }
    // Hash mismatch (user customized) or up to date → never touch.
    if (recorded === undefined) {
      // Unknown pre-existing file (e.g. manual copy) — adopt without rewrite
      // so future version upgrades can refresh it if still untouched.
      const current = hashText(await readTextFile(target));
      if (current === hash) {
        manifest.files[agent.id] = hash;
        wrote = true;
      }
    }
  }
  if (wrote) {
    manifest.version = VERSION;
    await writeTextFile(manifestPath, JSON.stringify(manifest, null, 2));
  }
  return wrote;
}

// ---- Built-in plan/build enrichment (Frame→Ship lanes, V2-only) ----------
// plan = Frame lane investigator (frame-intent → translate-to-spec →
// propose-changes → review-security/review-architecture): read-only discovery
// + proposals, writes scoped to docs/** only (briefs, specs,
// PROPOSED_CHANGES.md). build = Ship lane executor (execute-spec →
// quality-gate → verify-handoff → ship-release): implements approved
// proposals with REQ-ID → test → artifact traceability. Both keep skill use
// allowed. Applied via transform (no files provisioned, so the built-in base
// system prompt is preserved and only the lane suffix is appended).
// plan permissions are replaced whole (docs-only edit must deny * first,
// then allow docs/** last — last match wins); build permissions are
// preserved as-is with skill allow ensured, so default executor behavior
// never narrows.
const PLAN_TAG = "[frame-ship plan]";
const BUILD_TAG = "[frame-ship build]";

const PLAN_DESCRIPTION =
  "Plan — Frame lane investigator (Frame→Ship). Read-only discovery, requirements, and proposals: frame-intent → translate-to-spec → propose-changes → review-security/review-architecture. Writes limited to docs/** (briefs, specs, PROPOSED_CHANGES.md). Never implements; emits reference-only SPEC/HARD/GATE/DOMAINS packets.";

const BUILD_DESCRIPTION =
  "Build — Ship lane executor (Frame→Ship). Implements approved PROPOSED_CHANGES.md with REQ-ID → test → artifact traceability: execute-spec → quality-gate → verify-handoff → ship-release. Requires approved proposal; no shortcuts, no silent PASS on Critical/High.";

const PLAN_SUFFIX =
  `${PLAN_TAG} [v${VERSION}] Frame lane: frame-intent → translate-to-spec → propose-changes → review-security/review-architecture. ` +
  `Read-only except docs/** writes (briefs, specs, PROPOSED_CHANGES.md). No implementation edits, no shell. May spawn subagents for parallel discovery. ` +
  `Proposal before code. Reference-only SPEC/HARD/GATE/DOMAINS packets. Skill use allowed.`;

const BUILD_SUFFIX =
  `${BUILD_TAG} [v${VERSION}] Ship lane: execute-spec → quality-gate → verify-handoff → ship-release. ` +
  `Implement only approved PROPOSED_CHANGES.md with REQ-ID → test → artifact trace and gate-ready evidence. ` +
  `No architecture shortcuts. Skill use allowed.`;

interface BuiltinPerm {
  action: string;
  resource: string;
  effect: "allow" | "deny";
}

function planPermissions(): BuiltinPerm[] {
  return [
    { action: "read", resource: "*", effect: "allow" },
    { action: "glob", resource: "*", effect: "allow" },
    { action: "grep", resource: "*", effect: "allow" },
    // Ordered: deny * first, allow docs/** last (last match wins).
    { action: "edit", resource: "*", effect: "deny" },
    { action: "edit", resource: "docs/**", effect: "allow" },
    { action: "shell", resource: "*", effect: "deny" },
    { action: "subagent", resource: "*", effect: "allow" },
    { action: "question", resource: "*", effect: "allow" },
    { action: "webfetch", resource: "*", effect: "allow" },
    { action: "skill", resource: "*", effect: "allow" },
  ];
}

export default Plugin.define({
  id: "frame-ship-agent",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");

    // ---- Agents lane (provision + update-in-place, sync transforms) ----
    // V2 `AgentEditor` has no `add`: ids are born in file discovery
    // (~/.config/opencode/agents/<id>.md → id — the default global route,
    // env-resolved; never ctx.location.directory, which for the globally
    // symlinked install IS the config dir), never in the transform. So
    // setup() first provisions V2-native files (with `permissions:` rule
    // lists that survive V2's config reconciliation) from the canonical
    // agents/*.md, reloads the agent domain when anything was written, and
    // then the sync transform enriches every discovered id in place
    // (name/description/mode/system/hidden).
    // Permissions live exclusively in the markdown frontmatter — runtime
    // editor.update() mutations for permissions are overwritten by the host.
    const agentsDir = resolveRepoDir(fallbackBase, "agents");

    const pendingAgents: Array<{
      id: string;
      displayName: string;
      description: string;
      mode: "primary" | "subagent" | "all";
      hidden: boolean;
      frameTools: string[];
      system: string;
    }> = [];
    if (agentsDir && agentsDir !== "/agents") {
      for (const id of AGENT_FILES) {
        const raw = await readTextFile(`${agentsDir}/${id}.md`);
        if (!raw) continue;
        const parsed = parseAgentFile(raw);
        const displayName = parsed.name || id;
        if (!parsed.system) continue;
        const mode = toOpenCodeMode(parsed.mainAgent, parsed.subagent);
        pendingAgents.push({
          id,
          displayName,
          description: parsed.description || displayName,
          mode,
          // WIP visibility: every non-primary agent (owners, specialists,
          // reviewers) stays out of listings and the @ menu — dispatch flows
          // through the visible orchestrator (primary).
          hidden: mode !== "primary",
          frameTools: parsed.tools,
          system: parsed.system,
        });
      }
    }
    if (pendingAgents.length > 0) {
      // Provision into the default global discovery route FIRST: without files
      // on disk discovery has zero frame-ship ids and the transform below has
      // nothing to enrich. Manifest-guarded + missing-only → relaunch after a
      // successful provision performs zero writes.
      const provisioned = await provisionAgents(
        resolveDefaultAgentsDir(),
        pendingAgents,
      );
      if (provisioned) await ctx.agent.reload();

      await ctx.agent.transform((editor) => {
        for (const a of pendingAgents) {
          // Update only what discovery already loaded. Missing ids are skipped
          // by design (fresh files arrive via the reload above). Permissions
          // are intentionally NOT mutated here — they live in the markdown
          // frontmatter and survive V2's host reconciliation.
          if (editor.get(a.id) === undefined) continue;

          editor.update(a.id, (agent) => {
            agent.name = a.displayName as unknown as typeof agent.name;
            agent.description = a.description || agent.description;
            agent.mode = a.mode;
            agent.system = a.system;
            agent.hidden = a.hidden;
          });
        }
      });
    }

    // Built-in plan/build enrichment. Always registered (never gated on
    // parse/provision success) and presence-guarded: missing ids are skipped.
    // plan gets the Frame-lane description, docs-only edit permissions, and
    // lane suffix; build gets the Ship-lane description, skill allow ensured
    // (existing permissions preserved), and lane suffix. Suffix appends are
    // idempotent (tag check) so transform replays never duplicate.
    await ctx.agent.transform((editor) => {
      if (editor.get("plan") !== undefined) {
        editor.update("plan", (agent) => {
          // agent.description = PLAN_DESCRIPTION;
          agent.permissions = planPermissions() as unknown as typeof agent.permissions;
          const current = agent.system || "";
          if (!current.includes(PLAN_TAG)) {
            agent.system = current ? `${current}\n\n${PLAN_SUFFIX}` : PLAN_SUFFIX;
          }
        });
      }
      if (editor.get("build") !== undefined) {
        editor.update("build", (agent) => {
          // agent.description = BUILD_DESCRIPTION;
          const perms = agent.permissions as unknown as Array<{
            action: string;
            resource: string;
            effect: string;
          }> | undefined;
          if (Array.isArray(perms)) {
            const hasSkill = perms.some(
              (p) => p.action === "skill" && p.effect === "allow",
            );
            if (!hasSkill) {
              perms.push({ action: "skill", resource: "*", effect: "allow" });
            }
          } else {
            agent.permissions = [
              { action: "skill", resource: "*", effect: "allow" },
            ] as unknown as typeof agent.permissions;
          }
          const current = agent.system || "";
          if (!current.includes(BUILD_TAG)) {
            agent.system = current ? `${current}\n\n${BUILD_SUFFIX}` : BUILD_SUFFIX;
          }
        });
      }
    });
  },
});
