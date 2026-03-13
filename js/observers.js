const revealTargets = document.querySelectorAll(
  '.sb-heading-wrap, .card-scene, .photo-card-scene, ' +
  '.bio-block, .stickies, .about-stats, .learning-card, ' +
  '.contact-message, .contact-scene, ' +
  '.warroom-intro, .corkboard, .pinned-paper'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 5) * 0.07}s`;
});
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealTargets.forEach(el => revealObs.observe(el));

function countUp(el, target, dur = 1100) {
  let n = 0;
  const steps = dur / 16;
  const inc   = target / steps;
  const t = setInterval(() => {
    n += inc;
    if (n >= target) {
      el.textContent = target + (target === 99 || el.classList.contains('astat-plus') ? '+' : '');
      clearInterval(t);
    } else {
      el.textContent = Math.floor(n);
    }
  }, 16);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.astat-num').forEach(el =>
        countUp(el, parseInt(el.dataset.count))
      );
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-stats').forEach(el => statsObs.observe(el));

const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach((b, i) =>
        setTimeout(() => { b.style.width = b.dataset.fill + '%'; }, i * 80 + 200)
      );
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.card-scene').forEach(el => barObs.observe(el));

const learnObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.l-bar-fill').forEach((b, i) =>
        setTimeout(() => { b.style.width = b.dataset.fill + '%'; }, i * 100 + 200)
      );
      learnObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.learning-card').forEach(el => learnObs.observe(el));

document.querySelectorAll('.sg-item').forEach(item => {
  const level = item.dataset.level || 50;
  const name  = item.textContent.trim();
  item.innerHTML = `
    <span class="sg-name">${name}</span>
    <div class="sg-bar-wrap"><div class="sg-bar" data-level="${level}"></div></div>
  `;
});
const s = document.createElement('style');
s.textContent = `.sg-item { display:flex; flex-direction:column; gap:4px; } .sg-name { font-family:var(--font-mono); font-size:.72rem; color:var(--ink); }`;
document.head.appendChild(s);

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sg-bar').forEach((b, i) =>
        setTimeout(() => { b.style.width = b.dataset.level + '%'; }, i * 75 + 150)
      );
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-group').forEach(el => skillObs.observe(el));

const sections = document.querySelectorAll('.sb-page');
const secObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
      );
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));
