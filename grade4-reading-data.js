/* Original Grade 4 English reading-comprehension pilot, not a certified syllabus. */
(()=>{"use strict";
const passages=[
{id:"desert",icon:"🐪",title:"The Desert Garden",ar:"حديقة الصحراء",text:"Mariam's class planted a small garden beside their school in Doha. The soil was dry, so they mixed compost into it and planted seeds that could grow in the warm weather. Every morning, two pupils checked the soil before watering. At first, Mariam wanted to add lots of water. Her teacher explained that too much water could harm the roots. A week later, tiny green shoots appeared. Mariam wrote down the changes in her notebook. She learned that careful observation and teamwork helped the garden grow.",questions:[
["Why did the class mix compost into the soil?","لماذا خلط التلاميذ السماد بالتربة؟",["To help improve the soil","To make the garden colder","To turn the seeds blue"],0,"Think about why gardeners prepare soil.","Compost can improve soil conditions for growing plants."],
["What did pupils check before watering?","ماذا فحص التلاميذ قبل الري؟",["The soil","The school bell","The notebook cover"],0,"Look for what the pupils did each morning.","The story says they checked the soil before watering."],
["Why did the teacher warn against too much water?","لماذا حذّرت المعلمة من كثرة الماء؟",["It might harm the roots","It would make the seeds sing","It would stop the sun"],0,"Find the teacher's explanation in the story.","The teacher said excess water could harm plant roots."],
["What appeared after one week?","ماذا ظهر بعد أسبوع؟",["Tiny green shoots","Large ripe oranges","A new classroom"],0,"Look for the change after a week.","The seedlings appeared as tiny green shoots."],
["What does 'observation' mean in this story?","ما معنى الملاحظة في القصة؟",["Watching carefully and recording changes","Guessing without looking","Watering as quickly as possible"],0,"Mariam used a notebook to follow changes.","Observation is noticing and recording what happens."],
["Which detail best shows teamwork?","أي تفصيل يوضح العمل الجماعي؟",["Two pupils checked the soil each morning","Mariam owned a notebook","The weather was warm"],0,"Find a task that classmates shared.","The pupils took turns caring for the garden together."]
]},
{id:"library",icon:"📚",title:"A Library Mystery",ar:"لغز المكتبة",text:"On Tuesday, Sami visited the library to find a book about ocean animals. He searched the science shelf, but the book he wanted was missing. He noticed a card on the desk saying, 'Returned books are sorted every afternoon.' Instead of leaving, Sami politely asked the librarian for help. She suggested checking the return trolley. There, beneath a large picture book, lay the ocean book. Sami thanked her and borrowed it for the week. At home, he discovered a chapter about creatures that glow in the deep sea. The next morning, he shared an interesting fact with his friends.",questions:[
["What was Sami looking for?","ما الكتاب الذي بحث عنه سامي؟",["A book about ocean animals","A book about football rules","A book about mountain roads"],0,"Look at the first sentence.","Sami visited the library for a book about ocean animals."],
["What did the notice explain?","ماذا أوضحت البطاقة؟",["Returned books are sorted each afternoon","The library closes every morning","Only teachers can borrow books"],0,"Reread the words on the desk card.","The notice says that returned books are sorted every afternoon."],
["Where was the missing book found?","أين وُجد الكتاب المفقود؟",["On the return trolley","Under the school bus","Inside Sami's bag"],0,"The librarian suggested where to check.","It was on the return trolley below a picture book."],
["Which word best describes Sami's request for help?","أي كلمة تصف طلب سامي للمساعدة؟",["Polite","Rude","Angry"],0,"How did Sami speak to the librarian?","He politely asked for help and later thanked the librarian."],
["What can we infer about Sami?","ماذا نستنتج عن سامي؟",["He likes learning and sharing facts","He dislikes all books","He never asks questions"],0,"Consider what Sami did at home and school.","Sami read the book and shared a fact with his friends."],
["Which detail belongs at the end of the story?","ما الحدث الذي جاء في نهاية القصة؟",["Sami shared a fact with his friends","Sami checked the science shelf","Sami read the desk notice"],0,"Think about the sequence of events.","Sharing a fact happened the next morning, after he borrowed the book."]
]},
{id:"market",icon:"🛒",title:"The Mini Market Challenge",ar:"تحدي السوق الصغير",text:"Huda and her brother prepared a shopping list for a family picnic. They had 20 Qatari riyals to spend on fruit and water. Huda checked the prices carefully. The apples cost 6 riyals, the bananas 5 riyals, and the water 4 riyals. Her brother wanted to buy an extra toy, but Huda reminded him that they needed to buy the picnic items first. They bought the food and water and had 5 riyals left. On the way home, her brother said, 'Planning helped us get everything we needed.' Huda agreed. She was proud that they had followed their list.",questions:[
["Why did Huda make a shopping list?","لماذا أعدّت هدى قائمة المشتريات؟",["To plan what they needed for the picnic","To write a story about toys","To practise drawing cars"],0,"Look at the purpose of their trip.","They made the list for a family picnic."],
["How much money did they have to begin with?","كم كان معهم من المال في البداية؟",["20 Qatari riyals","15 Qatari riyals","5 Qatari riyals"],0,"Check the second sentence.","Their starting budget was 20 Qatari riyals."],
["What did they decide to buy before a toy?","ماذا اشتروا قبل اللعبة؟",["Picnic food and water","New school bags","A board game"],0,"What did Huda say was important?","Huda prioritised the listed picnic items."],
["How much did the apples, bananas and water cost altogether?","كم بلغ ثمن التفاح والموز والماء؟",["15 riyals","14 riyals","16 riyals"],0,"Add 6 + 5 + 4.","The total was 6 + 5 + 4 = 15 riyals."],
["What is the main lesson of the story?","ما الفكرة الأساسية من القصة؟",["Planning helps us use money wisely","Always buy toys first","Shopping lists waste time"],0,"Think about what her brother said at the end.","They met their needs while keeping to their budget."],
["Which detail supports the idea that Huda was careful?","أي تفصيل يدل على أن هدى كانت حريصة؟",["She checked prices before buying","She forgot the shopping list","She spent more than her budget"],0,"Look for an action that shows planning.","Huda compared prices carefully and followed the list."]
]}];
const data=[];
passages.forEach((passage,pIndex)=>passage.questions.forEach((q,i)=>{
 const [prompt,ar,choices,right,hint,explanation]=q;
 if(choices.length!==3||new Set(choices).size!==3||right!==0)throw Error("Invalid reading item");
 // Rotate correct answer to avoid always putting it first.
 const shift=(i+pIndex)%3;
 const shuffled=[...choices.slice(shift),...choices.slice(0,shift)];
 data.push(Object.freeze({id:"g4e-"+String(data.length+1).padStart(2,"0"),passage:passage.id,prompt,ar,choices:shuffled,answer:shuffled.indexOf(choices[right]),hint,explanation}));
}));
if(data.length!==18||passages.length!==3)throw Error("Grade 4 reading pilot must have 18 questions in 3 passages");
window.LLA_GRADE4_READING=Object.freeze({passages:Object.freeze(passages.map(({questions,...p})=>Object.freeze(p))),questions:Object.freeze(data)});
})();