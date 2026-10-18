/* Browser QA: adult-facing curated school notice directory, not real-time alerts. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const {chromium}=require("playwright");
const html=fs.readFileSync("school-updates.html","utf8");
const js=fs.readFileSync("school-updates.js","utf8");
const dataset=fs.readFileSync("school-updates-data.js","utf8");
new vm.Script(js);new vm.Script(dataset);
const context={window:{}};vm.runInNewContext(dataset,context);
const data=context.window.LLA_SCHOOL_UPDATES;
assert.equal(data.notices.length,6);
assert.equal(data.editorialReviewDate,"2026-10-18");
for(const item of data.notices){
 const parsed=new URL(item.url);
 assert.equal(parsed.protocol,"https:","Only official HTTPS sources may be linked");
 assert(["www.edu.gov.qa","edu.gov.qa","hukoomi.gov.qa","www.gco.gov.qa","www.unesco.org","www.oecd.org"].includes(parsed.hostname));
 assert(["qatar","exams","safety","research"].includes(item.category));
 assert(item.kind&&item.publisher&&item.summary&&item.title);
}
for(const forbidden of [/\bfetch\s*\(/,/XMLHttpRequest/,/sendBeacon/,/localStorage/,/sessionStorage/,/getUserMedia/,/Notification\s*\(/,/innerHTML\s*=/]){
 assert(!forbidden.test(js),"No background surveillance or storage in the update centre: "+forbidden);
}
assert(html.includes("This is not a live emergency-alert system"),"Never imply live emergencies");
assert(html.includes("connect-src 'none'"),"News page must avoid external API requests");
assert(fs.readFileSync("index.html","utf8").includes('href="./school-updates.html"'),"Main app menu needs source link");
assert(fs.readFileSync("choose-grade.html","utf8").includes('href="./school-updates.html"'),"Grade parent view needs news link");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const errors=[],outbound=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",req=>{if(!req.url().startsWith(base+"/"))outbound.push(req.url())});
 await page.goto(base+"/school-updates.html",{waitUntil:"domcontentloaded"});
 await page.locator("#updatesCards .card").first().waitFor();
 assert.equal(await page.locator("#updatesCards .card").count(),6);
 assert.equal(await page.locator("#reviewDate").getAttribute("datetime"),"2026-10-18");
 assert.match(await page.locator("#resultsStatus").innerText(),/not a live news feed/i);
 assert.equal(await page.locator("#filters button").count(),5);
 for(const [category,count] of [["qatar",2],["exams",1],["safety",1],["research",2],["all",6]]){
  const btn=page.locator('#filters button[data-category="'+category+'"]');
  await btn.click();
  assert.equal(await btn.getAttribute("aria-pressed"),"true","Filter pressed state");
  assert.equal(await page.locator("#updatesCards .card").count(),count,category+" filtered card count");
  for(const card of await page.locator("#updatesCards .card").all()){
   const link=card.locator("a");
   assert.equal(await link.getAttribute("target"),"_blank");
   assert.match(await link.getAttribute("rel"),/noopener noreferrer/);
   assert.match(await link.getAttribute("href"),/^https:\/\//);
  }
 }
 assert.equal(await page.locator("#updatesCards time").count(),2,"Only dated international research must show publication dates");
 const noOverflow=async()=>{
  const s=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(s.scroll<=s.viewport+3,"School updates overflow "+JSON.stringify(s));
 };
 for(const width of [280,320,390,768,1024]){
  await page.setViewportSize({width,height:800});await noOverflow();
 }
 assert.deepEqual(outbound,[],"Opening news page must never fetch outside the app without user clicks");
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: Qatar official school news, exam calendar, safety source and research menus; accessible filters, dated sources, mobile widths, zero tracking or live-alert claims");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
