// ============================
// FORMULARIO MEYZINE
// Envía el email del suscriptor al servidor.
// Cuando tengas el backend listo, cambiá ENDPOINT_URL por tu ruta.
// ============================

// 🔧 Cambiá esta URL cuando agregues el archivo de envío de email
const ENDPOINT_URL = '/api/contact';

async function handleFormSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById('form-status');
  const button   = document.querySelector('.form-button');
  const email    = document.getElementById('email').value.trim();

  if (!email) {
    showStatus('Por favor ingresá tu email.', 'error');
    return;
  }

  button.disabled = true;
  button.textContent = 'Enviando...';

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      showStatus('¡Listo! Te avisamos cuando haya un nuevo Meyzine.', 'success');
      document.getElementById('contact-form').reset();
    } else {
      showStatus('Hubo un error. Intentá de nuevo.', 'error');
    }
  } catch {
    showStatus('No se pudo conectar con el servidor. Intentá más tarde.', 'error');
  }

  button.disabled = false;
  button.textContent = 'Enviar';
}

function showStatus(message, type) {
  const statusEl = document.getElementById('form-status');
  statusEl.textContent = message;
  statusEl.className = `form-status form-status--${type}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
