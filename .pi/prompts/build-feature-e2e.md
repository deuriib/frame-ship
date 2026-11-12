---
description: Run the Frame→Ship chain for a feature (API, frontend, tests, CI/deploy)
argument-hint: "[feature]"
---
Run the Frame→Ship chain for ${1:-the feature}: frame-intent → translate-to-spec → propose-changes → review-security/review-architecture (as required) → execute-spec → quality-gate → verify-handoff → ship-release. No code before an approved PROPOSED_CHANGES; no handoff on a CLOSED gate.
