const header = document.querySelector('header');
addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 40);
}, { passive: true });

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

(function () {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.body.classList.add('cam-cursor');
  const rec = document.createElement('div');
  rec.className = 'cursor-rec';
  document.body.appendChild(rec);
  let shown = false;

  addEventListener('mousemove', e => {
    if (!shown) { shown = true; rec.classList.add('show'); }
    rec.style.left = e.clientX + 'px';
    rec.style.top = e.clientY + 'px';
  }, { passive: true });

  const sel = 'a,button,input,textarea,[role=button],.reel-frame,.film-item,.cta';
  addEventListener('mouseover', e => {
    if (e.target.closest && e.target.closest(sel)) rec.classList.add('hot');
  });
  addEventListener('mouseout', e => {
    const to = e.relatedTarget;
    if (e.target.closest && e.target.closest(sel) && !(to && to.closest && to.closest(sel))) rec.classList.remove('hot');
  });

  document.addEventListener('mouseleave', () => rec.classList.remove('show'));
  document.addEventListener('mouseenter', () => { if (shown) rec.classList.add('show'); });
})();
