// ============================
// ARRAY DE OBRAS
// Para agregar una obra nueva, copiás un bloque { } y lo pegás.
// Las imágenes van en Assets/images/
// ============================
const artworks = [
  {
    name: "Sin título I",
    image: "Assets/images/YEAHMAN 2.jpg",
    year: "2024",
    description: "Óleo sobre tela"
  },
  {
    name: "Sin título II",
    image: "Assets/images/SI 2.jpg",
    year: "2024",
    description: "Acrílico sobre tela"
  },
  {
    name: "Sin título III",
    image: "Assets/images/TAPA26.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "Sin título IV",
    image: "Assets/images/BITACORAS 2.jpg",
    year: "2023",
    description: "Óleo sobre madera"
  },
  {
    name: "Sin título V",
    image: "Assets/images/AD ANTES 2.jpg",
    year: "2023",
    description: "Acuarela"
  }
];

// ============================
// FUNCIÓN: CREAR BLOQUE DE OBRA
// Genera el HTML de una sola obra: texto a la izquierda, imagen a la derecha.
// El número de índice se usa para el contador visual (01, 02...).
// ============================
function createArtworkItem(artwork, index) {
  // Número formateado: 1 → "01", 2 → "02", etc.
  const number = String(index + 1).padStart(2, '0');

  return `
    <article class="artwork-item">

      <!-- LADO IZQUIERDO: información de la obra -->
      <div class="artwork-info">
        <span class="artwork-number">${number}</span>
        <h3 class="artwork-name">${artwork.name}</h3>
        <p class="artwork-meta">${artwork.description}</p>
        <p class="artwork-year">${artwork.year}</p>
      </div>

      <!-- LADO DERECHO: imagen clickeable -->
      <div class="artwork-visual">
        <img
          src="${artwork.image}"
          alt="${artwork.name}"
          class="artwork-img"
          loading="lazy"
          data-src="${artwork.image}"
          data-alt="${artwork.name}"
        />
      </div>

    </article>
  `;
}

// ============================
// FUNCIÓN: RENDERIZAR GALERÍA
// Inserta todas las obras en el contenedor del HTML.
// ============================
function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = artworks.map(createArtworkItem).join('');

  // Activa las animaciones de scroll y el lightbox
  initScrollAnimations();
  initLightbox();
}

// ============================
// ANIMACIÓN DE SCROLL
// Usa IntersectionObserver: cuando una obra entra en pantalla,
// le agrega la clase .visible que dispara la transición CSS.
// ============================
function initScrollAnimations() {
  const items = document.querySelectorAll('.artwork-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Una vez visible no necesitamos seguir observándola
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // se activa cuando el 15% del elemento es visible
  });

  items.forEach(item => observer.observe(item));
}

// ============================
// LIGHTBOX
// Al hacer click en una imagen, se muestra ampliada centrada en pantalla.
// Se cierra con el botón X o haciendo click fuera de la imagen.
// ============================
function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn   = document.querySelector('.lightbox-close');

  if (!lightbox) return;

  // Abrir lightbox al hacer click en cualquier imagen de obra
  document.querySelectorAll('.artwork-img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.getAttribute('data-src');
      lightboxImg.alt = img.getAttribute('data-alt');
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // evita scroll mientras está abierto
    });
  });

  // Cerrar con el botón X
  closeBtn.addEventListener('click', closeLightbox);

  // Cerrar al hacer click en el fondo oscuro (fuera de la imagen)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // restaura el scroll
  }
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener('DOMContentLoaded', renderGallery);
