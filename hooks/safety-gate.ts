#!/usr/bin/env bun
/**
 * safety-gate.ts — PreToolUse gate on `run_command`, run via `bun ./hooks/safety-gate.ts`.
 *
 * stdin:  PreToolUse JSON { toolCall: { name, args: { CommandLine } }, stepIdx, ... }
 * stdout: single JSON { decision: "allow"|"deny"|"ask"|"force_ask"|"deny_unless_prior_grant", reason? }
 * exit 0 always on handled payload; non-zero only on catastrophic I/O failure.
 *
 * Security: reason names the RULE, never echoes the matched value (no secret exfil via reason/logs).
 */

import { readFileSync } from "node:fs";

type Decision = "allow" | "deny" | "ask" | "force_ask" | "deny_unless_prior_grant";

const DENY_PATTERNS: Array<{ re: RegExp; rule: string }> = [
  { re: /\brm\s+-rf\b/i, rule: "destructive recursive delete" },
  { re: /\bmkfs\b/i, rule: "filesystem format command" },
  { re: /\bdiskpart\b/i, rule: "disk partition command" },
  { re: /:\(\)\s*\{\s*:\|\:&\s*\}\s*;/, rule: "fork bomb pattern" },
  { re: /AKIA[0-9A-Z]{16}/, rule: "possible AWS access key material" },
  { re: /BEGIN (?:RSA |OPENSSH |DSA |EC )?PRIVATE KEY/, rule: "possible private key material" },
  { re: /\bsk-live-[0-9A-Za-z]{8,}/, rule: "possible live secret key material" },
  { re: /\bxox[bpras]-[0-9A-Za-z-]{8,}/, rule: "possible chat-platform token material" },
  { re: /\bcurl\b[^|]*\|\s*(?:sh|bash)\b/i, rule: "pipe-to-shell download pattern" },
  { re: /\bwget\b[^|]*\|\s*(?:sh|bash)\b/i, rule: "pipe-to-shell download pattern" },
  { re: /Invoke-Mimikatz/i, rule: "credential-dumping tool invocation" },
];

const ASK_PATTERNS: Array<{ re: RegExp; rule: string }> = [
  { re: /\bsudo\b/i, rule: "privilege escalation" },
  { re: /\bchmod\s+-R\b/i, rule: "recursive permission change" },
  { re: /\brm\s+-r\b/i, rule: "recursive delete" },
  { re: /\bformat\s+[A-Z]:/i, rule: "volume format" },
  { re: /\bdel\s+\/[FSQ]/i, rule: "bulk delete flags" },
];

async function readStdin(): Promise<string> {
  const maybeBun = (globalThis as unknown as { Bun?: { stdin?: { text?: () => Promise<string> } } }).Bun;
  if (maybeBun?.stdin?.text) {
    try {
      return await maybeBun.stdin.text();
    } catch {
      // fall through to node read
    }
  }
  return readFileSync(0, "utf8");
}

function emit(obj: { decision: Decision; reason?: string }): void {
  console.log(JSON.stringify(obj));
}

async function main(): Promise<void> {
  const raw = (await readStdin()).trim();
  if (!raw) {
    emit({ decision: "ask", reason: "Unreadable hook payload — manual review before running." });
    return;
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    emit({ decision: "ask", reason: "Unreadable hook payload — manual review before running." });
    return;
  }
  const toolCall = (payload as { toolCall?: { name?: unknown; args?: Record<string, unknown> } }).toolCall;
  const cmd = String(toolCall?.args?.["CommandLine"] ?? "");

  for (const { re, rule } of DENY_PATTERNS) {
    if (re.test(cmd)) {
      emit({ decision: "deny", reason: `Blocked: ${rule}. Run a narrower, reviewed command instead.` });
      return;
    }
  }
  for (const { re, rule } of ASK_PATTERNS) {
    if (re.test(cmd)) {
      emit({ decision: "ask", reason: `Needs confirmation: ${rule}. Confirm scope before running.` });
      return;
    }
  }
  emit({ decision: "allow", reason: "No destructive or secret-bearing pattern detected." });
}

await main();
