/* Source links are curated by adults, not fetched or live monitored.
 * No external API requests, tracking, accounts, data storage, or emergency inference.
 */
(()=>{
"use strict";
const data=window.LLA_SCHOOL_UPDATES;
if(!data||!Array.isArray(data.notices))return;
const cards=document.getElementById("updatesCards");
const status=document.getElementById("resultsStatus");
const filters=document.getElementById("filters");
const dateNode=document.getElementById("reviewDate");
const categories=new Set(["qatar","exams","safety","research"]);
const allowedHosts=new Set([
 "www.edu.gov.qa","edu.gov.qa","hukoomi.gov.qa","www.gco.gov.qa",
 "www.unesco.org","www.oecd.org"
]);
function el(tag,cls,text){
 const x=document.createElement(tag);
 if(cls)x.className=cls;
 if(text!==undefined)x.textContent=text;
 return x;
}
function linkIsOfficialSource(link){
 try{
  const u=new URL(link);
  return u.protocol==="https:"&&allowedHosts.has(u.hostname)&&!u.username&&!u.password;
 }catch{return false;}
}
function showDate(s){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return null;
 const [y,m,d]=s.split("-").map(Number);
 const dt=new Date(Date.UTC(y,m-1,d));
 return dt.getUTCFullYear()===y&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d?dt:null;
}
const verifiedDate=showDate(data.editorialReviewDate);
if(verifiedDate){
 dateNode.dateTime=data.editorialReviewDate;
 dateNode.textContent=verifiedDate.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});
}
function render(category){
 const valid=categories.has(category)||category==="all"?category:"all";
 const selected=data.notices.filter(n=>(valid==="all"||n.category===valid)&&categories.has(n.category)&&linkIsOfficialSource(n.url));
 cards.replaceChildren();
 for(const n of selected){
  const item=el("article","card");
  item.dataset.category=n.category;
  item.append(el("span","tag",n.kind));
  item.append(el("h3",null,n.title));
  const ar=el("span","ar",n.arabic||"");
  ar.lang="ar";ar.dir="rtl";
  item.append(ar,el("p",null,n.summary));
  const author=el("small",null,"Publisher: "+n.publisher);
  item.append(author);
  if(n.published&&showDate(n.published)){
   const t=el("time",null,showDate(n.published).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}));
   t.dateTime=n.published;
   const p=el("small",null,"Published: ");p.append(t);item.append(p);
  }else item.append(el("small",null,"Official source directory • Check for new updates at the publisher"));
  const link=el("a",null,"Open official source ↗");
  link.href=n.url;
  link.target="_blank";
  link.rel="noopener noreferrer";
  link.setAttribute("aria-label","Open original publisher for "+n.title+" (new tab)");
  item.append(link);
  cards.append(item);
 }
 for(const b of filters.querySelectorAll("button[data-category]")){
  b.setAttribute("aria-pressed",String(b.dataset.category===valid));
 }
 status.textContent=selected.length+" official-source "+(selected.length===1?"entry":"entries")+" shown • Not a live news feed";
}
filters.addEventListener("click",event=>{
 const b=event.target.closest("button[data-category]");
 if(!b||!filters.contains(b))return;
 render(b.dataset.category);
});
render("all");
// Browser fetch stays on our GitHub-hosted JSON snapshot; it never calls QNA.
const live=document.getElementById("liveHeadlines");
const liveStatus=document.getElementById("liveFeedStatus");
function validQnaArticle(url){
 try{
  const u=new URL(url);
  return u.protocol==="https:"&&u.hostname==="qna.org.qa"&&!u.username&&!u.password&&
    u.pathname.startsWith("/en/News-Area/News/20")&&!u.hash;
 }catch{return false}
}
function formatDateTime(date){
 return date.toLocaleString("en-GB",{timeZone:"Asia/Qatar",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})+" Qatar time";
}
async function loadHeadlines(){
 try{
  const response=await fetch("./school-live-news.json",{cache:"no-store"});
  if(!response.ok)throw Error("Feed snapshot unavailable");
  const data=await response.json();
  if(data.schema!==1||!Array.isArray(data.headlines)||data.headlines.length>12)throw Error("Unexpected feed data");
  const last=new Date(data.lastSuccessfulFetch);
  const validTime=typeof data.lastSuccessfulFetch==="string"&&Number.isFinite(+last);
  if(!validTime){
   liveStatus.textContent="Automatic news updates have not run successfully for this preview. Follow the original sources below.";
   return;
  }
  const age=Date.now()-(+last);
  const stale=age<0||age>12*60*60*1000;
  liveStatus.classList.toggle("stale",stale);
  liveStatus.textContent=(stale?"⚠️ News snapshot is older than 12 hours. Do not treat it as current.":"Latest stored news snapshot")+" • Retrieved: "+formatDateTime(last)+" • Scheduled updates are periodic, not instant.";
  const seen=new Set();
  for(const item of data.headlines){
   if(!item||typeof item.title!=="string"||item.title.length<12||item.title.length>220||!validQnaArticle(item.url)||seen.has(item.url))continue;
   const published=new Date(item.publishedAt);
   if(!Number.isFinite(+published)||+published>Date.now()+6*60*60*1000)continue;
   seen.add(item.url);
   const article=el("article","headline");
   const category=el("small",null,"Qatar News Agency • General education reporting");
   const heading=el("h3",null,item.title);
   const date=el("time",null,"Published "+formatDateTime(published));
   date.dateTime=published.toISOString();
   const meta=el("small");meta.append(date);
   const a=el("a",null,"Read original QNA article ↗");
   a.href=item.url;a.target="_blank";a.rel="noopener noreferrer";
   article.append(category,heading,meta,a);live.append(article);
  }
  if(!seen.size){
   live.append(el("p","note","No matching education-related QNA headlines were available in the last feed snapshot. This does not mean there are no official school announcements."));
  }
 }catch{
  liveStatus.textContent="Automatic news snapshot unavailable. Check official sources directly; this page cannot confirm current announcements.";
 }
}
loadHeadlines();
})();
