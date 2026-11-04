"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const errors=[];page.on("pageerror",err=>errors.push(err.message));
  const base=process.env.TEST_URL||"http://127.0.0.1:8765";
  await page.goto(base+"/nature-spotter.html",{waitUntil:"domcontentloaded",timeout:40000});
  await page.locator("#objects button").first().waitFor();
  const widthCheck=async()=>{
   const size=await page.evaluate(()=>({w:document.documentElement.scrollWidth,v:window.innerWidth}));
   assert(size.w<=size.v+3,"Mobile horizontal overflow: "+JSON.stringify(size));
  };
  await widthCheck();
  assert.equal(await page.locator("#sceneChoices button").count(),3);
  assert.equal(await page.locator("#objects button").count(),4);
  assert.match(await page.locator("#discoveryCount").textContent(),/0 of 4/);
  assert.equal(await page.locator("#familyCard").isVisible(),false);
  // An empty observation cannot be misrepresented as learning progress.
  await page.locator("#showCard").click();
  assert.equal(await page.locator("#familyCard").isVisible(),false);
  assert.match(await page.locator("#discovery").textContent(),/Try tapping one picture first/);
  // Explore two objects, see native text on cards, then create family recap.
  await page.locator('#objects button[data-object="tree"]').click();
  assert.match(await page.locator("#discovery").textContent(),/salty coasts/);
  assert.match(await page.locator("#discovery").textContent(),/القرم/);
  assert.equal(await page.locator('#objects button[data-object="tree"]').getAttribute("aria-pressed"),"true");
  await page.locator('#objects button[data-object="crab"]').click();
  assert.match(await page.locator("#discoveryCount").textContent(),/2 of 4/);
  await page.locator("#showCard").click();
  assert.equal(await page.locator("#familyCard").isVisible(),true);
  assert.equal(await page.locator("#cardCount").textContent(),"2");
  assert.equal(await page.locator("#cardList li").count(),2);
  assert.match(await page.locator("#cardNext").textContent(),/talk together/);
  // Print only on parent click. No export, tracking or submission.
  await page.evaluate(()=>{window.__printed=false;window.print=()=>{window.__printed=true}});
  await page.locator("#printCard").click();
  assert.equal(await page.evaluate(()=>window.__printed),true);
  await page.locator("#closeCard").click();
  assert.equal(await page.locator("#familyCard").isVisible(),false);
  // Scene change resets observations in session rather than mixing unrelated contexts.
  await page.locator('#sceneChoices button[data-scene="desert"]').click();
  assert.equal(await page.locator("#objects button").count(),4);
  assert.match(await page.locator("#discoveryCount").textContent(),/0 of 4/);
  assert.equal(await page.locator('#sceneChoices button[data-scene="desert"]').getAttribute("aria-pressed"),"true");
  await page.locator('#objects button[data-object="camel"]').click();
  assert.match(await page.locator("#discovery").textContent(),/Camels have adaptations/);
  await page.locator("#reset").click();
  assert.match(await page.locator("#discoveryCount").textContent(),/0 of 4/);
  await page.locator('#sceneChoices button[data-scene="coast"]').click();
  await page.locator('#objects button[data-object="shell"]').click();
  await page.locator("#showCard").click();
  assert.equal(await page.locator("#cardList li").count(),1);
  assert.match(await page.locator("#cardScene").textContent(),/Coastal explorer/);
  assert.equal(await page.evaluate(()=>localStorage.length),0);
  // Reload is a fresh visit; never save personal or learning records.
  await page.reload({waitUntil:"domcontentloaded"});
  assert.match(await page.locator("#discoveryCount").textContent(),/0 of 4/);
  assert.equal(await page.locator('#sceneChoices button[data-scene="mangrove"]').getAttribute("aria-pressed"),"true");
  for(const w of [320,390,768]){
   await page.setViewportSize({width:w,height:844});await widthCheck();
   assert.equal(await page.locator("#objects button").count(),4);
  }
  assert.deepEqual(errors,[],"Unexpected browser JS errors");
  console.log("PASS: bilingual Nature Spotter, printable private parent recap, reset, scene switch and 320–768px mobile layout.");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
