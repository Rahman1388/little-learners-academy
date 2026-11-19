# Little Learners Academy — International Benchmark & Quality-First Development Plan

**As of:** 19 November 2026  
**Owner project:** Little Learners Academy / أكاديمية المتعلمين الصغار  
**Public app:** https://rahman1388.github.io/little-learners-academy/  
**Scope of this document:** Adult/owner planning only. It does not change child-facing lessons, audio, accounts, or progress.

## 1. Audited present scope — do not conflate questions, games, lessons or standards

The latest audited `main` inventory, recorded in `PROJECT-CONTINUITY.md` and `scripts/audit-activity-inventory.cjs`, contains **475 distinct short multiple-choice practice questions** across Grade 1–6 pilots:

| Grade | Distinct short MCQ questions | Status |
| --- | ---: | --- |
| 1 | 151 | Broad five-subject foundation, **not** a full year curriculum |
| 2 | 66 | Maths / English / science pilots |
| 3 | 54 | Maths / English / science pilots |
| 4 | 60 | Maths / English / science pilots |
| 5 | 60 | Maths / English / science pilots |
| 6 | 84 | Maths (including separate ratio reasoning set) / English / science pilots |
| **Total** | **475** | Supplementary pilots only |

Six separate Grade 6 guided writing prompts are **not** included in the 475. Reused mixed quests, game rounds, visual concept leaves, and duplicate presentations are **not** added to the inventory count. As each child progresses, a count of completed questions is **not a validated proficiency or mastery measure**.

**Long-term working ambition (not delivered):** 600 structured lessons and at least 2,400 distinct educational activities across Grades 1–6, ideally ~100 lessons and 400 meaningful activities per grade; phase this by standards and review rather than generating arbitrary volume.

## 2. International benchmark (publisher-reported; definitions differ)

| Platform | Publicly stated scope | Learning design worth studying | Honest comparison limitation |
| --- | --- | --- | --- |
| Khan Academy Kids | Pre-K–Grade 2, age ~2–8; Google Play listing describes **5,000+** educational games/activities | Carefully sequenced early literacy/maths, read-aloud books, accessible guided child experience, free no-ad approach | Published total spans ages, levels and activity types; not 5,000 Grade 1 objectives |
| SplashLearn | Pre-K–Grade 5; official website describes **8,000+** games, activities and printables; an app-store description describes **4,000+** games/books/challenges | Visual maths models, playful learning worlds, independent practice and parent progress insights | Counts are publisher-reported, include printables/books and differ by listing; not directly comparable with questions |
| Prodigy Math | Grades 1–8; company says **50,000+** maths questions | Grade-aware difficulty, rewards, problem solving and a scalable practice bank | Mathematics questions only, not 50,000 full lessons |

### Official/current source links checked

- Khan Academy Kids official: https://www.khanacademy.org/kids
- Khan Academy Kids Google Play listing: https://play.google.com/store/apps/details?id=org.khankids.android
- SplashLearn official: https://www.splashlearn.com/
- SplashLearn help, coverage: https://support.splashlearn.com/hc/en-us/articles/38088508081426-What-is-SplashLearn
- Prodigy Math official: https://www.prodigygame.com/main-en/prodigy-math
- Prodigy Math 50,000+ question statement: https://www.prodigygame.com/main-en/blog/what-is-prodigy-math-game
- Qatar MOEHE Curriculum Section: https://www.edu.gov.qa/en/Content/CurriculumSection
- Qatar MOEHE Early Learning, kindergarten and Grades 1–2 foundation: https://www.edu.gov.qa/en/Content/EarlyLearning

**Comparison rule:** Track **unique learning objectives**, **reviewed lessons**, **unique assessed items**, **interactive models**, **accessible language recordings**, and **actual parent/teacher review status** as separate indicators. Do not compare an app's total content marketing count directly with our 475 distinct MCQs.

## 3. What to prioritise next

### Priority 0: release safety and independent review — do this before declaring a model school product

