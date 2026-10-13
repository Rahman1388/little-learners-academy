/* Grade 6 limited pilot progress, computed from EXISTING browser-local answers.
 * Never uploads data, assumes mastery, or changes another game's rewards.
 */
(()=>{"use strict";
const $=s=>document.querySelector(s);
const subjects=[
 {id:"math",name:"Mathematics",ar:"الرياضيات",key:"lla-grade6-math-v1",prefix:"g6m-",total:24,url:"./grade6-math.html",topics:[
  "Ratios & rates","Early algebra","Fractions & decimals","Measurement & data"]},
 {id:"reading",name:"English Reading",ar:"القراءة الإنجليزية",key:"lla-grade6-reading-v1",prefix:"g6r-",total:18,url:"./grade6-reading.html",topics:[
  "Evidence in a school planning text","Coastal research & observations","Fair survey & privacy"]},
 {id:"science",name:"Science",ar:"العلوم",key:"lla-grade6-science-v1",prefix:"g6s-",total:18,url:"./grade6-science.html",topics:[
  "Coastal ecosystems & evidence","Solar electricity & safe circuits","Water & separation"]}
];
function read(key){
 try{
  const obj=JSON.parse(localStorage.getItem(key)||"{}");
  return obj&&typeof obj==="object"&&!Array.isArray(obj)?obj:{};
 }catch{return {}}
}
function measure(subject){
 const state=read(subject.key),chunks=[],size=subject.total/subject.topics.length;
 let sum=0;
 for(let i=0;i<subject.topics.length;i++){
  let n=0;
  for(let k=1;k<=size;k++){
   const index=i*size+k;
   if(state[subject.prefix+String(index).padStart(2,"0")]===true)n++;
  }
  sum+=n;
  chunks.push({label:subject.topics[i],count:n,total:size});
 }
 return {...subject,count:sum,chunks};
}
function percent(n,total){return Math.round((n/total)*100)+"%"}
function update(){
 const values=subjects.map(measure);
 let sum=0;
 for(const subject of values){
  sum+=subject.count;
  $("#"+subject.id+"Count").textContent="🌟 "+subject.count+" / "+subject.total+" questions explored";
  $("#"+subject.id+"Fill").style.width=percent(subject.count,subject.total);
  $("#"+subject.id+"Meter").setAttribute("aria-valuenow",String(subject.count));
  const list=$("#"+subject.id+"Topics");list.replaceChildren();
  for(const topic of subject.chunks){
   const li=document.createElement("li");if(topic.count===topic.total)li.classList.add("complete");
   const name=document.createElement("b");name.textContent=(topic.count===topic.total?"✅ ":"🌱 ")+topic.label;
   const value=document.createElement("span");value.textContent=topic.count+" / "+topic.total+" questions";
   li.append(name,value);list.append(li);
  }
 }
 $("#grade6Total").textContent="🌟 "+sum+" / 60 questions explored";
 $("#totalFill").style.width=percent(sum,60);
 $("#totalMeter").setAttribute("aria-valuenow",String(sum));
 $("#grade6Encourage").textContent=sum===60
  ?"🎉 All 60 pilot questions explored! Practise explaining your reasoning. • أحسنت!"
  :sum===0?"🌱 Start with one question. Small steps build confidence! • ابدأ بسؤال واحد!"
  :"🌈 "+sum+" questions explored. Keep building your skills at your own pace! • واصل التعلّم!";
 const written=read("lla-grade6-writing-v1");
 const writingTasks=Array.isArray(window.LLA_GRADE6_WRITING)?window.LLA_GRADE6_WRITING:[];
 const writing=writingTasks.filter(task=>written[task.id]===true).length;
 $("#writingCount").textContent="✍️ "+writing+" / 6 tasks practised (not graded)";
 $("#writingMeter").setAttribute("aria-valuenow",String(writing));
 $("#writingFill").style.width=percent(writing,6);
 // Writing checklists are self-reported practice, deliberately separated
 // from 60 objectively answered maths/reading/science questions.
 const missionList=$("#writingMissions");
 missionList.replaceChildren();
 for(const task of writingTasks){
  const complete=written[task.id]===true;
  const item=document.createElement("li");if(complete)item.className="practised";
  item.dataset.task=task.id;
  const title=document.createElement("b");title.textContent=task.icon+" "+task.title;
  const arabic=document.createElement("span");arabic.className="ar";arabic.lang="ar";arabic.dir="rtl";arabic.textContent=task.ar;
  const status=document.createElement("span");status.className="status";
  status.textContent=complete?"✅ Practised (self-check) • تم التدريب":"🌱 Ready to practise • جاهز للتدريب";
  item.append(title,arabic,status);missionList.append(item);
 }
 const upcoming=writingTasks.find(task=>written[task.id]!==true);
 const writingSuggestion=$("#writingRecommendation");
 writingSuggestion.replaceChildren();
 const writingText=document.createElement("p");
 writingText.textContent=upcoming
  ?"✍️ Suggested writing mission: "+upcoming.title+". Draft a short paragraph, check your evidence, and discuss it with a parent or teacher."
  :"🌟 All six writing prompts were marked practised on this device. Revisit one draft with a parent or teacher—these are not graded results.";
 writingSuggestion.append(writingText);
 const writingLink=document.createElement("a");
 writingLink.href="./grade6-writing.html";
 writingLink.textContent=upcoming?"✏️ Open Writing Studio • ابدأ الكتابة":"🔁 Practise writing again • تدرب مجدداً";
 writingSuggestion.append(writingLink);
 const target=$("#nextStep");target.replaceChildren();
 if(sum===60){
  const p=document.createElement("p");
  p.textContent=upcoming
   ?"🏆 All 60 pilot questions have been explored. Your next small step: practise writing '"+upcoming.title+"' and discuss the evidence. Completing practice questions does not certify grade-level mastery."
   :"🏆 All 60 pilot questions and six writing self-checks have been explored! Discuss a worked answer or revise a paragraph with a parent or teacher. This is not a curriculum graduation.";
  target.append(p);
  const a=document.createElement("a");
  a.href=upcoming?"./grade6-writing.html":"./school-pathways.html";
  a.textContent=upcoming?"✍️ Continue Grade 6 writing • تابع الكتابة":"📘 See skills not covered yet";
  target.append(a);
  return;
 }
 // Favour the first unfinished topic in the lowest proportion-completed subject.
 const next=values.filter(v=>v.count<v.total).sort((a,b)=>a.count/a.total-b.count/b.total)[0];
 const topic=next.chunks.find(v=>v.count<v.total);
 const explanation=document.createElement("p");
 explanation.textContent="🎯 "+next.name+": "+topic.label+" — "+topic.count+" of "+topic.total+" questions explored. Work through one question and discuss why the answer makes sense.";
 const link=document.createElement("a");link.href=next.url;link.textContent="▶ Practise "+next.name+" • ابدأ التدريب";
 target.append(explanation,link);
}
window.addEventListener("pageshow",update);
update();
})();