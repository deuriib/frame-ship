# Developer Certificate of Origin (DCO)

Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.  
1 Letterman Drive, Suite D4700, San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

---

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

**(a)** The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

**(b)** The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

**(c)** The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it; and

**(d)** I understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information I submit with it, including my sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

---

## Why `frame-ship` Uses the DCO

`frame-ship` adopts the **Developer Certificate of Origin (DCO 1.1)** rather than a restrictive or heavy Corporate Contributor License Agreement (CLA):

1. **Lower Contributor Friction**: Contributors do not need to sign legal click-through agreements, navigate corporate legal portals, or wait for organizational approvals.
2. **Decentralized, Immutable Audit Trail**: Each contribution carries an explicit cryptographic and recorded chain of provenance directly inside the Git commit history (`Signed-off-by:` footer).
3. **Open Source Standard**: Used by the Linux Kernel, Git, Docker/Moby, CNCF (Kubernetes), Node.js, OpenTofu, and leading open-source ecosystems worldwide.
4. **Protects Project and Downstream Users**: Gives everyone certainty that submitted code is legally clean, authorized, and free of copyright or patent encumbrances without stripping ownership from the author.

---

## How to Sign Off Your Commits

To certify that your contribution complies with DCO 1.1, include a `Signed-off-by` line in every commit message trailer.

### 1. Automated Signing with Git CLI

Git provides a built-in flag `-s` (or `--signoff`) that automatically appends the line using your configured `user.name` and `user.email`:

```bash
# Verify your git identity
git config --get user.name
git config --get user.email

# Commit with sign-off
git commit -s -m "feat(rules): add DCO verification rule"
```

This generates a commit message formatted as:

```text
feat(rules): add DCO verification rule

Detailed explanation of why this change was introduced.

Signed-off-by: Full Name <user@example.com>
```

### 2. Fixing Missing Sign-Offs

#### Amending the Most Recent Commit

If you forgot `-s` on your last commit before pushing:

```bash
git commit --amend -s --no-edit
```

#### Amending Past Commits on a Branch

If you need to sign off multiple previous commits on a feature branch before opening a pull request:

```bash
git rebase --signoff origin/main
```

Or using an interactive rebase:

```bash
git rebase -i origin/main
# Mark each commit as 'reword' or 'edit', add the Signed-off-by line, and complete the rebase.
```

---

## Verification & Enforcement

All contributions submitted via Pull Requests to `frame-ship` must have all constituent commits signed off in compliance with DCO 1.1:

1. **Pull Request Checklist**: The pull request template includes a mandatory checkbox certifying DCO compliance.
2. **Automated CI Checks**: Automated DCO verification checks validate that every commit on the PR branch contains a valid `Signed-off-by:` trailer matching the commit author.
3. **Squash Merges**: When squash merging is applied to maintain linear history, the final squashed commit retains the original contributor's `Signed-off-by` attribution.
