(()=>{"use strict";
const data=window.LLA_SCHOOL_PATHWAYS,$=q=>document.querySelector(q),KEY="lla-school-focus-v1";
if(!data||!data.grade||!data.sources)throw Error("Curriculum guide data missing");
const system=$("#system"),grade=$("#grade"),subject=$("#subject");
const copy={
 qatar:"🇶🇦 Qatar national pathway: these are broad subject themes, NOT a confirmed mapping to MOEHE's grade-specific standards. Use the school's textbook or weekly plan to choose a matching topic.",
 british:"🇬🇧 England pathway: topic examples are broad connections to published primary programmes of study. Select the actual school Year; school sequencing can vary.",
 american:"🇺🇸 American pathway: maths and literacy themes overlap with US Common Core grades. US science curricula vary by state, district and school; no universal US science alignment is claimed."
};
function load(){
 try{
  const v=JSON.parse(localStorage.getItem(KEY)||"{}");
  return v&&typeof v==="object"&&!Array.isArray(v)?v:{};
 }catch{return {}}
}
const focus=load();
function key(item){return system.value+"-"+grade.value+"-"+subject.value+"-"+item.id}
function save(){try{localStorage.setItem(KEY,JSON.stringify(focus))}catch{}}
function updateFocus(){
 const items=data.grade[grade.value][subject.value],n=items.filter(t=>focus[key(t)]===true).length;
 $("#focusedStatus").textContent=n
  ?"⭐ "+n+" school topic"+(n===1?"":"s")+" marked for revisiting on this phone • "+n+" موضوع للمراجعة"
  :"Tap ⭐ Studying at school beside a topic to mark your current school focus. • حدد ما تدرسه في المدرسة";
}
function render(){
 const items=data.grade[grade.value][subject.value];
 if(!Array.isArray(items))throw Error("Missing subject topics");
 $("#systemExplanation").textContent=copy[system.value];
 $("#coverageTitle").textContent=(system.value==="british"?"Year ":"Grade ")+grade.value+" • "+(subject.options[subject.selectedIndex]?.textContent||"")+" — related practice";
 $("#topicTotal").textContent=String(items.length);
 $("#topicLinked").textContent=String(items.filter(x=>x.href).length);
 $("#topicGaps").textContent=String(items.filter(x=>!x.href).length);
 $("#topicCards").replaceChildren();
 items.forEach(item=>{
  const card=document.createElement("article");card.className="topic"+(!item.href?" gap":"");card.dataset.topic=item.id;
  const label=document.createElement("span");label.className="tag";
  label.textContent=item.href?"🧪 Limited related practice • تدريب محدود":"🛠️ Needs development • قيد التطوير";
  const h=document.createElement("h3");h.textContent=item.title;
  const ar=document.createElement("div");ar.className="ar";ar.lang="ar";ar.dir="rtl";ar.textContent=item.ar;
  const p=document.createElement("p");p.textContent=item.goal;
  const button=document.createElement("button");button.type="button";button.className="focusBtn";
  button.textContent=focus[key(item)]?"⭐ Studying at school — marked • تم التحديد":"☆ Studying at school • ندرسه في المدرسة";
  button.setAttribute("aria-pressed",String(focus[key(item)]===true));
  button.addEventListener("click",()=>{
    if(focus[key(item)])delete focus[key(item)];else focus[key(item)]=true;
    save();button.setAttribute("aria-pressed",String(focus[key(item)]===true));
    button.textContent=focus[key(item)]?"⭐ Studying at school — marked • تم التحديد":"☆ Studying at school • ندرسه في المدرسة";
    updateFocus();
  });
  card.append(label,h,ar,p,button);
  if(item.href){
   const a=document.createElement("a");a.className="link";a.href=item.href;
   a.textContent="▶ Try related practice • جرّب النشاط";
   card.append(a);
  }else{
   const gap=document.createElement("small");gap.className="note";
   gap.textContent="No dedicated grade-level activity yet. This is not a completed lesson.";
   card.append(gap);
  }
  $("#topicCards").append(card);
 });
 updateFocus();
 $("#referenceLinks").replaceChildren();
 const refs=data.sources[system.value]||[];
 refs.forEach(ref=>{
  const a=document.createElement("a");a.href=ref.url;
  a.target="_blank";a.rel="noopener noreferrer";
  a.textContent=ref.label+" ↗";$("#referenceLinks").append(a);
 });
 $("#referenceIntro").textContent="Published reference sources for "+(system.value==="qatar"?"Qatar":system.value==="british"?"England":"US maths and English")+":";
}
for(const el of [system,grade,subject])el.addEventListener("change",render);
render();
})();