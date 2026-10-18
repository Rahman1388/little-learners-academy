# Grade 2 English — teacher-feedback improvement tracker
_Last updated: 16 October 2026 | Internal quality review; not an official endorsement_

## Review scope and evidence

An early-education English teacher reviewed a **sample of three** Grade 2 English reading activities. They accepted the sample's answer accuracy/explanations, English, Arabic, pictures/audio category, and cultural/safety category. They requested revisions to **learning objectives/grade suitability** and **accessibility/usability** and recommended improving all four English-language skills: listening, speaking, reading, and writing. These findings apply to the reviewed sample only; they do not certify the complete app or its audio.

The development reference is the user-supplied Grade 2 Semester 1 overview (2026–27). The five-module prototype is **supplementary** and must not be represented as reviewed Ministry-aligned delivery. The five module titles, week sequence and broad themes have now been cross-checked against the primary 2026–2027 Semester 1 overview, documented in the crosswalk. **Module 4 “Food and drink” is confirmed.** Exact competency mastery and grade suitability still need educator review before public claims.

## What exists on this branch

- `grade2-four-skills.html`: responsive pilot interface, adult instructions and privacy boundaries.
- `grade2-four-skills-data.js`: five draft modules × four guided skills = **20 saved practice activities**. There are **15 optional written phonics items** (8 word families, 5 digraphs, 2 silent-e), **5 optional follow-up reading questions** and **5 adult-reviewed original-writing prompts**. Extras do not change progress scores.
- `grade2-four-skills.js`: extra learning UI, feedback and local-only completion flags at the **unchanged** `lla-g2-four-skills-v1` key; free writing is ephemeral and not saved.
- `scripts/check-grade2-four-skills.cjs`: structural, source-week, all 15 letter-pattern key, five bonus-comprehension answer and free-writing content checks.
- `scripts/test-grade2-four-skills.cjs`: **updated** mobile/browser regression script for 320/390/768px layouts, retries, added comprehension, ephemeral writing, all optional phonics, and progress persistence. A real iPhone/VoiceOver test is **still pending**.
- `GRADE2-SEM1-CURRICULUM-CROSSWALK.md`: verified source-backed module mapping, exact PDF pages, review gaps and careful separation of the unrelated Semester 2 exam reference.
- Existing `grade2-english-data.js` and `lla-grade2-english-v1` progress are not replaced.

## Review priorities and release gates

| Priority | Action | Verification | Status |
|---|---|---|---|
| P0 | Trace **the five Grade 2 Semester 1 module titles, weeks and main objectives** to the 2026–2027 overview; retain specialist sign-off as a separate requirement | See `GRADE2-SEM1-CURRICULUM-CROSSWALK.md` for PDF pages and activity mapping; teacher approval still needed | **SOURCE CROSSWALK COMPLETED; teacher validation PENDING** |
| P0 | Obtain Arabic-speaking primary educator review of each draft Arabic module title/instruction | Record exact activity IDs and approved wording | **HOLD — Arabic specialist review pending** |
| P1 | Revise writing feedback so the app does **not** imply automatic checks of capitalization or punctuation | UI text plus updated mobile regression assertion | **DONE on development branch** |
| P1 | Verify each activity's grade suitability and pedagogy, including reading length and spoken comprehension feasibility | Grade 2 teacher samples every module and files Accept/Revise/Hold | **PENDING** |
| P1 | Test mobile accessibility (keyboard, focus, screen reader labels, touch targets, no horizontal overflow) | Selected-module heading is keyboard-focusable after module selection; 48px disclosure targets; 320/390/768px automated regression assertions; real iPhone Safari/VoiceOver still needed | **AUTOMATED CHECKS PASSED on 16 Oct 2026 commit `171ba65a`; manual review PENDING** |
| P1 | Confirm adult-read listening exercises work pedagogically; do not label as independently scored listening or teacher-reviewed speech | Adult observer feedback and clear non-assessment copy | **DRAFT — review pending** |
| P2 | Add optional, unscored phonics practice without changing saved progress | Eight original word-family checks mapped to overview p.17 plus five digraph and two silent-e checks based on p.2; specialist review still pending | **15 ITEMS IMPLEMENTED ON BRANCH; teacher validation PENDING** |
| P2 | Strengthen Grade 2 reading comprehension with evidence-based follow-ups | Five original extra questions with adult evidence notes; never counted as mastery | **IMPLEMENTED ON BRANCH; teacher validation PENDING** |
| P2 | Add independent sentence writing with privacy and honest evaluation limits | Five open-ended writing prompts with starters and adult checklist; text never saved or automatically graded | **IMPLEMENTED ON BRANCH; teacher validation PENDING** |
| P2 | Expand breadth only after item-level review, not just by increasing question count | Approved learning objectives and reviewed questions | **NOT STARTED** |

## Technical QA update — 16 October 2026

