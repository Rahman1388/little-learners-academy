(()=>{
"use strict";
const KEY="lla-science-sorting-v1",MAIN="lla-progress-v2";
const $=s=>document.querySelector(s);
const rounds=[
 ["🌴","Palm tree","نخلة","Living","A palm tree is a living plant. It grows and needs water."],
 ["🪨","Rock","صخرة","Non-living","A rock does not grow or need food."],
 ["🐪","Camel","جمل","Living","A camel is a living animal. It eats, drinks and grows."],
 ["🚲","Bicycle","دراجة","Non-living","A bicycle is a made object. It does not grow or eat."],
 ["🪵","Wooden block","قطعة خشب","Wood","This block is made of wood."],
 ["🥄","Metal spoon","ملعقة معدنية","Metal","This spoon is made of metal."],
 ["🥛","Glass cup","كوب زجاجي","Glass","This cup is made of glass. Ask an adult before handling glass."],
 ["🧴","Plastic bottle","زجاجة بلاستيكية","Plastic","This bottle is made of plastic."],
 ["👁️","Eyes","العينان","Sight","We use our eyes to see shapes and colours."],
 ["👂","Ears","الأذنان","Hearing","We use our ears to hear sounds."],
 ["👃","Nose","الأنف","Smell","We use our nose to smell flowers."],
 ["👅","Tongue","اللسان","Taste","We use our tongue to taste food."],
 ["💧","Water for a plant","ماء للنبات","Helps a plant","A growing plant needs water."],
 ["☀️","Sunlight for a plant","ضوء الشمس للنبات","Helps a plant","Most green plants need light to grow."],
 ["🧸","A toy for a plant","لعبة للنبات","Not needed by a plant","Plants do not need toys to grow."],
 ["👞","Shoes for a plant","حذاء للنبات","Not needed by a plant","Plants do not need shoes to grow."]
];
const chapters=[
 {name:"🌴 Living or non-living • حي أم غير حي",choices:["Living","Non-living"],ar:["حي","غير حي"],start:0,end:4},
 {name:"🧱 What material? • ممَّ صنع؟",choices:["Wood","Metal","Glass","Plastic"],ar:["خشب","معدن","زجاج","بلاستيك"],start:4,end:8},
 {name:"👁️ My senses • حواسي",choices:["Sight","Hearing","Smell","Taste"],ar:["البصر","السمع","الشم","التذوق"],start:8,end:12},
 {name:"🌱 Growing plants • نمو النباتات",choices:["Helps a plant","Not needed by a plant"],ar:["يساعد النبات","لا يحتاجه النبات"],start:12,end:16}
];
function read(k){try{const value=JSON.parse(localStorage.getItem(k)||"null");return value&&typeof value==="object"?value:null}catch{return null}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
const old=read(KEY)||{};
const done=Array.isArray(old.done)?new Set(old.done.filter(x=>Number.isInteger(x)&&x>=0&&x<rounds.length)):new Set();
let index=0,answered=false;
function chapterFor(i){return chapters.find(c=>i>=c.start&&i<c.end)}
function render(){
 if(index>=rounds.length){finish();return}
 answered=false;
 const data=rounds[index],chapter=chapterFor(index);
 $("#challenge").hidden=false;$("#success").hidden=true;
 $("#chapterName").textContent=chapter.name;
 $("#roundProgress").textContent=(index+1)+" / "+rounds.length;
 $("#progressFill").style.width=(done.size/rounds.length*100)+"%";
 $("#itemEmoji").textContent=data[0];$("#itemName").textContent=data[1];
 $("#itemArabic").textContent=data[2];
 $("#prompt").textContent=index<4?"Is this living or non-living?":index<8?"What material is it made from?":index<12?"Which sense uses this body part?":"Does a plant need this to grow?";
 $("#sortOptions").replaceChildren();
 chapter.choices.forEach((choice,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.category=choice;
  b.textContent=choice+" • "+chapter.ar[i];
  b.addEventListener("click",()=>choose(choice,b));
  $("#sortOptions").append(b);
 });
 $("#sortFeedback").className="feedback";
 $("#sortFeedback").textContent="🌟 Think first, then choose a group. • فكّر ثم اختر.";
 $("#nextRound").hidden=true;
}
function choose(choice,button){
 if(answered)return;
 const data=rounds[index];
 if(choice!==data[3]){
  button.classList.add("wrong");button.disabled=true;
  $("#sortFeedback").className="feedback retry";
  $("#sortFeedback").textContent="🌱 Good try! Look carefully and choose another group. • حاول مرة أخرى.";
  return;
 }
 answered=true;button.classList.add("correct");
 $("#sortOptions").querySelectorAll("button").forEach(b=>b.disabled=true);
 done.add(index);write(KEY,{done:[...done].sort((a,b)=>a-b),completed:done.size===rounds.length});
 $("#sortFeedback").className="feedback good";
 $("#sortFeedback").textContent="✅ "+data[4]+" • أحسنت!";
 $("#progressFill").style.width=(done.size/rounds.length*100)+"%";
 $("#nextRound").hidden=false;
 $("#nextRound").textContent=index===rounds.length-1?"🏆 Finish • إنهاء":"➡ Next picture • الصورة التالية";
}
function finish(){
 $("#challenge").hidden=true;$("#success").hidden=false;
 $("#chapterName").textContent="🏆 All four science chapters complete";
 $("#roundProgress").textContent="16 / 16";
 $("#progressFill").style.width="100%";
 const state=read(KEY)||{};
 if(!state.rewarded){
  const main=read(MAIN)||{};
  main.stars=Math.max(0,Number(main.stars)||0)+1;
  write(MAIN,main);
  write(KEY,{done:[...done].sort((a,b)=>a-b),completed:true,rewarded:true});
 }
}
$("#nextRound").addEventListener("click",()=>{if(!answered)return;index++;render()});
$("#replay").addEventListener("click",()=>{index=0;render()});
render();
})();