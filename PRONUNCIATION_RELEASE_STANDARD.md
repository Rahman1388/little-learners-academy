# Voice clarity and native-pronunciation release standard

## Why this comes before further phonics expansion

Parent feedback on **Colours & Patterns** (especially **red / أَحْمَر** and **yellow / أَصْفَر**) reported that the current synthetic audio is difficult to recognise. A successful MP3 format check or repeated playback cannot establish that the word is intelligible. Until a better recording is independently reviewed, the Colours & Patterns lesson is visual/text-only. The existing original files remain accessible for adult comparison at `pronunciation-review.html?lesson=patterns`.

The app currently contains **52 lesson items** (13 lessons × four items). A truly separate female and male voice for English and for Arabic means **208 approved word/phrase recordings** as a minimum, plus the isolated phoneme library needed for formal phonics. The present original synthetic audio is **not** a full native-voice quality-assured release.

## Language and source-speaker choices

- **English female / English male:** use two clearly distinct **native or professionally trained adult speakers**, with one consistently specified accent (British English preferred for the current KS1 bridge). A cheerful adult educator can sound child-friendly without claiming to be a child. Avoid exaggerated character accents and changing vowels or fricatives.
- **Arabic female / Arabic male:** use two distinct fluent **Modern Standard Arabic speakers**, preferably educators experienced with Qatar Grade 1 learners. The target is classroom Arabic, not an unreviewed regional TTS dialect. Review every written item for appropriate diacritics, grammatical inflections and whether an isolated spoken word should retain case endings.
- **Do not use voice cloning or children's recordings** without documented speaker/guardian consent, privacy review, an appropriate license and a specific educational need. Adult speakers are the simpler and safer default.
- **Do not substitute a device's speech synthesis voice** when a teaching MP3 fails. Its identity, accent and pronunciation vary across devices; show a retry and parent review route instead.
- Keep existing English **bus** choices C (Alba female) and D (Bryce male) as parent-liked *synthetic trials*, not human-vetted native phonics.

## Recordings to produce

For each lesson item, collect **four** audio files: English female, English male, Arabic female, Arabic male. Name consistently, e.g. `audio/approved/en/patterns-0-girl.mp3`, `audio/approved/en/patterns-0-boy.mp3`, `audio/approved/ar/patterns-0-girl.mp3`, `audio/approved/ar/patterns-0-boy.mp3`. Only switch lesson playback from the existing source folder after signoff on that exact file.

Use a quiet room and good microphone; keep the native speaker's ordinary speaking rate, natural pitch, consonant/vowel articulation and comfortable volume. Record at least 44.1 kHz mono or stereo WAV as the master if possible. Encode a high-quality MP3 delivery copy, with ~150 ms headroom and 250–400 ms tail. For the youngest learners, provide a separate **three-repetition** practice version with audible gaps, assembled from the independently verified single word. Avoid aggressive denoising, pitch shifting, formant changes, or playback-speed transformations that alter the sound.

**Whole words are not pure phonemes.** Phonics needs separately recorded, correctly segmented consonant and vowel sounds, blending demonstrations and teacher-reviewed grapheme-to-phoneme mappings. Do not use a TTS reading of a letter name as an isolated phoneme.

## Required listening and curriculum checks before enabling audio

1. Have a native English phonics educator check every English word and each intended letter sound.
2. Have at least one native qualified Arabic educator check each Arabic target's word choice, diacritics, stress, phonemes and appropriate classroom pronunciation; a second independent listener is preferable.
3. Test the final exact MP3 on an iPhone and an Android handset/tablet at normal rate and normal speaker volume. Verify that the first consonant is audible, the final consonant is not clipped and there is no 0:00 playback issue. A technical `ffprobe` pass alone is not enough.
4. Collect a short blinded recognition test from several independent parents or educators, preferably also observing age-appropriate learner comprehension with consent. Track percent correct per word, disagreements, and failures. Prioritise re-recording anything the reviewers disagree on.
5. Approve each language/voice/item combination **separately**; one approved male voice does not approve a female recording, and one language does not approve another.
6. Log recording source, speaker permission/license, reviewer, date, version, review outcome and exact filename. Only then update the app's approved-audio manifest and enable playback.
7. Keep a visible **Report unclear pronunciation** path after release so families can report regressions. Do not use a word marked wrong as a model for children.

## Prioritised batch

**Batch 1:** English red, yellow, star, blue; Arabic أَحْمَر، أَصْفَر، نَجْمَة، أَزْرَق in all four voice profiles (16 approved recordings). Focus first on the parent-reported red/yellow words.

**Batch 2:** Cat, fish, sun, bus and the corresponding Arabic meanings, with the separate English phonemes required for structured phonics.

**Batch 3:** The remaining curriculum lessons, grouped by topic so that recording scripts and terminology can be verified consistently.

**Arabic core subject curriculum remains locked** pending relevant specialist approval. This quality workflow is supplementary to, not a substitute for, checking learning standards and pedagogy.

## Parent workflow

Open `https://rahman1388.github.io/little-learners-academy/pronunciation-review.html?lesson=patterns` on a phone. Choose a lesson and listen to English male/female and Arabic male/female candidate recordings. Mark Clear, Unclear, Wrong word or Missing. Tap **Copy pronunciation report** and share the text with the development team. Ratings are local to that device; they do not silently alter audio for other children. The female Arabic option is audition-only, not enabled in student lessons.
