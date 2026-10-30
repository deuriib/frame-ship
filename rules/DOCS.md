---
trigger: model_decision
description: "Apple this guideline for Docs rules"
globs:
---

# Docs Upkeep Rules

- **DOC-01** behavior, flag, installed path, convention, or structure change ships with its nearest `README.md` / `PRODUCT.md` / `AGENTS.md` / `docs/**/*.md` update in the same commit/PR — no "docs later".
- **DOC-02** nearest-first: update the closest doc to the change; touch root only when the change is cross-cutting (new area, move/rename, global convention).
- **DOC-03** artifacts in English, preserve existing doc structure, one point per paragraph; code examples must be verified, not invented.
- **DOC-04** always update the owning `README` CLI table or behavior section plus any affected `AGENTS.md`.
- **DOC-05** no drive-by rewrites: never reword untouched docs, never bundle unrelated doc polish into a behavior PR.
- **DOC-06** trivial-only edits (typo, formatting, no behavior change) need no code change; verify with `git status` showing code + docs together when a behavior trigger applies.
