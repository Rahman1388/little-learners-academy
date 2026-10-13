/* Grade 5 English reading content and mobile interaction smoke test.
 * This validates structure, not official curriculum alignment or teaching approval. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync("grade5-reading-data.js","utf8"),sandbox,{timeout:3500});
const source=sandbox.window.LLA_GRADE5_READING;
assert(source&&source.passages.length===3&&source.questions.length===18);
const ids=new Set();
for(const p of source.passages){
 assert(p.text.length>550,"Passage too short: "+p.id);
 assert(p.ar&&p.title&&p.icon);
 assert(source.questions.filter(q=>q.passage===p.id).length===6);
}
for(const [i,q] of source.questions.entries()){
 assert.equal(q.id,"g5e-"+String(i+1).padStart(2,"0"));
 assert(!ids.has(q.id));ids.add(q.id);
 assert(q.prompt.length>18&&q.ar.length>15&&q.hint.length>15&&q.explanation.length>25);
 assert(q.choices.length===3&&new Set(q.choices).size===3);
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);
 assert(q.hint!==q.explanation);
}
console.log("PASS: 3 original Grade 5 passages, 18 unique questions, answer choices, hints and explanations");
const {chromium}=require("playwright");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:8765/grade5-reading.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#readingStories .story").count(),3);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert(overflow<=3,"Phone overflow: "+overflow);
 await page.locator('#readingStories .story[data-story="water"]').click();
 assert.equal(await page.locator("#readingPlay").isVisible(),true);
 await page.locator("#readingHint").click();
 assert.equal(await page.locator("#readingHelp").isVisible(),true);
 const item=source.questions[0];
 await page.locator('#readingAnswers button[data-answer="'+item.answer+'"]').click();
 assert.equal(await page.locator("#readingExplanation").isVisible(),true);
 assert.equal(await page.locator("#readingNext").isVisible(),true);
 assert.match(await page.locator("#readingProgress").textContent(),/1 \/ 18/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#readingProgress").textContent(),/1 \/ 18/);
 await page.setViewportSize({width:768,height:1024});
 const tabOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert(tabOverflow<=3,"Tablet overflow: "+tabOverflow);
 assert.equal(errors.length,0,errors.join(" | "));
 console.log("PASS: Grade 5 reading mobile story selection, hint, explanation, saved progress and tablet layout");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
