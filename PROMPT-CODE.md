# Prompt de inicio para sesiones de Claude Code — Impulso GEB

Pega esto al inicio de cada sesión de Code antes de pedir cualquier cambio.

---

Lee primero `CLAUDE.md` — ahí está toda la arquitectura, sistema de diseño, decisiones cerradas y preferencias de Ceci. No empieces a editar nada sin haberlo leído.

## Contexto del proyecto

Sitio estático para **Ruta GEB** e **Impulso GEB**, programas de movilidad social interna de GEB. HTML/CSS/JS plano, sin framework, desplegado en GitHub Pages.

- Repo: `universidadgeb-creator/Impulso`
- Live: `https://universidadgeb-creator.github.io/Impulso/`
- Rama: `main` — push directo

## Estado actual (agosto 2026)

**Lo que está terminado:**
- `bienvenida.html` — Sem. 0 completa: video MP4 + caja de subtítulos VTT + diagnóstico 10 preguntas
- `content/ruta-sem1.json` a `ruta-sem6.json` — estructura base, recursos externos asignados a cada semana
- `content/ruta-sem0.json` — `video_src` y `subtitulos_src` apuntando a archivos en `video/` y `subs/`
- `video/ruta-sem0-bienvenida.mp4` y `audio/ruta-sem0-bienvenida.mp3` — producidos y mezclados

**Personajes (decisión cerrada):**
- Lupita = triángulo equilátero dorado #F0C040, punta arriba
- Ana = esfera azul #6AB0F5
- Marcos = cuadrado esquinas redondeadas coral #F07060
- El audio de Sem. 0 dice "soy un anillo" — hay que regenerarlo en ElevenLabs con "soy un triángulo" antes de publicar

**Recursos externos ya asignados por semana:**
- Sem 1 → Test VIA de Fortalezas (viacharacter.org)
- Sem 2 → Podcast Oso Trava "Así Encontrarás tu Propósito" (URL pendiente de confirmar en Spotify)
- Sem 3 → Designing Your Life, capítulos Workview/Lifeview (libro, sin URL)
- Sem 4 → TED David Burkus "How to hack networking"
- Sem 5 → El hombre más rico de Babilonia, caps. 1-2 (libro, sin URL)
- Sem 6 → Video YouTube interés compuesto (https://www.youtube.com/watch?v=6YiZ5SIMBdY)

## Pendiente — próximas sesiones

### 1. Cierre de propósito asistido por IA — Sem 2 (paso 5 · Reflexión)
Al terminar los 4 cuadrantes del IKIGAI, agregar en el paso de Reflexión un bloque con:
- Prompt de Claude para que el participante pegue sus 4 cuadrantes y obtenga 3 borradores de propósito de vida
- Formato del prompt: texto copiable con instrucción clara ("Pega esto en Claude o ChatGPT")
- El resultado se usa como `ikigai_frase` en Sem 3

Referencia del método: Tecmilenio (miproposito.tecmilenio.com) — 4 inputs (gustos, fortalezas VIA, "para quién", cómo impactar) → 3 propósitos generados → usuario elige/edita.

### 2. Rueda de la vida — Sem 3 (paso 1 · Diagnóstico)
Antes de escribir el plan a 24 meses, agregar la Rueda de la vida como diagnóstico de punto de partida. El participante califica 8 áreas (trabajo, finanzas, salud, familia, relaciones, desarrollo personal, ocio, propósito) del 1 al 10. Eso contextualiza el plan: "desde dónde partes hoy en toda tu vida, no solo en lo laboral."

### 3. Guiones y videos de apertura — Sem 1 a 6
Cada semana necesita su video de bienvenida (igual que Sem. 0). Flujo:
1. Guion aprobado por Ceci
2. Audio en ElevenLabs (voz Kate 1)
3. Video mudo en Claude Design (1280×720, horizontal)
4. Merge con ffmpeg: `-c:v copy -c:a aac -shortest`
5. `video_src` y `subtitulos_src` en el JSON de la semana
6. VTT con timings proporcionales (ajustar después de escuchar)

Para los guiones, Lupita habla en Sem. 0. A partir de Sem. 1, pueden rotar: Ana en Sem. 1-2 (pilar Propósito), Marcos en Sem. 5-6 (pilar Maestría/finanzas). Pendiente de confirmar con Ceci.

### 4. Contenido real en steps — Sem 1 a 6
Los `steps[]` de cada JSON tienen el contenido real de las guías (5 pasos: Diagnóstico, Marco, Aplicación, Caso, Reflexión). Sem 1 está completa. Sem 2-6 están pendientes de revisión de contenido con Ceci.

## Reglas de trabajo

- **No inventar contenido.** Placeholders se marcan `[verificar ...]`, no se rellenan con algo plausible.
- **Tipografía:** Georgia solo en títulos grandes (`h1`, `h2`). Todo lo demás sans.
- **Un archivo a la vez:** afinar Ruta GEB antes de tocar Impulso GEB.
- **Push directo a main.** No hay PRs. Hacer `git status` antes de cualquier commit para no incluir cambios no relacionados.
- **ffmpeg no viene instalado.** Hay que instalarlo cada sesión: `winget install ffmpeg` o equivalent.
- **Cache-busting:** si se reemplaza un video/audio con el mismo nombre, agregar `?v=N` en el JSON.
- El lock de git (`.git/index.lock`) aparece cuando dos procesos de Code corren simultáneamente — borrarlo con `del .git\index.lock` antes de commitear.
