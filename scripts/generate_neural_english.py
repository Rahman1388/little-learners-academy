"""Generate clean British English lesson audio, without artificial pitch effects.

Cori is a synthetic female speaker and Alan a synthetic male speaker.
They are NOT recordings of children. Preserve natural formants and pitch.
"""

from __future__ import annotations

import json
import subprocess
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio" / "en"
MODEL_FOLDER = Path("/tmp/lla-english-voices")

SPEAKERS = {
    "girl": "en_GB-cori-medium",
    "boy": "en_GB-alan-medium",
}


def load_lesson_words() -> list[tuple[str, int, str]]:
    js = (
        "global.window={};"
        "require('./curriculum.js');"
        "const list=[];"
        "for(const s of window.LLA_CURRICULUM.subjects)"
        "for(const l of s.lessons)"
        "for(let i=0;i<l.items.length;i++)"
        "list.push([l.id,i,l.items[i][1]]);"
        "process.stdout.write(JSON.stringify(list));"
    )
    result = subprocess.run(
        ["node", "-e", js], cwd=ROOT, text=True, capture_output=True, check=True
    )
    result_data = json.loads(result.stdout)
    if not result_data:
        raise RuntimeError("No curriculum words found")
    return [(lesson, int(index), text) for lesson, index, text in result_data]


def encode_clean_mp3(source_wav: Path, output: Path) -> None:
    # No pitch shifting, equalizer, time-stretching or aggressive loudness filters.
    # Preserve the model's native sample rate and original pronunciation.
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
        raise ValueError(f"Empty or truncated recording: {output}")


def main() -> None:
    words = load_lesson_words()
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    with tempfile.TemporaryDirectory() as tmp:
        wav_path = Path(tmp) / "word.wav"
        for kind, model_name in SPEAKERS.items():
            model_path = MODEL_FOLDER / f"{model_name}.onnx"
            if not model_path.is_file():
                raise FileNotFoundError(f"Missing model: {model_path}")
            voice = PiperVoice.load(str(model_path))
            settings = SynthesisConfig(
                length_scale=1.07, noise_scale=0.667, noise_w_scale=0.8, volume=1.0
            )
            for lesson, index, text in words:
                with wave.open(str(wav_path), "wb") as wav:
                    voice.synthesize_wav(text, wav, syn_config=settings)
                output = OUT / f"{lesson}-{index}-{kind}.mp3"
                encode_clean_mp3(wav_path, output)
                total += 1
    print(f"Generated {total} clear, unpitched English lesson recordings.")


if __name__ == "__main__":
    main()
