"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[rgb(var(--primary))] text-white hover:brightness-110 shadow-[var(--shadow-glow)]",
  secondary:
    "bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--border))]",
  ghost:
    "bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]",
  outline:
    "border border-[rgb(var(--border-strong))] bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]",
  gradient:
    "bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-500 text-white shadow-[var(--shadow-glow)] hover:brightness-110",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-2xl",
  lg: "h-12 px-7 text-base rounded-2xl",
  icon: "size-10 rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
