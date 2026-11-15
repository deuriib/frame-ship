---
trigger: model_decision
description: Use when adding or changing an endpoint, adapter, webhook handler,
  file parser, or any code that accepts input from outside the process, to
  screen it against the OWASP Top 10 before it ships.
---

# Trust Boundaries

Every endpoint, adapter, webhook handler, and payload parser is a door, and a
door gets a screen before it gets traffic. The prohibitions themselves are in
`deny-hard-gates`; this is the review that happens before they apply.

## The screen

Run the OWASP Top 10 against the new boundary as a checklist and record an
answer for each row. "Not applicable" is an answer. Silence is not.

| Risk | Ask |
| --- | --- |
| Broken access control | Who may call this, and is that checked server-side per object? |
| Cryptographic failure | Does anything sensitive travel or rest without encryption? |
| Injection | Can input reach a query, command, path, template, or log unparameterized? |
| Insecure design | Is there a rate limit, an abuse case, and a defined failure mode? |
| Security misconfiguration | Debug off, no default credentials, headers set, errors not verbose? |
| Vulnerable components | Are the dependencies current and scanned? |
| Authentication failures | Session fixation, credential stuffing, a weak reset flow? |
| Data integrity failures | Are updates and deserialization authenticated? |
| Logging failures | Are security events logged without PII, and are the alerts owned? |
| SSRF | Can input choose a URL, host, or port? |

## Rules

- **Classify the caller before writing the handler.** Anonymous, authenticated,
  service, or admin — the answer decides the authorization model, and it is
  cheaper to decide it now than to retrofit it.
- **One parser per boundary, and it validates.** A schema at the edge produces a
  typed value; nothing downstream re-parses raw input.
- **Deny by default.** A new route with no explicit authorization decision is not
  reachable.
- **Cap the input before parsing.** Max body size, array length, string length,
  nesting depth, and a parse timeout. An unbounded parser is a denial of service
  with a valid content type.
- **Reject unknown fields** in a request model rather than silently ignoring
  them — an ignored field is a field someone will later trust.
- **Never echo input back unencoded** — not in an error, not in a redirect, not
  in a log field.
- **Log the decision, not the payload.** Record the caller, the route, and the
  outcome. Never the body.
- **A new boundary is a new threat model.** State what an attacker can send and
  what it reaches, in the PR.