1. **Curriculum evidence:** Map each sample activity to one precisely named, verified objective in the selected school's actual scheme of work. Qatar MOEHE publishes a national framework; do not claim automatic British Year / US Grade equivalence, ministry approval, or certified compliance.
2. **Native speaker pronunciation:** Audit English and Arabic word-by-word on an actual iPhone/tablet. Prioritise previously flagged red/أحمر, yellow/أصفر, sun/شمس, and bus/حافلة. Preserve the listener-preferred **bus C/D** recordings unless an independently checked improvement is chosen. Existing female/male English styles are adult synthetic voices; do not imply children recorded them.
3. **Teacher and family usability:** Obtain consent-based feedback on a small, age-appropriate sample without collecting identifying child data in the repository. Check text size, meaningful examples, sound audibility, Arabic RTL rendering, wrong-answer hints, and large touch targets.
4. **Security/privacy:** Preserve browser-local progress, no microphone uploads, no chat with strangers, no trackers or child advertising; verify PWA caching, permissions, strong repository access controls and release checks.

### Priority 1: strengthen early foundations before adding another large batch

1. Grade 1–2 **concept ladders** with a short worked example, touch/visual manipulation, then a new example, independent attempt, and a revisit later.
2. **Number sense and place value:** tens frames, number line, counting groups, real-life Qatar-appropriate shopping examples; improve misconceptions rather than adding repetitive arithmetic.
3. **Literacy:** validated decoding/phoneme instruction, short decodable texts and simple writing; avoid teaching phonemes from arbitrary whole-word MP3s.
4. **Science:** observe → predict → compare → explain with safe everyday examples, not only multiple choice.
5. **Parent insight:** show which activities were *tried*, *completed*, and *revisited*, separate from **teacher-verified mastery** (not available). The app already has `parent-report.html`, `practice-path.html`, `daily-discovery.html`, and `curriculum-compass.html`; improve these instead of creating duplicate dashboards.

### Priority 2: deepen Grades 3–6 only after review

- Expand mathematics reasoning, real examples, intermediate written steps and corrective hints.
- Add more original reading genres, evidence-based comprehension and human-reviewed writing feedback.
- Expand science observations and safe investigations, using grade/school-specific objectives.
- Consider adaptive *selection of existing reviewed activities* from local incorrect attempts; keep selection rules transparent and controllable by parents; do not claim AI diagnoses a child's ability.

### Priority 3: market readiness after actual verification

- Refine bilingual branding, icon legibility, calm nature-inspired soundscapes (with mute by default), and child-safe navigation.
- Assemble a short presentation, parent leaflet, teacher-review rubric and original visual demonstrations for the Qatar audience.
- Assess App Store / Google Play rules, privacy disclosures and developer account costs before promising store availability. The present product is a PWA hosted on GitHub Pages.

## 4. Definition of done for each new learning activity

- [ ] **One objective** documented with exact grade and school-pathway source, or explicitly marked **supplementary/thematic only**
- [ ] **One independent answer-key audit** and distractor check (no multiple plausible answers)
- [ ] **A concrete, pictorial or example-led scaffold**, not a question-only drill
- [ ] **A useful corrective hint** when wrong and a truthful explanation when right
- [ ] **Native Arabic text review** and human pronunciation review if any new recorded speech is used
- [ ] **Mobile 390px, tablet ~768px, touch and keyboard accessibility checks**, including screen-reader labels and reduced motion
- [ ] **Privacy and security checks passed**, without adding identifiable child data or third-party tracking
- [ ] **Parent or educator test recorded truthfully**, no invented approvals
- [ ] **Existing voice preferences, stars, progress keys, cached audio and older games preserved**
- [ ] **GitHub checks and public Pages deployment confirmed** before sharing a new production link

## 5. Immediate integration caution, as of 19 November 2026

PR **#29** (Qatar curriculum evidence register/reviewer desk) remains an **open draft with merge conflicts**. Its 4 November validation run failed on a reviewer-role-length assertion; the branch currently shows longer reviewer roles, but that older result does **not** establish a passing new run. Do **not** merge draft curriculum, pronunciation or nature-learning PRs blindly, and do not describe them as publicly launched. Resolve differences from `main`, rerun validation and child-security checks, obtain educational/Arabic owner review, then seek explicit release approval.

**North-star product goal:** Children enjoy the activity, parents understand the learning objective, a teacher can verify its correctness, and the app protects a child's privacy. More questions matter only when these requirements remain satisfied.
