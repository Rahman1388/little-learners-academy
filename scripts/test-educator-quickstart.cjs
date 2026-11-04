"use strict";
/* Teacher review handoff: check reviewed public pages and privacy guardrails. */
const assert=require("node:assert/strict"),fs=require("node:fs");
const html=fs.readFileSync("teacher-feedback.html","utf8");
const js=fs.readFileSync("teacher-feedback.js","utf8");
for(const id of ["reviewAssignment","useAssignment","assignmentNotes","assignmentOpen","teacherReview",
 "grade","subject","reviewLink","issues","showFeedback","copyFeedback","shareFeedback"]){
 assert(html.includes('id="'+id+'"'),"Missing educator-review control "+id);
}
for(const page of ["activity-library.html","grade2-english.html",
 "pronunciation-review.html","grade2-science.html","choose-grade.html"]){
 assert(fs.existsSync(page),"Review link must resolve to a published page in this repository: "+page);
 assert(js.includes('page:"'+page),"Review assignment target not found: "+page);
}
for(const value of ["grade1","grade2","phonics","arabic","science","accessibility"]){
 assert(html.includes('value="'+value+'"'),"Missing review option "+value);
 assert(js.includes(" "+value+":{"),"Missing review assignment "+value);
}
assert(html.includes('connect-src &#39;none&#39;')||html.includes("connect-src 'none'"),
 "Feedback page must block outbound network connections");
assert(js.includes('const ids=["issues","strengths","suggestions","finalComments"]'),
 "Review sharing must require actual rating or written findings");
assert(!/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket/.test(js),
 "Teacher feedback must not store or transmit reviews automatically");
assert(!/<script[^>]+src=["']https?:/i.test(html),"No remote scripts");
console.log("PASS: six review assignments, published-page targets, no auto-sending, and meaningful feedback required.");
