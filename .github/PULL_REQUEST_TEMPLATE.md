## Description

<!--
Provide a clear, concise summary of the changes introduced in this pull request.
Explain the *what* and *why* behind this work.
-->

### Motivation & Context

<!--
What problem does this PR solve? What is the background?
If applicable, mention which Frame→Ship lifecycle stage this change affects:
(Intent -> Spec -> Pre-Approval -> Implementation -> Quality Gate -> Release).
-->

---

## Related Issue

<!-- Link related issues or tracking tickets. E.g.: Fixes #123, Closes #456 -->
Fixes #

---

## Type of Change

<!-- Please mark the relevant option(s) with an [x]. -->

- [ ] `feat`: A new feature or capability (bumps MINOR version)
- [ ] `fix`: A bug fix or defect remediation (bumps PATCH version)
- [ ] `docs`: Documentation-only updates
- [ ] `refactor`: A code change that neither fixes a bug nor adds a feature
- [ ] `rule`: Changes to foundation (`always_on`) or domain (`model_decision`) rules
- [ ] `skill`: Changes to stage workflows or specialized review skills (`skills/`)
- [ ] `test`: Adding missing tests or correcting existing tests
- [ ] `ci`: Changes to GitHub Actions, workflows, or release automation
- [ ] `chore`: Tooling, dependencies, or maintenance updates

---

## Breaking Changes

<!--
Does this change introduce a breaking change? (A change that causes existing configurations, rules, or skills to fail).
-->

- [ ] **No**, this change does not introduce any breaking change.
- [ ] **Yes**, this change introduces a breaking change.

*If yes, describe the breaking change and provide upgrade / migration instructions below:*

---

## Self-Review Checklist

<!-- Please verify each of the following points before submitting your PR. -->

### Code & Methodology Quality
- [ ] **Minimal Code**: Diff is minimal and directly addresses the stated issue (no speculative future-proofing, no unnecessary abstractions).
- [ ] **Clean Code Standards**: Functions are small (<40 lines), complexity is bounded (<=10), early returns are used, and no magic numbers or strings exist.
- [ ] **No Debug Artifacts**: No `console.log`, temporary prints, or commented-out code left behind.
- [ ] **Docs Upkeep**: If behavior, configuration, CLI flags, or folder layout changed, corresponding documentation (`README.md`, `docs/`, or skill references) is updated in this PR.

### Testing & Verification
- [ ] **Tested, Not Trusted**: New or updated tests cover this change and fail without it.
- [ ] **Local Verification Green**: Ran `npm test` and `npm run typecheck` locally; all suites pass with zero errors.

### Security & Privacy
- [ ] **Zero Secrets**: Verified no API keys, private tokens, passwords, or credentials are committed.
- [ ] **Zero PII**: Verified no personal, private, or real production data is committed in fixtures or examples.
- [ ] **Trust Boundaries**: All external input and file system paths are validated and bound.

### Git & Conventional Commits
- [ ] **Linear History**: Branch is rebased cleanly onto `origin/main` without merge commits.
- [ ] **Conventional Commits**: Commit messages follow the specification (`type(scope): subject` in lowercase imperative mood, under 72 chars).

---

## Developer Certificate of Origin (DCO) Sign-off

- [ ] **I certify that all commits in this PR carry a valid `Signed-off-by` trailer (`git commit -s`) conforming to the Developer Certificate of Origin (DCO 1.1) as defined in [CONTRIBUTING.md](CONTRIBUTING.md).**

<!--
By submitting this pull request, you confirm that you have the right to submit this code under the MIT license and that your contributions adhere to the project's Code of Conduct.
-->
