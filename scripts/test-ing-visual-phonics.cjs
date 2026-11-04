/* Draft Grade 2 -ing visual phonics browser tests, not teacher or real phone approval. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const {chromium}=require("playwright");
const html=fs.readFileSync("grade2-ing-visual-phonics.html","utf8");
const script=fs.readFileSync("grade2-ing-visual-phonics.js","utf8");
new(require("node:vm").Script)(script);
for(const mark of ['content="noindex,nofollow"',"connect-src 'none'",'id="practiceChoices"','id="playButton"','id="audioStatus"','aria-live="polite"','prefers-reduced-motion']){
 assert(html.includes(mark),"Missing required marker: "+mark);
}
for(const bad of [/\bfetch\s*\(/,/XMLHttpRequest/,/sendBeacon/,/localStorage/,/sessionStorage/,/getUserMedia/,/MediaRecorder/,/SpeechRecognition/,/innerHTML\s*=/]){
 assert(!bad.test(script),"Forbidden pattern: "+bad);
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:780},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 page.setDefaultTimeout(12000);
 // Headless browsers do not provide a reliable physical voice. Simulate the
 // browser speech API to test button wiring only, NEVER audio quality.
 await page.addInitScript(()=>{
  class FakeUtterance{constructor(word){this.text=word;this.lang="en-GB";this.rate=1}}
  const fakeSpeech={cancel(){},getVoices(){return [{lang:"en-GB",default:true}]},speak(u){if(typeof u.onstart==="function")u.onstart()}};
  Object.defineProperty(window,"SpeechSynthesisUtterance",{value:FakeUtterance,configurable:true});
  Object.defineProperty(window,"speechSynthesis",{value:fakeSpeech,configurable:true});
 });
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const errors=[],external=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",request=>{if(!request.url().startsWith(base+"/"))external.push(request.url())});
 await page.goto(base+"/grade2-ing-visual-phonics.html",{waitUntil:"domcontentloaded"});
 assert.match(await page.title(),/REVIEW DRAFT/);
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false","Must not autoplay");
 assert.match(await page.locator("#audioStatus").innerText(),/Optional:/);
 assert.match(await page.locator("#sceneCaption").innerText(),/ring/);
 assert.equal(await page.locator("#whole").innerText(),"ring");
 assert.equal(await page.locator("#onset").innerText(),"r");
 assert(await page.locator("#previousButton").isDisabled());
 await page.locator("#nextButton").click();
 assert.match(await page.locator("#sceneHeading").innerText(),/We can sing/);
 assert.equal(await page.locator("#onset").innerText(),"s");
 assert.equal(await page.locator("#whole").innerText(),"sing");
 assert(await page.locator("#sceneHeading").evaluate(e=>document.activeElement===e));
 await page.locator("#nextButton").click();
 assert(await page.locator("#wordArea").isHidden(),"Third scene compares two words");
 assert(await page.locator("#hearButton").isDisabled(),"No speech for unlabelled scene");
 await page.locator("#arButton").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"ar");
 assert.equal(await page.locator("html").getAttribute("dir"),"rtl");
 assert.match(await page.locator("#sceneCaption").innerText(),/ring وsing/);
 assert.match(await page.locator("#tryPrompt").innerText(),/عائلة -ing/);
 assert.equal(await page.locator("#practiceChoices button").count(),3);
 await page.locator('[data-choice="sand"]').click();
 assert.match(await page.locator("#tryFeedback").innerText(),/sand وhand/);
 assert(await page.locator('[data-choice="king"]').isEnabled(),"Wrong answer must not block retry");
 await page.locator("#hintButton").click();
 assert.equal(await page.locator("#hintButton").getAttribute("aria-expanded"),"true");
 assert.match(await page.locator("#hintContent").innerText(),/i - n - g/);
 await page.locator("#enButton").click();
 assert.equal(await page.locator("html").getAttribute("dir"),"ltr");
 assert.match(await page.locator("#tryFeedback").innerText(),/sand.*hand.*-and/);
 assert(await page.locator("#hintContent").isVisible(),"Hint preserved during language switch");
 await page.locator('[data-choice="king"]').click();
 assert.match(await page.locator("#tryFeedback").innerText(),/king.*-ing/);
 assert(await page.locator('[data-choice="sand"]').isDisabled());
 await page.locator("#arButton").click();
 assert.match(await page.locator("#tryFeedback").innerText(),/king/);
 await page.locator("#retryButton").click();
 assert.match(await page.locator("#tryFeedback").innerText(),/الأحرف الأخيرة/);
 assert(await page.locator("#hintContent").isHidden());
 assert(await page.locator('[data-choice="hand"]').isEnabled());
 assert(await page.locator("#tryHeading").evaluate(e=>document.activeElement===e));
 await page.locator("#enButton").click();
 await page.locator("#replayButton").click();
 assert.equal(await page.locator("#whole").innerText(),"ring");
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"true");
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false");
 await page.locator("#hearButton").click();
 assert.match(await page.locator("#audioStatus").innerText(),/(device voice|Device speech|device voice did not play)/i);
 await page.locator("#stopVoiceButton").click();
 assert.match(await page.locator("#audioStatus").innerText(),/stopped/);
 for(const lang of ["en","ar"]){
  await page.locator(lang==="ar"?"#arButton":"#enButton").click();
  for(const width of [280,320,390,768,1024]){
   await page.setViewportSize({width,height:840});
   const v=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert(v.scroll<=v.viewport+3,"Horizontal overflow "+lang+" "+width+": "+JSON.stringify(v));
  }
 }
 assert.deepEqual(external,[]);
 assert.equal(await page.evaluate(()=>Object.keys(localStorage).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(sessionStorage).length),0);
 assert.deepEqual(errors,[],"Unexpected JavaScript errors");
 await browser.close();
 console.log("PASS: Grade 2 phonics bilingual story, optional pronunciation, independent practice, accessibility and privacy.");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
