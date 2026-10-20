# iPhone Safari staging preview — GitHub-only (PREPARATION, NOT PUBLISHED)
Updated: 20 October 2026

**Goal:** A clean, independent review site for teachers and the project owner to open in Safari, separate from the live Little Learners Academy GitHub Pages site.

## Current state and boundaries
- The source repository's public site must remain unchanged: https://rahman1388.github.io/little-learners-academy/
- Review branch: `feature/grade2-four-skills-pilot-20261016`; draft PR #8; NOT merged into main.
- `node scripts/build-grade2-teacher-preview.cjs` produces the isolated 5-section adult review package.
- `node scripts/build-mobile-staging.cjs` creates `academy-mobile-staging-package/` from the isolated adult package (six linked HTML pages, JavaScript and static data, branded icon and supporting guides).
- Every HTML page has a **visible DEVELOPMENT/ADULT REVIEW watermark** and a robots **noindex** directive. `robots.txt` adds Disallow, and `.nojekyll` supports normal asset names.
- IMPORTANT: **noindex and robots.txt do not secure or restrict access.** They only ask search engines not to index. Anyone with the public URL can still visit a public Pages site. Do not include passwords, unpublished legal data, actual children's names, identifying data or other secrets.
- `scripts/test-mobile-staging.cjs` verifies the staged files with automated Chromium mobile-browser simulations. **Not a real iPhone Safari, VoiceOver, or curriculum validation.**
- GitHub Actions builds and uploads **academy-mobile-staging-preview** ZIP, but does **not deploy it**; no site URL is available from the staging package alone.

## Verified GitHub mobile staging build — 20 October 2026

**Engineering PASS:** [Actions run #39344159272](https://github.com/Rahman1388/little-learners-academy/actions/runs/39344159272), source commit `7ae4afcb077fb9accbcc9885dde1d8dc9df2699d`. Automated tests included six watermarked HTML routes, both original Grade 2 lesson/phonics flows, teacher review, Qatar official-source directory, brand preferences, and viewport widths from 280 px to 1024 px.

**Downloadable archive:** Actions artifact `academy-mobile-staging-preview` (55,493 bytes), GitHub expiration 26 October 2026 at 23:52 UTC; archive also successfully passed ZIP integrity verification after download. **The ZIP is not a live iPhone link.** It has no hosted URL, access-restriction system, registered brand, live QNA alerts or teacher accreditation.

**Publishing is deliberately blocked pending owner choice between a public-but-unlisted GitHub Pages staging link and an access-restricted review mechanism.** Standard personal GitHub Pages is publicly accessible even with `noindex` and `robots.txt`; the exact visibility decision should be confirmed explicitly, not inferred from general agreement to continuing development.

## Why a separate repository is needed
GitHub Pages normally allows one project site per repository. The current repository already hosts the public app; deploying a review branch to the same Pages site could replace it. Use a separate repository such as `little-learners-review-staging` **only after the owner explicitly authorizes a PUBLIC, unlisted-but-accessible review link**. A public Pages site is not password protected. GitHub Enterprise Cloud organizational Pages can restrict access, but that is not appropriate to assume for a personal account.
Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
Pages visibility reference: https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site

## If the owner approves PUBLIC review access
1. On GitHub (desktop or mobile Safari with desktop-site view), create a **new, separate public repository**, proposed name `little-learners-review-staging`. Do not rename the existing repository.
2. Use only the files in the generated `academy-mobile-staging-preview` ZIP; they are original/sanitized review-only content. **Do not upload full repository files, test secrets or GitHub Actions credentials** to the review repository.
3. Publish the static files (with `index.html` at the root) through **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/(root)`; or use a dedicated build workflow after validating repo settings and permissions. GitHub admin access may be required.
4. Wait for GitHub's own `Pages build and deployment` workflow to finish. Verify **actual** live URL in repository Settings → Pages or its Pages deployment logs; never guess a URL and claim it works.
5. Test in Safari on the owner's own physical iPhone: home page, 5 routes, audio explanation, English and Arabic fonts, no overflow, Grade 2 exercises, brand-review copy button, outdoor/indoor readable contrast, VoiceOver focus. Collect adult-only feedback. Do not claim sound quality/teacher approval based on Chromium.
6. Do not put real children's data in the public preview. Public review links should only go to adult teachers/parents. Avoid indexing claims; noindex is best-effort.

## If the owner needs RESTRICTED review access
Do **not** deploy via normal personal-account GitHub Pages. Use GitHub-hosted downloadable artifacts for authorized reviewers, or select an access-controlled alternative only after discussing security and cost. No feature is called private without actual enforcement. A web-visible login form embedded in static HTML without a real backend **does not protect** it.

## Owner authorization received — 20 October 2026

The owner explicitly approved **preparing a separate publicly accessible GitHub Pages staging website for ADULT review**, provided the existing published Little Learning Academy website and its `main` branch remain unchanged. This approval resolves the earlier choice of public vs restricted hosting. No authorization was given to overwrite the existing project or to make Ministry approval claims.

**Blocking account step:** The staging repository `Rahman1388/little-learners-review-staging` does **not** yet exist (GitHub returned 404 when checked). The connected GitHub actions can create/edit files in an existing repo but **cannot create repositories or set Pages publishing settings**. The owner must create the new public repo in their GitHub account through https://github.com/new, named `little-learners-review-staging`, with **Add README** enabled to initialize `main`, then send its actual repository link. Never claim a live link before this happens.

After creation and access confirmation, use the already tested `academy-mobile-staging-package` assets to upload source text files to the **new repository only**, keeping `index.html` at its root. An administrator must then use **Settings → Pages → Deploy from a branch → main → /(root) → Save**, verify GitHub's real Pages URL and test it on an actual iPhone. All content remains public and unapproved. Publishing from a branch may take several minutes.

## Repo creation and Pages settings — owner action needed
The owner chose a PUBLIC adult-only GitHub Pages preview. Create `Rahman1388/little-learners-review-staging` and initialize it with a README; then upload validated assets to this new repository and configure its Pages settings. No preview is published until this is done.

## Additional gates
Native Arabic speaker review, Grade 2 teacher review, real device Safari + VoiceOver testing, source-news disclaimer check, no accidental student-data collection, proposed name clearance and domain registration are still pending.
