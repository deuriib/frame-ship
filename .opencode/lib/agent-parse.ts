/**
 * frame-ship agent frontmatter parsing — pure, zero-dependency module.
 * Owns the single source of truth for how a Frame→Ship agent file is parsed
 * into a name/description/mode/tools/system and translated into OpenCode
 * permission rows. Extracted from plugins/agents.ts so it can be unit-tested
 * without the @opencode/plugin host types.
 *
 * Correctness contract (why this is its own module): a `tools:` frontmatter
 * value in a shape this parser cannot read used to silently yield ZERO tools,
 * which translates to "deny every capability" with no error. That failure is
 * silent and non-throwing. This module instead:
 *   - reads both block lists (`tools:\n  - a`) and flow lists (`tools: [a, b]`),
 *   - throws a clear error when `tools:` is present but unreadable or empty,
 *   - leaves `tools: []` only for the explicit "no tools key" case, which is
 *     fail-safe (deny by default, SEC-01) and cannot hide a typo.
 *
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

export interface ParsedAgent {
  name: string;
  description: string;
  mainAgent: boolean;
  subagent: boolean;
  effort: string;
  tools: string[];
  system: string;
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

/**
 * Parse the `tools:` frontmatter value. Returns [] only when the key is
 * absent (deny-by-default). Throws when the key is present but neither the
 * block-list nor the flow-list form yields at least one tool — a silent-empty
 * tools list is a bug, not a valid state.
 */
function parseTools(frontmatter: string, source: string): string[] {
  const hasToolsKey = /^\s*tools\s*:/m.test(frontmatter);
  if (!hasToolsKey) return [];

  // Block list: `tools:` on its own line, then `- name` items.
  const block = frontmatter.match(
    /^\s*tools\s*:\s*(?:\r?\n|$)((?:\s*-\s*.*(?:\r?\n|$))*)/m,
  );
  if (block) {
    const tools: string[] = [];
    for (const line of (block[1] || "").split(/\r?\n/)) {
      const item = line.match(/^\s*-\s*(\S+)\s*$/);
      if (item) tools.push(item[1].trim());
    }
    if (tools.length > 0) return tools;
  }

  // Flow list: `tools: [a, b, c]` (the shape the agency-agents converter
  // emits — must NOT silently collapse to zero permissions).
  const flow = frontmatter.match(/^\s*tools\s*:\s*\[\s*([^\]]*?)\s*\]\s*$/m);
  if (flow) {
    const tools = (flow[1] || "")
      .split(",")
      .map((s) => stripQuotes(s.trim()))
      .filter((s) => s.length > 0);
    if (tools.length > 0) return tools;
  }

  throw new Error(
    `frame-ship agent "${source}": malformed "tools" frontmatter — expected a block list ("tools:\\n  - name") or flow list ("tools: [name, name]"); got a value that parsed to zero tools.`,
  );
}

export function parseAgentFile(raw: string, source = "<unknown>"): ParsedAgent {
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
  const tools = parseTools(frontmatter, source);
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

export function toOpenCodeMode(
  mainAgent: boolean,
  subagent: boolean,
): "primary" | "subagent" | "all" {
  if (mainAgent && subagent) return "all";
  if (mainAgent) return "primary";
  return "subagent";
}

export function toOpenCodePermissions(
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
