/**
 * frame-ship v0.3.3 — Frame→Ship plugin (single-file, zero deps).
 * Chain: see CHAIN const (single source of truth for order).
 * Skills: ./skills/<stage>/SKILL.md. Location: .opencode/plugins/frame-ship.ts.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import type { Config, Plugin, PluginInput } from "@opencode-ai/plugin";

const VERSION = "0.3.3";
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.read(agents/<domain>/<agent>.md) skill=process,template=craft 4.then edit/bash/task. Pre-flight: skill? template cited? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate montilla. No 3rd loop, no sideways.
Modes (frozen at frame-ship:frame-intent): single=skill+1 template, direct, cite both. multi=default: skill+C-level template, montilla (CEO) is the sole dispatcher — task(general) max2, CEO dispatches entire team; c-levels/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to CEO, who delegates to the right agent or resolves. Each dispatched agent reads skill+template first, packet by ref, returns deliverable+risks+assumptions+evidence.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o c-levels+CEO waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

// Short-form guardrails: every rule 1-14 present, greppable by number, same meaning. Full text: AGENTS.md.
const GUARDRAILS_FULL = `${MARKER} Guardrails (BEFORE dispatch, AFTER verify; full text: AGENTS.md):
Security: 1.Deny default; no secret/token/credential/session in code/config/logs/examples/events; finding w/o proof(diff/scan/log)=REFUTED. 2.OWASP: screen injection, broken authN/Z, data exposure, insecure deps, missing access; new endpoints/adapters/boundaries/payloads=trust boundaries. 3.Least privilege: minimum scope per interface/key/role/automation; wide/shared/cross-tenant=findings. 4.No freelance fixes: never rotate keys/patch prod/widen perms; report severity+location, owner remediates.
Privacy (Ley 172-13): 5.Minimization: minimum PII; map flow source→store→log→third party. 6.Boundary hygiene: every port/adapter/event/log/prompt=PII checkpoint; mask/tokenize, allowlists. 7.Retention: every PII store declares purpose+TTL+deletion; purge expired post-snapshot. 8.Scoped export: PASS exports allowlisted evidence only; never full dump/PII in shares/lessons/bridge.
Severity: 9.Critical(exploitable/prod/loss),High(probable),Medium(conditional),Low(hygiene). 10.Critical/High surface same session+severity+evidence+owner; Med/Low ride gate. 11.Residual explicit: APPROVE+conditions lists risk+owner; no silent PASS.
Conduct: 12.No sugarcoating. 13.No busywork theater—guards earn keep or die. 14.Respect attention—one point/paragraph; state assumptions on irreversible. FAIL→retry N=2 differently→escalate montilla. No 3rd loop, no sideways.`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, dispatch, guardrails 1-14) > skills/<stage>/SKILL.md+references/ > agents/<domain>/<agent>.md (REQUIRED read, skill=process/template=craft). Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill+template BEFORE resume. Chain: ${CHAIN}. Keep REQ→test→artifact, verdicts, execution_mode, stage. No skill+template=STOP. No code w/o proposal. No handoff on CLOSED.`;

const MONTILLA_OWNERSHIP = `${MARKER} You are Montilla (CEO): owner of frame-ship, guardrails, skills, agents, and sole dispatcher to the entire team — c-levels/specialists do the work or brief back; cross-domain needs return as a formal Cross-domain request brief to you, and you delegate to the right agent (task(general) max 2 parallel) or resolve.`;

function hasMarker(parts: unknown): boolean {
  if (!Array.isArray(parts)) return false;
  return parts.some((p) => typeof p === "string" && p.includes(MARKER));
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
// <repo-root>/.opencode/plugins/frame-ship.ts. Resolve relative to our own
// location (import.meta.url) so global installs work from ANY cwd — never
// assume cwd IS the frame-ship repo. Falls back to cwd only when our own URL
// is unavailable (e.g. unit tests). No static node: imports keeps zero-dep +
// no @types/node so `tsc` stays clean (runtime read uses Bun.file first,
// then a function-scoped dynamic import of node:fs/promises).
function resolveSkillsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, .opencode, plugins, frame-ship.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 2] === "plugins" &&
          parts[parts.length - 3] === ".opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/skills`;
        }
      }
    }
  } catch {
    // fall through to cwd-based fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/skills`;
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
  if (bootstrapCachePath === skillFile && bootstrapCacheText) return bootstrapCacheText;
  try {
    let raw = "";
    const bunFile = (globalThis as unknown as {
      Bun?: { file: (p: string) => { text: () => Promise<string> } };
    })?.Bun?.file;
    if (typeof bunFile === "function") {
      raw = await bunFile(skillFile).text();
    } else {
      // @ts-ignore — node types intentionally not installed; dynamic import only.
      const fs = (await import("node:fs/promises")) as unknown as {
        readFile: (p: string, enc: string) => Promise<string>;
      };
      raw = await fs.readFile(skillFile, "utf8");
    }
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

export const FrameShipPlugin: Plugin = async ({ directory, worktree }: PluginInput) => {
  const fallbackBase = (directory || worktree || "").replace(/[/\\]+$/, "");
  const skillsDir = resolveSkillsDir(fallbackBase);

  return {
    // Runs once on init with the merged config. Appends our skills dir to
    // `skills.paths` (scanned recursively for **/SKILL.md). Idempotent:
    // never duplicates, never clobbers user paths.
    config: async (cfg: Config) => {
      const c = cfg as Config & { skills?: { paths?: string[] } };
      c.skills ??= {};
      c.skills.paths ??= [];
      if (!skillsDir || skillsDir === "/skills") return; // no resolvable base — don't pollute
      if (!c.skills.paths.includes(skillsDir)) c.skills.paths.push(skillsDir);
    },
    "experimental.chat.system.transform": async (_input: unknown, output: unknown) => {
      const out = output as { system?: unknown };
      if (!Array.isArray(out.system)) return;
      if (hasMarker(out.system)) return; // idempotent — no duplication on retries
      out.system.push(WORKFLOW_CARD, GUARDRAILS_FULL, POINTERS, MONTILLA_OWNERSHIP);
      const bootstrap = await loadBootstrapBody(skillsDir);
      if (bootstrap) out.system.push(bootstrap);
    },
    "experimental.session.compacting": async (_input: unknown, output: unknown) => {
      const out = output as { context?: unknown };
      if (!Array.isArray(out.context)) return;
      if (hasMarker(out.context)) return;
      out.context.push(COMPACTION_REMINDER, MONTILLA_OWNERSHIP);
    },
  };
};

// Default export mirrors the named export. The v1 loader calls every function
// export (named or default) with dedupe, so either shape loads; shipping both
// keeps direct-file and directory-package installs working.
export default FrameShipPlugin;