On the isolated review branch, module changes now focus the newly selected lesson heading for keyboard and screen-reader users. Listening and bonus-reading disclosure controls have a minimum 48px tap height. The browser regression checks both behaviours; the Grade 2 four-skills and child-app security GitHub checks passed on commit `171ba65a`. This does **not** prove real iPhone usability, native Arabic quality, classroom appropriateness, specialist sign-off or readiness to merge. The pilot remains a **draft PR (#8)** and is not released into `main`.

## Safeguards

1. Review feedback is **internal only**. No public reviewer names, school endorsement, children's identities or feedback records.
2. An activity records **practice completion**, not skill mastery. Speaking attempts are not audio-recorded or scored.
3. No paid API, account or child tracking is introduced.
4. Keep all existing saved-progress IDs stable unless a substantive change justifies a carefully planned migration.
5. Do **not merge into `main` as a teacher-validated Qatar curriculum course** until P0 checks are complete. A clearly labeled, unreviewed pilot can be shared privately with adult reviewers from a branch preview or local test build.

## Teacher re-review questions

- Which exact Grade 2 Semester 1 outcome does each module teach (document title/page)?
- Are the listening and speaking tasks sufficiently meaningful, or do they depend too heavily on an adult?
- Does each reading passage match Grade 2 word/phonics level?
- Are the guided-writing expectations appropriate for Grade 2 pupils?
- Can a child on a phone understand instructions and recover from wrong answers?
- Which items should be marked Revise or Hold before wider pilot testing?

Record feedback with page/question ID, evidence, correction owner and date. After implementing verified corrections, request targeted recheck. This tracker is not proof of Ministry approval or curriculum certification.

## Module 2 optional word-family pathway — 16 October 2026

**Review branch only (draft PR #8):** Added linked `grade2-phonics-pathway.html` and `grade2-phonics-pathway.js` with **-ing/-and** practice in 7 adult-guided stages per family: See, Hear, Blend, Read, Spell, Apply, Review. Examples are original and refer to the 2026–27 Grade 2 Semester 1 overview p.17. No synthetic or recorded audio is available; adults read and model the words. Practice is unscored, resets on page refresh, saves no typed text, and leaves the existing app progress unchanged.

**Automated QA result:** On commit `bc92b2ba` (16 October 2026), the Grade 2 four-skills pilot workflow including the new phonics-pathway Playwright test, Validate app, Grade 2 English pilot QA, and Child App Security Gate **all reported success**. This verifies implemented test scenarios, not a human review. A separate mobile reading/audio workflow for that commit was cancelled during overlapping branch updates; it is not evidence of a pass.

**Teacher questions before release:** Are `ring/sing` and `hand/sand` developmentally suitable? Does the onset-rime demonstration reflect sound blending adequately? Are the reading and spelling prompts fair? Can a child use the lesson with adult support on a phone? Are all Arabic instructions appropriate? Do not claim mastery from correct written selections. The branch workflow includes a new browser regression, but a passing test is not an educator approval.



## 18 October 2026 — phonics pathway expanded for Module 3

- **Implemented on review branch:** The independent, adult-led `grade2-phonics-pathway.html` now covers **-ing/-and** (Module 2) and **-all/-ack** (Module 3) with **28 optional page-session steps** (seven per family). No mastery score or learner data collection is introduced. The existing core 20-progress scheme remains unchanged.
- **Technical validation PASSED on code commit `14c5ee51` (18 October 2026):** [Grade 2 four-skills pilot Actions run #39132095765](https://github.com/Rahman1388/little-learners-academy/actions/runs/39132095765) completed successfully. It executed the existing 20-skill browser regression and the expanded four-family/28-step phonics browser test, with spelling, navigation and no-localStorage expectations. This is technical verification, not teacher or real-iPhone approval.
- **Teacher re-review:** Are the examples `ball/wall` and `black/snack` suitable for Grade 2, including the `bl` and `sn` onset blends? Are the letter chunks pedagogically correct and family scripts accessible on small phones? Do the English and Arabic instructions need revisions? **Not yet signed off.**
- **Next work:** Prioritize mobile iPhone/VoiceOver inspection and subject-specialist approval before further broadening the phonics pathway. Do not represent this as Qatar Ministry endorsement or a final production release.

## 18 October 2026 — Module 4 phonics development

- **Saved on development branch:** Added two original adult-guided word-family paths, **-ain** (*rain/train*) and **-ink** (*pink/sink*). The curriculum source explicitly lists these patterns for Module 4 (2026–2027 Semester 1 Overview, PDF p.17). The app's Word Family Adventure now covers **six families and 42 optional steps** across Modules 2–4.
- **Integrity preserved:** No changes to the existing 20 four-skill progress IDs, no new persistent phonics progress, no recording or audio claims, no child information collection, and no new paid services.
- **Technical verification:** Browser test updated to examine all six sets of answers and seven learning stages per family. **Wait for GitHub Actions result on current code commit; passing old versions is not sufficient.**
- **Educator review required:** Verify phonics word choice, onset/rime modelling including the **tr** blend, accessible pictures, normal-speed adult models, Arabic labels and child usability on a real iPhone. Hold from wider publication until reviewed.
