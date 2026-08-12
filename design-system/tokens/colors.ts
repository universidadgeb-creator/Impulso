/**
 * Tokens de color en JS/TS, espejo de colors.css, para uso programático
 * (theming, gráficas, mapeos pilar→color, etc.)
 */
export const colors = {
  void: "#080C14",
  deep: "#0D1525",
  midBg: "#111B2E",
  surface: "#172038",
  border: "rgba(255,255,255,0.08)",

  sage: "#7EC8A0",
  gold: "#F0C040",
  coral: "#F07060",
  blueHi: "#6AB0F5",

  white: "#FFFFFF",
  fog: "rgba(255,255,255,0.55)",
  mist: "rgba(255,255,255,0.3)",

  dashGradStart: "#FFFFFF",
  dashGradEnd: "#F7F5F0",
  dashText: "#14181F",
  dashText2: "#5A5647",
  dashEyebrow: "#8A8577",
  dashBorder: "#ECEAE4",
  dashPlaceholder: "#A8A498",
} as const;

export type ColorToken = keyof typeof colors;

/** Mapeo semántico fijo — no reasignar. */
export const pilares = {
  proposito: { label: "Propósito", emoji: "🟠", color: colors.gold },
  maestria: { label: "Maestría", emoji: "🔵", color: colors.blueHi },
  comunidad: { label: "Comunidad", emoji: "🟢", color: colors.sage },
  transicion: { label: "Transición / Integración", color: colors.coral },
} as const;

export const fases = {
  forja: { label: "Forja", color: colors.blueHi },
  produccion: { label: "Producción", color: colors.gold },
  lanzamiento: { label: "Lanzamiento", color: colors.coral },
} as const;
