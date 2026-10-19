/* Public adult-facing preview tests only; no educator, Arabic, iPhone or official sign-off.
 * Serve repository root on localhost:8765 and run with Playwright Chromium.
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),{chromium}=require("playwright");
for(const [file,scripts] of [
 ["review/learning-previews.html",[]],
 ["review/tens-ones.html",["grade2-tens-ones-i18n.js","grade2-tens-ones-guided.js"]],
 ["review/visual-story.html",["grade2-visual-story.js"]]
]){
 const c=fs.readFileSync(file,"utf8");
 assert(c.includes('content="noindex,nofollow"'),file+" must be noindex");
 assert(c.includes("REVIEW"),file+" requires prominent review labeling");
 for(const s of scripts){
  assert(c.includes('src="./'+s+'"'),file+" missing script "+s);
  assert(fs.existsSync("review/"+s),"Missing review dependency "+s);
 }
}
for(const file of ["review/grade2-tens-ones-i18n.js","review/grade2-tens-ones-guided.js","review/grade2-visual-story.js"]){
 new(require("node:vm").Script)(fs.readFileSync(file,"utf8"));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[],external=[],base=process.env.TEST_URL||"http://127.0.0.1:8765";
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",req=>{if(!req.url().startsWith(base+"/"))external.push(req.url())});
 await page.goto(base+"/review/learning-previews.html",{waitUntil:"domcontentloaded"});
 assert.match(await page.locator("h1").innerText(),/Learning Preview Hub/);
 assert.equal(await page.locator('a[href="./tens-ones.html"]').count(),1);
 assert.equal(await page.locator('a[href="./visual-story.html"]').count(),1);
 await page.locator('a[href="./tens-ones.html"]').click();
 assert.match(page.url(),/\/review\/tens-ones\.html/);
 assert.match(await page.locator("#stepHeading").innerText(),/Look at tens and ones/);
 assert.equal(await page.locator(".rod").count(),3);
 assert.equal(await page.locator(".dot").count(),4);
 await page.locator("#nextButton").click();
 await page.locator('#answerGrid button[data-choice="52"]').click();
 await page.locator("#languageAr").click();
 assert.equal(await page.locator("html").getAttribute("dir"),"rtl");
 assert.match(await page.locator("#stepHeading").innerText(),/لنكوّن عددًا/);
 await page.locator("#nextButton").click();
 await page.locator('#answerGrid button[data-choice="76"]').click();
 await page.locator("#nextButton").click();
 for(let i=0;i<4;i++)await page.locator('[data-builder="add-ten"]').click();
 for(let i=0;i<3;i++)await page.locator('[data-builder="add-one"]').click();
 assert.equal(await page.locator(".rod").count(),4);
 assert.equal(await page.locator(".dot").count(),3);
 await page.locator("#checkBuild").click();
 assert(await page.locator("#nextButton").isVisible(),"Build completion should unlock Continue");
 await page.goto(base+"/review/visual-story.html",{waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#pageTitle").innerText(),/Number 43/);
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false","Preview must not autoplay");
 await page.locator("#nextButton").click();
 await page.locator("#nextButton").click();
 assert.equal(await page.locator("#rods .rod").count(),4);
 assert.equal(await page.locator("#dots .dot").count(),3);
 await page.locator("#arabicButton").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"ar");
 assert.match(await page.locator("#caption").innerText(),/ثلاث دوائر/);
 assert.match(await page.locator("#mapTotal").innerText(),/٤٠ \+ ٣ = ٤٣/);
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"true");
 await page.locator("#playButton").click();
 assert.equal(await page.locator("#playButton").getAttribute("aria-pressed"),"false");
 // Verify newly synchronized Watch → Connect → Try transfer practice on the actual review snapshot.
 assert.match(await page.locator("#practicePrompt").innerText(),/العدد الجديد ٦٤/);
 await page.locator('[data-practice-choice="reversed"]').click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/العدد ٤٦/);
 await page.locator("#practiceHintButton").click();
 assert.equal(await page.locator("#practiceHintButton").getAttribute("aria-expanded"),"true");
 await page.locator("#englishButton").click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/Four tens and six ones would be 46/);
 assert.match(await page.locator("#practiceHint").innerText(),/groups of ten/);
 await page.locator('[data-practice-choice="correct"]').click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/60 \+ 4 = 64/);
 assert(await page.locator('#practiceChoices button[data-practice-choice="reversed"]').isDisabled());
 await page.locator("#arabicButton").click();
 assert.match(await page.locator("#practiceFeedback").innerText(),/٦٠ \+ ٤ = ٦٤/);
 await page.locator("#practiceAgainButton").click();
 assert(await page.locator("#practiceChoices button").first().isEnabled());
 assert(await page.locator("#practiceHint").isHidden());
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:850});
  const d=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(d.scroll<=d.viewport+3,"Review page overflow at "+width);
 }
 assert.deepEqual(errors,[],"Preview browser JS errors");
 assert.deepEqual(external,[],"Unexpected external requests");
 assert.equal(await page.evaluate(()=>Object.keys(localStorage).length),0,"No local student data");
 await browser.close();
 console.log("PASS: public preview hub, bilingual maths builder, visual transfer-practice hints and retry, opt-in playback, privacy and layout.");
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
