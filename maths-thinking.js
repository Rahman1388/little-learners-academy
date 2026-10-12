(()=>{
"use strict";
const Q=[
["Which set has more?", "أي مجموعة فيها عناصر أكثر؟",["5","7","Equal"],1,"Count each group carefully.","The second group has 7. Seven is greater than five.","⭐ ⭐ ⭐ ⭐ ⭐   |   ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐"],
["How many more to make 10?", "كم نحتاج لنكمل عشرة؟",["3","4","6"],1,"Count the filled dots. Then count the empty spaces.","Six counters plus four empty spaces make a ten frame.","● ● ● ● ●\n● ○ ○ ○ ○"],
["What number is missing: 6, 7, __, 9?", "ما العدد الناقص؟",["8","10","5"],0,"Count forward one number at a time.","After 7 comes 8, followed by 9.","6 → 7 → ? → 9"],
["Three birds sit on a tree. Two more arrive. How many now?", "ثلاثة طيور ووصل طائران، كم أصبح العدد؟",["5","6","1"],0,"Add the two new birds to the first three.","3 + 2 = 5 birds altogether.","🐦 🐦 🐦  +  🐦 🐦"],
["Which shape has three straight sides?", "أي شكل له ثلاثة أضلاع مستقيمة؟",["Triangle","Square","Circle"],0,"Count the sides, not the corners.","A triangle has exactly three straight sides.","🔺 🟦 ⚪"],
["There are 8 apples. Two are eaten. How many remain?", "ثماني تفاحات أكلنا اثنتين، كم تبقى؟",["6","10","4"],0,"Start at eight and count two backwards.","8 − 2 = 6.","🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎"],
["Which number is between 14 and 16?", "ما العدد بين ١٤ و١٦؟",["15","13","17"],0,"Count forward: fourteen, ..., sixteen.","The sequence is 14, 15, 16.","14  —  ?  —  16"],
["A pattern goes red, blue, red, blue. What comes next?", "أحمر، أزرق، أحمر، أزرق. ماذا يلي؟",["Red","Blue","Green"],0,"The colours alternate in pairs.","Every second item repeats, so red comes next.","🔴 🔵 🔴 🔵 ❔"],
["What are the tens and ones in 34?", "كم عشرات وآحاد العدد ٣٤؟",["3 tens, 4 ones","4 tens, 3 ones","34 tens"],0,"The left digit tells the tens.","34 = 30 + 4. Three groups of ten and four ones.","▮▮▮  ●●●●"],
["A class has 9 pencils. Four are blue; the rest are red. How many are red?", "تسعة أقلام، أربعة زرقاء، كم الحمراء؟",["5","4","13"],0,"Find the missing part: 4 + ? = 9.","9 − 4 = 5 red pencils.","✏️ ✏️ ✏️ ✏️  +  ?  = 9"],
["Which expression equals 12?", "أي عملية تساوي ١٢؟",["7 + 5","8 + 2","10 − 2"],0,"Try counting on from each first number.","7 + 5 = 12.","12 = ?"],
["Two groups of 5 make how many?", "مجموعتان من خمسة، كم المجموع؟",["10","7","12"],0,"Count five and then five more.","5 + 5 = 10. Think of a full ten-frame.","●●●●●  +  ●●●●●"],
["What number is 10 more than 27?", "ما العدد الذي يزيد عشرة عن ٢٧؟",["37","28","17"],0,"Add one ten without changing the ones.","27 + 10 = 37.","27 + 10 = ?"],
["Look at 42 and 24. Which is greater?", "أي العددين أكبر ٤٢ أم ٢٤؟",["42","24","Equal"],0,"Compare the tens first: four tens versus two.","42 has four tens, and 24 has two tens.","42  ?  24"],
["Which number sentence shows the same total as 8 + 4?", "أي عملية لها نفس ناتج ٨ + ٤؟",["6 + 6","7 + 4","8 + 2"],0,"Find twelve in a different way.","8 + 4 = 12, and 6 + 6 = 12.","8 + 4 = ?"],
["A bar shows 4 cats and 7 dogs. How many more dogs?", "أربع قطط وسبعة كلاب، كم تزيد الكلاب؟",["3","11","4"],0,"Find the difference between seven and four.","7 − 4 = 3 more dogs.","🐱 ■■■■\n🐶 ■■■■■■■"],
["A bus has 12 passengers. Five get off and three get on. How many now?", "في الحافلة ١٢، نزل ٥ وصعد ٣، كم الآن؟",["10","4","20"],0,"Do it in two steps: subtract 5, then add 3.","12 − 5 = 7; 7 + 3 = 10.","🚌 12 − 5 + 3 = ?"],
["Amina has 6 stickers. Sara has 4 more than Amina. How many does Sara have?", "أمينة معها ٦ ملصقات وسارة معها ٤ أكثر، كم مع سارة؟",["10","2","6"],0,"‘Four more’ means add four.","6 + 4 = 10 stickers.","🌟 6 + 4 = ?"],
["Which is another way to make 15?", "ما طريقة أخرى لتكوين ١٥؟",["10 + 5","9 + 5","10 + 4"],0,"Think of a ten and five ones.","15 is one ten and five ones.","▮ + ●●●●●"],
["Ali needs 20 blocks. He has 13. How many more does he need?", "علي يحتاج ٢٠ مكعباً ولديه ١٣، كم ينقصه؟",["7","6","13"],0,"Count up from 13 to 20.","20 − 13 = 7.","🧱 13 + ? = 20"],
["What comes next: 5, 10, 15, 20, __?", "ما التالي ٥، ١٠، ١٥، ٢٠؟",["25","21","30"],0,"Add five each time.","20 + 5 = 25.","5 → 10 → 15 → 20 → ?"],
["A ribbon is 9 cubes long. Another is 6 cubes long. How much longer is the first?", "شريط بطول ٩ مكعبات وآخر ٦، كم الفرق؟",["3 cubes","15 cubes","6 cubes"],0,"Compare equal-sized units; subtract the shorter length.","9 − 6 = 3 cubes.","📏 ■■■■■■■■■\n📏 ■■■■■■"],
["A triangle and a square have how many sides altogether?", "كم ضلعاً للمثلث والمربع معاً؟",["7","6","8"],0,"Count three sides, then four.","3 + 4 = 7 straight sides.","🔺 + 🟦"],
["A child says 9 + 4 = 9 + 1 + 3. Is this correct?", "هل ٩ + ٤ يساوي ٩ + ١ + ٣؟",["Yes, both are 13","No, they are different","Both are 14"],0,"Break four into one and three; make ten first.","9 + 1 = 10; 10 + 3 = 13. Breaking a number apart keeps the total.","9 + 4  =  9 + 1 + 3"]
];
if(Q.length!==24)throw Error("Maths lab needs 24 curated questions");
const KEY="lla-maths-thinking-v1",read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"?v:{}}catch{return {}}};
const progress=read(),$=s=>document.querySelector(s);
let level=1,current=0,solved=false,wrong=new Set();
const showCount=()=>{$("#score").textContent="🏅 "+Object.keys(progress).filter(k=>progress[k]===true&&Number(k)>=0&&Number(k)<24).length+" / 24 mastered"};
function draw(){
 solved=false;wrong=new Set();
 const item=Q[current];$("#prompt").textContent=item[0];$("#arabic").textContent=item[1];$("#objects").textContent=item[6];
 $("#progress").textContent="Level "+level+" • Challenge "+(current%8+1)+" / 8"+(progress[current]?" ✅ Completed":"");
 $("#options").replaceChildren();
 item[2].forEach((label,i)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.dataset.answer=i;
 b.addEventListener("click",()=>pick(i));$("#options").append(b)});
 $("#feedback").textContent="Choose an answer. Try explaining your thinking! • فكر ثم اختر.";$("#next").hidden=true;$("#explain").hidden=true;
 showCount();
}
function pick(i){
 if(solved||wrong.has(i))return;
 const item=Q[current],button=$("#options").children[i];
 if(i===item[3]){
  solved=true;button.classList.add("correct");
  [...$("#options").children].forEach(b=>b.disabled=true);
  progress[current]=true;try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}
  $("#feedback").textContent="🎉 Excellent thinking! • أحسنت!";$("#next").hidden=false;$("#explain").hidden=false;showCount();
 }else{
  wrong.add(i);button.classList.add("wrong");button.disabled=true;
  $("#feedback").textContent="🌱 Not yet. "+item[4]+" • حاول مرة أخرى.";
 }
}
function setLevel(n){
 level=n;current=(n-1)*8;
 document.querySelectorAll("[data-level]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.level===n)));
 draw();
}
$("#hint").addEventListener("click",()=>{$("#feedback").textContent="💡 "+Q[current][4]});
$("#explain").addEventListener("click",()=>{if(solved)$("#feedback").textContent="🧠 "+Q[current][5]});
$("#next").addEventListener("click",()=>{if(!solved)return;current=(current%8===7)?(level-1)*8:current+1;draw()});
document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>setLevel(+b.dataset.level)));
setLevel(1);
})();