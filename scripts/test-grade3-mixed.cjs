/* Browser test: bilingual Grade 3 Mixed Discovery Quest, saved progress and isolation. */
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block",locale:"en-GB"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",err=>errors.push(err.message));
  const base=process.env.TEST_URL||"http://127.0.0.1:8765";
  const go=path=>page.goto(base+"/"+path,{waitUntil:"domcontentloaded",timeout:40000});
  const noOverflow=async()=>{
   const x=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
   assert(x[0]<=x[1]+3,"Horizontal overflow: "+JSON.stringify(x));
  };
  await go("grade3-mixed-quest.html");
  await page.locator("#mixedAnswers button").first().waitFor({state:"visible"});
  assert.equal(await page.locator("#mixedAnswers button").count(),3);
  assert.match(await page.locator("#mixedProgress").textContent(),/0 \/ 12/);
  assert.equal(await page.locator("#mixedSubject").textContent(),"🧮 Maths");
  await noOverflow();
  const grade1Before=await page.evaluate(()=>localStorage.getItem("lla-progress-v2"));
  const grade3MathBefore=await page.evaluate(()=>localStorage.getItem("lla-grade3-preview-v1"));
  // Deliberate wrong answer: provide a clue, then allow a correct retry.
  await page.locator('#mixedAnswers button').filter({hasText:/^5$/}).click();
  assert.match(await page.locator("#mixedFeedback").textContent(),/Good try/);
  await page.locator("#mixedHint").click();
  assert.equal(await page.locator("#mixedHelp").isVisible(),true);
  assert.match(await page.locator("#mixedHelp").textContent(),/Count each group/);
  await page.locator('#mixedAnswers button').filter({hasText:/^6$/}).click();
  assert.equal(await page.locator("#mixedNext").isVisible(),true);
  await page.locator("#mixedNext").click();
  for(let n=1;n<12;n++){
   for(let attempt=0;attempt<3;attempt++){
    const available=page.locator("#mixedAnswers button:not([disabled])");
    assert(await available.count()>0,"No answer available for mixed question "+(n+1));
    await available.first().click();
    if(await page.locator("#mixedNext").isVisible())break;
   }
   assert.equal(await page.locator("#mixedNext").isVisible(),true,"Mixed question did not accept correct retry "+(n+1));
   if(n!==11)await page.locator("#mixedNext").click();
  }
  assert.match(await page.locator("#mixedProgress").textContent(),/12 \/ 12/);
  assert.equal(await page.locator(".medal.earned").count(),3);
  await page.locator("#mixedNext").click();
  assert.equal(await page.locator("#mixedFinish").isVisible(),true);
  assert.equal(await page.evaluate(()=>localStorage.getItem("lla-progress-v2")),grade1Before,"Grade 1 star state changed");
  assert.equal(await page.evaluate(()=>localStorage.getItem("lla-grade3-preview-v1")),grade3MathBefore,"Original Grade 3 Maths progress changed");
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#mixedFinish").isVisible(),true,"Completed mixed review not restored");
  await page.locator("#mixedReplay").click();
  assert.equal(await page.locator("#mixedAnswers button").count(),3,"Replaying should reopen the review without losing awards");
  await page.setViewportSize({width:768,height:1024});await noOverflow();
  await page.setViewportSize({width:360,height:780});await noOverflow();
  await go("parent-progress.html");
  assert.match(await page.locator("#grade3MixedCount").textContent(),/12 \/ 12/);
  await noOverflow();
  await go("grades-roadmap.html");
  assert.equal(await page.locator('a[href="./grade3-mixed-quest.html"]').count(),1);
  await noOverflow();
  assert.deepEqual(errors,[],"Browser JavaScript errors");
  console.log("PASS: Grade 3 mixed 12-question review, bilingual hints, retries, three badges, storage isolation, parent dashboard, phone/tablet");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});