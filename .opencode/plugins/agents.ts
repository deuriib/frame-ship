/**
 * frame-ship-agents: agents plugin (id "frame-ship-agents") — Frame→Ship
 * agents lane (zero deps, V2-only). Source of truth: `./agents/**//*.md`
* with frame-ship frontmatter, translated to OpenCode V2 agent definitions
* in-memory via ctx.agent.transform(). Never provisions files to disk.
* Provisions V2-native discovery files into the global route, reloads the
* agent domain, and enriches every discovered id in place. Never touches
* built-in `plan`/`build` agents — they ship exactly as the host defines them.
* Location: plugins/opencode/agents.ts. Load it directly, or load
* ./frame-ship.ts (composed entry: skills + agents under one id).
* Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
*/

import { Plugin } from "@opencode/plugin";
import { readTextFile, resolveRepoDir } from "../lib/shared";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

// ---- Tipos compartidos ---------------------------------------------------

interface ParsedAgent {
  name: string;
  description: string;
  mainAgent: boolean;
  subagent: boolean;
  effort: string;
  tools: string[];
  system: string;
}

// ---- Parseo de frontmatter (sin cambios) ---------------------------------

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

function parseAgentFile(raw: string): ParsedAgent {
  const empty: ParsedAgent = {
    name: "",
    description: "",
    mainAgent: false,
    subagent: false,
    effort: "",
    tools: [],
    system: (raw || "").trim(),
  };
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!fence) return empty;
  const frontmatter = fence[1] || "";
  const nameMatch = frontmatter.match(
    /^\s*name\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const descMatch = frontmatter.match(
    /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const effortMatch = frontmatter.match(/^\s*effort\s*:\s*(\S+)\s*$/m);
  const toolsBlock = frontmatter.match(
    /^\s*tools\s*:\s*(?:\r?\n|$)((?:\s*-\s*.*(?:\r?\n|$))*)/m,
  );
  const tools: string[] = [];
  if (toolsBlock) {
    for (const line of (toolsBlock[1] || "").split(/\r?\n/)) {
      const item = line.match(/^\s*-\s*(\S+)\s*$/);
      if (item) tools.push(item[1].trim());
    }
  }
  const body = text.slice(fence[0].length).trim();
  return {
    name: stripQuotes(nameMatch?.[1] ?? nameMatch?.[2] ?? nameMatch?.[3] ?? ""),
    description: stripQuotes(
      descMatch?.[1] ?? descMatch?.[2] ?? descMatch?.[3] ?? "",
    ),
    mainAgent: /^\s*mainAgent\s*:\s*true\s*$/m.test(frontmatter),
    subagent: /^\s*subagent\s*:\s*true\s*$/m.test(frontmatter),
    effort: (effortMatch?.[1] || "").trim().toLowerCase(),
    tools,
    system: body,
  };
}

// ---- Translate frame-ship → OpenCode -------------------

function toOpenCodeMode(
  mainAgent: boolean,
  subagent: boolean,
): "primary" | "subagent" | "all" {
  if (mainAgent && subagent) return "all";
  if (mainAgent) return "primary";
  return "subagent";
}

function toOpenCodePermissions(
  frameTools: string[],
): Array<{ action: string; resource: string; effect: "allow" | "deny" }> {
  const has = (name: string): boolean => frameTools.includes(name);
  const read = has("view_file") || has("list_dir");
  const edit = has("write_to_file") || has("replace_file_content");
  const delegation =
    has("invoke_subagent") || has("manage_subagents") || has("send_message");
  return [
    { action: "read", resource: "*", effect: read ? "allow" : "deny" },
    { action: "glob", resource: "*", effect: has("find_by_name") ? "allow" : "deny" },
    { action: "grep", resource: "*", effect: has("grep_search") ? "allow" : "deny" },
    { action: "edit", resource: "*", effect: edit ? "allow" : "deny" },
    { action: "shell", resource: "*", effect: has("run_command") ? "allow" : "deny" },
    { action: "subagent", resource: "*", effect: delegation ? "allow" : "deny" },
    { action: "question", resource: "*", effect: has("ask_question") ? "allow" : "deny" },
    { action: "webfetch", resource: "*", effect: has("read_url_content") ? "allow" : "deny" },
    { action: "skill", resource: "*", effect: "allow" },
  ];
}

// ---- Descubrimiento recursivo de .md bajo {root}/agents ------------------

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

// ---- Plugin ---------------------------------------------------------------

export default Plugin.define({
  id: "frame-ship-agent",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const agentsDir = resolveRepoDir(fallbackBase, "agents");

    if (!agentsDir || agentsDir === "/agents") return;

    // Recolectar todos los archivos .md bajo agents/ (recursivo)
    const agentFiles: string[] = [];
    try {
      for await (const file of walkMarkdownFiles(agentsDir)) {
        agentFiles.push(file);
      }
    } catch {
      // Si el directorio no existe o falla la lectura, no hacemos nada.
      return;
    }

    const definitions: Array<{
      id: string;
      name: string;
      description: string;
      mode: "primary" | "subagent" | "all";
      hidden: boolean;
      frameTools: string[];
      system: string;
    }> = [];

    for (const filePath of agentFiles) {
      const raw = await readTextFile(filePath);
      if (!raw) continue;
      const parsed = parseAgentFile(raw);
      if (!parsed.system) continue;

      const rel = relative(agentsDir, filePath); // ej. "team/reviewer.md"
      const id = rel.replace(/\.md$/, "").replace(/\\/g, "/"); // "team/reviewer"

      // No tocar agentes integrados
      if (id === "plan" || id === "build") continue;

      const displayName = parsed.name || id;
      const mode = toOpenCodeMode(parsed.mainAgent, parsed.subagent);

      definitions.push({
        id,
        name: displayName,
        description: parsed.description || displayName,
        mode,
        hidden: mode !== "primary", // los no-primary quedan ocultos (WIP)
        frameTools: parsed.tools,
        system: parsed.system,
      });
    }

    if (definitions.length === 0) return;

    // Upsert en el registro de agentes de OpenCode V2
    await ctx.agent.transform((editor) => {
      for (const def of definitions) {
        // update() es upsert: crea si no existe, actualiza si existe.
        editor.update(def.id, (agent) => {
          agent.name = def.name as unknown as typeof agent.name;
          agent.description = def.description;
          agent.mode = def.mode;
          agent.system = def.system;
          agent.hidden = def.hidden;
          agent.permissions = toOpenCodePermissions(def.frameTools);
        });
      }
    });
  },
});