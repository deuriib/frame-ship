---
trigger: always_on
description: Use when finishing any change that alters behavior, a flag, an
  installed path, a convention, or repository structure, to ship the matching
  doc update in the same diff.
---

# Docs Upkeep

A change that alters what the project does, installs, or expects is not done
while the doc that describes it says something else. Docs are part of the
diff, not a follow-up ticket.

## The gate

- **Ship the doc with the change, in the same commit or PR.** A behavior, flag,
  installed path, convention, or structure change carries its owning
  `README.md`, product doc, agent-instruction file, or `docs/**/*.md` update.
  "Docs later" is a no.
- **A new area needs its entry point.** A new command, directory, harness, or
  config key gets a line in the doc that lists its siblings — otherwise it does
  not exist for the reader.
- **Prove it before calling it done.** `git status` shows the code and the doc
  together. If you have to go looking for the doc, the change is not finished.

## Exemptions

- **Trivial edits need no code.** A typo, a formatting fix, or a wording change
  with no behavior behind it ships alone. That is a docs-only commit.
- **Exempt is narrow.** The exemption covers the change with *no* behavior. The
  moment behavior moves, the obligation is back.
- **Never weaken the gate to pass.** Do not edit the doc to match a bug, and do
  not delete the sentence that became wrong. Fix the code, or state the change.

Where the doc goes and how to write it is `docs-authoring`.
