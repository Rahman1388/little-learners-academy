# Little Learners Academy — Project Continuity & Handover

**Updated:** 13 October 2026  
**Owner's project:** Little Learners Academy / أكاديمية المتعلمين الصغار  
**Source of truth:** https://github.com/Rahman1388/little-learners-academy  
**Live Progressive Web App:** https://rahman1388.github.io/little-learners-academy/

> This file exists to keep an independently readable project history and next-step plan even when an earlier ChatGPT conversation cannot easily be found. **It is a summary, not an export of the chat transcripts.** Changes after this date should update this document.

## Vision and non-negotiable requirements

- A welcoming, colourful, high-quality, mobile- and tablet-first children's learning app, usable in Qatar and respecting Islamic ethics, Qatar cultural values and children's privacy.
- Goal: progress from Grade 1 foundations toward a **Grade 1–6** international-standard supplementary activity platform with **more than 100 activities**, eventually broad curriculum-relevant depth for each grade/major subject. Do **not** present pilots as complete grade curricula.
- English and Arabic support, picture-based, clear teacher/parent guidance, encouraging feedback, safe badges and achievements, short playful activities, pronunciation practice using both female-style and male-style English voice profiles; accessibility and large touch targets.
- Parents should be able to see learning goals, progress and practical next steps; no need for the owner to write code or use a laptop to maintain the project.
- Start with free/open-source tools; avoid unnecessary ongoing expenses. Longer-term sustainable financing/business is of interest, but child learning and trust come first.
- Copyright/originality, security and privacy are priorities. Never collect or commit real children's records, student identity, voice recordings or secrets. Do not add child-targeted advertising.

## Live technology and operational notes

- Public GitHub repository: `Rahman1388/little-learners-academy`, `main` branch.
- GitHub Pages serves the static web app at the URL above; **this is a PWA, not an APK**. It runs on an iPhone and tablets using normal browser links.
- Service worker `sw.js` provides caching/offline support; bump the `CACHE` version when changing the cached app shell.
- Site pages, CSS, JavaScript, original question data and existing MP3 files live in this repository. There are GitHub Actions workflows for app validation, Playwright mobile tests, security gate and Pages deployment.
- Audio and stars/progress are saved locally via browser storage; they are **not synced between devices**. Clearing browser storage can delete device progress. `privacy.html` offers user-controlled local JSON export and erase options. A local export must be stored privately.
- ChatGPT conversation messages are **separate from GitHub**. This document preserves decisions and key context, not word-for-word conversations.

## Current learning modules and achievements

### Grade 1 foundation
- `index.html`, `curriculum.js`: bilingual home and Grade 1 cross-curricular foundation, including English, mathematics, science, life skills and creative arts.
- `phonics-adventure.html` / `phonics-adventure.js`: Reading Adventure with whole-word MP3, sound tiles, simple matching and rewards.
- `sound-detective.js`: Sound Detective initial-letter listening game.
- `match-learn.html`: match English words to pictures/Arabic meanings.
- `picture-memory.html`: touch-friendly picture memory/pair matching.
- `star-journey.html`: learning achievements and listening practice.
- `activity-library.html`, `activity-data.js`, `activity-library.js`: **151 original short Grade 1-themed micro-challenges**, across mathematics, English, science, life skills and patterns. **151 short questions are not the same as 151 full lessons.**
- Other interactive explorations already in source include `ten-frame-lab.html`, `place-value-lab.html`, `number-bonds.html`, `drawing-studio.html`, `daily-discovery.html`, `story-garden.html`, `math-story-village.html`, `fractions-lab.html`, `qatar-mini-market.html`, `science-sort.html`, `clock-time-lab.html`, `measurement-explorer.html`, `foundation-check.html`, and `practice-path.html`.
- `learning-passport.html`, `curriculum-skills-map.html`, `parent-progress.html`, `parent-report.html`: visual milestones, parent-facing skills coverage and progress/reporting.
- `install-app.html` explains phone-friendly PWA use.
- `choose-grade.html` and `grades-roadmap.html`: grade chooser and long-term Grade 1–6 plan.

