/**
 * frame-ship v0.5.0 — Frame→Ship plugin (single-file, zero deps).
 * Chain: see CHAIN const (single source of truth for order).
 * Skills: ./skills/<stage>/SKILL.md. Location: .opencode/plugins/frame-ship.ts.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import type { Config, Plugin, PluginInput } from "@opencode-ai/plugin";

const VERSION = "0.5.0";
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.then act. Pre-flight: skill? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate orchestrator. No 3rd loop, no sideways.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

// Short-form guardrails: every rule 1-14 present, greppable by number, same meaning. Full text: AGENTS.md.
const GUARDRAILS_FULL = `${MARKER} Guardrails (BEFORE dispatch, AFTER verify; full text: AGENTS.md):
Security: 1.Deny default; no secret/token/credential/session in code/config/logs/examples/events; finding w/o proof(diff/scan/log)=REFUTED. 2.OWASP: screen injection, broken authN/Z, data exposure, insecure deps, missing access; new endpoints/adapters/boundaries/payloads=trust boundaries. 3.Least privilege: minimum scope per interface/key/role/automation; wide/shared/cross-tenant=findings. 4.No freelance fixes: never rotate keys/patch prod/widen perms; report severity+location, owner remediates.
Privacy (Ley 172-13): 5.Minimization: minimum PII; map flow source→store→log→third party. 6.Boundary hygiene: every port/adapter/event/log/prompt=PII checkpoint; mask/tokenize, allowlists. 7.Retention: every PII store declares purpose+TTL+deletion; purge expired post-snapshot. 8.Scoped export: PASS exports allowlisted evidence only; never full dump/PII in shares/lessons/bridge.
Severity: 9.Critical(exploitable/prod/loss),High(probable),Medium(conditional),Low(hygiene). 10.Critical/High surface same session+severity+evidence+owner; Med/Low ride gate. 11.Residual explicit: APPROVE+conditions lists risk+owner; no silent PASS.
Conduct: 12.No sugarcoating. 13.No busywork theater—guards earn keep or die. 14.Respect attention—one point/paragraph; state assumptions on irreversible. FAIL→retry N=2 differently→escalate orchestrator. No 3rd loop, no sideways.`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, guardrails 1-14) > skills/<stage>/SKILL.md+references/. Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill BEFORE resume. Chain: ${CHAIN}. Keep REQ→test→artifact, verdicts, stage. No skill=STOP. No code w/o proposal. No handoff on CLOSED.`;

function hasMarker(parts: unknown): boolean {
  if (!Array.isArray(parts)) return false;
  return parts.some((p) => typeof p === "string" && p.includes(MARKER));
}

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

// Skills live at <repo-root>/skills/ next to this file's
// <repo-root>/.opencode/plugins/frame-ship.ts. Resolve relative to our own
// location (import.meta.url) so global installs work from ANY cwd — never
// assume cwd IS the frame-ship repo. Falls back to cwd only when our own URL
// is unavailable (e.g. unit tests). No static node: imports keeps zero-dep +
// no @types/node so `tsc` stays clean (runtime read uses Bun.file first,
// then a function-scoped dynamic import of node:fs/promises).
function resolveSkillsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, .opencode, plugins, frame-ship.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 2] === "plugins" &&
          parts[parts.length - 3] === ".opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/skills`;
        }
      }
    }
  } catch {
    // fall through to cwd-based fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/skills`;
}

// Agents live at <repo-root>/agents/ next to this file — same trust root as
// the skills lane. Mirrors resolveSkillsDir (own import.meta.url first,
// directory || worktree fallback); plain string join, no static node: import.
function resolveAgentsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, .opencode, plugins, frame-ship.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 2] === "plugins" &&
          parts[parts.length - 3] === ".opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/agents`;
        }
      }
    }
  } catch {
    // fall through to cwd-based fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/agents`;
}

// Per-path cache (mirrors the bootstrapCache precedent): init reads 74 small
// files once; double-init replays serve from memory. Misses are never cached.
const agentFileCache = new Map<string, string>();

// Bun.file first, dynamic node:fs/promises fallback (no static node: import so
// `tsc` stays clean without @types/node). Silent "" on miss — the caller
// skips the entry, init never wedges. Never echoes contents into errors.
async function readTextFile(path: string): Promise<string> {
  const cached = agentFileCache.get(path);
  if (cached !== undefined) return cached;
  try {
    let raw = "";
    const bunFile = (globalThis as unknown as {
      Bun?: { file: (p: string) => { text: () => Promise<string> } };
    })?.Bun?.file;
    if (typeof bunFile === "function") {
      raw = await bunFile(path).text();
    } else {
      // @ts-ignore — node types intentionally not installed; dynamic import only.
      const fs = (await import("node:fs/promises")) as unknown as {
        readFile: (p: string, enc: string) => Promise<string>;
      };
      raw = await fs.readFile(path, "utf8");
    }
    const text = raw || "";
    agentFileCache.set(path, text);
    return text;
  } catch {
    return "";
  }
}

// First ---...--- fence → description (description: "..." or '...', verbatim,
// never rewritten); remainder trimmed → prompt. No fence → empty description,
// whole input trimmed as prompt.
function parseAgentFile(raw: string): { description: string; prompt: string } {
  const text = raw || "";
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!fence) return { description: "", prompt: text.trim() };
  const frontmatter = fence[1] || "";
  const descMatch = frontmatter.match(/^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m);
  const description = (descMatch?.[1] ?? descMatch?.[2] ?? descMatch?.[3] ?? "").trim();
  const prompt = text.slice(fence[0].length).trim();
  return { description, prompt };
}

// Live bootstrap: SKILL.md body only (references stay file-based per scope).
// Runtime file read keeps a single source of truth — no hardcoded copy to drift.
const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;
let bootstrapCachePath = "";
let bootstrapCacheText = "";

async function loadBootstrapBody(skillsDir: string): Promise<string> {
  const clean = (skillsDir || "").replace(/[/\\]+$/, "");
  if (!clean || clean === "/skills") return "";
  const skillFile = `${clean}/using-frame-ship/SKILL.md`;
  if (bootstrapCachePath === skillFile && bootstrapCacheText) return bootstrapCacheText;
  try {
    let raw = "";
    const bunFile = (globalThis as unknown as {
      Bun?: { file: (p: string) => { text: () => Promise<string> } };
    })?.Bun?.file;
    if (typeof bunFile === "function") {
      raw = await bunFile(skillFile).text();
    } else {
      // @ts-ignore — node types intentionally not installed; dynamic import only.
      const fs = (await import("node:fs/promises")) as unknown as {
        readFile: (p: string, enc: string) => Promise<string>;
      };
      raw = await fs.readFile(skillFile, "utf8");
    }
    const body = (raw || "").trim();
    if (!body) return "";
    const labeled = `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${body}`;
    bootstrapCachePath = skillFile;
    bootstrapCacheText = labeled;
    return labeled;
  } catch {
    return ""; // silent fallback — pointers above still orient the session
  }
}

type AgentMode = "primary" | "all" | "subagent";

interface AgentManifestEntry {
  key: string;
  file: string;
  mode: AgentMode;
}

// Static roster manifest — 74 keys, re-verified by fresh `agents/**/*.md`
// disk re-scan at execute time (77 files minus AGENTS.md, README.md,
// delegation-contract.md). Key = file stem; sole alias:
// `engineering/espinoza.md` → key `espinoza-specialist` (c-level `espinoza`
// keeps key `espinoza`). Modes: `montilla` primary, 8 C-levels `all`,
// 65 specialists `subagent`. Bodies/descriptions are read by path at init —
// never pasted here (reference-only provenance).
const AGENTS_MANIFEST: readonly AgentManifestEntry[] = [
  { key: "montilla", file: "c-level/montilla.md", mode: "primary" },
  { key: "barrera", file: "c-level/barrera.md", mode: "all" },
  { key: "dauhajre", file: "c-level/dauhajre.md", mode: "all" },
  { key: "espinoza", file: "c-level/espinoza.md", mode: "all" },
  { key: "montero", file: "c-level/montero.md", mode: "all" },
  { key: "santana", file: "c-level/santana.md", mode: "all" },
  { key: "subero", file: "c-level/subero.md", mode: "all" },
  { key: "vasquez", file: "c-level/vasquez.md", mode: "all" },
  { key: "vera", file: "c-level/vera.md", mode: "all" },
  { key: "architect", file: "engineering/architect.md", mode: "subagent" },
  { key: "automation-engineer", file: "engineering/automation-engineer.md", mode: "subagent" },
  { key: "automation-reviewer", file: "engineering/automation-reviewer.md", mode: "subagent" },
  { key: "backend", file: "engineering/backend.md", mode: "subagent" },
  { key: "data-engineer", file: "engineering/data-engineer.md", mode: "subagent" },
  { key: "devops", file: "engineering/devops.md", mode: "subagent" },
  { key: "espinoza-specialist", file: "engineering/espinoza.md", mode: "subagent" },
  { key: "frontend", file: "engineering/frontend.md", mode: "subagent" },
  { key: "qa", file: "engineering/qa.md", mode: "subagent" },
  { key: "review-data", file: "engineering/review-data.md", mode: "subagent" },
  { key: "review-readability", file: "engineering/review-readability.md", mode: "subagent" },
  { key: "review-refuter", file: "engineering/review-refuter.md", mode: "subagent" },
  { key: "review-reliability", file: "engineering/review-reliability.md", mode: "subagent" },
  { key: "review-resilience", file: "engineering/review-resilience.md", mode: "subagent" },
  { key: "review-risk", file: "engineering/review-risk.md", mode: "subagent" },
  { key: "grc-analyst", file: "security/grc-analyst.md", mode: "subagent" },
  { key: "iam-specialist", file: "security/iam-specialist.md", mode: "subagent" },
  { key: "incident-responder", file: "security/incident-responder.md", mode: "subagent" },
  { key: "privacy-engineer", file: "security/privacy-engineer.md", mode: "subagent" },
  { key: "security", file: "security/security.md", mode: "subagent" },
  { key: "security-reviewer", file: "security/security-reviewer.md", mode: "subagent" },
  { key: "accountant", file: "finance/accountant.md", mode: "subagent" },
  { key: "cost-analyst", file: "finance/cost-analyst.md", mode: "subagent" },
  { key: "credit-analyst", file: "finance/credit-analyst.md", mode: "subagent" },
  { key: "finance-reviewer", file: "finance/finance-reviewer.md", mode: "subagent" },
  { key: "financial-analyst", file: "finance/financial-analyst.md", mode: "subagent" },
  { key: "fpna-analyst", file: "finance/fpna-analyst.md", mode: "subagent" },
  { key: "internal-auditor", file: "finance/internal-auditor.md", mode: "subagent" },
  { key: "investment-analyst", file: "finance/investment-analyst.md", mode: "subagent" },
  { key: "payroll-specialist", file: "finance/payroll-specialist.md", mode: "subagent" },
  { key: "personal-finance", file: "finance/personal-finance.md", mode: "subagent" },
  { key: "personal-investor", file: "finance/personal-investor.md", mode: "subagent" },
  { key: "risk-analyst", file: "finance/risk-analyst.md", mode: "subagent" },
  { key: "tax-specialist", file: "finance/tax-specialist.md", mode: "subagent" },
  { key: "treasurer", file: "finance/treasurer.md", mode: "subagent" },
  { key: "compliance-officer", file: "legal/compliance-officer.md", mode: "subagent" },
  { key: "contract-drafter", file: "legal/contract-drafter.md", mode: "subagent" },
  { key: "ip-counsel", file: "legal/ip-counsel.md", mode: "subagent" },
  { key: "labor-counsel", file: "legal/labor-counsel.md", mode: "subagent" },
  { key: "legal-researcher", file: "legal/legal-researcher.md", mode: "subagent" },
  { key: "legal-reviewer", file: "legal/legal-reviewer.md", mode: "subagent" },
  { key: "litigation-counsel", file: "legal/litigation-counsel.md", mode: "subagent" },
  { key: "privacy-counsel", file: "legal/privacy-counsel.md", mode: "subagent" },
  { key: "brand-reviewer", file: "marketing/brand-reviewer.md", mode: "subagent" },
  { key: "brand-strategist", file: "marketing/brand-strategist.md", mode: "subagent" },
  { key: "content-strategist", file: "marketing/content-strategist.md", mode: "subagent" },
  { key: "copywriter", file: "marketing/copywriter.md", mode: "subagent" },
  { key: "email-marketer", file: "marketing/email-marketer.md", mode: "subagent" },
  { key: "marketing-analyst", file: "marketing/marketing-analyst.md", mode: "subagent" },
  { key: "ppc-specialist", file: "marketing/ppc-specialist.md", mode: "subagent" },
  { key: "seo", file: "marketing/seo.md", mode: "subagent" },
  { key: "social-media", file: "marketing/social-media.md", mode: "subagent" },
  { key: "friction-mediator", file: "people/friction-mediator.md", mode: "subagent" },
  { key: "people-operations", file: "people/people-operations.md", mode: "subagent" },
  { key: "people-reviewer", file: "people/people-reviewer.md", mode: "subagent" },
  { key: "performance-analyst", file: "people/performance-analyst.md", mode: "subagent" },
  { key: "deal-closer", file: "revenue/deal-closer.md", mode: "subagent" },
  { key: "funnel-optimizer", file: "revenue/funnel-optimizer.md", mode: "subagent" },
  { key: "pricing-strategist", file: "revenue/pricing-strategist.md", mode: "subagent" },
  { key: "revenue-reviewer", file: "revenue/revenue-reviewer.md", mode: "subagent" },
  { key: "revops-analyst", file: "revenue/revops-analyst.md", mode: "subagent" },
  { key: "explore", file: "shared/explore.md", mode: "subagent" },
  { key: "general", file: "shared/general.md", mode: "subagent" },
  { key: "scout", file: "shared/scout.md", mode: "subagent" },
  { key: "writer", file: "shared/writer.md", mode: "subagent" },
];

export const FrameShipPlugin: Plugin = async ({ directory, worktree }: PluginInput) => {
  const fallbackBase = (directory || worktree || "").replace(/[/\\]+$/, "");
  const skillsDir = resolveSkillsDir(fallbackBase);

  return {
    // Runs once on init with the merged config. Appends our skills dir to
    // `skills.paths` (scanned recursively for **/SKILL.md). Idempotent:
    // never duplicates, never clobbers user paths.
    config: async (cfg: Config) => {
      const c = cfg as Config & { skills?: { paths?: string[] } };
      c.skills ??= {};
      c.skills.paths ??= [];
      if (!skillsDir || skillsDir === "/skills") return; // no resolvable base — don't pollute
      if (!c.skills.paths.includes(skillsDir)) c.skills.paths.push(skillsDir);
    },
    "experimental.chat.system.transform": async (_input: unknown, output: unknown) => {
      const out = output as { system?: unknown };
      if (!Array.isArray(out.system)) return;
      if (hasMarker(out.system)) return; // idempotent — no duplication on retries
      out.system.push(WORKFLOW_CARD, GUARDRAILS_FULL, POINTERS);
      const bootstrap = await loadBootstrapBody(skillsDir);
      if (bootstrap) out.system.push(bootstrap);
    },
    "experimental.session.compacting": async (_input: unknown, output: unknown) => {
      const out = output as { context?: unknown };
      if (!Array.isArray(out.context)) return;
      if (hasMarker(out.context)) return;
      out.context.push(COMPACTION_REMINDER);
    },
  };
};

// Default export mirrors the named export. The v1 loader calls every function
// export (named or default) with dedupe, so either shape loads; shipping both
// keeps direct-file and directory-package installs working.
export default FrameShipPlugin;
