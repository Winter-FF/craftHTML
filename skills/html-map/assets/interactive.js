/* ============================================
   craftHTML Interactive JavaScript
   Theme Toggle + Sidebar + Section Glow + Copy
   Copy this entire block into <script> tag
   ============================================ */
(function() {

  /* ---- Theme Toggle ---- */
  var html = document.documentElement;
  var stored = localStorage.getItem('crafthtml-theme');

  if (stored === 'dark') {
    html.classList.add('dark-mode');
  } else if (stored === 'light') {
    html.classList.add('light-mode');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark-default');
  }

  document.getElementById('themeToggle').addEventListener('click', function() {
    var isDark = html.classList.contains('dark-mode') ||
      (html.classList.contains('dark-default') && !html.classList.contains('light-mode'));
    html.classList.remove('dark-mode', 'light-mode', 'dark-default');
    if (isDark) {
      html.classList.add('light-mode');
      localStorage.setItem('crafthtml-theme', 'light');
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem('crafthtml-theme', 'dark');
    }
  });

  /* ---- Sidebar Active State ---- */
  var sidebarLinks = document.querySelectorAll('.sidebar a');
  var sectionIds = [];
  sidebarLinks.forEach(function(link) {
    sectionIds.push({ id: link.getAttribute('href').slice(1), link: link });
  });

  function updateSidebar() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var viewH = window.innerHeight;
    var docH = document.documentElement.scrollHeight;
    var isAtBottom = scrollY + viewH >= docH - 50;
    var current = null;

    if (isAtBottom) {
      current = sectionIds[sectionIds.length - 1];
    } else {
      for (var i = sectionIds.length - 1; i >= 0; i--) {
        var el = document.getElementById(sectionIds[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = sectionIds[i];
          break;
        }
      }
      if (!current && sectionIds.length > 0) current = sectionIds[0];
    }

    sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  /* ---- Section Glow ---- */
  function glowSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('section-glow');
    void el.offsetWidth;
    el.classList.add('section-glow');
    setTimeout(function() { el.classList.remove('section-glow'); }, 1500);
  }

  /* ---- Sidebar Click ---- */
  sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(function() { glowSection(id); }, 350);
      }
    });
  });

  /* ---- Scroll Glow ---- */
  var prevActiveId = null;
  function onScroll() {
    updateSidebar();
    var active = null;
    sidebarLinks.forEach(function(l) { if (l.classList.contains('active')) active = l; });
    if (active) {
      var curId = active.getAttribute('href').slice(1);
      if (prevActiveId !== null && curId !== prevActiveId) glowSection(curId);
      prevActiveId = curId;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateSidebar, { passive: true });
  setTimeout(updateSidebar, 300);
  updateSidebar();

  /* ---- Copy Buttons ---- */
  var copyIcon = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var checkIcon = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';

  document.querySelectorAll('pre').forEach(function(pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = copyIcon + 'Copy';
    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(function() {
        btn.innerHTML = checkIcon + 'Copied';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = copyIcon + 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    pre.appendChild(btn);
  });

})();
