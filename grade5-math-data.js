/* Grade 5 mathematics starter pilot: 24 original supplementary questions.
 * Arabic is supportive text pending educator review. No certified Gulf curriculum claim. */
(()=>{"use strict";
const items=[];
const add=(skill,prompt,ar,choices,answer,hint,explanation)=>{
 const id="g5m-"+String(items.length+1).padStart(2,"0");
 if(choices.length!==3||new Set(choices).size!==3||!choices.includes(answer))throw Error("Invalid "+id);
 items.push(Object.freeze({id,skill,prompt,ar,choices,answer,hint,explanation,visual:""}));
};
add("place","What is the value of 6 in 6,305,120?","ما قيمة الرقم ٦ في العدد المعطى؟",["6,000,000","600,000","60,000"],"6,000,000","Look at the millions column.","The 6 is in the millions place: 6 × 1,000,000 = 6,000,000.");
add("place","Round 487,652 to the nearest thousand.","قرّب العدد إلى أقرب ألف.",["488,000","487,000","490,000"],"488,000","Check the hundreds digit: 6.","The hundreds digit is 6, so 487,652 rounds up to 488,000.");
add("place","Which is the greatest number?","ما العدد الأكبر؟",["70,904","70,940","70,490"],"70,940","Compare place values from the left.","All start with 70 thousand, and 940 is greater than 904 or 490.");
add("place","What is 0.7 as a fraction in tenths?","ما الكسر الذي يمثّل ٠٫٧؟",["7/10","7/100","70/1"],"7/10","Seven tenths means seven parts out of ten.","0.7 = 7 tenths = 7/10.");
add("place","Which is equivalent to 3.45?","ما العدد المساوي لـ ٣٫٤٥؟",["3 + 0.4 + 0.05","3 + 0.04 + 0.5","3 + 4 + 0.5"],"3 + 0.4 + 0.05","Separate units, tenths and hundredths.","3.45 is 3 ones, 4 tenths and 5 hundredths.");
add("place","Which decimal is smallest?","أي عدد عشري هو الأصغر؟",["0.56","0.65","0.60"],"0.56","Compare the tenths, then hundredths.","0.56 has 5 tenths, whereas the other numbers have 6 tenths.");
add("operations","Calculate 4,375 + 2,648.","احسب المجموع.",["7,023","6,923","7,123"],"7,023","Add the columns, regrouping when needed.","4,375 + 2,648 = 7,023.");
add("operations","Find 9,004 − 2,786.","احسب الفرق.",["6,218","6,318","7,218"],"6,218","Regroup carefully across zeros.","9,004 − 2,786 = 6,218.");
add("operations","What is 36 × 7?","كم يساوي ٣٦ × ٧؟",["252","242","262"],"252","Break 36 into 30 and 6.","30 × 7 = 210 and 6 × 7 = 42, so 252.");
add("operations","What is 144 ÷ 12?","كم يساوي ١٤٤ ÷ ١٢؟",["12","14","10"],"12","Find the number multiplied by 12 to make 144.","12 × 12 = 144, so the quotient is 12.");
add("operations","A library has 24 shelves with 15 books each. How many books?","في المكتبة ٢٤ رفاً وعلى كل رف ١٥ كتاباً. ما المجموع؟",["360","340","390"],"360","Multiply 24 × (10 + 5).","24 × 10 = 240 and 24 × 5 = 120; total 360 books.");
add("operations","A class shares 156 pencils equally among 12 groups. How many per group?","قُسّم ١٥٦ قلماً بالتساوي على ١٢ مجموعة. كم قلماً في كل مجموعة؟",["13","12","14"],"13","12 × ? = 156.","12 × 13 = 156; each group gets 13.");
add("fractions","What is 2/3 + 1/6?","كم يساوي ٢/٣ + ١/٦؟",["5/6","3/9","1/2"],"5/6","Convert thirds to sixths.","2/3 = 4/6. Add 1/6 to get 5/6.");
add("fractions","Find 3/4 − 1/8.","احسب ٣/٤ − ١/٨.",["5/8","2/4","1/8"],"5/8","Write quarters as eighths.","3/4 = 6/8 and 6/8 − 1/8 = 5/8.");
add("fractions","Which fraction equals 0.25?","أي كسر يساوي ٠٫٢٥؟",["1/4","1/2","1/5"],"1/4","25 hundredths can be simplified.","0.25 = 25/100 = 1/4.");
add("fractions","What is 3/5 of 40?","كم يساوي ٣/٥ من ٤٠؟",["24","20","30"],"24","Find one fifth then multiply by 3.","40 ÷ 5 = 8; 8 × 3 = 24.");
add("fractions","Calculate 2.5 + 1.75.","احسب ٢٫٥ + ١٫٧٥.",["4.25","3.75","4.15"],"4.25","Line up decimal points.","2.50 + 1.75 = 4.25.");
add("fractions","Calculate 5 − 2.35.","احسب ٥ − ٢٫٣٥.",["2.65","3.65","2.75"],"2.65","Write 5 as 5.00.","5.00 − 2.35 = 2.65.");
add("measure","How many centimetres are in 2.4 metres?","كم سنتيمتراً في ٢٫٤ متر؟",["240 cm","24 cm","2,400 cm"],"240 cm","One metre equals 100 centimetres.","2.4 × 100 = 240 cm.");
add("measure","A rectangle is 8 cm long and 5 cm wide. What is its area?","مستطيل طوله ٨ سم وعرضه ٥ سم. ما مساحته؟",["40 cm²","26 cm²","13 cm²"],"40 cm²","Area is length multiplied by width.","8 × 5 = 40 square centimetres.");
add("measure","What is the perimeter of a square with side 9 cm?","ما محيط مربع طول ضلعه ٩ سم؟",["36 cm","81 cm","18 cm"],"36 cm","A square has four equal sides.","4 × 9 = 36 cm.");
add("measure","A lesson starts at 10:25 and lasts 45 minutes. When does it end?","بدأ الدرس الساعة ١٠:٢٥ واستمر ٤٥ دقيقة. متى ينتهي؟",["11:10","11:00","10:55"],"11:10","Add 35 minutes to reach 11:00, then 10 more.","10:25 + 45 minutes = 11:10.");
add("measure","Four bags weigh 1.5 kg each. What is their total mass?","أربع حقائب وزن كل منها ١٫٥ كجم. ما الوزن الكلي؟",["6 kg","5 kg","6.5 kg"],"6 kg","Multiply mass per bag by the number of bags.","4 × 1.5 kg = 6 kg.");
add("measure","A bar chart shows 12 apples and 7 oranges. How many more apples?","يُظهر الرسم ١٢ تفاحة و٧ برتقالات. كم تزيد التفاحات؟",["5","19","6"],"5","Subtract orange count from apple count.","12 − 7 = 5 more apples.");
if(items.length!==24)throw Error("Grade 5 pilot requires 24 questions");
window.LLA_GRADE5_MATH=Object.freeze(items);
})();