### Higher-grade pilot status (not certified curricula)
- **Grade 2:** mathematics, English reading, science and mixed discovery pilot activity pages (`grade2-*`).
- **Grade 3:** mathematics, English reading, science and mixed discovery pilot activity pages (`grade3-*`).
- **Grade 4:** **24 mathematics questions**, with an additional **18-question English reading-comprehension pilot** across three original passages (see `grade4-reading.html`, `grade4-reading-data.js`, `grade4-reading.js`); mathematics is a **24-question pilot**, in `grade4-math.html`, `grade4-math.js`, `grade4-math-data.js`, covering place value, operations, fractions/decimals, measurement/data, with hints, explanations and device-only completion progress.
- **Grade 5:** limited mathematics (24), English reading (18) and science (18) pilot questions.
- **Grade 6:** limited mathematics (24), English reading (18), and science (18) pilot questions, plus six guided, self-reviewed writing practice prompts. None are teacher-certified or a complete curriculum.
- All Grade 2–6 materials are supplementary pilots rather than complete grade-level curricula.
- Do not overcount or conflate questions, games, activities, lessons, or full grade curricula. Update quantitative claims after checking source files and tests.

## Pronunciation/audio decisions — especially important

- Existing English MP3 recordings use **adult synthetic** female-style/male-style voices, **not recordings of children**.
- The owner reviewed the English word **bus** and found voice options **C and D** clearer. The default C (female-style) and D (male-style) bus voice choices were implemented, with a browser-local manual override via `bus-voice-check.html`. Preserve these settings and the original approved whole-word files until replacement audio is explicitly reviewed.
- Whole-word recordings in `audio/practice` repeat each word three times with pauses. A repeated word is **not** an educator-verified isolated phoneme.
- The existing Arabic **male-reference** recordings remain the more intelligible fallback for introductory Arabic meaning support. Arabic female pronunciation trials still await appropriate native-speaking educator review; **do not mislabel male recordings as female**.
- `voice-test.html`, `audio-review.html`, `pronunciation-review.html`, `sound-help.html` are available for listening and review. The owner has deferred some further listening checks until convenient.
- Clear pronunciation and options suitable for boys and girls are goals; voice style preference **does not** diagnose, score or record children's actual pronunciation. Any microphone-based assessment would require separate privacy and pedagogical work.
- Formal Arabic literacy, Islamic Studies, and Qatar history/identity should remain review-gated until curriculum/audio experts approve them.

## Product quality and child safety

- Preserve mobile/tablet compatibility; use large, clear buttons, English and Arabic support, positive non-punitive feedback, no forced timers for young learners, no ads, no unnecessary logins.
- Avoid invented learning standards or asserting official alignment without a validated mapping. British KS1 / US Grade 1 themes have overlap but are not equivalent to a Qatar school syllabus.
- Provide realistic parent information and transparent level status. Progress data is device-local, not cloud-account data. No analytics or unauthorised speech capture.
- Validate every release: confirm `Validate app`, `Child App Security Gate`, `Test mobile reading and audio` and `pages build and deployment` workflow conclusions. Do not claim tests passed before checking their actual status. If a workflow fails, inspect the logs, fix and rerun.
- Do not delete or overwrite previous games, voices, achievements or child progress during a routine upgrade. Keep app storage keys stable, and migration/backup before any intentional change.

## Development priorities after Grade 4 maths pilot

1. Verify the new Grade 4 maths pilot, including iPhone/tablet, correct-answer feedback, saved progress, content accuracy, and GitHub Pages deployment.
2. Keep extending higher grades **one carefully defined subject pilot at a time**, with meaningful learning outcomes and worked explanations, rather than only increasing raw activity counts.
3. Build a documented age/grade/skill progression and review content with qualified teachers for specific curricula and Arabic/local subjects.
4. Offer parents a trustworthy dashboard and clear next-step recommendations with private, device-local progress.
5. Continue staged pronunciation review for English and Arabic with listener/educator signoff before swapping recordings.
6. Address international benchmarking as a measured comparison: Grade 1–6 scope, subject breadth, skill depth, adaptive practice, privacy and parent experience—avoid making unverified activity-count claims.

