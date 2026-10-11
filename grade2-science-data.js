/* Grade 2 SCIENCE discovery pilot: 18 original supplementary questions.
 * Not a complete or government-approved Qatar Grade 2 curriculum.
 */
(()=>{"use strict";
const rows=[
["Plants","What do roots usually take in from soil?","ماذا تمتص الجذور من التربة؟",["Water","Sunlight","Pencils"],0,"Roots absorb water and help anchor the plant.","🌱"],
["Plants","What do green leaves use to make food?","ماذا تحتاج الأوراق الخضراء لصنع الغذاء؟",["Light","Plastic","Sand only"],0,"Green plants use light, water and air to make food.","🍃"],
["Plants","Which part can develop into a new plant?","أي جزء يمكن أن ينمو ليصبح نباتاً جديداً؟",["A seed","A pebble","A spoon"],0,"A seed can germinate under suitable conditions.","🌰"],
["Plants","Why should we water a potted plant appropriately?","لماذا نسقي النبات المزروع في أصيص؟",["It needs water to grow","It needs a bath","It is made of glass"],0,"Living plants need a suitable amount of water.","💧"],
["Animals","Which habitat is suitable for many fish?","أين يعيش كثير من الأسماك؟",["Water","Dry sand only","A classroom shelf"],0,"Fish are adapted to living in water.","🐟"],
["Animals","Which helps a camel travel in the desert?","ما الذي يساعد الجمل في الصحراء؟",["Broad feet","Metal wheels","A raincoat"],0,"Broad feet help distribute a camel's weight on sand.","🐪"],
["Animals","What do many birds use to build nests?","ماذا تستخدم الطيور لبناء أعشاشها؟",["Small twigs","Plastic rulers only","Metal nails"],0,"Many birds gather twigs and other suitable materials.","🐦"],
["Animals","Which is a basic need of living animals?","ما الحاجة الأساسية للحيوانات؟",["Water","Television","Paint"],0,"Animals need water and appropriate food and shelter.","🐾"],
["Materials","Which material is usually attracted by a magnet?","أي مادة قد يجذبها المغناطيس؟",["Iron","Paper","Glass"],0,"Many iron or steel objects are attracted to magnets.","🧲"],
["Materials","Which item can bend easily without breaking?","أي شيء يمكن ثنيه بسهولة؟",["Rubber band","Glass cup","Dry stone"],0,"A rubber band is flexible; never stretch one toward someone's face.","🪢"],
["Materials","Which material is suitable for a window pane?","أي مادة تُستخدم في زجاج النافذة؟",["Transparent glass","Cardboard","Wood"],0,"Clear glass lets light through. Ask an adult to handle glass.","🪟"],
["Materials","What happens when ice becomes warmer and melts?","ماذا يحدث عندما يذوب الجليد؟",["It becomes liquid water","It becomes sand","It becomes metal"],0,"Melting changes solid ice into liquid water.","🧊"],
["Weather","Which instrument measures air temperature?","ما الأداة التي تقيس درجة حرارة الهواء؟",["Thermometer","Ruler","Magnifying glass"],0,"A thermometer measures temperature.","🌡️"],
["Weather","What should you do during very hot weather in Qatar?","ماذا تفعل في الطقس شديد الحرارة؟",["Stay hydrated and seek shade","Avoid all water","Stand in direct sun all day"],0,"Drink water and seek shade; follow adult guidance.","☀️"],
["Weather","What do dark rain clouds sometimes indicate?","ماذا قد تدل الغيوم الداكنة؟",["Rain may be coming","All plants are sleeping","The moon disappeared"],0,"Some dark clouds bring rain.","☁️"],
["Weather","Which direction does a shadow usually appear?","أين يظهر الظل بالنسبة للضوء؟",["Away from a light source","Inside a closed book","Always north"],0,"Light is blocked by an object, making a shadow on the opposite side.","🌤️"],
["Scientific enquiry","To compare plant growth fairly, what should you change?","في التجربة العادلة، كم عاملاً نغير؟",["One factor at a time","Every factor at once","Never observe results"],0,"A fair test changes one factor while keeping others similar.","🔬"],
["Scientific enquiry","What should a young scientist do after an observation?","ماذا يفعل العالم الصغير بعد الملاحظة؟",["Record what happened","Invent a result","Hide all notes"],0,"Recording observations helps us learn and compare results.","📋"]
];
const DATA=rows.map(([topic,q,ar,options,answer,reason,icon],i)=>{
 if(new Set(options).size!==3)throw Error("Duplicate choices");
 const offset=i%3,choices=[...options.slice(offset),...options.slice(0,offset)];
 return Object.freeze({id:"g2s-"+String(i+1).padStart(2,"0"),topic,question:q,arabic:ar,choices,answer:choices.indexOf(options[answer]),reason,icon});
});
if(DATA.length!==18)throw Error("Expected 18 science questions");
window.LLA_GRADE2_SCIENCE=Object.freeze(DATA);
})();