// ============================
// ARRAY DE OBRAS
// Aquí defines todas las obras del artista.
// Para agregar una obra nueva, copiás un bloque { } y lo pegás.
// ============================
const artworks = [
  {
    name: "Sin título I",
    image: "assets/images/obra-01.jpg",
    description: "Óleo sobre tela, 2024"
  },
  {
    name: "Sin título II",
    image: "assets/images/obra-02.jpg",
    description: "Acrílico sobre tela, 2024"
  },
  {
    name: "Sin título III",
    image: "assets/images/obra-03.jpg",
    description: "Técnica mixta, 2023"
  },
  {
    name: "Sin título IV",
    image: "assets/images/obra-04.jpg",
    description: "Óleo sobre madera, 2023"
  },
  {
    name: "Sin título V",
    image: "assets/images/obra-05.jpg",
    description: "Acuarela, 2023"
  },
  {
    name: "Sin título VI",
    image: "assets/images/obra-06.jpg",
    description: "Grafito sobre papel, 2022"
  }
];

// ============================
// FUNCIÓN: CREAR TARJETA DE OBRA
// Recibe un objeto del array y devuelve HTML en texto.
// ============================
function createArtworkCard(artwork) {
  return `
    <article class="artwork-card">
      <div class="artwork-image-wrapper">
        <img src="${artwork.image}" alt="${artwork.name}" loading="lazy" />
      </div>
      <p class="artwork-name">${artwork.name}</p>
      ${artwork.description ? `<p class="artwork-description">${artwork.description}</p>` : ''}
    </article>
  `;
}

// ============================
// FUNCIÓN: RENDERIZAR GALERÍA
// Toma el array artworks, genera todas las tarjetas
// y las inserta dentro del div#gallery-grid del HTML.
// ============================
function renderGallery() {
  // Buscamos el contenedor de la galería en el HTML
  const galleryGrid = document.getElementById('gallery-grid');

  // Si no existe el contenedor, paramos
  if (!galleryGrid) return;

  // Convertimos cada obra en una tarjeta HTML y las unimos
  const cardsHTML = artworks.map(createArtworkCard).join('');

  // Las insertamos en la página
  galleryGrid.innerHTML = cardsHTML;
}

// ============================
// INICIALIZACIÓN
// Cuando la página termina de cargar, ejecutamos renderGallery.
// ============================
document.addEventListener('DOMContentLoaded', renderGallery);
