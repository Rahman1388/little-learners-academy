"""Generate original Arabic lesson recordings with a free offline neural TTS model.

This replaces the low-fidelity espeak-ng-only audio generator.
The two profiles are synthesized voice styles, NOT recordings of children.
Before commercial distribution, re-check model/dataset licensing and Arabic
pronunciation with an appropriate language specialist.

Voice: rhasspy/piper-voices ar_JO-kareem-medium (MIT repository; see MODEL_CARD).
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
MODEL = Path("/tmp/lla-neural-voice/ar_JO-kareem-medium.onnx")
CONFIG = SynthesisConfig(
    length_scale=1.13,
    noise_scale=0.56,
    noise_w_scale=0.64,
    volume=1.0,
)

def generate() -> None:
    if not MODEL.is_file():
        raise FileNotFoundError(f"Arabic neural voice model not downloaded: {MODEL}")
    voices = PiperVoice.load(str(MODEL))
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    total = 0
    with tempfile.TemporaryDirectory() as tmp:
        source_wav = Path(tmp) / "source.wav"
        for lesson, items in source.items():
            for item in items:
                text = item["text"]
                if not text.strip():
                    raise ValueError(f"Empty speech text: {lesson}/{item['id']}")
                with wave.open(str(source_wav), "wb") as wav:
                    voices.synthesize_wav(text, wav, syn_config=CONFIG)
                # Keep the original pronunciation/phonemes. Shift whole voice
                # tone lightly to create two clearly distinguishable profiles.
                for label, ratio in (("girl", 1.21), ("boy", 1.08)):
                    output = OUT / f"{lesson}-{item['id']}-{label}.mp3"
                    command = [
                        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                        "-i", str(source_wav),
                        "-af",
                        f"asetrate=22050*{ratio},aresample=22050,atempo={1/ratio:.4f},"
                        "highpass=f=80,lowpass=f=9500,loudnorm=I=-19:TP=-1.6:LRA=11",
                        "-codec:a", "libmp3lame", "-q:a", "3",
                        str(output),
                    ]
                    subprocess.run(command, check=True, timeout=45)
                    if output.stat().st_size < 512:
                        raise ValueError(f"Audio too short or empty: {output}")
                    total += 1

    print(f"Generated {total} Arabic MP3s in two selectable voice styles.")


if __name__ == "__main__":
    generate()
