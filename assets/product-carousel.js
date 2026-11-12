(function () {
  function init(root) {
    root.querySelectorAll('[data-product-carousel]').forEach(function (carousel) {
      if (carousel.dataset.carouselReady) return;
      var track = carousel.querySelector('[data-carousel-track]');
      var prev = carousel.querySelector('[data-carousel-prev]');
      var next = carousel.querySelector('[data-carousel-next]');
      if (!track || !prev || !next) return;
      carousel.dataset.carouselReady = 'true';
      function update() {
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      }
      function move(direction) {
        var card = track.firstElementChild;
        if (!card) return;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        var stride = card.getBoundingClientRect().width + gap;
        var visible = Math.max(1, Math.round((track.clientWidth + gap) / stride));
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollBy({left: direction * stride * visible, behavior: reduce ? 'instant' : 'smooth'});
        update();
      }
      prev.addEventListener('click', function () { move(-1); });
      next.addEventListener('click', function () { move(1); });
      track.addEventListener('scroll', update, {passive: true});
      if (window.ResizeObserver) new ResizeObserver(update).observe(track);
      else window.addEventListener('resize', update);
      update();
    });
  }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
