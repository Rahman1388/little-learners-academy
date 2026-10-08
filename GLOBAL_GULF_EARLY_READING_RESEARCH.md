# Little Learners Academy: Global and Gulf benchmarking (October 2026)

## Why this review happened
The owner reports that both English and Arabic phonics audio remains difficult to understand after several passes through free synthetic text-to-speech engines. The Arabic **male** voice was judged clearer than the female; preserve the approved male recording when testing alternatives. **A technical MP3 check is not an intelligibility test.**

## International English early-reading examples

| Program | Verified feature | Adaptation to our independent app |
| --- | --- | --- |
| Teach Your Monster to Read | Stages covering grapheme/phoneme correspondences; isolated letter sounds; CVC blending and segmenting; personalised character and minigames | Teach a systematic sequence of sounds, then blend a small decodable word and reward a correct picture choice |
| Reading Eggs / Fast Phonics | Separate instruction for sound–letter links, blending and segmenting, decodable books and short practice | Introduce just one sound set at a time and distinguish sound-only playback from full-word narration |
| Jolly Phonics | A multi-sensory phonics sequence using actions, stories, songs and games | Build original, age-appropriate actions/animations, not copies of its proprietary content |
| Oxford Owl / Read Write Inc. guidance | Teacher demonstrates **pure sounds** without an extra schwa sound: e.g. /m/ not 'muh'; children blend /c/ + /a/ + /t/ to 'cat' | Have qualified phonics educator supervise individual consonant sound recordings, especially stops like /t/ |

Official sources:
- https://help.teachyourmonster.org/en/articles/5586062-what-areas-does-teach-your-monster-to-read-cover
- https://international.readingeggs.com/phonics-games/
- https://jollylearning.com/en-us/our-programs/jolly-phonics
- https://home.oxfordowl.co.uk/reading/reading-schemes-oxford-levels/read-write-inc-phonics-guide/
- https://home.oxfordowl.co.uk/learning-to-read-in-reception/

## Arabic and Gulf-region examples

| Program | Verified feature | Adaptation |
| --- | --- | --- |
| Qatar National Library digital children's resources | QNL library members have access to **I Read Arabic**, **Nahla wa Nahil**, bilingual **BOOKI** audio read-alongs, and **Jana Reading** | Compare native-human voice clarity and graded reading; use QNL as a research/reference resource, **not** as an unlicensed audio source |
| AlifBee Kids | Interactive Arabic alphabet, words, songs, cartoons; its provider states lessons are spoken by native Arabic speakers and words repeated | Prioritise clear simplified Modern Standard Arabic, native-speaker recordings and familiar words |
| Nahla wa Nahil | Grade K–5 Arabic reading and comprehension platform by Arabic educators; home/school editions | Expert-reviewed progression by Arabic reading level |
| 3asafeer | Leveled Arabic stories, read/listen games, videos and exercises | Make comprehension/listening games after clear word narration |
| Lamsa Kids | Arabic/English early-childhood educational videos, games and activities | Bilingual controls, playful visual feedback; a single lesson can use either language without overload |
| AlifBee Kids alternative features | Ad-free and repeatable activities; parent profiles in some versions | Keep QAR 0 hosting and child privacy first; default no ads/accounts |

Official and relevant sources:
- https://www.qnl.qa/en/children-and-teens/children/online-resources
- https://www.alifbeekids.com/en
- https://apps.apple.com/ae/app/nahla-wa-nahil/id1263102973
- https://3asafeer.com/en/play
- https://apps.apple.com/ae/app/lamsa-kids-learning-app/id517583488

## Critical distinction: word narration is not phonics
The existing lesson **Sounds & Phonics** plays *whole English words* (cat, fish, sun, bus) plus their Arabic translations. It does **not** currently isolate and accurately record the phonemes for each word. Example desired **English-only phonics** design:
1. See a picture and the letters **c – a – t**.
2. Hear the **pure** /k/, short /æ/, and /t/ sounds individually, each from validated clips. No 'cuh', 'aay', or 'tuh'.
3. Tap a **Blend** button to hear a natural modeled blend and then 'cat' in a clear child-friendly voice.
4. Listen to the word and choose the picture: match, repeat, reward.
5. The Arabic word **قِطَّة** is a bilingual vocabulary translation, **not** the phonics pronunciation of English letters.

For Arabic-language phonics, create a **separate specialist-reviewed** early-literacy track for letters, Arabic vowel marks (harakat), syllables and blending; avoid inventing syllable decomposition from English rules.

## New quality gates: do not release on file checks alone

**Voice quality requirements** for every trial language and selected persona:
- 3 independent listeners, ideally an early-reading teacher, a proficient/native speaker, and a parent, each identify the target words *without seeing the written answers*. For Arabic, get a qualified Arabic-language reviewer.
- Each listener rates intelligibility, naturalness, appropriateness for age 6–7, articulation of consonants and regional accent. Record failure words.
- A separate check for English **phoneme** recordings: each grapheme/phoneme is pronounced without a trailing 'uh', with correct short vowels and blends.
- A separate Arabic check: Modern Standard Arabic pronunciation, hamza, emphatics, long/short vowels, diacritics, morphology and suitability for families in Qatar.
- Reject and do not promote any candidate if a teacher or parent cannot understand the spoken word without reading it.
- Test at normal speed on Android Chrome, iPhone Safari and Windows. Verify sound is actually audible and file duration is not 0:00 / 0:00. Always display an actionable error message if a clip fails.
- Preserve the already approved Arabic male clips until a replacement is specifically approved.
- **Synthetic child-like ≠ actual child voice**. Never advertise generated adult voices as child recordings; do not pitch-shift a voice to mask bad pronunciation.
- For actual child-voice recordings, ensure recording guardian permission, a safeguarding process and explicit distribution/performance rights. For a no-cost, privacy-conscious option, obtain original audio from consenting **adult native-speaking teachers using a warm, friendly delivery**; use original clips only with written reuse permission.

## Efficient QAR 0 path
1. Stop replacing whole libraries of recordings after each experiment.
2. Make **one four-word English and Arabic quality demo**, with two distinct speakers per language.
3. Validate these clips with real listening and pedagogy feedback **before** scaling out. Current `voice-test.html` is a prototype listening panel, not voice-quality certification.
4. Once approved, pre-record all necessary words and phonemes as individual files for GitHub Pages/PWA. No child accounts, API calls or recurring voice subscriptions.
5. Build **Listen sound → Blend → Hear word → Choose picture → Repeat** for the English phonics lesson; keep whole-word bilingual vocabulary separate.

## Licensing
Competitor audio, proprietary educational artwork, character names and game scripts are **reference material only**: do not download/re-host them in Little Learners Academy without appropriate permission. Free access to QNL resources does not confer permission to copy files. Check licences and training-data/voice rights of generated voice models before future commercial release.

## Status
- Benchmark research done; not an endorsement or claim that competing services are free.
- Original audio quality is still under review: **no claim of verified child-quality phonics audio yet**.
- Sensitive Qatar Core modules remain locked pending specialist review.
