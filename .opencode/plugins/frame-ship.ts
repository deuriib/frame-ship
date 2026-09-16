/**
 * frame-ship v0.3.0 — Frame→Ship workflow plugin for opencode
 *
 * Local plugin. Single-file, zero dependencies.
 * Location: .opencode/plugins/frame-ship.ts (auto-discovered per-project).
 * Global (style named path): "plugin": ["frame-ship@file:///D:/GitHub/frame-ship"]
 *   — requires the root package.json (name + main) so Bun can install the
 *   directory; skills resolve relative to this file via import.meta.url.
 *
 * What it does:
 * - Registers ./skills/ via `config.skills.paths` so the native `skill` tool discovers all 9 stages
 * - Injects the Frame→Ship chain contract + MANDATORY LOAD ORDER + role bindings + hard rules into every session
 * - Injects full guardrails inline AND points to AGENTS.md / skills/ as source of truth
 * - Injects the live using-frame-ship SKILL.md body via runtime file read (fallback: pointers only)
 * - Preserves chain across compaction so long sessions don't lose process
 *
 * Chain:
 *   frame-intent → translate-to-spec → propose-changes → review-security/review-architecture
 *     → execute-spec → quality-gate → verify-handoff → ship-release
 *
 * Skills (source of truth, in ./skills/):
 *   using-frame-ship (bootstrap),
 *   frame-intent, translate-to-spec, propose-changes,
 *   review-security, review-architecture, execute-spec,
 *   quality-gate, verify-handoff, ship-release
 *
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import type { Config, Plugin, PluginInput } from "@opencode-ai/plugin";

const VERSION = "0.3.0";
const MARKER = `[frame-ship v${VERSION}]`;

// Compact always-on card. Full detail stays in skills/*/SKILL.md — this is the pointer + contract.
const WORKFLOW_CARD = `${MARKER} Frame→Ship workflow (authoritative order, do not skip):
frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release

MANDATORY LOAD ORDER — HARD STOP, no exceptions:
1. skill(using-frame-ship) — bootstrap already injected here; do NOT skip, do NOT re-derive the chain by guess.
2. skill(<stage>) via native skill tool — BEFORE any read/edit/bash/task for that stage. No skill = STOP.
3. read(agents/<domain>/<agent>.md) — the ONE template for the dispatched role. Skill = process (order/gates), template = craft (how). Both required, every task, single AND multi.
4. Only then: edit/bash/task. Pre-flight: skill loaded? template read (cite path)? packet SPEC/HARD/GATE/DOMAINS ready? If any NO → STOP, load first, retry max N=2 with different approach, then escalate to montilla. Never third loop, never sideways.

Execution modes (frozen at frame-intent, rides every packet):
- single: skill(stage) + read(1 template) then execute DIRECTLY (no task dispatch). Still produces test/evidence matrix + domain checks. Cite skill + template path in output.
- multi-subagents (default): skill(stage) + read(C-level template), then task(subagent_type="general") per domain (max 2 parallel). Each task prompt MUST order the subagent to: read(stage SKILL.md) + read(its agent template) BEFORE acting, accept SPEC/HARD/GATE/DOMAINS by reference only, return deliverable + risks + assumptions + scoped evidence.

Stage triggers — load the named skill before acting:
- "session start / what skills / how does frame-ship work" → using-frame-ship (bootstrap, load first, re-load after compaction)
- "start initiative / define OKRs / strategic planning" → frame-intent (owner: montilla/CEO, out: docs/briefs/BRIEF-<slug>.md + OKRs)
- "brief approved / new domain spec" → translate-to-spec (owners: vasquez/barrera/dauhajre/subero/vera/santana/montero/espinoza, out: REQ-IDs + ARCHITECTURE.md + API_CONTRACTS.md)
- "ready to implement / needs pre-approval" → propose-changes (owners: leaf specialists + C-level, out: docs/specs/40_workspace/<agent>/PROPOSED_CHANGES.md, repo untouched)
- "touches auth/data/external API / CISO sign-off" → review-security (owner: barrera + security-reviewer/review-risk/privacy-engineer, out: SECURITY_REVIEW.md + STRIDE verdict Approved/Conditional/Rejected)
- "modifies public API / data model / cross-cutting" → review-architecture (owner: vasquez + architect, out: ADR + contract verdict)
- "implement approved spec / execute SPEC-XXX" → execute-spec (owners: backend/frontend/devops/data-engineer, impl only approved files, REQ-ID→test trace)
- "run quality gate / gate SPEC-XXX" → quality-gate (gate keeper: owning C-level, montilla synthesizes; engineering: readability/reliability/refuter/resilience/risk/qa/data; other domains: single reviewer; CLOSED on any fail)
- "work complete / needs review before ship" → verify-handoff (owner: owning C-level, out: HANDOFF.md via DoD checklist; no OPEN gate = no handoff)
- "verified / ready to ship / tagged release" → ship-release (owners: montilla + vasquez/devops, out: RELEASE_NOTES.md + changelog + rollback plan + archive)

Role bindings (single-primary-owner):
montilla owns briefs + multi-domain gates + releases. vasquez owns ARCHITECTURE.md/API_CONTRACTS.md + arch verdicts. barrera owns security verdicts. Specialists never self-dispatch, never approve own proposal.

Hard rules (non-negotiable):
1. NEVER write code without an approved proposal.
2. NEVER skip security review for auth/data/API changes.
3. NEVER modify architecture contracts without an ADR.
4. NEVER hand off with a CLOSED gate unless waived by c-levels + CEO with waiver record.
5. ALWAYS trace REQ-ID → test → artifact → gate verdict.
6. ALWAYS produce HANDOFF.md before shipping.
7. Reference-only packets between stages — never paste full context.
`;

