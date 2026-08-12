/**
 * Reproductor de escena[] — Ruta GEB / Impulso GEB
 * Lee el bloque `escena` del JSON de cada semana y anima set + elenco + subtítulos
 * sincronizado al audio real. Web Animations API pura, sin librería externa —
 * misma razón que ya se aplicó en el resto de esta plataforma: cero dependencia
 * de CDN para gente que entra con conexión inestable.
 *
 * Decisión de diseño: `accion` en cada evento gobierna las transiciones de
 * entrada/salida de un personaje. El movimiento de reposo (bob/breathe/pulsa)
 * lo decide la IDENTIDAD del personaje, no lo que diga el evento — así el
 * guion nunca tiene que especificar micro-movimiento a mano, y el carácter de
 * cada quien se mantiene consistente sin importar qué escena sea.
 */

const EscenaPlayer = (function () {

  const IDENTIDAD = {
    ana:    { forma: 'esfera',  color: '#6AB0F5', idle: 'bob' },
    marcos: { forma: 'cuadro',  color: '#F07060', idle: 'breathe' },
    lupita: { forma: 'anillo',  color: '#F0C040', idle: 'pulsa' },
  };

  const REDUCE_MOTION = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------- Keyframes

  const KEYFRAMES = {
    entra:   [{ opacity: 0, transform: 'scale(.6) translateY(10px)' },
              { opacity: 1, transform: 'scale(1) translateY(0)' }],
    sale:    [{ opacity: 1, transform: 'scale(1) translateY(0)' },
              { opacity: 0, transform: 'scale(.6) translateY(10px)' }],
    bob:     [{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)' },
              { transform: 'translateY(0)' }],
    breathe: [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
    pulsa:   [{ boxShadow: '0 0 0 0 rgba(240,192,64,.5)' },
              { boxShadow: '0 0 0 14px rgba(240,192,64,0)' }],
  };

  const DURACION = { entra: 450, sale: 350, bob: 1400, breathe: 2200, pulsa: 1600 };

  // ---------------------------------------------------------------- Utilidades

  function eventoActivo(eventos, msActual) {
    let activo = null;
    for (const ev of eventos) {
      if (ev.t <= msActual) activo = ev; else break;
    }
    return activo;
  }

  function validaTiempos(escena) {
    const dur = escena.audio && escena.audio.duracion_ms;
    if (!dur) return;
    escena.eventos.forEach(ev => {
      if (ev.t > dur) {
        console.warn(`[EscenaPlayer] evento con t=${ev.t}ms excede la duración real (${dur}ms) — el guion se sincronizó contra un audio distinto al final.`);
      }
    });
  }

  // ---------------------------------------------------------------- Personajes

  function creaPersonaje(quien) {
    const id = IDENTIDAD[quien];
    const el = document.createElement('div');
    el.className = `escena-personaje escena-personaje--${id.forma}`;
    el.style.setProperty('--color-personaje', id.color);
    el.style.opacity = '0';
    return el;
  }

  function activaPersonaje(el, quien, accion) {
    if (el._quienActual === quien && el._visible) return; // ya está activo, no repetir

    const idId = IDENTIDAD[quien];
    el.className = `escena-personaje escena-personaje--${idId.forma}`;
    el.style.setProperty('--color-personaje', idId.color);
    el._quienActual = quien;
    el._visible = true;

    detieneLoop(el);

    if (REDUCE_MOTION) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    } else {
      el.animate(KEYFRAMES.entra, { duration: DURACION.entra, easing: 'ease-out', fill: 'forwards' });
    }

    iniciaLoop(el, idId.idle);
  }

  function ocultaPersonaje(el) {
    if (!el._visible) return;
    el._visible = false;
    detieneLoop(el);

    if (REDUCE_MOTION) {
      el.style.opacity = '0';
    } else {
      el.animate(KEYFRAMES.sale, { duration: DURACION.sale, easing: 'ease-in', fill: 'forwards' });
    }
  }

  function iniciaLoop(el, tipoIdle) {
    if (REDUCE_MOTION) return;
    el._loop = el.animate(KEYFRAMES[tipoIdle], {
      duration: DURACION[tipoIdle], iterations: Infinity, easing: 'ease-in-out'
    });
  }

  function detieneLoop(el) {
    if (el._loop) { el._loop.cancel(); el._loop = null; }
  }

  // ---------------------------------------------------------------- Set y subtítulo

  function actualizaSet(contenedor, set) {
    const lienzo = contenedor.querySelector('.escena-set');
    if (lienzo.dataset.set === set) return;
    lienzo.dataset.set = set;
  }

  function actualizaSubtitulo(contenedor, texto) {
    const sub = contenedor.querySelector('.escena-subtitulo');
    if (sub.textContent === (texto || '')) return;
    sub.textContent = texto || '';
  }

  // ---------------------------------------------------------------- Render de un evento

  function aplicaEvento(contenedor, ev) {
    actualizaSet(contenedor, ev.set);
    actualizaSubtitulo(contenedor, ev.texto);

    const principal = contenedor.querySelector('.escena-personaje--principal-slot');
    const secundario = contenedor.querySelector('.escena-personaje--secundario-slot');

    if (ev.quien) {
      activaPersonaje(principal.firstChild || principal.appendChild(creaPersonaje(ev.quien)), ev.quien, ev.accion);
    } else {
      const actual = principal.firstChild;
      if (actual) ocultaPersonaje(actual);
    }

    if (ev.tipo === 'careo' && ev.quien_secundario) {
      secundario.hidden = false;
      activaPersonaje(secundario.firstChild || secundario.appendChild(creaPersonaje(ev.quien_secundario)),
        ev.quien_secundario, ev.accion_secundario || 'breathe');
    } else {
      secundario.hidden = true;
      const actual = secundario.firstChild;
      if (actual) ocultaPersonaje(actual);
    }

    contenedor.querySelector('.escena-lienzo').dataset.tipo = ev.tipo || '';
  }

  // ---------------------------------------------------------------- Estado placeholder

  function estadoPendiente(contenedor, escena) {
    contenedor.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'escena-pendiente';
    const primero = (escena.eventos && escena.eventos[0]) || {};
    box.innerHTML = `
      <div class="escena-pendiente-set" data-set="${primero.set || ''}"></div>
      <div class="escena-pendiente-label">Video en producción</div>
      ${primero.texto ? `<div class="escena-pendiente-texto">${primero.texto}</div>` : ''}
    `;
    contenedor.appendChild(box);
  }

  // ---------------------------------------------------------------- API pública

  /**
   * Monta el reproductor. Si `escena.audio.src` sigue siendo un marcador
   * [verificar ...], degrada a estado estático — nunca reproductor roto.
   */
  function montar(contenedor, escena) {
    if (!escena || !escena.audio || !escena.audio.src || /^\[verificar/i.test(escena.audio.src)) {
      estadoPendiente(contenedor, escena || { eventos: [] });
      return;
    }

    validaTiempos(escena);
    const eventos = [...escena.eventos].sort((a, b) => a.t - b.t);

    contenedor.innerHTML = `
      <div class="escena-lienzo">
        <div class="escena-set"></div>
        <div class="escena-personaje--principal-slot"></div>
        <div class="escena-personaje--secundario-slot" hidden></div>
      </div>
      <div class="escena-subtitulo" aria-live="polite"></div>
      <div class="escena-controles">
        <button type="button" class="escena-play" aria-label="Reproducir">▶</button>
        <div class="escena-progreso"><div class="escena-progreso-barra"></div></div>
      </div>
      <audio class="escena-audio" preload="none" src="${escena.audio.src}"></audio>
    `;

    const audio = contenedor.querySelector('.escena-audio');
    const btn = contenedor.querySelector('.escena-play');
    const barra = contenedor.querySelector('.escena-progreso-barra');

    btn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); btn.textContent = '⏸'; }
      else { audio.pause(); btn.textContent = '▶'; }
    });

    audio.addEventListener('ended', () => { btn.textContent = '↺'; });

    audio.addEventListener('timeupdate', () => {
      const ms = audio.currentTime * 1000;
      const ev = eventoActivo(eventos, ms);
      if (ev) aplicaEvento(contenedor, ev);
      if (audio.duration) barra.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    });

    // primer fotograma en reposo, antes de dar play
    if (eventos[0]) aplicaEvento(contenedor, eventos[0]);
  }

  return { montar };
})();
