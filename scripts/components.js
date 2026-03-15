// ============================
// COMPONENTES COMPARTIDOS
// Este archivo inyecta el nav y el footer en todas las páginas.
// Si querés cambiar el menú o el footer, lo hacés acá una sola vez.
// ============================

const NAV_HTML = `
  <nav class="nav">
    <a href="/index.html" class="nav-logo">MEYSTUDIO</a>
    <ul class="nav-links">
      <li><a href="/obras.html" data-page="obras.html">Portfolio</a></li>
      <li><a href="/about.html" data-page="about.html">Sobre mi</a></li>
      <li><a href="/contact.html" data-page="contact.html">Contacto</a></li>
    </ul>
    <button class="dark-mode-btn" id="dark-mode-btn" aria-label="Alternar modo oscuro">🌙</button>
  </nav>
`;

const FOOTER_HTML = `
  <footer class="footer">
    <p>© 2026 Portfolio — Mariano Yoraillh</p>
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
  // Obtiene el nombre del archivo actual (ej: "obras.html")
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  initDarkMode();
});

// ============================
// DARK MODE
// Activa/desactiva la clase .dark-mode en el body.
// Guarda la preferencia en localStorage.
// ============================
function initDarkMode() {
  // Aplica la preferencia guardada antes de que la página se pinte
  if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
  }

  const btn = document.getElementById('dark-mode-btn');
  if (!btn) return;

  // Actualiza el ícono según el estado actual
  updateIcon(btn);

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    updateIcon(btn);
  });
}

function updateIcon(btn) {
  const isDark = document.body.classList.contains('dark-mode');
  btn.textContent = isDark ? '☀️' : '🌙';
}

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
