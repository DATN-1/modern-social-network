"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, PlusCircle, MessageCircle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/feed?create=1", label: "Create", icon: PlusCircle, accent: true },
  { href: "/messages", label: "Chat", icon: MessageCircle },
  { href: "/notifications", label: "Alerts", icon: Bell },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="glass-strong fixed bottom-3 left-3 right-3 z-30 flex items-center justify-around rounded-full p-1 shadow-[var(--shadow-soft)] lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href.split("?")[0]);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-0.5 rounded-full p-2.5 text-[10px] font-semibold transition-colors",
              active
                ? "text-[rgb(var(--primary))]"
                : "text-[rgb(var(--muted-foreground))]"
            )}
          >
            {item.accent ? (
              <motion.span
                whileTap={{ scale: 0.92 }}
                className="-mt-6 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-teal-500 text-white shadow-[var(--shadow-glow)]"
              >
                <Icon className="size-6" />
              </motion.span>
            ) : (
              <Icon className="size-5" />
            )}
            {!item.accent && <span>{item.label}</span>}
            {active && !item.accent && (
              <motion.span
                layoutId="mobile-nav-dot"
                className="absolute -bottom-0.5 size-1 rounded-full bg-[rgb(var(--primary))]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
