(()=>{"use strict";
const activities=window.LLA_MINI_ACTIVITIES||[];
const labels=[
["math","🔢","Mathematics","الرياضيات"],
["english","📖","English","الإنجليزية"],
["science","🔬","Science","العلوم"],
["life","🌱","Life skills","المهارات الحياتية"],
["arts","🎨","Creative patterns","الأنماط الإبداعية"]
];
const $=s=>document.querySelector(s);
function getCompleted(){try{const value=JSON.parse(localStorage.getItem("lla-activity-library-v1")||"{}");return value&&typeof value==="object"&&!Array.isArray(value)?value:{}}catch{return {}}}
function build(){
 const done=getCompleted(),container=$("#skillSubjects");container.replaceChildren();
 let total=0,finished=0;
 labels.forEach(([key,icon,title,ar])=>{
  const group=activities.filter(a=>a.area===key);total+=group.length;
  const correct=group.filter(a=>done[a.id]===true).length;finished+=correct;
  const section=document.createElement("article");section.className="subject";section.dataset.area=key;
  const heading=document.createElement("div");heading.className="name";
  const emoji=document.createElement("span");emoji.textContent=icon;
  const h=document.createElement("h3");h.textContent=title;
  const translation=document.createElement("small");translation.lang="ar";translation.dir="rtl";translation.textContent=ar;
  heading.append(emoji,h,translation);
  const caption=document.createElement("p");caption.className="count";caption.textContent=correct+" of "+group.length+" mini-questions completed";
  section.append(heading,caption);
  const skills=[...new Set(group.map(a=>a.skill))];
  skills.forEach(skill=>{
    const pool=group.filter(a=>a.skill===skill),n=pool.filter(a=>done[a.id]===true).length;
    const item=document.createElement("div");item.className="skill";item.dataset.skill=skill;
    const head=document.createElement("div");head.className="skillhead";
    const name=document.createElement("strong");name.textContent=skill;
    const progress=document.createElement("small");progress.textContent=n+" / "+pool.length;
    const bar=document.createElement("div");bar.className="meter";bar.setAttribute("role","progressbar");
    bar.setAttribute("aria-label",skill+" completed mini-questions");
    bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(pool.length));bar.setAttribute("aria-valuenow",String(n));
    const fill=document.createElement("span");fill.className="fill";fill.style.width=(n/pool.length*100)+"%";bar.append(fill);
    const link=document.createElement("a");link.href="./activity-library.html?subject="+encodeURIComponent(key)+"&skill="+encodeURIComponent(skill);
    link.textContent="▶ Practise this skill • تدرب على هذه المهارة";
    head.append(name,progress);item.append(head,bar,link);section.append(item);
  });
  container.append(section);
 });
 $("#mapSummary").textContent="⭐ "+finished+" / "+total+" mini-challenges completed • "+(total-finished)+" available to explore";
}
build();
window.addEventListener("pageshow",build);
})();