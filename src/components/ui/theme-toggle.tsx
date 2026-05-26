"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-[68px] items-center rounded-full border border-[rgb(var(--border-strong))] bg-[rgb(var(--muted))] p-1 transition-colors",
        className
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: isDark ? 1 : 0,
          background:
            "linear-gradient(120deg, rgb(99 102 241 / 0.35), rgb(168 85 247 / 0.35))",
        }}
      />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "z-10 flex size-8 items-center justify-center rounded-full bg-white text-amber-500 shadow-md dark:bg-slate-900 dark:text-indigo-300",
          isDark ? "ml-auto" : ""
        )}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </motion.span>
    </button>
  );
}
