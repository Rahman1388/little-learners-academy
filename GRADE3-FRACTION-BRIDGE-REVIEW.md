# Grade 3 Fraction Garden — Parent/Teacher Review Sheet
**Date:** 4 November 2026
**Status:** Development draft only; no curriculum/educator approval.

## What is built
- One bilingual model-based Grade 3 micro-lesson: Observe → Build → Read → Compare → Connect.
- Warm-up: tap two of four equal parts, with supportive correction; not counted as a question.
- 12 distinct practice questions: four fraction reading, four same-denominator comparison and four equivalence comparisons.
- Equal-width wholes with equal-width pieces, words as well as colour, mobile-sized touch targets, hints, retries, and English plus **draft Arabic** explanations.
- In-page progress only; no saved child data, microphone, audio, third-party services, analytics, accounts or ads.
- The already released Grade 2 Fair Sharing Fraction Lab remains unchanged. These twelve unapproved questions are **not** part of the production 475-question inventory.

## Educational and Arabic teacher review
- [ ] Maths teacher confirms suitability for **actual Qatar Grade 3 learning sequence**, equal-sized wholes, picture-to-symbol progression and supportive errors.
- [ ] Validate all models and explanations of one half = two quarters; same-denominator comparisons; equivalent and non-equivalent examples.
- [ ] Native-speaking Arabic educator verifies every translation, maths term, reading order, numeral display and RTL rendering.
- [ ] Parent/teacher observes a supported child attempt and checks language clarity and motivational pacing. A completed quiz is not proof of mastery.

## Technical, accessibility and release checks
- [ ] node --check grade3-fraction-bridge-data.js
- [ ] node --check grade3-fraction-bridge.js
- [ ] node scripts/test-grade3-fraction-bridge.cjs
- [ ] Verify GitHub Actions app validation and child-security checks on the final branch commit.
- [ ] Manual iPhone Safari + VoiceOver, Android TalkBack, keyboard and 320px/390px/768px checks.
- [ ] Exercise warm-up, reset, incorrect/correct/retry, hint open/close, Next, finish, Start Over.
- [ ] Verify no personal child data or school records committed.
- [ ] Owner approval before merging or adding production navigation/caching; only after release add audited questions to public count.

## Context
This is supplementary independent practice—not a full Grade 3 curriculum, an official assessment, an MOEHE endorsement, or an accredited school resource. Earlier audio issues remain separate and must be reviewed with actual English and Arabic speakers; this prototype introduces no unreviewed child voices.

**Rehearsal prompt:** Ask the learner, "How can one half be the same as two quarters? Show me with two equal-sized bars."
