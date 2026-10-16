/* Grade 2 original four-skill supplementary practice.
 * Only completion flags are persisted. No child text, names or audio are saved.
 */
(()=>{
"use strict";
const MODULES=window.LLA_G2_FOUR_SKILLS||[];
if(MODULES.length!==5)throw new Error("Expected five Grade 2 modules");
const KEY="lla-g2-four-skills-v1";
const SKILLS=[
 {id:"listening",title:"Listening",ar:"الاستماع",icon:"👂"},
 {id:"speaking",title:"Speaking",ar:"التحدث",icon:"💬"},
 {id:"reading",title:"Reading",ar:"القراءة",icon:"📖"},
 {id:"writing",title:"Writing",ar:"الكتابة",icon:"✏️"}
];
const $=id=>document.getElementById(id);
const el=(tag,klass,value)=>{
 const e=document.createElement(tag);
 if(klass)e.className=klass;
 if(value!==undefined)e.textContent=value;
 return e;
};
function readSaved(){
 try{
  const raw=JSON.parse(localStorage.getItem(KEY)||"{}");
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
  const allowed=new Set(MODULES.flatMap(m=>SKILLS.map(s=>m.id+"-"+s.id)));
  return Object.fromEntries(Object.entries(raw).filter(([k,v])=>allowed.has(k)&&v===true));
 }catch{return {}}
}
const complete=readSaved();
let current=MODULES[0];
function isDone(module,skill){return complete[module.id+"-"+skill]===true}
function mark(module,skill){
 complete[module.id+"-"+skill]=true;
 try{localStorage.setItem(KEY,JSON.stringify(complete))}catch{}
 updateProgress();
}
function countModule(module){return SKILLS.filter(s=>isDone(module,s.id)).length}
function updateProgress(){
 const total=MODULES.reduce((n,m)=>n+countModule(m),0);
 $("progressText").textContent="🌟 "+total+" / 20 activities practised (not a test score)";
 $("progressBar").value=total;
 $("moduleCount").textContent=countModule(current)+" / 4 practised";
 for(const b of $("moduleButtons").querySelectorAll("button")){
  const m=MODULES.find(x=>x.id===b.dataset.module);
  if(!m)continue;
  b.querySelector("span").textContent=countModule(m)+" / 4 practised";
 }
 for(const card of $("skillCards").querySelectorAll(".skill")){
  const key=card.dataset.skill;
  const status=card.querySelector(".status");
  if(status)status.textContent=isDone(current,key)
   ?"✓ Practised • تم التدريب (not independently verified)"
   :"○ Ready to practise • جاهز للتدريب";
 }
}
function feedback(node,text,kind){
 node.textContent=text;node.className="feedback"+(kind?" "+kind:"");
}
function answerPanel(card,module,skill,question,choices,right,recordPractice=true){
 card.append(el("p","q",question));
 const group=el("div","choices");
 group.setAttribute("role","group");group.setAttribute("aria-label",skill+" practice choices");
 const info=el("p","feedback","Choose one answer • اختر إجابة واحدة");
 info.setAttribute("role","status");info.setAttribute("aria-live","polite");
 choices.forEach((choice,i)=>{
  const b=el("button","choice",choice);b.type="button";
  b.addEventListener("click",()=>{
   if(b.disabled)return;
   if(i!==right){
    b.disabled=true;b.classList.add("incorrect");
    feedback(info,"🌱 Try again. Think about the story or what you heard.","retry");
    return;
   }
   [...group.children].forEach(c=>c.disabled=true);
   b.classList.add("correct");
   if(recordPractice)mark(module,skill);
   feedback(info,recordPractice?"✅ Correct! Excellent practice. • أحسنت!":"✅ Well done! Find the sentence in the story that supports your answer. Bonus practice is not scored.","good");
  });
  group.append(b);
 });
 card.append(group,info);
}
function createSkill(module,skill){
 const card=el("article","skill");
 card.dataset.skill=skill.id;
 const title=el("h3",null,skill.icon+" "+skill.title+" • "+skill.ar);
 card.append(title);
 const status=el("p","status");
 card.append(status);
 if(skill.id==="listening"){
  card.append(el("p","objective","With an adult: listen first, then choose the answer."));
  const details=el("details","script");
  details.append(el("summary",null,"🔊 Adult: reveal and read the script aloud"));
  details.append(el("p",null,module.listen.script));
  details.append(el("p","note","The child should look away while the adult reads. This is not a secure test."));
  card.append(details);
  answerPanel(card,module,"listening",module.listen.question,module.listen.choices,module.listen.answer);
 }else if(skill.id==="speaking"){
  card.append(el("p","objective",module.speak.prompt));
  card.append(el("p","example",module.speak.example));
  card.append(el("p","note","Adult observation prompt: "+module.speak.check));
  const b=el("button","primary","🌱 I practised with an adult");
  b.type="button";
  const info=el("p","feedback","No audio is recorded or automatically graded.");
  info.setAttribute("role","status");
  b.addEventListener("click",()=>{
   mark(module,"speaking");
   feedback(info,"✅ Attempt recorded on this device. A teacher has not graded the speaking.","good");
  });
  card.append(b,info);
 }else if(skill.id==="reading"){
  card.append(el("p","objective","Read the original short story, then choose."));
  const passage=el("p","passage",module.read.passage);
  passage.lang="en";card.append(passage);
  answerPanel(card,module,"reading",module.read.question,module.read.choices,module.read.answer);
  if(module.read.followUp){
   const extra=el("details","extra-reading");
   extra.append(el("summary",null,"🔎 Bonus reading challenge • سؤال إضافي"));
   card.append(extra);
   const follow=module.read.followUp;
   answerPanel(extra,module,"reading",follow.question,follow.choices,follow.answer,false);
   const evidence=el("details","reading-evidence");
   evidence.append(el("summary",null,"👩‍🏫 Adult: reveal a supporting sentence"));
   evidence.append(el("p","note",follow.evidence));
   extra.append(evidence);
  }
 }else if(skill.id==="writing"){
  card.append(el("p","objective",module.write.prompt));
  const clues=el("div","word-clues");
  clues.setAttribute("aria-label","Word clues presented out of order");
  module.write.clues.slice().reverse().forEach(word=>clues.append(el("span",null,word)));
  card.append(clues);
  const label=el("label","q","Your sentence • اكتب جملتك");
  label.htmlFor="writing-"+module.id;
  card.append(label);
  const input=el("input","write-input");
  input.id="writing-"+module.id;
  input.type="text";input.maxLength=90;input.autocomplete="off";input.spellcheck=false;
  input.placeholder="Type a complete sentence";
  card.append(input);
  const b=el("button","primary","✏️ Check my sentence");
  b.type="button";
  const info=el("p","feedback","Use the words to build the suggested sentence.");
  info.setAttribute("role","status");info.setAttribute("aria-live","polite");
  const norm=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
  const check=()=>{
   if(norm(input.value)!==norm(module.write.answer)){
    feedback(info,"🌱 Check the word order and spelling. Try the model sentence again.","retry");
    return;
   }
   mark(module,"writing");
   feedback(info,"✅ The words match the guided model sentence. Capitalization, punctuation and free writing are not assessed.","good");
  };
  b.addEventListener("click",check);
  input.addEventListener("keydown",event=>{if(event.key==="Enter")check()});
  card.append(b,info);
  if(module.write.independent){
   const task=module.write.independent;
   const area=el("section","independent-writing");
   area.append(el("h4",null,"🌱 Write your own sentence • اكتب جملة من تأليفك"));
   area.append(el("p","note",task.prompt));
   area.append(el("p","starter","Try this starter: "+task.starter));
   const ownLabel=el("label","q","My own sentence (not saved)");
   ownLabel.htmlFor="freewriting-"+module.id;
   const ownInput=el("textarea","freewrite");
   ownInput.id=ownLabel.htmlFor;
   ownInput.maxLength=180;
   ownInput.autocomplete="off";
   ownInput.spellcheck=false;
   ownInput.placeholder="Write a new sentence about a pretend person or object";
   const review=el("button","secondary","💬 Review with an adult");
   review.type="button";
   const ownInfo=el("p","feedback","This creative sentence is not graded or saved. Avoid personal details.");
   ownInfo.setAttribute("role","status");ownInfo.setAttribute("aria-live","polite");
   review.addEventListener("click",()=>{
    if(!ownInput.value.trim())feedback(ownInfo,"🌱 Write a sentence first, then ask an adult to review it.","retry");
    else feedback(ownInfo,"👩‍🏫 Read your sentence to an adult. Check together: "+task.adultCheck+" No score or text was saved.","good");
   });
   area.append(ownLabel,ownInput,review,ownInfo);
   card.append(area);
  }
 }
 return card;
}
function renderPhonics(module){
 const host=$("phonicsPractice");
 const families=Array.isArray(module.phonics)?module.phonics:[];
 const patterns=Array.isArray(module.patterns)?module.patterns:[];
 const questions=[
  ...families.map(q=>({...q,kind:"family"})),
  ...patterns.map(q=>({...q,kind:"pattern"}))
 ];
 host.replaceChildren();
 if(!questions.length){host.hidden=true;return}
 const panel=el("section","phonics-panel");
 panel.append(el("h3",null,"🔤 Word families, digraphs & silent e • أنماط الكلمات"));
 panel.append(el("p","note","Extra written-letter practice: read words aloud with an adult. These checks are not pronunciation tests, mastery scores, or saved progress."));
 const area=el("div","phonics-questions");
 for(const item of questions){
  const isFamily=item.kind==="family";
  const label=isFamily?item.family:item.pattern;
  const question=el("div","phonics-question");
  if(isFamily)question.dataset.family=label;else question.dataset.pattern=label;
  question.append(el("h4",null,label+" • "+item.prompt));
  const choices=el("div","phonics-choices");
  choices.setAttribute("role","group");
  choices.setAttribute("aria-label",(isFamily?"Word family ":"Letter pattern ")+label+" answer choices");
  const status=el("p","feedback","Choose one word • اختر كلمة");
  status.setAttribute("role","status");status.setAttribute("aria-live","polite");
  item.choices.forEach((word,i)=>{
   const b=el("button","phonics-choice",word);
   b.type="button";
   b.addEventListener("click",()=>{
    if(b.disabled)return;
    if(i!==item.answer){
     b.disabled=true;b.classList.add("incorrect");
     feedback(status,isFamily?"🌱 Try another word in the same family.":"🌱 Look for the target letters and try again.","retry");return;
    }
    for(const child of choices.children)child.disabled=true;
    b.classList.add("correct");
    const explanation=isFamily?word+" ends with "+item.family.slice(1)+".":item.explanation;
    feedback(status,"✅ Yes! "+explanation+" No pronunciation was assessed.","good");
   });
   choices.append(b);
  });
  question.append(choices,status);area.append(question);
 }
 panel.append(area);host.append(panel);host.hidden=false;
}
function renderModule(module){
 current=module;
 $("selectedModuleTitle").textContent="Module "+(MODULES.indexOf(module)+1)+": "+module.title+" • "+module.ar;
 $("selectedModuleOutcome").textContent=module.outcome+" • "+module.week;
 $("skillCards").replaceChildren(...SKILLS.map(skill=>createSkill(module,skill)));
 renderPhonics(module);
 for(const b of $("moduleButtons").querySelectorAll("button"))
  b.setAttribute("aria-pressed",String(b.dataset.module===module.id));
 updateProgress();
}
for(const [i,module] of MODULES.entries()){
 const b=el("button",null,(i+1)+". "+module.title);
 b.type="button";b.dataset.module=module.id;b.setAttribute("aria-pressed","false");
 const small=el("span",null,"0 / 4 practised");
 b.append(small);
 b.addEventListener("click",()=>renderModule(module));
 $("moduleButtons").append(b);
}
renderModule(MODULES[0]);
})();