// ============================
// PARTÍCULAS ROSADAS — HERO SECTION
// Genera pequeños círculos que caen suavemente en el lado izquierdo del hero.
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.className = 'hero-particles';
  hero.appendChild(container);

  const count = 15;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    const size     = Math.random() * 5 + 3;   // 3–8px
    const left     = Math.random() * 100;      // posición horizontal dentro del contenedor
    const delay    = Math.random() * 10;       // delay de 0–10s para que no caigan todos juntos
    const duration = Math.random() * 6 + 9;   // duración de 9–15s por partícula
    const opacity  = Math.random() * 0.35 + 0.1; // opacidad baja: 0.1–0.45

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: -${delay}s;
      animation-duration: ${duration}s;
      opacity: ${opacity};
    `;

    container.appendChild(particle);
  }
});
