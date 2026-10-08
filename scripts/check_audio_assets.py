"""Check local lesson MP3 coverage and basic technical audio integrity.

This does NOT judge intelligibility or dialect accuracy; human listening is
required for educational release.
"""
import hashlib
import json
import pathlib
import shutil
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent

curriculum = subprocess.check_output(
    ["node", "-e",
     "global.window={};require('./curriculum.js');"
     "process.stdout.write(JSON.stringify(window.LLA_CURRICULUM.subjects))"],
    cwd=ROOT,
    text=True
)
subjects = json.loads(curriculum)
missing = []
count = 0

for subject in subjects:
    for lesson in subject["lessons"]:
        for index, _item in enumerate(lesson["items"]):
            for language in ("en", "ar"):
                clips = []
                for kind in ("girl", "boy"):
                    clip = ROOT / "audio" / language / f"{lesson['id']}-{index}-{kind}.mp3"
                    if not clip.is_file() or clip.stat().st_size < 700:
                        missing.append(str(clip.relative_to(ROOT)))
                    else:
                        clips.append(clip)
                        count += 1
                if len(clips) == 2:
                    if hashlib.sha256(clips[0].read_bytes()).digest() == hashlib.sha256(clips[1].read_bytes()).digest():
                        raise ValueError(f"Voice profiles unexpectedly identical: {clips[0]} / {clips[1]}")

if missing:
    raise FileNotFoundError("Missing or empty audio clips:\n" + "\n".join(missing))

if shutil.which("ffprobe") is None:
    raise RuntimeError("ffprobe is required to verify audio file format")

for language, lesson, index in (
    ("en", "phonics", 0),
    ("en", "sentences", 0),
    ("ar", "phonics", 0),
    ("ar", "sentences", 0),
):
    for kind in ("girl", "boy"):
        path = ROOT / "audio" / language / f"{lesson}-{index}-{kind}.mp3"
        info = subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries",
             "format=duration:stream=codec_name,sample_rate",
             "-of", "json", str(path)], text=True
        )
        meta = json.loads(info)
        duration = float(meta["format"]["duration"])
        streams = meta.get("streams", [])
        if not (0.22 <= duration <= 20):
            raise ValueError(f"Unexpected clip duration {duration}: {path}")
        if not streams or streams[0].get("codec_name") != "mp3":
            raise ValueError(f"Invalid MP3 stream in {path}")

print(f"Verified {count} MP3 files; 8 sample recordings decoded as valid MP3. Human language review still required.")
