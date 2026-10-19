/* Adults only. No accounts, network, storage, notifications, or automatic feedback upload. */
(()=>{
"use strict";
const form=document.getElementById("brandReview");
const scores=["englishPron","arabicPron","meaning","memory","future"];
const labels=["English-child pronunciation","Arabic-child pronunciation","Arabic/cultural suitability","Parent/teacher recall","Grades 1–6 suitability"];
for(const id of scores){
 const s=document.getElementById(id);
 const unset=document.createElement("option");unset.value="";unset.textContent="Select 1–5";s.append(unset);
 for(let n=1;n<=5;n++){
  const o=document.createElement("option");o.value=String(n);o.textContent=String(n)+" / 5";s.append(o);
 }
}
function clean(s){return String(s||"").replace(/[\x00-\x1f\x7f]/g," ").trim()}
form.addEventListener("submit",event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const name=clean(document.getElementById("candidateChoice").value);
 const scoreValues=scores.map(id=>Number(document.getElementById(id).value));
 if(!scoreValues.every(x=>Number.isInteger(x)&&x>=1&&x<=5))return;
 const total=scoreValues.reduce((a,b)=>a+b,0);
 const notes=clean(document.getElementById("reviewNotes").value)||"No comments";
 const review=[
  "Little Learners Academy — adult brand shortlist review",
  "Proposed name: "+name,
  ...scores.map((id,i)=>labels[i]+": "+scoreValues[i]+"/5"),
  "Preference score: "+total+"/25 — opinion only, NOT trademark or SEO clearance",
  "Adult notes: "+notes,
  "Legal trademark, registered trade names, real domains, app-store availability, and native Arabic review all PENDING.",
  "Do not include or share identifying details of a child."
 ].join("\n");
 document.getElementById("report").value=review;
 document.getElementById("copyStatus").textContent="";
 const panel=document.getElementById("reportPanel");panel.hidden=false;panel.scrollIntoView({block:"nearest"});
});
document.getElementById("clearReview").addEventListener("click",()=>{
 form.reset();
 document.getElementById("report").value="";
 document.getElementById("reportPanel").hidden=true;
 document.getElementById("copyStatus").textContent="";
});
document.getElementById("copyReview").addEventListener("click",async()=>{
 const report=document.getElementById("report");
 if(!report.value)return;
 const msg=document.getElementById("copyStatus");
 try{
  if(!navigator.clipboard||typeof navigator.clipboard.writeText!=="function")throw Error("Unavailable");
  await navigator.clipboard.writeText(report.value);
  msg.textContent="Review copied. Please inspect the text before sharing.";
 }catch{
  report.focus();report.select();
  msg.textContent="Automatic copy is unavailable here. Select and copy the review text manually.";
 }
});
})();