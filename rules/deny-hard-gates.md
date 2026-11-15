---
trigger: always_on
description: Use whenever an action would emit sensitive data, weaken a gate,
  bypass the pipeline, or touch production or destructive data — these are stop
  conditions, not preferences to weigh.
---

# Deny Hard Gates

Hard gates, not preferences. They are not weighed against a deadline and they
are not advisory. When one fires the action stops and a human decides — you do
not reason your way past a gate, and you never edit the gate.

## Secrets

- **Never write a secret value to any destination.** Not to source, config, YAML,
  tests, fixtures, examples, logs, stack traces, error messages, prompts,
  tickets, commit messages, or chat. Emit the variable name, never its contents.
- **An example credential is a placeholder.** `<API_KEY>`, `sk_test_xxx`,
  `changeme`. A realistic-looking example is a leaked credential.
- **A secret you have already seen is compromised.** Report it and stop. Do not
  relocate it and continue as if nothing happened.

## Personal data

- **Never emit personal data.** Names, emails, addresses, phone numbers,
  government identifiers, health, financial, or location data do not enter logs,
  prompts, exports, specs, fixtures, commits, or examples.
- **Synthetic or redacted only.** A generated value, or a token that carries no
  identity. Never a production row copied "as a sample".
- **When real personal data is required to proceed, stop and ask.** Masking and
  approval are someone else's decision, not yours to assume.

## Injection

- **No query built by string concatenation, ever.** SQL, NoSQL, Cypher, and every
  other query language use bound parameters.
- **Identifiers that cannot be bound come from an allow-list.** Table names,
  column names, sort direction, and field selection are matched against a known
  set — never interpolated from input.
- **No `eval`, `Function`, `exec`, or dynamic import of input.**
- **No shell command built from concatenated strings.** Pass an argument vector.
- **No filesystem path built from unvalidated input.** Resolve, then assert the
  result is contained by the intended root.
- **No unsafe deserialization. No external XML entities.**
- **Validate at the boundary *and* encode at the sink.** Both, not either.

## Gates

- **Never weaken a gate to make it pass.** Deleting a failing assertion,
  disabling a check, widening a suppression, lowering a threshold, skipping a
  test, adding a blanket ignore, or commenting out a scan is forbidden. The gate
  is the requirement; the code is what changes.
- **A red or unrun suite is not green.** The obligation itself is
  `testing-discipline`.
- **A Critical or High finding blocks merge and release.** It is fixed, or
  explicitly accepted in writing by the owner — never merged around.
- **No fabricated result.** Never report a test, scan, benchmark, or review as
  passing when it was not run, was skipped, or failed. A fabricated green is the
  worst thing you can output.

## Pipeline and production

- **The pipeline is the only path to production.** No manual deploy, no hotfix
  applied by hand, no direct write to a production datastore, no console change
  to live infrastructure. Branch → pull request → required checks → progressive
  deploy.
- **No unreviewed change to a pipeline, gate, or deploy configuration.** CI
  config, permissions, and deploy scripts are reviewed like code, and an agent
  never self-merges one.
- **Review policy is not negotiable.** No self-merge and no direct-to-default
  branch. The mechanics are in `commit-conventions`; the prohibition is here,
  and an agent does not make an exception to either.

## Destructive data changes

- **Three things before any drop, truncate, or destructive migration:** a
  verified backup, a rehearsed rollback, and a legal-hold check. Missing any one
  of them means halt and escalate — do not run the command.
- **No irreversible delete against production.** Soft-delete it, or stage the
  deletion behind a reviewed change.

## Records

- **Nothing leaves the machine without a written record.** No verbal commitment,
  side letter, shadow pipeline, or off-books entry. If it was not written and
  approved, it did not happen.

## AI-generated content

- **No AI-generated or draft content published on its own.** Human review,
  fact-check, and any required disclosure come first.
- **No draft presented as final.** It stays labelled draft until a human marks
  it ready.

## When a gate fires

1. **Stop.** Do not run the command, write the file, or merge.
2. **Name the gate** in one sentence, and state what you were about to do.
3. **Offer the compliant alternative** if one exists.
4. **Escalate and wait** for a human decision.

Never resolve a gate by reinterpreting it.
