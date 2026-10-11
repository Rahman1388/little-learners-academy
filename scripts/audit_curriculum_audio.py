"""Objective coverage/length check of all Grade 1 original lesson audio.
This does not certify pronunciation, accent, speaker identity or intelligibility.
It writes the GitHub Actions Step Summary (not a public quality approval).
"""
from __future__ import annotations
import json
import os
import pathlib
import subprocess
from collections import defaultdict

ROOT=pathlib.Path(__file__).resolve().parent.parent
curriculum=json.loads(subprocess.check_output([
  "node","-e","global.window={};require('./curriculum.js');process.stdout.write(JSON.stringify(window.LLA_CURRICULUM.subjects))"
],cwd=ROOT,text=True))
rows=[]
for subject in curriculum:
  for lesson in subject["lessons"]:
    for index,item in enumerate(lesson["items"]):
      for lang in ("en","ar"):
        for kind in ("girl","boy"):
          path=ROOT/"audio"/lang/f"{lesson['id']}-{index}-{kind}.mp3"
          if not path.is_file():
            raise FileNotFoundError(str(path))
          data=json.loads(subprocess.check_output([
            "ffprobe","-v","error","-show_entries","format=duration:stream=codec_name,sample_rate",
            "-of","json",str(path)],text=True,timeout=20))
          audio=next((s for s in data.get("streams",[]) if s.get("codec_name")=="mp3"),None)
          if not audio:raise ValueError(f"Invalid MP3: {path}")
          duration=float(data["format"]["duration"])
          if duration<0.17 or duration>60:
            raise ValueError(f"Suspicious duration {duration}s: {path}")
          rows.append(dict(subject=subject["title"],lesson=lesson["id"],index=index,
            word=item[1],lang=lang,voice=kind,duration=duration,
            sample_rate=int(audio["sample_rate"]),path=str(path.relative_to(ROOT))))
if len(rows)!=208:
  raise AssertionError(f"Expected 208 original clips for 52 items, found {len(rows)}")
short=[r for r in rows if r["duration"]<0.65]
print(f"Found {len(rows)} decodable original curriculum MP3s for {len(rows)//4} lesson items")
print(f"{len(short)} clips are under 0.65 seconds; an extremely short word may be hard to hear on a phone.")
print("DO NOT treat this technical audit as proof of native pronunciation or clarity.")
for r in rows:
  if r["lesson"]=="patterns" and r["index"]<2:
    print(f"Colour source {r['word']:>6} {r['lang']} {r['voice']}: {r['duration']:.3f}s, {r['sample_rate']} Hz")
if short:
  print("Short samples by voice:",dict((f"{lang}-{style}",sum(r["lang"]==lang and r["voice"]==style for r in short))
    for lang in ("en","ar") for style in ("girl","boy")))
summary=os.environ.get("GITHUB_STEP_SUMMARY")
if summary:
  lines=[
    "## Full lesson audio inventory (technical only)",
    "",
    f"**{len(rows)}** MP3 files across **{len(rows)//4}** lesson items in English and Arabic, female- and male-style.",
    f"**{len(short)}** recordings are shorter than 0.65 seconds (review for comprehensibility on iPhone and tablet).",
    "**None of these recordings is approved by this test for native pronunciation or phonics.**",
    "",
    "| Spoken item | Language | Voice | Original length (s) |",
    "|---|---|---|---:|"]
  for row in rows:
    if row["lesson"]=="patterns" and row["index"] in (0,1):
      lines.append(f"| {row['word']} | {row['lang']} | {row['voice']} | {row['duration']:.3f} |")
  with open(summary,"a",encoding="utf-8") as fh:fh.write("\n".join(lines)+"\n\n")
