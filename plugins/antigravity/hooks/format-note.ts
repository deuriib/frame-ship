#!/usr/bin/env node
/**
 * format-note.ts — PostToolUse observer on write events, run via `node plugins/antigravity/hooks/format-note.ts`.
 *
 * stdin:  PostToolUse JSON { toolCall, stepIdx, error?, ... } (drained, never logged)
 * stdout: always `{}` — this hook never blocks, never gates, never injects.
 * exit 0 always on handled payload.
 */

import { readFileSync } from "node:fs";

async function drain(): Promise<void> {
  const maybeBun = (globalThis as unknown as { Bun?: { stdin?: { text?: () => Promise<string> } } }).Bun;
  if (maybeBun?.stdin?.text) {
    try {
      await maybeBun.stdin.text();
      return;
    } catch {
      // fall through to node read
    }
  }
  try {
    readFileSync(0, "utf8");
  } catch {
    // empty stdin — nothing to drain, still emit {}
  }
}

await drain();
console.log("{}");
