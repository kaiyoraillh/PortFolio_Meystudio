// ============================
// ARRAY DE OBRAS
// Para agregar una obra nueva, copiás un bloque { } y lo pegás.
// Las imágenes van en Assets/images/
// ============================
const artworks = [
  {
    name: "Yeahman",
    image: "Assets/images/YEAHMAN 2.jpg",
    year: "2024",
    description: "Técnica mixta"
  },
  {
    name: "Si",
    image: "Assets/images/SI 2.jpg",
    year: "2024",
    description: "Técnica mixta"
  },
  {
    name: "Quixote",
    image: "Assets/images/quixote 2.jpg",
    year: "2024",
    description: "Técnica mixta"
  },
  {
    name: "Halcones",
    image: "Assets/images/HALCONES 2.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "Follow",
    image: "Assets/images/FOLLOW 2.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "El Out",
    image: "Assets/images/EL OUT 2.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "Distant",
    image: "Assets/images/DISTANT 2.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "Captcha",
    image: "Assets/images/CAPTCHA 2.jpg",
    year: "2023",
    description: "Técnica mixta"
  },
  {
    name: "Cabecera",
    image: "Assets/images/CABECERA  2.jpg",
    year: "2022",
    description: "Técnica mixta"
  },
  {
    name: "Bitácoras",
    image: "Assets/images/BITACORAS 2.jpg",
    year: "2022",
    description: "Técnica mixta"
  },
  {
    name: "Anis",
    image: "Assets/images/ANIS 2.jpg",
    year: "2022",
    description: "Técnica mixta"
  },
  {
    name: "Mar Propio",
    image: "Assets/images/MAR PROPIO 2.jpg",
    year: "2022",
    description: "Técnica mixta"
  },
  {
    name: "Ad Antes",
    image: "Assets/images/AD ANTES 2.jpg",
    year: "2022",
    description: "Técnica mixta"
  }
];

// ============================
// FUNCIÓN: CREAR BLOQUE DE OBRA
// Genera el HTML de una sola obra: texto a la izquierda, imagen a la derecha.
// ============================
function createArtworkItem(artwork, index) {
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
// ============================
function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = artworks.map(createArtworkItem).join('');

  initScrollAnimations();
  initLightbox();
}

// ============================
// ANIMACIÓN DE SCROLL
// Cuando una obra entra en pantalla, le agrega .visible → transición CSS.
// ============================
function initScrollAnimations() {
  const items = document.querySelectorAll('.artwork-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  items.forEach(item => observer.observe(item));
}

// ============================
// LIGHTBOX
// Click en imagen → se muestra ampliada.
// Cierre: botón X, click fuera, o tecla Escape.
// ============================
function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.querySelector('.lightbox-close');

  if (!lightbox) return;

  document.querySelectorAll('.artwork-img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.getAttribute('data-src');
      lightboxImg.alt = img.getAttribute('data-alt');
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener('DOMContentLoaded', renderGallery);
