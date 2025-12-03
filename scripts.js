// Comportamiento mínimo: menú móvil, año dinámico y smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  const html = document.documentElement;
  const navToggle = document.getElementById('nav-toggle');
  const siteHeader = document.querySelector('.site-header');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      html.classList.toggle('nav-open');
      // alternar aria-expanded
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  // Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // cerrar menú en móvil si estaba abierto
        html.classList.remove('nav-open');
      }
    });
  });

  // Año en footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
