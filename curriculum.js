window.LLA_CURRICULUM={
  profile:{
    title:"Primary Level 1",
    age:"6–7",
    qatar:"Qatar Grade 1",
    british:"British Year 2 core + Year 1 phonics bridge",
    american:"US Grade 1",
    note:"A supplementary bilingual learning bridge for children in Qatar. It does not replace a school's own curriculum."
  },
  subjects:[
    {
      id:"english",icon:"🔤",title:"English",ar:"اللغة الإنجليزية",colour:"blue",
      standards:["British KS1 literacy","US Grade 1 ELA"],
      lessons:[
        {id:"phonics",title:"Sounds & Phonics",ar:"الأصوات والقراءة",intro:"Hear, blend and read simple words.",arIntro:"استمع إلى الأصوات وادمجها واقرأ كلمات بسيطة.",items:[["🐱","cat","قطة"],["🐟","fish","سمكة"],["☀️","sun","شمس"],["🚌","bus","حافلة"]],quiz:{q:"Which word begins with the /s/ sound?",arQ:"أي كلمة تبدأ بصوت /s/؟",choices:[["sun","شمس"],["cat","قطة"],["fish","سمكة"]],answer:0}},
        {id:"words",title:"Everyday Words",ar:"كلمات يومية",intro:"Build useful school and home vocabulary.",arIntro:"تعلّم كلمات مفيدة للمدرسة والمنزل.",items:[["🏠","home","منزل"],["📘","book","كتاب"],["✏️","pencil","قلم رصاص"],["🏫","school","مدرسة"]],quiz:{q:"Which word means a place where children learn?",arQ:"أي كلمة تعني مكانًا يتعلم فيه الأطفال؟",choices:[["book","كتاب"],["school","مدرسة"],["home","منزل"]],answer:1}},
        {id:"sentences",title:"Simple Sentences",ar:"جمل بسيطة",intro:"Listen, speak and build short sentences.",arIntro:"استمع وتحدث وابنِ جملًا قصيرة.",items:[["👧","I can read.","أستطيع القراءة."],["👦","I can play.","أستطيع اللعب."],["🐦","The bird can fly.","يستطيع الطائر الطيران."],["🌱","The plant is green.","النبات أخضر."]],quiz:{q:"Which is a complete sentence?",arQ:"أي خيار جملة كاملة؟",choices:[["green plant","نبات أخضر"],["I can read.","أستطيع القراءة."],["the bird","الطائر"]],answer:1}}
      ]
    },
    {
      id:"math",icon:"🔢",title:"Mathematics",ar:"الرياضيات",colour:"yellow",
      standards:["British Year 2 number, measure and geometry","US Grade 1 Common Core overlap"],
      lessons:[
        {id:"numbers",title:"Numbers to 100",ar:"الأعداد حتى 100",intro:"Count, compare and find one more or one less.",arIntro:"عدّ وقارن واعثر على العدد الأكبر أو الأصغر بواحد.",items:[["1️⃣","1","واحد"],["🔟","10","عشرة"],["2️⃣0️⃣","20","عشرون"],["💯","100","مئة"]],quiz:{q:"What is one more than 19?",arQ:"ما العدد الذي يزيد واحدًا على 19؟",choices:[["18","18"],["20","20"],["29","29"]],answer:1}},
        {id:"addition",title:"Addition & Subtraction",ar:"الجمع والطرح",intro:"Use pictures and number facts within 20.",arIntro:"استخدم الصور وحقائق الأعداد ضمن 20.",items:[["🍎","5 + 3 = 8","خمسة زائد ثلاثة يساوي ثمانية"],["⭐","10 - 2 = 8","عشرة ناقص اثنين يساوي ثمانية"],["🧸","6 + 4 = 10","ستة زائد أربعة يساوي عشرة"],["⚽","9 - 3 = 6","تسعة ناقص ثلاثة يساوي ستة"]],quiz:{q:"What is 7 + 3?",arQ:"كم يساوي 7 + 3؟",choices:[["9","9"],["10","10"],["11","11"]],answer:1}},
        {id:"shapes",title:"Shapes & Measure",ar:"الأشكال والقياس",intro:"Recognise shapes and compare length, mass and time.",arIntro:"تعرّف على الأشكال وقارن الطول والكتلة والوقت.",items:[["🔺","triangle","مثلث"],["🟦","square","مربع"],["⚪","circle","دائرة"],["🕒","time","الوقت"]],quiz:{q:"Which shape has 3 sides?",arQ:"أي شكل له ثلاثة أضلاع؟",choices:[["circle","دائرة"],["triangle","مثلث"],["square","مربع"]],answer:1}}
      ]
    },
    {
      id:"science",icon:"🔬",title:"Science",ar:"العلوم",colour:"green",
      standards:["British KS1 science themes","International primary science overlap"],
      lessons:[
        {id:"living",title:"Living Things",ar:"الكائنات الحية",intro:"Explore animals, plants and what living things need.",arIntro:"استكشف الحيوانات والنباتات وما تحتاجه الكائنات الحية.",items:[["🐪","camel","جمل"],["🐦","bird","طائر"],["🌴","palm tree","نخلة"],["💧","water","ماء"]],quiz:{q:"Which one is a plant?",arQ:"أيٌّ مما يلي نبات؟",choices:[["camel","جمل"],["palm tree","نخلة"],["bird","طائر"]],answer:1}},
        {id:"body",title:"My Body & Senses",ar:"جسمي وحواسي",intro:"Learn body parts and the five senses.",arIntro:"تعلّم أجزاء الجسم والحواس الخمس.",items:[["👁️","eyes","العينان"],["👂","ears","الأذنان"],["👃","nose","الأنف"],["✋","hands","اليدان"]],quiz:{q:"Which body part helps you hear?",arQ:"أي جزء من الجسم يساعدك على السمع؟",choices:[["eyes","العينان"],["ears","الأذنان"],["hands","اليدان"]],answer:1}},
        {id:"materials",title:"Everyday Materials",ar:"المواد من حولنا",intro:"Notice what objects are made from and how materials differ.",arIntro:"لاحظ ممَّ صُنعت الأشياء وكيف تختلف المواد.",items:[["🪵","wood","خشب"],["🥛","glass","زجاج"],["🥄","metal","معدن"],["🧴","plastic","بلاستيك"]],quiz:{q:"Which material is often used for a spoon?",arQ:"أي مادة تُستخدم غالبًا لصنع الملعقة؟",choices:[["metal","معدن"],["paper","ورق"],["water","ماء"]],answer:0}}
      ]
    },
    {
      id:"life",icon:"🌱",title:"Life Skills",ar:"المهارات الحياتية",colour:"pink",
      standards:["Health, relationships and personal development support"],
      lessons:[
        {id:"healthy",title:"Healthy Habits",ar:"عادات صحية",intro:"Practise hygiene, movement, rest and healthy choices.",arIntro:"تدرّب على النظافة والحركة والراحة والاختيارات الصحية.",items:[["🧼","wash hands","اغسل يديك"],["🪥","brush teeth","نظف أسنانك"],["💧","drink water","اشرب الماء"],["😴","sleep well","نم جيدًا"]],quiz:{q:"What should we do before eating?",arQ:"ماذا نفعل قبل تناول الطعام؟",choices:[["wash hands","نغسل أيدينا"],["skip water","لا نشرب الماء"],["stay awake","نبقى مستيقظين"]],answer:0}},
        {id:"kindness",title:"Kindness & Respect",ar:"اللطف والاحترام",intro:"Use kind words, take turns and help others.",arIntro:"استخدم كلمات طيبة وانتظر دورك وساعد الآخرين.",items:[["🤝","help","ساعد"],["💬","kind words","كلمات طيبة"],["❤️","care","اهتم"],["🙋","take turns","انتظر دورك"]],quiz:{q:"Which action shows kindness?",arQ:"أي تصرف يدل على اللطف؟",choices:[["helping","المساعدة"],["shouting","الصراخ"],["pushing","الدفع"]],answer:0}}
      ]
    },
    {
      id:"arts",icon:"🎨",title:"Creative Arts",ar:"الفنون الإبداعية",colour:"purple",
      standards:["Creative expression and visual pattern practice"],
      lessons:[
        {id:"patterns",title:"Colour & Shape Patterns",ar:"أنماط الألوان والأشكال",intro:"See, say and continue simple patterns.",arIntro:"شاهد وقل وأكمل الأنماط البسيطة.",items:[["🔴","red","أحمر"],["🟡","yellow","أصفر"],["⭐","star","نجمة"],["💙","blue","أزرق"]],quiz:{q:"Red, yellow, red, yellow … what comes next?",arQ:"أحمر، أصفر، أحمر، أصفر... ماذا يأتي بعد ذلك؟",choices:[["red","أحمر"],["blue","أزرق"],["green","أخضر"]],answer:0}},
        {id:"draw",title:"Draw & Create",ar:"ارسم وابتكر",intro:"Use shapes and imagination to make a picture.",arIntro:"استخدم الأشكال والخيال لصنع صورة.",items:[["🏠","house","منزل"],["🌞","sun","شمس"],["🌳","tree","شجرة"],["☁️","cloud","سحابة"]],quiz:{q:"Which shape can help you draw a roof?",arQ:"أي شكل يساعدك على رسم سقف؟",choices:[["triangle","مثلث"],["circle","دائرة"],["line only","خط فقط"]],answer:0}}
      ]
    }
  ],
  qatarCore:[
    {icon:"🕌",title:"Islamic Studies",ar:"التربية الإسلامية",status:"review"},
    {icon:"🇶🇦",title:"Qatar History & Identity",ar:"تاريخ قطر والهوية",status:"review"},
    {icon:"ع",title:"Arabic",ar:"اللغة العربية",status:"review"}
  ]
};
