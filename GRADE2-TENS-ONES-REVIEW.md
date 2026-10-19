# Grade 2 — Tens & Ones Explorer (teaching pilot, 19 October 2026)

**Review status:** Draft, not released. **Scope:** A session-only teaching lesson separate from the 24 existing Grade 2 readiness questions and the 451-question audited inventory. Do not add its two practice questions to published activity counts until review, identifiers, and deduplication have been agreed.

## Built
- Page: grade2-tens-ones-guided.html and script: grade2-tens-ones-guided.js.
- **Learning objective:** Represent a two-digit number as tens and ones and explain the meaning of its digits.
- Worked model: 34 as three tens sticks and four single ones; guided practice: 52; independent practice: 76; reflection: explain 76.
- Visual models with accessibility descriptions, polite screen reader status, keyboard focus between steps, retry without punishment, optional clue, no timer or score.
- No account, child data, microphone, generated AI text, network calls, external fonts, or browser storage. No changes to Grade 2 saved progress.
- English lesson text is original. The bilingual title is provisional and does not constitute full Arabic-language support.

## Pending human checks
- **Qatar Grade 2 mapping:** Maths teacher confirms lesson objective and age suitability with school-provided plan; the existing Grade 2 readiness pilot mentions 2.NBT.A and English primary maths overlap, not formal Qatar curriculum approval.
- **Pedagogy:** Primary teacher checks tens-stick visual, misconceptions, model, explanation, independent practice and reflection.
- **Arabic:** Qualified teacher must review a complete lesson translation (not yet supplied) and RTL usability.
- **Accessibility:** Real iPhone Safari/VoiceOver, tablet, Android, keyboard and reflow review; Chromium smoke test is not a WCAG certification.
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
