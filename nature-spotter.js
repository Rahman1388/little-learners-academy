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
function makeEl(tag,className,value){
 const e=document.createElement(tag);
 if(className)e.className=className;
 if(value!==undefined)e.textContent=value;
 return e;
}
function arabic(tag,value){
 const e=makeEl(tag,"arabic",value);e.lang="ar";e.dir="rtl";return e;
}
function setScene(index){
 if(!Number.isInteger(index)||index<0||index>=SCENES.length)return;
 sceneIndex=index;activeItem=null;noticed.clear();
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
   progress();
  });
  grid.append(btn);
 });
 resetDisplay();
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
 $("reset").addEventListener("click",()=>{setScene(sceneIndex);$("sceneHeading").focus()});
 $("closeCard").addEventListener("click",()=>{$("familyCard").hidden=true;$("sceneHeading").focus()});
 $("printCard").addEventListener("click",()=>{if(!$("familyCard").hidden)window.print()});
 setScene(0);
}
setUp();
})();