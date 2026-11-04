#!/usr/bin/env python3
"""Validate the machine-generated educator review worksheet without treating it as approval."""
from __future__ import annotations

import csv
import hashlib
import json
import pathlib
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "build" / "pronunciation-review"
with (OUT / "educator-listening-checklist.csv").open(encoding="utf-8-sig", newline="") as fh:
    rows = list(csv.DictReader(fh))
summary = json.loads((OUT / "summary.json").read_text(encoding="utf-8"))

assert len(rows) == 208, f"Expected 208 original recordings, found {len(rows)}"
assert len({r["relative_audio_path"] for r in rows}) == 208, "Duplicate audio paths"
assert Counter(r["language"] for r in rows) == {"en": 104, "ar": 104}
assert Counter(r["speaker_style"] for r in rows) == {
    "girl-style synthetic candidate": 104,
    "boy-style synthetic candidate": 104
}
assert len({(r["lesson"], r["item_number"]) for r in rows}) == 52
assert all(r["human_review_status"] == "PENDING" for r in rows), "No recordings should be auto-approved"
assert all(not r["educator_word_correct"] and not r["educator_notes"] for r in rows), "Review must start blank"
assert summary["approved_recordings"] == 0 and summary["human_review_required"] is True
assert summary["recording_count"] == 208 and summary["unique_lesson_items"] == 52
assert summary["high_priority_review_clips"] >= 24, "Previously unclear and phonics clips must be prioritised"
assert any(r["listening_priority"] == "P1" and r["english_word_or_phrase"] == "red" for r in rows)
assert any(r["listening_priority"] == "P1" and r["english_word_or_phrase"] == "yellow" for r in rows)
assert any(r["listening_priority"] == "P1" and r["arabic_word_or_phrase"] == "شمس" for r in rows)
for row in rows:
    rel = row["relative_audio_path"]
    assert rel.startswith("audio/") and ".." not in rel and rel.endswith(".mp3"), rel
    actual = ROOT / rel
    assert actual.exists() and actual.is_file(), rel
    assert row["sha256"] == hashlib.sha256(actual.read_bytes()).hexdigest(), "File changed since checklist: " + rel
    assert 0.17 <= float(row["duration_seconds"]) <= 60
    assert int(row["sample_rate_hz"]) >= 16000

print("PASS: 208 distinct original MP3s, bilingual balance, file hashes, P1 review list and zero false approvals.")
