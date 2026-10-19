/* Grade 2 tens and ones bilingual review lesson. Draft Arabic requires qualified review.
 * No child storage, tracking, network calls, microphones, AI or automatic mastery score.
 */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const dictionary=window.LLA_TENS_ONES_I18N;
if(!dictionary||!dictionary.en||!dictionary.ar)throw Error("Tens and ones language content missing");
const lessons=[
 {id:"model",tens:3,ones:4},
 {id:"guided",tens:5,ones:2,choices:[25,52,57],answer:52},
 {id:"independent",tens:7,ones:6,choices:[67,70,76],answer:76},
 {id:"reflect",tens:7,ones:6},
 {id:"complete",tens:7,ones:6}
];
let step=0,answered=false,language="en";
const t=()=>dictionary[language];
const make=(tag,cls,value)=>{
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(value!==undefined)node.textContent=value;
 return node;
};
function feedback(value,kind=""){
 const element=$("feedback");element.textContent=value;element.className=kind;
}
function draw(tens,ones,model){
 const rows=$("visualRows");
 rows.replaceChildren();
 const sticks=make("div","visualRows");
 sticks.setAttribute("aria-hidden","true");
 for(let i=0;i<tens;i++)sticks.append(make("span","rod"));
 const dots=make("div","ones");
 dots.setAttribute("aria-hidden","true");
 for(let i=0;i<ones;i++)dots.append(make("span","dot"));
 rows.append(sticks,dots);
 $("placeVisual").setAttribute("aria-label",t().visual(tens,ones));
 $("visualCaption").textContent=model?t().captionModel(tens,ones):t().captionTry;
}
function translateShell(){
 const text=t();
 document.documentElement.lang=language;
 document.documentElement.dir=language==="ar"?"rtl":"ltr";
 $("languageEn").setAttribute("aria-pressed",String(language==="en"));
 $("languageAr").setAttribute("aria-pressed",String(language==="ar"));
 $("backLink").textContent=text.back;
 $("pilotBadge").textContent=text.badge;
 $("pageHeading").textContent=text.heading;
 $("goalLabel").textContent=text.goalLabel;
 $("goalText").textContent=text.goal;
 $("warningText").textContent=text.warning;
 $("parentHeading").textContent=text.parentHeading;
 $("parentText").textContent=text.parentText;
 $("parentNote").textContent=text.parentNote;
 $("answerGrid").setAttribute("aria-label",text.answerLabel);
 $("lessonPanel").setAttribute("aria-label",language==="ar"?"درس تفاعلي عن العشرات والآحاد":"Interactive tens and ones lesson");
}
function render(preserveAnswered=false,focusHeading=true){
 if(!preserveAnswered)answered=false;
 const lesson=lessons[step],s=t(),words=s.lessons[lesson.id];
 translateShell();
 $("stageProgress").textContent=step<4?s.progress(step+1)+s.stageLabels[step]:s.finished;
 $("stepHeading").textContent=words.title;
 $("instruction").textContent=words.instruction;
 draw(lesson.tens,lesson.ones,lesson.id==="model");
 const model=$("modelExplanation"),answerGrid=$("answerGrid"),hint=$("hintButton"),hintBox=$("hintBox");
 model.hidden=lesson.id!=="model";
 model.textContent=s.explanation;
 answerGrid.replaceChildren();
 answerGrid.hidden=!lesson.choices;
 if(lesson.choices){
  for(const value of lesson.choices){
   const b=make("button",null,String(value));
   b.type="button";b.dataset.choice=String(value);
   b.disabled=answered;
   if(answered&&value===lesson.answer)b.classList.add("correct");
   b.addEventListener("click",()=>choose(value));
   answerGrid.append(b);
  }
 }
 hint.hidden=!lesson.choices;
 hint.setAttribute("aria-expanded","false");
 hint.textContent=s.showHint;
 hintBox.hidden=true;hintBox.textContent=words.clue||"";
 $("reflection").hidden=lesson.id!=="reflect";
 $("reflection").textContent=s.reflection;
 $("restartButton").hidden=lesson.id!=="complete";
 $("restartButton").textContent=s.restart;
 $("nextButton").hidden=lesson.id==="complete"||!!lesson.choices&&!answered;
 $("nextButton").textContent=lesson.id==="model"?s.nextModel:lesson.id==="reflect"?s.nextReflect:s.next;
 if(answered&&lesson.choices)feedback(words.explanation+s.feedbackCorrectSuffix,"good");
 else feedback(lesson.id==="model"?s.feedbackModel:lesson.choices?s.feedbackQuestion:lesson.id==="reflect"?s.feedbackReflect:s.feedbackDone);
 if(focusHeading)$("stepHeading").focus();
}
function choose(value){
 const lesson=lessons[step];
 if(!lesson.choices||answered)return;
 if(value!==lesson.answer){
  feedback(t().feedbackWrong,"try");
  return;
 }
 answered=true;
 for(const b of $("answerGrid").querySelectorAll("button")){
  b.disabled=true;
  if(b.dataset.choice===String(value))b.classList.add("correct");
 }
 feedback(t().lessons[lesson.id].explanation+t().feedbackCorrectSuffix,"good");
 $("nextButton").hidden=false;
 $("nextButton").textContent=t().next;
}
function changeLanguage(target){
 if(!dictionary[target]||target===language)return;
 language=target;
 // Preserve the step and whether the child solved it. No identity or score is saved.
 render(true,false);
}
$("languageEn").addEventListener("click",()=>changeLanguage("en"));
$("languageAr").addEventListener("click",()=>changeLanguage("ar"));
$("hintButton").addEventListener("click",()=>{
 const box=$("hintBox"),open=box.hidden;
 box.hidden=!open;
 $("hintButton").setAttribute("aria-expanded",String(open));
 $("hintButton").textContent=open?t().hideHint:t().showHint;
});
$("nextButton").addEventListener("click",()=>{
 if(step===4||((step===1||step===2)&&!answered))return;
 step++;
 render(false,true);
});
$("restartButton").addEventListener("click",()=>{step=0;render(false,true)});
render(false,false);
})();