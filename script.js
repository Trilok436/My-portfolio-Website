// script.js - small interactive enhancements (hamburger + smooth scroll + simple form demo)
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (hamburger)
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // toggle visibility for mobile
      const isHidden = primaryNav.getAttribute('aria-hidden') === 'false' || primaryNav.getAttribute('aria-hidden') === null;
      primaryNav.setAttribute('aria-hidden', String(isHidden));
      // we set attribute to false to show, true to hide
      primaryNav.style.display = (primaryNav.style.display === 'block') ? '' : 'block';
    });
    // ensure initial state for mobile
    primaryNav.setAttribute('aria-hidden', 'true');
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav when link clicked
        if (window.innerWidth <= 900 && primaryNav) {
          primaryNav.style.display = '';
          primaryNav.setAttribute('aria-hidden', 'true');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Simple contact form (demo behavior - does not send server request)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const clearBtn = document.getElementById('clear-btn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        showMessage('Please complete all fields.', true);
        return;
      }

      // Demo: open mail client with prefilled subject (assignment-friendly)
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href =`mailto:trilokmahawaar436@gmail.com?subject=${subject}&body=${body}`;

      showMessage('Opening mail client... If it does not open, copy message manually.', false);
    });
  }
  if (clearBtn && form) {
    clearBtn.addEventListener('click', function () {
      form.reset();
      showMessage('', false);
    });
  }

  function showMessage(msg, isError) {
    if (!formMsg) return;
    formMsg.textContent = msg;
    formMsg.style.color = isError ? '#b91c1c' : '#065f46';
  }
});