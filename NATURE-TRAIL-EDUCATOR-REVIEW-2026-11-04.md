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
