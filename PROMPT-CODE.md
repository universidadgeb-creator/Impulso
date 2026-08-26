# Prompt base para sesiones de Claude Code — Impulso GEB

Pega esto al inicio de cada sesión. Lee CLAUDE.md primero (ya está en el repo, tiene toda
la arquitectura, diseño, decisiones cerradas). Este prompt solo añade el estado actual y
la tarea concreta de la sesión.

---

## Estado real del proyecto (agosto 2026)

**Infraestructura lista — no tocar sin instrucción:**
- `entrega-engine.js` — motor de entregas, no modificar directamente
- `config.js` — tiene la URL real del backend, no cambiar
- `bienvenida.html` — Sem. 0 completa: video real (`video/ruta-sem0-bienvenida.mp4`), sin transcripción (decisión
  final agosto 2026 — pasó por audio-solo y volvió a video, ver CLAUDE.md)
- `cierre.html` — espejo de bienvenida para después de Sem. 6

**Patrón de video de apertura para todas las semanas (decisión final agosto 2026):**
- `video_src` en `content/ruta-semN.json` (y `ruta-sem0.json` para bienvenida) → mp4 en `video/`. Placeholder
  `"[verificar — video de Sem. N]"` mientras no exista.
- **Sin transcripción de ningún tipo** — no hay botón, no se lee texto de ningún campo. Los videos nuevos NO
  siguen los guiones viejos (`guion_notebooklm`/`escena.eventos`, ya borrados de los JSON) — no reconstruirlos.
- No queda EscenaPlayer ni KineticPlayer — solo un `<video controls>` plano.

**Personajes (cerrado):**
- Lupita = triángulo dorado #F0C040 punta arriba
- Ana = esfera azul #6AB0F5
- Marcos = cuadrado coral #F07060

**Recursos externos ya asignados (en los JSON, no borrar):**
- Sem 1 → Test VIA (viacharacter.org)
- Sem 2 → Podcast Oso Trava
- Sem 3 → Designing Your Life (Burnett & Evans)
- Sem 4 → TED David Burkus "How to hack networking"
- Sem 5 → El hombre más rico de Babilonia
- Sem 6 → Video YouTube interés compuesto

**Lo que falta en todas las semanas (1-6):**
- Video real → copiar el `.mp4` a `video/` y apuntar `video_src` en el JSON de esa semana

**Reglas de trabajo:**
- No inventar contenido. Placeholders = `[verificar ...]`
- Push directo a main. Hacer `git status` antes de commit para no incluir basura
- Cache-busting si se reemplaza un archivo con el mismo nombre: agregar `?v=N` en `video_src`
- Si hay `index.lock` en `.git/`: borrarlo con `del .git\index.lock` antes de commitear

---

## TAREA DE ESTA SESIÓN — Sem. 1 completa

### 0. Git: deshacer commit local dañado antes de todo

```
git log --oneline -5   # verificar que el commit 4ff2315 sigue ahí
git reset HEAD~1       # deshace el commit, deja los cambios en staging
git status             # confirmar estado limpio
```

---

### 1. Merge de video y audio (ffmpeg)

Ceci va a subir dos archivos. Pregúntale sus nombres exactos antes de continuar.

```bash
apt-get install -y --no-install-recommends ffmpeg

ffmpeg -i [VIDEO_MUDO.mp4] -i [AUDIO_ELEVENLABS.mp3] \
  -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a aac -b:a 192k -shortest \
  video/ruta-sem1-apertura.mp4
```

En `content/ruta-sem1.json`, agregar al objeto `escena.audio`:
```json
"src": "video/ruta-sem1-apertura.mp4"
```
Y agregar en el nivel raíz del JSON:
```json
"video_src": "video/ruta-sem1-apertura.mp4"
```

---

### 2. Actualizar `content/ruta-sem1.json`

Reemplazar `recursos[]` con solo estos dos:

