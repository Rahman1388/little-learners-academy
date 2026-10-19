/* Original silent visual micro-lesson: no recorded voice, network, accounts, tracking,
 * child identity, storage or borrowed diagrams. Human educator/language approval pending.
 */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const copy={
 en:{
  back:"← Grade 2 Maths",
  badge:"ORIGINAL VISUAL MICRO-LESSON • ADULT / EDUCATOR PREVIEW",
  title:"The Number 43 — a visual story",
  goal:"Watch how tens and ones make a two-digit number, then connect the idea with a colorful learning map.",
  disclaimer:"Draft supplementary learning preview. Arabic wording and Grade 2 curriculum alignment require educator review. This is a captioned animation, not a filmed or voiced video. No recording or tracking.",
  storyHeading:"🎬 Watch and explore",
  help:"Choose Play for an optional guided slideshow, or use Next and Back at your own pace. Nothing starts automatically.",
  tensLabel:"Blue = tens",
  onesLabel:"Gold = ones",
  part:n=>"Part "+n+" of 5",
  playback:"Visual story playback",
  visual:(t,o)=>t+" groups of ten and "+o+" individual ones",
  prev:"← Back",next:"Next →",play:"▶ Play",pause:"⏸ Pause",replay:"↻ Replay",
  mapHeading:"🌈 Connect the idea",
  mapIntro:"Our original color-coded concept map links the central number to its tens, ones and total. Color is always accompanied by words and numbers.",
  mapLabel:"43 is four tens and three ones",
  mapTensTitle:"Tens",
  mapOnesTitle:"Ones",
  mapTogether:"Together",
  mapNote:"Adult discussion: Ask the child to point to the two branches and tell you why the digits 4 and 3 have different values. This is practice, not an automatic assessment.",
  parentHeading:"For parents and teachers",
  parentText:"Use the captioned story to introduce tens and ones. Pause to count the sticks and dots, then ask a child to explain the map. Human review is required before classroom release, and children must be able to learn without color or motion.",
  stages:[
   {title:"One group of ten",caption:"This blue stick represents one group of ten.",equation:"1 × 10 = 10"},
   {title:"Four groups of ten",caption:"Count the four blue ten-sticks. Four tens make forty.",equation:"4 × 10 = 40"},
   {title:"Add three ones",caption:"Add three single gold dots. Now we have four tens and three ones.",equation:"40 + 3 = 43"},
   {title:"Connect the parts",caption:"The 4 is in the tens place. The 3 is in the ones place. Together they make 43.",equation:"4 tens + 3 ones = 43"},
   {title:"Explain 43 yourself",caption:"Can you point to four tens and three ones and explain how they make forty-three?",equation:"40 + 3 = 43"}
  ]
 },
 ar:{
  back:"← رياضيات الصف الثاني",
  badge:"قصة رياضيات بصرية أصلية • مسودة لمراجعة المعلّمين",
  title:"العدد ٤٣ — قصة بصرية",
  goal:"شاهد كيف تكوّن العشرات والآحاد عددًا من رقمين، ثم اربط الأفكار بخريطة تعلّم ملوّنة.",
  disclaimer:"هذه مسودة تعليمية إضافية تحتاج إلى مراجعة لغوية وتربوية ومطابقة لمنهج الصف الثاني. هذا عرض بصري مصحوب بنصوص، وليس فيديو مصورًا أو ناطقًا. لا يوجد تسجيل أو تتبّع.",
  storyHeading:"🎬 شاهد واستكشف",
  help:"اختر تشغيل لمشاهدة عرض متسلسل اختياري، أو استخدم التالي والسابق للتعلّم بالسرعة المناسبة لك. لن يبدأ العرض تلقائيًا.",
  tensLabel:"الأزرق = عشرات",
  onesLabel:"الذهبي = آحاد",
  part:n=>"الجزء "+n.toLocaleString("ar-EG")+" من ٥",
  playback:"أزرار التحكّم في القصة البصرية",
  visual:(t,o)=>t.toLocaleString("ar-EG")+" مجموعات من عشرة و"+o.toLocaleString("ar-EG")+" آحاد منفردة",
  prev:"← السابق",next:"التالي ←",play:"▶ تشغيل",pause:"⏸ إيقاف مؤقت",replay:"↻ إعادة",
  mapHeading:"🌈 اربط الأفكار",
  mapIntro:"تربط خريطة المفاهيم الملوّنة الأصلية بين العدد والعشرات والآحاد والمجموع. وترافق الألوان دائمًا كلمات وأعداد توضّح معناها.",
  mapLabel:"٤٣ يتكوّن من أربع عشرات وثلاثة آحاد",
  mapTensTitle:"العشرات",
  mapOnesTitle:"الآحاد",
  mapTogether:"المجموع",
  mapNote:"إرشاد للبالغين: اطلب من الطفل الإشارة إلى فرعي الخريطة وشرح سبب اختلاف القيمة المكانية للرقمين ٤ و٣. هذه ممارسة وليست اختبارًا تلقائيًا.",
  parentHeading:"لأولياء الأمور والمعلّمين",
  parentText:"استخدم القصة المصحوبة بنصوص لشرح العشرات والآحاد. أوقف العرض لعدّ القضبان والدوائر، ثم اطلب من الطفل شرح الخريطة. لا يزال هذا المحتوى بحاجة إلى مراجعة تربوية قبل استخدامه في الصف. ويجب أن يفهم الطفل الفكرة حتى دون الاعتماد على الألوان أو الحركة.",
  stages:[
   {title:"مجموعة واحدة من عشرة",caption:"يمثّل هذا القضيب الأزرق مجموعة واحدة من عشرة.",equation:"١ × ١٠ = ١٠"},
   {title:"أربع مجموعات من عشرة",caption:"عُدَّ أربعة قضبان عشرات زرقاء. أربع عشرات تساوي أربعين.",equation:"٤ × ١٠ = ٤٠"},
   {title:"أضف ثلاثة آحاد",caption:"أضف ثلاث دوائر ذهبية منفردة. لدينا الآن أربع عشرات وثلاثة آحاد.",equation:"٤٠ + ٣ = ٤٣"},
   {title:"اربط الأجزاء",caption:"الرقم ٤ في منزلة العشرات، والرقم ٣ في منزلة الآحاد. معًا يكوّنان العدد ٤٣.",equation:"٤ عشرات + ٣ آحاد = ٤٣"},
   {title:"اشرح العدد ٤٣",caption:"هل تستطيع الإشارة إلى أربع عشرات وثلاثة آحاد وشرح كيف تكوّن العدد ثلاثة وأربعين؟",equation:"٤٠ + ٣ = ٤٣"}
  ]
 }
};
const scenes=[{tens:1,ones:0},{tens:4,ones:0},{tens:4,ones:3},{tens:4,ones:3},{tens:4,ones:3}];
let locale="en",step=0,interval=null;
const text=()=>copy[locale];
function applyLocale(){
 const t=text();
 document.documentElement.lang=locale;
 document.documentElement.dir=locale==="ar"?"rtl":"ltr";
 $("englishButton").setAttribute("aria-pressed",String(locale==="en"));
 $("arabicButton").setAttribute("aria-pressed",String(locale==="ar"));
 const keys={
  backLink:"back",pilotBadge:"badge",pageTitle:"title",goal:"goal",disclaimer:"disclaimer",
  storyHeading:"storyHeading",playerHelp:"help",tensLabel:"tensLabel",onesLabel:"onesLabel",
  mapHeading:"mapHeading",mapIntro:"mapIntro",mapTensTitle:"mapTensTitle",mapOnesTitle:"mapOnesTitle",
  mapTogether:"mapTogether",mapNote:"mapNote",parentHeading:"parentHeading",parentText:"parentText"
 };
 for(const [id,key] of Object.entries(keys))$(id).textContent=t[key];
 $("mapCenter").textContent=locale==="ar"?"٤٣":"43";
 $("mapTensValue").textContent=locale==="ar"?"٤ × ١٠ = ٤٠":"4 × 10 = 40";
 $("mapOnesValue").textContent=locale==="ar"?"٣ × ١ = ٣":"3 × 1 = 3";
 $("mapTotal").textContent=locale==="ar"?"٤٠ + ٣ = ٤٣":"40 + 3 = 43";
 $("conceptMap").setAttribute("aria-label",t.mapLabel);
 $("storyPanel").setAttribute("aria-label",t.storyHeading);
 $("previousButton").textContent=t.prev;
 $("nextButton").textContent=t.next;
 $("replayButton").textContent=t.replay;
 $("playButton").textContent=interval?t.pause:t.play;
 $("playButton").setAttribute("aria-pressed",String(!!interval));
}
function draw(){
 const s=scenes[step],t=text();
 $("rods").replaceChildren();
 $("dots").replaceChildren();
 for(let i=0;i<s.tens;i++){
  const e=document.createElement("span");e.className="rod";$("rods").append(e);
 }
 for(let i=0;i<s.ones;i++){
  const e=document.createElement("span");e.className="dot";$("dots").append(e);
 }
 $("model").setAttribute("aria-label",t.visual(s.tens,s.ones));
 $("stepCounter").textContent=t.part(step+1);
 $("stepTitle").textContent=t.stages[step].title;
 $("caption").textContent=t.stages[step].caption;
 $("equation").textContent=t.stages[step].equation;
 $("progressFill").style.width=(((step+1)/scenes.length)*100)+"%";
 $("previousButton").disabled=step===0;
 $("nextButton").disabled=step===scenes.length-1;
}
function stop(){
 if(interval!==null){clearInterval(interval);interval=null}
 $("playButton").setAttribute("aria-pressed","false");
 $("playButton").textContent=text().play;
}
function advance(){
 if(step>=scenes.length-1){stop();return}
 step++;draw();
 if(step>=scenes.length-1)stop();
}
function changeStep(n){
 stop();step=Math.max(0,Math.min(scenes.length-1,n));draw();
 $("stepTitle").focus();
}
$("previousButton").addEventListener("click",()=>changeStep(step-1));
$("nextButton").addEventListener("click",()=>changeStep(step+1));
$("replayButton").addEventListener("click",()=>changeStep(0));
$("englishButton").addEventListener("click",()=>{if(locale==="en")return;locale="en";applyLocale();draw()});
$("arabicButton").addEventListener("click",()=>{if(locale==="ar")return;locale="ar";applyLocale();draw()});
$("playButton").addEventListener("click",()=>{
 if(interval!==null){stop();return}
 if(step>=scenes.length-1)step=0;
 draw();
 // Play is opt-in only. Caption and controls remain available for manual pacing.
 interval=setInterval(advance,4000);
 $("playButton").setAttribute("aria-pressed","true");
 $("playButton").textContent=text().pause;
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)stop()});
applyLocale();draw();
})();