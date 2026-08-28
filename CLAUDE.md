# Impulso GEB — sitio del programa

Landing pública + plataforma de aprendizaje (vistas de curso) para **Ruta GEB** e
**Impulso GEB**, los dos programas de movilidad social interna de GEB (GEB University,
Generación 2). Sitio estático, sin build ni framework: HTML/CSS/JS plano, un archivo
por página, desplegado directo a GitHub Pages.

- Repo: `universidadgeb-creator/Impulso` (remote `origin`)
- Live: `https://universidadgeb-creator.github.io/Impulso/`
- Rama de trabajo: `main` (push directo, sin PRs vistos hasta ahora)
- WhatsApp de contacto usado en todos los CTA: `https://wa.me/523314112703`

## Estructura de archivos

```
index.html            Landing pública (una sola página larga, todas las secciones con anchors internos)
ruta-geb.html          Plataforma — Ruta GEB (vista de curso, gate por contraseña)
impulso-geb.html       Plataforma — Impulso GEB (vista de curso, gate por contraseña)
momento-guia.html      Plantilla reutilizable de "momento" tipo guía/autogestivo (AUT)
momento-video.html     Plantilla reutilizable de "momento" tipo video (CONF, P2P, etc.)
mallas/
  malla-ruta-geb.pdf     Malla curricular oficial de Ruta GEB (6 semanas) — fuente de verdad
  malla-impulso-geb.pdf  Malla curricular oficial de Impulso GEB (39 semanas) — fuente de verdad
.claude/
  launch.json          Config del dev server (ver abajo)
  serve.ps1            Servidor estático mínimo en PowerShell
```

No hay `package.json`, build step, ni dependencias. Todo el CSS y JS vive inline en
cada `.html` (no hay hoja de estilos ni bundle compartido) — cambios de diseño
compartidos (tokens de color, tipografía, nav, lock screen) se replican a mano en
cada archivo que los usa.

### Por qué existe `.claude/serve.ps1`
La máquina de desarrollo no tiene Python ni Node instalados (solo el alias de
Microsoft Store, que no sirve). `serve.ps1` es un servidor HTTP estático mínimo en
PowerShell puro (usa `System.Net.HttpListener`) para poder previsualizar el sitio con
`preview_start` sin depender de esas herramientas. Sirve todo el directorio del
proyecto en `http://localhost:3456/`.

## Sistema de diseño

### Paleta (CSS custom properties, repetidas en cada archivo)
```css
--void:    #080C14   /* fondo general */
--deep:    #0D1525   /* fondo de sección alterna */
--mid-bg:  #111B2E
--surface: #172038   /* tarjetas/nav oscuros, lock screen */
--border:  rgba(255,255,255,0.08)
--sage:    #7EC8A0   /* color primario / CTA / éxito */
--gold:    #F0C040   /* acento secundario / pilar "Propósito" */
--coral:   #F07060   /* alerta / pilar "Transición" / fase Lanzamiento */
--blue-hi: #6AB0F5   /* pilar "Maestría" / fase Forja */
--white:   #FFFFFF
--fog:     rgba(255,255,255,0.55)  /* texto secundario sobre fondo oscuro */
--mist:    rgba(255,255,255,0.3)   /* texto terciario/placeholder */
```

Colores de "pilar" (usados en las mallas curriculares, consistentes en todo el sitio):
- 🟠 Propósito → gold
- 🔵 Maestría → blue-hi
- 🟢 Comunidad → sage
- Transición/Integración (entre pilares) → coral

Colores de fase de Impulso GEB: Forja = blue-hi, Producción = gold, Lanzamiento = coral.

Las tarjetas de "plataforma" (dashboard, momento) usan un esquema **claro** (blanco/crema
`linear-gradient(180deg,#FFFFFF,#F7F5F0)`, texto `#14181F`) flotando sobre el fondo oscuro
del sitio — el resto del sitio (landing) es oscuro de punta a punta.

