"""Build offline English lesson voiceovers from British-English neural speakers.

Uses public Piper voice model files temporarily on the GitHub Actions runner,
never commits the neural model weights. These are synthetic playful voice styles,
not recordings of children. Pronunciation review required before commercial release.
"""
from __future__ import annotations

import json
import subprocess
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice, SynthesisConfig

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/"audio"/"en"
MODEL_FOLDER=Path("/tmp/lla-english-voices")
SPEAKERS={
    "girl": ("en_GB-cori-medium",1.10),
    "boy": ("en_GB-alan-medium",1.06),
}

def load_lesson_words() -> list[tuple[str,int,str]]:
    js=(
      "global.window={};"
      "require('./curriculum.js');"
      "const list=[];"
      "for(const s of window.LLA_CURRICULUM.subjects)"
      "for(const l of s.lessons)"
      "for(let i=0;i<l.items.length;i++)"
      "list.push([l.id,i,l.items[i][1]]);"
      "process.stdout.write(JSON.stringify(list));"
    )
    result=subprocess.run(["node","-e",js],cwd=ROOT,text=True,capture_output=True,check=True)
    data=json.loads(result.stdout)
    if not data:
        raise RuntimeError("No curriculum words found")
    return [(a,int(b),c) for a,b,c in data]

def main() -> None:
    words=load_lesson_words()
    OUT.mkdir(parents=True,exist_ok=True)
    generated=0
    with tempfile.TemporaryDirectory() as tmp:
        wav_path=Path(tmp)/"word.wav"
        for kind,(model_name,ratio) in SPEAKERS.items():
            model_path=MODEL_FOLDER/f"{model_name}.onnx"
            voice=PiperVoice.load(str(model_path))
            settings=SynthesisConfig(length_scale=1.12,noise_scale=0.58,noise_w_scale=0.62,volume=1.0)
            for lesson,index,text in words:
                with wave.open(str(wav_path),"wb") as wav:
                    voice.synthesize_wav(text,wav,syn_config=settings)
                output=OUT/f"{lesson}-{index}-{kind}.mp3"
                filter=f"asetrate=22050*{ratio},aresample=22050,atempo={1/ratio:.4f},highpass=f=70,lowpass=f=9500,loudnorm=I=-19:TP=-1.6:LRA=11"
                subprocess.run([
                  "ffmpeg","-hide_banner","-loglevel","error","-y",
                  "-i",str(wav_path),"-af",filter,"-codec:a","libmp3lame",
                  "-q:a","3",str(output)
                ],check=True,timeout=45)
                if output.stat().st_size < 512:
                    raise ValueError(f"Empty recording: {output}")
                generated+=1
    print(f"Generated {generated} separate English girl/boy-style neural recordings.")

if __name__=="__main__":
    main()
