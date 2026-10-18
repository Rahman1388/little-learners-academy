/* Verify the isolated, unhosted Grade 2 teacher-preview package on localhost. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {chromium}=require("playwright");
const folder=path.resolve("grade2-teacher-preview-package");
const manifest=JSON.parse(fs.readFileSync(path.join(folder,"PREVIEW-MANIFEST.json"),"utf8"));
assert.equal(manifest.automaticSubmission,false);
for(const fileName of ["index.html","grade2-four-skills.html","grade2-phonics-pathway.html","grade2-educator-review.html","EDUCATOR-REVIEW-GUIDE.md","START-HERE.md"]){
 assert(fs.existsSync(path.join(folder,fileName)),"Missing preview asset: "+fileName);
}
const pilot=fs.readFileSync(path.join(folder,"grade2-four-skills.html"),"utf8");
assert(pilot.includes('href="./index.html"'),"Preview-only Grade 2 back link must return to preview landing");
assert(!pilot.includes('href="./choose-grade.html"'),"Preview must not link to missing app landing");
const origin=process.env.TEST_URL||"http://127.0.0.1:8765";
const base=origin+"/grade2-teacher-preview-package";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[],outside=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",r=>{if(!r.url().startsWith(origin+"/"))outside.push(r.url())});
 const noOverflow=async()=>{
  const x=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(x.scroll<=x.width+3,"Preview overflow: "+JSON.stringify(x));
 };
 await page.goto(base+"/index.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("a.link").count(),3,"Preview landing should link to precisely three review sections");
 await noOverflow();
 await page.locator('a[href="./grade2-four-skills.html"]').click();
 assert.equal(await page.locator("#moduleButtons button").count(),5);
 await page.locator("#moduleButtons button").nth(3).click();
 assert.match(await page.locator("#selectedModuleTitle").innerText(),/Module 4: Food and drink/);
 assert.equal(await page.locator(".family-journey-link").count(),2);
 await page.locator('a[href="./grade2-phonics-pathway.html?family=ink"]').click();
 assert.match(await page.locator("#stepHeading").innerText(),/Module 4.*-ink/);
 assert.equal(await page.locator("#familyButtons button").count(),8);
 await page.locator("#reviewLink").click();
 assert.equal(await page.locator("#family").inputValue(),"ink");
 await page.locator("#observation").fill("The sink picture needs a more direct illustration.");
 await page.locator("#decision").selectOption("Revise");
 await page.locator('#reviewForm button[type="submit"]').click();
 assert.match(await page.locator("#report").inputValue(),/Word family: -ink/);
 assert.match(await page.locator("#report").inputValue(),/Decision: Revise/);
 assert.deepEqual(await page.evaluate(()=>Object.keys(localStorage)),[],"Review must not store progress");
 for(const width of [280,390,768]){
  await page.setViewportSize({width,height:780});
  await noOverflow();
 }
 await page.goto(base+"/grade2-four-skills.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator('a[href="./index.html"]').count(),1);
 await page.locator('a[href="./index.html"]').click();
 assert.match(await page.locator("h1").innerText(),/Grade 2 Teacher Preview/);
 assert.deepEqual(outside,[],"Preview must not load external tracking or API hosts");
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: self-contained Grade 2 preview landing, 5 modules, 8 phonics families, local review workflow and phone sizes; no external requests");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
