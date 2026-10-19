/* Reviewer-facing translations for the guided Grade 2 maths lesson.
 * English = original draft; Arabic = draft for qualified Arabic educator review.
 * Do not label either language as Ministry- or school-approved.
 */
(()=>{
"use strict";
const text={
 en:{
  back:"← Grade 2 Maths • رياضيات الصف الثاني",
  badge:"🧮 ADULT-GUIDED TEACHING PILOT • FOR EDUCATOR REVIEW",
  heading:"Tens & Ones Explorer",
  goalLabel:"Today's learning goal:",
  goal:"Build a two-digit number using groups of ten and single ones, then explain what each digit means.",
  warning:"Not a test or official school lesson. This is an original, supplementary Grade 2 teaching prototype. Arabic text, age suitability and curriculum alignment require qualified review. No scores, accounts, recordings, timers or progress storage.",
  parentHeading:"👨‍👩‍👧 A note for parents and teachers",
  parentText:"Ask the child to touch or count one ten-stick as ten, then count the single dots. After the last practice question, encourage an explanation in their own words. Do not mark a child as having mastered place value just because they completed these screens.",
  parentNote:"This lesson does not connect to external services or save answers. The illustrated tens are schematic teaching models, not physical manipulatives. Please confirm developmental suitability, accessibility and draft bilingual labels with an educator before release.",
  stageLabels:["See","Guided try","Independent practice","Explain"],
  progress:(n)=>"Step "+n+" of 4 • ",
  finished:"Teaching practice completed • No score awarded",
  visual:(t,o)=>t+" groups of ten and "+o+" single ones",
  captionModel:(t,o)=>t+" tens + "+o+" ones = "+(t*10+o),
  captionTry:"Count the blue groups of ten and the single gold dots.",
  explanation:"Three tens make 30. Four single ones make 4. So 30 + 4 = 34. The first digit tells us the tens; the second digit tells us the ones.",
  answerLabel:"Choose the number",
  reflection:"💬 Example: I see 7 groups of ten and 6 ones. Seven tens are 70, plus 6 is 76. Children may use their own words; this example is not an automatically scored answer.",
  feedbackModel:"Start by looking at the model with an adult.",
  feedbackQuestion:"Choose a number. Wrong answers are an opportunity to try again.",
  feedbackReflect:"Take your time. Say or point to your explanation; nothing is recorded.",
  feedbackDone:"Practice finished. This is not a school assessment or evidence of mastery.",
  feedbackWrong:"Not quite yet. The first digit counts groups of TEN; the second counts single ones. Try another answer.",
  feedbackCorrectSuffix:" You can move to the next step.",
  showHint:"💡 Show a helpful clue",hideHint:"Hide the clue",
  nextModel:"I've seen the model →",next:"Continue →",nextReflect:"Finish this practice →",restart:"↻ Practise again",
  lessons:{
   model:{title:"Look at tens and ones",instruction:"One blue stick is a group of ten. Each gold dot is one. Count the sticks and the dots."},
   guided:{title:"Let's build a number together",instruction:"Count the tens sticks and ones dots. Which two-digit number do they make?",clue:"Start with the tens: five groups of ten make 50. Add two single ones.",explanation:"Correct: 5 tens are 50 and 2 ones are 2. So 50 + 2 = 52."},
   independent:{title:"Your turn: read the model",instruction:"Try independently. Which number do these tens and ones show?",clue:"Count the blue sticks by tens, then add the gold ones dots. You can ask an adult for help.",explanation:"Well done: 7 tens are 70 and 6 ones are 6. So 70 + 6 = 76."},
   reflect:{title:"Explain what you discovered",instruction:"Tell an adult or point to the model: Why does 76 have a 7 in the tens place and a 6 in the ones place?"},
   complete:{title:"You practised tens and ones!",instruction:"You have explored two-digit numbers. You can practise again or return to Grade 2 maths."}
  }
 },
 ar:{
  back:"← رياضيات الصف الثاني",
  badge:"🧮 درس رياضيات تجريبي بإرشاد شخص بالغ • للمراجعة التربوية",
  heading:"مستكشف العشرات والآحاد",
  goalLabel:"هدف التعلّم اليوم:",
  goal:"تمثيل عدد مكوّن من رقمين باستخدام مجموعات من عشرة وآحاد منفردة، ثم شرح قيمة كل رقم بحسب منزلته.",
  warning:"هذا ليس اختبارًا أو درسًا مدرسيًا معتمدًا. هذا نموذج تعليمي إضافي للصف الثاني. النص العربي مسودة تحتاج إلى مراجعة معلّم مؤهل، وكذلك ملاءمة العمر ومطابقة المنهج. لا درجات، ولا حسابات، ولا تسجيلات صوتية، ولا مؤقّت، ولا حفظ للتقدّم.",
  parentHeading:"👨‍👩‍👧 إرشادات لأولياء الأمور والمعلّمين",
  parentText:"اطلب من الطفل الإشارة إلى قضيب عشرات واحد وعدّه عشرة، ثم عدّ دوائر الآحاد المفردة. بعد التدريب الأخير، شجّعه على الشرح بكلماته الخاصة. إكمال هذه الخطوات لا يعني إتقان القيمة المكانية.",
  parentNote:"لا يتّصل هذا الدرس بخدمات خارجية ولا يحفظ الإجابات. الرسوم توضيحية لمجموعات العشرات وليست قطعًا تعليمية حقيقية. يُرجى التحقّق من الملاءمة العمرية وإمكانية الوصول ودقّة الترجمة قبل نشر الدرس.",
  stageLabels:["لاحظ","تدرّب بمساعدة","جرّب بنفسك","اشرح"],
  progress:(n)=>"الخطوة "+n+" من ٤ • ",
  finished:"انتهى التدريب • لا تُمنح درجات",
  visual:(t,o)=>t+" مجموعات من عشرة و"+o+" آحاد منفردة",
  captionModel:(t,o)=>t+" عشرات + "+o+" آحاد = "+(t*10+o),
  captionTry:"عُدَّ قضبان العشرات الزرقاء ثم دوائر الآحاد الذهبية.",
  explanation:"ثلاث عشرات تساوي ٣٠، وأربعة آحاد تساوي ٤. إذن ٣٠ + ٤ = ٣٤. الرقم الأول من اليسار يبيّن عدد العشرات، والرقم الثاني يبيّن عدد الآحاد.",
  answerLabel:"اختر العدد الصحيح",
  reflection:"💬 مثال: أرى ٧ مجموعات من عشرة و٦ آحاد. سبع عشرات تساوي ٧٠، ومع ٦ آحاد يصبح العدد ٧٦. يمكن للطفل الشرح بطريقته؛ ولا يصحّح التطبيق هذا الشرح تلقائيًا.",
  feedbackModel:"ابدأ بملاحظة النموذج مع شخص بالغ.",
  feedbackQuestion:"اختر عددًا. إذا أخطأت، يمكنك المحاولة مرة أخرى.",
  feedbackReflect:"خذ وقتك. اشرح أو أشر إلى الإجابة؛ لا يتم تسجيل أي صوت.",
  feedbackDone:"انتهى التدريب. هذا ليس تقييمًا مدرسيًا ولا دليلًا على إتقان المهارة.",
  feedbackWrong:"ليست الإجابة الصحيحة بعد. الرقم في منزلة العشرات يمثّل مجموعات من عشرة، والرقم في منزلة الآحاد يمثّل الوحدات المفردة. حاول مجددًا.",
  feedbackCorrectSuffix:" يمكنك الانتقال إلى الخطوة التالية.",
  showHint:"💡 إظهار مساعدة",hideHint:"إخفاء المساعدة",
  nextModel:"شاهدتُ النموذج ←",next:"متابعة ←",nextReflect:"إنهاء التدريب ←",restart:"↻ التدرّب مرة أخرى",
  lessons:{
   model:{title:"لاحظ العشرات والآحاد",instruction:"كل قضيب أزرق يمثّل عشرة. وكل دائرة ذهبية تمثّل واحدًا. عُدَّ القضبان والدوائر."},
   guided:{title:"لنكوّن عددًا معًا",instruction:"عُدَّ قضبان العشرات ودوائر الآحاد. ما العدد المكوَّن من رقمين؟",clue:"ابدأ بالعشرات: خمس مجموعات من عشرة تساوي ٥٠. ثم أضف آحادين.",explanation:"صحيح! خمس عشرات تساوي ٥٠، وآحادان يساويان ٢. إذن ٥٠ + ٢ = ٥٢."},
   independent:{title:"دورك الآن: اقرأ النموذج",instruction:"حاول بمفردك. ما العدد الذي تمثّله هذه العشرات والآحاد؟",clue:"عُدَّ القضبان الزرقاء بالعشرات، ثم أضف دوائر الآحاد الذهبية. يمكنك طلب المساعدة من شخص بالغ.",explanation:"أحسنت! سبع عشرات تساوي ٧٠، وستة آحاد تساوي ٦. إذن ٧٠ + ٦ = ٧٦."},
   reflect:{title:"اشرح ما تعلّمته",instruction:"اشرح لشخص بالغ أو أشر إلى النموذج: لماذا يوجد الرقم ٧ في منزلة العشرات والرقم ٦ في منزلة الآحاد في العدد ٧٦؟"},
   complete:{title:"لقد تدرّبت على العشرات والآحاد!",instruction:"استكشفتَ الأعداد المكوّنة من رقمين. يمكنك إعادة التدريب أو الرجوع إلى رياضيات الصف الثاني."}
  }
 }
};
window.LLA_TENS_ONES_I18N=Object.freeze(text);
})();