(()=>{"use strict";
const $=s=>document.querySelector(s);
const prefix="lla-";
const list=()=>{
 const names=[];
 try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&key.startsWith(prefix))names.push(key)}}catch{return null}
 return names.sort();
};
function refresh(){
 const names=list();
 const status=$("#storageSummary");
 if(!names){status.textContent="⚠️ Browser storage is unavailable. Your device may be in private browsing mode.";$("#exportData").disabled=true;return}
 status.textContent="📱 "+names.length+" Little Learners Academy saved data entries on this device. • "+names.length+" عناصر محفوظة على هذا الجهاز.";
 $("#exportData").disabled=names.length===0;
}
$("#exportData").addEventListener("click",()=>{
 const names=list();
 if(!names||!names.length){$("#message").textContent="No app data available to download.";return}
 const data={app:"Little Learners Academy",version:1,exportedAt:new Date().toISOString(),note:"Private on-device learning progress backup; not an encrypted file",items:{}};
 for(const key of names){try{data.items[key]=localStorage.getItem(key)}catch{}}
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);
 const link=document.createElement("a");
 link.href=url;link.download="little-learners-parent-backup.json";
 document.body.append(link);link.click();link.remove();
 URL.revokeObjectURL(url);
 $("#message").textContent="Backup download requested. Check your device's Downloads and keep this file private. • تم طلب تنزيل النسخة الاحتياطية.";
});
const confirm=$("#confirmErase"),erase=$("#eraseData");
confirm.addEventListener("input",()=>{erase.disabled=confirm.value.trim()!=="DELETE"});
erase.addEventListener("click",()=>{
 if(confirm.value.trim()!=="DELETE")return;
 const names=list();
 if(!names){$("#message").textContent="Unable to access browser storage. No data was erased.";return}
 let removed=0;
 try{for(const key of names){localStorage.removeItem(key);removed++}}catch{
  $("#message").textContent="⚠️ Some entries could not be cleared. Check browser privacy settings.";refresh();return
 }
 confirm.value="";erase.disabled=true;
 $("#message").textContent="✅ Deleted "+removed+" app data entries on this device. Other sites' data were not touched. • تم حذف بيانات التطبيق.";
 refresh();
});
refresh();
})();