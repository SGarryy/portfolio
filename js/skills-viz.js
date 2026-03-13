(function () {

  /* ── RADAR CHART ── */
  var cx = 170, cy = 155, maxR = 100, n = 6;
  var vals = [0.82, 0.72, 0.70, 0.88, 0.65, 0.68];

  function angle(i) { return (2 * Math.PI * i / n) - Math.PI / 2; }
  function pt(val, i) {
    return {
      x: cx + val * maxR * Math.cos(angle(i)),
      y: cy + val * maxR * Math.sin(angle(i))
    };
  }

  function animateRadar() {
    var shape = document.getElementById('radarShape');
    var dots  = [0,1,2,3,4,5].map(function(i){ return document.getElementById('rd'+i); });
    if (!shape || !dots[0]) return;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / 1400, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      var pts = vals.map(function(v, i) {
        var p = pt(v * ease, i);
        return p.x.toFixed(2) + ',' + p.y.toFixed(2);
      });
      shape.setAttribute('points', pts.join(' '));
      dots.forEach(function(dot, i) {
        var p = pt(vals[i] * ease, i);
        dot.setAttribute('cx', p.x.toFixed(2));
        dot.setAttribute('cy', p.y.toFixed(2));
      });
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var skillsSection = document.getElementById('skills');
  if (skillsSection) {
    new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { animateRadar(); }
      });
    }, { threshold: 0.2 }).observe(skillsSection);
  }

  /* ── PERIODIC TOOLTIP ── */
  var tooltip = document.getElementById('peTooltip');
  if (!tooltip) return;
  document.querySelectorAll('.pe-cell').forEach(function(cell) {
    cell.addEventListener('mouseenter', function() {
      tooltip.textContent = cell.getAttribute('data-tip') || '';
      tooltip.classList.add('show');
    });
    cell.addEventListener('mousemove', function(e) {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 32) + 'px';
    });
    cell.addEventListener('mouseleave', function() { tooltip.classList.remove('show'); });
  });

})();
