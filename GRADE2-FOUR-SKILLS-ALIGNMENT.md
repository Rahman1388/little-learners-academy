# Grade 2 English: four-skill supplementary pilot (October 2026)

**Status:** Original **guided practice prototype**, not complete Grade 2 syllabus, child attainment measurement, specialist sign-off or Qatar MOEHE accreditation.

## Reference audit trail (materials supplied for internal curriculum comparison)

1. Qatar Ministry of Education and Higher Education, Department of Early Years Education, **English Language Overview: Grade 2, Semester 1, 2026–2027** (18 pages). Relevant sections: daily oral reading and phonics progression p. 2; timing and module sequence p. 3; learning outcomes and practices pp. 4–16; phonological awareness sequence p. 17 and high-frequency words p. 18.
2. Department of Early Years Education, **Grade 2 English: Semester 2 Final Exam Table of Specifications, 2025–2026** (3 pages). Used **only to study assessment format and the separation of speaking, listening, oral reading, reading comprehension and writing**, not to claim current Semester 1 assessment rules. Historical weight split was S=6, L=8, reading total=10 and W=6 out of 30.
3. **Top Stars, Student's Book 2a, 2020–2021**, H. Q. Mitchell and Marileni Malkogianni, used for topic comparison only. Publisher illustrations, passages, songs, audio and exercises were **not copied** into this prototype. A later edition/term plan may differ; verify licensing and current relevance before using external material.

## Initial mapping (draft; original app content)

| Unit | Reference theme | Listening (adult led) | Speaking (adult led) | Reading | Writing (guided) |
| --- | --- | --- | --- | --- | --- |
| M1 Welcome back! | Greetings and classroom objects | Hear objects/instructions | Pretend self-introduction | Original classroom paragraph | This is my book. |
| M2 That's me! | Jobs, action verbs and "can" | Hear occupations | Describe a fictional ability | Original park paragraph | I can jump. |
| M3 About people | Possessions, people and objects | Hear a colour/object description | Describe a pretend character | Original toys paragraph | She has a kite. |
| M4 Food and drink | Food, preferences and requests | Hear a polite drink request | Role-play café | Original family lunch paragraph | I like rice. |
| M5 What I eat | Meals, quantities and routines | Hear breakfast/lunch | Role-play meal description | Original school picnic paragraph | There are two apples. |

Each unit contains four **practice opportunities** (5 × 4 = 20), not 20 validated learning outcomes. The original 24-question Grade 2 reading pilot remains separate and unchanged. Neither pilot establishes broad curriculum coverage or student mastery.

## Educational constraints and important gaps

- **Listening:** An adult reads a short original script from a revealable panel. Child should look away. This is informal practice, **not a secure independent listening test**. No unverified audio synthesis.
- **Speaking:** Child answers a fictional role-play prompt to an adult, with adult observation cue. Clicking "I practised" is **self-reported participation**, not teacher-scored oral communication.
- **Reading:** One short original paragraph and one answerable literal comprehension question per module. Expand into decoding, reading fluency, vocabulary, inference and differentiated assessment; avoid presenting multiple-choice scores as reading-level diagnoses.
- **Writing:** One guided target sentence typed with scrambled word clues per module. This verifies only a narrow example of sentence construction; spelling, dictation, handwriting and free composition still need development.
- **Arabic support:** Interface labels and instructions are draft. A competent Arabic-language educator must check language, age suitability, script rendering and pronunciation before broad release.
- **Phonics:** 2026–27 Semester 1 overview p. 17 gives a progression: Module 2 -ing/-and; Module 3 -all/-ack; Module 4 -ain/-ink; Module 5 -ay/-ick. This pilot does **not** currently teach or assess that sequence. Digraphs and silent-e are priorities from overview p. 2.
- **Grade suitability and accessibility:** Automated mobile, keyboard, answer-key, and persistence tests help, but child testing, accessibility audit, and teaching review are still needed.
- **Assessment:** The supplied 2025–26 Semester 2 exam blueprint belongs to **another semester and year**; do not infer 2026–27 Semester 1 exam weights or reproduce official exam content.
- **Curriculum validation:** Topic overlap is documented, not exact official outcomes or national approval.

## Privacy, test coverage and release gates

- No accounts, learner names, microphones, child recordings, trackers or external JavaScript. Reading tasks use fictional characters.
- Saves **only 20 boolean practice flags** in browser-local storage key 'lla-g2-four-skills-v1'. Does not alter existing grade progress, stars, or previously approved audio.
- New 'scripts/check-grade2-four-skills.cjs' checks five distinct modules, 20 skill practices, answer keys, sentence clues, 20–40 word original reading paragraphs and prohibited voice/network APIs.
- New 'scripts/test-grade2-four-skills.cjs' checks actual interactions and retries, local persistence and 320/390/768-pixel screen widths when run in GitHub Actions.
- Do not claim technical pass until GitHub checks conclude successfully. Do not claim educational or human review from CI pass.
- Before wider child use: review Arabic wording, listening/speaking validity, specific Ministry 2026–27 learning outcomes, learning accommodations, actual family usability, privacy policy and PWA/offline behavior.

## Next original content sprint

Create a **Module 2 phonics pathway** using independently authored examples for -ing and -and: SEE → HEAR (approved audio only) → BLEND → READ → SPELL → APPLY → REVIEW. Hold audio-dependent stages incomplete until vetted recordings exist. Tag each activity with source section, draft outcome and review status.

Notes about individual volunteer reviewers belong in private educator-feedback records, **not in this public repository** without consent.
