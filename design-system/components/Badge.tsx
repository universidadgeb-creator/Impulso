import * as React from "react";
import { colors } from "../tokens/colors";
import { fontFamily } from "../tokens/typography";

/** Badge — espejo de .badge / .badge-sage / .badge-gold / .badge-mist. */
export type BadgeVariant = "sage" | "gold" | "mist";

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  sage: { borderColor: colors.sage, color: colors.sage, background: "rgba(126,200,160,.1)" },
  gold: { borderColor: colors.gold, color: colors.gold, background: "rgba(240,192,64,.1)" },
  mist: { borderColor: colors.border, color: colors.fog, background: "rgba(255,255,255,.05)" },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "sage", style, children, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      style={{
        fontFamily: fontFamily.sans,
        fontSize: 12,
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: 100,
        border: "1px solid",
        letterSpacing: ".03em",
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
