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
        var dist = 90 + Math.random() * 200;
        s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        s.style.setProperty('--rot', (Math.random() * 1440 - 720) + 'deg');
        s.style.setProperty('--sc', (0.2 + Math.random() * 2).toFixed(2));
        s.style.setProperty('--delay', Math.random() * 300 + 'ms');
        label.appendChild(s);
      });
      link.classList.add('martial-exploding');
      var mobileMenu = link.closest('.mobile-nav-wrapper');
      if (mobileMenu) mobileMenu.classList.add('martial-menu-animating');
      setTimeout(function () {
        var same = link.href.split('#')[0] === window.location.href.split('#')[0];
        if (same) {
          label.textContent = text;
          link.classList.remove('martial-exploding');
        }
        if (mobileMenu) mobileMenu.classList.remove('martial-menu-animating');
        window.location.href = link.href;
      }, 1600);
    });
  });
})();
