/* Browser-level smoke tests for the REAL app on phone-size screens.
 * Run with a local HTTP server (python3 -m http.server 8765) + Playwright.
 */
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const fs=require("node:fs");

(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({
   viewport:{width:390,height:844},deviceScaleFactor:1,
   isMobile:true,hasTouch:true,serviceWorkers:"block",locale:"en-GB"
 });
 const page=await context.newPage();
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 await page.addInitScript(()=>{
   window.__recordedAudioUrls=[];
   const RealAudio=window.Audio;
   window.Audio=function(src){
     window.__recordedAudioUrls.push(String(src||""));
     const a=new RealAudio(src);
     a.play=function(){return Promise.resolve()};
     return a;
   };
 });
 const goto=async(path)=>page.goto(base+"/"+path,{waitUntil:"domcontentloaded",timeout:40000});
 const assertMobile=async()=>{
   const size=await page.evaluate(()=>({w:document.documentElement.scrollWidth,view:window.innerWidth}));
   assert(size.w<=size.view+3, "Horizontal scrolling on mobile: "+JSON.stringify(size));
 };

 await goto("index.html");
 await page.locator("#subjects .subject").first().waitFor({state:"visible"});
 await assertMobile();
 await page.locator("#girlVoice").click();
 const enPreview=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(/audio\/practice\/en-phonics-0-girl\.mp3/.test(enPreview),"Female English preview did not use three-repeat recorded voice");

 await page.locator('#subjects .subject[data-id="english"]').click();
 await page.locator('#lessonList .lessonCard[data-id="phonics"]').click();
 await page.locator("#lessonView").waitFor({state:"visible"});
 await page.locator(".speakBtn.arBtn").first().click();
 const arPreview=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(/audio\/practice\/ar-phonics-0-boy\.mp3/.test(arPreview),
   "Arabic female review did not safely use the approved male reference");
 await page.locator("#questLessonLink").click();
 await page.locator("#wordText").waitFor({state:"visible"});
 assert.equal(await page.locator("#wordText").textContent(),"cat");
 await assertMobile();

 for(const letter of ["c","a","t"])
   await page.locator("#letterOptions .letterTile").filter({hasText:new RegExp("^"+letter+"$")}).click();
 assert.equal(await page.locator("#blendWord").isDisabled(),false);
 await page.locator("#blendWord").click();
 await page.locator("#pictureChoices .pictureChoice[aria-label='Picture of cat']").click();
 assert.equal(await page.locator("#successPanel").isVisible(),true);
 assert.match(await page.locator("#questStars").textContent(),/1\s*\/\s*4/);
 await page.locator("#nextWord").click();
 assert.equal(await page.locator("#wordText").textContent(),"fish");
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#questStars").waitFor({state:"visible"});
 assert.match(await page.locator("#questStars").textContent(),/1\s*\/\s*4/);
 await assertMobile();

 await goto("voice-test.html");
 await page.locator("audio").first().waitFor();
 const numPlayers=await page.locator("audio").count();
 assert(numPlayers>=10,"Voice review page is missing comparison players");
 await page.waitForFunction(()=>{
   const p=document.querySelector("audio");
   return p&&p.readyState>=1&&Number.isFinite(p.duration)&&p.duration>0;
 },{timeout:16000});
 const status=await page.locator(".audioLoadStatus").first().textContent();
 assert(/ready/i.test(status),"Audio loading state is not reporting readiness: "+status);
 const duration=await page.locator("audio").first().evaluate(player=>player.duration);
 assert(duration>2.1,"Audio should exceed 2 seconds after adding three repeats: "+duration);
 const url=await page.locator("audio").first().getAttribute("src");
 assert(url.includes("audio/practice/en-sentences-0-girl.mp3"),"Voice testing page still uses the short source recording");
 assert.equal(await page.locator(".repeatClipBtn").count(),numPlayers,"Some audio players have no replay button");
 await page.locator("#practiceSpeed").check();
 const speed=await page.locator("audio").first().evaluate(player=>player.playbackRate);
 assert(Math.abs(speed-0.85)<0.01,"The slower listening mode is not working: "+speed);
 await assertMobile();
 assert.equal(errors.length,0,"Browser JavaScript errors: "+errors.join(" | "));
 console.log("PASS: mobile layout, three-repeat English and Arabic phonics, game, saved stars, 2+ second audio, replay buttons and optional slow playback");
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
