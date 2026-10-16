# Grade 2 English — teacher-feedback improvement tracker
_Last updated: 16 October 2026 | Internal quality review; not an official endorsement_

## Review scope and evidence

An early-education English teacher reviewed a **sample of three** Grade 2 English reading activities. They accepted the sample's answer accuracy/explanations, English, Arabic, pictures/audio category, and cultural/safety category. They requested revisions to **learning objectives/grade suitability** and **accessibility/usability** and recommended improving all four English-language skills: listening, speaking, reading, and writing. These findings apply to the reviewed sample only; they do not certify the complete app or its audio.

The development reference is the user-supplied Grade 2 Semester 1 overview (2026–27). The five-module prototype is **supplementary** and must not be represented as reviewed Ministry-aligned delivery. The precise module titles/objectives must be independently confirmed against the primary curriculum document before public claims; specifically verify Module 4 instead of treating the draft title as confirmed.

## What exists on this branch

- `grade2-four-skills.html`: responsive pilot interface, adult instructions and privacy boundaries.
- `grade2-four-skills-data.js`: five draft modules × one guided activity in each of four English skills = **20 practice activities**.
- `grade2-four-skills.js`: feedback and local-only completion flags at `lla-g2-four-skills-v1`.
- `scripts/check-grade2-four-skills.cjs`: structural, answer and script safety checks.
- `scripts/test-grade2-four-skills.cjs`: mobile/browser regression test (320, 390, 768px layouts, retries and progress persistence).
- Existing `grade2-english-data.js` and `lla-grade2-english-v1` progress are not replaced.

## Review priorities and release gates

| Priority | Action | Verification | Status |
|---|---|---|---|
| P0 | Independently confirm **each Grade 2 Semester 1 module title, weekly sequence and learning objective** against the original curriculum overview; fix prototype mapping as needed | Teacher provides page/objective correspondence, reviewer approval recorded | **HOLD — curriculum crosswalk unverified** |
| P0 | Obtain Arabic-speaking primary educator review of each draft Arabic module title/instruction | Record exact activity IDs and approved wording | **HOLD — Arabic specialist review pending** |
| P1 | Revise writing feedback so the app does **not** imply automatic checks of capitalization or punctuation | UI text plus updated mobile regression assertion | **DONE on development branch** |
| P1 | Verify each activity's grade suitability and pedagogy, including reading length and spoken comprehension feasibility | Grade 2 teacher samples every module and files Accept/Revise/Hold | **PENDING** |
| P1 | Test with mobile accessibility checks (keyboard, focus, screen reader labels, touch targets, no horizontal overflow) | 320/390/768px regression plus manual VoiceOver on iPhone | **AUTOMATED SCRIPT PRESENT; manual check pending** |
| P1 | Confirm adult-read listening exercises work pedagogically; do not label as independently scored listening or teacher-reviewed speech | Adult observer feedback and clear non-assessment copy | **DRAFT — review pending** |
| P2 | Expand breadth after the first educator round, not just by increasing item counts | Approved learning objectives and teacher-reviewed question bank | **NOT STARTED** |

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
