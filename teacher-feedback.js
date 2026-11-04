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
const REVIEW_SAMPLES=Object.freeze({
 grade1:{grade:"Grade 1",subject:"English reading",page:"activity-library.html",notes:"Review 5–10 existing Grade 1 mini-questions. Note each question ID, whether the answer is unambiguous, and how the explanation supports learning. • راجع ٥ إلى ١٠ أسئلة من الصف الأول وسجّل أرقام الأسئلة وأي تصحيحات."},
 grade2:{grade:"Grade 2",subject:"English reading",page:"grade2-english.html",notes:"Review 5–10 Grade 2 pilot examples. Check that written English and draft Arabic instructions do not reveal answers or overstate curriculum coverage. • راجع أمثلة الصف الثاني وصحّح التعليمات الإنجليزية والعربية."},
 phonics:{grade:"Grade 1",subject:"English reading",page:"pronunciation-review.html?lesson=phonics",notes:"Adult-only: compare cat, fish, sun and bus recordings. Identify the language, voice style and exact word that sounds unclear. Whole words are NOT isolated phonemes; no recording is educator-approved here. • للكبار فقط: راجع النطق وحدّد الكلمة والصوت بدقة."},
 arabic:{grade:"Grade 1",subject:"Arabic language",page:"pronunciation-review.html?lesson=patterns",notes:"Adult-only: review red/yellow and their Arabic equivalents, plus the other colours. Check MSA word choice, diacritics, natural sound and clarity on phone speakers. Some recordings are withheld from children pending review. • للكبار فقط: راجع الألوان ونطق العربية الفصحى ووضوح الصوت."},
 science:{grade:"Grade 2",subject:"Science",page:"grade2-science.html",notes:"Review 5–10 published Grade 2 science pilot questions. Check basic science accuracy, age-appropriate explanation, draft Arabic and safe examples. • راجع أمثلة العلوم ودقة الحقائق وسلامة الأنشطة."},
 accessibility:{grade:"Mixed grades",subject:"App accessibility and usability",page:"choose-grade.html",notes:"Try grade navigation on a phone. Check text size, RTL labels, screen-reader order, easy stopping and tap targets. Do not collect children's identity or device location. • افحص سهولة الاستخدام وحجم النص والعربية على الهاتف."}
});
const assignment=$("reviewAssignment");
const assignmentNotes=$("assignmentNotes");
const assignmentOpen=$("assignmentOpen");
const useAssignment=$("useAssignment");
assignment.addEventListener("change",()=>{
 const task=REVIEW_SAMPLES[assignment.value];
 useAssignment.disabled=!task;
 assignmentNotes.hidden=!task;
 assignmentOpen.hidden=!task;
 if(!task){assignmentNotes.textContent="";assignmentOpen.href="./";return;}
 assignmentNotes.textContent=task.notes;
 assignmentOpen.href="./"+task.page;
});
useAssignment.addEventListener("click",()=>{
 const task=REVIEW_SAMPLES[assignment.value];
 if(!task)return;
 const fields=[["grade",task.grade],["subject",task.subject],["reviewLink",task.page]];
 if(fields.some(([id,value])=>$(id).value.trim()&&$(id).value.trim()!==value) &&
   !window.confirm("Replace the grade, subject and page details already entered? Other comments will be preserved."))return;
 for(const [id,value] of fields)$(id).value=value;
 tell("✅ Review sample prepared. Please complete your own checks and ratings before sharing. Nothing was sent.");
 $("grade").focus();
});
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
 const ids=["issues","strengths","suggestions","finalComments"];
 const hasContent=ids.some(id=>$(id).value.trim()!=="");
 const hasRating=["accuracy","level","english","arabic","visuals","culture","usability","overall"].some(id=>$(id).selectedIndex>0);
 if(!hasContent&&!hasRating){tell("Please add an actual quality rating or written observation before sharing. • يرجى إدخال الملاحظات.");return false}
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