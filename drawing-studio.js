(()=>{
"use strict";
const $=s=>document.querySelector(s);
const canvas=$("#drawingCanvas"),ctx=canvas.getContext("2d",{willReadFrequently:true});
if(!ctx){$("#drawingStatus").textContent="Drawing is unavailable on this device.";return;}
const W=canvas.width,H=canvas.height;
const COLORS=[["#dc3939","Red"],["#ff9b26","Orange"],["#ffe34a","Yellow"],["#39aa59","Green"],["#228bd2","Blue"],["#955bc9","Purple"],["#ee81af","Pink"],["#8c613d","Brown"],["#262b38","Black"],["#ffffff","White"]];
const MAX_HISTORY=15;
const prompts={blank:"✨ Draw anything you imagine! • ارسم ما تتخيله!",house:"🏠 Draw a square house, a triangle roof and windows. • لوّن المنزل!",flower:"🌷 Colour the petals and add insects. • لوّن الزهرة!",sun:"☀️ Colour the sun, sky and clouds. • لوّن الشمس والغيوم!",tree:"🌳 Draw nature: leaves, a tree trunk and grass. • لوّن الشجرة!",fish:"🐟 Colour the fish and draw bubbles. • لوّن السمكة!",shapes:"📐 Colour the shapes and name them. • لوّن الأشكال الهندسية!"};
let color=COLORS[0][0],tool="pencil",width=8,activePointer=null,last=null,modified=false;
let undo=[],redo=[];
function status(s){$("#drawingStatus").textContent=s}
function snapshot(){return ctx.getImageData(0,0,W,H)}
function restore(img){ctx.putImageData(img,0,0)}
function checkpoint(){undo.push(snapshot());if(undo.length>MAX_HISTORY)undo.shift();redo=[];modified=true}
function line(x1,y1,x2,y2){
 ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle=tool==="eraser"?"#ffffff":color;
 ctx.lineWidth=tool==="eraser"?Math.max(14,width*2):width;
 ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
}
function outline(fn){
 ctx.strokeStyle="#2e4857";ctx.lineWidth=5;ctx.lineCap="round";ctx.lineJoin="round";
 ctx.beginPath();fn(ctx);ctx.stroke();
}
function circle(x,y,r){outline(c=>c.arc(x,y,r,0,Math.PI*2))}
function ellipse(x,y,rx,ry){outline(c=>c.ellipse(x,y,rx,ry,0,0,Math.PI*2))}
function polygon(points){outline(c=>{c.moveTo(...points[0]);points.slice(1).forEach(p=>c.lineTo(...p));c.closePath()})}
function drawTemplate(name){
 ctx.fillStyle="#ffffff";ctx.fillRect(0,0,W,H);
 if(name==="house"){
   polygon([[175,225],[365,90],[555,225]]);
   outline(c=>c.rect(220,225,290,190));
   outline(c=>c.rect(256,265,72,72));outline(c=>c.rect(405,265,72,72));
   outline(c=>c.rect(335,324,65,91));
   circle(386,372,4);
 }else if(name==="flower"){
   outline(c=>{c.moveTo(362,270);c.lineTo(362,430)});
   polygon([[362,375],[292,337],[317,394]]);
   polygon([[362,360],[435,326],[414,390]]);
   for(let i=0;i<6;i++){const a=i*Math.PI/3;ellipse(362+75*Math.cos(a),208+75*Math.sin(a),48,40)}
   circle(362,208,45);
 }else if(name==="sun"){
   circle(176,155,72);
   for(let i=0;i<12;i++){const a=i*Math.PI/6;outline(c=>{c.moveTo(176+88*Math.cos(a),155+88*Math.sin(a));c.lineTo(176+120*Math.cos(a),155+120*Math.sin(a))})}
   const cloud=(x,y)=>{
    outline(c=>{c.moveTo(x-78,y+28);c.bezierCurveTo(x-104,y-11,x-58,y-34,x-27,y-24);c.bezierCurveTo(x-10,y-72,x+43,y-65,x+58,y-33);c.bezierCurveTo(x+110,y-40,x+112,y+32,x+70,y+32);c.closePath()});
   };cloud(485,205);cloud(435,365);
 }else if(name==="tree"){
   polygon([[325,255],[399,255],[414,435],[306,435]]);
   circle(360,180,85);circle(290,225,67);circle(430,225,67);
   outline(c=>{c.moveTo(90,438);c.lineTo(635,438)});
 }else if(name==="fish"){
   ellipse(344,245,177,111);
   polygon([[505,245],[651,135],[651,358]]);
   circle(264,208,11);
   outline(c=>{c.moveTo(210,254);c.quadraticCurveTo(249,278,289,264)});
   polygon([[343,143],[380,92],[424,153]]);
   for(const [x,y,r] of [[102,118,23],[133,77,12],[89,52,17]])circle(x,y,r);
 }else if(name==="shapes"){
   circle(160,158,78);
   polygon([[372,67],[272,251],[472,251]]);
   outline(c=>c.rect(515,85,143,143));
   outline(c=>c.rect(140,321,182,98));
   ellipse(505,372,104,54);
 }
}
function setTool(next){
 tool=next;for(const b of document.querySelectorAll("[data-tool]"))b.setAttribute("aria-pressed",String(b.dataset.tool===tool));
 status(tool==="fill"?"🪣 Tap a white region to colour it. • اضغط داخل المساحة للتلوين.":tool==="eraser"?"🧼 Erase marks with your finger. • امسح بإصبعك.":"✏️ Draw with your finger! • ارسم بإصبعك!");
}
function pixelAt(e){
 const r=canvas.getBoundingClientRect();
 return{x:Math.min(W-1,Math.max(0,Math.floor((e.clientX-r.left)*W/r.width))),y:Math.min(H-1,Math.max(0,Math.floor((e.clientY-r.top)*H/r.height)))};
}
function rgba(hex){return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16),255]}
function fill(x,y){
 const data=ctx.getImageData(0,0,W,H),d=data.data, target=(y*W+x)*4, wanted=rgba(color);
 const from=[d[target],d[target+1],d[target+2],d[target+3]];
 // Colour only contiguous pixels matching the target; do not cross the outlines.
 if(from.every((n,i)=>n===wanted[i]))return false;
 const check=i=>Math.abs(d[i]-from[0])<=5&&Math.abs(d[i+1]-from[1])<=5&&Math.abs(d[i+2]-from[2])<=5&&d[i+3]===from[3];
 const seen=new Uint8Array(W*H),stack=[y*W+x];
 let filled=0;
 while(stack.length){
  const index=stack.pop();
  if(seen[index])continue;seen[index]=1;
  const p=index*4;if(!check(p))continue;
  d[p]=wanted[0];d[p+1]=wanted[1];d[p+2]=wanted[2];d[p+3]=255;filled++;
  const px=index%W;
  if(px>0)stack.push(index-1);
  if(px<W-1)stack.push(index+1);
  if(index>=W)stack.push(index-W);
  if(index<W*(H-1))stack.push(index+W);
 }
 if(filled){ctx.putImageData(data,0,0);return true}
 return false;
}
function pointerStart(e){
 if(activePointer!==null||e.button!==0&&e.pointerType==="mouse")return;
 e.preventDefault();
 const p=pixelAt(e);
 if(tool==="fill"){
  const before=snapshot();
  if(fill(p.x,p.y)){undo.push(before);if(undo.length>MAX_HISTORY)undo.shift();redo=[];modified=true;status("🎨 Nice colouring! • تلوين رائع!")}
  return;
 }
 checkpoint();
 activePointer=e.pointerId;last=p;canvas.setPointerCapture(e.pointerId);
 line(p.x,p.y,p.x,p.y);
}
function pointerMove(e){
 if(e.pointerId!==activePointer||!last)return;
 e.preventDefault();const p=pixelAt(e);line(last.x,last.y,p.x,p.y);last=p;
}
function pointerEnd(e){if(e.pointerId!==activePointer)return;activePointer=null;last=null}
function resetPaper(name){drawTemplate(name);undo=[];redo=[];modified=false;$("#prompt").textContent=prompts[name]||prompts.blank;status("🖍️ Ready to draw and colour! • جاهز للرسم والتلوين!")}
COLORS.forEach(([hex,name])=>{
 const b=document.createElement("button");b.type="button";b.className="swatch";b.style.backgroundColor=hex;
 b.setAttribute("aria-label",name+" colour pencil");b.setAttribute("title",name);
 b.dataset.colour=hex;b.setAttribute("aria-pressed",String(hex===color));
 b.addEventListener("click",()=>{color=hex;document.querySelectorAll(".swatch").forEach(n=>n.setAttribute("aria-pressed",String(n===b)));status("🖍️ "+name+" pencil selected. • تم اختيار اللون!")});
 $("#palette").append(b);
});
document.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>setTool(b.dataset.tool)));
$("#brushSize").addEventListener("input",e=>{width=Number(e.target.value);$("#sizeValue").textContent=String(width)});
canvas.addEventListener("pointerdown",pointerStart);
canvas.addEventListener("pointermove",pointerMove);
canvas.addEventListener("pointerup",pointerEnd);
canvas.addEventListener("pointercancel",pointerEnd);
canvas.addEventListener("lostpointercapture",pointerEnd);
$("#template").addEventListener("change",()=>{
 if(modified&&!window.confirm("Replace this drawing? Save it first if you want to keep it. • هل تريد تغيير اللوحة؟")){$("#template").value=canvas.dataset.template||"blank";return}
 canvas.dataset.template=$("#template").value;resetPaper($("#template").value);
});
$("#startOver").addEventListener("click",()=>{
 if(modified&&!window.confirm("Clear your drawing and start over? • هل تريد البدء من جديد؟"))return;
 resetPaper($("#template").value);
});
$("#undo").addEventListener("click",()=>{if(!undo.length){status("Nothing to undo yet. • لا يوجد ما يمكن التراجع عنه.");return}
 redo.push(snapshot());restore(undo.pop());modified=true;status("↶ Last change undone. • تم التراجع.")});
$("#redo").addEventListener("click",()=>{if(!redo.length){status("Nothing to redo yet. • لا يوجد ما يمكن إعادته.");return}
 undo.push(snapshot());restore(redo.pop());modified=true;status("↷ Change restored. • تمت الإعادة.")});
$("#savePicture").addEventListener("click",()=>{
 try{
  const a=document.createElement("a");a.download="little-learners-art-"+$("#template").value+".png";
  a.href=canvas.toDataURL("image/png");document.body.append(a);a.click();a.remove();
  status("📥 Picture ready to save. Check Downloads or your browser's share menu. • تم تجهيز الصورة للحفظ.");
 }catch{status("Saving was blocked by this browser. Try your browser's screenshot or share option.")}
});
resetPaper("blank");
})();