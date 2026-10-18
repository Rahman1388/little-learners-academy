/* Browser regression for adult-only, private Grade 2 word-family review helper. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const {chromium}=require("playwright");
const html=fs.readFileSync("grade2-educator-review.html","utf8");
const js=fs.readFileSync("grade2-educator-review.js","utf8");
new vm.Script(js,{filename:"grade2-educator-review.js"});
assert(html.includes('src="./grade2-educator-review.js"'));
assert(html.includes('id="reviewForm"'));
assert(html.includes('id="report" readonly'));
assert(html.includes("No accounts")===false,"Do not claim identity checks were performed");
for(const unsafe of [/\bfetch\s*\(/, /XMLHttpRequest/, /sendBeacon/, /localStorage/, /sessionStorage/, /\.cookie\b/, /getUserMedia/, /SpeechRecognition/, /innerHTML\s*=/]){
 assert(!unsafe.test(js),"Review helper must not transfer/store data: "+unsafe);
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const errors=[];
 const external=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",request=>{if(!request.url().startsWith(base+"/"))external.push(request.url())});
 await page.addInitScript(()=>{
  window.__copiedReview=undefined;
  Object.defineProperty(navigator,"clipboard",{configurable:true,value:{
   writeText:async text=>{window.__copiedReview=text;}
  }});
 });
 const noOverflow=async()=>{
  const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert(size.scroll<=size.width+3,"Review page overflow: "+JSON.stringify(size));
 };
 await page.goto(base+"/grade2-educator-review.html?family=ink",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#family").inputValue(),"ink");
 assert.equal(await page.locator("#openLesson").getAttribute("href"),"./grade2-phonics-pathway.html?family=ink");
 assert.equal(await page.locator("#family option").count(),8);
 assert.equal(await page.locator("#stage option").count(),7);
 assert.equal(await page.locator("#decision option").count(),4);
 assert.equal(await page.locator("#report").inputValue(),"");
 assert.equal(await page.evaluate(()=>window.__copiedReview),undefined);
 assert.equal(await page.locator("form").getAttribute("action"),null,"Form must not submit data to a URL");
 await page.locator('#reviewForm button[type="submit"]').click();
 assert.equal(await page.locator("#report").inputValue(),"","Decision and observation must be required");
 await page.locator("#stage").selectOption("Spell");
 await page.locator("#domain").selectOption("Picture and word clarity");
 await page.locator("#decision").selectOption("Revise");
 await page.locator("#observation").fill("The sink picture looks like a tap.");
 await page.locator("#suggestion").fill("Show a basin with a faucet.");
 await page.locator('#reviewForm button[type="submit"]').click();
 const prepared=await page.locator("#report").inputValue();
 for(const phrase of ["Module: 4","Word family: -ink","Stage: Spell","Decision: Revise","The sink picture looks like a tap.","Show a basin with a faucet.","Adult-authored, anonymous feedback"]){
  assert(prepared.includes(phrase),"Missing report field: "+phrase);
 }
 assert.equal(await page.evaluate(()=>window.__copiedReview),undefined,"Report must not be auto-copied");
 assert.deepEqual(await page.evaluate(()=>Object.keys(localStorage)),[],"No reviewer localStorage writes");
 assert.deepEqual(await page.evaluate(()=>Object.keys(sessionStorage)),[],"No reviewer sessionStorage writes");
 await page.locator("#copyReport").click();
 assert.equal(await page.evaluate(()=>window.__copiedReview),prepared,"Only deliberate click copies report");
 await noOverflow();
 for(const width of [280,390,768]){
  await page.setViewportSize({width,height:780});
  await noOverflow();
 }
 await page.locator('#reviewForm button[type="reset"]').click();
 assert.equal(await page.locator("#report").inputValue(),"","Reset removes generated review");
 assert.equal(await page.locator("#observation").inputValue(),"","Reset removes reviewer notes");
 assert.equal(await page.locator("#openLesson").getAttribute("href"),"./grade2-phonics-pathway.html?family=ing");
 await page.goto(base+"/grade2-educator-review.html?family=unknown",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#family").inputValue(),"ing","Unknown family routes must fall back");
 await page.goto(base+"/grade2-phonics-pathway.html?family=ick",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#reviewLink").getAttribute("href"),"./grade2-educator-review.html?family=ick");
 await page.locator("#reviewLink").click();
 assert.equal(await page.locator("#family").inputValue(),"ick");
 await page.locator("#family").selectOption("ain");
 assert.equal(await page.locator("#openLesson").getAttribute("href"),"./grade2-phonics-pathway.html?family=ain");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#report").inputValue(),"","Reload must clear private feedback");
 assert.deepEqual(await page.evaluate(()=>Object.keys(localStorage)),[]);
 assert.deepEqual(external,[],"Review workflow must not request external hosts");
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: Grade 2 private educator review form, eight source-linked families, review categories, explicit copy, mobile widths, no storage/upload");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
