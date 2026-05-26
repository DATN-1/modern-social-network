"use client";

import { cn, initialsOf } from "@/lib/utils";

type AvatarProps = {
  name: string;
  gradient?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  online?: boolean;
  ring?: boolean;
  className?: string;
};

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "size-7 text-[10px]",
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
  "2xl": "size-32 text-3xl",
};

const dotSizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "size-2 ring-2",
  sm: "size-2.5 ring-2",
  md: "size-3 ring-2",
  lg: "size-3.5 ring-[3px]",
  xl: "size-4 ring-[3px]",
  "2xl": "size-5 ring-4",
};

export function Avatar({
  name,
  gradient = "from-indigo-500 via-violet-500 to-pink-500",
  size = "md",
  online,
  ring,
  className,
}: AvatarProps) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-inner",
          gradient,
          sizes[size],
          ring &&
            "ring-2 ring-white dark:ring-[rgb(var(--card))] outline outline-1 outline-black/5"
        )}
        aria-label={name}
      >
        {initialsOf(name)}
      </span>
      {online && (
        <span
          className={cn(
            "absolute right-0 bottom-0 block rounded-full bg-emerald-500 pulse-dot ring-white dark:ring-[rgb(var(--card))]",
            dotSizes[size]
          )}
        />
      )}
    </span>
  );
}
