# Little Learners Academy — Independent Learning Quality Review

**Updated:** 13 October 2026  
**Audience:** Project owner and future voluntary reviewers  
**Status:** Owner-guided preliminary review, **NOT** teacher sign-off, Arabic-language validation, or official curriculum certification.

## Why this exists

The project currently has no dependable access to classroom teachers or an organised parent-testing panel. That must not become a reason to call unverified pronunciation “approved” or to advertise pilot activities as complete Grades 1–6 curricula. We can carry out repeatable technical checks and structured common-sense learning reviews now, keep gaps visible, and request expert input when possible.

## Evidence hierarchy

1. **Authoritative curriculum references:** official England KS1/KS2 programmes of study; US Common Core mathematics and English language arts. See [CURRICULUM_ALIGNMENT.md](CURRICULUM_ALIGNMENT.md) for source links and the limits of the Qatar/British/US crosswalk.
2. **Question correctness:** calculate numeric answers independently, compare distractors, check more than one plausible answer, and keep short worked explanations for every task. Automated scripts should verify published answer keys after changes.
3. **Learning suitability:** inspect age/grade level, prerequisite skills, clarity of pictures, readability, instructions, touch targets, and whether feedback teaches rather than shames.
4. **Language review:** bilingual spelling/meaning and RTL display can be self-checked provisionally; natural Arabic grammar, dialect suitability and phoneme pronunciation still require a qualified native-language specialist.
5. **Real children and parent testing:** not available currently. Do not invent parent approvals, satisfaction rates, teacher testimonials, classroom outcomes, or test participation.

## Five-minute self-review per new activity

- [ ] **One explicit skill:** Say exactly what a child will practise; identify intended grade, prerequisite, and topic
- [ ] **Correctness:** Solve the task independently; verify correct answer, units, explanations and distractors
- [ ] **Child clarity:** Instructions are understandable in one or two short sentences; no trick or ambiguous answers
- [ ] **Support:** An age-appropriate hint or visual model is available when a child gets stuck
- [ ] **Bilingual respect:** English meaning and written Arabic support match; mark Arabic wording **unverified** until reviewed
- [ ] **Safe encouragement:** Wrong answers do not shame or rush a learner; stars are earned for achievement, not unlimited tapping
- [ ] **Access:** Test at ~390-pixel phone width and tablet width, portrait orientation and large touch targets
- [ ] **Privacy:** No child names, face/voice recordings, unnecessary permissions, external trackers or child-facing ads
- [ ] **Source and originality:** Confirm original activity wording and no copied commercial app assets
- [ ] **Honest release label:** “Supplementary pilot” until scope, educational quality and local alignment are independently evaluated

## Pronunciation: special restrictions

- Current English female-style and male-style options are **adult synthetic voice styles**, not recordings made by a girl and boy.
- Three repeats do **not** guarantee a correct phoneme or comprehensible accent. Replaying whole words is not the same as teaching verified isolated letter sounds.
- An earlier listening preference favoured bus voice **C** (female-style) and **D** (male-style). Preference feedback is not a formal speech-language or teacher approval.
- Arabic is shown supportively; formal Arabic, Islamic Studies and Qatar History modules remain review-locked. Do not unlock based only on an automatic pass.
- Until a qualified reviewer is found, mark content “awaiting specialist verification” and preserve the original approved-by-listener MP3s.

## Practical owner review sequence

1. Run the automated checks and read failures before publishing changes.
2. Open the lesson on an iPhone or tablet and **perform it yourself**, including a deliberate wrong answer.
3. Try the alternate English voice when audio is present, check for clipping/ambiguity and note the exact word/lesson rather than guessing a quality score.
4. Read Arabic prompts alongside their English intended meaning. If uncertain, mark **pending review** instead of making authoritative grammar claims.
5. Check that progress survives refresh and that replay cannot add unlimited stars.
6. Note any doubt in the GitHub issue tracker, or keep an owner-only list of anonymous problem IDs. Never upload real child data.

## Current automated coverage and limits

- Grade 1: `scripts/check-learning-content.cjs` checks 151 mini-challenges, counts, IDs and several arithmetic answer keys.
- Grade 2: the same script checks the 24-question mathematics pilot.
- Grade 5: `scripts/check-grade5-content.cjs` checks 24 published mathematics prompts, immutable progress IDs, reference answers, arithmetic, English hints/explanations and topic balance.
- Mobile/browser tests and the Child App Security Gate cover technical behaviour and selected safety issues, **not the truth of every educational claim**.
- Grades 3–4 and all language/science content still need explicit subject-matter audit coverage; coverage must increase before describing the app as comprehensively verified.

## Release status wording

**Acceptable:** “Independent Grade 1–5 supplementary learning activities, with limited higher-grade pilots; curriculum comparison and educator review in progress.”

**Not acceptable:** “Teacher approved,” “MOEHE certified,” “complete Grades 1–6 curriculum,” “clinically verified pronunciation,” or “tested and endorsed by families” without verifiable evidence.

**Useful official starting points:** [England national curriculum](https://www.gov.uk/national-curriculum), [Common Core standards](https://www.thecorestandards.org/), and Qatar's official Ministry of Education and Higher Education website for applicable local requirements.

*This protocol helps us reduce obvious mistakes; it does not replace professional educator and native-language review.*