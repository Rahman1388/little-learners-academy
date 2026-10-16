/* Mobile/browser regression: 5 modules x 4 skill cards, safe retries, local-only progress. */
"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const fs=require("node:fs"),vm=require("node:vm");
const box={window:{}};vm.runInNewContext(fs.readFileSync("grade2-four-skills-data.js","utf8"),box);
const modules=box.window.LLA_G2_FOUR_SKILLS;
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 await page.goto(base+"/grade2-four-skills.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#moduleButtons button").count(),5);
 const overflow=async()=>{
  const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(size.scroll<=size.viewport+3,"Horizontal overflow "+JSON.stringify(size));
 };
 await overflow();
 for(const [j,m] of modules.entries()){
  await page.locator("#moduleButtons button").nth(j).click();
  assert.equal(await page.locator("#skillCards .skill").count(),4);
  const phonics=page.locator("#phonicsPractice .phonics-question");
  assert.equal(await phonics.count(),j===0?0:2);
  if(j>0){
   for(const [i,q] of m.phonics.entries()){
    const card=phonics.nth(i);
    if(j===1&&i===0){
     await card.locator("button.phonics-choice").nth((q.answer+1)%3).click();
     assert.match(await card.locator(".feedback").innerText(),/Try another word/);
    }
    await card.locator("button.phonics-choice").nth(q.answer).click();
    assert.match(await card.locator(".feedback").innerText(),/No pronunciation was assessed/);
   }
  }
  const listen=page.locator('.skill[data-skill="listening"]');
  await listen.locator("details summary").click();
  assert(await listen.locator("details").evaluate(x=>x.open));
  if(j===0){
   const wrong=(m.listen.answer+1)%3;
   await listen.locator(".choice").nth(wrong).click();
   assert.match(await listen.locator(".feedback").innerText(),/Try again/);
  }
  await listen.locator(".choice").nth(m.listen.answer).click();
  assert.match(await listen.locator(".feedback").innerText(),/Correct/);
  await page.locator('.skill[data-skill="speaking"] .primary').click();
  assert.match(await page.locator('.skill[data-skill="speaking"] .feedback').innerText(),/Attempt recorded/);
  const reading=page.locator('.skill[data-skill="reading"]');
  await reading.locator(".choice").nth(m.read.answer).click();
  const writing=page.locator('.skill[data-skill="writing"]');
  if(j===0){
   await writing.locator("input").fill("wrong words");
   await writing.locator("button.primary").click();
   assert.match(await writing.locator(".feedback").innerText(),/Try again/);
  }
  await writing.locator("input").fill(m.write.answer);
  await writing.locator("button.primary").click();
  assert.match(await writing.locator(".feedback").innerText(),/match the guided model sentence/);
  assert.match(await page.locator("#moduleCount").innerText(),/4 \/ 4/);
  await overflow();
 }
 assert.match(await page.locator("#progressText").innerText(),/20 \/ 20/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#progressText").innerText(),/20 \/ 20/);
 await page.setViewportSize({width:390,height:844});await overflow();
 await page.setViewportSize({width:768,height:1024});await overflow();
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: Grade 2 20 saved practices + 8 optional phonics checks, retries, persistence and mobile viewports");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
