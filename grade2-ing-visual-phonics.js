/* Original phonics demo (Grade 2, -ing). All content needs expert review.
 * Visual association only: not a replacement for evidence-based spoken phonics.
 * No account, microphone, recorded child's voice, analytics, scores or storage.
 */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const localeCopy={
 en:{
  back:"← Grade 2 Word Families",review:"ORIGINAL PHONICS VISUAL STORY • ADULT / EDUCATOR DRAFT",
  title:"Meet the -ing word family!",
  goal:"Watch how a first letter joins the shared -ing ending. Then find a new word in the same family.",
  warning:"Review-only teaching prototype. English device speech is optional and may be unavailable or sound unnatural; this is NOT a child-recorded voice or approved phoneme recording. Draft Arabic text and phonics sequence need expert review. No child accounts or recorded responses.",
  watch:"🎬 Watch and blend",playerHelp:"Nothing plays automatically. Tap Next to explore, or Play to move through a short captioned story.",
  sceneNum:n=>"Part "+n+" of 3",letterLabel:"First letter + shared ending = word",
  scenes:[
   {heading:"A ring",picture:"💍",onset:"r",word:"ring",caption:"Say “ring”. Watch the letter r join the -ing ending.",visual:"A ring: r plus ing makes ring"},
   {heading:"We can sing",picture:"🎵",onset:"s",word:"sing",caption:"Now say “sing”. Changing the first letter gives us a different word with the same ending.",visual:"Singing: s plus ing makes sing"},
   {heading:"What stays the same?",picture:"🎶",onset:"",word:"",caption:"Ring and sing share the final letters -ing. Their first letters are different. Look at the colorful map below.",visual:"Two words, ring and sing, share the -ing ending"}
  ],
  previous:"← Back",next:"Next →",play:"▶ Play",pause:"⏸ Pause",replay:"↻ Replay",
  audioGroup:"Listen to whole English word",hear:w=>"🔊 Hear “"+w+"”",slow:"🐢 Hear slowly",stop:"■ Stop voice",
  audioIntro:"Optional: uses the English voice provided by your device. Ask an adult if the audio is not clear.",
  audioSelect:"Go Back to a picture word to hear it.",
  audioUnavailable:"Device speech is unavailable. Ask an adult to pronounce the complete word.",
  audioTry:w=>"Trying the English device voice for “"+w+"”. If you hear nothing, ask an adult.",
  audioSpeaking:w=>"Device voice speaking “"+w+"”. Listen and repeat.",
  audioDone:w=>"Finished attempting “"+w+"”. Replay or practise with an adult.",
  audioFailed:"The device voice did not play. Ask an adult to say the word clearly.",
  audioStopped:"Device voice stopped.",
  mapHeading:"🌈 Connect the words",
  mapIntro:"Both words share the same final letters. Read each complete word naturally; matching letters do not replace listening to clear pronunciation.",
  mapLabel:"ing joins r for ring and s for sing",mapRing:"💍 A ring",mapSing:"🎵 Singing",
  tryHeading:"✏️ Now you try!",tryPrompt:"We learned ring and sing. Which NEW word also belongs to the -ing family?",
  practiceGroup:"Choose the word ending in ing",
  answers:{ready:"Look carefully at the final letters in each word.",wrong:"Not yet. “sand” and “hand” end in -and. Look for the word ending in -ing.",correct:"Great finding! “king” also ends in -ing, like “ring” and “sing”. Ask an adult to say all three complete words clearly."},
  hint:"Look for the final three letters: i - n - g.",hintShow:"💡 Show a clue",hintHide:"Hide clue",retry:"↻ Try again",
  adultHeading:"For parents and teachers",
  adultHelp:"Please model the whole words “ring”, “sing” and “king” with natural pronunciation and give the child time to listen. This demo highlights the spelling pattern; it does not measure spoken reading, and mobile speech synthesis quality is not guaranteed."
 },
 ar:{
  back:"← عائلات الكلمات للصف الثاني",review:"قصة صوتيات بصرية أصلية • مسودة لمراجعة المعلّمين",
  title:"تعرّف إلى عائلة الكلمات -ing!",
  goal:"شاهد كيف يضاف حرف في بداية الجزء المشترك -ing لتكوين كلمة إنجليزية، ثم اختر كلمة جديدة من العائلة نفسها.",
  warning:"هذه مسودة للمراجعة التربوية. النطق الإنجليزي من صوت الجهاز اختياري، وقد لا يعمل أو لا يبدو طبيعيًا؛ وليس تسجيلًا بصوت طفل أو تسجيلًا صوتيًا معتمدًا. التعليمات العربية وتسلسل الصوتيات بحاجة إلى مراجعة اختصاصي. لا توجد حسابات للأطفال أو تسجيلات لأصواتهم.",
  watch:"🎬 شاهد واربط الحروف",playerHelp:"لن يبدأ العرض تلقائيًا. اضغط «التالي» للاستكشاف أو «تشغيل» لمشاهدة تسلسل بصري قصير مصحوب بنصوص.",
  sceneNum:n=>"الجزء "+n.toLocaleString("ar-EG")+" من ٣",
  letterLabel:"الحرف الأول + النهاية المشتركة = الكلمة",
  scenes:[
   {heading:"كلمة ring",picture:"💍",onset:"r",word:"ring",caption:"انطق كلمة ring. لاحظ كيف ينضم الحرف r إلى النهاية -ing.",visual:"خاتم: الحرف r مع ing يعطي كلمة ring"},
   {heading:"كلمة sing",picture:"🎵",onset:"s",word:"sing",caption:"الآن انطق كلمة sing. بتغيير الحرف الأول تتكوّن كلمة أخرى لها النهاية نفسها.",visual:"غناء: الحرف s مع ing يعطي كلمة sing"},
   {heading:"ما الشيء المشترك؟",picture:"🎶",onset:"",word:"",caption:"تنتهي الكلمتان ring وsing بالأحرف نفسها -ing، لكن الحرف الأول مختلف. انظر إلى الخريطة الملوّنة أدناه.",visual:"الكلمتان ring وsing تشتركان في النهاية ing"}
  ],
  previous:"← السابق",next:"التالي ←",play:"▶ تشغيل",pause:"⏸ إيقاف مؤقت",replay:"↻ إعادة",
  audioGroup:"الاستماع إلى نطق الكلمة الإنجليزية كاملة",hear:w=>"🔊 استمع إلى "+w,slow:"🐢 نطق بطيء",stop:"■ إيقاف الصوت",
  audioIntro:"اختياري: يُستخدم الصوت الإنجليزي الموجود في جهازك. اطلب المساعدة من شخص بالغ إذا لم يكن النطق واضحًا.",
  audioSelect:"ارجع إلى إحدى الكلمتين المصوّرتين للاستماع إليها.",
  audioUnavailable:"ميزة النطق غير متاحة في هذا الجهاز. اطلب من شخص بالغ نطق الكلمة كاملة.",
  audioTry:w=>"تجري محاولة نطق كلمة "+w+" بصوت الجهاز. إذا لم تسمع شيئًا، اطلب مساعدة شخص بالغ.",
  audioSpeaking:w=>"ينطق الجهاز كلمة "+w+". استمع وحاول تكرارها.",
  audioDone:w=>"انتهت محاولة نطق كلمة "+w+". يمكنك إعادة الاستماع أو التدرب مع شخص بالغ.",
  audioFailed:"لم يعمل صوت الجهاز. اطلب من شخص بالغ نطق الكلمة بوضوح.",
  audioStopped:"تم إيقاف صوت الجهاز.",
  mapHeading:"🌈 اربط بين الكلمات",
  mapIntro:"تشترك الكلمتان في الأحرف الأخيرة نفسها. استمع أيضًا إلى نطق كل كلمة كاملة؛ فمطابقة الأحرف لا تغني عن النطق الواضح.",
  mapLabel:"ing مع r تكوّن ring وing مع s تكوّن sing",mapRing:"💍 خاتم",mapSing:"🎵 غناء",
  tryHeading:"✏️ حان دورك!",tryPrompt:"تعلّمت كلمتي ring وsing. أيّ كلمة جديدة تنتمي أيضًا إلى عائلة -ing؟",
  practiceGroup:"اختر الكلمة التي تنتهي بالأحرف ing",
  answers:{ready:"انظر جيدًا إلى الأحرف الأخيرة في كل كلمة.",wrong:"ليس بعد. تنتهي الكلمتان sand وhand بالأحرف -and. ابحث عن كلمة تنتهي بالأحرف -ing.",correct:"أحسنت! تنتهي كلمة king أيضًا بالأحرف -ing مثل ring وsing. اطلب من شخص بالغ نطق الكلمات الثلاث بوضوح."},
  hint:"ابحث عن الأحرف الثلاثة الأخيرة: i - n - g.",hintShow:"💡 إظهار مساعدة",hintHide:"إخفاء المساعدة",retry:"↻ حاول مرة أخرى",
  adultHeading:"لأولياء الأمور والمعلّمين",
  adultHelp:"يرجى تقديم نموذج نطق طبيعي للكلمات الإنجليزية ring وsing وking، وإعطاء الطفل وقتًا للاستماع. يوضّح هذا العرض نمط الكتابة، ولا يقيس مهارة القراءة الشفوية. قد تختلف جودة الصوت الآلي باختلاف الجهاز."
 }
};
let language="en",scene=0,timer=null,chosen="ready",hintShown=false,activeUtterance=null;
const t=()=>localeCopy[language];
const text=(id,value)=>{$(id).textContent=value};
function stopVoice(showStatus=false){
 if(typeof window.speechSynthesis!=="undefined"){try{window.speechSynthesis.cancel()}catch{/* Browser may disable speech. */}}
 activeUtterance=null;
 if(showStatus)text("audioStatus",t().audioStopped);
}
function audioCurrent(){
 const w=t().scenes[scene].word,enabled=Boolean(w);
 $("hearButton").disabled=!enabled;
 $("slowButton").disabled=!enabled;
 $("hearButton").textContent=enabled?t().hear(w):t().audioSelect;
 $("slowButton").textContent=t().slow;
 text("stopVoiceButton",t().stop);
}
function draw(focus=false){
 const data=t().scenes[scene];
 text("sceneCounter",t().sceneNum(scene+1));
 text("sceneHeading",data.heading);
 text("sceneCaption",data.caption);
 const show=Boolean(data.word);
 $("wordArea").hidden=!show;
 $("wordArea").setAttribute("aria-label",data.visual);
 text("picture",data.picture);
 text("onset",data.onset);
 text("whole",data.word);
 $("progressFill").style.width=((scene+1)/3*100)+"%";
 $("previousButton").disabled=scene===0;
 $("nextButton").disabled=scene===2;
 audioCurrent();
 if(focus)$("sceneHeading").focus();
}
function stop(){
 if(timer!==null){clearInterval(timer);timer=null}
 $("playButton").setAttribute("aria-pressed","false");
 text("playButton",t().play);
}
function next(){
 if(scene>=2){stop();return}
 scene++;stopVoice();draw();
 if(scene===2)stop();
}
function moveTo(index){
 stop();stopVoice();
 scene=Math.max(0,Math.min(2,index));draw(true);
 text("audioStatus",t().audioIntro);
}
function renderPractice(){
 const copy=t();
 text("tryHeading",copy.tryHeading);
 text("tryPrompt",copy.tryPrompt);
 $("practiceChoices").setAttribute("aria-label",copy.practiceGroup);
 for(const button of $("practiceChoices").querySelectorAll("button[data-choice]")){
  button.disabled=chosen==="correct";
  button.classList.toggle("correct",chosen==="correct"&&button.dataset.choice==="king");
 }
 text("tryFeedback",copy.answers[chosen]);
 $("tryFeedback").className="feedback"+(chosen==="wrong"?" wrong":chosen==="correct"?" correct":"");
 text("hintContent",copy.hint);
 $("hintContent").hidden=!hintShown;
 $("hintButton").setAttribute("aria-expanded",String(hintShown));
 text("hintButton",hintShown?copy.hintHide:copy.hintShow);
 text("retryButton",copy.retry);
}
function translate(){
 const x=t();
 document.documentElement.lang=language;document.documentElement.dir=language==="ar"?"rtl":"ltr";
 $("enButton").setAttribute("aria-pressed",String(language==="en"));
 $("arButton").setAttribute("aria-pressed",String(language==="ar"));
 for(const [id,k] of Object.entries({
  backLink:"back",reviewTag:"review",pageTitle:"title",pageGoal:"goal",
  warning:"warning",watchHeading:"watch",playerHelp:"playerHelp",letterLabel:"letterLabel",
  previousButton:"previous",nextButton:"next",replayButton:"replay",
  mapHeading:"mapHeading",mapIntro:"mapIntro",mapRing:"mapRing",mapSing:"mapSing",
  adultHeading:"adultHeading",adultHelp:"adultHelp"
 }))text(id,x[k]);
 $("playButton").textContent=timer?x.pause:x.play;
 $("playButton").setAttribute("aria-pressed",String(Boolean(timer)));
 $("wordMap").setAttribute("aria-label",x.mapLabel);
 $("soundControls"); // Controls remain user-initiated after any language switch.
 text("audioStatus",x.audioIntro);
 draw();renderPractice();
}
function speak(slow){
 const word=t().scenes[scene].word;
 if(!word)return;
 if(typeof window.speechSynthesis==="undefined"||typeof window.SpeechSynthesisUtterance!=="function"){
  text("audioStatus",t().audioUnavailable);return;
 }
 try{
  stopVoice();
  const utterance=new window.SpeechSynthesisUtterance(word);
  const voices=typeof window.speechSynthesis.getVoices==="function"?window.speechSynthesis.getVoices():[];
  const english=Array.from(voices||[]).filter(v=>typeof v.lang==="string"&&/^en(-|$)/i.test(v.lang));
  const voice=english.find(v=>v.lang.toLowerCase()==="en-gb")||english.find(v=>v.default)||english[0];
  if(voice)utterance.voice=voice;
  utterance.lang=voice?voice.lang:"en-GB";
  utterance.rate=slow?0.75:0.95;
  activeUtterance=utterance;
  const copy=language;
  utterance.onstart=()=>{if(activeUtterance===utterance)text("audioStatus",localeCopy[language].audioSpeaking(word))};
  utterance.onend=()=>{if(activeUtterance===utterance){text("audioStatus",localeCopy[language].audioDone(word));activeUtterance=null}};
  utterance.onerror=()=>{if(activeUtterance===utterance){text("audioStatus",localeCopy[language].audioFailed);activeUtterance=null}};
  window.speechSynthesis.speak(utterance);
  text("audioStatus",localeCopy[copy].audioTry(word));
 }catch{activeUtterance=null;text("audioStatus",t().audioFailed)}
}
$("enButton").addEventListener("click",()=>{if(language==="en")return;stopVoice();language="en";translate()});
$("arButton").addEventListener("click",()=>{if(language==="ar")return;stopVoice();language="ar";translate()});
$("previousButton").addEventListener("click",()=>moveTo(scene-1));
$("nextButton").addEventListener("click",()=>moveTo(scene+1));
$("replayButton").addEventListener("click",()=>moveTo(0));
$("playButton").addEventListener("click",()=>{
 if(timer!==null){stop();return}
 stopVoice();
 if(scene===2)scene=0;
 draw();timer=setInterval(next,6500);
 $("playButton").setAttribute("aria-pressed","true");text("playButton",t().pause);
});
$("hearButton").addEventListener("click",()=>speak(false));
$("slowButton").addEventListener("click",()=>speak(true));
$("stopVoiceButton").addEventListener("click",()=>stopVoice(true));
$("practiceChoices").addEventListener("click",event=>{
 const b=event.target.closest("button[data-choice]");
 if(!b||!$("practiceChoices").contains(b)||chosen==="correct")return;
 chosen=b.dataset.choice==="king"?"correct":"wrong";renderPractice();
});
$("hintButton").addEventListener("click",()=>{hintShown=!hintShown;renderPractice()});
$("retryButton").addEventListener("click",()=>{chosen="ready";hintShown=false;renderPractice();$("tryHeading").focus()});
document.addEventListener("visibilitychange",()=>{if(document.hidden){stop();stopVoice()}});
translate();
})();