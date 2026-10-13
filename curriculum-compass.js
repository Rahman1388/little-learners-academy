/* Curriculum Compass: transparent thematic reference, NOT standards certification.
 * Counts are verified against existing Grade 1–6 activity modules.
 * Update with qualified educator review and a school's actual scheme of work.
 */
(()=>{
"use strict";
const $=s=>document.querySelector(s);
const SUBJECTS=[
 {key:"math",name:"Mathematics",ar:"الرياضيات",icon:"🔢"},
 {key:"english",name:"English literacy",ar:"اللغة الإنجليزية",icon:"📖"},
 {key:"science",name:"Science",ar:"العلوم",icon:"🔬"}
];
const grades={
 1:{
  label:"Broad supplementary foundation • 151 mini-challenges across five areas",
  topics:{
   math:{count:70,description:"Counting objects to 20, one more, number order, addition and subtraction, shape attributes.",gap:"Develop ten-frame/place-value understanding, measurement, time and data investigations with multiple representations.",url:"./activity-library.html?subject=math"},
   english:{count:34,description:"Picture-word recognition, plurals, punctuation and simple sentence sense.",gap:"Add structured phoneme blending, spelling, reading fluency, independent writing and varied comprehension passages; pronunciation remains under review.",url:"./activity-library.html?subject=english"},
   science:{count:20,description:"Living things, senses, plant needs, materials and the environment.",gap:"Add practical observation, prediction, simple tests and careful recording of findings.",url:"./activity-library.html?subject=science"}
  },
  gaps:["Early literacy needs a coherent teach–practise–review phonics sequence and teacher-checked pronunciation.","Maths needs concrete models, place value, measurement, money, clock time and richer explanations across the whole progression.","Life skills (15) and creative patterns (12) support learning, but do not substitute for the separate national subjects."]
 },
 2:{
  label:"Limited readiness pilots • 66 questions across three subjects",
  topics:{
   math:{count:24,description:"Tens and ones, two-digit arithmetic, measurement tools and basic geometry/data reasoning.",gap:"More counting, regrouping strategies, multiplication foundations, mixed word problems and varied measurement are needed.",url:"./grade2-pilot.html"},
   english:{count:24,description:"Short reading passages, word meaning, inference and simple written language.",gap:"Broader phonics/spelling, vocabulary, independent writing and reading-fluency practice are still needed.",url:"./grade2-english.html"},
   science:{count:18,description:"Plants, properties of materials, habitats and investigative observation.",gap:"More hands-on investigations, topic breadth and teacher-reviewed evidence are needed.",url:"./grade2-science.html"}
  },
  gaps:["Confirm the school's Grade 2 textbook sequence before implying chapter-by-chapter alignment.","English and science are small pilots; 24 questions are not a year's lessons or curriculum completion.","Draft Arabic prompts need proofreading by a competent Arabic educator."]
 },
 3:{
  label:"Limited introductory pilots • 54 questions across three subjects",
  topics:{
   math:{count:18,description:"Equal groups, early multiplication and fractions of equal parts.",gap:"Build multiplication/division fluency, place value, perimeter, time, measurement and two-step problems.",url:"./grade3-preview.html"},
   english:{count:18,description:"Reading comprehension, contextual vocabulary, grammar and sentence understanding.",gap:"Add full texts, composition, spelling, grammar practice and evidence-based comprehension progression.",url:"./grade3-english.html"},
   science:{count:18,description:"Plant growth, forces/magnets and making observations fairly.",gap:"Expand investigations, recording observations, animals, rocks/light and the specific school scheme.",url:"./grade3-science.html"}
  },
  gaps:["The Grade 3 pilots are too small to cover a complete school textbook.","Build a stepped progression from Grade 2 rather than assuming every child is ready for Grade 3 difficulty.","Qatar-school objectives and Arabic translations still need independent review."]
 },
 4:{
  label:"Limited pilots • 60 questions across three subjects",
  topics:{
   math:{count:24,description:"Place value, calculations, fractions, measure and data problems.",gap:"Deepen written methods, times tables, multi-step reasoning, fractions/decimals and geometry.",url:"./grade4-math.html"},
   english:{count:18,description:"Three original passages with literal and inferential reading questions.",gap:"Extend writing, vocabulary, grammar, longer reading and independent evidence-based responses.",url:"./grade4-reading.html"},
   science:{count:18,description:"Habitats/food chains and other short concept-based science passages.",gap:"Add practical investigations, subject coverage checks and authentic recording of evidence.",url:"./grade4-science.html"}
  },
  gaps:["Grade 4 has only sample question sets, not a complete term-by-term syllabus.","The British and American frameworks vary in topic sequencing and assessment format.","Teacher-reviewed maths explanations and Arabic checks remain outstanding."]
 },
 5:{
  label:"Limited pilots • 60 questions across three subjects",
  topics:{
   math:{count:24,description:"Larger place-value numbers, calculations and applied measurement/data reasoning.",gap:"Extend deeper fractions/decimals, volume, percentages, reasoning, problem solving and computational fluency.",url:"./grade5-math.html"},
   english:{count:18,description:"Three original reading passages and comprehension questions.",gap:"Develop sustained reading, writing, grammar, evidence-based explanations and diverse genres.",url:"./grade5-reading.html"},
   science:{count:18,description:"Ecosystems and other short science investigation themes.",gap:"Extend properties/changes of materials, forces, Earth-space themes and experimental recording as appropriate to school.",url:"./grade5-science.html"}
  },
  gaps:["The Grade 5 question pilots are supplementary and not equivalents to textbooks or end-of-year tests.","More practice needs to move from recognition questions to explanations and independent application.","A selected school pathway and qualified educator should review the topic-by-topic match."]
 },
 6:{
  label:"Very limited starter • 24 mathematics questions only",
  topics:{
   math:{count:24,description:"Ratios/rates, introductory algebra, fractions/decimals, geometry, measurement and data.",gap:"Missing number systems depth, operations with rational numbers, multi-step problems, visual models, wider geometry/statistics and full teacher review.",url:"./grade6-math.html"},
   english:{count:0,description:"No dedicated Grade 6 English activity bank has been released.",gap:"Plan reading comprehension, vocabulary, grammar, structured composition, critical reading and writing.",url:""},
   science:{count:0,description:"No dedicated Grade 6 science activity bank has been released.",gap:"Plan investigations and content after choosing the school's curriculum pathway and topic order.",url:""}
  },
  gaps:["Grade 6 currently has only a 24-question maths pilot—no Grade 6 English or science release.","Grade 6 maths has partial thematic overlap with published ratio/algebra/fractions/geometry themes; it is not standards coverage or an assessment of mastery.","Formal national subjects, parent usability reviews, teacher maths review and Arabic proofreading are still pending."]
 }
};
const pathwayText={
 qatar:"Qatar schools may use a national or an approved international school curriculum, with compulsory Arabic, Islamic Studies and Qatar History under applicable rules. This page cannot certify alignment to a particular school's syllabus; compare against its official term plan.",
 british:"British schools use England's Key Stages/Year group programmes with school-level sequencing. UK Year groups are not automatically the same numbers or ages as US/Qatar Grades. The topics here show broad overlap only, not year-by-year standard codes.",
 american:"American schools may draw on Common Core for maths and English language arts, but adoption and implementation vary. Science often follows a separate state or school programme. This is a thematic check, not a verified individual-standard crosswalk."
};
function pickGrade(){
 const query=new URLSearchParams(location.search).get("grade");
 return ["1","2","3","4","5","6"].includes(query)?query:"1";
}
function render(){
 const grade=$("#grade").value,school=$("#pathway").value,data=grades[grade];
 $("#gradeSummary").textContent="🎓 Grade "+grade+" • "+data.label;
 $("#pathwaySummary").textContent=pathwayText[school];
 $("#coverageGrid").replaceChildren();
 for(const subject of SUBJECTS){
  const info=data.topics[subject.key];
  const card=document.createElement("article");
  card.className="card"+(!info.count?" notYet":"");
  const name=document.createElement("h3");name.textContent=subject.icon+" "+subject.name;
  const ar=document.createElement("div");ar.lang="ar";ar.dir="rtl";ar.className="label";ar.textContent=subject.ar;
  const count=document.createElement("div");count.className="count";count.textContent=String(info.count);
  const status=document.createElement("div");status.className="status";
  status.textContent=info.count?"🧪 Existing practice questions • تمارين متاحة":"🔒 Not yet released • غير متاح بعد";
  const label=document.createElement("div");label.className="label";label.textContent="Existing mini-questions • أسئلة تدريبية";
  const currentLabel=document.createElement("h4");currentLabel.textContent="✅ Topics currently included";
  const summary=document.createElement("p");summary.textContent=info.description;
  const gapLabel=document.createElement("h4");gapLabel.textContent="🧩 Important gaps";
  const gaps=document.createElement("p");gaps.textContent=info.gap;
  card.append(name,ar,count,label,status,currentLabel,summary,gapLabel,gaps);
  if(info.count&&info.url){
   const link=document.createElement("a");link.href=info.url;link.textContent="▶ Try existing practice • ابدأ التمارين";
   card.append(link);
  }
  $("#coverageGrid").append(card);
 }
 $("#gradeGaps").replaceChildren();
 data.gaps.forEach(gap=>{const item=document.createElement("li");item.textContent=gap;$("#gradeGaps").append(item)});
}
$("#grade").value=pickGrade();
$("#grade").addEventListener("change",()=>{
 const params=new URLSearchParams(location.search);
 params.set("grade",$("#grade").value);
 history.replaceState(null,"",location.pathname+"?"+params.toString());
 render();
});
$("#pathway").addEventListener("change",render);
render();
})();