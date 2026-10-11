/* Focused Playwright regression for pronunciation review on mobile/tablet.
 * Run after python3 -m http.server 8765 and npm install playwright.
 */
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const page=await ctx.newPage();
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.addInitScript(()=>{
  window.__clips=[];
  const OriginalAudio=window.Audio;
  window.Audio=function(src){
    window.__clips.push(String(src||""));
    const audio=new OriginalAudio(src);audio.play=()=>Promise.resolve();return audio;
  };
 });
 const go=path=>page.goto("http://127.0.0.1:8765/"+path,{waitUntil:"domcontentloaded"});
 const fit=async()=>{
  const w=await page.evaluate(()=>[document.documentElement.scrollWidth,window.innerWidth]);
  assert(w[0]<=w[1]+3,"Horizontal mobile overflow: "+w);
 };
 await go("pronunciation-review.html?lesson=patterns");
 await page.locator("#cards .item").first().waitFor();
 assert.equal(await page.locator("#cards .item").count(),4);
 assert.equal(await page.locator("#cards audio").count(),16);
 assert.equal(await page.locator("#lessonSelect").inputValue(),"patterns");
 const src=await page.locator("#cards .item").first().locator("audio").first().getAttribute("src");
 assert(src.includes("audio/en/patterns-0-girl.mp3"),"Wrong red audio source");
 const labels=await page.locator("#cards .item").first().locator("h3").allTextContents();
 assert(labels[2].includes("REVIEW ONLY"),"Unapproved female Arabic not labelled");
 await page.locator("#cards .item").first().locator('[data-rating="unclear"]').first().click();
 assert.match(await page.locator("#report").textContent(),/red.*unclear/i);
 await page.locator("#lessonSelect").selectOption("words");
 assert.equal(await page.locator("#cards .item").count(),4);
 await page.locator("#cards .item").first().locator('[data-rating="wrong"]').first().click();
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#report").textContent(),/Everyday Words \/ home \/ English female-style: wrong/);
 await fit();
 await page.setViewportSize({width:768,height:1024});await fit();
 await page.setViewportSize({width:390,height:844});
 await go("index.html");
 await page.locator("#girlVoice").click();
 await page.locator('#subjects .subject[data-id="arts"]').click();
 await page.locator('#lessonList .lessonCard[data-id="patterns"]').click();
 assert.equal(await page.locator(".speakBtn.en:disabled").count(),4,"Colour English audio should be paused");
 assert.equal(await page.locator(".speakBtn.arBtn:disabled").count(),4,"Colour Arabic audio should be paused");
 assert.match(await page.locator("#lessonIntro").textContent(),/recordings are being reviewed/);
 assert((await page.locator('#lessonIntro a[href*="pronunciation-review.html"]').getAttribute("href")).includes("patterns"));
 const before=await page.evaluate(()=>window.__clips.length);
 await page.locator("#previewEnglishVoice").click();
 assert.match(await page.locator("#voiceStatus").textContent(),/paused for pronunciation review/);
 assert.equal(await page.evaluate(()=>window.__clips.length),before,"Paused colour audio played unexpectedly");
 await page.locator("#lessonBack").click();
 await page.locator("#subjectBack").click();
 await page.locator('#subjects .subject[data-id="english"]').click();
 await page.locator('#lessonList .lessonCard[data-id="words"]').click();
 const beforeFlagged=await page.evaluate(()=>window.__clips.length);
 await page.locator(".speakBtn.en").first().click();
 assert.match(await page.locator("#feedback").textContent(),/paused for pronunciation review/);
 assert.equal(await page.evaluate(()=>window.__clips.length),beforeFlagged,"Previously flagged clip played unexpectedly");
 await fit();
 assert.deepEqual(errors,[],"Browser JS errors");
 console.log("PASS: 52-word studio, both languages/profiles, parent ratings, safe colour-audio hold and no device fallback");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
