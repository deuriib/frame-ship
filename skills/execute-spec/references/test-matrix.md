# Test / Evidence Matrix: SPEC-XXX

**Agent:** [specialist name]
**Date:** YYYY-MM-DD
**Domains-Touched:** [per spec]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | [description] | Unit | pass | [sha] |
| REQ-002 | T-002 | [description] | Integration | pass | [sha] |
| REQ-F-001 | E-001 | [e.g. finance owner sign-off on close checklist] | Sign-off | pass | [sha] |
| REQ-L-001 | E-002 | [e.g. legal owner redline approval] | Review | pass | [sha] |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`. Code REQs use tests; non-code REQs use review/sign-off/attestation with artifact path — REQ-ID trace mandatory for all 8 domains.

## Coverage Summary

- Unit coverage: [XX% — engineering only, N/A for non-code with justification]
- Integration coverage: [XX% — engineering only]
- Evidence coverage: [X/Y REQ-IDs with linked artifact or sign-off]
- Acceptance criteria covered: [X/Y]
