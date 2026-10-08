const C=window.LLA_CURRICULUM;
const STATE_KEY="lla-progress-v2";
let currentSubject=null,currentLesson=null,hiddenMemory=false,remembered=new Set(),deferredInstall=null,gameTarget=0,activeUtterance=null,voiceCache=[];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function loadState(){
  try{return Object.assign({voice:"girl",stars:0,completed:{}},JSON.parse(localStorage.getItem(STATE_KEY)||"{}"))}
  catch{return{voice:"girl",stars:0,completed:{}}}
}
let state=loadState();
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state));renderProgress()}
function lessonKey(subjectId,lessonId){return subjectId+":"+lessonId}
function renderProgress(){
  const stars=$("#starCount");if(stars)stars.textContent="⭐ "+state.stars;
  const voice=$("#voice");if(voice)voice.value=state.voice;
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
  const preferred=pool.filter(v=>kind==="girl"
    ?/natural|neural|enhanced|premium|female|samantha|zira|google|maged|laila|salma/i.test(v.name)
    :/natural|neural|enhanced|premium|male|daniel|david|google|tarik|hamed/i.test(v.name));
  return preferred[0]||pool[0]||null;
}
function speak(text,kind=state.voice,lang="en"){
  if(!("speechSynthesis" in window))return false;
  const spoken=cleanSpeech(text,lang);if(!spoken)return false;
  const u=new SpeechSynthesisUtterance(spoken);
  const v=chooseVoice(lang,kind);
  u.lang=v?.lang||(lang==="ar"?"ar-SA":"en-GB");
  u.rate=lang==="ar"?.68:.72;u.pitch=kind==="girl"?(lang==="ar"?1.08:1.16):1.0;u.volume=1;
  if(v)u.voice=v;
  u.onerror=()=>{if(lang==="ar")showAudioHelp()};
  activeUtterance=u;
  speechSynthesis.cancel();
  speechSynthesis.resume();
  speechSynthesis.speak(u);
  return true;
}
function showAudioHelp(){
  const box=$("#feedback");
  if(box)box.innerHTML='🔊 Arabic voice is not available on this device yet. جرّب تحديث الصفحة أو تفعيل صوت عربي في إعدادات الجهاز.';
}\nfunction playArabicItem(index,text){
  const isRecorded=currentSubject?.id==="english"&&currentLesson?.id==="phonics";
  if(!isRecorded){speak(text,state.voice,"ar");return}
  const audio=new Audio("./audio/ar/phonics-"+index+"-"+state.voice+".mp3");
  audio.preload="auto";
  audio.play().catch(()=>speak(text,state.voice,"ar"));
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
  return '<div class="item" data-i="'+i+'"><span>'+x[0]+'</span><b>'+x[1]+'</b><div class="ar itemAr">'+x[2]+'</div><div class="speakRow"><button class="speakBtn en" data-i="'+i+'">🔊 English</button><button class="speakBtn arBtn" data-i="'+i+'">🔊 العربية</button></div></div>';
}
function openLesson(id){
  currentLesson=currentSubject&&currentSubject.lessons.find(l=>l.id===id);if(!currentLesson)return;
  $("#subjectView").classList.add("hidden");$("#lessonView").classList.remove("hidden");
  $("#lessonTitle").innerHTML=currentSubject.icon+' '+currentLesson.title+' <span class="ar">• '+currentLesson.ar+'</span>';
  $("#lessonIntro").innerHTML=currentLesson.intro+'<br><span class="ar">'+currentLesson.arIntro+'</span>';
  $("#items").innerHTML=currentLesson.items.map(itemMarkup).join("");
  $("#items").querySelectorAll(".speakBtn.en").forEach(b=>b.onclick=()=>{const x=currentLesson.items[+b.dataset.i];speak(x[1],state.voice,"en");$("#feedback").textContent="🌟 Great listening! ممتاز — "+x[1]});
  $("#items").querySelectorAll(".speakBtn.arBtn").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;const x=currentLesson.items[i];playArabicItem(i,x[2]);$("#feedback").textContent="🔊 العربية — "+x[2]});
  renderMemory();renderGame();renderQuiz();window.scrollTo({top:0,behavior:"smooth"});
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
function replayGame(){renderGame();speak(currentLesson.items[gameTarget][1],state.voice,"en")}
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
  $("#memoryToggle").onclick=toggleMemory;$("#homeBtn").onclick=backHome;$("#subjectBack").onclick=backHome;$("#lessonBack").onclick=backSubject;$("#quizRetry").onclick=renderQuiz;$("#gameReplay").onclick=replayGame;$("#gameSpeak").onclick=()=>{if(currentLesson)speak(currentLesson.items[gameTarget][1],state.voice,"en")};
  $("#girlVoice").onclick=()=>{state.voice="girl";saveState();speak("Hello! Let us learn together!","girl","en")};
  $("#boyVoice").onclick=()=>{state.voice="boy";saveState();speak("Hello! Let us learn and play!","boy","en")};
  $("#installBtn").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("#installBtn").classList.add("hidden")};
  if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js");
});
