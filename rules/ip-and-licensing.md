---
trigger: model_decision
description: Use when incorporating third-party code, content, or model output
  into a product, when assigning or licensing IP, or when shipping something
  whose ownership is unclear.
---

# IP and Licensing

Ownership is assumed until someone asks, and the answer is decided by documents
nobody read. Dependency licences are in `supply-chain`; creative-asset licences are
in `content-production`. This rule covers ownership, assignment, and the clearance
step both of them depend on.

## Ownership

- **Verify ownership before building on it.** Work done by a contractor belongs to
  whoever the agreement says, which is frequently not you.
- **Every contributor assignment is signed** — employment agreement, contractor
  agreement, or a CLA. A contribution from someone with no agreement is a licence
  you do not have.
- **Generated output has an ownership question too.** Model terms decide whether the
  output is yours to use commercially, and they differ per provider and per model
  version.
- **An assignment is not a permission.** Owning a work and being allowed to embed a
  component inside it are separate questions with separate answers.

## Clearance

- **A licence scan runs in CI and gates the merge**, not the release. The cheapest
  moment to replace a copyleft component is before anything depends on it.
- **Every new third-party component is cleared before it merges.** The pipeline side
  is owned by `supply-chain`; the decision is recorded here.
- **Record the decision**: component, version, licence, and the reasoning when
  compatibility is not obvious. A cleared component with no note is one you will
  re-litigate next year.
- **A licence change in a minor upgrade is a new decision.** Dependencies relicense;
  an unreviewed bump can change the terms you distribute under.

## Marks and embedded assets

- **Names, logos, and marks are cleared before use** in a product or a campaign, per
  territory.
- **A font licence covers its use, not necessarily its embedding.** Embedding rights
  are frequently a separate line item, and shipping without them is a claim you
  cannot defend.
- **Model, stock, and typeface terms are re-read on every renewal**, because they
  change far more often than code licences do — and the version you accepted last
  year is not the one currently in force.
