// ============================
// FORMULARIO DE CONTACTO
//
// Este script envía los datos del formulario a un endpoint del servidor.
// Cuando tengas listo el archivo que procesa el email, solo cambiá
// la variable ENDPOINT_URL por la ruta correcta.
// ============================

// 🔧 CUANDO AGREGUES EL ARCHIVO DE ENVÍO DE EMAIL, cambiá esta URL
//    por la ruta de tu script. Ejemplos:
//      '/api/contact'         → si usás Node.js + Express
//      'send-email.php'       → si usás PHP
const ENDPOINT_URL = '/api/contact';

// ============================
// FUNCIÓN: ENVIAR FORMULARIO
// Toma los datos del form y los manda al servidor con fetch().
// ============================
async function handleFormSubmit(event) {
  // Evita que la página se recargue al hacer submit
  event.preventDefault();

  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const button = form.querySelector('.form-button');

  // Leemos los valores de cada campo
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validación básica antes de enviar
  if (!name || !email || !message) {
    showStatus('Por favor completá todos los campos.', 'error');
    return;
  }

  // Deshabilitamos el botón mientras se envía
  button.disabled = true;
  button.textContent = 'Enviando...';

  try {
    // Enviamos los datos al servidor en formato JSON
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      showStatus('¡Mensaje enviado! Me pondré en contacto pronto.', 'success');
      form.reset();
    } else {
      showStatus('Hubo un error al enviar. Intentá de nuevo.', 'error');
    }

  } catch {
    // Si no hay servidor todavía, esto se dispara — es normal en desarrollo
    showStatus('No se pudo conectar con el servidor. Intentá más tarde.', 'error');
  }

  // Restauramos el botón
  button.disabled = false;
  button.textContent = 'Enviar';
}

// ============================
// FUNCIÓN: MOSTRAR MENSAJE DE ESTADO
// Muestra éxito o error debajo del formulario.
// ============================
function showStatus(message, type) {
  const statusEl = document.getElementById('form-status');
  statusEl.textContent = message;
  statusEl.className = `form-status form-status--${type}`;
}

// Escuchamos el evento submit del formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
