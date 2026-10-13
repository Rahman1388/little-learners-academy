(()=>{"use strict";
function stored(key){try{const x=JSON.parse(localStorage.getItem(key)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const entries=[["math","lla-grade4-math-v1","g4m-",24],["reading","lla-grade4-reading-v1","g4e-",18],["science","lla-grade4-science-v1","g4s-",18]];
let sum=0;
for(const [name,key,prefix,total] of entries){
 const progress=stored(key);
 let n=0;for(let i=1;i<=total;i++){const id=prefix+String(i).padStart(2,"0");if(progress[id]===true)n++}
 sum+=n;document.querySelector("#"+name+"Count").textContent=n+" / "+total+" questions explored";
 document.querySelector("#"+name+"Fill").style.width=String(n/total*100)+"%";
}
document.querySelector("#grade4Total").textContent="🌟 "+sum+" / 60 questions explored";
document.querySelector("#totalFill").style.width=String(sum/60*100)+"%";
document.querySelector("#grade4Encourage").textContent=sum===60?"🏆 All 60 pilot questions completed! Keep exploring.":sum?"🌱 "+sum+" questions explored. Keep practising at your own pace!":"🌱 Begin with one question in any subject. Every little step counts!";
})();