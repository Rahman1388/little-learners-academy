"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const errors=[],base=process.env.TEST_URL||"http://127.0.0.1:8765";
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  page.on("pageerror",err=>errors.push(err.message));
  await page.goto(base+"/nature-trail.html",{waitUntil:"domcontentloaded",timeout:40000});
  await page.locator("#answers button").first().waitFor();
  const checkWidth=async()=>{
   const sizes=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,view:window.innerWidth}));
   assert(sizes.scrollWidth<=sizes.view+3,"Overflow at "+sizes.view+": "+JSON.stringify(sizes));
  };
  assert.equal(await page.locator("#answers button").count(),3);
  assert.match(await page.locator("#questionAr").textContent(),/أيّ/);
  await checkWidth();
  await page.locator('#answers button[data-option="1"]').click();
  assert.match(await page.locator("#feedback").textContent(),/try another idea/i);
  assert.equal(await page.locator("#next").isVisible(),false);
  await page.locator("#hintButton").click();
  assert.equal(await page.locator("#hint").isVisible(),true);
  assert.match(await page.locator("#hint").textContent(),/انظر|ابحث/);
  await page.locator('#answers button[data-option="0"]').click();
  assert.match(await page.locator("#progress").textContent(),/1 of 4/);
  assert.equal(await page.locator("#familyTalk").isVisible(),true);
  await page.locator("#next").click();
  assert.equal(await page.locator("#scene").getAttribute("data-scene"),"desert");
  for(const correct of [1,2,1]){
   await page.locator('#answers button[data-option="'+correct+'"]').click();
   assert.equal(await page.locator("#next").isVisible(),true);
   await page.locator("#next").click();
  }
  assert.equal(await page.locator("#finish").isVisible(),true);
  assert.match(await page.locator("#finishText").textContent(),/4 of 4/);
  await page.locator("#again").click();
  assert.match(await page.locator("#progress").textContent(),/0 of 4/);
  // Age-group selection restarts only in-page progress, not children's saved records.
  await page.locator("#level").selectOption("3-4");
  assert.match(await page.locator("#questionAr").textContent(),/موطن/);
  assert.equal(await page.locator("#scene").getAttribute("data-scene"),"mangrove");
  await page.locator('#answers button[data-option="0"]').click();
  assert.match(await page.locator("#progress").textContent(),/1 of 4/);
  await page.locator("#level").selectOption("5-6");
  assert.match(await page.locator("#progress").textContent(),/0 of 4/);
  await page.locator("#stop").click();
  assert.equal(await page.locator("#finish").isVisible(),true);
  assert.match(await page.locator("#finishText").textContent(),/0 of 4/);
  assert.equal(await page.evaluate(()=>localStorage.getItem("lla-nature-trail-v1")),null);
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#level").inputValue(),"1-2");
  for(const width of [320,390,768]){
   await page.setViewportSize({width,height:844});
   await checkWidth();
   assert.equal(await page.locator("#answers button").count(),3);
  }
  assert.deepEqual(errors,[],"Browser script errors");
  console.log("PASS: Nature Trail Grade 1–6 bilingual interaction, finish/retry/hints and 320/390/768px widths.");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
