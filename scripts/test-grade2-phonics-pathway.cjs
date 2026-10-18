/* Browser QA for the draft Module 2 phonics path: 7 stages x 2 word families.
 * This is technical testing only: it does not assess student pronunciation or mastery.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const html=fs.readFileSync("grade2-phonics-pathway.html","utf8");
const js=fs.readFileSync("grade2-phonics-pathway.js","utf8");
new (require("node:vm").Script)(js);
for(const required of ["-ing","-and","14 optional guided steps","grade2-phonics-pathway.js"]){
 assert(html.includes(required)||js.includes(required),"Missing content "+required);
}
for(const unsafe of [/\bfetch\s*\(/, /sendBeacon/, /getUserMedia/, /SpeechRecognition/, /localStorage\s*\.\s*setItem/, /innerHTML\s*=/]){
 assert(!unsafe.test(js),"Disallowed JS feature: "+unsafe);
}
assert(html.includes('id="stepHeading" tabindex="-1"'),"Focusable lesson heading missing");
assert(html.includes("min-height:48px"),"Touchable adult-script summary missing");
assert(html.includes('id="audioStatus"'),"Audio playback accessibility feedback missing");
assert(js.includes("SpeechSynthesisUtterance")&&js.includes("speakWord"),"Device speech preview missing");
assert(!/getUserMedia|MediaRecorder|speechSynthesis\\s*\\.\\s*pause/.test(js),"Do not capture child voice");
assert(html.includes('id="continueStep"'),"Accessible next-step button missing");
assert(html.includes('id="stageCounter"'),"Stage progress label missing");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 // Stub iPhone-like English speech locally. This tests taps, not real human audio quality.
 await page.addInitScript(()=>{
  window.__spokenWords=[];
  window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
  Object.defineProperty(window,"speechSynthesis",{
   configurable:true,
   value:{
    cancel(){},
    getVoices(){return [{lang:"en-GB",default:true,name:"Test English Voice"}];},
    speak(utterance){
     window.__spokenWords.push({word:utterance.text,lang:utterance.lang,rate:utterance.rate});
     if(utterance.onstart)utterance.onstart();
    }
   }
  });
 });
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 await page.goto(base+"/grade2-four-skills.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator('a[href="./grade2-phonics-pathway.html"]').count(),1,"Pilot must link phonics practice");
 await page.locator('a[href="./grade2-phonics-pathway.html"]').click();
 assert.match(page.url(),/grade2-phonics-pathway\.html/);
 assert.equal(await page.locator("#familyButtons button").count(),2);
 assert.equal(await page.locator("#stepButtons button").count(),7);
 const noOverflow=async()=>{
  const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert(size.scroll<=size.width+3,"Horizontal overflow: "+JSON.stringify(size));
 };
 await noOverflow();
 for(let family=0;family<2;family++){
  await page.locator("#familyButtons button").nth(family).click();
  assert(await page.locator("#stepHeading").evaluate(x=>document.activeElement===x),"Family selection must focus heading");
  assert(await page.locator("#continueStep").isHidden(),"Cannot continue before finishing a step");
  for(let step=0;step<7;step++){
   await page.locator("#stepButtons button").nth(step).click();
   assert(await page.locator("#stepHeading").evaluate(x=>document.activeElement===x),"Stage selection must focus heading");
   assert.match(await page.locator("#stageCounter").innerText(),new RegExp("Stage "+(step+1)+" of 7"));
   assert(await page.locator("#continueStep").isHidden(),"New stage must not permit premature continue");
   if([0,2,6].includes(step)){
    assert.equal(await page.locator('#stepContent [data-action="speak-word"]').count(),2,"Each word has a normal-speed speaker");
    assert.equal(await page.locator('#stepContent [data-action="speak-slow"]').count(),2,"Each word has a slow-speed speaker");
    await page.locator('#stepContent [data-action="speak-word"]').first().click();
    await page.locator('#stepContent [data-action="speak-slow"]').first().click();
    const speech=await page.evaluate(()=>window.__spokenWords.slice(-2));
    assert.equal(speech[0].word,family===0?"ring":"hand");
    assert.equal(speech[1].word,speech[0].word);
    assert.equal(speech[0].lang,"en-GB");
    assert(speech[1].rate<speech[0].rate,"Slow playback must use a lower rate");
    assert.match(await page.locator("#audioStatus").innerText(),/Trying/);
   }
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
     const answer=step===3?(family===0?1:0):1;
     const wrong=(answer+1)%3;
     await page.locator('[data-answer="'+wrong+'"]').click();
     assert.match(await page.locator("#feedback").innerText(),/Not quite/);
     assert(await page.locator("#continueStep").isHidden(),"Wrong answer must not unlock continue");
     await page.locator('[data-answer="'+answer+'"]').click();
     break;
    }
    case 4:{
     const input=page.locator("#spellInput");
     await input.fill("wrong");
     await page.locator('[data-action="check-spelling"]').click();
     assert.match(await page.locator("#feedback").innerText(),/Try again/);
     await input.fill(family===0?"sing":"sand");
     await page.locator('[data-action="check-spelling"]').click();
     break;
    }
   }
   assert.match(await page.locator("#feedback").innerText(),/Practice noted/);
   if(family===1&&step===6){
    assert(await page.locator("#continueStep").isHidden(),"All 14 steps are complete; no further stage");
    assert.match(await page.locator("#journeySummary").innerText(),/All 14 guided steps practised/);
   }else{
    assert(await page.locator("#continueStep").isVisible(),"Completing a stage must unlock Continue");
    await page.locator("#continueStep").click();
    assert(await page.locator("#stepHeading").evaluate(x=>document.activeElement===x),"Continue must focus new heading");
    if(step<6){
     assert.match(await page.locator("#stageCounter").innerText(),new RegExp("Stage "+(step+2)+" of 7"));
    }else{
     assert.equal(await page.locator('#familyButtons button[aria-pressed="true"]').count(),1);
     assert.match(await page.locator("#stageCounter").innerText(),/Stage 1 of 7 • -and/);
    }
   }
   await noOverflow();
  }
 }
 assert.match(await page.locator("#progressText").innerText(),/14 \/ 14/);
 assert.equal(await page.evaluate(()=>localStorage.getItem("lla-g2-four-skills-v1")),null,"No pilot grade progress writes");
 const touched=await page.evaluate(()=>Object.keys(localStorage));
 assert.equal(touched.length,0,"Optional phonics path must not use localStorage");
 // Adult review must stay separate from child learning progress and remain ephemeral.
 assert.equal(await page.locator("#audioReviewGrid .audio-review-card").count(),4);
 assert.equal(await page.locator("#audioReviewGrid select").count(),8);
 await page.locator("#makeAudioReview").click();
 assert.match(await page.locator("#audioReviewFeedback").innerText(),/Please check/);
 await page.locator("#review-ring-normal").selectOption("clear");
 await page.locator("#review-ring-slow").selectOption("revise");
 await page.locator("#review-sing-normal").selectOption("silent");
 await page.locator("#makeAudioReview").click();
 const written=await page.locator("#audioReviewOutput").inputValue();
 assert(written.includes("ring (normal): clear and natural"));
 assert(written.includes("ring (slow): needs improvement"));
 assert(written.includes("sing (normal): no sound"));
 assert(!written.includes("hand (normal)"),"Untested items should be omitted");
 assert.match(await page.locator("#progressText").innerText(),/14 \/ 14/);
 assert.equal(await page.evaluate(()=>Object.keys(localStorage).length),0,"Adult QA must not persist any child observations");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#review-ring-normal").inputValue(),"untested","Adult report must reset after refresh");
 assert.equal(await page.locator("#audioReviewOutput").inputValue(),"","Generated notes should not be stored");
 assert.match(await page.locator("#progressText").innerText(),/0 \/ 14/);
 await page.setViewportSize({width:390,height:844});await noOverflow();
 await page.setViewportSize({width:768,height:1024});await noOverflow();
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log("PASS: two adult-guided original word families, 14 ephemeral steps, navigation, text entry, retries and mobile widths");
})().catch(e=>{console.error(e.stack||e);process.exit(1);});