## Working with ChatGPT when old conversations are missing

Say: **“Continue Little Learners Academy using `PROJECT-CONTINUITY.md` in my GitHub repository.”**

Ask the assistant to inspect this file and live repository before making changes, and to update this file after major milestones. Keep the latest GitHub link in a safe bookmark. Project code/history can be recovered from GitHub even if a specific old chat is not available. This file **does not restore missing chats**; use ChatGPT history/search or account export if you need actual past messages.

## Recent milestone status

- As of 13 October 2026, Grade 4 maths files and the chooser link have been committed.
- GitHub validation and security gate for the Grade 4 update passed. An initial mobile workflow had an outdated grade-selector expectation (2 pilots instead of 3). A correction to `scripts/test-mobile-ui.cjs` was committed; check the latest workflow result before considering this milestone fully verified.
- Check the Pages deployment result for the current head commit, and do not conflate an earlier deployment with the latest commit.

## 13 October 2026 — Grade 4 English reading extension

- Added a limited 18-question English reading comprehension pilot across three original short passages: *The Desert Garden*, *A Library Mystery* and *The Mini Market Challenge*.
- Targeted skills include retrieving information, ordering events, contextual vocabulary, inference and finding evidence. Each answer has a hint and an explanation; completion is stored only on device under `lla-grade4-reading-v1`.
- Grade 4 chooser now links maths and reading. This is supplementary English-medium reading practice with Arabic question support, **not a certified Qatar syllabus**. It adds no speech recording or other child data collection.
- Confirm latest mobile, validation, security and Pages workflows after release before claiming all tests passed.

## 13 October 2026 — Grade 4 Science pilot

- Added a further **18 science inquiry questions** across three original brief contexts: Habitats & Food Chains; Materials & Changes; Forces & Fair Tests. Each question includes Arabic support, a hint, correction feedback, and a worked concept explanation.
- Files: `grade4-science.html`, `grade4-science-data.js`, `grade4-science.js`; chooser entry under Grade 4. Device-only progress key: `lla-grade4-science-v1`.
- This is a **limited, English-medium supplementary science pilot**, not a complete or accredited Grade 4 science syllabus. No new voice recordings, microphones, accounts, or child-data collection.
- Updated cached app shell and mobile regression tests. Verify latest validation, security, mobile, and deployment workflows before declaring the release complete.

## 13 October 2026 — Grade 4 parent progress overview

- Added `grade4-progress.html` / `grade4-progress.js` to summarise the three **limited Grade 4 pilots** in one bilingual-friendly, mobile-first parent/student view.
- The dashboard reads **existing** browser-local keys `lla-grade4-math-v1`, `lla-grade4-reading-v1`, and `lla-grade4-science-v1` and displays counts for 24 maths + 18 reading + 18 science questions (60 short questions total). No new student profiles, storage keys, microphones, or tracking.
- Added a link on `choose-grade.html`, PWA cache entry, validation syntax check and a responsive Playwright test that verifies all three counts after solving one question in each pilot.
- Keep describing these as **supplementary practice questions, not official curriculum completion or a measure of mastery**. Check CI conclusions and deployment after this documentation commit.

## 13 October 2026 — Grade 5 maths starter pilot