### Tipografía — regla importante
Body font: `'Segoe UI','Helvetica Neue',Arial,sans-serif` (sans, todo el texto por defecto).
Georgia (serif) **solo** para títulos grandes y prominentes:
- `h1`, `h2` (hero, `.sec-title`, títulos de página/dashboard)
- El logo de marca "Impulso⁽ᴳᴱᴮ⁾" (20px, es identidad de marca, no un heading normal)
- Números/stats grandes tipo display (`.dedication-num` 30-42px, `.rail-pct` 30px)
- `.momento-title` (22px, título del momento — comparable al `h1` del lock screen)

**Todo lo demás** (h3, h4, labels de tarjeta, nombres de fase, títulos de semana,
preguntas de FAQ, etc.) usa la fuente sans del body, aunque antes usaba Georgia.
Esto fue un cambio explícito pedido por Ceci: no le gusta Georgia en tamaños ≤~18px,
solo en títulos de verdad grandes. Si se agrega un heading nuevo, seguir este criterio
(¿es un título grande/prominente de página o sección? → Georgia. ¿Es una etiqueta,
nombre de tarjeta o texto de apoyo? → sans, aunque el tag sea h3/h4).

### Layout / responsive
- Mobile-first con overrides en `@media(max-width:699px)` (secciones generales) y
  `@media(max-width:900px)` (layouts de 3 columnas en vistas de plataforma).
- El sitio usa mucho SVG inline decorativo (islas flotando, estrellas animadas,
  constelaciones) como fondo ambiental — se ocultan en mobile y se reemplazan por
  `.mobile-visual` (versiones simplificadas) donde aplica.
- Las vistas de plataforma con 3 columnas (rail izq · centro · panel der) colapsan a
  una sola columna apilada en mobile — **nada se oculta**, todo el contenido queda
  visible en orden: centro → rail (temario) → panel (recursos/entrega). Antes el rail
  se ocultaba en mobile; se corrigió a pedido de Ceci.

## Páginas y secciones

### `index.html` — Landing pública
Una sola página, sin login, secciones en orden:
1. **Hero** — propuesta de valor, CTA WhatsApp, badges (sin costo, híbrido, abierto a todos)
2. **Journey/Path** (`.sec-journey`) — recorrido visual tipo "islas" con nodos: Ruta GEB →
   Postulación → Forja → Producción → Demo Day. Cada nodo tiene botón "Ver malla curricular"
   (abre el PDF correspondiente en `mallas/`). **No** llevan botón a la plataforma —
   la plataforma solo se accede desde el menú del header (ver abajo), a propósito.
3. **Requirements** (`.sec-reqs`) — 5 requisitos de graduación
4. **Metodología** (`.sec-method`) — los 5 "momentos"/ritmos de aprendizaje, dedicación
   promedio, modalidad híbrida
5. **Testimonials placeholder** (`.sec-proof`) — placeholder explícito, "en construcción,
   no se inventa nada" — pendiente de contenido real
6. **Objections/FAQ** (`.sec-obj`) — preguntas frecuentes en `<details>/<summary>`
7. **Filter** (`.sec-filter`) — tarjetas "sí es para ti" / "no es para ti" (autoselección)
8. **CTA final** (`.sec-cta`) — repite CTA de inscripción
9. **Footer**

Nav del sitio: logo + menú desplegable **"Plataforma"** (link a `ruta-geb.html` e
`impulso-geb.html`, cada uno con icono de candado) + botón "Inscribirme" (WhatsApp).

### `ruta-geb.html` / `impulso-geb.html` — Plataforma (dashboard por curso)
- **Gate por contraseña**, no por persona: contraseña compartida por curso, verificada
  en el cliente (no es seguridad real, cualquiera con el código fuente la ve) y
  guardada en `localStorage` tras desbloquear (`impulso_unlock_ruta` /
  `impulso_unlock_impulso`). Contraseñas actuales: `rutageb26` / `impulsogeb26`
  (constante `COURSE_PASSWORD` al inicio del `<script>` de cada archivo — cambiar ahí
  para rotarlas).
- **Ruta GEB**: vista por día (patrón inspirado en LAB10 Platform) — stepper de
  "Día 1..6" clickeable, mapeado 1:1 a las 6 semanas de la malla real. Cada módulo del
  día enlaza a `momento-guia.html` o `momento-video.html` según su tipo
  (`AUTOGESTIVO` → guía, `CONFERENCIA` → video), pasando contexto por query params
  (`curso`, `semana`, `titulo`, `pilar`). No guarda avance (no hay checkmarks reales),
  es una vista general — el desglose exacto de contenido por día queda pendiente de
  diseño (marcado con notas "[verificar ...]").
