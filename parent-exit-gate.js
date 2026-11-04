/* Parent-assisted exit checkpoint for independently sourced reference links.
 * No child account, cookies, analytics, remote scripts, or retained answers.
 * This is friction for supervised learning, NOT reliable adult identity verification.
 */
(()=>{
  "use strict";
  let overlay, answerInput, questionText, hostText, feedback, dialog;
  let expected=0, destination="", returnFocus=null;

  function safeExternal(raw){
    try{
      const url=new URL(raw,window.location.href);
      if(url.protocol!=="https:"||url.origin===window.location.origin||url.username||url.password)return null;
      return url;
    }catch{return null;}
  }

  function closeGate(){
    if(!overlay)return;
    overlay.hidden=true;
    document.body.classList.remove("llaExitLocked");
    destination="";
    if(returnFocus&&returnFocus.isConnected)returnFocus.focus();
    returnFocus=null;
  }

  function createGate(){
    if(overlay)return;
    overlay=document.createElement("div");
    overlay.id="llaParentExitOverlay";
    overlay.className="llaExitOverlay";
    overlay.hidden=true;
    overlay.innerHTML=
      '<section class="llaExitDialog" role="dialog" aria-modal="true" aria-labelledby="llaExitTitle" aria-describedby="llaExitIntro">'+
      '<h2 id="llaExitTitle" tabindex="-1">🔒 Parent checkpoint <span lang="ar" dir="rtl">تأكيد وليّ الأمر</span></h2>'+
      '<p id="llaExitIntro">You are about to leave Little Learners Academy for an independent website. Ask a parent or teacher to help. <span lang="ar" dir="rtl">أنت على وشك مغادرة التطبيق إلى موقع خارجي. اطلب المساعدة من وليّ الأمر أو المعلّم.</span></p>'+
      '<p class="llaExitHost"><strong>External website • موقع خارجي:</strong> <span id="llaExitHost"></span></p>'+
      '<form id="llaExitForm">'+
      '<label for="llaExitAnswer">Adult question • سؤال لوليّ الأمر: <strong id="llaExitQuestion"></strong></label>'+
      '<input id="llaExitAnswer" type="number" inputmode="numeric" autocomplete="off" required aria-describedby="llaExitFeedback">'+
      '<p id="llaExitFeedback" role="status" aria-live="polite">An adult should answer before opening the website. • يُرجى من وليّ الأمر الإجابة.</p>'+
      '<div class="llaExitButtons">'+
      '<button type="submit">Continue to website • متابعة إلى الموقع</button>'+
      '<button type="button" id="llaExitStay" class="llaExitStay">Stay in the app • البقاء في التطبيق</button>'+
      '</div></form>'+
      '<p class="llaExitFoot">This check does not verify adult identity. Please supervise children using the browser. • هذا الإجراء لا يُثبت هوية وليّ الأمر.</p>'+
      '</section>';
    document.body.append(overlay);
    dialog=overlay.querySelector(".llaExitDialog");
    answerInput=overlay.querySelector("#llaExitAnswer");
    questionText=overlay.querySelector("#llaExitQuestion");
    hostText=overlay.querySelector("#llaExitHost");
    feedback=overlay.querySelector("#llaExitFeedback");
    overlay.querySelector("#llaExitStay").addEventListener("click",closeGate);
    overlay.querySelector("#llaExitForm").addEventListener("submit",event=>{
      event.preventDefault();
      if(!destination)return;
      if(answerInput.value.trim()!==String(expected)){
        feedback.textContent="Please ask an adult to try again. • يُرجى من وليّ الأمر المحاولة مرة أخرى.";
        answerInput.focus();
        answerInput.select();
        return;
      }
      const approved=safeExternal(destination);
      if(!approved){closeGate();return;}
      // The adult's deliberate submit action is the only outbound navigation.
      window.location.assign(approved.href);
    });
    overlay.addEventListener("keydown",event=>{
      if(event.key==="Escape"){event.preventDefault();closeGate();return;}
      if(event.key!=="Tab")return;
      const active=[...dialog.querySelectorAll("input,button")].filter(el=>!el.disabled);
      if(!active.length)return;
      const first=active[0],last=active[active.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
  }

  function openGate(link){
    const url=safeExternal(link.dataset.parentExitUrl);
    if(!url)return;
    createGate();
    destination=url.href;
    returnFocus=link;
    const a=12+Math.floor(Math.random()*8);
    const b=12+Math.floor(Math.random()*8);
    expected=a*b;
    questionText.textContent=a+" × "+b+" = ?";
    hostText.textContent=url.hostname;
    answerInput.value="";
    feedback.textContent="An adult should answer before opening the website. • يُرجى من وليّ الأمر الإجابة.";
    overlay.hidden=false;
    document.body.classList.add("llaExitLocked");
    overlay.querySelector("#llaExitTitle").focus();
  }

  function intercept(event){
    if(event.type==="auxclick"&&event.button!==1)return;
    const element=event.target;
    const link=element&&element.closest?element.closest("a[data-parent-exit-url]"):null;
    if(!link)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openGate(link);
  }
  document.addEventListener("click",intercept,true);
  document.addEventListener("auxclick",intercept,true);
})();
