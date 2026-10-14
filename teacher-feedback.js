/* Voluntary review form. No network submission, no analytics, no local storage. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const controls=[
["role","Subject / reviewer role"],["grade","Grade or year"],["subject","Subject"],["questionCount","Activities reviewed"],
["reviewLink","Page / activity"],["questionIDs","Question IDs"],
["accuracy","Answer accuracy and explanations"],["level","Learning objectives and grade suitability"],
["english","English language"],["arabic","Arabic language"],["visuals","Pictures and audio"],
["culture","Culture and safety"],["usability","Usability and accessibility"],["overall","Overall recommendation"],
["strengths","Strengths"],["issues","Corrections needed"],["suggestions","Suggested changes and sources"],
["finalComments","Further recommendations"],["publicUse","Permission for public use"]
];
function summary(){
 const result=["LITTLE LEARNERS ACADEMY — VOLUNTARY TEACHER FEEDBACK",
 "Independent supplementary pilot; review is not school or ministry approval.",
 "Prepared: "+new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
 ""];
 for(const [id,label] of controls){const value=$(id).value.trim();result.push(label+": "+(value||"Not provided"));}
 result.push("","Privacy: no child personal data should be included. This review was manually shared by its author.");
 return result.join("\n");
}
function tell(message){$("status").textContent=message}
function preview(){const field=$("preview");field.value=summary();field.setAttribute("aria-hidden","false");field.style.display="block";return field}
function hasReview(){
 const ids=["grade","subject","issues","strengths","suggestions","finalComments"];
 const hasContent=ids.some(id=>$(id).value.trim()!=="");
 const hasRating=["accuracy","level","english","arabic","visuals","culture","usability","overall"].some(id=>$(id).selectedIndex>0);
 if(!hasContent&&!hasRating){tell("Please choose a subject or enter some feedback before sharing. • يرجى إدخال الملاحظات.");return false}
 return true;
}
$("showFeedback").addEventListener("click",()=>{
 if(!hasReview())return;
 preview();tell("Preview ready. You can also select and copy this text manually.");
 $("preview").scrollIntoView({behavior:"auto",block:"nearest"});
});
$("copyFeedback").addEventListener("click",async()=>{
 if(!hasReview())return;
 const field=preview(),value=field.value;
 try{
  if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
  else{field.focus();field.select();if(!document.execCommand("copy"))throw Error("Clipboard unavailable");}
  tell("✅ Feedback copied. Open WhatsApp or email and paste it to the project owner. It has not been sent automatically.");
 }catch{
  field.focus();field.select();tell("Please long-press the selected text and tap Copy, then paste it into WhatsApp or email.");
 }
});
$("shareFeedback").addEventListener("click",async()=>{
 if(!hasReview())return;
 const field=preview();
 if(navigator.share){
  try{
   await navigator.share({title:"Little Learners Academy teacher feedback",text:field.value});
   tell("Sharing menu closed. Please confirm with your chosen app that your message was actually sent.");
  }catch(error){
   if(error&&error.name==="AbortError")tell("Share was cancelled. The feedback is still visible below.");
   else tell("Sharing is unavailable on this browser. Tap Copy feedback, then paste into WhatsApp or email.");
  }
 }else{
  field.focus();field.select();tell("The phone Share menu is not available here. Tap Copy feedback instead and paste it into WhatsApp or email.");
 }
});
$("saveFeedback").addEventListener("click",()=>{
 if(!hasReview())return;
 const text=preview().value;
 try{
  const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="little-learners-teacher-feedback.txt";
  document.body.append(a);a.click();a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),2000);
  tell("A text copy was requested. Check Files or Downloads on your device. No feedback was uploaded.");
 }catch{tell("Save is not supported here. Use Copy or Share instead.")}
});
$("teacherReview").addEventListener("reset",event=>{
 if(!window.confirm("Clear all feedback entered on this page? This cannot be undone.")){event.preventDefault();return;}
 window.setTimeout(()=>{$("preview").value="";$("preview").style.display="none";$("preview").setAttribute("aria-hidden","true");tell("Form cleared. Nothing was submitted.")},0);
});
})();