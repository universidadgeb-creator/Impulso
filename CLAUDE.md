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
  pregunta para profundizar).

## Personajes (Lupita, Ana, Marcos) — solo referencia narrativa

Lupita, Ana y Marcos son formas geométricas puras (Lupita: triángulo dorado #F0C040;
Ana: esfera azul claro #6AB0F5; Marcos: cuadrado de esquinas redondeadas coral #F07060),
usadas como voces narradoras en el `guion_notebooklm`/`escena.eventos` de cada semana.
Desde agosto 2026 (ver "Videos de apertura — decisión de quitarlos" abajo) ya no tienen
representación visual en la plataforma — solo aparecen nombradas dentro del audio.

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

## Videos de apertura — decisión de quitarlos (agosto 2026)

**Decisión: ya no hay video de apertura semanal en ninguna vista de la plataforma —
solo el audio narrado + un botón de transcripción.** Aplica a `bienvenida.html` (Sem. 0)
y a `momento-guia.html` (Sem. 1-6 y cualquier semana futura de Ruta GEB). No aplica a
las CONFERENCIAS (`momento-video.html`, ritmo CONF de la malla) — eso no se tocó.

Se abandonó la producción de video (Claude Design MP4 mudo + mezcla ffmpeg con audio de
ElevenLabs + el intento fallido, dos veces, de sincronizar subtítulos VTT al video) en
favor de algo mucho más simple: un `<audio controls>` plano con el mp3 de ElevenLabs, más
el botón **"📄 Ver transcripción"** ya existente que muestra `guion_notebooklm` (o, si no
existe, el texto de `escena.eventos[].texto` concatenado) — sin intentar sincronizar nada
al tiempo de reproducción.

- El campo que cada semana usa para el audio: `audio_src` en `content/ruta-sem0.json`
  (bienvenida), `escena.audio.src` en `content/ruta-sem1.json` en adelante (momento-guia).
  El campo legado `video_src` ya no se lee en ningún lado — no volver a agregarlo.
- Se borraron `escena-player.js`/`escena-player.css` (EscenaPlayer) y el KineticPlayer
  (texto cinético sincronizado, vivía en `momento-guia.html`) — ya no se renderiza ningún
  personaje/escena visual, solo el reproductor de audio nativo.
- Se borraron los `.mp4` de apertura ya producidos (`video/ruta-sem0-bienvenida.mp4`,
  `ruta-sem1-apertura.mp4`, `ruta-sem2-apertura.mp4`, `ruta-sem1-mudo.mp4`) — no se vuelven
  a producir. Los `.mp3` de ElevenLabs sí se conservan y siguen siendo la fuente de verdad
  (`audio/`).
- `historial-decisiones.md` (bitácora para la skill `director-video-geb`, que armaba los
  guiones de escena semana a semana) queda como registro histórico de los guiones ya
  aprobados, pero esa skill ya no aplica a los audios de apertura — no generar más
  entradas ahí para semanas nuevas de Ruta GEB.
- `sistema-diseno-animaciones.html` (elenco/sets de escena) también queda como referencia
  histórica, sin uso activo en la plataforma.
