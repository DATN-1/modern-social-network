"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Heart,
  MessageCircle,
  AtSign,
  Tag,
  UserPlus,
} from "lucide-react";
import { getUser, notifications } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import { Avatar } from "./avatar";

const iconByType = {
  like: { icon: Heart, color: "text-rose-500 bg-rose-500/10" },
  comment: { icon: MessageCircle, color: "text-sky-500 bg-sky-500/10" },
  follow: { icon: UserPlus, color: "text-emerald-500 bg-emerald-500/10" },
  mention: { icon: AtSign, color: "text-violet-500 bg-violet-500/10" },
  tag: { icon: Tag, color: "text-amber-500 bg-amber-500/10" },
} as const;

export function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        className="relative flex size-11 items-center justify-center rounded-full bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] transition hover:bg-[rgb(var(--border))]"
      >
        <Bell className="size-5" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 px-1 text-[10px] font-bold text-white shadow-md"
          >
            {unread}
          </motion.span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="glass-strong absolute right-0 z-40 mt-3 w-[360px] max-w-[88vw] origin-top-right rounded-3xl p-2 shadow-[var(--shadow-soft)]"
            >
              <div className="px-3 py-2 flex items-center justify-between">
                <h3 className="text-base font-bold">Notifications</h3>
                <button className="text-xs font-semibold text-[rgb(var(--primary))] hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-[420px] overflow-y-auto thin-scrollbar">
                {notifications.map((n, i) => {
                  const meta = iconByType[n.type];
                  const Icon = meta.icon;
                  const actor = getUser(n.actorId);
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl p-3 hover:bg-[rgb(var(--muted))]"
                    >
                      <div className="relative">
                        <Avatar name={actor.name} gradient={actor.avatarColor} size="md" />
                        <span
                          className={`absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full ring-2 ring-[rgb(var(--card))] ${meta.color}`}
                        >
                          <Icon className="size-3" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{actor.name}</span>{" "}
                          <span className="text-[rgb(var(--muted-foreground))]">
                            {n.text}
                          </span>
                        </p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">
                          {timeAgo(n.createdAt)}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="size-2 shrink-0 rounded-full bg-[rgb(var(--primary))]" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="border-t border-[rgb(var(--border))] p-2 text-center">
                <button className="w-full rounded-xl py-2 text-sm font-semibold text-[rgb(var(--primary))] hover:bg-[rgb(var(--muted))]">
                  See all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
