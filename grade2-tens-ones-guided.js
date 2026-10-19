/* Little Learners Academy — Grade 2 tens and ones guided REVIEW lesson.
 * No data storage, tracking, network calls or student voice capture.
 * A session-only teaching model, not a diagnostic score or curriculum certificate.
 */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const lessons=[
 {id:"model",title:"Look at tens and ones",instruction:"One blue stick is a group of ten. Each gold dot is one. Count the sticks and the dots.",tens:3,ones:4},
 {id:"guided",title:"Let's build a number together",instruction:"Count the tens sticks and ones dots. Which two-digit number do they make?",tens:5,ones:2,choices:[25,52,57],answer:52,
  clue:"Start with the tens: five groups of ten make 50. Add two single ones.",
  explanation:"Correct: 5 tens are 50 and 2 ones are 2. So 50 + 2 = 52."},
 {id:"independent",title:"Your turn: read the model",instruction:"Try independently. Which number do these tens and ones show?",tens:7,ones:6,choices:[67,70,76],answer:76,
  clue:"Count the blue sticks by tens, then add the gold ones dots. You can ask an adult for help.",
  explanation:"Well done: 7 tens are 70 and 6 ones are 6. So 70 + 6 = 76."},
 {id:"reflect",title:"Explain what you discovered",instruction:"Tell an adult or point to the model: Why does 76 have a 7 in the tens place and a 6 in the ones place?",tens:7,ones:6},
 {id:"complete",title:"You practised tens and ones!",instruction:"You have explored two-digit numbers. You can practise again or return to Grade 2 maths.",tens:7,ones:6}
];
let step=0,answered=false;
const make=(tag,cls,text)=>{
 const e=document.createElement(tag);
 if(cls)e.className=cls;
 if(text!==undefined)e.textContent=text;
 return e;
};
function feedback(text,kind=""){
 const e=$("feedback");e.textContent=text;e.className=kind;
}
function draw(tens,ones,showModel){
 const rows=$("visualRows");
 rows.replaceChildren();
 const sticks=make("div");
 sticks.className="visualRows";
 sticks.setAttribute("aria-hidden","true");
 for(let i=0;i<tens;i++)sticks.append(make("span","rod"));
 const dots=make("div","ones");
 dots.setAttribute("aria-hidden","true");
 for(let i=0;i<ones;i++)dots.append(make("span","dot"));
 rows.append(sticks,dots);
 $("placeVisual").setAttribute("aria-label",tens+" groups of ten and "+ones+" single ones");
 $("visualCaption").textContent=showModel
  ?tens+" tens + "+ones+" ones = "+(tens*10+ones)
  :"Count the blue groups of ten and the single gold dots.";
}
function render(shouldFocus=true){
 const lesson=lessons[step];
 answered=false;
 $("stageProgress").textContent=step<4?"Step "+(step+1)+" of 4 • "+({model:"See",guided:"Guided try",independent:"Independent practice",reflect:"Explain"}[lesson.id]):"Teaching practice completed • No score awarded";
 $("stepHeading").textContent=lesson.title;
 $("instruction").textContent=lesson.instruction;
 draw(lesson.tens,lesson.ones,lesson.id==="model");
 const explanation=$("modelExplanation"),answers=$("answerGrid"),hint=$("hintButton"),hintBox=$("hintBox");
 explanation.hidden=lesson.id!=="model";
 explanation.textContent="Three tens make 30. Four single ones make 4. So 30 + 4 = 34. The first digit tells us the tens; the second digit tells us the ones.";
 answers.replaceChildren();
 answers.hidden=!lesson.choices;
 if(lesson.choices){
  for(const n of lesson.choices){
   const b=make("button",null,String(n));
   b.type="button";b.dataset.choice=String(n);
   b.addEventListener("click",()=>choose(n));
   answers.append(b);
  }
 }
 hint.hidden=!lesson.choices;
 hint.setAttribute("aria-expanded","false");
 hintBox.hidden=true;hintBox.textContent=lesson.clue||"";
 $("reflection").hidden=lesson.id!=="reflect";
 $("reflection").textContent="💬 Example: I see 7 groups of ten and 6 ones. Seven tens are 70, plus 6 is 76. Children may use their own words; this example is not an automatically scored answer.";
 $("restartButton").hidden=lesson.id!=="complete";
 $("nextButton").hidden=lesson.id==="complete"||!!lesson.choices;
 $("nextButton").textContent=lesson.id==="model"?"I've seen the model →":lesson.id==="reflect"?"Finish this practice →":"Continue →";
 feedback(lesson.id==="model"?"Start by looking at the model with an adult."
  :lesson.choices?"Choose a number. Wrong answers are an opportunity to try again."
  :lesson.id==="reflect"?"Take your time. Say or point to your explanation; nothing is recorded."
  :"Practice finished. This is not a school assessment or evidence of mastery.");
 if(shouldFocus)$("stepHeading").focus();
}
function choose(value){
 const lesson=lessons[step];
 if(!lesson.choices||answered)return;
 if(value!==lesson.answer){
  feedback("Not quite yet. The first digit counts groups of TEN; the second counts single ones. Try another answer.","try");
  return;
 }
 answered=true;
 for(const b of $("answerGrid").querySelectorAll("button")){
  b.disabled=true;
  if(b.dataset.choice===String(value))b.classList.add("correct");
 }
 feedback(lesson.explanation+" You can move to the next step.","good");
 $("nextButton").hidden=false;
 $("nextButton").textContent="Continue →";
}
$("hintButton").addEventListener("click",()=>{
 const hintBox=$("hintBox"),open=hintBox.hidden;
 hintBox.hidden=!open;
 $("hintButton").setAttribute("aria-expanded",String(open));
 $("hintButton").textContent=open?"Hide the clue":"💡 Show a helpful clue";
});
$("nextButton").addEventListener("click",()=>{
 if(step===4||((step===1||step===2)&&!answered))return;
 step++;render();
});
$("restartButton").addEventListener("click",()=>{step=0;render()});
render(false);
})();
