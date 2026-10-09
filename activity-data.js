/* Little Learners Academy: 150+ original, curriculum-themed mini-challenges.
 * Supplementary cross-curricular skills, NOT an official Qatar curriculum.
 * No new audio, accounts, tracking, ads, or paid APIs.
 */
(()=>{"use strict";
const A=[];
const add=(area,skill,title,ar,question,arQuestion,choices,answer,tip,icon="🌟")=>{
 if(!Number.isInteger(answer)||answer<0||answer>=choices.length||new Set(choices).size!==choices.length)throw Error("Invalid activity: "+title);
 A.push({id:"mini-"+String(A.length+1).padStart(3,"0"),area,skill,title,ar,question,arQuestion,choices:choices.map(String),answer,tip,icon});
};
const numberChoices=(answer,max=100)=>{
 const values=[answer,answer+1,answer-1,answer+2,answer-2,answer+10,answer-10].filter(x=>x>=0&&x<=max);
 return [...new Set(values)].slice(0,3);
};
const qnum=(area,skill,title,ar,q,aq,n,max,tip,icon)=>add(area,skill,title,ar,q,aq,numberChoices(n,max).map(String),0,tip,icon);

// 70 progressive number and mathematics challenges. Concrete and symbolic practice.
for(let n=1;n<=20;n++){
 const emoji=["⭐","🍎","⚽","🟡","🐟"][n%5];
 add("math","Counting","Count "+n+" objects","عدّ "+n+" عناصر",
  "How many "+emoji+" do you see?","كم عدد العناصر؟",
  [n,Math.max(0,n-1),n+1].map(String),0,
  "Count one by one, touching each symbol with your finger.",emoji);
 A[A.length-1].display=Array(n).fill(emoji).join(" ");
}
for(let i=0;i<15;i++){
 const a=2+(i%7),b=1+(Math.floor(i/7)*2+i%3);
 qnum("math","Addition","Add "+a+" and "+b,"اجمع العددين",
  a+" + "+b+" = ?","كم حاصل الجمع؟",a+b,20,
  "Start with "+a+" and count "+b+" more.","➕");
}
for(let i=0;i<15;i++){
 const a=7+i,b=1+(i%6);
 qnum("math","Subtraction","Take away "+b+" from "+a,"اطرح العددين",
  a+" − "+b+" = ?","كم ناتج الطرح؟",a-b,30,
  "Count backwards "+b+" times starting at "+a+".","➖");
}
for(let i=0;i<10;i++){
 const n=10+i*3;
 const target=n+1;
 qnum("math","Number order","One more than "+n,"العدد التالي",
  "What is ONE more than "+n+"?","ما العدد الذي يزيد واحداً؟",target,50,
  "One more means add 1.","🔢");
}
const shapes=[
["triangle","🔺","3 sides",["3 sides","4 sides","0 straight sides"]],
["square","🟦","4 equal sides",["4 equal sides","3 sides","5 sides"]],
["circle","🟡","no straight sides",["no straight sides","3 corners","4 corners"]],
["rectangle","▭","4 sides",["4 sides","5 sides","3 sides"]],
["triangle","🔺","3 corners",["3 corners","4 corners","0 corners"]],
["square","🟦","4 corners",["4 corners","2 corners","3 corners"]],
["circle","⚪","round",["round","pointed","four-sided"]],
["rectangle","▭","two long and two short sides",["two long and two short sides","three sides","no sides"]],
["triangle","🔺","a shape with 3 sides",["a shape with 3 sides","a shape with 4 equal sides","a round shape"]],
["square","🟦","four equal straight sides",["four equal straight sides","one curved side","three sides"]]
];
for(const [shape,icon,ans,opts] of shapes)
 add("math","Shapes","Explore "+shape,"استكشف الأشكال",
  "Look at "+icon+" "+shape+". Which statement is true?","اختر الوصف الصحيح للشكل.",opts,0,
  "Look carefully at the sides and corners.","📐");

// 34 English literacy challenges: sight vocabulary, plurals and written sentence sense.
// Spoken pronunciation is intentionally not synthesized or guessed here.
const vocab=[
["🐱","cat","قطة"],["🐟","fish","سمكة"],["☀️","sun","شمس"],["🚌","bus","حافلة"],
["📘","book","كتاب"],["✏️","pencil","قلم"],["🏠","house","منزل"],["🌴","tree","شجرة"],
["🦋","butterfly","فراشة"],["🐪","camel","جمل"],["🌸","flower","زهرة"],["🍎","apple","تفاحة"],
["🚲","bicycle","دراجة"],["🐦","bird","طائر"],["🌙","moon","قمر"],["⭐","star","نجمة"]
];
vocab.forEach(([icon,word,ar],i)=>{
 const wrong1=vocab[(i+5)%vocab.length][1],wrong2=vocab[(i+9)%vocab.length][1];
 add("english","Picture words","Name the "+word,"اقرأ الكلمة: "+ar,
 "Which English word matches "+icon+"?","أي كلمة إنجليزية تناسب الصورة؟",
 [word,wrong1,wrong2],0,"Look at the picture and the whole written word.",icon);
});
const plurals=[["cat","cats","cat's","cates"],["book","books","bookes","bookies"],["bus","buses","buss","bus's"],["box","boxes","boxs","boxies"],["dog","dogs","doges","dog's"],["cup","cups","cupes","cup's"],["tree","trees","treees","treies"],["apple","apples","applees","applis"],["bird","birds","birdes","birdies"],["dish","dishes","dishs","dishies"]];
plurals.forEach(([singular,correct,x,y])=>add("english","Plurals","One and many: "+singular,"المفرد والجمع",
 "There are two. Which is the correct plural of '"+singular+"'?","ما صيغة الجمع الصحيحة؟",[correct,x,y],0,"Many words add -s; words ending in s, sh or x often add -es.","🔤"));
const sentences=[
["Which one is a complete sentence?",["I can play.","can play","the red"],0],
["Which sentence starts with a capital letter?",["The sun is hot.","the sun is hot.","THE sun is hot."],0],
["Which sentence ends with a full stop?",["We read books.","We read books","We read books?"],0],
["Which one asks a question?",["Where is my book?","My book is here.","I like books."],0],
["Choose the correctly written sentence.",["I see a cat.","i see a cat.","I see a cat"],0],
["Which sentence has a question mark?",["Can you help?","I can help.","The sky is blue."],0],
["Which sentence is about the future?",["I will read tomorrow.","I read yesterday.","I read now."],0],
["Which sentence describes a colour?",["The flower is red.","The fish swims.","The bus stops."],0]
];
sentences.forEach(([q,opts,ans],i)=>add("english","Sentences","Sentence challenge "+(i+1),"تحدي الجمل",q,"اختر الإجابة الصحيحة.",opts,ans,"Read each whole sentence carefully.","📖"));

// 20 concept-based primary science mini-questions.
const science=[
["Animals","What does a camel need to live?",["Water","Plastic","A television"],"Animals need water.","🐪"],
["Plants","What do most green plants need to grow?",["Light","Shoes","Paper"],"Plants need light and water.","🌱"],
["Our senses","Which body part helps us hear?",["Ears","Feet","Hair"],"Ears help us hear sounds.","👂"],
["Our senses","Which sense helps you smell flowers?",["Smell","Touch","Hearing"],"We smell with our nose.","🌷"],
["Our senses","Which part helps you see colours?",["Eyes","Elbows","Knees"],"Eyes help us see.","👁️"],
["Materials","A metal spoon is usually made from…",["Metal","Paper","Sand"],"Spoons are often metal.","🥄"],
["Materials","Which material can you fold easily?",["Paper","Rock","Glass"],"Paper can be folded.","📄"],
["Materials","Which is usually transparent?",["Clear glass","Wood","Stone"],"You can see through clear glass.","🥛"],
["Living things","Which is a living thing?",["Palm tree","Plastic cup","Toy car"],"Plants are living things.","🌴"],
["Living things","Which is NOT living?",["A pebble","A bird","A flower"],"Rocks are not living things.","🪨"],
["Animal groups","Which animal can normally fly?",["Bird","Camel","Fish"],"Many birds can fly.","🐦"],
["Animal groups","Which animal lives in water?",["Fish","Camel","Cat"],"Fish live in water.","🐟"],
["Weather","What can you use when it rains?",["An umbrella","Sunglasses only","A blanket"],"An umbrella helps keep rain off.","🌧️"],
["Weather","Which weather has bright sunlight?",["Sunny","Rainy","Stormy"],"Sunny means lots of sunshine.","☀️"],
["Day and night","When can you often see the moon?",["At night","Only at noon","Never"],"The moon is often visible at night.","🌙"],
["Plants","Which part of a plant takes in water from soil?",["Roots","Flowers","Leaves"],"Roots absorb water.","🌿"],
["Plants","Where do most seeds start growing?",["In suitable soil or growing medium","Inside a pencil","On a book"],"Seeds grow with suitable water, air, and warmth.","🌱"],
["My body","Which body part helps you walk?",["Legs","Nose","Ears"],"Legs help us move.","🦶"],
["Health science","Which action helps keep germs from spreading?",["Washing hands","Sharing dirty tissues","Not washing"],"Wash hands with soap and water.","🧼"],
["Environment","Where should rubbish go?",["In a bin","On the beach","Into the sea"],"Use bins and keep shared places tidy.","🌎"]
];
science.forEach(([skill,q,opts,tip,icon],i)=>add("science",skill,"Discover: "+skill+" "+(i+1),"استكشف العلوم",q,"اختر الإجابة الصحيحة.",opts,0,tip,icon));

// 15 life skills questions grounded in child safety / kindness.
const life=[
["Before eating, what should you do?",["Wash hands","Skip washing","Touch dirty shoes"],"Clean hands help keep food safe.","🧼"],
["A friend drops a pencil. What can you do?",["Help pick it up","Laugh","Take it away"],"Helping is kind.","🤝"],
["Someone else is speaking. What is polite?",["Wait for a turn","Shout over them","Push them"],"Listening and taking turns show respect.","🙋"],
["You're thirsty after playing. What is a good choice?",["Drink water","Drink soap","Skip water"],"Water helps our bodies.","💧"],
["What should you do with a used tissue?",["Put it in a bin","Leave it on the floor","Share it"],"Dispose of tissues appropriately.","🗑️"],
["Your classmate is sad. What can you do?",["Ask if they are okay","Make fun of them","Ignore if they ask for help"],"Kind words matter.","❤️"],
["Before crossing a road with an adult, you should…",["Stop and look with the adult","Run without looking","Play on the road"],"Follow safe crossing rules with a trusted adult.","🚸"],
["What helps your teeth stay healthy?",["Brushing teeth","Eating only sweets","Never brushing"],"Brush teeth regularly.","🪥"],
["A stranger online asks for your address. You should…",["Tell a trusted adult","Send your address","Send a photo"],"Keep private information safe.","🔐"],
["What is fair during a group game?",["Take turns","Keep every turn","Stop others playing"],"Everyone deserves a turn.","🎲"],
["After running and playing, what does your body need?",["Rest and water","No rest ever","Only loud music"],"Rest helps us recover.","😴"],
["You make a mistake in a game. What can you do?",["Try again","Give up forever","Blame someone"],"Learning takes practice.","🌟"],
["A friend is different from you. What is kind?",["Show respect","Tease them","Exclude them"],"Everyone deserves kindness.","🌈"],
["You notice a spill on the floor at school. What should you do?",["Tell a teacher","Run through it","Hide it"],"Tell an adult so it can be cleaned safely.","🧹"],
["When someone helps you, what might you say?",["Thank you","Go away","Nothing kind"],"Thanking others shows appreciation.","💬"]
];
life.forEach(([q,opts,tip,icon],i)=>add("life","Everyday choices","Kind choice "+(i+1),"اختيارات جيدة",q,"ما التصرف الصحيح؟",opts,0,tip,icon));

// 12 art and pattern recognition tasks.
const patterns=[
["🔴 🟡 🔴 🟡 __",["🔴","🟡","🟢"],0],
["⭐ 🌙 ⭐ 🌙 __",["⭐","🌙","☀️"],0],
["🟦 🟦 🔺 🟦 🟦 __",["🔺","🟦","⚪"],0],
["🌸 🌼 🌸 🌼 __",["🌸","🌼","🍃"],0],
["🟢 🟣 🟢 🟣 __",["🟢","🟣","🟡"],0],
["☀️ ☁️ ☀️ ☁️ __",["☀️","☁️","🌧️"],0],
["🔺 🟦 🔺 🟦 __",["🔺","🟦","⚪"],0],
["🍎 🍌 🍎 🍌 __",["🍎","🍌","🍇"],0],
["🟡 🟡 🔵 🟡 🟡 __",["🔵","🟡","🔴"],0],
["🐟 🐱 🐟 🐱 __",["🐟","🐱","🚌"],0],
["💜 💚 💜 💚 __",["💜","💚","❤️"],0],
["🌴 🐪 🌴 🐪 __",["🌴","🐪","🐦"],0]
];
patterns.forEach(([seq,opts,ans],i)=>add("arts","Patterns","Pattern detective "+(i+1),"أكمل النمط",
 "What comes next? "+seq,"ما الذي يأتي بعد ذلك؟ "+seq,opts,ans,"Look for the part that repeats.","🎨"));

if(A.length<101)throw Error("Not enough activities: "+A.length);
// Rotate correct answer positions so guessing the first answer does not work.
A.forEach((a,i)=>{
 const rotation=i%3;
 const correct=a.choices[a.answer];
 a.choices=[...a.choices.slice(rotation),...a.choices.slice(0,rotation)];
 a.answer=a.choices.indexOf(correct);
});
window.LLA_MINI_ACTIVITIES=Object.freeze(A);
})();