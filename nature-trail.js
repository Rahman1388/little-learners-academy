(()=>{
"use strict";
const ITEMS=window.LLA_NATURE_TRAIL;
const $=id=>document.getElementById(id);
const SCENES={
 garden:{emoji:"🌱 🌼 🌳",en:"Garden",ar:"الحديقة",description:"Original illustrated garden with plants"},
 desert:{emoji:"☀️ 🐪 🏜️",en:"Desert",ar:"الصحراء",description:"Original illustrated sandy desert with a camel"},
 coast:{emoji:"🌊 🐚 🐟",en:"Coast",ar:"الساحل",description:"Original illustrated coastline with blue water"},
 mangrove:{emoji:"🌿 🦀 🐦",en:"Mangroves",ar:"أشجار القرم",description:"Original illustrated coastal mangrove habitat"}
};
const NUMBER_AR=s=>String(s).replace(/[0-9]/g,char=>"٠١٢٣٤٥٦٧٨٩"[Number(char)]);
let band="1-2",index=0,solved=false,completed=0;
function setText(id,value){$(id).textContent=value}
function dual(container,en,ar){
 container.replaceChildren();
 const english=document.createElement("div");english.textContent=en;
 const arabic=document.createElement("div");arabic.className="ar";arabic.lang="ar";arabic.dir="rtl";arabic.textContent=ar;
 container.append(english,arabic);
}
function selection(){return ITEMS.filter(item=>item.band===band)}
function updateProgress(){
 setText("progress",completed+" of 4 discoveries completed this visit • "+NUMBER_AR(completed)+" من ٤ اكتشافات");
 $("progressFill").style.width=completed*25+"%";
}
function show(){
 const t=selection()[index];
 if(!t)return;
 solved=false;
 setText("stepCount","DISCOVERY "+(index+1)+" OF 4 • الاكتشاف "+NUMBER_AR(index+1)+" من ٤");
 setText("stepTitle","🔎 Look closely • انظر جيدًا");
 const info=SCENES[t.scene];
 $("scene").dataset.scene=t.scene;
 $("scene").setAttribute("aria-label",info.description);
 setText("sceneEmoji",info.emoji);
 setText("sceneCaption",info.en+" • "+info.ar);
 setText("questionEn",t.en);setText("questionAr",t.ar);
 const grid=$("answers");grid.replaceChildren();
 t.choices.forEach((option,choiceIndex)=>{
  const b=document.createElement("button");b.type="button";b.dataset.option=String(choiceIndex);
  b.setAttribute("aria-label",option[1]+" — "+option[2]);
  const pic=document.createElement("span");pic.className="symbol";pic.textContent=option[0];pic.setAttribute("aria-hidden","true");
  const en=document.createElement("span");en.className="english";en.textContent=option[1];
  const ar=document.createElement("span");ar.className="arabic";ar.lang="ar";ar.dir="rtl";ar.textContent=option[2];
  b.append(pic,en,ar);
  b.addEventListener("click",()=>choose(choiceIndex,b,t));
  grid.append(b);
 });
 $("hint").hidden=true;setText("hint","");
 $("hintButton").setAttribute("aria-expanded","false");
 $("next").hidden=true;$("familyTalk").hidden=true;
 dual($("feedback"),"Choose an answer. You can try again.","اختر إجابة. يمكنك المحاولة مرة أخرى.");
 $("feedback").className="feedback";
 $("play").hidden=false;$("finish").hidden=true;
 updateProgress();
}
function choose(choice,b,t){
 if(solved)return;
 $("answers").querySelectorAll("button").forEach(x=>x.classList.remove("wrong"));
 if(choice!==t.correct){
  b.classList.add("wrong");
  dual($("feedback"),"🌱 Nice exploring! Look again and try another idea.","أحسنت الاستكشاف! انظر مرة أخرى وجرّب إجابة أخرى.");
  $("feedback").className="feedback try";
  return;
 }
 solved=true;completed++;
 b.classList.add("correct");
 $("answers").querySelectorAll("button").forEach(x=>x.disabled=true);
 dual($("feedback"),"🌟 Well spotted! "+t.whyEn,"أحسنت الملاحظة! "+t.whyAr);
 $("feedback").className="feedback good";
 const talk=$("familyTalk");talk.replaceChildren();
 const title=document.createElement("strong");title.textContent="💬 Talk with an adult • تحدّث مع شخص بالغ";
 const en=document.createElement("div");en.textContent=t.talkEn;
 const ar=document.createElement("div");ar.className="ar";ar.lang="ar";ar.dir="rtl";ar.textContent=t.talkAr;
 talk.append(title,en,ar);talk.hidden=false;
 $("next").hidden=false;
 $("next").textContent=index===3?"🌟 Finish adventure • أنهِ المغامرة":"🌿 Next discovery • الاكتشاف التالي";
 updateProgress();
}
$("hintButton").addEventListener("click",()=>{
 const open=$("hintButton").getAttribute("aria-expanded")==="true";
 $("hintButton").setAttribute("aria-expanded",String(!open));
 $("hint").hidden=open;
 if(open)return;
 const t=selection()[index];
 dual($("hint"),"💡 "+t.hintEn,t.hintAr);
});
function finish(){
 $("play").hidden=true;$("finish").hidden=false;
 setText("finishText","You completed "+completed+" of 4 discoveries this visit. A calm stop is a great stop. No streaks to lose.");
 $("finishTitle").focus();
}
$("next").addEventListener("click",()=>{
 if(!solved)return;
 if(index===3){finish();return}
 index++;show();$("stepTitle").focus();
});
$("stop").addEventListener("click",finish);
$("again").addEventListener("click",()=>{
 completed=0;index=0;show();$("stepTitle").focus();
});
$("level").addEventListener("change",()=>{
 const newBand=$("level").value;
 if(!["1-2","3-4","5-6"].includes(newBand))return;
 band=newBand;index=0;completed=0;
 setText("levelNote","Try one short nature journey together. This level is supplementary, not an official curriculum • رحلة قصيرة تكميلية وليست منهجًا رسميًا.");
 show();$("stepTitle").focus();
});
if(!Array.isArray(ITEMS)||ITEMS.length!==12){
 $("play").hidden=true;
 setText("levelNote","Nature data not ready. Ask an adult to reload this page. • بيانات النشاط غير جاهزة.");
}else show();
})();