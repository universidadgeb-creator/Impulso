import * as React from "react";
import { colors } from "../tokens/colors";
import { fontFamily } from "../tokens/typography";

/**
 * Botones — espejo de .hero-btn/.cta-btn, .nav-cta, .lock-submit y
 * .entrega-form button (styleguide.html #botones).
 * Primario = sage sobre void, siempre píldora. "entrega" usa gold porque
 * vive dentro del esquema claro de las tarjetas de plataforma.
 */
export type ButtonVariant = "primary" | "nav" | "lockSubmit" | "entrega";

const base: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  fontFamily: fontFamily.sans,
  transition: "transform .15s, box-shadow .2s",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    ...base,
    display: "inline-block",
    background: colors.sage,
    color: colors.void,
    fontSize: 16,
    fontWeight: 700,
    padding: "16px 36px",
    borderRadius: 100,
    boxShadow: "0 0 40px rgba(126,200,160,0.4)",
  },
  nav: {
    ...base,
    background: colors.sage,
    color: colors.void,
    fontSize: 13,
    fontWeight: 600,
    padding: "9px 16px",
    borderRadius: 100,
  },
  lockSubmit: {
    ...base,
    background: colors.sage,
    color: colors.void,
    fontSize: 14,
    fontWeight: 700,
    padding: "13px 22px",
    borderRadius: 10,
  },
  entrega: {
    ...base,
    background: colors.gold,
    color: colors.dashText,
    fontSize: 13,
    fontWeight: 700,
    padding: "12px 22px",
    borderRadius: 9,
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", style, ...rest }: ButtonProps) {
  return <button {...rest} style={{ ...variantStyles[variant], ...style }} />;
}
