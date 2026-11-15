---
trigger: model_decision
description: Use when writing or refactoring implementation code — functions,
  modules, handlers, or data transformations — to keep control flow explicit and
  failures loud.
---

# Engineering Standards

Language-agnostic rules for how code is shaped. `stacks/` adds per-language
detail; `architecture` covers module and service boundaries; `reliability`
covers everything that crosses a process edge.

## Declare the outcome, not the steps

Say what the end state should be and let the runtime reach it. Code that
states *what* is shorter, testable, and free of the intermediate state where
ordering bugs hide.

- **Prefer the declarative form.** Set-based SQL over a cursor loop, UI
  rendered from state over manual DOM updates, desired-state infrastructure
  over imperative provisioning, `map` / `filter` / `reduce` over a hand-rolled
  push loop.
- **Keep the data flow visible.** Inputs → pure transforms → effects at the
  edges. If you cannot draw the arrow from input to output, the flow is hidden.
- **Imperative earns its place.** It is justified by a measured hotspot or an
  inherently sequential procedure — protocol handshakes, parsers, streaming
  state machines. Note the reason inline when you drop a level.

## Purity and dependencies

- **Pure where possible.** A function should depend only on its arguments and
  return a value. Push I/O, clocks, randomness, and global state to the edge of
  the call graph so the core is testable without mocks.
- **Side effects at the edges.** Gather input, then compute, then write. A
  function that both decides and mutates cannot be tested for either in
  isolation.
- **Inject, don't reach.** Pass the client, clock, or config in as an argument.
  A module that imports a singleton is untestable and unswappable.

## Failure

- **No empty or catch-all handlers.** A handler that swallows an error turns a
  loud failure into silent corruption. Catch what you can act on; let the rest
  propagate.
- **No exceptions for control flow.** Absence is not an error — return a
  sentinel, an option, or a result type. Exceptions are for the exceptional.
- **Wrap with context.** Preserve the cause and add what you were doing when it
  failed. Use `Result` / `Either` when a call has more than one expected failure
  mode and the caller must handle each.
- **Fail fast and closed.** Validate at the boundary and refuse the work rather
  than continuing in an unknown state. On a security decision, the default is
  deny.
- **No silent failures.** Never discard an error you did not handle. A swallowed
  exception is later read as success.
- **Release resources deterministically.** `defer`, `using`, `with`, or RAII.
  Never rely on finalizers or process exit.

## Patterns

- **No pattern without a concrete pain point.** A layer, abstraction, or
  factory must name the force it resolves. If you cannot cite the problem it
  fixes, delete it.
- **Name the pattern in the code.** When you do apply one, say which — in the
  type name or a comment — so the next reader recognizes it instead of
  rederiving it.
- **Record the decision.** A structural choice that is not obvious belongs in
  an ADR, not only in review discussion.
