# Grade 2 Module 2 — guided-lesson depth pilot (18 October 2026)

**Status:** Development branch only; pending automated validation, real-device usability checks, and educator sign-off. No Ministry/school approval is implied.

## What changed (without increasing activity counts)
- A child-friendly English **"Today I can"** learning goal appears before the seven-stage pathway; existing two -ing/-and word families, 14 visit-only practice stages, and 20 separate Grade 2 practice flags are unchanged.
- Native `details` clues can be opened in the **Read, Spell, and Apply** steps. A wrong answer now encourages trying a clue and another attempt instead of simply repeating "not quite."
- Success feedback connects the answer to either **the shared ending** or **word meaning**. The Review stage prompts an adult-guided reflection and spoken sentence. Neither is automatically graded.
- Keyboard users receive a visible focus ring on expandable details. No sound recordings or account, telemetry, child name, or saved answer is introduced.

## Scope and decisions
- The existing optional device English Hear/Slow buttons remain untouched. Parent observations: **ring, sing, hand** reportedly clear on iPhone at both speeds; **sand** not yet checked. Child-friendly voice options remain uncommitted A/B review candidates.
- **No new unreviewed Arabic translations** have been added. Present child/adult English phrasing and existing Arabic copy still require qualified reviewers.
- This is supplementary, adult-guided Grade 2 phonics practice, not a reading diagnosis, curriculum equivalence claim, or official approval.

## 18 October continuation — Hear-stage replay and educator feedback route

- The **Hear** step now offers optional Hear/Slow controls for each of the two focus words. The device's existing voice function is reused; the real adult phonics model remains necessary. Pressing a speaker never marks a practice step complete or assesses a child's speech.
- In the adult-only quality panel, a teacher can open the existing [voluntary feedback form](./teacher-feedback.html) to share exact learning or pronunciation corrections manually. The site does not automatically send reviewer observations.
- Browser regression now requires both word buttons on See, **Hear**, Blend and Review, correct word / English TTS choice / slower rate and **no premature Continue** after sound playback.
- These edits remain **unpublished in draft PR #13** until the required specialist and iPhone checks are satisfied.

## Phone interruption handling — mobile continuity check

- On iPhone and other browsers, an incoming call may move the lesson to the background. The draft now cancels an active synthesized word via the standard `visibilitychange` event; it never automatically speaks while the app is hidden or when returning.
- The learner sees a gentle explanation about tapping **Hear** or **Slow** again. The current stage and 14 in-memory practice marks stay intact **only while the browser keeps the page loaded**. If Safari reloads or closes the page under memory pressure, visit-only progress still resets by design.
- A Playwright simulation tests: play a word → background the page → audio cancel → current stage and progress unchanged → foreground → sound only on a new tap. This is not a substitute for real iPhone/Safari calls or actual audible speaker testing.
- No persistent storage, voice uploads, microphone access, accounts or child data were added.
- **Required manual acceptance:** on a real iPhone, start a word, switch apps or receive a call, come back, verify playback stopped, tap Hear and Slow again, and check stage progress and adult-feedback selections. Explicitly test Safari reload behavior and communicate it honestly.

## Continuous national/international/expert quality loop

The owner requested a standing review of **all** development decisions against Qatar curriculum, national/international teaching and accessibility standards, and qualified specialist feedback. Added:
- [Internal quality standard](./DEVELOPMENT-QUALITY-STANDARD.md) with linked Qatar MOEHE, EEF, CAST, W3C, UNESCO, Qatar law/NCSA and optional future UNICEF AI guidance.
- [Machine-readable QA registry](./quality-gates.json) with **eight required review areas** and transparent `pending` statuses; a reviewer acceptance needs role, date, evidence and reviewed version.
- `scripts/check-quality-gates.cjs`, now run from `.github/workflows/validate.yml`. This safeguards metadata and discourages unverified claims but **does not replace official expert reviews**.

The pilot is *not* endorsed by Qatar MOEHE or certified to WCAG 2.2. The app must not call adult-only clarity observations an English phonics teacher's approval. All school-specific user PDFs remain private and out of public repository.

## Automatic acceptance gates
1. `node --check grade2-phonics-pathway.js`
2. `node scripts/check-grade2-four-skills.cjs`
3. `node scripts/check-learning-quality-manifest.cjs`
4. `node scripts/test-grade2-phonics-pathway.cjs` on served files with Playwright Chromium
5. Existing GitHub Validate App and Child App Security Gate pass on the PR.
6. Confirm all fourteen stages, previous progress isolation, and privacy copy remain intact.

## Adult/teacher manual review: still pending
- **Phonics teacher:** Grade 2 suitability of "Today I can", clues, the `-ing`/`-and` examples and explanations. Decide **Accept / Revise / Hold** with module/skill reference and specific correction.
- **Real iPhone/Safari:** Test Hear word buttons for ring, sing, hand and sand in normal/slow speeds without accidentally finishing a stage; then Read wrong choice → open clue → correct choice → Continue; repeat Spell and Apply, both families. Report no overflow and no hidden or clipped buttons. This is not covered by Chromium.
- **VoiceOver:** From family selection, tab/sweep through all stages; on Read/Spell/Apply verify "Need a clue?" is announced and its text becomes readable; verify success feedback and next-stage focus.
- **Parent/child usability:** Observe with consent that hints support learning but do not prematurely reveal the answer or frustrate younger children. Do not record identifiers or student speech.
- **Arabic reviewer:** Review all pre-existing Arabic text and any future Arabic versions before any wider release.

## Remaining actions before public merge
- Automated Grade 2 regression green on PR; check security status.
- Human iPhone and VoiceOver pass; Grade 2 educator's correction list applied where needed.
- Preserve existing public app and rollback option until explicit release decision.

**Project links:** [Foundation Plan](./FOUNDATION-QUALITY-ROADMAP.md) · [Original phonics pilot](./grade2-phonics-pathway.html) · [Quality Review](./GRADE2-QUALITY-REVIEW-2026.md).
