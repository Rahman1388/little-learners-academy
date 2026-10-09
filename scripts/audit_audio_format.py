"""Measure actual Little Learners Academy audio file properties objectively.

Reports codec, sample rate, duration, bitrate, leading/trailing silence and
measured level for English/Arabic comparison. This is NOT human quality review.
The script makes no claim about speaker age/gender or audio from competitors.
"""
from __future__ import annotations
import datetime as dt
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "AUDIO_TECHNICAL_AUDIT.md"

CASES = [
 ("English female word", "audio/en/phonics-0-girl.mp3"),
 ("English male word", "audio/en/phonics-0-boy.mp3"),
 ("English female sentence", "audio/en/sentences-0-girl.mp3"),
 ("English male sentence", "audio/en/sentences-0-boy.mp3"),
 ("Arabic female word", "audio/ar/phonics-0-girl.mp3"),
 ("Arabic male word", "audio/ar/phonics-0-boy.mp3"),
 ("Arabic female sentence", "audio/ar/sentences-0-girl.mp3"),
 ("Arabic male sentence", "audio/ar/sentences-0-boy.mp3"),
 ("Arabic female trial A", "audio/trials/ar-phonics-0-female-natural.mp3"),
 ("Arabic female trial B", "audio/trials/ar-phonics-0-female-vowelled.mp3"),
 ("English female trial Alba", "audio/trials/en-phonics-0-alba.mp3"),
 ("English male trial Bryce", "audio/trials/en-phonics-0-bryce.mp3"),
]
def run(cmd):
    return subprocess.run(cmd,text=True,stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE,check=True,timeout=30)
def probe(path):
    data=json.loads(run(["ffprobe","-v","error","-show_entries",
      "format=duration,bit_rate,size:stream=codec_name,sample_rate,channels",
      "-of","json",str(path)]).stdout)
    track=next((x for x in data.get("streams",[]) if x.get("codec_name")=="mp3"),{})
    meta=data.get("format",{})
    return float(meta.get("duration",0)),int(meta.get("bit_rate",0)),int(track.get("sample_rate",0)),int(track.get("channels",0)),track.get("codec_name","unknown")
def levels(path):
    stderr=run(["ffmpeg","-hide_banner","-nostats","-i",str(path),
      "-filter:a","volumedetect,silencedetect=noise=-35dB:d=0.08",
      "-f","null","-"]).stderr
    mean=re.search(r"mean_volume:\s*(-?[\d.]+) dB",stderr)
    peak=re.search(r"max_volume:\s*(-?[\d.]+) dB",stderr)
    starts=[float(x) for x in re.findall(r"silence_start:\s*([\d.]+)",stderr)]
    ends=[float(x) for x in re.findall(r"silence_end:\s*([\d.]+)",stderr)]
    start_silence=ends[0] if starts and ends and starts[0]<=0.08 else 0.0
    return (mean.group(1) if mean else "n/a",
            peak.group(1) if peak else "n/a",
            start_silence)
def main():
    rows=[]
    for name,path in CASES:
        source=ROOT/path
        if not source.is_file():
            raise FileNotFoundError(f"Missing audio source {path}")
        duration,bitrate,rate,channels,codec=probe(source)
        if duration<=0 or rate<=0 or bitrate<=0:
            raise ValueError(f"Invalid audio metadata: {source}")
        mean,peak,silence=levels(source)
        rows.append((name,path,codec,f"{duration:.2f}",
          f"{rate/1000:.1f}",f"{bitrate/1000:.0f}",str(channels),
          f"{silence:.2f}",mean,peak))
    hdr=[
      "# Objective audio format check — Little Learners Academy",
      "",
      "Generated: "+dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d UTC"),
      "",
      "**Scope:** Measurements from twelve actual files in this repository; the list includes the two Arabic trial pronunciations. This is not a listening test or a comparison of proprietary competitors’ digital audio files.",
      "",
      "| Clip | Codec | Duration (s) | Sample rate (kHz) | Bitrate (kbps) | Ch. | Leading silence (s) | Mean level (dBFS) | Peak (dBFS) |",
      "|---|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for name,_path,codec,duration,rate,bitrate,ch,silence,mean,peak in rows:
        hdr.append(f"| {name} | {codec} | {duration} | {rate} | {bitrate} | {ch} | {silence} | {mean} | {peak} |")
    hdr+=["",
      "## Interpretation and limits",
      "- Duration, sample rate, file bitrate and clipping/silence can reveal technical defects; **they cannot prove whether an Arabic word is correctly pronounced, whether the voice sounds like a child, or whether the speaker is clearly female/male**.",
      "- Short whole-word clips may display **0:00** on a browser player even if the file is valid (depending on duration, loading state and browser). Use explicit metadata and playback error reporting, not the time display alone, to establish failure.",
      "- These MP3 files come from freely available offline synthetic voices; they are **not genuine child recordings**. Arabic female pronunciation was rejected by user listening feedback. Arabic male was comparatively clearer.",
      "- A fair competitor audio-file comparison would require legally accessible and representative sample files; we have not obtained or decoded competitor audio.",
      "- English phonics must teach pure phonemes, letter-to-sound matching, blending and segmenting; current recordings largely speak whole words.",
      "- Before promotion to Grade 1 lessons: test intelligibility with a qualified English phonics educator and native Arabic speaker, plus parents and learners. A human review is mandatory even if every technical check succeeds.",
      "",
      "## Benchmark references (feature evidence, not audio-format measurements)",
      "- Reading Eggs Fast Phonics: https://readingeggs.com/schools/phonics/",
      "- Teach Your Monster to Read: https://help.teachyourmonster.org/en/articles/5736688-how-is-teach-your-monster-to-read-educational",
      "- Oxford Owl pure-sound practice: https://home.oxfordowl.co.uk/phonics-videos/",
      "- AlifBee Kids native Arabic narrators: https://www.alifbeekids.com/en",
      "- Nahla wa Nahil Arabic listen-and-read: https://nahlawanahil.com/Home/index",
      "- Lamsa UAE app: https://apps.apple.com/ae/app/lamsa-kids-learning-app/id517583488",
      "",
    ]
    OUTPUT.write_text("\n".join(hdr),encoding="utf-8")
    print("\n".join(hdr[:6+len(rows)]))
    print(f"Saved {OUTPUT} ({len(rows)} clips)")
if __name__ == "__main__":
    main()
