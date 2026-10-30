---
trigger: always_on
description: "Apply these guidelines for Deny rules"
globs:
---

# Deny Rules — hard gates, no silent pass

- **DENY-01** forbids emitting secrets into any destination — code, config, logs, prompts, examples, events, tickets, or commits. Do not write the literal value anywhere.
- **DENY-02** This output would expose personally identifiable information (PII). Do not write it anywhere — not in logs, prompts, exports, specs, commits, examples, or ads.
- **DENY-03**: string-built SQL, `eval`, shell injection, path traversal, unsafe deserialization, and XXE are forbidden. Use parameterized queries only. Validate input and encode output.
- **DENY-04** forbids disabling, skipping, or weakening a gate, scan, or check to pass. A red or unrun suite is not done.
- **DENY-05**: manual production changes outside the pipeline are forbidden. The pipeline is the only path to production — branch → PR → required checks → progressive deploy.
- **DENY-07** forbids shipping AI-generated or draft content without human review, fact-check, and required disclosure. No draft goes live on its own.
- **DENY-08** forbids verbal commitments, side letters, shadow pipelines, and off-books entries — nothing leaves the machine without a written, approved record.
- **DENY-11** — a destructive schema change or data deletion without backup, a rehearsed rollback, and a legal-hold check is denied. Halt and escalate; do not run the command.
- **DENY-12**: no self-merge, no direct-to-`main`, and no unreviewed pipeline changes.
