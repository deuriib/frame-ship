/**
 * frame-ship v0.7.0 — Frame→Ship plugin (single-file, zero deps, V2-only).
 * Chain: see CHAIN const (single source of truth for order).
 * Skills: ./skills/<stage>/SKILL.md. Location: plugins/opencode/frame-ship.ts.
 * Install: explicit `plugins: ["./plugins/opencode/frame-ship.ts"]` (a root-level
 * `plugins/` dir is NOT auto-discovered — only `.opencode/plugins/` is).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin, type Skill } from "@opencode/plugin";

const VERSION = "0.7.0";
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.then act. Pre-flight: skill? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate orchestrator. No 3rd loop, no sideways.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

// Short-form guardrails: every rule 1-14 present, greppable by number, same meaning. Full text: AGENTS.md.
const GUARDRAILS_FULL = `${MARKER} Guardrails (BEFORE dispatch, AFTER verify; full text: AGENTS.md):
Security: 1.Deny default; no secret/token/credential/session in code/config/logs/examples/events; finding w/o proof(diff/scan/log)=REFUTED. 2.OWASP: screen injection, broken authN/Z, data exposure, insecure deps, missing access; new endpoints/adapters/boundaries/payloads=trust boundaries. 3.Least privilege: minimum scope per interface/key/role/automation; wide/cross-tenant=findings. 4.No freelance fixes: never rotate keys/patch prod/widen perms; report severity+location, owner remediates.
Privacy (Ley 172-13): 5.Minimization: minimum PII; map flow source→store→log→third party. 6.Boundary hygiene: every port/adapter/event/log/prompt=PII checkpoint; mask/tokenize, allowlists. 7.Retention: every PII store declares purpose+TTL+deletion; purge expired post-snapshot. 8.Scoped export: PASS exports allowlisted evidence only; never full dump/PII in shares/lessons/bridge.
Severity: 9.Critical(exploitable/prod/loss),High(probable),Medium(conditional),Low(hygiene). 10.Critical/High surface same session+severity+evidence+owner; Med/Low ride gate. 11.Residual explicit: APPROVE+conditions lists risk+owner; no silent PASS.
Conduct: 12.No sugarcoating. 13.No busywork theater—guards earn keep or die. 14.Respect attention—one point/paragraph; state assumptions on irreversible. FAIL→retry N=2 differently→escalate orchestrator. No 3rd loop, no sideways. 15.Use work-unit commits.`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, guardrails 1-15) > skills/<stage>/SKILL.md+references/. Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill BEFORE resume. Chain: ${CHAIN}. Keep REQ→test→artifact, verdicts, stage. No skill=STOP. No code w/o proposal. No handoff on CLOSED.`;

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

function fileUrlToPath(url: string): string | undefined {
  try {
    const pathname = decodeURIComponent(new URL(url).pathname);
    // URL pathname on win32 looks like /D:/GitHub/frame-ship/... — strip the
    // leading slash before a drive letter so joins stay valid.
    const win = pathname.match(/^\/([A-Za-z]:\/.*)$/);
    return win ? win[1] : pathname;
  } catch {
    return undefined;
  }
}

// Skills live at <repo-root>/skills/ next to this file's
// <repo-root>/plugins/opencode/frame-ship.ts. Resolve relative to our own
// location (import.meta.url) so installs work from ANY cwd — never assume cwd
// IS the frame-ship repo. Falls back to the plugin location dir only when our
// own URL is unavailable (e.g. unit tests). No static node: imports keeps
// zero-dep + no @types/node so `tsc` stays clean (runtime read uses Bun.file
// first, then a function-scoped dynamic import of node:fs/promises).
function resolveSkillsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, plugins, opencode, frame-ship.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 3] === "plugins" &&
          parts[parts.length - 2] === "opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/skills`;
        }
      }
    }
  } catch {
    // fall through to fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/skills`;
}

// Bounded init I/O: a read that never settles (hung handle, wedged mount)
// must not stall setup. Every read races a small timeout — timeout wins →
// miss ("", entry skipped, uncached so retry self-heals). Timer cleared on
// settle; the raced read never rejects (inner try/catch), so the race loser
// cannot surface an unhandled rejection. Zero-dep (Promise.race + setTimeout
// only). Local 2-6KB reads land in single-digit ms; 2000ms is generous
// headroom against false skips on loaded disks.
const READ_TIMEOUT_MS = 2000;

async function withTimeout(
  task: Promise<string>,
  ms: number,
): Promise<string | undefined> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<undefined>((resolve) => {
    timer = setTimeout(() => resolve(undefined), ms);
  });
  return Promise.race([task, timeout]).finally(() => {
    if (timer !== undefined) clearTimeout(timer);
  });
}

// Bun.file first, dynamic node:fs/promises fallback (no static node: import so
// `tsc` stays clean without @types/node). Silent "" on miss — the caller
// skips the entry, init never wedges. Never echoes contents into errors.
async function readTextFile(path: string): Promise<string> {
  try {
    // Eager read, never rejects (inner try/catch) so the timeout race below
    // stays rejection-free from both sides.
    const read: Promise<string> = (async (): Promise<string> => {
      try {
        const bunFile = (
          globalThis as unknown as {
            Bun?: { file: (p: string) => { text: () => Promise<string> } };
          }
        )?.Bun?.file;
        if (typeof bunFile === "function") {
          return await bunFile(path).text();
        }
        // @ts-ignore — node types intentionally not installed; dynamic import only.
        const fs = (await import("node:fs/promises")) as unknown as {
          readFile: (p: string, enc: string) => Promise<string>;
        };
        return await fs.readFile(path, "utf8");
      } catch {
        return "";
      }
    })();
    // Timeout-as-miss: a hung read resolves undefined → skip the entry, and —
    // like any miss — is never cached, so a retry self-heals.
    const raw = await withTimeout(read, READ_TIMEOUT_MS);
    if (raw === undefined) return "";
    const text = raw || "";
    return text;
  } catch {
    return "";
  }
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
  "git-worktree",
  "pull-request",
] as const;

export default Plugin.define({
  id: "frame-ship",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const skillsDir = resolveSkillsDir(fallbackBase);

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
        { type: "text", text: GUARDRAILS_FULL },
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
