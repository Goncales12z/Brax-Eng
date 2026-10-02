const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Menu mobile ---------- */
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  mobileMenu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function openMenu() {
  mobileMenu.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
}

/* ---------- Progress bar ---------- */
const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  progressBar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
}
window.addEventListener('scroll', () => requestAnimationFrame(updateProgress), { passive: true });
updateProgress();

/* ---------- To top ---------- */
const toTop = document.getElementById('toTop');
function updateToTop() {
  toTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.6);
}
window.addEventListener('scroll', () => requestAnimationFrame(updateToTop), { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
updateToTop();

/* ---------- Scrollspy (destaca o link ativo no menu) ---------- */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navSections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (navLinks.length && navSections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  navSections.forEach(s => spy.observe(s));
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
}
