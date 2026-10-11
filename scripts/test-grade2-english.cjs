/* All 24 Grade 2 English questions, wrong-answer recovery, persistence,
 * mobile and tablet layout; no speech or remote data dependencies.
 */
const assert=require("node:assert/strict"),{chromium}=require("playwright"),fs=require("node:fs"),vm=require("node:vm");
(async()=>{
 const source=fs.readFileSync("grade2-english-data.js","utf8");
 const sandbox={window:{}};vm.runInNewContext(source,sandbox);
 const items=sandbox.window.LLA_GRADE2_ENGLISH;
 assert.equal(items.length,24);
 assert.equal(new Set(items.map(x=>x.id)).size,24);
 for(const area of ["understand","think","words","write"])assert.equal(items.filter(x=>x.domain===area).length,6);
 for(const item of items){
  assert(item.choices.length===3&&item.choices[item.answer]&&item.reason&&item.story);
  assert.equal(new Set(item.choices).size,3);
 }
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const base=process.env.TEST_URL||"http://127.0.0.1:8765";
 await page.goto(base+"/grade2-english.html",{waitUntil:"domcontentloaded"});
 const overflow=async()=>{
  const x=await page.evaluate(()=>({width:document.documentElement.scrollWidth,view:innerWidth}));
  assert(x.width<=x.view+3,"Horizontal overflow "+JSON.stringify(x));
 };
 await page.locator("#domains .domain").first().waitFor();
 await overflow();
 assert.equal(await page.locator("#domains .domain").count(),4);
 let total=0;
 for(const domain of ["understand","think","words","write"]){
  await page.locator('#domains .domain[data-domain="'+domain+'"]').click();
  for(const task of items.filter(x=>x.domain===domain)){
   assert.equal(await page.locator("#storyText").textContent(),task.story);
   const answers=page.locator("#answerOptions button");
   if(total===0){
    const wrong=(task.answer+1)%3;
    await answers.nth(wrong).click();
    assert.match(await page.locator("#feedback").textContent(),/Nice try/);
    assert.equal(await page.locator("#nextQuestion").isVisible(),false);
   }
   await answers.nth(task.answer).click();
   assert.equal(await page.locator("#reason").isVisible(),true);
   assert.equal(await page.locator("#nextQuestion").isVisible(),true);
   total++;
   assert.match(await page.locator("#g2eCount").textContent(),new RegExp(total+" / 24"));
   await page.locator("#nextQuestion").click();
  }
  assert.equal(await page.locator("#pickPanel").isVisible(),true);
 }
 assert.equal(total,24);
 assert.equal(await page.locator("#domains .domain.done").count(),4);
 await page.reload({waitUntil:"domcontentloaded"});
 assert.match(await page.locator("#g2eCount").textContent(),/24 \/ 24/);
 await overflow();await page.setViewportSize({width:768,height:1024});await overflow();
 assert.deepEqual(errors,[]);
 console.log("PASS: 24 Grade 2 English reading tasks, 4 pathways, retry, persistent progress and 390/768 mobile layouts");
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
