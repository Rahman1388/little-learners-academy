# Little Learners Academy — educator review handoff
**Prepared:** 4 November 2026  
**Status:** Volunteer educator evaluation plan; no school or ministry approval. Document-only review preparation, not a child-facing release.

## Why this document exists
The development team has prepared a four-page **English + Arabic Educator Evaluation Pack** as a printable PDF and editable Word document in the project discussion. This repository document preserves its reviewer instructions and authoritative page links. The PDF/DOCX are **not** hosted here; do not invent GitHub download paths or promise that a branch review page is live.

## One-click public pages (no GitHub Actions artifact required)
- [Public application](https://rahman1388.github.io/little-learners-academy/)
- [Existing educator review kit](https://rahman1388.github.io/little-learners-academy/educator-review-kit.html)
- [Mobile teacher feedback form](https://rahman1388.github.io/little-learners-academy/teacher-feedback.html)
- [Adult-only pronunciation review studio](https://rahman1388.github.io/little-learners-academy/pronunciation-review.html?lesson=patterns)
- [Curriculum topic guide](https://rahman1388.github.io/little-learners-academy/school-pathways.html)

These pages exist on **main** as of the handoff. External tool access to GitHub Pages can vary; verify the links on the educator's actual device and never describe draft PR pages as deployed lesson previews.

## First-review assignment (small and manageable)
1. **Qatar primary teacher (Grade 1):** review five to ten published mini-activities in the school-grade context. Record the exact activity title/ID, one example answer, and any ambiguous or inaccurate explanation. Mark **Accept this sample / Revise / Hold / Not checked**, not a blanket pass for the application.
2. **Native/fluent Modern Standard Arabic educator:** review selected written instructions, terminology, diacritics where relevant, natural comprehension in Qatar and actual RTL display on a real phone. Note which words are draft-only.
3. **English literacy/phonics educator:** audit selected existing word audio separately for phoneme articulation, whole-word intelligibility, blending, and classroom appropriateness; a spoken *word* alone is not an isolated phonics sound. Prefer an actual iPhone + Android speaker test.
4. **Accessibility/parent reviewer:** verify tap targets, text size, easy stop/retry, clear feedback and lack of unnecessary collection of children's personal data.

## What the review form records
- Reviewer **role** and relevant grade/subject, preferably without personal identifiers;
- Public lesson page or question identifier; published curriculum reference if known;
- Answers and explanations, grade appropriateness, English literacy, Arabic wording, visual interaction, accessibility, cultural suitability and child safety;
- Clear/Revise/Hold/Not checked for each assessment criterion;
- Specific correction and evidence, not only general praise; independent sign-off/recheck for changed content.

## Pronunciation: release gate
- **208 original synthetic candidate recordings** exist across 52 Grade 1 items (English and Arabic, two styles). This inventory is not a library of approved native child voices.
- Audio review draft [PR #23](https://github.com/Rahman1388/little-learners-academy/pull/23) creates a *technical* pending-review list. It does not certify pronunciation or change child playback.
- Prioritize **red / أَحْمَر**, **yellow / أَصْفَر**, Arabic **شمس**, and English **cat, fish, sun, bus**, including isolated phonemes as separate educator-reviewed material where applicable.
- Audio files need exact-file checks, independent native-speaker listening, rights/licensing confirmation, and real-device clarity tests. Unclear files remain withheld; app audio is not silently approved.

## Release status and draft content
- Live content is **supplementary** and is not a fully approved Grade 1–6 school programme. The published counted question inventory is **475 distinct short MCQs** as audited on main (not 475 fully independent learning experiences).
- Draft [Nature Trail + Look & Compare PR #21](https://github.com/Rahman1388/little-learners-academy/pull/21) is **not live**. Teachers may review its development code and written content, but cannot be directed to it as a working public preview until separately deployed.
- Draft [parent-assisted outbound-link gate PR #22](https://github.com/Rahman1388/little-learners-academy/pull/22) is **not merged** and cannot be called a verified adult identity gate.
- Qatar curriculum mapping remains a topic bridge, not ministry certification. Arabic, Islamic Studies and Qatar History need qualified specialist review before claiming curricular completeness.

## Privacy and feedback-handling rules
- The public teacher-feedback page does **not** automatically send responses; reviewers intentionally copy or share privately. Make sure a responsible project owner receives and acknowledges comments.
- Do not collect children’s names, photographs, voice recordings, medical information, school marks, passwords or copyrighted school documents.
- Do not publish volunteer educator identities or infer an institutional endorsement without explicit authorization.
- A decision applies **only to the sampled files and exact lesson version**. Track changes by issue, re-test and request reviewer recheck before merge/publish.

## Review report acceptance checklist
- [ ] 5–10 specific sample activities reviewed with IDs/URLs
- [ ] Every identified issue has a clear requested fix and evidence
- [ ] English phonics and Arabic pronunciation *separately* checked where applicable
- [ ] Parent/device usability and basic accessibility checked on real phones
- [ ] Any blocking inaccurate/unsafe wording is held from child release
- [ ] Corrected content receives educator recheck; no broad approval inferred
- [ ] Owner authorizes publishing only after explicit release readiness review

**Maintainer note:** Updating this markdown is a documentation-only change. No lesson data, audio, PWA cache, navigation, store builds, or user progress is altered.
