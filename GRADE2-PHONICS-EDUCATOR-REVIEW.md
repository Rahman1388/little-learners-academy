# Little Learning Academy — Grade 2 phonics educator review sheet

**Draft only • not Ministry-approved or specialist-validated**  
**Scope:** Grade 2 English Semester 1 2026–2027, Modules 2–5, supplementary original phonics pathway on the development branch.  
**Reference:** User-supplied Qatar Grade 2 Semester 1 Overview 2026–2027 (PDF p.17 word families, p.2 recommended phonics approaches). **Historical comparison only:** Top Stars 2a 2020–2021. No proprietary textbook passages or illustrations are reproduced.

## How to inspect

Open `grade2-four-skills.html` on the **review branch or controlled browser test build**, choose the optional **Word Family Adventure**, and inspect all seven stages for each family: See → Hear → Blend → Read → Spell → Apply → Review.

**Development-only link:** [Word Family Adventure source page](https://github.com/Rahman1388/little-learners-academy/blob/feature/grade2-four-skills-pilot-20261016/grade2-phonics-pathway.html). This is a GitHub **source file**, not a live children's learning site. Use a teacher-controlled local/branch preview until a separate review release is ready.

The app uses on-screen visual word clues and **adult-read scripts**; it has **no pre-recorded child voice, automatic speech assessment, or microphone**. No names, recordings, typing, analytics or child accounts are saved in this phonics pathway. Completion counts mean **practised in the current visit**, *not mastered*.

## Family-by-family content

| Module | Word family | Original examples | Reviewer focus |
|---|---|---|---|
| 2 — That's me! | -ing | ring / sing | Short onset + shared ending; sounds modelled naturally |
| 2 — That's me! | -and | hand / sand | Recognisable sound/letter patterns and adult pronunciation |
| 3 — About people | -all | ball / wall | Appropriate pictures and grade-appropriate vowel/rime |
| 3 — About people | -ack | black / snack | **bl**, **sn** consonant onsets; avoid confusing blends with one sound |
| 4 — Food and drink | -ain | rain / train | **tr** onset blend; sound vs spelling |
| 4 — Food and drink | -ink | pink / sink | Picture and meaning clarity, especially sink |
| 5 — What I eat | -ay | day / play | **pl** onset blend; vocabulary suited to young learners |
| 5 — What I eat | -ick | sick / kick | Sick/illness imagery sensitivity and action meaning |

## Review criteria and decisions

For every family, record **Accept / Revise / Hold** for each of these domains:

- **Curriculum/grade fit:** Appropriate to referenced Semester 1 module's word patterns and Grade 2 vocabulary/readiness
- **English phonics correctness:** Teacher can model exact sounds, onset/rime blending, word recognition, spelling and sentence usage without confusion
- **Visual scaffolding:** Highlighted **shared written ending** and contrasting onset are understandable even without colour; picture/emoji meaning is clear, including cultural suitability
- **Child navigation:** Large targets, clear seven-stage workflow, Next action, wrong-answer retry, focused stage heading, appropriate screen length on a small iPhone
- **Arabic and bilingual directions:** Native Arabic-speaking primary teacher approves the English/Arabic phrases and clear child/adult separation
- **Safeguards:** No claims of automatic oral assessment; no child data collection; does not alter existing Grade 2 app progress; feedback avoids shame or punishment

## Simple reviewer response template

> **Module / family:** e.g., Module 4 / -ain  
> **Decision:** Accept / Revise / Hold  
> **Domain:** Curriculum / Phonics / Visuals / Usability / Arabic / Safety  
> **Stage:** See / Hear / Blend / Read / Spell / Apply / Review  
> **Specific concern:** What exactly should change?  
> **Proposed child-friendly wording or corrected example:**  
> **Evidence:** Overview PDF page or classroom teaching rationale  
> **Recheck required:** Yes / No

Reviewers should **not send children's names, photos, voice recordings, or other identifiable student details**. Collect anonymous, adult-authored feedback only.

## Required verification before public release

1. Grade 2 English teacher checks all eight families and all seven stages, especially modelling of beginning consonant blends.
2. Arabic-speaking primary educator signs off bilingual instructions; this is **not yet complete**.
3. Adult with an actual iPhone tests Safari/VoiceOver at normal text size and increased text size, 320px-equivalent narrow screens, touch targets, keyboard focus, colour-independent legibility, and navigation back to the Grade 2 pilot.
4. Rerun static and browser regressions after corrections. GitHub Actions passes mean engineering checks only; they are not Ministry approval or educational certification.
5. Continue keeping the new phonics path on its **separate review branch**, not `main`, until appropriate sign-off.

**Current development inventory:** 8 optional word families × 7 adult-guided stages = **56 visit-only steps**; separate from **20 saved guided English-skill completion flags** and **15 other optional recognition questions**.

## Phone-accessibility review addendum — 18 October 2026

**Development changes on the review branch (not deployed to the public app):** A temporary `Aa • Larger letters` toggle, a keyboard skip-to-current-stage link, underlined as well as highlighted word endings, individually language-tagged Arabic stage names, and short visible captions beneath picture clues. The settings and attempts are not saved. The draft Arabic words still **require a native-speaking primary educator's confirmation**.

**Real iPhone Safari/VoiceOver inspection — NOT YET DONE.** In a controlled branch preview (not the GitHub raw-source page), an adult tester should:

1. Activate and deactivate **Larger letters**. Confirm that `aria-pressed` is reflected by VoiceOver, the words remain legible, and no text or buttons run off the screen. Refresh: the display choice and the 56 session-only indicators should reset.
2. Navigate with VoiceOver through the eight word-family buttons, then the seven bilingual stages. Confirm stage names and Arabic phrasing are understandable; VoiceOver pronunciation, reading order, and focus must be judged by a human Arabic-speaking reviewer.
3. Use the keyboard skip link and the **Next** button; confirm focus lands on the current stage heading and children can still choose any stage.
4. Check the visible **picture captions** against the emoji clue and target word. Give special attention to **sink**, **sick**, and the blends in **black/snack/train/play**. The caption is intentionally hidden from screen readers because the emoji already has a spoken label; check that this behaves as intended.
5. At enlarged Safari text settings or zoom and portrait orientation, verify that word chunks, captions, choices, and spelling inputs remain readable without sideways scrolling. Try mistaken answers, adult-reading disclosure, and the final Review stage.
6. Confirm there is no automatic voice playback, microphone prompt, grade/mastery score, account form, child text collection, or saved phonics attempt.

**Status:** Only automated Chromium checks are available so far; do **not** mark Safari, VoiceOver, Arabic review or pupil usability as passed without independent evidence. Record each result as **Accept / Revise / Hold** with the module, family, step and proposed fix.

## Separate preview ZIP for adult reviewers — 18 October 2026

The project now generates the **`grade2-teacher-preview` GitHub Actions artifact**, with a review landing page and all dependent lesson JavaScript included. On a computer, extract the package and serve the extracted files through a trusted local server; see [Grade 2 teacher-preview setup](GRADE2-TEACHER-PREVIEW-GUIDE.md).

**Verified:** [GitHub Actions run #39150972772](https://github.com/Rahman1388/little-learners-academy/actions/runs/39150972772) passed packaged browser tests on code commit `ea675ac1d`. It is not a public teacher link, and the ZIP is accessible through a public-source repository, so do not include real learner data. Teacher/Arabic approvals and manual iPhone browser and screen-reader tests are still outstanding.

## Module-linked reviewer navigation — 18 October 2026

The draft review version now supports **direct module and family routes on a functioning branch/local preview**, making it easier to inspect one relevant phonics family at a time. From the Grade 2 core lesson page, select the module (2–5), find the two relevant family links in the phonics section, and use the **Back to Grade 2 Module** link after exploring the guided lesson.

Example test routes (relative to a running reviewer-controlled site): `grade2-four-skills.html?module=food` → `grade2-phonics-pathway.html?family=ain` or `?family=ink` → back to `?module=food`. Other module IDs are `me` (2), `people` (3) and `meals` (5). These are **not yet public live preview links**; a GitHub source-file page cannot run this app.

**Technical check passed:** [Actions #39148839350](https://github.com/Rahman1388/little-learners-academy/actions/runs/39148839350). Ask the teacher to confirm that family links and return navigation are intuitive on their actual device. Do not record any child identifiers; real-iPhone Safari/VoiceOver and bilingual specialist review remain **pending**.

## Private adult review helper — 18 October 2026

A new **development-only** mobile-friendly page, `grade2-educator-review.html`, allows adult reviewers to choose the exact module/word family, See/Hear/Blend/Read/Spell/Apply/Review stage, review domain (phonics, curriculum, picture clarity, mobile accessibility, Arabic, safety), and **Accept / Revise / Hold** decision. The adult may type a brief observation and optional correction; the page prepares copy-ready text on the device. Its chosen word family stays linked to the running phonics lesson through a safe relative link. The draft phonics and core Grade 2 pages both link to this helper.

**Privacy boundary:** Neither input nor prepared reports are stored, automatically submitted, or sent over the network. An adult can opt to copy the text to their clipboard, but **the tool cannot guarantee anonymity or automatically remove names**. The reviewer must exclude children's personal details and inspect any copied text before sharing. A browser refresh clears the draft; copying to the device clipboard is at the reviewer's discretion. This helper is not a Ministry feedback portal and does not create expert approval or alter child progress.

**Review source:** Word-family mappings use the supplied Grade 2 2026–2027 Semester 1 overview p.17 and teaching-methods guidance p.2. The GitHub branch displays source files only, not an independently hosted mobile preview; run from a controlled browser environment if sharing with reviewers. Safari/VoiceOver, teacher methodology sign-off and native Arabic specialist approval remain pending.