```json
"recursos": [
  {
    "icono": "📝",
    "texto": "Plantilla de las dos listas — Word",
    "url": "recursos/ruta-sem1-plantilla-listas.docx"
  },
  {
    "icono": "🧪",
    "texto": "Test VIA de Fortalezas de Carácter — 15 min, gratuito",
    "url": "https://www.viacharacter.org/survey/account/register"
  }
]
```

Reemplazar `steps[]` completo con la nueva estructura (agrega campos `checkLabel`, `noBox`, `intro`, `popup`):

```json
"steps": [
  {
    "label": "1 · Diagnóstico",
    "checkLabel": "Realizaste la meditación inicial",
    "noBox": false,
    "intro": null,
    "content": "Antes de empezar con los conceptos y actividades de esta semana, vamos a hacer un breve ejercicio de reflexión. Un espacio para calentar nuestros motores creativos y conectar con lo esencial.<br><br>Realiza la siguiente reflexión escuchando el audio. Cuando termines ve a la siguiente sección.<br><br><div class=\"audio-placeholder\"><span>▶ Audio de meditación inicial</span><span>~5 min · Toca play para comenzar</span></div>",
    "popup": {
      "title": "Diagnóstico",
      "instr": "En base a tu reflexión:",
      "fields": [
        {
          "id": "d1",
          "label": "Escribe de 3 a 5 cosas que harías sin que nadie te lo pidiera. Es decir, porque realmente lo disfrutas.",
          "tipo": "ta",
          "rows": 5
        }
      ]
    }
  },
  {
    "label": "2 · Marco",
    "checkLabel": "Entendiste el concepto de IKIGAI",
    "noBox": false,
    "intro": null,
    "content": "Antes de ir al ejercicio de esta semana, queremos profundizar en un concepto: <strong>IKIGAI</strong><br><br>El Ikigai es una palabra japonesa que significa \"razón de ser\". Más que un destino fijo, es una brújula personal que nos orienta hacia lo que da sentido a nuestra vida. Encontrarlo implica explorar cuatro preguntas esenciales:<br><br><ul><li>¿Qué amo?</li><li>¿En qué soy bueno/a?</li><li>¿Por qué me podrían pagar?</li><li>¿Qué necesita el mundo?</li></ul><br>Esta semana estaremos trabajando en las <strong>primeras 2 preguntas</strong>.<br><br>Recuerda que acercarte a conocer lo que amas y en lo que eres bueno no es una respuesta definitiva, sino una hipótesis viva que se construye, se prueba y se afina con la experiencia.",
    "popup": {
      "title": "Marco",
      "instr": "Reflexiona antes de continuar:",
      "fields": [
        {
          "id": "m1",
          "label": "Piensa en una persona real que haya encontrado su IKIGAI. Escribe su nombre.",
          "tipo": "txt"
        },
        {
          "id": "m2",
          "label": "¿Por qué crees que esta persona conoce su IKIGAI?",
          "tipo": "ta",
          "rows": 4
        }
      ]
    }
  },
  {
    "label": "3 · Aplicación",
    "checkLabel": "Encontraste tu pasión",
    "noBox": false,
    "intro": null,
    "content": "En la sección de <strong>Recursos</strong> está la plantilla de las dos listas en Word — descárgala si te es más fácil. Si prefieres a mano en un cuaderno, también sirve; lo que importa es el contenido, no el formato. El Test VIA de Fortalezas no es obligatorio, pero contestarlo puede ayudarte con el ejercicio.<br><br><strong>Parte 1. Anota lo que amas.</strong><ul><li><strong>Flujo total (flow):</strong> momentos donde el tiempo desaparece.</li><li><strong>Curiosidades que no sueltas:</strong> temas que investigas por gusto.</li><li><strong>Alegrías pequeñas del día a día:</strong> placeres micro que te iluminan.</li><li><strong>Retos que disfrutas:</strong> difíciles pero deliciosos.</li></ul>Escribe mínimo 20 ítems combinando las categorías. Sin editar, sin juicios. La regla: <em>si da energía, va; si chupa energía, no va</em>.<br><br><div class=\"tip-box tip-gold\"><strong>¿Cómo se ve una respuesta profunda?</strong><br>Superficial: \"Me gusta ver películas.\"<br>Profunda: \"Me gusta ver películas de misterio y tratar de adivinar el final antes que los demás — lo hago hasta con las series que ya vi, releyendo pistas.\"<br><br>No necesitas escribir un párrafo para cada acción, pero sí tratar de hacerlo más específico. Si tu lista se parece más al primer ejemplo, vuelve y pregúntate: ¿qué parte exactamente amo de esto?</div><br><strong>Parte 2. Anota en lo que eres bueno/a.</strong><ul><li><strong>Talentos naturales:</strong> lo que se te da casi sin esfuerzo.</li><li><strong>Habilidades aprendidas:</strong> lo que puliste con estudio, trabajo o práctica.</li><li><strong>Reconocimiento externo:</strong> lo que otros siempre dicen de ti (\"eres buenísimo/a para…\")</li><li><strong>Superpoderes diferenciales:</strong> lo que te distingue del promedio.</li></ul>Escribe mínimo 20 ítems. La regla: que al leerlos pienses: <em>\"Sí, esto soy yo\"</em>.<br><br><div class=\"tip-box tip-sage\"><strong>¿Cómo mejorar esta respuesta?</strong><br>Pregúntale a una persona real — una compañera, tu supervisor, alguien de tu casa — qué cree que se te da bien. No lo que tú imaginas que diría: lo que realmente te responda. Anota su respuesta, textual, junto a tu lista.<br><br>Si esa persona menciona algo que no habías puesto, agrégalo. Eso también cuenta — a veces los demás ven en nosotros lo que nosotros no vemos.</div><br>Ahora haremos una tercera lista, combinando las cosas que se repiten en ambas listas. ¿De lo que amas, en qué eres realmente bueno? Ese cruce es tu <strong>Pasión</strong>.",
    "popup": {
      "title": "Aplicación",
      "instr": "Registra lo que encontraste:",
      "fields": [
        { "id": "a1", "label": "Escribe 3 cosas que amas.", "tipo": "ta", "rows": 3 },
        { "id": "a2", "label": "Escribe 3 cosas en las que eres bueno/a.", "tipo": "ta", "rows": 3 },
        { "id": "a3", "label": "¿Qué apareció en el cruce de las 2 anteriores que no esperabas?", "tipo": "ta", "rows": 3 },
        { "id": "a4", "label": "¿Qué te dijo la persona a la que preguntaste que te sorprendió?", "tipo": "ta", "rows": 3 },
        { "id": "a5", "label": "Redacta tu pasión. Trata de ser específico.", "tipo": "ta", "rows": 4 }
      ]
    }
  },
  {
    "label": "4 · Caso",
    "checkLabel": null,
    "noBox": true,
    "intro": "Cada semana, leerás un caso que aplica lo que estuviste trabajando.",
    "content": "Ana lleva tres años en la recepción de su sucursal. En su lista de \"lo que amo\", la mitad de los ejemplos terminaron siendo momentos en los que explica algo a alguien más.<br><br>Cuando le preguntó a su compañera qué se le daba bien, la respuesta la sorprendió: <em>\"tienes paciencia para explicar, yo me desespero\"</em>. Ana no lo había notado nunca. Le gusta enseñar.<br><br>En el cruce Ana escribió: <em>explicar con paciencia hasta que el otro entiende</em>. Todavía no sabe para qué le va a servir, pero lo descubrirá más adelante.",
    "popup": null
  },
  {
    "label": "5 · Reflexión",
    "checkLabel": "Conversaste con un compañero",
    "noBox": true,
    "intro": null,
    "content": "El caso de Ana nos hace pensar en un concepto muy importante: somos seres sociales.<br><br>Con el objetivo de seguir reflexionando sobre tu pasión, elige a un compañero de este curso y cuéntale qué encontraste en tu cruce.<br><br>Cuando termines, da clic en <strong>Realizar entrega</strong> para registrar tu avance y revisar tus respuestas de la semana.",
    "popup": {
      "title": "Revisión final",
      "instr": "Revisa tus respuestas. Si después de platicar con tu compañero quieres editar o completar alguna, adelante.",
      "fields": "FINAL"
    }
  }
]
```

