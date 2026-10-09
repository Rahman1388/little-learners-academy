"""Make longer replay-friendly MP3s without changing original speech models.

Each practice sample repeats the exact source recording three times with
separate 0.8-second pauses. It does NOT alter phonemes, speaker pitch, or
prove that a word is intelligible; pedagogical approval is still required.

Practice copies live in audio/practice; original files are never overwritten.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio" / "practice"
PAUSE_SECONDS = 0.80

def source_list() -> list[tuple[str, Path]]:
    samples: list[tuple[str, Path]] = []
    for lang in ("en", "ar"):
        for gender in ("girl", "boy"):
            samples.append((
                f"{lang}-sentences-0-{gender}",
                ROOT / "audio" / lang / f"sentences-0-{gender}.mp3"
            ))
            for index in range(4):
                samples.append((
                    f"{lang}-phonics-{index}-{gender}",
                    ROOT / "audio" / lang / f"phonics-{index}-{gender}.mp3"
                ))
    for index in range(4):
        for voice in ("female-natural", "female-vowelled", "female-calm", "female-careful"):
            samples.append((
                f"ar-phonics-{index}-{voice}",
                ROOT / "audio" / "trials" / f"ar-phonics-{index}-{voice}.mp3"
            ))
        for voice in ("alba", "bryce"):
            samples.append((
                f"en-phonics-{index}-{voice}",
                ROOT / "audio" / "trials" / f"en-phonics-{index}-{voice}.mp3"
            ))
    return samples

def metadata(path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True, check=True, timeout=15
    )
    return float(result.stdout.strip())

def make_practice(source: Path, target: Path) -> tuple[float, float]:
    if not source.is_file() or source.stat().st_size < 700:
        raise FileNotFoundError(f"Source sample missing or empty: {source}")
    original_duration = metadata(source)
    if original_duration <= 0.15:
        raise ValueError(f"Source is unexpectedly short: {source}")
    # asplit creates identical copies of the original. Pausing rather than
    # pitch-shifting avoids further changing unintelligible phonemes.
    # The MP3 files remain mono at the original model's sample rate.
    filtergraph = (
        "[0:a]asplit=3[a][b][c];"
        f"[a]apad=pad_dur={PAUSE_SECONDS:.2f}[first];"
        f"[b]apad=pad_dur={PAUSE_SECONDS:.2f}[second];"
        "[first][second][c]concat=n=3:v=0:a=1,"
        "volume=-2.5dB[out]"
    )
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
         "-i", str(source), "-filter_complex", filtergraph,
         "-map", "[out]", "-ac", "1", "-c:a", "libmp3lame", "-q:a", "2",
         str(target)],
        check=True, timeout=60,
    )
    total_duration = metadata(target)
    # MP3 frame boundaries and encoder delay introduce small duration shifts.
    # Require clearly three repetitions + pauses, with reasonable tolerance.
    min_duration = original_duration * 2.70 + 2 * PAUSE_SECONDS - 0.18
    if total_duration < max(2.10, min_duration):
        raise ValueError(
            f"Practice recording is too short: {target}, "
            f"{total_duration:.2f}s vs expected {min_duration:.2f}s"
        )
    return original_duration, total_duration

def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    cases = source_list()
    if len(cases) != 44:
        raise RuntimeError(f"Expected 44 cases, got {len(cases)}")
    results = []
    for stem, source in cases:
        target = OUT / (stem + ".mp3")
        short, long = make_practice(source, target)
        results.append({"name": stem, "original_seconds": round(short, 3),
                        "practice_seconds": round(long, 3)})
    (OUT / "manifest.json").write_text(
        json.dumps({"description": "Original recording repeated 3 times with short pauses; not new phoneme audio.",
                    "clips": results}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Created {len(cases)} replay-friendly recordings. Original voices unchanged.")
    for item in results[:8]:
        print(f" {item['name']}: {item['original_seconds']:.2f}s -> {item['practice_seconds']:.2f}s")

if __name__ == "__main__":
    main()
