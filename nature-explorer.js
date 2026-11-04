(()=>{
"use strict";
const data=window.LLA_NATURE_DATA;
if(!data||!Array.isArray(data.habitats))throw new Error("Nature Explorer content is unavailable.");
const KEY="lla-nature-explorer-v1";
const $=id=>document.getElementById(id);
const validIds=new Set(data.habitats.flatMap(h=>h.missions.map((_,i)=>h.id+":"+i)));
function stored(){
 try{
  const value=JSON.parse(localStorage.getItem(KEY)||"[]");
  return Array.isArray(value)?value.filter(x=>typeof x==="string"&&validIds.has(x)):[];
 }catch{return []}
}
const completed=new Set(stored());
function save(){try{localStorage.setItem(KEY,JSON.stringify([...completed].sort()))}catch{}}
let currentHabitat=-1,currentMission=0,answered=false;
function arabic(text){
 const span=document.createElement("span");
 span.lang="ar";span.dir="rtl";span.textContent=text;
 return span;
}
function hideAll(){
 for(const id of ["habitatView","playView","finishView"])$(id).hidden=true;
}
function showHabitats(){
 currentHabitat=-1;
 hideAll();$("habitatView").hidden=false;
 $("habitatCards").replaceChildren();
 for(let h=0;h<data.habitats.length;h++){
  const habitat=data.habitats[h];
  const count=habitat.missions.filter((_,i)=>completed.has(habitat.id+":"+i)).length;
  const button=document.createElement("button");
  button.type="button";button.className="habitat";button.dataset.id=habitat.id;
  const art=document.createElement("span");art.className="art";art.setAttribute("aria-hidden","true");art.textContent=habitat.emoji;
  const name=document.createElement("strong");name.textContent=habitat.name;
  const local=arabic(habitat.ar);local.className="arabic";
  const intro=document.createElement("small");intro.textContent=habitat.intro+" • "+habitat.arIntro;
  const progress=document.createElement("span");progress.className="complete";progress.textContent=count+" / "+habitat.missions.length+" complete • مكتملة";
  button.append(art,name,local,intro,progress);
  button.addEventListener("click",()=>startHabitat(h));
  $("habitatCards").append(button);
 }
 $("overallStatus").textContent=completed.size+" / "+validIds.size+" missions completed on this device • "+completed.size+" من "+validIds.size+" مهمة مكتملة على هذا الجهاز";
}
function startHabitat(h){
 if(!Number.isInteger(h)||h<0||h>=data.habitats.length)return;
 currentHabitat=h;
 const habitat=data.habitats[h];
 const first=habitat.missions.findIndex((_,i)=>!completed.has(habitat.id+":"+i));
 currentMission=first<0?0:first;
 renderMission();
}
function setProgress(){
 const habitat=data.habitats[currentHabitat];
 const count=habitat.missions.filter((_,i)=>completed.has(habitat.id+":"+i)).length;
 $("progressFill").style.width=(100*count/habitat.missions.length)+"%";
 $("missionCount").textContent=(currentMission+1)+" / "+habitat.missions.length+" • "+count+" completed";
}
function renderMission(){
 const habitat=data.habitats[currentHabitat],mission=habitat.missions[currentMission];
 if(!mission)return;
 answered=false;hideAll();$("playView").hidden=false;
 setProgress();
 $("sceneEmoji").textContent=habitat.emoji;
 $("habitatLabel").textContent=habitat.name+" • "+habitat.ar;
 $("pictureEmoji").textContent=mission.emoji;
 $("wordEnglish").textContent=mission.word;
 $("wordArabic").textContent=mission.wordAr;
 $("questionEnglish").textContent=mission.q;
 $("questionArabic").textContent=mission.arQ;
 $("answerChoices").replaceChildren();
 mission.choices.forEach((choice,i)=>{
  const button=document.createElement("button");
  button.type="button";button.className="choice";
  button.dataset.choice=String(i);
  button.append(document.createTextNode(choice[0]),arabic(choice[1]));
  button.addEventListener("click",()=>choose(i,button));
  $("answerChoices").append(button);
 });
 $("answerFeedback").className="feedback";
 $("answerFeedback").textContent="🌱 Think about the question, then choose. • فكّر في السؤال ثم اختر.";
 $("nextMission").hidden=true;
}
function choose(index,button){
 if(answered||currentHabitat<0)return;
 const habitat=data.habitats[currentHabitat],mission=habitat.missions[currentMission];
 if(index!==mission.answer){
  button.classList.add("wrong");button.disabled=true;
  $("answerFeedback").className="feedback try";
  $("answerFeedback").textContent="🌿 Good try. Look at the choices and try another one. • محاولة جيدة! انظر إلى الخيارات وحاول مرة أخرى.";
  return;
 }
 answered=true;button.classList.add("correct");
 $("answerChoices").querySelectorAll("button").forEach(b=>{b.disabled=true});
 completed.add(habitat.id+":"+currentMission);save();setProgress();
 $("answerFeedback").className="feedback good";
 $("answerFeedback").textContent="✅ "+mission.why+"\n"+mission.arWhy;
 $("nextMission").hidden=false;
 $("nextMission").textContent=currentMission===habitat.missions.length-1?
  "🏆 Finish habitat • أكمل هذا المكان":"➡ Next mission • المهمة التالية";
}
function finishHabitat(){
 const habitat=data.habitats[currentHabitat];
 const done=habitat.missions.every((_,i)=>completed.has(habitat.id+":"+i));
 if(!done){renderMission();return}
 hideAll();$("finishView").hidden=false;
}
$("nextMission").addEventListener("click",()=>{
 if(!answered||currentHabitat<0)return;
 const habitat=data.habitats[currentHabitat];
 if(currentMission+1<habitat.missions.length){currentMission++;renderMission()}
 else finishHabitat();
});
$("backHabitats").addEventListener("click",showHabitats);
$("chooseAgain").addEventListener("click",showHabitats);
$("playAgain").addEventListener("click",()=>{
 if(currentHabitat<0)return;
 currentMission=0;renderMission();
});
showHabitats();
})();