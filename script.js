/* Mobiles Menü. Eigenes Skript, keine externen Ressourcen, keine Cookies.
   Ohne JavaScript bleibt die Navigation dauerhaft sichtbar. */
(function () {
  var d = document;
  var btn = d.querySelector('.nav-toggle');
  var nav = d.getElementById('site-nav');
  if (!btn || !nav) return;

  d.documentElement.classList.add('js');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
