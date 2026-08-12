# Impulso GEB — Design System (paquete de referencia)

Espejo en componentes React + tokens de lo que hoy vive como CSS inline
repetido a mano en `index.html`, `ruta-geb.html`, `impulso-geb.html`,
`momento-guia.html` y `momento-video.html`. La referencia legible para
humanos sigue siendo [`../styleguide.html`](../styleguide.html) — este
paquete existe para que herramientas que leen código (como Claude Design
Sync) tengan tokens y componentes reales que parsear.

**Este paquete no está wireado al sitio.** El sitio en producción sigue
siendo HTML/CSS/JS plano sin build ni framework (ver `../CLAUDE.md`). Si
cambias un valor aquí, replícalo a mano en los 5 archivos del sitio y en
`../styleguide.html`, igual que se hace hoy entre esos 5 archivos.

## Estructura

```
tokens/
  colors.css       fuente de verdad de los custom properties (:root)
  colors.ts         espejo en JS/TS + mapeo semántico pilares/fases
  typography.ts     escala tipográfica y la regla Georgia-solo-en-títulos-grandes
components/
  Button.tsx         .hero-btn/.cta-btn, .nav-cta, .lock-submit, .entrega-form button
  Badge.tsx           .badge-sage / -gold / -mist
  Card.tsx            LockCard (.lock-card) y DashCard (.dash-card/.momento-card)
  TextField.tsx       LockInput (.lock-input) y EntregaInput (.entrega-form input)
  Fab.tsx             .help-fab (botón de WhatsApp)
  PillarPill.tsx      .map-pill (mapeo color → pilar/fase)
index.ts              exports públicos del paquete
```

## Subir a Claude Design Sync

Este comando lo tienes que correr tú, escribiéndolo en el prompt de Claude
Code — pedírselo a Claude no funciona, `/design-sync` lee el árbol de
archivos directamente desde tu sesión de CLI:

```bash
cd design-system
claude
```

y dentro de Claude Code:

```
/design-sync
```

Al terminar, el sistema aparece en **Design systems** para tu org.
