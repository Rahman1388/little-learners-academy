/* Ensure parent-exit links are safe even if JavaScript fails to load. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const pages=["curriculum-compass.html","international-benchmark.html","quality-and-standards.html","school-pathways.html"];
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),"utf8");
 assert(html.includes('parent-exit-gate.js'),page+": missing gate script");
 assert(html.includes('parent-exit-gate.css'),page+": missing gate stylesheet");
 assert(!/<a\b[^>]*\bhref=["']https?:/i.test(html),page+": clickable external href without gate");
 if(page!=="school-pathways.html"){
   assert(/data-parent-exit-url=["']https:\/\//.test(html),page+": no protected external links");
 }
 const csp=html.match(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]+content=["']([^"']+)["']/i);
 assert(csp&&csp[1].includes("script-src 'self'"),page+": gate script blocked by CSP");
}
const schoolJs=fs.readFileSync(path.join(root,"school-pathways.js"),"utf8");
assert(schoolJs.includes("a.dataset.parentExitUrl=ref.url"),"dynamic official references must be guarded");
assert(!schoolJs.includes("a.href=ref.url"),"school references must not expose direct external href");
const code=fs.readFileSync(path.join(root,"parent-exit-gate.js"),"utf8");
for(const guard of ["data-parent-exit-url","event.preventDefault()","safeExternal(destination)","window.location.assign(approved.href)","aria-modal","Escape"]){
 assert(code.includes(guard),"Missing gate check: "+guard);
}
console.log("PASS: parent-assisted exits protect four reference pages, including dynamic school links; links fail closed without JS");
