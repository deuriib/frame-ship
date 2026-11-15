---
trigger: model_decision
description: Use when collecting an opt-in, building or exporting an audience,
  or sending a campaign, to keep consent provable and suppression enforced.
---

# Consent and Audience

Consent is not a checkbox shown to a lawyer; it is a record you can produce per
contact, per channel, years later. The prohibition on emitting personal data is
in `deny-hard-gates`; this rule covers the lawful basis, the record, and the
plumbing.

## Opt-in

- **Opt-in per channel, explicit, and separate.** Email consent does not cover SMS
  or WhatsApp, and a purchase is not consent to marketing.
- **No pre-ticked box, no consent by silence, no consent bundled** inside a terms
  acceptance.
- **Record what was consented to, when, how, and on which surface.** A timestamp
  without the exact wording is not a record.
- **Double opt-in where the channel allows it** — a mistyped address that never
  complains is worse than a bounce.
- **Opt-out is honoured within the legal window and across every system**, not
  only the one that sent the message.

## Suppression

- **A suppression list exists, is maintained, and is checked before every send.**
  An unsubscribe that only deletes a row from one table produces the same
  complaint twice.
- **Suppression is enforced at the send boundary**, not in the campaign builder,
  so a new channel inherits it automatically.
- **A hard bounce and a complaint are suppressions too.** Both mean stop, neither
  means retry.

## Audience data

- **Segment only on consented, minimized data.** If the segment could not be built
  from fields the contact agreed to, it is not a segment you may build.
- **Allowlist the fields.** Names, addresses, and consent flags are not creative
  variables; an asset that needs more is asking the wrong question.
- **A campaign surface is a leak surface** — a UTM parameter, a creative, an
  audience name. Each one travels into analytics and into every screenshot of a
  dashboard; the field-level rule lives in `data-minimization`.
- **Never upload a list you cannot lawfully process**, and never build a lookalike
  from a source with no lawful basis.
- **No shadow profiles.** Inferring an identity from device or behaviour signals
  and marketing to it is processing without consent.

## Rights

- **Access, correction, deletion, and portability requests reach every marketing
  system** — CRM, email provider, ad platforms, analytics warehouse, and the
  backup retention window.
- **Deletion propagates to ad platforms and custom audiences**, not just the CRM
  row. A deleted contact still receiving ads was never deleted.
- **Retention has an owner and an enforcing job** — the mechanism is in
  `identity-and-data`.
