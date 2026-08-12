import * as React from "react";
import { colors } from "../tokens/colors";
import { fontFamily } from "../tokens/typography";

/**
 * Píldora de mapeo pilar/fase → color (styleguide.html #pilares, .map-pill).
 * El color es semántico y fijo — no reasignar entre pilares/fases.
 */
export interface PillarPillProps {
  label: string;
  color: string;
  varName: string;
}

export function PillarPill({ label, color, varName }: PillarPillProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: `1px solid ${colors.border}`,
        borderRadius: 100,
        padding: "9px 16px 9px 12px",
        background: colors.surface,
        fontSize: 13.5,
        fontFamily: fontFamily.sans,
      }}
    >
      <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: color }} />
      <b style={{ fontWeight: 700 }}>{label}</b>
      <span style={{ color: colors.fog, fontSize: 12 }}>{varName}</span>
    </div>
  );
}