- Released a **limited 24-question Grade 5 mathematics starter pilot** in `grade5-math.html`, `grade5-math-data.js` and `grade5-math.js`. The four six-question strands cover larger-number place value, operations and word problems, fractions/decimals, and measure/data.
- Each question includes an English prompt, draft Arabic support wording, a helpful hint, and a worked English explanation; browser-local progress uses `lla-grade5-math-v1`. There are no new accounts, recordings, analytics, advertisements, or microphone permissions.
- The Grade chooser marks Grade 5 as a **limited pilot** and Grade 6 as **planned**. Do not claim Grade 5 is a complete school curriculum, or that its Arabic support has been independently reviewed.
- Updated the offline PWA cache, validation syntax checks, and mobile Playwright regression checks. **The mobile test, validation, security gate, and GitHub Pages deployment for the release passed**.
- Next priorities: qualified subject/Arabic review, more contextual problems and explanations, parental feedback, Grade 5 English and science pilots, and measurable learning outcomes before public school-scale promotion.


## Independent educational self-review (13 October 2026)

- The owner presently has no organised access to teachers or a parent feedback panel; do not invent reviews or approval.
- Added `INDEPENDENT_LEARNING_REVIEW.md`, a practical self-review checklist covering correctness, Grade 1–5 pilot boundaries, bilingual content, pronunciation, touch accessibility and privacy.
- Added `scripts/check-grade5-content.cjs` as a deterministic 24-question Grade 5 maths answer/ID/hint/explanation integrity gate, invoked from `Validate app` on repository changes.
- These checks do **not** provide teacher validation or certify Qatar curriculum alignment, English phoneme quality or Arabic pronunciation.


## 13 October 2026 — Grade 5 science inquiry pilot

- Added three original Grade 5 science inquiry topics and **18 supplementary questions**: Ecosystems & Interdependence; Earth, Space & Patterns; and Materials, Forces & Fair Tests. Each question has drafted Arabic support, hints and a concept explanation. Files `grade5-science.html`, `grade5-science-data.js`, `grade5-science.js`.
- Device-only progress key `lla-grade5-science-v1`; no account, microphone, advertising, new voices or child identity data. The Grade 5 chooser now lists limited maths, reading, and science pilots.
- Grade 5 is **not a complete or certified curriculum**; Arabic, formal curricular alignment and science content remain subject to qualified educator review. Verify current GitHub mobile, validation, security and Pages workflows before declaring the release complete.

## 13 October 2026 — Grade 6 maths limited starter

- Added `grade6-math.html`, `grade6-math-data.js`, `grade6-math.js`: **24 original supplementary Grade 6 mathematics questions**, six each on ratios/rates, introductory algebra, fractions/decimals, and measurement/data, with English worked explanations, hints and draft Arabic prompt supports.
- Grade chooser now provides Grade 6 as a **limited maths pilot**, not as a complete Grade 6 curriculum or teacher-approved Arabic/local syllabus.
- Device-only progress uses `lla-grade6-math-v1`; existing Grade 1–5 progress, sound recordings, approved C/D bus voices and achievements are untouched. No accounts, microphones, analytics or advertising.
- Content-integrity checks and mobile browser regression added. Verify the latest CI conclusions and Pages deployment after this update; qualified teacher review remains outstanding.


## 13 October 2026 — Grade 6 English reading comprehension pilot

- Published **three original Grade 6 English reading passages and 18 evidence-led comprehension questions** in `grade6-reading.html`, `grade6-reading-data.js` and `grade6-reading.js`.
- Story contexts: *The Shaded Walkway Decision*, *Notes from the Mangrove Channel* and *Who Gets a Quiet Reading Corner?*. Skills include evidence, inference, comparing claims and observations, checking information sources, sampling limitations, respectful decisions and privacy.
- Each passage has six questions, short draft Arabic question guidance, a hint, a worked explanation and an optional parent discussion prompt. Browser-local progress is stored under `lla-grade6-reading-v1`; existing achievements, other grade progress and voice recordings are unaffected.
- Linked only two **limited related topics** in the Grade 6 school-topic guide (extended comprehension and textual evidence). Structured composition, broader vocabulary study and science remain explicit gaps.
- The Grade 6 overview now honestly describes **24 maths questions + 18 English reading questions** (42 distinct questions across two limited pilots), not a full Grade 6 curriculum or a teacher-validated course. The school/curriculum alignment and draft Arabic wording remain awaiting qualified review.
- Added `scripts/check-grade6-reading.cjs` and mobile browser checks; **Validate app**, **Child App Security Gate**, **Test mobile reading and audio**, and **GitHub Pages deployment** all passed for the working release before this documentation update.
- Next useful development: a small Grade 6 science investigation pilot, parent-facing Grade 6 coverage summary and more demanding written-response activities—not just extra multiple-choice counts.


