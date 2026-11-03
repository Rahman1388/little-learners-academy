/* Independent Grades 1–6 route: tried-only local checkmarks, never mastery.
 * Existing lesson data, rewards and pronunciation preferences are untouched.
 */
(()=>{
 "use strict";
 const $=q=>document.querySelector(q);
 const SAVE_KEY="lla-three-step-route-v1",GRADE_KEY="lla-route-grade-v1";
 const ROUTES={
  "1":{status:"Broad Grade 1 practice; supplementary, not an official school syllabus.",
   steps:[
    {icon:"🔢",title:"Count on the number line",arabic:"العد على خط الأعداد",focus:"Number sense and moving forwards or backwards",url:"./number-line-trail.html"},
    {icon:"📖",title:"Reading Adventure",arabic:"مغامرة القراءة",focus:"See words and build early English reading confidence",url:"./phonics-adventure.html"},
    {icon:"🌴",title:"Science Sorting Garden",arabic:"حديقة تصنيف العلوم",focus:"Notice living things, senses and materials",url:"./science-sort.html"}
   ]},
  "2":{status:"Grade 2: limited supplementary subject pilots, not a complete curriculum.",
   steps:[
    {icon:"🔢",title:"Grade 2 maths pilot",arabic:"تجربة رياضيات الصف الثاني",focus:"Place value and number reasoning",url:"./grade2-pilot.html"},
    {icon:"📚",title:"Grade 2 English reading",arabic:"قراءة الصف الثاني",focus:"Read and think about simple text",url:"./grade2-english.html"},
    {icon:"🔬",title:"Grade 2 science discovery",arabic:"اكتشاف العلوم للصف الثاني",focus:"Observe, compare and answer simple science questions",url:"./grade2-science.html"}
   ]},
  "3":{status:"Grade 3: limited supplementary subject pilots, not a complete curriculum.",
   steps:[
    {icon:"🧮",title:"Grade 3 maths discovery",arabic:"تجربة رياضيات الصف الثالث",focus:"Start reasoning about multiplication and number facts",url:"./grade3-preview.html"},
    {icon:"📖",title:"Grade 3 English reading",arabic:"قراءة الصف الثالث",focus:"Read short passages and find evidence",url:"./grade3-english.html"},
    {icon:"🔬",title:"Grade 3 science discovery",arabic:"اكتشاف العلوم للصف الثالث",focus:"Explore scientific ideas through simple questions",url:"./grade3-science.html"}
   ]},
  "4":{status:"Grade 4: limited 24-question maths, 18-question reading and 18-question science pilots.",
   steps:[
    {icon:"🧮",title:"Grade 4 maths pilot",arabic:"رياضيات الصف الرابع",focus:"Use place value and operations in short questions",url:"./grade4-math.html"},
    {icon:"📚",title:"Grade 4 English reading",arabic:"قراءة الصف الرابع",focus:"Retrieve details and explain text evidence",url:"./grade4-reading.html"},
    {icon:"🌱",title:"Grade 4 science pilot",arabic:"علوم الصف الرابع",focus:"Learn about habitats, materials and fair tests",url:"./grade4-science.html"}
   ]},
  "5":{status:"Grade 5: limited supplementary maths, English reading and science pilots.",
   steps:[
    {icon:"🧮",title:"Grade 5 maths pilot",arabic:"رياضيات الصف الخامس",focus:"Practise progressively challenging maths questions",url:"./grade5-math.html"},
    {icon:"📘",title:"Grade 5 reading pilot",arabic:"القراءة للصف الخامس",focus:"Read original passages and answer comprehension questions",url:"./grade5-reading.html"},
    {icon:"🔬",title:"Grade 5 science pilot",arabic:"العلوم للصف الخامس",focus:"Investigate science concepts with guided questions",url:"./grade5-science.html"}
   ]},
  "6":{status:"Grade 6: limited supplementary maths, English reading and science pilots.",
   steps:[
    {icon:"🧮",title:"Grade 6 maths starter",arabic:"رياضيات الصف السادس",focus:"Ratios, early algebra and fractions",url:"./grade6-math.html"},
    {icon:"📖",title:"Grade 6 evidence reading",arabic:"فهم المقروء للصف السادس",focus:"Interpret passages and identify evidence",url:"./grade6-reading.html"},
    {icon:"🔬",title:"Grade 6 science discovery",arabic:"العلوم للصف السادس",focus:"Think about ecosystems, electricity and water",url:"./grade6-science.html"}
   ]}
 };
 const load=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch{return null}};
 const save=(k,value)=>{try{localStorage.setItem(k,JSON.stringify(value))}catch{/* The route remains usable without storage. */}};
 const raw=load(SAVE_KEY);
 const progress=raw&&typeof raw==="object"&&!Array.isArray(raw)?raw:{};
 function selectedGrade(){
  const query=new URLSearchParams(location.search).get("grade");
  if(ROUTES[query])return query;
  try{const stored=localStorage.getItem(GRADE_KEY);if(ROUTES[stored])return stored}catch{}
  return "1";
 }
 function marks(grade){
  const value=progress[grade];
  if(!Array.isArray(value))return [false,false,false];
  return [0,1,2].map(i=>value[i]===true);
 }
 function updateStatus(){
  const grade=$("#gradePicker").value,m=marks(grade),n=m.filter(Boolean).length;
  $("#routeProgress").textContent="🌟 "+n+" / 3 steps tried • "+n+" من ٣ خطوات مجرّبة";
  $("#routeFill").style.width=(n/3*100)+"%";
  $("#routeBar").setAttribute("aria-valuenow",String(n));
  $("#finishMessage").hidden=n!==3;
  $("#levelNote").textContent=ROUTES[grade].status+" Tried does not mean mastered. • التجربة ليست إتقاناً";
 }
 function render(){
  const grade=$("#gradePicker").value;
  if(!ROUTES[grade])return;
  const m=marks(grade);
  const list=$("#routeSteps");
  list.replaceChildren();
  ROUTES[grade].steps.forEach((step,i)=>{
   const article=document.createElement("article");
   article.className="lesson"+(m[i]?" tried":"");
   article.dataset.step=String(i);
   const row=document.createElement("div");row.className="headerRow";
   const icon=document.createElement("span");icon.className="emoji";icon.textContent=step.icon;icon.setAttribute("aria-hidden","true");
   const words=document.createElement("div");
   const heading=document.createElement("h3");heading.textContent="Step "+(i+1)+" · "+step.title;
   const arabic=document.createElement("div");arabic.className="ar";arabic.lang="ar";arabic.dir="rtl";arabic.textContent=step.arabic;
   words.append(heading,arabic);row.append(icon,words);
   const goal=document.createElement("p");goal.textContent="Learning focus: "+step.focus;
   const notice=document.createElement("div");notice.className="tag";notice.textContent=m[i]?"✅ Tried • تمّت التجربة":"🌱 Not yet tried • لم تجرّب بعد";
   const actions=document.createElement("div");actions.className="actions";
   const link=document.createElement("a");link.className="launch";link.href=step.url;link.textContent="▶ Open activity • افتح النشاط";
   const button=document.createElement("button");button.className="triedButton";button.type="button";
   button.setAttribute("aria-pressed",String(m[i]));button.textContent=m[i]?"↩ Mark not tried • لم أجرب":"✅ I tried this • جربت هذا";
   button.addEventListener("click",()=>{
    const old=marks(grade);old[i]=!old[i];progress[grade]=old;save(SAVE_KEY,progress);
    article.classList.toggle("tried",old[i]);
    notice.textContent=old[i]?"✅ Tried • تمّت التجربة":"🌱 Not yet tried • لم تجرّب بعد";
    button.setAttribute("aria-pressed",String(old[i]));
    button.textContent=old[i]?"↩ Mark not tried • لم أجرب":"✅ I tried this • جربت هذا";
    updateStatus();
   });
   actions.append(link,button);article.append(row,goal,notice,actions);list.append(article);
  });
  updateStatus();
 }
 $("#gradePicker").value=selectedGrade();
 $("#gradePicker").addEventListener("change",()=>{
  const grade=$("#gradePicker").value;
  if(!ROUTES[grade])return;
  try{localStorage.setItem(GRADE_KEY,grade)}catch{}
  render();
 });
 render();
})();