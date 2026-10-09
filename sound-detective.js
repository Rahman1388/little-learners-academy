/* Sound Detective — independent initial-letter recognition game.
 * Original game assets, no external tracking, no isolated phoneme TTS.
 * Each prompt reuses the existing three-repeat MP3 for a whole English word.
 * Progress is saved to the existing LLA reading quest object; old progress
 * and main-app stars remain intact.
 */
(() => {
  "use strict";
  const WORDS = Object.freeze([
    {en:"cat",ar:"قطة",letter:"C",icon:"🐱"},
    {en:"fish",ar:"سمكة",letter:"F",icon:"🐟"},
    {en:"sun",ar:"شمس",letter:"S",icon:"☀️"},
    {en:"bus",ar:"حافلة",letter:"B",icon:"🚌"},
  ]);
  const MAIN_KEY="lla-progress-v2";
  const QUEST_KEY="lla-reading-quest-v1";
  const $ = selector => document.querySelector(selector);
  const read = key => {
    try {return JSON.parse(localStorage.getItem(key)||"null")}
    catch {return null}
  };
  const store = (key, value) => {
    try {localStorage.setItem(key,JSON.stringify(value))}
    catch {/* Still playable with storage disabled. */}
  };
  function shuffled(input) {
    const arr=input.slice();
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  const existing=read(QUEST_KEY);
  let saved=existing && typeof existing==="object" && !Array.isArray(existing)
    ?existing:{done:[]};
  if(!Array.isArray(saved.detectiveDone))saved.detectiveDone=[];
  saved.detectiveDone=[...new Set(saved.detectiveDone.filter(n=>Number.isInteger(n)&&n>=0&&n<WORDS.length))];

  let position=WORDS.findIndex((_w,i)=>!saved.detectiveDone.includes(i));
  if(position<0)position=0;
  let solved=false;
  let activeAudio=null;
  let audioSerial=0;

  function announce(message) {$("#detectiveFeedback").textContent=message}
  function audioStatus(message){$("#detectiveAudioStatus").textContent=message}
  function stopAudio(){
    ++audioSerial;
    if(activeAudio){
      activeAudio.pause();
      activeAudio.removeAttribute("src");
      activeAudio.load();
      activeAudio=null;
    }
  }
  function playExample(){
    stopAudio();
    const s=++audioSerial;
    const main=read(MAIN_KEY);
    const gender=main && main.voice==="boy"?"boy":"girl";
    // Parent-approved triple repetition; no unreviewed individual phoneme files.
    const file="./audio/practice/en-phonics-"+position+"-"+gender+".mp3?v=three-repeat-1";
    const player=new Audio(file);
    activeAudio=player;
    player.preload="auto";
    player.playbackRate=1;
    audioStatus("🔊 Listening three times… • استمع ثلاث مرات");
    player.addEventListener("error",()=>{
      if(s===audioSerial)audioStatus("Audio could not load. Check your connection, then press Listen again. • تعذر تشغيل الصوت");
    },{once:true});
    player.addEventListener("ended",()=>{
      if(s===audioSerial)audioStatus("🌟 Listen and repeat! • استمع وكرر");
    },{once:true});
    const p=player.play();
    if(p && typeof p.catch==="function"){
      p.catch(()=>{
        if(s===audioSerial)audioStatus("Tap Listen again to play the sound. • حاول مجددًا");
      });
    }
  }
  function refreshStickers(){
    const container=$("#detectiveStickers");
    container.replaceChildren();
    WORDS.forEach((word,i)=>{
      const badge=document.createElement("span");
      badge.className="detectiveSticker"+(saved.detectiveDone.includes(i)?" collected":"");
      badge.textContent=saved.detectiveDone.includes(i)?word.icon:"☆";
      badge.title=saved.detectiveDone.includes(i)?word.en:"Not earned yet";
      badge.setAttribute("aria-label",saved.detectiveDone.includes(i)
        ?"Earned "+word.letter+" badge":"Locked "+word.letter+" badge");
      container.append(badge);
    });
    $("#detectiveProgressText").textContent=saved.detectiveDone.length+" / "+WORDS.length;
    $("#detectiveWin").hidden=saved.detectiveDone.length<WORDS.length;
  }
  function earnBadge(){
    if(saved.detectiveDone.includes(position))return;
    // Re-read before writing so the normal Reading Adventure's "done"
    // progress is never overwritten by a stale copy of localStorage.
    const latest=read(QUEST_KEY);
    const data=latest&&typeof latest==="object"&&!Array.isArray(latest)?latest:saved;
    const already=Array.isArray(data.detectiveDone)?data.detectiveDone:[];
    if(already.includes(position)) {
      saved=data;
      return;
    }
    data.detectiveDone=[...new Set([...already,position])];
    saved=data;
    store(QUEST_KEY,data);

    const mainData=read(MAIN_KEY);
    const main=mainData&&typeof mainData==="object"&&!Array.isArray(mainData)
      ?mainData:{voice:"girl",slow:false,stars:0,completed:{}};
    main.stars=Math.max(0,Number(main.stars)||0)+1;
    store(MAIN_KEY,main);
  }
  function drawChoices(){
    const container=$("#detectiveChoices");
    container.replaceChildren();
    shuffled(WORDS.map((word,index)=>({word,index}))).forEach(({word,index})=>{
      const button=document.createElement("button");
      button.type="button";
      button.className="detectiveChoice";
      button.setAttribute("aria-label","Picture of "+word.en);
      const icon=document.createElement("span");
      icon.className="detectivePicture";
      icon.textContent=word.icon;
      icon.setAttribute("aria-hidden","true");
      button.append(icon);
      button.addEventListener("click",()=>{
        if(solved)return;
        container.querySelectorAll(".detectiveChoice").forEach(b=>b.classList.remove("wrong"));
        if(index!==position){
          button.classList.add("wrong");
          announce("🌱 Not quite! Look at the first letter and try again. • حاول مرة أخرى");
          return;
        }
        solved=true;
        button.classList.add("correct");
        container.querySelectorAll("button").forEach(b=>b.disabled=true);
        announce("🎉 Yes! "+word.letter+" starts "+word.en+". • أحسنت! "+word.ar);
        $("#detectiveNext").disabled=false;
        earnBadge();
        refreshStickers();
        if(saved.detectiveDone.length===WORDS.length){
          $("#detectiveNext").textContent="🏆 Review from start • راجع من البداية";
        }else{
          $("#detectiveNext").textContent="Next clue ➜ • السؤال التالي";
        }
      });
      container.append(button);
    });
  }
  function selectClue(index){
    if(index<0||index>=WORDS.length)return;
    stopAudio();
    position=index;
    solved=false;
    $("#detectiveLetter").textContent=WORDS[index].letter;
    $("#detectiveNext").disabled=true;
    announce("Which picture begins with "+WORDS[index].letter+"? • اختر الصورة المناسبة");
    audioStatus("🔊 Tap to hear the whole English word 3 times • استمع للكلمة");
    refreshStickers();
    drawChoices();
  }
  function nextClue(){
    // Always advance visibly to a DIFFERENT prompt on tap. This matters on
    // mobile where tapping Next at the bottom can otherwise look unchanged.
    const nextIncomplete=WORDS.findIndex((_w,i)=>
      i!==position&&!saved.detectiveDone.includes(i));
    const next=nextIncomplete>=0?nextIncomplete:(position+1)%WORDS.length;
    selectClue(next);
    announce("🔎 New clue: find the picture starting with "+WORDS[next].letter+
      "! • سؤال جديد: الحرف "+WORDS[next].letter);
    // Scroll directly to the NEW letter, not merely to the card's heading.
    $("#detectiveLetter").scrollIntoView({behavior:"instant",block:"center"});
    $("#detectiveLetter").focus({preventScroll:true});
  }
  document.addEventListener("DOMContentLoaded",()=>{
    if(!$("#soundDetective"))return;
    $("#detectiveListen").addEventListener("click",playExample);
    $("#detectiveNext").addEventListener("click",nextClue);
    $("#detectiveReview").addEventListener("click",()=>selectClue(0));
    selectClue(position);
  });
})();