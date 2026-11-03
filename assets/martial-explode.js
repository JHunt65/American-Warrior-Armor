(function () {
  var links = document.querySelectorAll('.site-nav__martial-link, .martial-link-mobile');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || reduce) return;
      var label = link.querySelector('span');
      if (!label || link.classList.contains('martial-exploding')) return;
      e.preventDefault();
      var text = label.textContent;
      label.textContent = '';
      text.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'martial-letter';
        s.textContent = ch === ' ' ? '\u00a0' : ch;
        var angle = Math.random() * Math.PI * 2;
        var dist = 50 + Math.random() * 90;
        s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        s.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
        s.style.setProperty('--sc', (0.4 + Math.random() * 1.8).toFixed(2));
        label.appendChild(s);
      });
      link.classList.add('martial-exploding');
      setTimeout(function () {
        var same = link.href.split('#')[0] === window.location.href.split('#')[0];
        if (same) {
          label.textContent = text;
          link.classList.remove('martial-exploding');
        }
        window.location.href = link.href;
      }, 450);
    });
  });
})();