Reemplazar `checklistLabels[]`:

```json
"checklistLabels": [
  "Realizaste la meditación inicial",
  "Entendiste el concepto de IKIGAI",
  "Encontraste tu pasión",
  "Conversaste con un compañero"
]
```

Reemplazar `entrega.campos[]` — estos son los campos que se envían al backend (los colecta la UI nueva, no EntregaEngine):

```json
"entrega": {
  "campos": [
    { "id": "d1", "tipo": "textarea", "label": "Cosas que harías sin que nadie te lo pidiera" },
    { "id": "m1", "tipo": "texto", "label": "Persona que encontró su IKIGAI" },
    { "id": "m2", "tipo": "textarea", "label": "¿Por qué crees que conoce su IKIGAI?" },
    { "id": "a1", "tipo": "textarea", "label": "3 cosas que amas" },
    { "id": "a2", "tipo": "textarea", "label": "3 cosas en las que eres bueno/a" },
    { "id": "a3", "tipo": "textarea", "label": "Lo que apareció en el cruce que no esperabas" },
    { "id": "a4", "tipo": "textarea", "label": "Lo que te dijo la persona que preguntaste" },
    { "id": "a5", "tipo": "textarea", "label": "Tu pasión" },
    { "id": "r1", "tipo": "texto", "label": "Nombre del compañero con el que conversaste" },
    { "id": "r2", "tipo": "textarea", "label": "¿Qué te ayudó a reflexionar tu compañero sobre tu pasión?" }
  ]
}
```

