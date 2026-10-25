import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const MARKER = "[frame-ship-guardrails]";

const FALLBACK_GUARDRAILS = `${MARKER}
## Domains Guardrails (BEFORE dispatch, AFTER verify)

### Shared Foundation
- No sugarcoating. State facts. One point per paragraph.
- No busywork theater. Every action must have clear value and an owner.
- Assumptions on irreversible calls stated explicitly before action.
- FAIL → retry N=2 differently → escalate. No third loop, no sideways.
- Critical/High surface same session with severity + evidence + owner.
- Every claim requires proof: diff, scan, log, signed approval, receipt.
- No secrets/tokens/credentials in code, config, logs, examples, events, prompts, tickets, chats, or commits.
- Privacy (Ley 172-13): minimization, purpose limitation, PII checkpoints, 72h breach notification.

### Cross-Domain Interfaces
- Engineering ↔ Security: new boundary/dependency → security review.
- Marketing ↔ Legal/Privacy: new channel/claim → legal + privacy review.
- Revenue ↔ Finance: pricing/discounts → joint approval, monthly reconciliation.
- Any domain ↔ Incident: Critical/High → same-session notification, owner assigned.`;

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
                if (body) bodies.push(body);
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