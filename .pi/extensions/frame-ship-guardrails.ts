import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const MARKER = "[frame-ship-guardrails]";

// Degraded fallback used only when rules/ is unreadable. Deliberately tiny:
// fail-closed signal, not a second copy of the rule corpus (a long hardcoded
// copy drifts from the real rules and pretends to be the truth).
const FALLBACK_GUARDRAILS = `${MARKER}
Guardrails degraded — rules/ unreadable. Deny-by-default: no secrets, no raw
PII, evidence before claims, escalate Critical/High same-session.`;

// `trigger:` frontmatter decides injection. Anything without a parseable
// `always_on` trigger is treated as on-demand (never injected here).
function ruleTrigger(raw: string): string {
    const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
    const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    if (!fence) return "model_decision";
    const m = (fence[1] || "").match(/^\s*trigger\s*:\s*(\S+)\s*$/m);
    return m ? m[1].trim() : "model_decision";
}

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

function hasMarker(text: string): boolean {
    return text.includes(MARKER);
}

export default function (pi: ExtensionAPI) {
    let cachedGuardrails = "";
    let cacheLoaded = false;

    async function loadGuardrails(rootDir: string): Promise<string> {
        if (cacheLoaded) return cachedGuardrails;
        cacheLoaded = true;

        const rulesDir = join(rootDir, "rules");
        const bodies: string[] = [];

        try {
            for await (const filePath of walkMarkdownFiles(rulesDir)) {
                const raw = await readFile(filePath, "utf-8");
                const body = (raw || "").trim();
                if (body && ruleTrigger(raw) === "always_on") bodies.push(body);
            }
        } catch {
            // Directorio inexistente → fallback
        }

        if (bodies.length === 0) {
            cachedGuardrails = FALLBACK_GUARDRAILS;
            return cachedGuardrails;
        }

        cachedGuardrails = `${MARKER} Domains Guardrails (BEFORE dispatch, AFTER verify)\n\n${bodies.join("\n\n---\n\n")}`;
        return cachedGuardrails;
    }

    pi.on("before_agent_start", async (event, ctx) => {
        const rootDir = ctx.cwd;
        const guardrails = await loadGuardrails(rootDir);

        // Idempotencia: no duplicar si ya está en el system prompt
        if (hasMarker(event.systemPrompt)) return;

        return {
            systemPrompt: event.systemPrompt + "\n\n" + guardrails,
        };
    });
}
