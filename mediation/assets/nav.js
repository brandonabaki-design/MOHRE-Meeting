// Highlights the active tab based on the current page filename
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (path === '') path = 'index.html';
  document.querySelectorAll('nav.tabs a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });
})();

// Persist checklist state across reloads using localStorage.
(function () {
  var lists = document.querySelectorAll('ul.check');
  if (!lists.length) return;

  lists.forEach(function (ul) {
    var key = 'check:' + (ul.id || location.pathname);
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}

    ul.querySelectorAll('li').forEach(function (li, idx) {
      var cb = li.querySelector('input[type="checkbox"]');
      if (!cb) return;
      var id = cb.id || ('item-' + idx);
      cb.id = id;
      if (saved[id]) {
        cb.checked = true;
        li.classList.add('done');
      }
      li.addEventListener('click', function (e) {
        if (e.target.tagName !== 'INPUT') cb.checked = !cb.checked;
        li.classList.toggle('done', cb.checked);
        saved[id] = cb.checked;
        localStorage.setItem(key, JSON.stringify(saved));
      });
    });
  });
})();
