"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { NotificationsButton } from "@/components/ui/notifications-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";

export function Navbar() {
  const [focused, setFocused] = useState(false);
  return (
    <header className="sticky top-0 z-30">
      <div className="glass-strong mx-auto flex h-16 items-center gap-3 border-b border-[rgb(var(--border))] px-4 sm:px-6">
        <Link href="/feed" className="flex items-center gap-2">
          <motion.span
            initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-[var(--shadow-glow)]"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19V5l14 14V5" />
            </svg>
          </motion.span>
          <span className="hidden text-xl font-bold tracking-tight sm:block">
            Nova
          </span>
        </Link>

        <div className="relative ml-2 flex flex-1 max-w-md items-center">
          <motion.div
            animate={{
              boxShadow: focused
                ? "0 0 0 4px rgb(var(--primary) / 0.15)"
                : "0 0 0 0px rgb(var(--primary) / 0)",
            }}
            transition={{ duration: 0.2 }}
            className="flex w-full items-center gap-2 rounded-full bg-[rgb(var(--muted))] px-4 py-2.5 ring-1 ring-inset ring-[rgb(var(--border))]"
          >
            <Search className="size-4 text-[rgb(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Search Nova"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent text-sm placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none"
            />
          </motion.div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <NotificationsButton />
          <Link href={`/profile/${currentUser.username}`}>
            <Avatar
              name={currentUser.name}
              gradient={currentUser.avatarColor}
              size="md"
              ring
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
