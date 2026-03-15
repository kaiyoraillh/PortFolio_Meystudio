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
    year: "2013",
    dimensions: "220x80",
    description: "Acrylic, ink, laquer and spray paint on wood"
  },
  {
    name: "Si/som dos",
    image: "Assets/images/SI 2.jpg",
    year: "2013",
    dimensions: "220x160",
    description: "Acrylic, ink, laquer, resin and spray paint on wood"
  },
  {
    // OBRA #3 — doble bloque de información
    name: "Quixote",
    image: "Assets/images/quixote 2.jpg",
    year: "2020",
    dimensions: "170x80",
    description: "Acrilico, carbonilla, aerosol, marcadores y acuarela sobre papel troquelado",
    extraInfo: {
      name: "Sanxo",
      dimensions: "120x80",
      description: "Acrilico, carbonilla, aerosol, marcadores y acuarela sobre papel troquelado"
    }
  },
  {
    name: "Halcones y Palomas",
    image: "Assets/images/HALCONES 2.jpg",
    year: "2016",
    dimensions: "150x150",
    description: "Acrylic, ink, laquer, resin, plaster and spray paint on wood"
  },
  {
    name: "Follow",
    image: "Assets/images/FOLLOW 2.jpg",
    year: "2016",
    dimensions: "220x160",
    description: "Acrylic, ink, laquer, resin, plaster and spray paint on wood"
  },
  {
    name: "El Out",
    image: "Assets/images/EL OUT 2.jpg",
    year: "2020",
    dimensions: "175x75",
    description: "/Periodo de cuarentena/ Acrylic, ink, laquer, resin plaster and spray paint on wood panel"
  },
  {
    name: "Distant",
    image: "Assets/images/DISTANT 2.jpg",
    year: "2019",
    dimensions: "140x110",
    description: "Acrylic, ink, laquer, plaster and spray paint on cement place"
  },
  {
    name: "Serie Captcha",
    image: "Assets/images/CAPTCHA 2.jpg",
    year: "04.A0",
    dimensions: "120x150",
    description: "Acrylic, ink and spray paint on wood"
  },
  {
    name: "Cabecera",
    image: "Assets/images/CABECERA  2.jpg",
    year: "2022",
    dimensions: "300x120",
    description: "Acrilico, carbonilla, aerosol. Marcadores, enduido sobre 14 lienzos unidos"
  },
  {
    // OBRA #10 — doble bloque de información
    name: "R12/El Muelle",
    image: "Assets/images/BITACORAS 2.jpg",
    year: "2024-25",
    dimensions: "90x60",
    description: "Acrilico, lapiz negro, aerosol, marcadores, acuarela y laca sobre papel",
    extraInfo: {
      name: "Mini/Newquay",
      year: "2024-25",
      dimensions: "90x60",
      description: "Acrilico, lapiz negro, aerosol, marcadores, acuarela y laca sobre papel"
    }
  },
  {
    name: "Anis",
    image: "Assets/images/ANIS 2.jpg",
    year: "2016",
    dimensions: "120x150",
    description: "Acrylic, ink, laquer and spray paint on wood"
  },
  {
    name: "Mar Propio",
    image: "Assets/images/MAR PROPIO 2.jpg",
    year: "2016",
    dimensions: "220x160",
    description: "Acrylic, ink, laquer, resin, plaster and spray paint on wood"
  },
  {
    name: "Ad Antes",
    image: "Assets/images/AD ANTES 2.jpg",
    year: "2019",
    dimensions: "110x85",
    description: "Acrylic, ink, laquer, resin, plaster and spray paint on wood"
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
      <h3 class="artwork-name">${data.name || ''}</h3>
      ${data.year        ? `<p class="artwork-year">${data.year}</p>` : ''}
      ${data.dimensions  ? `<p class="artwork-dimensions">${data.dimensions}</p>` : ''}
      ${data.description ? `<p class="artwork-meta">${data.description}</p>` : ''}
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