## 13 October 2026 — Grade 6 science investigation pilot

- Added **18 original Grade 6 science inquiry questions** across three fictional classroom investigations: coastal/mangrove ecosystem evidence, solar electricity and low-voltage circuits, and water separation/evaporation/condensation. New files: `grade6-science.html`, `grade6-science-data.js`, `grade6-science.js`.
- Each of the three scenarios includes six questions, draft Arabic prompts, optional hints, and explanations of scientific reasoning. Safety cautions explicitly prohibit experimenting with mains electricity, drinking classroom samples, disturbing wildlife or visiting protected areas without permission.
- Grade chooser and roadmap now show a **limited 24-question Grade 6 maths pilot, 18-question English reading pilot, and 18-question science pilot (60 questions across three different subjects)**. They are not full grade-level curricula, and the experiments are hypothetical demonstrations, not observed Qatar field research.
- Curriculum Compass and School Pathways now link only introductory related science topics, with Earth/space breadth, writing and other missing competencies still visible. The science module is **not school-standards certification**, Arabic language review, independent pedagogical evaluation or proof of mastery.
- Saved science completion is browser-local under `lla-grade6-science-v1`. No new accounts, microphone, tracking, or recordings; existing stars/progress and preferred English voice recordings were not modified.
- Added deterministic data integrity checks in `scripts/test-grade6-science.cjs` and browser regression checks for mobile/tablet layout, wrong-answer retry, hints, explanations and persistence. Check latest GitHub workflow conclusions before claiming final release.



## 13 October 2026 — Grade 6 family progress and continuity milestone

