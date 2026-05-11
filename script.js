const slides = document.querySelectorAll('.slide');
let current = 0;
let timer;

function show(i){
  slides.forEach(s => s.classList.remove('active'));
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
}
function next(){ show(current + 1); }
function prev(){ show(current - 1); }

function startAuto(){ timer = setInterval(next, 5000); }
function stopAuto(){ clearInterval(timer); }

document.querySelector('.hero-arrow.next').addEventListener('click', () => { next(); stopAuto(); startAuto(); });
document.querySelector('.hero-arrow.prev').addEventListener('click', () => { prev(); stopAuto(); startAuto(); });

const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', stopAuto);
hero.addEventListener('mouseleave', startAuto);
startAuto();


const ham = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');
ham?.addEventListener('click', () => nav.classList.toggle('show'));


const counters = document.querySelectorAll('.stat h3[data-target]');
const animate = (el) => {
  const target = +el.dataset.target;
  let count = 0;
  const step = Math.max(1, Math.floor(target / 80));
  const tick = () => {
    count += step;
    if (count >= target){ el.textContent = target.toLocaleString() + (target >= 200 ? '+' : ''); return; }
    el.textContent = count.toLocaleString();
    requestAnimationFrame(tick);
  };
  tick();
};
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){ animate(e.target); obs.unobserve(e.target); }
  });
}, { threshold: 0.4 });
counters.forEach(c => obs.observe(c));
