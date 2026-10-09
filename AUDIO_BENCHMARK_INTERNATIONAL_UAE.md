# Voice & audio format benchmarking: International + UAE

**Reviewed 9 October 2026.** This comparison uses publicly documented educational features and the actual MP3 files in Little Learners Academy. We did not access copyrighted source audio files from other apps, and we cannot claim to have measured their codec, loudness, voice age or bitrate.

## International and UAE/Gulf evidence

| Reference | Documented learning/audio approach | What Little Learners Academy should adopt |
| --- | --- | --- |
| [Reading Eggs / Fast Phonics](https://readingeggs.com/schools/phonics/) | Correct letter–sound pronunciation, phoneme blending, segmenting and decodable reading | Separate teacher-reviewed pure sounds, whole-word reading and matching activities |
| [Teach Your Monster to Read](https://help.teachyourmonster.org/en/articles/5736688-how-is-teach-your-monster-to-read-educational) | Spoken blending models, letter-sound matching, original adventure games | Short sound challenges, not only whole-word audio |
| [Oxford Owl phonics videos](https://home.oxfordowl.co.uk/phonics-videos/) | Expert demonstrations of 44 pure English sounds and blending | Avoid adding unwanted “uh” to English consonants; review phoneme recordings with a teacher |
| [Lamsa Kids (UAE App Store)](https://apps.apple.com/ae/app/lamsa-kids-learning-app/id517583488) | Bilingual Arabic–English content and child-friendly games/videos | Clearly separate the English sound to be learned from its Arabic meaning |
| [Nahla wa Nahil (UAE-used Arabic literacy)](https://nahlawanahil.com/en/home/index) | Arabic books, listening, games, quizzes and reading levels | Build a separate leveled Arabic listening and reading pathway |
| [AlifBee Kids](https://www.alifbeekids.com/en) (international Arabic-learning benchmark) | Provider states lessons use native Arabic narrators and deliberate repetition | Human-validated understandable Modern Standard Arabic with repeated words, not rushed robotic imitation |
| [Qatar National Library I Read Arabic](https://www.qnl.qa/en/children-and-teens/children/online-resources) | Graded reading material and interactive Arabic learning | Consult grade-appropriate reading frameworks without copying protected media |

**Important:** These are documented techniques and product descriptions, not a ranking from our own listening tests of competitor voice quality.

## Measurements from OUR actual recordings

The GitHub-generated [AUDIO_TECHNICAL_AUDIT.md](AUDIO_TECHNICAL_AUDIT.md) examines fourteen real samples using ffprobe and ffmpeg.

- Every inspected sample uses MP3, 1 channel (mono), 22.05 kHz; bitrate approximately 65–78 kbps.
- Arabic female word قطة lasts 0.42 seconds; Arabic male word is 0.55 seconds.
- Arabic female phrase أستطيع القراءة lasts 0.97 seconds; the male version lasts 1.96 seconds.
- Female baseline trials A/B are also very short. Newly prepared C/D clips add quieter audio and 0.10-second leading plus 0.18-second trailing silence; their total lengths are 0.71 and 0.73 seconds. This added padding should not be confused with reliably slower word articulation.
- Peaks are around 0 dBFS, leaving very little headroom. Measured average levels vary between clips.
- Short clips can display 0:00 before/after loading, depending on rounding. Audio not loading is a separate possible issue.
- Sample rate and bitrate alone do not prove clear pronunciation or a convincing child voice.

## Proposed release standards (OUR targets, not rival app specifications)

1. A fluent Arabic educator should pronounce/review Modern Standard Arabic words with correct hamza, emphatic sounds, short and long vowels, diacritics and endings. For young Arabic learners, prioritize comprehension over the impression of “child voice.”
2. A trained English phonics teacher must review every isolated phoneme, digraph, blending demonstration and early word. Avoid adding a schwa/“uh” after a consonant.
3. Use individually recognizable voice identities. A filename or a pitch-shift is not evidence that the recording sounds female, male, or like a genuine child.
4. Test at least ten unfamiliar audio examples without showing their answers. Use parents and educators and, with informed supervision/consent, children. Aim for at least 90% clearly identified basic words as a practical project acceptance target.
5. Aim for comfortable and fairly consistent volume with sufficient peak headroom (e.g. around -3 dBFS), short consistent pauses and no high-pitch time-stretch artifacts. This is a recommendation, not a claim about competitors.
6. Mobile test on Android Chrome, iOS Safari and Windows, checking actual playback and an understandable error for network failures.
7. Keep the comparatively clearer Arabic **male** reference until an Arabic female recording is approved by fluent reviewers.
8. Trial more careful Arabic female word delivery with neural synthesis and a quieter level, without shifting pitch. Note the new samples primarily have added padding; they have not yet demonstrated better intelligibility. New A/B/C/D trials remain unapproved; never silently replace the main lessons.
9. Preserve the prototype's QAR 0 approach: no paid TTS API, no child microphone recordings or tracking, and host approved short clips locally with the app.
10. If an authentic child narrator is essential, obtain original recordings with guardian consent, performer permission, safeguarding and explicit usage rights. Copying audio from Lamsa, Nahla wa Nahil or other apps is not authorized by their public availability.

## Important lesson design gap

The current Reading Adventure practices **English word-building** with letter tiles c-a-t / f-i-sh / s-u-n / b-u-s, whole-word listening, pictures and stars. It does **not** yet supply human-verified isolated phoneme recordings. For proper English phonics, children should hear individual sounds and modelled blends; Arabic “قطة” is a translation, not the sound of English c-a-t.

## Current delivery

- Live website: https://rahman1388.github.io/little-learners-academy/
- Original Reading Adventure: https://rahman1388.github.io/little-learners-academy/phonics-adventure.html
- Comparison listening page: https://rahman1388.github.io/little-learners-academy/voice-test.html#voiceAuditions
- Open Grade 1 voice quality review: https://github.com/Rahman1388/little-learners-academy/issues/3
- Real mobile UI test and MP3-format audit are automated via GitHub Actions, but **not** equivalent to a human pronunciation study.

**Conclusion:** Existing MP3 encoding is widely compatible with phones. The urgent gaps are rushed and unclear synthesized Arabic female articulation, inconsistent levels, misleading voice labels, and missing educator-reviewed English phoneme audio. No competitor's source file format has been directly measured.
