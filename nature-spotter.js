(()=>{
"use strict";
const SCENES=window.LLA_NATURE_SPOTTER;
const $=id=>document.getElementById(id);
const LOOK={
 mangrove:{icon:"🌳 🌊 🐦",label:"Mangrove roots, water and birds illustrated with text and symbols"},
 desert:{icon:"☀️ 🐪 🌵",label:"Desert sun, sand and plants illustrated with text and symbols"},
 coast:{icon:"🌊 🐚 🐟",label:"Coastline, shells and fish illustrated with text and symbols"}
};
const arabicDigits=value=>String(value).replace(/[0-9]/g,v=>"٠١٢٣٤٥٦٧٨٩"[Number(v)]);
let sceneIndex=0,activeItem=null;
const noticed=new Set();
const compareItems=[];
const CARE={
 mangrove:{en:"3. How can we watch this habitat without disturbing plants or wildlife?",ar:"٣. كيف نراقب هذا الموطن دون إزعاج النباتات أو الحيوانات؟"},
 desert:{en:"3. How can a family explore the desert safely and leave no litter?",ar:"٣. كيف تستكشف الأسرة الصحراء بأمان دون ترك نفايات؟"},
 coast:{en:"3. How can we enjoy the beach while protecting marine life?",ar:"٣. كيف نستمتع بالشاطئ مع حماية الحياة البحرية؟"}
};
function makeEl(tag,className,value){
 const e=document.createElement(tag);
 if(className)e.className=className;
 if(value!==undefined)e.textContent=value;
 return e;
}
function arabic(tag,value){
 const e=makeEl(tag,"arabic",value);e.lang="ar";e.dir="rtl";return e;
}
function updateCompare(){
 const add=$("addCompare"),clear=$("clearCompare");
 const canAdd=!!activeItem&&compareItems.length<2&&!compareItems.some(item=>item.id===activeItem.id);
 add.disabled=!canAdd;
 add.textContent=canAdd
  ?"🌿 Add "+activeItem.en+" • أضف "+activeItem.ar
  :compareItems.length===2
    ?"🌟 Two pictures ready • صورتان جاهزتان"
    :"🌿 Choose a different picture • اختر صورة مختلفة";
 clear.disabled=compareItems.length===0;
 const n=compareItems.length;
 $("compareStatus").textContent=n+" of 2 pictures chosen • "+arabicDigits(n)+" من ٢"+
   (n===2?" • Ready to talk together! • حان وقت الحديث!":n===1?" • Choose another picture • اختر صورة أخرى":"");
 const pair=$("comparePair");
 pair.replaceChildren();
 compareItems.forEach(item=>{
  const card=makeEl("div","compareThing");
  const pic=makeEl("div","emoji",item.icon);pic.setAttribute("aria-hidden","true");
  card.append(pic,makeEl("strong","english",item.en),arabic("span",item.ar));
  pair.append(card);
 });
 pair.hidden=n===0;
 $("compareGuide").hidden=n!==2;
 const care=CARE[SCENES[sceneIndex].id];
 $("compareCareEn").textContent=care.en;
 $("compareCareAr").textContent=care.ar;
}
function addCompare(){
 if(!activeItem||compareItems.length===2||compareItems.some(item=>item.id===activeItem.id))return;
 compareItems.push(activeItem);
 $("familyCard").hidden=true;
 updateCompare();
 if(compareItems.length===2)$("compareGuide").focus();
}
function clearCompare(){
 compareItems.length=0;
 $("familyCard").hidden=true;
 updateCompare();
}
function setScene(index){
 if(!Number.isInteger(index)||index<0||index>=SCENES.length)return;
 sceneIndex=index;activeItem=null;noticed.clear();compareItems.length=0;
 const scene=SCENES[index],decor=LOOK[scene.id];
 $("familyCard").hidden=true;
 $("landscape").dataset.scene=scene.id;
 $("landscape").setAttribute("aria-label",decor.label);
 $("landscapeImage").textContent=decor.icon;
 $("sceneHeading").textContent=scene.icon+" "+scene.name+" • "+scene.nameAr;
 $("sceneChoices").querySelectorAll("button").forEach((button,i)=>button.setAttribute("aria-pressed",String(i===index)));
 const grid=$("objects");grid.replaceChildren();
 scene.items.forEach(item=>{
  const btn=makeEl("button");btn.type="button";btn.dataset.object=item.id;
  btn.setAttribute("aria-pressed","false");
  btn.setAttribute("aria-label",item.en+" — "+item.ar);
  const picture=makeEl("span","emoji",item.icon);picture.setAttribute("aria-hidden","true");
  const label=makeEl("span","label",item.en);
  btn.append(picture,label,arabic("span",item.ar));
  btn.addEventListener("click",()=>{
   activeItem=item;noticed.add(item.id);
   grid.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
   const box=$("discovery");box.replaceChildren();
   box.append(makeEl("div","big",item.icon+" "+item.en),arabic("span",item.ar));
   box.append(makeEl("p","",item.fact),arabic("span",item.factAr));
   const talk=makeEl("div","question");
   talk.append(makeEl("strong","", "💬 Talk together • تحدّثوا معًا"),makeEl("p","",item.prompt),arabic("span",item.promptAr));
   box.append(talk);
   progress();updateCompare();
  });
  grid.append(btn);
 });
 resetDisplay();updateCompare();
}
function progress(){
 const n=noticed.size;
 $("discoveryCount").textContent=n+" of "+SCENES[sceneIndex].items.length+" things noticed • "+arabicDigits(n)+" من ٤ عناصر";
}
function resetDisplay(){
 $("discovery").replaceChildren(makeEl("div","big","👆 Tap something interesting!"),arabic("span","اضغط على شيء يثير اهتمامك!"));
 progress();
}
function showCard(){
 const scene=SCENES[sceneIndex];
 if(noticed.size===0){
  $("discovery").replaceChildren(makeEl("div","big","🌱 Try tapping one picture first."),arabic("span","جرّب الضغط على صورة واحدة أولًا."));
  return;
 }
 const selected=scene.items.filter(item=>noticed.has(item.id));
 $("cardScene").textContent=scene.name+" • "+scene.nameAr;
 $("cardCount").textContent=String(selected.length);
 const list=$("cardList");list.replaceChildren();
 selected.forEach(item=>{
  const li=makeEl("li");
  li.append(makeEl("strong","",item.icon+" "+item.en),arabic("span"," — "+item.ar));
  list.append(li);
 });
 const recap=$("cardCompare");
 if(compareItems.length===2){
  recap.hidden=false;
  recap.textContent="🔎 We compared "+compareItems[0].en+" and "+compareItems[1].en+
    " • قارنّا بين "+compareItems[0].ar+" و"+compareItems[1].ar+
    ". We discussed similarities and differences together • ناقشنا أوجه الشبه والاختلاف.";
 }else{
  recap.hidden=true;recap.textContent="";
 }
 const next=selected[selected.length-1];
 $("cardNext").textContent="🌱 Next time, talk together: "+next.prompt;
 $("cardNextAr").textContent=next.promptAr;
 $("familyCard").hidden=false;
 $("cardTitle").focus();
}
function setUp(){
 if(!Array.isArray(SCENES)||SCENES.length!==3||SCENES.some(x=>!Array.isArray(x.items)||x.items.length!==4)){
  $("discovery").textContent="The discovery cards could not load. Please reload with an adult.";
  return;
 }
 SCENES.forEach((scene,index)=>{
  const btn=makeEl("button");btn.type="button";btn.dataset.scene=scene.id;
  btn.append(makeEl("span","emoji",scene.icon),makeEl("span","",scene.name),arabic("span",scene.nameAr));
  btn.setAttribute("aria-pressed",String(index===0));
  btn.addEventListener("click",()=>{setScene(index);$("sceneHeading").focus()});
  $("sceneChoices").append(btn);
 });
 $("showCard").addEventListener("click",showCard);
 $("addCompare").addEventListener("click",addCompare);
 $("clearCompare").addEventListener("click",clearCompare);
 $("reset").addEventListener("click",()=>{setScene(sceneIndex);$("sceneHeading").focus()});
 $("closeCard").addEventListener("click",()=>{$("familyCard").hidden=true;$("sceneHeading").focus()});
 $("printCard").addEventListener("click",()=>{if(!$("familyCard").hidden)window.print()});
 setScene(0);
}
setUp();
})();