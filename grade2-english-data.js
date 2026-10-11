/* Limited, original Grade 2 English reading-readiness PILOT, not a complete curriculum.
 * 24 hand-authored items, grouped into four 6-question domains.
 * Text-first: no unreviewed phonics recordings or synthesized speech.
 */
(()=>{"use strict";
const DATA=[];
function add(domain,story,question,arabic,options,correct,reason){
 const id="g2e-"+String(DATA.length+1).padStart(2,"0");
 if(options.length!==3||new Set(options).size!==3||!options.includes(correct)||!reason||!story)throw Error("Bad reading item "+id);
 const shift=DATA.length%3, choices=[...options.slice(shift),...options.slice(0,shift)];
 DATA.push({id,domain,story,question,arabic,choices,answer:choices.indexOf(correct),reason});
}
// Six literal comprehension questions: read brief texts, retrieve directly stated facts.
add("understand","Aisha plants a seed in a pot. She gives it water every morning. After one week, a small green shoot appears.","What does Aisha water?","ماذا تسقي عائشة؟",["A seed in a pot","A toy car","A book"],"A seed in a pot","The text says Aisha plants a seed in a pot and waters it.");
add("understand","Omar visits the library with his father. He chooses a book about birds and reads it at home.","Where does Omar choose his book?","أين اختار عمر كتابه؟",["At the library","At the beach","At the supermarket"],"At the library","Omar visits the library and chooses a book there.");
add("understand","Fatima has a red bag and a blue lunch box. She puts an apple inside the lunch box.","What colour is Fatima's lunch box?","ما لون صندوق طعام فاطمة؟",["Blue","Red","Green"],"Blue","The text describes a blue lunch box.");
add("understand","Khalid takes his umbrella to school because dark clouds cover the sky. Soon, the rain begins.","What does Khalid take to school?","ماذا أخذ خالد إلى المدرسة؟",["An umbrella","A bicycle","A toy boat"],"An umbrella","Khalid takes an umbrella, which is useful when it rains.");
add("understand","A little bird builds a nest in a palm tree. It brings small twigs to make the nest strong.","Where is the bird's nest?","أين عش الطائر؟",["In a palm tree","Under the sea","Inside a bus"],"In a palm tree","The text places the nest in a palm tree.");
add("understand","Maryam finishes her drawing, then washes her hands before eating lunch with her family.","What does Maryam do before lunch?","ماذا فعلت مريم قبل الغداء؟",["Washes her hands","Goes to sleep","Rides a bus"],"Washes her hands","The story says Maryam washes her hands before lunch.");
// Six basic inference/sequence questions with clearly warranted conclusions.
add("think","The pavement is wet. Sara sees raindrops on the window. She puts on her raincoat.","What is the weather probably like?","كيف يبدو الطقس؟",["Rainy","Very dry","Snowy"],"Rainy","Raindrops and a wet pavement suggest rain.");
add("think","First, Ahmed mixes flour and water. Next, he shapes the dough. Finally, he bakes the bread.","What happens after mixing?","ماذا يحدث بعد الخلط؟",["He shapes the dough","He eats the bread","He washes the car"],"He shapes the dough","Next comes shaping the dough.");
add("think","The kitten is hiding under the sofa. Its food bowl is empty, and it meows beside the kitchen.","What might the kitten need?","ماذا قد تحتاج القطة؟",["Food","A pencil","A football"],"Food","An empty food bowl and meowing near the kitchen suggest hunger.");
add("think","Lina borrows a book from the library. She takes good care of it and brings it back one week later.","Why does Lina bring it back?","لماذا أعادت لينا الكتاب؟",["It belongs to the library","It is her football","She planted it"],"It belongs to the library","Borrowed library books should be returned.");
add("think","Yousef forgets his water bottle. After running outside, he feels thirsty and asks his teacher for water.","Why does he ask for water?","لماذا طلب الماء؟",["He feels thirsty","He wants to paint","He is sleepy"],"He feels thirsty","Running and forgetting his bottle left him thirsty.");
add("think","Noor finds a lost pencil case with a name written on it. She gives it to her teacher.","What is Noor trying to do?","ماذا تحاول نور أن تفعل؟",["Help return it to its owner","Keep it forever","Throw it away"],"Help return it to its owner","Giving a found item to a teacher helps locate its owner.");
// Six word meaning in context / parts of speech items.
add("words","The camel walks slowly across the sandy ground.","Which word tells HOW the camel walks?","أي كلمة تصف كيفية مشي الجمل؟",["slowly","camel","ground"],"slowly","Slowly describes how the camel walks.");
add("words","The bright sun shines above the school.","Which word describes the sun?","أي كلمة تصف الشمس؟",["bright","school","above"],"bright","Bright is a describing word (adjective).");
add("words","Maha is delighted when her friend visits.","What does delighted mean here?","ما معنى سعيدة جداً هنا؟",["Very happy","Very angry","Very tired"],"Very happy","Delighted means very pleased or happy.");
add("words","The tiny ant carries a crumb of bread.","Which word means very small?","أي كلمة تعني صغير جداً؟",["tiny","carries","bread"],"tiny","Tiny means very small.");
add("words","The children whisper in the quiet library.","What does whisper mean?","ما معنى يهمس؟",["Speak very softly","Shout loudly","Run quickly"],"Speak very softly","To whisper is to speak in a soft, quiet voice.");
add("words","The family will travel tomorrow.","Which word tells WHEN?","أي كلمة تدل على الوقت؟",["tomorrow","family","travel"],"tomorrow","Tomorrow tells when the travel will happen.");
// Six writing/grammar basics, not assessing voice.
add("write","The bird is on the tree.","Which sentence starts with a capital letter and ends with a full stop?","أي جملة تبدأ بحرف كبير وتنتهي بنقطة؟",["The bird is on the tree.","the bird is on the tree.","The bird is on the tree"],"The bird is on the tree.","A statement usually begins with a capital letter and ends with a full stop.");
add("write","Where is my pencil?","Which punctuation mark belongs at the end of a question?","ما علامة الترقيم لنهاية السؤال؟",["?","!","."],"?","Questions usually end in a question mark.");
add("write","I have one box. My sister has two boxes.","What is the plural of box?","ما جمع كلمة box؟",["boxes","boxs","boxies"],"boxes","Most nouns ending in -x add -es to form the plural.");
add("write","Yesterday, we played in the park.","Which word tells that this happened in the past?","أي كلمة تدل على الماضي؟",["Yesterday","Park","We"],"Yesterday","Yesterday means the day before today.");
add("write","The children are happy.","Which word is the adjective?","أي كلمة صفة؟",["happy","children","are"],"happy","Happy describes the children.");
add("write","We packed our bags. We went to the beach.","Which word can join these two ideas?","أي كلمة تصل الفكرتين؟",["and","because of","under"],"and","And can join related actions: We packed our bags and went to the beach.");
if(DATA.length!==24)throw Error("Expected 24 reading challenges");
window.LLA_GRADE2_ENGLISH=Object.freeze(DATA.map(x=>Object.freeze(x)));
})();