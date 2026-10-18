# Little Learners Academy — Quality-First Foundation Plan
**Checkpoint:** 18 October 2026 | **Status:** Internal development framework; not an official curriculum, certification, or app audit.

## Why this phase comes before new activity volume

Our goal is an excellent **mobile-first, bilingual supplementary learning experience** for primary pupils in Qatar, eventually covering Grades 1–6. A large question bank is not equivalent to deep teaching or an approved curriculum. Build a reproducible lesson system first, then expand it gradually. No subscriptions, advertising, external learner accounts or costly infrastructure are needed for the next phase.

The public Grade 1 foundation and limited Grades 2–6 subject pilots **already exist**. Preserve them. Do not rebuild from scratch, delete saved local progress, or claim a complete school syllabus.

## Eight foundations to establish

| Foundation | What an established platform needs | Present position / gap | Minimum acceptance evidence |
| --- | --- | --- | --- |
| 1. Curriculum and learning outcomes | Traceable grade → term → module → objective → practice → evidence | Five Grade 2 English modules now in machine-checked `learning-quality-manifest.json`; many other subjects still have thematic rather than specialist-verified mappings | Review a real school scheme and tag every lesson with source page, grade suitability and specialist status |
| 2. Teaching before testing | Explain/model → guided practice → independent attempt → supported correction → revisit | Many short quizzes; a 14-stage phonics pathway and visual maths models demonstrate better sequencing | For a pilot, observe whether a learner understands the model before testing recognition |
| 3. Assessment integrity | Separate attempts, participation, practice and demonstrated mastery | Grade 2 tracks 20 practice flags; phonics 14 in-page stages, not ability scores | No mastery claims without teacher-defined assessment, repeat trials and independent evidence |
| 4. Clear age-appropriate speech | Fluent natural words, genuine phoneme modelling, normal/slow replay | Device English voice available; parent found ring/sing/hand clear on iPhone; sand and educator reviews pending | English-language phonics reviewer approves recordings or device voice, especially consonants; no automatic child voice scoring |
| 5. True English/Arabic experience | Native-quality language, RTL, instructions readable by early learners | English pilot and draft Arabic instructions; national subjects review-gated | Qualified Arabic educator reviews each child-facing string, not just labels |
| 6. Accessibility and child UX | 48px+ targets, focus/VoiceOver, iPhone/tablet, recovery hints, no forced timers | Automated mobile checks exist; real iPhone/VoiceOver and parent-child studies incomplete | Manual device testing at 320/390/768px and VoiceOver, with fix/retest history |
| 7. Privacy and trust | Data minimization, safe progress, parent control, copyright | Local device-only progress, private writing input, no child voice recording or advertising in current Grade 2 phonics | Security review and parent-facing plain language; do not publish identifiable child information |
| 8. Reliability and releases | Automated content checking, regression tests, repeatable launches and audit trail | App/security/mobile CI exists; new quality-manifest integrity gate checks curriculum metadata and code drift | Green validation and security results; successful Pages deployment; manual educator sign-off tracked independently |

## Foundation Release 1: auditable Grade 2 English (in progress)

- **Automated manifest:** `learning-quality-manifest.json` documents 5 modules, 20 skills (listen, speak, read, write) and two -ing/-and word families with 14 stages. Each entry holds its reference source, exact lesson outcome, limitations and explicit reviewer status.
- **Drift prevention:** `scripts/check-learning-quality-manifest.cjs` checks that the same module IDs, titles, weeks, objectives, word families, letter patterns, child-data protections and stable progress key are in the actual app.
- **CI integration:** `.github/workflows/validate.yml` runs the script on changes, making unexpected deletion or mismatched curricula visible to developers. **Passing code tests does not approve the education.**
- **Next real-world review:** ask an English Grade 2 teacher to evaluate all five modules, a qualified Arabic educator to review each relevant Arabic line, and an adult tester to check phonics playback, iPhone navigation and VoiceOver.
- **Readiness evidence:** for a draft activity, record `Accept / Revise / Hold`, exact module and skill ID, source PDF page, correction, tester role and date, and the reason for the decision. Keep personal reviewer/child data private.

## Foundation Release 2: one complete, approved-to-pilot lesson

Select one small Grade 2 lesson (likely Module 2 word families) and improve depth **without increasing counted questions**:
1. Age-appropriate learning goal for child and adult in clear English plus educator-reviewed Arabic.
2. Short worked picture/sound model; an adult can explain what to notice.
3. Guided try, optional hint, friendly retry, meaningful explanation.
4. Independent, non-punitive practice; children may replay at their own pace.
5. Real-world example and end-of-lesson reflection, without calling participation mastery.
6. Inclusive layout, RTL, VoiceOver and normal/slow sound review on actual devices.
7. Versioned review outcome and regression tests; respect children's privacy.

Compare experience quality with national and international learning platforms on these **dimensions**, not self-declared equivalence or raw question counts: sequencing, explanations, accessibility, bilingual accuracy, progress meaning, speech intelligibility, independence, reliability, safety, and offline/device experience.

## Foundation Release 3: repeatable Grade 1–6 production method

Once one lesson is reviewed and demonstrated to work:
- Create reusable teaching components (goal → model → try → correction → apply → review), activity metadata and accessible navigation.
- Extend module-by-module to selected subjects; prioritize foundational gaps and actual Qatar school requirements, not publishing a nominal grade's worth of superficial questions.
- Use a parent dashboard explaining **practised**, **needs support** and **not yet reviewed** separately; never present an algorithm's completion count as certified mastery.
- Keep an evidence bundle of curriculum mapping, activity lists, safety/privacy practices, QA results, accessibility review and teacher feedback. Make this available **if requested** by an official evaluator.

## External review and Ministry status

- On 18 October 2026 the owner **reported sending an inquiry email** asking MOEHE about the process for evaluating an independently built educational app. **Awaiting reply**. There is no reported official approval, audit, recognition or accreditation.
- Do not put officials' personal correspondence, teacher identity, child names, recorded voices or non-public school materials into the public GitHub repository.
- If the Ministry specifies a procedure, revise the evidence pack and submit only as directed. If no answer arrives after around 7–10 working days, consider a courteous status follow-up.

## Release decision rules

**Publish an internal preview** after automated checks pass and the preview accurately discloses its limits. **Invite adult or teacher testing** only with a practical review sheet and safety guardrails. **Describe as educator-reviewed** only when an appropriately qualified reviewer has explicitly accepted the particular items. **Describe as Ministry-approved** only with verifiable written official approval for the exact app and scope.

## Quick start

- [Live application](https://rahman1388.github.io/little-learners-academy/)
- [Project START HERE](./START-HERE.md)
- [Current Grade 2 quality checklist](./GRADE2-QUALITY-REVIEW-2026.md)
- [Grade 2 quality manifest](./learning-quality-manifest.json)
- [Development history](./PROJECT-CONTINUITY.md)

**Resume:** “Continue the Quality-First Foundation Plan; begin with verified Grade 2 curriculum, adult-guided phonics, accessibility and specialist review. Expand activities only after the foundation is solid.”
