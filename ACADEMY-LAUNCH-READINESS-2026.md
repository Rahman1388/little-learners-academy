# Little Learning Academy — release readiness board
Updated: 20 October 2026. Owner-directed GitHub-only development; **no public release or app-store submission authorized**.

## Mission
A privacy-conscious, supplementary bilingual English/Arabic learning app for children in Qatar, initially focused on Grades 1–6, with adult-source-linked school information. The public GitHub Pages app remains available at https://rahman1388.github.io/little-learners-academy/ . This **review branch is not that public site**.

## Current status (only evidence-backed)

| Gate | Status | Evidence and what still needs doing |
| --- | --- | --- |
| Current public app isolation | **PASS / keep** | All work in `feature/grade2-four-skills-pilot-20261016`, draft PR #8; no merges to `main` |
| Original Grade 2 English four-skills engineering | **AUTOMATED PASS in previous CI** | Five modules, 20 saved guided skills, phonics and optional extras; no recorded speech or automatic oral grading |
| Extra Grade 2 phonics | **AUTOMATED PASS in previous CI** | 8 families, 56 private temporary exercises |
| Adult reviewer feedback helper | **AUTOMATED PASS in previous CI** | Explicit copy only, no automatic sending or storage; manual content review still needed |
| Qatar school-information sources | **AUTOMATED PASS in previous CI** | Seven editorial official-reference entries plus local QNA headline snapshot; **not an emergency-alert feed** |
| QNA scheduled refresh | **NOT ACTIVATED** | GitHub Actions schedule resides only on review branch; `schedule` runs from default branch only. Current JSON intentionally has no claimed successful fetch |
| Combined adult review hub | **IN ENGINEERING TEST** | Five areas: Grade 2, phonics, private educator feedback, official-source directory, bilingual-brand preference scoring. Browser build/test must pass |
| Adult Arabic-name preferences | **DRAFT TOOL; NOT LEGAL CLEARANCE** | Four unverified candidates Fikralia, Basmiva, Qirivio, NabtaNova; native Arabic review pending |
| Final brand name, trademark / trade name | **PENDING** | Official Qatar MoCI check and WIPO/national classes, Arabic transliterations, similar names, authorized legal decision |
| Short domain (`.com`, `.qa`) | **PENDING** | No live availability confirmation, purchase, hosting migration or DNS modification |
| Grade 2 teacher curriculum signoff | **PENDING** | Request documented review on the actual current-academic-year original content; don't claim Ministry endorsement |
| Fluent Arabic quality/pronunciation review | **PENDING** | Native expert to review scripts, typography, translation and pronunciation |
| Real iPhone Safari / VoiceOver | **PENDING** | Computer/Chromium mobile emulation does not prove physical iPhone usability |
| Child data safety / school messaging | **PENDING POLICY SIGNOFF** | Keep no child identifying data or uploads, review accessibility, parental consent policy and Qatar legal obligations prior to launch |
| Paid business, app-store accounts and future schools partnership | **NOT STARTED** | Confirm Qatar business structure/licensing, app-store requirements, Apple/Google policies, school trademark permissions before selling or claiming school affiliations |

## Practical near-term sequence

**Phase A — this review milestone**
- Build and test the five-area adult review ZIP using GitHub Actions, keeping it isolated from the public GitHub Pages site.
- Download the Actions `grade2-teacher-preview` artifact to a computer for controlled adult feedback; ZIP is **not** a public phone URL.
- Collect one grade-2 teacher review and one fluent Arabic review. Feedback pages never auto-submit.
- Ask at least three bilingual adults (not children) to compare pronunciation and clarity for the four candidate brand names.

**Phase B — brand and release gating**
- Evaluate short-listed names against Qatar national trademark/trade-name records, WIPO and the countries where the service will operate; obtain professional advice when appropriate.
- Check live `.com`/`.qa` domain registries; buy at most a small annual domain after reasonable clearance and explicit owner approval.
- If users already have saved local progress, preserve storage keys during any rebranding; plan verified redirects and an app-name migration.

**Phase C — genuine mobile and educational acceptance**
- Decide whether a separate GitHub-governed staging site is appropriate without overwriting the public site. Avoid a second application builder platform.
- Physically test iPhone Safari (portrait, Arabic display, focus/VoiceOver, slow phonics, navigation and privacy), then improve based on actual observations.
- Obtain and document review outcomes before merging/deploying the Grade 2 branch.
- Only after signoff, activate the reviewed automatic QNA *general news* updates in default-branch workflow and verify the scheduled jobs actually run.

## Economic discipline

- Current GitHub static development/testing can continue before purchasing a domain or filing trademarks.
- Avoid paying for branding, trademark, domains, hosting, app-store accounts or advertisements until need and prerequisites are verified.
- No definitive cost is presented here because registration fees, availability and eligibility depend on current live sources and the owner's legal/business circumstances.

## Trust boundaries

The app is independent supplementary education. It **must not claim** Ministry acceptance, school accreditation, official exam timetables, live school closures, real-time news, validated child pronunciation, legal trademark clearance or teacher approval until documented. Avoid copyrighted worksheets and identifiable child test data. No extra platform or deployment is authorized by this record.

## Links
- Draft PR: https://github.com/Rahman1388/little-learners-academy/pull/8
- Adult five-area package guide: `GRADE2-TEACHER-PREVIEW-GUIDE.md`
- Brand collision notes: `BRAND-NAME-REVIEW-2026-10.md`
- Search market hypotheses: `ACADEMY-SEO-NICHE-NAME-RESEARCH-2026-10-20.md`
- Qatar news automatic refresh boundaries: `SCHOOL-NEWS-GITHUB-AUTOMATION.md`