---

### 3. Reescribir la UX de `momento-guia.html` — nuevo modelo popup-por-paso

**Contexto del cambio:** La plantilla antes usaba EntregaEngine para el formulario de entrega al final. Ahora cada paso tiene su propio popup de reflexión que se abre al dar "Siguiente →". El paso final acumula todas las respuestas + campo de compañero + NPS y las envía al backend de una sola vez. `EntregaEngine.montarIdentidad()` se mantiene (gate de identidad CURP+PIN). `EntregaEngine.montar()` ya NO se llama en esta plantilla.

**Nueva estructura de layout (3 columnas desktop, 1 columna mobile):**

**Columna izquierda — Rail "Momentos de la semana":**
- Lee `data.railItems[]` del JSON (igual que antes)
- Cada paso del autogestivo aparece como ítem clickeable: muestra ícono de check verde si está completado, círculo dorado si es el activo
- Video de apertura como primer ítem (no clickeable, solo visual)

**Columna central — Contenido del paso activo:**
- Breadcrumb: "Ruta GEB › Sem. 1 · Autogestivo" + botón "← Regresar al curso" (link a `ruta-geb.html`)
- Tags: Pilar + Duración (de `data.pilar` y `data.duracion`)
- Título: `data.titulo` (Georgia, 17px)
- Contexto: `data.contexto` (texto de introducción)
- Si el paso tiene `intro` → renderizar en itálica antes del box
- Caja de contenido: si `noBox: false` → fondo #FAFAF9 con border-left 3px dorado; si `noBox: true` → solo texto sin caja
- Contenido: `step.content` (HTML, inyectado con innerHTML). El HTML puede contener clases `.tip-box.tip-gold` y `.tip-box.tip-sage` — agregar estos estilos CSS:
  ```css
  .tip-box { border-radius: 0 6px 6px 0; padding: 10px 12px; margin-bottom: 14px; font-size: 12px; line-height: 1.65; }
  .tip-gold { background: #FFFBEB; border-left: 3px solid #F0C040; color: #78350F; }
  .tip-gold strong { color: #92400E; font-size: 11px; }
  .tip-sage { background: #F0FDF4; border-left: 3px solid #7EC8A0; color: #166534; }
  .tip-sage strong { color: #14532D; font-size: 11px; }
  .audio-placeholder { background: #F0F9FF; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
  ```
