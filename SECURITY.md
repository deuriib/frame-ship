# Security Policy

We take the security of `frame-ship` seriously. As a delivery methodology and tooling framework that injects runtime rules and workflows into coding agents, maintaining high security standards and ensuring fast, transparent remediation of vulnerabilities is our commitment.

## Supported Versions

Only the current minor version line receives active security updates and vulnerability patches.

| Version | Supported | Notes |
| :--- | :---: | :--- |
| `1.1.x` | :white_check_mark: | Current active release line. Receives security patches. |
| `1.0.x` | :x: | Superseded by `1.1.x`. End of life. |
| `< 1.0.0` | :x: | Unsupported development previews. |

We recommend upgrading to the latest patch release of `1.1.x` as soon as it is published.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

We provide two confidential channels for reporting potential vulnerabilities:

### 1. GitHub Private Vulnerability Reporting (Preferred)

If you have a GitHub account, please submit your advisory privately through our repository:
1. Navigate to the repository's [Security Advisories](https://github.com/deuriib/frame-ship/security/advisories) tab.
2. Click **Report a vulnerability** to open the confidential draft advisory form.
3. Provide details as outlined in the [What to Include](#what-to-include-in-your-report) section below.

### 2. Direct Security Contact (Email)

If you prefer direct email or cannot use GitHub advisories, send an encrypted or plain message to:

* **Security Maintainer**: Deuri Vasquez
* **Direct Email**: `deuriib@gmail.com`
* **Subject Line**: `[SECURITY VULNERABILITY] frame-ship: <brief summary>`

### What to Include in Your Report

To help us triage and resolve the issue quickly, please provide as much context as possible:
- **Type of vulnerability** (e.g., prototype pollution, path traversal, unauthorized privilege escalation, command injection, secret leakage).
- **Affected components** (e.g., specific skill, rule frontmatter parser, plugin hook, or CLI script).
- **Step-by-step reproduction instructions** or a minimal Proof of Concept (PoC).
- **Potential impact** and attack scenario.
- **Suggested remediation or fix**, if you have one.

## Response Windows & Service Level Agreement (SLA)

Every report submitted through the channels above is handled under the following strict SLA:

| Stage | Response Window | Description |
| :--- | :--- | :--- |
| **Initial Acknowledgement** | Within **2 business days** (48 hours) | Receipt confirmed; point of contact assigned. |
| **Triage & Assessment** | Within **5 business days** | Vulnerability reproduced, severity evaluated (CVSS), and priority set. |
| **Patch & Coordinated Disclosure** | Within **30 calendar days** | Remediation developed, verified in CI, and released via security advisory. |

If a vulnerability is actively exploited in the wild, we will expedite triage and release an emergency patch on an accelerated schedule.

## Coordinated Disclosure Process

1. **Intake & Validation**: We acknowledge your report, investigate the reproduction steps in an isolated environment, and assign a severity score.
2. **Remediation & Testing**: A patch is authored and validated through our private testing pipeline.
3. **Draft Advisory**: We prepare a GitHub Security Advisory (GHSA) detailing the affected versions, severity, root cause, and remediation steps.
4. **Coordinated Release**: The patch is tagged and released alongside the publication of the security advisory. If requested, we will credit your discovery in the advisory and release notes.

## Secrets and Credential Hygiene

- **Push Protection**: Automated secret scanning and push protection are active across the repository. Attempts to commit API tokens, private keys, or passwords will be blocked at push time.
- **Reporting Leaks**: If you discover an inadvertently exposed credential or secret in any commit history, report it immediately to `deuriib@gmail.com` so the credential can be revoked and rotated.
