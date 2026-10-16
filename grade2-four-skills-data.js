/* Independent Grade 2 four-skill supplementary prototype. All exercise text is original.
 * Mapping basis: Qatar MOEHE Early Years English Grade 2 Semester 1 Overview 2026-27,
 * pp. 2-3 and 4-16. NOT an approved curriculum or an assessment instrument.
 * Adult-read listening is guided practice, not recorded/audio-proficiency testing.
 */
window.LLA_G2_FOUR_SKILLS = Object.freeze([
  {
    id:"welcome",title:"Welcome back!",ar:"مرحبًا بعودتك",week:"Orientation and Module 1",
    outcome:"Use greetings, classroom words and short sentences.",
    listen:{script:"Please put the pencil beside the book. Then point to your desk.",question:"Which object should be beside the book?",choices:["Pencil","Apple","Ball"],answer:0},
    speak:{prompt:"Pretend your name is Noor. Greet a friend and introduce yourself.",example:"Hello! My name is Noor.",check:"Did the learner use a greeting and a complete introduction?"},
    read:{passage:"On Sunday, Noor brings a blue notebook to class. Her friend Sami has a green pencil. They sit near the window and read a short story together.",question:"What colour is Noor's notebook?",choices:["Blue","Green","Yellow"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["This","is","my","book"],answer:"This is my book."}
  },
  {
    id:"me",title:"That's me!",ar:"هذا أنا",week:"Module 2",
    outcome:"Recognise jobs and action words and describe ability with can.",
    listen:{script:"The doctor helps people. The pilot flies a plane. The gardener grows flowers.",question:"Who flies a plane?",choices:["Gardener","Pilot","Doctor"],answer:1},
    speak:{prompt:"Tell an adult one thing a pretend character can do.",example:"I can jump.",check:"Did the learner make a clear sentence using 'can'?"},
    read:{passage:"Hassan can run fast, but his little sister Amina likes to swim. On Friday, they visit a park. Hassan plays football while Amina reads a book.",question:"What does Amina like to do?",choices:["Swim","Sing","Paint"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["I","can","jump"],answer:"I can jump."}
  },
  {
    id:"people",title:"About people",ar:"عن الناس",week:"Module 3",
    outcome:"Describe simple appearance, objects and possessions using has.",
    listen:{script:"The girl has a red bag and a yellow hat. Her brother has a blue ball.",question:"What is red?",choices:["Hat","Ball","Bag"],answer:2},
    speak:{prompt:"Describe a pretend character with a kind, factual sentence.",example:"She has a yellow hat.",check:"Did the learner describe an object or appearance without unkind labels?"},
    read:{passage:"Sara has a small robot and a yellow kite. Her brother Omar has a red ball. They share their toys at the park and play together happily.",question:"Who has a robot?",choices:["Omar","Sara","Their teacher"],answer:1},
    write:{prompt:"Type the sentence using the word clues:",clues:["She","has","a","kite"],answer:"She has a kite."}
  },
  {
    id:"food",title:"Food and drink",ar:"الطعام والشراب",week:"Module 4",
    outcome:"Identify food vocabulary and make simple polite requests.",
    listen:{script:"I would like water, please. My friend wants an apple, and my sister asks for rice.",question:"Which drink was requested?",choices:["Milk","Juice","Water"],answer:2},
    speak:{prompt:"Ask politely for a drink while role-playing at a pretend café.",example:"I would like water, please.",check:"Did the learner use a polite request?"},
    read:{passage:"Mariam and her family prepare lunch on Saturday. Her father washes the carrots, and Mariam puts the rice on the table. Everyone drinks water with their meal.",question:"What does Mariam's father wash?",choices:["Carrots","Plates","Apples"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["I","like","rice"],answer:"I like rice."}
  },
  {
    id:"meals",title:"What I eat",ar:"ماذا آكل",week:"Module 5",
    outcome:"Describe simple meals, quantities and everyday food routines.",
    listen:{script:"At breakfast, I eat dates and drink milk. At lunch, I eat rice and vegetables.",question:"What food was named for breakfast?",choices:["Dates","Rice","Carrots"],answer:0},
    speak:{prompt:"Pretend you are telling a friend about breakfast.",example:"For breakfast, I eat dates.",check:"Did the learner make a clear statement about a meal?"},
    read:{passage:"At the school picnic, Amal brings two apples and a sandwich. Her friend Ali brings water and dates. They wash their hands before eating and clean the table afterward.",question:"What does Ali bring?",choices:["Water and dates","Two apples","A kite"],answer:0},
    write:{prompt:"Type the sentence using the word clues:",clues:["There","are","two","apples"],answer:"There are two apples."}
  }
].map(m=>Object.freeze(m)));
