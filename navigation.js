/* Accessible bilingual menu: no account or network calls. */
(()=>{
 "use strict";
 const toggle=document.getElementById("menuToggle");
 const menu=document.getElementById("mainMenu");
 const closeButton=document.getElementById("menuClose");
 if(!toggle||!menu||!closeButton)return;
 function setOpen(open,restoreFocus=false){
   menu.hidden=!open;
   toggle.setAttribute("aria-expanded",String(open));
   toggle.setAttribute("aria-label",open?"Close menu • أغلق القائمة":"Open menu • افتح القائمة");
   if(restoreFocus)toggle.focus();
 }
 toggle.addEventListener("click",()=>setOpen(menu.hidden));
 closeButton.addEventListener("click",()=>setOpen(false,true));
 document.addEventListener("keydown",event=>{
   if(event.key==="Escape"&&!menu.hidden){event.preventDefault();setOpen(false,true);}
 });
 document.addEventListener("pointerdown",event=>{
   if(!menu.hidden&&!menu.contains(event.target)&&!toggle.contains(event.target))setOpen(false);
 });
 menu.addEventListener("click",event=>{
   const link=event.target.closest("a");
   if(!link)return;
   const expand=link.dataset.expand;
   if(expand){
     const section=document.getElementById(expand);
     if(section&&section.tagName==="DETAILS")section.open=true;
   }
   setOpen(false);
 });
})();