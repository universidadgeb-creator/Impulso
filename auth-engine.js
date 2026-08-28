/**
 * Motor de login — Ruta GEB / Impulso GEB
 * Reemplaza la contraseña compartida de curso + el registro CURP/PIN por
 * una sola contraseña individual por persona, que además la identifica.
 * Se pega una vez en cada página con candado (ruta-geb.html, bienvenida.html,
 * momento-guia.html, momento-video.html, cierre.html) — nunca se vuelve a
 * tocar por semana.
 *
 * No es seguridad real: la lista de contraseñas vive en content/usuarios.json,
 * un archivo público que cualquiera con el código fuente puede leer — mismo
 * nivel de "seguridad" que la contraseña compartida que reemplaza, solo que
 * ahora cada quien tiene la suya y el sitio sabe quién es quién.
 */

const AuthEngine = (function () {

  const CLAVE_SESION = 'geb_sesion';
  let usuariosCache = null;

  function cargarUsuarios() {
    if (usuariosCache) return Promise.resolve(usuariosCache);
    return fetch('content/usuarios.json')
      .then(r => r.json())
      .then(data => {
        usuariosCache = data.usuarios || [];
        return usuariosCache;
      });
  }

  function sesionActual() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_SESION));
    } catch (e) {
      return null;
    }
  }

  function estaLogueado() {
    return !!sesionActual();
  }

  function intentarLogin(password) {
    return cargarUsuarios().then(usuarios => {
      const encontrado = usuarios.find(u => u.password === password.trim());
      if (!encontrado) return { ok: false };
      const sesion = { id: encontrado.id, nombre: encontrado.nombre, admin: !!encontrado.admin };
      localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
      return { ok: true, sesion };
    });
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
  }

  // Cuentas admin (Ceci, Julia) ven todas las semanas sin candado de
  // calendario en ningún lado del sitio — es un dato de la cuenta, no un
  // parámetro secreto de URL.
  function esAdmin() {
    const s = sesionActual();
    return !!(s && s.admin);
  }

  return { estaLogueado, sesionActual, intentarLogin, cerrarSesion, esAdmin };
})();
