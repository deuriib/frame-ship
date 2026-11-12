/**
 * frame-ship: guardrails plugin (id "frame-ship-guardrails") — Frame→Ship
 * guardrails lane (zero deps, V2-only). Source of truth: `./rules/**/*.md`,
 * read recursively at runtime so the full text never drifts into a hardcoded
 * copy. Version lockstep lives in ./shared.ts (header + const VERSION).
 *
 * Trigger-aware: only rules whose frontmatter declares `trigger: always_on`
 * (the foundation — Frame-ship, GEN, DENY, PRV) are injected on session
 * context and on compaction. Domain rules with `trigger: model_decision`
 * (ENG, SEC, FIN, LEG, MKT, PPL, REV, TST, AUT, XD, DOCS) load on demand
 * when that domain's specialist/reviewer activates, so the always-on
 * instruction payload stays lean and each rule carries one enforceable home.
 *
 * Location: plugins/opencode/guardrails.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents + guardrails under one id).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import { VERSION, readTextFile, resolveRepoDir } from "../lib/shared";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

// Lane-scoped marker: distinct from the skills lane marker
// (`[frame-ship v…]`) so each lane's hasMarker idempotency guard only sees
// its own injections — neither string contains the other.
const MARKER = `[frame-ship-guardrails v${VERSION}]`;

// Degraded fallback used only when rules/ is unreadable. Deliberately tiny:
// it is a fail-closed signal, not a second copy of the rule corpus (a long
// hardcoded copy drifts from the real rules and pretends to be the truth).
const FALLBACK_GUARDRAILS = `${MARKER}
Guardrails degraded — rules/ unreadable. Deny-by-default: no secrets, no raw
PII, evidence before claims, escalate Critical/High same-session.`;

const FULL_LABEL = `${MARKER} Domains Guardrails (BEFORE dispatch, AFTER verify)`;

// `trigger:` frontmatter decides injection. Anything without a parseable
// `always_on` trigger is treated as on-demand (never injected here).
function ruleTrigger(raw: string): string {
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!fence) return "model_decision";
  const m = (fence[1] || "").match(/^\s*trigger\s*:\s*(\S+)\s*$/m);
  return m ? m[1].trim() : "model_decision";
}

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

// ---- Descubrimiento recursivo de .md bajo {root}/rules ------------------

async function* walkMarkdownFiles(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdownFiles(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

export default Plugin.define({
  id: "frame-ship-guardrails",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const rulesDir = resolveRepoDir(fallbackBase, "rules");

    // Always-on foundation only: read every rules/**/*.md, keep the ones whose
    // frontmatter declares `trigger: always_on`. Domain rules (model_decision)
    // are loaded on demand, not injected here.
    let fullText = FALLBACK_GUARDRAILS;
    if (rulesDir && rulesDir !== "/rules") {
      try {
        const bodies: string[] = [];
        for await (const filePath of walkMarkdownFiles(rulesDir)) {
          const raw = await readTextFile(filePath);
          const body = (raw || "").trim();
          if (body && ruleTrigger(raw) === "always_on") bodies.push(body);
        }
        if (bodies.length > 0) {
          fullText = `${FULL_LABEL}\n${bodies.join("\n\n---\n\n")}`;
        }
      } catch {
        // Directorio inexistente o error de I/O → se mantiene el fallback.
      }
    }

    // ---- System injection: always-on foundation on every context build ----
    await ctx.session.hook("context", (event) => {
      if (hasMarker(event.system)) return; // idempotent — no duplication
      event.system.push({ type: "text", text: fullText });
    });

    // ---- Compaction: always-on foundation survives compression ----
    await ctx.session.hook("compaction", (event) => {
      if (hasMarker(event.system)) return;
      event.system.push({ type: "text", text: fullText });
    });
  },
});
