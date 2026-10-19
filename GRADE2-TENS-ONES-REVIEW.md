# Grade 2 — Tens & Ones Explorer (teaching pilot, 19 October 2026)

**Review status:** Draft, not released. **Scope:** A session-only teaching lesson separate from the 24 existing Grade 2 readiness questions and the 451-question audited inventory. Do not add its two practice questions to published activity counts until review, identifiers, and deduplication have been agreed.

## Built
- Page: grade2-tens-ones-guided.html and script: grade2-tens-ones-guided.js.
- **Learning objective:** Represent a two-digit number as tens and ones and explain the meaning of its digits.
- Worked model: **34** as three tens sticks and four single ones; guided multiple-choice practice: **52**; independent reading practice: **76**; **hands-on build-43 stage** where the learner adds/removes ten-sticks and single ones with immediate descriptive feedback; reflection: explain 76. Five instructional stages including the new builder (the end screen is not counted as a lesson).
- Visual models with accessibility descriptions, polite screen reader status, keyboard focus between steps, retry without punishment, optional clue, no timer or score.
- No account, child data, microphone, generated AI text, network calls, external fonts, or browser storage. No changes to Grade 2 saved progress.
- English original teaching text and a **full draft Arabic translation** are now available using a non-tracking English / العربية language switch. Labels, goal, worked example, stage instructions, hint, right/wrong feedback, reflection and adult notes have all been localized. Arabic remains unverified and requires qualified sign-off.
- Switching languages retains the current teaching stage and whether a correct answer was completed in the current session. Nothing is stored in browser or cloud.
- [Maths and Arabic educator review checklist](./GRADE2-TENS-ONES-TEACHER-REVIEW.md) and [real iPhone/VoiceOver test plan](./GRADE2-TENS-ONES-IPHONE-TEST.md) are prepared. Human decisions and real-device tests remain pending.

## Pending human checks
- **Qatar Grade 2 mapping:** Maths teacher confirms lesson objective and age suitability with school-provided plan; the existing Grade 2 readiness pilot mentions 2.NBT.A and English primary maths overlap, not formal Qatar curriculum approval.
- **Pedagogy:** Primary teacher checks tens-stick visual, misconceptions, model, explanation, independent practice and reflection.
- **Arabic:** A complete draft translation is supplied but **qualified Arabic teacher sign-off remains pending**, including child language, RTL, mathematics, screen-reader behavior and cultural suitability.
- **Accessibility:** Real iPhone Safari/VoiceOver, tablet, Android, keyboard and reflow review; automated EN/AR Chromium layout checks are not a WCAG certification.
- **Culture, privacy and licensing:** Human review before public release; do not put child identities or private school materials on GitHub.
- **Release:** A documented Accept / Revise / Hold for the exact version, issue fixes and tests, then explicit owner approval before merge.

## Test
GitHub Actions workflow: .github/workflows/grade2-tens-ones-review.yml

    node --check grade2-tens-ones-guided.js
    python3 -m http.server 8765
    TEST_URL=http://127.0.0.1:8765 node scripts/test-grade2-tens-ones-guided.cjs

The browser test needs Playwright Chromium. Passing technical tests does not establish teaching efficacy or school approval.

## Reviewer status
- Maths educator — **Pending**
- Qualified Arabic reviewer — **Pending**
- Real-device accessibility — **Pending**
- Automated review — **Check branch GitHub Actions run**
- School or Ministry approval — **Not claimed**
