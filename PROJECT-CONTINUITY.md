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
- **Grades 5–6:** planned, not released. Grades 2–4 are limited supplementary pilots rather than complete grade-level curricula.
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
