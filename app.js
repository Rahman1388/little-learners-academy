const C=window.LLA_CURRICULUM;
const STATE_KEY="lla-progress-v2";
let currentSubject=null,currentLesson=null,hiddenMemory=false,remembered=new Set(),deferredInstall=null,gameTarget=0,activeUtterance=null,voiceCache=[],activeAudio=null,audioGeneration=0;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function loadState(){
  try{return Object.assign({voice:"girl",slow:false,stars:0,completed:{}},JSON.parse(localStorage.getItem(STATE_KEY)||"{}"))}
  catch{return{voice:"girl",slow:false,stars:0,completed:{}}}
}
let state=loadState();
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state));renderProgress()}
function lessonKey(subjectId,lessonId){return subjectId+":"+lessonId}
function renderProgress(){
  const stars=$("#starCount");if(stars)stars.textContent="⭐ "+state.stars;
  const voice=$("#voice");if(voice)voice.value=state.voice;
  ["girl","boy"].forEach(kind=>{
    const lessonBtn=$("#lesson"+kind[0].toUpperCase()+kind.slice(1)+"Voice");
    if(lessonBtn)lessonBtn.setAttribute("aria-pressed",String(state.voice===kind));
    const homeBtn=$("#"+kind+"Voice");
    if(homeBtn)homeBtn.setAttribute("aria-pressed",String(state.voice===kind));
  });
  const slow=$("#slowVoice");if(slow)slow.checked=state.slow===true;
}
function cleanSpeech(text,lang){
  return lang==="ar"?text.replace(/[^\u0600-\u06FF0-9،؛؟.! ]/g," ").replace(/\s+/g," ").trim():text.replace(/[^A-Za-z0-9,.!?+' -]/g," ").replace(/\s+/g," ").trim();
}
function refreshVoices(){
  if(!("speechSynthesis" in window))return [];
  const voices=speechSynthesis.getVoices();
  if(voices.length)voiceCache=voices;
  return voiceCache;
}
function chooseVoice(lang,kind){
  const voices=refreshVoices();
  const local=voices.filter(v=>lang==="ar"?/^ar([_-]|$)/i.test(v.lang):/^en([_-]|$)/i.test(v.lang));
  const regional=lang==="ar"
    ?local.filter(v=>/ar[-_](qa|sa|ae|eg)/i.test(v.lang))
    :local.filter(v=>/en[-_](gb|us|au)/i.test(v.lang));
  const pool=regional.length?regional:local;
  const score=(voice)=>{
    const name=voice.name.toLowerCase();
    const female=/female|samantha|zira|aria|jenny|amelia|victoria|susan|sara|laila|salma/.test(name);
    const male=/(^|[^a-z])male([^a-z]|$)|daniel|david|george|oliver|thomas|tarik|hamed/.test(name) && !female;
    return (kind==="girl"?(female?10:male?-8:0):(male?10:female?-8:0))
      +(/natural|neural|enhanced|premium/.test(name)?3:0)
      +(voice.localService?1:0);
  };
  return pool.slice().sort((a,b)=>score(b)-score(a))[0]||null;
}
function stopAllAudio(){
  audioGeneration++;
  if(activeAudio){activeAudio.pause();activeAudio.src="";activeAudio=null}
  if("speechSynthesis" in window)speechSynthesis.cancel();
}
function speak(text,kind=state.voice,lang="en"){
  if(!("speechSynthesis" in window))return false;
  const spoken=cleanSpeech(text,lang);if(!spoken)return false;
  stopAllAudio();
  const u=new SpeechSynthesisUtterance(spoken);
  const v=chooseVoice(lang,kind);
  u.lang=v?.lang||(lang==="ar"?"ar-SA":"en-GB");
  u.rate=state.slow===true?.86:1.0;
  u.pitch=1;
  u.volume=1;
  if(v)u.voice=v;
  u.onerror=()=>{if(lang==="ar")showAudioHelp()};
  activeUtterance=u;
  speechSynthesis.resume();
  speechSynthesis.speak(u);
  return true;
}
function showAudioHelp(){
  const box=$("#feedback");
  if(box)box.innerHTML='🔊 Arabic voice is not available on this device yet. جرّب تحديث الصفحة أو تفعيل صوت عربي في إعدادات الجهاز.';
}
function playRecordedItem(lang,index,text,feedbackSelector="#feedback"){
  if(!currentLesson)return speak(text,state.voice,lang);
  stopAllAudio();
  const generation=audioGeneration;
  const box=$(feedbackSelector);
  // Arabic female recordings are NOT yet understandable enough for Grade 1.
  // Until a native-speaker educator approves a replacement, use the preserved
  // clearer male reference and say so instead of mislabeling it as a girl.
  const speaker=lang==="ar"?"boy":state.voice;
  const practice=currentLesson.id==="phonics";
  const audioPath=practice
    ?"audio/practice/"+lang+"-phonics-"+index+"-"+speaker+".mp3"
    :"audio/"+lang+"/"+currentLesson.id+"-"+index+"-"+speaker+".mp3";
  const file=new URL(audioPath,document.baseURI);
  file.searchParams.set("v",practice?"three-repeat-1":lang==="ar"?"ar-review-fallback-1":"en-clean-v3");
  const audio=new Audio(file.href);
  activeAudio=audio;
  audio.preload="auto";
  audio.playsInline=true;
  audio.preservesPitch=true;
  audio.playbackRate=state.slow===true?.85:1;
  const referenceMessage=lang==="ar"&&state.voice==="girl"
    ?"Arabic female voice is under review. Using the clearer male reference for now. • الصوت الأنثوي قيد المراجعة"
    :lang==="ar"?"Arabic male reference • الصوت العربي المرجعي":"English "+state.voice+"-style voice • الصوت الإنجليزي";
  if(box)box.textContent="🎧 Loading… "+referenceMessage;
  let failed=false;
  function fallback(){
    if(failed||generation!==audioGeneration)return;
    failed=true;
    if(lang==="ar"){
      if(box)box.textContent="Arabic recording unavailable. Check connection and retry. • تعذر تشغيل التسجيل، حاول مرة أخرى";
    }else{
      if(box)box.textContent="Recording unavailable. Trying the device's English voice.";
      speak(text,state.voice,lang);
    }
  }
  audio.addEventListener("playing",()=>{
    if(box&&generation===audioGeneration)box.textContent="🔊 "+referenceMessage
      +(practice?" — 3 repeats with pauses • ثلاث مرات مع توقفات":" — Listen and repeat • استمع وكرر");
  });
  audio.addEventListener("ended",()=>{
    if(box&&generation===audioGeneration)box.textContent="🌟 Listen again and say it! • استمع وكرر: "+text;
  });
  audio.addEventListener("error",fallback,{once:true});
  const pending=audio.play();
  if(pending&&typeof pending.catch==="function")pending.catch(fallback);
}
function playArabicItem(index,text,feedbackSelector="#feedback"){
  return playRecordedItem("ar",index,text,feedbackSelector);
}
function playEnglishItem(index,text,feedbackSelector="#feedback"){
  return playRecordedItem("en",index,text,feedbackSelector);
}

function previewSelectedEnglish(kind){
  if(currentLesson&&!$("#lessonView").classList.contains("hidden")){
    playEnglishItem(0,currentLesson.items[0][1],"#voiceStatus");
    return;
  }
  // Unlike device TTS, these use separate recorded male/female source speakers.
  stopAllAudio();
  const generation=audioGeneration;
  const audio=new Audio(new URL("audio/practice/en-phonics-0-"+kind+".mp3?v=three-repeat-1",document.baseURI).href);
  activeAudio=audio;
  const box=$("#homeVoiceStatus");
  if(box)box.textContent="🎧 Loading English "+kind+"-style preview…";
  audio.addEventListener("playing",()=>{
    if(box&&generation===audioGeneration)box.textContent="🔊 English "+kind+"-style voice — cat, repeated 3 times";
  });
  audio.addEventListener("error",()=>{
    if(generation===audioGeneration&&box)box.textContent="Preview unavailable. Check your connection and try again.";
  });
  const p=audio.play();
  if(p&&typeof p.catch==="function")p.catch(()=>{
    if(generation===audioGeneration&&box)box.textContent="Tap again to play the English sample.";
  });
}
function setVoice(kind,preview=false){
  if(kind!=="girl"&&kind!=="boy")return;
  state.voice=kind;
  saveState();
  const box=$("#voiceStatus");
  const homeBox=$("#homeVoiceStatus");
  const message=(kind==="girl"?"👧 English female-style voice selected":"👦 English male-style voice selected")
    +". Arabic uses the clearer male reference until the female audio passes review.";
  if(box)box.textContent=message;
  if(homeBox)homeBox.textContent=message;
  if(preview)previewSelectedEnglish(kind);
  else stopAllAudio();
}

function previewEnglish(){
  const text=currentLesson?.items[0]?.[1]||"Hello! Let us learn and play!";
  if(currentLesson)playEnglishItem(0,text,"#voiceStatus");else speak(text,state.voice,"en");
}
function previewArabic(){
  if(!currentLesson)return;
  playArabicItem(0,currentLesson.items[0][2],"#voiceStatus");
}

function renderSubjects(){
  const box=$("#subjects");
  box.innerHTML=C.subjects.map(s=>{
    const completed=s.lessons.filter(l=>state.completed[lessonKey(s.id,l.id)]).length;
    return '<button class="subject" data-id="'+s.id+'"><span class="icon">'+s.icon+'</span><b>'+s.title+'</b><span class="ar">'+s.ar+'</span><small>'+completed+' / '+s.lessons.length+' complete • مكتمل</small></button>';
  }).join("");
  box.querySelectorAll(".subject").forEach(b=>b.onclick=()=>openSubject(b.dataset.id));
  const q=$("#qatarCore");
  q.innerHTML=C.qatarCore.map(x=>'<div class="subject locked"><span class="icon">'+x.icon+'</span><b>'+x.title+'</b><span class="ar">'+x.ar+'</span><small>Specialist review before release • مراجعة متخصصة</small></div>').join("");
}
function openSubject(id){
  currentSubject=C.subjects.find(s=>s.id===id);if(!currentSubject)return;
  $("#home").classList.add("hidden");$("#lessonView").classList.add("hidden");$("#subjectView").classList.remove("hidden");
  $("#subjectTitle").innerHTML=currentSubject.icon+' '+currentSubject.title+' <span class="ar">• '+currentSubject.ar+'</span>';
  $("#standards").textContent=currentSubject.standards.join(" • ");
  $("#lessonList").innerHTML=currentSubject.lessons.map((l,i)=>{
    const done=state.completed[lessonKey(currentSubject.id,l.id)];
    return '<button class="lessonCard" data-id="'+l.id+'"><span class="icon">'+(done?'✅':["👀","🎧","🎮","🧠"][i%4])+'</span><b>'+l.title+'</b><span class="ar">'+l.ar+'</span><small>'+l.intro+'</small></button>';
  }).join("");
  $("#lessonList").querySelectorAll(".lessonCard").forEach(b=>b.onclick=()=>openLesson(b.dataset.id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function itemMarkup(x,i){
  const repeats=currentLesson?.id==="phonics"?" ×3":"";
  return '<div class="item" data-i="'+i+'"><span>'+x[0]+'</span><b>'+x[1]+'</b><div class="ar itemAr">'+x[2]+'</div><div class="speakRow"><button class="speakBtn en" data-i="'+i+'">🔊 English'+repeats+'</button><button class="speakBtn arBtn" data-i="'+i+'">🔊 العربية'+repeats+'</button></div></div>';
}
function openLesson(id){
  currentLesson=currentSubject&&currentSubject.lessons.find(l=>l.id===id);if(!currentLesson)return;
  $("#subjectView").classList.add("hidden");$("#lessonView").classList.remove("hidden");
  $("#lessonTitle").innerHTML=currentSubject.icon+' '+currentLesson.title+' <span class="ar">• '+currentLesson.ar+'</span>';
  $("#lessonIntro").innerHTML=currentLesson.intro+'<br><span class="ar">'+currentLesson.arIntro+'</span>';
  const adventureLink=$("#questLessonLink");
  if(adventureLink)adventureLink.classList.toggle("hidden",!(currentSubject.id==="english"&&currentLesson.id==="phonics"));
  $("#items").innerHTML=currentLesson.items.map(itemMarkup).join("");
  $("#items").querySelectorAll(".speakBtn.en").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;playEnglishItem(i,currentLesson.items[i][1])});
  $("#items").querySelectorAll(".speakBtn.arBtn").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;playArabicItem(i,currentLesson.items[i][2])});
  renderProgress();renderMemory();renderGame();renderQuiz();window.scrollTo({top:0,behavior:"smooth"});
}
function renderMemory(){
  hiddenMemory=false;remembered=new Set();
  $("#memoryGrid").innerHTML=currentLesson.items.slice(0,4).map((x,i)=>'<button class="memoryCard" data-i="'+i+'"><span style="font-size:34px">'+x[0]+'</span><br><b>'+x[1]+'</b><small class="ar">'+x[2]+'</small></button>').join("");
  $("#memoryToggle").textContent="🙈 Hide & recall • أخفِ وتذكر";
  $("#memoryScore").textContent="Look, link the pictures in a funny story, then hide them. • شاهد واربط الصور ثم أخفها وتذكرها.";
}
function toggleMemory(){
  hiddenMemory=!hiddenMemory;remembered=new Set();const cards=$$("#memoryGrid .memoryCard");
  cards.forEach((b,i)=>{const x=currentLesson.items[i];b.classList.remove("good");b.innerHTML=hiddenMemory?'❓<br><b>Do you remember?</b><small class="ar">هل تتذكر؟</small>':'<span style="font-size:34px">'+x[0]+'</span><br><b>'+x[1]+'</b><small class="ar">'+x[2]+'</small>';b.onclick=hiddenMemory?()=>remember(i,b):null});
  $("#memoryToggle").textContent=hiddenMemory?"👀 Show & review • راجع":"🙈 Hide & recall • أخفِ وتذكر";
  $("#memoryScore").textContent=hiddenMemory?"Tap each card you can recall before showing the answers. • اضغط على كل بطاقة تتذكرها.":"Review the pictures and key words again. • راجع الصور والكلمات مرة أخرى.";
}
function remember(i,b){
  if(remembered.has(i))return;remembered.add(i);b.classList.add("good");b.innerHTML='⭐<br><b>I remembered!</b><small class="ar">تذكرت!</small>';
  $("#memoryScore").textContent="Memory stars: "+remembered.size+" / "+Math.min(4,currentLesson.items.length)+" • نجوم الذاكرة";
}
function renderGame(){
  if(!currentLesson)return;
  gameTarget=Math.floor(Math.random()*currentLesson.items.length);
  const target=currentLesson.items[gameTarget];
  const order=currentLesson.items.map((x,i)=>i).sort(()=>Math.random()-.5);
  $("#gamePrompt").innerHTML='Find: <b>'+target[1]+'</b> <span class="ar">• '+target[2]+'</span>';
  $("#gameFeedback").textContent="";
  $("#gameChoices").innerHTML=order.map(i=>{
    const x=currentLesson.items[i];
    return '<button class="gameChoice" data-i="'+i+'"><span>'+x[0]+'</span><b>'+x[1]+'</b><small class="ar">'+x[2]+'</small></button>';
  }).join("");
  $("#gameChoices").querySelectorAll(".gameChoice").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;
    $("#gameChoices").querySelectorAll(".gameChoice").forEach(x=>x.disabled=true);
    const correct=$("#gameChoices").querySelector('[data-i="'+gameTarget+'"]');
    if(i===gameTarget){
      b.classList.add("good");
      $("#gameFeedback").textContent="🎉 Great job! أحسنت — you found it!";
      speak("Great job! You found "+target[1],state.voice,"en");
    }else{
      b.classList.add("try");if(correct)correct.classList.add("good");
      $("#gameFeedback").textContent="🌱 Nice try! محاولة جيدة — look at the green answer.";
    }
  });
}
function replayGame(){renderGame();playEnglishItem(gameTarget,currentLesson.items[gameTarget][1],"#gameFeedback")}
function completeLesson(){
  const key=lessonKey(currentSubject.id,currentLesson.id);
  if(!state.completed[key]){state.completed[key]=true;state.stars+=3;saveState();renderSubjects()}
}
function renderQuiz(){
  const q=currentLesson.quiz;$("#quizQ").innerHTML=q.q+'<span class="ar quizAr">'+q.arQ+'</span>';
  $("#answers").innerHTML=q.choices.map((c,i)=>'<button data-i="'+i+'"><b>'+String.fromCharCode(65+i)+'. '+c[0]+'</b><span class="ar">'+c[1]+'</span></button>').join("");
  $("#quizFeedback").textContent="";$("#quizRetry").classList.add("hidden");
  $("#answers").querySelectorAll("button").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;$("#answers").querySelectorAll("button").forEach(x=>x.disabled=true);
    if(i===q.answer){b.classList.add("good");completeLesson();$("#quizFeedback").textContent="🌟 Excellent! ممتاز — lesson complete. +3 stars"}
    else{b.classList.add("try");$("#answers").children[q.answer].classList.add("good");$("#quizFeedback").textContent="🌱 Good try! محاولة جيدة — review and try again.";$("#quizRetry").classList.remove("hidden")}
  });
}
function backHome(){$("#subjectView").classList.add("hidden");$("#lessonView").classList.add("hidden");$("#home").classList.remove("hidden");renderSubjects();window.scrollTo({top:0,behavior:"smooth"})}
function backSubject(){$("#lessonView").classList.add("hidden");$("#subjectView").classList.remove("hidden");openSubject(currentSubject.id)}

