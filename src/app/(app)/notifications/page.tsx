"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, UserPlus, AtSign, Tag, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { getUser, notifications } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";

const iconByType = {
  like: { icon: Heart, color: "from-rose-500 to-red-500" },
  comment: { icon: MessageCircle, color: "from-sky-500 to-blue-600" },
  follow: { icon: UserPlus, color: "from-emerald-500 to-teal-600" },
  mention: { icon: AtSign, color: "from-cyan-500 to-teal-600" },
  tag: { icon: Tag, color: "from-amber-500 to-orange-500" },
} as const;

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <Bell className="-mt-1 mr-1 inline size-7 text-[rgb(var(--primary))]" />
            Notifications
          </h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Stay on top of what matters.
          </p>
        </div>
        <button className="rounded-full bg-[rgb(var(--muted))] px-4 py-2 text-xs font-semibold hover:bg-[rgb(var(--border))]">
          Mark all read
        </button>
      </motion.div>

      <div className="glass flex flex-col divide-y divide-[rgb(var(--border))] overflow-hidden rounded-3xl">
        {notifications.map((n, i) => {
          const meta = iconByType[n.type];
          const Icon = meta.icon;
          const actor = getUser(n.actorId);
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              className="group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-[rgb(var(--muted))]"
            >
              <div className="relative">
                <Avatar name={actor.name} gradient={actor.avatarColor} size="lg" />
                <span
                  className={`absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${meta.color} text-white ring-2 ring-[rgb(var(--card))]`}
                >
                  <Icon className="size-3.5" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-bold">{actor.name}</span>{" "}
                  <span className="text-[rgb(var(--muted-foreground))]">{n.text}</span>
                </p>
                <p
                  className="text-xs text-[rgb(var(--muted-foreground))]"
                  suppressHydrationWarning
                >
                  {timeAgo(n.createdAt)}
                </p>
              </div>
              {!n.read && (
                <span className="size-2.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
