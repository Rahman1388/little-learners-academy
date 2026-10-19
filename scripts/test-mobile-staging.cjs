/* Staging ZIP smoke test: locality, safe labels, noindex, responsive navigation.
 * Chromium mobile emulation is NOT a real iPhone Safari/VoiceOver sign-off.
 */
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const root="academy-mobile-staging-package";
const manifest=JSON.parse(fs.readFileSync(path.join(root,"STAGING-MANIFEST.json"),"utf8"));
assert.equal(manifest.approvedToDeploy,false);
assert.equal(manifest.developmentOnly,true);
assert.equal(manifest.isAccessRestricted,false,"Do not misrepresent Pages preview as private");
const pageNames=["index.html","grade2-four-skills.html","grade2-phonics-pathway.html","grade2-educator-review.html","school-updates.html","academy-brand-review.html"];
assert.equal(manifest.htmlPages,pageNames.length);
for(const name of pageNames){
 const doc=fs.readFileSync(path.join(root,name),"utf8");
 assert(doc.includes('name="robots" content="noindex,nofollow,noarchive"'),"Noindex missing "+name);
 assert(doc.includes('id="stagingNotice"'),"Visible staging label missing "+name);
}
assert.match(fs.readFileSync(path.join(root,"robots.txt"),"utf8"),/Disallow: \/$/m);
assert(!fs.existsSync(path.join(root,"app.js")),"Do not copy entire production learning app");
const origin=process.env.TEST_URL||"http://127.0.0.1:8765";
const base=origin+"/"+root;
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[],external=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",r=>{if(!r.url().startsWith(origin+"/"))external.push(r.url())});
 async function noOverflow(){
  const s=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert(s.scroll<=s.width+3,"Mobile staging overflows viewport "+JSON.stringify(s));
 }
 for(const width of [280,320,390,768,1024]){
  await page.setViewportSize({width,height:850});
  await page.goto(base+"/index.html",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("a.link").count(),5);
  assert.equal(await page.locator("#stagingNotice").count(),1);
  await noOverflow();
 }
 for(const name of pageNames.slice(1)){
  await page.goto(base+"/"+name,{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#stagingNotice").count(),1,"Visible review label "+name);
  assert.match(await page.locator("#stagingNotice").innerText(),/Adult review only/i);
  assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"),"noindex,nofollow,noarchive");
  await page.setViewportSize({width:320,height:760});await noOverflow();
 }
 await page.goto(base+"/grade2-four-skills.html",{waitUntil:"domcontentloaded"});
 await page.locator("#moduleButtons button").first().waitFor();
 assert.equal(await page.locator("#moduleButtons button").count(),5);
 await page.goto(base+"/school-updates.html",{waitUntil:"domcontentloaded"});
 await page.locator("#updatesCards .card").first().waitFor();
 assert.equal(await page.locator("#updatesCards .card").count(),7);
 await page.waitForFunction(()=>document.querySelector("#liveFeedStatus")?.textContent?.includes("not run successfully"));
 assert.equal(await page.locator("#liveHeadlines .headline").count(),0);
 await page.goto(base+"/academy-brand-review.html",{waitUntil:"domcontentloaded"});
 await page.locator("#candidateChoice").selectOption("NabtaNova");
 for(const id of ["englishPron","arabicPron","meaning","memory","future"])await page.locator("#"+id).selectOption("5");
 await page.locator('#brandReview button[type="submit"]').click();
 assert.match(await page.locator("#report").inputValue(),/25\/25/);
 assert.deepEqual(external,[],"No external network requests by staging pages without explicit outbound link click");
 assert.deepEqual(errors,[],"No client exceptions");
 await browser.close();
 console.log("PASS: staging package noindex labels, six review pages, 5 routes, mobile widths, official-source status and copy-only brand form; not hosted");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
