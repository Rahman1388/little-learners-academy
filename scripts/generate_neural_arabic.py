"""Generate clear, unaltered Arabic audio with two different speaker models.

Girl profile: synthetic female Gulf/Emirati speaker.
Boy profile: synthetic male Jordanian Arabic speaker.

These are NOT children or voice-clones. Words are drafted in Arabic with
tashkeel but must be checked by an Arabic-language reviewer before release.
"""

from __future__ import annotations

import json
import subprocess
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "audio" / "ar" / "source.json"
OUT = ROOT / "audio" / "ar"
MODEL_FOLDER = Path("/tmp/lla-neural-voice")
SPEAKERS = {
    "girl": "arabic-emirati-female-model",
    "boy": "ar_JO-kareem-medium",
}


def encode_clean_mp3(source_wav: Path, output: Path) -> None:
    # Preserve pronunciation, natural pitch/formants, articulation and timbre.
    # Avoid the prior asetrate + atempo processing that distorted young voices.
    subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(source_wav),
            "-ac", "1", "-codec:a", "libmp3lame", "-q:a", "2",
            str(output),
        ],
        check=True, timeout=45,
    )
    if output.stat().st_size < 700:
        raise ValueError(f"Arabic recording is empty or truncated: {output}")


def generate() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    with tempfile.TemporaryDirectory() as tmp:
        wav_path = Path(tmp) / "sample.wav"
        for style, model_name in SPEAKERS.items():
            model_path = MODEL_FOLDER / f"{model_name}.onnx"
            if not model_path.is_file():
                raise FileNotFoundError(f"Missing Arabic voice model: {model_path}")
            voice = PiperVoice.load(str(model_path))
            config = SynthesisConfig(
                length_scale=1.08, noise_scale=0.667, noise_w_scale=0.8, volume=1.0
            )
            for lesson, items in source.items():
                for item in items:
                    text = item["text"].strip()
                    if not text:
                        raise ValueError(f"Empty Arabic word: {lesson}/{item['id']}")
                    with wave.open(str(wav_path), "wb") as wav:
                        voice.synthesize_wav(text, wav, syn_config=config)
                    output = OUT / f"{lesson}-{item['id']}-{style}.mp3"
                    encode_clean_mp3(wav_path, output)
                    total += 1

    print(f"Generated {total} natural-pitch Arabic recordings in two distinct speaker profiles.")


if __name__ == "__main__":
    generate()
