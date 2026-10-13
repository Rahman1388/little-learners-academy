/* Grade 6 mathematics LIMITED supplementary starter pilot.
 * English primary; draft Arabic question supports not educator approved.
 * Original items; no child accounts, tracking, audio or camera access. */
(()=>{"use strict";
const items=[];
function add(skill,prompt,ar,choices,answer,hint,explanation){
 const id="g6m-"+String(items.length+1).padStart(2,"0");
 if(choices.length!==3||new Set(choices).size!==3||!choices.includes(answer))throw Error("Invalid "+id);
 items.push(Object.freeze({id,skill,prompt,ar,choices,answer,hint,explanation,visual:""}));
}
add("ratios","A recipe uses 2 cups of rice for every 3 cups of water. How much water for 4 cups of rice?","تستخدم الوصفة كوبين من الأرز مقابل ثلاثة أكواب من الماء. كم كوباً من الماء نحتاج لأربعة أكواب من الأرز؟",["6 cups","5 cups","8 cups"],"6 cups","Double both parts of the ratio.","2:3 becomes 4:6, so 6 cups of water are needed.");
add("ratios","There are 12 blue beads and 8 yellow beads. What is the blue-to-yellow ratio in simplest form?","هناك ١٢ خرزة زرقاء و٨ خرزات صفراء. ما أبسط نسبة للأزرق إلى الأصفر؟",["3:2","2:3","12:2"],"3:2","Divide both quantities by 4.","12:8 simplifies to 3:2.");
add("ratios","Five notebooks cost 20 QAR. At the same price, how much do 3 notebooks cost?","تكلفة خمسة دفاتر ٢٠ ريالاً قطرياً. كم تكلف ثلاثة دفاتر بالسعر نفسه؟",["12 QAR","15 QAR","8 QAR"],"12 QAR","Find the cost per notebook first.","20 ÷ 5 = 4 QAR per notebook; 3 × 4 = 12 QAR.");
add("ratios","A class has 18 pupils; 6 are in the art group. What fraction are in the art group?","في الصف ١٨ طالباً، منهم ٦ في مجموعة الفن. ما الكسر الذي يمثلهم؟",["1/3","1/6","2/3"],"1/3","Simplify 6 out of 18.","Six pupils out of eighteen are in the art group. Dividing both by six gives 1/3.");
add("ratios","A map scale is 1 cm to 2 km. What distance does 5 cm represent?","مقياس الخريطة ١ سم لكل ٢ كم. ماذا تمثل ٥ سم؟",["10 km","7 km","2.5 km"],"10 km","Multiply the scale distance by five.","5 × 2 km = 10 km.");
add("ratios","Three out of five library books are fiction. What percentage are fiction?","ثلاثة كتب من كل خمسة في المكتبة قصص. ما النسبة المئوية للقصص؟",["60%","30%","80%"],"60%","Convert three fifths to hundredths.","3/5 = 60/100 = 60%.");
add("algebra","Solve x + 9 = 23.","حل المعادلة س + ٩ = ٢٣.",["14","12","32"],"14","Subtract 9 from both sides.","x = 23 − 9 = 14.");
add("algebra","Solve 4n = 28.","حل المعادلة ٤ن = ٢٨.",["7","24","32"],"7","Divide 28 by 4.","n = 28 ÷ 4 = 7.");
add("algebra","Which expression means 'five more than twice a number x'?","أي تعبير يعني خمسة أكثر من ضعف س؟",["2x + 5","5x + 2","2(x + 5)"],"2x + 5","Twice x is 2x, then add five.","The expression is 2x + 5.");
add("algebra","Find the next number: 3, 7, 11, 15, __.","ما العدد التالي: ٣، ٧، ١١، ١٥، __؟",["19","18","21"],"19","Find the constant increase.","Add 4 to 15 to get 19.");
add("algebra","For y = 3x + 2, what is y when x = 4?","إذا كانت ص = ٣س + ٢، فما قيمة ص عندما س = ٤؟",["14","18","12"],"14","Substitute 4 for x.","y = 3 × 4 + 2 = 14.");
add("algebra","Solve 2x + 3 = 15.","حل المعادلة ٢س + ٣ = ١٥.",["6","9","5"],"6","First subtract 3, then divide by 2.","2x = 12, so x = 6.");
add("fractions","Calculate 3/4 + 1/8.","احسب ٣/٤ + ١/٨.",["7/8","4/12","1/2"],"7/8","Convert quarters into eighths.","3/4 = 6/8; add 1/8 to get 7/8.");
add("fractions","Find 2/3 of 36.","أوجد ثلثي ٣٦.",["24","18","27"],"24","First find one third of 36.","36 ÷ 3 = 12; 12 × 2 = 24.");
add("fractions","What is 0.375 as a fraction in simplest form?","ما الكسر المبسط الذي يساوي ٠٫٣٧٥؟",["3/8","3/4","37/100"],"3/8","Write 375/1000 and simplify.","375/1000 = 3/8.");
add("fractions","Calculate 2.4 × 0.5.","احسب ٢٫٤ × ٠٫٥.",["1.2","12","0.12"],"1.2","Multiplying by 0.5 means finding half.","Half of 2.4 is 1.2.");
add("fractions","A 20 QAR book is discounted by 25%. What is the sale price?","كتاب ثمنه ٢٠ ريالاً، عليه خصم ٢٥٪. ما سعره بعد الخصم؟",["15 QAR","5 QAR","18 QAR"],"15 QAR","Find one quarter of 20 and subtract it.","25% of 20 is 5 QAR; 20 − 5 = 15 QAR.");
add("fractions","Which number is greatest?","أي عدد هو الأكبر؟",["0.8","0.75","0.705"],"0.8","Compare tenths, then hundredths.","0.8 = 0.800, which is greater than 0.750 and 0.705.");
add("measure","A rectangle is 12 cm by 7 cm. What is its area?","مستطيل طوله ١٢ سم وعرضه ٧ سم. ما مساحته؟",["84 cm²","38 cm²","19 cm²"],"84 cm²","Area = length × width.","12 × 7 = 84 square centimetres.");
add("measure","A triangle has base 10 cm and height 6 cm. What is its area?","مثلث قاعدته ١٠ سم وارتفاعه ٦ سم. ما مساحته؟",["30 cm²","60 cm²","16 cm²"],"30 cm²","Triangle area is half the rectangle area.","1/2 × 10 × 6 = 30 cm².");
add("measure","A rectangular box measures 4 cm × 3 cm × 2 cm. What is its volume?","صندوق أبعاده ٤ سم × ٣ سم × ٢ سم. ما حجمه؟",["24 cm³","18 cm³","9 cm³"],"24 cm³","Volume = length × width × height.","4 × 3 × 2 = 24 cubic centimetres.");
add("measure","The temperatures are 20°C, 22°C and 24°C. What is the mean?","درجات الحرارة ٢٠ و٢٢ و٢٤ مئوية. ما المتوسط؟",["22°C","24°C","20°C"],"22°C","Add the values and divide by 3.","(20 + 22 + 24) ÷ 3 = 22°C.");
add("measure","What is the perimeter of an equilateral triangle with side 9 cm?","ما محيط مثلث متساوي الأضلاع طول ضلعه ٩ سم؟",["27 cm","18 cm","81 cm"],"27 cm","Add all three equal sides.","3 × 9 cm = 27 cm.");
add("measure","A bag contains 3 red and 2 blue marbles. What is the probability of picking blue?","كيس فيه ٣ كرات حمراء وكرتان زرقاوان. ما احتمال سحب كرة زرقاء؟",["2/5","3/5","1/2"],"2/5","Count blue marbles out of all marbles.","There are 2 blue marbles among 5 total, so probability = 2/5.");
if(items.length!==24)throw Error("Grade 6 pilot requires 24 questions");
window.LLA_GRADE6_MATH=Object.freeze(items);
})();
