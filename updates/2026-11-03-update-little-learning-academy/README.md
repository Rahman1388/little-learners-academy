# Update Little Learning Academy — 3 November 2026

**Project:** Little Learners Academy / أكاديمية المتعلمين الصغار  
**Saved folder:** `updates/2026-11-03-update-little-learning-academy/` in the GitHub repository  
**Source of truth:** https://github.com/Rahman1388/little-learners-academy  
**Live app:** https://rahman1388.github.io/little-learners-academy/  
**New activity:** https://rahman1388.github.io/little-learners-academy/grade6-ratio.html

## Today's significant update

- Added an original **Grade 6 Ratio Explorer** pilot: **24 distinct worked problems**, with **six each** in:
  1. Equivalent-ratio tables
  2. Double number-line models
  3. Unit-rate contexts
  4. Percent / hundred-grid representations
- Activities have larger mobile-friendly answer controls, encouraging retries, optional hints, worked explanations, and separate browser-local progress `lla-g6-ratio-v1`.
- Connected the pilot to `choose-grade.html` and the homepage resources.
- Updated the service worker cache, `scripts/test-grade6-ratio.cjs`, release validation and mobile/browser test coverage.
- Updated the independent question inventory and international benchmark display to **475 DISTINCT short multiple-choice questions across Grades 1–6**. Grade breakdown: **G1 151; G2 66; G3 54; G4 60; G5 60; G6 84**.
- **Six Grade 6 guided writing prompts** are tracked separately, not counted as MCQ questions. Visual models, mixed-review quests and repeated game rounds are not counted again.

## Educational evidence and limitations

This pilot's topics broadly correspond to:
- US Common Core 6.RP.A.1–3 (ratio language, unit rates, tables and percent): https://www.thecorestandards.org/Math/Content/6/RP/
- England Year 6 mathematics, ratio and proportion: https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study

**Important:** A thematic match is NOT school-specific curriculum approval. Year 6 in England, US Grade 6, and Qatar's curricula are not interchangeable. The content is a **supplementary draft pilot**, not 24 official lessons or a complete Grade 6 curriculum. Draft Arabic questions and answer explanations require qualified educator review and a real-child/parent usability check before claiming formal approval.

## Privacy, audio and backward compatibility

- No new audio, microphone use, child accounts, uploads, advertising, child names or analytics.
- Existing child progress keys have not been renamed or overwritten.
- The previously selected **bus voice options C (female-style) and D (male-style)** stay unchanged.
- Ratio Explorer progress is device-local and can be lost if browser data is erased; it is not synced.
- The original 151 Grade 1 questions and prior Grade 2–6 pilots remain accessible.

## Release verification

The following checks should be marked **PASSED only after their GitHub Actions run concludes successfully on the final commit**:
- [ ] App validation, including numerical answer checks for all 24 new problems
- [ ] Child App Security Gate
- [ ] Mobile browser test at 320px, 390px and 768px
- [ ] GitHub Pages build/deployment

The production status can be checked at:
https://github.com/Rahman1388/little-learners-academy/actions

## Next educational priorities

1. Have a Grade 6 maths educator and a native-speaking Arabic educator check the new worked problems and translated question supports.
2. Real iPhone / Safari and VoiceOver checks by a parent/teacher; a passing automated browser test does **not** replace device testing.
3. Add concrete-to-pictorial-to-symbolic explanations for gaps in earlier grade pilots before expanding raw activity count.
4. Preserve the long-term **600-lesson / 2,400-activity** goal as a roadmap, not an existing feature count.
5. Seek meaningful school and parent feedback; never claim Qatar MOEHE or school endorsement without evidence.

## Recovering this version

If a conversation is lost, open **this folder** in GitHub, or see `PROJECT-CONTINUITY.md`. Every committed file is versioned in GitHub history. Say:

> Continue Little Learners Academy from the 3 November 2026 update in my GitHub project; check the latest tests and saved milestone before modifying anything.

The GitHub repo is the project storage. ChatGPT chat and GitHub repositories are separate; this file is not a chat transcript or a user-data backup.
