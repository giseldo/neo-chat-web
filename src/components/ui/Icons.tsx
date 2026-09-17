import React, { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface NeoSymbolProps extends React.SVGProps<SVGSVGElement> {
  spinning?: boolean;
  spinBurst?: boolean;
  speed?: "slow" | "normal" | "fast";
  gradient?: boolean;
  color?: string;
}

/**
 * NeoSymbol: Component that renders the authentic stylized 'N' from the NEO brand.
 * Supports smooth continuous ambient rotation, speedup on hover, and burst animation on trigger.
 */
export const NeoSymbol = ({
  className = "w-6 h-6",
  spinning = false,
  spinBurst = false,
  speed = "normal",
  gradient = true,
  color,
  style = {},
  ...props
}: NeoSymbolProps) => {
  const gradientId = useId();

  const speedClass =
    speed === "slow"
      ? "animate-neo-spin [animation-duration:18s]"
      : speed === "fast"
        ? "animate-neo-spin-fast"
        : "animate-neo-spin [animation-duration:10s]";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "inline-block shrink-0 select-none transition-transform duration-300",
        spinBurst ? "animate-neo-burst" : spinning ? speedClass : "",
        className,
      )}
      style={{
        ...style,
        color: color || "currentColor",
      }}
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Dynamic NEO electric gradient matching desktop brand */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Stylized 'N' Geometry from NEO Brand */}
      <path
        d="M 14.3 77.6 L 14 24.8 L 15.2 23.6 L 26.6 23.6 L 76.1 76.4 L 86 76.4 L 86 22.4 L 76.1 34.4 L 76.1 62.9 L 24.2 37.4 L 24.2 65.3 L 14.3 77.6 Z"
        fill={gradient ? `url(#${gradientId})` : color || "currentColor"}
        stroke={gradient ? `url(#${gradientId})` : color || "currentColor"}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Logo = NeoSymbol;
export const NeoRotatingLogo = NeoSymbol;
export const ClaudeAsterisk = NeoSymbol;

export const BubblesLoading = ({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="0" cy="12" r="0" transform="translate(8 0)" fill="currentColor">
      <animate
        attributeName="r"
        begin="0"
        calcMode="spline"
        dur="1.2s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        keyTimes="0;0.2;0.7;1"
        repeatCount="indefinite"
        values="0; 4; 0; 0"
      />
    </circle>
    <circle
      cx="0"
      cy="12"
      r="0"
      transform="translate(16 0)"
      fill="currentColor"
    >
      <animate
        attributeName="r"
        begin="0.3"
        calcMode="spline"
        dur="1.2s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        keyTimes="0;0.2;0.7;1"
        repeatCount="indefinite"
        values="0; 4; 0; 0"
      />
    </circle>
    <circle
      cx="0"
      cy="12"
      r="0"
      transform="translate(24 0)"
      fill="currentColor"
    >
      <animate
        attributeName="r"
        begin="0.6"
        calcMode="spline"
        dur="1.2s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        keyTimes="0;0.2;0.7;1"
        repeatCount="indefinite"
        values="0; 4; 0; 0"
      />
    </circle>
  </svg>
);
