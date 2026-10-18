/* Adult-authored, on-device-only formative curriculum feedback.
 * Never persists, sends, grades or requests identifying learner information.
 * A prepared review is copied only following a user-initiated click.
 */
(()=>{
"use strict";
const allowedFamilies=new Map([
 ["ing",2],["and",2],["all",3],["ack",3],
 ["ain",4],["ink",4],["ay",5],["ick",5]
]);
const $=id=>document.getElementById(id);
const family=$("family");
const stage=$("stage");
const domain=$("domain");
const decision=$("decision");
const observation=$("observation");
const suggestion=$("suggestion");
const report=$("report");
const status=$("status");
const openLesson=$("openLesson");
const form=$("reviewForm");
function selectedFamily(){
 return allowedFamilies.has(family.value)?family.value:"ing";
}
function updateLessonLink(){
 openLesson.href="./grade2-phonics-pathway.html?family="+selectedFamily();
}
const requestedFamily=new URLSearchParams(window.location.search).get("family");
if(allowedFamilies.has(requestedFamily))family.value=requestedFamily;
updateLessonLink();
family.addEventListener("change",updateLessonLink);
form.addEventListener("submit",event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const note=observation.value.trim();
 if(!note){
  status.textContent="Please write one adult-authored observation without personal details.";
  observation.focus();
  return;
 }
 const id=selectedFamily();
 const selectedModule=allowedFamilies.get(id);
 const optional=suggestion.value.trim();
 const lines=[
  "Little Learning Academy | Draft Grade 2 adult educator review",
  "Module: "+selectedModule,
  "Word family: -"+id,
  "Stage: "+stage.value,
  "Review area: "+domain.value,
  "Decision: "+decision.value,
  "Observation: "+note,
  "Suggested correction: "+(optional||"None provided"),
  "Source reference: Grade 2 Semester 1 Overview 2026-2027, p.17 (word families); p.2 (teaching methods)",
  "Adult-authored, anonymous feedback. Not Ministry approval or formal student assessment."
 ];
 report.value=lines.join("\n");
 status.textContent="Private review prepared on this page. You may now copy it if you wish.";
 report.focus();
});
form.addEventListener("reset",()=>{
 report.value="";
 status.textContent="Draft cleared; nothing was saved or submitted.";
 openLesson.href="./grade2-phonics-pathway.html?family=ing";
});
$("copyReport").addEventListener("click",async()=>{
 if(!report.value.trim()){
  status.textContent="Prepare a private review first.";
  return;
 }
 try{
  if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(report.value);
  status.textContent="Copied to this device's clipboard. Please review before sharing; do not include child details.";
 }catch{
  report.focus();
  report.select();
  status.textContent="Automatic copy is unavailable. The review text is selected; use your device's Copy command.";
 }
});
})();