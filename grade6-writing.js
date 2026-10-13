/* Grade 6 Writing Studio: original supplementary material, no automatic writing score.
 * Free-form draft text stays in ephemeral JS memory and is never saved to storage.
 * Only true markers for g6w-01…06 are persisted for on-device parent tracking.
 */
(()=>{"use strict";
const tasks=window.LLA_GRADE6_WRITING;
if(!Array.isArray(tasks)||tasks.length!==6)throw Error("Six writing prompts are required");
const $=s=>document.querySelector(s),KEY="lla-grade6-writing-v1";
function read(){
 try{
  const obj=JSON.parse(localStorage.getItem(KEY)||"{}");
  return obj&&typeof obj==="object"&&!Array.isArray(obj)?obj:{};
 }catch{return {}}
}
const completed=read(),drafts=new Map(),ticks=new Map();
let active=null;
function save(){
 const clean={};
 for(const task of tasks)if(completed[task.id]===true)clean[task.id]=true;
 try{localStorage.setItem(KEY,JSON.stringify(clean))}catch{/* private browsing */}
}
function count(){return tasks.filter(t=>completed[t.id]===true).length}
function refresh(){
 const n=count();
 $("#writingProgress").textContent="🌱 "+n+" / 6 tasks practised";
 $("#writingMeter").setAttribute("aria-valuenow",String(n));
 $("#writingFill").style.width=n/6*100+"%";
 $("#writingMissions").replaceChildren();
 for(const task of tasks){
  const button=document.createElement("button");
  button.type="button";button.className="prompt"+(completed[task.id]?" done":"");
  button.dataset.task=task.id;
  const icon=document.createElement("span");icon.textContent=task.icon+" "+task.skill;
  const strong=document.createElement("strong");strong.textContent=task.title;
  const ar=document.createElement("span");ar.textContent=task.ar;ar.lang="ar";ar.dir="rtl";
  const status=document.createElement("span");status.className="status";status.textContent=completed[task.id]?"✅ Practised • تدربت":"✏️ Start • ابدأ";
  button.append(icon,strong,ar,status);
  button.addEventListener("click",()=>open(task.id));
  $("#writingMissions").append(button);
 }
}
function words(text){return text.trim().match(/\S+/g)?.length||0}
function evaluateForm(){
 if(!active)return;
 const draft=$("#draft").value,wordCount=words(draft);
 $("#wordCount").textContent=wordCount+" words in this draft • "+wordCount+" كلمة";
 const checked=[...$("#writingChecklist").querySelectorAll("input")].every(box=>box.checked);
 $("#markPractised").disabled=wordCount<12||!checked;
 if(wordCount<12){
  $("#writingFeedback").textContent="🌱 Start by writing at least 12 words. Use the sentence starters if helpful.";
 }else if(!checked){
  $("#writingFeedback").textContent="✅ You've started. Re-read your paragraph against the three checklist points.";
 }else{
  $("#writingFeedback").textContent="🌟 Ready to mark as practised. A parent or teacher can help review the quality.";
 }
 $("#writingFeedback").className="feedback";
}
function remember(){
 if(!active)return;
 drafts.set(active.id,$("#draft").value);
 ticks.set(active.id,[...$("#writingChecklist").querySelectorAll("input")].map(b=>b.checked));
}
function open(id){
 const task=tasks.find(x=>x.id===id);if(!task)return;
 remember();active=task;
 $("#selection").hidden=true;$("#writingTask").hidden=false;
 $("#writingSkill").textContent=task.skill;
 $("#taskTitle").textContent=task.icon+" "+task.title;
 $("#taskArabic").textContent=task.ar;
 $("#taskSource").textContent=task.support;
 $("#taskPrompt").textContent=task.task;
 $("#taskStarters").replaceChildren();
 for(const starter of task.starters){
  const li=document.createElement("li");li.textContent=starter;$("#taskStarters").append(li);
 }
 $("#draft").value=drafts.get(id)||"";
 $("#writingChecklist").replaceChildren();
 const previous=ticks.get(id)||[];
 task.criteria.forEach((text,i)=>{
  const label=document.createElement("label");
  const check=document.createElement("input");
  check.type="checkbox";check.checked=previous[i]===true;
  check.addEventListener("change",()=>{remember();evaluateForm()});
  const span=document.createElement("span");span.textContent=text;
  label.append(check,span);$("#writingChecklist").append(label);
 });
 $("#exampleAnswer").textContent=task.model;
 $("#taskReflection").textContent="💭 Talk about this: "+task.reflection;
 const details=$("#exampleAnswer").closest("details");if(details)details.open=false;
 evaluateForm();
 $("#writingTask").scrollIntoView({block:"start"});
}
function back(){
 remember();active=null;
 $("#writingTask").hidden=true;$("#selection").hidden=false;
 refresh();$("#selection").scrollIntoView({block:"start"});
}
$("#draft").addEventListener("input",()=>{remember();evaluateForm()});
$("#chooseMission").addEventListener("click",back);
$("#markPractised").addEventListener("click",()=>{
 if(!active||$("#markPractised").disabled)return;
 remember();
 completed[active.id]=true;
 save();refresh();
 $("#writingFeedback").textContent="🎉 Practice recorded on this device! Ask a parent or teacher for feedback. This is not an automatic writing grade.";
 $("#writingFeedback").className="feedback good";
});
$("#nextWriting").addEventListener("click",()=>{
 if(!active)return;
 const i=tasks.findIndex(t=>t.id===active.id);
 open(tasks[(i+1)%tasks.length].id);
});
window.addEventListener("pagehide",()=>{drafts.clear();ticks.clear()});
refresh();
})();