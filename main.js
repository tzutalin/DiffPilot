(function () {
  document.documentElement.classList.remove('no-js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveals, once per element.
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Tagline: each word lights up as it crosses a line 35% above the bottom of the viewport.
  document.querySelectorAll('.tagline p').forEach(function (p) {
    var lines = p.innerHTML.split(/<br\s*\/?>/i);
    p.textContent = '';
    lines.forEach(function (line, li) {
      var words = line.replace(/<[^>]+>/g, '').trim().split(/\s+/);
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'w' + (reduce ? ' on' : '');
        s.textContent = w;
        p.appendChild(s);
        if (i < words.length - 1) p.appendChild(document.createTextNode(' '));
      });
      if (li < lines.length - 1) p.appendChild(document.createElement('br'));
    });
    if (reduce) return;
    var wio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); wio.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -35% 0px', threshold: 1 });
    p.querySelectorAll('.w').forEach(function (s) { wio.observe(s); });
  });

  // Mobile menu.
  var t = document.querySelector('.toggle'), l = document.querySelector('.nav .links');
  if (t && l) {
    var set = function (o) {
      l.classList.toggle('open', o);
      t.setAttribute('aria-expanded', String(o));
      t.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      document.body.style.overflow = o ? 'hidden' : '';
    };
    t.addEventListener('click', function () { set(!l.classList.contains('open')); });
    l.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  // Tabs (ARIA tabs pattern; arrow keys move between tabs).
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = [].slice.call(list.querySelectorAll('[role="tab"]'));
    var pick = function (tab, focus) {
      tabs.forEach(function (x) {
        var on = x === tab;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { pick(tab); });
      tab.addEventListener('keydown', function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  });

  // Copy buttons: copy the text of the target element (prompt markers are skipped).
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var label = b.querySelector('.label');
    b.addEventListener('click', function () {
      var el = document.getElementById(b.getAttribute('data-copy'));
      var clone = el.cloneNode(true);
      clone.querySelectorAll('.p').forEach(function (x) { x.remove(); });
      var text = clone.textContent.replace(/\n+$/, '');
      var done = function (msg, ok) {
        if (label) label.textContent = msg;
        b.classList.toggle('done', ok);
        setTimeout(function () { if (label) label.textContent = 'Copy'; b.classList.remove('done'); }, 1800);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () { done('Copied', true); }, function () { done('Copy failed. Select the text instead.', false); });
      } else { done('Copy failed. Select the text instead.', false); }
    });
  });

  // Character counters for App Store fields.
  document.querySelectorAll('[data-limit]').forEach(function (c) {
    var el = document.getElementById(c.getAttribute('data-for'));
    var n = el.textContent.trim().length, max = +c.getAttribute('data-limit');
    c.textContent = n + ' / ' + max;
    if (n > max) c.classList.add('over');
  });

  // Lightbox for screenshots.
  var dlg = document.querySelector('dialog.lb');
  if (dlg) {
    var img = dlg.querySelector('img');
    document.querySelectorAll('a.zoom').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        img.src = a.getAttribute('href');
        img.alt = (a.querySelector('img') || {}).alt || '';
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('button')) dlg.close(); });
  }

  // Docs table of contents: highlight the section in view.
  var toc = document.querySelectorAll('.toc a');
  if (toc.length) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          toc.forEach(function (a) { a.classList.remove('on'); });
          var a = map[e.target.id];
          if (a) a.classList.add('on');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) tio.observe(s); });
  }
})();
