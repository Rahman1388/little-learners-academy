/* Retrieves education-related headlines from the official QNA Qatar RSS feed.
 * This is PERIODIC NEWS, never an emergency-alert or school-closure service.
 * No third-party npm deps, tracking, API keys, user identifiers or webhooks.
 */
"use strict";
const fs=require("node:fs");
const https=require("node:https");
const path=require("node:path");
const FEED="https://qna.org.qa/en/Pages/RSS-Feeds/Qatar";
const OUTPUT=path.resolve(__dirname,"..","school-live-news.json");
const TERMS=/\b(education(?:al)?|schools?|students?|teachers?|classrooms?|exams?|universit(?:y|ies)|academic|academia|curricul(?:um|a)|learning|kindergartens?|preschools?|scholarships?|colleges?|schooling)\b/i;
const LIMIT=12;
function decodeXml(raw){
 return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1")
 .replace(/<[^>]*>/g,"")
 .replace(/&(?:amp|lt|gt|quot|apos|#(?:x[0-9a-f]+|[0-9]+));/gi,e=>{
  const k=e.slice(1,-1).toLowerCase();
  const names={amp:"&",lt:"<",gt:">",quot:'"',apos:"'"};
  if(names[k])return names[k];
  const n=k.startsWith("#x")?parseInt(k.slice(2),16):parseInt(k.slice(1),10);
  return n>0&&n<=0x10ffff&&!(n>=0xd800&&n<=0xdfff)?String.fromCodePoint(n):"";
 }).replace(/\s+/g," ").trim();
}
function tag(item,name){
 const m=item.match(new RegExp("<"+name+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/"+name+"\\s*>","i"));
 return m?decodeXml(m[1]):"";
}
function safeArticleUrl(s){
 try{
  const u=new URL(s);
  return u.protocol==="https:"&&u.hostname==="qna.org.qa"&&!u.username&&!u.password&&
   /^\/en\/News-Area\/News\/20\d{2}-\d{2}\//.test(u.pathname)&&!u.hash;
 }catch{return false}
}
function parseFeed(xml,now=new Date()){
 if(typeof xml!=="string"||xml.length>1024*1024||!/<rss\b/i.test(xml)||!/<channel\b/i.test(xml))throw Error("Invalid or oversized QNA RSS");
 const matches=[...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item\s*>/gi)];
 if(!matches.length)throw Error("RSS does not contain any items");
 const unique=new Set(),headlines=[];
 let validDatedArticleLinks=0;
 for(const match of matches){
  const item=match[1],title=tag(item,"title"),url=tag(item,"link"),date=tag(item,"pubDate");
  if(!safeArticleUrl(url))continue;
  const published=new Date(date);
  if(!Number.isFinite(+published))continue;
  validDatedArticleLinks++;
  if(!TERMS.test(title)||title.length<12||title.length>220)continue;
  const age=+now-(+published);
  if(age<-(6*60*60*1000)||age>30*24*60*60*1000)continue;
  if(unique.has(url))continue;
  unique.add(url);
  headlines.push({title,url,publishedAt:published.toISOString()});
 }
 if(validDatedArticleLinks===0)throw Error("RSS had no recognized dated official QNA articles; do not treat a changed feed format as successful");
 headlines.sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
 return {
  schema:1,
  source:"Qatar News Agency — Qatar RSS",
  sourceFeed:FEED,
  lastSuccessfulFetch:now.toISOString(),
  headlineScope:"General education reporting, not verified school directives, examinations or emergency alerts",
  headlines:headlines.slice(0,LIMIT)
 };
}
async function download(){
 const fixture=process.env.QNA_RSS_FIXTURE;
 if(fixture)return fs.readFileSync(fixture,"utf8");
 return new Promise((resolve,reject)=>{
  const req=https.get(FEED,{timeout:15000,headers:{"User-Agent":"LittleLearnersAcademyNews/1.0 (public QNA RSS, education titles)" }},res=>{
   if(res.statusCode!==200){res.resume();reject(Error("QNA feed HTTP "+res.statusCode));return;}
   let body="",size=0;
   res.setEncoding("utf8");
   res.on("data",chunk=>{size+=Buffer.byteLength(chunk);if(size>1024*1024){req.destroy(Error("RSS too large"));return;}body+=chunk;});
   res.on("end",()=>resolve(body));
   res.on("error",reject);
  });
  req.on("timeout",()=>req.destroy(Error("QNA feed timeout")));
  req.on("error",reject);
 });
}
if(require.main===module){
 (async()=>{
  const parsed=parseFeed(await download());
  fs.writeFileSync(OUTPUT,JSON.stringify(parsed,null,2)+"\n","utf8");
  console.log("QNA education RSS refreshed: "+parsed.headlines.length+" headline(s); last success "+parsed.lastSuccessfulFetch);
 })().catch(e=>{console.error("QNA refresh failed; existing feed data is preserved: "+e.message);process.exitCode=1});
}
module.exports={parseFeed,safeArticleUrl,decodeXml};
