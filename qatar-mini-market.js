(()=>{"use strict";
const $=s=>document.querySelector(s);
const ITEMS=[["🍎","apple","تفاحة"],["📘","book","كتاب"],["🥛","milk","حليب"],["🍌","banana","موز"],["✏️","pencil","قلم"],["🌴","palm souvenir","تذكار نخلة"],["⚽","ball","كرة"],["🥖","bread","خبز"],["🧸","teddy","دب"],["🎨","crayons","ألوان"]];
const Q=[[2,3,"add"],[4,5,"add"],[8,3,"subtract"],[6,2,"add"],[10,4,"subtract"],[7,5,"add"],[13,6,"subtract"],[9,4,"add"],[15,8,"subtract"],[11,7,"add"]];
const KEY="lla-market-v1";let round=0,correct=0,answered=false,errors=0;
function question(){const [a,b,kind]=Q[round];return {a,b,kind,answer:kind==="add"?a+b:a-b};}
function show(){
 const q=question();answered=false;errors=0;
 $("#marketWin").hidden=true;$("#nextMarket").hidden=true;
 $("#marketProgress").textContent="🧺 "+(round+1)+" / "+Q.length;
 $("#marketScore").textContent="⭐ "+correct+" correct";
 const products=$("#marketPictures");products.replaceChildren();
 for(let i=0;i<(q.kind==="add"?2:1);i++){
  const item=ITEMS[(round+i)%ITEMS.length],box=document.createElement("div");box.className="item";
  const picture=document.createElement("div");picture.className="emoji";picture.textContent=item[0];
  const label=document.createElement("div");label.textContent=item[1]+" • "+item[2];
  const price=document.createElement("div");price.className="price";price.textContent=(i? q.b:q.a)+" QR";
  box.append(picture,label,price);products.append(box);
 }
 const text=$("#marketQuestion");text.replaceChildren();
 const main=document.createElement("div");main.textContent=q.kind==="add"?"What is the total? "+q.a+" + "+q.b+" = ?":"You have "+q.a+" QR and spend "+q.b+" QR. How much is left?";
 const ar=document.createElement("span");ar.className="ar";ar.lang="ar";ar.textContent=q.kind==="add"?"ما المجموع؟ "+q.a+" + "+q.b+" = ؟":"معك "+q.a+" ريالات، أنفقت "+q.b+" ريالات. كم تبقى؟";
 text.append(main,ar);
 const choices=[q.answer,q.answer+1,Math.max(0,q.answer-1)];const unique=[...new Set(choices)];
 if(unique.length<3)unique.push(q.answer+2);
 const rotated=[...unique.slice(round%3),...unique.slice(0,round%3)];
 $("#marketAnswers").replaceChildren();
 rotated.forEach(value=>{
  const button=document.createElement("button");button.type="button";button.dataset.value=String(value);button.textContent=value+" QR";
  button.addEventListener("click",()=>choose(button,value));$("#marketAnswers").append(button);
 });
 const feedback=$("#marketFeedback");feedback.className="feedback";feedback.textContent="Choose the correct answer • اختر الإجابة الصحيحة";
}
function choose(button,value){
 if(answered||button.disabled)return;const q=question(),feedback=$("#marketFeedback");
 if(value!==q.answer){errors++;button.className="wrong";button.disabled=true;feedback.textContent="🌱 Try again. Count carefully! • حاول مجددًا!";return}
 answered=true;if(errors===0)correct++;
 [...$("#marketAnswers").children].forEach(b=>{b.disabled=true;if(b===button)b.className="right"});
 feedback.className="feedback good";feedback.textContent="✅ Great shopping! "+q.a+(q.kind==="add"?" + ":" − ")+q.b+" = "+q.answer+" QR • أحسنت!";
 $("#marketScore").textContent="⭐ "+correct+" correct";$("#nextMarket").hidden=false;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify({completed:true}))}catch{}}
function next(){
 if(!answered)return;
 if(round===Q.length-1){
  save();$("#nextMarket").hidden=true;$("#marketWin").hidden=false;
  $("#marketFinishText").textContent="You solved all 10 shops, with "+correct+" correct on the first try! • أنهيت جميع الأنشطة!";
  $("#marketFeedback").textContent="🏆 Market adventure completed! • انتهت مغامرة السوق!";
 }else{round++;show()}
}
$("#nextMarket").addEventListener("click",next);
$("#restartMarket").addEventListener("click",()=>{round=0;correct=0;show()});
show();
})();