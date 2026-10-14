/* Little Learners Academy — Grade 2 mathematics READINESS PILOT.
 * These 24 small, original, reviewable tasks are not a complete Grade 2 syllabus.
 * US Grade 2 Common Core math & England Year 2/3 overlap used as reference;
 * alignment is thematic, not approval or exact age equivalence.
 */
(()=>{"use strict";
const DATA=[];
function add(domain,ref,question,arabic,answers,correct,explanation,visual=""){
 const id="g2-"+String(DATA.length+1).padStart(2,"0");
 if(answers.length!==3||new Set(answers).size!==3||!answers.includes(correct))throw Error("Bad item "+id);
 // Rotate so children cannot learn the position of the correct answer.
 const rotation=DATA.length%3;
 const choices=[...answers.slice(rotation),...answers.slice(0,rotation)];
 DATA.push({id,domain,ref,question,arabic,choices,answer:choices.indexOf(correct),explanation,visual});
}
// A. Base-ten place value and number order: 2.NBT.A, UK Year 2/3 number.
add("place","2.NBT.A","Three tens and four ones make which number?","ثلاث عشرات وأربع آحاد تساوي كم؟",["34","43","304"],"34","30 + 4 = 34. Three groups of ten and four single ones.","🔟 🔟 🔟 • • • •");
add("place","2.NBT.A","In 68, how many tens are there?","كم عدد العشرات في 68؟",["6","8","68"],"6","68 is 6 tens and 8 ones.","68 = 60 + 8");
add("place","2.NBT.A","Which number equals 50 + 7?","ما العدد الذي يساوي 50 + 7؟",["57","75","507"],"57","Five tens make 50; seven ones make 7.","50 + 7");
add("place","2.NBT.A","Which number is greater: 72 or 67?","أي عدد أكبر: 72 أم 67؟",["72","67","They are equal"],"72","72 has 7 tens; 67 has only 6 tens.","72     67");
add("place","2.NBT.A","What comes immediately after 89?","ما العدد الذي يأتي بعد 89 مباشرة؟",["90","88","99"],"90","Counting on one from 89 crosses to the next ten.","88  89  ?");
add("place","2.NBT.A","What is 100 more than 230?","ما العدد الأكبر من 230 بمئة؟",["330","240","130"],"330","230 + 100 = 330. Only the hundreds increase.","230 + 100");
// B. Two-digit mental computation: 2.NBT.B; supporting numbers within 100.
add("arithmetic","2.NBT.B","What is 27 + 15?","كم حاصل 27 + 15؟",["42","32","52"],"42","27 + 10 = 37; then add 5 to get 42.","27 + 15 = ?");
add("arithmetic","2.NBT.B","What is 54 − 18?","كم ناتج 54 − 18؟",["36","46","34"],"36","54 − 10 = 44, then subtract 8 to get 36.","54 − 18 = ?");
add("arithmetic","2.NBT.B","What is 48 + 20?","كم حاصل 48 + 20؟",["68","50","28"],"68","Adding two tens to 48 gives 68.","48 + 20 = ?");
add("arithmetic","2.NBT.B","What is 90 − 30?","كم ناتج 90 − 30؟",["60","70","30"],"60","Nine tens minus three tens is six tens.","90 − 30 = ?");
add("arithmetic","2.NBT.B","What is 35 + 25?","كم حاصل 35 + 25؟",["60","50","70"],"60","30 + 20 = 50 and 5 + 5 = 10, so 60.","35 + 25 = ?");
add("arithmetic","2.NBT.B","What is 76 − 26?","كم ناتج 76 − 26؟",["50","60","40"],"50","76 − 20 = 56; then 56 − 6 = 50.","76 − 26 = ?");
// C. Measurement, time and familiar tools: 2.MD and UK KS1/early KS2.
add("measure","2.MD.A","How many centimetres are in 1 metre?","كم سنتيمتراً في متر واحد؟",["100 cm","10 cm","1000 cm"],"100 cm","1 metre equals 100 centimetres.","📏 1 m = ? cm");
add("measure","2.MD.C","Which phrase means the time 3:30?","ما العبارة التي تصف الوقت 3:30؟",["Half past three","Quarter past three","Three o'clock"],"Half past three","3:30 means 30 minutes after three, or half past three.","🕞 3:30");
add("measure","2.MD.C","Which phrase means the time 4:15?","ما العبارة التي تصف الوقت 4:15؟",["Quarter past four","Half past four","Quarter to four"],"Quarter past four","4:15 is 15 minutes after four: quarter past four.","4:15");
add("measure","2.MD.A","A ribbon is 20 cm long. Add 15 cm. How long is it?","شريط طوله 20 سم، أضف 15 سم. كم يصبح؟",["35 cm","25 cm","45 cm"],"35 cm","20 + 15 = 35 centimetres.","📏 20 cm + 15 cm");
add("measure","2.MD.A","Which tool should you use to measure a pencil's length?","أي أداة تصلح لقياس طول قلم؟",["A ruler","A clock","A thermometer"],"A ruler","Use a ruler to measure length in centimetres.","✏️ 📏");
add("measure","2.MD.A","Which is heavier?","أيهما أثقل؟",["1 kilogram","500 grams","They are equal"],"1 kilogram","One kilogram is 1000 grams. That is more than 500 grams.","⚖️ 1 kg    500 g");
// D. Geometry and data: 2.G; 2.MD.D; equal shares and picture graphs.
add("geometry","2.G.A","How many sides does a hexagon have?","كم ضلعاً للشكل السداسي؟",["6","5","8"],"6","A hexagon has six straight sides.","⬡");
add("geometry","2.G.A","How many corners does a pentagon have?","كم زاوية للشكل الخماسي؟",["5","4","6"],"5","A pentagon has five corners.","⬟");
add("geometry","2.G.A","There are 3 rows of 4 equal squares. How many squares?","ثلاثة صفوف، في كل صف 4 مربعات. كم مجموعها؟",["12","7","10"],"12","4 + 4 + 4 = 12 squares.","🟦🟦🟦🟦\n🟦🟦🟦🟦\n🟦🟦🟦🟦");
add("geometry","2.MD.D","Books: 5. Pens: 3. Bags: 2. Which has the most?","كتب: 5، أقلام: 3، حقائب: 2. أيها أكثر؟",["Books","Pens","Bags"],"Books","Five books is more than three pens or two bags.","📚 5     ✏️ 3     🎒 2");
add("geometry","2.MD.D","A picture chart has 6 dogs and 4 cats. How many more dogs?","ستة كلاب وأربع قطط. كم عدد الكلاب الزائد؟",["2","4","10"],"2","6 − 4 = 2. There are two more dogs.","🐕 6     🐈 4");
add("geometry","2.G.A","A pizza is cut into 4 equal slices. One slice is…","بيتزا مقسمة إلى أربعة أجزاء متساوية. شريحة واحدة تساوي…",["One quarter","One half","One whole"],"One quarter","One of four equal parts is a quarter.","🍕 ÷ 4 equal slices");
if(DATA.length!==24)throw Error("Expected 24 hand-authored pilot tasks; got "+DATA.length);
window.LLA_GRADE2_PILOT=Object.freeze(DATA.map(x=>Object.freeze(x)));
})();