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
 // The listen button must work BEFORE any tiles have been selected.
 assert.equal(await page.locator("#practiceListen").isEnabled(),true,"Listen 3× should never be greyed out");
 await page.locator("#practiceListen").click();
 const firstListen=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(/audio\/practice\/en-phonics-0-girl\.mp3/.test(firstListen),"Early Listen 3× did not play the word recording");
 assert.equal(await page.locator("#findPanel").isHidden(),true,"Picture task should stay locked until word complete");
 await page.locator("#startOver").click();
 assert.equal(await page.locator("#practiceListen").isEnabled(),true,"Try Again unexpectedly disabled Listen 3×");
 await assertMobile();

 for(const letter of ["c","a","t"])
   await page.locator("#letterOptions .letterTile").filter({hasText:new RegExp("^"+letter+"$")}).click();
 assert.equal(await page.locator("#practiceListen").isDisabled(),false);
 await page.locator("#practiceListen").click();
 await page.locator("#pictureChoices .pictureChoice[aria-label='Picture of cat']").click();
 assert.equal(await page.locator("#successPanel").isVisible(),true);
 assert.match(await page.locator("#questStars").textContent(),/1\s*\/\s*4/);
 await page.locator("#nextWord").click();
 assert.equal(await page.locator("#wordText").textContent(),"fish");

 // Independent four-round initial-letter picture game, bilingual instructions,
 // real prerecorded whole-word clues, saved badges and non-repeatable rewards.
 assert.equal(await page.locator("#detectiveLetter").textContent(),"C");
 await page.locator("#detectiveListen").click();
 const detectiveAudio=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(/audio\/practice\/en-phonics-0-girl\.mp3/.test(detectiveAudio),
   "Detective is not using the clear three-repeat whole-word recording");
 await page.locator("#detectiveChoices .detectiveChoice[aria-label='Picture of fish']").click();
 assert.match(await page.locator("#detectiveFeedback").textContent(),/Try|حاول/);
 assert.equal(await page.locator("#detectiveNext").isDisabled(),true);
 const sounds=[["cat","C"],["fish","F"],["sun","S"],["bus","B"]];
 for(let i=0;i<sounds.length;i++){
   const [word,letter]=sounds[i];
   assert.equal(await page.locator("#detectiveLetter").textContent(),letter);
   await page.locator("#detectiveChoices .detectiveChoice[aria-label='Picture of "+word+"']").click();
   assert.equal(await page.locator("#detectiveProgressText").textContent(),(i+1)+" / 4");
   assert.equal(await page.locator("#detectiveNext").isDisabled(),false);
   if(i+1<sounds.length){
     await page.locator("#detectiveNext").click();
     assert.equal(await page.locator("#detectiveLetter").textContent(),sounds[i+1][1],
       "Next clue did not visibly advance to the next letter");
     assert.equal(await page.locator("#detectiveNext").isDisabled(),true,
       "Next question did not reset its answer state");
     assert.match(await page.locator("#detectiveFeedback").textContent(),/New clue/,
       "Next question gave no visible confirmation");
   }
 }
 assert.equal(await page.locator("#detectiveWin").isVisible(),true);
 assert.equal(await page.locator(".detectiveSticker.collected").count(),4);
 const beforeReview=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.locator("#detectiveReview").click();
 await page.locator("#detectiveChoices .detectiveChoice[aria-label='Picture of cat']").click();
 const afterReview=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(afterReview,beforeReview,"Repeating a challenge should not award duplicate stars");
 const savedQuest=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-reading-quest-v1")));
 assert.deepEqual(savedQuest.done,[0],"Detective game overwrote existing word-builder progress");
 assert.deepEqual(savedQuest.detectiveDone,[0,1,2,3],"Detective badge progression not saved");
 // After earning sound badges, complete another word in the original adventure.
 // Both independent progress arrays must survive the subsequent save.
 for(const letter of ["f","i","sh"])
   await page.locator("#letterOptions .letterTile").filter({hasText:new RegExp("^"+letter+"$")}).click();
 await page.locator("#practiceListen").click();
 await page.locator("#pictureChoices .pictureChoice[aria-label='Picture of fish']").click();
 const mergedQuest=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-reading-quest-v1")));
 assert.deepEqual(mergedQuest.done,[0,1],"Second word reward was not saved");
 assert.deepEqual(mergedQuest.detectiveDone,[0,1,2,3],"Word-building deleted Sound Detective badges");
 await assertMobile();
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#questStars").waitFor({state:"visible"});
 assert.match(await page.locator("#questStars").textContent(),/2\s*\/\s*4/);
 assert.equal(await page.locator(".detectiveSticker.collected").count(),4,"Sound badges did not survive reload");
 await assertMobile();

 // Mobile and tablet: complete the bilingual Match & Learn game.
 await goto("match-learn.html");
 await page.locator("#wordCards .tile").first().waitFor({state:"visible"});
 await assertMobile();
 assert.equal(await page.locator("#wordCards .tile").count(),4);
 assert.equal(await page.locator("#pictureCards .tile").count(),4);
 await page.locator("#listenAgain").click();
 assert.match(await page.locator("#matchFeedback").textContent(),/Choose an English/);
 await page.locator("#pictureCards .tile").first().click();
 assert.match(await page.locator("#matchFeedback").textContent(),/First tap/);
 for(const [index,word] of ["cat","fish","sun","bus"].entries()){
   await page.locator('#wordCards .tile[data-match="'+index+'"]').click();
   const played=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
   assert(played.includes("audio/practice/en-phonics-"+index+"-girl.mp3"),"Matching game recording incorrect: "+word);
   await page.locator('#pictureCards .tile[data-match="'+index+'"]').click();
   assert.match(await page.locator("#matchProgress").textContent(),new RegExp((index+1)+"\\s*/\\s*4"));
 }
 assert.equal(await page.locator("#matchSuccess").isVisible(),true);
 const matchStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.locator("#restartMatch").click();
 for(const [index] of ["cat","fish","sun","bus"].entries()){
   await page.locator('#wordCards .tile[data-match="'+index+'"]').click();
   await page.locator('#pictureCards .tile[data-match="'+index+'"]').click();
 }
 const replayStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(replayStars,matchStars,"Matching replay must not add duplicate stars");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#wordCards .tile").count(),4);
 await page.setViewportSize({width:768,height:1024});
 await assertMobile(); // tablet view should not overflow either
 await page.setViewportSize({width:390,height:844});

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
 console.log("PASS: mobile layout, three-repeat English/Arabic audio, Reading Adventure, Sound Detective 4-round game, saved badges, no duplicate star rewards, 2+ second audio and optional slow playback");
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
