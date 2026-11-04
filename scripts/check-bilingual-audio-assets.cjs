"use strict";
/* Technical audio-file gate. Native-speaker pronunciation quality ALWAYS needs human listening review. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const words=["cat","fish","sun","bus"];
const expected=[];
for(let i=0;i<words.length;i++){
 for(const speaker of ["girl","boy"])expected.push({lang:"en",word:words[i],file:"audio/practice/en-phonics-"+i+"-"+speaker+".mp3"});
 expected.push({lang:"ar",word:words[i],file:"audio/practice/ar-phonics-"+i+"-boy.mp3"});
}
for(const speaker of ["alba","bryce"])expected.push({lang:"en",word:"bus",file:"audio/practice/en-phonics-3-"+speaker+".mp3"});
for(const lang of ["en","ar"])for(const speaker of ["girl","boy"]){
 expected.push({lang,word:"sentences",file:"audio/practice/"+lang+"-sentences-0-"+speaker+".mp3"});
}
const errors=[];
for(const {lang,word,file} of expected){
 if(!/^(en|ar)-/.test(path.basename(file))){errors.push("Language mismatch: "+file);continue}
 if(!fs.existsSync(file)){errors.push("Missing "+lang+" "+word+": "+file);continue}
 const stat=fs.statSync(file);
 if(!stat.isFile()||stat.size<512){errors.push("Empty or too-small MP3: "+file+" "+stat.size+" bytes");continue}
 const header=Buffer.alloc(4);
 const fd=fs.openSync(file,"r");try{fs.readSync(fd,header,0,4,0)}finally{fs.closeSync(fd)}
 const id3=header.toString("ascii",0,3)==="ID3";
 const mpeg=header[0]===0xff&&(header[1]&0xe0)===0xe0;
 if(!id3&&!mpeg)errors.push("Unexpected MP3 header: "+file);
}
const page=fs.readFileSync("audio-review.html","utf8");
const route=fs.readFileSync("three-step-route.html","utf8");
assert(page.includes('value="en"')&&page.includes('value="ar"'),"Audio review must cover both English and Arabic");
assert(page.includes('id="reviewCards"'),"Audio review listening controls missing");
assert(route.includes('id="themeChoices"')&&route.includes('id="paceChoices"'),"Choice-based adventure controls missing");
if(errors.length){
 console.error("AUDIO QUALITY GATE FAILED:\n"+errors.join("\n"));
 process.exitCode=1;
}else console.log("PASS: "+expected.length+" packaged English/Arabic MP3 files exist, nonempty, with plausible MP3 headers. NOTE: Pronunciation, native-like clarity, sound balance and correct phoneme blending remain UNVERIFIED until real-device human listening review.");
