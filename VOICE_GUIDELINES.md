# Audio quality and voice personalisation

## Current listening experience
- Every active lesson shows a choice of **Girl-style** or **Boy-style** voice and two playable previews, one English and one Arabic.
- The selected style and **Slow & clear** preference are stored only in the browser.
- Audio is pre-generated into local `audio/en/` and `audio/ar/` MP3 files; the child-facing site does not contact a speech API.
- Where an MP3 is unavailable, the browser's speech synthesizer is a fallback.
- These voices are **synthetic youthful-style narrations**, not recordings of real children. Never market them as actual child speakers or a voice clone.

## Free speech technology
- English uses separate British English neural models from Piper: female `en_GB-cori-medium` and male `en_GB-alan-medium`.
- Arabic uses Piper `ar_JO-kareem-medium` with two subtly different youth-oriented acoustic treatments. **The Arabic voice styles share the same underlying speaker**, and differ in tone/pitch rather than speaker identity.
- Piper project/models: https://huggingface.co/rhasspy/piper-voices
- Individual model cards:
  - https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_GB/cori/medium/MODEL_CARD
  - https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_GB/alan/medium/MODEL_CARD
  - https://huggingface.co/rhasspy/piper-voices/blob/main/ar/ar_JO/kareem/medium/MODEL_CARD
- Model downloads happen only in the temporary GitHub Actions runner; weights are not distributed with the child-facing app.

## Quality and publication checks
- Before commercial launch: review all model and original-training-data licensing, credits, voice rights and any restrictions. Repository-level licence labels alone do not establish every training dataset's rights.
- Have an Arabic-language specialist check clear Modern Standard Arabic words, pronunciation, short vowel marks and the fit for Qatar-based families.
- Have an early-reading teacher verify British phonics sounds, segmentation, blending and consonant pronunciation. Speaking `cat` is **word narration**, not by itself an assessment of phoneme blending.
- Verify the previews with families on Windows Chrome, iOS Safari and Android Chrome, including audio controls, clarity and speaker switching.
- If genuine child voices are later required, obtain professionally recorded material with appropriate guardian permission, performer consent, licensed usage, secure handling and safeguarding. Do not copy or imitate a specific real child's voice without authorization.

## No-cost principle
The current prototype has no paid voice API, child account, voice cloning, advertisements or payment flow. Models and package dependencies still need review if commercial plans change.
