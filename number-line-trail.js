/* Little Learners Academy | Number Line Trail
 * Twelve original guided Grade 1 number-sense stops.
 * Supplementary learning only; device-local completion, never child identity.
 */
(()=>{
"use strict";
const STATIONS=[
{id:"nlt-01",chapter:"Forward jumps",arChapter:"القفز للأمام",start:2,delta:3,icon:"🐱",prompt:"A cat starts at 2 and makes 3 jumps forward.",ar:"تبدأ القطة عند ٢ وتقفز ثلاث خطوات إلى الأمام."},
{id:"nlt-02",chapter:"Forward jumps",arChapter:"القفز للأمام",start:7,delta:2,icon:"🐟",prompt:"A fish starts at 7 and moves 2 steps forward.",ar:"تبدأ السمكة عند ٧ وتتحرك خطوتين إلى الأمام."},
{id:"nlt-03",chapter:"Forward jumps",arChapter:"القفز للأمام",start:9,delta:4,icon:"🌴",prompt:"Start at 9. Count 4 steps forward.",ar:"ابدأ عند ٩ وعد أربع خطوات إلى الأمام."},
{id:"nlt-04",chapter:"Forward jumps",arChapter:"القفز للأمام",start:15,delta:3,icon:"⭐",prompt:"Begin at 15 and jump 3 places to the right.",ar:"ابدأ عند ١٥ واقفز ثلاث خانات إلى اليمين."},
{id:"nlt-05",chapter:"Backward jumps",arChapter:"القفز للخلف",start:8,delta:-2,icon:"🚲",prompt:"Begin at 8 and jump 2 steps backward.",ar:"ابدأ عند ٨ واقفز خطوتين إلى الخلف."},
{id:"nlt-06",chapter:"Backward jumps",arChapter:"القفز للخلف",start:10,delta:-3,icon:"🚌",prompt:"A bus starts at 10 and goes back 3 spaces.",ar:"تبدأ الحافلة عند ١٠ وتعود ثلاث خانات."},
{id:"nlt-07",chapter:"Backward jumps",arChapter:"القفز للخلف",start:14,delta:-4,icon:"🌼",prompt:"Start at 14. Count 4 places to the left.",ar:"ابدأ عند ١٤ وعد أربع خانات إلى اليسار."},
{id:"nlt-08",chapter:"Backward jumps",arChapter:"القفز للخلف",start:20,delta:-3,icon:"🏡",prompt:"Begin at 20 and take 3 jumps back.",ar:"ابدأ عند ٢٠ واقفز ثلاث خطوات إلى الخلف."},
{id:"nlt-09",chapter:"Number stories",arChapter:"قصص الأعداد",start:3,delta:4,icon:"🍎",prompt:"You have 3 apples. You get 4 more. How many now?",ar:"لديك ثلاث تفاحات وأخذت أربع تفاحات أخرى. كم أصبح لديك؟"},
{id:"nlt-10",chapter:"Number stories",arChapter:"قصص الأعداد",start:6,delta:3,icon:"🐦",prompt:"6 birds sit in a tree. 3 more arrive. How many birds?",ar:"هناك ستة طيور على الشجرة وتصل ثلاثة أخرى. كم عدد الطيور؟"},
{id:"nlt-11",chapter:"Number stories",arChapter:"قصص الأعداد",start:12,delta:-2,icon:"🌟",prompt:"You collect 12 stars and give away 2. How many remain?",ar:"جمعت اثنتي عشرة نجمة وأعطيت نجمتين. كم بقي؟"},
{id:"nlt-12",chapter:"Number stories",arChapter:"قصص الأعداد",start:18,delta:-4,icon:"🐪",prompt:"18 toy camels are on a shelf. 4 are moved away. How many remain?",ar:"هناك ثمانية عشر جملاً لعبة على الرف، وأُبعدت أربعة منها. كم بقي؟"}
];
const KEY="lla-number-line-trail-v1",MAIN="lla-progress-v2";
const $=s=>document.querySelector(s);
const read=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch{return null}};
const write=(k,value)=>{try{localStorage.setItem(k,JSON.stringify(value))}catch{/* Storage may be restricted. */}};
const original=read(KEY);
const known=new Set(STATIONS.map(s=>s.id));
const state={
 done:Array.isArray(original&&original.done)?[...new Set(original.done.filter(id=>known.has(id)))]:[],
 rewarded:Boolean(original&&original.rewarded)
};
let position=Math.max(0,STATIONS.findIndex(s=>!state.done.includes(s.id)));
let hops=0,solved=false;
function save(){write(KEY,state)}
function station(){return STATIONS[position]}
function target(s){return s.start+s.delta}
function progress(){
 const n=state.done.length;
 $("#totalProgress").textContent="⭐ "+n+" / "+STATIONS.length+" stops completed";
 $("#meterFill").style.width=(n/STATIONS.length*100).toFixed(1)+"%";
 $("#reward").hidden=n!==STATIONS.length;
}
function awardOnce(){
 if(state.done.length!==STATIONS.length||state.rewarded)return;
 // Save the reward flag before updating shared stars, so replay cannot award twice.
 state.rewarded=true;save();
 const old=read(MAIN);
 const main=old&&typeof old==="object"&&!Array.isArray(old)?old:{voice:"girl",slow:false,stars:0,completed:{}};
 main.stars=Math.max(0,Number(main.stars)||0)+1;
 write(MAIN,main);
}
function menu(){
 $("#stationGrid").replaceChildren();
 STATIONS.forEach((s,i)=>{
  const b=document.createElement("button");b.type="button";
  b.className="level"+(i===position?" active":"")+(state.done.includes(s.id)?" done":"");
  b.dataset.station=s.id;
  b.setAttribute("aria-pressed",String(i===position));
  const name=document.createElement("strong");name.textContent=(state.done.includes(s.id)?"✅ ":"🐾 ")+String(i+1)+". "+s.chapter;
  const small=document.createElement("small");small.lang="ar";small.dir="rtl";small.textContent=s.arChapter;
  b.append(name,small);
  b.addEventListener("click",()=>open(i));
  $("#stationGrid").append(b);
 });
}
function drawLine(){
 const s=station(),end=target(s);
 const lower=Math.max(0,Math.min(14,Math.min(s.start,end)-1));
 $("#numberLine").replaceChildren();
 for(let num=lower;num<lower+7;num++){
  const el=document.createElement("span");el.className="point";
  el.textContent=String(num);
  if(num===s.start)el.classList.add("start");
  if(hops>0 && ((s.delta>0&&num>s.start&&num<=s.start+hops)||
                  (s.delta<0&&num<s.start&&num>=s.start-hops)))el.classList.add("visited");
  if(num===s.start+(s.delta>0?hops:-hops))el.classList.add("current");
  $("#numberLine").append(el);
 }
 $("#numberLine").setAttribute("aria-label",
  "Numbers "+lower+" to "+(lower+6)+". Start at "+s.start+
  ". Current position "+(s.start+(s.delta>0?hops:-hops))+".");
}
function explainHop(){
 const s=station(),jumps=Math.abs(s.delta);
 if(hops===0)return "🟡 Begin at "+s.start+". Move "+jumps+" step"+(jumps===1?"":"s")+
  (s.delta>0?" right for addition.":" left for subtraction.")+
  " • ابدأ من العدد الأصفر.";
 if(hops===jumps)return "🏁 "+jumps+" jumps complete! You reached "+target(s)+". • وصلت إلى العدد الصحيح.";
 return "👣 Jump "+hops+" of "+jumps+": now on "+
  (s.start+(s.delta>0?hops:-hops))+". Keep going! • تابع القفز.";
}
function options(){
 const n=target(station());
 const rotated=[n,n-1,n+1],shift=position%3;
 const values=[...rotated.slice(shift),...rotated.slice(0,shift)];
 $("#answerChoices").replaceChildren();
 values.forEach(v=>{
  const b=document.createElement("button");b.type="button";b.textContent=String(v);
  b.dataset.value=String(v);b.setAttribute("aria-label","Answer "+v);
  b.addEventListener("click",()=>choose(v,b));
  $("#answerChoices").append(b);
 });
}
function feedback(text,kind=""){
 $("#answerFeedback").textContent=text;
 $("#answerFeedback").className="feedback"+(kind?" "+kind:"");
}
function open(index,shouldScroll=true){
 if(!Number.isInteger(index)||index<0||index>=STATIONS.length)return;
 position=index;hops=0;solved=false;
 const s=station(),direction=s.delta>0?"right ➜":"left ⬅";
 $("#chapterText").textContent=s.chapter+" • "+s.arChapter;
 $("#stationNumber").textContent="Stop "+(position+1)+" of "+STATIONS.length;
 $("#challengeTitle").textContent=s.icon+" "+s.prompt;
 $("#arabicPrompt").textContent=s.ar;
 $("#jumpStatus").textContent=explainHop();
 $("#showJump").disabled=false;
 $("#showJump").textContent="👣 Show one jump • خطوة واحدة";
 $("#showHint").disabled=false;
 $("#nextStation").hidden=true;
 feedback("Choose the landing number. • اختر العدد الذي وصلت إليه.");
 options();drawLine();menu();progress();
 if(shouldScroll)$("#game").scrollIntoView({behavior:"auto",block:"start"});
}
function showJump(){
 if(solved)return;
 const s=station(),total=Math.abs(s.delta);
 if(hops>=total)return;
 hops++;drawLine();
 $("#jumpStatus").textContent=explainHop();
 if(hops===total)$("#showJump").disabled=true;
}
function hint(){
 const s=station();
 $("#jumpStatus").textContent="💡 Start at "+s.start+
  ". "+(s.delta>0?"Add":"Subtract")+" "+Math.abs(s.delta)+
  ": "+Math.abs(s.delta)+" little jump"+(Math.abs(s.delta)===1?"":"s")+
  (s.delta>0?" to the right.":" to the left.")+" • تحرك خطوة بخطوة.";
}
function choose(value,button){
 if(solved||button.disabled)return;
 const s=station(),correct=value===target(s);
 if(!correct){
  button.disabled=true;button.classList.add("wrong");
  feedback("🌱 Good try. Check the direction and count one jump at a time. • حاول مجدداً.","try");
  return;
 }
 solved=true;hops=Math.abs(s.delta);
 drawLine();
 $("#jumpStatus").textContent=explainHop();
 $("#showJump").disabled=true;$("#showHint").disabled=true;
 for(const b of $("#answerChoices").children){
  b.disabled=true;
  if(b===button)b.classList.add("correct");
 }
 if(!state.done.includes(s.id)){state.done.push(s.id);save()}
 awardOnce();progress();menu();
 const verb=s.delta>0?"forward":"backward";
 feedback("🎉 Well done! "+s.start+" → "+target(s)+" after "+
  Math.abs(s.delta)+" jumps "+verb+". • أحسنت!","success");
 $("#nextStation").hidden=false;
 $("#nextStation").textContent=state.done.length===STATIONS.length?
  "🔁 Choose another stop • اختر محطة أخرى":"Next stop ➜ • المحطة التالية";
}
$("#showJump").addEventListener("click",showJump);
$("#showHint").addEventListener("click",hint);
$("#restartStation").addEventListener("click",()=>open(position));
$("#nextStation").addEventListener("click",()=>{
 const rest=[...STATIONS.slice(position+1),...STATIONS.slice(0,position+1)];
 const next=rest.find(s=>!state.done.includes(s.id));
 if(next)open(STATIONS.indexOf(next));
 else open((position+1)%STATIONS.length);
});
open(position,false);
})();