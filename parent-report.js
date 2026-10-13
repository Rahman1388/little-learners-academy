/* Device-only parent learning report. No uploads, names or mastery claims. */
(()=>{"use strict";
const $=s=>document.querySelector(s),data=window.LLA_MINI_ACTIVITIES||[];
if(data.length!==151)throw Error("Missing Grade 1 activity data");
const groups=[["math","🔢 Mathematics","الرياضيات"],["english","🔤 English","الإنجليزية"],["science","🔬 Science","العلوم"],["life","🌱 Life Skills","المهارات الحياتية"],["arts","🎨 Creative Patterns","الأنماط الإبداعية"]];
const read=k=>{try{const v=JSON.parse(localStorage.getItem(k)||"{}");return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}catch{return {}}};
const date=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric"}).format(new Date());
$("#reportDate").textContent=date;
let plain="";
const countPilot=(key,prefix,max)=>{
 const v=read(key);
 return Math.min(max,Object.keys(v).filter(k=>k.startsWith(prefix)&&/^[0-9]+$/.test(k.slice(prefix.length))&&v[k]===true).length);
};
function refresh(){
 const completed=read("lla-activity-library-v1"),insights=read("lla-practice-insights-v1"),confidence=read("lla-practice-confidence-v1");
 const done=data.filter(a=>completed[a.id]===true).length;
 let right=0,wrong=0;
 for(const a of data){
  const x=insights[a.id]&&typeof insights[a.id]==="object"?insights[a.id]:{};
  right+=Math.min(999,Math.max(0,Number(x.correct)||0));
  wrong+=Math.min(999,Math.max(0,Number(x.incorrect)||0));
 }
 $("#completedCount").textContent=done+" / 151";
 $("#rightCount").textContent=right.toLocaleString("en-GB");
 $("#retryCount").textContent=wrong.toLocaleString("en-GB");
 const lines=["Little Learners Academy — Family Learning Report","Prepared: "+date,
   "Grade 1 mini-challenges: "+done+" / 151",
   "Recorded correct attempts: "+right,"Recorded incorrect attempts: "+wrong,"Grade 1 subjects:"];
 $("#subjectProgress").replaceChildren();
 for(const [id,name,arabic] of groups){
  const all=data.filter(a=>a.area===id),n=all.filter(a=>completed[a.id]===true).length;
  const box=document.createElement("div");box.className="subject";
  const heading=document.createElement("div");heading.className="subjectHead";
  const text=document.createElement("span");text.textContent=name+" • "+arabic;
  const value=document.createElement("span");value.textContent=n+" / "+all.length;
  heading.append(text,value);
  const bar=document.createElement("div");bar.className="progressbar";
  bar.setAttribute("role","progressbar");bar.setAttribute("aria-label",name+" completed");
  bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuenow",String(n));bar.setAttribute("aria-valuemax",String(all.length));
  const fill=document.createElement("span");fill.style.width=(100*n/all.length)+"%";
  bar.append(fill);box.append(heading,bar);$("#subjectProgress").append(box);
  lines.push("- "+name+": "+n+" / "+all.length);
 }
 const requested=data.filter(a=>confidence[a.id]==="review");
 $("#reflectionCount").textContent="🌱 "+requested.length+" activity"+(requested.length===1?"":"ies")+" marked for another practice round";
 lines.push("Learner-requested reviews: "+requested.length+" (optional self-report, not a grade)");
 const waiting=data.filter(a=>completed[a.id]!==true);
 waiting.sort((a,b)=>(Number(insights[b.id]?.incorrect)||0)-(Number(insights[a.id]?.incorrect)||0));
 const suggestions=[],seen=new Set();
 for(const a of requested){suggestions.push(a);seen.add(a.area);if(suggestions.length===3)break}
 for(const a of waiting){if(suggestions.length===3)break;if(!seen.has(a.area)&&!suggestions.includes(a)){suggestions.push(a);seen.add(a.area)}}
 for(const a of waiting){if(suggestions.length===3)break;if(!suggestions.includes(a))suggestions.push(a)}
 $("#focusCards").replaceChildren();lines.push("Suggested next practice:");
 if(!suggestions.length){
  const p=document.createElement("p");p.textContent="🌟 All Grade 1 mini-challenges explored! Enjoy repeating favourites together.";
  $("#focusCards").append(p);lines.push("- Review favourite activities");
 }
 for(const a of suggestions){
  const tries=Math.max(0,Number(insights[a.id]?.incorrect)||0);
  const card=document.createElement("article");
  const heading=document.createElement("strong");heading.textContent=a.icon+" "+a.title;
  const ar=document.createElement("p");ar.lang="ar";ar.dir="rtl";ar.textContent=a.ar;
  const note=document.createElement("p");note.textContent=confidence[a.id]==="review"?
    "🌱 The learner chose to practise this activity again (optional self-report).":tries>0?"Revisit after "+tries+" recorded incorrect attempt"+(tries===1?"":"s")+".":"An unfinished activity to explore together.";
  const link=document.createElement("a");link.className="go";link.textContent="▶ Practise • تدرّب";
  link.href="./activity-library.html?activity="+encodeURIComponent(a.id);
  card.append(heading,ar,note,link);$("#focusCards").append(card);
  lines.push("- "+a.area+" / "+a.skill+": "+a.title+(confidence[a.id]==="review"?" (learner requested another try)":tries>0?" (review suggested)":" (not completed)"));
 }
 const g2=[countPilot("lla-grade2-pilot-v1","g2-",24),countPilot("lla-grade2-english-v1","g2e-",24),countPilot("lla-grade2-science-v1","g2s-",18)];
 const g3=[countPilot("lla-grade3-preview-v1","g3-",18),countPilot("lla-grade3-english-v1","g3e-",18),countPilot("lla-grade3-science-v1","g3s-",18)];
 const c2=g2.reduce((a,b)=>a+b,0),c3=g3.reduce((a,b)=>a+b,0);
 $("#grade2Count").textContent=c2+" / 66 introductory questions completed";
 $("#grade2Breakdown").textContent="Maths "+g2[0]+"/24 • Reading "+g2[1]+"/24 • Science "+g2[2]+"/18";
 $("#grade3Count").textContent=c3+" / 54 introductory questions completed";
 $("#grade3Breakdown").textContent="Maths "+g3[0]+"/18 • Reading "+g3[1]+"/18 • Science "+g3[2]+"/18";
 const story=read("lla-math-story-v1");
 const unique=new Set(Array.isArray(story.done)?story.done.filter(i=>Number.isInteger(i)&&i>=0&&i<24):[]);
 $("#storySummary").textContent="🏡 Math Story Village: "+unique.size+" / 24 stories completed.";
 lines.push("Grade 2 pilot questions: "+c2+" / 66 (maths "+g2[0]+", reading "+g2[1]+", science "+g2[2]+")");
 lines.push("Grade 3 pilot questions: "+c3+" / 54 (maths "+g3[0]+", reading "+g3[1]+", science "+g3[2]+")");
 lines.push("Math Story Village: "+unique.size+" / 24");
 lines.push("These counts show practice, not school grades, certified alignment or demonstrated mastery.");
 lines.push("Mixed review quests reuse existing questions and are not additional unique tasks.");
 lines.push("Only share this summary with someone you trust.");
 plain=lines.join("\n");
 if(!$("#copyText").hidden)$("#copyText").value=plain;
}
function showText(){
 const field=$("#copyText");field.hidden=false;field.value=plain;field.focus();field.select();
 $("#copyStatus").textContent="Text summary ready for copying. • الملخص جاهز للنسخ";
}
$("#showReportText").addEventListener("click",showText);
$("#copyReport").addEventListener("click",()=>{
 if(navigator.clipboard&&typeof navigator.clipboard.writeText==="function"){
  navigator.clipboard.writeText(plain)
   .then(()=>{$("#copyStatus").textContent="✅ Copied. Share only if you choose. • تم النسخ"})
   .catch(showText);
 }else showText();
});
$("#printReport").addEventListener("click",()=>window.print());
window.addEventListener("pageshow",refresh);
refresh();
})();