- Nav inferior: botón "← Anterior" (deshabilitado en paso 0) + contador "X de 5" + botón "Siguiente →" (último paso: "Realizar entrega", fondo sage)

**Al dar clic en "Siguiente →":**
- Si `step.popup !== null` → abrir popup de ese paso
- Si `step.popup === null` (Caso) → avanzar directo al siguiente paso, marcar check si tiene `checkLabel`
- Si es el último paso ("Realizar entrega") → abrir popup FINAL

**Popup por paso:**
- Overlay semitransparente sobre toda la pantalla (o bottom-sheet en mobile)
- Título: `step.popup.title`
- Instrucción: `step.popup.instr`
- Campos: renderizar según `step.popup.fields[]` (tipo `txt` → `<input type="text">`, tipo `ta` → `<textarea rows="N">`)
- Si `step.popup.fields === "FINAL"` → popup especial (ver abajo)
- Botón "Guardar y continuar": guarda respuestas en objeto `answers{}` en memoria, cierra popup, avanza al siguiente paso, marca check del paso actual si tiene `checkLabel`

**Popup FINAL (Reflexión → "Realizar entrega"):**
- Título: "Revisión final"
- Instrucción: "Revisa tus respuestas. Si después de platicar con tu compañero quieres editar o completar alguna, adelante."
- Renderizar secciones agrupadas por paso (Diagnóstico / Marco / Aplicación) con los campos guardados en `answers{}` — editables, no solo lectura
- Agregar sección "Reflexión" con 2 campos nuevos:
  - `r1`: texto — "Nombre del compañero con el que conversaste"
  - `r2`: textarea — "¿Qué te ayudó a reflexionar tu compañero sobre tu pasión?"
- Agregar campo NPS al final: escala 0-10, requerido (`*`). Label: "¿Qué tan útil fue esta semana?"
- Botón "Realizar entrega" (fondo sage): recolecta `answers{}` + `r1` + `r2` + NPS, valida que NPS esté seleccionado, envía a `CONFIG.BACKEND` junto con identidad (`geb_identidad` de localStorage), muestra pantalla de éxito

**Pantalla de éxito (reemplaza todo el layout, igual que Sem. 0):**
```
🎉
¡Felicidades, terminaste la Semana 1!
Tu entrega fue enviada.
La Semana 2 estará disponible el día lunes.
[Botón: ← Regresar al curso → ruta-geb.html]
```

**Columna derecha — Panel de recursos + avance:**

Panel 1 — Recursos:
- Lee `data.recursos[]` del JSON
- Cada recurso: icono + texto + flecha si tiene URL (abre en nueva pestaña)

Panel 2 — Avance de la semana:
- Checklist visual de los pasos con `checkLabel` no nulo
- Check verde = paso completado (después de guardar su popup)
- Estado persiste en memoria de sesión (no localStorage)
- El botón "Realizar entrega" aparece SOLO en el centro (último paso), no aquí

**Mobile (max-width: 900px):**
- Una columna: Centro → Rail → Panel
- Nada se oculta

---

### 4. Renombrar la plantilla Word para que coincida con el JSON

El archivo llegará como `GEB_Ruta_Sem1_Plantilla-Listas.docx` en la carpeta `recursos/`.
Renómbralo para que coincida con la URL del JSON:

```bash
mv recursos/GEB_Ruta_Sem1_Plantilla-Listas.docx recursos/ruta-sem1-plantilla-listas.docx
```

---

### 5. Commit y push

```bash
git status   # revisar que solo estén los archivos correctos
git add content/ruta-sem1.json momento-guia.html video/ruta-sem1-apertura.mp4 recursos/ruta-sem1-plantilla-listas.docx
git commit -m "feat: Sem. 1 completa — nueva UX popup-por-paso, video apertura, JSON y plantilla"
git push origin main
```
