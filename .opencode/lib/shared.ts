/**
 * frame-ship v0.12.0 — Frame→Ship shared runtime module (zero deps, V2-only).
 * NOT a plugin (no default export): imported by ../plugins/skills.ts (id
 * "frame-ship-skills"), ../plugins/guardrails.ts (id
 * "frame-ship-guardrails"), ../plugins/commands.ts (id
 * "frame-ship-commands"), and ../plugins/frame-ship.ts (the composed entry
 * point used by package installs).
 * Owns the version lockstep target (header + `const VERSION`) plus the
 * repo-root path resolution and bounded filesystem helpers shared across lanes.
 * Location: .opencode/lib/shared.ts.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

export const VERSION = "0.12.0";

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

// Repo-root artifacts (<repo-root>/skills, <repo-root>/rules) live next to
// this file's <repo-root>/.opencode/lib/. Resolve relative to our own
// location (import.meta.url of THIS module) so installs work from ANY cwd —
// never assume cwd IS the frame-ship repo. Falls back to the caller's
// fallbackBase (ctx.location.directory) only when our own URL is unavailable
// (e.g. unit tests). No static node: imports keeps zero-dep + no @types/node
// so `tsc` stays clean (runtime read uses Bun.file first, then a
// function-scoped dynamic import of node:fs/promises).
export function resolveRepoDir(fallbackBase: string, leaf: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, plugins, opencode, <file>.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 3] === "plugins" &&
          parts[parts.length - 2] === "opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/${leaf}`;
        }
      }
    }
  } catch {
    // fall through to fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/${leaf}`;
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
export async function readTextFile(path: string): Promise<string> {
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
