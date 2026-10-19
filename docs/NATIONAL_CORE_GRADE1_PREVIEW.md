# Grade 1 Qatar national subjects — adult review prototype

**Status: DRAFT, blocked from child release.** Updated 2026-10-16. Owner: Little Learners Academy.

## Scope of this milestone

- Three original **supplementary** Grade 1 *proposed* learning units (Arabic words, introductory Islamic manners, Qatar's flag/capital/maritime heritage), each with three teaching cards and six bilingual multiple-choice practice questions. **18 review-only items total.**
- `national-core-grade1-preview.html` is an interactive, responsive **educator/developer preview**, not linked from the public dashboard, service worker or grade chooser. No Grade 1 child release, no audio, and no change to the published 451-question audited short-question inventory or 151-question Grade 1 activity library.
- This does **not** reproduce MOEHE curricular textbooks or claim official curriculum equivalence, endorsement, pedagogical verification or religious approval.
- Every question has a stable ID for correction and a factual/translation rationale. Wrong answers allow retry. The preview does not store answers, collect child data or call external APIs.

## Sources used for *direction*, not authoritative grade-level mapping

1. Qatar Ministry of Education and Higher Education, policy description of Arabic, Islamic Education and Qatar History in private schools: https://www.edu.gov.qa/en/News/Details/1621800
2. MOEHE *historical* Policy of Academic Monitoring of Private Schools (check latest version with Ministry before relying on it): https://privateschoolssearch.edu.gov.qa/Documents/PolticPrivateSchoolsEnglish.pdf
3. W3C WCAG 2.2 touch target and focus guidance: https://www.w3.org/TR/WCAG22/
4. UNESCO inclusive open and distance learning guidance: https://www.unesco.org/en/communication-information/odl-guidelines

These resources support subject inclusion and app-design principles, **not** the sequence or specific approved Grade 1 Qatar national-curriculum standards. An official unit-by-unit crosswalk must be obtained separately before any claim of exact alignment.

## Specialist release gates (all open)

| Review domain | Evidence to obtain | Current state |
| --- | --- | --- |
| Arabic literacy | Native Arabic primary educator reviews words, letter names, diacritics, translations and age level | **Pending** |
| Islamic education | Qualified subject teacher reviews the lesson framing and accuracy, with references for any religious texts or rulings later introduced | **Pending** |
| Qatar history | Qualified Qatar-history educator checks factual claims, terminological choices, sources and actual Grade 1 placement | **Pending** |
| Qatar curricula | Grade-specific official learning objectives and current MOEHE resources crosswalk; public/private-school target segments clarified | **Pending** |
| Inclusion/usability | Keyboard navigation, actual iOS/Android/low-end device tests, visual contrast, RTL, screen reader and accessibility | **Pending** |
| Child safety & security | Privacy assessment, no child accounts, no external tracking, CSP, written release decision | **Pending** |
| Pronunciation | Trained fluent speakers independently verify English/Arabic recording for each lesson/voice variation before enabling | **No audio by design** |

## Proposed transparent decision log

For each `G1-{AR,IS,QA}-###` record: `objective reference | source URL/version | reviewer expertise | decision Accept/Revise/Hold | correction | date | recheck result`. Do not log pupils' names or personal information.

## Test procedure

From repository root: `node --check national-core-grade1-data.js && node --check national-core-grade1-preview.js && node scripts/check-national-core-grade1.cjs`.
The script detects structural issues, unique keys, choice collisions, no draft exposure in the **homepage**, and absence of storage/network/speech API use in the preview. This cannot establish actual learning effectiveness or Arabic/religious/historical correctness. Manual phone and tablet testing remains required.

## Proposed progression

1. Complete specialist review and exact objective mapping for first sample units. Keep review restriction in place meanwhile.
2. Refine content and seek voice speaker feedback, maintain question IDs and correction log.
3. Only after documented release readiness, add reviewed content to the child's learning paths (separately from this adult-only prototype).
4. Extend one unit at a time to Grades 2–6 and evaluate learning benefit with consent-based, non-identifying assessment.