(function () {
  function init(root) {
    root.querySelectorAll('[data-blog-pagination]').forEach(function (section) {
      if (section.hasAttribute('data-blog-ready')) return;
      var cards = Array.from(section.querySelectorAll('[data-blog-card]'));
      var controls = section.querySelector('[data-blog-controls]');
      var newer = section.querySelector('[data-blog-newer]');
      var older = section.querySelector('[data-blog-older]');
      var status = section.querySelector('[data-blog-page-status]');
      var mobile = window.matchMedia('(max-width: 749px)');
      var batch = Number(section.dataset.batchPage) || 1;
      var total = Number(section.dataset.totalPosts) || cards.length;
      var size = mobile.matches ? 3 : 8;
      var offset = 0;
      function urlFor(base, targetOffset) {
        var url = new URL(base || window.location.href, window.location.href);
        if (targetOffset) url.searchParams.set('blog_offset', targetOffset);
        else url.searchParams.delete('blog_offset');
        return url.href;
      }
      function setLink(link, href) {
        link.hidden = !href;
        if (href) link.href = href;
        else link.removeAttribute('href');
      }
      function render(fromUrl) {
        size = mobile.matches ? 3 : 8;
        if (fromUrl) offset = Number(new URL(window.location.href).searchParams.get('blog_offset')) || 0;
        offset = Math.max(0, Math.min(Math.floor(offset / size) * size, Math.max(0, Math.floor((cards.length - 1) / size) * size)));
        cards.forEach(function (card, index) { card.hidden = index < offset || index >= offset + size; });
        setLink(newer, offset > 0 ? urlFor(null, offset - size) : section.dataset.newerUrl ? urlFor(section.dataset.newerUrl, 24 - size) : null);
        setLink(older, offset + size < cards.length ? urlFor(null, offset + size) : section.dataset.olderUrl ? urlFor(section.dataset.olderUrl, 0) : null);
        status.textContent = total ? 'Page ' + (Math.floor(((batch - 1) * 24 + offset) / size) + 1) + ' of ' + Math.ceil(total / size) : '';
        controls.hidden = total <= size;
        section.setAttribute('data-blog-ready', '');
      }
      controls.addEventListener('click', function (event) {
        var link = event.target.closest('a[href]');
        if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        var target = new URL(link.href);
        var current = new URL(window.location.href);
        if (target.pathname !== current.pathname || target.searchParams.get('page') !== current.searchParams.get('page')) return;
        event.preventDefault();
        window.history.pushState({}, '', target.href);
        render(true);
        var heading = document.querySelector('.blog-page-header, .arrivals-page__header');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({preventScroll: true});
          heading.scrollIntoView({block: 'start'});
        }
      });
      if (mobile.addEventListener) mobile.addEventListener('change', function () { render(false); });
      else mobile.addListener(function () { render(false); });
      window.addEventListener('popstate', function () { render(true); });
      render(true);
    });
  }
  init(document);
  document.addEventListener('shopify:section:load', function (event) { init(event.target); });
})();
