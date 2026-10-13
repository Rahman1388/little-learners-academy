/* Mobile/tablet smoke test for local-only parent report. */
"use strict";
const assert=require("node:assert/strict"),{chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block",locale:"en-GB"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",err=>errors.push(err.message));
  const base=process.env.TEST_URL||"http://127.0.0.1:8765";
  const go=path=>page.goto(base+"/"+path,{waitUntil:"domcontentloaded",timeout:40000});
  const assertFits=async()=>{
   const x=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert(x.width<=x.viewport+3,"Horizontal overflow: "+JSON.stringify(x));
  };
  await go("parent-report.html");
  await page.locator("#subjectProgress .subject").first().waitFor({state:"visible"});
  assert.equal(await page.locator("#subjectProgress .subject").count(),5);
  assert.match(await page.locator("#completedCount").textContent(),/0 \/ 151/);
  assert.equal(await page.locator("#focusCards article").count(),3);
  await assertFits();
  // Progress is read, never fabricated from the report's own controls.
  await page.evaluate(()=>{
   localStorage.setItem("lla-activity-library-v1",JSON.stringify({"mini-001":true,"mini-002":true}));
   localStorage.setItem("lla-practice-insights-v1",JSON.stringify({
    "mini-001":{correct:2,incorrect:0},
    "mini-002":{correct:1,incorrect:0},
    "mini-003":{correct:0,incorrect:2}
   }));
   localStorage.setItem("lla-grade2-pilot-v1",JSON.stringify({"g2-01":true}));
   localStorage.setItem("lla-grade2-english-v1",JSON.stringify({"g2e-01":true}));
   localStorage.setItem("lla-grade2-science-v1",JSON.stringify({"g2s-01":true}));
   localStorage.setItem("lla-grade3-preview-v1",JSON.stringify({"g3-01":true}));
   localStorage.setItem("lla-grade3-english-v1",JSON.stringify({"g3e-01":true}));
   localStorage.setItem("lla-grade3-science-v1",JSON.stringify({"g3s-01":true}));
   localStorage.setItem("lla-math-story-v1",JSON.stringify({done:[0,1,1],rewarded:[]}));
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#completedCount").filter({hasText:"2 / 151"}).waitFor({state:"visible"});
  assert.equal(await page.locator("#rightCount").textContent(),"3");
  assert.equal(await page.locator("#retryCount").textContent(),"2");
  assert.match(await page.locator("#grade2Count").textContent(),/3 \/ 66/);
  assert.match(await page.locator("#grade3Count").textContent(),/3 \/ 54/);
  assert.match(await page.locator("#storySummary").textContent(),/2 \/ 24/);
  assert.equal(await page.locator('#focusCards a[href*="mini-003"]').count(),1);
  // Optional self-reflection is separate from correctness and must influence suggested practice.
  await go("activity-library.html?activity=mini-001");
  await page.locator("#answerOptions button").first().waitFor({state:"visible"});
  const answerIndex=await page.evaluate(()=>window.LLA_MINI_ACTIVITIES.find(a=>a.id==="mini-001").answer);
  await page.locator("#answerOptions button").nth(answerIndex).click();
  assert.equal(await page.locator("#reflectionChoices").isVisible(),true);
  await page.locator("#wantPractice").click();
  assert.equal(await page.locator("#wantPractice").getAttribute("aria-pressed"),"true");
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-practice-confidence-v1"))["mini-001"]),"review");
  await go("parent-report.html");
  await page.locator("#reflectionCount").filter({hasText:"1 activity"}).waitFor({state:"visible"});
  assert.equal(await page.locator('#focusCards a[href*="mini-001"]').count(),1,
    "A completed activity explicitly requested for revision must remain a suggested practice");
  assert.match(await page.locator("#focusCards").textContent(),/learner chose to practise/i);
  await assertFits();
  await page.locator("#showReportText").click();
  assert.equal(await page.locator("#copyText").isVisible(),true);
  const summary=await page.locator("#copyText").inputValue();
  assert(summary.includes("Grade 1 mini-challenges: 2 / 151"));
  assert(summary.includes("Learner-requested reviews: 1"));
  assert(summary.includes("Grade 2 pilot questions: 3 / 66"));
  assert(summary.includes("Grade 3 pilot questions: 3 / 54"));
  // The visible print control really calls print only after a parent taps.
  await page.evaluate(()=>{window.__printCalled=false;window.print=()=>{window.__printCalled=true}});
  await page.locator("#printReport").click();
  assert.equal(await page.evaluate(()=>window.__printCalled),true);
  // Clipboard permission may not exist: verify the accessible manual fallback.
  await page.evaluate(()=>{Object.defineProperty(navigator,"clipboard",{value:undefined,configurable:true})});
  await page.locator("#copyReport").click();
  assert.match(await page.locator("#copyStatus").textContent(),/ready for copying/);
  await assertFits();
  await page.setViewportSize({width:768,height:1024});await assertFits();
  assert.deepEqual(errors,[],"Browser errors");
  console.log("PASS: parent report real local counters, clear practice suggestions, safe copy/print, no overflow on phone or tablet");
 }finally{await browser.close()}
})().catch(err=>{console.error(err.stack||err);process.exitCode=1});