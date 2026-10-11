const {chromium}=require("playwright"),assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"block"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto((process.env.TEST_URL||"http://127.0.0.1:8765")+"/grade2-mixed-quest.html",{waitUntil:"domcontentloaded"});
  await page.locator("#answers button").first().waitFor();
  const width=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
  assert(width[0]<=width[1]+3,"Mobile horizontal overflow");
  assert.equal(await page.locator("#answers button").count(),3);
  const grade1=await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1"));
  for(let n=0;n<9;n++){
   for(let k=0;k<3;k++){
    const available=page.locator("#answers button:not([disabled])");
    if(!await available.count())break;
    await available.first().click();
    if(await page.locator("#next").isVisible())break;
   }
   assert(await page.locator("#next").isVisible(),"Question "+n+" did not accept an answer");
   if(n!==8)await page.locator("#next").click();
  }
  assert((await page.locator("#progress").textContent()).includes("9 / 9"),"Mixed quest completion counter incorrect");
  assert.equal(await page.evaluate(()=>localStorage.getItem("lla-activity-library-v1")),grade1);
  await page.reload({waitUntil:"domcontentloaded"});
  assert((await page.locator("#progress").textContent()).includes("9 / 9"),"Mixed quest completion counter incorrect");
  await page.setViewportSize({width:768,height:1024});
  const tab=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
  assert(tab[0]<=tab[1]+3,"Tablet horizontal overflow");
  assert.deepEqual(errors,[]);
  console.log("PASS: Grade 2 mixed nine-question quest, mobile, persistence, progress isolation");
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});