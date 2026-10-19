/* Little Learners Academy • proposed Grade 1 national-content preview.
 * Adult educator/developer review ONLY. Do not link in production navigation
 * until qualified Arabic, Islamic Studies and Qatar History review is complete.
 * Written from scratch as supplementary practice: NOT a MOEHE textbook or endorsed syllabus.
 */
window.LLA_NATIONAL_CORE_G1 = Object.freeze({
  version: '2026-10-16-draft-1',
  grade: 1,
  stage: 'DRAFT_REVIEW_REQUIRED',
  sources: [
    {name:'Qatar MOEHE — compulsory national-content policy overview', url:'https://www.edu.gov.qa/en/News/Details/1621800'},
    {name:'MOEHE — private-school academic monitoring policy (historical reference; verify currency)', url:'https://privateschoolssearch.edu.gov.qa/Documents/PolticPrivateSchoolsEnglish.pdf'},
    {name:'W3C — WCAG 2.2', url:'https://www.w3.org/TR/WCAG22/'},
    {name:'UNESCO — inclusion in open and distance learning', url:'https://www.unesco.org/en/communication-information/odl-guidelines'}
  ],
  units: [
    {
      id:'arabic-words', icon:'🔤', colour:'blue',
      en:'Arabic Language', ar:'اللغة العربية',
      objectiveEn:'Recognise common written Arabic words and initial letters; this is not a validated phonics sequence.',
      objectiveAr:'التعرّف إلى كلمات عربية مألوفة وحروفها الأولى — مسودة للمراجعة.',
      learn:[
        {icon:'🚪',en:'door',ar:'باب'},
        {icon:'📖',en:'book',ar:'كتاب'},
        {icon:'🏠',en:'home',ar:'بيت'}
      ],
      reviewNote:'Arabic teacher: check Grade 1 learning progression, orthography, tashkeel, dialect-neutral instructions and eventual native-speaker recordings.',
      questions:[
        {id:'G1-AR-001',emoji:'🚪',en:'Find the Arabic word for “door”.',ar:'اختر الكلمة العربية التي تعني «باب».',choices:[{en:'Door',ar:'باب'},{en:'Book',ar:'كتاب'},{en:'Sun',ar:'شمس'}],answer:0,tipEn:'Look for باب, the Arabic word for door.',tipAr:'الكلمة الصحيحة هي «باب».'},
        {id:'G1-AR-002',emoji:'📖',en:'Which Arabic word means “book”?',ar:'أي كلمة تعني «كتاب»؟',choices:[{en:'Book',ar:'كتاب'},{en:'Water',ar:'ماء'},{en:'Home',ar:'بيت'}],answer:0,tipEn:'The word كتاب means book.',tipAr:'كلمة «كتاب» تعني كتابًا.'},
        {id:'G1-AR-003',emoji:'🏠',en:'Choose the Arabic word for “home”.',ar:'اختر الكلمة التي تعني «بيت».',choices:[{en:'Home',ar:'بيت'},{en:'Pen',ar:'قلم'},{en:'Moon',ar:'قمر'}],answer:0,tipEn:'بيت means home or house.',tipAr:'«بيت» تعني المنزل.'},
        {id:'G1-AR-004',emoji:'☀️',en:'Which word means “sun”?',ar:'أي كلمة تعني «الشمس»؟',choices:[{en:'Tree',ar:'شجرة'},{en:'Sun',ar:'شمس'},{en:'Sea',ar:'بحر'}],answer:1,tipEn:'شمس means sun.',tipAr:'الكلمة الصحيحة هي «شمس».'},
        {id:'G1-AR-005',emoji:'✏️',en:'Which letter comes first in قَلَم?',ar:'ما الحرف الأول في كلمة «قَلَم»؟',choices:[{en:'Meem',ar:'م'},{en:'Ba',ar:'ب'},{en:'Qaf',ar:'ق'}],answer:2,tipEn:'قَلَم begins with the letter ق.',tipAr:'تبدأ كلمة «قَلَم» بحرف القاف «ق».'},
        {id:'G1-AR-006',emoji:'🚪',en:'Which letter begins the word باب?',ar:'ما الحرف الأول في كلمة «باب»؟',choices:[{en:'Ba',ar:'ب'},{en:'Ta',ar:'ت'},{en:'Noon',ar:'ن'}],answer:0,tipEn:'باب begins with ب.',tipAr:'تبدأ كلمة «باب» بحرف الباء «ب».'}
      ]
    },
    {
      id:'islamic-manners',icon:'🌱',colour:'green',
      en:'Islamic Studies: Good Manners', ar:'التربية الإسلامية: الآداب الحسنة',
      objectiveEn:'Practise kindness, respectful greetings, permission and fair behaviour as an introductory manners lesson; not a complete religious course.',
      objectiveAr:'التدرّب على اللطف والتحية والاستئذان والعدل — محتوى تمهيدي للمراجعة.',
      learn:[
        {icon:'🤝',en:'Help others',ar:'ساعد الآخرين'},
        {icon:'💬',en:'Use kind words',ar:'تكلّم بلطف'},
        {icon:'🙋',en:'Ask permission',ar:'استأذن أولًا'}
      ],
      reviewNote:'Qualified Islamic Studies teacher: check Islamic framing, grade suitability, translation and any proposed references to Quran/hadith. Do not add verses, rulings or graded religious claims without review.',
      questions:[
        {id:'G1-IS-001',emoji:'📚',en:'A friend drops their books. What is a kind thing to do?',ar:'سقطت كتب صديقك. ما التصرّف اللطيف؟',choices:[{en:'Help pick them up',ar:'أساعده في جمعها'},{en:'Laugh at them',ar:'أضحك عليه'},{en:'Walk away',ar:'أبتعد دون مساعدة'}],answer:0,tipEn:'Helping someone is a kind action.',tipAr:'مساعدة الآخرين تصرّف لطيف.'},
        {id:'G1-IS-002',emoji:'👋',en:'Someone says “السلام عليكم”. Which reply is appropriate?',ar:'قال شخص «السلام عليكم». بماذا ترد؟',choices:[{en:'Goodnight',ar:'تصبح على خير'},{en:'And peace be upon you',ar:'وعليكم السلام'},{en:'Welcome',ar:'أهلًا'}],answer:1,tipEn:'A familiar reply is وعليكم السلام.',tipAr:'الرد المناسب هو «وعليكم السلام».'},
        {id:'G1-IS-003',emoji:'✏️',en:'You want to use someone else’s pencil. What should you do?',ar:'تريد استعمال قلم شخص آخر. ماذا تفعل؟',choices:[{en:'Take it quickly',ar:'آخذه دون سؤال'},{en:'Hide it',ar:'أخفيه'},{en:'Ask permission',ar:'أستأذن أولًا'}],answer:2,tipEn:'Ask permission before borrowing.',tipAr:'استأذن قبل استعارة الأشياء.'},
        {id:'G1-IS-004',emoji:'🌷',en:'Someone helps you. What is a polite response?',ar:'ساعدك شخص ما. ماذا تقول بأدب؟',choices:[{en:'Thank you',ar:'شكرًا'},{en:'Go away',ar:'ابتعد'},{en:'Nothing matters',ar:'لا يهم'}],answer:0,tipEn:'Thanking people shows appreciation.',tipAr:'الشكر يدل على التقدير.'},
        {id:'G1-IS-005',emoji:'🧸',en:'Two children want the same toy. What is a fair choice?',ar:'يريد طفلان اللعبة نفسها. ما التصرّف العادل؟',choices:[{en:'Push the other child',ar:'أدفع الطفل الآخر'},{en:'Take turns',ar:'نتبادل الأدوار'},{en:'Hide the toy',ar:'أخفي اللعبة'}],answer:1,tipEn:'Taking turns is a fair way to share.',tipAr:'تبادل الأدوار يساعد على العدل.'},
        {id:'G1-IS-006',emoji:'💛',en:'A younger child feels worried. How can you show kindness?',ar:'يشعر طفل أصغر بالقلق. كيف تظهر اللطف؟',choices:[{en:'Tease them',ar:'أسخر منه'},{en:'Shout at them',ar:'أصرخ عليه'},{en:'Speak gently and offer help',ar:'أتحدث بلطف وأعرض المساعدة'}],answer:2,tipEn:'Gentle words and help can reassure others.',tipAr:'الكلام اللطيف والمساعدة يطمئنان الآخرين.'}
      ]
    },
    {
      id:'qatar-identity',icon:'🇶🇦',colour:'maroon',
      en:'Qatar History & Identity', ar:'تاريخ قطر والهوية الوطنية',
      objectiveEn:'Identify introductory facts about Qatar, a few aspects of maritime heritage and ways to care for our shared environment.',
      objectiveAr:'التعرّف إلى معلومات أساسية عن قطر وبعض جوانب تراثها البحري والمحافظة على البيئة.',
      learn:[
        {icon:'🇶🇦',en:'Qatar’s flag',ar:'علم قطر'},
        {icon:'⛵',en:'Traditional sea travel',ar:'الحياة البحرية قديمًا'},
        {icon:'🏙️',en:'Doha',ar:'الدوحة'}
      ],
      reviewNote:'Qatar History teacher: verify cultural/historical accuracy, terminology, curricular timing, factual sources and contextualisation of traditional occupations.',
      questions:[
        {id:'G1-QA-001',emoji:'🇶🇦',en:'Which two colours are on Qatar’s national flag?',ar:'ما لونا علم دولة قطر؟',choices:[{en:'Green and white',ar:'الأخضر والأبيض'},{en:'Maroon and white',ar:'العنابي والأبيض'},{en:'Blue and yellow',ar:'الأزرق والأصفر'}],answer:1,tipEn:'Qatar’s flag has maroon and white.',tipAr:'علم قطر باللونين العنابي والأبيض.'},
        {id:'G1-QA-002',emoji:'🏙️',en:'What is the capital of Qatar?',ar:'ما عاصمة دولة قطر؟',choices:[{en:'Doha',ar:'الدوحة'},{en:'Al Khor',ar:'الخور'},{en:'Al Wakrah',ar:'الوكرة'}],answer:0,tipEn:'Doha is Qatar’s capital.',tipAr:'الدوحة هي عاصمة قطر.'},
        {id:'G1-QA-003',emoji:'⛵',en:'What is a traditional boat associated with Qatar’s maritime heritage?',ar:'ما القارب التقليدي المرتبط بتراث قطر البحري؟',choices:[{en:'Airplane',ar:'طائرة'},{en:'Train',ar:'قطار'},{en:'Dhow',ar:'مركب شراعي تقليدي'}],answer:2,tipEn:'Traditional sailing dhows were used along the Gulf coast.',tipAr:'استُخدمت المراكب الشراعية التقليدية في الخليج.'},
        {id:'G1-QA-004',emoji:'🦪',en:'Which activity was part of Qatar’s traditional maritime life?',ar:'أي نشاط كان جزءًا من الحياة البحرية القديمة في قطر؟',choices:[{en:'Space exploration',ar:'استكشاف الفضاء'},{en:'Pearl diving',ar:'الغوص لاستخراج اللؤلؤ'},{en:'Building airplanes',ar:'صناعة الطائرات'}],answer:1,tipEn:'Pearl diving was historically important to Qatar.',tipAr:'كان الغوص لاستخراج اللؤلؤ مهمًّا في تاريخ قطر.'},
        {id:'G1-QA-005',emoji:'🏖️',en:'How can we take care of Qatar’s beaches?',ar:'كيف نحافظ على شواطئ قطر؟',choices:[{en:'Put rubbish in bins',ar:'نضع النفايات في الحاويات'},{en:'Leave plastic on sand',ar:'نترك البلاستيك على الرمال'},{en:'Damage sea plants',ar:'نتلف النباتات البحرية'}],answer:0,tipEn:'Keep beaches clean to protect people and nature.',tipAr:'نحافظ على نظافة الشواطئ لحماية الناس والطبيعة.'},
        {id:'G1-QA-006',emoji:'🇶🇦',en:'Which country is represented by this flag? 🇶🇦',ar:'أي دولة يمثّلها هذا العلم؟ 🇶🇦',choices:[{en:'Oman',ar:'عُمان'},{en:'Qatar',ar:'قطر'},{en:'Kuwait',ar:'الكويت'}],answer:1,tipEn:'This is the flag of Qatar.',tipAr:'هذا علم دولة قطر.'}
      ]
    }
  ]
});