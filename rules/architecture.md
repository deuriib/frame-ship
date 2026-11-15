---
trigger: model_decision
description: Use when designing or changing module, service, or system
  boundaries — dependencies, layering, data ownership, or a rewrite — to keep
  the core decoupled and the migration reversible.
---

# Architecture

Applies when you decide where code lives and what may depend on what. For the
shape of a single function, see `engineering-standards`.

## Dependencies

- **Depend on abstractions.** A high-level policy imports a port it owns, not a
  driver that owns it. Concretions are injected at the entry point.
- **Small role interfaces.** One capability per interface, named after the
  caller's need. A wide interface forces every implementation to fake the parts
  it does not have.
- **One reason to change.** A module has one axis of change. When two unrelated
  requirements both edit the same file, the boundary is wrong.
- **Composition over inheritance.** Inherit for a genuine is-a with substitutable
  behaviour; compose for everything else.
- **I/O at the edges.** Keep the domain free of framework, database, and HTTP
  concerns so it can be tested and reused without them.

## Boundaries

- **Hexagonal core.** Business rules sit at the centre with zero framework, DB,
  or transport imports. Adapters implement the ports on the outside.
- **DDD boundaries where the language is rich.** Aggregates guard their own
  invariants; cross-aggregate consistency is eventual.
- **Modular monolith first.** One deployable with enforced module boundaries.
  Extract a service only when a boundary has a measured reason — independent
  scaling, a different failure domain, or a different team cadence.
- **Contract-first, versioned APIs.** The schema is the agreement and is
  reviewed like code. Version it; never change a published contract in place.
- **No distributed monolith.** Shared deployment coupling, synchronous chains
  across services, or one database owned by several services.
- **No shared database.** One writer per table. Reading another service's
  tables is coupling with extra latency.
- **No single point of failure** in a path that must stay available. Redundancy
  is designed, not discovered during an incident.

## Change

- **Strangler Fig, not big bang.** Route traffic to the new path incrementally
  behind a flag while the old path still works. Every step is shippable and
  reversible.
- **Ship behind flags with kill switches.** A change that cannot be turned off
  without a deploy is not safe to turn on.
- **Infrastructure as code, versioned and tested.** No console-made resources.
  The repo is the only source of truth for the environment.
- **Environment parity.** Same shape across dev, staging, and production so a
  configuration difference is not the surprise during rollout.

## Banned shapes

Name the anti-pattern in review; there is no version of these worth tolerating.

| Anti-pattern | What it looks like | Instead |
| --- | --- | --- |
| God Object | One class or module that knows everything | Split along axes of change |
| Spaghetti | Control flow with no readable structure | Extract named steps, early returns |
| Golden Hammer | One familiar tool applied to every problem | Pick per constraint |
| Lava Flow | Dead layers nobody dares delete | Delete with a test proving it is unused |
| Big Ball of Mud | No boundaries at all | Strangle it; do not rewrite it |
| Copy-Paste | Duplicated logic drifting apart | Extract on the third real caller |
| Singleton abuse | Global mutable instance as a dependency channel | Inject the instance |
| Service Locator | Callers resolve dependencies by string or registry | Pass dependencies explicitly |
