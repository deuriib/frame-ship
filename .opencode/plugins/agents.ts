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
import {
  parseAgentFile,
  toOpenCodeMode,
  toOpenCodePermissions,
} from "../lib/agent-parse";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

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
      const rel = relative(agentsDir, filePath); // ej. "team/reviewer.md"
      const parsed = parseAgentFile(raw, rel);
      if (!parsed.system) continue;

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