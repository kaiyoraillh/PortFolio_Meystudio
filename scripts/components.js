// ============================
// COMPONENTES COMPARTIDOS
// Este archivo inyecta el nav y el footer en todas las páginas.
// Si querés cambiar el menú o el footer, lo hacés acá una sola vez.
// ============================

const NAV_HTML = `
  <nav class="nav">
    <a href="/index.html" class="nav-logo">Inicio</a>
    <ul class="nav-links">
      <li><a href="/obras.html" data-page="obras.html">Portfolio</a></li>
      <li><a href="/about.html" data-page="about.html">Sobre mi</a></li>
      <li><a href="/contact.html" data-page="contact.html">Contacto</a></li>
    </ul>
    <span class="nav-artist">Mariano Yoraillh</span>
  </nav>
`;

const FOOTER_HTML = `
  <footer class="footer">
    <span>© 2026 Mariano Yoraillh</span>
    <span>Buenos Aires, Argentina</span>
  </footer>
`;

// ============================
// FUNCIÓN: INYECTAR COMPONENTES
// Busca los contenedores en el HTML e inserta el nav y el footer.
// ============================
function injectComponents() {
  const navContainer = document.getElementById('nav-container');
  const footerContainer = document.getElementById('footer-container');

  if (navContainer) navContainer.innerHTML = NAV_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // Marca como activo el link de la página actual
  highlightActiveLink();
}

// ============================
// FUNCIÓN: MARCAR LINK ACTIVO
// Compara la URL actual con el atributo data-page de cada link
// y le agrega la clase "active" al link de la página en la que estás.
// ============================
function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', injectComponents);

// ============================
// FADE-IN DE SECCIONES AL HACER SCROLL
// Agrega .section-fade a las secciones principales y las activa
// cuando entran en el viewport con IntersectionObserver.
// ============================
function initSectionFadeIn() {
  const sections = document.querySelectorAll(
    '.form-section, .about-section, .contact-section'
  );

  sections.forEach(el => el.classList.add('section-fade'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initSectionFadeIn);

// ============================
// ANIMACIÓN DEL NAVBAR AL HACER SCROLL
// Agrega la clase .nav--scrolled cuando el usuario baja de la página.
// ============================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  if (window.scrollY > 40) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});
