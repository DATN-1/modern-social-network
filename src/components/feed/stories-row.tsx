"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { stories, getUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function StoriesRow() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-3">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {stories.map((story, i) => {
          const author = getUser(story.authorId);
          const isMe = story.authorId === "u_me";
          return (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative h-44 w-28 shrink-0 overflow-hidden rounded-2xl"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  story.gradient
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute right-2 top-2 text-3xl drop-shadow-md">
                {story.emoji}
              </span>

              {isMe ? (
                <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-white text-[rgb(var(--primary))] shadow-md ring-2 ring-white">
                  <Plus className="size-4" />
                </span>
              ) : (
                <span
                  className={cn(
                    "absolute left-3 top-3 flex size-9 items-center justify-center rounded-full p-[2px]",
                    story.seen ? "bg-zinc-400" : "story-ring"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-full items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
                      author.avatarColor
                    )}
                  >
                    {author.name
                      .split(/\s+/)
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </span>
              )}

              <p className="absolute bottom-2 left-2 right-2 truncate text-xs font-semibold text-white drop-shadow-md">
                {isMe ? "Your story" : author.name.split(" ")[0]}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
