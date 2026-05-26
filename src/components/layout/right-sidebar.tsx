"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  chats,
  suggestedFriends,
  trending,
  users,
} from "@/lib/mock-data";
import { formatCount } from "@/lib/utils";

export function RightSidebar() {
  const online = users.filter((u) => u.online && u.id !== "u_me");
  return (
    <aside className="hidden xl:flex xl:flex-col xl:gap-4 xl:pl-2 xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-5rem)] xl:overflow-y-auto thin-scrollbar">
      <div className="glass rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <TrendingUp className="size-4" />
          </span>
          <h3 className="text-sm font-bold">Trending today</h3>
        </div>
        <ul className="space-y-1">
          {trending.map((t, i) => (
            <motion.li
              key={t.tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 transition hover:bg-[rgb(var(--muted))]"
            >
              <div>
                <p className="text-sm font-semibold text-gradient">#{t.tag}</p>
                <p className="text-xs text-[rgb(var(--muted-foreground))]">
                  {formatCount(t.posts)} posts
                </p>
              </div>
              <Sparkles className="size-4 opacity-0 transition group-hover:opacity-100 text-[rgb(var(--primary))]" />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
            <UserPlus className="size-4" />
          </span>
          <h3 className="text-sm font-bold">Suggested for you</h3>
        </div>
        <ul className="space-y-3">
          {suggestedFriends.map((u, i) => (
            <motion.li
              key={u.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <Avatar name={u.name} gradient={u.avatarColor} size="md" />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/profile/${u.username}`}
                  className="block truncate text-sm font-semibold hover:underline"
                >
                  {u.name}
                </Link>
                <p className="truncate text-xs text-[rgb(var(--muted-foreground))]">
                  @{u.username}
                </p>
              </div>
              <Button size="sm" variant="primary">Follow</Button>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-3xl p-5">
        <h3 className="mb-3 text-sm font-bold">Online now</h3>
        <ul className="space-y-3">
          {online.slice(0, 6).map((u, i) => {
            const thread = chats.find((c) => c.participantId === u.id);
            return (
              <motion.li
                key={u.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href="/messages"
                  className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-[rgb(var(--muted))]"
                >
                  <Avatar name={u.name} gradient={u.avatarColor} size="md" online />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{u.name}</p>
                    {thread && (
                      <p className="truncate text-xs text-[rgb(var(--muted-foreground))]">
                        {thread.lastMessage}
                      </p>
                    )}
                  </div>
                  {thread && thread.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 px-1.5 text-[10px] font-bold text-white">
                      {thread.unread}
                    </span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <p className="px-3 text-xs text-[rgb(var(--muted-foreground))]">
        Nova © {new Date().getFullYear()} · About · Privacy · Terms · Cookies
      </p>
    </aside>
  );
}
