/**
 * frame-ship v0.11.0 — Frame→Ship shared runtime module (zero deps, V2-only).
 * NOT a plugin (no default export): imported by ./skills.ts (id "frame-ship"),
 * ./agents.ts (id "frame-ship-agents"), ./guardrails.ts (id
 * "frame-ship-guardrails"), and by ./frame-ship.ts (the composed entry point
 * used by package installs).
 * Owns the version lockstep target (header + `const VERSION`) plus the
 * repo-root path resolution and bounded filesystem helpers both lanes share.
 * Location: plugins/opencode/shared.ts — same directory as the plugin entries,
 * so repo-root derivation is identical for every file in this folder.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

export const VERSION = "0.11.0";

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

// Repo-root artifacts (<repo-root>/skills, <repo-root>/agents) live next to
// this file's <repo-root>/plugins/opencode/. Resolve relative to our own
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

// Bun.file().exists() first, dynamic node:fs/promises fallback (no static
// node: import so `tsc` stays clean without @types/node). Resolves false on
// failure — provisioning is best-effort; the update transform still enriches
// manually-copied agents when writes are unavailable (read-only config dir).
export async function fileExists(path: string): Promise<boolean> {
  try {
    const bunFile = (
      globalThis as unknown as {
        Bun?: { file: (p: string) => { exists: () => Promise<boolean> } };
      }
    )?.Bun?.file;
    if (typeof bunFile === "function") {
      return await bunFile(path).exists();
    }
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      stat: (p: string) => Promise<unknown>;
    };
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(dir: string): Promise<boolean> {
  try {
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      mkdir: (p: string, opts: { recursive: boolean }) => Promise<unknown>;
    };
    await fs.mkdir(dir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

export async function writeTextFile(
  path: string,
  content: string,
): Promise<boolean> {
  try {
    const bunWrite = (
      globalThis as unknown as { Bun?: { write: unknown } }
    )?.Bun?.write;
    if (typeof bunWrite === "function") {
      await (bunWrite as (p: string, c: string) => Promise<unknown>)(
        path,
        content,
      );
      return true;
    }
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      writeFile: (p: string, c: string, enc: string) => Promise<void>;
    };
    await fs.writeFile(path, content, "utf8");
    return true;
  } catch {
    return false;
  }
}
