/* Little Learners Academy — Grade 6 Ratio Explorer (November 2026)
 * 24 distinct supplemental worked problems, NOT certified lessons or a Qatar syllabus.
 * Reference themes: US 6.RP.A.1–3; England Year 6 ratio and proportion.
 * Draft Arabic wording requires educator review before formal Arabic teaching.
 */
(()=>{"use strict";
const Q=[];
function add(topic,scenario,arabic,question,arabicQuestion,correct,wrongA,wrongB,explanation,columns,rows,percent){
 const choices=[String(correct),String(wrongA),String(wrongB)];
 if(new Set(choices).size!==3||choices.some(x=>!x.trim()))throw Error("Invalid answer choices: "+scenario);
 if(!explanation||!columns||!rows?.length)throw Error("Missing teaching model: "+scenario);
 const id="g6ratio-"+String(Q.length+1).padStart(2,"0");
 // Change answer locations; never put the right answer in the same position for all questions.
 const shift=Q.length%3;const rotated=[...choices.slice(shift),...choices.slice(0,shift)];
 Q.push(Object.freeze({
  id,topic,scenario,arabic,question,arabicQuestion,choices:rotated,answer:String(correct),
  hint:"Find the multiplier or the value for ONE unit, then use it for the missing quantity.",
  explanation,columns,rows,percent:percent||0
 }));
}
const T=[
["Wildlife water bowls","أوعية الماء للحيوانات","2 animal feeders are paired with 6 water bowls. At the same ratio, how many bowls for 8 feeders?","كم وعاء ماء يلزم لثماني وحدات إطعام إذا كانت وحدتان تقابلهما ستة أوعية؟",24,18,12,"8 feeders is 4 times 2 feeders. Multiply 6 bowls by 4 to get 24.",["Feeders","Bowls"],[[2,6],[4,12],[8,"?"]]],
["School garden pots","أصص حديقة المدرسة","3 seed packets fill 12 pots. How many pots could 9 identical packets fill?","إذا ملأت ثلاث عبوات بذور ١٢ أصيصاً، فكم أصيصاً تملأ تسع عبوات؟",36,24,48,"9 packets is 3 times 3 packets. So 12 × 3 = 36 pots.",["Packets","Pots"],[[3,12],[6,24],[9,"?"]]],
["Notebook packs","دفاتر المدرسة","4 notebooks cost 20 QAR. At the same price, how much will 12 notebooks cost?","أربعة دفاتر تكلف ٢٠ ريالاً. كم تكلف ١٢ دفتراً؟",60,40,80,"12 is 3 times 4, so 20 QAR × 3 = 60 QAR.",["Notebooks","QAR"],[[4,20],[8,40],[12,"?"]]],
["Recycling project","مشروع إعادة التدوير","5 bags carry 15 kg of recyclable paper. How many kg would 20 equal bags carry?","خمسة أكياس تحمل ١٥ كغ من الورق. كم تحمل ٢٠ كيساً مماثلاً؟",60,45,75,"Each bag carries 15 ÷ 5 = 3 kg. 20 × 3 = 60 kg.",["Bags","kg"],[[5,15],[10,30],[20,"?"]]],
["Science batteries","بطاريات أدوات العلوم","2 identical science kits contain 8 batteries in total. How many for 7 such kits?","حقيبتان علميتان تحتويان على ٨ بطاريات. كم بطارية في سبع حقائب مماثلة؟",28,14,32,"Each kit contains 8 ÷ 2 = 4 batteries, so 7 × 4 = 28.",["Kits","Batteries"],[[2,8],[4,16],[7,"?"]]],
["Bakery muffin trays","صواني المخبز","6 identical trays hold 18 muffins. How many muffins can 10 trays hold?","ست صوانٍ تحمل ١٨ قطعة. كم قطعة تحمل عشر صوانٍ؟",30,24,36,"One tray holds 18 ÷ 6 = 3 muffins. Ten trays hold 30.",["Trays","Muffins"],[[6,18],[8,24],[10,"?"]]]
];
T.forEach(x=>add("tables",x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9]));
const L=[
["Ribbon craft","أشغال الشريط","3 metres of ribbon are enough for 2 crafts. How many crafts could use 12 metres?","ثلاثة أمتار من الشريط تكفي لنشاطين. كم نشاطاً تكفي له ١٢ متراً؟",8,6,12,"12 metres is 4 times 3. Four groups of 2 crafts make 8.",["Ribbon (m)","Crafts"],[[0,0],[3,2],[6,4],[9,6],[12,"?"]]],
["Cycling time","زمن ركوب الدراجة","A cyclist takes 4 minutes per kilometre at a steady pace. How many minutes for 3 km?","تستغرق راكبة الدراجة أربع دقائق لكل كيلومتر. كم دقيقة لثلاثة كيلومترات؟",12,7,16,"Each km takes 4 minutes. 3 km takes 4 × 3 = 12 minutes.",["Distance (km)","Time (min)"],[[0,0],[1,4],[2,8],[3,"?"]]],
["Water for plants","ماء النباتات","5 plants need 10 cups of water. At the same rate, how many cups for 15 plants?","خمس نباتات تحتاج عشرة أكواب ماء. كم كوباً تحتاج ١٥ نبتة؟",30,20,40,"15 plants is three groups of 5. 3 × 10 = 30 cups.",["Plants","Cups"],[[0,0],[5,10],[10,20],[15,"?"]]],
["School transport","النقل المدرسي","2 equal-size buses carry 60 pupils in total. How many pupils can 5 buses carry at the same capacity?","حافلتان متماثلتان تحملان ٦٠ طالباً. كم طالباً تحمل خمس حافلات مماثلة؟",150,120,180,"Each bus carries 60 ÷ 2 = 30 pupils. 5 × 30 = 150.",["Buses","Pupils"],[[0,0],[2,60],[4,120],[5,"?"]]],
["Sports storage","أدوات الرياضة","3 identical boxes hold 9 balls. How many balls fit into 8 boxes?","ثلاثة صناديق متماثلة تتسع لتسع كرات. كم كرة في ثمانية صناديق؟",24,18,27,"One box holds 9 ÷ 3 = 3 balls. Eight boxes hold 24.",["Boxes","Balls"],[[0,0],[3,9],[6,18],[8,"?"]]],
["Museum admission","تذاكر المتحف","4 tickets cost 28 QAR. What is the cost of 10 tickets at the same rate?","أربع تذاكر تكلف ٢٨ ريالاً. كم تكلف عشر تذاكر؟",70,56,84,"One ticket costs 28 ÷ 4 = 7 QAR. Ten tickets cost 70.",["Tickets","QAR"],[[0,0],[4,28],[8,56],[10,"?"]]]
];
L.forEach(x=>add("lines",x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9]));
const U=[
["Colour markers","أقلام التلوين","6 markers cost 18 QAR. What is the cost of one marker?","ستة أقلام تكلف ١٨ ريالاً. ما سعر القلم الواحد؟",3,6,12,"Unit rate = total cost ÷ number of markers = 18 ÷ 6 = 3 QAR each.",["Markers","QAR"],[[1,"?"],[3,9],[6,18]]],
["Desert road trip","رحلة برية","A car travels 120 km in 3 hours at a constant speed. What is its speed in km per hour?","تقطع سيارة ١٢٠ كم في ثلاث ساعات بسرعة ثابتة. ما سرعتها بالكيلومتر في الساعة؟",40,30,60,"120 ÷ 3 = 40 km per hour.",["Hours","Distance (km)"],[[1,"?"],[2,80],[3,120]]],
["Juice cartons","عبوات العصير","8 juice cartons cost 32 QAR. What is the price for one carton?","ثماني عبوات عصير تكلف ٣٢ ريالاً. ما سعر العبوة الواحدة؟",4,8,16,"32 ÷ 8 = 4 QAR per carton.",["Cartons","QAR"],[[1,"?"],[4,16],[8,32]]],
["Sticker album","ملصقات الألبوم","42 stickers are spread evenly across 7 pages. How many stickers are on each page?","وُزعت ٤٢ ملصقاً بالتساوي على سبع صفحات. كم ملصقاً في كل صفحة؟",6,5,7,"42 ÷ 7 = 6 stickers per page.",["Pages","Stickers"],[[1,"?"],[3,18],[7,42]]],
["Pencil supply","أقلام المدرسة","54 pencils are packed equally into 9 packs. How many pencils per pack?","وُزعت ٥٤ قلماً بالتساوي في تسع عبوات. كم قلماً في العبوة؟",6,9,5,"54 ÷ 9 = 6 pencils in each pack.",["Packs","Pencils"],[[1,"?"],[3,18],[9,54]]],
["Walking distance","مسافة المشي","A group walks 75 km in 5 days at an equal daily rate. How many km per day?","قطعت مجموعة ٧٥ كم خلال خمسة أيام بالتساوي. كم كيلومتراً في اليوم؟",15,10,25,"75 ÷ 5 = 15 km per day.",["Days","Distance (km)"],[[1,"?"],[3,45],[5,75]]]
];
U.forEach(x=>add("rates",x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9]));
const P=[
["Library books","كتب المكتبة","What is 25% of 80 library books?","ما ٢٥٪ من ٨٠ كتاباً في المكتبة؟",20,25,40,"25% means one quarter. 80 ÷ 4 = 20.",25],
["Garden plants","نباتات الحديقة","What is 20% of 75 garden plants?","ما ٢٠٪ من ٧٥ نبتة؟",15,20,25,"20% is one fifth. 75 ÷ 5 = 15.",20],
["School supplies","الأدوات المدرسية","What is 15% of 200 pencils?","ما ١٥٪ من ٢٠٠ قلم؟",30,15,40,"10% of 200 = 20, and 5% = 10. Together 15% = 30.",15],
["Art paper","أوراق الرسم","What is 40% of 60 drawing sheets?","ما ٤٠٪ من ٦٠ ورقة رسم؟",24,20,30,"10% of 60 is 6; multiply by 4 to get 24.",40],
["Sports medals","ميداليات الرياضة","What is 60% of 50 sports medals?","ما ٦٠٪ من ٥٠ ميدالية رياضية؟",30,20,35,"60% = 6 tenths, so 50 ÷ 10 × 6 = 30.",60],
["Recycled bottles","العبوات المعاد تدويرها","What is 10% of 240 recyclable bottles?","ما ١٠٪ من ٢٤٠ عبوة قابلة للتدوير؟",24,20,40,"10% is one tenth. 240 ÷ 10 = 24.",10]
];
P.forEach(x=>add("percent",x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],["Percent (%)","Objects"],[[100,x[4]*100/x[8]],[x[8],"?"]],x[8]));
if(Q.length!==24||new Set(Q.map(x=>x.question)).size!==24)throw Error("Ratio Explorer must contain 24 distinct problems.");
window.LLA_G6_RATIO=Object.freeze(Q);
})();