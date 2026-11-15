---
trigger: model_decision
description: Use when writing HTTP responses, cookies, sessions, forms, outbound
  requests, or any browser-facing surface, to ship secure defaults instead of
  defaults someone must remember to harden.
---

# Web Hardening

Secure by default means the insecure version requires an explicit, reviewed
decision. The absolute prohibitions — injection, secrets, tokens in storage —
live in `deny-hard-gates`.

## Transport and headers

- **TLS everywhere, with HSTS and a long `max-age`.** No plaintext fallback, no
  mixed content.
- **CSP built from nonces or hashes.** No `unsafe-inline`, no `unsafe-eval`, no
  wildcard source. A CSP that allows everything is decoration.
- **SRI on every third-party script and stylesheet.** A CDN compromise otherwise
  ships straight to your users.
- **A baseline header set on every response:** `X-Content-Type-Options:
  nosniff`, `Referrer-Policy`, `frame-ancestors`, `Permissions-Policy`.
- **Errors do not leak.** No stack trace, framework banner, SQL fragment, or
  internal path reaches the client. The correlation ID does.

## Sessions and cookies

- **`HttpOnly`, `Secure`, `SameSite` on every session cookie.** `Lax` is the
  floor; `Strict` where the flow allows.
- **Rotate the session ID on every privilege change** — login, elevation,
  logout. A fixed ID is session fixation.
- **Short-lived access, rotating refresh, revocable server-side.** Expiry alone
  is not revocation.
- **No token or session in `localStorage` or `sessionStorage`.**

## Request forgery

- **CSRF tokens on every state-changing form and cookie-authenticated request.**
  `SameSite` reduces the risk; it does not replace the token.
- **SSRF: every outbound URL built from input goes through an allow-list** of
  scheme, host, and port — and the *resolved IP* is checked, not the string, so
  DNS rebinding and `169.254.169.254` do not slip through.
- **No redirect to a URL taken from input without an allow-list.** An open
  redirect is a phishing primitive.

## Randomness and crypto

- **A CSPRNG for anything security-relevant.** `crypto.randomUUID`,
  `secrets.token_bytes`, `crypto/rand`. Never `Math.random`, a bare `random()`,
  or a timestamp.
- **Argon2id or bcrypt for passwords**, with a tuned cost. Never MD5, never a
  bare SHA-family, never a reversible encoding, never a hand-rolled scheme.
- **No custom crypto.** Use the platform library at its recommended defaults.
- **Certificate pinning where the peer is fixed** — a mobile app or a known
  backend.
- **Constant-time comparison** for tokens, signatures, and MACs.

## Abuse resistance

- **Rate limit and quota every interface that costs money, CPU, or an email.**
  Login, reset, search, upload, and any unauthenticated endpoint first.
- **A WAF in front of the public surface, actually tuned.** One left in monitor
  mode is a dashboard, not a control.
- **Idempotency keys on mutating endpoints and idempotent queue consumers.**
  Retries are a property of the network, not a bug to fix.
- **Failures are cheap.** A rejected or failed request leaves no partial state.
