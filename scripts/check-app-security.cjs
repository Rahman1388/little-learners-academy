/* Security guardrails for a child-facing static app.
 * Checks apply to checked-in pages; no network or student data is read.
 */
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const files=fs.readdirSync(root).filter(x=>x.endsWith(".html")||x.endsWith(".js"));
const guarded=["index.html","activity-library.html","learning-passport.html","privacy.html","sentence-builder.html"];
const cspRequired=["script-src 'self'","object-src 'none'","frame-src 'none'","base-uri 'self'","form-action 'none'"];
for(const name of guarded){
 const html=fs.readFileSync(path.join(root,name),"utf8");
 const match=html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i);
 assert(match,"Missing CSP in "+name);
 for(const part of cspRequired)assert(match[1].includes(part),"CSP missing "+part+" in "+name);
 assert(!/<script\b(?![^>]*\bsrc\s*=)[^>]*>/i.test(html),"Inline JavaScript would violate strict CSP: "+name);
}
for(const name of files){
 const content=fs.readFileSync(path.join(root,name),"utf8");
 if(name.endsWith(".html")){
  for(const match of content.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)){
   const src=match[1].trim();
   assert(!/^(?:https?:)?\/\//i.test(src),"External script forbidden: "+name+" -> "+src);
   assert(!/^(?:javascript|data):/i.test(src),"Executable remote script URI forbidden: "+name);
  }
  assert(!/<iframe\b[^>]*\bsrc\s*=\s*["']https?:/i.test(content),"Remote iframe forbidden: "+name);
 }
}
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
assert(sw.includes("ALLOWED_PATHS"),"Service worker must restrict cache to allowlisted content");
assert(sw.includes('url.origin!==self.location.origin'),"Service worker must check request origin");
console.log("PASS: CSP, local script loading, no remote frames, allowlisted same-origin PWA cache across "+files.length+" top-level files");
