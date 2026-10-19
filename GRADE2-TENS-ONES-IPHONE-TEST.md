# Little Learners Academy — iPhone, iPad and Accessibility Review (PR #15)

**Status:** Manual test protocol prepared; no real-device sign-off claimed.

## Before testing
- Obtain a runnable review build from the developer/SEBT team. Draft PR source files are **not a publicly deployed app link**.
- Use GitHub PR #15 branch: feature/grade2-tens-ones-lesson-20261019. Technical testers may serve from repo root using a local HTTP server on a controlled network. Do not expose an unreviewed build to children as an official lesson.
- Record device model, iOS/iPadOS version, browser, orientation, date, and exact commit. Do not record a child's name, voice or personally identifying data.
- Review both English and draft Arabic with the English / العربية controls. Qualified Arabic language review is still required.

## Manual iPhone and iPad test steps
- [ ] At default text size, load the lesson without broken scripts/icons or horizontal scrolling.
- [ ] On iPhone Safari at ~320px and 390px widths check touch targets and portrait/landscape; on iPad check ~768px and wider.
- [ ] In English, model shows **3 blue ten-sticks and 4 gold dots**; its accessibility label announces 3 tens and 4 ones. Explanation shows **30 + 4 = 34**.
- [ ] Guided stage shows 5 tens and 2 ones. Wrong **25** displays kind correction and does not unlock Next. Hint explains grouping. Correct **52** unlocks Next.
- [ ] Switch to العربية in the middle of the guided stage. Header, instructions, hint, feedback, accessibility label and controls switch to Arabic without losing the stage or completion.
- [ ] Confirm text is right-to-left and arithmetic numbers display in order. Fluent Arabic educator checks the translation and VoiceOver pronunciation.
- [ ] Switch back to English; current stage remains unchanged.
- [ ] Independent stage shows 7 tens and 6 ones. Wrong **67** displays correction; correct **76** unlocks Next. Repeat in Arabic.
- [ ] New **Build the Number** stage: start with zero sticks/dots, attempt to check early and receive correction, add four tens and three ones to make **43**, confirm controls are keyboard/touch accessible and the number readout is announced by VoiceOver.
- [ ] Change English / العربية mid-build: the four ten-sticks and three dots should remain unchanged. Check the original feedback is translated, then verify successful check unlocks Continue. Confirm subtract buttons never produce negative counts.
- [ ] Reflection asks for verbal or pointing explanation; no microphone permission or recording request.
- [ ] Completion offers replay but does not claim school success or mastery.
- [ ] Rotate, zoom, change system text size; check legibility, focus and contrast.
- [ ] Turn on VoiceOver: Settings → Accessibility → VoiceOver. Navigate language buttons, headings, hint toggle, choices, feedback and Continue in both languages.
- [ ] Disconnect internet after loading and move among loaded stages. Verify no external services, analytics, ads or downloads. Reloading while offline may not work because the draft is not cached by the production app.
- [ ] Return to the published Grade 2 pilot. Check its existing saved progress is unchanged.

## Release gates
- Record **Pass / Issue / Not tested** for every test and device, with steps to reproduce issues.
- Grade 2 maths teacher verifies intended concept and learning progression.
- Qualified Arabic educator signs off text and directionality.
- Owner reviews outcomes and gives explicit approval before any publication.

## Private tester report
- Tested date, exact commit/version:
- Device, OS, browser:
- English navigation/readability:
- Arabic/RTL:
- Maths visual and counts:
- VoiceOver:
- Wrong/correct/hint/continue behaviour:
- Screen width and reproduction steps:
- Decision: [ ] Accept for limited pilot [ ] Revise [ ] Hold
- Follow-up needed:
