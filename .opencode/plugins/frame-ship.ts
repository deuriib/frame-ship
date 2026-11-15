/**
 * frame-ship — Frame→Ship composed entry point: runs the skills lane
 * (./skills.ts, id "frame-ship-skills"), the guardrails lane (./guardrails.ts,
 * id "frame-ship-guardrails"), and the commands lane (./commands.ts, id
 * "frame-ship-commands") under the single id "frame-ship".
 * Version lockstep lives in ../lib/shared.ts (header + const VERSION).
 * This file preserves the single-file contract: package installs
 * (package.json `main`) and existing
 * `plugins: ["./.opencode/plugins/frame-ship.ts"]` entries keep full behavior
 * with zero config changes. Loading it is equivalent to listing ./skills.ts +
 * ./guardrails.ts + ./commands.ts — never list this file together with any of
 * them.
 * Location: .opencode/plugins/frame-ship.ts.
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import skills from "./skills";
import guardrails from "./guardrails";
import commands from "./commands";

export default Plugin.define({
  id: "frame-ship",
  async setup(ctx) {
    await skills.setup?.(ctx);
    await guardrails.setup?.(ctx);
    await commands.setup?.(ctx);
  },
});
