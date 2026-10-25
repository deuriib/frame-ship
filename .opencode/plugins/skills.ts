/**
 * frame-ship: skills plugin (id "frame-ship") — Frame→Ship skills lane
 * (zero deps, V2-only). Chain: see CHAIN const (single source of truth for
 * order). Skills discovered dynamically from ./skills/<stage>/*.md — every
 * direct .md file in each skill dir is concatenated into the skill content
 * (primary = SKILL.md when present, secondary files frontmatter-stripped).
 * Version lockstep lives in ./shared.ts (header + const VERSION).
 * Registers `frame-ship:<stage>` skills, injects workflow card + pointers +
 * live bootstrap (guardrails live in ./guardrails.ts), and preserves the
 * chain across compaction.
 * Location: plugins/opencode/skills.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents + guardrails under one id).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin, type Skill } from "@opencode/plugin";
import { VERSION, readTextFile, resolveRepoDir } from "../lib/shared";
import { readdir } from "fs/promises";
import { join } from "path";

const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.then act. Pre-flight: skill? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate orchestrator. No 3rd loop, no sideways.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, guardrails 1-15) > skills/<stage>/SKILL.md+references/. Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context. Skills: chain first (stage skill ONCE, no skill=STOP), then at most 1-2 external skills when a trigger matches; chain wins on conflict.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill BEFORE resume. Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context. Keep REQ→test→artifact, verdicts, stage. No skill=STOP. No code w/o proposal. No handoff on CLOSED.`;

// V2 system parts are {type:"text",text} objects (not strings). Accept both
// so idempotency holds across context + compaction hooks and retries.
function hasMarker(parts: unknown): boolean {
  if (!Array.isArray(parts)) return false;
  return parts.some((p) => {
    if (typeof p === "string") return p.includes(MARKER);
    if (p && typeof p === "object") {
      const text = (p as { text?: unknown }).text;
      if (typeof text === "string" && text.includes(MARKER)) return true;
    }
    return false;
  });
}

// Strip a leading `---…---` frontmatter block; used when concatenating
// secondary .md files (only the primary SKILL.md keeps its frontmatter,
// so V2's loader parses a single YAML header).
function stripFrontmatter(raw: string): string {
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (fence) return text.slice(fence[0].length).trim();
  return text.trim();
}

// Skill frontmatter: name + description (same shape as agents; body kept whole
// as Skill.Info.content — references stay file-based per scope).
function parseSkillFile(raw: string): {
  name: string;
  description: string;
  content: string;
} {
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (fence) {
    const frontmatter = fence[1] || "";
    const nameMatch = frontmatter.match(
      /^\s*name\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
    );
    const descMatch = frontmatter.match(
      /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
    );
    const name = (
      nameMatch?.[1] ??
      nameMatch?.[2] ??
      nameMatch?.[3] ??
      ""
    ).trim();
    const description = (
      descMatch?.[1] ??
      descMatch?.[2] ??
      descMatch?.[3] ??
      ""
    ).trim();
    return { name, description, content: (raw || "").trim() };
  }
  return { name: "", description: "", content: (raw || "").trim() };
}

// ---- Dynamic discovery helpers ------------------------------------------

// Discover skill subdirs under {root}/skills (each dir = one skill).
// `using-frame-ship` pinned first for determinism / bootstrap ordering.
async function discoverSkillDirs(skillsDir: string): Promise<string[]> {
  try {
    const entries = await readdir(skillsDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    return dirs.sort((a, b) => {
      if (a === "using-frame-ship") return -1;
      if (b === "using-frame-ship") return 1;
      return a.localeCompare(b);
    });
  } catch {
    return [];
  }
}

// Direct .md files in a skill dir ({root}/skills/<skill-name>/*.md).
// Primary = SKILL.md when present; the rest sorted lexically.
async function collectSkillMarkdown(skillDir: string): Promise<string[]> {
  try {
    const entries = await readdir(skillDir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .map((e) => join(skillDir, e.name));
    return files.sort((a, b) => {
      const aIsSkill = /[\\/]SKILL\.md$/i.test(a);
      const bIsSkill = /[\\/]SKILL\.md$/i.test(b);
      if (aIsSkill && !bIsSkill) return -1;
      if (!aIsSkill && bIsSkill) return 1;
      return a.localeCompare(b);
    });
  } catch {
    return [];
  }
}

// Build the skill content by concatenating every direct .md file in the
// skill dir. Primary file keeps its frontmatter (so V2 parses one header);
// secondary files are frontmatter-stripped and labelled with their relative
// path so the model can tell sections apart.
async function buildSkillContent(
  skillDir: string,
): Promise<{ primaryPath: string; primaryRaw: string; content: string } | null> {
  const files = await collectSkillMarkdown(skillDir);
  if (files.length === 0) return null;
  const primaryPath = files[0];
  const primaryRaw = await readTextFile(primaryPath);
  if (!primaryRaw) return null;

  const parts: string[] = [primaryRaw.trim()];
  for (const extra of files.slice(1)) {
    const raw = await readTextFile(extra);
    if (!raw) continue;
    const body = stripFrontmatter(raw);
    if (!body) continue;
    const rel = extra
      .slice(skillDir.length)
      .replace(/^[/\\]+/, "")
      .replace(/\\/g, "/");
    parts.push(`---\n\n## ${rel}\n\n${body}`);
  }
  return { primaryPath, primaryRaw, content: parts.join("\n\n") };
}

// Live bootstrap: full content of using-frame-ship (primary + secondary .md
// files), read at runtime so the body never drifts into a hardcoded copy.
const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;
let bootstrapCachePath = "";
let bootstrapCacheText = "";

async function loadBootstrapBody(skillsDir: string): Promise<string> {
  const clean = (skillsDir || "").replace(/[/\\]+$/, "");
  if (!clean || clean === "/skills") return "";
  const skillDir = `${clean}/using-frame-ship`;
  if (bootstrapCachePath === skillDir && bootstrapCacheText)
    return bootstrapCacheText;
  try {
    const built = await buildSkillContent(skillDir);
    if (!built || !built.content) return "";
    const labeled = `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${built.content}`;
    bootstrapCachePath = skillDir;
    bootstrapCacheText = labeled;
    return labeled;
  } catch {
    return ""; // silent fallback — pointers above still orient the session
  }
}

export default Plugin.define({
  id: "frame-ship-skills",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const skillsDir = resolveRepoDir(fallbackBase, "skills");

    // ---- Skills lane (additive, sync transform) ----
    // Preload async BEFORE the sync transform callback — transforms must stay
    // cheap/replayable with no side effects inside.
    if (skillsDir && skillsDir !== "/skills") {
      const skillDirs = await discoverSkillDirs(skillsDir);
      const pending: Array<{
        id: string;
        name: string;
        description: string;
        path: string;
        content: string;
      }> = [];
      for (const dirName of skillDirs) {
        const skillDir = join(skillsDir, dirName);
        const built = await buildSkillContent(skillDir);
        if (!built) continue;
        const parsed = parseSkillFile(built.primaryRaw);
        const name = parsed.name || dirName;
        if (!built.content) continue;
        pending.push({
          id: `frame-ship:${dirName}`,
          name,
          description: parsed.description || name,
          path: built.primaryPath,
          content: built.content,
        });
      }
      if (pending.length > 0) {
        await ctx.skill.transform((editor) => {
          for (const s of pending) {
            // Never overwrite user skills with the same id.
            if (editor.get(s.id) !== undefined) continue;
            editor.add({
              id: s.id as Skill.Info["id"],
              name: s.name as Skill.Info["name"],
              description: s.description,
              path: s.path as Skill.Info["path"],
              content: s.content,
            });
          }
        });
      }
    }

    // ---- System injection: agent loop ----
    const bootstrap = await loadBootstrapBody(skillsDir);
    await ctx.session.hook("context", (event) => {
      if (hasMarker(event.system)) return; // idempotent — no duplication
      event.system.push(
        { type: "text", text: WORKFLOW_CARD },
        { type: "text", text: POINTERS },
      );
      if (bootstrap) event.system.push({ type: "text", text: bootstrap });
    });

    // ---- Compaction reminder ----
    await ctx.session.hook("compaction", (event) => {
      if (hasMarker(event.system)) return;
      event.system.push({ type: "text", text: COMPACTION_REMINDER });
    });
  },
});