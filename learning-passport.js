(()=>{"use strict";
const $=q=>document.querySelector(q);
const activities=window.LLA_MINI_ACTIVITIES||[];
if(activities.length<151)throw Error("Missing learning activities");
let done={};
try{const value=JSON.parse(localStorage.getItem("lla-activity-library-v1")||"{}");if(value&&typeof value==="object"&&!Array.isArray(value))done=value}catch{}
const stages=[
 {name:"Mathematics",ar:"الرياضيات",icon:"🔢",area:"math",bands:[
  ["Explore","Counting 1–20","العد من ١ إلى ٢٠",a=>a.skill==="Counting"],
  ["Practise","Addition and subtraction","الجمع والطرح",a=>["Addition","Subtraction"].includes(a.skill)],
  ["Grow","Number order and shapes","ترتيب الأعداد والأشكال",a=>["Number order","Shapes"].includes(a.skill)]]},
 {name:"English",ar:"الإنجليزية",icon:"🔤",area:"english",bands:[
  ["Explore","Match pictures with written words","طابق الصور مع الكلمات",a=>a.skill==="Picture words"],
  ["Practise","One and many (plurals)","المفرد والجمع",a=>a.skill==="Plurals"],
  ["Grow","Read complete sentences","قراءة الجمل",a=>a.skill==="Sentences"]]},
 {name:"Science",ar:"العلوم",icon:"🔬",area:"science",bands:[
  ["Explore","Animals, plants and senses","الحيوانات والنباتات والحواس",a=>a.area==="science"&&a.skill!=="Materials"&&parseInt(a.id.slice(-3),10)<=110],
  ["Practise","Materials and living things","المواد والكائنات الحية",a=>a.area==="science"&&parseInt(a.id.slice(-3),10)>=111&&parseInt(a.id.slice(-3),10)<=117],
  ["Grow","Weather, body and environment","الطقس والجسم والبيئة",a=>a.area==="science"&&parseInt(a.id.slice(-3),10)>=118]]},
 {name:"Life Skills",ar:"المهارات الحياتية",icon:"🌱",area:"life",bands:[
  ["Explore","Healthy everyday habits","عادات يومية صحية",a=>a.area==="life"&&parseInt(a.id.slice(-3),10)<=129],
  ["Practise","Safety and fair play","السلامة واللعب العادل",a=>a.area==="life"&&parseInt(a.id.slice(-3),10)>=130&&parseInt(a.id.slice(-3),10)<=134],
  ["Grow","Respect, kindness and resilience","الاحترام واللطف والمحاولة",a=>a.area==="life"&&parseInt(a.id.slice(-3),10)>=135]]},
 {name:"Creative Patterns",ar:"الأنماط الإبداعية",icon:"🎨",area:"arts",bands:[
  ["Explore","Repeating colour patterns","أنماط الألوان",a=>a.area==="arts"&&parseInt(a.id.slice(-3),10)<=143],
  ["Practise","Recognise picture sequences","تسلسل الصور",a=>a.area==="arts"&&parseInt(a.id.slice(-3),10)>=144&&parseInt(a.id.slice(-3),10)<=147],
  ["Grow","Continue mixed patterns","أكمل الأنماط",a=>a.area==="arts"&&parseInt(a.id.slice(-3),10)>=148]]}
];
function stageElements(parent,config,band,i,previousComplete){
 const [name,desc,arabic,test]=band;
 const group=activities.filter(a=>a.area===config.area&&test(a));
 if(!group.length)throw Error("Empty stage: "+config.area+" "+name);
 const achieved=group.filter(a=>done[a.id]===true).length;
 const complete=achieved===group.length;
 const el=document.createElement("article");el.className="stage"+(complete?" complete":previousComplete?" ready":"");
 const marker=document.createElement("div");marker.className="marker";marker.textContent=(complete?"✅ ":"🌱 ")+(i+1)+". "+name;
 const h=document.createElement("h3");h.textContent=desc;
 const ar=document.createElement("div");ar.className="detail";ar.lang="ar";ar.dir="rtl";ar.textContent=arabic;
 const fraction=document.createElement("div");fraction.className="fraction";fraction.textContent=achieved+" / "+group.length;
 const meter=document.createElement("div");meter.className="meter";meter.setAttribute("aria-label",achieved+" of "+group.length+" activities completed");
 const fill=document.createElement("span");fill.style.width=(100*achieved/group.length).toFixed(0)+"%";meter.append(fill);
 const link=document.createElement("a");
 const target=group.find(a=>!done[a.id])||group[0];
 link.href="./activity-library.html?activity="+encodeURIComponent(target.id);
 link.textContent=complete?"🔁 Practise again":"▶ Start learning";
 link.setAttribute("aria-label",name+" "+config.name+" "+(complete?"practise again":"start learning"));
 el.append(marker,h,ar,fraction,meter,link);parent.append(el);
 return complete;
}
function render(){
 $("#passportSubjects").replaceChildren();
 let completedStages=0;
 for(const config of stages){
  const section=document.createElement("section");section.className="subject";
  const heading=document.createElement("div");heading.className="subjectHead";
  const icon=document.createElement("span");icon.className="icon";icon.textContent=config.icon;
  const text=document.createElement("div");
  const h=document.createElement("h2");h.textContent=config.name;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=config.ar;
  text.append(h,ar);heading.append(icon,text);section.append(heading);
  const items=document.createElement("div");items.className="stages";
  let previous=true;
  for(let i=0;i<config.bands.length;i++){
   const finished=stageElements(items,config,config.bands[i],i,previous);
   if(finished)completedStages++;
   previous=finished;
  }
  section.append(items);$("#passportSubjects").append(section);
 }
 $("#passportTotal").textContent="🏅 "+completedStages+" / 15 milestones completed";
}
window.addEventListener("pageshow",()=>{
 try{const value=JSON.parse(localStorage.getItem("lla-activity-library-v1")||"{}");if(value&&typeof value==="object")done=value}catch{}
 render();
});
render();
})();