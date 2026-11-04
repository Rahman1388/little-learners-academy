# Little Learners Academy — Quality review on every development cycle
**Created 18 October 2026 · Internal development policy, not third-party accreditation**

This framework is a standing requirement for curriculum, national and international educational guidance, qualified expert views, accessibility, data privacy and practical usability. **Passing automated tests is not an educational certification.** The project is an independent supplementary pilot for Qatar-oriented Grades 1–6, *not* a full or MOEHE-approved curriculum.

## Priority and traceability
1. **Qatar first:** Map each new lesson to specific grade, semester, subject, learning outcome, school-provided overview/textbook page and school calendar where provided. The Ministry's [Early Learning](https://www.edu.gov.qa/en/Content/EarlyLearning) page treats Grades 1 and 2 as the foundation stage; its [Curriculum Section](https://www.edu.gov.qa/en/Content/CurriculumSection) develops the national framework, subject standards and interactive learning materials. Neither page alone proves that a particular app question conforms to a ministry objective. Do not republish the user's school PDFs.
2. **Evidence-based pedagogy:** Include a clear objective → worked model → guided attempt → hint and useful correction → independent attempt → meaningful application → review. [EEF's phonics synthesis](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics) supports systematic, explicit phonics taught at the child's level; learning word endings does *not* establish reading comprehension.
3. **International inclusion:** Apply [CAST UDL Guidelines 3.0](https://udlguidelines.cast.org/) for motivation, representation and multiple ways to respond, and design **towards** [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) through real-device screen-reader, keyboard, reflow, touch and readability checks. No conformance claim until an actual audit.
4. **Technology justified by learning:** Use [UNESCO's GEM technology-in-education guidance](https://www.unesco.org/en/articles/global-education-monitoring-report-2023-technology-education-tool-whose-terms) to ask whether a feature is appropriate, equitable, evidence-informed and financially sustainable; avoid pressure-inducing timers, attention-maximising loops or unnecessary AI. Retain human/parent guidance for young children.
5. **Qatar child privacy:** [Qatar Personal Data Privacy Protection Law No. 13/2016, Article 17](https://www.almeezan.qa/LawArticles.aspx?LawArticleID=72903&LawID=7121&language=ar) sets duties for child-directed websites, including notices and parental rights when child personal data is processed. Check regulator [NCSA guidance](https://ncsa.gov.qa/en/pages/guidance-hub-for-regulated-entities) and qualified local legal advice before expanding data handling. Existing optional phonics uses device-voice replay and in-visit stage markers, not child speech recording or a remote learner profile.
6. **Future AI features:** If AI is later considered, first apply [UNICEF's guidance on AI and children](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children). No child's unsupervised generative chatbot, voice clone, account, analytics or personalised profiling is assumed in current scope.

## Review loop for every lesson or feature
For each proposed activity record the grade/subject/term; objective and source page; content ID; English and Arabic scripts; teaching model; answer and explanation; accessibility; original/licensed assets; voice recording/provenance; privacy implications; teacher and mobile-test outcomes; correction/retest; and release decision.

**Review states:** Pending → Revise → Accepted for *that specific item and reviewer scope*. A broad "looks good" or technical green tick cannot mark other modules or languages accepted. Reviewer role, date, specific evidence and exact reviewed version must be recorded; child identity/voice and nonpublic teacher correspondence stay in restricted channels rather than the public GitHub repo.

### Mandatory review matrix
| Check | Who can verify | Minimum proof |
| --- | --- | --- |
| Qatar Grade 2 objective and level | Local English primary teacher | Specific objective/source page + lesson ID + Accept/Revise/Hold |
| English pronunciation and blending | Phonics teacher | Real word normal/slow audio review, exact word and device |
| Arabic/RTL | Native Arabic-speaking teacher | Corrected exact strings and screen-reader observations |
| Inclusion and engagement | Primary/inclusion specialist | Child-understandable model, hints, alternatives, no timed punishment |
| Accessibility | Adult tester with iPhone/VoiceOver and tablet | 320–390/768px interaction logs, keyboard/screen-reader results |
| Child safety/privacy | Technical/security owner; qualified legal review where needed | No unexpected data collection or unsafe content, verified privacy copy |
| Copyright/culture | Original-content editor and qualified subject specialist | Explicit licensing plus culturally suitable example |
| Learning effectiveness | Adult teacher/parent, ethically observed pilot | What the child understood, misconceptions and corrections; no unsupported mastery claim |

## Existing Grade 2 status — **not yet certified**
- The machine-readable `learning-quality-manifest.json` tracks five English Grade 2 semester 1 modules and four practice skills per module; draft activities are not graded tests.
- The Module 2 word families `-ing` and `-and` each have seven voluntary steps. Parent reported **ring**, **sing** and **hand** clear at normal and slow speed on an iPhone; **sand** is still awaiting parent testing.
- Teacher approval of these new modules, phonics accuracy, all Arabic child-facing wording, VoiceOver on a real phone and parent usability **remain pending**. A ministry inquiry was sent by the owner; official evaluation or approval **has not been reported**.
- Work continues in [draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13); the working public app on `main` stays untouched by the draft.

## Automatic integrity check
`node scripts/check-quality-gates.cjs` validates the [registry](./quality-gates.json), its referenced sources, all required quality domains, basic release-claims hygiene and Grade 2 manifest consistency. GitHub Actions also executes it on pull requests. **It deliberately cannot conclude that a child learned, an accent is correct, a guideline is met, or an approval has been granted.**

**Before shipping new content:** Update the registry and review sheet, gather specialist verdict and device tests, retest corrections, and explicitly decide whether the changed lesson is ready. Unverified scope stays an accurately labeled draft or pilot. Do not claim Ministry accreditation without written authorization.

**Follow-up focus:** Grade 2 English lesson quality and real iPhone/VoiceOver tests first; only then expand to Grades 1–6 through the same repeatable procedure.
