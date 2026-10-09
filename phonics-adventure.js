/* Little Learners Academy original Reading Adventure.
 * Inspired by *ideas* from structured phonics games and bilingual early learning.
 * No third-party assets, recordings, tracking, paid services or copyrighted copy.
 * Visual sound tiles deliberately do NOT fake unreviewed isolated phoneme audio.
 */
(() => {
  "use strict";
  const WORDS = [
    { en:"cat", ar:"قطة", picture:"🐱", sounds:["c","a","t"] },
    { en:"fish", ar:"سمكة", picture:"🐟", sounds:["f","i","sh"] },
    { en:"sun", ar:"شمس", picture:"☀️", sounds:["s","u","n"] },
    { en:"bus", ar:"حافلة", picture:"🚌", sounds:["b","u","s"] }
  ];
  const QUEST_KEY = "lla-reading-quest-v1";
  const MAIN_KEY = "lla-progress-v2";
  const $ = selector => document.querySelector(selector);
  const read = key => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); }
    catch { return null; }
  };
  const write = (key,value) => {
    try { localStorage.setItem(key,JSON.stringify(value)); }
    catch { /* Browser privacy mode can disable storage; playing still works. */ }
  };

  let saved = read(QUEST_KEY);
  if (!saved || typeof saved !== "object" || !Array.isArray(saved.done)) saved = {done:[]};
  saved.done = [...new Set(saved.done.filter(x => Number.isInteger(x) && x >= 0 && x < WORDS.length))];
  const main = read(MAIN_KEY) || {};
  const chosenEnglish = main.voice === "boy" ? "boy" : "girl";
  let current = WORDS.findIndex((_w,i) => !saved.done.includes(i));
  if (current < 0) current = 0;
  let correctPieces = 0;
  let activeAudio = null;
  let attempt = 0;
  let answerComplete = false;

  function stopAudio() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.removeAttribute("src");
      activeAudio.load();
      activeAudio = null;
    }
  }

  function status(text) {
    $("#audioStatus").textContent = text;
  }

  function playAudio(language) {
    stopAudio();
    const word = WORDS[current];
    // Arabic boy is currently the parent-preferred intelligible reference.
    // Female Arabic trial audio stays on voice-test.html until approved.
    const speaker = language === "ar" ? "boy" : chosenEnglish;
    const file = "./audio/practice/" + language + "-phonics-" + current + "-" + speaker + ".mp3?v=three-repeat-1";
    const audio = new Audio(file);
    const requestId = ++attempt;
    activeAudio = audio;
    audio.preload = "auto";
    audio.playbackRate = 1;
    status(language === "ar" ? "🔊 Arabic meaning repeated 3 times • استمع ثلاث مرات" : "🔊 The English word plays 3 times — listen and repeat!");
    audio.addEventListener("error",() => {
      if (attempt === requestId) status("Audio unavailable. Please reconnect and try again. • الصوت غير متاح");
    },{once:true});
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        if (attempt === requestId) status("Tap to retry audio or check your connection. • حاول تشغيل الصوت مجددًا");
      });
    }
  }

  function setText(selector,value) { $(selector).textContent = value; }

  function updateTrail() {
    const container = $("#wordTrail");
    container.replaceChildren();
    WORDS.forEach((word,i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "trailItem" + (saved.done.includes(i) ? " done" : "");
      button.setAttribute("aria-current",String(current === i));
      button.setAttribute("aria-label","Read " + word.en + (saved.done.includes(i) ? ", completed" : ""));
      const icon = document.createElement("span");
      icon.className = "trailIcon";
      icon.setAttribute("aria-hidden","true");
      icon.textContent = saved.done.includes(i) ? "✅" : word.picture;
      const label = document.createElement("small");
      label.textContent = word.en;
      button.append(icon,label);
      button.addEventListener("click",() => selectWord(i));
      container.append(button);
    });
    setText("#journeyCount",(current + 1) + " / " + WORDS.length);
    setText("#questStars","⭐ " + saved.done.length + " / " + WORDS.length);
  }

  function updateSoundTargets() {
    const container = $("#buildTarget");
    container.replaceChildren();
    WORDS[current].sounds.forEach((chunk,i) => {
      const cell = document.createElement("span");
      cell.className = "soundCell" + (i < correctPieces ? " filled" : "");
      cell.textContent = i < correctPieces ? chunk : "•";
      cell.setAttribute("aria-label",i < correctPieces ? chunk : "empty sound group");
      container.append(cell);
    });
  }

  function shuffled(values) {
    const items = values.slice();
    for (let i = items.length - 1;i > 0;i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i],items[j]] = [items[j],items[i]];
    }
    return items;
  }

  function updateLetterTiles() {
    const target = WORDS[current].sounds;
    const container = $("#letterOptions");
    container.replaceChildren();
    shuffled(target.map((letter,index) => ({letter,index}))).forEach(({letter,index}) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "letterTile";
      button.textContent = letter;
      button.setAttribute("aria-label","Letter group " + letter);
      button.addEventListener("click",() => {
        if (index !== correctPieces) {
          setText("#buildFeedback","🌱 Try a different letter group! • حاول بحرف آخر");
          return;
        }
        button.disabled = true;
        button.classList.add("selected");
        correctPieces++;
        updateSoundTargets();
        if (correctPieces === target.length) {
          $("#blendWord").disabled = false;
          setText("#buildFeedback","🌟 Great! You built " + WORDS[current].en + ". Tap Blend & hear!");
          setText("#buddyMessage","Wonderful! Let's listen to your whole word.");
        } else {
          setText("#buildFeedback","👏 Good! Now find the next letter group.");
        }
      });
      container.append(button);
    });
  }

  function updateStep(phase) {
    ["#stepOne","#stepTwo","#stepThree"].forEach((selector,i) => {
      $(selector).classList.toggle("active",(phase === "look" && i === 0) ||
        (phase === "build" && i === 1) ||
        (phase === "find" && i === 2));
    });
  }

  function drawPictureChoices() {
    const container = $("#pictureChoices");
    container.replaceChildren();
    shuffled(WORDS.map((word,index) => ({word,index}))).forEach(({word,index}) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pictureChoice";
      button.setAttribute("aria-label","Picture of " + word.en);
      const image = document.createElement("span");
      image.className = "pictureIcon";
      image.textContent = word.picture;
      image.setAttribute("aria-hidden","true");
      button.append(image);
      button.addEventListener("click",() => {
        if (answerComplete) return;
        if (index !== current) {
          button.classList.add("incorrect");
          setText("#findFeedback","🌱 Almost! Listen once more and try a different picture.");
          return;
        }
        answerComplete = true;
        button.classList.add("correct");
        $("#pictureChoices").querySelectorAll("button").forEach(b => b.disabled = true);
        setText("#findFeedback","🎉 You found the " + word.en + "!");
        setText("#buddyTitle","You're a reading star! ⭐");
        setText("#buddyMessage","Great listening and word building!");
        $("#successPanel").hidden = false;
        updateStep("find");
        earnStar();
      });
      container.append(button);
    });
  }

  function earnStar() {
    if (saved.done.includes(current)) return;
    // Merge the latest quest object: Sound Detective may have earned new
    // badges since the word-building page first loaded.
    const latest=read(QUEST_KEY);
    const quest=latest && typeof latest==="object" && !Array.isArray(latest)
      ?latest:saved;
    const done=Array.isArray(quest.done)?quest.done:[];
    if(done.includes(current)){
      saved=quest;
      updateTrail();
      return;
    }
    quest.done=[...new Set([...done,current])];
    saved=quest;
    write(QUEST_KEY,quest);
    // Award just one total app star per newly completed quest word.
    const storedMain = read(MAIN_KEY);
    const full = storedMain && typeof storedMain === "object" && !Array.isArray(storedMain)
      ? storedMain : {voice:chosenEnglish, stars:0, completed:{}};
    full.stars = Math.max(0,Number(full.stars) || 0) + 1;
    write(MAIN_KEY,full);
    updateTrail();
  }

  function resetBuilding() {
    correctPieces = 0;
    answerComplete = false;
    $("#findPanel").hidden = true;
    $("#successPanel").hidden = true;
    $("#blendWord").disabled = true;
    setText("#buildFeedback","Tap each letter group in the correct order. Ask a grown-up to model each sound.");
    setText("#buddyTitle","Hello, reading star! 🌟");
    setText("#buddyMessage","Look at the picture, listen, then build the word!");
    updateStep("build");
    updateSoundTargets();
    updateLetterTiles();
    drawPictureChoices();
  }

  function selectWord(index) {
    if (!Number.isInteger(index) || index < 0 || index >= WORDS.length) return;
    stopAudio();
    attempt++;
    current = index;
    const word = WORDS[current];
    setText("#wordText",word.en);
    setText("#wordArabic",word.ar);
    setText("#wordPicture",word.picture);
    $("#wordPicture").setAttribute("aria-label",word.en + " picture");
    status("");
    $("#nextWord").textContent = current === WORDS.length - 1 ?
      "🌈 Adventure again! • العب مرة أخرى" :
      "Next adventure ➜ • المغامرة التالية";
    resetBuilding();
    updateTrail();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  document.addEventListener("DOMContentLoaded",() => {
    $("#hearEnglish").addEventListener("click",() => playAudio("en"));
    $("#hearArabic").addEventListener("click",() => playAudio("ar"));
    $("#repeatWord").addEventListener("click",() => playAudio("en"));
    $("#startOver").addEventListener("click",resetBuilding);
    $("#blendWord").addEventListener("click",() => {
      if (correctPieces !== WORDS[current].sounds.length) return;
      playAudio("en");
      $("#findPanel").hidden = false;
      updateStep("find");
      setText("#findFeedback","Find the picture that matches the word!");
      $("#findPanel").scrollIntoView({block:"nearest",behavior:"smooth"});
    });
    $("#nextWord").addEventListener("click",() => {
      const next = (current + 1) % WORDS.length;
      selectWord(next);
    });
    selectWord(current);
  });
})();
