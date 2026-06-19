// ═══════════════════════════════════════════
// PAGE TRANSITIONS — scan line wipe
// ═══════════════════════════════════════════
(function(){
  // build overlay once
  const overlay=document.createElement('div');
  overlay.id='pt-overlay';
  overlay.innerHTML='<div class="pt-line"></div><div class="pt-label"></div>';
  document.body.appendChild(overlay);
  const line=overlay.querySelector('.pt-line');
  const label=overlay.querySelector('.pt-label');

  function pageLabel(href){
    try{
      const url=new URL(href,location.href);
      const file=url.pathname.split('/').pop()||'index.html';
      const map={
        'index.html':'Accueil','':'Accueil',
        'competences.html':'Compétences',
        'parcours.html':'Parcours',
        'projets.html':'Projets',
        'contact.html':'Contact'
      };
      return map[file]||'Chargement';
    }catch(_){return 'Chargement';}
  }

  // INTRO (page just loaded) — sweep open
  window.addEventListener('DOMContentLoaded',()=>{
    overlay.classList.add('pt-active');
    overlay.style.opacity='1';
    line.style.transition='none';
    line.style.width='100%';
    label.style.transition='none';
    label.style.opacity='1';
    label.textContent=pageLabel(location.href);
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        overlay.style.transition='opacity .5s ease .15s';
        line.style.transition='width .45s cubic-bezier(.6,0,.2,1)';
        label.style.transition='opacity .3s ease';
        overlay.style.opacity='0';
        line.style.width='0%';
        label.style.opacity='0';
        setTimeout(()=>{overlay.classList.remove('pt-active');},650);
      });
    });
  });

  // OUTRO (navigating away) — sweep close then go
  function navigateTo(href){
    overlay.classList.add('pt-active');
    overlay.style.transition='opacity .35s ease';
    overlay.style.opacity='1';
    line.style.transition='none';
    line.style.width='0%';
    label.textContent=pageLabel(href);
    label.style.transition='none';
    label.style.opacity='0';
    requestAnimationFrame(()=>{
      line.style.transition='width .4s cubic-bezier(.6,0,.2,1)';
      line.style.width='100%';
      label.style.transition='opacity .3s ease .1s';
      label.style.opacity='1';
    });
    setTimeout(()=>{ window.location.href=href; },420);
  }

  document.addEventListener('click',function(e){
    const a=e.target.closest('a');
    if(!a)return;
    const href=a.getAttribute('href');
    if(!href)return;
    if(href.startsWith('#'))return; // in-page anchor, no transition
    if(a.target==='_blank')return;
    if(href.startsWith('mailto:')||href.startsWith('tel:'))return;
    if(a.hasAttribute('download'))return;
    // only intercept same-site .html links
    if(!/^[a-zA-Z0-9_\-]+\.html(#.*)?$/.test(href) && href!=='./' && href!=='/'){return;}
    e.preventDefault();
    navigateTo(href);
  });
})();

// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('visible'); });
  },{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // skill bars fill on view
  const skillObs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in-view'); });
  },{threshold:.3});
  document.querySelectorAll('.skill-chip').forEach(el=>skillObs.observe(el));
});

// ═══════════════════════════════════════════
// MOBILE NAV TOGGLE
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  const burger=document.querySelector('.nav-burger');
  const links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',()=>{
      const open=links.style.display==='flex';
      links.style.display=open?'none':'flex';
      links.style.cssText+=open?'':'position:fixed;top:64px;left:0;right:0;background:rgba(6,6,6,.97);flex-direction:column;padding:1rem 0;border-bottom:1px solid var(--line);';
    });
  }
});
