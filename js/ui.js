const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

const ppFill  = document.getElementById('ppFill');
const ppLabel = document.getElementById('ppLabel');
const allSections = document.querySelectorAll('.sb-page');
const pageNums = Array.from(allSections, (_, i) => String(i + 1).padStart(2, '0'));

function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (ppFill)  ppFill.style.height  = Math.min(pct, 100) + '%';
  let currentIdx = 0;
  allSections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.5) currentIdx = i;
  });
  if (ppLabel) ppLabel.textContent = pageNums[currentIdx] || '01';
}
window.addEventListener('scroll', updateProgress, { passive:true });
updateProgress();

const toastEl = document.getElementById('toast');
function showToast(msg, duration = 2200) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), duration);
}
window.showToast = showToast;

document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('click', () => {
    const href = card.dataset.href || '';
    if (href.startsWith('mailto:')) showToast('📬 Opening your mail app...');
    else if (href.includes('github'))   showToast('🐙 Opening GitHub...');
    else if (href.includes('linkedin')) showToast('💼 Opening LinkedIn...');
  });
});

document.querySelectorAll('.proj-card-wip').forEach(card => {
  card.addEventListener('click', e => {
    e.stopPropagation();
    showToast('🛠️  Something is being cooked here...');
  });
});
