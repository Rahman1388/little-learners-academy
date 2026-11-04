(()=>{
"use strict";
const tasks=window.LLA_G3_FRACTION_BRIDGE;
const $=id=>document.getElementById(id);
if(!Array.isArray(tasks)||tasks.length!==12){
 $("feedback").textContent="The learning data could not be loaded. Please ask an adult to reload the page.";
 return;
}
const digits=s=>String(s).replace(/[0-9]/g,ch=>"٠١٢٣٤٥٦٧٨٩"[Number(ch)]);
let index=0,answered=false,finished=false;
const completed=new Set(),warmup=new Set();
function status(el,en,ar,kind=""){
 el.className="feedback"+(kind?" "+kind:"");
 el.replaceChildren(document.createTextNode(en+" "));
 const translation=document.createElement("span");
 translation.lang="ar";translation.dir="rtl";translation.textContent=ar;
 el.append(translation);
}
function makeModel(n,d,labelEn,labelAr){
 const wrap=document.createElement("div");wrap.className="modelBlock";
 const label=document.createElement("p");label.className="modelLabel";
 label.textContent=labelEn+" • "+n+"/"+d+" — "+labelAr+" "+digits(n+"/"+d);
 const bar=document.createElement("div");bar.className="modelBar";
 bar.style.gridTemplateColumns="repeat("+d+",minmax(0,1fr))";
 bar.setAttribute("role","img");
 bar.setAttribute("aria-label",n+" of "+d+" equal parts shaded; "+labelAr);
 for(let i=0;i<d;i++){
  const cell=document.createElement("span");
  cell.className="modelCell"+(i<n?" filled":"");
  cell.textContent=i<n?"🌼":"·";
  cell.setAttribute("aria-hidden","true");
  bar.append(cell);
 }
 wrap.append(label,bar);
 return wrap;
}
function paintIntro(){
 $("exampleBars").replaceChildren(makeModel(1,2,"One half","نصف"),makeModel(2,4,"Two quarters","ربعان"));
 $("warmupParts").replaceChildren();
 for(let i=0;i<4;i++){
  const b=document.createElement("button");b.type="button";
  b.textContent="🌱";b.setAttribute("aria-pressed","false");
  b.setAttribute("aria-label","Equal part "+(i+1)+" of 4");
  b.addEventListener("click",()=>{
   if(warmup.has(i)){warmup.delete(i)}else{warmup.add(i)}
   b.setAttribute("aria-pressed",String(warmup.has(i)));
   $("warmupCount").textContent=warmup.size+" / 4 selected • "+digits(warmup.size)+" من ٤";
   status($("warmupFeedback"),"Choose two parts, then press Check.","اختر جزأين ثم اضغط على زر التحقّق.");
  });
  $("warmupParts").append(b);
 }
}
$("warmupCheck").addEventListener("click",()=>{
 if(warmup.size===2){
  status($("warmupFeedback"),"🌟 Well done! You built 2/4, which is the same share as 1/2.","أحسنت! كوّنت ٢/٤، وهو يساوي ١/٢.","good");
 }else{
  status($("warmupFeedback"),"Try again: there should be exactly two selected pieces out of four.","حاول مجدداً: اختر جزأين فقط من أربعة أجزاء.","try");
 }
});
$("warmupReset").addEventListener("click",()=>{
 warmup.clear();
 $("warmupParts").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed","false"));
 $("warmupCount").textContent="0 / 4 selected • ٠ من ٤";
 status($("warmupFeedback"),"The garden is clear. Try shading two quarters again.","تم مسح الاختيار. حاول تلوين ربعين مجدداً.");
});
function choicesFor(task){
 if(task.kind==="read")return task.options.map(v=>({value:v,en:v,ar:digits(v)}));
 if(task.kind==="compare")return [
  {value:"left",en:"Left has more",ar:"اليسار أكبر"},
  {value:"equal",en:"Both equal",ar:"متساويان"},
  {value:"right",en:"Right has more",ar:"اليمين أكبر"}
 ];
 return [
  {value:"same",en:"Yes, equivalent",ar:"نعم، متكافئان"},
  {value:"different",en:"No, different",ar:"لا، مختلفان"}
 ];
}
function updateProgress(){
 const n=completed.size;
 $("progressBar").style.width=(100*n/tasks.length)+"%";
 $("progressText").textContent=n+" of "+tasks.length+" practice questions completed this visit • "+digits(n)+" من "+digits(tasks.length)+" نشاطاً";
}
function render(){
 finished=false;answered=false;
 const t=tasks[index];
 $("challengeCounter").textContent="PRACTICE "+(index+1)+" / "+tasks.length+" • النشاط "+digits(index+1)+" من "+digits(tasks.length);
 const title=t.kind==="read"?"🌿 Read the shaded fraction":t.kind==="compare"?"🌻 Compare equal-sized wholes":"🌷 Connect equivalent fractions";
 $("challengeHeading").textContent=title;
 $("promptEnglish").textContent=t.kind==="read"?"Which fraction of this garden is shaded?":t.kind==="compare"?"Which equal-sized garden has more shaded area?":"Do these two equal-sized gardens show the same amount?";
 $("promptArabic").textContent=t.kind==="read"?"ما الكسر الذي يمثله الجزء الملوّن من الحديقة؟":t.kind==="compare"?"أي الحديقتين المتساويتين في الحجم تحتوي على جزء ملوّن أكبر؟":"هل الجزء الملوّن متساوٍ في الحديقتين المتساويتين في الحجم؟";
 $("modelArea").replaceChildren();
 $("modelArea").append(makeModel(t.left[0],t.left[1],t.right?"Left garden":"Garden","الحديقة اليسرى"));
 if(t.right)$("modelArea").append(makeModel(t.right[0],t.right[1],"Right garden","الحديقة اليمنى"));
 const options=$("options");options.replaceChildren();options.hidden=false;
 for(const choice of choicesFor(t)){
  const b=document.createElement("button");b.type="button";b.dataset.choice=choice.value;
  const en=document.createElement("strong");en.textContent=choice.en;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=choice.ar;
  b.append(en,ar);
  b.addEventListener("click",()=>choose(choice.value,b,t));
  options.append(b);
 }
 $("hintButton").hidden=false;$("hintButton").setAttribute("aria-expanded","false");
 $("hintText").hidden=true;$("hintText").textContent="";
 $("nextButton").hidden=true;$("nextButton").textContent=index===tasks.length-1?"🏆 Finish this visit • إنهاء":"➡ Next adventure • التالي";
 $("modelArea").hidden=false;$("promptArabic").hidden=false;
 $("promptEnglish").hidden=false;
 status($("feedback"),"Choose an answer. It's okay to try again.","اختر إجابة. يمكنك المحاولة مرة أخرى.");
 updateProgress();
}
function choose(value,button,task){
 if(answered)return;
 $("options").querySelectorAll("button").forEach(b=>b.classList.remove("incorrect"));
 if(value!==task.answer){
  button.classList.add("incorrect");
  status($("feedback"),"🌱 Not quite. Look at the shaded parts and try another answer.","حاول مرة أخرى. انظر إلى الأجزاء الملوّنة.","try");
  return;
 }
 answered=true;completed.add(task.id);button.classList.add("correct");
 $("options").querySelectorAll("button").forEach(b=>b.disabled=true);
 status($("feedback"),"🎉 Correct! "+task.explanationEn,"أحسنت! "+task.explanationAr,"good");
 $("nextButton").hidden=false;
 updateProgress();
}
$("hintButton").addEventListener("click",()=>{
 const t=tasks[index],isOpen=$("hintButton").getAttribute("aria-expanded")==="true";
 $("hintButton").setAttribute("aria-expanded",String(!isOpen));
 $("hintText").hidden=isOpen;
 if(isOpen)return;
 const hints={
  read:["Count the coloured pieces first, then all the equal pieces.","عدّ الأجزاء الملوّنة أولاً، ثم عدّ كل الأجزاء المتساوية."],
  compare:["Both wholes have the same size. Compare how many equal pieces are shaded.","الحجمان متساويان. قارن عدد الأجزاء المتساوية الملوّنة."],
  equivalent:["Compare the coloured length of two bars of the same width, even if they have different numbers of pieces.","قارن طول الجزء الملوّن في شريطين متساويين في العرض، حتى إن اختلف عدد الأجزاء."]
 };
 $("hintText").textContent=hints[t.kind][0]+" • "+hints[t.kind][1];
});
function finish(){
 finished=true;
 $("challengeCounter").textContent="YOUR FRACTION GARDEN • حديقة الكسور";
 $("challengeHeading").textContent="🌟 Wonderful exploring! • أحسنت!";
 $("promptEnglish").textContent="You tried all 12 questions. Explain a fraction to a parent or teacher, or practise again.";
 $("promptArabic").textContent="أنهيت ١٢ نشاطاً. اشرح أحد الكسور لولي الأمر أو المعلّم، أو تدرب مجدداً.";
 $("modelArea").hidden=true;$("options").hidden=true;$("hintText").hidden=true;$("hintButton").hidden=true;$("nextButton").hidden=true;
 status($("feedback"),"Practice completed this visit. This is not a school grade or a mastery certificate.","انتهى التدريب لهذه الزيارة. هذه ليست درجة مدرسية أو شهادة إتقان.","good");
 $("challengeHeading").focus();
}
$("nextButton").addEventListener("click",()=>{
 if(!answered)return;
 if(index===tasks.length-1){finish();return}
 index++;render();$("challengeHeading").focus();
});
$("restartButton").addEventListener("click",()=>{
 index=0;answered=false;finished=false;completed.clear();render();$("challengeHeading").focus();
});
paintIntro();render();
})();