// Both: full guardrails inline + pointer to AGENTS.md (per user: "both").
const GUARDRAILS_FULL = `${MARKER} Guardrails (enforced BEFORE dispatch, verified AFTER execution):
Security baseline — deny by default:
1. Deny by default; evidence or refuted — no secret/token/credential/session material in code, config, logs, examples, events. Finding without proof (diff/scan/log pointer) = REFUTED.
2. OWASP by default — screen every change for injection, broken authN/Z, sensitive-data exposure, insecure deps, missing access controls. New endpoints/adapters/boundaries/payloads are trust boundaries until proven otherwise.
3. Least privilege — minimum scope for every interface/key/role/automation. Wide interfaces, shared creds, cross-tenant mutable state = findings.
4. No freelance fixes — never rotate keys, patch prod, or widen permissions yourself. Report severity + fix location; owner remediates.
Privacy + data hygiene (Ley 172-13):
5. Minimization — minimum PII for purpose. Map every PII flow: source → store → log → third party.
6. Boundary hygiene — every port/adapter/event/log/prompt is a PII checkpoint. Mask/tokenize examples; allowlists over full objects.
7. Retention explicit — every PII store declares purpose + TTL + deletion path. Purge expired state post-snapshot with governed deletes.
8. Scoped export only — on PASS export allowlisted evidence for gated unit only. Never full dump; never PII in shares/signals/lessons/bridge.
Severity + triage:
9. Critical (exploitable/prod/data loss), High (probable impact), Medium (conditional/edge), Low (hygiene).
10. Critical/High surface immediately, same session, with severity + evidence + owner. Medium/Low ride normal gate.
11. Residual risk explicit — APPROVE with conditions lists remaining risk + owner. No silent PASS.
Conduct: 12. No sugarcoating. 13. No busywork theater — guards earn keep or die. 14. Respect attention — one point per paragraph, state assumptions on irreversible steps.
FAIL → retry N=2 with different approach → escalate. Never third loop, never sideways.`;

const POINTERS = `${MARKER} Sources of truth (read before acting):
- "Haces las cosas como para Dios…"), dispatch contract, guardrails 1-14.
- skills/using-frame-ship/SKILL.md (bootstrap first), skills/frame-intent/SKILL.md, translate-to-spec, propose-changes, review-security, review-architecture, execute-spec, quality-gate, verify-handoff, ship-release + their references/ templates.
- agents/<domain>/<agent>.md templates are REQUIRED reads (not optional cites) — skill + template, every task. Dispatch via task(subagent_type="general") with explicit read orders; no custom subagent_type until agents are natively registered.
- Chain entry: frame-intent (after bootstrap).
- Chain close: ship-release (lessons captured on PASS).`;

const COMPACTION_REMINDER = `${MARKER} Frame→Ship survives compaction. Re-load using-frame-ship first, then the active stage skill + its agent template BEFORE resuming. Active chain: frame-intent → translate-to-spec → propose-changes → review-* → execute-spec → quality-gate → verify-handoff → ship-release. Keep REQ-ID→test→artifact trace, gate verdicts, execution_mode (single|multi-subagents), and current stage. No skill + template = STOP. No code without approved proposal. No handoff on CLOSED gate.`;

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

// Live bootstrap: SKILL.md body only (references stay file-based per scope).
// Runtime file read keeps a single source of truth — no hardcoded copy to drift.
const BOOTSTRAP_LABEL = `${MARKER} using-frame-ship bootstrap (live from skills/using-frame-ship/SKILL.md):`;
const BOOTSTRAP_ACK = `NOTE: using-frame-ship is already loaded in this context — do not re-load it via the skill tool; route straight to the stage skill.`;
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
