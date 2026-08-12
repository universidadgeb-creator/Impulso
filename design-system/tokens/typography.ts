/**
 * Reglas tipográficas — Impulso GEB / Ruta GEB.
 *
 * Regla de oro (pedida explícitamente por Ceci): Georgia (serif) SOLO en
 * títulos grandes y prominentes. Todo lo demás — h3/h4, labels, nombres de
 * tarjeta, preguntas de FAQ — usa la fuente sans, sin importar el tag HTML.
 * No usar Georgia en tamaños ≤ ~18px.
 */
export const fontFamily = {
  sans: `'Segoe UI','Helvetica Neue',Arial,sans-serif`,
  serifDisplay: `Georgia,'Times New Roman',serif`,
} as const;

/** ¿Este texto amerita Georgia? Solo true para títulos grandes/prominentes. */
export type DisplayRole =
  | "hero-h1" // clamp(34–64px), 700
  | "section-h2" // .sec-title, clamp(26–40px)
  | "momento-title" // 22px
  | "brand-logo" // logo "Impulso(GEB)", 20-22px — es identidad, no heading normal
  | "display-stat"; // números grandes tipo .dedication-num / .rail-pct, 30-42px

export const typeScale = {
  heroH1: { family: fontFamily.serifDisplay, size: "clamp(34px,6vw,64px)", weight: 700, lineHeight: 1.1 },
  sectionH2: { family: fontFamily.serifDisplay, size: "clamp(26px,4vw,40px)", weight: 700, lineHeight: 1.15 },
  momentoTitle: { family: fontFamily.serifDisplay, size: "22px", weight: 700, lineHeight: 1.2 },
  brandLogo: { family: fontFamily.serifDisplay, size: "20px", weight: 700, lineHeight: 1 },
  displayStat: { family: fontFamily.serifDisplay, size: "30px", weight: 700, lineHeight: 1 },

  cardTitle: { family: fontFamily.sans, size: "17px", weight: 700, lineHeight: 1.3 }, // h3, aunque parezca heading
  body: { family: fontFamily.sans, size: "15px", weight: 400, lineHeight: 1.6 },
  bodySecondary: { family: fontFamily.sans, size: "15px", weight: 400, lineHeight: 1.6 },
  eyebrow: {
    family: fontFamily.sans,
    size: "10px",
    weight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  },
} as const;
