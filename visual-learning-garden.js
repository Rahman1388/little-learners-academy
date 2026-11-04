(()=>{
"use strict";
const worlds=window.LLA_VISUAL_GARDEN;
if(!Array.isArray(worlds)||worlds.length!==6)throw new Error("Visual learning content is unavailable.");
const KEY="lla-visual-learning-garden-v1";
const ids=new Set(worlds.map(w=>w.id));
const $=id=>document.getElementById(id);
function readDone(){
 try{
  const value=JSON.parse(localStorage.getItem(KEY)||"[]");
  return new Set(Array.isArray(value)?value.filter(id=>typeof id==="string"&&ids.has(id)):[]);
 }catch{return new Set();}
}
const done=readDone();
function saveDone(){try{localStorage.setItem(KEY,JSON.stringify([...done].sort()))}catch{}}
let current=-1,seen=new Set(),solved=false;
function arNode(value,className){
 const span=document.createElement("span");span.textContent=value;
 span.lang="ar";span.dir="rtl";if(className)span.className=className;
 return span;
}
function showPicker(){
 current=-1;$("play").hidden=true;$("picker").hidden=false;
 $("adultPanel").hidden=true;$("adultToggle").setAttribute("aria-expanded","false");
 renderCards();
}
function renderCards(){
 const cards=$("mapCards");cards.replaceChildren();
 worlds.forEach((world,i)=>{
  const button=document.createElement("button");
  button.type="button";button.className="mapCard";
  button.dataset.map=world.id;
  const icon=document.createElement("span");icon.className="emoji";
  icon.textContent=world.icon;icon.setAttribute("aria-hidden","true");
  const title=document.createElement("strong");title.textContent=world.name;
  const nameAr=arNode(world.ar,"arName");
  const meta=document.createElement("span");meta.className="meta";
  meta.textContent="Grades "+world.band+" • "+world.topic;
  const status=document.createElement("span");status.className="completion";
  status.textContent=done.has(world.id)?"🌟 Explored • تمت ممارسته":"🌱 Ready to explore • جاهز للاستكشاف";
  button.append(icon,title,nameAr,meta,status);
  button.addEventListener("click",()=>startMap(i));
  cards.append(button);
 });
 $("overallProgress").textContent=done.size+" / "+worlds.length+" concept maps practised on this device • "+done.size+" من "+worlds.length+" خرائط تمت ممارستها";
}
function startMap(i){
 if(!Number.isInteger(i)||i<0||i>=worlds.length)return;
 current=i;seen=new Set();solved=false;
 const world=worlds[i];
 $("picker").hidden=true;$("play").hidden=false;
 $("mapTitle").textContent=world.name+" • "+world.ar;
 $("mapTopic").textContent=world.topic+" • "+world.arTopic;
 $("mapBand").textContent="Grades "+world.band+" • الصفوف "+world.band;
 $("mapIcon").textContent=world.icon;
 $("centerEnglish").textContent=world.center;
 $("centerArabic").textContent=world.arCenter;
 $("factEnglish").textContent="Touch a leaf to discover its meaning.";
 $("factArabic").textContent="المس ورقة لتكتشف معناها.";
 $("challenge").hidden=true;$("reflection").hidden=true;
 $("answerFeedback").textContent="";
 $("leafCount").textContent="0 / 4 leaves explored • لم يتم استكشاف أي ورقة بعد";
 const petals=$("petals");petals.replaceChildren();
 world.petals.forEach((petal,j)=>{
  const button=document.createElement("button");
  button.type="button";button.className="petal "+["rose","sun","leaf","sky"][j];
  button.dataset.petal=String(j);button.setAttribute("aria-pressed","false");
  const emoji=document.createElement("span");emoji.className="leafEmoji";
  emoji.textContent=petal.icon;emoji.setAttribute("aria-hidden","true");
  const english=document.createElement("strong");english.textContent=petal.en;
  button.append(emoji,english,arNode(petal.ar,"leafAr"));
  button.addEventListener("click",()=>{
   button.setAttribute("aria-pressed","true");
   seen.add(j);
   $("factEnglish").textContent=petal.en+": "+petal.enFact;
   $("factArabic").textContent=petal.ar+" — "+petal.arFact;
   $("leafCount").textContent=seen.size+" / 4 leaves discovered • "+seen.size+" من ٤ أوراق";
   if(seen.size===4&&$("challenge").hidden)showChallenge(world);
  });
  petals.append(button);
 });
 $("mapTitle").focus({preventScroll:true});
}
function showChallenge(world){
 $("challenge").hidden=false;
 $("questionEnglish").textContent=world.q;
 $("questionArabic").textContent=world.arQ;
 $("answerFeedback").textContent="Choose the best answer. You can try again. • اختر الإجابة الأنسب. يمكنك المحاولة مرة أخرى.";
 const choices=$("choices");choices.replaceChildren();
 // Rotate the displayed answer positions: the correct choice is not always first.
 for(let place=0;place<world.choices.length;place++){
  const original=(place+current+1)%world.choices.length;
  const pair=world.choices[original];
  const button=document.createElement("button");
  button.type="button";button.className="choice";button.dataset.choice=String(original);
  const en=document.createElement("span");en.textContent=pair[0];
  button.append(en,arNode(pair[1],"arChoice"));
  button.addEventListener("click",()=>answer(world,original,button));
  choices.append(button);
 }
 $("questionEnglish").focus({preventScroll:true});
}
function answer(world,choice,button){
 if(solved||current<0)return;
 if(choice!==world.answer){
  button.disabled=true;button.classList.add("wrong");
  $("answerFeedback").textContent="🌱 Good thinking. Look at the colourful leaves and try another answer.\nمحاولة جيدة! راجع الأوراق الملوّنة وحاول مرة أخرى.";
  return;
 }
 solved=true;button.classList.add("correct");
 $("choices").querySelectorAll("button").forEach(b=>{b.disabled=true});
 $("answerFeedback").textContent="✅ Nice connection! • أحسنت الربط بين الأفكار!";
 $("reflection").hidden=false;
 $("explainEnglish").textContent=world.why;
 $("explainArabic").textContent=world.arWhy;
 $("talkEnglish").textContent=world.talk;
 $("talkArabic").textContent=world.arTalk;
 $("markDone").textContent=done.has(world.id)?
  "🌟 Explore again or return • استكشف مرة أخرى أو عُد":
  "🌟 I explored this map • استكشفت هذه الخريطة";
}
function report(){
 const lines=[
  "Little Learners Academy — Visual Learning Garden / حديقة التعلم البصري",
  "Private device-only participation summary • ملخص المشاركة على هذا الجهاز",
  "Supplementary concept maps: not official curriculum, test scores or proof of mastery.",
  "No child name, voice, response text, attempt history or other identifiers recorded.",
  ""
 ];
 worlds.forEach(w=>lines.push("Grades "+w.band+" — "+w.name+" / "+w.ar+" — "+(done.has(w.id)?"Practised / تمت الممارسة":"Not yet practised / لم تتم الممارسة")));
 lines.push("Next step: discuss or draw one idea together, then revisit an unfinished map.");
 lines.push("Arabic wording and pedagogy require qualified educator review before wide release.");
 return lines.join("\n");
}
function openAdult(){
 $("adultPanel").hidden=false;$("adultToggle").setAttribute("aria-expanded","true");
 $("adultNotes").value=report();
 $("copyStatus").textContent="";
}
$("backToPicker").addEventListener("click",showPicker);
$("markDone").addEventListener("click",()=>{
 if(!solved||current<0)return;
 done.add(worlds[current].id);saveDone();showPicker();
 $("overallProgress").focus?.();
});
$("adultToggle").addEventListener("click",()=>{
 if($("adultPanel").hidden)openAdult();
 else{$("adultPanel").hidden=true;$("adultToggle").setAttribute("aria-expanded","false");}
});
$("copyNotes").addEventListener("click",async()=>{
 const notes=report();
 try{
  if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(notes);
  $("copyStatus").textContent="✅ Copied for optional adult sharing • تم النسخ.";
 }catch{
  $("adultNotes").focus();$("adultNotes").select();
  $("copyStatus").textContent="Select and copy the highlighted text manually • انسخ النص المحدد يدويًا.";
 }
});
$("printNotes").addEventListener("click",()=>window.print());
showPicker();
})();