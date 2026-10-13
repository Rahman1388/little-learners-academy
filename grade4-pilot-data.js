/* Grade 4 mathematics pilot. Original practice; not an official syllabus. */
(()=>{"use strict";
const items=[];
function add(domain,question,arabic,visual,choices,answer,hint,explanation){
 const id="g4-"+String(items.length+1).padStart(2,"0");
 if(choices.length!==3||new Set(choices.map(String)).size!==3||!choices.map(String).includes(String(answer)))throw Error("Invalid Grade 4 question "+id);
 items.push({id,domain,question,arabic,visual,choices:choices.map(String),answer:String(answer),hint,explanation});
}
// Two-step calculations: concrete scenarios; each explanation shows the method.
add("problems","A library has 24 books. It receives 18 more and lends out 9. How many remain?","في المكتبة ٢٤ كتاباً. وصل ١٨ كتاباً وأُعير ٩ كتب. كم بقي؟","📚 24 + 18 − 9",["33","42","51"],"33","Add the new books first, then subtract the books lent out.","24 + 18 = 42, then 42 − 9 = 33 books.");
add("problems","Four tables each seat 6 children. If 5 children leave, how many remain?","أربع طاولات، على كل منها ٦ أطفال. غادر ٥. كم بقي؟","🪑 4 groups × 6 − 5",["19","24","29"],"19","Find the total before subtracting the children who leave.","4 × 6 = 24; 24 − 5 = 19 children.");
add("problems","A farmer collects 36 dates on Monday and 28 on Tuesday. They pack them in bags of 8. How many bags?","جمع المزارع ٣٦ تمرة ثم ٢٨ تمرة ووضعها في أكياس من ٨ تمرات. كم كيساً؟","🌴 (36 + 28) ÷ 8",["8","7","9"],"8","Add both days, then divide into equal groups of 8.","36 + 28 = 64; 64 ÷ 8 = 8 bags.");
add("problems","There are 7 boxes of 5 pencils. A teacher gives away 12 pencils. How many are left?","هناك ٧ علب، في كل علبة ٥ أقلام. وزّع المعلم ١٢ قلماً. كم بقي؟","✏️ 7 × 5 − 12",["23","35","47"],"23","Multiply to find the original number of pencils.","7 × 5 = 35; 35 − 12 = 23 pencils.");
add("problems","Three classes plant 12 seeds each. Then they plant 9 extra seeds. How many seeds altogether?","زرعت ٣ صفوف ١٢ بذرة لكل صف ثم ٩ بذور إضافية. ما المجموع؟","🌱 3 × 12 + 9",["45","36","48"],"45","Find the number from the three classes first.","3 × 12 = 36; 36 + 9 = 45 seeds.");
add("problems","A shop has 90 apples. It sells 27 in the morning and 35 after lunch. How many apples remain?","في المتجر ٩٠ تفاحة. باع ٢٧ ثم ٣٥. كم بقي؟","🍎 90 − 27 − 35",["28","38","62"],"28","Combine the apples sold, then subtract from 90.","27 + 35 = 62; 90 − 62 = 28 apples.");
// Equivalence and comparing fractions; keep the whole explicit.
add("fractions","Which fraction is equal to one half?","أي كسر يساوي النصف؟","◼◻  =  ◼◼◻◻",["2/4","1/4","3/4"],"2/4","Multiply both the top and bottom numbers by 2.","1/2 = 2/4 because both represent half of one whole.");
add("fractions","A ribbon has 8 equal sections. Four are coloured. What fraction is coloured?","الشريط مقسّم إلى ٨ أجزاء متساوية، ٤ منها ملوّنة. ما الكسر؟","🟦🟦🟦🟦⬜⬜⬜⬜",["4/8","4/4","1/8"],"4/8","Count coloured sections over all equal sections.","4 coloured parts out of 8 total give 4/8 (which equals 1/2).");
add("fractions","Which fraction is larger: 3/4 or 1/4?","أي الكسرين أكبر: ٣/٤ أم ١/٤؟","3/4     1/4",["3/4","1/4","Equal"],"3/4","Both fractions have the same bottom number.","Three quarters is more than one quarter.");
add("fractions","What is 1/4 + 2/4?","ما ناتج ١/٤ + ٢/٤؟","¼ + ¼ + ¼",["3/4","3/8","2/4"],"3/4","Add the numerators when the denominator is the same.","1/4 + 2/4 = 3/4.");
add("fractions","Which fraction is equal to 3/6?","أي كسر يساوي ٣/٦؟","◼◼◼◻◻◻",["1/2","1/3","2/3"],"1/2","Simplify by dividing the top and bottom by the same number.","3/6 = 1/2 after dividing both by 3.");
add("fractions","A pizza has 8 equal slices. Three are eaten. What fraction is left?","قُسِّمت بيتزا إلى ٨ شرائح متساوية. أُكلت ٣ شرائح. ما الكسر المتبقي؟","🍕 8 slices − 3 eaten",["5/8","3/8","5/3"],"5/8","Subtract the eaten slices from the total.","8 − 3 = 5 slices left, so 5/8 remains.");
// Pictograph/table reading, data interpretation
add("data","A class reads 6 books on Monday and 9 on Tuesday. How many books altogether?","قرأ الصف ٦ كتب يوم الاثنين و٩ يوم الثلاثاء. ما المجموع؟","Monday: 📘📘📘📘📘📘
Tuesday: 📘📘📘📘📘📘📘📘📘",["15","3","54"],"15","Add the two days.","6 + 9 = 15 books.");
add("data","A survey records 12 cats, 8 dogs, and 5 birds. Which animal is most common?","سجّل الاستطلاع ١٢ قطة و٨ كلاب و٥ طيور. أي الحيوانات أكثر؟","Cats 12  |  Dogs 8  |  Birds 5",["Cats","Dogs","Birds"],"Cats","Compare the three totals.","12 cats is more than 8 dogs and 5 birds.");
add("data","The school garden has 14 red flowers and 9 yellow flowers. How many more red flowers?","في الحديقة ١٤ زهرة حمراء و٩ صفراء. كم تزيد الحمراء؟","Red 14    |    Yellow 9",["5","23","9"],"5","Find the difference between 14 and 9.","14 − 9 = 5 more red flowers.");
add("data","A bus carries 18 children in the morning and 12 in the afternoon. How many children rode in total?","نقل الباص ١٨ طفلاً صباحاً و١٢ بعد الظهر. كم طفلاً بالمجموع؟","Morning: 18  |  Afternoon: 12",["30","6","36"],"30","Add both groups.","18 + 12 = 30 children.");
add("data","A class voted for games: football 10, badminton 7, and cricket 9. Which was least popular?","صوّت الصف: كرة القدم ١٠، الريشة ٧، الكريكيت ٩. أيها حصل على أقل أصوات؟","Football 10 | Badminton 7 | Cricket 9",["Badminton","Football","Cricket"],"Badminton","Find the smallest total in the table.","7 is the smallest number of votes.");
add("data","Plants measured on Monday and Friday: 12 cm and 17 cm. How much did the plant grow?","طول النبتة يوم الاثنين ١٢ سم ويوم الجمعة ١٧ سم. كم نمت؟","Monday 12 cm → Friday 17 cm",["5 cm","29 cm","17 cm"],"5 cm","Subtract the starting height from the later height.","17 cm − 12 cm = 5 cm growth.");
if(items.length!==18||["problems","fractions","data"].some(d=>items.filter(x=>x.domain===d).length!==6))throw Error("Incomplete Grade 4 pilot");
window.LLA_GRADE4_PILOT=Object.freeze(items);
})();