"use strict";
/*
 * Prepare a review-only web asset tree for a future native bundle.
 * Does NOT build, sign, upload or publish an IPA/AAB.
 * All output remains local in native-build/www (ignored by Git).
 */
const fs=require("node:fs");
const path=require("node:path");
const ROOT=path.resolve(__dirname,"..");
const OUT=path.join(ROOT,"native-build","www");
const ALLOW=new Set([".html",".js",".css",".json",".webmanifest",".svg",".png",".jpg",".jpeg",".webp",".gif",".ico",".mp3",".m4a",".wav",".ogg",".woff",".woff2",".txt"]);
const SKIP_DIRS=new Set([".git",".github","node_modules","scripts","native-build","coverage","test-results","updates",".cache","docs"]);
const SKIP_FILES=new Set(["package-lock.json","package.json"]);
if(OUT===ROOT||!OUT.startsWith(ROOT+path.sep))throw Error("Output must remain inside project");
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});
let count=0,bytes=0;
function copyTree(source,relative=""){
 for(const item of fs.readdirSync(source,{withFileTypes:true})){
  if(item.name.startsWith("."))continue;
  const subpath=path.join(relative,item.name);
  const input=path.join(source,item.name);
  if(item.isSymbolicLink())throw Error("Refusing to follow symlink: "+subpath);
  if(item.isDirectory()){
   if(SKIP_DIRS.has(item.name))continue;
   copyTree(input,subpath);
   continue;
  }
  if(!item.isFile()||SKIP_FILES.has(item.name))continue;
  if(!ALLOW.has(path.extname(item.name).toLowerCase()))continue;
  const output=path.join(OUT,subpath);
  if(!output.startsWith(OUT+path.sep))throw Error("Path escape: "+subpath);
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.copyFileSync(input,output);
  count++;
  bytes+=fs.statSync(input).size;
 }
}
copyTree(ROOT);
const required=["index.html","styles.css","app.js","navigation.js","sw.js","manifest.webmanifest","activity-data.js","three-step-route.html","three-step-route.js","audio/practice/en-phonics-0-girl.mp3","audio/practice/ar-phonics-0-boy.mp3"];
for(const file of required){
 if(!fs.existsSync(path.join(OUT,file)))throw Error("Required app asset missing from staged bundle: "+file);
}
console.log("Prepared native-app WEB ASSET REVIEW TREE at native-build/www: "+count+" files / "+Math.round(bytes/1024)+" KiB");
console.log("NOT a signed IPA/AAB. App Store parental gates, privacy, Android API target, native QA and teacher-reviewed phonics remain pending.");
