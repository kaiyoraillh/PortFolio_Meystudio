// ============================
// ARRAY DE OBRAS
// Para agregar una obra nueva, copiás un bloque { } y lo pegás.
// Las imágenes van en Assets/images/
//
// CAMPO ESPECIAL: extraInfo
// Si una obra tiene extraInfo, se muestran DOS bloques de información
// uno al lado del otro (obras #3 y #10).
// ============================
const artworks = [
  {
    name: "Yeah Manja",
    image: "Assets/images/YEAHMAN 2.jpg",
    year: "2019",
    dimensions: "—",
    description: "Acrylic, ink, laquer and spray paint on wood"
  },
  {
    name: "Si/som dos",
    image: "Assets/images/SI 2.jpg",
    year: "2013",
    dimensions: "—",
    description: "Acrylic, ink, laquer, resin and spray paint on wood"
  },
  {
    // OBRA #3 — doble bloque de información
    name: "Quixote",
    image: "Assets/images/quixote 2.jpg",
    year: "2024",
    dimensions: "—",
    description: "Técnica mixta",
    extraInfo: {
      name: "Quixote",
      year: "2024",
      dimensions: "—",
      description: "Técnica mixta"
    }
  },
  {
    name: "Halcones",
    image: "Assets/images/HALCONES 2.jpg",
    year: "2023",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Follow",
    image: "Assets/images/FOLLOW 2.jpg",
    year: "2023",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "El Out",
    image: "Assets/images/EL OUT 2.jpg",
    year: "2023",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Distant",
    image: "Assets/images/DISTANT 2.jpg",
    year: "2023",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Captcha",
    image: "Assets/images/CAPTCHA 2.jpg",
    year: "2023",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Cabecera",
    image: "Assets/images/CABECERA  2.jpg",
    year: "2022",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    // OBRA #10 — doble bloque de información
    name: "Bitácoras",
    image: "Assets/images/BITACORAS 2.jpg",
    year: "2022",
    dimensions: "—",
    description: "Técnica mixta",
    extraInfo: {
      name: "Bitácoras",
      year: "2022",
      dimensions: "—",
      description: "Técnica mixta"
    }
  },
  {
    name: "Anis",
    image: "Assets/images/ANIS 2.jpg",
    year: "2022",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Mar Propio",
    image: "Assets/images/MAR PROPIO 2.jpg",
    year: "2022",
    dimensions: "—",
    description: "Técnica mixta"
  },
  {
    name: "Ad Antes",
    image: "Assets/images/AD ANTES 2.jpg",
    year: "2022",
    dimensions: "—",
    description: "Técnica mixta"
  }
];

// ============================
// FUNCIÓN: CREAR BLOQUE DE INFORMACIÓN
// Renderiza un solo bloque con los 4 campos: nombre, año, dimensiones, descripción.
// El parámetro number es opcional (solo se muestra en el primer bloque).
// ============================
function createInfoBlock(data, number = null) {
  return `
    <div class="artwork-info">
      ${number !== null ? `<span class="artwork-number">${number}</span>` : ''}
      <h3 class="artwork-name">${data.name}</h3>
      <p class="artwork-year">${data.year}</p>
      <p class="artwork-dimensions">${data.dimensions}</p>
      <p class="artwork-meta">${data.description}</p>
    </div>
  `;
}

// ============================
// FUNCIÓN: CREAR BLOQUE DE OBRA
// Si la obra tiene extraInfo, genera dos bloques de info lado a lado.
// Si no, genera un solo bloque con el número de obra.
// ============================
function createArtworkItem(artwork, index) {
  const number = String(index + 1).padStart(2, '0');

  // Decide si va con uno o dos bloques de información
  const infoSection = artwork.extraInfo
    ? `<div class="artwork-info-double">
         ${createInfoBlock(artwork, number)}
         ${createInfoBlock(artwork.extraInfo)}
       </div>`
    : createInfoBlock(artwork, number);

  return `
    <article class="artwork-item">

      <!-- LADO IZQUIERDO: información de la obra -->
      ${infoSection}

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
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

// ============================
// LIGHTBOX
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
