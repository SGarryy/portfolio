const phrases = [
  "I turn messy data into clear stories.",
  "I build things that make sense of numbers.",
  "Data Scientist.",
  "Always learning. Always building.",
  "Python · Pandas · Matplotlib · ML"
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const cur = phrases[pIdx];
  typedEl.textContent = deleting
    ? cur.substring(0, cIdx - 1)
    : cur.substring(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;
  let speed = deleting ? 38 : 68;
  if (!deleting && cIdx === cur.length) { speed = 2000; deleting = true; }
  else if (deleting && cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; speed = 380; }
  setTimeout(typeLoop, speed);
}
setTimeout(typeLoop, 950);
