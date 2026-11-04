#!/usr/bin/env python3
"""Produce a reproducible adult educator listening checklist for ALL original Grade 1 clips.

Technical facts (file existence, SHA-256, codec and duration) are machine-checked;
pronunciation, intelligibility, accent and phonics remain PENDING until human review.
No student information, teacher ratings or approval decisions are generated.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import pathlib
import subprocess
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
HEADERS = [
    "lesson", "item_number", "english_word_or_phrase", "arabic_word_or_phrase",
    "language", "speaker_style", "relative_audio_path", "sha256",
    "duration_seconds", "sample_rate_hz", "technical_attention",
    "listening_priority", "priority_reason", "human_review_status",
    "educator_word_correct", "educator_language_natural",
    "educator_sound_clear_on_phone", "educator_phonics_correct_if_applicable",
    "educator_notes"
]


def curriculum_subjects():
    js = (
        "global.window={};require('./curriculum.js');"
        "process.stdout.write(JSON.stringify(window.LLA_CURRICULUM.subjects))"
    )
    out = subprocess.check_output(["node", "-e", js], cwd=ROOT, text=True, timeout=20)
    return json.loads(out)


def mp3_details(file_path):
    raw = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration:stream=codec_name,sample_rate",
        "-of", "json", str(file_path)
    ], text=True, timeout=15)
    info = json.loads(raw)
    audio = next((s for s in info.get("streams", [])
                  if s.get("codec_name") == "mp3"), None)
    if audio is None:
        raise ValueError(f"Not a decodable MP3: {file_path}")
    duration = float(info["format"]["duration"])
    rate = int(audio["sample_rate"])
    if not (0.17 <= duration <= 60):
        raise ValueError(f"Unexpected recording duration: {file_path} ({duration})")
    if rate < 16000:
        raise ValueError(f"Low sample rate needs repair: {file_path} ({rate})")
    return duration, rate


def priority(lesson_id, index, lang, arabic_text):
    reasons = []
    if lesson_id == "patterns" and index in (0, 1):
        reasons.append("Previously reported unclear colour word; student audio restricted")
    if lesson_id == "phonics":
        reasons.append("High-impact early-reading word; verify phonemes separately")
    if lang == "ar" and arabic_text.strip() == "شمس":
        reasons.append("Previously reported unclear Arabic word شمس; student audio restricted")
    return ("P1" if reasons else "P2"), "; ".join(reasons) or "Routine educator review required"


def build(outdir):
    subjects = curriculum_subjects()
    rows = []
    for subject in subjects:
        for lesson in subject["lessons"]:
            for index, item in enumerate(lesson["items"]):
                if len(item) < 3:
                    raise ValueError(f"Missing bilingual item in {lesson['id']}")
                for lang in ("en", "ar"):
                    for voice in ("girl", "boy"):
                        rel = f"audio/{lang}/{lesson['id']}-{index}-{voice}.mp3"
                        file_path = ROOT / rel
                        if not file_path.is_file() or file_path.stat().st_size < 700:
                            raise FileNotFoundError(f"Missing, short or empty file: {rel}")
                        duration, rate = mp3_details(file_path)
                        tier, reason = priority(lesson["id"], index, lang, str(item[2]))
                        rows.append({
                            "lesson": lesson["id"],
                            "item_number": index + 1,
                            "english_word_or_phrase": str(item[1]),
                            "arabic_word_or_phrase": str(item[2]),
                            "language": lang,
                            "speaker_style": voice + "-style synthetic candidate",
                            "relative_audio_path": rel,
                            "sha256": hashlib.sha256(file_path.read_bytes()).hexdigest(),
                            "duration_seconds": f"{duration:.3f}",
                            "sample_rate_hz": rate,
                            "technical_attention": "REVIEW_SHORT_CLIP" if duration < 0.65 else "no_duration_flag",
                            "listening_priority": tier,
                            "priority_reason": reason,
                            "human_review_status": "PENDING",
                            "educator_word_correct": "",
                            "educator_language_natural": "",
                            "educator_sound_clear_on_phone": "",
                            "educator_phonics_correct_if_applicable": "",
                            "educator_notes": ""
                        })

    keys = [(r["relative_audio_path"], r["sha256"]) for r in rows]
    if len(rows) != 208 or len(set(x[0] for x in keys)) != 208:
        raise ValueError(f"Expected exactly 208 unique original Grade 1 recordings, got {len(rows)}")
    outdir.mkdir(parents=True, exist_ok=True)
    csv_path = outdir / "educator-listening-checklist.csv"
    with csv_path.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=HEADERS)
        writer.writeheader()
        writer.writerows(rows)

    by_lang = Counter(r["language"] for r in rows)
    by_priority = Counter(r["listening_priority"] for r in rows)
    short = sum(r["technical_attention"] == "REVIEW_SHORT_CLIP" for r in rows)
    summary = {
        "recording_count": len(rows),
        "unique_lesson_items": len(rows) // 4,
        "by_language": dict(sorted(by_lang.items())),
        "high_priority_review_clips": by_priority["P1"],
        "short_duration_review_clips": short,
        "approved_recordings": 0,
        "human_review_required": True,
        "scope": "Original synthetic Grade 1 whole-word/phrase files only; excludes 44 practice copies and bus C/D alternatives",
        "limitations": "Technical decoding/length/hash cannot confirm native pronunciation, phoneme accuracy or audibility to a child."
    }
    (outdir / "summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (outdir / "README.txt").write_text(
        "LITTLE LEARNERS ACADEMY — PRIVATE ADULT EDUCATOR CHECKLIST TEMPLATE\n\n"
        "Every row is PENDING, not approved. No student data is included.\n"
        "SHA-256 identifies the exact candidate MP3. Review the matching file on a real iPhone and Android tablet.\n"
        "First review P1 rows (previously unclear colours, Arabic شمس, and key early-reading words).\n"
        "Check word correctness, native/standard pronunciation, audio clarity, and isolated phonemes where applicable.\n"
        "For phonics, speaking a whole word is NOT a substitute for a teacher-reviewed phoneme or blending recording.\n"
        "Fill the educator fields on your own copy and share only with authorized project adults.\n"
        "Do not enter child names, child recordings, private health details, or sensitive information.\n"
        "No checklist status automatically changes the child app or approves a voice for release.\n",
        encoding="utf-8"
    )
    print(f"Checklist ready: {len(rows)} original MP3s; {by_priority['P1']} P1 priority clips; "
          f"{short} short clips flagged; 0 educator-approved.")
    return summary


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="build/pronunciation-review",
                        help="Output folder, under working tree")
    args = parser.parse_args()
    output = (ROOT / args.out).resolve()
    if not output.is_relative_to(ROOT):
        parser.error("Output must stay within the repository worktree")
    build(output)


if __name__ == "__main__":
    main()
