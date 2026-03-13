const RETURN_CARD_KEY = 'portfolio:returnCard';
const MODE_KEY = 'portfolio:mode';
const FLIP_DURATION = 650;

const githubUrls = {
  'gaming':    'https://github.com/SGarryy/gaming-engagement-analysis',
  'churn':     'https://github.com/SGarryy/Customer-Churn-Prediction',
  'ecommerce': 'https://github.com/SGarryy/E-commerce-Sales-Analytics',
  'netflix':   'https://github.com/SGarryy/Netflix-Data-Analysis'
};

function setupTilt(cardEl) {
  const scene = cardEl.parentElement;
  scene.addEventListener('mousemove', e => {
    if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-animating')) return;
    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotY = ((e.clientX - cx) / (rect.width / 2)) * 14;
    const rotX = -((e.clientY - cy) / (rect.height / 2)) * 10;
    cardEl.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
    cardEl.style.transition = 'transform 0.08s ease-out';
  });
  scene.addEventListener('mouseleave', () => {
    if (cardEl.classList.contains('is-flipped')) return;
    cardEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    cardEl.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
  });
}

function flipCard(cardEl, toFlipped) {
  cardEl.classList.add('is-animating');
  const deg = toFlipped ? -180 : 0;
  cardEl.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`;
  cardEl.style.transform = `perspective(1200px) rotateY(${deg}deg)`;
  if (toFlipped) {
    cardEl.classList.add('is-flipped');
  } else {
    cardEl.classList.remove('is-flipped');
  }
  setTimeout(() => {
    cardEl.classList.remove('is-animating');
    if (!toFlipped) {
      cardEl.style.transition = '';
      cardEl.style.transform = '';
    }
  }, FLIP_DURATION + 60);
}

function persistCurrentMode() {
  const isSketch = document.body.classList.contains('sketch-mode');
  localStorage.setItem(MODE_KEY, isSketch ? 'sketch' : 'color');
}

function setupProjectCard(cardEl) {
  const projectId = cardEl.dataset.projectId;
  const href = cardEl.dataset.href;
  const github = githubUrls[projectId] || '#';

  const previewInner = cardEl.querySelector('.project-preview-inner');
  if (previewInner) {
    const oldCta = previewInner.querySelector('.project-preview-cta');
    if (oldCta) oldCta.remove();

    const btns = document.createElement('div');
    btns.className = 'preview-btns';
    btns.innerHTML = `
      <button class="preview-btn preview-btn-detail">View Details &#8594;</button>
      <a class="preview-btn preview-btn-github" href="${github}" target="_blank" rel="noopener">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub
      </a>
    `;
    previewInner.appendChild(btns);

    btns.querySelector('.preview-btn-detail').addEventListener('click', e => {
      e.stopPropagation();
      persistCurrentMode();
      sessionStorage.setItem(RETURN_CARD_KEY, projectId);
      window.location.href = href;
    });

    btns.querySelector('.preview-btn-github').addEventListener('click', e => {
      e.stopPropagation();
    });
  }

  setupTilt(cardEl);

  cardEl.addEventListener('click', e => {
    if (cardEl.classList.contains('is-animating')) return;
    if (e.target.closest('.preview-btn')) return;
    flipCard(cardEl, !cardEl.classList.contains('is-flipped'));
  });
}

function setupDirectClick(cardEl) {
  setupTilt(cardEl);
  cardEl.addEventListener('click', () => {
    const href = cardEl.dataset.href;
    const target = cardEl.dataset.target;
    if (!href) return;
    persistCurrentMode();
    if (target === '_blank') { window.open(href, '_blank', 'noopener'); return; }
    window.location.href = href;
  });
}

document.querySelectorAll('.proj-card').forEach(card => {
  if (card.classList.contains('contact-card')) { setupDirectClick(card); return; }
  if (card.classList.contains('proj-card-wip')) return;
  setupProjectCard(card);
});

const returningCardId = sessionStorage.getItem(RETURN_CARD_KEY);
if (returningCardId) {
  sessionStorage.removeItem(RETURN_CARD_KEY);
  const returningCard = document.querySelector(`.proj-card[data-project-id="${returningCardId}"]`);
  if (returningCard) {
    returningCard.classList.add('is-animating', 'is-flipped');
    returningCard.style.transition = 'none';
    returningCard.style.transform = 'perspective(1200px) rotateY(-180deg)';
    setTimeout(() => returningCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    setTimeout(() => flipCard(returningCard, false), 420);
  }
}

const photoCard = document.getElementById('photoCard');
if (photoCard) {
  const photoScene = photoCard.parentElement;

  photoScene.addEventListener('mousemove', e => {
    if (photoCard.classList.contains('is-flipping')) return;
    const rect = photoCard.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotY = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const rotX = -((e.clientY - cy) / (rect.height / 2)) * 8;
    photoCard.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    photoCard.style.transition = 'transform 0.08s ease-out';
  });

  photoScene.addEventListener('mouseleave', () => {
    if (photoCard.classList.contains('is-flipping')) return;
    photoCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    photoCard.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
  });

  photoCard.addEventListener('click', () => {
    if (photoCard.classList.contains('is-flipping')) return;
    const href = photoCard.dataset.href;
    if (!href) return;
    photoCard.classList.add('is-flipping');
    persistCurrentMode();
    photoCard.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`;
    photoCard.style.transform = 'perspective(1200px) rotateY(-180deg)';
    setTimeout(() => { window.location.href = href; }, FLIP_DURATION);
  });
}
