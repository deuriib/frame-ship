/**
 * frame-ship: skills plugin (id "frame-ship") — Frame→Ship skills lane
 * (zero deps, V2-only). Chain: see CHAIN const (single source of truth for
 * order). Skills: ./skills/<stage>/SKILL.md. Version lockstep lives in
 * ./shared.ts (header + const VERSION).
 * Registers 13 `frame-ship:<stage>` skills, injects workflow card + pointers
 * + live bootstrap (guardrails live in ./guardrails.ts), and preserves the
 * chain across compaction.
 * Location: plugins/opencode/skills.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents + guardrails under one id).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin, type Skill } from "@opencode/plugin";
import { VERSION, readTextFile, resolveRepoDir } from "./shared";

const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.then act. Pre-flight: skill? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate orchestrator. No 3rd loop, no sideways.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, guardrails 1-15) > skills/<stage>/SKILL.md+references/. Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill BEFORE resume. Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it. Keep REQ→test→artifact, verdicts, stage. No skill=STOP. No code w/o proposal. No handoff on CLOSED.`;

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

// Live bootstrap: SKILL.md body only (references stay file-based per scope).
// Runtime file read keeps a single source of truth — no hardcoded copy to drift.
const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;
let bootstrapCachePath = "";
let bootstrapCacheText = "";

async function loadBootstrapBody(skillsDir: string): Promise<string> {
  const clean = (skillsDir || "").replace(/[/\\]+$/, "");
  if (!clean || clean === "/skills") return "";
  const skillFile = `${clean}/using-frame-ship/SKILL.md`;
  if (bootstrapCachePath === skillFile && bootstrapCacheText)
    return bootstrapCacheText;
  try {
    const raw = await readTextFile(skillFile);
    const body = (raw || "").trim();
    if (!body) return "";
    const labeled = `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${body}`;
    bootstrapCachePath = skillFile;
    bootstrapCacheText = labeled;
    return labeled;
  } catch {
    return ""; // silent fallback — pointers above still orient the session
  }
}

// Skill dirs shipped at <repo-root>/skills/ (SKILL.md each). IDs are prefixed
// `frame-ship:<dir>` to match the chain triggers; `name` stays the bare
// frontmatter name (loader expects `name` == dir convention).
const SKILL_DIRS = [
  "using-frame-ship",
  "frame-intent",
  "translate-to-spec",
  "propose-changes",
  "review-security",
  "review-architecture",
  "execute-spec",
  "quality-gate",
  "verify-handoff",
  "ship-release",
  "debugging",
  "pull-request",
] as const;

export default Plugin.define({
  id: "frame-ship-skills",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const skillsDir = resolveRepoDir(fallbackBase, "skills");

    // ---- Skills lane (additive, sync transform) ----
    // Preload async BEFORE the sync transform callback — transforms must stay
    // cheap/replayable with no side effects inside.
    if (skillsDir && skillsDir !== "/skills") {
      const pending: Array<{
        id: string;
        name: string;
        description: string;
        path: string;
        content: string;
      }> = [];
      for (const dir of SKILL_DIRS) {
        const skillFile = `${skillsDir}/${dir}/SKILL.md`;
        const raw = await readTextFile(skillFile);
        if (!raw) continue;
        const parsed = parseSkillFile(raw);
        const name = parsed.name || dir;
        if (!parsed.content) continue;
        pending.push({
          id: `frame-ship:${dir}`,
          name,
          description: parsed.description || name,
          path: skillFile,
          content: parsed.content,
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
