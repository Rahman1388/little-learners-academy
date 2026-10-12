/* Grade 3 mixed discovery. Reuses existing reviewed-for-consistency pilot
 * data; NOT an additional set of unique questions or formal assessment.
 */
(()=>{"use strict";
const maths=window.LLA_GRADE3_PREVIEW;
const reading=window.LLA_GRADE3_ENGLISH?.all;
const science=window.LLA_GRADE3_SCIENCE?.all;
if(!Array.isArray(maths)||maths.length!==18||!Array.isArray(reading)||reading.length!==18||!Array.isArray(science)||science.length!==18)throw Error("Missing Grade 3 pilot data");
const $=s=>document.querySelector(s),KEY="lla-grade3-mixed-v1";
const meta={
 math:{title:"🧮 Mathematics • الرياضيات",label:"🧮 Maths",badge:"#mathBadge"},
 english:{title:"📖 Reading • القراءة",label:"📖 Reading",badge:"#englishBadge"},
 science:{title:"🔬 Science • العلوم",label:"🔬 Science",badge:"#scienceBadge"}
};
const picks=[0,7,12,17];
const tasks=[];
for(let n=0;n<4;n++){
 for(const [kind,bank] of [["math",maths],["english",reading],["science",science]]){
  const item=bank[picks[n]];
  const answer=typeof item.answer==="number"?item.answer:item.choices.indexOf(item.answer);
  if(!item.id||item.choices.length!==3||answer<0||answer>2)throw Error("Invalid "+kind+" review question");
  tasks.push(Object.freeze({kind,item,answer,key:kind+":"+item.id}));
 }
}
function read(){
 try{
  const x=JSON.parse(localStorage.getItem(KEY)||"{}");
  return x&&typeof x==="object"&&!Array.isArray(x)?x:{};
 }catch{return {}}
}
const completed=read();
const count=kind=>tasks.filter(t=>(!kind||t.kind===kind)&&completed[t.key]===true).length;
let position=0,answered=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(completed))}catch{/* Storage optional */}}
function refresh(){
 const n=count();
 $("#mixedProgress").textContent="🏅 "+n+" / 12 completed";
 $("#mixedBar").style.width=(100*n/12)+"%";
 for(const [kind,m] of Object.entries(meta)){
  const elem=$(m.badge),current=count(kind);
  elem.classList.toggle("earned",current===4);
  elem.querySelector("small").textContent=(current===4?"✅ ":"")+current+" / 4";
 }
}
function feedback(message,good=false){
 const box=$("#mixedFeedback");box.textContent=message;box.className="feedback"+(good?" good":"");
}
function render(){
 const t=tasks[position],item=t.item;
 answered=false;$("#mixedNext").hidden=true;$("#mixedFinish").hidden=true;
 $("#mixedHint").hidden=false;$("#mixedHint").setAttribute("aria-expanded","false");
 $("#mixedHelp").hidden=true;
 $("#mixedStep").textContent="Question "+(position+1)+" of 12";
 $("#mixedSubject").textContent=meta[t.kind].label;
 $("#mixedKind").textContent=meta[t.kind].title;
 $("#qText").textContent=item.question;
 $("#qArabic").textContent=t.kind==="math"?item.arabic:"اقرأ السؤال جيداً واختر الإجابة الصحيحة.";
 const visual=t.kind==="math"?item.visual:"";
 $("#mixedVisual").textContent=visual||"";
 $("#mixedVisual").hidden=!visual;
 const passage=t.kind==="math"?"":item.passage;
 $("#mixedStory").textContent=passage||"";
 $("#mixedStory").hidden=!passage;
 $("#mixedAnswers").replaceChildren();
 for(const [i,choice] of item.choices.entries()){
  const b=document.createElement("button");b.type="button";b.dataset.answer=String(i);b.textContent=choice;
  b.addEventListener("click",()=>answer(i));
  $("#mixedAnswers").append(b);
 }
 feedback(completed[t.key]===true?"Practised before. Can you explain the answer again? • تدرّب من جديد.":"Choose an answer. • اختر الإجابة الصحيحة.");
 refresh();
}
function hintText(t){
 if(t.kind==="math")return t.item.hint;
 if(t.kind==="english")return "Read the passage again. Find a sentence that gives evidence for your choice.";
 return "Think about the observation, what changed, and which answer is supported by evidence.";
}
function answer(i){
 if(answered)return;
 const t=tasks[position],a=t.item,buttons=[...$("#mixedAnswers").children];
 if(i!==t.answer){
  buttons[i].disabled=true;buttons[i].classList.add("wrong");
  feedback("🌱 Good try. Look for clues and try another choice. • حاول مرة أخرى.");
  return;
 }
 answered=true;
 buttons.forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add("correct")});
 completed[t.key]=true;save();refresh();
 feedback("✅ Well done! "+a.explanation+" • أحسنت!",true);
 $("#mixedNext").hidden=false;
 $("#mixedNext").textContent=count()===12?"🏆 See my achievements • إنجازاتي":"Next ➜ • التالي";
}
function finish(){
 $("#mixedStep").textContent="🏆 Quest complete • اكتملت المهمة";
 $("#mixedFinish").hidden=false;
 $("#mixedNext").hidden=true;$("#mixedHint").hidden=true;$("#mixedHelp").hidden=true;
 $("#mixedAnswers").replaceChildren();
 $("#qText").textContent="Wonderful effort! All 12 questions completed.";
 $("#qArabic").textContent="أحسنت! أكملت الأسئلة الاثني عشر.";
 $("#mixedStory").hidden=true;$("#mixedVisual").hidden=true;
 feedback("Your review badges are ready. • شارات الإنجاز جاهزة!",true);
 refresh();
}
$("#mixedHint").addEventListener("click",()=>{
 const t=tasks[position],hidden=$("#mixedHelp").hidden;
 $("#mixedHelp").hidden=!hidden;
 $("#mixedHint").setAttribute("aria-expanded",String(hidden));
 if(hidden)$("#mixedHelp").textContent="💡 "+hintText(t)+" • فكّر في الأدلة.";
});
$("#mixedNext").addEventListener("click",()=>{
 if(!answered)return;
 if(count()===12){finish();return}
 // Find the next unfinished review item, wrapping round if necessary.
 for(let offset=1;offset<=tasks.length;offset++){
  const next=(position+offset)%tasks.length;
  if(completed[tasks[next].key]!==true){position=next;break}
 }
 render();$("#questPanel").scrollIntoView({behavior:"auto",block:"start"});
});
$("#mixedReplay").addEventListener("click",()=>{
 position=0;render();$("#questPanel").scrollIntoView({behavior:"auto",block:"start"});
});
const first=tasks.findIndex(t=>completed[t.key]!==true);
if(first>=0)position=first;
if(first<0)finish();else render();
})();