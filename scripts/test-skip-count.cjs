/* Skip-Count Rocket: actual browser regression at iPhone and tablet widths.
 * Exercises hints, wrong answers, all 12 missions, progress and one-time rewards.
 */
"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,serviceWorkers:"block",locale:"en-GB"});
 const page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 async function width(){
  const x=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(x.doc<=x.viewport+3,"Horizontal overflow: "+JSON.stringify(x));
 }
 try{
  await page.goto(base+"/skip-count-rocket.html",{waitUntil:"domcontentloaded",timeout:35000});
  await page.locator("#missionGrid .route").first().waitFor();
  assert.equal(await page.locator("#missionGrid .route").count(),12);
  assert.equal(await page.locator("#numberLane .point").count(),4);
  await width();
  assert.match(await page.locator("#rocketProgress").textContent(),/0\s*\/\s*12/);
  // First mission: 0 + three jumps of 2 = 6. A wrong answer cannot earn progress.
  await page.locator('#answerChoices button[data-value="8"]').click();
  assert.match(await page.locator("#answerStatus").textContent(),/Good try/);
  assert.match(await page.locator("#rocketProgress").textContent(),/0\s*\/\s*12/);
  await page.locator("#showHint").click();
  assert.match(await page.locator("#modelStatus").textContent(),/Count 2 each time/);
  await page.locator("#showModel").click();
  assert.match(await page.locator("#modelStatus").textContent(),/Jump 1 of 3/);
  assert.equal(await page.locator("#numberLane .point.visited").count(),1);
  await page.locator('#answerChoices button[data-value="6"]').click();
  assert.match(await page.locator("#answerStatus").textContent(),/Great thinking/);
  assert.match(await page.locator("#rocketProgress").textContent(),/1\s*\/\s*12/);
  await page.reload({waitUntil:"domcontentloaded"});
  assert.match(await page.locator("#rocketProgress").textContent(),/1\s*\/\s*12/);
  const targets=[6,8,12,20,15,25,30,40,30,50,25,30];
  for(let i=1;i<targets.length;i++){
   const id="scr-"+String(i+1).padStart(2,"0");
   await page.locator('#missionGrid .route[data-mission="'+id+'"]').click();
   const correct=page.locator('#answerChoices button[data-value="'+targets[i]+'"]');
   assert.equal(await correct.count(),1,"Incorrect/missing answer at "+id);
   await correct.click();
   assert.match(await page.locator("#answerStatus").textContent(),/Great thinking/);
  }
  assert.match(await page.locator("#rocketProgress").textContent(),/12\s*\/\s*12/);
  assert.equal(await page.locator("#rocketReward").isVisible(),true);
  const saved=await page.evaluate(()=>({
   game:JSON.parse(localStorage.getItem("lla-skip-count-rocket-v1")),
   main:JSON.parse(localStorage.getItem("lla-progress-v2"))
  }));
  assert.equal(saved.game.done.length,12);
  assert.equal(saved.game.rewarded,true);
  assert.equal(saved.main.stars,1,"One achievement must yield exactly one star");
  await page.locator('#missionGrid .route[data-mission="scr-01"]').click();
  await page.locator('#answerChoices button[data-value="6"]').click();
  const stars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
  assert.equal(stars,1,"Replaying cannot farm additional stars");
  await page.setViewportSize({width:320,height:720});await width();
  await page.setViewportSize({width:768,height:1024});await width();
  assert.equal(errors.length,0,"Page errors: "+errors.join(" | "));
  console.log("PASS: 12 rocket missions; equal-size jumps, hints, wrong-answer recovery, browser-local progress, single reward, 320/390/768px widths");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});