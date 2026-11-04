# English and Arabic audio: educator review handoff (4 November 2026)

**Status:** review-only, not approved audio. This process creates a reproducible listening checklist from the original 208 synthetic MP3 files (52 Grade 1 lesson items × English/Arabic × girl-style/boy-style candidate). It does **not** alter student playback, the 44 three-repeat copies, approved C/D *bus* listening trials, or any of the 475 published questions.

## Why this matters

The user has reported unclear synthetic word pronunciation, particularly **red / أَحْمَر**, **yellow / أَصْفَر** and Arabic **شمس**; some source recordings are very short. A technically decodable audio file might still be difficult for children. Words are **not** the same as isolated phonemes. We need separate qualified native English phonics and fluent Modern Standard Arabic educator review, with attention to Qatari classroom suitability.

## Reproducible checklist

When the “Validate app” workflow runs on this branch, the build_pronunciation_review_pack.py tool:

1. Reads the 52 source lesson items directly from curriculum.js, avoiding a manually typed/inconsistent word list.
2. Inspects **all 208 original synthetic English/Arabic voice candidates** with ffprobe; records exact SHA-256, duration and sample rate in a UTF-8 CSV.
3. Labels all candidates **PENDING** and annotates a P1 queue for parent-reported colour words, Arabic **شمس** and all early-reading phonics items. Other words remain P2.
4. Flags clips shorter than 0.65 seconds for *extra listening attention*, not automatic linguistic rejection. Audible beginnings/endings, pronunciation, accent and comprehension cannot be judged by file metadata.
5. Attaches the resulting **educator-listening-checklist.csv**, **summary.json** and **README.txt** as the grade1-bilingual-educator-audio-checklist GitHub Actions artifact.

Reviewer actions after downloading the workflow artifact:

- Match each relative_audio_path to the existing file in this exact GitHub commit. The SHA-256 detects later replacements.
- Listen to the exact file on an iPhone and an Android tablet/phone at normal speaker volume, preferably without headphones too.
- For each English item, have a trained native English phonics educator judge word identity, correct grapheme–phoneme correspondence if relevant, clarity and age-appropriate pace. **Do not accept a whole-word recording as an isolated phoneme demonstration.**
- For each Arabic item, have a qualified fluent educator judge the word, correct formal Arabic vowels/diacritics, understandable classroom phrasing and clear pronunciation. A second independent listener is preferable.
- Fill the educator columns in a **private reviewer copy**. Record unsure/re-record cases for follow-up. Do not put child names, recordings or identifiable family information in the CSV.
- A checked box does **not** switch on audio. Exact-file approval, rights/licensing, independent educator signoff, real-device replay and separate release review are required before changing student playback.

## Non-goals / safety

This artifact has no student data, recordings beyond the already public repo files, accounts, tracking, new pronunciation output, voice cloning, third-party audio API, or claims of native-speaker validation. It is a listening *workflow*, not proof that a recording teaches language well. Release remains gated on the existing PRONUNCIATION_RELEASE_STANDARD.md process and app owner approval.

To reproduce locally (Node, Python 3.9+, ffprobe needed):

python3 scripts/build_pronunciation_review_pack.py

python3 scripts/test_pronunciation_review_pack.py

Review and export the generated CSV from build/pronunciation-review/. Do **not** commit reviewer-filled copies containing personal data.
