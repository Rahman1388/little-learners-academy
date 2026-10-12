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
 // Compact homepage and accessible menu for children and parents.
 assert.equal(await page.locator("#moreAdventures").evaluate(x=>x.open),false);
 assert.equal(await page.locator("#mainMenu").isVisible(),false);
 await page.locator("#menuToggle").click();
 assert.equal(await page.locator("#menuToggle").getAttribute("aria-expanded"),"true");
 assert.equal(await page.locator("#mainMenu").isVisible(),true);
 assert.equal(await page.locator('#mainMenu a[href="./international-benchmark.html"]').isVisible(),true);
 assert.equal(await page.locator('#mainMenu a[href="./activity-library.html"]').isVisible(),true);
 await assertMobile();
 await page.keyboard.press("Escape");
 assert.equal(await page.locator("#mainMenu").isVisible(),false);
 assert.equal(await page.locator("#menuToggle").getAttribute("aria-expanded"),"false");
 await page.locator("#menuToggle").click();
 await page.locator('#mainMenu a[data-expand="moreAdventures"]').click();
 assert.equal(await page.locator("#moreAdventures").evaluate(x=>x.open),true);
 assert.equal(await page.locator("#mainMenu").isVisible(),false);
 assert.equal(await page.locator('#moreAdventures a[href="./star-journey.html"]').isVisible(),true);
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
   assert(played.includes("audio/practice/en-phonics-"+index+"-"+(index===3?"alba":"girl")+".mp3"),"Matching game recording incorrect: "+word);
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

 // Without a custom preference, C should be the girl-style default.
 await page.evaluate(()=>localStorage.removeItem("lla-bus-voice-v1"));
 await goto("match-learn.html");
 await page.locator('#wordCards .tile[data-match="3"]').click();
 const defaultBus=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(defaultBus.includes("en-phonics-3-alba.mp3"),"Girl-style bus should default to C");
 await page.evaluate(()=>{
   const main=JSON.parse(localStorage.getItem("lla-progress-v2"));
   main.voice="boy";localStorage.setItem("lla-progress-v2",JSON.stringify(main));
 });
 await page.locator('#wordCards .tile[data-match="3"]').click();
 const boyDefault=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(boyDefault.includes("en-phonics-3-bryce.mp3"),"Boy-style bus should default to D");
 await page.evaluate(()=>{
   const main=JSON.parse(localStorage.getItem("lla-progress-v2"));
   main.voice="girl";localStorage.setItem("lla-progress-v2",JSON.stringify(main));
 });
 // Bus voice candidate C should be selectable without replacing other words.
 await goto("bus-voice-check.html");
 await page.locator(".choice").first().waitFor({state:"visible"});
 assert.equal(await page.locator(".choice").count(),4,"Bus listening comparison should have four speakers");
 await assertMobile();
 await page.locator('button[data-pick="alba"]').click();
 const savedVoice=await page.evaluate(()=>localStorage.getItem("lla-bus-voice-v1"));
 assert.equal(savedVoice,"alba","Selected alternative bus voice did not save");
 await goto("match-learn.html");
 await page.locator('#wordCards .tile[data-match="3"]').click();
 const busVoiceUrl=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(busVoiceUrl.includes("audio/practice/en-phonics-3-alba.mp3"),"Bus did not use the chosen voice");
 await page.locator('#wordCards .tile[data-match="0"]').click();
 const catVoiceUrl=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(catVoiceUrl.includes("audio/practice/en-phonics-0-girl.mp3"),"Bus choice unexpectedly altered cat");
 await assertMobile();
 // The choice must carry across the other two games on the SAME phone.
 await goto("phonics-adventure.html");
 await page.locator("#wordTrail .trailItem").nth(3).click();
 await page.locator("#practiceListen").click();
 const readingBus=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(readingBus.includes("audio/practice/en-phonics-3-alba.mp3"),
   "Reading Adventure did not respect saved bus pronunciation");
 await page.locator("#detectiveReview").click();
 // Move through C, F and S to get to B in the original game.
 for(const [index,word] of ["cat","fish","sun"].entries()){
   await page.locator('#detectiveChoices .detectiveChoice[aria-label="Picture of '+word+'"]').click();
   await page.locator("#detectiveNext").click();
 }
 assert.equal(await page.locator("#detectiveLetter").textContent(),"B");
 await page.locator("#detectiveListen").click();
 const detectiveBus=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(detectiveBus.includes("audio/practice/en-phonics-3-alba.mp3"),
   "Sound Detective did not respect saved bus pronunciation");
 await assertMobile();

 // Audio reviewer is a separate, on-device, 12-clip quality checklist.
 await goto("audio-review.html");
 await page.locator("#reviewCards audio").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#reviewCards audio").count(),8,"Expected eight English samples");
 await assertMobile();
 await page.locator('#reviewCards .review').first().locator('[data-rating="unclear"]').click();
 assert.match(await page.locator("#reviewProgress").textContent(),/1 \/ 12/);
 await page.locator("#language").selectOption("ar");
 assert.equal(await page.locator("#reviewCards audio").count(),4,"Expected four Arabic samples");
 const firstArabic=await page.locator("#reviewCards audio").first().getAttribute("src");
 assert(firstArabic.includes("ar-phonics-0-boy.mp3"),"Arabic male reference was unexpectedly replaced");
 await page.locator('#reviewCards .review').first().locator('[data-rating="clear"]').click();
 assert.match(await page.locator("#reviewProgress").textContent(),/2 \/ 12/);
 assert.match(await page.locator("#feedbackSummary").textContent(),/EN cat \[girl\] — unclear/);
 assert.match(await page.locator("#feedbackSummary").textContent(),/AR cat \[boy\] — clear/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#reviewProgress").textContent(),/2 \/ 12/);
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Picture Pairs: a new bilingual visual-only memory game for phones/tablets.
 await goto("picture-memory.html");
 await page.locator("#memoryBoard .card").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#memoryBoard .card").count(),8);
 await assertMobile();
 for(const id of ["cat","fish","sun","bus"]){
   const cards=page.locator('#memoryBoard .card[data-pair="'+id+'"]');
   assert.equal(await cards.count(),2,"Missing picture pair: "+id);
   await cards.first().click();
   await cards.nth(1).click();
 }
 assert.equal(await page.locator("#win").isVisible(),true);
 assert.match(await page.locator("#pairsCount").textContent(),/4 \/ 4/);
 const memoryStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.locator("#newGame").click();
 for(const id of ["cat","fish","sun","bus"]){
   const cards=page.locator('#memoryBoard .card[data-pair="'+id+'"]');
   await cards.first().click();await cards.nth(1).click();
 }
 const starsAfterReplay=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(starsAfterReplay,memoryStars,"Replaying picture pairs should not award duplicate stars");
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Star Journey: existing progress is displayed without rewriting rewards.
 await goto("star-journey.html");
 await page.locator("#journeyTrack .step").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#journeyTrack .step").count(),4);
 assert.equal(await page.locator("#journeyBadges .medal").count(),4);
 assert.equal(await page.locator("#journeyTrack .step.complete").count(),3,"Reading adventure has only one completed word, not four");
 await assertMobile();
 await page.locator("#femaleChoice").click();
 await page.locator('#listenWords button[aria-label="Hear English word cat"]').click();
 const journeyCat=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(journeyCat.includes("en-phonics-0-girl.mp3"),"Journey female-style sample incorrect");
 await page.locator("#maleChoice").click();
 await page.locator('#listenWords button[aria-label="Hear English word fish"]').click();
 const journeyFish=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(journeyFish.includes("en-phonics-1-boy.mp3"),"Journey male-style sample incorrect");
 await page.locator('#listenWords button[aria-label="Hear English word bus"]').click();
 const journeyBus=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(journeyBus.includes("en-phonics-3-alba.mp3"),"Journey must respect device bus choice");
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Achievements in Star Journey derive from saved activity progress.
 await goto("star-journey.html");
 assert.equal(await page.locator("#activityMilestoneBadges .medal").count(),5);
 assert.match(await page.locator("#activityMilestoneProgress").textContent(),/0 \/ 151/);
 await page.evaluate(()=>{
   const done={};for(let i=1;i<=25;i++)done["mini-"+String(i).padStart(3,"0")]=true;
   localStorage.setItem("lla-activity-library-v1",JSON.stringify(done));
 });
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#activityMilestoneBadges .earned").count(),2);
 assert.match(await page.locator("#activityMilestoneProgress").textContent(),/25 \/ 151/);
 // Restore an empty library completion state before testing 1/151.
 await page.evaluate(()=>localStorage.removeItem("lla-activity-library-v1"));
 // More than 100 real, individually playable challenges with local progress.
 await goto("activity-library.html");
 await page.locator('#activityGrid .activity').first().waitFor({state:"visible"});
 const librarySize=await page.locator("#activityGrid .activity").count();
 assert(librarySize>=151,"Expected at least 151 playable challenges");
 await assertMobile();
 await page.locator('#activityGrid .activity[data-id="mini-001"]').click();
 assert.equal(await page.locator("#playView").isVisible(),true);
 const firstAnswers=await page.locator("#answerOptions button").allTextContents();
 const firstCorrect=firstAnswers.indexOf("1");
 assert(firstCorrect>=0);
 await page.locator("#answerOptions button").nth(firstCorrect).click();
 assert.equal(await page.locator("#nextChallenge").isVisible(),true);
 assert.match(await page.locator("#overallProgress").textContent(),/1 \/ 151/);
 await page.locator("#nextChallenge").click();
 assert.equal(await page.locator("#playView").isVisible(),true);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#overallProgress").textContent(),/1 \/ 151/);
 await page.locator("#areaSelect").selectOption("science");
 assert.equal(await page.locator("#activityGrid .activity").count(),20);
 await page.locator("#areaSelect").selectOption("english");
 assert.equal(await page.locator("#activityGrid .activity").count(),34);
 await page.locator("#areaSelect").selectOption("math");
 assert.equal(await page.locator("#activityGrid .activity").count(),70);
 await page.locator("#areaSelect").selectOption("life");
 assert.equal(await page.locator("#activityGrid .activity").count(),15);
 await page.locator("#areaSelect").selectOption("arts");
 assert.equal(await page.locator("#activityGrid .activity").count(),12);
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Parent-facing roadmap must never claim unreleased grades are playable.
 await goto("grades-roadmap.html");
 await page.locator("#roadmapGrid .grade").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#roadmapGrid .grade").count(),6);
 assert.equal(await page.locator("#roadmapGrid .grade.ready").count(),1);
 assert.equal(await page.locator('#roadmapGrid .grade a[href="./activity-library.html"]').count(),1);
 await assertMobile();
 await page.locator('#roadmapGrid .grade a[href="./activity-library.html"]').click();
 assert.equal(await page.locator("#activityGrid .activity").count(),151);
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Guided five-step journey: five playable questions in the chosen subject.
 await goto("activity-library.html");
 await page.locator("#areaSelect").selectOption("english");
 await page.locator("#guidedStart").click();
 assert.equal(await page.locator("#playView").isVisible(),true);
 assert.match(await page.locator("#skillBadge").textContent(),/Step 1 of 5/);
 for(let step=0;step<5;step++){
   const answer=await page.evaluate(()=>{
     const q=document.querySelector("#questionText").textContent;
     return window.LLA_MINI_ACTIVITIES.find(a=>a.question===q)?.answer;
   });
   assert(Number.isInteger(answer),"A guided question has no correct answer");
   await page.locator("#answerOptions button").nth(answer).click();
   assert.equal(await page.locator("#nextChallenge").isVisible(),true);
   await page.locator("#nextChallenge").click();
   if(step<4)assert.match(await page.locator("#skillBadge").textContent(),new RegExp("Step "+(step+2)+" of 5"));
 }
 assert.equal(await page.locator("#overview").isVisible(),true);
 assert.match(await page.locator("#guidedStatus").textContent(),/Five steps finished/);
 const savedCount=await page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem("lla-activity-library-v1"))).filter(Boolean).length);
 assert(savedCount>=6,"Guided steps did not record completed challenges");
 await assertMobile();
 // Parent overview starts from the same on-device Grade 1 progress.
 await goto("parent-progress.html");
 await page.locator("#subjects .subject").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#subjects .subject").count(),5);
 // Independent Grade 2 subject counters from this phone's saved work.
 await page.evaluate(()=>{
  localStorage.setItem("lla-grade2-pilot-v1",JSON.stringify({"g2-01":true,"g2-02":true}));
  localStorage.setItem("lla-grade2-english-v1",JSON.stringify({"g2e-01":true}));
  localStorage.setItem("lla-grade2-science-v1",JSON.stringify({"g2s-01":true,"g2s-02":true,"g2s-03":false}));
 });
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#grade2MathCount").textContent(),"2 / 24");
 assert.equal(await page.locator("#grade2EnglishCount").textContent(),"1 / 24");
 assert.equal(await page.locator("#grade2ScienceCount").textContent(),"2 / 18");
 assert.equal(await page.locator('#grade2PilotProgress a').count(),3);
 // Remove injected test-only Grade 2 fixtures before independently testing pilots.
 await page.evaluate(()=>{
  localStorage.removeItem("lla-grade2-pilot-v1");
  localStorage.removeItem("lla-grade2-english-v1");
  localStorage.removeItem("lla-grade2-science-v1");
 });
 await assertMobile();
 await page.locator('a[href="./activity-library.html"]').last().click();
 await page.locator('#activityGrid .activity[data-id="mini-002"]').click();
 const wrongAnswer=await page.evaluate(()=>window.LLA_MINI_ACTIVITIES.find(x=>x.id==="mini-002").choices.findIndex((c,i)=>i!==window.LLA_MINI_ACTIVITIES.find(x=>x.id==="mini-002").answer));
 await page.locator("#answerOptions button").nth(wrongAnswer).click();
 await goto("parent-progress.html");
 await page.locator('#practiceList .review a[href="./activity-library.html?activity=mini-002"]').waitFor({state:"visible"});
 assert.match(await page.locator("#attemptCount").textContent(),/[1-9]/);
 await page.locator('#practiceList .review a[href="./activity-library.html?activity=mini-002"]').click();
 assert.equal(await page.locator("#playView").isVisible(),true);
 assert.match(await page.locator("#challengeTitle").textContent(),/Count 2 objects/);
 await assertMobile();
 // Interactive ten-frame: individual boxes, checking and both modes.
 await goto("ten-frame-lab.html");
 await page.locator("#tenFrame .cell").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#tenFrame .cell").count(),10);
 await assertMobile();
 await page.locator("#tenFrame .cell").first().click();
 await page.locator("#checkAnswer").click();
 assert.equal(await page.locator("#nextRound").isVisible(),true);
 await page.locator("#nextRound").click();
 assert.match(await page.locator("#mathPrompt").textContent(),/Build 2/);
 await page.locator("#checkAnswer").click();
 assert.match(await page.locator("#mathFeedback").textContent(),/Almost/);
 for(let k=0;k<2;k++)await page.locator("#tenFrame .cell").nth(k).click();
 await page.locator("#checkAnswer").click();
 assert.equal(await page.locator("#nextRound").isVisible(),true);
 await page.locator("#bondMode").click();
 assert.match(await page.locator("#mathPrompt").textContent(),/Make 10/);
 for(let k=0;k<10;k++)await page.locator("#tenFrame .cell").nth(k).click();
 await page.locator("#checkAnswer").click();
 assert.equal(await page.locator("#nextRound").isVisible(),true);
 await page.locator("#nextRound").click();
 assert.equal(await page.locator("#tenFrame .cell:disabled").count(),1,"One starting counter should be fixed");
 assert.match(await page.locator("#neededLabel").textContent(),/Add 9/);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Grade 1 passport has 5 subjects × 3 real skill milestones.
 await goto("learning-passport.html");
 await page.locator("#passportSubjects .subject").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#passportSubjects .subject").count(),5);
 assert.equal(await page.locator("#passportSubjects .stage").count(),15);
 assert.match(await page.locator("#passportTotal").textContent(),/0 \/ 15/);
 const firstPath=await page.locator('#passportSubjects .stage').first().locator("a").getAttribute("href");
 assert(firstPath.includes("activity=mini-002"),"First unfinished counting activity should follow saved mini-001 progress");
 await assertMobile();
 await page.locator('#passportSubjects .stage').first().locator("a").click();
 await page.locator("#playView").waitFor({state:"visible"});
 assert.match(await page.locator("#challengeTitle").textContent(),/Count 2 objects/);
 await page.goto(base+"/learning-passport.html",{waitUntil:"domcontentloaded"});
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Finger-friendly drawing studio: 7 templates, 10 pencils and export actions.
 await goto("drawing-studio.html");
 await page.locator("#drawingCanvas").waitFor({state:"visible"});
 assert.equal(await page.locator("#palette .swatch").count(),10);
 assert.equal(await page.locator("#template option").count(),7);
 await assertMobile();
 await page.locator("#template").selectOption("house");
 assert.match(await page.locator("#prompt").textContent(),/house/i);
 await page.locator('#palette [data-colour="#228bd2"]').click();
 await page.locator("#pencilTool").click();
 const drawing=page.locator("#drawingCanvas");
 await drawing.scrollIntoViewIfNeeded();
 const box=await drawing.boundingBox();
 const pos={x:box.x+box.width*.45,y:box.y+box.height*.63};
 await page.mouse.move(pos.x,pos.y);
 await page.mouse.down();await page.mouse.move(pos.x+22,pos.y+18,{steps:4});await page.mouse.up();
 await page.locator("#undo").click();
 assert.match(await page.locator("#drawingStatus").textContent(),/undone/i);
 await page.locator("#redo").click();
 assert.match(await page.locator("#drawingStatus").textContent(),/restored/i);
 await page.locator("#fillTool").click();
 const beforeFill=await page.locator("#drawingCanvas").evaluate(el=>el.toDataURL());
 await page.mouse.click(box.x+box.width*.51,box.y+box.height*.48);
 const afterFill=await page.locator("#drawingCanvas").evaluate(el=>el.toDataURL());
 assert.notEqual(afterFill,beforeFill,"Colour fill should change canvas pixels");
 await page.locator("#startOver").click();
 // Confirm destructive reset on modified drawings.
 page.once("dialog",dialog=>dialog.accept());
 await page.locator("#template").selectOption("fish");
 assert.match(await page.locator("#prompt").textContent(),/fish/i);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Grade 1 tens and ones builder: 12 real place-value challenges.
 await goto("place-value-lab.html");
 await page.locator("#targetNumber").waitFor({state:"visible"});
 assert.equal(await page.locator("#targetNumber").textContent(),"11");
 await assertMobile();
 await page.locator("#checkBuild").click();
 assert.match(await page.locator("#feedback").textContent(),/Almost/);
 for(const n of [11,20,24,35,40,47,52,60,68,73,85,99]){
   assert.equal(await page.locator("#targetNumber").textContent(),String(n));
   for(let j=0;j<Math.floor(n/10);j++)await page.locator("#addTen").click();
   for(let j=0;j<n%10;j++)await page.locator("#addOne").click();
   assert.equal(await page.locator("#blocks .rod").count(),Math.floor(n/10));
   assert.equal(await page.locator("#blocks .one").count(),n%10);
   await page.locator("#checkBuild").click();
   assert.match(await page.locator("#feedback").textContent(),/Excellent/);
   await page.locator("#nextBuild").click();
 }
 assert.match(await page.locator("#completedStatus").textContent(),/12 \/ 12/);
 const valStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#completedStatus").textContent(),/12 \/ 12/);
 for(let j=0;j<1;j++)await page.locator("#addTen").click();
 await page.locator("#addOne").click();await page.locator("#checkBuild").click();
 const valStarsAfter=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(valStars,valStarsAfter,"Place value replay should not give duplicate stars");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Number bonds: twelve real missing-part challenges with visual counters.
 await goto("number-bonds.html");
 await page.locator("#wholeNumber").waitFor({state:"visible"});
 assert.equal(await page.locator("#wholeNumber").textContent(),"5");
 await assertMobile();
 const bonds=[[5,2],[6,4],[7,3],[8,5],[9,4],[10,6],[11,8],[12,5],[14,9],[15,7],[18,10],[20,12]];
 await page.locator('#answerOptions button[data-value="2"]').click();
 assert.match(await page.locator("#feedback").textContent(),/Not quite/);
 for(const [whole,known] of bonds){
   assert.equal(await page.locator("#wholeNumber").textContent(),String(whole));
   assert.equal(await page.locator("#counters .dot").count(),whole);
   assert.equal(await page.locator("#counters .dot.used").count(),known);
   await page.locator('#answerOptions button[data-value="'+(whole-known)+'"]').click();
   assert.match(await page.locator("#feedback").textContent(),/Correct/);
   await page.locator("#nextBond").click();
 }
 assert.match(await page.locator("#completedStatus").textContent(),/12 \/ 12/);
 const bondStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#completedStatus").textContent(),/12 \/ 12/);
 await page.locator('#answerOptions button[data-value="3"]').click();
 const afterBondReplay=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(afterBondReplay,bondStars,"Replaying Number Bonds must not duplicate stars");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Five-subject Daily Discovery: one question per subject, saved without changing stars.
 await goto("daily-discovery.html");
 await page.locator("#missionTrack .dot").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#missionTrack .dot").count(),5);
 await assertMobile();
 const dailyStarsBefore=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 for(let i=0;i<5;i++){
   assert.equal(await page.locator("#mission").isVisible(),true);
   const answer=await page.evaluate(i=>{
     const areas=["math","english","science","life","arts"];
     const d=new Date(),day=Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/86400000);
     const pool=window.LLA_MINI_ACTIVITIES.filter(a=>a.area===areas[i]);
     return pool[((day%pool.length)+pool.length)%pool.length].answer;
   },i);
   await page.locator('#answerChoices button[data-answer="'+answer+'"]').click();
   assert.match(await page.locator("#feedback").textContent(),/Well done/);
   await page.locator("#nextStep").click();
 }
 assert.equal(await page.locator("#celebrate").isVisible(),true);
 assert.match(await page.locator("#progress").textContent(),/5 \/ 5/);
 const dailyStarsAfter=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(dailyStarsBefore,dailyStarsAfter,"Daily discovery must not inflate stars");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#celebrate").isVisible(),true,"Daily completion must survive reload");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Story Garden: eight distinct stories with three answerable questions each.
 await goto("story-garden.html");
 await page.locator("#storyGrid .storyCard").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#storyGrid .storyCard").count(),8);
 await assertMobile();
 for(let i=0;i<8;i++){
   await page.locator('#storyGrid .storyCard[data-story="'+i+'"]').click();
   assert.equal(await page.locator("#reader").isVisible(),true);
   for(let q=0;q<3;q++){
     const wrong=page.locator('#answerButtons button[data-correct="false"]').first();
     await wrong.click();
     assert.match(await page.locator("#feedback").textContent(),/Try again/);
     await page.locator('#answerButtons button[data-correct="true"]').click();
     assert.match(await page.locator("#feedback").textContent(),/Great reading/);
     await page.locator("#nextQuestion").click();
   }
 }
 assert.match(await page.locator("#storyProgress").textContent(),/8 \/ 8/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#storyProgress").textContent(),/8 \/ 8/);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Family learning plan: 7 child-friendly sessions, local-only checkmarks.
 await goto("family-learning-plan.html");
 await page.locator("#dayList .day").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#dayList .day").count(),7);
 assert.equal(await page.locator("#dayList .activities a").count(),21);
 await assertMobile();
 await page.locator('#dayList .day[data-day="1"] input[type="checkbox"]').check();
 assert.match(await page.locator("#planProgress").textContent(),/1 \/ 7/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(await page.locator('#dayList .day[data-day="1"] input[type="checkbox"]').isChecked(),true);
 await page.locator('#dayList .day[data-day="1"] input[type="checkbox"]').uncheck();
 assert.match(await page.locator("#planProgress").textContent(),/0 \/ 7/);
 await page.locator('#dayList .day[data-day="4"] a[href="./activity-library.html?subject=science"]').click();
 assert.equal(await page.locator("#areaSelect").inputValue(),"science");
 assert.equal(await page.locator("#activityGrid .activity").count(),20);
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Clock & Time Lab: 12 distinct times, with retry, saved progress, and one star.
 await goto("clock-time-lab.html");
 await page.locator("#timeAnswers button").first().waitFor({state:"visible"});
 await assertMobile();
 for(let i=0;i<12;i++){
   const actual=await page.locator("#clock").getAttribute("aria-label");
   const expected=actual.replace("Clock at ","");
   const correct=page.locator('#timeAnswers button[data-time="'+expected+'"]');
   assert.equal(await correct.count(),1,"Missing correct digital time "+expected);
   if(i===0){
     const wrong=page.locator("#timeAnswers button").filter({hasNotText:expected}).first();
     await wrong.click();
     assert.match(await page.locator("#clockFeedback").textContent(),/Nice try/);
   }
   await correct.click();
   assert.equal(await page.locator("#nextClock").isVisible(),true);
   if(i<11)await page.locator("#nextClock").click();
 }
 assert.match(await page.locator("#clockProgress").textContent(),/12 \/ 12/);
 const clockStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#clockProgress").textContent(),/12 \/ 12/);
 await page.locator("#timeAnswers button").first().click();
 await page.locator("#restartClock").click();
 const clockReplayStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(clockReplayStars,clockStars,"Clock replay must not add another star");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Measurement explorer: sixteen real questions, no duplicate reward and responsive.
 await goto("measurement-explorer.html");
 await page.locator("#answers button").first().waitFor({state:"visible"});
 assert.match(await page.locator("#progress").textContent(),/0 \/ 16/);
 await assertMobile();
 for(let round=0;round<16;round++){
   const buttons=page.locator("#answers button");
   await buttons.first().click();
   assert.match(await page.locator("#progress").textContent(),new RegExp((round+1)+" \\/ 16"));
   if(round<15)await page.locator("#next").click();
 }
 assert.equal(await page.locator("#badges .earned").count(),4);
 const measurementStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#progress").textContent(),/16 \/ 16/);
 await page.locator("#retry").click();
 await page.locator("#answers button").first().click();
 const measurementStarsAgain=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(measurementStarsAgain,measurementStars,"Measurement replay must not award duplicate stars");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Grade 2 mathematics pilot is a limited, independently stored 24-question trial.
 await goto("grade2-pilot.html");
 await page.locator("#domainCards .domain").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#domainCards .domain").count(),4);
 assert.match(await page.locator("#g2Progress").textContent(),/0 \/ 24/);
 await assertMobile();
 for(const domain of ["place","arithmetic","measure","geometry"]){
   await page.locator('#domainCards .domain[data-domain="'+domain+'"]').click();
   for(let step=0;step<6;step++){
     const info=await page.evaluate(()=>{
       const q=document.querySelector("#questionEn").textContent;
       const item=window.LLA_GRADE2_PILOT.find(x=>x.question===q);
       return {answer:item.answer,wrong:item.choices.findIndex((_text,i)=>i!==item.answer)};
     });
     if(domain==="place" && step===0){
       await page.locator("#g2Answers button").nth(info.wrong).click();
       assert.match(await page.locator("#g2Feedback").textContent(),/Nice effort/);
       await page.locator("#learningHint").click();
       assert.equal(await page.locator("#hintBox").isVisible(),true);
     }
     await page.locator("#g2Answers button").nth(info.answer).click();
     assert.equal(await page.locator("#explanation").isVisible(),true);
     assert.equal(await page.locator("#g2Next").isVisible(),true);
     await page.locator("#g2Next").click();
   }
   assert.equal(await page.locator("#selectPanel").isVisible(),true);
 }
 assert.match(await page.locator("#g2Progress").textContent(),/24 \/ 24/);
 assert.equal(await page.locator("#domainCards .domain.complete").count(),4);
 const grade1Before=await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1"));
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#g2Progress").textContent(),/24 \/ 24/);
 assert.equal(await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1")),grade1Before,
   "Grade 2 pilot must not modify Grade 1 completion progress");
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Roadmap still distinguishes the pilot from full Grade 2 readiness.
 await goto("grades-roadmap.html");
 assert.equal(await page.locator("#roadmapGrid .grade.ready").count(),1);
 assert.equal(await page.locator('a[href="./grade2-pilot.html"]').count(),1);
 await assertMobile();
 // A child can resume the last open activity after leaving and returning.
 await goto("activity-library.html");
 await page.locator('#activityGrid .activity[data-id="mini-012"]').click();
 assert.equal(await page.locator("#playView").getAttribute("data-activity"),"mini-012");
 await page.reload({waitUntil:"domcontentloaded"});
 await page.locator("#resumeActivity").click();
 assert.equal(await page.locator("#playView").getAttribute("data-activity"),"mini-012");
 assert.equal(await page.locator("#playView").isVisible(),true);
 await assertMobile();
 await page.setViewportSize({width:768,height:1024});
 await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Grade 2 science pilot: topic switching, answers and persistence.
 await goto("grade2-science.html");
 await page.locator("#answers button").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#answers button").count(),3);
 await assertMobile();
 await page.locator("#answers button").nth(0).click();
 if(!(await page.locator("#next").isVisible())){
   const available=page.locator("#answers button:not([disabled])");
   await available.first().click();
 }
 assert.equal(await page.locator("#next").isVisible(),true);
 assert.match(await page.locator("#progress").textContent(),/1 \/ 18/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#progress").textContent(),/1 \/ 18/);
 await page.locator("#topicSelect").selectOption("Weather");
 assert.equal(await page.locator("#topicName").textContent(),"Weather");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Fractions & Fair Sharing: twelve tappable Grade 2 readiness lessons.
 await goto("fractions-lab.html");
 await page.locator("#fractionPieces .piece").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#fractionPieces .piece").count(),2);
 await assertMobile();
 // Wrong attempt should be gentle and should not be recorded as completion.
 await page.locator("#checkFraction").click();
 assert.match(await page.locator("#fractionFeedback").textContent(),/Good try/);
 assert.match(await page.locator("#fractionProgress").textContent(),/0 \/ 12/);
 const gradeOneBeforeFractions=await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1"));
 for(let i=0;i<12;i++){
   const target=await page.locator("#question").textContent();
   const fraction=target.match(/\((\d+) \/ (\d+)\)/);
   assert(fraction,"Cannot parse hands-on fractions question");
   const numerator=Number(fraction[1]),denominator=Number(fraction[2]);
   assert.equal(await page.locator("#fractionPieces .piece").count(),denominator);
   for(let p=0;p<numerator;p++)await page.locator("#fractionPieces .piece").nth(p).click();
   await page.locator("#checkFraction").click();
   assert.equal(await page.locator("#nextFraction").isVisible(),true);
   await page.locator("#nextFraction").click();
 }
 assert.equal(await page.locator("#win").isVisible(),true);
 assert.match(await page.locator("#fractionProgress").textContent(),/12 \/ 12/);
 assert.equal(await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1")),gradeOneBeforeFractions,
   "Fraction pilot must not edit Grade 1 progress");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#fractionProgress").textContent(),/12 \/ 12/);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Parent privacy: export and deletion only affect lla- app keys.
 await goto("privacy.html");
 await page.locator("#storageSummary").waitFor({state:"visible"});
 await assertMobile();
 const beforePrivacy=await page.evaluate(()=>Object.keys(localStorage).filter(x=>x.startsWith("lla-")).length);
 await page.evaluate(()=>localStorage.setItem("unrelated-demo-key","keep"));
 await page.locator("#confirmErase").fill("DEL");
 assert.equal(await page.locator("#eraseData").isDisabled(),true,"Accidental deletion should be blocked");
 await page.locator("#confirmErase").fill("DELETE");
 assert.equal(await page.locator("#eraseData").isEnabled(),true);
 await page.locator("#eraseData").click();
 const afterPrivacy=await page.evaluate(()=>({
  app:Object.keys(localStorage).filter(x=>x.startsWith("lla-")).length,
  unrelated:localStorage.getItem("unrelated-demo-key")
 }));
 assert.equal(afterPrivacy.app,0,"Privacy erase should clear only app-specific progress");
 assert.equal(afterPrivacy.unrelated,"keep","Unrelated browser data must be untouched");
 await page.evaluate(()=>localStorage.removeItem("unrelated-demo-key"));
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Qatar Mini Market: all 10 pretend-money challenges and mobile layout.
 await goto("qatar-mini-market.html");
 await page.locator("#marketAnswers button").first().waitFor({state:"visible"});
 await assertMobile();
 const marketAnswers=[[2,3,5],[4,5,9],[8,3,5],[6,2,8],[10,4,6],[7,5,12],[13,6,7],[9,4,13],[15,8,7],[11,7,18]];
 for(let i=0;i<marketAnswers.length;i++){
   const [a,b,answer]=marketAnswers[i];
   await page.locator('#marketAnswers button[data-value="'+answer+'"]').click();
   assert.equal(await page.locator("#nextMarket").isVisible(),true);
   await page.locator("#nextMarket").click();
 }
 assert.equal(await page.locator("#marketWin").isVisible(),true);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-market-v1")).completed),true);
 await page.locator("#restartMarket").click();
 assert.match(await page.locator("#marketProgress").textContent(),/1 \/ 10/);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});await assertMobile();
 // Parent curriculum skills map groups the real 151 challenges and deep-links.
 await goto("curriculum-skills-map.html");
 await page.locator("#skillSubjects .subject").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#skillSubjects .subject").count(),5);
 assert.match(await page.locator("#mapSummary").textContent(),/151 mini-challenges completed|151 available to explore|151 mini-challenges/);
 const suggestions=page.locator("#recommendedActivities .nextItem");
 assert.equal(await suggestions.count(),5,"There should be exactly five learning recommendations");
 const nextLinks=await suggestions.locator("a").evaluateAll(nodes=>nodes.map(a=>a.getAttribute("href")));
 assert.equal(new Set(nextLinks).size,5,"Five recommendations must target distinct activities");
 for(const url of nextLinks)assert(url.includes("?activity=mini-"),"Recommendation must deep-link to a single playable challenge");
 const mathSkills=page.locator('#skillSubjects .subject[data-area="math"] .skill');
 assert(await mathSkills.count()>=4,"Mathematics skill mapping missing");
 await assertMobile();
 await suggestions.first().locator("a").click();
 await page.locator("#playView").waitFor({state:"visible"});
 const recommendedId=await page.locator("#playView").getAttribute("data-activity");
 assert(recommendedId&&recommendedId.startsWith("mini-"),"Suggested task failed to open");
 await goto("curriculum-skills-map.html");
 await page.locator('#skillSubjects .subject[data-area="math"] .skill').first().locator("a").click();
 await page.locator("#activityGrid .activity").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#areaSelect").inputValue(),"math");
 assert.notEqual(await page.locator("#skillSelect").inputValue(),"all");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Science Sorting Garden: four chapters of 16 real tap-to-sort challenges.
 await goto("science-sort.html");
 await page.locator("#sortOptions button").first().waitFor({state:"visible"});
 await assertMobile();
 const sciCorrect=["Living","Non-living","Living","Non-living",
   "Wood","Metal","Glass","Plastic","Sight","Hearing","Smell","Taste",
   "Helps a plant","Helps a plant","Not needed by a plant","Not needed by a plant"];
 await page.locator('#sortOptions button[data-category="Non-living"]').click();
 assert.match(await page.locator("#sortFeedback").textContent(),/Good try/);
 await page.locator('#sortOptions button[data-category="Living"]').click();
 assert.equal(await page.locator("#nextRound").isVisible(),true);
 await page.locator("#nextRound").click();
 for(let i=1;i<sciCorrect.length;i++){
  await page.locator('#sortOptions button[data-category="'+sciCorrect[i]+'"]').click();
  assert.equal(await page.locator("#nextRound").isVisible(),true,"Science round "+(i+1)+" did not accept answer");
  await page.locator("#nextRound").click();
 }
 assert.equal(await page.locator("#success").isVisible(),true);
 assert.equal(await page.locator("#roundProgress").textContent(),"16 / 16");
 const sciStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 await page.locator("#replay").click();
 for(const value of sciCorrect){await page.locator('#sortOptions button[data-category="'+value+'"]').click();await page.locator("#nextRound").click();}
 assert.equal(await page.locator("#success").isVisible(),true);
 const sciReplay=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(sciReplay,sciStars,"Replaying science must not award duplicate stars");
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Unclear Arabic شمس is withheld in both relevant lessons, with direct review.
 await goto("index.html");
 await page.locator('#subjects .subject[data-id="english"]').click();
 await page.locator('#lessonList .lessonCard[data-id="phonics"]').click();
 const sunArabic=page.locator('#items .item[data-i="2"] .speakBtn.arBtn');
 assert.equal(await sunArabic.isDisabled(),true,"Unclear Arabic شمس must not play in phonics lesson");
 assert.match(await sunArabic.textContent(),/قيد المراجعة/);
 assert.equal(await page.locator('#items .item[data-i="2"] a[href*="pronunciation-review.html?lesson=phonics&item=2"]').count(),1);
 await goto("pronunciation-review.html?lesson=phonics&item=2");
 assert.equal(await page.locator("#cards .item").count(),1,"Focused review should show only شمس");
 assert.match(await page.locator("#cards .item .names").textContent(),/sun/);
 await assertMobile();
 await goto("index.html");
 await page.locator('#subjects .subject[data-id="arts"]').click();
 await page.locator('#lessonList .lessonCard[data-id="draw"]').click();
 assert.equal(await page.locator('#items .item[data-i="1"] .speakBtn.arBtn').isDisabled(),true,"Arabic شمس must be held in drawing lesson too");
 assert.equal(await page.locator('#items .item[data-i="1"] .speakBtn.en').isEnabled(),true,"English sun must remain playable");
 await assertMobile();
 // Parent listening report: the four pattern words have selective audio holds.
 await goto("index.html");
 await page.locator("#girlVoice").click();
 await page.locator('#subjects .subject[data-id="arts"]').click();
 await page.locator('#lessonList .lessonCard[data-id="patterns"]').click();
 assert.equal(await page.locator('#items .item[data-i="0"] .speakBtn.en').isDisabled(),true,
   "Unclear female-style English red must be paused");
 for(let i=0;i<4;i++){
   assert.equal(await page.locator('#items .item[data-i="'+i+'"] .speakBtn.arBtn').isDisabled(),true,
     "Both Arabic-style colours are unclear; Arabic child audio must be paused");
 }
 for(let i=1;i<4;i++){
   assert.equal(await page.locator('#items .item[data-i="'+i+'"] .speakBtn.en').isEnabled(),true,
     "Clear-rated English female-style pattern word should remain playable");
 }
 await page.locator("#lessonBoyVoice").click();
 for(let i=0;i<4;i++){
   const clip=page.locator('#items .item[data-i="'+i+'"] .speakBtn.en');
   assert.equal(await clip.isEnabled(),true,
     "All four male-style English pattern recordings were marked clear");
 }
 await page.locator('#items .item[data-i="0"] .speakBtn.en').click();
 const recordedPattern=await page.evaluate(()=>window.__recordedAudioUrls.at(-1));
 assert(recordedPattern.includes("audio/en/patterns-0-boy.mp3"),
   "Clear English male-style red recording was not played");
 await assertMobile();
 // Sound help distinguishes playback status from pronunciation, without uploading audio.
 await goto("sound-help.html");
 await page.locator("#clips audio").first().waitFor({state:"visible"});
 assert.equal(await page.locator("#clips audio").count(),3,"Expected female, male, Arabic sample controls");
 assert((await page.locator("#clips audio").nth(0).getAttribute("src")).includes("en-phonics-0-girl.mp3"));
 assert((await page.locator("#clips audio").nth(2).getAttribute("src")).includes("ar-phonics-0-boy.mp3"));
 await page.locator("#wordChoice").selectOption("3");
 assert((await page.locator("#clips audio").nth(0).getAttribute("src")).includes("en-phonics-3-alba.mp3"));
 await page.locator("#problemChoice").selectOption("unclear");
 assert.match(await page.locator("#suggestion").textContent(),/clearer source recording/);
 assert.match(await page.locator("#report").textContent(),/Word: bus/);
 await assertMobile();
 await page.setViewportSize({width:768,height:1024});await assertMobile();
 await page.setViewportSize({width:390,height:844});
 // Three-level maths reasoning lab: hints and saved mastery.
 await goto("maths-thinking.html");
 await page.locator("#options button").first().waitFor({state:"visible"});
 await assertMobile();
 assert.equal(await page.locator("#options button").count(),3);
 await page.locator("#hint").click();
 assert.match(await page.locator("#feedback").textContent(),/Count each group carefully/);
 await page.locator('#options button[data-answer="1"]').click();
 assert.match(await page.locator("#score").textContent(),/1 \/ 24/);
 assert.equal(await page.locator("#explain").isVisible(),true);
 await page.locator("#explain").click();
 assert.match(await page.locator("#feedback").textContent(),/Seven is greater/);
 await page.locator("#next").click();
 assert.match(await page.locator("#progress").textContent(),/Challenge 2/);
 await page.locator("#level3").click();
 assert.match(await page.locator("#progress").textContent(),/Challenge 1/);
 assert.match(await page.locator("#prompt").textContent(),/bus has 12 passengers/);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#score").textContent(),/1 \/ 24/);
 await page.setViewportSize({width:768,height:1024});await assertMobile();
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
