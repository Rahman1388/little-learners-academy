/* Create a GitHub Pages-ready, REVIEW-ONLY static staging folder.
 * This is a build artifact and NOT a deployment, approval, or access control.
 * Inputs are the already validated grade2-teacher-preview-package assets.
 */
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const source=path.join(root,"grade2-teacher-preview-package");
const output=path.join(root,"academy-mobile-staging-package");
assert(fs.existsSync(path.join(source,"PREVIEW-MANIFEST.json")),"Run build-grade2-teacher-preview.cjs first");
const original=JSON.parse(fs.readFileSync(path.join(source,"PREVIEW-MANIFEST.json"),"utf8"));
assert(original.automaticSubmission===false,"Staging must not introduce automatic reviews");
const required=["index.html","grade2-four-skills.html","grade2-phonics-pathway.html","grade2-educator-review.html","school-updates.html","academy-brand-review.html","school-live-news.json"];
for(const name of required)assert(fs.existsSync(path.join(source,name)),"Preview ZIP missing "+name);
fs.rmSync(output,{force:true,recursive:true});fs.mkdirSync(output,{recursive:true});
fs.cpSync(source,output,{recursive:true,force:true});
const notice='<aside id="stagingNotice" role="note" aria-label="Adult development preview" class="lla-staging-flag"><strong>🧪 Adult review only</strong> • Unapproved lessons and proposed branding • Not a government or school service • <a href="./index.html">Review hub</a></aside>';
const css='<style id="lla-staging-style">.lla-staging-flag{box-sizing:border-box;position:relative;z-index:12;display:block;background:#fff4d9;color:#4b3005;border:2px solid #a16c1d;border-radius:0;padding:11px 16px;font:700 14px/1.5 system-ui,-apple-system,Arial,sans-serif;text-align:center;overflow-wrap:anywhere}.lla-staging-flag a{color:#714210;text-decoration:underline}.lla-staging-flag a:focus-visible{outline:3px solid #8a1538;outline-offset:3px}</style>';
const robots='<meta name="robots" content="noindex,nofollow,noarchive">';
let pages=0;
for(const name of fs.readdirSync(output).filter(x=>x.endsWith(".html"))){
 const file=path.join(output,name);let html=fs.readFileSync(file,"utf8");
 assert(/<head>/i.test(html)&&/<body(?:\s[^>]*)?>/i.test(html),"Unexpected HTML document structure: "+name);
 assert(!/id="stagingNotice"/.test(html),"Staging watermark already exists: "+name);
 html=html.replace(/<head>/i,"<head>\n"+robots+"\n"+css);
 html=html.replace(/<body(?:\s[^>]*)?>/i,match=>match+"\n"+notice+"\n");
 fs.writeFileSync(file,html,"utf8");pages++;
}
assert(pages===6,"Expected six self-contained review HTML pages, got "+pages);
fs.writeFileSync(path.join(output,"robots.txt"),"User-agent: *\nDisallow: /\n","utf8");
fs.writeFileSync(path.join(output,".nojekyll"),"","utf8");
const index=fs.readFileSync(path.join(output,"index.html"),"utf8");
assert(index.includes("Five")||index.includes("five review areas"),"Staging home must show all five review areas");
const manifest={
 developmentOnly:true,approvedToDeploy:false,isAccessRestricted:false,
 note:"NO HOSTING AUTHORIZATION. Deploying GitHub Pages generally makes all these assets public. noindex/robots.txt do not protect privacy or keep URLs secret.",
 entries:original.files,htmlPages:pages,noStudentData:true,
 news:"School directory and uninitialized snapshot only, not live alerts",
 review:"Teacher, Arabic specialist and actual iPhone Safari/VoiceOver sign-offs pending"
};
fs.writeFileSync(path.join(output,"STAGING-MANIFEST.json"),JSON.stringify(manifest,null,2)+"\n");
console.log("PASS: mobile review staging package built; six watermarked noindex pages; NOT deployed");
