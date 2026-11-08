# Little Learners Academy

**Learn • Explore • Grow**

An independent bilingual English–Arabic learning platform for primary-school children.

**8 November 2026 saved project checkpoint:** [Latest Little Learners Academy project update](updates/2026-11-08-little-learners-academy/README.md). Records the published 475-question pilot, November 4 draft improvements, real testing and review gaps, and next integration steps; **no new child-facing features released by this documentation update**.

**3 November 2026 saved version:** [Update Little Learning Academy — project milestone](updates/2026-11-03-update-little-learning-academy/README.md). Added 24 Grade 6 visual ratio problems; independent inventory now tracks 475 distinct short MCQ questions across Grades 1–6, with six writing prompts separate. No claim of Ministry or school approval.

**Project history & continuation guide:** [PROJECT-CONTINUITY.md](PROJECT-CONTINUITY.md) — current features, owner requirements, audio decisions, curriculum status, testing and next steps. Use this document when earlier conversations are hard to find.

## Current Grade 1 foundation
- Child-friendly bilingual dashboard
- English, Mathematics, Science, Life Skills and Creative Arts
- Adult synthetic English female-style and male-style voice profiles
- Memory Garden: See → Colour → Link → Hide → Recall → Review → Reward
- Progressive Web App (PWA) and offline foundation

## Planned lesson journey
**SEE → LISTEN → SAY → LEARN → DO → PLAY → QUIZ → REWARD**

The project will focus on Grade 1 first. Later grades can reuse the framework with age-appropriate content and difficulty.

## Learning-quality review without a teacher panel
- [Independent review and quality checklist](INDEPENDENT_LEARNING_REVIEW.md): self-review steps, automated Grade 1/2/5 checks and clear limits on educator/parent sign-off
- No teaching, Arabic pronunciation or curriculum certification is claimed from automated tests alone

## Important
This is an independent educational application. It is not affiliated with or endorsed by Qatar MOEHE or a particular school. Practice scores are not official school grades.

Arabic, Islamic Studies, and Qatar-specific educational content should receive qualified specialist review before public commercial release.

## Privacy direction
The child experience is designed around data minimisation: no public profiles, open child chat, unnecessary location collection, or child-targeted advertising.

## Cost principle
The development target is to use free and open-source tools first and avoid unnecessary subscriptions or platform lock-in.

## Parent privacy controls
- No student accounts, ads, direct messaging, or built-in analytics
- Browser-local learning progress only; device users may see saved progress
- Open `privacy.html` to review local entries, download an optional JSON backup, or erase only `lla-` app data with explicit confirmation
- The backup is plain JSON and must be kept private; the app does not collect or receive that file
- GitHub Pages and network providers may retain normal hosting/access logs outside the app's control

## Repository protection
The source repository is public. Enable two-factor authentication for the owner, require pull-request reviews and status checks through GitHub branch rules where the plan allows, and check repository security settings for secret scanning. Do not commit API keys, credentials, or real child data.
