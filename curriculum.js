window.LLA_CURRICULUM={
  profile:{
    title:"Primary Level 1",
    age:"6–7",
    qatar:"Qatar Grade 1",
    british:"British Year 2 core + Year 1 phonics bridge",
    american:"US Grade 1",
    note:"Designed as a supplementary bilingual learning app for children in Qatar. It does not replace a school's own curriculum."
  },
  subjects:[
    {
      id:"english",icon:"🔤",title:"English",ar:"اللغة الإنجليزية",colour:"blue",
      standards:["British KS1 literacy","US Grade 1 ELA"],
      lessons:[
        {id:"phonics",title:"Sounds & Phonics",ar:"الأصوات والقراءة",intro:"Hear, blend and read simple words.",items:[["🐱","cat"],["🐟","fish"],["☀️","sun"],["🚌","bus"]],quiz:{q:"Which word begins with the /s/ sound?",choices:["sun","cat","fish"],answer:0}},
        {id:"words",title:"Everyday Words",ar:"كلمات يومية",intro:"Build useful school and home vocabulary.",items:[["🏠","home"],["📘","book"],["✏️","pencil"],["🏫","school"]],quiz:{q:"Which word means a place where children learn?",choices:["book","school","home"],answer:1}},
        {id:"sentences",title:"Simple Sentences",ar:"جمل بسيطة",intro:"Listen, speak and build short sentences.",items:[["👧","I can read."],["👦","I can play."],["🐦","The bird can fly."],["🌱","The plant is green."]],quiz:{q:"Which is a complete sentence?",choices:["green plant","I can read.","the bird"],answer:1}}
      ]
    },
    {
      id:"math",icon:"🔢",title:"Mathematics",ar:"الرياضيات",colour:"yellow",
      standards:["British Year 2 number/measure/geometry","US Grade 1 Common Core overlap"],
      lessons:[
        {id:"numbers",title:"Numbers to 100",ar:"الأعداد حتى 100",intro:"Count, compare and find one more or one less.",items:[["1️⃣","1"],["🔟","10"],["2️⃣0️⃣","20"],["💯","100"]],quiz:{q:"What is one more than 19?",choices:["18","20","29"],answer:1}},
        {id:"addition",title:"Addition & Subtraction",ar:"الجمع والطرح",intro:"Use pictures and number facts within 20.",items:[["🍎","5 + 3 = 8"],["⭐","10 - 2 = 8"],["🧸","6 + 4 = 10"],["⚽","9 - 3 = 6"]],quiz:{q:"What is 7 + 3?",choices:["9","10","11"],answer:1}},
        {id:"shapes",title:"Shapes & Measure",ar:"الأشكال والقياس",intro:"Recognise shapes and compare length, mass and time.",items:[["🔺","triangle"],["🟦","square"],["⚪","circle"],["🕒","time"]],quiz:{q:"Which shape has 3 sides?",choices:["circle","triangle","square"],answer:1}}
      ]
    },
    {
      id:"science",icon:"🔬",title:"Science",ar:"العلوم",colour:"green",
      standards:["British KS1 science themes","International primary science overlap"],
      lessons:[
        {id:"living",title:"Living Things",ar:"الكائنات الحية",intro:"Explore animals, plants and what living things need.",items:[["🐪","camel"],["🐦","bird"],["🌴","plant"],["💧","water"]],quiz:{q:"Which one is a plant?",choices:["camel","palm","bird"],answer:1}},
        {id:"body",title:"My Body & Senses",ar:"جسمي وحواسي",intro:"Learn body parts and the five senses.",items:[["👁️","eyes"],["👂","ears"],["👃","nose"],["✋","hands"]],quiz:{q:"Which body part helps you hear?",choices:["eyes","ears","hands"],answer:1}},
        {id:"materials",title:"Everyday Materials",ar:"المواد من حولنا",intro:"Notice what objects are made from and how materials differ.",items:[["🪵","wood"],["🥛","glass"],["🥄","metal"],["🧴","plastic"]],quiz:{q:"Which material is often used for a spoon?",choices:["metal","paper","water"],answer:0}}
      ]
    },
    {
      id:"life",icon:"🌱",title:"Life Skills",ar:"المهارات الحياتية",colour:"pink",
      standards:["Health, relationships and personal development support"],
      lessons:[
        {id:"healthy",title:"Healthy Habits",ar:"عادات صحية",intro:"Practise hygiene, movement, rest and healthy choices.",items:[["🧼","wash hands"],["🪥","brush teeth"],["💧","drink water"],["😴","sleep well"]],quiz:{q:"What should we do before eating?",choices:["wash hands","skip water","stay awake"],answer:0}},
        {id:"kindness",title:"Kindness & Respect",ar:"اللطف والاحترام",intro:"Use kind words, take turns and help others.",items:[["🤝","help"],["💬","kind words"],["❤️","care"],["🙋","take turns"]],quiz:{q:"Which action shows kindness?",choices:["helping","shouting","pushing"],answer:0}}
      ]
    },
    {
      id:"arts",icon:"🎨",title:"Creative Arts",ar:"الفنون الإبداعية",colour:"purple",
      standards:["Creative expression and visual pattern practice"],
      lessons:[
        {id:"patterns",title:"Colour & Shape Patterns",ar:"أنماط الألوان والأشكال",intro:"See, say and continue simple patterns.",items:[["🔴","red"],["🟡","yellow"],["⭐","star"],["💙","blue"]],quiz:{q:"Red, yellow, red, yellow … what comes next?",choices:["red","blue","green"],answer:0}},
        {id:"draw",title:"Draw & Create",ar:"ارسم وابتكر",intro:"Use shapes and imagination to make a picture.",items:[["🏠","house"],["🌞","sun"],["🌳","tree"],["☁️","cloud"]],quiz:{q:"Which shape can help you draw a roof?",choices:["triangle","circle","line only"],answer:0}}
      ]
    }
  ],
  qatarCore:[
    {icon:"🕌",title:"Islamic Studies",ar:"التربية الإسلامية",status:"review"},
    {icon:"🇶🇦",title:"Qatar History & Identity",ar:"تاريخ قطر والهوية",status:"review"},
    {icon:"ع",title:"Arabic",ar:"اللغة العربية",status:"review"}
  ]
};