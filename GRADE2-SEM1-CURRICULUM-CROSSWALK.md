# Grade 2 English Semester 1 — source-linked learning crosswalk

**Status:** curriculum-reference mapping and development QA completed; **specialist review pending**. Date: 16 October 2026.

## Source priority and appropriate use

1. **Primary Semester 1 source:** user-provided `Grade 2-Semester 1 Overview-2026-2027(1).pdf`, Qatar Department of Early Years Education, 18 pages. Week-by-week scheduling on p.3; teaching objectives on pp.4–14; word-family patterns and spelling lists on p.17; Super Reader word lists on p.18; teaching-method advice on p.2. These page numbers refer to PDF pages.
2. **Supplementary topic cross-check:** user-provided `TopStars_2A_QTR_20-21_SB_low(1).pdf`, 110 PDF pages (2020–2021 historical Student's Book 2a). Syllabus is PDF pp.5–6 and contents p.7. This is a historical edition: compare vocabulary and grammar, do not imply that the edition is current or permission to republish it. Prototype exercise sentences and passages are original.
3. **Not a Semester 1 syllabus:** user-provided 2025–2026 Grade 2 **Semester 2** final exam table of specifications (3 pages). It applies to Top Stars 2b, **Modules 9: Toys and Games** and **10: Having Fun**. It is useful only as an example of four-skill assessment and accessibility principles. Its marking plan must not be copied into our Semester 1 lessons.

## Semester modules and app mapping

All app items listed below belong to the **separate review branch**, not the approved public curriculum. Each module uses one adult-guided Listening, one observed Speaking, one short Reading and one model-based Writing exercise. In addition, every module contains an optional evidence-based reading challenge and one adult-reviewed original-writing prompt; optional letter-pattern activities supplement the word-family questions. Activity completion is *practice*, not demonstrated mastery.

| Module (app ID) | Weeks in 2026–2027 overview | First-semester outcomes and content drawn from overview | Prototype activities | Gaps and reviewer questions |
|---|---|---|---|---|
| **1. Welcome back!** (`welcome`) | **1–2**, pp.3–5 | Greetings, introducing oneself, classroom objects, colours, 1–20, simple instructions; revision of letter names/sounds | Listen: pencil/book/desk instruction; Speak: greeting; Read: classroom story; Write: "This is my book." | Oral introduction, letter/blending progression, number/colour use are underrepresented; check question level |
| **2. That's me!** (`me`) | **2–4**, pp.3,5–7 | Jobs, verbs, `can/can't`, animals, short texts, listening and speaking; word families **-ing, -and** | Listen: jobs; Speak: "I can jump."; Read: ability; Write: model `can` sentence; 2 optional phonics items | Need specialist check on `can't`, student-produced answers and sequencing; improve oral reading |
| **3. About people** (`people`) | **4–6**, pp.3,7–9 | Appearance and possession, toys/gadgets, `have got / has got`, describing objects; word families **-all, -ack** | Listen: possessions; Speak: `has got`; Read: short toy text; Write: `has got`; 2 phonics items | Expand question forms and `have got / haven't got`; Arabic and sensitivity review pending |
| **4. Food and drink** (`food`) | **10–11**, pp.3,11–12 | Food/drinks; likes and dislikes; requests; meals and healthy dish presentation; **-ain, -ink** | Listen: food request; Speak: polite request; Read: rice/carrots and preferences; Write: `I like rice.`; 2 phonics items | Need spoken `Do you like…?` answer practice, model healthy dish, comprehension differentiation |
| **5. What I eat** (`meals`) | **12–13**, pp.3,13–14 | Breakfast/lunch/dinner, parts of day, food vocabulary; `there is / there are` quantities in Top Stars 2a; **-ay, -ick** | Listen: breakfast and `there is/are`; Speak: breakfast; Read: picnic; Write: `There are two apples.`; 2 phonics items | Practice `there is` independently, question/answer for quantities and adult-supported food project |

**Module 4 name verified:** The 2026–27 overview uses “Food & drink” in the p.3 schedule and “Food and drink” on pp.11–12, matching the textbook's “Food and drink.” Previous tracker language implying its title remained unverified was outdated.

**Phonics reference:** Overview PDF p.17 lists Module 2 (-ing/-and), 3 (-all/-ack), 4 (-ain/-ink), 5 (-ay/-ick). Eight **original word-family recognition questions** are included as optional checks, two per Modules 2–5. The overview p.2 also recommends attention to **ch, sh, th, wh, ph** digraphs and **silent e**; seven additional optional written-letter recognition questions cover those spelling features. These are **15 optional recognition questions**, not a phonemic decoding course or spoken-pronunciation assessment. Phonics blending, sound production and grade suitability still require teacher/adult review.

## Limits of current implementation

- Core guided practice: **5 modules × 4 skills = 20**. Extras: **15** optional phonics/letter-pattern selections, **5** optional second reading questions with evidence notes for adults, and **5** independent-writing prompts for adult discussion. Extras are **not additional saved progress scores**. The progress counter remains 20, stored only under `lla-g2-four-skills-v1`. No existing IDs or Grade 2 English progress records changed.
- **Listening:** Adult reads an onscreen script; there is no recorded/verified audio and no formal listening test.
- **Speaking:** Adult observes; a button only records practice attempted, never fluency/pronunciation certification.
- **Reading:** Each short original passage has one primary comprehension choice and a second optional comprehension choice; the adult can reveal a supporting sentence. These are not oral fluency tests, nor a full reading progression.
- **Writing:** One guided sentence per module is checked for an approximate text match. Every module also has an optional **independent-writing** prompt and an on-screen input that disappears upon navigation/reload. The sentence is never saved, transmitted or automatically graded. An adult may discuss capitals, punctuation and meaning using a checklist, but the software does **not** assess them.
- **Arabic:** UI explanatory labels and module-title translations still require native-language educator checking. Do not claim that Arabic reading/voice quality is certified.
- **Copyright:** Do not reproduce Top Stars passages, graphics or workbook materials. Avoid uploading source textbooks into the public repository.
- **Curriculum:** Themes and schedule have been cross-checked to source pages; lesson-level accuracy, grade appropriateness and completeness are **not independently verified**.

## Quality-gate follow-up

1. Ask the Grade 2 English teacher to check one complete module at a time against the overview pp.4–14 (Accept, Revise, Hold, with exact question IDs).
2. Check developmental suitability of **all 15** optional letter-pattern items. The new digraph and silent-e choices supplement, rather than replace, explicit blending/decoding lessons, which still require design and review.
3. Ask the teacher to review the **five new reading follow-ups** and **five original-writing prompts**, including whether parent-read instructions support or overly scaffold pupils. Ask an Arabic teacher to review instructions and module labels; no teacher approval recorded yet.
4. Run static and mobile layout regression scripts, then test with Safari VoiceOver and a real phone.
5. Only merge or promote the pilot after corrective action and appropriate review; otherwise label clearly as an unverified supplementary pilot.

All development follows child-data minimization and a zero-paid-API approach.

## Optional Module 2 guided phonics pathway — 16 October 2026

The separate draft review branch now has `grade2-phonics-pathway.html` and `grade2-phonics-pathway.js`, linked from the four-skills pilot. They offer the seven guided stages **See → Hear → Blend → Read → Spell → Apply → Review** for the **-ing** and **-and** families referenced on overview p.17. The child sees original examples (`ring`, `sing`; `hand`, `sand`), listens to an **adult reading**, observes letter chunking, makes a word-family choice, types a spelling from an adult-read cue, chooses a meaningful sentence, and reviews together.

This is **14 optional guided steps** across two families, **not 14 additional scored activities** or proof of phonological mastery. The guided adult-listening and blending buttons record practice attempts only within the open page. Typed answers and completion indicators are **not stored, uploaded or included** in the original 20 saved four-skill progress flags or 15 optional recognition questions. No recorded speech or synthetic voice is included pending quality review. The source-to-topic mapping is not a specialist endorsement; a Grade 2 English teacher and an Arabic-speaking educator must approve the content before release.

**Technical checks:** a new Playwright test exercises every stage for both families, correct/incorrect responses, focus after navigation, small-screen overflow, and lack of local-storage writes. GitHub Actions must pass for the relevant commit before reporting technical verification. Real-device Safari/VoiceOver, real student/adult usability, developmental progression and pronunciation review are outstanding.



## Module 3 word-family pathway expansion — 18 October 2026

The optional original `grade2-phonics-pathway.html` and its JavaScript now cover **Modules 2 and 3**: **-ing / -and / -all / -ack**, directly matching the phonological progression on the 2026–2027 Semester 1 overview PDF p.17. The Module 3 practice uses the original examples **ball, wall, black, snack**, with 7 stages per family (See, Hear, Blend, Read, Spell, Apply, Review). For **black** and **snack**, the beginnings **bl** and **sn** are consonant blends; adults should model individual sounds and whole words, not claim this draft is a complete phonics curriculum.

The optional journey now has **4 families × 7 stages = 28** page-session-only practice steps. They do **not** add to or modify the existing 20 saved core-activity flags or 15 additional recognition questions, and they are not a fluency or pronunciation score. Original data, illustrations and text are used; no student recordings, names, paid services or typed answers are saved.

Development check: the existing Playwright script was expanded to cover all four families, choices, spelling, focus, small-screen layouts and browser-storage boundaries. Automated verification should be read from GitHub Actions for the **actual latest commit**. Teacher review of word choice, consonant blends, decoding accuracy, Arabic instructions and adult support is still required before promoting to public course material.

## Module 4 guided phonics expansion — 18 October 2026

The draft phonics adventure on the review branch has been expanded to **Module 4: Food and drink** and its source-specified **-ain / -ink** word families (Grade 2 English Semester 1 2026–2027 Overview PDF, p.17). The guided practice uses original examples **rain/train** and **pink/sink**, with a parent reading words aloud. The onset **tr** in *train* is a consonant blend, requiring a natural adult sound model and careful teacher review.

Current optional pathway total: **six families × seven stages = 42 practice steps**, covering Module 2 (**-ing/-and**), Module 3 (**-all/-ack**) and Module 4 (**-ain/-ink**). This is separate from both the **20** saved four-skill practice flags and the **15** optional letter-recognition choices on the main Grade 2 pilot. Stage indications exist only during the open browser session; no child text, recordings, accounts or payments are collected.

The browser regression was updated to cover all six family branches, word/sentence selections, spelling retries, keyboard focus, narrow-screen layout, and zero local-storage writes. **Automated result: PASS** on the tested implementation commit `be26abb42` — [GitHub Actions run #39132465264](https://github.com/Rahman1388/little-learners-academy/actions/runs/39132465264), including both browser suites. Grade 2 English and Arabic teacher validation, real-device iPhone/Safari VoiceOver review and pronunciation quality review remain pending; do not merge to production as an approved course.

## Module 5 guided phonics extension — 18 October 2026

On the development branch, the optional adult-led phonics journey adds **-ay** (day/play) and **-ick** (sick/kick), matching Module 5 (*What I eat*) in the user-provided Qatar Grade 2 English Semester 1 2026–2027 overview and historical *Top Stars 2a* syllabus. The full pathway now spans eight families across Modules 2–5 with **56 optional steps** (See, Hear, Blend, Read, Spell, Apply, Review × 8).

This phonics recognition practice uses independent, original activity sentences. It does **not** establish complete curriculum coverage, nor assess listening accuracy or spoken pronunciation: adults read the written scripts and supervise phoneme blending, including the **pl** consonant onset in play. The interface and browser tests should continue to be checked for accessible focus, spelling input, retry prompts and narrow smartphone layouts.

The original **20 core practice completion flags** and **15 other phonics/letter-pattern choices** remain distinct. The optional word-family pathway's 56 indicators only last while its page is open and never add to a score or browser storage. **Technical QA passed** for the tested implementation commit `05c9edb58`: [browser regression #39132852873](https://github.com/Rahman1388/little-learners-academy/actions/runs/39132852873) and [static curriculum/safety checks #39132852848](https://github.com/Rahman1388/little-learners-academy/actions/runs/39132852848). Teacher and native Arabic educator sign-off, real iPhone Safari/VoiceOver, and suitability for early primary learners are still **pending**.

## Visual scaffolding and teacher review prepared — 18 October 2026

The separate Word Family Adventure review branch now makes the shared **written word ending** visually distinct from changing onset letters in its original practice words. It provides a per-family **0/7 attempted-step counter** and a **Next stage** button after practice is marked, with focus transferred to the stage heading. The visual difference is supplementary: it is **not** proof of grapheme–phoneme understanding, sound production or reading fluency. Screen-reader full-word text accompanies the visually separated letters, preventing duplicated fragments being read as separate whole words.

**Engineering verification:** [Grade 2 browser run #39133241851](https://github.com/Rahman1388/little-learners-academy/actions/runs/39133241851) passed on the tested implementation commit `27195d201`: 8 word families, 56 ephemeral guided stages, accessible word-tile DOM structure, next-stage navigation and narrow mobile viewports. The 20 saved four-skill practice IDs remain unchanged.

**Pedagogical audit kit:** [GRADE2-PHONICS-EDUCATOR-REVIEW.md](GRADE2-PHONICS-EDUCATOR-REVIEW.md) includes a family-by-family review checklist and anonymous teacher feedback format. Parent read-aloud is still required; there is **no embedded pronunciation recording or child speech recognition**. Real-device Safari/VoiceOver and teacher sign-off remain outstanding, and publication as a certified Qatar curriculum product is prohibited without appropriate validation.

## 18 October 2026 — mobile accessibility and picture-meaning revision

The existing **eight Grade 2 word families** and **56 adult-supported stages** have not increased in count. In response to the original teacher usability priority, the branch adds an **optional larger-word-text toggle** (device-session only), a keyboard skip link, underlined shared spelling endings, and short visible picture captions for the phonics examples. Seven stage buttons include draft, correctly language-tagged Arabic labels alongside English. Full-word alternatives support assistive reading order. This is design/technical work, **not** confirmation of correct Arabic pronunciation by real speech tools.

**Engineering check:** [GitHub Actions run #39144517828](https://github.com/Rahman1388/little-learners-academy/actions/runs/39144517828) passed at code commit `78e6b9fc`, including eight-family browser interaction, 280px narrow-window and 320/390/768px viewport assertions, caption visibility, enlarged-letter toggle, keyboard skip focus and local-only progress checks. These Chromium checks cannot substitute for a real iPhone Safari/VoiceOver or an accessibility compliance audit.

**Human review gate:** Grade 2 English educator should confirm word level/visual phonics scaffolding, Arabic-speaking primary teacher should approve all displayed labels and instructions, and adults should verify whether pictures and captions clearly convey examples such as *sink*, *sick* and *play*. The original **20 saved four-skill progress flags** remain untouched. No lessons have been merged into the public app or certified for Qatar schools.
