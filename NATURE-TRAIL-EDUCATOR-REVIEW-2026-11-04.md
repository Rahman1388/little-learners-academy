# Qatar Nature Discovery Trail — review and release checklist

**Development:** 4 November 2026  
**Status:** Unmerged, review-only development pilot. No official curriculum endorsement, native-voice sign-off or child-facing public release.

## A child-friendly improvement

- One original, calm bilingual Grade 1–6 science experience, with **12 distinct questions across 3 age bands**: Grades 1–2, 3–4, and 5–6, four questions per band.
- Qatar garden, desert, shore and mangrove settings displayed through **original CSS nature scenes and labelled symbols** (not third-party wildlife photos).
- Each step: Observe → Choose → optionally Hint → Explain after success → Talk with a family member. Wrong answers invite retry without timers, penalties, badges, streaks or shaming.
- English and **draft Arabic** shown simultaneously for questions, choices, hints, explanations and talk prompts; accessible controls, scene descriptions, keyboard focus and reduced-motion handling.
- In-session progress only. No accounts, cookies, analytics, localStorage, microphones, recorded child voices, API calls, external scripts, paid services or auto-playing music.
- No change to released Grade 1–6 question bank (**475 distinct practice questions**) or stars/saved audio preferences. The draft 12 are **not** counted as public content.

## National evidence used to select topics (not a claim of syllabus approval)

- Qatar MOEHE Early Learning guidance explicitly describes the Grade 1–2 foundation stage, learning through play and real-life observations:
  https://www.edu.gov.qa/en/Content/EarlyLearning
- Qatar Ministry of Environment and Climate Change Al Thakhira Reserve: salt-tolerant mangroves, coast habitats, migratory birds, fish and protected wetland context:
  https://www.mecc.gov.qa/English/AwarenessandMedia/Pages/Al-Thakhira-Reserve.aspx
- Arabic-language environmental source for wording comparison:
  https://www.mecc.gov.qa/Arabic/AwarenessandMedia/Pages/Al-Thakhira-Reserve.aspx
- Visit Qatar's nature guide explains mangroves as habitat for fish, crabs and birds and their shoreline benefits:
  https://visitqatar.com/intl-en/things-to-do/adventure-sports/the-water/al-thakira-mangroves
- Qatar e-Nature describes mangrove roots, salt adaptations and habitat protection:
  https://www.enature.qa/ecosystem/mangroves/

These sources support selected broad scientific facts. **They do not provide grade-by-grade lesson objectives**, school-assigned sequences, app certification or permission to reproduce protected materials.

## Mandatory specialist reviews

- [ ] Qatar primary-science specialist reviews each of 12 questions, distractors, explanations, age bands, habitat accuracy and learning objectives against actual Qatar curriculum scope.
- [ ] Fluent Gulf Arabic educator reviews *every* translation for natural vocabulary, diacritics if needed, scientific terminology, text direction and child comprehension. English/Arabic voices must remain separate and native-quality when recordings are added.
- [ ] English phonics educator reviews each new planned English word/phoneme and its natural pronunciation before any recorded audio is introduced. No AI voice is assumed to be child-like or natively accurate.
- [ ] Family/child tests with supported parent supervision: nature backgrounds are pleasant, not overstimulating; no pressure to continue; age-appropriate reading and comprehension.
- [ ] Actual iPhone Safari/VoiceOver and Android/TalkBack at 320px, 390px, 768px; check screen reader order, visual contrast, emoji descriptions, large tap targets, RTL reading, optional hints and stop/retry.
- [ ] Existing adult audio review receives clear, unclear, unsure ratings per word; do **not** override previously approved C/D bus audio without owner authorisation.
- [ ] Review child safety (no instructions to enter nature reserves, disturb nests or touch wildlife); no precise location request.

## Automated release gates

Run:
```
node --check nature-trail-data.js
node --check nature-trail.js
node scripts/test-nature-trail.cjs
```
The Validate app workflow also runs these on pull requests, and the existing mobile Playwright workflow exercises lesson and stop interactions. CI is **not** evidence of teacher/native-speaker/real-device approval.

## Publishing next step

This page intentionally has **noindex** and is not linked in public navigation or added to the PWA cache. Only after the owner and specialists approve it should a separate release change:
1. Include it from the normal grade chooser and home activities.
2. Add its assets to the service worker, bump cache version, and rerun all release checks.
3. Decide whether and how to update the *audited released* unique-question count; do not double-count warm-up, hints or repeated rounds.
4. Confirm the final GitHub Pages deployment and then, separately, app-store native builds, review and signing.

## Parent conversation sample

