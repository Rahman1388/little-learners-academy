/* Grade 3 mathematics preview — original, introductory practice questions.
 * 18 short challenges; not an approved Grade 3 syllabus.
 */
(()=>{
"use strict";
const items=[];
const add=(domain,question,arabic,visual,choices,answer,hint,explanation)=>{
 const id="g3-"+String(items.length+1).padStart(2,"0");
 if(choices.length!==3||new Set(choices.map(String)).size!==3||!choices.includes(String(answer)))throw Error("Invalid question "+id);
 items.push({id,domain,question,arabic,visual,choices:choices.map(String),answer:String(answer),hint,explanation});
};
const mult=[
[2,3],[3,4],[4,2],[5,3],[3,5],[4,4]
];
mult.forEach(([groups,each],i)=>add("groups",
  "There are "+groups+" groups of "+each+" stars. How many stars altogether?",
  "هناك "+groups+" مجموعات، في كل مجموعة "+each+" نجوم. كم المجموع؟",
  Array(groups).fill("⭐".repeat(each)).join("   |   "),
  [String(groups*each),String(groups+each),String(groups*each+groups)],String(groups*each),
  "Count each group, or add "+each+" a total of "+groups+" times.",
  groups+" groups × "+each+" stars = "+groups*each+" stars."));
const sharing=[[12,3],[16,4],[18,3],[20,5],[15,3],[24,4]];
sharing.forEach(([total,groups])=>add("sharing",
 "Share "+total+" apples equally among "+groups+" children. How many apples does each child get?",
 "قسّم "+total+" تفاحة بالتساوي على "+groups+" أطفال. كم تفاحة لكل طفل؟",
 "🍎 ".repeat(Math.min(total,24)).trim(),
 [String(total/groups),String(total/groups+1),String(total/groups+2)],String(total/groups),
 "Make "+groups+" groups, then give one apple to each group in turn.",
 total+" ÷ "+groups+" = "+(total/groups)+". Every child receives the same amount."));
const frac=[
["One of two equal parts", "1/2","1/3","1/4","Split something into two equal parts: one part is a half."],
["One of four equal parts","1/4","1/2","1/3","Four equal parts make quarters; one part is one quarter."],
["Two of four equal parts","2/4","1/4","3/4","Two out of four equally sized pieces are selected."],
["Three of four equal parts","3/4","1/4","2/4","Three of four equal sections are selected."],
["One of three equal parts","1/3","1/4","1/2","Three equal parts make thirds."],
["Two of three equal parts","2/3","1/3","3/4","Two out of three equal sections are selected."]
];
frac.forEach(([description,correct,x,y,explanation],i)=>add("fractions",
 "Which fraction means: "+description.toLowerCase()+"?",
 "ما الكسر الذي يعبّر عن: "+["جزء من جزأين متساويين","جزء من أربعة أجزاء متساوية","جزأين من أربعة أجزاء متساوية","ثلاثة أجزاء من أربعة أجزاء متساوية","جزء من ثلاثة أجزاء متساوية","جزأين من ثلاثة أجزاء متساوية"][i]+"؟",
 ["◼ ◻","◼ ◻ ◻ ◻","◼ ◼ ◻ ◻","◼ ◼ ◼ ◻","◼ ◻ ◻","◼ ◼ ◻"][i],
 [correct,x,y],correct,"The bottom number tells us how many EQUAL parts make the whole.",explanation));
if(items.length!==18)throw Error("Expected 18 questions");
window.LLA_GRADE3_PREVIEW=Object.freeze(items);
})();