# Audio, Phonics and Nature Quality Standard — 4 November 2026

**Permanent project requirement.** Every future English/Arabic pronunciation, audio, visual-theme or app-store release must explicitly review this file. It remains on GitHub for continuity independently of ChatGPT memory.

## Audio quality is a human release gate
1. Technical automated check: `node scripts/check-bilingual-audio-assets.cjs` audits 18 expected packaged English/Arabic recordings for existence, minimum file size and plausible MP3 header. **This check does not establish phonetic quality, native speaker accent, clear audio or child comprehension.**
2. English specialist: early-primary phonics teacher using one consistent English accent, judging individual sounds, blending, syllables, final consonants, vowel quality, rate, natural prosody, repeat-pause spacing, gain, clipping and intelligibility on small speakers.
3. Arabic specialist: qualified native-proficient Modern Standard Arabic early-literacy educator validates individual letter sounds, vowel length, harakat/diacritics, shadda, emphatic consonants, word wording and audio-text correspondence. English and Arabic phonics are not interchangeable. Simple Arabic translations are not an accredited Arabic literacy course.
4. Actual device: test each clip on an iPhone speaker, Android speaker and headphones in a quiet room, at comfortable loudness; test normal/slow modes where supported, offline playback, replay and no audio overlap.
5. Track each clip as PASS, NEEDS FIX or UNVERIFIED, with word, language, reviewer, device, specific problem and date. Block release when required audio is NEEDS FIX. New voices are not described as real children if synthesised.
6. Previously selected **C and D bus alternatives** remain unchanged without owner approval. Synthetic child-like voices are not automatically native-quality or authentic child speech.
7. The existing `audio-review.html` is available for adult listening feedback; no voice recording from children should be collected, uploaded or committed.

## Child-friendly nature, usability and sound
- Garden, sky, sunlight and plant motifs; soft non-distracting palette, high-contrast text, readable large Arabic and English, touch targets, keyboard and screen-reader support.
- Meaningful choice between learning adventures (Puzzle, Story, Nature) and either one step or three; same actual grade-linked lessons. Include an adult conversation prompt at each stop.
- No noisy auto-play, no forced music, no countdowns, streak pressure, shame, ads or intrusive notifications. Natural stopping points are a feature.
- Future ambient nature audio, if added, must be original/licensed, OFF by default, available via parent control, and much quieter than instructional speech. It must fade or pause during any phonics playback and never interfere with words.
- Validate child engagement through supervised teacher/parent testing and qualitative feedback, not with compulsive engagement metrics.

## Existing application status
- Current public app is the main branch of https://github.com/Rahman1388/little-learners-academy ; development branches are not live.
- Current released inventory is 475 distinct multiple-choice questions across Grades 1–6, with other uncounted interactive modes. Do not count route reordering or the 12 draft Grade 3 Fraction Garden questions as new released questions.
- The new child-led adventure design and automatic bilingual audio integrity check are in a separate **draft PR** until all relevant tests, owner approval, native-speaker reviews and iPhone checks are completed.

## Release sign-off
- [ ] Audio-file check and app code validation pass.
- [ ] English phonics / word pronunciation reviewed by qualified English-language educator.
- [ ] Arabic words, diacritics and pronunciation reviewed by qualified Arabic-language educator.
- [ ] iPhone Safari and Android browser/device tests, with headphones and speakers; 320/390/768-width layout.
- [ ] Parent/teacher verifies independent one-step navigation, theme switching, comfortable stop, route count, saved tried steps, no regression.
- [ ] Accessibility and child privacy reviewed; no accidental new child data or tracking.
- [ ] Owner explicitly approves public child-facing release.

**Status as of file creation:** Technical file audit exists, human sound-quality approval remains **pending**. No native-like phonics or natural soundscape certification is claimed.
