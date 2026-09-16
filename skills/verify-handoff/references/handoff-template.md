# Handoff: {{AGENT_ROLE}}

**Spec Reference:** SPEC-XXX
**Agent:** [name]
**Date:** YYYY-MM-DD
**Status:** complete | blocked | partial
**Domains-Touched:** [per spec]
**Load Evidence:** skill([stage]) + read(agents/[domain]/[agent].md) + mode(single|multi-subagents) — paths cited, missing = no handoff

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| Implementation | `src/feature/` | done |
| Tests / Evidence | `tests/feature/` OR sign-off path (e.g. `docs/signoffs/dauhajre-close.md`) | done |
| Docs | `docs/feature.md` | pending |
| Domain artifact | [e.g. `contracts/MSA-v3-signed.pdf` \| `campaigns/launch-q3/` \| `workflows/billing-close.md`] | done/pending/N/A |

## Definition of Done Checklist

- [ ] Acceptance criteria satisfied (all domains)
- [ ] Tests/evidence linked per REQ-ID
- [ ] Load evidence present (skill + template paths + mode + packet)
- [ ] Domain checks passing (Common + touched-domain appendix in `dod-checklist.md`)
- [ ] Security checks passing (if security-touched)
- [ ] Documentation / filing / comms updated as applicable

## Blockers / Open Questions

[Anything preventing completion]

## Next Agent

[Who picks this up next, and what they need to do]