window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstall=event;$("#installBtn").classList.remove("hidden")});
window.addEventListener("appinstalled",()=>{$("#installBtn").classList.add("hidden");deferredInstall=null});

document.addEventListener("DOMContentLoaded",()=>{refreshVoices();if("speechSynthesis" in window)speechSynthesis.onvoiceschanged=refreshVoices;
  renderProgress();renderSubjects();
  $("#memoryToggle").onclick=toggleMemory;$("#homeBtn").onclick=backHome;$("#subjectBack").onclick=backHome;$("#lessonBack").onclick=backSubject;$("#quizRetry").onclick=renderQuiz;$("#gameReplay").onclick=replayGame;$("#gameSpeak").onclick=()=>{if(currentLesson)playEnglishItem(gameTarget,currentLesson.items[gameTarget][1],"#gameFeedback")};
  $("#girlVoice").onclick=()=>setVoice("girl",true);
  $("#boyVoice").onclick=()=>setVoice("boy",true);
  $("#lessonGirlVoice").onclick=()=>setVoice("girl",true);
  $("#lessonBoyVoice").onclick=()=>setVoice("boy",true);
  $("#previewEnglishVoice").onclick=previewEnglish;
  $("#previewArabicVoice").onclick=previewArabic;
  $("#slowVoice").onchange=()=>{state.slow=$("#slowVoice").checked;saveState()};
  $("#installBtn").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("#installBtn").classList.add("hidden")};
  if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"});
});
