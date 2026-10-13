/* Original Grade 1 word-order puzzles. Local-only progress, no tracking. */
(()=>{"use strict";
const PUZZLES=[
 {icon:"📖",title:"Reading time",ar:"أنا أستطيع القراءة.",text:"I can read."},
 {icon:"🐱",title:"A little cat",ar:"تستطيع القطة القفز.",text:"The cat can jump."},
 {icon:"☀️",title:"Sunny day",ar:"الشمس حارة.",text:"The sun is hot."},
 {icon:"🚌",title:"School transport",ar:"نرى حافلة.",text:"We see a bus."},
 {icon:"🐟",title:"Underwater life",ar:"تسبح الأسماك في الماء.",text:"Fish swim in water."},
 {icon:"🏫",title:"School friends",ar:"أنا أحب مدرستي.",text:"I like my school."},
 {icon:"🐦",title:"Flying birds",ar:"تطير الطيور في السماء.",text:"Birds fly in the sky."},
 {icon:"🧼",title:"Healthy habits",ar:"نغسل أيدينا.",text:"We wash our hands."},
 {icon:"🐪",title:"Desert animal",ar:"يسير الجمل ببطء.",text:"The camel walks slowly."},
 {icon:"🤝",title:"Kind actions",ar:"أنا أساعد صديقي.",text:"I help my friend."},
 {icon:"🌳",title:"Growing things",ar:"تحتاج الشجرة إلى الماء.",text:"A tree needs water."},
 {icon:"📚",title:"Learning together",ar:"نقرأ الكتب معاً.",text:"We read books together."}
];
if(new Set(PUZZLES.map(p=>p.text)).size!==PUZZLES.length||
 PUZZLES.some(p=>new Set(p.text.split(" ")).size!==p.text.split(" ").length))
 throw Error("Sentence puzzles must have distinct words to permit undo.");
const $=s=>document.querySelector(s),KEY="lla-sentence-builder-v1",MAIN="lla-progress-v2";
function load(key){try{return JSON.parse(localStorage.getItem(key)||"null")}catch{return null}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
const prior=load(KEY),state=prior&&typeof prior==="object"&&!Array.isArray(prior)?prior:{};
let done=new Set(Array.isArray(state.done)?state.done.filter(i=>Number.isInteger(i)&&i>=0&&i<PUZZLES.length):[]);
let current=null,chosen=[],order=[],solved=false,voice="girl",audio=null;
function stopAudio(){if(audio){audio.pause();audio.removeAttribute("src");audio.load();audio=null}}
function shuffled(n){
 const list=Array.from({length:n},(_,i)=>i);
 for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]]}
 if(list.every((x,i)=>x===i)&&n>1)[list[0],list[1]]=[list[1],list[0]];
 return list;
}
function persist(){
 save(KEY,{done:[...done].sort((a,b)=>a-b),rewarded:Boolean(state.rewarded)});
}
function rewardOnce(){
 if(done.size!==PUZZLES.length||state.rewarded)return;
 state.rewarded=true;persist();
 const base=load(MAIN);
 const progress=base&&typeof base==="object"&&!Array.isArray(base)?base:{voice:"girl",slow:false,stars:0,completed:{}};
 progress.stars=Math.max(0,Number(progress.stars)||0)+1;
 save(MAIN,progress);
}
function updateProgress(){
 $("#sentenceProgress").textContent="🌱 "+done.size+" / "+PUZZLES.length+" sentences built";
 $("#sentenceProgressBar").style.width=(done.size/PUZZLES.length*100).toFixed(1)+"%";
}
function renderList(){
 stopAudio();current=null;solved=false;chosen=[];
 $("#sentenceGame").hidden=true;$("#sentenceListPanel").hidden=false;
 $("#sentenceList").replaceChildren();
 PUZZLES.forEach((p,i)=>{
  const button=document.createElement("button");button.type="button";
  button.className="puzzle"+(done.has(i)?" done":"");button.dataset.puzzle=String(i);
  const icon=document.createElement("span");icon.className="scene";icon.textContent=p.icon;icon.setAttribute("aria-hidden","true");
  const title=document.createElement("strong");title.textContent=(i+1)+". "+p.title;
  const status=document.createElement("small");status.textContent=done.has(i)?"✅ Completed • مكتمل":"▶ Build a sentence • كوّن جملة";
  button.append(icon,title,status);
  button.addEventListener("click",()=>open(i));
  $("#sentenceList").append(button);
 });
 updateProgress();
}
function feedback(message,kind=""){
 const box=$("#sentenceFeedback");box.textContent=message;box.className="feedback"+(kind?" "+kind:"");
}
function tokenAt(i){return PUZZLES[current].text.split(" ")[i]}
function renderWords(){
 $("#wordBank").replaceChildren();$("#sentenceLine").replaceChildren();
 order.forEach(i=>{
  const button=document.createElement("button");button.type="button";
  button.dataset.tokenIndex=String(i);button.textContent=tokenAt(i);
  button.disabled=chosen.includes(i)||solved;
  button.addEventListener("click",()=>{
   if(button.disabled)return;
   chosen.push(i);renderWords();
   feedback("Great! Continue building your sentence. • تابع تكوين الجملة.");
  });$("#wordBank").append(button);
 });
 chosen.forEach((i,position)=>{
  const button=document.createElement("button");button.type="button";
  button.textContent=tokenAt(i);button.dataset.chosen=String(i);
  button.setAttribute("aria-label","Remove "+tokenAt(i));
  button.disabled=solved;
  button.addEventListener("click",()=>{
   if(solved)return;
   chosen.splice(position,1);renderWords();
   feedback("Word removed. Keep trying! • تراجع عن الكلمة.");
  });$("#sentenceLine").append(button);
 });
 const full=chosen.length===PUZZLES[current].text.split(" ").length;
 $("#checkSentence").disabled=solved||!full;
 $("#undoWord").disabled=solved||chosen.length===0;
 $("#nextSentence").hidden=!solved;
}
function chooseVoice(next){
 voice=next;$("#voiceGirl").setAttribute("aria-pressed",String(voice==="girl"));
 $("#voiceBoy").setAttribute("aria-pressed",String(voice==="boy"));
}
function open(i){
 if(!Number.isInteger(i)||i<0||i>=PUZZLES.length)return;
 stopAudio();current=i;chosen=[];solved=false;
 const p=PUZZLES[i],tokens=p.text.split(" ");order=shuffled(tokens.length);
 $("#sentenceListPanel").hidden=true;$("#sentenceGame").hidden=false;
 $("#sentencePicture").textContent=p.icon;
 $("#sentenceTopic").textContent=p.title;
 $("#sentenceArabic").textContent=p.ar;
 $("#sentenceStep").textContent="Step "+(i+1)+" of "+PUZZLES.length;
 $("#sampleAudio").hidden=i!==0;
 const pref=load(MAIN);chooseVoice(pref&&pref.voice==="boy"?"boy":"girl");
 feedback("Choose your first word. • اختر الكلمة الأولى.");
 renderWords();
 $("#sentenceGame").scrollIntoView({behavior:"auto",block:"start"});
}
function check(){
 if(current===null||solved)return;
 const expected=PUZZLES[current].text.split(" ");
 if(chosen.length!==expected.length)return;
 if(!chosen.every((i,pos)=>i===pos)){
  feedback("🌱 Nearly there! Look at the word order and try moving a word. • حاول ترتيب الكلمات من جديد.","try");
  return;
 }
 solved=true;
 done.add(current);persist();rewardOnce();updateProgress();renderWords();
 feedback("🎉 Wonderful! You built: "+PUZZLES[current].text+" • أحسنت!","good");
 if(done.size===PUZZLES.length)feedback("🏆 You completed all twelve sentences! Excellent effort. • أنجزت جميع الجمل!","good");
}
function next(){
 if(!solved||current===null)return;
 const upcoming=PUZZLES.findIndex((p,i)=>i>current&&!done.has(i));
 const first=upcoming>=0?upcoming:PUZZLES.findIndex((p,i)=>!done.has(i));
 if(first>=0)open(first);else renderList();
}
function hear(){
 if(current!==0)return;
 stopAudio();
 audio=new Audio("./audio/practice/en-sentences-0-"+voice+".mp3?v=three-repeat-1");
 audio.preload="auto";audio.preservesPitch=true;
 audio.addEventListener("error",()=>feedback("Audio unavailable. Check internet and try again. • تعذر تشغيل الصوت."),{once:true});
 const promise=audio.play();
 if(promise&&typeof promise.catch==="function")promise.catch(()=>feedback("Tap listen again or check your connection. • حاول مجدداً."));
}
$("#backSentences").addEventListener("click",renderList);
$("#checkSentence").addEventListener("click",check);
$("#resetSentence").addEventListener("click",()=>{if(current!==null)open(current)});
$("#undoWord").addEventListener("click",()=>{
 if(current===null||solved||!chosen.length)return;
 chosen.pop();renderWords();feedback("Word removed. Try again. • يمكنك إعادة المحاولة.");
});
$("#nextSentence").addEventListener("click",next);
$("#voiceGirl").addEventListener("click",()=>chooseVoice("girl"));
$("#voiceBoy").addEventListener("click",()=>chooseVoice("boy"));
$("#hearSentence").addEventListener("click",hear);
window.addEventListener("pagehide",stopAudio);
renderList();
})();