# START HERE — Little Learners Academy

**Checkpoint:** 18 October 2026. **Owner's project:** bilingual, Qatar-focused, child-safe Grades 1–6 supplementary learning app. This document is a quick way to resume after lost chat context; it is not an export of ChatGPT transcripts.

## Public app and links

- [Open Little Learners Academy](https://rahman1388.github.io/little-learners-academy/)
- [Grade 2 Four English Skills](https://rahman1388.github.io/little-learners-academy/grade2-four-skills.html)
- [Grade 2 Word Family Adventure](https://rahman1388.github.io/little-learners-academy/grade2-phonics-pathway.html)

## Completed up to 18 October

- Original Grade 2 four-skills pilot: five themed modules × listening/speaking/reading/writing = 20 guided practice flags. Additional optional written phonics, reading follow-ups and private writing prompts; not a complete syllabus or proof of mastery.
- Word Family Adventure: **ring**, **sing**, **hand**, **sand** in the -ing/-and families across seven guided stages each.
- Guided **Continue** button released 16 October after automated interaction tests.
- Optional **Hear** and **Slow** buttons for English words added 16 October. They use the device's English text-to-speech and do not record or upload child voices. Tests confirm interactions and publishing, **not pronunciation quality**.
- User confirmed new links opened after a temporary 404 while GitHub Pages published. On 18 October user said **“Checked”** but did not say whether the voice sounds clear. **Do not assume audio approval.**
- The last main-branch documentation release on 18 October passed Validate app, Child App Security Gate and GitHub Pages deployment checks.

## Where educational review stands

- Earlier teacher feedback applied to **three sample** Grade 2 reading activities only. The teacher requested improvements to learning objectives, grade suitability, accessibility and four English skills.
- Grade 2 Semester 1 overview (2026–27) informed the topic crosswalk. Top Stars 2A and the 2025–26 Semester 2 blueprint are historical/comparison material, not official approval.
- All five modules and Arabic instructions remain subject to specialist review. Real-device iPhone playback, VoiceOver, English phonics clarity and parent-child usability still need human checks.
- Keep the public pilot labelled supplementary/parent-teacher preview. Do not claim school, Ministry or teacher certification; do not collect student identities, microphone recordings, or add ads.

## 18 October 2026 — advanced parent pronunciation feedback (PR #11)

A new optional **adult-only sound review panel** was merged into the Grade 2 Word Family Adventure (commit `ee2029d`). For ring, sing, hand and sand, adults can play device-voice Hear/Slow, mark each as **clear**, **needs improvement**, or **no sound**, and prepare locally generated written feedback to copy into a chat. Nothing is uploaded or stored, and no child is assessed. All three pre-merge gates — Grade 2 browser QA, app validation and child security — passed. **Confirm the latest Pages deployment separately before telling the user the new panel is live.** This feature is a practical feedback collection interface, not evidence that English pronunciation passed educator review.

## 18 October 2026 — Ministry inquiry sent (user-reported)

- Project owner reported **sending an initial email inquiry** to Qatar's Ministry of Education and Higher Education (MOEHE), asking about the process for review/evaluation of an **independent educational app**. The draft included the main public app URL and the Grade 2 Word Family Adventure sample URL.
- **Status: Awaiting a response.** No Ministry evaluation, receipt confirmation, appointment, approval, accreditation, endorsement or formal audit has been reported; do not imply any of these occurred. We have not accessed or independently verified the user's sent mailbox.
- **Next actions:** Keep any response privately, identify correct Ministry department and official requirements, then prepare a professional application overview, privacy safeguards, curriculum crosswalk and teacher-review evidence as requested. If no reply after roughly **7–10 working days**, consider a courteous follow-up or the official Ministry contact channels. The owner should not publish officials' private correspondence without permission.
- Product voice decision: retain previously verified adult device audio as baseline, and **consider but do not yet deploy** a teacher-reviewed child-friendly/youthful voice comparison. Parent reported clear iPhone playback of ring, sing and hand at normal and slow rates; sand was not yet reported.

## 18 October 2026 — quality-first foundation stage

- The owner decided to strengthen **educational quality, curriculum structure, teaching depth, accessibility, bilingual review and reliable platform practices before adding large numbers of lessons or activities**.
- [Quality-First Foundation Plan](./FOUNDATION-QUALITY-ROADMAP.md) now defines eight quality foundations and phased release criteria. [Grade 2 Quality Manifest](./learning-quality-manifest.json) traces five modules, 20 skill practice flags and two phonics word families; `scripts/check-learning-quality-manifest.cjs` checks that the documentation continues to match the actual app.
- **Technical validation and deployment of the foundation changes must be verified from GitHub Actions.** A passing content script does not establish any school or Ministry approval or replace human teacher review.
- Confirmed user-reported iPhone adult listening: **ring, sing and hand all clear** at normal and slow speeds; **sand pending**. A child-friendly voice is a future comparative trial, not an authorized replacement of working English audio.

## 18 October 2026 — Draft quality lesson PR #13 (not released)

- An optional quality-first lesson enhancement was built on the dedicated branch `feature/grade2-lesson-scaffolding-20261018`. [Draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13) adds a child-facing English learning goal, optional hints for Read/Spell/Apply, explanation after successful written choices, a spoken reflection prompt and keyboard focus styling. It **does not** increase counts, change audio, alter existing progress or add stored child data.
- **All three automated draft-PR workflows passed on 18 October 2026:** Grade 2 four-skills mobile Chromium regression, Validate app, and Child App Security Gate. This is technical validation, **not** confirmation of pronunciation accuracy, teacher approval, or real iPhone Safari/VoiceOver behavior.
- **Keep this PR as a draft; do not merge publicly** until a Grade 2 English/phonics educator reviews wording and pedagogy, an adult verifies it on iPhone and with VoiceOver, and requested corrections are made. Review evidence/questions are in [the draft branch QA checklist](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-lesson-scaffolding-20261018/GRADE2-GUIDED-LESSON-QA-20261018.md).
- Parent-confirmed clear word audio remains `ring`, `sing`, `hand` (normal and slow); `sand` is **still pending** manual listener report. A child-friendly voice remains an optional unapproved comparison, not an implemented replacement.
- **Recovery hint:** pick up with draft PR #13, wait for qualified educator review of the lesson, and retain the live `main` app unchanged until ready.

## 18 October 2026 — Further Grade 2 phonics lesson improvements (still draft)

- **Feature branch:** `feature/grade2-lesson-scaffolding-20261018`, [draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13), latest tested commit `b4b9621d3`.
- Word Family Adventure's **Hear** stage now provides normal and slow word replay for **ring, sing, hand and sand**, reusing the existing on-device voice system. Listening does not complete a practice stage or assess children's pronunciation. The adult phonics demonstration is still required.
- An adult-facing link opens the existing `teacher-feedback.html` in a separate tab for exact expert corrections; the form shares only if the reviewer chooses to copy or share it.
- Previous draft enhancements remain: a child-readable learning goal, optional clues for reading/spelling/word meaning, a brief answer explanation and a reflection prompt. No activity counts, learner progress keys, child accounts or recordings were changed.
- **All three latest draft-branch checks passed (18 October 2026):** Grade 2 Chromium UI regression, Validate app and Child App Security Gate. This is technical validation only. **Public deployment, qualified phonics review, iPhone/Safari real voice and VoiceOver manual checks are still pending. Do not claim approved or merge the draft automatically.**
- Detailed acceptance and review script: [Grade 2 guided lesson QA](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-lesson-scaffolding-20261018/GRADE2-GUIDED-LESSON-QA-20261018.md).
- **Next user-side hearing check:** `sand` at normal and slow rates on a real iPhone in the *current public app* (the new Hear-stage controls are only in the unreleased draft). Parent reports ring, sing and hand clear at both rates; professional sign-off remains pending.

## 18 October 2026 — Continuous national and international quality loop (DRAFT, NOT RELEASED)

- Owner requested **every change** be checked against Qatar national/Grade 1–6 curriculum, age-suitable educational objectives, researched teaching practices, qualified English/Arabic specialist views, family and child usability, WCAG accessibility, licensing, Qatar cultural values and child privacy.
- This request was recorded as an ongoing development gate in [draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13): [quality standard](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-lesson-scaffolding-20261018/DEVELOPMENT-QUALITY-STANDARD.md), [eight-domain review registry](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-lesson-scaffolding-20261018/quality-gates.json), and a CI integrity checker.
- Official-source references include Qatar MOEHE Early Learning/Foundation Stage and Curriculum Section, Qatar Personal Data Privacy Protection Law Art. 17 and regulator advice; international **guidance** includes EEF phonics, CAST UDL 3.0, W3C WCAG 2.2 and UNESCO's education-technology report. No school/Ministry, phonics/Arabic specialist, WCAG or legal certification is claimed. Teacher and Arabic QA remains **pending**.
- The draft also stops active voice synthesis when the phone app enters the background (for example, on a call); it does not resume automatically. The 14 practice marks are temporary only while Safari keeps the page loaded; reload resets them, as disclosed.
- **Important:** this checkpoint records a plan and linked development files, not a released feature. Check PR #13 workflow results, real iPhone/VoiceOver and educator feedback before any public merge. Continue without starting over or exposing private school PDFs.

## 18 October 2026 — Repository privacy and backup safeguards
- GitHub repository **is public**; source control is not a vault and not a verified independent backup. No child info, school PDFs, confidential teacher reviews, passwords, access tokens or backup archives belong there.
- [PROJECT-SECURITY-AND-BACKUPS.md](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-lesson-scaffolding-20261018/PROJECT-SECURITY-AND-BACKUPS.md) describes account security, GitHub branch rules, monthly independent backups and recovery. Backup is **recommended, not created**; GitHub `main` branch rulesets were checked and **none were configured**. The connector could not read protected-branch settings (403), so the owner must verify/change settings in GitHub.
- [Draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13) now contains `.gitignore` protections, `scripts/check-public-file-safety.cjs`, and Child App Security Gate integration, blocking common confidential document/archive/credential filenames in new tracked code. Filename rules do not detect hidden private content in legitimate files, or leaks in Git history.
- **Latest draft commit:** `2d4770494`. All three automation workflows passed on 18 October 2026: `Validate app`, `Grade 2 four-skills pilot`, and `Child App Security Gate` (including the new filename safety check). Still **draft, not merged**, due to outstanding specialist/real-device approval.
- Recovery priority: user should independently back up the repository on an encrypted second device/cloud (a ZIP of code omits full Git history); consider a Git mirror from a laptop for version history. GitHub Pages and the public main branch remain unchanged by this draft.

## Next action in the next chat

1. Continue **[the Quality-First Foundation Plan](./FOUNDATION-QUALITY-ROADMAP.md)**, not bulk question production. Validate any new module against the machine-readable learning objectives and qualified teacher review.
2. Parent found ring, sing, hand clear at two speeds on iPhone. **Only sand** still awaits adult sound testing; no phonics educator has signed off on the four words.
3. Invite a Grade 2 English teacher to assess each of five Semester 1 modules; engage a native Arabic-language educator to review every relevant Arabic instruction. Log Accept / Revise / Hold and correction evidence.
4. Conduct real-device iPhone/Safari and VoiceOver tests, preserve existing progress, and check release workflows after updates.
5. **Ministry inquiry already sent (as reported by owner)**; await official response and use the requested process. No official approval has been received.

## Source of truth

- [Complete evolving project history](./PROJECT-CONTINUITY.md)
- [Current Grade 2 educator review checklist](./GRADE2-QUALITY-REVIEW-2026.md)
- [Older teacher feedback tracker on development branch](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-four-skills-pilot-20261016/GRADE2-TEACHER-FEEDBACK-TRACKER.md)
- [Grade 2 Semester 1 source crosswalk on development branch](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-four-skills-pilot-20261016/GRADE2-SEM1-CURRICULUM-CROSSWALK.md)

**Resume phrase:** “Continue Little Learners Academy from START-HERE.md; check PROJECT-CONTINUITY.md and GRADE2-QUALITY-REVIEW-2026.md, then resume pronunciation and educator QA.”

**Storage note:** GitHub project files, the ChatGPT file Library folder and ChatGPT Projects/chat history are different. This checkpoint is not a downloadable copy of the whole app and does not restore a missing chat thread.
