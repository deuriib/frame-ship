#!/usr/bin/env bun
/**
 * context-inject.ts — PreInvocation context injection, run via `bun ./hooks/context-inject.ts`.
 *
 * 1:1 parity with `.opencode/plugins/frame-ship.ts`:
 *   opencode `config` (skills.paths)              → agy `skills/` dir (same files, reused verbatim)
 *   opencode `chat.system.transform` (3 cards)    → `rules/frame-ship.md` (static) + this hook (live bootstrap)
 *   opencode `loadBootstrapBody`                   → live read of skills/using-frame-ship/SKILL.md,
 *                                                   plugin root resolved from our own import.meta.url
 *                                                   (mirrors opencode resolveSkillsDir), silent fallback
 *   opencode `session.compacting` (reminder)      → N/A in agy (no compaction lifecycle event;
 *                                                   rules/frame-ship.md is always-on in context)
 *   opencode `hasMarker` dedupe                   → full bootstrap exactly once (invocationNum == 0,
 *                                                   0-indexed per official hooks docs)
 *
 * stdin:  PreInvocation JSON { invocationNum, initialNumSteps, workspacePaths?, ... }
 * stdout: `{ injectSteps: [{ ephemeralMessage }] }` on first invocation (invocationNum == 0),
 *         otherwise `{}`. Single JSON object, exit 0.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const VERSION = "0.6.1";
// [frame-ship v0.6.1] parity marker — keep in lockstep with .opencode/plugins/frame-ship.ts + rules/frame-ship.md.
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;

function fileUrlToPath(url: string): string | undefined {
  try {
    const pathname = decodeURIComponent(new URL(url).pathname);
    // URL pathname on win32 looks like /D:/... — strip the leading slash
    // before a drive letter so joins stay valid (mirrors opencode).
    const win = pathname.match(/^\/([A-Za-z]:\/.*)$/);
    return win ? win[1] : pathname;
  } catch {
    return undefined;
  }
}

/** Plugin root resolved from our own location (mirrors opencode resolveSkillsDir). */
function resolvePluginRoot(fallbackBase: string): string {
  try {
    const url = (import.meta as unknown as { url?: string })?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const norm = filePath.replace(/\\/g, "/");
        // <root>/hooks/context-inject.ts → drop /hooks/<file>.
        const idx = norm.lastIndexOf("/hooks/");
        if (idx > 0) return norm.slice(0, idx);
      }
    }
  } catch {
    // fall through to cwd-based fallback
  }
  return fallbackBase;
}

async function readStdin(): Promise<string> {
  const maybeBun = (globalThis as unknown as { Bun?: { stdin?: { text?: () => Promise<string> } } }).Bun;
  if (maybeBun?.stdin?.text) {
    try {
      return await maybeBun.stdin.text();
    } catch {
      // fall through to node read
    }
  }
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function readFileIfExists(path: string): string {
  try {
    return readFileSync(path, "utf8").trim();
  } catch {
    return "";
  }
}

/** Live bootstrap body (opencode `loadBootstrapBody` parity): SKILL.md body only, silent fallback. */
function loadBootstrapBody(pluginRoot: string, workspacePaths: string[]): string {
  const rel = join("skills", "using-frame-ship", "SKILL.md");
  const candidates: string[] = [join(pluginRoot, rel), join(process.cwd(), rel)];
  for (const w of workspacePaths) {
    if (typeof w === "string" && w) candidates.push(join(w, rel));
  }
  for (const c of candidates) {
    const body = readFileIfExists(c);
    if (body) return `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${body}`;
  }
  return `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\nSkill file not readable from hook — load skills/using-frame-ship/SKILL.md from the plugin root. Chain: ${CHAIN}.`;
}

async function main(): Promise<void> {
  let payload: { invocationNum?: unknown; initialNumSteps?: unknown; workspacePaths?: unknown };
  try {
    payload = JSON.parse((await readStdin()).trim() || "{}");
  } catch {
    console.log("{}");
    return;
  }
  const invocationNum = typeof payload.invocationNum === "number" ? payload.invocationNum : -1;
  const initialNumSteps = typeof payload.initialNumSteps === "number" ? payload.initialNumSteps : 0;
  const workspacePaths = Array.isArray(payload.workspacePaths)
    ? (payload.workspacePaths as unknown[]).filter((w): w is string => typeof w === "string")
    : [];

  if (invocationNum === 0) {
    const pluginRoot = resolvePluginRoot(process.cwd());
    const bootstrap = loadBootstrapBody(pluginRoot, workspacePaths);
    console.log(JSON.stringify({ injectSteps: [{ ephemeralMessage: bootstrap }] }));
    return;
  }
  console.log("{}");
}

await main();
