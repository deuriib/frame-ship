/**
 * frame-ship: commands plugin (id "frame-ship-commands") — Frame→Ship
 * commands lane (zero deps, V2-only). Source of truth: ../commands/*.md
 * (fallback: {root}/commands/*.md). Reads every Markdown command at runtime
 * and registers it as a native V2 slash command via ctx.command.transform().
 * V2 commands are add-only: editor.add({ name, description, execute }) and
 * the execute callback re-submits the rendered template through
 * ctx.session.prompt(), preserving session, delivery and attachments.
 * Never overwrites user-defined commands with the same name.
 * Location: plugins/opencode/commands.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents + guardrails + commands).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import { readTextFile } from "../lib/shared";
import { readdir } from "fs/promises";
import { join, resolve, basename } from "path";

// ---- Parseo de archivos de comando --------------------------------------

interface ParsedCommand {
    name: string;
    description: string;
    template: string;
}

function stripQuotes(value: string): string {
    const text = (value || "").trim();
    if (
        text.length >= 2 &&
        ((text.startsWith('"') && text.endsWith('"')) ||
            (text.startsWith("'") && text.endsWith("'")))
    ) {
        return text.slice(1, -1).trim();
    }
    return text;
}

// OpenCode command markdown: optional frontmatter with `description` (and
// other V2 fields we intentionally ignore here) + body = prompt template.
// The body keeps its `$ARGUMENTS`, `$@`, `$1`… placeholders untouched; they
// are resolved per-invocation in renderTemplate().
function parseCommandFile(filePath: string, raw: string): ParsedCommand | null {
    const text = (typeof raw === "string" ? raw : "").replace(/^\uFEFF/, "");
    const name = basename(filePath, ".md");
    const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
    if (!fence) {
        const template = text.trim();
        if (!template) return null;
        return { name, description: `Run /${name}`, template };
    }
    const frontmatter = fence[1] || "";
    const descMatch = frontmatter.match(
        /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
    );
    const description =
        stripQuotes(descMatch?.[1] ?? descMatch?.[2] ?? descMatch?.[3] ?? "") ||
        `Run /${name}`;
    const template = text.slice(fence[0].length).trim();
    if (!template) return null;
    return { name, description, template };
}

// ---- Renderizado de plantillas ------------------------------------------
// Supports the standard OpenCode placeholders:
//   $ARGUMENTS / $@  → full invocation text
//   $1 … $9          → positional tokens
// If the template has no placeholder and the user passed arguments, the
// arguments are appended at the end (same ergonomics as native commands).
function renderTemplate(template: string, args: string): string {
    const trimmed = (args || "").trim();
    const tokens = trimmed ? trimmed.split(/\s+/) : [];
    let out = template;
    out = out.replace(/\$ARGUMENTS|\$@/g, trimmed);
    out = out.replace(/\$(\d+)/g, (_m, n) => tokens[Number(n) - 1] ?? "");
    if (!/\$ARGUMENTS|\$@|\$\d+/.test(template) && trimmed) {
        out += `\n\n${trimmed}`;
    }
    return out.trim();
}

// ---- Descubrimiento de archivos -----------------------------------------

async function collectCommandFiles(dir: string): Promise<string[]> {
    try {
        const entries = await readdir(dir, { withFileTypes: true });
        return entries
            .filter((e) => e.isFile() && e.name.endsWith(".md"))
            .map((e) => join(dir, e.name))
            .sort();
    } catch {
        return [];
    }
}

// ---- Plugin --------------------------------------------------------------

export default Plugin.define({
    id: "frame-ship-commands",
    async setup(ctx) {
        const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
        if (!fallbackBase) return;

        // Primary source: ../commands/*.md (as requested). Fallback: commands/*.md
        // under the project root, so the plugin keeps working if the directory is
        // colocated instead of one level up.
        const candidates = [
            resolve(fallbackBase, "../commands"),
            resolve(fallbackBase, "commands"),
        ];

        let files: string[] = [];
        for (const dir of candidates) {
            files = await collectCommandFiles(dir);
            if (files.length > 0) break;
        }
        if (files.length === 0) return;

        const commands: ParsedCommand[] = [];
        for (const file of files) {
            const raw = await readTextFile(file);
            if (!raw) continue;
            const parsed = parseCommandFile(file, raw);
            if (parsed) commands.push(parsed);
        }
        if (commands.length === 0) return;

        // Preserve user-defined commands: names already registered by OpenCode
        // (config, .opencode/commands, other plugins) keep precedence.
        const existing = new Set<string>();
        try {
            const available = await ctx.command.list();
            for (const command of Array.isArray(available) ? available : []) {
                if (command && command.name) existing.add(command.name);
            }
        } catch {
            // Registry read is best-effort; registration below still applies.
        }

        await ctx.command.transform((editor) => {
            for (const cmd of commands) {
                if (existing.has(cmd.name)) continue;
                editor.add({
                    name: cmd.name,
                    description: cmd.description,
                    execute: async ({ sessionID, prompt, delivery }) => {
                        const args =
                            (prompt && typeof prompt.text === "string" && prompt.text) || "";
                        const text = renderTemplate(cmd.template, args);
                        await ctx.session.prompt({ sessionID, text, delivery });
                    },
                });
            }
        });
    },
});