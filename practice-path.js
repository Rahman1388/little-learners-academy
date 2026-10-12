(()=>{"use strict";
const all=window.LLA_MINI_ACTIVITIES||[];
const subjects=[
 ["math","🔢 Mathematics","الرياضيات"],
 ["english","📖 English","الإنجليزية"],
 ["science","🔬 Science","العلوم"],
 ["life","🌱 Life skills","المهارات الحياتية"],
 ["arts","🎨 Creative patterns","الأنماط"]
];
const questions={math:[4,34,64],english:[71,82,99],science:[105,113,119],life:[125,130,137],arts:[140,144,150]};
const $=s=>document.querySelector(s);
function read(key){try{const x=JSON.parse(localStorage.getItem(key)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
function store(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch{}}
function id(n){return "mini-"+String(n).padStart(3,"0")}
const foundation=read("lla-foundation-check-v1");
const answers=foundation.answers&&typeof foundation.answers==="object"?foundation.answers:{};
const complete=Object.entries(questions).every(([area,ids])=>ids.every(n=>Number.isInteger(answers[id(n)])));
const results=subjects.map(([area,title,ar])=>{
 const selected=questions[area].map(n=>all.find(q=>q.id===id(n)));
 if(selected.some(q=>!q||q.area!==area))throw Error("Missing foundation skill in "+area);
 const right=selected.filter(q=>answers[q.id]===q.answer).length;
 const misses=selected.filter(q=>answers[q.id]!==q.answer);
 const choice=(complete&&misses.length?misses:selected)[0];
 return {area,title,ar,right,activity:choice,needsPractice:complete&&right<3};
});
const sorted=results.slice().sort((a,b)=>complete?(a.right-b.right):0);
const saved=read("lla-practice-path-v1");
const checked=saved.checked&&typeof saved.checked==="object"?saved.checked:{};
const ids=sorted.map(x=>x.area);
const $cards=$("#skillCards"),$tasks=$("#practiceTasks");
$("#sourceStatus").textContent=complete?
 "🧭 Your completed 15-question check helped choose these starting activities. • استخدمنا إجابات الاستكشاف":
 "🌈 Start with one activity from every area. You can optionally take the Foundation Check later. • ابدأ بأنشطة متنوعة";
for(const r of sorted){
 const card=document.createElement("article");card.className="skill"+(r.needsPractice?" focus":"");
 const h=document.createElement("h3");h.textContent=r.title;
 const ar=document.createElement("div");ar.lang="ar";ar.dir="rtl";ar.textContent=r.ar;
 const badge=document.createElement("div");badge.className="chip";
 badge.textContent=!complete?"🌟 Explore together":r.right===3?"✅ Good start — keep exploring":"🌱 Practise this area";
 const score=document.createElement("div");score.className="score";
 score.textContent=complete?"Foundation sample: "+r.right+" / 3":"No Foundation Check score yet";
 const link=document.createElement("a");link.href="./activity-library.html?activity="+encodeURIComponent(r.activity.id);
 link.textContent="▶ Try "+r.activity.title+" • ابدأ التدريب";
 card.append(h,ar,badge,score,link);$cards.append(card);
}
function count(){return ids.filter(k=>checked[k]===true).length}
function renderStatus(){$("#planStatus").textContent="🌟 "+count()+" / 5 steps tried • "+count()+" من ٥ خطوات"}
for(const r of sorted){
 const row=document.createElement("div");row.className="task";
 const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.id="task-"+r.area;checkbox.checked=checked[r.area]===true;
 const label=document.createElement("label");label.htmlFor=checkbox.id;
 const heading=document.createElement("span");heading.textContent=r.title+" • "+r.ar;
 const small=document.createElement("small");small.textContent="Short practice with a grown-up; tick when you've tried it. No test or deadline.";
 const link=document.createElement("a");link.href="./activity-library.html?activity="+encodeURIComponent(r.activity.id);
 link.textContent="▶ "+r.activity.title;
 label.append(heading,small,link);row.append(checkbox,label);$tasks.append(row);
 checkbox.addEventListener("change",()=>{checked[r.area]=checkbox.checked;store("lla-practice-path-v1",{checked});renderStatus()});
}
renderStatus();
})();