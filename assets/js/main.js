
document.getElementById('year').textContent=new Date().getFullYear();

const track=document.querySelector('.carousel-track');
const items=document.querySelectorAll('.project-box');
const left=document.querySelector('.carousel-arrow.left');
const right=document.querySelector('.carousel-arrow.right');

let index=0,startX=0,prevTranslate=0,currentTranslate=0,dragging=false;

function update(){
  const w=items[0].offsetWidth+20;
  currentTranslate=-index*w;
  track.style.transform=`translateX(${currentTranslate}px)`;
  left.style.display=index===0?'none':'block';
  right.style.display=index>=items.length-1?'none':'block';
}

left.onclick=()=>{if(index>0){index--;update()}};
right.onclick=()=>{if(index<items.length-1){index++;update()}};

track.addEventListener('mousedown',e=>{
  dragging=true;startX=e.pageX;prevTranslate=currentTranslate;
});
window.addEventListener('mouseup',()=>{
  if(!dragging)return;
  dragging=false;
  const moved=currentTranslate-prevTranslate;
  if(moved<-100&&index<items.length-1)index++;
  if(moved>100&&index>0)index--;
  update();
});
window.addEventListener('mousemove',e=>{
  if(!dragging)return;
  currentTranslate=prevTranslate+(e.pageX-startX);
  track.style.transform=`translateX(${currentTranslate}px)`;
});

update();
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
