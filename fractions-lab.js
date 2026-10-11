(()=>{
"use strict";
const DATA=[
[2,1,"one half","نصف واحد"],[2,2,"two halves: one whole","نصفان: واحد كامل"],
[3,1,"one third","ثلث واحد"],[3,2,"two thirds","ثلثان"],[3,3,"three thirds: one whole","ثلاثة أثلاث: واحد كامل"],
[4,1,"one quarter","ربع واحد"],[4,2,"two quarters: one half","ربعان: نصف"],[4,3,"three quarters","ثلاثة أرباع"],[4,4,"four quarters: one whole","أربعة أرباع: واحد كامل"],
[2,1,"one of two equal pieces","جزء من جزأين متساويين"],
[3,2,"two of three equal pieces","جزآن من ثلاثة أجزاء متساوية"],
[4,1,"one of four equal pieces","جزء من أربعة أجزاء متساوية"]
].map(([parts,numerator,name,ar],i)=>({id:"fraction-"+(i+1),parts,numerator,name,ar}));
const $=s=>document.querySelector(s);
const KEY="lla-fractions-v1";
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const done=load();let position=DATA.findIndex(d=>done[d.id]!==true);
if(position<0)position=0;
let selected=new Set(),solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}}
function count(){return DATA.filter(d=>done[d.id]===true).length}
function status(msg,kind=""){$("#fractionFeedback").textContent=msg;$("#fractionFeedback").className="feedback"+(kind?" "+kind:"")}
function progress(){const n=count();$("#fractionProgress").textContent="🏅 "+n+" / "+DATA.length+" challenges completed";$("#fractionBar").style.width=(100*n/DATA.length)+"%"}
function show(){
 const challenge=DATA[position];selected=new Set();solved=false;
 $("#stepTitle").textContent="Challenge "+(position+1)+" of "+DATA.length;
 $("#question").textContent="🍕 Shade "+challenge.name+" ("+challenge.numerator+" / "+challenge.parts+")";
 $("#questionArabic").textContent="لوّن "+challenge.ar+" من الأجزاء المتساوية";
 $("#fractionPieces").replaceChildren();$("#fractionPieces").style.setProperty("--parts",String(challenge.parts));
 for(let i=0;i<challenge.parts;i++){
  const button=document.createElement("button");button.type="button";button.className="piece";
  button.setAttribute("aria-pressed","false");button.setAttribute("aria-label","Equal part "+(i+1)+" of "+challenge.parts);
  const icon=document.createElement("span");icon.className="icon";icon.textContent="🍕";
  const label=document.createElement("span");label.className="label";label.textContent="Part "+(i+1);
  button.append(icon,label);
  button.addEventListener("click",()=>{
   if(solved)return;
   if(selected.has(i))selected.delete(i);else selected.add(i);
   button.setAttribute("aria-pressed",String(selected.has(i)));
   $("#fractionDisplay").textContent=selected.size+" / "+challenge.parts;
   status("Now check your equal pieces! • تحقق من الأجزاء.");
  });
  $("#fractionPieces").append(button);
 }
 $("#fractionDisplay").textContent="0 / "+challenge.parts;
 $("#checkFraction").hidden=false;$("#nextFraction").hidden=true;$("#clearFraction").hidden=false;
 $("#win").hidden=true;
 status("Tap "+challenge.numerator+" equal "+(challenge.numerator===1?"piece":"pieces")+" and press Check. • اختر ثم تحقق.");
 progress();
}
$("#checkFraction").addEventListener("click",()=>{
 if(solved)return;
 const challenge=DATA[position];
 if(selected.size!==challenge.numerator){
  status("🌱 Good try! You selected "+selected.size+" piece(s), but need "+challenge.numerator+". Try again. • حاول مرة أخرى.","try");
  return;
 }
 solved=true;done[challenge.id]=true;save();progress();
 const fraction=challenge.numerator+"/"+challenge.parts;
 status("🎉 Correct! "+fraction+" means "+challenge.numerator+" of "+challenge.parts+" equal parts. • أحسنت!","good");
 $("#checkFraction").hidden=true;$("#clearFraction").hidden=true;
 $("#nextFraction").hidden=false;
 $("#nextFraction").textContent=count()===DATA.length?"🏆 Finish • إنهاء":"➡ Next challenge • التالي";
});
$("#clearFraction").addEventListener("click",()=>{
 if(solved)return;
 selected.clear();$("#fractionPieces").querySelectorAll(".piece").forEach(b=>b.setAttribute("aria-pressed","false"));
 $("#fractionDisplay").textContent="0 / "+DATA[position].parts;
 status("Pieces cleared. Try again! • حاول مجدداً.");
});
$("#nextFraction").addEventListener("click",()=>{
 if(!solved)return;
 if(count()===DATA.length){
  $("#win").hidden=false;$("#nextFraction").hidden=true;return;
 }
 const remaining=DATA.findIndex(d=>done[d.id]!==true);
 position=remaining>=0?remaining:(position+1)%DATA.length;
 show();
});
$("#playAgain").addEventListener("click",()=>{position=0;show()});
show();
})();