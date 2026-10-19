/* Render-only interactive draft; no storage, network requests, audio or accounts. */
(()=>{'use strict';
const data=window.LLA_NATIONAL_CORE_G1;
if(!data||data.stage!=='DRAFT_REVIEW_REQUIRED')return;
const $=id=>document.getElementById(id);
const state={unit:0,index:0,answered:false,mistake:false,firstTry:0};
const text=(id,value)=>{$(id).textContent=value;};
const node=(tag,className,content)=>{const el=document.createElement(tag);if(className)el.className=className;if(content!=null)el.textContent=content;return el;};
function renderTabs(){
 const tabs=$('unitTabs');tabs.replaceChildren();
 data.units.forEach((unit,i)=>{
  const b=node('button','',null);b.type='button';b.setAttribute('aria-pressed',String(i===state.unit));
  if(i===state.unit)b.classList.add('active');
  const em=node('span','icon',unit.icon);em.setAttribute('aria-hidden','true');
  const name=node('span','',unit.en);const ar=node('small','',unit.ar);ar.lang='ar';ar.dir='rtl';
  name.append(ar);b.append(em,name);b.addEventListener('click',()=>{state.unit=i;reset();});tabs.append(b);
 });
}
function renderUnit(){
 const unit=data.units[state.unit];text('unitTitle',unit.icon+' '+unit.en);text('unitAr',unit.ar);text('goalEn',unit.objectiveEn);text('goalAr',unit.objectiveAr);text('reviewNote',unit.reviewNote);
 const container=$('learnCards');container.replaceChildren();
 unit.learn.forEach(x=>{const card=node('div','mini',null);const emoji=node('div','emoji',x.icon);emoji.setAttribute('aria-hidden','true');card.append(emoji,node('b','',x.en));const ar=node('span','ar',x.ar);ar.lang='ar';card.append(ar);container.append(card);});
 const sources=$('sources');sources.replaceChildren();data.sources.forEach(x=>{const li=node('li','',null);const a=node('a','',x.name);a.href=x.url;a.rel='noopener noreferrer';a.target='_blank';li.append(a);sources.append(li)});
 renderQuestion();
}
function renderQuestion(){
 const unit=data.units[state.unit],q=unit.questions[state.index];state.answered=false;state.mistake=false;
 $('quiz').hidden=false;$('finish').hidden=true;$('next').disabled=true;
 text('counter',(state.index+1)+' / '+unit.questions.length);text('promptEmoji',q.emoji);text('questionEn',q.en);text('questionAr',q.ar);text('questionId','ID: '+q.id+' • '+data.stage);text('feedback','Choose an answer • اختر إجابة');
 $('progress').setAttribute('aria-valuemax',String(unit.questions.length));$('progress').setAttribute('aria-valuenow',String(state.index));$('bar').style.width=(state.index/unit.questions.length*100)+'%';
 const choices=$('choices');choices.replaceChildren();q.choices.forEach((choice,i)=>{
  const btn=node('button','choice',null);btn.type='button';btn.append(node('b','',choice.en));const ar=node('span','ar',choice.ar);ar.lang='ar';btn.append(ar);btn.addEventListener('click',()=>pick(btn,i));choices.append(btn);
 });
 $('next').textContent=state.index+1===unit.questions.length?'Finish journey • إنهاء الوحدة':'Next question ➜ السؤال التالي';
}
function pick(button,i){
 if(state.answered||button.disabled)return;
 const q=data.units[state.unit].questions[state.index];
 if(i===q.answer){state.answered=true;if(!state.mistake)state.firstTry++;
  button.classList.add('correct');text('feedback','✅ '+q.tipEn+' • '+q.tipAr);
  Array.from($('choices').children).forEach(x=>x.disabled=true);$('next').disabled=false;
 }else{state.mistake=true;button.disabled=true;button.classList.add('incorrect');text('feedback','Try another answer. You are learning! • حاول مرة أخرى، أنت تتعلّم!')}
}
function finish(){const count=data.units[state.unit].questions.length;$('quiz').hidden=true;$('finish').hidden=false;text('summary','You answered '+count+' questions; '+state.firstTry+' correct on the first try. • عدد الأسئلة: '+count+'، الإجابات الصحيحة من أول محاولة: '+state.firstTry);$('bar').style.width='100%';$('progress').setAttribute('aria-valuenow',String(count));}
function reset(){state.index=0;state.firstTry=0;state.answered=false;state.mistake=false;renderTabs();renderUnit()}
$('hint').addEventListener('click',()=>{const q=data.units[state.unit].questions[state.index];text('feedback','💡 '+q.tipEn+' • '+q.tipAr)});
$('next').addEventListener('click',()=>{if(!state.answered)return;state.index++;if(state.index>=data.units[state.unit].questions.length)finish();else renderQuestion();});
$('restart').addEventListener('click',reset);
reset();
})();