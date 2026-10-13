/* Little Learners Academy: 24 original Grade 4 mathematics PREVIEW questions.
   Broad international upper-primary themes, not a certified Qatar syllabus. */
(()=>{"use strict";
const items=[];
function add(skill,prompt,ar,choices,answer,hint,explanation,visual=""){
 const id="g4m-"+String(items.length+1).padStart(2,"0");
 if(choices.length!==3||new Set(choices.map(String)).size!==3||!choices.includes(String(answer)))throw Error("Invalid Grade 4 question "+id);
 items.push(Object.freeze({id,skill,prompt,ar,choices:choices.map(String),answer:String(answer),hint,explanation,visual}));
}
add("place","What is the value of the digit 7 in 47,205?","ما قيمة الرقم ٧ في العدد ٤٧٬٢٠٥؟",[ "7,000","700","70" ],"7,000","Look at the thousands place.","The 7 is in the thousands column, so its value is 7,000.","47,205");
add("place","Which is the expanded form of 3,406?","اختر الصيغة التحليلية للعدد ٣٤٠٦.",["3,000 + 400 + 6","3,000 + 40 + 6","300 + 40 + 6"],"3,000 + 400 + 6","Split the number by place value.","3,406 has 3 thousands, 4 hundreds, 0 tens and 6 ones.");
add("place","Round 6,748 to the nearest hundred.","قرب العدد ٦٧٤٨ إلى أقرب مئة.",["6,700","6,800","6,740"],"6,700","Look at the tens digit: 4.","Because the tens digit is 4, round down to 6,700.");
add("place","Which number is greatest?","ما العدد الأكبر؟",["5,902","5,920","5,290"],"5,920","Compare digits from left to right.","5,920 has 9 hundreds and 2 tens; it exceeds the other choices.");
add("place","What is 1,000 more than 8,345?","ما العدد الأكبر من ٨٣٤٥ بألف؟",["8,445","9,345","18,345"],"9,345","Add one thousand to the thousands place.","8,345 + 1,000 = 9,345.");
add("place","Which number is 4,000 + 60 + 9?","أي عدد يساوي ٤٠٠٠ + ٦٠ + ٩؟",["4,609","4,069","4,690"],"4,069","There are zero hundreds.","4 thousands, 0 hundreds, 6 tens and 9 ones make 4,069.");
add("operations","Solve 246 + 135.","احسب ٢٤٦ + ١٣٥.",["371","381","391"],"381","Add ones first, then tens and hundreds.","6+5=11; carry 1 ten. 4+3+1=8 tens, 2+1=3 hundreds: 381.");
add("operations","Find 502 − 178.","احسب ٥٠٢ − ١٧٨.",["324","334","424"],"324","Regroup across the zero tens.","502 − 178 = 324.");
add("operations","What is 9 × 7?","كم يساوي ٩ × ٧؟",["56","63","72"],"63","Think of 7 groups of 9.","9 × 7 = 63.");
add("operations","What is 84 ÷ 7?","كم يساوي ٨٤ ÷ ٧؟",["11","12","14"],"12","7 × ? = 84.","7 × 12 = 84; therefore 84 ÷ 7 = 12.");
add("operations","A class has 6 tables with 4 seats each. How many seats?","في الفصل ٦ طاولات ولكل طاولة ٤ مقاعد، كم مقعداً؟",["20","24","28"],"24","Multiply groups by seats in each group.","6 × 4 = 24 seats.","🪑 🪑 🪑 🪑 × 6");
add("operations","A shop packs 48 dates equally into 6 bags. How many in each bag?","وُزّعت ٤٨ تمرة بالتساوي في ٦ أكياس. كم تمرة في الكيس؟",["6","8","9"],"8","Share into six equal groups.","48 ÷ 6 = 8 dates per bag.","🌴 🇶🇦");
add("fractions","Which fraction is equal to 1/2?","أي كسر يساوي ١/٢؟",["2/4","1/3","3/8"],"2/4","Multiply top and bottom by the same number.","1/2 = 2/4 because both represent half.");
add("fractions","What is 1/4 of 20?","كم يساوي ربع ٢٠؟",["4","5","6"],"5","Split 20 into four equal groups.","20 ÷ 4 = 5.");
add("fractions","Find 2/8 + 3/8.","احسب ٢/٨ + ٣/٨.",["5/8","5/16","6/8"],"5/8","Same denominator: add numerators.","2 eighths + 3 eighths = 5 eighths.");
add("fractions","Which fraction is greatest?","أي كسر هو الأكبر؟",["1/4","3/4","2/4"],"3/4","All have four equal parts.","3/4 is greater than 2/4 and 1/4.");
add("fractions","How many tenths are in 0.6?","كم جزءاً من عشرة في ٠٫٦؟",["6","60","3"],"6","The digit after the decimal point shows tenths.","0.6 is six tenths.");
add("fractions","Which decimal equals 3/10?","أي عدد عشري يساوي ٣/١٠؟",["0.03","0.3","3.0"],"0.3","Three tenths is less than one whole.","3/10 = 0.3.");
add("measure","How many centimetres are in 2 metres?","كم سنتيمتراً في مترين؟",["20","200","2,000"],"200","1 metre equals 100 centimetres.","2 × 100 = 200 cm.");
add("measure","A rectangle is 6 cm long and 4 cm wide. What is its perimeter?","مستطيل طوله ٦ سم وعرضه ٤ سم. ما محيطه؟",["10 cm","20 cm","24 cm"],"20 cm","Add all four side lengths.","6 + 4 + 6 + 4 = 20 cm.","▭ 6 cm × 4 cm");
add("measure","Find the area of a rectangle measuring 5 cm by 3 cm.","أوجد مساحة مستطيل أبعاده ٥ سم و٣ سم.",["8 cm²","15 cm²","16 cm²"],"15 cm²","Area = length × width.","5 × 3 = 15 square centimetres.");
add("measure","A lesson starts at 09:15 and lasts 45 minutes. When does it finish?","بدأ الدرس ٩:١٥ ويستغرق ٤٥ دقيقة. متى ينتهي؟",["09:45","10:00","10:15"],"10:00","15 minutes takes us to 09:30, then add 30 minutes.","09:15 + 45 minutes = 10:00.");
add("measure","A fruit basket weighs 3 kg. How many grams is that?","سلة فاكهة وزنها ٣ كغ. كم غراماً؟",["300 g","3,000 g","30 g"],"3,000 g","1 kg = 1,000 grams.","3 × 1,000 = 3,000 g.");
add("measure","A chart shows 4 red, 6 blue and 3 green balls. How many in total?","يوضح الرسم ٤ كرات حمراء و٦ زرقاء و٣ خضراء. كم المجموع؟",["12","13","14"],"13","Add all three categories.","4 + 6 + 3 = 13 balls.","🔴🔴🔴🔴 🔵🔵🔵🔵🔵🔵 🟢🟢🟢");
if(items.length!==24)throw Error("Grade 4 maths pilot must contain 24 questions");
window.LLA_GRADE4_MATH=Object.freeze(items);
})();