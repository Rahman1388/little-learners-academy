# Original visual micro-lesson + color-linked concept map — review plan
**19 October 2026 — Draft implementation, not released or teacher-certified**

## Purpose
A reproducible, original educational **video-style micro-lesson** and a simple child-friendly concept map for Grade 2 place value. This project uses some high-level teaching ideas associated with **Tony Buzan's visual mind-mapping** (central idea, colored associations, images/keywords), not Buzan's proprietary artwork, course, logo or claimed endorsements. This is an **independent original diagram**, not an officially licensed Buzan mind-map product.

## Exactly what exists
- grade2-visual-story.html + grade2-visual-story.js: original FIVE-part silent storyboard about **43 = four tens and three ones** with drawable rods and dots, English and **draft** Arabic captions, deliberate Play/Pause, Next/Back and Replay buttons, reduced-motion CSS, and an original color-coded diagram centered on 43.
- Color is redundant with text: **blue means tens**, **gold means ones**, and **green means total**. All branches also have words and equations, and the model has an accessibility description.
- **Not yet an encoded MP4/video file**, not a voice-over, not an unmoderated video feed. The child controls when playback begins; a scene changes every four seconds only during a user-initiated Play session. Stopping after the fifth part is automatic. There are no sound-effects, flashed images, advertisements, analytics, external media services, AI chat, identity, child uploads, child voice or browser storage.
- Purposefully separate from Draft PR #15's interactive math lesson and the public app. No links on the live app, no changes to Grade 2 existing progress, no additions to the 451-question inventory, and no claim of a newly completed full lesson or an existing library of videos.

## Educational context and sources to review
- CAST UDL 3.0: use multiple representations but pair graphic/animation with text equivalents and accessible navigation: https://udlguidelines.cast.org/representation/language-symbols/multiple-media/ and https://udlguidelines.cast.org/representation/perception/ways-perceive-information/
- EEF digital technology guidance: focus on learning goals rather than novelty: https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/digital
- Tony Buzan official training source on the center-image/color-branch/keywords approach: https://tonybuzan.com/course-mind-mapping-2/
- **Evidence limit:** Attractive pictures and color alone do not prove long-term retention, learning gain or school curriculum match. Test comprehension and engagement with adult/educator feedback.

## Human QA still required
- Grade 2 mathematics teacher: count blue rods (1 then 4) and gold dots (0 then 3), check 40+3=43 and 4 tens+3 ones, ensure sequence and reading demand are age-appropriate, link to real school learning objectives.
- Qualified Arabic educator: verify every Arabic instruction, caption, math notation, numerical speech equivalent, directionality and child-appropriate voice/tone; the current Arabic wording is **unverified**.
- iPhone/Android accessibility adult: VoiceOver and TalkBack read out each stage and map accurately; inspect at 280/320/390/768/1024px with large text; colorblind simulation; reduced-motion preference; tap and keyboard focus.
- Family teacher/parent: Can a learner explain 43 without relying solely on color or animation? Is scene pacing too fast (4s) for struggling readers? Make pause and manual controls easy to use.
- Copyright/cultural review: Only original artwork/code/text; ask for written licensing clearance for any future footage, recording, song or reused diagrams.
- Child privacy: No external host requests, tracking, profiling or public accounts; future real narration must come from a properly licensed/consented adult recording or qualified approved speech source. No child voice cloning.

## Release gate
Draft branch only, no public review URL, do not merge without technical pass, educator + qualified Arabic review, real iPhone manual pass and explicit owner approval. This prototype demonstrates feasibility; it has not established learning outcomes.

## Browser test
The dedicated workflow runs syntax checks plus a Playwright Chromium test for both locales, navigation, play/pause, count accuracy, privacy and 280–1024px layouts.

Teacher decision: **Pending** • Arabic language decision: **Pending** • Real iPhone: **Pending** • Human copyright and audio review: **Pending**.
