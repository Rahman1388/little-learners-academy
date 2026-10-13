/* Original Grade 4 supplementary science pilot; concepts require teacher review. */
(()=>{"use strict";
const domains=[
{id:"habitats",icon:"🌴",title:"Habitats & Food Chains",ar:"الموائل والسلاسل الغذائية",
text:"In a school nature club in Doha, pupils investigate living things in different habitats. A habitat gives organisms places to find food, water and shelter. Green plants use sunlight to make food. A grasshopper may eat the plant, and a small bird may eat the grasshopper. People can protect habitats by reducing litter and avoiding damage to plants and animals.",
questions:[
["Which describes a habitat?","ما المقصود بالموئل؟",["A place where an organism lives","A type of thermometer","A number sentence"],"A habitat supplies conditions for living things.","Habitats are places where organisms find the resources they need."],
["Where does the plant get energy to make food?","من أين يحصل النبات على الطاقة لصنع الغذاء؟",["Sunlight","A stone","A plastic bag"],"Think about the role of light for green plants.","Plants use energy from sunlight during photosynthesis."],
["In plant → grasshopper → bird, which eats the grasshopper?","أي كائن يأكل الجرادة في السلسلة؟",["The bird","The plant","The soil"],"Follow the arrows from food to consumer.","The bird is the consumer that eats the grasshopper."],
["Which organism is a producer in this food chain?","أي كائن منتج في السلسلة الغذائية؟",["The green plant","The bird","The grasshopper"],"Producers make their own food.","The green plant produces its food using light."],
["If many plants disappear, what is a likely effect?","ماذا قد يحدث إذا اختفت نباتات كثيرة؟",["Grasshoppers may have less food","Grasshoppers will need no food","Birds will become plants"],"Look at who eats plants.","Plant-eating animals may lose a source of food."],
["What action can help protect a local habitat?","ما السلوك الذي يساعد على حماية الموائل؟",["Putting litter in a bin","Pulling up all the plants","Leaving rubbish on the sand"],"Choose the action that avoids damage.","Keeping habitats clean helps protect living things."]
]},
{id:"materials",icon:"🧪",title:"Materials & Changes",ar:"المواد وتغيراتها",
text:"In a supervised classroom investigation, pupils compare a metal spoon, a clear glass cup and a wooden block. Metals often conduct heat and electricity. Glass is often transparent. Wood can be a useful insulator. The children watch ice melt into liquid water and then discuss what happens when liquid water freezes again. Their teacher reminds them never to handle hot objects or electrical equipment without adult supervision.",
questions:[
["Which material is usually transparent?","أي مادة تكون شفافة عادة؟",["Clear glass","An opaque wooden block","A thick metal spoon"],"Can you see through it?","Clear glass allows light to pass through so we can see through it."],
["Which material often conducts heat well?","أي مادة توصل الحرارة جيداً غالباً؟",["Metal","Dry wood","Wool"],"Think about why metal pans become hot.","Many metals are good thermal conductors."],
["When ice melts, it becomes…","ماذا يصبح الجليد عند انصهاره؟",["Liquid water","Sand","Steam immediately in every case"],"Melting changes a solid to a liquid.","Solid ice changes to liquid water when it melts."],
["When liquid water freezes, it becomes…","ماذا يصبح الماء عندما يتجمد؟",["Solid ice","A metal","A plant"],"Freezing is the reverse of melting.","Water can become solid ice when cooled sufficiently."],
["Which is a safe classroom investigation rule?","ما قاعدة السلامة الصحيحة في التجارب؟",["Ask an adult before touching hot equipment","Touch every hot surface","Experiment with electrical sockets alone"],"Safety comes before experimenting.","An adult should supervise potentially hazardous equipment."],
["Which material is often a useful thermal insulator?","أي مادة تُستخدم غالباً للعزل الحراري؟",["Wood","Copper","Aluminium"],"An insulator slows heat transfer.","Wood generally conducts heat less readily than metals."]
]},
{id:"forces",icon:"🧲",title:"Forces & Fair Tests",ar:"القوى والتجارب العادلة",
text:"A class investigates how toy cars roll along a ramp. They notice that pushing changes a car's motion and friction can slow it down. The pupils compare a smooth surface with a rough surface. For a fair test, they keep the same car and the same starting point, changing only the surface. They measure how far it travels, repeat their trials and record results before reaching a conclusion.",
questions:[
["What is a push or a pull called?","ماذا تسمى قوة الدفع أو السحب؟",["A force","A temperature","A habitat"],"A force can change motion.","Pushes and pulls are examples of forces."],
["Which can slow a moving toy car?","ما الذي قد يبطئ سيارة لعبة متحركة؟",["Friction","Sunlight alone","A written label"],"Think about contact between the wheels and surface.","Friction can oppose motion."],
["In this fair test, what should pupils change?","ما المتغير الذي يجب تغييره في الاختبار العادل؟",["The surface texture","The car and its size every time","The starting point each time"],"Only one factor should be deliberately changed.","Changing only the surface helps compare its effect fairly."],
["Which should stay the same during the fair test?","ما الشيء الذي يجب إبقاؤه ثابتاً؟",["The starting point","The surface texture","The measured distance"],"Keep the conditions that are not under investigation the same.","Using the same starting point makes the comparison fairer."],
["Why repeat an investigation?","لماذا نكرر التجربة العلمية؟",["To check if results are consistent","To guarantee the result we want","To avoid writing results"],"Repeated measurements can reveal variation.","Repeating tests helps pupils judge consistency."],
["What should pupils do before drawing a conclusion?","ماذا يفعل التلاميذ قبل الوصول لاستنتاج؟",["Record and compare the results","Ignore measurements","Choose an answer without observing"],"Good conclusions are supported by evidence.","Recording and comparing measured results supports conclusions."]
]}];
const questions=[];
domains.forEach((d,di)=>d.questions.forEach(([prompt,ar,choices,hint,explanation],i)=>{
 if(choices.length!==3||new Set(choices).size!==3||!prompt||!hint||!explanation)throw Error("Invalid Grade 4 science item");
 const shift=(i+di)%3;
 const rotated=[...choices.slice(shift),...choices.slice(0,shift)];
 questions.push(Object.freeze({id:"g4s-"+String(questions.length+1).padStart(2,"0"),passage:d.id,prompt,ar,choices:rotated,answer:rotated.indexOf(choices[0]),hint,explanation}));
}));
if(questions.length!==18)throw Error("Grade 4 science pilot needs 18 questions");
window.LLA_GRADE4_SCIENCE=Object.freeze({passages:Object.freeze(domains.map(({questions,...d})=>Object.freeze(d))),questions:Object.freeze(questions)});
})();