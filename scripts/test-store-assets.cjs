"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),stage=path.join(root,"native-build","www");
const requireFile=p=>{
 const absolute=path.join(stage,p);
 assert(fs.existsSync(absolute),"Missing staged asset: "+p);
 assert(fs.statSync(absolute).isFile(),"Not a staged file: "+p);
};
for(const p of ["index.html","styles.css","app.js","navigation.js","manifest.webmanifest","sw.js","privacy.html","choose-grade.html","three-step-route.html","three-step-route.js","activity-data.js","grade6-ratio.html","grade6-ratio.js","grade6-ratio-data.js"])requireFile(p);
for(let index=0;index<4;index++){
 for(const kind of ["girl","boy"])requireFile("audio/practice/en-phonics-"+index+"-"+kind+".mp3");
 requireFile("audio/practice/ar-phonics-"+index+"-boy.mp3");
}
for(const file of ["scripts/check-app-security.cjs","README.md","PROJECT-CONTINUITY.md",".github/workflows/validate.yml",".git/config"])assert(!fs.existsSync(path.join(stage,file)),"Developer file leaked into native stage: "+file);
assert(fs.readFileSync(path.join(stage,"index.html"),"utf8").includes("Little Learners Academy"));
const count=fs.readdirSync(stage).length;
assert(count>=40,"Unexpectedly few staged root assets");
console.log("PASS: Native web asset staging has Grade 1–6 entry points, bilingual reference MP3s and no selected internal developer files.");
console.log("NOT VERIFIED: Native Apple/Google signatures, Kids-category parental gates, real-device speech or curriculum approval.");
