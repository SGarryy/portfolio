const SKETCH_MODE = 'sketch';
const COLOR_MODE = 'color';
function readSavedMode() {
  try {
    const savedMode = localStorage.getItem(MODE_KEY);
    return savedMode === COLOR_MODE || savedMode === SKETCH_MODE ? savedMode : null;
  } catch {
    return null;
  }
}
function writeSavedMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
  }
}
function getModeElements() {
  return [document.documentElement, document.body].filter(Boolean);
}
function normalizeMode(mode) {
  return mode === COLOR_MODE ? COLOR_MODE : SKETCH_MODE;
}
function syncModeClasses(mode) {
  const nextMode = normalizeMode(mode);
  const isSketch = nextMode === SKETCH_MODE;
  getModeElements().forEach((node) => {
    node.classList.toggle('sketch-mode', isSketch);
    node.classList.toggle('color-mode', !isSketch);
    node.dataset.mode = nextMode;
  });
  return nextMode;
}
function detectMode() {
  const savedMode = readSavedMode();
  if (savedMode) return savedMode;
  if (document.body && document.body.dataset.mode) {
    if (document.body.dataset.mode === COLOR_MODE || document.body.dataset.mode === SKETCH_MODE) {
      return document.body.dataset.mode;
    }
  }
  return getModeElements().some((node) => node.classList.contains('color-mode'))
    ? COLOR_MODE
    : SKETCH_MODE;
}
function initModeToggle() {
  const btn = document.getElementById('modeToggle');
  const icon = document.getElementById('toggleIcon');
  const label = document.getElementById('toggleLabel');
  const wash = document.getElementById('watercolorWash');
  let washTimer = null;
  let currentMode = detectMode();
  function syncToggleUi() {
    const isSketch = currentMode === SKETCH_MODE;
    const shortLabel = isSketch ? 'Color' : 'Sketch';
    const ariaLabel  = isSketch ? 'Switch to Color Mode' : 'Switch to Sketch Mode';
    const nextIcon   = isSketch ? '\uD83C\uDFA8' : '\u270E';
    if (icon) {
      icon.textContent = nextIcon;
    }
    if (label) {
      label.textContent = shortLabel;
    }
    if (btn) {
      btn.setAttribute('aria-label', ariaLabel);
      btn.setAttribute('aria-pressed', String(currentMode === COLOR_MODE));
      btn.title = ariaLabel;
    }
  }
  function playWash() {
    if (!wash) return;
    wash.classList.remove('animating');
    void wash.offsetWidth;
    wash.classList.add('animating');
    clearTimeout(washTimer);
    washTimer = setTimeout(() => wash.classList.remove('animating'), 900);
  }
  function applyMode(mode, { persist = true } = {}) {
    currentMode = syncModeClasses(mode);
    if (persist) {
      writeSavedMode(currentMode);
    }
    syncToggleUi();
    return currentMode;
  }
  function toggleMode(event) {
    event.preventDefault();
    playWash();
    return applyMode(currentMode === SKETCH_MODE ? COLOR_MODE : SKETCH_MODE);
  }
  window.setPortfolioMode = (mode) => {
    return applyMode(mode);
  };
  window.togglePortfolioMode = () => {
    return applyMode(currentMode === SKETCH_MODE ? COLOR_MODE : SKETCH_MODE);
  };
  applyMode(currentMode, { persist: false });
  if (!btn) return;
  btn.type = 'button';
  btn.addEventListener('click', toggleMode);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModeToggle, { once: true });
} else {
  initModeToggle();
}