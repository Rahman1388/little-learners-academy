/* Number Line Trail mobile and tablet browser regression.
 * Exercises the actual child-facing UI, not just its underlying data.
 */
"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({
  viewport:{width:390,height:844},isMobile:true,hasTouch:true,
  deviceScaleFactor:1,serviceWorkers:"block",locale:"en-GB"
 });
 const page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const checkWidth=async()=>{
  const v=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(v.width<=v.viewport+3,"Number line causes horizontal page scrolling: "+JSON.stringify(v));
 };
 try{
  await page.goto(base+"/number-line-trail.html",{waitUntil:"domcontentloaded",timeout:35000});
  await page.locator("#stationGrid .level").first().waitFor();
  assert.equal(await page.locator("#stationGrid .level").count(),12,"Expected 12 guided stops");
  assert.equal(await page.locator("#numberLine .point").count(),7,"Expected seven visible number markers");
  await checkWidth();
  assert.match(await page.locator("#totalProgress").textContent(),/0\s*\/\s*12/);
  // Misconceptions receive supportive feedback, not points or a timed failure.
  await page.locator('#answerChoices button[data-value="4"]').click();
  assert.match(await page.locator("#answerFeedback").textContent(),/Good try/);
  assert.match(await page.locator("#totalProgress").textContent(),/0\s*\/\s*12/);
  await page.locator("#showHint").click();
  assert.match(await page.locator("#jumpStatus").textContent(),/Start at 2/);
  await page.locator("#showJump").click();
  assert.match(await page.locator("#jumpStatus").textContent(),/Jump 1 of 3/);
  await page.locator('#answerChoices button[data-value="5"]').click();
  assert.equal(await page.locator("#nextStation").isVisible(),true);
  assert.match(await page.locator("#totalProgress").textContent(),/1\s*\/\s*12/);
  // A saved step must survive a refresh.
  await page.reload({waitUntil:"domcontentloaded"});
  assert.match(await page.locator("#totalProgress").textContent(),/1\s*\/\s*12/);
  const targets=[5,9,13,18,6,7,10,17,7,9,10,14];
  for(let i=1;i<targets.length;i++){
   await page.locator('#stationGrid .level[data-station="nlt-'+String(i+1).padStart(2,"0")+'"]').click();
   const value=String(targets[i]);
   assert.equal(await page.locator('#answerChoices button[data-value="'+value+'"]').count(),1,
    "Missing answer for stop "+(i+1));
   await page.locator('#answerChoices button[data-value="'+value+'"]').click();
   assert.match(await page.locator("#answerFeedback").textContent(),/Well done/);
  }
  assert.match(await page.locator("#totalProgress").textContent(),/12\s*\/\s*12/);
  assert.equal(await page.locator("#reward").isVisible(),true);
  const before=await page.evaluate(()=>({
   state:JSON.parse(localStorage.getItem("lla-number-line-trail-v1")),
   stars:JSON.parse(localStorage.getItem("lla-progress-v2")).stars
  }));
  assert.equal(before.state.done.length,12);
  assert.equal(before.state.rewarded,true);
  assert.equal(before.stars,1,"Finishing one trail should award exactly one star");
  await page.locator('#stationGrid .level[data-station="nlt-01"]').click();
  await page.locator('#answerChoices button[data-value="5"]').click();
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
  assert.equal(after,before.stars,"Replaying a completed stop must not farm stars");
  await page.setViewportSize({width:768,height:1024});
  await checkWidth();
  await page.setViewportSize({width:320,height:720});
  await checkWidth();
  assert.equal(errors.length,0,"Browser errors: "+errors.join(" | "));
  console.log("PASS: 12 guided number-line stops, hints, accessible choices, saved progress, one star and phone/tablet widths");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
