/* Independent Grade 2 four-skill supplementary prototype. All exercise text is original.
 * Mapping basis: Qatar MOEHE Early Years English Grade 2 Semester 1 Overview 2026-27,
 * pp. 2-3 and 4-16. NOT an approved curriculum or an assessment instrument.
 * Adult-read listening is guided practice, not recorded/audio-proficiency testing.
 */
window.LLA_G2_FOUR_SKILLS = Object.freeze([
  {
    id:"welcome",title:"Welcome back!",ar:"مرحبًا بعودتك",week:"Weeks 1–2 • orientation and Module 1",
    outcome:"Use greetings, classroom words and short sentences.",
    listen:{script:"Please put the pencil beside the book. Then point to your desk.",question:"Which object should be beside the book?",choices:["Pencil","Apple","Ball"],answer:0},
    speak:{prompt:"Pretend your name is Noor. Greet a friend and introduce yourself.",example:"Hello! My name is Noor.",check:"Did the learner use a greeting and a complete introduction?"},
    read:{passage:"On Sunday, Noor brings a blue notebook to class. Her friend Sami has a green pencil. They sit near the window and read a short story together.",question:"What colour is Noor's notebook?",choices:["Blue","Green","Yellow"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["This","is","my","book"],answer:"This is my book."}
  },
  {
    id:"me",title:"That's me!",ar:"هذا أنا",week:"Weeks 2–4 • Module 2",
    outcome:"Name occupations and actions; describe ability using can or cannot.",
    listen:{script:"The doctor helps people. The pilot flies a plane. The gardener grows flowers.",question:"Who flies a plane?",choices:["Gardener","Pilot","Doctor"],answer:1},
    speak:{prompt:"Tell an adult one thing a pretend character can do.",example:"I can jump.",check:"Did the learner make a clear sentence using 'can'?"},
    read:{passage:"Hassan can run fast, but his little sister Amina likes to swim. On Friday, they visit a park. Hassan plays football while Amina reads a book.",question:"What does Amina like to do?",choices:["Swim","Sing","Paint"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["I","can","jump"],answer:"I can jump."},
    phonics:[
      {family:"-ing",prompt:"Which word belongs to the -ing word family?",choices:["king","hand","ball"],answer:0},
      {family:"-and",prompt:"Which word belongs to the -and word family?",choices:["ring","sand","wall"],answer:1}
    ]
  },
  {
    id:"people",title:"About people",ar:"عن الناس",week:"Weeks 4–6 • Module 3",
    outcome:"Describe appearance, toys and possessions using have got / has got.",
    listen:{script:"The girl has got a red bag and a yellow hat. Her brother has got a blue ball.",question:"What is red?",choices:["Hat","Ball","Bag"],answer:2},
    speak:{prompt:"Describe a pretend character with a kind, factual sentence.",example:"She has got a yellow hat.",check:"Did the learner describe an object or appearance without unkind labels?"},
    read:{passage:"Sara has got a small robot and a yellow kite. Her brother Omar has got a red ball. They share their toys at the park and play together happily.",question:"Who has a robot?",choices:["Omar","Sara","Their teacher"],answer:1},
    write:{prompt:"Type the sentence using the word clues:",clues:["She","has","got","a","kite"],answer:"She has got a kite."},
    phonics:[
      {family:"-all",prompt:"Which word belongs to the -all word family?",choices:["wall","snack","king"],answer:0},
      {family:"-ack",prompt:"Which word belongs to the -ack word family?",choices:["tall","black","train"],answer:1}
    ]
  },
  {
    id:"food",title:"Food and drink",ar:"الطعام والشراب",week:"Weeks 10–11 • Module 4",
    outcome:"Name food and drinks, express likes or dislikes, and practise polite requests.",
    listen:{script:"I would like water, please. My friend wants an apple, and my sister asks for rice.",question:"Which drink was requested?",choices:["Milk","Juice","Water"],answer:2},
    speak:{prompt:"Ask politely for a drink while role-playing at a pretend café.",example:"I would like water, please.",check:"Did the learner use a polite request?"},
    read:{passage:"Mariam likes rice, but her brother prefers carrots. On Saturday, their father washes the carrots. Mariam puts rice on the table. The family drinks water with lunch.",question:"What does Mariam's father wash?",choices:["Carrots","Plates","Apples"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["I","like","rice"],answer:"I like rice."},
    phonics:[
      {family:"-ain",prompt:"Which word belongs to the -ain word family?",choices:["drink","rain","day"],answer:1},
      {family:"-ink",prompt:"Which word belongs to the -ink word family?",choices:["train","play","pink"],answer:2}
    ]
  },
  {
    id:"meals",title:"What I eat",ar:"ماذا آكل",week:"Weeks 12–13 • Module 5",
    outcome:"Name meals and food; use there is / there are to describe amounts.",
    listen:{script:"At breakfast, there are dates on the plate and there is milk in a cup. At lunch, there is rice and there are carrots.",question:"What food was named for breakfast?",choices:["Dates","Rice","Carrots"],answer:0},
    speak:{prompt:"Pretend you are telling a friend about breakfast.",example:"For breakfast, I eat dates.",check:"Did the learner make a clear statement about a meal?"},
    read:{passage:"At the school picnic, Amal brings two apples and a sandwich. Her friend Ali brings water and dates. They wash their hands before eating and clean the table afterward.",question:"What does Ali bring?",choices:["Water and dates","Two apples","A kite"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["There","are","two","apples"],answer:"There are two apples."},
    phonics:[
      {family:"-ay",prompt:"Which word belongs to the -ay word family?",choices:["quick","play","rain"],answer:1},
      {family:"-ick",prompt:"Which word belongs to the -ick word family?",choices:["day","drink","sick"],answer:2}
    ]
  }
].map(m=>Object.freeze(m)));
