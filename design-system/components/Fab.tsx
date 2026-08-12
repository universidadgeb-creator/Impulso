import * as React from "react";
import { colors } from "../tokens/colors";

/**
 * FAB de ayuda (styleguide.html #fab) — botón circular flotante de WhatsApp,
 * presente en las 4 pantallas de plataforma (ruta-geb, impulso-geb,
 * momento-guia, momento-video), esquina inferior izquierda, visible solo
 * después de desbloquear el gate por contraseña.
 */
export interface FabProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export function Fab({ icon = "💬", style, ...rest }: FabProps) {
  return (
    <div
      {...rest}
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: colors.sage,
        color: colors.void,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        boxShadow: "0 10px 30px rgba(126,200,160,.45)",
        transition: "transform .15s",
        cursor: "pointer",
        ...style,
      }}
    >
      {icon}
    </div>
  );
}
