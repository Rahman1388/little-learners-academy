/* Grade 2 Modules 2–5 supplementary phonics. All examples are original.
 * Adult-led hearing and blending require human observation. No audio/child data are collected.
 * No stored state: attempts reset when the page closes or reloads.
 */
(()=>{
"use strict";
const FAMILIES=[
 {
  id:"ing",module:2,pattern:"-ing",ending:"ing",words:[
   {word:"ring",onset:"r",picture:"💍",label:"A ring"},
   {word:"sing",onset:"s",picture:"🎵",label:"Singing a song"}
  ],
  adult:"Say 'ring' and 'sing' slowly and clearly. Let the child listen for the shared ending. Repeat each complete word naturally.",
  read:{question:"Which word belongs to the -ing family?",choices:["hand","ring","sand"],answer:1},
  spell:{word:"sing",adult:"Say the word 'sing' without letting the child read this script."},
  apply:{question:"Which sentence uses 'ring' correctly?",choices:["The ring grows in the garden.","The ring is on my finger.","The ring is my school bus."],answer:1}
 },
 {
  id:"and",module:2,pattern:"-and",ending:"and",words:[
   {word:"hand",onset:"h",picture:"✋",label:"A hand"},
   {word:"sand",onset:"s",picture:"🏖️",label:"Sand on a beach"}
  ],
  adult:"Say 'hand' and 'sand' slowly and clearly. Let the child listen for the shared ending. Repeat each complete word naturally.",
  read:{question:"Which word belongs to the -and family?",choices:["hand","sing","king"],answer:0},
  spell:{word:"sand",adult:"Say the word 'sand' without letting the child read this script."},
  apply:{question:"Which sentence uses 'hand' correctly?",choices:["My hand is a sandwich.","My hand is clean.","My hand is a bicycle."],answer:1}
 },
 {
  id:"all",module:3,pattern:"-all",ending:"all",words:[
   {word:"ball",onset:"b",picture:"⚽",label:"A ball"},
   {word:"wall",onset:"w",picture:"🧱",label:"A brick wall"}
  ],
  adult:"Read 'ball' and 'wall' aloud. Give the child time to hear the shared ending. Point to the letters only after the listening attempt.",
  read:{question:"Which word belongs to the -all family?",choices:["wall","snack","ring"],answer:0},
  spell:{word:"wall",adult:"Say 'wall' clearly without letting the learner see this script."},
  apply:{question:"Which sentence uses 'ball' correctly?",choices:["The ball is a drink.","We play with a ball in the park.","The ball writes a letter."],answer:1}
 },
 {
  id:"ack",module:3,pattern:"-ack",ending:"ack",words:[
   {word:"black",onset:"bl",picture:"⚫",label:"The colour black"},
   {word:"snack",onset:"sn",picture:"🍎",label:"An apple as a snack"}
  ],
  adult:"Read 'black' and 'snack' slowly. The words start with two-letter blends (bl and sn). Model their sounds as well as the ending, and pronounce the whole words naturally.",
  read:{question:"Which word belongs to the -ack family?",choices:["hand","black","ball"],answer:1},
  spell:{word:"snack",adult:"Say 'snack' clearly without letting the learner read this script."},
  apply:{question:"Which sentence uses 'snack' correctly?",choices:["A snack is a blue car.","I eat a snack after school.","A snack writes on paper."],answer:1}
 },
 {
  id:"ain",module:4,pattern:"-ain",ending:"ain",words:[
   {word:"rain",onset:"r",picture:"🌧️",label:"Rain falling"},
   {word:"train",onset:"tr",picture:"🚆",label:"A train"}
  ],
  adult:"Say 'rain' and 'train' naturally. Point out their shared ending only after listening. For 'train', model the two starting consonant sounds in the tr blend, then the rest of the word.",
  read:{question:"Which word belongs to the -ain word family?",choices:["drink","train","hand"],answer:1},
  spell:{word:"rain",adult:"Say the word 'rain' without displaying the letters for the child."},
  apply:{question:"Which sentence uses 'rain' correctly?",choices:["Rain is a classroom chair.","Rain falls from clouds.","Rain is a pencil."],answer:1}
 },
 {
  id:"ink",module:4,pattern:"-ink",ending:"ink",words:[
   {word:"pink",onset:"p",picture:"🩷",label:"Pink colour"},
   {word:"sink",onset:"s",picture:"🚰",label:"Water tap above a sink"}
  ],
  adult:"Read 'pink' and 'sink' clearly. Ask whether their final sounds match. Point to the same written ending only after listening.",
  read:{question:"Which word belongs to the -ink word family?",choices:["pink","wall","train"],answer:0},
  spell:{word:"sink",adult:"Say 'sink' clearly without displaying the letters for the child."},
  apply:{question:"Which sentence uses 'sink' correctly?",choices:["A sink flies like a bird.","I wash my hands at the sink.","A sink is a school bag."],answer:1}
 },
 {
  id:"ay",module:5,pattern:"-ay",ending:"ay",words:[
   {word:"day",onset:"d",picture:"☀️",label:"A sunny day"},
   {word:"play",onset:"pl",picture:"🛝",label:"Playing in a playground"}
  ],
  adult:"Read 'day' and 'play' slowly and naturally, with the same ending sound. The word 'play' starts with the two-consonant blend pl. Show the shared letters only after the child has listened.",
  read:{question:"Which word belongs to the -ay family?",choices:["wall","day","rain"],answer:1},
  spell:{word:"play",adult:"Say the word 'play' clearly, without allowing the child to see this script or the written word."},
  apply:{question:"Which sentence uses 'play' correctly?",choices:["We play with our friends at the park.","Play is a type of fruit.","A play is a school pencil."],answer:0}
 },
 {
  id:"ick",module:5,pattern:"-ick",ending:"ick",words:[
   {word:"sick",onset:"s",picture:"🤒",label:"Feeling unwell"},
   {word:"kick",onset:"k",picture:"⚽",label:"Kicking a football"}
  ],
  adult:"Read 'sick' and 'kick' naturally. Help the learner hear the shared ending, then identify the -ick letters in both words. Use a gentle action model for 'kick'.",
  read:{question:"Which word belongs to the -ick family?",choices:["kick","black","train"],answer:0},
  spell:{word:"kick",adult:"Say the word 'kick' clearly, without letting the child read it first."},
  apply:{question:"Which sentence uses 'kick' correctly?",choices:["I kick the football gently in the park.","I kick a book to read it.","A kick is a kind of vegetable."],answer:0}
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
const TOTAL=FAMILIES.length*STEPS.length;
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
function progress(){
 const total=done.size;
 $("progressText").textContent=total+" / "+TOTAL+" optional guided steps practised this visit (not a score)";
 $("progressBar").max=TOTAL;
 $("progressBar").value=total;
 for(const b of $("stepButtons").querySelectorAll("button")){
  const finished=done.has(family.id+"-"+b.dataset.step);
  b.classList.toggle("done",finished);
  b.querySelector("span").textContent=finished?"✓ Practised":"Try this";
 }
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
function addVisual(host,word){
 const card=el("div","visual");
 const picture=el("span","picture",word.picture);
 picture.setAttribute("role","img");picture.setAttribute("aria-label",word.label);
 card.append(picture,el("span","word",word.word));
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
 const host=$("stepContent");host.replaceChildren();
 say("");
 $("stepHeading").textContent="Module "+family.module+" • "+step.label+" • "+family.pattern;
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
   host.append(el("p","note","This page contains no sound recording or synthetic audio. The adult—not the app—observes listening."));
   host.append(completeButton("👂 We listened with an adult"));
   break;
  }
  case "blend":{
   host.append(el("p",null,"An adult models each beginning sound, then the shared ending, then the complete word. Repeat together if comfortable."));
   for(const word of family.words){
    const row=el("div","chunks");
    row.setAttribute("aria-label",word.onset+" plus "+family.ending+" makes "+word.word);
    row.append(el("span","chunk",word.onset),el("span",null,"+"),el("span","chunk",family.ending),el("span",null,"→"),el("span","chunk result",word.word));
    host.append(row);
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
for(const f of FAMILIES){
 const b=el("button",null,"🔤 M"+f.module+" "+f.pattern);
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
render();
})();