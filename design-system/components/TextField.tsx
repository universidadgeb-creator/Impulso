import * as React from "react";
import { colors } from "../tokens/colors";
import { fontFamily } from "../tokens/typography";

/**
 * Campos de formulario (styleguide.html #campos):
 * - LockInput: oscuro, centrado, usado en el lock screen (contraseña de curso).
 * - EntregaInput: claro, vive dentro de las tarjetas de plataforma
 *   (formulario de entrega nombre/correo/liga).
 */
export type LockInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function LockInput({ style, ...rest }: LockInputProps) {
  return (
    <input
      {...rest}
      style={{
        fontFamily: fontFamily.sans,
        fontSize: 14,
        padding: "13px 16px",
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        background: "rgba(255,255,255,.04)",
        color: colors.white,
        textAlign: "center",
        letterSpacing: ".04em",
        width: "100%",
        maxWidth: 240,
        ...style,
      }}
    />
  );
}

export type EntregaInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function EntregaInput({ style, ...rest }: EntregaInputProps) {
  return (
    <input
      {...rest}
      style={{
        fontFamily: fontFamily.sans,
        fontSize: 13,
        padding: "11px 13px",
        borderRadius: 9,
        border: `1px solid ${colors.dashBorder}`,
        background: "#fff",
        color: colors.dashText,
        width: "100%",
        maxWidth: 240,
        ...style,
      }}
    />
  );
}
