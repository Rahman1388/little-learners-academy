/* Grade 3 Science Discovery: 18 original supplementary concept questions; educator review required. */
(()=>{"use strict";
const rows=[
["plants","Mariam puts two similar seedlings in similar soil. One gets light and water; the other gets water but no light.","What is Mariam changing to investigate plant growth?",["The amount of light","The type of pot label","The day of the week"],0,"Change one condition at a time to make a fair comparison."],
["plants","A seed begins growing roots and a shoot.","Which plant structure usually absorbs water from the soil?",["Flower","Roots","Fruit"],1,"Roots take up water and minerals from soil."],
["plants","A young plant is growing toward sunlight beside a window.","What is the plant responding to?",["Sound","Light","Plastic"],1,"Plants can grow toward light."],
["plants","A cactus and a palm tree have different shapes.","What do both living plants generally need?",["Water and light","Television","Plastic toys"],0,"Most green plants need water and light."],
["plants","A seedling is drooping after several days without water.","What would help investigate whether lack of water is the cause?",["Compare with a similar watered seedling","Paint the pot","Turn off all light"],0,"Compare otherwise similar plants with and without enough water."],
["plants","In the school garden, flowers appeared before fruit formed.","What is one function of flowers in many plants?",["Helping reproduction","Making shoes","Storing batteries"],0,"Flowers can help plants reproduce and form seeds."],
["forces","Ali pushes a toy car along a flat floor.","What is the push likely to change?",["How the car moves","The car's colour","The car's name"],0,"Forces can change an object's movement."],
["forces","A ball rolls quickly on a smooth surface and less far on a rough mat.","What may slow the ball on the rough mat?",["Friction","Sunlight","Sound"],0,"Friction between touching surfaces resists movement."],
["forces","A student pulls a drawer open.","Which kind of force is used?",["A pull","A change in colour","A shadow"],0,"Pulling is a force."],
["forces","A magnet is brought near a steel paper clip.","What will often happen?",["The clip is attracted","The clip becomes paper","The magnet turns into water"],0,"Magnets attract some materials such as iron and many steels."],
["forces","Two magnets are positioned with like poles facing.","What is likely to happen?",["They repel","They always stick","They melt"],0,"Like magnetic poles repel."],
["forces","A metal key and a wooden block are tested with a magnet.","What is the best scientific approach?",["Test each object and record the result","Guess from its colour","Say all metals are magnetic"],0,"Not all metals are attracted to magnets; test each safely."],
["investigation","Two ice cubes are placed in different locations. One melts sooner.","What should be recorded?",["How long each takes to melt","The label's colour","The observer's favourite food"],0,"Measurements help compare results."],
["investigation","A child wants to know which material absorbs more water.","What is a useful fair test?",["Use the same amount of water for each material","Use different water amounts","Change everything at once"],0,"Keep other conditions the same where possible."],
["investigation","The class measures rainfall across a week.","What tool is suitable?",["A rain gauge","A magnet","A ruler for sound"],0,"A rain gauge collects and measures rainfall."],
["investigation","Three children watch a shadow change during the day.","Which observation can they compare?",["Shadow length and direction","The object's name","The colour of lunch"],0,"Shadows vary with the position of the light source."],
["investigation","A class sorts materials into groups.","Which property can they test?",["Whether each is transparent","The name of its shop","Who first touched it"],0,"Transparency is a property that can be observed."],
["investigation","A team tests whether seeds grow better in different conditions.","Why should they write down their observations?",["To compare evidence","To make the paper heavier","To avoid looking at plants"],0,"Recording observations helps evaluate conclusions."]
];
const titles={plants:["🌱 Plants & Growth","النباتات والنمو"],forces:["🧲 Forces & Magnets","القوى والمغناطيس"],investigation:["🔬 Investigate & Observe","الاستقصاء والملاحظة"]};
const all=rows.map((r,i)=>({id:"g3s-"+String(i+1).padStart(2,"0"),domain:r[0],passage:r[1],question:r[2],choices:r[3],answer:r[4],explanation:r[5]}));
if(all.length!==18||all.some(q=>q.choices.length!==3||new Set(q.choices).size!==3||q.answer<0||q.answer>2))throw Error("Grade 3 science data invalid");
window.LLA_GRADE3_SCIENCE={titles,all};
})();