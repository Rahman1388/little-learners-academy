/* Capture real Little Learners Academy screens at a common mobile size.
   Uses local website source, not design mock-ups or generated illustrations. */
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");

(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browser.newContext({
    viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,
    hasTouch:true,locale:"en-GB",serviceWorkers:"block",
  });
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",error=>errors.push(error.message));
  const url="http://127.0.0.1:8765/index.html";
  await page.goto(url,{waitUntil:"networkidle",timeout:40000});
  await page.locator("#subjects .subject").first().waitFor({state:"visible",timeout:20000});
  if(!/Little Learners Academy/.test(await page.title()))throw new Error("Wrong site loaded");
  fs.mkdirSync("screenshots",{recursive:true});
  await page.screenshot({path:"screenshots/mobile-home.png",fullPage:false,animations:"disabled"});
  await page.locator('#subjects .subject[data-id="english"]').click();
  await page.locator("#lessonList .lessonCard").first().waitFor();
  await page.screenshot({path:"screenshots/mobile-english-lessons.png",fullPage:false,animations:"disabled"});
  await page.locator('#lessonList .lessonCard[data-id="phonics"]').click();
  await page.locator("#lessonView").waitFor({state:"visible"});
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:"screenshots/mobile-phonics-top.png",fullPage:false,animations:"disabled"});
  await page.locator(".stage").first().scrollIntoViewIfNeeded();
  await page.evaluate(()=>window.scrollBy(0,-24));
  await page.screenshot({path:"screenshots/mobile-phonics-cards.png",fullPage:false,animations:"disabled"});
  console.log("Created 4 authentic mobile-width screenshots (390 × 844 CSS px, DPR 2)");
  console.log("Page title:",await page.title());
  if(errors.length)throw new Error("Client JavaScript errors: "+errors.join("; "));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
