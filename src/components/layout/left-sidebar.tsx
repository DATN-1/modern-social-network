"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Compass,
  MessageCircle,
  Bell,
  Bookmark,
  Users,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";

const items = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle, badge: 3 },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: 4 },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/friends", label: "Friends", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
];

export function LeftSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col lg:gap-2 lg:pr-2 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto thin-scrollbar">
      <Link
        href={`/profile/${currentUser.username}`}
        className="glass flex items-center gap-3 rounded-3xl p-3 transition hover:bg-[rgb(var(--muted))]"
      >
        <Avatar name={currentUser.name} gradient={currentUser.avatarColor} size="lg" ring />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{currentUser.name}</p>
          <p className="truncate text-xs text-[rgb(var(--muted-foreground))]">
            @{currentUser.username}
          </p>
        </div>
      </Link>

      <nav className="glass flex flex-col gap-1 rounded-3xl p-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/feed" && pathname.startsWith(item.href));
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "text-[rgb(var(--primary-foreground))]"
                    : "text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-500 shadow-[var(--shadow-glow)]"
                  />
                )}
                <Icon
                  className={cn(
                    "size-5 transition-transform group-hover:scale-110",
                    active ? "text-white" : "text-[rgb(var(--foreground))]"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[rgb(var(--primary))] text-white"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="glass flex flex-col gap-1 rounded-3xl p-2">
        <button className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-[rgb(var(--foreground))] transition hover:bg-[rgb(var(--muted))]">
          <Settings className="size-5" /> Settings
        </button>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
        >
          <LogOut className="size-5" /> Log out
        </Link>
      </div>
    </aside>
  );
}