- **Impulso GEB**: todavía usa la vista anterior de semanas/fases (Forja/Producción/
  Lanzamiento, 39 semanas, compuertas, 5 requisitos de graduación) — **no** se ha
  migrado al patrón de "día" que ya tiene Ruta GEB. Es el siguiente paso cuando se
  quiera avanzar ahí.
- Ambos tienen el FAB de WhatsApp (ver abajo) visible solo después de desbloquear.

### `momento-guia.html` / `momento-video.html` — Plantillas de "momento"
Reciben contexto por query params (`?curso=&semana=&titulo=&pilar=`) y comparten el
mismo gate de contraseña que Ruta GEB. Layout de 3 columnas en desktop:

- **Rail izquierdo** — "Temario de [semana]": lista de los momentos de esa semana
  (autogestivo, tríada, el momento actual resaltado, siguiente momento). Pensado para
  crecer — Ceci espera agregar más tipos de actividad más adelante, así que esta lista
  es genérica/ampliable, no hardcodeada a AUT/CONF.
- **Centro** — contenido específico del tipo de momento:
  - *Guía*: tags, título, contexto, chips de pasos (Diagnóstico/Marco/Aplicación/Caso/
    Reflexión, clickeables), caja de instrucción del paso activo, checklist interactivo
    con contador.
  - *Video*: tags, título, reproductor placeholder, duración.
- **Panel derecho** — **siempre** presente en ambas plantillas: "Recursos necesarios"
  arriba + "Espacio de entrega" (formulario nombre/correo/liga de Drive) abajo. En
  video además incluye tabs Resumen/Discusión encima del formulario de entrega.
- Todo el contenido específico (títulos de paso, instrucciones, recursos, resumen) son
  placeholders `[verificar ...]` — el copy real se completa por separado (ver skill
  `diseno-contenido-geb` / `handoff-plataforma-geb` si se está trabajando desde ahí).

### FAB de ayuda (WhatsApp)
Botón circular flotante (💬, `.help-fab`, esquina inferior izquierda) presente en las
4 pantallas de plataforma (`ruta-geb.html`, `impulso-geb.html`, `momento-guia.html`,
`momento-video.html`), visible solo dentro de `.site-content` (post-login). Linkea a
`https://wa.me/523314112703?text=Tengo%20una%20duda%20sobre%20mi%20curso`.

## Contenido curricular (fuente de verdad: PDFs en `mallas/`)

- **Ruta GEB**: 6 semanas. Pilares Propósito (sem 1-2), Transición (sem 3), Maestría
  (sem 4-6). Ritmos: AUT (autogestivo semanal), CONF (conferencia magistral, solo cierre
  semana 6). Termina con puente de postulación hacia Impulso (ensayo → entrevista →
  selección → bootcamp).
- **Impulso GEB**: 39 semanas en 3 fases — Forja (sem 1-8, 2 meses), Producción (sem
  9-34, 6 meses), Lanzamiento (sem 35-40, ~1 mes). Ritmos: AUT, TRI (tríada semanal),
  P2P (sesión entre pares quincenal), CONF (mensual), COACH (coaching grupal mensual).
  3 compuertas (gates) + Demo Day final. 5 requisitos de graduación con semana de
  verificación.

## Preferencias de Ceci (importante para próximos cambios)

- **No poner accesos a la plataforma en la landing** (ni botones ni links sueltos) —
  el único punto de entrada a la plataforma es el menú "Plataforma" del header.
- Los cursos **no están abiertos al mismo tiempo** conceptualmente (Ruta GEB corre
  primero, Impulso GEB después) aunque ahora mismo el menú muestra ambos accesibles
  "mientras los construimos" — se espera ocultar uno cuando corresponda.
- Prioriza avanzar **una vista a la vez**: primero afinar Ruta GEB antes de replicar
  cambios a Impulso GEB (ej. la migración a vista por día se hizo solo en Ruta GEB
  a propósito).
