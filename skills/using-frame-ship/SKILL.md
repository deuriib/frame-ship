---
name: using-frame-ship
description: Introduction to the Frame→Ship skills system and chain contract. Use when a session starts, after compaction, or when asking what frame-ship does. Triggered by "what are your skills", "how does frame-ship work", or session bootstrap.
---

# Using-Frame-Ship — Bootstrap and Chain Contract

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Make the Frame→Ship chain live from the first message. This skill is the
bootstrap: it teaches the agent that skills trigger automatically, states the
authoritative stage order, and points to the stage skill that owns each kind
of work. No briefs, specs, or code are produced here.

## 2. Chain Contract

- Previous: none (bootstrap loads before chain entry)
- Next: frame-intent (chain entry for new initiatives)

```text
using-frame-ship (bootstrap) → frame-intent → translate-to-spec → propose-changes
  → review-security/review-architecture → execute-spec → quality-gate
  → verify-handoff → ship-release
```

## 2b. Role Binding (Org)

- **Bound to:** every agent in session — this skill binds behavior, not a role.
- Single-primary-owner rule still applies per stage: `montilla` owns briefs +
  multi-domain gates + releases; `vasquez` owns architecture verdicts;
  `barrera` owns security verdicts. Specialists never self-dispatch, never
  approve their own proposal.

## 3. Process

1. Check for relevant skills before any task — mandatory workflows, not
   suggestions. Load the named stage skill via the native `skill` tool before
   acting (see `references/tool-mapping.md`).
2. Route by trigger, never by guess:
   - new initiative / OKRs / strategic planning → `frame-intent`
   - brief approved / new domain spec → `translate-to-spec`
   - ready to implement / needs pre-approval → `propose-changes`
   - touches auth/data/external API → `review-security`
   - modifies public API / data model / cross-cutting → `review-architecture`
   - approved spec → `execute-spec`
   - implementation ready for review → `quality-gate`
   - work complete, needs review before ship → `verify-handoff`
   - verified, ready to ship → `ship-release`
3. Enforce the hard rules on every step (see `references/bootstrap-checklist.md`):
   proposal before code, security review for auth/data/API, ADR for contract
   changes, no handoff on CLOSED gate without c-levels + CEO waiver,
   `REQ-ID → test → artifact → gate verdict` trace, `HANDOFF.md` before ship,
   reference-only packets between stages.
4. After compaction, re-load this skill first, then resume at the recorded
   stage with trace and gate verdicts intact.

## 4. What I won't do

- Write briefs, specs, proposals, code, or releases (→ stage skills).
- Skip stages or approve my own work.
- Paste full context between stages — reference-only packets.

## 5. References

- `references/bootstrap-checklist.md` — Session-start and post-compaction checks.
- `references/tool-mapping.md` — Action phrases to native tool names per harness.
