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
assert.equal(data.notices.length,7);
assert.equal(data.editorialReviewDate,"2026-10-18");
const examSource=data.notices.find(x=>x.id==="exam-timetables");
assert(examSource,"The official academic-year exam timetable directory must be present");
assert.equal(examSource.url,"https://www.edu.gov.qa/en/Content/TestsTimetable");
assert.equal(examSource.category,"exams");
assert.equal(examSource.published,null,"Do not invent a publication date for a continuously updated source page");
assert.match(examSource.summary,/not a live exam announcement/i);
for(const item of data.notices){
 const parsed=new URL(item.url);
 assert.equal(parsed.protocol,"https:","Only official HTTPS sources may be linked");
 assert(["www.edu.gov.qa","edu.gov.qa","hukoomi.gov.qa","www.gco.gov.qa","www.unesco.org","www.oecd.org"].includes(parsed.hostname));
 assert(["qatar","exams","safety","research"].includes(item.category));
 assert(item.kind&&item.publisher&&item.summary&&item.title);
}
for(const forbidden of [/XMLHttpRequest/,/sendBeacon/,/localStorage/,/sessionStorage/,/getUserMedia/,/Notification\s*\(/,/innerHTML\s*=/]){
 assert(!forbidden.test(js),"No background surveillance or storage in the update centre: "+forbidden);
}
assert(html.includes("This is not a live emergency-alert system"),"Never imply live emergencies");
assert(html.includes("connect-src 'self'"),"News page may fetch only our same-origin snapshot");
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
 assert.equal(await page.locator("#updatesCards .card").count(),7);
 assert.match(await page.locator("#liveFeedStatus").innerText(),/not run successfully/i);
 assert.equal(await page.locator("#liveHeadlines .headline").count(),0);
 assert.equal(await page.locator("#reviewDate").getAttribute("datetime"),"2026-10-18");
 assert.match(await page.locator("#resultsStatus").innerText(),/not a live news feed/i);
 assert.equal(await page.locator("#filters button").count(),5);
 for(const [category,count] of [["qatar",2],["exams",2],["safety",1],["research",2],["all",7]]){
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
 // The dashboard must distinguish a fresh editorial snapshot, a stale one,
 // and a failed retrieval. None is treated as emergency or exam instruction.
 const headlineUrl="https://qna.org.qa/en/News-Area/News/2026-10/18/school-news-example";
 const snapshot={schema:1,lastSuccessfulFetch:new Date().toISOString(),headlines:[
  {title:"Qatar Education Students Join a Learning Forum",url:headlineUrl,publishedAt:new Date().toISOString()},
  {title:"School update from an untrusted website",url:"https://qna.org.qa.evil.example/en/News-Area/News/2026-10/18/fake",publishedAt:new Date().toISOString()}
 ]};
 await page.route("**/school-live-news.json",route=>route.fulfill({status:200,contentType:"application/json",body:JSON.stringify(snapshot)}));
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#liveHeadlines .headline").first().waitFor();
 assert.equal(await page.locator("#liveHeadlines .headline").count(),1,"Reject forged/unofficial headline links");
 assert.match(await page.locator("#liveFeedStatus").innerText(),/Latest stored news snapshot/);
 assert.equal(await page.locator("#liveHeadlines .headline a").getAttribute("href"),headlineUrl);
 assert.match(await page.locator("#liveHeadlines .headline a").getAttribute("rel"),/noopener noreferrer/);
 snapshot.lastSuccessfulFetch=new Date(Date.now()-36*60*60*1000).toISOString();
 await page.reload({waitUntil:"domcontentloaded"});
 await page.waitForFunction(()=>document.querySelector("#liveFeedStatus")?.textContent?.includes("older than 12 hours"));
 assert.match(await page.locator("#liveFeedStatus").innerText(),/older than 12 hours/);
 await page.unroute("**/school-live-news.json");
 await page.route("**/school-live-news.json",route=>route.fulfill({status:503,body:"unavailable"}));
 await page.reload({waitUntil:"domcontentloaded"});
 await page.waitForFunction(()=>document.querySelector("#liveFeedStatus")?.textContent?.includes("snapshot unavailable"));
 assert.match(await page.locator("#liveFeedStatus").innerText(),/snapshot unavailable/);
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
 console.log("PASS: Qatar official sources, periodically refreshed QNA headline snapshots, stale/failure warnings, mobile filters and no emergency-alert claims");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
