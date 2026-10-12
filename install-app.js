/* Platform-specific PWA guidance, no tracking or network calls. */
(()=>{"use strict";
const s=document.getElementById("platformStatus");const ua=navigator.userAgent||"";
if(navigator.standalone===true||window.matchMedia("(display-mode: standalone)").matches){
 s.textContent="✅ You're already using Little Learners from your Home Screen. • التطبيق يعمل من الشاشة الرئيسية";
}else if(/iPhone|iPad|iPod/i.test(ua)){
 s.textContent="🍎 iPhone detected: open this page in Safari and follow the four steps below.";
 document.getElementById("androidSteps").hidden=true;
}else if(/Android/i.test(ua)){
 s.textContent="🤖 Android detected: open this page in Chrome and follow the Android steps below.";
 document.getElementById("iphoneSteps").hidden=true;
}else{s.textContent="📱 Choose iPhone or Android instructions below. Both work without an app store download today."}
})();
