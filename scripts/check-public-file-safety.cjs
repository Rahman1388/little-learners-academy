/* Public repository hygiene: block likely private tracked filenames; no child data accessed. */
"use strict";
const assert=require("node:assert/strict");
const path=require("node:path");
const {execFileSync}=require("node:child_process");
const root=path.resolve(__dirname,"..");
function unsafeReason(name){
 const file=name.replace(/\\/g,"/").replace(/^\.\//,"");
 const base=file.split("/").pop();
 if(/(^|\/)(?:private|confidential|restricted|student[-_]?data|pupil[-_]?data|learner[-_]?data|school[-_]?documents|school[-_]?files|teacher[-_]?feedback[-_]?private|backups)(\/|$)/i.test(file))return "Sensitive/private folder";
 if(/(^|\/)\.env(?:\.|$)/i.test(file)&&!/(^|\/)\.env\.example$/i.test(file))return "Environment secrets file";
 if(/(?:^|[._-])(?:credentials?|secrets?|tokens?)(?:[._-]|$)/i.test(base)&&!/\.(?:md|cjs|js)$/i.test(base))return "Possible credentials file";
 if(/\.(?:pdf|docx?|xlsx?|pptx?|csv|sqlite3?|db|sql|pem|key|p12|pfx|jks|keystore|bak|7z|zip)$/i.test(base))return "Unreviewed document, credential, database or backup";
 if(/(?:teacher[-_]?feedback|student|pupil|child[-_]?profile).*\.(?:txt|json)$/i.test(base))return "Possible private reviewer/learner record";
 return null;
}
for(const safe of ["index.html","audio/sample.mp3","GRADE2-QUALITY-REVIEW-2026.md",".env.example","scripts/check-public-file-safety.cjs","quality-gates.json"])
 assert.equal(unsafeReason(safe),null,"Incorrect block "+safe);
for(const privateName of ["school-documents/grade2.pdf","private/notes.md","teacher-feedback-private/reviewer.txt",".env.local","student-data/students.json","parent-feedback.csv","teachers.xlsx","credential.pem","backups/source.zip"])
 assert(unsafeReason(privateName),"Unsafe file not blocked "+privateName);
const files=execFileSync("git",["ls-files","-z","--cached"],{cwd:root,maxBuffer:5*1024*1024}).toString("utf8").split("\0").filter(Boolean);
assert(files.length>30,"Git-tracked inventory missing");
const blocked=files.map(file=>({file,reason:unsafeReason(file)})).filter(x=>x.reason);
if(blocked.length){for(const item of blocked)console.error("BLOCK: "+item.file+" — "+item.reason); process.exitCode=1;}
else console.log("PASS: "+files.length+" Git-tracked paths have no prohibited sensitive filenames/extensions.");
console.log("LIMITS: only current tracked paths, not file contents, Git history, forks, settings or privacy certification.");