- Added \`grade6-progress.html\` and \`grade6-progress.js\`: a bilingual-friendly, mobile/tablet-first parent summary of the three **limited Grade 6 subject pilots**, covering **24 mathematics + 18 reading + 18 science = 60 distinct practice questions**.
- The progress page reads **only existing same-device storage keys**, \`lla-grade6-math-v1\`, \`lla-grade6-reading-v1\`, and \`lla-grade6-science-v1\`, counting the exact \`g6m-01…24\`, \`g6r-01…18\`, and \`g6s-01…18\` question IDs. It introduces no accounts, names, tracking, microphones, ads, or new reward balances.
- Shows per-subject counts, four maths topics, three reading passages, three science investigations, a next-practice suggestion and a link to school-topic gaps. A correct response at least once counts as \`explored\`; it is **not a claim of independent mastery, a full curriculum, or qualified teacher review**.
- Added navigation from \`choose-grade.html\` and the home menu, cached the new page and script for PWA, and expanded code validation and Playwright mobile/tablet checks.
- **At commit \`f961fa37\`, all four required workflows passed**: Validate app, Child App Security Gate, Test mobile reading and audio, and GitHub Pages deployment. These results verified the feature release before this documentation-only update.
- Preserve all existing English/Arabic recordings and the parent's approved C/D word \`bus\` defaults and optional override. The owner can access the released page from an iPhone without a laptop.
- Future priorities: richer Grade 6 writing tasks and evidence-based explanation; qualified review for curriculum/Arabic; parent review of newly added content; improved accessibility and production security before a broader child rollout.

## 13 October 2026 — Grade 6 guided evidence-writing pilot

- Released `grade6-writing.html`, `grade6-writing-data.js`, and `grade6-writing.js`: **six supplementary short English writing tasks**, two each linked to the three original Grade 6 reading passages about a shaded school walkway, mangrove observations, and a library survey. These are **six practice prompts**, not six validated lessons or an official writing curriculum.
- Pupils can read contextual evidence, use sentence starters, draft their own paragraphs, compare with one possible model answer and self-check three simple success criteria. A prompt can be marked **practised** after entering at least twelve words and checking the criteria; there is **no automatic scoring, AI text assessment, or claim of mastered writing**.
- **Privacy:** entered paragraph text exists only in the current page's memory. It is not uploaded and is not saved to localStorage. Reloading the page discards all drafts. Only `g6w-01`–`g6w-06` boolean practice markers are stored under `lla-grade6-writing-v1`, separately from existing achievements and question answers.
- Linked the writing studio from the Grade 6 chooser and Reading Adventure. The Grade 6 family progress screen displays a separate **0–6 writing practice** count without changing the truthful **60 maths/reading/science questions** total.
- Added mobile/tablet browser assertions for writing navigation, safe draft behaviour, practice completion, persistence of boolean markers, and separate family progress. Added `scripts/check-grade6-writing.cjs` as a repeatable prompt-structure/privacy check and included assets in the offline cache.
- No audio recordings, parent-approved English `bus` voice choices, formal Arabic learning modules, names, child accounts or advertising were changed or added. Draft Arabic supports remain subject to native-speaking review; qualified English-writing teacher review and school-specific curriculum mapping are still outstanding.

## 13 October 2026 — Parent-friendly Grade 6 writing pathway

- Expanded `grade6-progress.html` and `grade6-progress.js` to show six individual writing mission statuses drawn from the original `grade6-writing-data.js` prompts. They retain existing browser-local `lla-grade6-writing-v1` boolean markers and never store drafts.
- Writing practice stays **separate** from the 60 maths, reading and science questions. A self-check represents practice, not a scored or teacher-verified writing grade.
- When all 60 question checks have been explored but writing prompts remain unpractised, the next-step recommendation points to the Grade 6 Writing Studio, rather than implying the learner graduated.
- Added mobile/tablet browser regression assertions for each mission, a next writing recommendation, and separation of question progress from writing practice. Changes preserve existing child progress, audio voice preferences and privacy safeguards.
- Verify the latest mobile tests, validation, security gate, and Pages deployment statuses before calling this milestone fully released.


## 13 October 2026 — verified cross-grade activity inventory and international scale comparison

- Audited the source-data arrays for **451 distinct short multiple-choice practice questions** across Grades 1–6: Grade 1 **151**, Grade 2 **66** (24 maths + 24 English + 18 science), Grade 3 **54** (18 in each of three areas), Grade 4 **60**, Grade 5 **60**, Grade 6 **60** (each 24 maths + 18 reading + 18 science). An additional **six Grade 6 guided writing prompts** are counted separately as practice rather than multiple-choice questions.
- `scripts/audit-activity-inventory.cjs` executes each trusted local data file in a restricted Node VM, checks unique IDs, answer-option integrity and per-grade quantities, excludes mixed-review questions that reuse originals, and verifies that the published `international-benchmark.html` counts match the source arrays. `Validate app` runs this check so new releases cannot silently inflate these particular counts.
- `international-benchmark.html` now includes the auditable per-grade breakdown, honest caveats about limited Grade 2–6 subject pilots, and the distinction between questions, full lessons, writing tasks and games. It retains links to original providers for comparisons (Khan Academy Kids, IXL, SplashLearn, ABCmouse) and avoids treating their skill/activity/book counts as interchangeable.
- Updated the mobile/tablet browser regression to check the count table, refreshed the PWA cache, and preserved all existing child progress, offline audio files, the parent's approved C/D `bus` voice settings, and established curricula gates. No new user data, accounts, analytics or trackers were introduced.
- Technical audit is **not** independent educational or Arabic-language approval, proof of skill mastery or confirmation of exact Qatar curriculum alignment. Next step: improve depth in individually reviewed skill sequences and measured parent/teacher usability rather than simply maximizing the advertised count.
