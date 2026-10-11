# Little Learners Academy — security audit and release checklist

**Review date:** 2026-10-11  
**Audience:** Project owner, parents, teachers, and future contributors.  
**Status:** Initial static security gate passes; full release security sign-off is **pending**.

## Current audit findings (verified by GitHub Actions)

- Public, static GitHub Pages site with no student sign-up required.
- `Child App Security Gate` runs on pushes to `main`, pull requests, and manual dispatch. It uses read-only repository permissions and doesn't access browser learning progress.
- Static scanner inspected **80 text files** including **31 HTML pages** and **19 top-level JavaScript files** in its initial successful run.
- **Pass:** No token-shaped credentials, external executable script URLs, dangerous `javascript:` navigation links, or missing service-worker same-origin/cache allowlist safeguards were detected by the scanner.
- **Needs follow-up:** Only **5 of 31 HTML pages** declare a Content Security Policy. Remaining 26 pages need a compatibility-reviewed policy; pages containing inline JavaScript will need script extraction or an appropriately tested policy. Avoid simply adding a policy that breaks the app.
- **Needs follow-up:** `app.js` uses `innerHTML` to render curriculum content. This is currently sourced from checked-in curriculum data rather than student text, but should be refactored toward safe DOM nodes / `textContent` before accepting dynamic or externally supplied content.
- **Not verified:** GitHub branch protection, repository secret-scanning and Dependabot alert settings, commit history secrets, hosting response headers, third-party service logging, independent penetration testing, legal compliance, and actual parental consent processes.

The static security scanner is a **limited automated control**, not a security certification. A passing audit doesn't guarantee the app cannot be attacked.

## Before allowing wider use by children

1. **Protect GitHub access.** Enable multi-factor authentication/passkeys, review repository collaborators, remove unnecessary write access, and rotate any previously exposed tokens.
2. **Require passing checks before merging.** In GitHub **Settings → Rules → Rulesets**, create a branch ruleset targeting `main`. Require a pull request, and require both `Child App Security Gate / Static site and privacy security checks` and `Validate app / validate` checks to pass. The check names may be displayed slightly differently in the UI.
3. **Important deployment caveat:** GitHub Pages currently deploys on pushes to `main`. A check that runs *after* a push is **not a true prepublication gate**. Enforce the ruleset above so unchecked commits cannot reach `main`; consider moving deployment to a workflow that depends on successful security and quality checks if needed.
4. **Enable repository alerts.** In GitHub **Settings → Security → Code security and analysis**, turn on secret scanning / push protection where available, dependency security alerts, and automated dependency updates. These settings weren't readable by the current GitHub app connection.
5. **Expand Content Security Policy coverage.** Prioritise activity pages used by children; remove inline scripts where feasible and test every page on iPhone, Android, tablet, and desktop. A CSP `<meta>` element cannot provide every security header (such as `frame-ancestors` or HSTS); GitHub Pages hosting limits response-header control.
6. **Privacy:** Keep no sign-ups, child identifiers, analytics, tracking pixels, chat, microphone recording, or third-party ads without explicit design/privacy review. Review whether any future feature involves children's data before release. Avoid unencrypted identifiable information in parent backups.
7. **Curriculum and audio:** Maintain qualified teacher review of curriculum and phonics/pronunciation claims. Technical security checks do not certify education quality.
8. **Test and approve:** Review the GitHub Actions check details, manually exercise phone/tablet activities, check browser console errors and network requests, and sign off on changes before broader distribution.
9. **Incident response:** If a secret is exposed, revoke it immediately, clean affected code and history if required, investigate access, and notify affected people under applicable requirements. Never include children's data or security exploits in public issues.

## Run locally or in GitHub

```bash
node scripts/check-app-security.cjs
node scripts/prepublish-security-audit.cjs
```

On GitHub, open **Actions → Child App Security Gate → latest run**. Its output distinguishes **BLOCK** (workflow failure) from **REVIEW** (nonblocking risks needing manual attention).

### Release decision

**Current decision:** Suitable for supervised prototype testing subject to normal caution, **not yet approved as a fully security-audited app for mass child deployment**. Complete the manual account/repository checks and CSP rollout before claiming a production-grade security review.
