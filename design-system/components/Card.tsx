import * as React from "react";
import { colors } from "../tokens/colors";
import { fontFamily } from "../tokens/typography";

/**
 * Dos esquemas de tarjeta (styleguide.html #tarjetas):
 * - LockCard: oscura, sobre --surface. Usada en nav, lock screen, landing.
 * - DashCard: clara, gradiente blanco→crema flotando sobre el fondo oscuro
 *   del sitio. Usada en dashboard y momento (plataforma). Lleva una barra
 *   superior de 4 colores (pilares).
 */
export interface LockCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function LockCard({ icon = "🔒", title, description }: LockCardProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 300,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 20,
        padding: "26px 24px",
        textAlign: "center",
        fontFamily: fontFamily.sans,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(126,200,160,.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
          fontSize: 22,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 18, color: colors.white, marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 13, color: colors.fog, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

export interface DashCardProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function DashCard({ eyebrow, title, description }: DashCardProps) {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${colors.dashGradStart} 0%, ${colors.dashGradEnd} 100%)`,
        color: colors.dashText,
        borderRadius: 24,
        padding: "0 0 22px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: 320,
        boxShadow: "0 30px 80px rgba(20,24,31,.35)",
        border: "1px solid rgba(20,24,31,.06)",
        fontFamily: fontFamily.sans,
      }}
    >
      <div
        style={{
          height: 6,
          background: `linear-gradient(90deg, ${colors.sage}, ${colors.blueHi}, ${colors.gold}, ${colors.coral})`,
        }}
      />
      <div style={{ padding: "22px 24px 0" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: colors.dashEyebrow,
          }}
        >
          {eyebrow}
        </div>
        <h3 style={{ fontSize: 19, margin: "6px 0 6px", color: colors.dashText }}>{title}</h3>
        <p style={{ fontSize: 13, color: colors.dashText2, lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
  );
}
