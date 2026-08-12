/**
 * Motor de entregas — Ruta GEB / Impulso GEB
 * Lee entrega.campos[] del JSON de cada semana y arma el formulario solo.
 * Se pega una vez en momento-guia.html (y momento-video.html si aplica) — las
 * semanas nunca vuelven a tocar este archivo, solo su propio JSON.
 *
 * Reglas que este motor hace cumplir, no solo documenta:
 *  - Todo campo con modo "local" se guarda SOLO en localStorage. Nunca entra al
 *    objeto que se manda al backend, sin importar lo que diga el JSON de esa
 *    semana. Doble candado: esto en el cliente, el prefijo local_ en el servidor.
 *  - Todo campo se autoguarda en cada cambio, sin botón de "guardar". Perder el
 *    trabajo de alguien por no darle a un botón no es un error que nos podamos
 *    permitir con esta población.
 *  - La identidad (CURP + nombre) se captura una sola vez y se reutiliza en las
 *    46 semanas — nunca se vuelve a pedir.
 */

const EntregaEngine = (function () {

  const CLAVE_IDENTIDAD = 'geb_identidad';

  function claveLocal(curso, semana) {
    return `geb_entrega_${curso}_${semana}`.replace(/\s+/g, '_');
  }

  // ---------------------------------------------------------------- Identidad

  function obtenIdentidad() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_IDENTIDAD) || 'null');
    } catch (e) {
      return null;
    }
  }

  function guardaIdentidad(curp, nombre, pin) {
    localStorage.setItem(CLAVE_IDENTIDAD, JSON.stringify({ curp, nombre, pin: pin || null }));
  }

  // ---------------------------------------------------------------- Identidad

  function esCurpValido(v) {
    return /^[A-Z0-9]{18}$/i.test(String(v).trim());
  }

  function esPinValido(v) {
    return /^\d{4}$/.test(String(v).trim());
  }

  function renderIdentidad(contenedor, alGuardar) {
    contenedor.innerHTML = '';

    const caja = document.createElement('div');
    caja.className = 'identidad-caja';

    const intro = document.createElement('p');
    intro.className = 'identidad-intro';
    intro.textContent = 'Antes de tu primera entrega, regístrate. Solo se pide una vez — ' +
      'en las próximas semanas ya no te lo vamos a preguntar.';
    caja.appendChild(intro);

    const nombre = document.createElement('input');
    nombre.type = 'text';
    nombre.placeholder = 'Tu nombre completo';
    nombre.className = 'identidad-input';

    const curp = document.createElement('input');
    curp.type = 'text';
    curp.placeholder = 'Tu CURP';
    curp.maxLength = 18;
    curp.className = 'identidad-input';
    curp.style.textTransform = 'uppercase';

    const pin = document.createElement('input');
    pin.type = 'tel';
    pin.inputMode = 'numeric';
    pin.maxLength = 4;
    pin.placeholder = 'Los últimos 4 dígitos de tu celular';
    pin.className = 'identidad-input';

    const pinHint = document.createElement('div');
    pinHint.className = 'campo-hint';
    pinHint.textContent = 'Con esto puedes recuperar tus entregas si algún día cambias de ' +
      'celular. No te lo vamos a volver a pedir para entregar.';

    const error = document.createElement('div');
    error.className = 'identidad-error';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'campo-enviar';
    btn.textContent = 'Guardar y continuar';
    btn.addEventListener('click', () => {
      const v = { nombre: nombre.value.trim(), curp: curp.value.trim().toUpperCase(), pin: pin.value.trim() };

      if (!v.nombre) return mostrarError('Falta tu nombre.');
      if (!esCurpValido(v.curp)) return mostrarError('El CURP debe tener 18 caracteres.');
      if (!esPinValido(v.pin)) return mostrarError('Escribe los 4 dígitos de tu celular.');

      guardaIdentidad(v.curp, v.nombre, v.pin);
      alGuardar();
    });

    function mostrarError(msg) { error.textContent = msg; }

    caja.appendChild(nombre);
    caja.appendChild(curp);
    caja.appendChild(pin);
    caja.appendChild(pinHint);
    caja.appendChild(error);
    caja.appendChild(btn);
    contenedor.appendChild(caja);
  }

  // ---------------------------------------------------------------- Storage local

  function cargaGuardado(curso, semana) {
    try {
      return JSON.parse(localStorage.getItem(claveLocal(curso, semana)) || '{}');
    } catch (e) {
      return {};
    }
  }

  function guardaValor(curso, semana, id, valor) {
    const datos = cargaGuardado(curso, semana);
    datos[id] = valor;
    localStorage.setItem(claveLocal(curso, semana), JSON.stringify(datos));
    return datos;
  }

  // ---------------------------------------------------------------- Derivados

  function calculaDerivado(campo, datos) {
    try {
      // Solo ve los valores ya guardados, nada del scope global. El formula
      // la escribe Ceci en el diseño de contenido, no llega del participante.
      const nombres = Object.keys(datos);
      const valores = nombres.map(n => Number(datos[n]) || datos[n] || 0);
      const fn = new Function(...nombres, `return (${campo.formula});`);
      return fn(...valores);
    } catch (e) {
      return '';
    }
  }

  function recalculaDerivados(campos, datos) {
    campos.filter(c => c.modo === 'derivado').forEach(c => {
      datos[c.id] = calculaDerivado(c, datos);
    });
    return datos;
  }

  // ---------------------------------------------------------------- Render de un campo

  function renderCampo(campo, valorActual) {
    const wrap = document.createElement('div');
    wrap.className = 'campo-entrega';
    wrap.dataset.id = campo.id;
    wrap.dataset.modo = campo.modo;

    const label = document.createElement('label');
    label.className = 'campo-label';
    label.textContent = campo.label;
    wrap.appendChild(label);

    if (campo.hint) {
      const hint = document.createElement('div');
      hint.className = 'campo-hint';
      hint.textContent = campo.hint;
      wrap.appendChild(hint);
    }

    let input;

    switch (campo.tipo) {

      case 'lista': {
        input = document.createElement('textarea');
        input.rows = Math.min(campo.filas || 6, 20);
        input.placeholder = 'Un renglón por idea';
        input.value = Array.isArray(valorActual) ? valorActual.join('\n') : (valorActual || '');
        break;
      }

      case 'textarea': {
        input = document.createElement('textarea');
        input.rows = 4;
        input.value = valorActual || '';
        break;
      }

      case 'numero': {
        input = document.createElement('input');
        input.type = 'number';
        input.inputMode = 'numeric';
        input.value = valorActual || '';
        break;
      }

      case 'seleccion': {
        input = document.createElement('select');
        (campo.opciones || []).forEach(op => {
          const o = document.createElement('option');
          o.value = op; o.textContent = op;
          if (op === valorActual) o.selected = true;
          input.appendChild(o);
        });
        break;
      }

      case 'radio': {
        input = document.createElement('div');
        input.className = 'campo-radios';
        (campo.opciones || []).forEach(op => {
          const id = `${campo.id}_${op}`.replace(/\s+/g, '_');
          const item = document.createElement('label');
          item.className = 'campo-radio-item';
          item.innerHTML = `<input type="radio" name="${campo.id}" value="${op}" id="${id}"
            ${op === valorActual ? 'checked' : ''}> ${op}`;
          input.appendChild(item);
        });
        break;
      }

      case 'escala': {
        input = document.createElement('div');
        input.className = 'campo-escala';
        const opciones = campo.opciones || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        opciones.forEach(op => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'campo-escala-btn' + (String(valorActual) === String(op) ? ' sel' : '');
          b.textContent = op;
          b.dataset.val = op;
          b.addEventListener('click', () => {
            input.querySelectorAll('.campo-escala-btn').forEach(x => x.classList.remove('sel'));
            b.classList.add('sel');
            input.dispatchEvent(new Event('input', { bubbles: true }));
          });
          input.appendChild(b);
        });
        break;
      }

      case 'calculado': {
        input = document.createElement('div');
        input.className = 'campo-calculado';
        input.textContent = (valorActual === undefined || valorActual === '') ? '—' : valorActual;
        break;
      }

      case 'texto3': {
        input = document.createElement('div');
        input.className = 'campo-texto3';
        const valores = Array.isArray(valorActual) ? valorActual : ['', '', ''];
        for (let i = 0; i < 3; i++) {
          const line = document.createElement('input');
          line.type = 'text';
          line.placeholder = `${i + 1}`;
          line.value = valores[i] || '';
          line.dataset.idx = i;
          input.appendChild(line);
        }
        break;
      }

      default: {
        input = document.createElement('input');
        input.type = 'text';
        input.value = valorActual || '';
      }
    }

    if (campo.tipo !== 'escala') {
      input.className = (input.className ? input.className + ' ' : '') + 'campo-input';
    }
    wrap.appendChild(input);

    return wrap;
  }

  // ---------------------------------------------------------------- Lectura de un campo renderizado

  function leeCampo(wrap, campo) {
    if (campo.tipo === 'lista') {
      return wrap.querySelector('.campo-input').value
        .split('\n').map(s => s.trim()).filter(Boolean);
    }
    if (campo.tipo === 'radio') {
      const marcado = wrap.querySelector('input[type="radio"]:checked');
      return marcado ? marcado.value : '';
    }
    if (campo.tipo === 'texto3') {
      return Array.from(wrap.querySelectorAll('.campo-texto3 input')).map(i => i.value);
    }
    if (campo.tipo === 'calculado') {
      return wrap.querySelector('.campo-calculado').textContent;
    }
    if (campo.tipo === 'escala') {
      const sel = wrap.querySelector('.campo-escala-btn.sel');
      return sel ? sel.dataset.val : '';
    }
    return wrap.querySelector('.campo-input').value;
  }

  // ---------------------------------------------------------------- API pública

  /**
   * Pinta el formulario completo dentro de `contenedor` y conecta el
   * autoguardado. `onEnviar` recibe (payload) ya limpio de campos locales,
   * listo para mandar al backend.
   */
  function montar(contenedor, { curso, semana, campos, onEnviar }) {
    if (!obtenIdentidad()) {
      renderIdentidad(contenedor, () => montar(contenedor, { curso, semana, campos, onEnviar }));
      return;
    }

    contenedor.innerHTML = '';

    let datos = recalculaDerivados(campos, cargaGuardado(curso, semana));
    const wraps = {};

    campos.forEach(campo => {
      const wrap = renderCampo(campo, datos[campo.id]);
      wraps[campo.id] = wrap;
      contenedor.appendChild(wrap);

      if (campo.tipo === 'calculado') return; // no se edita, se recalcula solo

      wrap.addEventListener('input', () => {
        datos[campo.id] = leeCampo(wrap, campo);
        datos = recalculaDerivados(campos, datos);
        guardaValor(curso, semana, campo.id, datos[campo.id]);

        // refresca cualquier campo calculado en pantalla sin re-pintar todo
        campos.filter(c => c.modo === 'derivado').forEach(c => {
          const cwrap = wraps[c.id];
          if (cwrap) cwrap.querySelector('.campo-calculado').textContent =
            (datos[c.id] === '' ? '—' : datos[c.id]);
          guardaValor(curso, semana, c.id, datos[c.id]);
        });
      });
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'campo-enviar';
    btn.textContent = 'Enviar mi entrega';
    contenedor.appendChild(btn);

    const estado = document.createElement('div');
    estado.className = 'campo-estado';
    contenedor.appendChild(estado);

    btn.addEventListener('click', () => enviar(curso, semana, campos, datos, onEnviar, btn, estado));

    return { datos, wraps, estado };
  }

  async function enviar(curso, semana, campos, datos, onEnviar, boton, estado) {
    const identidad = obtenIdentidad();
    if (!identidad || !identidad.curp) {
      alert('Falta tu identidad. Ve al inicio del curso para registrarte primero.');
      return;
    }

    // Campos marcados requerido:true bloquean el envío si faltan — antes de tocar la red.
    const faltantes = campos.filter(c =>
      c.requerido && (datos[c.id] === undefined || datos[c.id] === '' ||
        (Array.isArray(datos[c.id]) && datos[c.id].length === 0))
    );
    if (faltantes.length) {
      if (estado) {
        estado.textContent = `Falta responder: ${faltantes.map(c => c.label).join(', ')}`;
        estado.classList.add('err');
      }
      return;
    }
    if (estado) estado.classList.remove('err');

    // Filtro por modo, la primera red — el servidor tiene la segunda por prefijo.
    const paraEnviar = {};
    campos.forEach(c => {
      if (c.modo === 'local') return;
      if (datos[c.id] === undefined || datos[c.id] === '') return;
      paraEnviar[c.id] = datos[c.id];
    });

    const payload = {
      id: identidad.curp,
      nombre: identidad.nombre,
      curso, semana,
      campos: paraEnviar
    };

    if (!identidad.pinEnviado) {
      payload.pin = identidad.pin;
    }

    boton.disabled = true;
    boton.textContent = 'Enviando…';

    try {
      const resultado = await onEnviar(payload);
      if (resultado && resultado.ok) {
        if (resultado.pinRegistrado) {
          identidad.pinEnviado = true;
          guardaIdentidad(identidad.curp, identidad.nombre, identidad.pin);
        }
        boton.textContent = '✓ Entregado';
      } else {
        boton.disabled = false;
        boton.textContent = 'Reintentar envío';
      }
    } catch (e) {
      boton.disabled = false;
      boton.textContent = 'Reintentar envío';
    }
  }

  return { montar, montarIdentidad: renderIdentidad, obtenIdentidad, guardaIdentidad, cargaGuardado };
})();
