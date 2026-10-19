/* Build a review-only static package. This does NOT publish to GitHub Pages.
 * All HTML/JS is original repository content; no external runtime services.
 */
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const folder=path.join(root,"grade2-teacher-preview-package");
const files=[
 ["grade2-teacher-preview-index.html","index.html"],
 ["grade2-four-skills.html","grade2-four-skills.html"],
 ["grade2-four-skills-data.js","grade2-four-skills-data.js"],
 ["grade2-four-skills.js","grade2-four-skills.js"],
 ["grade2-phonics-pathway.html","grade2-phonics-pathway.html"],
 ["grade2-phonics-pathway.js","grade2-phonics-pathway.js"],
 ["grade2-educator-review.html","grade2-educator-review.html"],
 ["grade2-educator-review.js","grade2-educator-review.js"],
 ["school-updates.html","school-updates.html"],
 ["school-updates.js","school-updates.js"],
 ["school-updates-data.js","school-updates-data.js"],
 ["school-live-news.json","school-live-news.json"],
 ["academy-brand-review.html","academy-brand-review.html"],
 ["academy-brand-review.js","academy-brand-review.js"],
 ["icon.svg","icon.svg"],
 ["GRADE2-PHONICS-EDUCATOR-REVIEW.md","EDUCATOR-REVIEW-GUIDE.md"],
 ["GRADE2-TEACHER-PREVIEW-GUIDE.md","START-HERE.md"]
];
fs.rmSync(folder,{recursive:true,force:true});
fs.mkdirSync(folder,{recursive:true});
for(const [source,target] of files){
 const sourcePath=path.join(root,source);
 assert(fs.existsSync(sourcePath),"Missing required preview source: "+source);
 let data=fs.readFileSync(sourcePath,"utf8");
 if(source==="grade2-four-skills.html"){
  const original='href="./choose-grade.html"';
  assert(data.includes(original),"Expected source choose-grade navigation");
  data=data.replace(original,'href="./index.html"');
 }
 fs.writeFileSync(path.join(folder,target),data,"utf8");
}
const fileNames=new Set(files.map(pair=>pair[1]));
for(const fileName of fileNames){
 if(!fileName.endsWith(".html"))continue;
 const html=fs.readFileSync(path.join(folder,fileName),"utf8");
 const localResources=Array.from(html.matchAll(/(?:href|src)="\.\/([^"#?]+)(?:[^"]*)"/g),m=>m[1]);
 for(const resource of localResources){
  assert(fileNames.has(resource),fileName+" references unbundled local asset: "+resource);
 }
 const externalAssets=Array.from(html.matchAll(/<(?:script|img|iframe|link)\b[^>]*\b(?:src|href)="(https?:[^"]+)"/gi),m=>m[1]);
 assert.equal(externalAssets.length,0,fileName+" cannot embed externally hosted scripts, images, frames, or styles");
 // Only the adult news directory may contain outbound official-source anchor links.
 const externalAnchors=Array.from(html.matchAll(/<a\b[^>]*\bhref="(https?:[^"]+)"/gi),m=>m[1]);
 if(fileName!=="school-updates.html")assert.equal(externalAnchors.length,0,fileName+" has unapproved outbound links");
 else for(const url of externalAnchors){
  const parsed=new URL(url.replace(/&amp;/g,"&"));
  const allow=new Set(["www.edu.gov.qa","edu.gov.qa","www.gco.gov.qa","hukoomi.gov.qa","qna.org.qa"]);
  assert(parsed.protocol==="https:"&&allow.has(parsed.hostname)&&!parsed.username&&!parsed.password,"Unapproved news external link: "+url);
 }
}
const manifest={
 purpose:"Adult educator and parent review-only preview, not ministry approved or publicly deployed",
 builtFrom:"feature/grade2-four-skills-pilot-20261016",
 files:Array.from(fileNames).sort(),
 automaticSubmission:false,
 adultReadAudioOnly:true,
 notes:"Open on a controlled local/static server. Adult source-directory links can open official external pages when clicked. No live news updater or student upload. Do not treat as a published school product."
};
fs.writeFileSync(path.join(folder,"PREVIEW-MANIFEST.json"),JSON.stringify(manifest,null,2)+"\n","utf8");
console.log("PASS: created self-contained Grade 2 teacher-review static package with "+files.length+" source assets; not deployed");
