---
trigger: model_decision
description: Use when writing or editing a README, docs page, agent-instruction
  file, or changelog, to put the change in the right file and match the file
  already there.
---

# Docs Authoring

How to write the doc, once `docs-upkeep` has established that one is required.

## Nearest first

Update the closest doc to the change and climb only when the change is
cross-cutting. Touch the root `README.md` for a new area, a move or rename, or a
convention that now applies everywhere — nothing else.

| Change | Where it goes |
| --- | --- |
| An internal function, module, or detail | The page owning that file, often no change |
| A command, flag, or config key | The owning `README.md` table or behavior section |
| A whole subsystem | Its `docs/**/*.md` page |
| A new area, a move, a rename, a global convention | The root `README.md` |

## Match the file

- **Preserve the existing structure.** Reuse the headings, voice, and length
  already in the file. A new section in an old doc follows the old doc's shape.
- **One point per paragraph.** A wall of undifferentiated prose is skipped; one
  idea per paragraph is read.
- **Write in English.** Code, comments, commits, and docs are English artifacts
  even when the conversation is not.
- **Update the owning table, not just the paragraph.** A new flag with no row in
  the CLI table does not exist for the reader.
- **Keep the agent-instruction file in step with the docs.** When a convention
  changes, the startup file describes it the same way the page does — two
  phrasings of one rule is a third rule.

## Examples must be true

- **Run it, then paste it.** Every command, code block, and snippet comes from a
  terminal that actually executed it. An invented example is a bug that teaches
  the wrong thing.
- **Check every link resolves.** A link with a typo, stray quotes, or a moved
  target is a dead end the reader cannot debug.
- **State the assumptions of a snippet that cannot run** — version, platform,
  environment, or setup — instead of implying it runs bare.

## Do not rewrite what you did not need to touch

- **No drive-by rewrites.** Never reword a doc you did not have to change.
- **No bundled polish.** Unrelated doc improvements do not ride along in a
  behavior change — they hide the real diff and inflate the review.
- **A wording fix without a behavior fix is its own commit**, and it says so.