Ask the child: **“Why might a small fish be safer among mangrove roots?”**  
Arabic draft: **«لماذا قد تكون السمكة الصغيرة أكثر أمانًا بين جذور القرم؟»**

Keep short sessions enjoyable. A child who wants to stop after one question has made a meaningful choice.


## 4 November: Look • Tap • Discover + Family Discovery Card (DRAFT extension)

The Nature Trail review branch also contains a new optional nature observation activity:
- `nature-spotter.html`, `nature-spotter.js`, and `nature-spotter-data.js`. Three selectable Qatar-inspired environments (mangroves, desert, coast) with four original labelled discovery objects each. These 12 interactive observation cards are **not** scored MCQs, graded learning outcomes or additional audited public questions.
- Children choose a scene and tap a picture to see English + **draft Arabic** object names, a short science fact, and a question to discuss with an adult. Parents can reveal a **Family Discovery Card** listing objects the learner explored and one follow-up conversation; they may print it with their own device. The report claims **observed/tapped**, never mastered.
- No student name, location, microphone, phonics synthesis, recordings, account, storage, server calls, analytics or child-targeted advertising. The recap exists only in the current browser page; there is no automatic upload or saved file.
- New source audit `scripts/test-nature-spotter.cjs` and mobile browser check `scripts/test-nature-spotter-browser.cjs` run through the PR's automation. These validate only code, source presence, basic bilingual coverage and interactions, not teaching effectiveness.

### Educational effect: what we will check with families (NOT proven yet)
- [ ] A qualified local primary-science teacher checks each observation fact and intended grade suitability.
- [ ] Fluent Arabic educator improves vocabulary, pronunciation guidance and bilingual explanation consistency.
- [ ] A qualified English-language educator and an Arabic native speaker evaluate actual recorded sound samples before introducing any new child-facing pronunciation. For now, all Nature Spotter cards are intentionally **silent**.
- [ ] Parent can find a scene, guide a four-card activity and understand the observation-based recap without confusing it with school marks.
- [ ] Children can safely stop at one object, ask questions freely and return to offline play. Observe whether any labels, lengthy passages or animations confuse or bore them.
- [ ] Children using screen readers get descriptive names, meaningful focus, appropriate contrast and full keyboard access. Audit real iPhone Safari/VoiceOver and Android TalkBack.
- [ ] Parents give consent to participate in **optional**, anonymous, small-scale usability sessions outside of the app; do not collect or publish real children's information.
- [ ] After specialist checks and parent consent, compare **usefulness**, clarity and comprehension in a small supervised pilot. Avoid claiming an educational "revolution", superiority or rank without independent outcome evidence.

### Why a family card?
Qatar MOEHE Foundation Stage Early Learning guidance values play, practical application and parent involvement:
https://www.edu.gov.qa/en/Content/EarlyLearning

Education Endowment Foundation reviews show that providing constructive home-learning activities and specific ways for parents to support learning is more meaningful than generic messages:
https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/parental-engagement

These are design inspirations, not evidence that Little Learners Academy itself raises attainment.


## 4 November: Look & Compare — bilingual, child-led pilot extension (NOT RELEASED)

A child can choose **two distinct objects from the same Qatar nature scene**, then consider one similarity and one difference with an adult. This is an observation and thinking prompt, **not a scored assessment or a pronunciation exercise**. It builds upon the existing 12 Nature Spotter objects; **no new objects or questions have been added to the published 475-question inventory**.

The compare panel has English and draft Arabic instructions side by side, large tappable controls, the two selected objects visible together, and a scene-specific family discussion prompt about caring for habitats. A duplicate selection is blocked; clearing comparison does not erase observations. Switching scenery, starting over, or reloading clears the session-only comparison. The existing private, printable Family Discovery Card optionally recaps the pair only after two different objects have been selected; it still does not claim mastery.

**Safety and permissions:** no microphone, audio, voice synthesis, personal account, camera, device location, web request, storage, student names or ads. This is a quiet parent-guided activity. Existing voice files and the parent-report system are unchanged.

**New verification:** the Node content-checking test asserts all comparison controls and reset/duplicate guards exist. The Chromium mobile test checks selection, duplicate prevention, side-by-side display, bilingual prompts, clearing/reset, optional printable recap and widths from 320px to 768px. Automated passes do not replace human educational, Arabic-language, accessibility or real-device testing.

**Human review still needed:** a qualified primary educator should confirm age-appropriate prompts and whether the activity encourages meaningful comparison rather than rote repetition. A native Arabic educator should review the draft translation. A child with a parent should try selecting, comparing and stopping after one object on actual iPhone and Android devices before release. Do not merge or publish without the owner's approval.
