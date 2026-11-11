/* Mobiles Menü. Eigenes Skript, keine externen Ressourcen, keine Cookies.
   Ohne JavaScript bleibt die Navigation dauerhaft sichtbar. */
(function () {
  var d = document;
  var btn = d.querySelector('.nav-toggle');
  var nav = d.getElementById('site-nav');

  d.documentElement.classList.add('js');
  if (!btn || !nav) return;

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

/* Anfrage-Formular als Popup (natives dialog-Element).
   Schliessen: X-Button, Klick neben das Fenster oder Esc. */
(function () {
  var d = document;
  var openBtn = d.getElementById('toggle-form-btn');
  var dlg = d.getElementById('form-container');
  if (!openBtn || !dlg || typeof dlg.showModal !== 'function') return;

  var closeBtn = d.getElementById('form-close-btn');
  var root = d.documentElement;

  function openModal() {
    if (dlg.open) return;
    dlg.showModal();
    root.classList.add('modal-open');
  }

  function closeModal() {
    if (dlg.open) dlg.close();
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) closeModal();
  });

  dlg.addEventListener('close', function () {
    root.classList.remove('modal-open');
    openBtn.focus();
  });

  /* Weitere Links auf #anfrage oeffnen ebenfalls das Popup */
  var links = d.querySelectorAll('a[href="#anfrage"]');
  for (var k = 0; k < links.length; k++) {
    links[k].addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }
})();

/* Bilder fliegen beim Scrollen von links bzw. rechts ein
   (Richtung wird im CSS ueber die Position im Layout festgelegt). */
(function () {
  var d = document;
  var items = d.querySelectorAll('.feature');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    for (var n = 0; n < items.length; n++) items[n].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  for (var m = 0; m < items.length; m++) io.observe(items[m]);
})();

/* Kontaktformular: native Pflichtfeldpruefung plus Web3Forms-Versand. */
(function () {
  var d = document;
  var form = d.getElementById('form');
  var status = d.getElementById('form-status');
  if (!form || !status) return;

  var nameInput = form.querySelector('[name="name"]');
  var phoneInput = form.querySelector('[name="phone"]');
  var submitButton = form.querySelector('button[type="submit"]');
  var defaultButtonText = submitButton ? submitButton.textContent : '';
  var sending = false;

  function validateName() {
    if (!nameInput) return;
    nameInput.setCustomValidity(
      nameInput.value.trim().length >= 2
        ? ''
        : 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).'
    );
  }

  function validatePhone() {
    if (!phoneInput) return;
    var digitCount = phoneInput.value.replace(/\D/g, '').length;
    phoneInput.setCustomValidity(
      digitCount >= 7 && digitCount <= 15
        ? ''
        : 'Bitte geben Sie eine Telefonnummer mit 7 bis 15 Ziffern ein.'
    );
  }

  if (nameInput) nameInput.addEventListener('input', validateName);
  if (phoneInput) phoneInput.addEventListener('input', validatePhone);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (sending) return;

    validateName();
    validatePhone();
    if (!form.reportValidity()) return;

    sending = true;
    status.hidden = true;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet ...';
    }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data || data.success !== true) {
            throw new Error('Der Formularanbieter hat den Versand nicht bestaetigt.');
          }
          return data;
        });
      })
      .then(function () {
        form.reset();
        status.textContent = 'Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.';
        status.style.background = '#e8f5e9';
        status.style.color = '#1b5e20';
      })
      .catch(function () {
        status.textContent = 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an komaxaonly@gmail.com.';
        status.style.background = '#ffebee';
        status.style.color = '#b71c1c';
      })
      .finally(function () {
        status.hidden = false;
        status.focus();
        sending = false;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      });
  });
})();