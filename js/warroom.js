(function () {
  function animateWarroomCounters() {
    document.querySelectorAll('.numb-val[data-target]').forEach(function (el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  const section = document.getElementById('warroom');
  if (!section) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateWarroomCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
})();
