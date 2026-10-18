/* Grade 2 Module 2 supplementary phonics. All examples are original.
 * Adult-led hearing and blending require human observation. No audio/child data are collected.
 * No stored state: attempts reset when the page closes or reloads.
 */
(()=>{
"use strict";
const FAMILIES=[
 {
  id:"ing",pattern:"-ing",ending:"ing",words:[
   {word:"ring",onset:"r",picture:"💍",label:"A ring"},
   {word:"sing",onset:"s",picture:"🎵",label:"Singing a song"}
  ],
  adult:"Say 'ring' and 'sing' slowly and clearly. Let the child listen for the shared ending. Repeat each complete word naturally.",
  read:{question:"Which word belongs to the -ing family?",choices:["hand","ring","sand"],answer:1},
  spell:{word:"sing",adult:"Say the word 'sing' without letting the child read this script."},
  apply:{question:"Which sentence uses 'ring' correctly?",choices:["The ring grows in the garden.","The ring is on my finger.","The ring is my school bus."],answer:1}
 },
 {
  id:"and",pattern:"-and",ending:"and",words:[
   {word:"hand",onset:"h",picture:"✋",label:"A hand"},
   {word:"sand",onset:"s",picture:"🏖️",label:"Sand on a beach"}
  ],
  adult:"Say 'hand' and 'sand' slowly and clearly. Let the child listen for the shared ending. Repeat each complete word naturally.",
  read:{question:"Which word belongs to the -and family?",choices:["hand","sing","king"],answer:0},
  spell:{word:"sand",adult:"Say the word 'sand' without letting the child read this script."},
  apply:{question:"Which sentence uses 'hand' correctly?",choices:["My hand is a sandwich.","My hand is clean.","My hand is a bicycle."],answer:1}
 }
];
const STEPS=[
 {id:"see",label:"👀 See",ar:"انظر"},
 {id:"hear",label:"👂 Hear",ar:"استمع"},
 {id:"blend",label:"🧩 Blend",ar:"ادمج"},
 {id:"read",label:"📖 Read",ar:"اقرأ"},
 {id:"spell",label:"✏️ Spell",ar:"تهجّ"},
 {id:"apply",label:"🌱 Apply",ar:"استخدم"},
 {id:"review",label:"⭐ Review",ar:"راجع"}
];
const done=new Set();
let family=FAMILIES[0];
let step=STEPS[0];
const $=id=>document.getElementById(id);
function el(tag,cls,text){
 const n=document.createElement(tag);
 if(cls)n.className=cls;
 if(text!==undefined)n.textContent=text;
 return n;
}
function say(message,kind=""){
 const x=$("feedback");
 x.textContent=message;
 x.className="feedback"+(kind?" "+kind:"");
}
function key(){return family.id+"-"+step.id}
function nextTarget(){
 if(!done.has(key()))return null;
 const index=STEPS.indexOf(step);
 if(index<STEPS.length-1)return {family,step:STEPS[index+1],label:"Continue to "+STEPS[index+1].label+" →"};
 const unfinished=STEPS.find(item=>!done.has(family.id+"-"+item.id));
 if(unfinished)return {family,step:unfinished,label:"Review "+unfinished.label+" →"};
 const other=FAMILIES.find(item=>item.id!==family.id&&STEPS.some(s=>!done.has(item.id+"-"+s.id)));
 if(other){
  const firstUnfinished=STEPS.find(item=>!done.has(other.id+"-"+item.id));
  return {family:other,step:firstUnfinished,label:"Start "+other.pattern+" family →"};
 }
 return null;
}
function progress(){
 const total=done.size;
 $("progressText").textContent=total+" / 14 optional guided steps practised this visit (not a score)";
 $("progressBar").value=total;
 for(const b of $("stepButtons").querySelectorAll("button")){
  const finished=done.has(family.id+"-"+b.dataset.step);
  b.classList.toggle("done",finished);
  b.querySelector("span").textContent=finished?"✓ Practised":"Try this";
 }
 $("stageCounter").textContent="Stage "+(STEPS.indexOf(step)+1)+" of 7 • "+family.pattern+" word family";
 const next=nextTarget();
 const button=$("continueStep");
 button.hidden=!next;
 if(next)button.textContent=next.label;
 $("journeySummary").textContent=total===14
  ?"🌟 All 14 guided steps practised this visit! Great effort. This is not a reading or pronunciation test."
  :next
   ?"Nice practice! Continue when ready, or choose another stage above."
   :"Complete this activity with an adult to continue, or select a stage above.";
}
function mark(){
 done.add(key());progress();
 say("✅ Practice noted for this visit. This is not a pronunciation or reading assessment.","good");
}
function completeButton(text){
 const b=el("button","primary",text);
 b.type="button";b.dataset.action="complete";
 b.addEventListener("click",mark);
 return b;
}
// On-device speech preview: no audio uploads, microphone or network API calls.
let activeUtterance=null;
function setAudioStatus(message){
 $("audioStatus").textContent=message;
}
function speakWord(word,slow){
 if(typeof window.speechSynthesis==="undefined"||typeof window.SpeechSynthesisUtterance!=="function"){
  setAudioStatus("Audio is unavailable in this browser. Please ask an adult to pronounce the word.");
  return;
 }
 try{
  window.speechSynthesis.cancel();
  const utterance=new window.SpeechSynthesisUtterance(word);
  const voices=typeof window.speechSynthesis.getVoices==="function"?window.speechSynthesis.getVoices():[];
  const available=Array.from(voices||[]).filter(v=>typeof v.lang==="string"&&v.lang.toLowerCase().startsWith("en"));
  const voice=available.find(v=>v.lang.toLowerCase()==="en-gb")||available.find(v=>v.default)||available[0];
  if(voice)utterance.voice=voice;
  utterance.lang=voice?voice.lang:"en-GB";
  utterance.rate=slow?0.72:0.95;
  utterance.pitch=1;
  utterance.volume=1;
  activeUtterance=utterance;
  utterance.onstart=()=>{
   if(activeUtterance===utterance)setAudioStatus("🔊 Listening to '"+word+"'"+(slow?" slowly":"")+". Repeat after the voice.");
  };
  utterance.onend=()=>{
   if(activeUtterance===utterance){
    setAudioStatus("You heard '"+word+"'. Listen again or continue practising.");
    activeUtterance=null;
   }
  };
  utterance.onerror=()=>{
   if(activeUtterance===utterance){
    setAudioStatus("The device voice did not play. Try again or ask an adult to say the word.");
    activeUtterance=null;
   }
  };
  window.speechSynthesis.speak(utterance);
  setAudioStatus("🔊 Trying '"+word+"'"+(slow?" slowly":"")+". If no sound plays, use Safari or ask an adult.");
 }catch{
  activeUtterance=null;
  setAudioStatus("The device voice is unavailable. Ask an adult to say the word.");
 }
}
function audioControls(word){
 const controls=el("div","audio-actions");
 controls.setAttribute("role","group");
 controls.setAttribute("aria-label","Hear English word "+word);
 for(const [slow,label] of [[false,"🔊 Hear "+word],[true,"🐢 Slow"]]){
  const b=el("button",slow?"slow-word":"",label);
  b.type="button";
  b.dataset.action=slow?"speak-slow":"speak-word";
  b.dataset.word=word;
  b.setAttribute("aria-label",slow?"Hear "+word+" slowly":"Hear "+word+" pronounced");
  b.addEventListener("click",()=>speakWord(word,slow));
  controls.append(b);
 }
 return controls;
}
function addVisual(host,word){
 const card=el("div","visual");
 const visual=el("div","word-visual");
 const picture=el("span","picture",word.picture);
 picture.setAttribute("role","img");picture.setAttribute("aria-label",word.label);
 visual.append(picture,el("span","word",word.word));
 card.append(visual,audioControls(word.word));
 host.append(card);
}
function adultDetails(host,title,script){
 const box=el("details");
 const summary=el("summary",null,title);
 box.append(summary,el("p",null,script));
 host.append(box);
}
function choose(host,question,choices,right){
 host.append(el("p",null,question));
 const list=el("div","choice-list");
 list.setAttribute("role","group");list.setAttribute("aria-label",question);
 choices.forEach((choice,i)=>{
  const b=el("button","choice",choice);
  b.type="button";b.dataset.answer=String(i);
  b.addEventListener("click",()=>{
   if(b.disabled)return;
   if(i!==right){
    b.disabled=true;b.classList.add("incorrect");
    say("🌱 Not quite. Look or listen again and choose a different answer.","retry");
    return;
   }
   for(const button of list.querySelectorAll("button"))button.disabled=true;
   b.classList.add("correct");mark();
  });
  list.append(b);
 });
 host.append(list);
}
function show(){
 if(activeUtterance&&typeof window.speechSynthesis!=="undefined"){
  window.speechSynthesis.cancel();activeUtterance=null;
 }
 setAudioStatus("🔊 Tap Hear or Slow next to a word to listen to a device-voice preview. Adult pronunciation review is still needed.");
 const host=$("stepContent");host.replaceChildren();
 say("");
 $("stepHeading").textContent=step.label+" • "+family.pattern;
 switch(step.id){
  case "see":{
   host.append(el("p",null,"Look carefully at these two words. What letters do they share at the end?"));
   for(const word of family.words)addVisual(host,word);
   host.append(el("p","note","An adult may point to the letters. Pictures are visual clues, not proof that a child can read the words."));
   host.append(completeButton("👀 We explored the words"));
   break;
  }
  case "hear":{
   host.append(el("p",null,"Ask an adult to read both words aloud. Listen for their similar ending."));
   adultDetails(host,"👩‍🏫 Adult only: show reading script",family.adult);
   host.append(el("p","note","This hearing stage is adult-led. The optional speaker buttons elsewhere play a device-generated voice preview, not a validated listening or pronunciation assessment."));
   host.append(completeButton("👂 We listened with an adult"));
   break;
  }
  case "blend":{
   host.append(el("p",null,"An adult models each beginning sound, then the shared ending, then the complete word. Repeat together if comfortable."));
   for(const word of family.words){
    const row=el("div","chunks");
    row.setAttribute("aria-label",word.onset+" plus "+family.ending+" makes "+word.word);
    row.append(el("span","chunk",word.onset),el("span",null,"+"),el("span","chunk",family.ending),el("span",null,"→"),el("span","chunk result",word.word));
    host.append(row,audioControls(word.word));
   }
   host.append(el("p","note","Written chunks alone do not teach pronunciation. Adults should model sounds, not pronounce letter names in place of phonemes. Exact sound production requires teacher review."));
   host.append(completeButton("🧩 We tried blending together"));
   break;
  }
  case "read":{
   choose(host,family.read.question,family.read.choices,family.read.answer);
   host.append(el("p","note","Choosing a written word checks recognition; it does not check oral reading fluency."));
   break;
  }
  case "spell":{
   host.append(el("p",null,"Ask an adult to say the word. Type the letters you think you heard. No answer is saved."));
   adultDetails(host,"👩‍🏫 Adult only: show spelling word",family.spell.adult);
   const label=el("label",null,"My spelling • تهجئتي");
   label.htmlFor="spellInput";
   const input=el("input","spell-input");
   input.id="spellInput";input.type="text";input.maxLength=18;
   input.autocomplete="off";input.spellcheck=false;input.autocapitalize="none";
   const button=el("button","primary","✏️ Check written spelling");
   button.type="button";button.dataset.action="check-spelling";
   const check=()=>{
    if(input.value.trim().toLowerCase()===family.spell.word){mark();}
    else{say("🌱 Try again. Ask the adult to repeat the word and listen for every sound.","retry");}
   };
   button.addEventListener("click",check);
   input.addEventListener("keydown",event=>{if(event.key==="Enter")check();});
   host.append(label,input,button);
   break;
  }
  case "apply":{
   choose(host,family.apply.question,family.apply.choices,family.apply.answer);
   host.append(el("p","note","Talk with an adult about the meaning of the sentence. The app only checks the selected answer."));
   break;
  }
  case "review":{
   host.append(el("p",null,"Look at both words again. Tell an adult which ending is the same. If comfortable, read each word aloud."));
   for(const word of family.words)addVisual(host,word);
   host.append(el("p","note","Adult checklist: identify shared letters; discuss word meaning; offer a sound model; note any difficulty for a teacher. Do not label this a passed oral reading test."));
   host.append(completeButton("⭐ We reviewed together"));
   break;
  }
 }
 progress();
}
function render(focus=false){
 for(const b of $("familyButtons").querySelectorAll("button"))
  b.setAttribute("aria-pressed",String(b.dataset.family===family.id));
 for(const b of $("stepButtons").querySelectorAll("button"))
  b.setAttribute("aria-pressed",String(b.dataset.step===step.id));
 show();
 if(focus)$("stepHeading").focus();
}
$("continueStep").addEventListener("click",()=>{
 const target=nextTarget();
 if(!target)return;
 family=target.family;
 step=target.step;
 render(true);
});
for(const f of FAMILIES){
 const b=el("button",null,"🔤 "+f.pattern);
 b.type="button";b.dataset.family=f.id;b.setAttribute("aria-pressed","false");
 b.addEventListener("click",()=>{family=f;step=STEPS[0];render(true);});
 $("familyButtons").append(b);
}
for(const s of STEPS){
 const b=el("button",null,s.label);
 b.type="button";b.dataset.step=s.id;b.setAttribute("aria-pressed","false");
 b.append(el("span",null,"Try this"));
 b.addEventListener("click",()=>{step=s;render(true);});
 $("stepButtons").append(b);
}
// Parent-only QA: do not persist observations or transmit information.
const wordList=FAMILIES.flatMap(f=>f.words.map(w=>w.word));
for(const word of wordList){
 const card=el("div","audio-review-card");
 card.append(el("strong",null,"🔊 "+word));
 card.append(audioControls(word));
 for(const mode of ["normal","slow"]){
  const label=el("label",null,(mode==="normal"?"Normal":"Slow")+" voice");
  const id="review-"+word+"-"+mode;
  label.htmlFor=id;
  const select=el("select");
  select.id=id;
  select.dataset.word=word;select.dataset.mode=mode;
  for(const [value,name] of [["untested","Not checked"],["clear","Clear and natural"],["revise","Needs improvement"],["silent","No sound"]]){
   const option=el("option",null,name);option.value=value;select.append(option);
  }
  card.append(label,select);
 }
 $("audioReviewGrid").append(card);
}
$("makeAudioReview").addEventListener("click",()=>{
 const observations=Array.from($("audioReviewGrid").querySelectorAll("select"))
  .filter(select=>select.value!=="untested")
  .map(select=>select.dataset.word+" ("+select.dataset.mode+"): "+
   ({clear:"clear and natural",revise:"needs improvement",silent:"no sound"})[select.value]);
 if(observations.length===0){
  $("audioReviewFeedback").textContent="Please check at least one word and speed before preparing feedback.";
  $("audioReviewOutput").value="";
  return;
 }
 $("audioReviewOutput").value="Little Learners Academy — adult device-voice feedback (not child assessment)\\n"+
  "Grade 2 Word Family Adventure\\n"+observations.join("\\n")+
  "\\nVoice quality requires an English educator's review. No child data recorded.";
 $("audioReviewFeedback").textContent="Feedback prepared locally. Copy the text into your message. Nothing has been sent.";
});
render();
})();