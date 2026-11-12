---
description: Run the Frame→Ship chain for an AI/LLM feature
argument-hint: "[feature]"
---
Run the Frame→Ship chain for ${1:-the AI feature} (AI/LLM): frame-intent → translate-to-spec → propose-changes → review-security (STRIDE on the AI boundary) → execute-spec → quality-gate (model QA) → verify-handoff → ship-release. No code before approval.
