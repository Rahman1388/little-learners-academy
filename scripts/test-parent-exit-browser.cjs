/* Real-browser smoke checks for the parent checkpoint; outbound requests are intercepted locally. */
"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:"en-GB",serviceWorkers:"block"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",error=>errors.push(error.message));
  const base=process.env.TEST_URL||"http://127.0.0.1:8765";
  await page.goto(base+"/international-benchmark.html",{waitUntil:"domcontentloaded"});
  assert((await page.locator("a[data-parent-exit-url]").count())>=15,"Protected international references missing");
  assert.equal(await page.locator('a[href^="https://"]').count(),0,"Direct outbound href found");
  const khan=page.locator('a[data-parent-exit-url="https://www.khanacademy.org/kids/pricing"]').first();
  await khan.click();
  assert.equal(await page.locator("#llaParentExitOverlay").isVisible(),true,"Modal did not open");
  assert.equal(await page.locator("#llaExitHost").textContent(),"www.khanacademy.org");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#llaParentExitOverlay").isVisible(),false,"Escape should close");

  await khan.click();
  await page.locator("#llaExitAnswer").fill("0");
  await page.locator('#llaExitForm button[type="submit"]').click();
  assert.equal(await page.locator("#llaParentExitOverlay").isVisible(),true,"Wrong answer should not navigate");
  assert.match(await page.locator("#llaExitFeedback").textContent(),/try again/i);
  await page.locator("#llaExitStay").click();
  assert.equal(await page.locator("#llaParentExitOverlay").isVisible(),false,"Stay in app should close");

  // Test correct answer without an outside network request.
  await page.route("https://www.khanacademy.org/**",route=>route.fulfill({
   status:200,contentType:"text/html",body:"<html><title>Exit stub</title><body>Adult-approved exit</body></html>"
  }));
  await khan.click();
  const challenge=await page.locator("#llaExitQuestion").textContent();
  const parts=challenge.match(/(\d+)\s*×\s*(\d+)/);
  assert(parts,"Missing parent maths challenge");
  await page.locator("#llaExitAnswer").fill(String(Number(parts[1])*Number(parts[2])));
  await Promise.all([
   page.waitForURL(/www\.khanacademy\.org\/kids\/pricing/,{timeout:15000}),
   page.locator('#llaExitForm button[type="submit"]').click()
  ]);
  assert.match(await page.locator("body").textContent(),/Adult-approved exit/);

  await page.goto(base+"/school-pathways.html",{waitUntil:"domcontentloaded"});
  assert((await page.locator("#referenceLinks a[data-parent-exit-url]").count())>0,"Dynamically sourced school links should be protected");
  await page.locator("#referenceLinks a[data-parent-exit-url]").first().click();
  assert.equal(await page.locator("#llaParentExitOverlay").isVisible(),true,"Dynamic school link should open checkpoint");
  assert.equal(await page.locator('a[href^="https://"]').count(),0);
  const dimensions=await page.evaluate(()=>({content:document.documentElement.scrollWidth,width:innerWidth}));
  assert(dimensions.content<=dimensions.width+3,"Mobile horizontal overflow "+JSON.stringify(dimensions));
  assert.deepEqual(errors,[],"Browser JS errors");
  console.log("PASS: external links fail closed, modal Escape/Cancel, wrong and correct parent responses, school links, and 390px mobile width");
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
