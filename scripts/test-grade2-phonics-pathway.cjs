/* Browser QA for draft Modules 2–4 phonics: 7 stages x 6 word families.
 * This is technical testing only: it does not assess student pronunciation or mastery.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const html=fs.readFileSync("grade2-phonics-pathway.html","utf8");
const js=fs.readFileSync("grade2-phonics-pathway.js","utf8");
new (require("node:vm").Script)(js);
for(const required of ["-ing","-and","-all","-ack","-ain","-ink","0 / 42 practice steps completed in this visit","grade2-phonics-pathway.js"]){
 assert(html.includes(required)||js.includes(required),"Missing content "+required);
}
for(const unsafe of [/\bfetch\s*\(/, /sendBeacon/, /getUserMedia/, /SpeechRecognition/, /localStorage\s*\.\s*setItem/, /innerHTML\s*=/]){
 assert(!unsafe.test(js),"Disallowed JS feature: "+unsafe);
}
assert(html.includes('id="stepHeading" tabindex="-1"'),"Focusable lesson heading missing");
assert(html.includes("min-height:48px"),"Touchable adult-script summary missing");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 await page.goto(base+"/grade2-four-skills.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator('a[href="./grade2-phonics-pathway.html"]').count(),1,"Pilot must link phonics practice");
 await page.locator('a[href="./grade2-phonics-pathway.html"]').click();
 assert.match(page.url(),/grade2-phonics-pathway\.html/);
 assert.equal(await page.locator("#familyButtons button").count(),6);
 assert.equal(await page.locator("#stepButtons button").count(),7);
 assert.match(await page.locator("#familyButtons").innerText(),/M4 -ain/);
 assert.match(await page.locator("#familyButtons").innerText(),/M4 -ink/);
 const noOverflow=async()=>{
  const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert(size.scroll<=size.width+3,"Horizontal overflow: "+JSON.stringify(size));
 };
 await noOverflow();
 const readAnswers=[1,0,0,1,1,0];
 const spellAnswers=["sing","sand","wall","snack","rain","sink"];
 for(let family=0;family<6;family++){
  await page.locator("#familyButtons button").nth(family).click();
  assert(await page.locator("#stepHeading").evaluate(x=>document.activeElement===x),"Family selection must focus heading");
  for(let step=0;step<7;step++){
   await page.locator("#stepButtons button").nth(step).click();
   assert(await page.locator("#stepHeading").evaluate(x=>document.activeElement===x),"Stage selection must focus heading");
   switch(step){
    case 0:case 2:case 6:
     await page.locator('[data-action="complete"]').click();break;
    case 1:
     assert.equal(await page.locator("details").evaluate(x=>x.open),false,"Adult script starts closed");
     assert(await page.locator("details summary").evaluate(x=>x.getBoundingClientRect().height>=44));
     await page.locator("details summary").click();
     assert.equal(await page.locator("details").evaluate(x=>x.open),true);
     await page.locator('[data-action="complete"]').click();break;
    case 3:case 5:{
     const answer=step===3?readAnswers[family]:1;
     const wrong=(answer+1)%3;
     await page.locator('[data-answer="'+wrong+'"]').click();
     assert.match(await page.locator("#feedback").innerText(),/Not quite/);
     await page.locator('[data-answer="'+answer+'"]').click();
     break;
    }
    case 4:{
     const input=page.locator("#spellInput");
     await input.fill("wrong");
     await page.locator('[data-action="check-spelling"]').click();
     assert.match(await page.locator("#feedback").innerText(),/Try again/);
     await input.fill(spellAnswers[family]);
     await page.locator('[data-action="check-spelling"]').click();
     break;
    }
   }
   assert.match(await page.locator("#feedback").innerText(),/Practice noted/);
   await noOverflow();
  }
 }
 assert.match(await page.locator("#progressText").innerText(),/42 \/ 42/);
 assert.equal(await page.evaluate(()=>localStorage.getItem("lla-g2-four-skills-v1")),null,"No pilot grade progress writes");
 const touched=await page.evaluate(()=>Object.keys(localStorage));
 assert.equal(touched.length,0,"Optional phonics path must not use localStorage");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#progressText").innerText(),/0 \/ 42/);
 await page.setViewportSize({width:390,height:844});await noOverflow();
 await page.setViewportSize({width:768,height:1024});await noOverflow();
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: six adult-guided word families across Grade 2 Modules 2–4, 42 ephemeral steps, navigation, text entry, retries and mobile widths");
})().catch(e=>{console.error(e.stack||e);process.exit(1);});