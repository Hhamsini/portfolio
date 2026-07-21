
const cursor = document.querySelector('.cursor-orbit');
window.addEventListener('mousemove', e => {
  if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}
});

document.querySelectorAll('.tarot-card').forEach(card=>{
  const flip=()=>card.classList.toggle('flipped');
  card.addEventListener('click',flip);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}});
});

const seenSkills = new Set();
const skillDescription = document.getElementById('skillDescription');
const unlockCard = document.getElementById('unlockCard');
document.querySelectorAll('.skill-star').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.skill-star').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    skillDescription.innerHTML = '<strong>'+btn.dataset.skill+'</strong><br>'+btn.dataset.copy;
    seenSkills.add(btn.dataset.skill);
    unlockCard.textContent = seenSkills.size+' / 12 stars discovered';
    if(seenSkills.size===12) unlockCard.textContent='Constellation complete ✦ All 12 strengths unlocked';
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section')];
const progress=document.getElementById('questProgress');
const progressText=document.getElementById('questText');
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const pct=max>0?Math.round((window.scrollY/max)*100):0;
  progress.style.width=pct+'%';
  progressText.textContent=pct+'% explored';
});

const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-header nav');
menuButton?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
