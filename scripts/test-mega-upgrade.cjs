/* Playwright regression for the 2026 Math Story Village + Smart Review upgrade.
 * Launch via the existing GitHub workflow after localhost:8765 is started.
 */
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block",locale:"en-GB"});
 const page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 const goto=async p=>page.goto(base+"/"+p,{waitUntil:"domcontentloaded",timeout:40000});
 const mobile=async()=>{
  const x=await page.evaluate(()=>({width:document.documentElement.scrollWidth,view:innerWidth}));
  assert(x.width<=x.view+3,"Horizontal overflow: "+JSON.stringify(x));
 };
 await goto("math-story-village.html");
 await page.locator("#storyChoices button").first().waitFor();
 assert.equal(await page.locator("#chapterCards .chapterBtn").count(),4);
 await mobile();
 const expected=[[5,7,8,9,9,11],[6,6,6,7,9,9],[3,4,6,2,7,1],[3,4,5,5,4,4]];
 for(let chapter=0;chapter<4;chapter++){
  await page.locator('#chapterCards .chapterBtn[data-chapter="'+chapter+'"]').click();
  for(let i=0;i<6;i++){
   const correct=expected[chapter][i];
   if(chapter===0&&i===0){
    const wrong=page.locator("#storyChoices button").filter({hasNotText:/^5$/}).first();
    await wrong.click();
    assert.match(await page.locator("#storyFeedback").textContent(),/Not quite/);
    await page.locator("#showModel").click();
    assert.equal(await page.locator("#storyModel").isVisible(),true);
    assert.match(await page.locator("#storyModel").textContent(),/Count both groups together/);
   }
   const button=page.locator('#storyChoices button[data-value="'+correct+'"]');
   assert.equal(await button.count(),1,"Missing answer "+correct+" in chapter "+chapter+", question "+i);
   await button.click();
   assert.match(await page.locator("#storyFeedback").textContent(),/Great thinking/);
   if(i<5)await page.locator("#nextStory").click();
  }
  assert.equal(await page.locator("#chapterSuccess").isVisible(),true,"Chapter "+chapter+" badge missing");
  assert.match(await page.locator("#chapterBadges").textContent(),new RegExp((chapter+1)+" / 4"));
  await mobile();
 }
 assert.match(await page.locator("#storyProgress").textContent(),/24 \/ 24/);
 assert.match(await page.locator("#chapterBadges").textContent(),/4 \/ 4/);
 const stars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(stars,4,"Four chapters should award exactly four stars");
 await page.locator("#playChapterAgain").click();
 for(const answer of expected[3]){
  await page.locator('#storyChoices button[data-value="'+answer+'"]').click();
  const step=await page.locator("#storyStep").textContent();
  if(!/Story 6 of 6/.test(step))await page.locator("#nextStory").click();
 }
 const replayStars=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-progress-v2")).stars);
 assert.equal(replayStars,stars,"Replay must not create duplicate stars");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#storyProgress").textContent(),/24 \/ 24/);
 await page.setViewportSize({width:768,height:1024});await mobile();
 await page.setViewportSize({width:360,height:780});await mobile();
 await goto("star-journey.html");
 assert.match(await page.locator("#storyBadgeProgress").textContent(),/24 \/ 24 stories/);
 assert.equal(await page.locator("#storyBadges .medal.earned").count(),4);
 await mobile();
 await goto("parent-progress.html");
 assert.match(await page.locator("#mathStoryCount").textContent(),/24 \/ 24/);
 assert.match(await page.locator("#mathStoryBadges").textContent(),/4 \/ 4/);
 await mobile();
 await goto("international-benchmark.html");
 assert.match(await page.locator("body").textContent(),/4,000\+/);
 assert((await page.locator('a[href="https://www.khanacademy.org/kids/pricing"]').count())>=1,"Missing Khan Academy official reference");
 // Verify the benchmark is genuinely Gulf + international, not Khan-only.
 assert((await page.locator('a[href="https://www.edu.gov.qa/en/Content/EarlyLearning"]').count())>=1,"Missing official Qatar foundation-stage reference");
 assert.equal(await page.locator('a[href="https://www.alefeducation.com/ar/products/abjadiyat"]').count(),1,"Missing UAE Arabic-learning reference");
 assert.equal(await page.locator('a[href="https://madrasa.org/who?lang=en"]').count(),1,"Missing UAE Arabic science/maths platform");
 assert.equal(await page.locator('a[href="https://madrasatibeta.moe.gov.sa/books?Language=2"]').count(),1,"Missing Saudi Grade 1–6 curriculum reference");
 assert((await page.locator('a[href="https://www.ixl.com/"]').count())>=1,"Missing current official IXL skills reference");
 assert.equal(await page.locator('a[href="https://support.splashlearn.com/hc/en-us/articles/12275062512658-What-is-SplashLearn"]').count(),1,"Missing official SplashLearn comparison");
 assert.equal(await page.locator('a[href="https://www.abcmouse.com/learn/program/math-learning-program-online"]').count(),1,"Missing official ABCmouse activity count");
 assert.match(await page.locator("body").textContent(),/limited playable pilot questions/i,"Grade 2–6 pilots should not be presented as full curricula");
 assert.match(await page.locator("#gulfSources").textContent(),/not proof/i,"Curriculum approval limitations must stay visible");
 await mobile();
 await goto("grades-roadmap.html");
 assert.equal(await page.locator('a[href="./international-benchmark.html"]').count(),1);
 await goto("activity-library.html");
 await page.locator("#smartStart").click();
 assert.equal(await page.locator("#playView").isVisible(),true);
 let selected=[];
 for(let i=0;i<5;i++){
  const id=await page.locator("#playView").getAttribute("data-activity");
  selected.push(id);
  if(i===0){
   await page.locator("#showWork").click();
   assert.equal(await page.locator("#workModel").isVisible(),true);
   assert.match(await page.locator("#workModel").textContent(),/Point to each object once/);
  }
  const correct=await page.evaluate(()=>{
   const id=document.querySelector("#playView").dataset.activity;
   const a=window.LLA_MINI_ACTIVITIES.find(x=>x.id===id);
   return a.choices[a.answer];
  });
  if(i===0){
   const buttons=page.locator("#answerOptions button");
   const values=await buttons.allTextContents();
   await buttons.nth(values.findIndex(v=>v!==correct)).click();
   assert.match(await page.locator("#response").textContent(),/Good try/);
  }
  await page.getByRole("button",{name:"Answer: "+correct,exact:true}).click();
  assert.equal(await page.locator("#nextChallenge").isVisible(),true);
  await page.locator("#nextChallenge").click();
 }
 assert.equal(new Set(selected).size,5,"Smart Review repeated an activity in its five-step session");
 assert(selected.every(id=>/^mini-[0-9]{3}$/.test(id)),"Activity IDs should use stable mini-001 format");
 assert.match(await page.locator("#smartStatus").textContent(),/Five steps finished/);
 assert.match(await page.locator("#overallProgress").textContent(),/5 \/ 151/);
 const insight=await page.evaluate(()=>JSON.parse(localStorage.getItem("lla-practice-insights-v1"))["mini-001"]);
 assert.equal(insight.incorrect,1,"One wrong question should count once");
 assert.equal(insight.correct,1);
 assert.equal(insight.lastResult,"correct");
 await goto("activity-library.html?subject=math");
 await page.locator("#smartStart").click();
 assert.equal(await page.locator("#playView").getAttribute("data-activity"),"mini-001","Smart Review should revisit the earlier mistake before new math");
 await mobile();
 await page.setViewportSize({width:768,height:1024});await mobile();
 await goto("parent-progress.html");
 assert.match(await page.locator("#doneCount").textContent(),/^5$/);
 assert.match(await page.locator("#attemptCount").textContent(),/^6$/);
 assert.equal(await page.locator('#practiceList .review a[href="./activity-library.html?activity=mini-001"]').count(),1);
 await browser.close();
 assert.equal(errors.length,0,"Browser JS errors: "+errors.join(" | "));
 console.log("PASS: 24 bilingual maths stories, picture model, four one-time chapter rewards, saved parent and child badges, Grade 1-6 benchmark, five-question Smart Review and retry insights on 360px/390px phones and 768px tablet");
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
