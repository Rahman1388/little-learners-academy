/* Equal Groups Garden: phone/tablet regression with all twelve maths arrays. */
"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const MISSIONS=[[2,2],[2,3],[3,2],[2,4],[3,3],[4,2],[3,4],[5,2],[4,3],[5,3],[4,4],[5,5]];
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({
  viewport:{width:390,height:844},isMobile:true,hasTouch:true,
  deviceScaleFactor:1,serviceWorkers:"block",locale:"en-GB"
 });
 const page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 async function width(){
  const x=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(x.doc<=x.viewport+3,"Horizontal overflow: "+JSON.stringify(x));
 }
 async function openPath(i){
  await page.locator('#levelCards .level[data-level="'+i+'"]').click();
  assert.equal(await page.locator("#missionView").isVisible(),true);
 }
 async function reveal(count){
  for(let j=0;j<count;j++)await page.locator("#revealGroup").click();
 }
 try{
  await page.goto(base+"/array-garden.html",{waitUntil:"domcontentloaded",timeout:35000});
  await page.locator("#levelCards .level").first().waitFor();
  assert.equal(await page.locator("#levelCards .level").count(),3);
  await width();
  assert.match(await page.locator("#gardenProgress").textContent(),/0 \/ 12/);
  await openPath(0);
  assert.equal(await page.locator("#answerChoices button").first().isDisabled(),true,
   "Children should reveal concrete groups before attempting multiplication.");
  await page.locator("#showHint").click();
  assert.match(await page.locator("#hintText").textContent(),/Count in 2s/);
  await reveal(2);
  assert.equal(await page.locator("#groupDisplay .objectRow").count(),2);
  assert.equal(await page.locator("#groupDisplay .objectRow span").count(),4);
  assert.equal(await page.locator("#answerChoices button").first().isEnabled(),true);
  await page.locator('#answerChoices button[data-value="6"]').click();
  assert.match(await page.locator("#feedback").textContent(),/Good try/);
  assert.match(await page.locator("#gardenProgress").textContent(),/0 \/ 12/);
  await page.locator('#answerChoices button[data-value="4"]').click();
  assert.match(await page.locator("#workedExample").textContent(),/2 × 2 = 4/);
  assert.match(await page.locator("#gardenProgress").textContent(),/1 \/ 12/);
  await page.reload({waitUntil:"domcontentloaded"});
  assert.match(await page.locator("#gardenProgress").textContent(),/1 \/ 12/);
  const firstStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2"))?.stars||0);
  assert.equal(firstStars,0,"A single model mission should not award the full-game star.");
  for(let i=1;i<MISSIONS.length;i++){
   const [rows,cols]=MISSIONS[i];
   await openPath(Math.floor(i/4));
   assert.match(await page.locator("#missionLabel").textContent(),new RegExp("Mission "+(i+1)+" / 12"));
   await reveal(rows);
   assert.equal(await page.locator("#groupDisplay .objectRow").count(),rows);
   assert.equal(await page.locator("#groupDisplay .objectRow span").count(),rows*cols);
   await page.locator('#answerChoices button[data-value="'+(rows*cols)+'"]').click();
   assert.match(await page.locator("#feedback").textContent(),/You found the total/);
   assert.match(await page.locator("#gardenProgress").textContent(),new RegExp((i+1)+" \/ 12"));
   if(i!==MISSIONS.length-1)await page.locator("#goBack").click();
  }
  assert.equal(await page.locator("#success").isVisible(),true);
  const saved=await page.evaluate(()=>({
   game:JSON.parse(localStorage.getItem("lla-array-garden-v1")),
   main:JSON.parse(localStorage.getItem("lla-progress-v2"))
  }));
  assert.equal(saved.game.completed.length,12);
  assert.equal(saved.game.rewarded,true);
  assert.equal(saved.main.stars,1,"Exactly one star should be awarded on first completion.");
  await page.locator("#goBack").click();
  await openPath(0);
  await reveal(2);
  await page.locator('#answerChoices button[data-value="4"]').click();
  const replayStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
  assert.equal(replayStars,1,"Replays may not earn duplicate stars.");
  await page.reload({waitUntil:"domcontentloaded"});
  assert.match(await page.locator("#gardenProgress").textContent(),/12 \/ 12/);
  await page.setViewportSize({width:320,height:720});await width();
  await page.setViewportSize({width:768,height:1024});await width();
  assert.equal(errors.length,0,"Unexpected browser errors: "+errors.join(" | "));
  console.log("PASS: 12 visual arrays, step-by-step row reveal, hints, wrong answers, 1-star cap, progress and 320/390/768 widths.");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});