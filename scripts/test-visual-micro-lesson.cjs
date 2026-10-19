/* Browser review for captioned visual micro-lesson. Not a pedagogy or real-device audit. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const html=fs.readFileSync("grade2-visual-story.html","utf8");
const script=fs.readFileSync("grade2-visual-story.js","utf8");
new (require("node:vm").Script)(script);
for(const item of ['id="playButton"','id="arabicButton"','id="conceptMap"','aria-live="polite"','connect-src \'none\'',"prefers-reduced-motion"]){
 assert(html.includes(item),"Required feature missing: "+item);
}
for(const bad of [/\bfetch\s*\(/,/XMLHttpRequest/,/sendBeacon/,/localStorage/,/sessionStorage/,/getUserMedia/,/MediaRecorder/,/SpeechRecognition/,/innerHTML\s*=/]){
 assert(!bad.test(script),"Unsafe or unnecessary operation: "+bad);
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:780},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const errors=[],outside=[];
 page.on("pageerror",err=>errors.push(err.message));
 page.on("request",req=>{if(!req.url().startsWith(base+"/"))outside.push(req.url())});
 await page.goto(base+"/grade2-visual-story.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 assert.match(await page.locator("#stepCounter").innerText(),/Part 1 of 5/);
 assert.equal(await page.locator("#rods .rod").count(),1);
 assert.equal(await page.locator("#dots .dot").count(),0);
 assert(await page.locator("#previousButton").isDisabled());
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false","Video-style story should not autoplay");
 assert.match(await page.locator("#caption").innerText(),/blue stick/);
 await page.locator("#nextButton").click();
 assert.equal(await page.locator("#rods .rod").count(),4);
 assert.match(await page.locator("#equation").innerText(),/4 × 10 = 40/);
 assert(await page.locator("#stepTitle").evaluate(e=>document.activeElement===e),"Manual navigation must focus stage heading");
 await page.locator("#arabicButton").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"ar");
 assert.equal(await page.locator("html").getAttribute("dir"),"rtl");
 assert.equal(await page.locator("#arabicButton").getAttribute("aria-pressed"),"true");
 assert.match(await page.locator("#stepCounter").innerText(),/الجزء ٢ من ٥/);
 assert.match(await page.locator("#caption").innerText(),/أربع عشرات/);
 assert.equal(await page.locator("#rods .rod").count(),4,"Language switch keeps current scene");
 await page.locator("#nextButton").click();
 assert.equal(await page.locator("#dots .dot").count(),3);
 assert.match(await page.locator("#equation").innerText(),/٤٠ \+ ٣ = ٤٣/);
 assert.match(await page.locator("#mapTotal").innerText(),/٤٠ \+ ٣ = ٤٣/);
 assert.match(await page.locator("#mapIntro").innerText(),/ترافق الألوان دائمًا كلمات وأعداد/);
 await page.locator("#nextButton").click();
 assert.match(await page.locator("#caption").innerText(),/الرقم ٤ في منزلة العشرات/);
 await page.locator("#englishButton").click();
 assert.match(await page.locator("#caption").innerText(),/The 4 is in the tens place/);
 assert.equal(await page.locator("html").getAttribute("dir"),"ltr");
 await page.locator("#nextButton").click();
 assert(await page.locator("#nextButton").isDisabled(),"Story must stop at scene five");
 assert.match(await page.locator("#caption").innerText(),/explain how/);
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"true");
 assert.match(await page.locator("#stepCounter").innerText(),/Part 1 of 5/);
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false");
 await page.locator("#replayButton").click();
 assert.equal(await page.locator("#stepCounter").innerText(),"Part 1 of 5");
 assert.equal(await page.locator("#rods .rod").count(),1);
 // The Watch → Connect → Try path must teach transfer, not just replay the same 43.
 assert.match(await page.locator("#practicePrompt").innerText(),/new number 64/);
 assert.equal(await page.locator("#practiceChoices button").count(),3);
 assert.match(await page.locator("#practiceFeedback").innerText(),/Look at both digits/);
 await page.locator('[data-practice-choice="reversed"]').click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/Four tens and six ones would be 46/);
 assert(await page.locator('[data-practice-choice="correct"]').isEnabled(),"Wrong answer should not lock independent practice");
 await page.locator("#practiceHintButton").click();
 assert.equal(await page.locator("#practiceHintButton").getAttribute("aria-expanded"),"true");
 assert.match(await page.locator("#practiceHint").innerText(),/groups of ten/);
 await page.locator("#arabicButton").click();
 assert.match(await page.locator("#practiceHeading").innerText(),/حان دورك/);
 assert.match(await page.locator("#practicePrompt").innerText(),/العدد الجديد ٦٤/);
 assert.match(await page.locator("#practiceFeedback").innerText(),/العدد ٤٦/);
 assert.match(await page.locator("#practiceHint").innerText(),/الرقم ٦/);
 await page.locator('[data-practice-choice="correct"]').click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/٦٠ \+ ٤ = ٦٤/);
 assert(await page.locator("#practiceChoices button").first().isDisabled(),"Correct answer disables changes until reset");
 await page.locator("#englishButton").click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/60 \+ 4 = 64/);
 await page.locator("#practiceAgainButton").click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/Look at both digits/);
 assert(await page.locator("#practiceHint").isHidden(),"Retry should reset previous hints");
 assert(await page.locator("#practiceChoices button").first().isEnabled());
 assert(await page.locator("#practiceHeading").evaluate(e=>document.activeElement===e),"Practice reset should focus heading");
 await page.locator('[data-practice-choice="missing"]').click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/six tens and no ones would be 60/);
 for(const language of ["en","ar"]){
  await page.locator(language==="ar"?"#arabicButton":"#englishButton").click();
  for(const width of [280,320,390,768,1024]){
   await page.setViewportSize({width,height:840});
   const data=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
   assert(data.scroll<=data.width+3,"Horizontal overflow "+language+" at "+width+": "+JSON.stringify(data));
  }
 }
 assert.equal(await page.evaluate(()=>Object.keys(localStorage).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(sessionStorage).length),0);
 assert.deepEqual(errors,[],"No browser errors");
 assert.deepEqual(outside,[],"No third-party web requests");
 await browser.close();
 console.log("PASS: Watch/Connect/Try visual story, bilingual wrong/hint/retry practice, opt-in playback, responsive RTL and privacy");
})().catch(error=>{console.error(error.stack||error);process.exitCode=1});
