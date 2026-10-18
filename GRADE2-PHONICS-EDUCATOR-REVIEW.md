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
