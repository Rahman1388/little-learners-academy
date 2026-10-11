#!/usr/bin/env node
/* Little Learners Academy: release security gate for static, child-facing site.
 * Only scans checked-in text files. Never reads student/device data or network.
 * No dependencies; safe for public pull requests and read-only CI.
 */
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),fail=[],warn=[],stats={pages:0,scripts:0,withCsp:0};
const skip=new Set([".git","node_modules","dist","coverage",".next",".cache"]);
const checked=[];
function walk(dir,depth=0){
 if(depth>5)return;
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  if(skip.has(e.name))continue;
  const full=path.join(dir,e.name);
  if(e.isDirectory()){walk(full,depth+1);continue}
  if(!e.isFile())continue;
  const relative=path.relative(root,full).replace(/\\/g,"/");
  if(/\.(html|js|cjs|mjs|json|webmanifest|css|md|ya?ml)$/i.test(relative)
       && !relative.startsWith("audio/") && !relative.endsWith("manifest.json"))
    checked.push({relative,content:fs.readFileSync(full,"utf8")});
 }
}
walk(root);
const source=checked.filter(({relative})=>/\.(html|js|cjs|mjs)$/i.test(relative)&&!relative.startsWith("scripts/"));
const keyPatterns=[
 ["PEM private key",/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
 ["GitHub personal token",/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/],
 ["GitHub fine-grained token",/\bgithub_pat_[A-Za-z0-9_]{40,}\b/],
 ["OpenAI-looking secret",/\bsk-(?:proj-)?[A-Za-z0-9_-]{40,}\b/],
 ["Google API key",/\bAIza[0-9A-Za-z_-]{35}\b/],
 ["AWS access key",/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/]
];
for(const {relative,content} of checked){
 // Documentation / test regex patterns may describe credentials; don't report examples
 // unless a full token-shaped value is present.
 for(const [name,pattern] of keyPatterns){
  if(pattern.test(content))fail.push(relative+": possible "+name+" committed");
 }
}
for(const {relative,content} of source){
 if(/\.html$/.test(relative)){
  stats.pages++;
  if(/<meta\s+http-equiv=["']Content-Security-Policy["']/i.test(content))stats.withCsp++;
  else warn.push(relative+": no meta Content Security Policy (recommend adding after compatibility test)");
  for(const m of content.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)){
   const url=m[1].trim();
   if(/^(?:https?:)?\/\//i.test(url))fail.push(relative+": executable external script "+url);
   if(/^(?:javascript|data):/i.test(url))fail.push(relative+": dangerous script URL");
  }
  if(/<iframe\b/i.test(content))warn.push(relative+": iframe detected; confirm it is child-safe");
  if(/\bon(?:click|load|error|mouseover)\s*=\s*["']/i.test(content))warn.push(relative+": inline event handler; review for script injection");
  if(/<form\b[^>]*\baction\s*=\s*["']https?:\/\//i.test(content))fail.push(relative+": external form submission");
  if(/(?:href|src)\s*=\s*["']javascript:/i.test(content))fail.push(relative+": javascript: navigation");
 }
 if(/\.js$/.test(relative)){stats.scripts++;if(/\b(?:eval\s*\(|new\s+Function\s*\()/m.test(content))fail.push(relative+": runtime code evaluation");}
 if(/(?:innerHTML|outerHTML)\s*=/.test(content))warn.push(relative+": DOM HTML insertion; ensure only trusted constants");
 if(/fetch\s*\(\s*["']https?:\/\//.test(content))warn.push(relative+": outbound API call; verify privacy notice");
}
const must=["index.html","sw.js","privacy.html","child-safety.html","scripts/check-app-security.cjs"];
for(const file of must)if(!fs.existsSync(path.join(root,file)))fail.push("Required security asset missing: "+file);
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
if(!sw.includes("ALLOWED_PATHS"))fail.push("Service worker lacks cache allowlist");
if(!sw.includes("url.origin!==self.location.origin"))fail.push("Service worker lacks same-origin request check");
const manifest=JSON.parse(fs.readFileSync(path.join(root,"manifest.webmanifest"),"utf8"));
if(manifest.start_url&&/^https?:\/\//.test(manifest.start_url))warn.push("PWA start_url is an absolute external URL");
assert(stats.pages>10,"Unexpectedly few HTML pages scanned");
console.log("SECURITY REPORT: "+checked.length+" text files, "+stats.pages+" pages, "+stats.scripts+" app JavaScript files");
console.log("CSP found on "+stats.withCsp+" / "+stats.pages+" HTML pages.");
for(const warning of warn)console.log("REVIEW: "+warning);
if(fail.length){for(const issue of fail)console.error("BLOCK: "+issue);process.exitCode=1}
else console.log("PASS: No matched hardcoded secrets, remote executable scripts, dangerous inline URLs or missing PWA cache guards.");
console.log("LIMITS: Pattern scanning cannot confirm hosting settings, compromised dependencies, Git history, browser vulnerabilities, or legal compliance.");
