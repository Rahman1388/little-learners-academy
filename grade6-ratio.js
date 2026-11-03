(()=>{"use strict";
const all=window.LLA_G6_RATIO||[];
if(all.length!==24)throw Error("Ratio Explorer needs 24 distinct source problems");
const $=s=>document.querySelector(s),KEY="lla-g6-ratio-v1";
const groups=[
 {id:"tables",icon:"📋",title:"Equivalent Ratios",ar:"النسب المتكافئة"},
 {id:"lines",icon:"📏",title:"Double Number Lines",ar:"خطا الأعداد"},
 {id:"rates",icon:"🛒",title:"Unit Rates",ar:"معدل الوحدة"},
 {id:"percent",icon:"💯",title:"Percent & Hundred Grids",ar:"النسب المئوية"}
];
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}catch{return {}}}
const progress=read();let active=null,solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function completed(){return all.filter(q=>progress[q.id]===true).length}
function update(){
 const n=completed();
 $("#ratioProgress").textContent="⭐ "+n+" / 24 practice problems explored";
 $("#ratioMeter").style.width=(n/24*100)+"%";
 $("#ratioTopics").replaceChildren();
 groups.forEach(g=>{
  const problems=all.filter(q=>q.topic===g.id);
  const done=problems.filter(q=>progress[q.id]).length;
  const button=document.createElement("button");button.type="button";button.className="topic"+(done===6?" complete":"");
  button.dataset.topic=g.id;button.setAttribute("aria-label",g.title+" "+done+" of 6 explored");
  const title=document.createElement("strong");title.textContent=g.icon+" "+g.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=g.ar;
  const status=document.createElement("small");status.textContent=done+" / 6 "+(done===6?"✅ All explored":"problems explored");
  button.append(title,ar,status);
  button.addEventListener("click",()=>{const target=problems.find(q=>!progress[q.id])||problems[0];open(target)});
  $("#ratioTopics").append(button);
 });
}
function tableModel(q){
 const table=document.createElement("table");
 const header=document.createElement("tr");
 for(const label of q.columns){const th=document.createElement("th");th.textContent=label;header.append(th)}
 table.append(header);
 q.rows.forEach(([a,b])=>{
  const tr=document.createElement("tr");
  for(const value of [a,b]){
   const td=document.createElement("td");td.textContent=value;
   if(value==="?")td.className="unknown";
   tr.append(td);
  }
  table.append(tr);
 });
 $("#ratioModel").append(table);
}
function lineModel(q){
 const heading=document.createElement("div");heading.className="small";
 heading.textContent="Compare each paired stop on two matching number lines. The question mark is your target.";
 $("#ratioModel").append(heading);
 const top=document.createElement("div");top.style.fontWeight="900";top.style.marginTop="12px";top.textContent=q.columns[0];
 const first=document.createElement("div");first.className="lineRow";first.style.gridTemplateColumns="repeat("+q.rows.length+", minmax(0, 1fr))";
 const secondTitle=document.createElement("div");secondTitle.style.fontWeight="900";secondTitle.style.marginTop="12px";secondTitle.textContent=q.columns[1];
 const second=document.createElement("div");second.className="lineRow";second.style.gridTemplateColumns="repeat("+q.rows.length+", minmax(0, 1fr))";
 for(const [a,b] of q.rows){
  for(const [container,value] of [[first,a],[second,b]]){
   const cell=document.createElement("div");cell.className="linePair";
   if(value==="?"){const span=document.createElement("span");span.textContent="?";span.className="unknown";cell.append(span)}
   else cell.textContent=String(value);
   container.append(cell);
  }
 }
 $("#ratioModel").append(top,first,secondTitle,second);
}
function hundredModel(q){
 const label=document.createElement("p");label.className="small";label.textContent=q.percent+" shaded squares out of 100 show "+q.percent+"% (the model does not show the final quantity).";
 const grid=document.createElement("div");grid.className="hundred";grid.setAttribute("aria-hidden","true");
 for(let i=0;i<100;i++){const tile=document.createElement("span");if(i<q.percent)tile.className="marked";grid.append(tile)}
 $("#ratioModel").append(label,grid);
 tableModel(q);
}
function showFeedback(text,status){
 $("#ratioFeedback").textContent=text;$("#ratioFeedback").className="feedback"+(status?" "+status:"");
}
function open(q){
 active=q;solved=false;
 $("#introPanel").hidden=true;$("#ratioGame").hidden=false;
 $("#topicName").textContent=groups.find(g=>g.id===q.topic).title;
 $("#ratioTitle").textContent="Challenge "+(all.indexOf(q)+1)+" / 24 • "+q.scenario;
 $("#ratioQuestion").textContent=q.question;
 $("#ratioArabic").textContent=q.arabicQuestion;
 $("#ratioModel").replaceChildren();
 if(q.topic==="lines")lineModel(q);else if(q.topic==="percent")hundredModel(q);else tableModel(q);
 $("#ratioAnswers").replaceChildren();
 q.choices.forEach(choice=>{
  const button=document.createElement("button");button.type="button";button.dataset.value=choice;button.textContent=choice;
  button.addEventListener("click",()=>check(choice,button));$("#ratioAnswers").append(button);
 });
 $("#ratioExplanation").hidden=true;$("#ratioHint").hidden=false;$("#ratioNext").hidden=true;
 showFeedback("Choose an answer. You can ask for a hint. • اختر الإجابة، ويمكنك طلب مساعدة.","");
 $("#ratioGame").scrollIntoView({behavior:"auto",block:"start"});
}
function check(choice,button){
 if(!active||solved||button.disabled)return;
 if(choice!==active.answer){
  button.classList.add("bad");button.disabled=true;
  showFeedback("🌱 Not yet. Compare the columns or scales, then try another answer. • حاول مرة أخرى.","retry");return;
 }
 solved=true;button.classList.add("good");
 $("#ratioAnswers").querySelectorAll("button").forEach(b=>b.disabled=true);
 if(!progress[active.id]){progress[active.id]=true;save()}
 update();
 $("#ratioExplanation").textContent="✅ Worked explanation • الشرح: "+active.explanation;
 $("#ratioExplanation").hidden=false;
 $("#ratioHint").hidden=true;$("#ratioNext").hidden=false;
 showFeedback("🎉 Well reasoned! Explore the worked example below. • أحسنت!","correct");
}
$("#ratioHint").addEventListener("click",()=>{if(active&&!solved)showFeedback("💡 "+active.hint+" • ابحث عن عامل الضرب أو قيمة الوحدة.","")});
$("#ratioNext").addEventListener("click",()=>{
 if(!active||!solved)return;
 const groupQuestions=all.filter(q=>q.topic===active.topic);
 const pos=groupQuestions.findIndex(q=>q.id===active.id);
 const next=[...groupQuestions.slice(pos+1),...groupQuestions.slice(0,pos+1)].find(q=>!progress[q.id]);
 if(next)open(next);else{$("#introPanel").hidden=false;$("#ratioGame").hidden=true;$("#introPanel").scrollIntoView({behavior:"auto",block:"start"})}
});
$("#backTopics").addEventListener("click",()=>{
 $("#ratioGame").hidden=true;$("#introPanel").hidden=false;active=null;
 $("#introPanel").scrollIntoView({behavior:"auto",block:"start"});
});
window.addEventListener("pageshow",update);
update();
})();