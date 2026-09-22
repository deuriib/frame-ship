/**
 * frame-ship — Frame→Ship composed entry point: runs the skills lane
 * (./skills.ts, id "frame-ship"), the agents lane (./agents.ts, id
 * "frame-ship-agents"), and the guardrails lane (./guardrails.ts, id
 * "frame-ship-guardrails") under the original single id "frame-ship".
 * Version lockstep lives in ./shared.ts (header + const VERSION).
 * This file preserves the historical single-file contract: package installs
 * (package.json `main`) and existing
 * `plugins: ["./plugins/opencode/frame-ship.ts"]` entries keep full behavior
 * with zero config changes. Loading it is equivalent to listing ./skills.ts +
 * ./agents.ts + ./guardrails.ts — never list this file together with any of
 * them (duplicate id "frame-ship" with ./skills.ts).
 * Location: plugins/opencode/frame-ship.ts.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import skills from "./skills";
import agents from "./agents";
import guardrails from "./guardrails";

export default Plugin.define({
  id: "frame-ship",
  async setup(ctx) {
    await skills.setup?.(ctx);
    await agents.setup?.(ctx);
    await guardrails.setup?.(ctx);
  },
});