- Tipografía: Georgia solo en títulos grandes, nunca en tamaños chicos/medianos (ver
  sección de tipografía arriba) — regla a mantener en cualquier heading nuevo.
- El panel de recursos/entrega y el rail de temario deben estar en **todas** las
  plantillas de momento, y visibles (no ocultos) en mobile, solo reordenados.
- Placeholders de copy pendiente se marcan como `[verificar ...]` — no inventar
  contenido real ahí sin que Ceci lo confirme (ver testimonios: "en construcción, no
  se inventa nada" es literal, aplica igual a otros placeholders del sitio).
- **Cajas de contenido en los momentos (`momento-guia.html`): gris neutra por
  defecto, línea de color solo para resaltar.** El contenido normal de un paso
  (Diagnóstico, Marco, Aplicación, Reflexión) va en `.step-box-neutral` — fondo gris
  claro, sin borde de color. La línea de color (`.step-box-highlight`, o los
  `tip-box` dorado/verde ya existentes dentro del contenido) se reserva para resaltar
  algo puntual: el caso de la semana (ej. la historia de Ana en Sem. 1) o una pregunta
  para profundizar. En el JSON de cada semana, el campo del paso es `"highlight":
  true/false` (reemplazó a `"noBox"`) — `true` solo en pasos tipo Caso, cuyo contenido
  se resalta a propósito; el `intro` de ese mismo paso (ej. "Cada semana, leerás un
  caso...") sigue yendo en caja gris neutra, no en la resaltada. **Lo mismo aplica a
  audio/video embebido dentro de un paso** (ej. el audio de meditación de Sem. 1, o el
  podcast de Sem. 2): el reproductor va en `highlight: true` — texto de contexto en
  `intro` (caja gris), el reproductor en `content` (caja resaltada). Aplicar este mismo
  criterio a cualquier semana nueva que se agregue: caja gris para instrucción/contexto,
  línea de color solo para lo que se quiere resaltar (caso, recurso multimedia,
  pregunta para profundizar). El audio real de un paso (ej. `audio/ruta-sem1-meditacion.mp3`)
  va como `<audio controls src="...">` de verdad dentro de `content` — nunca un div
  decorativo sin reproductor real.
- Cuando solo una **parte** del `content` de un paso necesita la caja resaltada (no todo
  el bloque) — ej. una lista corta de preguntas dentro de un párrafo más largo — se
  puede envolver esa parte directamente en el HTML con
  `<div class="step-box-highlight">...</div>`, sin marcar `highlight: true` en el paso
  completo (eso pondría TODO el contenido en la caja de color). Ver Sem. 1, paso 2
  (Marco) como referencia.
- **Los `tip-box` con formato de pregunta** (ej. "¿Cómo se ve una respuesta profunda?")
  van como `<details class="tip-box tip-TONO"><summary>La pregunta</summary>La
  respuesta...</details>` — colapsables, cerrados por defecto (nunca con `open`). Es
  HTML nativo, sin JS. Aplicar este mismo patrón a cualquier tip-box nuevo con forma de
  pregunta que se agregue en semanas futuras.
- **Un prompt de IA para copiar y pegar nunca va en caja de color** — es una
  herramienta, no algo que se "resalte". Va en `<div class="prompt-box"><span
  class="prompt-label">💬 Prompt para copiar y pegar</span><div
  class="prompt-text">...</div><button type="button"
  class="copy-prompt-btn">📋 Copiar prompt</button></div>` — `momento-guia.html` ya
  trae el listener delegado que copia `.prompt-text` al portapapeles (con fallback si
  el navegador bloquea `navigator.clipboard`), no hay que agregar JS por semana.
- **Nombres de archivos de recursos** (`recursos/*.docx`, etc.): mismo patrón que
  audio/video — `ruta-semN-descripcion-corta.docx`, minúsculas, guiones, sin prefijos
  tipo `GEB_`. Mantenerlo consistente entre semanas (ver `recursos/ruta-sem1-hoja-trabajo.docx`,
  `ruta-sem2-hoja-trabajo.docx`).
- **Orden del arreglo `recursos[]`: siempre primero la plantilla/hoja de trabajo de esa
  semana, después cualquier recurso extra** (libro, podcast, video externo, etc.).

## Sistema de diseño de contenido dentro de un "momento" (agosto 2026)

Reglas fijas para el HTML que va dentro de `content[].steps[].content` en `momento-guia.html`
(Ruta GEB, semanas 0-4 ya migradas; aplican igual a semanas futuras e Impulso GEB cuando se
migre). Todas usan clases ya definidas en el `<style>` de `momento-guia.html` — nunca estilos
inline sueltos (`style="background:rgba(...)"`) copiados de un componente a otro, que es como se
originó la inconsistencia que se corrigió esta sesión.

- **Caja de contenido de un paso**: `step-box-neutral` (gris, sin línea) por defecto siempre,
  incluido Diagnóstico — antes se usaba `highlight: true` en pasos con audio/video/podcast
  embebido, ya no: esos recursos llevan su propio color (ver siguiente punto), así que la caja
  que los envuelve vuelve a ser neutra. `step-box-highlight` (línea de color) se reserva para un
  elemento puntual dentro del contenido (el caso de la semana vía `panels`, una pregunta para
  profundizar) — nunca para todo un paso completo.
- **Recurso externo embebido dentro de un paso** (meditación, podcast, video/TED-YouTube): un
  solo componente, `resource-card` — ícono + título + fuente/autor + botón "Ir →". Color violeta
  (`#F5F2FB` fondo, `#7A5FB0` texto del botón), el único color del sitio reservado para "esto es
  multimedia externa". Variante `resource-card resource-audio` para audio real embebido: mismo
  encabezado (ícono/título/subtítulo) pero sin botón "Ir", con un `<audio controls>` real debajo
  (nunca fake — ver regla de audio real más abajo). Un libro/PDF referenciado solo en el panel de
  Recursos (no embebido en el texto) sigue usando `recurso-row`, sin cambios.
- **3 conceptos o planes en columnas** (ej. Marco de Sem. 4, Odyssey Plan A/B/C de Sem. 3):
  reutilizar `plan-grid` / `plan-card plan-a|b|c` (dorado/azul/coral en ese orden fijo) — nunca
  estilos sueltos nuevos por semana.
- **Pasos numerados dentro de una instrucción** (1, 2, 3 de una lista de acciones): `step-num-row`
  + `step-num-badge` (círculo dorado con el número).
- **Chips de personas** (ej. líderes disponibles): `people-chips` / `people-chip` — fondo de color
  rotando 4 tonos, ahora con borde izquierdo del mismo tono para que se note más.
- **`tip-box`** (pregunta colapsable) o **`tip`** (callout fijo): 4 colores disponibles —
  `tip-gold`, `tip-sage`, `tip-blue`, `tip-coral` — se elige por lo que se quiere destacar, no por
  rotación automática.
- **Botón de WhatsApp dentro de un paso** (ej. Reflexión con recordatorio de agendar algo): solo
  el botón compacto `wa-btn`, nunca envuelto en un panel/caja verde con padding — el FAB 💬 ya
  cubre "tengo dudas generales", así que un CTA inline es siempre puntual y va ligero.
- **Caso de la semana** (`panels[].illo`): si no existe una ilustración CSS diseñada para esa
  escena (`recepcion`, `oficina`, `taller`, `lista`, `lista-roja`, `conv`, `insight`,
  `insight-coral`, `mercado`), usar directamente un emoji como valor de `illo` (ej. `"😬"`) — el
  script ya trae un fallback (`illo-emoji`) que lo muestra en grande. Antes esto dejaba el panel
  vacío si el valor no coincidía con una clase CSS conocida.
- **Guión largo (—)**: no usar en texto nuevo, se lee artificial/generado por IA. Usar coma, dos
  puntos o paréntesis según el caso. Única excepción: el marcador de placeholder pendiente
  `[verificar — ...]`, que es la convención ya establecida del sitio y no cambia.
- **Footer de "momento"** (`.placeholder-note`, debajo de la tarjeta blanca en
  `momento-guia.html` y `momento-video.html`): texto fijo de copyright — "© 2026 Grupo Empresarial
  Bienestar / GEB University. Todos los derechos reservados." — ya no el aviso de plantilla
  pendiente.
- **Botón "Regresar al curso"** (`.nav-return`, en `momento-guia.html` y `bienvenida.html`): sin
  flecha "←", fondo sólido `var(--sage)` (verde azulado, el color de CTA principal del sitio) para
  que destaque en vez de ser un borde discreto.

## Personajes (Lupita, Ana, Marcos) — referencia histórica, ya no vinculante

Lupita (triángulo dorado #F0C040), Ana (esfera azul claro #6AB0F5) y Marcos (cuadrado
de esquinas redondeadas coral #F07060) eran el elenco de EscenaPlayer/KineticPlayer,
ya retirados. Los videos nuevos (ver "Videos de apertura" abajo) no siguen ese guion ni
esa coreografía — de existir personajes en el video, es decisión de cada video, no algo
que la plataforma imponga o verifique.

## Sistema de identidad + entregas (EntregaEngine, agosto 2026)

- **`entrega-engine.js`** — motor compartido, se pega una vez y las semanas nunca lo
  vuelven a tocar. Expone `EntregaEngine.montarIdentidad()` (formulario CURP+PIN, una
  sola vez, guardado en `localStorage` bajo `geb_identidad`) y `EntregaEngine.montar()`
  (arma el formulario de entrega de una semana leyendo `entrega.campos[]` del JSON de
  esa semana — tipos soportados: `texto`, `textarea`, `numero`, `lista`, `seleccion`,
  `radio`, `escala` (fila de botones, ej. NPS 0-10), `calculado`, `texto3`). Un campo
  puede llevar `requerido: true` para bloquear el envío si falta (ver NPS abajo).
- **`bienvenida.html`** — página única antes de Sem. 1, ya NO vive dentro del paso de
  Diagnóstico de S1. Ahí se registra la identidad (una sola vez para todo el curso) y se
  contesta el mini-diagnóstico de apertura (checklist de 3 pasos: video → encuesta →
  registro, cada uno bloqueado hasta completar el anterior, con popups tipo bottom-sheet).
  Todo el contenido (contexto, video, guion, preguntas) sale de `content/ruta-sem0.json`,
  nada hardcodeado.
- **`cierre.html`** — espejo de `bienvenida.html`, después de Sem. 6. No vuelve a pedir
  CURP/PIN (usa la identidad ya guardada); si no existe, bloquea con link a
  `bienvenida.html`. Contenido en `content/ruta-cierre.json`.
- **NPS en cada entrega semanal** — `momento-guia.html` inyecta un campo `escala` 0-10
  (`requerido: true`) a los `campos` de cada semana antes de llamar
  `EntregaEngine.montar()`, así no hay que tocar el JSON de cada semana para tenerlo.
  `momento-video.html` (que todavía usa el formulario estático viejo, no EntregaEngine)
  trae el mismo campo a mano.
- **`config.js`** — `CONFIG.BACKEND` es la URL real del Apps Script Web App (ya no
  placeholder). La usan `bienvenida.html`, `cierre.html`, `momento-guia.html` y
  `momento-video.html` — un solo lugar para cambiarla si el backend se mueve.

## Videos de apertura — vuelta a video real, sin guion ni transcripción (agosto 2026)

Esta sección **reemplaza** dos decisiones anteriores que ya no aplican: (1) "quitar los
videos y dejar solo audio + transcripción", y (2) el addendum que mantenía el audio de
ElevenLabs pero desactivaba la transcripción. Ambas quedaron obsoletas el mismo día —
la decisión final y vigente es esta.

**Decisión: sí hay video de apertura semanal — un `.mp4` real por semana, sin
transcripción de ningún tipo.** Aplica a `bienvenida.html` (Sem. 0) y a
`momento-guia.html` (Sem. 1-6 y cualquier semana futura de Ruta GEB). No aplica a las
CONFERENCIAS (`momento-video.html`, ritmo CONF de la malla) — eso no se tocó.

- Los videos nuevos **no siguen los guiones que se habían escrito** (`guion_notebooklm`,
  `escena.eventos[]`) — se grababan/narraban distinto. Esos campos ya no existen en los
  JSON de semana (se borraron de Sem. 0-6) y **no hay que regenerarlos ni usarlos como
  base** para producir un video — cada video nuevo se produce y se sube tal cual, sin
  guion escrito de por medio en la plataforma.
- Campo único por semana: `video_src` en `content/ruta-semN.json` (y `ruta-sem0.json`
  para bienvenida), apuntando a un archivo en `video/`. Placeholder mientras no exista:
  `"[verificar — video de Sem. N]"` — el reproductor muestra "🎬 Video por producir".
  El campo `audio_src`/`escena.audio.src` de la iteración anterior ya no se usa.
- **No hay botón de transcripción en ningún lado** — no se vuelve a agregar. El guion,
  si existe, vive únicamente dentro del video (voz), no como texto en la plataforma.
- No hay EscenaPlayer ni KineticPlayer — se borraron en la iteración anterior y siguen
  sin usarse; el reproductor es un `<video controls>` nativo, sin overlays.
- Los `.mp3` de apertura anteriores (`audio/ruta-sem0-bienvenida.mp3`,
  `ruta-sem1-apertura.mp3`, `ruta-sem2-apertura.mp3`) se borraron — ya no sirven. Sigue
  existiendo `audio/ruta-sem1-meditacion.mp3`, que es un audio distinto, embebido dentro
  de un paso de Sem. 1 (no es el audio/video de apertura semanal) — ese no se toca.
- `historial-decisiones.md` (bitácora de guiones para la skill `director-video-geb`)
  y `sistema-diseno-animaciones.html` (elenco/sets de escena) quedan como referencia
  histórica, sin ningún uso activo — no generar más entradas ahí, esa skill no aplica
  a los videos nuevos.
- Sem. 0 ya tiene su video real (`video/ruta-sem0-bienvenida.mp4`). Sem. 1-6 siguen en
  placeholder hasta que Ceci suba cada uno — cuando llegue un video nuevo, solo hay que
  copiarlo a `video/` con un nombre descriptivo y actualizar `video_src` en el JSON de
  esa semana (con `?v=N` si se reemplaza un archivo con el mismo nombre, por el
  cache-busting de GitHub Pages).

## Ajustes visuales de Ruta GEB (agosto 2026, revisión de Ceci sobre las 6 semanas)

Ronda de feedback visual sobre `momento-guia.html` y las 6 semanas de contenido. Estos
cambios **superseden** algunas reglas anteriores documentadas arriba — donde haya
conflicto, esta sección manda.

- **Tamaño de tarjeta: se revirtió el ancho ampliado.** `.momento-wrap`/`.dash-wrap`
  volvieron a `max-width:1100px`/`900px` (el valor previo a la iteración que las llevó
  a `min(96vw,1600px)`) — a Ceci le gustaba el tamaño anterior. En su lugar se subió
  ligeramente el tamaño de letra del contenido de un paso (`.step-box-neutral`,
  `.step-box-highlight`, `.momento-context`: 13px → 14.5px; `.tip-box`/`.tip`,
  `.cp-text`: 12-12.5px → 13.5px) — pedido explícito de "letra 4 niveles más grande,
  ligera, porque no se leía fácil", sin tocar el ancho de la tarjeta.
- **`.step-box-highlight` ahora usa `var(--blue-hi)`, no gold.** Colisionaba
  visualmente con `.tip-gold` (mismo color de línea, dos usos distintos). Sigue
  reservado para lo mismo (el caso de la semana, una pregunta para profundizar), solo
  cambió el color de la línea.
- **`.resource-card` con más saturación.** Fondo `#EAE2F7` (antes `#F5F2FB`, se veía
  gris, no lila) y borde `1.5px rgba(122,95,176,.4)`. Mismo cambio replicado en
  `cierre.html`.
- **Bug de subrayado corregido.** `.step-box-neutral a, .step-box-highlight a` tiene
  más especificidad que `.resource-card{text-decoration:none}`, así que un
  `resource-card` anidado dentro de un step-box salía subrayado (visible en el video
  TED de Sem. 4). Se agregó `.step-box-neutral .resource-card, .step-box-highlight
  .resource-card` (y `* `) con `text-decoration:none` explícito.
- **Todo tip-box es colapsable — ya no existen `.tip` estáticos.** Antes había una
  variante `.tip` (siempre abierta) y `.tip-box` (`<details>`, colapsable). Se
  eliminó el uso de `.tip` en el contenido: cualquier caja de tip nueva debe ser
  `<details class="tip-box tip-COLOR"><summary>...</summary>...</details>`, cerrada
  por defecto (nunca `open`). Aplica también a cajas que antes no eran colapsables
  (ej. "Regla de oro" de Sem. 4/5, "Sesión de bina" de Sem. 6).
- **`.prompt-box` (prompt de IA para copiar y pegar) ahora es un recurso visual,
  no gris neutro.** Esto reemplaza la regla anterior ("un prompt nunca va en caja de
  color, es herramienta no recurso") — pedido explícito de Ceci en Sem. 3 y Sem. 5.
  `.prompt-box` ahora comparte la paleta violeta de `.resource-card` (mismo fondo
  `#EAE2F7`, mismo borde), conserva el texto monoespaciado y el botón
  `.copy-prompt-btn` de copiar.
- **`.wa-btn`/`.lock-wa-btn` cambiaron de verde WhatsApp (`#25D366`) a
  `var(--sage)`.** Ceci lo describió como "chillante"/"horrible" — no combinaba con
  la paleta del sitio. Aplicado en los 5 archivos que definen estos botones
  (`momento-guia.html`, `momento-video.html`, `bienvenida.html`, `cierre.html`,
  `ruta-geb.html`).
- **Nuevo componente `.wa-box`.** Caja gris neutra (`background:#F3F1EC`, mismo tono
  que `.step-box-neutral`) para agrupar el texto de instrucción que antecede a un
  botón de WhatsApp dentro de un paso (ej. "¿Tienes dudas? Escríbenos:" + el botón).
  Antes ese texto iba suelto o mezclado dentro de un `.prompt-box`; ahora que
  `.prompt-box` es violeta/recurso, la instrucción de WhatsApp se separó a su propia
  caja de tono bajo. Usar este patrón para cualquier instrucción nueva que anteceda a
  un `.wa-btn`.
- **`.people-chips` ya no rota 4 colores por chip.** Ahora es una cuadrícula de 2
  columnas (`display:grid;grid-template-columns:1fr 1fr`, 1 columna en mobile
  `max-width:480px`) con chips uniformes en gris neutro (`#F3F1EC`), sin borde de
  color — Ceci pidió unificar en vez de que cada nombre tuviera un color distinto.
- **`.illo-emoji` (fallback de Caso cuando el panel usa un emoji crudo en vez de una
  ilustración CSS conocida) ya no muestra el emoji suelto y grande.** Ahora envuelve
  el emoji en `.emoji-badge` — un círculo de 52px con anillo de color (`emoji-badge-
  gold/coral/sage`, mismo lenguaje visual que `.insight-ring`), con la animación de
  pulso ya existente. El color del anillo sigue el acento de la semana
  (`accentDeSemana()`). Aplica automáticamente a cualquier semana futura cuyos
  `panels[].illo` sean emoji en vez de una de las ilustraciones CSS conocidas
  (`KNOWN_ILLOS` en `momento-guia.html`).
- **Sem. 6 ya no tiene el módulo "Conferencia magistral de cierre".** Era un
  placeholder roto (sin `data`/`url`) en `ruta-geb.html` — se quitó del arreglo
  `days`. Sem. 6 solo tiene el módulo autogestivo.
- **`cierre.html`: el mensaje final ("🎉 Gracias por cerrar tu ciclo...") ahora es un
  popup/modal**, no un bloque que aparecía inline debajo del botón de envío. Mismo
  patrón visual que el popup de paso de `momento-guia.html` (`.gracias-overlay` +
  `.cierre-gracias` como card centrada, con botón "Volver a Ruta GEB" que regresa a
  `ruta-geb.html`). El título de la entrada "Cierre" en `ruta-geb.html` se simplificó
  a "Finaliza tu experiencia de aprendizaje" (antes repetía "Cierre" y "Cierra" tres
  veces entre label, título y subtítulo).
