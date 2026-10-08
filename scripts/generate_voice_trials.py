"""Build short, natural-pitch voice auditions for the children's learning app.

These are candidate *synthetic* voices and pronunciation settings for parent/
teacher review, NOT child recordings. No production MP3s are overwritten.

Girls' Arabic alternatives: identical native-pitch female voice, compare text
with/without short vowel diacritics before replacing anything.
English alternatives: two distinct available Piper speakers, British female
and American male. They are adult synthetic speakers until human review.
"""
from __future__ import annotations

import json
import re
import subprocess
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio" / "trials"
MODEL_AR = Path("/tmp/lla-voice-trials/arabic-emirati-female-model.onnx")
MODEL_EN_GIRL = Path("/tmp/lla-voice-trials/en_GB-alba-medium.onnx")
MODEL_EN_BOY = Path("/tmp/lla-voice-trials/en_US-bryce-medium.onnx")
ARABIC_MARKS = re.compile(r"[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]")

def make_file(voice, phrase: str, output: Path, settings: SynthesisConfig) -> None:
    if not phrase.strip():
        raise ValueError("Empty pronunciation trial")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav") as temporary:
        with wave.open(temporary.name, "wb") as wav:
            voice.synthesize_wav(phrase, wav, syn_config=settings)
        subprocess.run([
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-i", temporary.name, "-ac", "1",
            "-codec:a", "libmp3lame", "-q:a", "2", str(output),
        ], check=True, timeout=45)
    if output.stat().st_size < 700:
        raise ValueError(f"Audio missing or too small: {output}")

def main() -> None:
    if not MODEL_AR.exists() or not MODEL_EN_GIRL.exists() or not MODEL_EN_BOY.exists():
        raise FileNotFoundError("One or more voice models missing")
    source = json.loads((ROOT / "audio" / "ar" / "source.json").read_text(encoding="utf-8"))
    arabic = PiperVoice.load(str(MODEL_AR))
    en_girl = PiperVoice.load(str(MODEL_EN_GIRL))
    en_boy = PiperVoice.load(str(MODEL_EN_BOY))
    ar_settings = SynthesisConfig(length_scale=1.0, noise_scale=0.667, noise_w_scale=0.8)
    en_settings = SynthesisConfig(length_scale=1.0, noise_scale=0.667, noise_w_scale=0.8)
    count = 0

    for lesson, index_list in (("phonics", range(4)), ("sentences", [0])):
        for i in index_list:
            text = source[lesson][i]["text"]
            # Keep both alternatives available for comparison; no pitch changes.
            for variant, speech in (
                ("natural", ARABIC_MARKS.sub("", text)),
                ("vowelled", text),
            ):
                path = OUT / f"ar-{lesson}-{i}-female-{variant}.mp3"
                make_file(arabic, speech, path, ar_settings)
                count += 1

    english_phonics = ["cat", "fish", "sun", "bus"]
    english_sentences = ["I can read."]
    for lesson, values in (("phonics", english_phonics), ("sentences", english_sentences)):
        for i, text in enumerate(values):
            for kind, voice in (("alba", en_girl), ("bryce", en_boy)):
                path = OUT / f"en-{lesson}-{i}-{kind}.mp3"
                make_file(voice, text, path, en_settings)
                count += 1

    print(f"Generated {count} natural-speed demo clips for review. Production files unchanged.")

if __name__ == "__main__":
    main()
