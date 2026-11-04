"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  const base=process.env.TEST_URL||"http://127.0.0.1:8765";
  await page.goto(base+"/teacher-feedback.html",{waitUntil:"domcontentloaded",timeout:40000});
  assert.equal(await page.locator("#useAssignment").isDisabled(),true,"Quick start must not prefill until selected");
  assert.equal(await page.locator("#assignmentOpen").isVisible(),false);

  await page.locator("#reviewAssignment").selectOption("phonics");
  assert.match(await page.locator("#assignmentNotes").textContent(),/cat, fish, sun and bus/);
  assert.equal(await page.locator("#assignmentOpen").getAttribute("href"),"./pronunciation-review.html?lesson=phonics");
  await page.locator("#useAssignment").click();
  assert.equal(await page.locator("#grade").inputValue(),"Grade 1");
  assert.equal(await page.locator("#subject").inputValue(),"English reading");
  assert.equal(await page.locator("#reviewLink").inputValue(),"pronunciation-review.html?lesson=phonics");
  assert.equal(await page.locator("#questionCount").inputValue(),"","Preparing task must not invent a review count");
  await page.locator("#showFeedback").click();
  assert.match(await page.locator("#status").textContent(),/actual quality rating or written observation/);
  assert.equal(await page.locator("#preview").isVisible(),false,"Empty reviews must not be shareable");

  await page.locator("#arabic").selectOption("Revise");
  await page.locator("#issues").fill("phonics-0: Source clip is unclear on the phone; qualified educator recheck required.");
  await page.locator("#showFeedback").click();
  assert.equal(await page.locator("#preview").isVisible(),true);
  assert.match(await page.locator("#preview").inputValue(),/phonics-0:/);
  assert.match(await page.locator("#preview").inputValue(),/Arabic language: Revise/);
  assert.match(await page.locator("#status").textContent(),/Preview ready/);

  await page.locator("#reviewAssignment").selectOption("arabic");
  assert.equal(await page.locator("#assignmentOpen").getAttribute("href"),"./pronunciation-review.html?lesson=patterns");
  await page.evaluate(()=>window.confirm=()=>false);
  await page.locator("#useAssignment").click();
  assert.equal(await page.locator("#reviewLink").inputValue(),"pronunciation-review.html?lesson=phonics",
   "Declined assignment change must preserve reviewer work");
  await page.evaluate(()=>window.confirm=()=>true);
  await page.locator("#useAssignment").click();
  assert.equal(await page.locator("#reviewLink").inputValue(),"pronunciation-review.html?lesson=patterns");
  assert.equal(await page.locator("#subject").inputValue(),"Arabic language");
  assert.match(await page.locator("#issues").inputValue(),/phonics-0:/,
    "Choosing another review sample must preserve written evidence");

  await page.locator("#reviewAssignment").selectOption("accessibility");
  assert.equal(await page.locator("#assignmentOpen").getAttribute("href"),"./choose-grade.html");
  const hrefs=await page.locator("#assignmentOpen").getAttribute("href");
  assert(!hrefs.startsWith("http"),"Review assignments should remain same origin");
  for(const w of [320,390,768]){
   await page.setViewportSize({width:w,height:844});
   const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,view:innerWidth}));
   assert(bounds.width<=bounds.view+3,"Horizontal overflow at "+w+": "+JSON.stringify(bounds));
  }
  assert.deepEqual(errors,[],"Browser JavaScript errors");
  console.log("PASS: mobile educator quick-start assignments, protected unsent feedback, confirmation, reviewer evidence, 320/390/768px");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
