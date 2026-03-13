const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
const hoverEls = document.querySelectorAll(
  'a, button, .proj-card, .photo-card, .sticky, .biz-card, .skill-group'
);
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
});